(() => {
  "use strict";

  const programs = window.PortfolioPrograms instanceof Map ? window.PortfolioPrograms : (window.PortfolioPrograms = new Map());

  function initialize(container, api) {
    const app = container.querySelector(".recycle-bin-app");
    if (!app) return null;
    const browser = api.applications.get("ai-browser");

    const openTarget = () => {
      if (browser?.url) window.open(browser.url, "_blank", "noopener,noreferrer");
    };

    const updateDetails = (item) => {
      const details = app.querySelector("[data-recycle-details]");
      const icon = app.querySelector("[data-recycle-details-icon]");
      const title = app.querySelector("[data-recycle-details-title]");
      const description = app.querySelector("[data-recycle-details-description]");
      const sourceIcon = item?.querySelector("img");
      if (icon && sourceIcon) icon.src = sourceIcon.src;
      if (title) title.textContent = item?.querySelector("span")?.textContent || "Program";
      if (description) description.textContent = item?.dataset.description || "Select a program to view its description.";
      if (details) details.hidden = false;
      app.classList.add("has-details");
    };

    const clearSelection = () => {
      for (const item of app.querySelectorAll("[data-recycle-ai]")) item.classList.remove("is-selected");
      const details = app.querySelector("[data-recycle-details]");
      if (details) details.hidden = true;
      app.classList.remove("has-details");
    };

    const selectItem = (item) => {
      const grid = item?.closest("[data-recycle-grid]");
      for (const candidate of grid?.querySelectorAll("[data-recycle-ai]") || []) candidate.classList.toggle("is-selected", candidate === item);
      updateDetails(item);
      item?.focus({ preventScroll: true });
    };

    const onClick = (event) => {
      const item = event.target instanceof Element ? event.target.closest("[data-recycle-ai]") : null;
      if (item) {
        selectItem(item);
        return;
      }
      const open = event.target instanceof Element ? event.target.closest("[data-recycle-details-open]") : null;
      if (open) {
        openTarget();
        return;
      }
      const grid = event.target instanceof Element ? event.target.closest("[data-recycle-grid]") : null;
      if (grid) clearSelection();
    };

    const onDoubleClick = (event) => {
      const item = event.target instanceof Element ? event.target.closest("[data-recycle-ai]") : null;
      if (!item) return;
      selectItem(item);
      openTarget();
    };

    const onKeyDown = (event) => {
      const item = event.target instanceof Element ? event.target.closest("[data-recycle-ai]") : null;
      if (!item) return;
      if (event.key === "Enter") {
        event.preventDefault();
        selectItem(item);
        openTarget();
        return;
      }
      if (event.key === " ") {
        event.preventDefault();
        selectItem(item);
      }
    };

    app.addEventListener("click", onClick);
    app.addEventListener("dblclick", onDoubleClick);
    app.addEventListener("keydown", onKeyDown);

    return () => {
      app.removeEventListener("click", onClick);
      app.removeEventListener("dblclick", onDoubleClick);
      app.removeEventListener("keydown", onKeyDown);
    };
  }

  programs.set("recycle-bin", {
    build(application, api) {
      return api.buildTemplateContent(application);
    },
    initialize
  });
})();
