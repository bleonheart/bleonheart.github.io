(() => {
  "use strict";

  const programs = window.PortfolioPrograms instanceof Map ? window.PortfolioPrograms : (window.PortfolioPrograms = new Map());

  const create = (tag, className = "", text = "") => {
    const element = document.createElement(tag);
    if (className) element.className = className;
    if (text) element.textContent = text;
    return element;
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

    const coreInformation = create("section", "feature-panel");
    coreInformation.append(create("h2", "", "Core Information"));
    const coreInformationList = create("ul", "feature-list");
    for (const item of ["Immediately available", "Seeking full-time opportunities", "Prefer hybrid or remote work"]) coreInformationList.append(create("li", "", item));
    coreInformation.append(coreInformationList);
    columns.append(roles, coreInformation);

    wrapper.append(intro, columns);
    return wrapper;
  };

  const freelanceView = () => {
    const wrapper = create("div", "work-audience-view");
    const intro = create("section", "work-hero-panel");
    const heading = create("div");
    heading.append(create("span", "feature-eyebrow", "FREELANCE WORK"), create("h2", "", "Game Development · Server Infrastructure · Technical Support"));
    intro.append(heading, create("p", "", "I take game-related technical work where the scope and requirements can be clearly defined. This includes development, server setup, optimization and ongoing support."));

    const services = create("section", "work-service-grid");
    services.append(
      serviceCard("Garry's Mod Development", ["GLua development", "Framework and system work", "Existing codebase work", "Debugging and optimization", "Custom gameplay systems"]),
      serviceCard("Project Zomboid", ["Server setup and configuration", "Modded environments", "Maintenance and updates", "Troubleshooting", "Database and performance work"]),
      serviceCard("Roblox Development", ["Luau development", "Gameplay systems and scripting", "Client and server systems", "Debugging and optimization", "Existing project work"]),
      serviceCard("Unity Development", ["C# development", "Gameplay systems and tools", "UI and gameplay implementation", "Debugging and optimization", "Existing project work"]),
      serviceCard("Game Server Hosting", ["Linux server deployment", "Docker / container environments", "Pterodactyl", "SteamCMD / SRCDS", "Databases and backups", "Networking and reverse proxies"]),
      serviceCard("Custom Infrastructure", ["Migrations and optimization", "Performance problems", "Database issues", "Automation and deployment", "Ongoing technical support"])
    );

    wrapper.append(intro, services);
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
