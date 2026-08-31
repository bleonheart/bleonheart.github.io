(() => {
  "use strict";

  const root = window.PORTFOLIO_ROOT || ".";
  const normalize = (value) => String(value || "").toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");

  const searchDialog = document.getElementById("search-dialog");
  const searchInput = document.getElementById("search-input");
  const searchResults = document.getElementById("search-results");
  const searchMeta = document.getElementById("search-meta");
  const searchData = Array.isArray(window.PORTFOLIO_SEARCH_DATA) ? window.PORTFOLIO_SEARCH_DATA : [];

  const addSearchResult = (entry) => {
    const link = document.createElement("a");
    link.className = "search-result";
    link.href = entry.path ? `${root}/${entry.path}` : `${root}/`;

    const title = document.createElement("span");
    title.className = "search-result-title";
    title.textContent = entry.title;

    const description = document.createElement("span");
    description.className = "search-result-description";
    description.textContent = entry.description;

    link.append(title, description);
    searchResults.append(link);
  };

  const scoreSearchEntry = (entry, tokens, phrase) => {
    const title = normalize(entry.title);
    const description = normalize(entry.description);
    const text = normalize(entry.text);
    let score = 0;

    if (title === phrase) score += 200;
    if (title.startsWith(phrase)) score += 90;
    if (title.includes(phrase)) score += 55;
    if (description.includes(phrase)) score += 22;
    if (text.includes(phrase)) score += 8;

    for (const token of tokens) {
      if (title.startsWith(token)) score += 28;
      else if (title.includes(token)) score += 18;
      if (description.includes(token)) score += 7;
      if (text.includes(token)) score += 2;
    }

    return score;
  };

  const renderSearch = (query) => {
    if (!searchResults || !searchMeta) return;
    searchResults.textContent = "";
    const phrase = normalize(String(query || "").trim());

    if (!phrase) {
      searchData.slice(0, 8).forEach(addSearchResult);
      searchMeta.textContent = "";
      return;
    }

    const tokens = phrase.split(/\s+/).filter(Boolean);
    const matches = searchData
      .map((entry) => ({ entry, score: scoreSearchEntry(entry, tokens, phrase) }))
      .filter((item) => item.score > 0)
      .sort((a, b) => b.score - a.score || a.entry.title.localeCompare(b.entry.title))
      .slice(0, 14);

    if (!matches.length) {
      const empty = document.createElement("div");
      empty.className = "search-empty";
      empty.textContent = "No matching creations found.";
      searchResults.append(empty);
      searchMeta.textContent = "0 results";
      return;
    }

    matches.forEach(({ entry }) => addSearchResult(entry));
    searchMeta.textContent = `${matches.length} result${matches.length === 1 ? "" : "s"}`;
  };

  const openSearch = () => {
    if (!searchDialog) return;
    if (typeof searchDialog.showModal === "function" && !searchDialog.open) searchDialog.showModal();
    if (searchInput) {
      searchInput.value = "";
      requestAnimationFrame(() => searchInput.focus());
    }
    renderSearch("");
  };

  const closeSearch = () => {
    if (searchDialog?.open) searchDialog.close();
  };

  document.querySelectorAll("[data-search-open]").forEach((button) => button.addEventListener("click", openSearch));
  searchInput?.addEventListener("input", () => renderSearch(searchInput.value));
  searchDialog?.addEventListener("click", (event) => {
    if (event.target !== searchDialog) return;
    const rect = searchDialog.getBoundingClientRect();
    if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) closeSearch();
  });

  document.addEventListener("keydown", (event) => {
    const active = document.activeElement;
    const typing = active && (active.tagName === "INPUT" || active.tagName === "TEXTAREA" || active.isContentEditable);

    if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === "k") {
      event.preventDefault();
      openSearch();
    } else if (event.key === "/" && !typing && !event.ctrlKey && !event.metaKey && !event.altKey) {
      event.preventDefault();
      openSearch();
    } else if (event.key === "Escape") {
      closeSearch();
    }
  });

  const copyText = async (value) => {
    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(value);
        return true;
      }

      const textarea = document.createElement("textarea");
      textarea.value = value;
      textarea.style.position = "fixed";
      textarea.style.opacity = "0";
      document.body.append(textarea);
      textarea.select();
      const copied = document.execCommand("copy");
      textarea.remove();
      return copied;
    } catch {
      return false;
    }
  };

  document.querySelectorAll("pre").forEach((pre) => {
    if (pre.closest(".code-block")) return;
    const wrapper = document.createElement("div");
    wrapper.className = "code-block";
    pre.before(wrapper);
    wrapper.append(pre);

    const button = document.createElement("button");
    button.type = "button";
    button.className = "copy-button";
    button.textContent = "Copy";
    button.addEventListener("click", async () => {
      const copied = await copyText(pre.innerText);
      button.textContent = copied ? "Copied" : "Failed";
      setTimeout(() => {
        button.textContent = "Copy";
      }, 1400);
    });
    wrapper.append(button);
  });

  document.querySelectorAll(".generator-code-output").forEach((output) => {
    const header = output.closest(".output-card")?.querySelector(".card-header");
    if (!header || header.querySelector(".output-copy")) return;

    const button = document.createElement("button");
    button.type = "button";
    button.className = "copy-button output-copy";
    button.textContent = "Copy code";
    button.addEventListener("click", async () => {
      const copied = await copyText(output.value);
      button.textContent = copied ? "Copied" : "Failed";
      setTimeout(() => {
        button.textContent = "Copy code";
      }, 1400);
    });
    header.append(button);
  });

  const creationFilter = document.getElementById("creation-filter");
  const creationCount = document.getElementById("creation-count");
  if (creationFilter) {
    const cards = [...document.querySelectorAll("#creation-library [data-creation-slug]")];
    const updateCards = () => {
      const query = normalize(creationFilter.value.trim());
      let visible = 0;

      cards.forEach((card) => {
        const matches = !query || normalize(card.dataset.searchText || card.textContent).includes(query);
        card.hidden = !matches;
        if (matches) visible += 1;
      });

      if (creationCount) creationCount.textContent = `${visible} project${visible === 1 ? "" : "s"}`;
    };

    creationFilter.addEventListener("input", updateCards);
    updateCards();
  }

  const previewDialog = document.getElementById("creation-preview");
  if (previewDialog) {
    const creations = Array.isArray(window.PORTFOLIO_CREATIONS) ? window.PORTFOLIO_CREATIONS : [];
    const bySlug = new Map(creations.map((entry) => [entry.slug, entry]));
    const title = document.getElementById("creation-preview-title");
    const description = document.getElementById("creation-preview-description");
    const features = document.getElementById("creation-preview-features");
    const video = document.getElementById("creation-preview-video");
    const media = video?.closest(".creation-preview-media");
    const fullPageLink = document.getElementById("creation-preview-link");
    let lastTrigger = null;

    const clearVideo = () => {
      if (!video) return;
      video.pause();
      video.removeAttribute("src");
      video.load();
      media?.classList.remove("has-video");
    };

    const closePreview = () => {
      if (previewDialog.open) previewDialog.close();
    };

    document.querySelectorAll("[data-creation-slug]").forEach((button) => {
      button.addEventListener("click", () => {
        const entry = bySlug.get(button.dataset.creationSlug);
        if (!entry) return;

        lastTrigger = button;
        title.textContent = entry.title;
        description.textContent = entry.description;
        features.textContent = "";

        const previewFeatures = Array.isArray(entry.features) && entry.features.length ? entry.features : [entry.description];
        previewFeatures.forEach((feature) => {
          const item = document.createElement("li");
          item.textContent = feature;
          features.append(item);
        });

        fullPageLink.href = `${root}/${entry.path}`;
        clearVideo();
        if (entry.video && video) {
          video.src = entry.video;
          media?.classList.add("has-video");
        }

        if (typeof previewDialog.showModal === "function") previewDialog.showModal();
      });
    });

    previewDialog.querySelectorAll("[data-creation-preview-close]").forEach((button) => button.addEventListener("click", closePreview));
    previewDialog.addEventListener("click", (event) => {
      if (event.target !== previewDialog) return;
      const rect = previewDialog.getBoundingClientRect();
      if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) closePreview();
    });
    previewDialog.addEventListener("close", () => {
      clearVideo();
      lastTrigger?.focus();
    });
  }

  const backToTop = document.querySelector(".back-to-top");
  const updateBackToTop = () => backToTop?.classList.toggle("visible", window.scrollY > 500);
  window.addEventListener("scroll", updateBackToTop, { passive: true });
  updateBackToTop();
  backToTop?.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));

  renderSearch("");
})();
