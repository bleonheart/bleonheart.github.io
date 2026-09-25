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

  function createSnake() {
    const game = "snake";
    const shell = makeShell("Snake");
    const canvas = document.createElement("canvas");
    canvasResize(canvas, 600, 420);
    canvas.setAttribute("aria-label", "Snake playfield");
    shell.stage.append(canvas);
    const touch = makeTouchControls([["←","left"],["↑","up"],["↓","down"],["→","right"]]);
    shell.stage.append(touch);
    const scoreStat = makeStat("Score");
    const bestStat = makeStat("Best");
    const difficultyStat = makeStat("Difficulty", "—");
    shell.sidebar.append(scoreStat.row, bestStat.row, difficultyStat.row, makeControls([["← ↑ ↓ →", "Move"], ["W A S D", "Move"], ["P / Esc", "Pause"]]));
    const configs = {
      easy: { label: "Easy", description: "Slow · wall wrap", step: 145, minStep: 82, speedUp: 2.5, wrap: true, obstacles: 0 },
      normal: { label: "Normal", description: "Medium · solid walls", step: 110, minStep: 62, speedUp: 3.5, wrap: false, obstacles: 0 },
      hard: { label: "Hard", description: "Fast · obstacles", step: 78, minStep: 48, speedUp: 4, wrap: false, obstacles: 8 }
    };
    const context = canvas.getContext("2d");
    const cols = 30;
    const rows = 21;
    const cell = 20;
    let difficulty = null;
    let config = null;
    let snake = [];
    let food = null;
    let obstacles = [];
    let direction = { x: 1, y: 0 };
    let pendingDirection = { x: 1, y: 0 };
    let score = 0;
    let accumulator = 0;
    let last = 0;
    let animation = 0;
    let manualPaused = false;
    let lifecyclePaused = false;
    let over = false;
    let destroyed = false;

    function bestKey() {
      return `samael.games.snake.highScore.${difficulty}`;
    }

    function occupied(x, y) {
      return snake.some((part) => part.x === x && part.y === y) || obstacles.some((part) => part.x === x && part.y === y);
    }

    function randomEmpty() {
      for (let tries = 0; tries < 1000; tries += 1) {
        const point = { x: Math.floor(Math.random() * cols), y: Math.floor(Math.random() * rows) };
        if (!occupied(point.x, point.y) && (!food || point.x !== food.x || point.y !== food.y)) return point;
      }
      return { x: 1, y: 1 };
    }

    function setDirection(x, y) {
      if (!difficulty || over) return;
      if (x === -direction.x && y === -direction.y) return;
      pendingDirection = { x, y };
    }

    function updateStats() {
      scoreStat.value.textContent = String(score);
      bestStat.value.textContent = String(safeNumber(bestKey(), 0));
      difficultyStat.value.textContent = config?.label || "—";
    }

    function step() {
      direction = pendingDirection;
      const head = { x: snake[0].x + direction.x, y: snake[0].y + direction.y };
      if (config.wrap) {
        head.x = (head.x + cols) % cols;
        head.y = (head.y + rows) % rows;
      } else if (head.x < 0 || head.y < 0 || head.x >= cols || head.y >= rows) {
        endGame();
        return;
      }
      if (snake.some((part) => part.x === head.x && part.y === head.y) || obstacles.some((part) => part.x === head.x && part.y === head.y)) {
        endGame();
        return;
      }
      snake.unshift(head);
      if (food && head.x === food.x && head.y === food.y) {
        score += 10;
        food = randomEmpty();
        updateStats();
      } else {
        snake.pop();
      }
    }

    function endGame() {
      over = true;
      const best = safeNumber(bestKey(), 0);
      if (score > best) safeSet(bestKey(), score);
      updateStats();
      shell.status.textContent = `Game over · Score ${score}`;
    }

    function draw() {
      const c = colors();
      context.fillStyle = c.background;
      context.fillRect(0, 0, canvas.width, canvas.height);
      drawGrid(context, canvas.width, canvas.height, cell);
      if (!difficulty) return;
      for (const point of obstacles) drawBeveledRect(context, point.x * cell + 2, point.y * cell + 2, cell - 4, cell - 4, c.brown);
      if (food) {
        const centerX = food.x * cell + cell / 2;
        const centerY = food.y * cell + cell / 2;
        const radius = Math.max(4, cell * .28);
        context.fillStyle = c.orange;
        context.beginPath();
        context.arc(centerX, centerY, radius, 0, Math.PI * 2);
        context.fill();
        context.fillStyle = "rgba(255,255,255,.24)";
        context.beginPath();
        context.arc(centerX - radius * .28, centerY - radius * .32, Math.max(1.5, radius * .18), 0, Math.PI * 2);
        context.fill();
      }
      for (const [index, part] of snake.entries()) {
        drawBeveledRect(context, part.x * cell + 1, part.y * cell + 1, cell - 2, cell - 2, index ? c.green : c.cream);
      }
      if (snake.length) {
        const head = snake[0];
        const cx = head.x * cell + cell / 2;
        const cy = head.y * cell + cell / 2;
        const spread = Math.max(2, cell * .13);
        context.fillStyle = c.background;
        context.beginPath();
        if (direction.x) {
          context.arc(cx + direction.x * cell * .22, cy - spread, 1.5, 0, Math.PI * 2);
          context.arc(cx + direction.x * cell * .22, cy + spread, 1.5, 0, Math.PI * 2);
        } else {
          context.arc(cx - spread, cy + direction.y * cell * .22, 1.5, 0, Math.PI * 2);
          context.arc(cx + spread, cy + direction.y * cell * .22, 1.5, 0, Math.PI * 2);
        }
        context.fill();
      }
      if ((manualPaused || lifecyclePaused || over) && difficulty) {
        context.fillStyle = "rgba(8,11,9,.72)";
        context.fillRect(0, 0, canvas.width, canvas.height);
        context.fillStyle = c.cream;
        context.font = "700 24px sans-serif";
        context.textAlign = "center";
        context.fillText(over ? "GAME OVER" : "PAUSED", canvas.width / 2, canvas.height / 2);
      }
    }

    function tick(time) {
      animation = 0;
      if (destroyed) return;
      const delta = last ? Math.min(50, time - last) : 0;
      last = time;
      if (difficulty && !manualPaused && !lifecyclePaused && !over) {
        accumulator += delta;
        const interval = Math.max(config.minStep, config.step - score / 10 * config.speedUp);
        while (accumulator >= interval) {
          accumulator -= interval;
          step();
          if (over) break;
        }
      }
      draw();
      if (difficulty && !manualPaused && !lifecyclePaused && !over) animation = requestAnimationFrame(tick);
    }

    function start(selected) {
      difficulty = selected;
      config = configs[selected];
      snake = [{ x: 8, y: 10 }, { x: 7, y: 10 }, { x: 6, y: 10 }];
      food = null;
      obstacles = [];
      direction = { x: 1, y: 0 };
      pendingDirection = { x: 1, y: 0 };
      score = 0;
      accumulator = 0;
      manualPaused = false;
      lifecyclePaused = false;
      over = false;
      for (let i = 0; i < config.obstacles; i += 1) obstacles.push(randomEmpty());
      food = randomEmpty();
      updateStats();
      shell.status.textContent = `${config.label} · Score 0`;
      last = performance.now();
      if (!animation) animation = requestAnimationFrame(tick);
    }

    function selector() {
      if (animation) cancelAnimationFrame(animation);
      animation = 0;
      difficulty = null;
      showDifficultyMenu(shell.stage, game, "SELECT DIFFICULTY", configs, start);
      difficultyStat.value.textContent = "—";
      shell.status.textContent = "Select a difficulty";
    }

    function togglePause() {
      if (!difficulty || over) return;
      manualPaused = !manualPaused;
      shell.pause.textContent = manualPaused ? "Resume" : "Pause";
      shell.status.textContent = manualPaused ? "Paused" : `${config.label} · Score ${score}`;
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
      const map = { arrowleft: [-1,0], a: [-1,0], arrowright: [1,0], d: [1,0], arrowup: [0,-1], w: [0,-1], arrowdown: [0,1], s: [0,1] };
      if (map[key]) {
        event.preventDefault();
        setDirection(...map[key]);
      }
      if ((key === "p" || key === "escape") && !event.repeat) {
        event.preventDefault();
        togglePause();
      }
    });
    touch.addEventListener("pointerdown", (event) => {
      const button = event.target instanceof Element ? event.target.closest("[data-game-action]") : null;
      const map = { left: [-1,0], right: [1,0], up: [0,-1], down: [0,1] };
      if (button && map[button.dataset.gameAction]) {
        event.preventDefault();
        setDirection(...map[button.dataset.gameAction]);
      }
    });
    bindStandardActions(shell, { newGame: selector, restart: () => difficulty && start(difficulty), pause: togglePause });
    selector();
    return {
      element: shell.element,
      controller: {
        focus: () => shell.element.focus({ preventScroll: true }),
        pause() { lifecyclePaused = true; last = performance.now(); if (animation) cancelAnimationFrame(animation); animation = 0; draw(); },
        resume() { lifecyclePaused = false; last = performance.now(); if (difficulty && !manualPaused && !over && !animation) animation = requestAnimationFrame(tick); },
        destroy() { destroyed = true; if (animation) cancelAnimationFrame(animation); animation = 0; }
      }
    };
  }

  function create(application) {
    const id = application?.game || application?.id;
    if (id === "snake") {
      const result = createSnake();
      if (result?.element) gameAudio.bind(result.element);
      return result;
    }
    return typeof baseCreate === "function" ? baseCreate(application) : null;
  }

  window.PortfolioGames = { ...(window.PortfolioGames || {}), create, showDifficultyMenu };
})();
