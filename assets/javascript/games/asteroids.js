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

  function createAsteroids() {
    const game = "asteroids";
    const shell = makeShell("Asteroids");
    const canvas = document.createElement("canvas");
    canvasResize(canvas, 720, 480);
    canvas.setAttribute("aria-label", "Asteroids playfield");
    shell.stage.append(canvas);
    const touch = makeTouchControls([["↺","turn-left"],["THRUST","thrust"],["FIRE","fire"],["↻","turn-right"]]);
    shell.stage.append(touch);
    const scoreStat = makeStat("Score");
    const livesStat = makeStat("Lives");
    const waveStat = makeStat("Wave");
    const difficultyStat = makeStat("Difficulty", "—");
    const bestStat = makeStat("Best");
    shell.sidebar.append(scoreStat.row, livesStat.row, waveStat.row, difficultyStat.row, bestStat.row, makeControls([["← → / A D", "Rotate"], ["↑ / W", "Thrust"], ["Space", "Fire"], ["P / Esc", "Pause"]]));
    const configs = {
      easy: { label: "Easy", description: "Fewer slow asteroids · 5 lives", count: 3, speed: 32, lives: 5, wave: 1 },
      normal: { label: "Normal", description: "Balanced asteroid waves", count: 5, speed: 48, lives: 3, wave: 2 },
      hard: { label: "Hard", description: "More fast asteroids · 2 lives", count: 7, speed: 66, lives: 2, wave: 3 }
    };
    const context = canvas.getContext("2d");
    const keys = new Set();
    let difficulty = null;
    let config = null;
    let ship = null;
    let bullets = [];
    let asteroids = [];
    let score = 0;
    let lives = 0;
    let wave = 1;
    let fireCooldown = 0;
    let manualPaused = false;
    let lifecyclePaused = false;
    let over = false;
    let last = 0;
    let animation = 0;
    let destroyed = false;
    let touchTurn = 0;
    let touchThrust = false;
    let touchFire = false;

    function bestKey() {
      return `samael.games.asteroids.highScore.${difficulty}`;
    }

    function wrap(entity) {
      entity.x = (entity.x + canvas.width) % canvas.width;
      entity.y = (entity.y + canvas.height) % canvas.height;
    }

    function newAsteroid(size = 3, x = Math.random() * canvas.width, y = Math.random() * canvas.height) {
      const angle = Math.random() * Math.PI * 2;
      const speed = config.speed * (.65 + Math.random() * .7) * (1 + (wave - 1) * .08);
      return { x, y, vx: Math.cos(angle) * speed, vy: Math.sin(angle) * speed, size, radius: size * 14 + 8, rotation: Math.random() * Math.PI * 2, spin: (Math.random() - .5) * 1.2 };
    }

    function spawnWave() {
      asteroids = [];
      const count = config.count + Math.floor((wave - 1) * config.wave);
      for (let i = 0; i < count; i += 1) {
        let asteroid = newAsteroid();
        while (Math.hypot(asteroid.x - ship.x, asteroid.y - ship.y) < 150) asteroid = newAsteroid();
        asteroids.push(asteroid);
      }
    }

    function resetShip() {
      ship = { x: canvas.width / 2, y: canvas.height / 2, vx: 0, vy: 0, angle: -Math.PI / 2, radius: 12, invulnerable: 1600 };
    }

    function updateStats() {
      scoreStat.value.textContent = String(score);
      livesStat.value.textContent = String(lives);
      waveStat.value.textContent = String(wave);
      difficultyStat.value.textContent = config?.label || "—";
      bestStat.value.textContent = String(difficulty ? safeNumber(bestKey(), 0) : 0);
    }

    function fire() {
      if (fireCooldown > 0 || bullets.length >= 6) return;
      bullets.push({ x: ship.x + Math.cos(ship.angle) * 16, y: ship.y + Math.sin(ship.angle) * 16, vx: ship.vx + Math.cos(ship.angle) * 390, vy: ship.vy + Math.sin(ship.angle) * 390, life: 1100 });
      fireCooldown = 150;
    }

    function endGame() {
      over = true;
      if (score > safeNumber(bestKey(), 0)) safeSet(bestKey(), score);
      updateStats();
      shell.status.textContent = `Game over · Score ${score}`;
    }

    function update(delta) {
      const seconds = delta / 1000;
      fireCooldown = Math.max(0, fireCooldown - delta);
      ship.invulnerable = Math.max(0, ship.invulnerable - delta);
      const turn = (keys.has("arrowright") || keys.has("d") ? 1 : 0) - (keys.has("arrowleft") || keys.has("a") ? 1 : 0) + touchTurn;
      ship.angle += Math.sign(turn) * 3.4 * seconds;
      if (keys.has("arrowup") || keys.has("w") || touchThrust) {
        ship.vx += Math.cos(ship.angle) * 180 * seconds;
        ship.vy += Math.sin(ship.angle) * 180 * seconds;
      }
      if (keys.has(" ") || touchFire) fire();
      ship.vx *= Math.pow(.995, delta / 16.67);
      ship.vy *= Math.pow(.995, delta / 16.67);
      ship.x += ship.vx * seconds;
      ship.y += ship.vy * seconds;
      wrap(ship);
      for (const bullet of bullets) {
        bullet.x += bullet.vx * seconds;
        bullet.y += bullet.vy * seconds;
        bullet.life -= delta;
        wrap(bullet);
      }
      bullets = bullets.filter((bullet) => bullet.life > 0);
      for (const asteroid of asteroids) {
        asteroid.x += asteroid.vx * seconds;
        asteroid.y += asteroid.vy * seconds;
        asteroid.rotation += asteroid.spin * seconds;
        wrap(asteroid);
      }
      for (let bi = bullets.length - 1; bi >= 0; bi -= 1) {
        const bullet = bullets[bi];
        let hit = -1;
        for (let ai = asteroids.length - 1; ai >= 0; ai -= 1) {
          const asteroid = asteroids[ai];
          if (Math.hypot(bullet.x - asteroid.x, bullet.y - asteroid.y) <= asteroid.radius) {
            hit = ai;
            break;
          }
        }
        if (hit < 0) continue;
        const asteroid = asteroids[hit];
        bullets.splice(bi, 1);
        asteroids.splice(hit, 1);
        score += asteroid.size === 3 ? 20 : asteroid.size === 2 ? 50 : 100;
        if (asteroid.size > 1) {
          asteroids.push(newAsteroid(asteroid.size - 1, asteroid.x, asteroid.y), newAsteroid(asteroid.size - 1, asteroid.x, asteroid.y));
        }
        updateStats();
      }
      if (!ship.invulnerable) {
        const hit = asteroids.some((asteroid) => Math.hypot(ship.x - asteroid.x, ship.y - asteroid.y) < ship.radius + asteroid.radius * .78);
        if (hit) {
          lives -= 1;
          updateStats();
          if (lives <= 0) endGame();
          else resetShip();
        }
      }
      if (!asteroids.length && !over) {
        wave += 1;
        spawnWave();
        updateStats();
        shell.status.textContent = `${config.label} · Wave ${wave}`;
      }
    }

    function draw() {
      const c = colors();
      context.fillStyle = c.background;
      context.fillRect(0,0,canvas.width,canvas.height);
      if (!difficulty) return;
      context.strokeStyle = c.cream;
      context.lineWidth = 2;
      if (ship.invulnerable % 180 < 100) {
        context.save();
        context.translate(ship.x, ship.y);
        context.rotate(ship.angle);
        context.beginPath();
        context.moveTo(16,0);
        context.lineTo(-11,-9);
        context.lineTo(-6,0);
        context.lineTo(-11,9);
        context.closePath();
        context.stroke();
        context.restore();
      }
      context.fillStyle = c.orange;
      for (const bullet of bullets) context.fillRect(bullet.x - 2, bullet.y - 2, 4, 4);
      context.strokeStyle = c.muted;
      for (const asteroid of asteroids) {
        context.save();
        context.translate(asteroid.x, asteroid.y);
        context.rotate(asteroid.rotation);
        context.beginPath();
        const points = 9;
        for (let i = 0; i < points; i += 1) {
          const angle = i / points * Math.PI * 2;
          const radius = asteroid.radius * (.75 + (i % 3) * .1);
          const x = Math.cos(angle) * radius;
          const y = Math.sin(angle) * radius;
          if (!i) context.moveTo(x,y); else context.lineTo(x,y);
        }
        context.closePath();
        context.stroke();
        context.restore();
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
      const delta = last ? Math.min(40, time - last) : 0;
      last = time;
      if (difficulty && !manualPaused && !lifecyclePaused && !over) update(delta);
      draw();
      if (difficulty && !manualPaused && !lifecyclePaused && !over) animation = requestAnimationFrame(tick);
    }

    function start(selected) {
      difficulty = selected;
      config = configs[selected];
      score = 0;
      lives = config.lives;
      wave = 1;
      bullets = [];
      manualPaused = false;
      lifecyclePaused = false;
      over = false;
      resetShip();
      spawnWave();
      updateStats();
      shell.status.textContent = `${config.label} · Wave 1`;
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
      shell.status.textContent = manualPaused ? "Paused" : `${config.label} · Wave ${wave}`;
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
      if (button.dataset.gameAction === "turn-left") touchTurn = -1;
      if (button.dataset.gameAction === "turn-right") touchTurn = 1;
      if (button.dataset.gameAction === "thrust") touchThrust = true;
      if (button.dataset.gameAction === "fire") touchFire = true;
      event.preventDefault();
    });
    const clearTouch = () => { touchTurn = 0; touchThrust = false; touchFire = false; };
    touch.addEventListener("pointerup", clearTouch);
    touch.addEventListener("pointercancel", clearTouch);
    touch.addEventListener("pointerleave", clearTouch);
    bindStandardActions(shell, { newGame: selector, restart: () => difficulty && start(difficulty), pause: togglePause });
    selector();
    return {
      element: shell.element,
      controller: {
        focus: () => shell.element.focus({ preventScroll: true }),
        pause() { lifecyclePaused = true; keys.clear(); clearTouch(); last = performance.now(); if (animation) cancelAnimationFrame(animation); animation = 0; draw(); },
        resume() { lifecyclePaused = false; last = performance.now(); if (difficulty && !manualPaused && !over && !animation) animation = requestAnimationFrame(tick); },
        destroy() { destroyed = true; keys.clear(); clearTouch(); if (animation) cancelAnimationFrame(animation); animation = 0; }
      }
    };
  }

  function create(application) {
    const id = application?.game || application?.id;
    if (id === "asteroids") {
      const result = createAsteroids();
      if (result?.element) gameAudio.bind(result.element);
      return result;
    }
    return typeof baseCreate === "function" ? baseCreate(application) : null;
  }

  window.PortfolioGames = { ...(window.PortfolioGames || {}), create, showDifficultyMenu };
})();
