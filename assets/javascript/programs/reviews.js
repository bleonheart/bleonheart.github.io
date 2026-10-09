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
    let resizeFrame = 0;

    const renderPagination = (totalPages) => {
      if (pages) {
        pages.replaceChildren();
        for (let number = 1; number <= totalPages; number += 1) {
          const button = document.createElement("button");
          button.type = "button";
          button.textContent = String(number);
          button.setAttribute("aria-label", `Review page ${number}`);
          button.setAttribute("aria-current", number === page ? "page" : "false");
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

    const buildPages = (filtered) => {
      if (!filtered.length) return [];
      const style = getComputedStyle(list);
      const availableHeight = Math.max(0, list.clientHeight - (Number.parseFloat(style.paddingTop) || 0) - (Number.parseFloat(style.paddingBottom) || 0) - 8);
      if (availableHeight <= 0) {
        const fallback = [];
        for (let index = 0; index < filtered.length; index += 6) fallback.push(filtered.slice(index, index + 6));
        return fallback;
      }

      const filteredSet = new Set(filtered);
      for (const row of rows) row.hidden = !filteredSet.has(row);
      const gap = Number.parseFloat(style.rowGap || style.gap) || 0;
      const result = [];
      let current = [];
      let currentHeight = 0;

      for (const row of filtered) {
        const rowHeight = Math.ceil(row.getBoundingClientRect().height);
        const nextHeight = currentHeight + (current.length ? gap : 0) + rowHeight;
        if (current.length && nextHeight > availableHeight) {
          result.push(current);
          current = [row];
          currentHeight = rowHeight;
        } else {
          current.push(row);
          currentHeight = nextHeight;
        }
      }

      if (current.length) result.push(current);
      return result;
    };

    const render = () => {
      const ordered = [...rows].sort((a, b) => {
        const first = Number(a.dataset.reviewTimestamp || 0);
        const second = Number(b.dataset.reviewTimestamp || 0);
        return sortMode === "oldest" ? first - second : second - first;
      });
      const filtered = ordered.filter((row) => filter === "all" || row.dataset.reviewSentiment === filter);

      for (const row of ordered) list.append(row);

      const reviewPages = buildPages(filtered);
      const totalPages = reviewPages.length;
      page = totalPages ? Math.min(page, totalPages) : 1;
      const visible = totalPages ? reviewPages[page - 1] : [];
      const visibleSet = new Set(visible);
      const start = totalPages ? reviewPages.slice(0, page - 1).reduce((count, group) => count + group.length, 0) : 0;

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

    const scheduleRender = () => {
      if (resizeFrame) cancelAnimationFrame(resizeFrame);
      resizeFrame = requestAnimationFrame(() => {
        resizeFrame = 0;
        render();
      });
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

    let resizeObserver = null;
    if (typeof ResizeObserver === "function") {
      resizeObserver = new ResizeObserver(scheduleRender);
      resizeObserver.observe(app);
    }

    app.dataset.reviewsInitialized = "true";
    render();

    return () => {
      if (resizeFrame) cancelAnimationFrame(resizeFrame);
      resizeObserver?.disconnect();
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
