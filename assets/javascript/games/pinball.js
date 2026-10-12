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

  function createPinball() {
    const game = "pinball";
    const shell = makeShell("Pinball");
    const canvas = document.createElement("canvas");
    canvasResize(canvas, 520, 700);
    canvas.classList.add("retro-game__canvas--tall");
    canvas.setAttribute("aria-label", "Pinball table");
    shell.stage.append(canvas);
    const touch = makeTouchControls([["LEFT","left-flipper"],["RIGHT","right-flipper"]]);
    shell.stage.append(touch);
    const scoreStat = makeStat("Score");
    const ballsStat = makeStat("Balls");
    const difficultyStat = makeStat("Difficulty", "—");
    const bestStat = makeStat("Best");
    shell.sidebar.append(scoreStat.row, ballsStat.row, difficultyStat.row, bestStat.row, makeControls([["Z / ←", "Left flipper"], ["/ / →", "Right flipper"], ["P / Esc", "Pause"]]));
    const configs = {
      easy: { label: "Easy", description: "Slow physics · strong flippers · 5 balls", gravity: 255, speed: .92, flipper: 520, balls: 5, drain: 86, multiplier: 1 },
      normal: { label: "Normal", description: "Balanced table · 3 balls", gravity: 310, speed: 1, flipper: 460, balls: 3, drain: 72, multiplier: 1.35 },
      hard: { label: "Hard", description: "Fast ball · narrow safety · 2 balls", gravity: 360, speed: 1.08, flipper: 410, balls: 2, drain: 58, multiplier: 1.8 }
    };
    const context = canvas.getContext("2d");
    const keys = new Set();
    const bumpers = [{ x: 150, y: 190, r: 34 }, { x: 370, y: 190, r: 34 }, { x: 260, y: 315, r: 38 }];
    const targets = [{ x: 68, y: 290, w: 18, h: 86 }, { x: 434, y: 290, w: 18, h: 86 }];
    let difficulty = null;
    let config = null;
    let ball = null;
    let score = 0;
    let balls = 0;
    let manualPaused = false;
    let lifecyclePaused = false;
    let over = false;
    let last = 0;
    let animation = 0;
    let destroyed = false;
    let leftTouch = false;
    let rightTouch = false;

    function bestKey() {
      return `samael.games.pinball.highScore.${difficulty}`;
    }

    function resetBall() {
      ball = { x: 455, y: 560, r: 9, vx: -85 * config.speed, vy: -430 * config.speed };
    }

    function updateStats() {
      scoreStat.value.textContent = String(Math.floor(score));
      ballsStat.value.textContent = String(balls);
      difficultyStat.value.textContent = config?.label || "—";
      bestStat.value.textContent = String(difficulty ? safeNumber(bestKey(), 0) : 0);
    }

    function bounceCircle(circle) {
      const dx = ball.x - circle.x;
      const dy = ball.y - circle.y;
      const distance = Math.hypot(dx, dy);
      const minimum = ball.r + circle.r;
      if (!distance || distance >= minimum) return false;
      const nx = dx / distance;
      const ny = dy / distance;
      ball.x = circle.x + nx * minimum;
      ball.y = circle.y + ny * minimum;
      const dot = ball.vx * nx + ball.vy * ny;
      ball.vx -= 2 * dot * nx;
      ball.vy -= 2 * dot * ny;
      ball.vx += nx * 105;
      ball.vy += ny * 105;
      score += 100 * config.multiplier;
      return true;
    }

    function hitTarget(target) {
      const x = Math.max(target.x, Math.min(ball.x, target.x + target.w));
      const y = Math.max(target.y, Math.min(ball.y, target.y + target.h));
      const dx = ball.x - x;
      const dy = ball.y - y;
      if (dx * dx + dy * dy > ball.r * ball.r) return false;
      ball.vx *= -1;
      score += 40 * config.multiplier;
      return true;
    }

    function flipperCollision(side, active) {
      const left = side === "left";
      const cx = left ? 185 : 335;
      const cy = 610;
      const dx = ball.x - cx;
      const dy = ball.y - cy;
      const inZone = Math.abs(dx) < 92 && dy > -36 && dy < 30 && (left ? ball.x < 270 : ball.x > 250);
      if (!inZone || ball.vy < 0 && !active) return;
      const direction = left ? 1 : -1;
      ball.vy = -Math.max(330, Math.abs(ball.vy) * .82 + (active ? config.flipper : 150));
      ball.vx += direction * (active ? 125 : 55);
      ball.y = cy - 32;
    }

    function loseBall() {
      balls -= 1;
      updateStats();
      if (balls <= 0) {
        over = true;
        const finalScore = Math.floor(score);
        if (finalScore > safeNumber(bestKey(), 0)) safeSet(bestKey(), finalScore);
        updateStats();
        shell.status.textContent = `Game over · Score ${finalScore}`;
      } else {
        resetBall();
        shell.status.textContent = `${config.label} · Ball ${config.balls - balls + 1}`;
      }
    }

    function update(delta) {
      const seconds = delta / 1000;
      const substeps = 3;
      for (let step = 0; step < substeps; step += 1) {
        const dt = seconds / substeps;
        ball.vy += config.gravity * dt;
        ball.x += ball.vx * dt;
        ball.y += ball.vy * dt;
        if (ball.x - ball.r < 28) { ball.x = 28 + ball.r; ball.vx = Math.abs(ball.vx) * .92; }
        if (ball.x + ball.r > 492) { ball.x = 492 - ball.r; ball.vx = -Math.abs(ball.vx) * .92; }
        if (ball.y - ball.r < 24) { ball.y = 24 + ball.r; ball.vy = Math.abs(ball.vy) * .93; }
        for (const bumper of bumpers) bounceCircle(bumper);
        for (const target of targets) hitTarget(target);
        flipperCollision("left", keys.has("z") || keys.has("arrowleft") || leftTouch);
        flipperCollision("right", keys.has("/") || keys.has("arrowright") || rightTouch);
      }
      if (ball.y - ball.r > canvas.height && (ball.x < canvas.width / 2 - config.drain || ball.x > canvas.width / 2 + config.drain || ball.y > canvas.height + 40)) loseBall();
      updateStats();
    }

    function draw() {
      const c = colors();
      context.fillStyle = c.background;
      context.fillRect(0,0,canvas.width,canvas.height);
      context.strokeStyle = c.line;
      context.lineWidth = 4;
      context.strokeRect(28,24,464,650);
      context.fillStyle = c.brown;
      for (const target of targets) context.fillRect(target.x,target.y,target.w,target.h);
      for (const bumper of bumpers) {
        context.fillStyle = c.orange;
        context.beginPath();
        context.arc(bumper.x,bumper.y,bumper.r,0,Math.PI*2);
        context.fill();
        context.fillStyle = c.background;
        context.beginPath();
        context.arc(bumper.x,bumper.y,bumper.r-9,0,Math.PI*2);
        context.fill();
      }
      const leftActive = keys.has("z") || keys.has("arrowleft") || leftTouch;
      const rightActive = keys.has("/") || keys.has("arrowright") || rightTouch;
      context.strokeStyle = c.cream;
      context.lineWidth = 12;
      context.lineCap = "round";
      context.beginPath();
      context.moveTo(180,610);
      context.lineTo(leftActive ? 258 : 250, leftActive ? 580 : 625);
      context.stroke();
      context.beginPath();
      context.moveTo(340,610);
      context.lineTo(rightActive ? 262 : 270, rightActive ? 580 : 625);
      context.stroke();
      if (ball) {
        context.fillStyle = c.green;
        context.beginPath();
        context.arc(ball.x,ball.y,ball.r,0,Math.PI*2);
        context.fill();
      }
      if (manualPaused || lifecyclePaused || over) {
        context.fillStyle = "rgba(8,11,9,.72)";
        context.fillRect(0,0,canvas.width,canvas.height);
        context.fillStyle = c.cream;
        context.font = "700 24px sans-serif";
        context.textAlign = "center";
        context.fillText(over ? "GAME OVER" : "PAUSED", canvas.width / 2, canvas.height / 2);
      }
    }

    function tick(time) {
      animation = 0;
      if (destroyed) return;
      const delta = last ? Math.min(34, time - last) : 0;
      last = time;
      if (difficulty && ball && !manualPaused && !lifecyclePaused && !over) update(delta);
      draw();
      if (difficulty && !manualPaused && !lifecyclePaused && !over) animation = requestAnimationFrame(tick);
    }

    function start(selected) {
      difficulty = selected;
      config = configs[selected];
      score = 0;
      balls = config.balls;
      manualPaused = false;
      lifecyclePaused = false;
      over = false;
      resetBall();
      updateStats();
      shell.status.textContent = `${config.label} · Ball 1`;
      last = performance.now();
      if (!animation) animation = requestAnimationFrame(tick);
    }

    function selector() {
      if (animation) cancelAnimationFrame(animation);
      animation = 0;
      difficulty = null;
      ball = null;
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
      if (["arrowleft","arrowright","z","/","p","escape"].includes(key)) event.preventDefault();
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
      if (button.dataset.gameAction === "left-flipper") leftTouch = true;
      if (button.dataset.gameAction === "right-flipper") rightTouch = true;
      event.preventDefault();
    });
    touch.addEventListener("pointerup", () => { leftTouch = false; rightTouch = false; });
    touch.addEventListener("pointercancel", () => { leftTouch = false; rightTouch = false; });
    bindStandardActions(shell, { newGame: selector, restart: () => difficulty && start(difficulty), pause: togglePause });
    selector();
    return {
      element: shell.element,
      controller: {
        focus: () => shell.element.focus({ preventScroll: true }),
        pause() { lifecyclePaused = true; keys.clear(); leftTouch = false; rightTouch = false; last = performance.now(); if (animation) cancelAnimationFrame(animation); animation = 0; draw(); },
        resume() { lifecyclePaused = false; last = performance.now(); if (difficulty && !manualPaused && !over && !animation) animation = requestAnimationFrame(tick); },
        destroy() { destroyed = true; keys.clear(); if (animation) cancelAnimationFrame(animation); animation = 0; }
      }
    };
  }

  function create(application) {
    const id = application?.game || application?.id;
    if (id === "pinball") {
      const result = createPinball();
      if (result?.element) gameAudio.bind(result.element);
      return result;
    }
    return typeof baseCreate === "function" ? baseCreate(application) : null;
  }

  window.PortfolioGames = { ...(window.PortfolioGames || {}), create, showDifficultyMenu };
})();
