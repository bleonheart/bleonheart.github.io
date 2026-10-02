(() => {
  "use strict";

  const data = window.PORTFOLIO_DATA || { destinations: {}, games: [] };
  const trustedDestinations = data.destinations || {};

  const desktop = () => window.PortfolioDesktop || null;

  const unavailable = (target) => {
    window.dispatchEvent(new CustomEvent("portfolio:notice", { detail: { message: `${trustedDestinations[target]?.label || target} is not configured yet.` } }));
    return false;
  };

  const openExternal = (target) => {
    const destination = trustedDestinations[target];
    const url = String(destination?.url || "").trim();
    if (!/^https:\/\//i.test(url)) return unavailable(target);
    window.open(url, "_blank", "noopener,noreferrer");
    return true;
  };

  const openProject = (target) => {
    if (!desktop()?.openApplication?.("about-me")) return false;
    requestAnimationFrame(() => {
      window.dispatchEvent(new CustomEvent("portfolio:about-tab", { detail: { target: "projects" } }));
      requestAnimationFrame(() => window.dispatchEvent(new CustomEvent("portfolio:open-project", { detail: { id: target } })));
    });
    return true;
  };

  const openProjectsFilter = (target) => {
    if (!desktop()?.openApplication?.("about-me")) return false;
    requestAnimationFrame(() => {
      window.dispatchEvent(new CustomEvent("portfolio:about-tab", { detail: { target: "projects" } }));
      requestAnimationFrame(() => window.dispatchEvent(new CustomEvent("portfolio:projects-filter", { detail: { filter: target } })));
    });
    return true;
  };

  const openAboutDestination = (target) => {
    const application = "about-me";
    if (!desktop()?.openApplication?.(application)) return false;
    requestAnimationFrame(() => window.dispatchEvent(new CustomEvent("portfolio:about-tab", { detail: { target } })));
    return true;
  };

  const openWorkAudience = (target) => {
    if (!desktop()?.openApplication?.("about-me")) return false;
    requestAnimationFrame(() => {
      window.dispatchEvent(new CustomEvent("portfolio:about-tab", { detail: { target: "work" } }));
      requestAnimationFrame(() => window.dispatchEvent(new CustomEvent("portfolio:work-audience", { detail: { audience: target } })));
    });
    return true;
  };

  const execute = (action) => {
    if (!action || typeof action !== "object") return false;
    const target = String(action.target || "");
    if (action.type === "open-app" && target === "projects") return openAboutDestination("projects");
    if (action.type === "open-app" && target === "work-with-me") return openAboutDestination("work");
    if (action.type === "open-app") return Boolean(desktop()?.openApplication?.(target));
    if (action.type === "open-about-tab") return openAboutDestination(target);
    if (action.type === "open-work-audience") return openWorkAudience(target);
    if (action.type === "open-project") return openProject(target);
    if (action.type === "open-projects-filter") return openProjectsFilter(target);
    if (action.type === "open-creation") return Boolean(desktop()?.openCreation?.(target));
    if (action.type === "launch-game") return Boolean(desktop()?.openApplication?.(target));
    if (action.type === "open-external") return openExternal(target);
    if (action.type === "random-game") {
      const games = Array.isArray(data.games) ? data.games : [];
      if (!games.length) return false;
      const game = games[Math.floor(Math.random() * games.length)];
      return Boolean(desktop()?.openApplication?.(game.id));
    }
    if (action.type === "search") {
      window.PortfolioCommandPalette?.open?.(target);
      return true;
    }
    return false;
  };

  window.PortfolioActions = { execute, openExternal, openProject, openProjectsFilter };
})();
