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

  function createSokoban() {
    const game = "sokoban";
    const shell = makeShell("Sokoban");
    const board = document.createElement("div");
    board.className = "sokoban-board";
    const selector = document.createElement("select");
    selector.className = "retro-game__select";
    selector.setAttribute("aria-label", "Level selector");
    const reset = makeButton("Reset Level", "reset-level");
    const undo = makeButton("Undo", "undo");
    const levelTools = document.createElement("div");
    levelTools.className = "sokoban-tools";
    levelTools.append(selector, undo, reset);
    shell.stage.append(board, levelTools);
    const movesStat = makeStat("Moves");
    const levelStat = makeStat("Level");
    const difficultyStat = makeStat("Difficulty", "—");
    const completeStat = makeStat("Completed");
    shell.sidebar.append(movesStat.row, levelStat.row, difficultyStat.row, completeStat.row, makeControls([["← ↑ ↓ →", "Move"], ["W A S D", "Move"], ["Undo", "One move"]]));
    const configs = {
      easy: { label: "Easy", description: "5 introductory levels" },
      normal: { label: "Normal", description: "5 planning levels" },
      hard: { label: "Hard", description: "5 compact deadlock-prone levels" }
    };
    const levels = {
      easy: [
        ["#####", "# . #", "# $ #", "# @ #", "#####"],
        ["#######", "# . . #", "# $ $ #", "#  @  #", "#######"],
        ["#######", "# . . #", "#     #", "# $ $ #", "#  @  #", "#######"],
        ["########", "# . .  #", "# $ $  #", "#   $ .#", "#   @  #", "########"],
        ["########", "# . . .#", "# $ $ $ #", "#   @   #", "########"]
      ],
      normal: [
        ["########", "# .  . #", "# $  $ #", "#  ##  #", "# $ .@ #", "#      #", "########"],
        ["########", "# . .  #", "# $ $  #", "#  #   #", "#  $ . #", "#   @  #", "########"],
        ["#########", "# . . . #", "# $ $ $ #", "#   #   #", "#   @   #", "#########"],
        ["#########", "# . # . #", "# $   $ #", "#   #   #", "# $ . @ #", "#       #", "#########"],
        ["#########", "# . . . #", "# $ # $ #", "#   $   #", "# #   # #", "#   @   #", "#########"]
      ],
      hard: [
        ["##########", "# .# . . #", "# $  $ $ #", "#  ##    #", "#   $ .  #", "# #   #@ #", "#        #", "##########"],
        ["##########", "# . .#.  #", "# $ $ $  #", "#  # #   #", "# $   .  #", "#   #  @ #", "#        #", "##########"],
        ["#########", "# . . . #", "# $ # $ #", "#   $   #", "# #   # #", "#   @   #", "#########"],
        ["#########", "# . . . #", "# $ $ $ #", "#   #   #", "#   @   #", "#########"],
        ["##########", "# ..# .  #", "# $$#$ $ #", "#  $ . @ #", "#   .    #", "##########"]
      ]
    };
    let difficulty = null;
    let levelIndex = 0;
    let state = null;
    let history = [];
    let moves = 0;
    let lifecyclePaused = false;

    function completedKey() {
      return `samael.games.sokoban.completed.${difficulty}`;
    }

    function readCompleted() {
      try {
        const parsed = JSON.parse(safeGet(completedKey(), "[]"));
        return Array.isArray(parsed) ? parsed.filter((value) => Number.isInteger(value)) : [];
      } catch {
        return [];
      }
    }

    function parseLevel(lines) {
      const height = lines.length;
      const width = Math.max(...lines.map((line) => line.length));
      const walls = new Set();
      const targets = new Set();
      const crates = new Set();
      let player = 0;
      for (let y = 0; y < height; y += 1) {
        const line = lines[y].padEnd(width, " ");
        for (let x = 0; x < width; x += 1) {
          const char = line[x];
          const index = y * width + x;
          if (char === "#") walls.add(index);
          if (char === "." || char === "*" || char === "+") targets.add(index);
          if (char === "$" || char === "*") crates.add(index);
          if (char === "@" || char === "+") player = index;
        }
      }
      return { width, height, walls, targets, crates, player };
    }

    function cloneState(source = state) {
      return { width: source.width, height: source.height, walls: new Set(source.walls), targets: new Set(source.targets), crates: new Set(source.crates), player: source.player };
    }

    function render() {
      if (!state) return;
      board.replaceChildren();
      board.style.setProperty("--sokoban-columns", String(state.width));
      for (let index = 0; index < state.width * state.height; index += 1) {
        const tile = document.createElement("div");
        tile.className = "sokoban-tile";
        if (state.walls.has(index)) tile.classList.add("is-wall");
        if (state.targets.has(index)) tile.classList.add("is-target");
        if (state.crates.has(index)) {
          tile.classList.add("is-crate");
          tile.textContent = "■";
        }
        if (state.player === index) {
          tile.classList.add("is-player");
          tile.textContent = "●";
        }
        board.append(tile);
      }
      movesStat.value.textContent = String(moves);
      levelStat.value.textContent = `${levelIndex + 1}/${levels[difficulty].length}`;
      difficultyStat.value.textContent = configs[difficulty].label;
      completeStat.value.textContent = String(readCompleted().length);
    }

    function loadLevel(index) {
      levelIndex = Math.max(0, Math.min(levels[difficulty].length - 1, index));
      state = parseLevel(levels[difficulty][levelIndex]);
      history = [];
      moves = 0;
      selector.value = String(levelIndex);
      render();
      shell.status.textContent = `${configs[difficulty].label} · Level ${levelIndex + 1}`;
    }

    function winCheck() {
      if (![...state.crates].every((crate) => state.targets.has(crate))) return false;
      const completed = readCompleted();
      if (!completed.includes(levelIndex)) {
        completed.push(levelIndex);
        safeSet(completedKey(), JSON.stringify(completed));
      }
      completeStat.value.textContent = String(readCompleted().length);
      shell.status.textContent = `Level ${levelIndex + 1} complete · ${moves} moves`;
      return true;
    }

    function move(dx, dy) {
      if (!state || lifecyclePaused) return;
      const x = state.player % state.width;
      const y = Math.floor(state.player / state.width);
      const nx = x + dx;
      const ny = y + dy;
      if (nx < 0 || ny < 0 || nx >= state.width || ny >= state.height) return;
      const next = ny * state.width + nx;
      if (state.walls.has(next)) return;
      const before = cloneState();
      if (state.crates.has(next)) {
        const bx = nx + dx;
        const by = ny + dy;
        if (bx < 0 || by < 0 || bx >= state.width || by >= state.height) return;
        const beyond = by * state.width + bx;
        if (state.walls.has(beyond) || state.crates.has(beyond)) return;
        state.crates.delete(next);
        state.crates.add(beyond);
      }
      history.push(before);
      state.player = next;
      moves += 1;
      render();
      winCheck();
    }

    function undoMove() {
      const previous = history.pop();
      if (!previous) return;
      state = previous;
      moves = Math.max(0, moves - 1);
      render();
    }

    function start(selected) {
      difficulty = selected;
      selector.replaceChildren();
      for (let i = 0; i < levels[difficulty].length; i += 1) {
        const option = document.createElement("option");
        option.value = String(i);
        option.textContent = `Level ${i + 1}`;
        selector.append(option);
      }
      lifecyclePaused = false;
      loadLevel(0);
    }

    function difficultySelector() {
      difficulty = null;
      state = null;
      board.replaceChildren();
      selector.replaceChildren();
      showDifficultyMenu(shell.stage, game, "SELECT DIFFICULTY", configs, start);
      shell.status.textContent = "Select a difficulty";
      difficultyStat.value.textContent = "—";
    }

    shell.element.addEventListener("keydown", (event) => {
      if (event.target instanceof Element && event.target.closest("button,input,select,textarea,a")) return;
      const key = event.key.toLowerCase();
      const map = { arrowleft: [-1,0], a: [-1,0], arrowright: [1,0], d: [1,0], arrowup: [0,-1], w: [0,-1], arrowdown: [0,1], s: [0,1] };
      if (map[key]) {
        event.preventDefault();
        if (!event.repeat) move(...map[key]);
      }
    });
    selector.addEventListener("change", () => loadLevel(Number(selector.value)));
    shell.element.addEventListener("click", (event) => {
      const button = event.target instanceof Element ? event.target.closest("[data-game-action]") : null;
      if (!button) return;
      if (button.dataset.gameAction === "undo") undoMove();
      if (button.dataset.gameAction === "reset-level" && difficulty) loadLevel(levelIndex);
    });
    bindStandardActions(shell, { newGame: difficultySelector, restart: () => difficulty && loadLevel(levelIndex), pause: () => { lifecyclePaused = !lifecyclePaused; shell.status.textContent = lifecyclePaused ? "Paused" : `${configs[difficulty]?.label || ""} · Level ${levelIndex + 1}`; } });
    difficultySelector();
    return {
      element: shell.element,
      controller: {
        focus: () => shell.element.focus({ preventScroll: true }),
        pause() { lifecyclePaused = true; },
        resume() { lifecyclePaused = false; },
        destroy() { state = null; history = []; }
      }
    };
  }

  function create(application) {
    const id = application?.game || application?.id;
    if (id === "sokoban") {
      const result = createSokoban();
      if (result?.element) gameAudio.bind(result.element);
      return result;
    }
    return typeof baseCreate === "function" ? baseCreate(application) : null;
  }

  window.PortfolioGames = { ...(window.PortfolioGames || {}), create, showDifficultyMenu };
})();
