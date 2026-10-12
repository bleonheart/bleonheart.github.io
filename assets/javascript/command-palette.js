(() => {
  "use strict";

  const dialog = document.getElementById("search-dialog");
  const input = document.getElementById("search-input");
  const results = document.getElementById("search-results");
  const meta = document.getElementById("search-meta");
  if (!dialog || !input || !results || !meta) return;

  dialog.classList.add("command-palette");
  dialog.setAttribute("aria-label", "Portfolio command palette");
  dialog.removeAttribute("aria-labelledby");
  input.placeholder = "Search projects, apps, creations, games, skills, or commands";
  input.setAttribute("aria-label", "Search portfolio commands");
  let selectedIndex = 0;
  let visibleEntries = [];

  const normalize = (value) => String(value || "").toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");

  const creationEntries = (Array.isArray(window.PORTFOLIO_SEARCH_DATA) ? window.PORTFOLIO_SEARCH_DATA : []).map((entry) => {
    const path = String(entry.path || "").replace(/^\.\//, "").replace(/\/$/, "");
    if (!path) return { id: "search-about", type: "Page", title: entry.title, description: entry.description, keywords: [entry.text], action: { type: "open-app", target: "about-me" } };
    if (path === "creations") return { id: "search-creations", type: "Application", title: entry.title, description: entry.description, keywords: [entry.text], action: { type: "open-app", target: "creations" } };
    return { id: `creation-${path}`, type: "Creation", title: entry.title, description: entry.description, keywords: [entry.text, path], action: { type: "open-creation", target: path } };
  });

  const entries = [...(Array.isArray(window.PORTFOLIO_COMMAND_ENTRIES) ? window.PORTFOLIO_COMMAND_ENTRIES : []), ...creationEntries];
  const deduped = [...new Map(entries.map((entry) => [entry.id, entry])).values()];

  const subsequence = (needle, haystack) => {
    let index = 0;
    for (const character of haystack) if (character === needle[index]) index += 1;
    return index === needle.length;
  };

  const score = (entry, query) => {
    if (!query) return entry.type === "Project" ? 25 : entry.type === "Application" ? 20 : 5;
    const title = normalize(entry.title);
    const description = normalize(entry.description);
    const keywords = normalize((entry.keywords || []).join(" "));
    const localizedTitle = normalize(window.PortfolioI18n?.t?.(entry.title, "pt") || "");
    const localizedDescription = normalize(window.PortfolioI18n?.t?.(entry.description, "pt") || "");
    const localizedKeywords = normalize((entry.keywords || []).map((value) => window.PortfolioI18n?.t?.(value, "pt") || "").join(" "));
    const haystack = `${title} ${description} ${keywords} ${localizedTitle} ${localizedDescription} ${localizedKeywords}`;
    const tokens = query.split(/\s+/).filter(Boolean);
    let value = 0;
    if (title === query || localizedTitle === query) value += 240;
    if (title.startsWith(query) || localizedTitle.startsWith(query)) value += 120;
    if (title.includes(query) || localizedTitle.includes(query)) value += 80;
    if (description.includes(query) || localizedDescription.includes(query)) value += 30;
    if (keywords.includes(query) || localizedKeywords.includes(query)) value += 24;
    for (const token of tokens) {
      if (title.startsWith(token) || localizedTitle.startsWith(token)) value += 36;
      else if (title.includes(token) || localizedTitle.includes(token)) value += 24;
      if (description.includes(token) || localizedDescription.includes(token)) value += 8;
      if (keywords.includes(token) || localizedKeywords.includes(token)) value += 7;
      if (token.length >= 3 && (subsequence(token, title) || subsequence(token, localizedTitle))) value += 5;
    }
    return haystack.includes(query) || value > 0 ? value : 0;
  };

  const activate = (entry) => {
    if (!entry) return;
    if (dialog.open) dialog.close();
    window.PortfolioActions?.execute?.(entry.action);
  };

  const updateSelection = () => {
    const buttons = [...results.querySelectorAll("[data-command-index]")];
    buttons.forEach((button, index) => {
      const active = index === selectedIndex;
      button.classList.toggle("is-selected", active);
      button.setAttribute("aria-selected", String(active));
      if (active) button.scrollIntoView({ block: "nearest" });
    });
  };

  const render = (queryValue = "") => {
    const query = normalize(queryValue.trim());
    visibleEntries = deduped.map((entry) => ({ entry, score: score(entry, query) })).filter((item) => item.score > 0).sort((a, b) => b.score - a.score || a.entry.title.localeCompare(b.entry.title)).slice(0, 16).map((item) => item.entry);
    selectedIndex = Math.min(selectedIndex, Math.max(0, visibleEntries.length - 1));
    results.replaceChildren();
    for (const [index, entry] of visibleEntries.entries()) {
      const button = document.createElement("button");
      button.type = "button";
      button.className = "command-result";
      button.dataset.commandIndex = String(index);
      button.setAttribute("role", "option");
      const icon = document.createElement("span");
      icon.className = "command-result__icon";
      const iconData = entry.icon || {};
      if ((iconData.type === "local" || iconData.type === "remote" || iconData.type === "image") && iconData.src) {
        const image = document.createElement("img");
        image.src = iconData.src;
        image.alt = "";
        image.addEventListener("error", () => { image.src = "/assets/icons/fallback.svg"; }, { once: true });
        icon.append(image);
      } else if (iconData.type === "generated") {
        icon.textContent = String(iconData.glyph || entry.title || "?").slice(0, 2).toUpperCase();
      } else {
        icon.textContent = String(entry.type || "I").slice(0, 1).toUpperCase();
      }
      const type = document.createElement("span");
      type.className = "command-result__type";
      type.textContent = entry.type || "Item";
      const copy = document.createElement("span");
      copy.className = "command-result__copy";
      const title = document.createElement("strong");
      title.textContent = entry.title;
      const description = document.createElement("span");
      description.textContent = entry.description || "";
      copy.append(title, description);
      const action = document.createElement("span");
      action.className = "command-result__action";
      action.textContent = entry.type === "External" ? "Open ↗" : "Open";
      button.append(icon, type, copy, action);
      button.addEventListener("click", () => activate(entry));
      button.addEventListener("pointerenter", () => { selectedIndex = index; updateSelection(); });
      results.append(button);
    }
    if (!visibleEntries.length) {
      const empty = document.createElement("div");
      empty.className = "search-empty";
      empty.textContent = "No matching portfolio item.";
      results.append(empty);
    }
    meta.textContent = query ? `${visibleEntries.length} result${visibleEntries.length === 1 ? "" : "s"} · ↑↓ navigate · Enter open · Esc close` : "Featured commands · ↑↓ navigate · Enter open · Esc close";
    updateSelection();
  };

  const open = (query = "") => {
    if (!dialog.open && typeof dialog.showModal === "function") dialog.showModal();
    input.value = String(query || "");
    selectedIndex = 0;
    render(input.value);
    requestAnimationFrame(() => input.focus({ preventScroll: true }));
  };

  input.addEventListener("input", (event) => {
    event.stopImmediatePropagation();
    selectedIndex = 0;
    render(input.value);
  }, true);

  input.addEventListener("keydown", (event) => {
    if (event.key === "ArrowDown") {
      event.preventDefault();
      selectedIndex = Math.min(visibleEntries.length - 1, selectedIndex + 1);
      updateSelection();
    } else if (event.key === "ArrowUp") {
      event.preventDefault();
      selectedIndex = Math.max(0, selectedIndex - 1);
      updateSelection();
    } else if (event.key === "Enter") {
      event.preventDefault();
      activate(visibleEntries[selectedIndex]);
    }
  });

  document.addEventListener("keydown", (event) => {
    const active = document.activeElement;
    const typing = active && (active.tagName === "INPUT" || active.tagName === "TEXTAREA" || active.isContentEditable);
    if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === "k" && (!typing || active === input)) {
      event.preventDefault();
      event.stopImmediatePropagation();
      open();
    } else if (event.key === "Escape" && dialog.open) {
      event.preventDefault();
      event.stopImmediatePropagation();
      dialog.close();
    }
  }, true);

  window.PortfolioCommandPalette = { open, render };
})();
