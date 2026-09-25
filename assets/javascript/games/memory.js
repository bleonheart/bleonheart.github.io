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

  function createMemory() {
    const game = "memory";
    const shell = makeShell("Memory");
    const board = document.createElement("div");
    board.className = "memory-board";
    shell.stage.append(board);
    const movesStat = makeStat("Moves");
    const timeStat = makeStat("Time");
    const difficultyStat = makeStat("Difficulty", "—");
    const bestStat = makeStat("Best", "—");
    shell.sidebar.append(movesStat.row, timeStat.row, difficultyStat.row, bestStat.row, makeControls([["Click", "Flip"], ["Restart", "Same board size"], ["New Game", "Difficulty"]]));
    const configs = {
      easy: { label: "Easy", description: "4×4 · 8 pairs", columns: 4, rows: 4 },
      normal: { label: "Normal", description: "6×4 · 12 pairs", columns: 6, rows: 4 },
      hard: { label: "Hard", description: "6×6 · 18 pairs", columns: 6, rows: 6 }
    };
    const symbols = ["A","B","C","D","E","F","G","H","J","K","L","M","N","P","Q","R","S","T"];
    let difficulty = null;
    let config = null;
    let cards = [];
    let open = [];
    let lock = false;
    let moves = 0;
    let startedAt = 0;
    let elapsed = 0;
    let timer = 0;
    let lifecyclePaused = false;
    let mismatchTimer = 0;

    function timeKey() {
      return `samael.games.memory.bestTime.${difficulty}`;
    }

    function movesKey() {
      return `samael.games.memory.bestMoves.${difficulty}`;
    }

    function seconds() {
      return Math.floor((elapsed + (startedAt ? performance.now() - startedAt : 0)) / 1000);
    }

    function stopClock() {
      if (timer) clearInterval(timer);
      timer = 0;
      if (startedAt) {
        elapsed += performance.now() - startedAt;
        startedAt = 0;
      }
      timeStat.value.textContent = String(seconds());
    }

    function startClock() {
      if (timer || lifecyclePaused) return;
      startedAt = performance.now();
      timer = setInterval(() => { timeStat.value.textContent = String(seconds()); }, 250);
    }

    function render(index) {
      const card = cards[index];
      const button = board.children[index];
      button.classList.toggle("is-open", card.open || card.matched);
      button.classList.toggle("is-matched", card.matched);
      button.textContent = card.open || card.matched ? card.symbol : "?";
    }

    function clearMismatch() {
      clearTimeout(mismatchTimer);
      mismatchTimer = 0;
      if (!lock || open.length !== 2) return;
      const [a, b] = open;
      cards[a].open = false;
      cards[b].open = false;
      render(a);
      render(b);
      open = [];
      lock = false;
    }

    function finish() {
      stopClock();
      const currentTime = seconds();
      const bestTime = safeNumber(timeKey(), 0);
      const bestMoves = safeNumber(movesKey(), 0);
      if (!bestTime || currentTime < bestTime) safeSet(timeKey(), currentTime);
      if (!bestMoves || moves < bestMoves) safeSet(movesKey(), moves);
      bestStat.value.textContent = `${safeNumber(timeKey(), currentTime)}s / ${safeNumber(movesKey(), moves)} moves`;
      shell.status.textContent = `Complete · ${currentTime}s · ${moves} moves`;
    }

    function flip(index) {
      if (!difficulty || lifecyclePaused || lock) return;
      const card = cards[index];
      if (!card || card.open || card.matched) return;
      if (!startedAt && !elapsed) startClock();
      card.open = true;
      open.push(index);
      render(index);
      if (open.length < 2) return;
      moves += 1;
      movesStat.value.textContent = String(moves);
      const [a, b] = open;
      if (cards[a].symbol === cards[b].symbol) {
        cards[a].matched = true;
        cards[b].matched = true;
        open = [];
        render(a);
        render(b);
        if (cards.every((entry) => entry.matched)) finish();
        return;
      }
      lock = true;
      mismatchTimer = setTimeout(() => {
        cards[a].open = false;
        cards[b].open = false;
        render(a);
        render(b);
        open = [];
        lock = false;
      }, 650);
    }

    function start(selected) {
      difficulty = selected;
      config = configs[selected];
      const pairCount = config.columns * config.rows / 2;
      cards = symbols.slice(0, pairCount).flatMap((symbol) => [{ symbol, open: false, matched: false }, { symbol, open: false, matched: false }]);
      for (let i = cards.length - 1; i > 0; i -= 1) {
        const j = Math.floor(Math.random() * (i + 1));
        [cards[i], cards[j]] = [cards[j], cards[i]];
      }
      clearMismatch();
      open = [];
      lock = false;
      moves = 0;
      elapsed = 0;
      startedAt = 0;
      lifecyclePaused = false;
      stopClock();
      board.replaceChildren();
      board.style.setProperty("--memory-columns", String(config.columns));
      for (const [index, card] of cards.entries()) {
        const button = document.createElement("button");
        button.type = "button";
        button.className = "memory-card";
        button.dataset.index = String(index);
        button.textContent = "?";
        button.setAttribute("aria-label", `Card ${index + 1}`);
        board.append(button);
      }
      movesStat.value.textContent = "0";
      timeStat.value.textContent = "0";
      difficultyStat.value.textContent = config.label;
      const bestTime = safeNumber(timeKey(), 0);
      const bestMoves = safeNumber(movesKey(), 0);
      bestStat.value.textContent = bestTime ? `${bestTime}s / ${bestMoves || "—"} moves` : "—";
      shell.status.textContent = `${config.label} · Find all pairs`;
    }

    function selector() {
      clearMismatch();
      stopClock();
      difficulty = null;
      board.replaceChildren();
      showDifficultyMenu(shell.stage, game, "SELECT DIFFICULTY", configs, start);
      shell.status.textContent = "Select a difficulty";
    }

    board.addEventListener("click", (event) => {
      const button = event.target instanceof Element ? event.target.closest("[data-index]") : null;
      if (button) flip(Number(button.dataset.index));
    });
    bindStandardActions(shell, {
      newGame: selector,
      restart: () => difficulty && start(difficulty),
      pause: () => {
        lifecyclePaused = !lifecyclePaused;
        if (lifecyclePaused) { clearMismatch(); stopClock(); }
        else if (moves && cards.some((card) => !card.matched)) startClock();
        shell.status.textContent = lifecyclePaused ? "Paused" : `${config?.label || ""}`;
      }
    });
    selector();
    return {
      element: shell.element,
      controller: {
        focus: () => shell.element.focus({ preventScroll: true }),
        pause() {
          lifecyclePaused = true;
          clearMismatch();
          stopClock();
        },
        resume() {
          if (!difficulty) return;
          lifecyclePaused = false;
          if (moves && cards.some((card) => !card.matched)) startClock();
        },
        destroy() {
          stopClock();
          clearMismatch();
        }
      }
    };
  }

  function create(application) {
    const id = application?.game || application?.id;
    if (id === "memory") {
      const result = createMemory();
      if (result?.element) gameAudio.bind(result.element);
      return result;
    }
    return typeof baseCreate === "function" ? baseCreate(application) : null;
  }

  window.PortfolioGames = { ...(window.PortfolioGames || {}), create, showDifficultyMenu };
})();
