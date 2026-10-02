(() => {
  const root = document.querySelector("[data-desktop-shell]");
  if (!root) return;

  const registryElement = document.getElementById("portfolio-app-registry");
  const sessionStartedAt = Date.now();
  if (!registryElement) return;

  let registry;
  try {
    registry = JSON.parse(registryElement.textContent || "[]");
  } catch {
    return;
  }

  const sharedData = window.PORTFOLIO_DATA || {};
  const sharedApplications = Array.isArray(sharedData.applications) ? sharedData.applications : [];
  for (const application of sharedApplications) {
    if (!application?.id || registry.some((candidate) => candidate.id === application.id)) continue;
    registry.push(application);
  }
  for (const application of registry) {
    if (application.desktopShortcut === undefined) application.desktopShortcut = !(application.kind === "game" && application.category === "games");
  }
  const categoryOrder = { system: 0, portfolio: 1, games: 2 };
  registry = registry.map((application, index) => ({ application, index })).sort((first, second) => {
    const categoryDifference = (categoryOrder[first.application.category] ?? 9) - (categoryOrder[second.application.category] ?? 9);
    return categoryDifference || first.index - second.index;
  }).map(({ application }) => application);
  const sharedGames = Array.isArray(sharedData.games) ? sharedData.games : [];
  for (const game of sharedGames) {
    const application = registry.find((candidate) => candidate.id === game.id);
    if (application && game.icon) application.icon = { type: "local", src: game.icon };
  }
  for (const application of registry) application.startMenu = true;
  const applications = new Map(registry.map((application) => [application.id, application]));
  const programModules = window.PortfolioPrograms instanceof Map ? window.PortfolioPrograms : new Map();
  const desktop = root.querySelector("[data-desktop-workspace]");
  const DESKTOP_REFERENCE_WIDTH = 1920;
  const DESKTOP_REFERENCE_HEIGHT = 1080;
  const DESKTOP_REFERENCE_WORKSPACE_HEIGHT = 1012;
  let desktopUiScale = 1;

  function syncDesktopCanvasScale() {
    if (window.matchMedia("(max-width: 760px)").matches) {
      desktopUiScale = 1;
      root.style.removeProperty("width");
      root.style.removeProperty("height");
      root.style.removeProperty("right");
      root.style.removeProperty("bottom");
      root.style.removeProperty("transform");
      root.style.removeProperty("transform-origin");
      root.style.removeProperty("--desktop-ui-scale");
      delete root.dataset.canvasScale;
      return;
    }

    const viewportWidth = Math.max(1, window.innerWidth || document.documentElement.clientWidth || DESKTOP_REFERENCE_WIDTH);
    const viewportHeight = Math.max(1, window.innerHeight || document.documentElement.clientHeight || DESKTOP_REFERENCE_HEIGHT);
    desktopUiScale = Math.max(0.1, Math.min(viewportWidth / DESKTOP_REFERENCE_WIDTH, viewportHeight / DESKTOP_REFERENCE_HEIGHT));
    const canvasWidth = viewportWidth / desktopUiScale;
    const canvasHeight = viewportHeight / desktopUiScale;

    root.style.width = `${canvasWidth}px`;
    root.style.height = `${canvasHeight}px`;
    root.style.right = "auto";
    root.style.bottom = "auto";
    root.style.transformOrigin = "0 0";
    root.style.transform = `scale(${desktopUiScale})`;
    root.style.setProperty("--desktop-ui-scale", String(desktopUiScale));
    root.dataset.canvasScale = desktopUiScale.toFixed(6);
  }

  function getDesktopScale() {
    return window.matchMedia("(max-width: 760px)").matches ? 1 : desktopUiScale || 1;
  }

  function toDesktopUnits(value) {
    return Number(value) / getDesktopScale();
  }

  syncDesktopCanvasScale();

  const logViewportDiagnostics = (reason) => {
    const shellRect = root.getBoundingClientRect();
    const desktopRect = desktop?.getBoundingClientRect();
    const rootStyle = getComputedStyle(document.documentElement);
    const shellStyle = getComputedStyle(root);
    console.warn("[PortfolioViewport]", {
      reason,
      inner: `${window.innerWidth}x${window.innerHeight}`,
      visual: window.visualViewport ? `${Math.round(window.visualViewport.width)}x${Math.round(window.visualViewport.height)}` : "unavailable",
      devicePixelRatio: window.devicePixelRatio,
      screen: `${window.screen?.width || 0}x${window.screen?.height || 0}`,
      mediaCompact: window.matchMedia("(min-width: 761px) and (max-width: 1600px)").matches,
      mediaMobile: window.matchMedia("(max-width: 760px)").matches,
      shell: `${Math.round(shellRect.width)}x${Math.round(shellRect.height)}`,
      desktop: desktopRect ? `${Math.round(desktopRect.width)}x${Math.round(desktopRect.height)}` : "missing",
      taskbarHeight: rootStyle.getPropertyValue("--desktop-taskbar-height").trim(),
      shellZoom: shellStyle.zoom,
      bodyZoom: getComputedStyle(document.body).zoom,
      canvasScale: getDesktopScale(),
      canvas: `${Math.round(root.clientWidth)}x${Math.round(root.clientHeight)}`
    });
    const shortcut = root.querySelector(".desktop-shortcut");
    const windowElement = root.querySelector(".desktop-window");
    const rail = root.querySelector(".desktop-right-rail");
    console.warn(`[PortfolioViewportSummary] ${reason} viewport=${window.innerWidth}x${window.innerHeight} compact=${window.matchMedia("(min-width: 761px) and (max-width: 1600px)").matches} taskbar=${rootStyle.getPropertyValue("--desktop-taskbar-height").trim()} shortcut=${shortcut ? Math.round(shortcut.getBoundingClientRect().width) + "x" + Math.round(shortcut.getBoundingClientRect().height) : "none"} window=${windowElement ? Math.round(windowElement.getBoundingClientRect().width) + "x" + Math.round(windowElement.getBoundingClientRect().height) : "none"} rail=${rail ? Math.round(rail.getBoundingClientRect().width) : "none"}`);
  };
  logViewportDiagnostics("initial");
  const shortcuts = root.querySelector("[data-desktop-shortcuts]");
  const taskbar = root.querySelector("[data-taskbar-apps]");
  const startButton = root.querySelector("[data-start-button]");
  const startMenu = root.querySelector("[data-start-menu]");
  const startPrograms = root.querySelector("[data-start-programs]");
  const startPlaces = root.querySelector("[data-start-places]");
  const startSearch = root.querySelector("[data-start-search]");
  const startAllPrograms = root.querySelector("[data-start-all-programs]");
  const clock = root.querySelector("[data-desktop-clock]");
  const settingsButton = root.querySelector("[data-settings-toggle]");
  const settingsPanel = root.querySelector("[data-settings-panel]");
  const settingsClose = root.querySelector("[data-settings-close]");
  const wallpaperToggle = root.querySelector("[data-setting-wallpaper]");
  const musicToggle = root.querySelector("[data-setting-music]");
  const musicVolume = root.querySelector("[data-setting-volume]");
  const musicVolumeOutput = root.querySelector("[data-setting-volume-output]");
  const startupOverlay = root.querySelector("[data-page-startup]");
  const startupTitle = root.querySelector("[data-page-startup-title]");
  const startupStatus = root.querySelector("[data-page-startup-status]");
  const restartButton = root.querySelector("[data-system-restart]");
  const shutdownButton = root.querySelector("[data-system-shutdown]");
  const shutdownScreen = root.querySelector("[data-system-shutdown-screen]");
  const shutdownStart = root.querySelector("[data-system-start]");
  const windows = new Map();
  const stateKey = "samael.desktop.state.v2";
  const preferenceKey = "samael.desktop.preferences.v1";
  const themes = ["subtle", "medium", "heavy"];
  let zIndex = 30;
  const selectedShortcuts = new Set();
  let audioContext = null;
  let uiAudioEnabled = false;
  let showingAllPrograms = false;
  let state = readState();
  let preferences = readPreferences();

  function runPageStartup(options = {}) {
    const restart = Boolean(options.restart);
    if (!startupOverlay) {
      root.classList.remove("is-page-starting");
      root.classList.add("is-page-ready");
      if (restart) location.reload();
      return;
    }

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const duration = restart ? (reducedMotion ? 1100 : 3200) : (reducedMotion ? 2200 : 6500);
    const leaveDuration = reducedMotion ? 220 : 920;
    const statuses = restart ? [
      [0, "Stopping desktop services"],
      [0.32, "Closing active sessions"],
      [0.62, "Restarting server"],
      [0.88, "Reconnecting"]
    ] : [
      [0, "Initializing session"],
      [0.22, "Loading user profile"],
      [0.5, "Starting desktop services"],
      [0.78, "Preparing the workspace"],
      [0.93, "System ready"]
    ];
    const timers = [];
    let finished = false;

    root.classList.remove("is-page-ready", "is-shutdown");
    root.classList.add("is-page-starting");
    startupOverlay.hidden = false;
    startupOverlay.classList.remove("is-leaving");
    if (startupTitle) startupTitle.textContent = restart ? "Pompompurin is restarting your system..." : "Pompompurin is starting your system...";

    const finish = () => {
      if (finished) return;
      finished = true;
      for (const timer of timers) clearTimeout(timer);
      if (restart) {
        if (startupStatus) startupStatus.textContent = "Server restart complete";
        setTimeout(() => location.reload(), reducedMotion ? 120 : 420);
        return;
      }
      root.classList.add("is-page-ready");
      root.classList.remove("is-page-starting");
      startupOverlay.classList.add("is-leaving");
      setTimeout(() => {
        startupOverlay.hidden = true;
        startupOverlay.classList.remove("is-leaving");
      }, leaveDuration);
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

  function shutdownSystem() {
    closeStartMenu();
    setSettingsOpen(false);
    try { sessionStorage.removeItem(stateKey); } catch {}
    root.classList.remove("is-page-ready", "is-page-starting");
    root.classList.add("is-shutdown");
    if (shutdownScreen) {
      shutdownScreen.hidden = false;
      shutdownStart?.focus({ preventScroll: true });
    }
  }

  function restartSystem() {
    closeStartMenu();
    setSettingsOpen(false);
    try { sessionStorage.removeItem(stateKey); } catch {}
    runPageStartup({ restart: true });
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
    const defaults = { wallpaper: true, wallpaperStyle: "pompompurin", musicEnabled: false, musicVolume: 0.12, iconPositions: {} };
    try {
      const stored = JSON.parse(localStorage.getItem(preferenceKey) || "null");
      if (!stored || typeof stored !== "object") return defaults;
      return {
        wallpaper: Boolean(stored.wallpaper),
        wallpaperStyle: ["pompompurin", "minimal", "dark", "aurora"].includes(stored.wallpaperStyle) ? stored.wallpaperStyle : "pompompurin",
        musicEnabled: Boolean(stored.musicEnabled),
        musicVolume: clamp(Number(stored.musicVolume), 0, 1),
        iconPositions: stored.iconPositions && typeof stored.iconPositions === "object" ? stored.iconPositions : {}
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
    image.className = `${application.id === "lilia" ? "app-icon--lilia " : ""}${className}`.trim();
    image.decoding = "async";
    image.src = icon.src || "/assets/icons/fallback.svg";
    image.addEventListener("error", () => {
      if (!image.src.endsWith("/assets/icons/fallback.svg")) image.src = "/assets/icons/fallback.svg";
    }, { once: true });

    if (className !== "desktop-shortcut__icon" || application.desktopIconStyle !== "emblem") return image;

    const emblem = document.createElement("span");
    emblem.className = "desktop-shortcut__icon desktop-shortcut__emblem";
    emblem.setAttribute("aria-hidden", "true");
    image.className = `${application.id === "lilia" ? "app-icon--lilia " : ""}desktop-shortcut__emblem-image`.trim();
    emblem.append(image);
    return emblem;
  }

  const desktopGroupDefinitions = [
    { id: "portfolio", label: "PORTFOLIO" },
    { id: "projects", label: "PROJECTS" },
    { id: "utilities", label: "UTILITIES" }
  ];

  function getDesktopGroup(application) {
    if (application.desktopGroup) return application.desktopGroup;
    if (application.id === "recycle-bin") return "pinned";
    if (application.category === "system") return "utilities";
    if (application.category === "games") return "portfolio";
    return "projects";
  }

  function createDesktopShortcut(application, group) {
    const shortcut = document.createElement("button");
    shortcut.type = "button";
    shortcut.className = `desktop-shortcut desktop-shortcut--${group}`;
    shortcut.dataset.appId = application.id;
    shortcut.dataset.desktopGroup = group;
    shortcut.dataset.layoutLocked = "true";
    shortcut.dataset.description = application.description || application.windowTitle || "Portfolio program";
    shortcut.setAttribute("aria-label", `Open ${application.label}: ${shortcut.dataset.description}`);
    shortcut.setAttribute("aria-pressed", "false");
    shortcut.title = shortcut.dataset.description;
    shortcut.append(iconElement(application, "desktop-shortcut__icon"));
    const label = document.createElement("span");
    label.className = "desktop-shortcut__label";
    label.textContent = application.label;
    shortcut.append(label);
    return shortcut;
  }

  function renderDesktopShortcuts() {
    const grouped = new Map(desktopGroupDefinitions.map(({ id }) => [id, []]));
    const pinned = [];

    for (const application of registry) {
      if (application.desktopShortcut === false) continue;
      const group = getDesktopGroup(application);
      if (group === "pinned") {
        pinned.push(application);
        continue;
      }
      if (!grouped.has(group)) grouped.set(group, []);
      grouped.get(group).push(application);
    }

    const orderApplications = (items) => [...items].sort((first, second) => {
      const firstOrder = Number.isFinite(Number(first.desktopOrder)) ? Number(first.desktopOrder) : Number.MAX_SAFE_INTEGER;
      const secondOrder = Number.isFinite(Number(second.desktopOrder)) ? Number(second.desktopOrder) : Number.MAX_SAFE_INTEGER;
      return firstOrder - secondOrder || first.label.localeCompare(second.label);
    });

    for (const definition of desktopGroupDefinitions) {
      const items = orderApplications(grouped.get(definition.id) || []);
      if (!items.length) continue;
      const heading = document.createElement("div");
      heading.className = "desktop-shortcuts__section-title";
      heading.dataset.desktopSection = definition.id;
      const text = document.createElement("span");
      text.textContent = definition.label;
      heading.append(text);
      shortcuts.append(heading);
      for (const application of items) shortcuts.append(createDesktopShortcut(application, definition.id));
    }

    for (const [group, items] of grouped) {
      if (desktopGroupDefinitions.some((definition) => definition.id === group) || !items.length) continue;
      const heading = document.createElement("div");
      heading.className = "desktop-shortcuts__section-title";
      heading.dataset.desktopSection = group;
      const text = document.createElement("span");
      text.textContent = group.replace(/[-_]+/g, " ").toUpperCase();
      heading.append(text);
      shortcuts.append(heading);
      for (const application of orderApplications(items)) shortcuts.append(createDesktopShortcut(application, group));
    }

    for (const application of orderApplications(pinned)) {
      const shortcut = createDesktopShortcut(application, "pinned");
      shortcut.classList.add("desktop-shortcut--pinned");
      shortcuts.append(shortcut);
    }
  }

  const embeddedApplicationTabs = new Map([["projects", "projects"], ["work-with-me", "work"]]);
  const mainStartMenuIds = new Set(["recycle-bin", "terminal", "about-me", "about", "derma-creator", "creations", "projects", "games-folder"]);

  function renderStartPrograms() {
    startPrograms.replaceChildren();
    let activeCategory = null;
    for (const application of registry) {
      if (embeddedApplicationTabs.has(application.id)) continue;
      if (application.startMenu === false || (!showingAllPrograms && !mainStartMenuIds.has(application.id))) continue;
      const category = application.category || "portfolio";
      const item = document.createElement("button");
      item.type = "button";
      item.className = `start-menu__program${activeCategory && category !== activeCategory ? " start-menu__program--separator" : ""}`;
      item.dataset.appId = application.id;
      item.dataset.searchText = `${application.label} ${application.description || ""} ${category} ${window.PortfolioI18n?.t?.(application.label, "pt") || ""} ${window.PortfolioI18n?.t?.(application.description || "", "pt") || ""}`.toLowerCase();
      item.append(iconElement(application, "start-menu__icon"));
      const copy = document.createElement("span");
      const label = document.createElement("strong");
      label.textContent = application.label;
      const description = document.createElement("small");
      description.textContent = application.description || application.windowTitle || "Portfolio program";
      copy.append(label, description);
      item.append(copy);
      startPrograms.append(item);
      activeCategory = category;
    }

    if (startAllPrograms) {
      startAllPrograms.setAttribute("aria-pressed", String(showingAllPrograms));
      const parts = startAllPrograms.querySelectorAll("span");
      if (parts[1]) parts[1].textContent = showingAllPrograms ? "Pinned Programs" : "All Programs";
      if (parts[2]) parts[2].textContent = showingAllPrograms ? "‹" : "›";
    }
  }

  function renderRegistry() {
    shortcuts.replaceChildren();
    startPlaces?.replaceChildren();
    renderDesktopShortcuts();
    renderStartPrograms();
    const quickStartIds = new Set(["about-me", "projects", "creations", "games-folder", "about"]);

    if (startPlaces) {
      for (const id of quickStartIds) {
        const application = applications.get(id);
        if (!application) continue;
        const item = document.createElement("button");
        item.type = "button";
        item.className = "start-menu__place";
        item.dataset.appId = application.id;
        item.dataset.searchText = `${application.label} ${application.description || ""} ${window.PortfolioI18n?.t?.(application.label, "pt") || ""} ${window.PortfolioI18n?.t?.(application.description || "", "pt") || ""}`.toLowerCase();
        item.append(iconElement(application, "start-menu__place-icon"));
        const label = document.createElement("span");
        label.textContent = application.label;
        item.append(label);
        startPlaces.append(item);
      }
    }
  }

  function filterStartMenu(query = "") {
    const normalized = String(query).trim().toLowerCase();
    if (normalized && !showingAllPrograms) {
      showingAllPrograms = true;
      renderStartPrograms();
    }
    for (const item of startPrograms.querySelectorAll("[data-search-text]")) {
      item.hidden = normalized.length > 0 && !item.dataset.searchText.includes(normalized);
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

  const desktopShortcutColumnStep = 94;
  const desktopShortcutRowStep = 110;

  function snapShortcutOffset(value, step) {
    const numeric = Number(value);
    if (!Number.isFinite(numeric)) return 0;
    return Math.round(numeric / step) * step;
  }

  function applySavedShortcutPositions() {
    const compact = window.matchMedia("(max-width: 760px)").matches;
    for (const shortcut of shortcuts.querySelectorAll(".desktop-shortcut")) {
      const locked = shortcut.dataset.layoutLocked === "true";
      const saved = compact || locked ? null : preferences.iconPositions?.[shortcut.dataset.appId];
      const x = snapShortcutOffset(saved?.x, desktopShortcutColumnStep);
      const y = snapShortcutOffset(saved?.y, desktopShortcutRowStep);
      shortcut.dataset.positionX = String(x);
      shortcut.dataset.positionY = String(y);
      shortcut.style.setProperty("--shortcut-x", `${x}px`);
      shortcut.style.setProperty("--shortcut-y", `${y}px`);
    }
  }

  function persistShortcutDrag(items, deltaX, deltaY) {
    const bounds = desktop.getBoundingClientRect();
    preferences.iconPositions = preferences.iconPositions && typeof preferences.iconPositions === "object" ? preferences.iconPositions : {};
    for (const item of items) {
      if (item.dataset.layoutLocked === "true") continue;
      const id = item.dataset.appId;
      if (!id) continue;
      const currentX = Number(item.dataset.positionX || 0);
      const currentY = Number(item.dataset.positionY || 0);
      const rect = item.getBoundingClientRect();
      const scale = getDesktopScale();
      const edgePadding = 4 * scale;
      const correctedX = currentX + deltaX + Math.max(0, bounds.left + edgePadding - rect.left) / scale - Math.max(0, rect.right - bounds.right + edgePadding) / scale;
      const correctedY = currentY + deltaY + Math.max(0, bounds.top + edgePadding - rect.top) / scale - Math.max(0, rect.bottom - bounds.bottom + edgePadding) / scale;
      const x = snapShortcutOffset(correctedX, desktopShortcutColumnStep);
      const y = snapShortcutOffset(correctedY, desktopShortcutRowStep);
      preferences.iconPositions[id] = { x, y };
      item.dataset.positionX = String(x);
      item.dataset.positionY = String(y);
      item.style.setProperty("--shortcut-x", `${x}px`);
      item.style.setProperty("--shortcut-y", `${y}px`);
    }
    savePreferences();
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
      if (event.button !== 0 || !event.isPrimary || window.matchMedia("(max-width: 760px)").matches) return;
      if (!(event.target instanceof Element)) return;
      const source = event.target.closest(selector);
      if (!source || !container.contains(source) || source.dataset.layoutLocked === "true") return;

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
        const deltaX = toDesktopUnits(moveEvent.clientX - startX);
        const deltaY = toDesktopUnits(moveEvent.clientY - startY);
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
        if (container === shortcuts) persistShortcutDrag(dragItems, lastX, lastY);
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
    const rect = desktop.getBoundingClientRect();
    return {
      left: rect.left,
      top: rect.top,
      right: rect.right,
      bottom: rect.bottom,
      width: desktop.clientWidth || rect.width,
      height: desktop.clientHeight || rect.height
    };
  }

  function getWindowLimits(application, bounds) {
    const margin = clamp(Math.round(Math.min(bounds.width, bounds.height) * 0.018), 8, 28);
    const availableWidth = Math.max(1, bounds.width - margin * 2);
    const availableHeight = Math.max(1, bounds.height - margin * 2);
    return {
      margin,
      availableWidth,
      availableHeight,
      minWidth: Math.min(Number(application.minWidth || 360), availableWidth),
      minHeight: Math.min(Number(application.minHeight || 260), availableHeight)
    };
  }

  function getLaunchGeometry(application) {
    const bounds = getWorkspaceBounds();
    const limits = getWindowLimits(application, bounds);
    const initialWidth = Number(application.initial?.width || 1180);
    const initialHeight = Number(application.initial?.height || 760);
    const width = Math.round(clamp(initialWidth, limits.minWidth, limits.availableWidth));
    const height = Math.round(clamp(initialHeight, limits.minHeight, limits.availableHeight));
    const initialX = Number(application.initial?.x);
    const initialY = Number(application.initial?.y);
    const maxX = Math.max(limits.margin, bounds.width - width - limits.margin);
    const maxY = Math.max(limits.margin, bounds.height - height - limits.margin);
    const x = clamp(Number.isFinite(initialX) ? initialX : (bounds.width - width) / 2, limits.margin, maxX);
    const y = clamp(Number.isFinite(initialY) ? initialY : (bounds.height - height) / 2, limits.margin, maxY);
    return { x: Math.round(x), y: Math.round(y), width, height };
  }

  function getRestoredGeometry(application) {
    const bounds = getWorkspaceBounds();
    const saved = state.windows?.[application.id] || {};
    const launch = getLaunchGeometry(application);
    const limits = getWindowLimits(application, bounds);
    const isReferenceCanvasGeometry = Number(saved.canvasVersion) === 1;
    const savedViewportWidth = Number(saved.viewportWidth || 0);
    const savedViewportHeight = Number(saved.viewportHeight || 0);

    const legacyWidth = Number.isFinite(Number(saved.widthRatio))
      ? DESKTOP_REFERENCE_WIDTH * Number(saved.widthRatio)
      : savedViewportWidth > 0 && saved.width !== undefined
        ? Number(saved.width) * DESKTOP_REFERENCE_WIDTH / savedViewportWidth
        : Number(saved.width ?? launch.width);
    const legacyHeight = Number.isFinite(Number(saved.heightRatio))
      ? DESKTOP_REFERENCE_WORKSPACE_HEIGHT * Number(saved.heightRatio)
      : savedViewportHeight > 0 && saved.height !== undefined
        ? Number(saved.height) * DESKTOP_REFERENCE_WORKSPACE_HEIGHT / savedViewportHeight
        : Number(saved.height ?? launch.height);

    const width = clamp(isReferenceCanvasGeometry ? Number(saved.width ?? launch.width) : legacyWidth, limits.minWidth, limits.availableWidth);
    const height = clamp(isReferenceCanvasGeometry ? Number(saved.height ?? launch.height) : legacyHeight, limits.minHeight, limits.availableHeight);
    const maxX = Math.max(limits.margin, bounds.width - width - limits.margin);
    const maxY = Math.max(limits.margin, bounds.height - height - limits.margin);

    const legacyX = Number.isFinite(Number(saved.xRatio))
      ? DESKTOP_REFERENCE_WIDTH * Number(saved.xRatio)
      : savedViewportWidth > 0 && saved.x !== undefined
        ? Number(saved.x) * DESKTOP_REFERENCE_WIDTH / savedViewportWidth
        : Number(saved.x ?? launch.x);
    const legacyY = Number.isFinite(Number(saved.yRatio))
      ? DESKTOP_REFERENCE_WORKSPACE_HEIGHT * Number(saved.yRatio)
      : savedViewportHeight > 0 && saved.y !== undefined
        ? Number(saved.y) * DESKTOP_REFERENCE_WORKSPACE_HEIGHT / savedViewportHeight
        : Number(saved.y ?? launch.y);

    const rawX = isReferenceCanvasGeometry ? Number(saved.x ?? launch.x) : legacyX;
    const rawY = isReferenceCanvasGeometry ? Number(saved.y ?? launch.y) : legacyY;
    const x = clamp(rawX, limits.margin, maxX);
    const y = clamp(rawY, limits.margin, maxY);
    return { x: Math.round(x), y: Math.round(y), width: Math.round(width), height: Math.round(height) };
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
      canvasVersion: 1,
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
    frame.src = new URL(application.url, document.baseURI).href;
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
      if (event.button !== 0 || window.matchMedia("(max-width: 760px)").matches) return;
      if (!(event.target instanceof Element) || event.target.closest(".folder-app__item")) return;
      const bounds = grid.getBoundingClientRect();
      const startClientX = clamp(event.clientX, bounds.left, bounds.right);
      const startClientY = clamp(event.clientY, bounds.top, bounds.bottom);
      const scale = getDesktopScale();
      const startX = (startClientX - bounds.left) / scale + grid.scrollLeft;
      const startY = (startClientY - bounds.top) / scale + grid.scrollTop;
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
        const currentX = (currentClientX - bounds.left) / scale + grid.scrollLeft;
        const currentY = (currentClientY - bounds.top) / scale + grid.scrollTop;
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

  function buildTemplateContent(application) {
    const template = document.getElementById(application.templateId);
    return template ? template.content.cloneNode(true) : document.createTextNode("Application content unavailable.");
  }

  function buildContent(application) {
    const program = programModules.get(application.id);
    if (program?.build) {
      const content = program.build(application, {
        applications,
        buildExternalBrowser,
        buildInternalFrame,
        buildTemplateContent,
        openApplication,
        root
      });
      if (content) return content;
    }
    if (application.kind === "template") return buildTemplateContent(application);
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
    const program = programModules.get(application.id);
    const programDestroy = typeof program?.initialize === "function"
      ? program.initialize(content, { applications, openApplication, root, actions: window.PortfolioActions })
      : null;
    element.append(titlebar, content);

    if (application.resizable !== false) {
      const resize = document.createElement("div");
      resize.className = "desktop-window__resize";
      resize.dataset.windowResize = "";
      resize.setAttribute("aria-hidden", "true");
      element.append(resize);
    }

    desktop.append(element);
    const entry = { application, element, minimized: false, maximized: false, restoreGeometry: null, taskbarButton: null, gameController: contentNode?.portfolioGameController || null, programDestroy: typeof programDestroy === "function" ? programDestroy : null };
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
    const embeddedTab = embeddedApplicationTabs.get(id);
    if (embeddedTab) {
      if (!openApplication("about-me", options)) return false;
      requestAnimationFrame(() => window.dispatchEvent(new CustomEvent("portfolio:about-tab", { detail: { target: embeddedTab } })));
      return true;
    }
    const registeredApplication = applications.get(id);
    if (!registeredApplication) return false;
    const application = id === "lilia" ? { ...registeredApplication, url: "https://github.com/LiliaFramework/" } : registeredApplication;
    playUiSound("open");
    let entry = windows.get(id);
    if (!entry) entry = createWindow(application);
    setWindowMinimizedState(entry, false);
    const saved = state.windows?.[id];
    const shouldMaximize = window.matchMedia("(max-width: 760px)").matches || saved?.maximized || (!saved && (application.defaultMaximized || application.id === "about"));
    if (shouldMaximize && !entry.maximized) maximizeWindow(entry, false);
    setActive(entry);
    persistWindow(entry);
    entry.gameController?.resume?.();
    if (options.focus !== false) {
      const program = programModules.get(application.id);
      if (entry.gameController?.focus) entry.gameController.focus();
      else if (typeof program?.focus === "function") program.focus(entry.element, { applications, openApplication, root, actions: window.PortfolioActions });
      else entry.element.focus({ preventScroll: true });
    }
    closeStartMenu();
    window.dispatchEvent(new CustomEvent("portfolio:app-opened", { detail: { id: application.id } }));
    return true;
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
    entry.programDestroy?.();
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
      programModules.get(entry.application.id)?.focus?.(entry.element, { applications, openApplication, root, actions: window.PortfolioActions });
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
      if (entry.maximized || window.matchMedia("(max-width: 760px)").matches || event.button !== 0 || event.target instanceof Element && event.target.closest("button")) return;
      const bounds = getWorkspaceBounds();
      const startX = event.clientX;
      const startY = event.clientY;
      const startLeft = Number.parseFloat(entry.element.style.left) || 0;
      const startTop = Number.parseFloat(entry.element.style.top) || 0;
      titlebar.setPointerCapture(event.pointerId);
      playUiSound("drag");
      entry.element.classList.add("is-being-dragged");
      const move = (moveEvent) => {
        const x = clamp(startLeft + toDesktopUnits(moveEvent.clientX - startX), 0, Math.max(0, bounds.width - 160));
        const y = clamp(startTop + toDesktopUnits(moveEvent.clientY - startY), 0, Math.max(0, bounds.height - 34));
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
      if (entry.maximized || window.matchMedia("(max-width: 760px)").matches || event.button !== 0) return;
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
        const width = clamp(startWidth + toDesktopUnits(moveEvent.clientX - startX), Number(entry.application.minWidth || 360), bounds.width - left);
        const height = clamp(startHeight + toDesktopUnits(moveEvent.clientY - startY), Number(entry.application.minHeight || 260), bounds.height - top);
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
      if (event.button !== 0 || window.matchMedia("(max-width: 760px)").matches) return;
      if (!(event.target instanceof Element)) return;
      if (event.target.closest('.desktop-shortcut, .desktop-window, .desktop-right-rail, a, button, input, select, textarea, label, summary, [role="button"], [role="link"], [data-no-desktop-select]')) return;
      const bounds = desktop.getBoundingClientRect();
      const scale = getDesktopScale();
      const startClientX = clamp(event.clientX, bounds.left, bounds.right);
      const startClientY = clamp(event.clientY, bounds.top, bounds.bottom);
      const startX = clamp((startClientX - bounds.left) / scale, 0, desktop.clientWidth);
      const startY = clamp((startClientY - bounds.top) / scale, 0, desktop.clientHeight);
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
        const currentClientX = clamp(moveEvent.clientX, bounds.left, bounds.right);
        const currentClientY = clamp(moveEvent.clientY, bounds.top, bounds.bottom);
        const currentX = clamp((currentClientX - bounds.left) / scale, 0, desktop.clientWidth);
        const currentY = clamp((currentClientY - bounds.top) / scale, 0, desktop.clientHeight);
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
        const selectionRect = { left: Math.min(startClientX, currentClientX), top: Math.min(startClientY, currentClientY), right: Math.max(startClientX, currentClientX), bottom: Math.max(startClientY, currentClientY) };
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
    root.dataset.wallpaper = preferences.wallpaperStyle || "pompompurin";
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

  function initializePompompurinWidget() {
    // Assistant widget removed.
  }

  function openCreation(slug) {
    if (!/^[a-z0-9_-]+$/i.test(String(slug || ""))) return false;
    if (!openApplication("creations")) return false;
    requestAnimationFrame(() => {
      const entry = windows.get("creations");
      const frame = entry?.element.querySelector(".internal-app-frame__iframe");
      if (frame) frame.src = new URL(`./${encodeURIComponent(slug)}/?embedded=1`, document.baseURI).href;
    });
    return true;
  }

  function formatSessionDuration() {
    const seconds = Math.max(0, Math.floor((Date.now() - sessionStartedAt) / 1000));
    const minutes = Math.floor(seconds / 60);
    return `${String(minutes).padStart(2, "0")}:${String(seconds % 60).padStart(2, "0")}`;
  }

  function getRuntimeStats() {
    return {
      openApplications: windows.size,
      theme: root.dataset.theme || "medium",
      wallpaper: root.dataset.wallpaper || "pompompurin",
      musicEnabled: Boolean(preferences.musicEnabled),
      sessionDuration: formatSessionDuration()
    };
  }

  function initializeNotices() {
    const onNotice = (event) => {
      const message = String(event.detail?.message || "").trim();
      if (!message) return;
      let notice = root.querySelector("[data-portfolio-notice]");
      if (!notice) {
        notice = document.createElement("div");
        notice.className = "portfolio-notice";
        notice.dataset.portfolioNotice = "";
        notice.setAttribute("role", "status");
        root.append(notice);
      }
      notice.textContent = message;
      notice.classList.add("is-visible");
      clearTimeout(notice.hideTimer);
      notice.hideTimer = setTimeout(() => notice.classList.remove("is-visible"), 3600);
    };
    window.addEventListener("portfolio:notice", onNotice);
  }

  function updateClock() {
    const now = new Date();
    clock.textContent = new Intl.DateTimeFormat(undefined, { hour: "2-digit", minute: "2-digit", hour12: false }).format(now);
    clock.title = new Intl.DateTimeFormat(undefined, { dateStyle: "full", timeStyle: "short" }).format(now);
  }

  function formatGitHubStat(value) {
    if (value === null || value === undefined || value === "") return "—";
    const number = Number(value);
    if (!Number.isFinite(number)) return "—";
    if (number >= 1000000) return `${(number / 1000000).toFixed(number >= 10000000 ? 0 : 1).replace(/\.0$/, "")}m`;
    if (number >= 1000) return `${(number / 1000).toFixed(number >= 10000 ? 0 : 1).replace(/\.0$/, "")}k`;
    return String(number);
  }

  async function initializeGitHubStats(scope = root) {
    const widget = scope?.matches?.("[data-github-stats]") ? scope : scope?.querySelector?.("[data-github-stats]");
    const username = widget?.dataset.githubUser?.trim();
    const organization = widget?.dataset.githubOrg?.trim() || "LiliaFramework";
    if (!widget || !username) return;
    if (widget.dataset.githubStatic === "true") {
      widget.classList.add("is-loaded");
      return;
    }

    const fields = {
      repositories: widget.querySelector("[data-github-repos]"),
      publicRepositories: widget.querySelector("[data-github-public-repos]"),
      privateRepositories: widget.querySelector("[data-github-private-repos]"),
      ownedPrivateRepositories: widget.querySelector("[data-github-owned-private-repos]"),
      totalRepositories: widget.querySelector("[data-github-total-repos]"),
      followers: widget.querySelector("[data-github-followers]"),
      stars: widget.querySelector("[data-github-stars]"),
      forks: widget.querySelector("[data-github-forks]"),
      since: widget.querySelector("[data-github-since]"),
      top: widget.querySelector("[data-github-top]"),
      recent: widget.querySelector("[data-github-recent]"),
      profileMetrics: widget.querySelector("[data-github-profile-metrics]"),
      repositoryMetrics: widget.querySelector("[data-github-repository-metrics]"),
      activityMetrics: widget.querySelector("[data-github-activity-metrics]"),
      recentEvents: widget.querySelector("[data-github-recent-events]"),
      languages: widget.querySelector("[data-github-languages]"),
      repositoryList: widget.querySelector("[data-github-repositories]"),
      liliaRepositories: widget.querySelector("[data-github-lilia-repos]"),
      liliaStars: widget.querySelector("[data-github-lilia-stars]"),
      liliaForks: widget.querySelector("[data-github-lilia-forks]"),
      liliaRelease: widget.querySelector("[data-github-lilia-release]"),
      liliaMetrics: widget.querySelector("[data-github-lilia-metrics]"),
      liliaLanguages: widget.querySelector("[data-github-lilia-languages]"),
      status: widget.querySelector("[data-github-status]")
    };
    const cacheKey = `samael.github.public.${username}.${organization}.v3`;
    const cacheLifetime = 6 * 60 * 60 * 1000;

    const setText = (element, value) => {
      if (element) element.textContent = value;
    };
    const formatDate = (value) => {
      const date = new Date(value || 0);
      if (Number.isNaN(date.getTime())) return "—";
      return new Intl.DateTimeFormat(undefined, { day: "2-digit", month: "short", year: "numeric" }).format(date);
    };
    const formatSize = (value) => {
      const kilobytes = Number(value);
      if (!Number.isFinite(kilobytes) || kilobytes < 0) return "—";
      if (kilobytes >= 1048576) return `${(kilobytes / 1048576).toFixed(1).replace(/\.0$/, "")} GB`;
      if (kilobytes >= 1024) return `${(kilobytes / 1024).toFixed(1).replace(/\.0$/, "")} MB`;
      return `${Math.round(kilobytes)} KB`;
    };
    const formatPercent = (value) => {
      const number = Number(value);
      if (!Number.isFinite(number)) return "—";
      return `${number.toFixed(number >= 10 ? 1 : 2).replace(/\.0+$/, "")}%`;
    };
    const accountYears = (value) => {
      const created = Date.parse(value || "");
      if (!Number.isFinite(created)) return "—";
      return `${Math.max(0, Math.floor((Date.now() - created) / 31556952000))}y`;
    };
    const renderMetrics = (container, values) => {
      if (!container) return;
      container.replaceChildren();
      for (const [label, value] of values) {
        const item = document.createElement("div");
        const strong = document.createElement("strong");
        const span = document.createElement("span");
        strong.textContent = value;
        span.textContent = label;
        item.append(strong, span);
        container.append(item);
      }
    };
    const renderLanguages = (container, languageData) => {
      if (!container) return;
      container.replaceChildren();
      const items = Array.isArray(languageData?.items) ? languageData.items.slice(0, 10) : [];
      if (!items.length) {
        const empty = document.createElement("span");
        empty.className = "about-github-empty";
        empty.textContent = "No language data available";
        container.append(empty);
        return;
      }
      const list = document.createElement("div");
      list.className = "about-github-language-list";
      for (const language of items) {
        const row = document.createElement("div");
        row.className = "about-github-language";
        const heading = document.createElement("div");
        const name = document.createElement("strong");
        const percent = document.createElement("span");
        const track = document.createElement("div");
        const fill = document.createElement("span");
        name.textContent = language.name || "Unknown";
        percent.textContent = `${formatPercent(language.percent)} · ${formatSize(Number(language.bytes || 0) / 1024)}`;
        heading.append(name, percent);
        track.className = "about-github-language__track";
        fill.className = "about-github-language__fill";
        fill.style.width = `${Math.max(0, Math.min(100, Number(language.percent || 0)))}%`;
        track.append(fill);
        row.append(heading, track);
        list.append(row);
      }
      container.append(list);
    };
    const renderRepositories = (container, repositories) => {
      if (!container) return;
      container.replaceChildren();
      const items = Array.isArray(repositories) ? repositories.slice(0, 5) : [];
      if (!items.length) {
        const empty = document.createElement("span");
        empty.className = "about-github-empty";
        empty.textContent = "No repository data available";
        container.append(empty);
        return;
      }
      const list = document.createElement("div");
      list.className = "about-github-repository-list";
      for (const repository of items) {
        const anchor = document.createElement("a");
        anchor.className = "about-github-repository";
        anchor.href = repository.url || `https://github.com/${repository.fullName || ""}`;
        anchor.target = "_blank";
        anchor.rel = "noopener noreferrer";
        const heading = document.createElement("div");
        const name = document.createElement("strong");
        const meta = document.createElement("span");
        const description = document.createElement("p");
        name.textContent = repository.name || repository.fullName || "Repository";
        meta.textContent = `${formatGitHubStat(repository.stars)} ★ · ${formatGitHubStat(repository.forks)} forks${repository.language ? ` · ${repository.language}` : ""}`;
        heading.append(name, meta);
        description.textContent = repository.description || `Last pushed ${formatDate(repository.pushedAt)}`;
        anchor.append(heading, description);
        list.append(anchor);
      }
      container.append(list);
    };
    const eventLabels = {
      PushEvent: "Push",
      PullRequestEvent: "Pull request",
      IssuesEvent: "Issue",
      IssueCommentEvent: "Issue comment",
      PullRequestReviewEvent: "PR review",
      PullRequestReviewCommentEvent: "Review comment",
      ReleaseEvent: "Release",
      CreateEvent: "Create",
      ForkEvent: "Fork",
      WatchEvent: "Star"
    };
    const renderEvents = (container, events) => {
      if (!container) return;
      container.replaceChildren();
      const items = Array.isArray(events) ? events.slice(0, 8) : [];
      if (!items.length) {
        const empty = document.createElement("span");
        empty.className = "about-github-empty";
        empty.textContent = "No recent public events available";
        container.append(empty);
        return;
      }
      const list = document.createElement("div");
      list.className = "about-github-event-list";
      for (const event of items) {
        const row = document.createElement(event.repositoryUrl ? "a" : "div");
        row.className = "about-github-event";
        if (event.repositoryUrl) {
          row.href = event.repositoryUrl;
          row.target = "_blank";
          row.rel = "noopener noreferrer";
        }
        const copy = document.createElement("div");
        const title = document.createElement("strong");
        const meta = document.createElement("span");
        title.textContent = `${eventLabels[event.type] || event.type || "Activity"}${event.action ? ` · ${event.action}` : ""}`;
        meta.textContent = `${event.repository || "GitHub"} · ${formatDate(event.createdAt)}${event.commits ? ` · ${event.commits} commits` : ""}`;
        copy.append(title, meta);
        row.append(copy);
        list.append(row);
      }
      container.append(list);
    };
    const renderExtended = (snapshot) => {
      const profile = snapshot?.personal?.profile || {};
      const repositories = snapshot?.personal?.repositories || {};
      const activity = snapshot?.personal?.activity || {};
      const labs = Array.isArray(snapshot?.personal?.labs) ? snapshot.personal.labs : [];
      const organizations = Array.isArray(snapshot?.personal?.organizations) ? snapshot.personal.organizations : [];
      renderMetrics(fields.profileMetrics, [
        ["Public repos", formatGitHubStat(repositories.public ?? profile.publicRepos)],
        ["Private repos", formatGitHubStat(profile.privateRepos)],
        ["Owned private", formatGitHubStat(profile.ownedPrivateRepos)],
        ["Total repos", formatGitHubStat(profile.totalRepos)],
        ["Original", formatGitHubStat(repositories.original)],
        ["Forked", formatGitHubStat(repositories.forks)],
        ["Active", formatGitHubStat(repositories.activeOriginal)],
        ["Archived", formatGitHubStat(repositories.archived)],
        ["Following", formatGitHubStat(profile.following)],
        ["Public gists", formatGitHubStat(profile.publicGists)],
        ["Organizations", formatGitHubStat(organizations.length)],
        ["Account age", accountYears(profile.createdAt)]
      ]);
      renderMetrics(fields.repositoryMetrics, [
        ["Stars received", formatGitHubStat(repositories.totalStars)],
        ["Forks received", formatGitHubStat(repositories.totalForks)],
        ["Open issues / PRs", formatGitHubStat(repositories.totalOpenIssues)],
        ["Repository size", formatSize(repositories.totalSizeKb)],
        ["Public releases", formatGitHubStat(repositories.totalReleases)],
        ["Release downloads", formatGitHubStat(repositories.totalReleaseDownloads)],
        ["Average stars", String(repositories.averageStars ?? "—")],
        ["Average forks", String(repositories.averageForks ?? "—")],
        ["Active · 30d", formatGitHubStat(repositories.active30Days)],
        ["Active · 90d", formatGitHubStat(repositories.active90Days)],
        ["Active · 1y", formatGitHubStat(repositories.active365Days)],
      ]);
      renderMetrics(fields.activityMetrics, [
        ["Public events", formatGitHubStat(activity.total)],
        ["Push events", formatGitHubStat(activity.pushes)],
        ["Commits in pushes", formatGitHubStat(activity.commits)],
        ["PR events", formatGitHubStat(activity.pullRequests)],
        ["Issue events", formatGitHubStat(activity.issues)],
        ["Reviews", formatGitHubStat(activity.reviews)],
        ["Issue comments", formatGitHubStat(activity.issueComments)],
        ["Releases", formatGitHubStat(activity.releases)],
        ["Active days", formatGitHubStat(activity.activeDays)],
        ["Repos touched", formatGitHubStat(activity.repositoriesTouched)],
        ["Current streak", `${formatGitHubStat(activity.currentStreak)}d`],
        ["Longest streak", `${formatGitHubStat(activity.longestStreak)}d`]
      ]);
      renderLanguages(fields.languages, snapshot?.personal?.languages);
      renderRepositories(fields.repositoryList, repositories.top);
      renderEvents(fields.recentEvents, activity.recentEvents);

      const frameworkRepositories = snapshot?.liliaFramework?.repositories || {};
      const flagship = snapshot?.liliaFramework?.flagship || {};
      const flagshipRepository = flagship.repository || {};
      renderMetrics(fields.liliaMetrics, [
        ["Active repos", formatGitHubStat(frameworkRepositories.activeOriginal)],
        ["Archived", formatGitHubStat(frameworkRepositories.archived)],
        ["Open issues / PRs", formatGitHubStat(frameworkRepositories.totalOpenIssues)],
        ["Lilia stars", formatGitHubStat(flagshipRepository.stars)],
        ["Lilia forks", formatGitHubStat(flagshipRepository.forks)],
        ["Public releases", formatGitHubStat(flagship.releases)],
        ["Asset downloads", formatGitHubStat(flagship.releaseDownloads)],
        ["Contributors", formatGitHubStat(flagship.contributors)]
      ]);
      renderLanguages(fields.liliaLanguages, flagship.languages);
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
      setText(fields.publicRepositories, formatGitHubStat(data.personal.public));
      setText(fields.privateRepositories, formatGitHubStat(data.personal.privateRepos));
      setText(fields.ownedPrivateRepositories, formatGitHubStat(data.personal.ownedPrivateRepos));
      setText(fields.totalRepositories, formatGitHubStat(data.personal.totalRepos));
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
      const response = await fetch("/github-stats.json", { cache: "no-store" });
      if (response.ok) {
        const snapshot = await response.json();
        const personalRepositories = snapshot?.personal?.repositories || {};
        const personalProfile = snapshot?.personal?.profile || {};
        const frameworkRepositories = snapshot?.liliaFramework?.repositories || {};
        const release = snapshot?.liliaFramework?.flagship?.latestRelease || null;
        if (personalRepositories.original !== undefined && frameworkRepositories.original !== undefined) {
          renderExtended(snapshot);
          applyData({
            personal: {
              original: personalRepositories.original,
              public: personalRepositories.public,
              privateRepos: personalProfile.privateRepos,
              ownedPrivateRepos: personalProfile.ownedPrivateRepos,
              totalRepos: personalProfile.totalRepos ?? (personalProfile.publicRepos !== undefined && personalProfile.privateRepos !== undefined ? Number(personalProfile.publicRepos) + Number(personalProfile.privateRepos) : null),
              followers: personalProfile.followers,
              stars: personalRepositories.totalStars,
              forks: personalRepositories.totalForks,
              createdAt: personalProfile.createdAt,
              top: personalRepositories.mostStarred ? { name: personalRepositories.mostStarred.name, stargazers_count: personalRepositories.mostStarred.stars } : null,
              recent: personalRepositories.mostRecentlyActive ? { name: personalRepositories.mostRecentlyActive.name, pushed_at: personalRepositories.mostRecentlyActive.pushedAt } : null
            },
            framework: {
              original: frameworkRepositories.original,
              stars: frameworkRepositories.totalStars,
              forks: frameworkRepositories.totalForks,
              release: release ? { name: release.name, tag_name: release.tag, published_at: release.publishedAt } : null
            }
          }, Boolean(snapshot?.stale));
          return;
        }
      }
    } catch {}

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
    const applicationTrigger = event.target instanceof Element ? event.target.closest("[data-open-app]") : null;
    if (applicationTrigger) {
      const appId = String(applicationTrigger.dataset.openApp || "").trim();
      if (applications.has(appId)) {
        event.preventDefault();
        openApplication(appId);
        return;
      }
    }
    const trigger = event.target instanceof Element ? event.target.closest("[data-pfp-audio-trigger]") : null;
    if (trigger) document.querySelector("[data-global-profile-audio-trigger]")?.click();
  });
  startPrograms.addEventListener("click", (event) => {
    const item = event.target instanceof Element ? event.target.closest("[data-app-id]") : null;
    if (item) openApplication(item.dataset.appId);
  });
  startPlaces?.addEventListener("click", (event) => {
    const item = event.target instanceof Element ? event.target.closest("[data-app-id]") : null;
    if (item) openApplication(item.dataset.appId);
  });
  startSearch?.addEventListener("input", () => filterStartMenu(startSearch.value));
  startSearch?.addEventListener("keydown", (event) => {
    if (event.key !== "Enter") return;
    const firstVisible = startPrograms.querySelector("[data-search-text]:not([hidden])");
    if (!(firstVisible instanceof HTMLElement)) return;
    event.preventDefault();
    firstVisible.click();
  });
  startAllPrograms?.addEventListener("click", () => {
    showingAllPrograms = !showingAllPrograms;
    if (startSearch) startSearch.value = "";
    renderStartPrograms();
    startPrograms.querySelector("button")?.focus({ preventScroll: true });
  });
  restartButton?.addEventListener("click", restartSystem);
  shutdownButton?.addEventListener("click", shutdownSystem);
  shutdownStart?.addEventListener("click", () => location.reload());
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
  let viewportSyncFrame = 0;
  const synchronizeViewport = () => {
    syncDesktopCanvasScale();
    logViewportDiagnostics("resize");
    applySavedShortcutPositions();
    for (const entry of windows.values()) {
      if (entry.maximized) {
        entry.element.style.left = "0px";
        entry.element.style.top = "0px";
        entry.element.style.width = "100%";
        entry.element.style.height = "100%";
        entry.gameController?.resize?.();
        continue;
      }
      applyGeometry(entry, getRestoredGeometry(entry.application));
      entry.gameController?.resize?.();
      persistWindow(entry);
    }
  };
  const scheduleViewportSync = () => {
    if (viewportSyncFrame) cancelAnimationFrame(viewportSyncFrame);
    viewportSyncFrame = requestAnimationFrame(() => {
      viewportSyncFrame = 0;
      synchronizeViewport();
    });
  };
  window.addEventListener("resize", scheduleViewportSync);
  window.visualViewport?.addEventListener("resize", scheduleViewportSync);
  if (typeof ResizeObserver === "function") {
    const viewportObserver = new ResizeObserver(scheduleViewportSync);
    viewportObserver.observe(desktop);
  }
  window.addEventListener("message", (event) => {
    if (!event.data) return;
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
  applySavedShortcutPositions();
  bindDesktopMarqueeSelection();
  initializeTheme();
  syncSettingsUi();
  initializeNotices();
  updateClock();
  initializeGitHubStats();
  setInterval(updateClock, 15000);

  window.PortfolioDesktop = {
    applications,
    openApplication,
    openCreation,
    getRuntimeStats,
    initializeGitHubStats
  };

  const requestedApplication = new URLSearchParams(location.search).get("app");

  function restoreDesktopSession() {
    if (requestedApplication && applications.has(requestedApplication)) {
      openApplication(requestedApplication, { focus: false });
      const requestedWindow = windows.get(requestedApplication);
      if (requestedWindow && !requestedWindow.minimized) setActive(requestedWindow);
    }
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
