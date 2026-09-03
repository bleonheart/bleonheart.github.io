(() => {
  "use strict";

  const baseCreate = window.PortfolioGames?.create;
  const difficulties = ["easy", "normal", "hard"];
  const gameAudio = window.PortfolioGameAudio || { play() {}, bind() {} };

  function colors() {
    const style = getComputedStyle(document.querySelector("[data-desktop-shell]") || document.documentElement);
    const value = (name, fallback) => style.getPropertyValue(name).trim() || fallback;
    return {
      background: value("--desktop-charcoal", "#0f1411"),
      panel: value("--desktop-panel", "#1b221c"),
      line: value("--desktop-line", "#3f463d"),
      cream: value("--desktop-cream", "#f1d89a"),
      brown: value("--desktop-brown", "#987044"),
      orange: value("--desktop-orange", "#d69a47"),
      green: value("--desktop-green", "#92b95a"),
      text: value("--desktop-text", "#d9ded8"),
      muted: value("--desktop-muted", "#8f9990")
    };
  }


  function drawGrid(context, width, height, size) {
    context.save();
    context.strokeStyle = "rgba(63,70,61,.22)";
    context.lineWidth = 1;
    context.beginPath();
    for (let x = size; x < width; x += size) {
      context.moveTo(x + .5, 0);
      context.lineTo(x + .5, height);
    }
    for (let y = size; y < height; y += size) {
      context.moveTo(0, y + .5);
      context.lineTo(width, y + .5);
    }
    context.stroke();
    context.restore();
  }

  function drawBeveledRect(context, x, y, width, height, color) {
    context.fillStyle = color;
    context.fillRect(x, y, width, height);
    context.fillStyle = "rgba(255,255,255,.16)";
    context.fillRect(x + 2, y + 2, Math.max(0, width - 4), 2);
    context.fillRect(x + 2, y + 2, 2, Math.max(0, height - 4));
    context.fillStyle = "rgba(0,0,0,.24)";
    context.fillRect(x + 2, y + height - 4, Math.max(0, width - 4), 2);
    context.fillRect(x + width - 4, y + 2, 2, Math.max(0, height - 4));
    context.strokeStyle = "rgba(8,11,9,.76)";
    context.strokeRect(x + .5, y + .5, Math.max(0, width - 1), Math.max(0, height - 1));
  }

  function safeGet(key, fallback = "") {
    try {
      const value = localStorage.getItem(key);
      return value === null ? fallback : value;
    } catch {
      return fallback;
    }
  }

  function safeSet(key, value) {
    try {
      localStorage.setItem(key, String(value));
    } catch {}
  }

  function safeNumber(key, fallback = 0) {
    const value = Number(safeGet(key, fallback));
    return Number.isFinite(value) ? value : fallback;
  }

  function difficultyKey(game) {
    return `samael.games.${game}.difficulty`;
  }

  function storedDifficulty(game) {
    const value = safeGet(difficultyKey(game), "normal");
    return difficulties.includes(value) ? value : "normal";
  }

  const gameStartImageClass = "game-start-screen__image";

  const gameStartMeta = {
    minesweeper: { title: "Minesweeper", description: "Clear the board without opening a mine.", howToPlay: "Left-click a tile to reveal it and right-click to place a flag. Numbered tiles tell you how many mines touch that tile; use those clues to identify every safe space." },
    solitaire: { title: "Solitaire", description: "Build all four foundations from Ace through King.", howToPlay: "Move face-up cards between tableau columns in descending order with alternating colors. Empty spaces accept Kings, and foundation piles build upward by suit. Use the stock when no useful tableau move is available." },
    snake: { title: "Snake", description: "Eat food, grow longer, and survive for the highest score.", howToPlay: "Steer with the arrow keys or WASD. Each food item lengthens the snake. Avoid your own body and, on difficulties without wrapping, the walls. You cannot reverse direction instantly." },
    breakout: { title: "Breakout", description: "Destroy every brick while keeping the ball in play.", howToPlay: "Move the paddle left and right to return the ball. Where the ball hits the paddle changes its rebound angle. Clear the brick field to advance while protecting your remaining lives." },
    asteroids: { title: "Asteroids", description: "Survive incoming asteroid waves and build a high score.", howToPlay: "Rotate your ship, apply thrust, and fire at asteroids. Large asteroids split into smaller hazards when hit. Your ship and the asteroids wrap around the edges of the playfield." },
    sokoban: { title: "Sokoban", description: "Push every crate onto a target tile.", howToPlay: "Move one tile at a time and push crates from behind. Crates cannot be pulled, so plan ahead to avoid trapping one against a wall or in a corner. Undo is available when a push creates a dead end." },
    chess: { title: "Chess", description: "Checkmate the opposing king using full chess rules.", howToPlay: "Click one of your pieces, then click a highlighted legal destination. Local mode alternates players on the same board; CPU mode lets you play White against the computer. Castling, en passant, promotion, check, checkmate, and stalemate are supported." },
    pinball: { title: "Pinball", description: "Keep the ball alive and score from bumpers and targets.", howToPlay: "Use the left and right flippers to keep the ball above the drain. Striking bumpers and scoring targets adds points. Each drained ball costs one of your remaining balls." },
    memory: { title: "Memory", description: "Match every hidden pair with as few moves as possible.", howToPlay: "Flip two cards at a time. Matching cards stay visible; mismatched cards turn back over after a short delay. Remember their positions and clear the entire board before the timer grows." },
    "lunar-lander": { title: "Lunar Lander", description: "Land safely on the marked pad before fuel runs out.", howToPlay: "Use thrust to manage vertical speed and horizontal controls to line up with the pad. A successful landing requires your craft to be over the pad and below the safe impact-speed limits shown by the current difficulty." }
  };

  function buildGameStartIntro(game, overrides = null) {
    const detail = { ...(gameStartMeta[game] || {}), ...(overrides || {}) };
    if (!detail.title && !detail.description && !detail.note) return null;
    const intro = document.createElement("section");
    intro.className = "game-start-screen__intro game-start-screen__intro--text-only";

    const copy = document.createElement("div");
    copy.className = "game-start-screen__copy";
    if (detail.title) {
      const gameTitle = document.createElement("strong");
      gameTitle.className = "game-start-screen__game-title";
      gameTitle.textContent = detail.title;
      copy.append(gameTitle);
    }
    if (detail.description) {
      const description = document.createElement("p");
      description.className = "game-start-screen__description game-start-screen__objective";
      description.textContent = detail.description;
      copy.append(description);
    }
    if (detail.howToPlay) {
      const howToPlayLabel = document.createElement("strong");
      howToPlayLabel.className = "game-start-screen__how-title";
      howToPlayLabel.textContent = "HOW TO PLAY";
      const howToPlay = document.createElement("p");
      howToPlay.className = "game-start-screen__description game-start-screen__how-copy";
      howToPlay.textContent = detail.howToPlay;
      copy.append(howToPlayLabel, howToPlay);
    }
    if (detail.note) {
      const note = document.createElement("p");
      note.className = "game-start-screen__description is-note";
      note.textContent = detail.note;
      copy.append(note);
    }
    intro.append(copy);
    return intro;
  }

  function makeButton(label, action) {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "retro-game__button";
    button.dataset.gameAction = action;
    button.textContent = label;
    return button;
  }

  function makeShell(title) {
    const element = document.createElement("div");
    element.className = "retro-game retro-game--suite retro-game--framed";
    element.tabIndex = 0;
    element.setAttribute("aria-label", title);

    const body = document.createElement("div");
    body.className = "retro-game__body";
    const stage = document.createElement("div");
    stage.className = "retro-game__stage retro-game__stage--suite";
    const sidebar = document.createElement("aside");
    sidebar.className = "retro-game__sidebar";

    const actions = document.createElement("div");
    actions.className = "retro-game__menu-actions";
    const newGame = makeButton("New Game", "new");
    const restart = makeButton("Restart", "restart");
    const pause = makeButton("Pause", "pause");
    newGame.classList.add("retro-game__button--primary");
    actions.append(newGame, restart, pause);
    sidebar.append(actions);
    body.append(stage, sidebar);

    const status = document.createElement("div");
    status.className = "retro-game__status";
    status.textContent = "Select a difficulty";
    element.append(body, status);
    return { element, stage, sidebar, status, newGame, restart, pause };
  }

  function makeStat(label, initial = "0") {
    const row = document.createElement("div");
    row.className = "retro-game__stat";
    const name = document.createElement("span");
    name.textContent = label;
    const value = document.createElement("strong");
    value.textContent = initial;
    row.append(name, value);
    return { row, value };
  }

  function makeControls(entries) {
    const list = document.createElement("div");
    list.className = "retro-game__controls-list";
    for (const [keys, action] of entries) {
      const row = document.createElement("div");
      row.className = "retro-game__control-row";
      const key = document.createElement("kbd");
      key.textContent = keys;
      const label = document.createElement("span");
      label.textContent = action;
      row.append(key, label);
      list.append(row);
    }
    return list;
  }

  function showDifficultyMenu(stage, game, title, definitions, onStart, details = null) {
    stage.querySelector(".game-start-screen")?.remove();
    const overlay = document.createElement("div");
    overlay.className = "game-start-screen";
    const panel = document.createElement("div");
    panel.className = "game-start-screen__panel";
    const intro = buildGameStartIntro(game, details);
    const setup = document.createElement("section");
    setup.className = "game-start-screen__setup";
    const heading = document.createElement("strong");
    heading.className = "game-start-screen__heading";
    heading.textContent = title || "SELECT DIFFICULTY";
    const helper = document.createElement("p");
    helper.className = "game-start-screen__setup-copy";
    helper.textContent = "Choose a preset, then start the game.";
    const options = document.createElement("div");
    options.className = "game-difficulty";
    let selected = storedDifficulty(game);

    for (const value of difficulties) {
      const definition = definitions[value];
      const button = document.createElement("button");
      button.type = "button";
      button.className = "game-difficulty__option";
      button.dataset.gameDifficulty = value;
      const label = document.createElement("strong");
      label.className = "game-difficulty__label";
      label.textContent = definition.label;
      const description = document.createElement("span");
      description.className = "game-difficulty__description";
      description.textContent = definition.description;
      button.append(label, description);
      options.append(button);
    }

    const start = makeButton("Start Game", "start-difficulty");
    start.classList.add("game-start-screen__start");
    setup.append(heading, helper, options, start);
    if (intro) panel.append(intro);
    panel.append(setup);
    overlay.append(panel);
    stage.append(overlay);

    const render = () => {
      for (const button of options.querySelectorAll("[data-game-difficulty]")) {
        button.classList.toggle("game-difficulty__selected", button.dataset.gameDifficulty === selected);
        button.setAttribute("aria-pressed", String(button.dataset.gameDifficulty === selected));
      }
    };

    options.addEventListener("click", (event) => {
      const button = event.target instanceof Element ? event.target.closest("[data-game-difficulty]") : null;
      if (!button) return;
      selected = difficulties.includes(button.dataset.gameDifficulty) ? button.dataset.gameDifficulty : "normal";
      render();
    });

    start.addEventListener("click", () => {
      safeSet(difficultyKey(game), selected);
      overlay.remove();
      onStart(selected);
    });

    render();
    return overlay;
  }

  function makeTouchControls(entries) {
    const controls = document.createElement("div");
    controls.className = "retro-game__touch-controls";
    for (const [label, action] of entries) controls.append(makeButton(label, action));
    return controls;
  }

  function bindStandardActions(shell, handlers) {
    shell.element.addEventListener("click", (event) => {
      const button = event.target instanceof Element ? event.target.closest("[data-game-action]") : null;
      if (!button) return;
      const action = button.dataset.gameAction;
      if (action === "new") handlers.newGame?.();
      if (action === "restart") handlers.restart?.();
      if (action === "pause") handlers.pause?.();
      shell.element.focus({ preventScroll: true });
    });
  }

  function canvasResize(canvas, width, height) {
    canvas.width = width;
    canvas.height = height;
    canvas.classList.add("retro-game__canvas--wide");
  }

  function createLunarLander() {
    const game = "lunar-lander";
    const shell = makeShell("Lunar Lander");
    const canvas = document.createElement("canvas");
    canvasResize(canvas, 720, 480);
    canvas.setAttribute("aria-label", "Lunar Lander playfield");
    shell.stage.append(canvas);
    const touch = makeTouchControls([["←","left"],["THRUST","thrust"],["→","right"]]);
    shell.stage.append(touch);
    const altitudeStat = makeStat("Altitude");
    const horizontalStat = makeStat("H-Vel");
    const verticalStat = makeStat("V-Vel");
    const fuelStat = makeStat("Fuel");
    const scoreStat = makeStat("Score");
    const difficultyStat = makeStat("Difficulty", "—");
    const bestStat = makeStat("Best");
    shell.sidebar.append(altitudeStat.row, horizontalStat.row, verticalStat.row, fuelStat.row, scoreStat.row, difficultyStat.row, bestStat.row, makeControls([["← → / A D", "Horizontal"], ["↑ / W / Space", "Thrust"], ["P / Esc", "Pause"]]));
    const configs = {
      easy: { label: "Easy", description: "Weak gravity · generous fuel · large pads", gravity: 19, thrust: 46, side: 30, fuel: 1500, pad: 130, safeV: 38, safeH: 30, terrain: 32 },
      normal: { label: "Normal", description: "Balanced lunar physics", gravity: 25, thrust: 50, side: 28, fuel: 1100, pad: 92, safeV: 28, safeH: 22, terrain: 52 },
      hard: { label: "Hard", description: "Strong gravity · small pads · strict landing", gravity: 31, thrust: 53, side: 26, fuel: 850, pad: 64, safeV: 21, safeH: 16, terrain: 76 }
    };
    const context = canvas.getContext("2d");
    const keys = new Set();
    let difficulty = null;
    let config = null;
    let lander = null;
    let terrain = [];
    let pad = null;
    let score = 0;
    let manualPaused = false;
    let lifecyclePaused = false;
    let over = false;
    let last = 0;
    let animation = 0;
    let destroyed = false;
    let touchState = { left: false, right: false, thrust: false };

    function bestKey() {
      return `samael.games.lunar-lander.highScore.${difficulty}`;
    }

    function makeTerrain() {
      terrain = [{ x: 0, y: 410 }];
      let y = 390 + (Math.random() - .5) * config.terrain;
      for (let x = 60; x < canvas.width; x += 60) {
        y = Math.max(315, Math.min(445, y + (Math.random() - .5) * config.terrain));
        terrain.push({ x, y });
      }
      terrain.push({ x: canvas.width, y: terrain[terrain.length - 1].y });
      const padIndex = 3 + Math.floor(Math.random() * Math.max(1, terrain.length - 7));
      const center = terrain[padIndex].x;
      const padY = Math.min(430, Math.max(340, terrain[padIndex].y));
      pad = { x1: center - config.pad / 2, x2: center + config.pad / 2, y: padY };
      for (const point of terrain) {
        if (point.x >= pad.x1 - 20 && point.x <= pad.x2 + 20) point.y = padY;
      }
    }

    function terrainY(x) {
      for (let i = 0; i < terrain.length - 1; i += 1) {
        const a = terrain[i];
        const b = terrain[i + 1];
        if (x >= a.x && x <= b.x) {
          const t = (x - a.x) / Math.max(1, b.x - a.x);
          return a.y + (b.y - a.y) * t;
        }
      }
      return canvas.height;
    }

    function updateStats() {
      if (!lander) return;
      altitudeStat.value.textContent = Math.max(0, Math.round(terrainY(lander.x) - lander.y - 12)).toString();
      horizontalStat.value.textContent = lander.vx.toFixed(1);
      verticalStat.value.textContent = lander.vy.toFixed(1);
      fuelStat.value.textContent = Math.max(0, Math.round(lander.fuel)).toString();
      scoreStat.value.textContent = String(Math.round(score));
      difficultyStat.value.textContent = config?.label || "—";
      bestStat.value.textContent = String(difficulty ? safeNumber(bestKey(), 0) : 0);
    }

    function finish(landed) {
      over = true;
      if (landed) {
        score = Math.max(0, Math.round(1000 + lander.fuel * .8 - Math.abs(lander.vx) * 8 - Math.abs(lander.vy) * 6));
        if (score > safeNumber(bestKey(), 0)) safeSet(bestKey(), score);
        shell.status.textContent = `Safe landing · Score ${score}`;
      } else {
        shell.status.textContent = "Crash";
      }
      updateStats();
    }

    function update(delta) {
      const seconds = delta / 1000;
      const thrusting = (keys.has("arrowup") || keys.has("w") || keys.has(" ") || touchState.thrust) && lander.fuel > 0;
      const side = ((keys.has("arrowright") || keys.has("d") || touchState.right ? 1 : 0) - (keys.has("arrowleft") || keys.has("a") || touchState.left ? 1 : 0));
      lander.vy += config.gravity * seconds;
      if (thrusting) {
        lander.vy -= config.thrust * seconds;
        lander.fuel = Math.max(0, lander.fuel - 42 * seconds);
      }
      if (side && lander.fuel > 0) {
        lander.vx += side * config.side * seconds;
        lander.fuel = Math.max(0, lander.fuel - 18 * seconds);
      }
      lander.x += lander.vx * seconds;
      lander.y += lander.vy * seconds;
      if (lander.x < 10) { lander.x = 10; lander.vx = Math.abs(lander.vx) * .45; }
      if (lander.x > canvas.width - 10) { lander.x = canvas.width - 10; lander.vx = -Math.abs(lander.vx) * .45; }
      const ground = terrainY(lander.x);
      if (lander.y + 14 >= ground) {
        const onPad = lander.x >= pad.x1 + 8 && lander.x <= pad.x2 - 8 && Math.abs(ground - pad.y) < 2;
        const safe = onPad && Math.abs(lander.vx) <= config.safeH && Math.abs(lander.vy) <= config.safeV;
        lander.y = ground - 14;
        finish(safe);
      }
      updateStats();
    }

    function draw() {
      const c = colors();
      context.fillStyle = c.background;
      context.fillRect(0,0,canvas.width,canvas.height);
      if (!difficulty) return;
      context.strokeStyle = c.muted;
      context.lineWidth = 2;
      context.beginPath();
      for (const [index, point] of terrain.entries()) {
        if (!index) context.moveTo(point.x,point.y); else context.lineTo(point.x,point.y);
      }
      context.lineTo(canvas.width,canvas.height);
      context.lineTo(0,canvas.height);
      context.closePath();
      context.fillStyle = c.panel;
      context.fill();
      context.stroke();
      context.strokeStyle = c.orange;
      context.lineWidth = 5;
      context.beginPath();
      context.moveTo(pad.x1,pad.y);
      context.lineTo(pad.x2,pad.y);
      context.stroke();
      if (lander) {
        context.save();
        context.translate(lander.x,lander.y);
        context.strokeStyle = over && shell.status.textContent === "Crash" ? c.orange : c.cream;
        context.lineWidth = 2;
        context.beginPath();
        context.moveTo(0,-12);
        context.lineTo(-10,9);
        context.lineTo(10,9);
        context.closePath();
        context.stroke();
        context.beginPath();
        context.moveTo(-7,9); context.lineTo(-13,14); context.moveTo(7,9); context.lineTo(13,14); context.stroke();
        const thrusting = !over && (keys.has("arrowup") || keys.has("w") || keys.has(" ") || touchState.thrust) && lander.fuel > 0;
        if (thrusting) {
          context.strokeStyle = c.orange;
          context.beginPath(); context.moveTo(-4,10); context.lineTo(0,22 + Math.random()*6); context.lineTo(4,10); context.stroke();
        }
        context.restore();
      }
      if (manualPaused || lifecyclePaused || over) {
        context.fillStyle = "rgba(8,11,9,.52)";
        context.fillRect(0,0,canvas.width,canvas.height);
        context.fillStyle = c.cream;
        context.font = "700 22px sans-serif";
        context.textAlign = "center";
        context.fillText(over ? shell.status.textContent : "PAUSED", canvas.width / 2, 90);
      }
    }

    function tick(time) {
      animation = 0;
      if (destroyed) return;
      const delta = last ? Math.min(34, time - last) : 0;
      last = time;
      if (difficulty && lander && !manualPaused && !lifecyclePaused && !over) update(delta);
      draw();
      if (difficulty && !manualPaused && !lifecyclePaused && !over) animation = requestAnimationFrame(tick);
    }

    function start(selected) {
      difficulty = selected;
      config = configs[selected];
      makeTerrain();
      lander = { x: canvas.width * .22, y: 70, vx: 28, vy: 0, fuel: config.fuel };
      score = 0;
      manualPaused = false;
      lifecyclePaused = false;
      over = false;
      updateStats();
      shell.status.textContent = `${config.label} · Land softly on the orange pad`;
      last = performance.now();
      if (!animation) animation = requestAnimationFrame(tick);
    }

    function selector() {
      if (animation) cancelAnimationFrame(animation);
      animation = 0;
      difficulty = null;
      lander = null;
      showDifficultyMenu(shell.stage, game, "SELECT DIFFICULTY", configs, start);
      difficultyStat.value.textContent = "—";
      shell.status.textContent = "Select a difficulty";
    }

    function togglePause() {
      if (!difficulty || over) return;
      manualPaused = !manualPaused;
      shell.pause.textContent = manualPaused ? "Resume" : "Pause";
      shell.status.textContent = manualPaused ? "Paused" : `${config.label}`;
      last = performance.now();
      if (manualPaused) {
        if (animation) cancelAnimationFrame(animation);
        animation = 0;
        draw();
      } else if (!animation) {
        animation = requestAnimationFrame(tick);
      }
    }

    shell.element.addEventListener("keydown", (event) => {
      if (event.target instanceof Element && event.target.closest("button,input,select,textarea,a")) return;
      const key = event.key.toLowerCase();
      if (["arrowleft","arrowright","arrowup","a","d","w"," ","p","escape"].includes(key)) event.preventDefault();
      if (key === "p" || key === "escape") {
        if (!event.repeat) togglePause();
        return;
      }
      keys.add(key);
    });
    shell.element.addEventListener("keyup", (event) => keys.delete(event.key.toLowerCase()));
    touch.addEventListener("pointerdown", (event) => {
      const button = event.target instanceof Element ? event.target.closest("[data-game-action]") : null;
      if (!button) return;
      if (button.dataset.gameAction === "left") touchState.left = true;
      if (button.dataset.gameAction === "right") touchState.right = true;
      if (button.dataset.gameAction === "thrust") touchState.thrust = true;
      event.preventDefault();
    });
    const clearTouch = () => { touchState = { left: false, right: false, thrust: false }; };
    touch.addEventListener("pointerup", clearTouch);
    touch.addEventListener("pointercancel", clearTouch);
    bindStandardActions(shell, { newGame: selector, restart: () => difficulty && start(difficulty), pause: togglePause });
    selector();
    return {
      element: shell.element,
      controller: {
        focus: () => shell.element.focus({ preventScroll: true }),
        pause() { lifecyclePaused = true; keys.clear(); clearTouch(); last = performance.now(); if (animation) cancelAnimationFrame(animation); animation = 0; draw(); },
        resume() { lifecyclePaused = false; last = performance.now(); if (difficulty && !manualPaused && !over && !animation) animation = requestAnimationFrame(tick); },
        destroy() { destroyed = true; keys.clear(); if (animation) cancelAnimationFrame(animation); animation = 0; }
      }
    };
  }

  function create(application) {
    const id = application?.game || application?.id;
    if (id === "lunar-lander") {
      const result = createLunarLander();
      if (result?.element) gameAudio.bind(result.element);
      return result;
    }
    return typeof baseCreate === "function" ? baseCreate(application) : null;
  }

  window.PortfolioGames = { ...(window.PortfolioGames || {}), create, showDifficultyMenu };
})();
