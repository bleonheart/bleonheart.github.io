(() => {
  "use strict";

  const programs = window.PortfolioPrograms instanceof Map ? window.PortfolioPrograms : (window.PortfolioPrograms = new Map());

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

  const link = (label, href, primary = false, download = false) => {
    const anchor = create("a", `feature-button${primary ? " feature-button--primary" : ""}`, label);
    anchor.href = href;
    if (download) anchor.download = "";
    return anchor;
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

  const serviceCard = (title, items) => {
    const card = create("article", "work-service-card");
    card.append(create("h3", "", title));
    const list = create("ul", "feature-list");
    for (const item of items) list.append(create("li", "", item));
    card.append(list);
    return card;
  };

  const recruiterView = () => {
    const wrapper = create("div", "work-audience-view");
    const intro = create("section", "work-hero-panel");
    const heading = create("div");
    heading.append(create("span", "feature-eyebrow", "JOB RECRUITERS"), create("h2", "", "Linux · DevOps · IT Operations · Data / SQL · Support"));
    intro.append(heading, create("p", "", "I am primarily looking for Linux and DevOps-oriented positions, including production support, technical troubleshooting, ticket and incident resolution, and SQL/data-focused operational work. I enjoy working with infrastructure, automation and real production problems where reliability and diagnosis matter."));

    const columns = create("div", "work-columns");
    const roles = create("section", "feature-panel");
    roles.append(create("h2", "", "Roles I'm Looking For"));
    const roleList = create("ul", "feature-list");
    for (const item of ["Linux Systems Administration", "DevOps / Infrastructure", "Production Support", "Ticket / Incident Resolution", "SQL / Data Operations"]) roleList.append(create("li", "", item));
    roles.append(roleList);

    const experience = create("section", "feature-panel");
    experience.append(create("h2", "", "Core Experience"));
    const experienceList = create("ul", "feature-list");
    for (const item of ["Linux: Ubuntu, Debian, Rocky Linux, CentOS Stream", "Docker and Kubernetes", "Terraform and Ansible", "GitHub Actions, GitLab CI/CD and Jenkins", "AWS, Azure, GCP and Proxmox", "SQL, MySQL and MariaDB", "Python, Bash and PowerShell"]) experienceList.append(create("li", "", item));
    experience.append(experienceList);
    columns.append(roles, experience);

    const meta = create("div", "work-meta-grid");
    for (const [title, value] of [["Location", "Porto, Portugal"], ["Availability", "Open to appropriate remote and on-site opportunities"], ["Contact", "baratoxis@gmail.com"]]) {
      const card = create("article", "work-meta-card");
      card.append(create("strong", "", title), create("span", "", value));
      meta.append(card);
    }

    const actions = create("div", "feature-actions work-primary-actions");
    actions.append(
      link("Email Me", "mailto:baratoxis@gmail.com", true),
      action("View About Me", { type: "open-about-tab", target: "about" }),
      action("LinkedIn ↗", { type: "open-external", target: "linkedin" })
    );

    wrapper.append(intro, columns, meta, actions);
    return wrapper;
  };

  const freelanceView = () => {
    const wrapper = create("div", "work-audience-view");
    const intro = create("section", "work-hero-panel");
    const heading = create("div");
    heading.append(create("span", "feature-eyebrow", "FREELANCE WORK"), create("h2", "", "Game Development · Server Infrastructure · Technical Support"));
    intro.append(heading, create("p", "", "I take game-related technical work where the scope and requirements can be clearly defined. This includes development, server setup, optimization and ongoing support. Pricing is based on the actual work required so rates remain fair to both sides."));

    const services = create("section", "work-service-grid");
    services.append(
      serviceCard("Garry's Mod Development", ["GLua development", "Framework and system work", "Existing codebase work", "Debugging and optimization", "Custom gameplay systems"]),
      serviceCard("Project Zomboid", ["Server setup and configuration", "Modded environments", "Maintenance and updates", "Troubleshooting", "Database and performance work"]),
      serviceCard("Game Server Hosting", ["Linux server deployment", "Docker / container environments", "Pterodactyl", "SteamCMD / SRCDS", "Databases and backups", "Networking and reverse proxies"]),
      serviceCard("Custom Infrastructure", ["Migrations and optimization", "Performance problems", "Database issues", "Automation and deployment", "Ongoing technical support"])
    );

    const pricing = create("section", "work-pricing");
    pricing.append(create("h3", "", "Pricing"), create("p", "", "Quoted per project based on scope, complexity and expected support. I prefer work-specific pricing so the rate stays fair for both sides."));

    const actions = create("div", "feature-actions work-primary-actions");
    actions.append(link("Discuss a Project", "mailto:baratoxis@gmail.com?subject=Freelance%20Project", true), link("baratoxis@gmail.com", "mailto:baratoxis@gmail.com"));
    wrapper.append(intro, services, pricing, actions);
    return wrapper;
  };

  programs.set("work-with-me", {
    build() {
      const app = create("div", "feature-app work-with-me-app");
      app.append(sectionTabs("work"));

      const header = create("header", "feature-app__header");
      const copy = create("div");
      copy.append(create("span", "feature-eyebrow", "OPPORTUNITIES"), create("h1", "", "Work With Me"), create("p", "", "Choose the context that fits: professional roles or game-related freelance work."));
      header.append(copy);

      const body = create("div", "feature-app__body feature-stack");
      const tabs = create("div", "feature-tabs work-with-me-tabs");
      const content = create("div", "work-with-me-content");

      const setAudience = (audience) => {
        const selected = audience === "freelance" ? "freelance" : "recruiters";
        for (const button of tabs.querySelectorAll("button")) button.classList.toggle("is-active", button.dataset.audience === selected);
        content.replaceChildren(selected === "freelance" ? freelanceView() : recruiterView());
      };

      for (const [audience, label] of [["recruiters", "Job Recruiters"], ["freelance", "Freelance Work"]]) {
        const button = create("button", "", label);
        button.type = "button";
        button.dataset.audience = audience;
        button.addEventListener("click", () => setAudience(audience));
        tabs.append(button);
      }

      app.__setWorkAudience = setAudience;
      setAudience("recruiters");
      body.append(tabs, content);
      app.append(header, body);
      return app;
    },
    initialize(content) {
      const app = content.querySelector?.(".work-with-me-app") || content.closest?.(".work-with-me-app");
      if (!app?.__setWorkAudience) return null;
      const onAudience = (event) => app.__setWorkAudience(String(event.detail?.audience || "recruiters"));
      window.addEventListener("portfolio:work-audience", onAudience);
      return () => window.removeEventListener("portfolio:work-audience", onAudience);
    }
  });
})();
