(() => {
  "use strict";

  const programs = window.PortfolioPrograms instanceof Map ? window.PortfolioPrograms : (window.PortfolioPrograms = new Map());
  const data = window.PORTFOLIO_DATA || { destinations: {}, projects: [] };

  const create = (tag, className = "", text = "") => {
    const element = document.createElement(tag);
    if (className) element.className = className;
    if (text) element.textContent = text;
    return element;
  };

  const buildDestination = (application, destinationId, projectId = "") => {
    const destination = data.destinations?.[destinationId] || { label: application.label, url: "" };
    const project = projectId ? data.projects?.find((item) => item.id === projectId) : null;
    const configured = /^https:\/\//i.test(String(destination.url || ""));
    const app = create("div", "destination-app feature-app");
    const card = create("section", "destination-card");
    const eyebrow = project ? project.category : "EXTERNAL DESTINATION";
    card.append(create("span", "feature-eyebrow", eyebrow), create("h1", "", project?.name || destination.label), create("p", "", project?.summary || "This destination is integrated into the portfolio's shared navigation layer."));
    const state = create("div", `destination-state${configured ? " is-configured" : ""}`);
    state.append(create("strong", "", configured ? "Destination configured" : "Destination not configured"), create("span", "", configured ? destination.url : "No verified URL was present in the supplied repositories, so no URL has been guessed."));
    const actions = create("div", "feature-actions");
    const open = create("button", "feature-button feature-button--primary", configured ? `Open ${destination.label} ↗` : "URL not configured");
    open.type = "button";
    open.disabled = !configured;
    open.addEventListener("click", () => window.PortfolioActions?.execute?.({ type: "open-external", target: destinationId }));
    actions.append(open);
    if (project) {
      const study = create("button", "feature-button", "Open project case study");
      study.type = "button";
      study.addEventListener("click", () => window.PortfolioActions?.execute?.({ type: "open-project", target: project.id }));
      actions.append(study);
    }
    card.append(state, actions);
    app.append(card);
    return app;
  };

})();
