(() => {
  const root = document.querySelector("[data-desktop-shell]");
  if (!root) return;

  const registryElement = document.getElementById("portfolio-app-registry");
  if (!registryElement) return;

  let registry;
  try {
    registry = JSON.parse(registryElement.textContent || "[]");
  } catch {
    return;
  }

  const applications = new Map(registry.map((application) => [application.id, application]));
  const desktop = root.querySelector("[data-desktop-workspace]");
  const shortcuts = root.querySelector("[data-desktop-shortcuts]");
  const taskbar = root.querySelector("[data-taskbar-apps]");
  const startButton = root.querySelector("[data-start-button]");
  const startMenu = root.querySelector("[data-start-menu]");
  const startPrograms = root.querySelector("[data-start-programs]");
  const clock = root.querySelector("[data-desktop-clock]");
  const settingsButton = root.querySelector("[data-settings-toggle]");
  const settingsPanel = root.querySelector("[data-settings-panel]");
  const settingsClose = root.querySelector("[data-settings-close]");
  const wallpaperToggle = root.querySelector("[data-setting-wallpaper]");
  const musicToggle = root.querySelector("[data-setting-music]");
  const musicVolume = root.querySelector("[data-setting-volume]");
  const musicVolumeOutput = root.querySelector("[data-setting-volume-output]");
  const startupOverlay = root.querySelector("[data-page-startup]");
  const startupStatus = root.querySelector("[data-page-startup-status]");
  const windows = new Map();
  const stateKey = "samael.desktop.state.v2";
  const preferenceKey = "samael.desktop.preferences.v1";
  const themes = ["subtle", "medium", "heavy"];
  let zIndex = 30;
  const selectedShortcuts = new Set();
  let audioContext = null;
  let uiAudioEnabled = false;
  let state = readState();
  let preferences = readPreferences();

  function runPageStartup() {
    if (!startupOverlay) {
      root.classList.remove("is-page-starting");
      root.classList.add("is-page-ready");
      return;
    }

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const duration = 5500;
    const leaveDuration = reducedMotion ? 220 : 920;
    const statuses = [
      [0, "Preparing the desktop"],
      [0.24, "Organizing the pudding files"],
      [0.5, "Restoring your workspace"],
      [0.76, "Polishing the windows"],
      [0.92, "Desktop ready"]
    ];
    const timers = [];
    let finished = false;

    const finish = () => {
      if (finished) return;
      finished = true;
      for (const timer of timers) clearTimeout(timer);
      root.classList.add("is-page-ready");
      root.classList.remove("is-page-starting");
      startupOverlay.classList.add("is-leaving");
      setTimeout(() => startupOverlay.remove(), leaveDuration);
    };

    for (const [ratio, text] of statuses) {
      timers.push(setTimeout(() => {
        if (startupStatus) startupStatus.textContent = text;
      }, Math.round(duration * ratio)));
    }

    timers.push(setTimeout(finish, duration));
    startupOverlay.tabIndex = -1;
    startupOverlay.focus({ preventScroll: true });
  }

  function readState() {
    try {
      const value = JSON.parse(sessionStorage.getItem(stateKey) || "null");
      return value && typeof value === "object" ? value : { windows: {} };
    } catch {
      return { windows: {} };
    }
  }

  function saveState() {
    try {
      sessionStorage.setItem(stateKey, JSON.stringify(state));
    } catch {}
  }

  function readPreferences() {
    const defaults = { wallpaper: false, musicEnabled: false, musicVolume: 0.12 };
    try {
      const stored = JSON.parse(localStorage.getItem(preferenceKey) || "null");
      if (!stored || typeof stored !== "object") return defaults;
      return {
        wallpaper: Boolean(stored.wallpaper),
        musicEnabled: Boolean(stored.musicEnabled),
        musicVolume: clamp(Number(stored.musicVolume), 0, 1)
      };
    } catch {
      return defaults;
    }
  }

  function savePreferences() {
    try { localStorage.setItem(preferenceKey, JSON.stringify(preferences)); } catch {}
  }

  function iconElement(application, className = "") {
    const icon = application.icon || {};
    if (icon.type === "generated") {
      const generated = document.createElement("span");
      generated.className = `${className} generated-app-icon`.trim();
      generated.setAttribute("aria-hidden", "true");
      generated.textContent = String(icon.glyph || application.label || "?").slice(0, 2).toUpperCase();
      return generated;
    }
    const image = document.createElement("img");
    image.alt = "";
    image.className = `${className}${application.id === "lilia" ? " app-icon--lilia" : ""}`.trim();
    image.decoding = "async";
    image.src = icon.src || "./assets/icons/fallback.svg";
    image.addEventListener("error", () => {
      if (!image.src.endsWith("/assets/icons/fallback.svg")) image.src = "./assets/icons/fallback.svg";
    }, { once: true });
    return image;
  }

  function renderRegistry() {
    shortcuts.replaceChildren();
    startPrograms.replaceChildren();
    const categoryLabels = { portfolio: "Portfolio", system: "System", games: "Games" };
    let activeCategory = null;
    for (const application of registry) {
      if (application.desktopShortcut !== false) {
        const shortcut = document.createElement("button");
        shortcut.type = "button";
        shortcut.className = "desktop-shortcut";
        shortcut.dataset.appId = application.id;
        shortcut.dataset.description = application.description || application.windowTitle || "Portfolio program";
        shortcut.setAttribute("aria-label", `Open ${application.label}: ${shortcut.dataset.description}`);
        shortcut.setAttribute("aria-pressed", "false");
        shortcut.title = shortcut.dataset.description;
        shortcut.append(iconElement(application, "desktop-shortcut__icon"));
        const label = document.createElement("span");
        label.className = "desktop-shortcut__label";
        label.textContent = application.label;
        shortcut.append(label);
        shortcuts.append(shortcut);
      }

      if (application.startMenu !== false) {
        const category = application.category || "portfolio";
        if (category !== activeCategory) {
          activeCategory = category;
          const heading = document.createElement("div");
          heading.className = "start-menu__group-heading";
          heading.textContent = categoryLabels[category] || category;
          startPrograms.append(heading);
        }
        const item = document.createElement("button");
        item.type = "button";
        item.className = "start-menu__program";
        item.dataset.appId = application.id;
        item.append(iconElement(application, "start-menu__icon"));
        const copy = document.createElement("span");
        const label = document.createElement("strong");
        label.textContent = application.label;
        const description = document.createElement("small");
        description.textContent = application.description || application.windowTitle || "Portfolio program";
        copy.append(label, description);
        item.append(copy);
        startPrograms.append(item);
      }
    }
  }

  function clamp(value, minimum, maximum) {
    return Math.min(Math.max(value, minimum), Math.max(minimum, maximum));
  }

  function unlockUiAudio() {
    if (uiAudioEnabled) return;
    uiAudioEnabled = true;
    const AudioContextClass = window.AudioContext || window.webkitAudioContext;
    if (!AudioContextClass) return;
    try {
      audioContext = audioContext || new AudioContextClass();
      if (audioContext.state === "suspended") audioContext.resume().catch(() => {});
    } catch {}
  }

  function playUiSound(type) {
    if (!uiAudioEnabled) return;
    const AudioContextClass = window.AudioContext || window.webkitAudioContext;
    if (!AudioContextClass) return;
    try {
      audioContext = audioContext || new AudioContextClass();
      const context = audioContext;
      if (context.state === "suspended") context.resume().catch(() => {});
      const sounds = {
        select: [620, 0.085, 0.045],
        open: [470, 0.115, 0.09],
        close: [330, 0.105, 0.08],
        minimize: [390, 0.095, 0.07],
        maximize: [560, 0.1, 0.075],
        menu: [520, 0.08, 0.055],
        drag: [280, 0.06, 0.045],
        drop: [410, 0.075, 0.055],
        toggle: [700, 0.08, 0.05]
      };
      const [frequency, volume, duration] = sounds[type] || sounds.select;
      const oscillator = context.createOscillator();
      const gain = context.createGain();
      const now = context.currentTime;
      oscillator.type = type === "close" || type === "minimize" ? "triangle" : "sine";
      oscillator.frequency.setValueAtTime(frequency, now);
      if (type === "open" || type === "maximize") oscillator.frequency.exponentialRampToValueAtTime(frequency * 1.24, now + duration);
      if (type === "close" || type === "minimize") oscillator.frequency.exponentialRampToValueAtTime(Math.max(120, frequency * 0.72), now + duration);
      gain.gain.setValueAtTime(0.0001, now);
      gain.gain.exponentialRampToValueAtTime(volume, now + 0.006);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + duration);
      oscillator.connect(gain);
      gain.connect(context.destination);
      oscillator.start(now);
      oscillator.stop(now + duration + 0.01);
    } catch {}
  }

  function rectanglesIntersect(first, second) {
    return first.left < second.right && first.right > second.left && first.top < second.bottom && first.bottom > second.top;
  }

  function setShortcutSelected(shortcut, selected) {
    shortcut.classList.toggle("is-selected", selected);
    shortcut.setAttribute("aria-pressed", String(selected));
    if (selected) selectedShortcuts.add(shortcut);
    else selectedShortcuts.delete(shortcut);
  }

  function clearShortcutSelection() {
    for (const shortcut of [...selectedShortcuts]) setShortcutSelected(shortcut, false);
  }

  const dragClickSuppression = new WeakMap();

  function suppressDragClick(item) {
    dragClickSuppression.set(item, performance.now() + 420);
  }

  function consumeDragClick(item) {
    const expires = dragClickSuppression.get(item) || 0;
    if (expires <= performance.now()) {
      dragClickSuppression.delete(item);
      return false;
    }
    dragClickSuppression.delete(item);
    return true;
  }

  function bindSimulatedItemDragging(container, selector, getSelectedItems, selectExclusive) {
    container.addEventListener("pointerdown", (event) => {
      if (event.button !== 0 || !event.isPrimary || window.matchMedia("(max-width: 700px)").matches) return;
      if (!(event.target instanceof Element)) return;
      const source = event.target.closest(selector);
      if (!source || !container.contains(source)) return;

      const pointerId = event.pointerId;
      const startX = event.clientX;
      const startY = event.clientY;
      let dragItems = getSelectedItems();
      let dragging = false;
      let lastX = 0;
      let lastY = 0;
      let frame = 0;

      const render = () => {
        frame = 0;
        for (const item of dragItems) {
          item.style.setProperty("--sim-drag-x", `${lastX}px`);
          item.style.setProperty("--sim-drag-y", `${lastY}px`);
        }
      };

      const move = (moveEvent) => {
        if (moveEvent.pointerId !== pointerId) return;
        const deltaX = moveEvent.clientX - startX;
        const deltaY = moveEvent.clientY - startY;
        if (!dragging && Math.hypot(deltaX, deltaY) < 14) return;

        if (!dragging) {
          dragging = true;
          if (!dragItems.includes(source)) {
            selectExclusive(source);
            dragItems = getSelectedItems();
          }
          if (!dragItems.length) dragItems = [source];
          container.classList.add("is-simulating-item-drag");
          for (const item of dragItems) {
            item.classList.remove("is-dropping");
            item.classList.add("is-simulated-dragging");
          }
          playUiSound("drag");
        }

        moveEvent.preventDefault();
        lastX = deltaX;
        lastY = deltaY;
        if (!frame) frame = requestAnimationFrame(render);
      };

      const cleanup = () => {
        window.removeEventListener("pointermove", move, true);
        window.removeEventListener("pointerup", end, true);
        window.removeEventListener("pointercancel", end, true);
        window.removeEventListener("blur", cancel);
      };

      const finish = () => {
        if (frame) {
          cancelAnimationFrame(frame);
          render();
        }
        if (!dragging) return;

        container.classList.remove("is-simulating-item-drag");
        suppressDragClick(source);
        for (const item of dragItems) {
          item.classList.remove("is-simulated-dragging");
          item.classList.add("is-dropping");
          item.style.setProperty("--sim-drag-x", "0px");
          item.style.setProperty("--sim-drag-y", "0px");
        }
        playUiSound("drop");

        setTimeout(() => {
          for (const item of dragItems) {
            item.classList.remove("is-dropping");
            item.style.removeProperty("--sim-drag-x");
            item.style.removeProperty("--sim-drag-y");
          }
        }, 170);
      };

      const end = (endEvent) => {
        if (endEvent.pointerId !== pointerId) return;
        cleanup();
        finish();
      };

      const cancel = () => {
        cleanup();
        finish();
      };

      window.addEventListener("pointermove", move, true);
      window.addEventListener("pointerup", end, true);
      window.addEventListener("pointercancel", end, true);
      window.addEventListener("blur", cancel, { once: true });
    });
  }

  function getWorkspaceBounds() {
    return desktop.getBoundingClientRect();
  }

  function getLaunchGeometry(application) {
    const bounds = getWorkspaceBounds();
    const availableWidth = Math.max(320, bounds.width - 24);
    const availableHeight = Math.max(240, bounds.height - 24);
    const targetWidth = Math.min(1380, Math.max(900, bounds.width - (bounds.width >= 1500 ? 360 : 240)));
    const targetHeight = Math.min(820, Math.max(620, bounds.height - (bounds.height >= 900 ? 150 : 100)));
    const width = clamp(targetWidth, Number(application.minWidth || 360), availableWidth);
    const height = clamp(targetHeight, Number(application.minHeight || 260), availableHeight);
    return {
      x: Math.max(0, Math.round((bounds.width - width) / 2)),
      y: Math.max(0, Math.round((bounds.height - height) / 2)),
      width,
      height
    };
  }

  function getRestoredGeometry(application) {
    const bounds = getWorkspaceBounds();
    const saved = state.windows?.[application.id] || {};
    const launch = getLaunchGeometry(application);
    const width = clamp(Number(saved.width ?? launch.width), Number(application.minWidth || 360), Math.max(320, bounds.width - 16));
    const height = clamp(Number(saved.height ?? launch.height), Number(application.minHeight || 260), Math.max(240, bounds.height - 16));
    const x = saved.x === undefined ? Math.round((bounds.width - width) / 2) : clamp(Number(saved.x), 0, Math.max(0, bounds.width - width - 8));
    const y = saved.y === undefined ? Math.round((bounds.height - height) / 2) : clamp(Number(saved.y), 0, Math.max(0, bounds.height - height - 8));
    return { x: Math.max(0, x), y: Math.max(0, y), width, height };
  }

  function persistWindow(entry) {
    if (!state.windows) state.windows = {};
    const geometry = entry.maximized && entry.restoreGeometry ? entry.restoreGeometry : {
      x: Number.parseFloat(entry.element.style.left) || 0,
      y: Number.parseFloat(entry.element.style.top) || 0,
      width: Number.parseFloat(entry.element.style.width) || entry.element.offsetWidth,
      height: Number.parseFloat(entry.element.style.height) || entry.element.offsetHeight
    };
    state.windows[entry.application.id] = {
      open: true,
      minimized: entry.minimized,
      maximized: entry.maximized,
      ...geometry
    };
    state.lastActive = entry.application.id;
    saveState();
  }

  function applyGeometry(entry, geometry) {
    entry.element.style.left = `${geometry.x}px`;
    entry.element.style.top = `${geometry.y}px`;
    entry.element.style.width = `${geometry.width}px`;
    entry.element.style.height = `${geometry.height}px`;
  }

  function setActive(entry) {
    if (!entry || entry.minimized) return;
    zIndex += 1;
    for (const current of windows.values()) {
      current.element.classList.toggle("is-active", current === entry);
      current.taskbarButton?.classList.toggle("is-active", current === entry);
    }
    entry.element.style.zIndex = String(zIndex);
    state.lastActive = entry.application.id;
    saveState();
  }

  function createTitlebarButton(label, action, symbol) {
    const button = document.createElement("button");
    button.type = "button";
    button.className = `desktop-window__control desktop-window__control--${action}`;
    button.dataset.windowAction = action;
    button.setAttribute("aria-label", label);
    button.textContent = symbol;
    return button;
  }

  function createTaskbarButton(entry) {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "taskbar-app";
    button.dataset.appId = entry.application.id;
    button.append(iconElement(entry.application, "taskbar-app__icon"));
    const label = document.createElement("span");
    label.textContent = entry.application.label;
    button.append(label);
    taskbar.append(button);
    entry.taskbarButton = button;
  }

  function getEmbeddableExternalUrl(rawUrl) {
    try {
      const url = new URL(rawUrl);
      const host = url.hostname.toLowerCase().replace(/^www\./, "");
      let videoId = "";
      if (host === "youtube.com" || host === "m.youtube.com") {
        if (url.pathname === "/watch") videoId = url.searchParams.get("v") || "";
        else if (url.pathname.startsWith("/shorts/")) videoId = url.pathname.split("/")[2] || "";
        else if (url.pathname.startsWith("/embed/")) return rawUrl;
      } else if (host === "youtu.be") {
        videoId = url.pathname.split("/").filter(Boolean)[0] || "";
      }
      if (videoId && /^[A-Za-z0-9_-]{6,}$/.test(videoId)) {
        return `https://www.youtube-nocookie.com/embed/${encodeURIComponent(videoId)}?rel=0`;
      }
    } catch {}
    return rawUrl;
  }

  function buildExternalBrowser(application) {
    const shell = document.createElement("div");
    shell.className = "legacy-browser";
    const embeddedUrl = getEmbeddableExternalUrl(application.url);
    const toolbar = document.createElement("div");
    toolbar.className = "legacy-browser__toolbar";
    const controls = document.createElement("div");
    controls.className = "legacy-browser__controls";
    for (const [label, symbol] of [["Back", "←"], ["Forward", "→"], ["Refresh", "↻"], ["Home", "⌂"]]) {
      const button = document.createElement("button");
      button.type = "button";
      button.textContent = symbol;
      button.title = label;
      button.setAttribute("aria-label", label);
      if (label === "Back" || label === "Forward") button.disabled = true;
      controls.append(button);
      if (label === "Refresh") button.addEventListener("click", () => iframe.src = embeddedUrl);
      if (label === "Home") button.addEventListener("click", () => iframe.src = embeddedUrl);
    }
    const address = document.createElement("input");
    address.type = "text";
    address.className = "legacy-browser__address";
    address.value = application.url;
    address.readOnly = true;
    address.setAttribute("aria-label", "Address");
    const external = document.createElement("a");
    external.className = "legacy-browser__external";
    external.href = application.url;
    external.target = "_blank";
    external.rel = "noopener noreferrer";
    external.textContent = "Open in browser";
    toolbar.append(controls, address, external);

    const content = document.createElement("div");
    content.className = "legacy-browser__content";
    const iframe = document.createElement("iframe");
    iframe.className = "legacy-browser__frame";
    iframe.title = application.windowTitle || application.label;
    iframe.src = embeddedUrl;
    iframe.referrerPolicy = "strict-origin-when-cross-origin";
    iframe.allow = "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share; fullscreen";
    iframe.allowFullscreen = true;
    iframe.setAttribute("sandbox", "allow-scripts allow-same-origin allow-forms allow-popups allow-popups-to-escape-sandbox");
    const loading = document.createElement("div");
    loading.className = "legacy-browser__loading";
    const loadingTitle = document.createElement("strong");
    loadingTitle.textContent = application.windowTitle || application.label;
    const loadingStatus = document.createElement("span");
    loadingStatus.textContent = "Loading page…";
    const loadingLink = document.createElement("a");
    loadingLink.href = application.url;
    loadingLink.target = "_blank";
    loadingLink.rel = "noopener noreferrer";
    loadingLink.textContent = "Open page externally";
    loading.append(loadingTitle, loadingStatus, loadingLink);
    iframe.addEventListener("load", () => loading.hidden = true);
    iframe.addEventListener("error", () => {
      loading.hidden = false;
      loadingStatus.textContent = "The embedded page could not be displayed.";
    });
    content.append(iframe, loading);

    const status = document.createElement("div");
    status.className = "legacy-browser__status";
    status.textContent = `Internet · ${new URL(application.url).host}`;
    shell.append(toolbar, content, status);
    return shell;
  }

  function buildInternalFrame(application) {
    const shell = document.createElement("div");
    shell.className = "internal-app-frame";
    const frame = document.createElement("iframe");
    frame.className = "internal-app-frame__iframe";
    frame.title = application.windowTitle || application.label;
    frame.src = application.url;
    shell.append(frame);
    return shell;
  }

  function buildFolderContent(application) {
    const shell = document.createElement("div");
    shell.className = "folder-app";
    const isGamesFolder = application.id === "games-folder";
    if (isGamesFolder) shell.classList.add("folder-app--games");

    const toolbar = document.createElement("div");
    toolbar.className = "folder-app__toolbar";
    const path = document.createElement("div");
    path.className = "folder-app__path";
    path.append(iconElement(application, "folder-app__path-icon"));
    const pathLabel = document.createElement("strong");
    pathLabel.textContent = application.label;
    path.append(pathLabel);
    const count = document.createElement("span");
    const children = registry.filter((candidate) => candidate.id !== application.id && candidate.category === application.folderCategory);
    count.textContent = `${children.length} ${children.length === 1 ? "item" : "items"}`;
    toolbar.append(path, count);

    const gameDetails = {
      tetris: { genre: "Puzzle", players: "1 Player", description: "Arrange falling blocks to clear complete lines and keep the board from filling up." },
      pong: { genre: "Arcade", players: "1–2 Players", description: "A simple paddle game built around quick rallies, timing, and keeping the ball in play." },
      minesweeper: { genre: "Puzzle", players: "1 Player", description: "Reveal safe tiles and use the numbered clues to identify every hidden mine." },
      solitaire: { genre: "Card", players: "1 Player", description: "Classic Klondike solitaire: sort the deck into four foundation piles by suit." },
      snake: { genre: "Arcade", players: "1 Player", description: "Guide the snake around the board, collect food, and avoid running into yourself." },
      breakout: { genre: "Arcade", players: "1 Player", description: "Bounce the ball with the paddle and clear the wall of bricks above you." },
      asteroids: { genre: "Arcade", players: "1 Player", description: "Pilot a small ship, avoid incoming rocks, and survive while clearing the field." },
      sokoban: { genre: "Puzzle", players: "1 Player", description: "Push every crate onto its target without trapping the boxes or blocking your path." },
      chess: { genre: "Strategy", players: "1–2 Players", description: "A full chess board for local play or a match against the computer." },
      pinball: { genre: "Arcade", players: "1 Player", description: "Keep the ball alive with the flippers and build a higher score across the table." },
      memory: { genre: "Puzzle", players: "1 Player", description: "Flip cards, remember their positions, and match every pair using as few moves as possible." },
      "lunar-lander": { genre: "Arcade", players: "1 Player", description: "Control your descent and land the craft safely without running out of fuel." },
      "epoch-siege": { genre: "Strategy", players: "1 Player", description: "Build an army, evolve through five eras, install base turrets, and destroy the opposing fortress." }
    };

    const body = document.createElement("div");
    body.className = "folder-app__body";
    const grid = document.createElement("div");
    grid.className = "folder-app__grid";

    const details = document.createElement("aside");
    details.className = "folder-app__details";
    details.hidden = true;
    details.setAttribute("aria-live", "polite");
    const detailsIcon = document.createElement("div");
    detailsIcon.className = "folder-app__details-icon-wrap";
    const detailsName = document.createElement("h2");
    const detailsTagline = document.createElement("p");
    detailsTagline.className = "folder-app__details-tagline";
    const detailsDescription = document.createElement("p");
    detailsDescription.className = "folder-app__details-description";
    const detailsMeta = document.createElement("div");
    detailsMeta.className = "folder-app__details-meta";
    const launch = document.createElement("button");
    launch.type = "button";
    launch.className = "folder-app__launch";
    launch.innerHTML = '<span aria-hidden="true">▷</span><span>Launch Game</span>';
    details.append(detailsIcon, detailsName, detailsTagline, detailsDescription, detailsMeta, launch);

    let selectedChild = null;
    const selectedItems = new Set();

    const setFolderItemSelected = (item, selected) => {
      item.classList.toggle("is-selected", selected);
      item.setAttribute("aria-pressed", String(selected));
      if (selected) selectedItems.add(item);
      else selectedItems.delete(item);
    };

    const clearSelection = () => {
      selectedChild = null;
      for (const candidate of [...selectedItems]) setFolderItemSelected(candidate, false);
      details.hidden = true;
      shell.classList.remove("has-details");
    };

    const updateDetails = () => {
      if (selectedItems.size !== 1) {
        selectedChild = null;
        details.hidden = true;
        shell.classList.remove("has-details");
        return;
      }
      const item = [...selectedItems][0];
      const child = applications.get(item.dataset.appId);
      if (!child) return;
      selectedChild = child;
      const info = gameDetails[child.game || child.id] || {
        genre: child.category === "games" ? "Game" : "Program",
        players: child.category === "games" ? "1 Player" : "—",
        description: child.description || child.windowTitle || "Program"
      };
      detailsIcon.replaceChildren(iconElement(child, "folder-app__details-icon"));
      detailsName.textContent = child.label;
      detailsTagline.textContent = child.description || child.windowTitle || "Program";
      detailsDescription.textContent = info.description;
      detailsMeta.replaceChildren();
      for (const [label, value] of [["Genre", info.genre], ["Players", info.players]]) {
        const row = document.createElement("div");
        const key = document.createElement("span");
        const result = document.createElement("strong");
        key.textContent = label;
        result.textContent = value;
        row.append(key, result);
        detailsMeta.append(row);
      }
      launch.querySelector("span:last-child").textContent = child.category === "games" ? "Launch Game" : "Open Program";
      details.hidden = false;
      shell.classList.add("has-details");
    };

    const selectFolderItem = (item, additive = false) => {
      if (additive) setFolderItemSelected(item, !selectedItems.has(item));
      else {
        const alreadyOnlySelected = selectedItems.size === 1 && selectedItems.has(item);
        clearSelection();
        setFolderItemSelected(item, true);
        if (!alreadyOnlySelected) playUiSound("select");
      }
      if (additive) playUiSound("select");
      updateDetails();
    };

    for (const child of children) {
      const item = document.createElement("button");
      item.type = "button";
      item.className = "folder-app__item";
      item.dataset.appId = child.id;
      item.dataset.description = child.description || child.windowTitle || "Program";
      item.setAttribute("aria-label", `Open ${child.label}: ${item.dataset.description}`);
      item.setAttribute("aria-pressed", "false");
      item.append(iconElement(child, "folder-app__icon"));
      const label = document.createElement("strong");
      label.textContent = child.label;
      item.append(label);
      item.addEventListener("click", (event) => {
        if (consumeDragClick(item)) return;
        selectFolderItem(item, event.ctrlKey || event.metaKey || event.shiftKey);
      });
      item.addEventListener("dblclick", () => openApplication(child.id));
      item.addEventListener("keydown", (event) => {
        if (event.key === "Enter") {
          event.preventDefault();
          openApplication(child.id);
          return;
        }
        if (event.key === " ") {
          event.preventDefault();
          selectFolderItem(item, event.ctrlKey || event.metaKey || event.shiftKey);
        }
      });
      grid.append(item);
    }

    grid.addEventListener("click", (event) => {
      const item = event.target instanceof Element ? event.target.closest(".folder-app__item") : null;
      if (!item && !event.ctrlKey && !event.metaKey && !event.shiftKey) clearSelection();
    });

    grid.addEventListener("pointerdown", (event) => {
      if (event.button !== 0 || window.matchMedia("(max-width: 700px)").matches) return;
      if (!(event.target instanceof Element) || event.target.closest(".folder-app__item")) return;
      const bounds = grid.getBoundingClientRect();
      const startClientX = clamp(event.clientX, bounds.left, bounds.right);
      const startClientY = clamp(event.clientY, bounds.top, bounds.bottom);
      const startX = startClientX - bounds.left + grid.scrollLeft;
      const startY = startClientY - bounds.top + grid.scrollTop;
      const additive = event.ctrlKey || event.metaKey || event.shiftKey;
      const baseline = additive ? new Set(selectedItems) : new Set();
      if (!additive) clearSelection();
      const marquee = document.createElement("div");
      marquee.className = "folder-selection-marquee";
      marquee.style.left = `${startX}px`;
      marquee.style.top = `${startY}px`;
      grid.append(marquee);
      grid.setPointerCapture?.(event.pointerId);
      let dragging = false;
      const move = (moveEvent) => {
        const currentClientX = clamp(moveEvent.clientX, bounds.left, bounds.right);
        const currentClientY = clamp(moveEvent.clientY, bounds.top, bounds.bottom);
        const currentX = currentClientX - bounds.left + grid.scrollLeft;
        const currentY = currentClientY - bounds.top + grid.scrollTop;
        const left = Math.min(startX, currentX);
        const top = Math.min(startY, currentY);
        const width = Math.abs(currentX - startX);
        const height = Math.abs(currentY - startY);
        if (!dragging && Math.hypot(width, height) >= 4) {
          dragging = true;
          marquee.classList.add("is-visible");
          grid.classList.add("is-drag-selecting");
          playUiSound("drag");
        }
        if (!dragging) return;
        marquee.style.left = `${left}px`;
        marquee.style.top = `${top}px`;
        marquee.style.width = `${width}px`;
        marquee.style.height = `${height}px`;
        const selectionRect = { left: Math.min(startClientX, currentClientX), top: Math.min(startClientY, currentClientY), right: Math.max(startClientX, currentClientX), bottom: Math.max(startClientY, currentClientY) };
        for (const item of grid.querySelectorAll(".folder-app__item")) {
          const selected = baseline.has(item) || rectanglesIntersect(selectionRect, item.getBoundingClientRect());
          setFolderItemSelected(item, selected);
        }
        updateDetails();
      };
      const end = () => {
        grid.removeEventListener("pointermove", move);
        grid.removeEventListener("pointerup", end);
        grid.removeEventListener("pointercancel", end);
        grid.classList.remove("is-drag-selecting");
        marquee.remove();
        updateDetails();
        if (dragging) playUiSound("drop");
      };
      grid.addEventListener("pointermove", move);
      grid.addEventListener("pointerup", end);
      grid.addEventListener("pointercancel", end);
    });

    bindSimulatedItemDragging(
      grid,
      ".folder-app__item",
      () => [...selectedItems],
      (item) => selectFolderItem(item, false)
    );

    launch.addEventListener("click", () => {
      if (selectedChild) openApplication(selectedChild.id);
    });

    body.append(grid, details);
    if (isGamesFolder) shell.append(body);
    else shell.append(toolbar, body);
    return shell;
  }

  function buildContent(application) {
    if (application.kind === "template") {
      const template = document.getElementById(application.templateId);
      return template ? template.content.cloneNode(true) : document.createTextNode("Application content unavailable.");
    }
    if (application.kind === "folder") return buildFolderContent(application);
    if (application.kind === "game" && window.PortfolioGames?.create) {
      const game = window.PortfolioGames.create(application);
      if (game?.element) {
        game.element.portfolioGameController = game.controller || null;
        return game.element;
      }
    }
    if (application.kind === "external") return buildExternalBrowser(application);
    return buildInternalFrame(application);
  }

  function initializeReviewsApp(container) {
    const app = container.querySelector("[data-reviews-app]");
    if (!app || app.dataset.reviewsInitialized === "true") return;
    const list = app.querySelector("[data-review-list]");
    const status = app.querySelector("[data-review-status]");
    const sort = app.querySelector("[data-review-sort]");
    const filters = [...app.querySelectorAll("[data-review-filter]")];
    const pages = app.querySelector("[data-review-pages]");
    const previous = app.querySelector('[data-review-page="previous"]');
    const next = app.querySelector('[data-review-page="next"]');
    if (!list) return;

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
    app.portfolioReviewsDestroy = () => {
      if (resizeFrame) cancelAnimationFrame(resizeFrame);
      resizeObserver?.disconnect();
    };
    app.dataset.reviewsInitialized = "true";
    render();
  }

  function createWindow(application) {
    const element = document.createElement("section");
    element.className = "desktop-window";
    element.dataset.appId = application.id;
    element.setAttribute("role", "dialog");
    element.setAttribute("aria-label", application.windowTitle || application.label);
    element.tabIndex = -1;

    const titlebar = document.createElement("header");
    titlebar.className = "desktop-window__titlebar";
    titlebar.dataset.windowDrag = "";
    const title = document.createElement("div");
    title.className = "desktop-window__title";
    const titleText = document.createElement("span");
    titleText.textContent = application.windowTitle || application.label;
    title.append(titleText);
    const controls = document.createElement("div");
    controls.className = "desktop-window__controls";
    controls.append(
      createTitlebarButton(`Minimize ${application.label}`, "minimize", "—"),
      createTitlebarButton(`Maximize ${application.label}`, "maximize", "□"),
      createTitlebarButton(`Close ${application.label}`, "close", "×")
    );
    titlebar.append(title, controls);

    const content = document.createElement("div");
    content.className = "desktop-window__content";
    const contentNode = buildContent(application);
    content.append(contentNode);
    initializeReviewsApp(content);
    element.append(titlebar, content);

    if (application.resizable !== false) {
      const resize = document.createElement("div");
      resize.className = "desktop-window__resize";
      resize.dataset.windowResize = "";
      resize.setAttribute("aria-hidden", "true");
      element.append(resize);
    }

    desktop.append(element);
    const entry = { application, element, minimized: false, maximized: false, restoreGeometry: null, taskbarButton: null, gameController: contentNode?.portfolioGameController || null };
    windows.set(application.id, entry);
    createTaskbarButton(entry);
    applyGeometry(entry, getRestoredGeometry(application));
    bindWindow(entry);
    return entry;
  }

  function setWindowMinimizedState(entry, minimized) {
    entry.minimized = minimized;
    entry.element.hidden = minimized;
    entry.element.style.display = minimized ? "none" : "";
    if (minimized) entry.element.setAttribute("aria-hidden", "true");
    else entry.element.removeAttribute("aria-hidden");
    entry.taskbarButton?.classList.toggle("is-minimized", minimized);
    if (minimized) entry.taskbarButton?.classList.remove("is-active");
  }

  function openApplication(id, options = {}) {
    const application = applications.get(id);
    if (!application) return;
    playUiSound("open");
    let entry = windows.get(id);
    if (!entry) entry = createWindow(application);
    setWindowMinimizedState(entry, false);
    const saved = state.windows?.[id];
    const shouldMaximize = window.matchMedia("(max-width: 700px)").matches || saved?.maximized;
    if (shouldMaximize && !entry.maximized) maximizeWindow(entry, false);
    setActive(entry);
    persistWindow(entry);
    entry.gameController?.resume?.();
    if (options.focus !== false) {
      if (entry.gameController?.focus) entry.gameController.focus();
      else entry.element.focus({ preventScroll: true });
    }
    closeStartMenu();
  }

  function minimizeWindow(entry) {
    playUiSound("minimize");
    entry.gameController?.pause?.();
    setWindowMinimizedState(entry, true);
    persistWindow(entry);
    const next = [...windows.values()].filter((item) => !item.minimized && item !== entry).sort((a, b) => Number(b.element.style.zIndex) - Number(a.element.style.zIndex))[0];
    if (next) setActive(next);
  }

  function maximizeWindow(entry, persist = true) {
    playUiSound("maximize");
    if (!entry.maximized) {
      entry.restoreGeometry = {
        x: Number.parseFloat(entry.element.style.left) || 0,
        y: Number.parseFloat(entry.element.style.top) || 0,
        width: Number.parseFloat(entry.element.style.width) || entry.element.offsetWidth,
        height: Number.parseFloat(entry.element.style.height) || entry.element.offsetHeight
      };
    }
    entry.maximized = true;
    entry.element.classList.add("is-maximized");
    entry.element.style.left = "0px";
    entry.element.style.top = "0px";
    entry.element.style.width = "100%";
    entry.element.style.height = "100%";
    const button = entry.element.querySelector('[data-window-action="maximize"]');
    if (button) {
      button.textContent = "❐";
      button.setAttribute("aria-label", `Restore ${entry.application.label}`);
    }
    entry.gameController?.resize?.();
    if (persist) persistWindow(entry);
  }

  function restoreWindow(entry) {
    playUiSound("maximize");
    entry.maximized = false;
    entry.element.classList.remove("is-maximized");
    applyGeometry(entry, entry.restoreGeometry || getRestoredGeometry(entry.application));
    const button = entry.element.querySelector('[data-window-action="maximize"]');
    if (button) {
      button.textContent = "□";
      button.setAttribute("aria-label", `Maximize ${entry.application.label}`);
    }
    entry.gameController?.resize?.();
    persistWindow(entry);
  }

  function closeWindow(entry) {
    playUiSound("close");
    entry.element.querySelector(".retro-game")?.portfolioGameAudioDestroy?.();
    entry.gameController?.destroy?.();
    entry.element.querySelector("[data-reviews-app]")?.portfolioReviewsDestroy?.();
    entry.element.remove();
    entry.taskbarButton?.remove();
    windows.delete(entry.application.id);
    if (!state.windows) state.windows = {};
    state.windows[entry.application.id] = { open: false };
    saveState();
    const next = [...windows.values()].filter((item) => !item.minimized).sort((a, b) => Number(b.element.style.zIndex) - Number(a.element.style.zIndex))[0];
    if (next) setActive(next);
  }

  function bindWindow(entry) {
    const titlebar = entry.element.querySelector("[data-window-drag]");
    const resize = entry.element.querySelector("[data-window-resize]");

    entry.element.addEventListener("pointerdown", () => {
      setActive(entry);
      entry.gameController?.focus?.();
    });
    entry.element.addEventListener("click", (event) => {
      const action = event.target instanceof Element ? event.target.closest("[data-window-action]")?.dataset.windowAction : "";
      if (action === "minimize") minimizeWindow(entry);
      if (action === "maximize") entry.maximized ? restoreWindow(entry) : maximizeWindow(entry);
      if (action === "close") closeWindow(entry);
    });

    titlebar?.addEventListener("dblclick", (event) => {
      if (event.target instanceof Element && event.target.closest("button")) return;
      entry.maximized ? restoreWindow(entry) : maximizeWindow(entry);
    });

    titlebar?.addEventListener("pointerdown", (event) => {
      if (entry.maximized || window.matchMedia("(max-width: 700px)").matches || event.button !== 0 || event.target instanceof Element && event.target.closest("button")) return;
      const bounds = getWorkspaceBounds();
      const startX = event.clientX;
      const startY = event.clientY;
      const startLeft = Number.parseFloat(entry.element.style.left) || 0;
      const startTop = Number.parseFloat(entry.element.style.top) || 0;
      titlebar.setPointerCapture(event.pointerId);
      playUiSound("drag");
      entry.element.classList.add("is-being-dragged");
      const move = (moveEvent) => {
        const x = clamp(startLeft + moveEvent.clientX - startX, 0, Math.max(0, bounds.width - 160));
        const y = clamp(startTop + moveEvent.clientY - startY, 0, Math.max(0, bounds.height - 34));
        entry.element.style.left = `${x}px`;
        entry.element.style.top = `${y}px`;
      };
      const end = () => {
        titlebar.removeEventListener("pointermove", move);
        titlebar.removeEventListener("pointerup", end);
        titlebar.removeEventListener("pointercancel", end);
        entry.element.classList.remove("is-being-dragged");
        playUiSound("drop");
        persistWindow(entry);
      };
      titlebar.addEventListener("pointermove", move);
      titlebar.addEventListener("pointerup", end);
      titlebar.addEventListener("pointercancel", end);
    });

    resize?.addEventListener("pointerdown", (event) => {
      if (entry.maximized || window.matchMedia("(max-width: 700px)").matches || event.button !== 0) return;
      const bounds = getWorkspaceBounds();
      const startX = event.clientX;
      const startY = event.clientY;
      const startWidth = entry.element.offsetWidth;
      const startHeight = entry.element.offsetHeight;
      resize.setPointerCapture(event.pointerId);
      playUiSound("drag");
      entry.element.classList.add("is-being-resized");
      const move = (moveEvent) => {
        const left = Number.parseFloat(entry.element.style.left) || 0;
        const top = Number.parseFloat(entry.element.style.top) || 0;
        const width = clamp(startWidth + moveEvent.clientX - startX, Number(entry.application.minWidth || 360), bounds.width - left);
        const height = clamp(startHeight + moveEvent.clientY - startY, Number(entry.application.minHeight || 260), bounds.height - top);
        entry.element.style.width = `${width}px`;
        entry.element.style.height = `${height}px`;
      };
      const end = () => {
        resize.removeEventListener("pointermove", move);
        resize.removeEventListener("pointerup", end);
        resize.removeEventListener("pointercancel", end);
        entry.element.classList.remove("is-being-resized");
        playUiSound("drop");
        entry.gameController?.resize?.();
        persistWindow(entry);
      };
      resize.addEventListener("pointermove", move);
      resize.addEventListener("pointerup", end);
      resize.addEventListener("pointercancel", end);
    });
  }

  function activateShortcut(shortcut, launch, additive = false) {
    if (additive) setShortcutSelected(shortcut, !selectedShortcuts.has(shortcut));
    else {
      const alreadyOnlySelected = selectedShortcuts.size === 1 && selectedShortcuts.has(shortcut);
      clearShortcutSelection();
      setShortcutSelected(shortcut, true);
      if (!alreadyOnlySelected) playUiSound("select");
    }
    shortcut.focus({ preventScroll: true });
    if (additive) playUiSound("select");
    if (launch) openApplication(shortcut.dataset.appId);
  }

  function bindDesktopMarqueeSelection() {
    desktop.addEventListener("pointerdown", (event) => {
      if (event.button !== 0 || window.matchMedia("(max-width: 700px)").matches) return;
      if (!(event.target instanceof Element)) return;
      if (event.target.closest(".desktop-shortcut, .desktop-window")) return;
      const bounds = desktop.getBoundingClientRect();
      const startX = clamp(event.clientX - bounds.left, 0, bounds.width);
      const startY = clamp(event.clientY - bounds.top, 0, bounds.height);
      const additive = event.ctrlKey || event.metaKey || event.shiftKey;
      const baseline = additive ? new Set(selectedShortcuts) : new Set();
      if (!additive) clearShortcutSelection();
      const marquee = document.createElement("div");
      marquee.className = "desktop-selection-marquee";
      marquee.style.left = `${startX}px`;
      marquee.style.top = `${startY}px`;
      desktop.append(marquee);
      desktop.setPointerCapture?.(event.pointerId);
      let dragging = false;
      const move = (moveEvent) => {
        const currentX = clamp(moveEvent.clientX - bounds.left, 0, bounds.width);
        const currentY = clamp(moveEvent.clientY - bounds.top, 0, bounds.height);
        const left = Math.min(startX, currentX);
        const top = Math.min(startY, currentY);
        const width = Math.abs(currentX - startX);
        const height = Math.abs(currentY - startY);
        if (!dragging && Math.hypot(width, height) >= 4) {
          dragging = true;
          marquee.classList.add("is-visible");
          desktop.classList.add("is-drag-selecting");
          playUiSound("drag");
        }
        if (!dragging) return;
        marquee.style.left = `${left}px`;
        marquee.style.top = `${top}px`;
        marquee.style.width = `${width}px`;
        marquee.style.height = `${height}px`;
        const selectionRect = { left: bounds.left + left, top: bounds.top + top, right: bounds.left + left + width, bottom: bounds.top + top + height };
        for (const shortcut of shortcuts.querySelectorAll(".desktop-shortcut")) {
          const selected = baseline.has(shortcut) || rectanglesIntersect(selectionRect, shortcut.getBoundingClientRect());
          setShortcutSelected(shortcut, selected);
        }
      };
      const end = () => {
        desktop.removeEventListener("pointermove", move);
        desktop.removeEventListener("pointerup", end);
        desktop.removeEventListener("pointercancel", end);
        desktop.classList.remove("is-drag-selecting");
        marquee.remove();
        if (dragging) playUiSound("drop");
      };
      desktop.addEventListener("pointermove", move);
      desktop.addEventListener("pointerup", end);
      desktop.addEventListener("pointercancel", end);
    });
  }

  function closeStartMenu() {
    startMenu.hidden = true;
    startButton.setAttribute("aria-expanded", "false");
  }

  function toggleStartMenu() {
    const opening = startMenu.hidden;
    playUiSound("menu");
    startMenu.hidden = !opening;
    startButton.setAttribute("aria-expanded", String(opening));
    if (opening) startPrograms.querySelector("button")?.focus({ preventScroll: true });
  }

  function applyTheme(theme, persist = true) {
    const selected = themes.includes(theme) ? theme : "medium";
    root.dataset.theme = selected;
    document.documentElement.dataset.desktopTheme = selected;
    if (persist) {
      state.theme = selected;
      saveState();
      try { localStorage.setItem("samael.desktop.theme", selected); } catch {}
    }
  }

  function initializeTheme() {
    const requested = new URLSearchParams(location.search).get("theme");
    let stored = "";
    try { stored = localStorage.getItem("samael.desktop.theme") || ""; } catch {}
    applyTheme(requested || state.theme || stored || root.dataset.defaultTheme || "medium", false);
  }

  const soundtrack = window.__portfolioSoundtrack;

  function setSettingsOpen(open) {
    if (!settingsPanel || !settingsButton) return;
    if (settingsPanel.hidden === open) playUiSound("menu");
    settingsPanel.hidden = !open;
    settingsButton.setAttribute("aria-expanded", String(open));
    if (open) closeStartMenu();
  }

  function syncSettingsUi() {
    root.classList.toggle("is-wallpaper-enabled", preferences.wallpaper);
    if (wallpaperToggle) wallpaperToggle.checked = preferences.wallpaper;
    if (musicToggle) musicToggle.checked = preferences.musicEnabled;
    if (musicVolume) musicVolume.value = String(preferences.musicVolume);
    if (musicVolumeOutput) musicVolumeOutput.textContent = `${Math.round(preferences.musicVolume * 100)}%`;
    if (soundtrack) {
      soundtrack.volume = preferences.musicVolume;
      if (!preferences.musicEnabled && !soundtrack.paused) soundtrack.pause();
    }
  }

  async function setMusicEnabled(enabled) {
    preferences.musicEnabled = Boolean(enabled);
    savePreferences();
    if (!soundtrack) {
      syncSettingsUi();
      return;
    }
    soundtrack.volume = preferences.musicVolume;
    if (preferences.musicEnabled) {
      try {
        await soundtrack.play();
      } catch {
        preferences.musicEnabled = false;
        savePreferences();
      }
    } else {
      soundtrack.pause();
    }
    syncSettingsUi();
  }

  function openRecycleTarget() {
    const browser = applications.get("ai-browser");
    if (browser?.url) window.open(browser.url, "_blank", "noopener,noreferrer");
  }

  function updateRecycleDetails(recycleItem) {
    const app = recycleItem?.closest(".recycle-bin-app");
    const details = app?.querySelector("[data-recycle-details]");
    const icon = app?.querySelector("[data-recycle-details-icon]");
    const title = app?.querySelector("[data-recycle-details-title]");
    const description = app?.querySelector("[data-recycle-details-description]");
    const sourceIcon = recycleItem?.querySelector("img");
    if (icon && sourceIcon) icon.src = sourceIcon.src;
    if (title) title.textContent = recycleItem?.querySelector("span")?.textContent || "Program";
    if (description) description.textContent = recycleItem?.dataset.description || "Select a program to view its description.";
    if (details) details.hidden = false;
    app?.classList.add("has-details");
  }

  function clearRecycleSelection(app) {
    for (const item of app?.querySelectorAll("[data-recycle-ai]") || []) item.classList.remove("is-selected");
    const details = app?.querySelector("[data-recycle-details]");
    if (details) details.hidden = true;
    app?.classList.remove("has-details");
  }

  function selectRecycleItem(recycleItem) {
    const grid = recycleItem?.closest("[data-recycle-grid]");
    for (const item of grid?.querySelectorAll("[data-recycle-ai]") || []) item.classList.toggle("is-selected", item === recycleItem);
    updateRecycleDetails(recycleItem);
    recycleItem?.focus({ preventScroll: true });
  }

  function updateClock() {
    const now = new Date();
    clock.textContent = new Intl.DateTimeFormat(undefined, { hour: "2-digit", minute: "2-digit", hour12: false }).format(now);
    clock.title = new Intl.DateTimeFormat(undefined, { dateStyle: "full", timeStyle: "short" }).format(now);
  }

  function formatGitHubStat(value) {
    const number = Number(value);
    if (!Number.isFinite(number)) return "—";
    if (number >= 1000000) return `${(number / 1000000).toFixed(number >= 10000000 ? 0 : 1).replace(/\.0$/, "")}m`;
    if (number >= 1000) return `${(number / 1000).toFixed(number >= 10000 ? 0 : 1).replace(/\.0$/, "")}k`;
    return String(number);
  }

  async function initializeGitHubStats() {
    const widget = root.querySelector("[data-github-stats]");
    const username = widget?.dataset.githubUser?.trim();
    const organization = widget?.dataset.githubOrg?.trim() || "LiliaFramework";
    if (!widget || !username) return;
    if (widget.dataset.githubStatic === "true") {
      widget.classList.add("is-loaded");
      return;
    }

    const fields = {
      repositories: widget.querySelector("[data-github-repos]"),
      followers: widget.querySelector("[data-github-followers]"),
      stars: widget.querySelector("[data-github-stars]"),
      forks: widget.querySelector("[data-github-forks]"),
      since: widget.querySelector("[data-github-since]"),
      top: widget.querySelector("[data-github-top]"),
      recent: widget.querySelector("[data-github-recent]"),
      liliaRepositories: widget.querySelector("[data-github-lilia-repos]"),
      liliaStars: widget.querySelector("[data-github-lilia-stars]"),
      liliaForks: widget.querySelector("[data-github-lilia-forks]"),
      liliaRelease: widget.querySelector("[data-github-lilia-release]"),
      status: widget.querySelector("[data-github-status]")
    };
    const cacheKey = `samael.github.public.${username}.${organization}.v2`;
    const cacheLifetime = 6 * 60 * 60 * 1000;

    const setText = (element, value) => {
      if (element) element.textContent = value;
    };
    const formatDate = (value) => {
      const date = new Date(value || 0);
      if (Number.isNaN(date.getTime())) return "—";
      return new Intl.DateTimeFormat(undefined, { day: "2-digit", month: "short", year: "numeric" }).format(date);
    };
    const summarize = (repositories) => {
      const publicRepositories = Array.isArray(repositories) ? repositories.filter((repository) => repository && repository.private !== true && repository.visibility !== "private") : [];
      const originals = publicRepositories.filter((repository) => !repository.fork);
      const active = originals.filter((repository) => !repository.archived);
      const mostStarred = [...originals].sort((a, b) => Number(b.stargazers_count || 0) - Number(a.stargazers_count || 0) || Number(b.forks_count || 0) - Number(a.forks_count || 0))[0] || null;
      const mostRecent = [...active].sort((a, b) => Date.parse(b.pushed_at || 0) - Date.parse(a.pushed_at || 0))[0] || null;
      return {
        original: originals.length,
        stars: originals.reduce((total, repository) => total + Number(repository.stargazers_count || 0), 0),
        forks: originals.reduce((total, repository) => total + Number(repository.forks_count || 0), 0),
        mostStarred,
        mostRecent
      };
    };
    const fetchAll = async (baseUrl, headers) => {
      const values = [];
      for (let page = 1; page <= 10; page += 1) {
        const separator = baseUrl.includes("?") ? "&" : "?";
        const response = await fetch(`${baseUrl}${separator}per_page=100&page=${page}`, { headers });
        if (!response.ok) throw new Error("GitHub request failed");
        const pageValues = await response.json();
        if (!Array.isArray(pageValues)) throw new Error("GitHub response invalid");
        values.push(...pageValues);
        if (pageValues.length < 100) break;
      }
      return values;
    };
    const applyData = (data, cached = false) => {
      setText(fields.repositories, formatGitHubStat(data.personal.original));
      setText(fields.followers, formatGitHubStat(data.personal.followers));
      setText(fields.stars, formatGitHubStat(data.personal.stars));
      setText(fields.forks, formatGitHubStat(data.personal.forks));
      setText(fields.since, data.personal.createdAt ? `GitHub since ${new Date(data.personal.createdAt).getFullYear()}` : "Public profile");
      setText(fields.top, data.personal.top ? `${data.personal.top.name} · ${formatGitHubStat(data.personal.top.stargazers_count)} ★` : "—");
      setText(fields.recent, data.personal.recent ? `${data.personal.recent.name} · ${formatDate(data.personal.recent.pushed_at)}` : "—");
      setText(fields.liliaRepositories, formatGitHubStat(data.framework.original));
      setText(fields.liliaStars, formatGitHubStat(data.framework.stars));
      setText(fields.liliaForks, formatGitHubStat(data.framework.forks));
      setText(fields.liliaRelease, data.framework.release ? `${data.framework.release.name || data.framework.release.tag_name || "Release"} · ${formatDate(data.framework.release.published_at || data.framework.release.created_at)}` : "No public release yet");
      setText(fields.status, `Public GitHub data${cached ? " · cached" : ""}`);
      widget.classList.remove("has-error");
      widget.classList.add("is-loaded");
    };

    try {
      const cached = JSON.parse(localStorage.getItem(cacheKey) || "null");
      if (cached && Number(cached.cachedAt) > Date.now() - cacheLifetime && cached.data) {
        applyData(cached.data, true);
        return;
      }
    } catch {}

    try {
      const headers = { Accept: "application/vnd.github+json", "X-GitHub-Api-Version": "2022-11-28" };
      const [profileResponse, personalRepositories, frameworkRepositories, releaseResponse] = await Promise.all([
        fetch(`https://api.github.com/users/${encodeURIComponent(username)}`, { headers }),
        fetchAll(`https://api.github.com/users/${encodeURIComponent(username)}/repos?type=owner&sort=pushed&direction=desc`, headers),
        fetchAll(`https://api.github.com/orgs/${encodeURIComponent(organization)}/repos?type=public&sort=pushed&direction=desc`, headers),
        fetch("https://api.github.com/repos/LiliaFramework/Lilia/releases/latest", { headers })
      ]);
      if (!profileResponse.ok) throw new Error("GitHub profile request failed");
      const profile = await profileResponse.json();
      const personal = summarize(personalRepositories);
      const framework = summarize(frameworkRepositories);
      const release = releaseResponse.ok ? await releaseResponse.json() : null;
      const data = {
        personal: {
          original: personal.original,
          followers: Number(profile.followers || 0),
          stars: personal.stars,
          forks: personal.forks,
          createdAt: profile.created_at || null,
          top: personal.mostStarred,
          recent: personal.mostRecent
        },
        framework: {
          original: framework.original,
          stars: framework.stars,
          forks: framework.forks,
          release
        }
      };
      applyData(data, false);
      try { localStorage.setItem(cacheKey, JSON.stringify({ cachedAt: Date.now(), data })); } catch {}
    } catch {
      setText(fields.status, "GitHub stats unavailable");
      widget.classList.add("has-error");
    }
  }

  shortcuts.addEventListener("click", (event) => {
    const shortcut = event.target instanceof Element ? event.target.closest(".desktop-shortcut") : null;
    if (!shortcut || consumeDragClick(shortcut)) return;
    activateShortcut(shortcut, false, event.ctrlKey || event.metaKey || event.shiftKey);
  });
  shortcuts.addEventListener("dblclick", (event) => {
    const shortcut = event.target instanceof Element ? event.target.closest(".desktop-shortcut") : null;
    if (shortcut) activateShortcut(shortcut, true);
  });
  shortcuts.addEventListener("keydown", (event) => {
    const shortcut = event.target instanceof Element ? event.target.closest(".desktop-shortcut") : null;
    if (!shortcut || event.key !== "Enter") return;
    event.preventDefault();
    activateShortcut(shortcut, true);
  });
  root.addEventListener("click", (event) => {
    const trigger = event.target instanceof Element ? event.target.closest("[data-pfp-audio-trigger]") : null;
    if (trigger) {
      document.querySelector("[data-global-profile-audio-trigger]")?.click();
      return;
    }
    const recycleItem = event.target instanceof Element ? event.target.closest("[data-recycle-ai]") : null;
    if (recycleItem) {
      selectRecycleItem(recycleItem);
      return;
    }
    const recycleGrid = event.target instanceof Element ? event.target.closest("[data-recycle-grid]") : null;
    if (recycleGrid) clearRecycleSelection(recycleGrid.closest(".recycle-bin-app"));
  });
  root.addEventListener("click", (event) => {
    const recycleOpen = event.target instanceof Element ? event.target.closest("[data-recycle-details-open]") : null;
    if (recycleOpen) openRecycleTarget();
  });
  root.addEventListener("dblclick", (event) => {
    const recycleItem = event.target instanceof Element ? event.target.closest("[data-recycle-ai]") : null;
    if (!recycleItem) return;
    selectRecycleItem(recycleItem);
    openRecycleTarget();
  });
  root.addEventListener("keydown", (event) => {
    const recycleItem = event.target instanceof Element ? event.target.closest("[data-recycle-ai]") : null;
    if (!recycleItem) return;
    if (event.key === "Enter") {
      event.preventDefault();
      selectRecycleItem(recycleItem);
      openRecycleTarget();
      return;
    }
    if (event.key === " ") {
      event.preventDefault();
      selectRecycleItem(recycleItem);
    }
  });
  startPrograms.addEventListener("click", (event) => {
    const item = event.target instanceof Element ? event.target.closest("[data-app-id]") : null;
    if (item) openApplication(item.dataset.appId);
  });
  taskbar.addEventListener("click", (event) => {
    const button = event.target instanceof Element ? event.target.closest("[data-app-id]") : null;
    if (!button) return;
    const entry = windows.get(button.dataset.appId);
    if (!entry) return;
    if (entry.minimized) openApplication(entry.application.id);
    else if (button.classList.contains("is-active")) minimizeWindow(entry);
    else setActive(entry);
  });
  taskbar.addEventListener("auxclick", (event) => {
    if (event.button !== 1) return;
    const button = event.target instanceof Element ? event.target.closest("[data-app-id]") : null;
    if (!button) return;
    const entry = windows.get(button.dataset.appId);
    if (!entry) return;
    event.preventDefault();
    closeWindow(entry);
  });
  taskbar.addEventListener("mousedown", (event) => {
    if (event.button === 1 && event.target instanceof Element && event.target.closest("[data-app-id]")) event.preventDefault();
  });
  startButton.addEventListener("click", () => {
    setSettingsOpen(false);
    toggleStartMenu();
  });
  settingsButton?.addEventListener("click", () => setSettingsOpen(settingsPanel?.hidden !== false));
  settingsClose?.addEventListener("click", () => setSettingsOpen(false));
  wallpaperToggle?.addEventListener("change", () => {
    playUiSound("toggle");
    preferences.wallpaper = wallpaperToggle.checked;
    savePreferences();
    syncSettingsUi();
  });
  musicToggle?.addEventListener("change", () => { playUiSound("toggle"); setMusicEnabled(musicToggle.checked); });
  musicVolume?.addEventListener("input", () => {
    preferences.musicVolume = clamp(Number(musicVolume.value), 0, 1);
    if (soundtrack) soundtrack.volume = preferences.musicVolume;
    savePreferences();
    syncSettingsUi();
  });
  soundtrack?.addEventListener("play", () => {
    if (!preferences.musicEnabled) { preferences.musicEnabled = true; savePreferences(); }
    syncSettingsUi();
  });
  soundtrack?.addEventListener("pause", () => {
    if (preferences.musicEnabled) { preferences.musicEnabled = false; savePreferences(); }
    syncSettingsUi();
  });
  document.addEventListener("pointerdown", (event) => {
    if (!(event.target instanceof Node)) return;
    if (!startMenu.hidden && !startMenu.contains(event.target) && !startButton.contains(event.target)) closeStartMenu();
    if (settingsPanel && !settingsPanel.hidden && !settingsPanel.contains(event.target) && !settingsButton?.contains(event.target)) setSettingsOpen(false);
  });
  window.addEventListener("resize", () => {
    for (const entry of windows.values()) {
      if (entry.maximized) continue;
      applyGeometry(entry, getRestoredGeometry(entry.application));
      entry.gameController?.resize?.();
      persistWindow(entry);
    }
  });
  window.addEventListener("message", (event) => {
    if (event.origin !== location.origin || !event.data) return;
    const sourceIsInternalApplication = [...windows.values()].some((entry) => {
      const frame = entry.element.querySelector(".internal-app-frame__iframe");
      return frame && frame.contentWindow === event.source;
    });
    if (!sourceIsInternalApplication) return;
    if (event.data.type === "portfolio-profile-sound") document.querySelector("[data-pfp-audio-trigger]")?.click();
    if (event.data.type === "portfolio-open-app" && applications.has(event.data.app)) openApplication(event.data.app);
  });

  window.addEventListener("pointerdown", unlockUiAudio, { capture: true, once: true });
  window.addEventListener("keydown", unlockUiAudio, { capture: true, once: true });

  renderRegistry();
  bindSimulatedItemDragging(
    shortcuts,
    ".desktop-shortcut",
    () => [...selectedShortcuts],
    (shortcut) => activateShortcut(shortcut, false, false)
  );
  bindDesktopMarqueeSelection();
  initializeTheme();
  syncSettingsUi();
  updateClock();
  initializeGitHubStats();
  setInterval(updateClock, 15000);

  const requestedApplication = new URLSearchParams(location.search).get("app");

  function restoreDesktopSession() {
    const hasSavedWindowState = state.windows && Object.keys(state.windows).length > 0;
    for (const application of registry) {
      const saved = state.windows?.[application.id];
      if (saved?.open) {
        openApplication(application.id, { focus: false });
        if (saved.minimized) minimizeWindow(windows.get(application.id));
      } else if (!hasSavedWindowState && application.defaultOpen) {
        openApplication(application.id, { focus: false });
      }
    }
    if (requestedApplication && applications.has(requestedApplication)) openApplication(requestedApplication, { focus: false });
    const preferred = windows.get(requestedApplication) || windows.get(state.lastActive) || windows.get(root.dataset.defaultApplication) || [...windows.values()][0];
    if (preferred && !preferred.minimized) setActive(preferred);
    navigateHash();
  }

  const navigateHash = () => {
    if (location.hash !== "#reviews" && location.hash !== "#about-reviews") return;
    openApplication("about", { focus: false });
    requestAnimationFrame(() => windows.get("about")?.element.querySelector("#about-reviews")?.scrollIntoView({ block: "start" }));
  };

  window.addEventListener("hashchange", navigateHash);
  restoreDesktopSession();
  runPageStartup();
})();
