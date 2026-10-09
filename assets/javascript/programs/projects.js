(() => {
  "use strict";

  const programs = window.PortfolioPrograms instanceof Map ? window.PortfolioPrograms : (window.PortfolioPrograms = new Map());
  const projects = Array.isArray(window.PORTFOLIO_DATA?.projects) ? window.PORTFOLIO_DATA.projects : [];
  const storageKey = "samael.projects.session.v6";
  const pageSize = 15;
  const categoryFilters = [
    ["all", "All Projects"],
    ["tools", "Tools"],
    ["games", "Games"],
    ["experiments", "Experiments"],
    ["archived", "Archived"]
  ];
  const statusFilters = [
    ["maintained", "Maintained"],
    ["development", "In Development"],
    ["archived", "Archived"]
  ];
  const categoryFilterKeys = new Set(categoryFilters.map(([value]) => value));
  const statusFilterKeys = new Set(statusFilters.map(([value]) => value));

  const create = (tag, className = "", text = "") => {
    const element = document.createElement(tag);
    if (className) element.className = className;
    if (text) element.textContent = text;
    return element;
  };

  const normalizeFilter = (value) => ({
    labs: "experiments",
    legacy: "archived"
  })[String(value || "").toLowerCase()] || String(value || "").toLowerCase();

  const normalizeTag = (value) => String(value || "").trim().toLowerCase();

  const displayTag = (value) => {
    const raw = String(value || "").trim();
    const normalized = normalizeTag(raw);
    const known = ({
      glua: "GLua",
      mysqloo: "MySQLOO",
      mysql: "MySQL",
      mariadb: "MariaDB",
      postgresql: "PostgreSQL",
      sqlite: "SQLite",
      sql: "SQL",
      lua: "Lua",
      luajit: "LuaJIT",
      nginx: "Nginx",
      steamcmd: "SteamCMD",
      srcds: "SRCDS",
      github: "GitHub",
      "github actions": "GitHub Actions",
      "github pages": "GitHub Pages",
      "gitlab ci": "GitLab CI",
      ssh: "SSH",
      ufw: "UFW",
      zfs: "ZFS",
      ulx: "ULX",
      cami: "CAMI",
      html: "HTML",
      css: "CSS",
      json: "JSON",
      api: "API",
      apis: "APIs",
      "rest apis": "REST APIs",
      ci: "CI",
      cd: "CD",
      "ci/cd": "CI/CD",
      sre: "SRE",
      dns: "DNS",
      ast: "AST",
      sarif: "SARIF",
      lsp: "LSP",
      kvm: "KVM",
      s3: "S3",
      gmod: "GMod",
      darkrp: "DarkRP",
      hl2rp: "HL2RP",
      devops: "DevOps",
      "vs code api": "VS Code API",
      "pl/pgsql": "PL/pgSQL"
    })[normalized];
    if (known || !raw || raw !== raw.toLowerCase()) return known || raw;
    return raw
      .replace(/[_-]+/g, " ")
      .replace(/\s+/g, " ")
      .replace(/(^|[\s/])([a-z])/g, (_, prefix, letter) => `${prefix}${letter.toUpperCase()}`);
  };

  const projectCategory = (project) => {
    const lifecycle = String(project?.lifecycle || "").toLowerCase();
    if (lifecycle === "legacy" || lifecycle === "archived") return "archived";
    if (lifecycle === "games") return "games";
    if (lifecycle === "labs" || lifecycle === "experimental") return "experiments";
    return "tools";
  };

  const isLiliaProject = (project) => {
    if (String(project?.id || "").toLowerCase() === "lilia") return true;
    return String(project?.githubRepository || "").toLowerCase().startsWith("liliaframework/");
  };

  const projectState = (project) => {
    const lifecycle = String(project?.lifecycle || "").toLowerCase();
    if (lifecycle === "legacy" || lifecycle === "archived") return "archived";
    if (["project-fantasia", "gfallout-new-vegas"].includes(String(project?.id || "").toLowerCase())) return "development";
    if (lifecycle === "maintained" || (lifecycle === "tools" && isLiliaProject(project))) return "maintained";
    return "untracked";
  };

  const stateLabel = (state) => ({
    maintained: "Maintained",
    development: "In Development",
    archived: "Archived"
  })[state] || "Maintained";

  const categoryLabel = (category) => ({
    tools: "Tool",
    games: "Game",
    experiments: "Experiment",
    archived: "Archived"
  })[category] || "Project";

  const collectRepositories = (snapshot) => {
    const repositories = [];
    for (const scope of [snapshot?.personal, snapshot?.liliaFramework]) {
      for (const repository of scope?.repositories?.items || []) {
        if (repository?.fullName) repositories.push(repository);
      }
    }
    return repositories;
  };

  const enrichProjects = (items, snapshot) => {
    const repositories = new Map(collectRepositories(snapshot).map((repository) => [String(repository.fullName).toLowerCase(), repository]));
    return items.map((project) => {
      const repository = repositories.get(String(project.githubRepository || "").toLowerCase());
      if (!repository) return project;
      return { ...project, updatedAt: repository.pushedAt || repository.updatedAt || project.updatedAt };
    });
  };

  const githubLabProjects = (snapshot) => {
    const repositories = Array.isArray(snapshot?.personal?.labs) ? snapshot.personal.labs : [];
    return repositories.filter((repository) => repository && repository.url && !repository.fork && !repository.archived).map((repository) => {
      const technologies = [];
      const seen = new Set();
      for (const value of [repository.language, ...(repository.languages || []).map((language) => language?.name), ...(repository.topics || [])]) {
        const normalized = String(value || "").trim();
        const key = normalizeTag(normalized);
        if (!normalized || seen.has(key)) continue;
        seen.add(key);
        technologies.push(normalized);
      }
      const work = [];
      if (repository.language) work.push(`Primary language: ${repository.language}`);
      work.push(`${Number(repository.stars || 0)} stars · ${Number(repository.forks || 0)} forks`);
      work.push(`${Number(repository.openIssues || 0)} open issues / pull requests`);
      if (repository.releases?.count) work.push(`${Number(repository.releases.count)} public releases · ${Number(repository.releases.downloads || 0)} asset downloads`);
      return {
        id: `github-lab-${String(repository.name || "repository").toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "")}`,
        name: repository.name || repository.fullName || "GitHub Lab",
        summary: repository.description || "Public laboratory repository and experimental development work.",
        status: "labs",
        category: `Experiment${repository.language ? ` · ${repository.language}` : ""}`,
        technologies: technologies.length ? technologies : ["GitHub"],
        lifecycle: "labs",
        work,
        githubRepository: repository.fullName || "",
        updatedAt: repository.pushedAt || repository.updatedAt || ""
      };
    });
  };

  const renderEntry = (project) => {
    const entry = create("article", "cv-project-entry");
    entry.dataset.projectId = project.id || "";

    const card = create("div", "cv-project-entry__card");
    const main = create("div", "cv-project-entry__main");
    const heading = create("div", "cv-project-entry__heading");
    const title = create("h2", "", project.name || "Untitled Project");
    const state = projectState(project);
    const category = projectCategory(project);
    heading.append(title, create("span", `project-category-badge project-category-badge--${category}`, categoryLabel(category)));
    if (state !== "untracked") heading.append(create("span", `project-status project-status--${state}`, String(project?.lifecycle || "").toLowerCase() === "legacy" ? "Legacy" : stateLabel(state)));

    main.append(
      heading,
      create("span", "cv-project-entry__type", project.category || "Project"),
      create("p", "cv-project-entry__description", project.summary || "")
    );

    const tags = create("div", "feature-tags cv-project-entry__tags");
    for (const technology of project.technologies || []) tags.append(create("span", "", displayTag(technology)));
    main.append(tags);

    const features = create("section", "cv-project-entry__features");
    features.append(create("h3", "", "Features"));
    const list = create("ul", "feature-list");
    for (const item of project.work || []) list.append(create("li", "", item));
    features.append(list);

    card.append(main, features);
    entry.append(card);
    return entry;
  };

  programs.set("projects", {
    build() {
      const app = create("div", "feature-app projects-cv-app");
      app.dataset.projectsApp = "";

      const header = create("header", "feature-app__header projects-cv-header");
      const copy = create("div", "projects-cv-header__copy");
      copy.append(
        create("span", "feature-eyebrow", "PROJECT"),
        create("p", "", "A curated collection of maintained projects, developer tools, games, experiments and archived work.")
      );
      header.append(copy);

      const body = create("div", "feature-app__body projects-archive-body");
      const results = create("section", "projects-results");
      const list = create("div", "cv-project-list");
      list.dataset.projectList = "";
      const pagination = create("nav", "projects-pagination");
      pagination.dataset.projectPagination = "";
      pagination.setAttribute("aria-label", "Project pages");
      pagination.hidden = true;
      results.append(list, pagination);

      const sidebar = create("aside", "projects-archive-sidebar");
      sidebar.setAttribute("aria-label", "Project filters and status");

      const filterGroup = create("section", "projects-sidebar-group projects-filter-group");
      filterGroup.append(create("h2", "", "Filter"));
      const filterList = create("div", "projects-filter-list");
      for (const [value, label] of categoryFilters) {
        const button = create("button", "projects-filter-row");
        button.type = "button";
        button.dataset.projectCategoryFilter = value;
        button.setAttribute("aria-pressed", "false");
        button.append(
          create("span", "projects-filter-row__marker"),
          create("span", "projects-filter-row__label", label),
          create("span", "projects-filter-row__count", "0")
        );
        filterList.append(button);
      }
      filterGroup.append(filterList);

      const statusGroup = create("section", "projects-sidebar-group projects-status-group");
      statusGroup.append(create("h2", "", "Status"));
      const statusList = create("div", "projects-status-list");
      for (const [value, label] of statusFilters) {
        const row = create("div", `projects-status-row projects-status-row--${value}`);
        row.append(
          create("span", "projects-status-row__dot"),
          create("span", "projects-status-row__label", label),
          create("span", "projects-status-row__count", "0")
        );
        row.dataset.projectStatusRow = value;
        statusList.append(row);
      }
      statusGroup.append(statusList);

      const disclaimerGroup = create("section", "projects-sidebar-group projects-disclaimer-group");
      disclaimerGroup.append(
        create("h2", "", "Disclaimer"),
        create("p", "projects-disclaimer-copy", "Some project entries were dynamically retrieved via a Python script with properties assigned from the detected source contents. Because this process is automated, occasional errors, omissions, or mismatches may exist.")
      );

      sidebar.append(filterGroup, statusGroup, disclaimerGroup);
      body.append(results, sidebar);

      const panel = create("div", "projects-scroll-panel");
      const contentCard = create("section", "projects-content-card");
      contentCard.append(header, body);
      const frame = create("div", "projects-layout-frame");
      frame.append(contentCard);
      panel.append(frame);
      app.append(panel);
      return app;
    },
    initialize(container) {
      const app = container.querySelector?.("[data-projects-app]") || container.closest?.("[data-projects-app]");
      if (!app) return null;

      const list = app.querySelector("[data-project-list]");
      const pagination = app.querySelector("[data-project-pagination]");
      const categoryButtons = [...app.querySelectorAll("[data-project-category-filter]")];
      const statusRows = [...app.querySelectorAll("[data-project-status-row]")];
      let categoryFilter = "all";
      let statusFilter = "";
      let currentPage = 1;
      let availableProjects = [...projects];
      let githubLabsLoaded = false;
      let disposed = false;

      try {
        const stored = JSON.parse(sessionStorage.getItem(storageKey) || "null");
        if (categoryFilterKeys.has(stored?.category)) categoryFilter = stored.category;
        if (statusFilterKeys.has(stored?.status)) statusFilter = stored.status;
      } catch {}

      const saveSelection = () => {
        try {
          sessionStorage.setItem(storageKey, JSON.stringify({ category: categoryFilter, status: statusFilter }));
        } catch {}
      };

      const matchesProject = (project) => {
        if (categoryFilter !== "all" && projectCategory(project) !== categoryFilter) return false;
        return !statusFilter || projectState(project) === statusFilter;
      };

      const updateSidebar = () => {
        for (const button of categoryButtons) {
          const value = button.dataset.projectCategoryFilter;
          const count = availableProjects.filter((project) => {
            if (statusFilter && projectState(project) !== statusFilter) return false;
            return value === "all" || projectCategory(project) === value;
          }).length;
          const active = value === categoryFilter;
          button.querySelector(".projects-filter-row__count").textContent = String(count);
          button.classList.toggle("is-active", active);
          button.setAttribute("aria-pressed", String(active));
        }

        for (const row of statusRows) {
          const value = row.dataset.projectStatusRow;
          row.querySelector(".projects-status-row__count").textContent = String(availableProjects.filter((project) => projectState(project) === value).length);
        }
      };

      const renderPagination = (totalItems, totalPages, startIndex, endIndex) => {
        pagination.replaceChildren();
        pagination.hidden = totalPages <= 1;
        if (pagination.hidden) return;

        const summary = create("span", "projects-pagination__summary", `Showing ${startIndex + 1}–${endIndex} of ${totalItems}`);
        const controls = create("div", "projects-pagination__controls");
        const goToPage = (page) => {
          const nextPage = Math.min(totalPages, Math.max(1, page));
          if (nextPage === currentPage) return;
          currentPage = nextPage;
          render();
          requestAnimationFrame(() => list.scrollIntoView({ block: "start", behavior: "smooth" }));
        };
        const addButton = (label, page, options = {}) => {
          const button = create("button", `projects-pagination__button${options.active ? " is-active" : ""}`, label);
          button.type = "button";
          button.disabled = Boolean(options.disabled);
          if (options.label) button.setAttribute("aria-label", options.label);
          if (options.active) button.setAttribute("aria-current", "page");
          button.addEventListener("click", () => goToPage(page));
          controls.append(button);
        };

        addButton("‹", currentPage - 1, { disabled: currentPage === 1, label: "Previous project page" });
        const pages = new Set([1, totalPages]);
        for (let page = currentPage - 2; page <= currentPage + 2; page += 1) {
          if (page > 1 && page < totalPages) pages.add(page);
        }
        const orderedPages = [...pages].sort((a, b) => a - b);
        let previousPage = 0;
        for (const page of orderedPages) {
          if (previousPage && page - previousPage > 1) controls.append(create("span", "projects-pagination__ellipsis", "…"));
          addButton(String(page), page, { active: page === currentPage, label: `Project page ${page}` });
          previousPage = page;
        }
        addButton("›", currentPage + 1, { disabled: currentPage === totalPages, label: "Next project page" });
        pagination.append(summary, controls);
      };

      const render = () => {
        updateSidebar();
        list.replaceChildren();
        const matches = availableProjects.filter(matchesProject);
        if (!matches.length) {
          pagination.replaceChildren();
          pagination.hidden = true;
          const empty = create("div", "feature-empty");
          if (categoryFilter === "experiments" && !githubLabsLoaded) empty.append(create("strong", "", "Loading experiments…"), create("span", "", "Public experimental repositories are being loaded."));
          else if (statusFilter) empty.append(create("strong", "", "No projects match this status"), create("span", "", "Choose another project category or status."));
          else empty.append(create("strong", "", "No projects in this section"), create("span", "", "There are no projects available for this filter."));
          list.append(empty);
          return;
        }

        const totalPages = Math.max(1, Math.ceil(matches.length / pageSize));
        currentPage = Math.min(Math.max(1, currentPage), totalPages);
        const startIndex = (currentPage - 1) * pageSize;
        const endIndex = Math.min(startIndex + pageSize, matches.length);
        for (const project of matches.slice(startIndex, endIndex)) list.append(renderEntry(project));
        renderPagination(matches.length, totalPages, startIndex, endIndex);
      };

      const setLegacyFilter = (next) => {
        const normalized = normalizeFilter(next);
        currentPage = 1;
        if (statusFilterKeys.has(normalized)) {
          categoryFilter = "all";
          statusFilter = normalized;
        } else {
          categoryFilter = categoryFilterKeys.has(normalized) ? normalized : "all";
          statusFilter = "";
        }
        saveSelection();
        render();
      };

      const focusProject = (id) => {
        const project = availableProjects.find((item) => item.id === id);
        if (!project) return;
        categoryFilter = "all";
        statusFilter = "";
        const projectIndex = availableProjects.indexOf(project);
        currentPage = Math.max(1, Math.floor(projectIndex / pageSize) + 1);
        saveSelection();
        render();
        requestAnimationFrame(() => app.querySelector(`[data-project-id="${CSS.escape(id)}"]`)?.scrollIntoView({ block: "nearest", behavior: "smooth" }));
      };

      const onFilter = (event) => setLegacyFilter(String(event.detail?.filter || "all"));
      const onOpenProject = (event) => focusProject(String(event.detail?.id || ""));

      for (const button of categoryButtons) {
        button.addEventListener("click", () => {
          categoryFilter = button.dataset.projectCategoryFilter || "all";
          statusFilter = "";
          currentPage = 1;
          saveSelection();
          render();
        });
      }

      window.addEventListener("portfolio:projects-filter", onFilter);
      window.addEventListener("portfolio:open-project", onOpenProject);
      render();

      fetch("/.jsons/github-stats.json", { cache: "no-store" }).then((response) => {
        if (!response.ok) throw new Error("Project activity unavailable");
        return response.json();
      }).then((snapshot) => {
        if (disposed) return;
        availableProjects = enrichProjects(availableProjects, snapshot);
        const dynamicLabs = githubLabProjects(snapshot);
        const existingIds = new Set(availableProjects.map((project) => project.id));
        const existingRepositories = new Set(availableProjects.map((project) => String(project.githubRepository || "").toLowerCase()).filter(Boolean));
        for (const project of dynamicLabs) {
          const repository = String(project.githubRepository || "").toLowerCase();
          if (existingIds.has(project.id) || (repository && existingRepositories.has(repository))) continue;
          existingIds.add(project.id);
          if (repository) existingRepositories.add(repository);
          availableProjects.push(project);
        }
      }).catch(() => {}).finally(() => {
        if (disposed) return;
        githubLabsLoaded = true;
        render();
      });

      return () => {
        disposed = true;
        window.removeEventListener("portfolio:projects-filter", onFilter);
        window.removeEventListener("portfolio:open-project", onOpenProject);
      };
    }
  });
})();
