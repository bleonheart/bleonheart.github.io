(() => {
  "use strict";

  const programs = window.PortfolioPrograms instanceof Map ? window.PortfolioPrograms : (window.PortfolioPrograms = new Map());
  const projects = Array.isArray(window.PORTFOLIO_DATA?.projects) ? window.PORTFOLIO_DATA.projects : [];
  const storageKey = "samael.projects.session.v2";

  const create = (tag, className = "", text = "") => {
    const element = document.createElement(tag);
    if (className) element.className = className;
    if (text) element.textContent = text;
    return element;
  };

  const action = (label, value, primary = false) => {
    const button = create("button", `feature-button${primary ? " feature-button--primary" : ""}`, label);
    button.type = "button";
    button.addEventListener("click", () => window.PortfolioActions?.execute?.(value));
    return button;
  };

  const sectionTabs = (active) => {
    const tabs = create("nav", "portfolio-section-tabs");
    tabs.setAttribute("aria-label", "Portfolio sections");
    for (const [id, label] of [["about", "About Me"], ["projects", "Projects"], ["work", "Work With Me"]]) {
      const button = create("button", id === active ? "is-active" : "", label);
      button.type = "button";
      button.setAttribute("aria-current", id === active ? "page" : "false");
      button.addEventListener("click", () => window.PortfolioActions?.execute?.({ type: "open-about-tab", target: id }));
      tabs.append(button);
    }
    return tabs;
  };

  const linkButton = (link) => {
    if (link.action) return action(link.label, link.action);
    if (link.destination) return action(`${link.label} ↗`, { type: "open-external", target: link.destination });
    if (/^https:\/\//i.test(String(link.url || ""))) {
      const anchor = create("a", "feature-button", `${link.label} ↗`);
      anchor.href = link.url;
      anchor.target = "_blank";
      anchor.rel = "noopener noreferrer";
      return anchor;
    }
    return null;
  };

  const formatDate = (value) => {
    const date = new Date(value || 0);
    if (Number.isNaN(date.getTime())) return "Unknown";
    return new Intl.DateTimeFormat(undefined, { day: "2-digit", month: "short", year: "numeric" }).format(date);
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
      if (repository.pushedAt) work.push(`Last pushed: ${formatDate(repository.pushedAt)}`);
      const links = [{ label: "Repository", url: repository.url }];
      if (/^https:\/\//i.test(String(repository.homepage || "")) && repository.homepage !== repository.url) links.push({ label: "Project Site", url: repository.homepage });
      return {
        id: `github-lab-${String(repository.name || "repository").toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "")}`,
        name: repository.name || repository.fullName || "GitHub Lab",
        summary: repository.description || "Public GitHub laboratory repository and experimental development work.",
        status: "labs",
        category: `GitHub Lab${repository.language ? ` · ${repository.language}` : ""}`,
        technologies: technologies.length ? technologies : ["GitHub"],
        lifecycle: "labs",
        work,
        links,
        githubRepository: repository.fullName || ""
      };
    });
  };

  const renderEntry = (project) => {
    const entry = create("article", "cv-project-entry");
    const heading = create("header", "cv-project-entry__header");
    const title = create("div");
    title.append(create("h2", "", project.name), create("span", "cv-project-entry__type", project.category || "Project"));
    const lifecycleLabels = { maintained: "Maintained", legacy: "Legacy", labs: "Labs" };
    heading.append(title, create("span", `project-status project-status--${project.lifecycle}`, lifecycleLabels[project.lifecycle] || "Legacy"));

    const description = create("p", "cv-project-entry__description", project.summary || "");
    const details = create("div", "cv-project-entry__details");

    const technologies = create("section", "cv-project-entry__block");
    technologies.append(create("h3", "", "Technologies"));
    const tags = create("div", "feature-tags");
    for (const technology of project.technologies || []) tags.append(create("span", "", technology));
    technologies.append(tags);

    const workDone = create("section", "cv-project-entry__block");
    workDone.append(create("h3", "", "Work Done"));
    const workList = create("ul", "feature-list");
    for (const item of project.work || []) workList.append(create("li", "", item));
    workDone.append(workList);
    details.append(technologies, workDone);

    const links = create("div", "feature-actions cv-project-entry__links");
    for (const item of project.links || []) {
      const element = linkButton(item);
      if (element) links.append(element);
    }

    entry.append(heading, description, details);
    if (links.childElementCount) entry.append(links);
    return entry;
  };

  programs.set("projects", {
    build() {
      const app = create("div", "feature-app projects-cv-app");
      app.dataset.projectsApp = "";
      app.append(sectionTabs("projects"));

      const header = create("header", "feature-app__header projects-cv-header");
      const copy = create("div");
      copy.append(
        create("span", "feature-eyebrow", "PROJECT LIST"),
        create("h1", "", "Projects"),
        create("p", "", "Current and past work in a CV-style format. Maintained projects are separated from the legacy archive so the list can grow without changing the layout.")
      );
      header.append(copy);

      const body = create("div", "feature-app__body feature-stack");
      const filters = create("div", "feature-tabs projects-lifecycle-tabs");
      filters.setAttribute("role", "group");
      filters.setAttribute("aria-label", "Project lifecycle");
      for (const [value, label] of [["maintained", "Maintained"], ["legacy", "Legacy"], ["labs", "Labs"]]) {
        const button = create("button", "", label);
        button.type = "button";
        button.dataset.projectFilter = value;
        filters.append(button);
      }

      const list = create("div", "cv-project-list");
      list.dataset.projectList = "";
      body.append(filters, list);
      app.append(header, body);
      return app;
    },
    initialize(container) {
      const app = container.querySelector?.("[data-projects-app]") || container.closest?.("[data-projects-app]");
      if (!app) return null;
      const list = app.querySelector("[data-project-list]");
      const filters = [...app.querySelectorAll("[data-project-filter]")];
      let filter = "maintained";
      let availableProjects = [...projects];
      let githubLabsLoaded = false;
      let disposed = false;

      try {
        const stored = JSON.parse(sessionStorage.getItem(storageKey) || "null");
        if (["maintained", "legacy", "labs"].includes(stored?.filter)) filter = stored.filter;
      } catch {}

      const render = () => {
        for (const button of filters) {
          const active = button.dataset.projectFilter === filter;
          button.classList.toggle("is-active", active);
          button.setAttribute("aria-pressed", String(active));
        }
        list.replaceChildren();
        const matches = availableProjects.filter((project) => project.lifecycle === filter);
        if (!matches.length) {
          const empty = create("div", "feature-empty");
          if (filter === "labs" && !githubLabsLoaded) empty.append(create("strong", "", "Loading GitHub labs…"), create("span", "", "Public repositories are being loaded from the generated GitHub snapshot."));
          else empty.append(create("strong", "", "No projects in this section"), create("span", "", filter === "labs" ? "No eligible public GitHub lab repositories were found." : "Add a project to PORTFOLIO_DATA with the matching lifecycle value and it will appear here automatically."));
          list.append(empty);
          return;
        }
        for (const project of matches) list.append(renderEntry(project));
      };

      const setFilter = (next) => {
        filter = ["maintained", "legacy", "labs"].includes(next) ? next : "maintained";
        try { sessionStorage.setItem(storageKey, JSON.stringify({ filter })); } catch {}
        render();
      };

      const onFilter = (event) => setFilter(String(event.detail?.filter || "maintained"));
      const onOpenProject = (event) => {
        const project = availableProjects.find((item) => item.id === String(event.detail?.id || ""));
        if (project) setFilter(project.lifecycle);
      };
      for (const button of filters) button.addEventListener("click", () => setFilter(button.dataset.projectFilter));
      window.addEventListener("portfolio:projects-filter", onFilter);
      window.addEventListener("portfolio:open-project", onOpenProject);
      render();

      fetch("/github-stats.json", { cache: "no-store" }).then((response) => {
        if (!response.ok) throw new Error("GitHub labs unavailable");
        return response.json();
      }).then((snapshot) => {
        if (disposed) return;
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
        if (filter === "labs") render();
      });

      return () => {
        disposed = true;
        window.removeEventListener("portfolio:projects-filter", onFilter);
        window.removeEventListener("portfolio:open-project", onOpenProject);
      };
    }
  });
})();
