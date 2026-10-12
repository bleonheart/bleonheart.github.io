(() => {
  "use strict";

  const programs = window.PortfolioPrograms instanceof Map ? window.PortfolioPrograms : (window.PortfolioPrograms = new Map());

  function initialize(container) {
    const app = container.querySelector("[data-reviews-app]");
    if (!app || app.dataset.reviewsInitialized === "true") return null;
    const list = app.querySelector("[data-review-list]");
    const status = app.querySelector("[data-review-status]");
    const sort = app.querySelector("[data-review-sort]");
    const filters = [...app.querySelectorAll("[data-review-filter]")];
    const pages = app.querySelector("[data-review-pages]");
    const previous = app.querySelector('[data-review-page="previous"]');
    const next = app.querySelector('[data-review-page="next"]');
    if (!list) return null;

    const rows = [...list.querySelectorAll("[data-review-sentiment]")];
    let filter = "all";
    let sortMode = sort?.value || "recent";
    let page = 1;
    const reviewsPerPage = 6;

    const renderPagination = (totalPages) => {
      if (pages) {
        pages.replaceChildren();
        const first = Math.max(1, Math.min(page - 3, totalPages - 6));
        const last = Math.min(totalPages, first + 6);
        for (let number = first; number <= last; number += 1) {
          const button = document.createElement("button");
          button.type = "button";
          button.textContent = String(number);
          button.setAttribute("aria-label", `Review page ${number}`);
          if (number === page) button.setAttribute("aria-current", "page");
          button.addEventListener("click", () => {
            page = number;
            render();
          });
          pages.append(button);
        }
      }
      if (previous) previous.disabled = page <= 1;
      if (next) next.disabled = totalPages === 0 || page >= totalPages;
    };

    const render = () => {
      const ordered = [...rows].sort((a, b) => {
        const first = Number(a.dataset.reviewTimestamp || 0);
        const second = Number(b.dataset.reviewTimestamp || 0);
        return sortMode === "oldest" ? first - second : second - first;
      });
      const filtered = ordered.filter((row) => filter === "all" || row.dataset.reviewSentiment === filter);

      for (const row of ordered) list.append(row);

      const totalPages = Math.ceil(filtered.length / reviewsPerPage);
      page = totalPages ? Math.max(1, Math.min(page, totalPages)) : 1;
      const start = (page - 1) * reviewsPerPage;
      const visible = filtered.slice(start, start + reviewsPerPage);
      const visibleSet = new Set(visible);

      for (const row of ordered) row.hidden = !visibleSet.has(row);

      for (const button of filters) {
        const active = button.dataset.reviewFilter === filter;
        button.classList.toggle("is-active", active);
        button.setAttribute("aria-pressed", String(active));
      }

      if (status) status.textContent = filtered.length ? `Showing ${start + 1}–${start + visible.length} of ${filtered.length} reviews` : "No reviews found";
      renderPagination(totalPages);
      list.scrollTop = 0;
    };

    for (const button of filters) {
      button.addEventListener("click", () => {
        filter = button.dataset.reviewFilter || "all";
        page = 1;
        render();
      });
    }

    sort?.addEventListener("change", () => {
      sortMode = sort.value === "oldest" ? "oldest" : "recent";
      page = 1;
      render();
    });

    previous?.addEventListener("click", () => {
      if (page > 1) {
        page -= 1;
        render();
      }
    });

    next?.addEventListener("click", () => {
      page += 1;
      render();
    });

    app.dataset.reviewsInitialized = "true";
    render();

    return () => {
      delete app.dataset.reviewsInitialized;
    };
  }

  programs.set("about", {
    build(application, api) {
      return api.buildTemplateContent(application);
    },
    initialize
  });
})();
