(() => {
  "use strict";

  const programs = window.PortfolioPrograms instanceof Map ? window.PortfolioPrograms : (window.PortfolioPrograms = new Map());
  const projects = Array.isArray(window.PORTFOLIO_DATA?.projects) ? window.PORTFOLIO_DATA.projects : [];
  const storageKey = "samael.projects.session.v4";
  const filters = [
    ["all", "All Projects"],
    ["tools", "Tools"],
    ["games", "Games"],
    ["experiments", "Experiments"],
    ["archived", "Archived"]
  ];

  const create = (tag, className = "", text = "") => {
    const element = document.createElement(tag);
    if (className) element.className = className;
    if (text) element.textContent = text;
    return element;
  };

  const normalizeFilter = (value) => ({
    labs: "experiments",
    maintained: "tools",
    legacy: "archived"
  })[String(value || "").toLowerCase()] || String(value || "").toLowerCase();

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
        const key = normalized.toLowerCase();
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
    for (const technology of project.technologies || []) tags.append(create("span", "", technology));
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
      const list = create("div", "cv-project-list");
      list.dataset.projectList = "";

      const sidebar = create("aside", "projects-archive-sidebar");
      sidebar.setAttribute("aria-label", "Project filters and status");

      const filterGroup = create("section", "projects-sidebar-group");
      filterGroup.append(create("h2", "", "Filter"));
      const filterList = create("div", "projects-filter-list");
      for (const [value, label] of filters) {
        const button = create("button", "projects-filter-row");
        button.type = "button";
        button.dataset.projectFilter = value;
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
      for (const [value, label] of [["maintained", "Maintained"], ["development", "In Development"], ["archived", "Archived"]]) {
        const row = create("div", `projects-status-row projects-status-row--${value}`);
        row.dataset.projectStatus = value;
        row.append(
          create("span", "projects-status-row__dot"),
          create("span", "projects-status-row__label", label),
          create("span", "projects-status-row__count", "0")
        );
        statusList.append(row);
      }
      statusGroup.append(statusList);

      const disclaimerGroup = create("section", "projects-sidebar-group projects-disclaimer-group");
      disclaimerGroup.append(
        create("h2", "", "Disclaimer"),
        create("p", "projects-disclaimer-copy", "Some project entries were dynamically retrieved via a Python script, with properties assigned from the detected source contents. Because this process is automated, occasional errors, omissions, or mismatches may exist.")
      );

      sidebar.append(filterGroup, statusGroup, disclaimerGroup);
      body.append(list, sidebar);

      const panel = create("div", "projects-scroll-panel");
      const contentCard = create("section", "projects-content-card");
      contentCard.append(header, body);
      panel.append(contentCard);
      app.append(panel);
      return app;
    },
    initialize(container) {
      const app = container.querySelector?.("[data-projects-app]") || container.closest?.("[data-projects-app]");
      if (!app) return null;

      const list = app.querySelector("[data-project-list]");
      const filterButtons = [...app.querySelectorAll("[data-project-filter]")];
      let filter = "all";
      let availableProjects = [...projects];
      let githubLabsLoaded = false;
      let disposed = false;

      try {
        const stored = JSON.parse(sessionStorage.getItem(storageKey) || "null");
        if (filters.some(([value]) => value === stored?.filter)) filter = stored.filter;
      } catch {}

      const updateSidebar = () => {
        for (const button of filterButtons) {
          const value = button.dataset.projectFilter;
          const count = value === "all" ? availableProjects.length : availableProjects.filter((project) => projectCategory(project) === value).length;
          button.querySelector(".projects-filter-row__count").textContent = String(count);
          const active = value === filter;
          button.classList.toggle("is-active", active);
          button.setAttribute("aria-pressed", String(active));
        }

        for (const state of ["maintained", "development", "archived"]) {
          const count = availableProjects.filter((project) => projectState(project) === state).length;
          const target = app.querySelector(`[data-project-status="${state}"] .projects-status-row__count`);
          if (target) target.textContent = String(count);
        }
      };

      const render = () => {
        updateSidebar();
        list.replaceChildren();
        const matches = filter === "all" ? availableProjects : availableProjects.filter((project) => projectCategory(project) === filter);
        if (!matches.length) {
          const empty = create("div", "feature-empty");
          if (filter === "experiments" && !githubLabsLoaded) empty.append(create("strong", "", "Loading experiments…"), create("span", "", "Public experimental repositories are being loaded."));
          else empty.append(create("strong", "", "No projects in this section"), create("span", "", "There are no projects available for this filter."));
          list.append(empty);
          return;
        }
        matches.forEach((project) => list.append(renderEntry(project)));
      };

      const setFilter = (next) => {
        const normalized = normalizeFilter(next);
        filter = filters.some(([value]) => value === normalized) ? normalized : "all";
        try { sessionStorage.setItem(storageKey, JSON.stringify({ filter })); } catch {}
        render();
      };

      const focusProject = (id) => {
        const project = availableProjects.find((item) => item.id === id);
        if (!project) return;
        filter = projectCategory(project);
        try { sessionStorage.setItem(storageKey, JSON.stringify({ filter })); } catch {}
        render();
        requestAnimationFrame(() => app.querySelector(`[data-project-id="${CSS.escape(id)}"]`)?.scrollIntoView({ block: "nearest", behavior: "smooth" }));
      };

      const onFilter = (event) => setFilter(String(event.detail?.filter || "all"));
      const onOpenProject = (event) => focusProject(String(event.detail?.id || ""));

      for (const button of filterButtons) button.addEventListener("click", () => setFilter(button.dataset.projectFilter));
      window.addEventListener("portfolio:projects-filter", onFilter);
      window.addEventListener("portfolio:open-project", onOpenProject);
      render();

      fetch("/github-stats.json", { cache: "no-store" }).then((response) => {
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
