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

  function createMinesweeper() {
    const game = "minesweeper";
    const shell = makeShell("Minesweeper");
    const boardElement = document.createElement("div");
    boardElement.className = "minesweeper-board";
    shell.stage.append(boardElement);
    const mineStat = makeStat("Mines");
    const timeStat = makeStat("Time");
    const difficultyStat = makeStat("Difficulty", "—");
    const bestStat = makeStat("Best", "—");
    shell.sidebar.append(mineStat.row, timeStat.row, difficultyStat.row, bestStat.row, makeControls([["Click", "Reveal"], ["Right click", "Flag"], ["New Game", "Difficulty"]]));

    const configs = {
      easy: { label: "Easy", description: "9×9 · 10 mines", width: 9, height: 9, mines: 10 },
      normal: { label: "Normal", description: "16×16 · 40 mines", width: 16, height: 16, mines: 40 },
      hard: { label: "Hard", description: "30×16 · 99 mines", width: 30, height: 16, mines: 99 }
    };
    let difficulty = null;
    let config = null;
    let cells = [];
    let firstClick = true;
    let over = false;
    let startedAt = 0;
    let elapsedBeforePause = 0;
    let timer = 0;
    let lifecyclePaused = false;
    let destroyed = false;

    function bestKey() {
      return `samael.games.minesweeper.best.${difficulty}`;
    }

    function currentSeconds() {
      if (!startedAt) return Math.floor(elapsedBeforePause / 1000);
      return Math.floor((elapsedBeforePause + performance.now() - startedAt) / 1000);
    }

    function updateTimer() {
      timeStat.value.textContent = String(currentSeconds());
    }

    function stopTimer() {
      if (timer) clearInterval(timer);
      timer = 0;
      if (startedAt) {
        elapsedBeforePause += performance.now() - startedAt;
        startedAt = 0;
      }
      updateTimer();
    }

    function startTimer() {
      if (over || lifecyclePaused || timer || !difficulty) return;
      startedAt = performance.now();
      timer = window.setInterval(updateTimer, 250);
    }

    function neighbors(index) {
      const x = index % config.width;
      const y = Math.floor(index / config.width);
      const result = [];
      for (let oy = -1; oy <= 1; oy += 1) {
        for (let ox = -1; ox <= 1; ox += 1) {
          if (!ox && !oy) continue;
          const nx = x + ox;
          const ny = y + oy;
          if (nx >= 0 && nx < config.width && ny >= 0 && ny < config.height) result.push(ny * config.width + nx);
        }
      }
      return result;
    }

    function placeMines(safeIndex) {
      const blocked = new Set([safeIndex, ...neighbors(safeIndex)]);
      const choices = cells.map((_, index) => index).filter((index) => !blocked.has(index));
      for (let i = choices.length - 1; i > 0; i -= 1) {
        const j = Math.floor(Math.random() * (i + 1));
        [choices[i], choices[j]] = [choices[j], choices[i]];
      }
      for (const index of choices.slice(0, config.mines)) cells[index].mine = true;
      for (const [index, cell] of cells.entries()) cell.count = neighbors(index).filter((neighbor) => cells[neighbor].mine).length;
    }

    function renderCell(index) {
      const cell = cells[index];
      const button = boardElement.children[index];
      button.className = "minesweeper-cell";
      button.textContent = "";
      if (cell.revealed) {
        button.classList.add("is-revealed");
        if (cell.mine) {
          button.classList.add("is-mine");
          button.textContent = "✹";
        } else if (cell.count) {
          button.dataset.count = String(cell.count);
          button.textContent = String(cell.count);
        }
      } else if (cell.flagged) {
        button.classList.add("is-flagged");
        button.textContent = "⚑";
      }
    }

    function updateMineCount() {
      const flags = cells.filter((cell) => cell.flagged).length;
      mineStat.value.textContent = String(config.mines - flags);
    }

    function reveal(index) {
      if (over || lifecyclePaused) return;
      const cell = cells[index];
      if (!cell || cell.flagged || cell.revealed) return;
      if (firstClick) {
        firstClick = false;
        placeMines(index);
        startTimer();
      }
      cell.revealed = true;
      renderCell(index);
      if (cell.mine) {
        over = true;
        stopTimer();
        for (const [cellIndex, entry] of cells.entries()) {
          if (entry.mine) entry.revealed = true;
          renderCell(cellIndex);
        }
        shell.status.textContent = `Game over · ${config.label}`;
        return;
      }
      if (!cell.count) {
        const queue = [...neighbors(index)];
        const seen = new Set(queue);
        while (queue.length) {
          const current = queue.shift();
          const entry = cells[current];
          if (!entry || entry.flagged || entry.mine || entry.revealed) continue;
          entry.revealed = true;
          renderCell(current);
          if (!entry.count) {
            for (const neighbor of neighbors(current)) {
              if (!seen.has(neighbor)) {
                seen.add(neighbor);
                queue.push(neighbor);
              }
            }
          }
        }
      }
      if (cells.every((entry) => entry.mine || entry.revealed)) {
        over = true;
        stopTimer();
        const seconds = currentSeconds();
        const previous = safeNumber(bestKey(), 0);
        if (!previous || seconds < previous) safeSet(bestKey(), seconds);
        bestStat.value.textContent = `${safeNumber(bestKey(), seconds)}s`;
        shell.status.textContent = `Cleared in ${seconds}s · ${config.label}`;
      }
    }

    function toggleFlag(index) {
      if (over || lifecyclePaused) return;
      const cell = cells[index];
      if (!cell || cell.revealed) return;
      cell.flagged = !cell.flagged;
      renderCell(index);
      updateMineCount();
    }

    function start(selected) {
      difficulty = selected;
      config = configs[selected];
      cells = Array.from({ length: config.width * config.height }, () => ({ mine: false, count: 0, revealed: false, flagged: false }));
      firstClick = true;
      over = false;
      lifecyclePaused = false;
      elapsedBeforePause = 0;
      startedAt = 0;
      stopTimer();
      boardElement.replaceChildren();
      boardElement.style.setProperty("--mine-columns", String(config.width));
      boardElement.classList.toggle("is-hard", selected === "hard");
      for (let index = 0; index < cells.length; index += 1) {
        const button = document.createElement("button");
        button.type = "button";
        button.className = "minesweeper-cell";
        button.dataset.index = String(index);
        boardElement.append(button);
      }
      difficultyStat.value.textContent = config.label;
      bestStat.value.textContent = safeNumber(bestKey(), 0) ? `${safeNumber(bestKey(), 0)}s` : "—";
      mineStat.value.textContent = String(config.mines);
      timeStat.value.textContent = "0";
      shell.status.textContent = `${config.label} · First click is safe`;
    }

    function selector() {
      stopTimer();
      difficulty = null;
      boardElement.replaceChildren();
      difficultyStat.value.textContent = "—";
      showDifficultyMenu(shell.stage, game, "SELECT DIFFICULTY", configs, start);
      shell.status.textContent = "Select a difficulty";
    }

    boardElement.addEventListener("click", (event) => {
      const button = event.target instanceof Element ? event.target.closest("[data-index]") : null;
      if (button) reveal(Number(button.dataset.index));
    });
    boardElement.addEventListener("contextmenu", (event) => {
      const button = event.target instanceof Element ? event.target.closest("[data-index]") : null;
      if (!button) return;
      event.preventDefault();
      toggleFlag(Number(button.dataset.index));
    });
    bindStandardActions(shell, {
      newGame: selector,
      restart: () => difficulty && start(difficulty),
      pause: () => {
        lifecyclePaused = !lifecyclePaused;
        if (lifecyclePaused) stopTimer();
        else if (!firstClick && !over) startTimer();
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
          stopTimer();
        },
        resume() {
          if (!difficulty) return;
          lifecyclePaused = false;
          if (!firstClick && !over) startTimer();
        },
        destroy() {
          destroyed = true;
          stopTimer();
          if (destroyed) boardElement.replaceChildren();
        }
      }
    };
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

  function createBreakout() {
    const game = "breakout";
    const shell = makeShell("Breakout");
    const canvas = document.createElement("canvas");
    canvasResize(canvas, 720, 480);
    canvas.setAttribute("aria-label", "Breakout playfield");
    shell.stage.append(canvas);
    const touch = makeTouchControls([["←","left"],["→","right"]]);
    shell.stage.append(touch);
    const scoreStat = makeStat("Score");
    const livesStat = makeStat("Lives");
    const levelStat = makeStat("Level");
    const difficultyStat = makeStat("Difficulty", "—");
    const bestStat = makeStat("Best");
    shell.sidebar.append(scoreStat.row, livesStat.row, levelStat.row, difficultyStat.row, bestStat.row, makeControls([["← → / A D", "Move"], ["P / Esc", "Pause"], ["Restart", "Same difficulty"]]));
    const configs = {
      easy: { label: "Easy", description: "Slow ball · large paddle · 5 lives", speed: 230, paddle: 138, lives: 5, boost: 1.018, brickHp: 1 },
      normal: { label: "Normal", description: "Standard ball · 3 lives", speed: 285, paddle: 108, lives: 3, boost: 1.026, brickHp: 1 },
      hard: { label: "Hard", description: "Fast ball · small paddle · durable bricks", speed: 345, paddle: 82, lives: 2, boost: 1.035, brickHp: 2 }
    };
    const context = canvas.getContext("2d");
    const keys = new Set();
    let difficulty = null;
    let config = null;
    let paddle = { x: 0, y: 438, width: 108, height: 12 };
    let ball = { x: 360, y: 380, r: 7, vx: 0, vy: 0 };
    let bricks = [];
    let score = 0;
    let lives = 0;
    let level = 1;
    let manualPaused = false;
    let lifecyclePaused = false;
    let over = false;
    let last = 0;
    let animation = 0;
    let destroyed = false;
    let touchDirection = 0;

    function bestKey() {
      return `samael.games.breakout.highScore.${difficulty}`;
    }

    function makeBricks() {
      bricks = [];
      const rows = 5 + Math.min(2, level - 1);
      const cols = 10;
      const gap = 5;
      const width = (canvas.width - 48 - gap * (cols - 1)) / cols;
      for (let y = 0; y < rows; y += 1) {
        for (let x = 0; x < cols; x += 1) bricks.push({ x: 24 + x * (width + gap), y: 48 + y * 24, width, height: 16, hp: config.brickHp + (difficulty === "hard" && y < 2 ? 1 : 0) });
      }
    }

    function resetBall() {
      const speed = config.speed * (1 + (level - 1) * .07);
      ball.x = canvas.width / 2;
      ball.y = canvas.height - 82;
      ball.vx = speed * (Math.random() < .5 ? -.55 : .55);
      ball.vy = -Math.sqrt(Math.max(1, speed * speed - ball.vx * ball.vx));
      paddle.x = (canvas.width - paddle.width) / 2;
    }

    function updateStats() {
      scoreStat.value.textContent = String(score);
      livesStat.value.textContent = String(lives);
      levelStat.value.textContent = String(level);
      difficultyStat.value.textContent = config?.label || "—";
      bestStat.value.textContent = String(difficulty ? safeNumber(bestKey(), 0) : 0);
    }

    function hitRect(circle, rect) {
      const cx = Math.max(rect.x, Math.min(circle.x, rect.x + rect.width));
      const cy = Math.max(rect.y, Math.min(circle.y, rect.y + rect.height));
      const dx = circle.x - cx;
      const dy = circle.y - cy;
      return dx * dx + dy * dy <= circle.r * circle.r;
    }

    function endGame() {
      over = true;
      if (score > safeNumber(bestKey(), 0)) safeSet(bestKey(), score);
      updateStats();
      shell.status.textContent = `Game over · Score ${score}`;
    }

    function update(delta) {
      const seconds = delta / 1000;
      const input = (keys.has("arrowright") || keys.has("d") ? 1 : 0) - (keys.has("arrowleft") || keys.has("a") ? 1 : 0) + touchDirection;
      paddle.x = Math.max(0, Math.min(canvas.width - paddle.width, paddle.x + Math.sign(input) * 430 * seconds));
      ball.x += ball.vx * seconds;
      ball.y += ball.vy * seconds;
      if (ball.x - ball.r <= 0 && ball.vx < 0 || ball.x + ball.r >= canvas.width && ball.vx > 0) ball.vx *= -1;
      if (ball.y - ball.r <= 0 && ball.vy < 0) ball.vy *= -1;
      if (ball.vy > 0 && hitRect(ball, paddle)) {
        ball.y = paddle.y - ball.r;
        const relative = (ball.x - (paddle.x + paddle.width / 2)) / (paddle.width / 2);
        const speed = Math.min(680, Math.hypot(ball.vx, ball.vy) * config.boost);
        ball.vx = speed * relative * .82;
        ball.vy = -Math.sqrt(Math.max(80, speed * speed - ball.vx * ball.vx));
      }
      for (let i = bricks.length - 1; i >= 0; i -= 1) {
        const brick = bricks[i];
        if (!hitRect(ball, brick)) continue;
        brick.hp -= 1;
        score += brick.hp <= 0 ? 10 : 3;
        ball.vy *= -1;
        if (brick.hp <= 0) bricks.splice(i, 1);
        updateStats();
        break;
      }
      if (!bricks.length) {
        level += 1;
        makeBricks();
        resetBall();
        updateStats();
        shell.status.textContent = `${config.label} · Level ${level}`;
      }
      if (ball.y - ball.r > canvas.height) {
        lives -= 1;
        updateStats();
        if (lives <= 0) endGame();
        else resetBall();
      }
    }

    function draw() {
      const c = colors();
      context.fillStyle = c.background;
      context.fillRect(0, 0, canvas.width, canvas.height);
      if (!difficulty) return;
      for (const brick of bricks) drawBeveledRect(context, brick.x, brick.y, brick.width, brick.height, brick.hp > 1 ? c.brown : c.orange);
      drawBeveledRect(context, paddle.x, paddle.y, paddle.width, paddle.height, c.cream);
      context.fillStyle = c.green;
      context.beginPath();
      context.arc(ball.x, ball.y, ball.r, 0, Math.PI * 2);
      context.fill();
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
      paddle.width = config.paddle;
      score = 0;
      lives = config.lives;
      level = 1;
      manualPaused = false;
      lifecyclePaused = false;
      over = false;
      makeBricks();
      resetBall();
      updateStats();
      shell.status.textContent = `${config.label} · Level 1`;
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
      shell.status.textContent = manualPaused ? "Paused" : `${config.label} · Level ${level}`;
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
      if (["arrowleft","arrowright","a","d","p","escape"].includes(key)) event.preventDefault();
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
      if (button.dataset.gameAction === "left") touchDirection = -1;
      if (button.dataset.gameAction === "right") touchDirection = 1;
    });
    touch.addEventListener("pointerup", () => { touchDirection = 0; });
    touch.addEventListener("pointercancel", () => { touchDirection = 0; });
    bindStandardActions(shell, { newGame: selector, restart: () => difficulty && start(difficulty), pause: togglePause });
    selector();
    return {
      element: shell.element,
      controller: {
        focus: () => shell.element.focus({ preventScroll: true }),
        pause() { lifecyclePaused = true; keys.clear(); touchDirection = 0; last = performance.now(); if (animation) cancelAnimationFrame(animation); animation = 0; draw(); },
        resume() { lifecyclePaused = false; last = performance.now(); if (difficulty && !manualPaused && !over && !animation) animation = requestAnimationFrame(tick); },
        destroy() { destroyed = true; keys.clear(); if (animation) cancelAnimationFrame(animation); animation = 0; }
      }
    };
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

  function createSolitaire() {
    const game = "solitaire";
    const shell = makeShell("Solitaire");
    shell.body?.classList?.add("retro-game__body--cards");
    const table = document.createElement("div");
    table.className = "solitaire-table";
    shell.stage.append(table);
    const movesStat = makeStat("Moves");
    const timeStat = makeStat("Time");
    const redealStat = makeStat("Redeals");
    const difficultyStat = makeStat("Difficulty", "—");
    const winsStat = makeStat("Wins");
    shell.sidebar.append(movesStat.row, timeStat.row, redealStat.row, difficultyStat.row, winsStat.row, makeControls([["Click", "Select / move"], ["Drag", "Move cards"], ["Double click", "Foundation"]]));
    const configs = {
      easy: { label: "Easy", description: "Draw 1 · unlimited redeals · auto foundation", draw: 1, redeals: Infinity, auto: true },
      normal: { label: "Normal", description: "Draw 3 · unlimited redeals", draw: 3, redeals: Infinity, auto: false },
      hard: { label: "Hard", description: "Draw 3 · one redeal", draw: 3, redeals: 1, auto: false }
    };
    const suits = ["♠","♥","♦","♣"];
    const redSuits = new Set(["♥","♦"]);
    let difficulty = null;
    let config = null;
    let stock = [];
    let waste = [];
    let foundations = [[],[],[],[]];
    let tableau = [[],[],[],[],[],[],[]];
    let selected = null;
    let moves = 0;
    let redeals = 0;
    let startedAt = 0;
    let elapsed = 0;
    let timer = 0;
    let lifecyclePaused = false;
    let won = false;
    let originalDeck = [];

    function winsKey() {
      return `samael.games.solitaire.wins.${difficulty}`;
    }

    function rankLabel(rank) {
      return rank === 1 ? "A" : rank === 11 ? "J" : rank === 12 ? "Q" : rank === 13 ? "K" : String(rank);
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
      if (timer || lifecyclePaused || won) return;
      startedAt = performance.now();
      timer = setInterval(() => { timeStat.value.textContent = String(seconds()); }, 250);
    }

    function makeDeck() {
      const deck = [];
      for (let suit = 0; suit < 4; suit += 1) for (let rank = 1; rank <= 13; rank += 1) deck.push({ suit, rank, face: false, id: `${suit}-${rank}-${Math.random().toString(36).slice(2)}` });
      for (let i = deck.length - 1; i > 0; i -= 1) {
        const j = Math.floor(Math.random() * (i + 1));
        [deck[i], deck[j]] = [deck[j], deck[i]];
      }
      return deck;
    }

    function cloneCard(card) {
      return { ...card };
    }

    function deal(deck) {
      stock = [];
      waste = [];
      foundations = [[],[],[],[]];
      tableau = [[],[],[],[],[],[],[]];
      let cursor = 0;
      for (let column = 0; column < 7; column += 1) {
        for (let row = 0; row <= column; row += 1) {
          const card = cloneCard(deck[cursor++]);
          card.face = row === column;
          tableau[column].push(card);
        }
      }
      stock = deck.slice(cursor).map(cloneCard);
    }

    function isRed(card) {
      return redSuits.has(suits[card.suit]);
    }

    function canTableau(card, destination) {
      if (!destination.length) return card.rank === 13;
      const top = destination[destination.length - 1];
      return top.face && top.rank === card.rank + 1 && isRed(top) !== isRed(card);
    }

    function canFoundation(card, pile) {
      if (!pile.length) return card.rank === 1;
      const top = pile[pile.length - 1];
      return top.suit === card.suit && card.rank === top.rank + 1;
    }

    function topSourceCard(source) {
      if (!source) return null;
      if (source.type === "waste") return waste[waste.length - 1] || null;
      if (source.type === "foundation") return foundations[source.index][foundations[source.index].length - 1] || null;
      if (source.type === "tableau") return tableau[source.index][source.cardIndex] || null;
      return null;
    }

    function sourceCards(source) {
      if (!source) return [];
      if (source.type === "waste") return waste.length ? [waste[waste.length - 1]] : [];
      if (source.type === "foundation") {
        const pile = foundations[source.index];
        return pile.length ? [pile[pile.length - 1]] : [];
      }
      if (source.type === "tableau") return tableau[source.index].slice(source.cardIndex);
      return [];
    }

    function removeSource(source) {
      if (source.type === "waste") return waste.splice(waste.length - 1, 1);
      if (source.type === "foundation") return foundations[source.index].splice(-1, 1);
      if (source.type === "tableau") return tableau[source.index].splice(source.cardIndex);
      return [];
    }

    function flipExposed(column) {
      const pile = tableau[column];
      if (pile.length && !pile[pile.length - 1].face) pile[pile.length - 1].face = true;
    }

    function moveToTableau(source, destinationIndex) {
      const cards = sourceCards(source);
      if (!cards.length || !cards.every((card) => card.face) || !canTableau(cards[0], tableau[destinationIndex])) return false;
      const moved = removeSource(source);
      tableau[destinationIndex].push(...moved);
      if (source.type === "tableau") flipExposed(source.index);
      moves += 1;
      return true;
    }

    function moveToFoundation(source, destinationIndex = null) {
      const cards = sourceCards(source);
      if (cards.length !== 1) return false;
      const card = cards[0];
      const target = destinationIndex === null ? card.suit : destinationIndex;
      if (target !== card.suit || !canFoundation(card, foundations[target])) return false;
      foundations[target].push(...removeSource(source));
      if (source.type === "tableau") flipExposed(source.index);
      moves += 1;
      return true;
    }

    function autoFoundation() {
      if (!config.auto) return;
      let changed = true;
      while (changed) {
        changed = false;
        const wasteSource = { type: "waste" };
        if (moveToFoundation(wasteSource)) { changed = true; continue; }
        for (let column = 0; column < 7; column += 1) {
          const pile = tableau[column];
          if (!pile.length) continue;
          if (moveToFoundation({ type: "tableau", index: column, cardIndex: pile.length - 1 })) { changed = true; break; }
        }
      }
    }

    function checkWin() {
      if (foundations.reduce((sum, pile) => sum + pile.length, 0) !== 52) return;
      won = true;
      stopClock();
      safeSet(winsKey(), safeNumber(winsKey(), 0) + 1);
      winsStat.value.textContent = String(safeNumber(winsKey(), 0));
      shell.status.textContent = `You win · ${moves} moves · ${seconds()}s`;
    }

    function cardElement(card, source) {
      const button = document.createElement("button");
      button.type = "button";
      button.className = "solitaire-card";
      button.draggable = card.face;
      if (!card.face) {
        button.classList.add("is-back");
        button.textContent = "▧";
      } else {
        if (isRed(card)) button.classList.add("is-red");
        button.innerHTML = `<strong>${rankLabel(card.rank)}</strong><span>${suits[card.suit]}</span>`;
      }
      button.dataset.source = JSON.stringify(source);
      if (selected && JSON.stringify(selected) === JSON.stringify(source)) button.classList.add("is-selected");
      return button;
    }

    function render() {
      table.replaceChildren();
      const top = document.createElement("div");
      top.className = "solitaire-top";
      const stockSlot = document.createElement("button");
      stockSlot.type = "button";
      stockSlot.className = "solitaire-slot solitaire-stock";
      stockSlot.dataset.stock = "1";
      stockSlot.textContent = stock.length ? `▧ ${stock.length}` : "↻";
      const wasteSlot = document.createElement("div");
      wasteSlot.className = "solitaire-slot solitaire-waste";
      if (waste.length) wasteSlot.append(cardElement(waste[waste.length - 1], { type: "waste" }));
      const spacer = document.createElement("div");
      spacer.className = "solitaire-spacer";
      top.append(stockSlot, wasteSlot, spacer);
      for (let suit = 0; suit < 4; suit += 1) {
        const foundation = document.createElement("div");
        foundation.className = "solitaire-slot solitaire-foundation";
        foundation.dataset.foundation = String(suit);
        if (foundations[suit].length) foundation.append(cardElement(foundations[suit][foundations[suit].length - 1], { type: "foundation", index: suit }));
        else foundation.textContent = suits[suit];
        top.append(foundation);
      }
      const tableauElement = document.createElement("div");
      tableauElement.className = "solitaire-tableau";
      for (let column = 0; column < 7; column += 1) {
        const pile = document.createElement("div");
        pile.className = "solitaire-column";
        pile.dataset.tableau = String(column);
        tableau[column].forEach((card, cardIndex) => {
          const element = cardElement(card, { type: "tableau", index: column, cardIndex });
          element.style.top = `${cardIndex * 24}px`;
          pile.append(element);
        });
        tableauElement.append(pile);
      }
      table.append(top, tableauElement);
      movesStat.value.textContent = String(moves);
      timeStat.value.textContent = String(seconds());
      redealStat.value.textContent = config.redeals === Infinity ? `${redeals}/∞` : `${redeals}/${config.redeals}`;
      difficultyStat.value.textContent = config.label;
      winsStat.value.textContent = String(safeNumber(winsKey(), 0));
    }

    function drawStock() {
      if (lifecyclePaused || won) return;
      if (!startedAt && !elapsed) startClock();
      if (!stock.length) {
        if (!waste.length || redeals >= config.redeals) return;
        stock = waste.reverse().map((card) => ({ ...card, face: false }));
        waste = [];
        redeals += 1;
      } else {
        const count = Math.min(config.draw, stock.length);
        for (let i = 0; i < count; i += 1) {
          const card = stock.pop();
          card.face = true;
          waste.push(card);
        }
      }
      moves += 1;
      selected = null;
      autoFoundation();
      checkWin();
      render();
    }

    function parseSource(element) {
      try {
        return JSON.parse(element.dataset.source || "null");
      } catch {
        return null;
      }
    }

    function handleCard(source, doubleClick = false) {
      const card = topSourceCard(source);
      if (!card || !card.face || lifecyclePaused || won) return;
      if (!startedAt && !elapsed) startClock();
      if (doubleClick && moveToFoundation(source)) {
        selected = null;
        autoFoundation();
        checkWin();
        render();
        return;
      }
      if (!selected) {
        selected = source;
        render();
        return;
      }
      const targetSource = source;
      if (targetSource.type === "tableau" && moveToTableau(selected, targetSource.index)) selected = null;
      else selected = source;
      autoFoundation();
      checkWin();
      render();
    }

    function start(selectedDifficulty, reuse = false) {
      difficulty = selectedDifficulty;
      config = configs[selectedDifficulty];
      const deck = reuse && originalDeck.length ? originalDeck.map(cloneCard) : makeDeck();
      originalDeck = deck.map(cloneCard);
      deal(deck);
      selected = null;
      moves = 0;
      redeals = 0;
      elapsed = 0;
      startedAt = 0;
      lifecyclePaused = false;
      won = false;
      stopClock();
      render();
      shell.status.textContent = `${config.label} · Draw ${config.draw}`;
    }

    function selectorScreen() {
      stopClock();
      difficulty = null;
      table.replaceChildren();
      showDifficultyMenu(shell.stage, game, "SELECT DIFFICULTY", configs, (selectedDifficulty) => start(selectedDifficulty, false));
      shell.status.textContent = "Select a difficulty";
    }

    table.addEventListener("click", (event) => {
      const stockButton = event.target instanceof Element ? event.target.closest("[data-stock]") : null;
      if (stockButton) { drawStock(); return; }
      const foundation = event.target instanceof Element ? event.target.closest("[data-foundation]") : null;
      const tableauSlot = event.target instanceof Element ? event.target.closest("[data-tableau]") : null;
      const card = event.target instanceof Element ? event.target.closest("[data-source]") : null;
      if (card) {
        const source = parseSource(card);
        if (selected && source?.type === "foundation" && moveToFoundation(selected, source.index)) { selected = null; autoFoundation(); checkWin(); render(); return; }
        handleCard(source, false);
        return;
      }
      if (foundation && selected && moveToFoundation(selected, Number(foundation.dataset.foundation))) { selected = null; autoFoundation(); checkWin(); render(); return; }
      if (tableauSlot && selected && moveToTableau(selected, Number(tableauSlot.dataset.tableau))) { selected = null; autoFoundation(); checkWin(); render(); }
    });
    table.addEventListener("dblclick", (event) => {
      const card = event.target instanceof Element ? event.target.closest("[data-source]") : null;
      if (card) handleCard(parseSource(card), true);
    });
    table.addEventListener("dragstart", (event) => {
      const card = event.target instanceof Element ? event.target.closest("[data-source]") : null;
      if (!card || !event.dataTransfer) return;
      event.dataTransfer.setData("text/plain", card.dataset.source || "");
    });
    table.addEventListener("dragover", (event) => {
      if (event.target instanceof Element && event.target.closest("[data-tableau],[data-foundation]")) event.preventDefault();
    });
    table.addEventListener("drop", (event) => {
      const destinationTableau = event.target instanceof Element ? event.target.closest("[data-tableau]") : null;
      const destinationFoundation = event.target instanceof Element ? event.target.closest("[data-foundation]") : null;
      if (!event.dataTransfer || (!destinationTableau && !destinationFoundation)) return;
      event.preventDefault();
      let source = null;
      try { source = JSON.parse(event.dataTransfer.getData("text/plain") || "null"); } catch {}
      if (!source) return;
      const moved = destinationTableau ? moveToTableau(source, Number(destinationTableau.dataset.tableau)) : moveToFoundation(source, Number(destinationFoundation.dataset.foundation));
      if (moved) { selected = null; autoFoundation(); checkWin(); render(); }
    });
    bindStandardActions(shell, {
      newGame: selectorScreen,
      restart: () => difficulty && start(difficulty, true),
      pause: () => {
        lifecyclePaused = !lifecyclePaused;
        if (lifecyclePaused) stopClock(); else if (moves && !won) startClock();
        shell.status.textContent = lifecyclePaused ? "Paused" : `${config?.label || ""}`;
      }
    });
    selectorScreen();
    return {
      element: shell.element,
      controller: {
        focus: () => shell.element.focus({ preventScroll: true }),
        pause() { lifecyclePaused = true; stopClock(); },
        resume() { lifecyclePaused = false; if (difficulty && moves && !won) startClock(); },
        destroy() { stopClock(); table.replaceChildren(); }
      }
    };
  }

  function createChess() {
    const game = "chess";
    const shell = makeShell("Chess");
    const boardElement = document.createElement("div");
    boardElement.className = "chess-board";
    const historyElement = document.createElement("ol");
    historyElement.className = "chess-history";
    shell.stage.append(boardElement);
    const turnStat = makeStat("Turn", "—");
    const checkStat = makeStat("Check", "No");
    const modeStat = makeStat("Mode", "—");
    const difficultyStat = makeStat("Difficulty", "—");
    const undo = makeButton("Undo", "undo-chess");
    shell.sidebar.append(turnStat.row, checkStat.row, modeStat.row, difficultyStat.row, undo, historyElement, makeControls([["Click", "Select / move"], ["Undo", "Previous position"], ["New Game", "Mode"]]));
    const configs = {
      easy: { label: "Easy", description: "Shallow search · forgiving choices", depth: 1 },
      normal: { label: "Normal", description: "Material and positional evaluation", depth: 2 },
      hard: { label: "Hard", description: "Deeper client-side search", depth: 3 }
    };
    const pieces = { wK:"♔",wQ:"♕",wR:"♖",wB:"♗",wN:"♘",wP:"♙",bK:"♚",bQ:"♛",bR:"♜",bB:"♝",bN:"♞",bP:"♟" };
    const values = { P:100,N:320,B:330,R:500,Q:900,K:20000 };
    let state = null;
    let mode = null;
    let difficulty = null;
    let selected = null;
    let snapshots = [];
    let moveHistory = [];
    let lifecyclePaused = false;
    let over = false;
    let cpuTimer = 0;

    function initialState() {
      const board = Array(64).fill(null);
      const order = ["R","N","B","Q","K","B","N","R"];
      for (let x = 0; x < 8; x += 1) {
        board[x] = `b${order[x]}`;
        board[8 + x] = "bP";
        board[48 + x] = "wP";
        board[56 + x] = `w${order[x]}`;
      }
      return { board, turn: "w", castling: { wK:true,wQ:true,bK:true,bQ:true }, enPassant: null, halfmove: 0 };
    }

    function cloneState(source) {
      return { board: [...source.board], turn: source.turn, castling: { ...source.castling }, enPassant: source.enPassant, halfmove: source.halfmove };
    }

    function colorOf(piece) {
      return piece?.[0] || null;
    }

    function typeOf(piece) {
      return piece?.[1] || null;
    }

    function other(color) {
      return color === "w" ? "b" : "w";
    }

    function xy(index) {
      return { x: index % 8, y: Math.floor(index / 8) };
    }

    function indexOf(x, y) {
      return y * 8 + x;
    }

    function inBoard(x, y) {
      return x >= 0 && x < 8 && y >= 0 && y < 8;
    }

    function attacked(board, target, byColor) {
      const targetXY = xy(target);
      for (let index = 0; index < 64; index += 1) {
        const piece = board[index];
        if (!piece || colorOf(piece) !== byColor) continue;
        const { x, y } = xy(index);
        const type = typeOf(piece);
        if (type === "P") {
          const direction = byColor === "w" ? -1 : 1;
          if (y + direction === targetXY.y && Math.abs(x - targetXY.x) === 1) return true;
        } else if (type === "N") {
          if ([[1,2],[2,1],[-1,2],[-2,1],[1,-2],[2,-1],[-1,-2],[-2,-1]].some(([dx,dy]) => x + dx === targetXY.x && y + dy === targetXY.y)) return true;
        } else if (type === "K") {
          if (Math.max(Math.abs(x - targetXY.x), Math.abs(y - targetXY.y)) === 1) return true;
        } else {
          const directions = type === "B" ? [[1,1],[-1,1],[1,-1],[-1,-1]] : type === "R" ? [[1,0],[-1,0],[0,1],[0,-1]] : [[1,1],[-1,1],[1,-1],[-1,-1],[1,0],[-1,0],[0,1],[0,-1]];
          for (const [dx,dy] of directions) {
            let nx = x + dx;
            let ny = y + dy;
            while (inBoard(nx,ny)) {
              const current = indexOf(nx,ny);
              if (current === target) return true;
              if (board[current]) break;
              nx += dx;
              ny += dy;
            }
          }
        }
      }
      return false;
    }

    function kingIndex(board, color) {
      return board.findIndex((piece) => piece === `${color}K`);
    }

    function inCheck(source, color) {
      const king = kingIndex(source.board, color);
      return king >= 0 && attacked(source.board, king, other(color));
    }

    function pseudoMoves(source, color) {
      const result = [];
      for (let from = 0; from < 64; from += 1) {
        const piece = source.board[from];
        if (!piece || colorOf(piece) !== color) continue;
        const { x, y } = xy(from);
        const type = typeOf(piece);
        const push = (to, extra = {}) => {
          const target = source.board[to];
          if (!target || colorOf(target) !== color) result.push({ from, to, piece, capture: target, ...extra });
        };
        if (type === "P") {
          const direction = color === "w" ? -1 : 1;
          const startRank = color === "w" ? 6 : 1;
          const promotionRank = color === "w" ? 0 : 7;
          const oneY = y + direction;
          if (inBoard(x,oneY) && !source.board[indexOf(x,oneY)]) {
            const to = indexOf(x,oneY);
            if (oneY === promotionRank) {
              for (const promotion of ["Q","R","B","N"]) push(to, { promotion });
            } else {
              push(to);
            }
            const twoY = y + direction * 2;
            if (y === startRank && !source.board[indexOf(x,twoY)]) push(indexOf(x,twoY), { doublePawn: true });
          }
          for (const dx of [-1,1]) {
            const nx = x + dx;
            const ny = y + direction;
            if (!inBoard(nx,ny)) continue;
            const to = indexOf(nx,ny);
            const target = source.board[to];
            if (target && colorOf(target) === other(color)) {
              if (ny === promotionRank) {
                for (const promotion of ["Q","R","B","N"]) push(to, { promotion });
              } else {
                push(to);
              }
            }
            if (source.enPassant === to) push(to, { enPassant: true, capture: `${other(color)}P` });
          }
        } else if (type === "N") {
          for (const [dx,dy] of [[1,2],[2,1],[-1,2],[-2,1],[1,-2],[2,-1],[-1,-2],[-2,-1]]) if (inBoard(x+dx,y+dy)) push(indexOf(x+dx,y+dy));
        } else if (type === "K") {
          for (let dy = -1; dy <= 1; dy += 1) for (let dx = -1; dx <= 1; dx += 1) if ((dx || dy) && inBoard(x+dx,y+dy)) push(indexOf(x+dx,y+dy));
          const rank = color === "w" ? 7 : 0;
          const enemy = other(color);
          if (!inCheck(source,color)) {
            if (source.castling[`${color}K`] && !source.board[indexOf(5,rank)] && !source.board[indexOf(6,rank)] && source.board[indexOf(7,rank)] === `${color}R` && !attacked(source.board,indexOf(5,rank),enemy) && !attacked(source.board,indexOf(6,rank),enemy)) result.push({ from, to:indexOf(6,rank), piece, castle:"K" });
            if (source.castling[`${color}Q`] && !source.board[indexOf(1,rank)] && !source.board[indexOf(2,rank)] && !source.board[indexOf(3,rank)] && source.board[indexOf(0,rank)] === `${color}R` && !attacked(source.board,indexOf(3,rank),enemy) && !attacked(source.board,indexOf(2,rank),enemy)) result.push({ from, to:indexOf(2,rank), piece, castle:"Q" });
          }
        } else {
          const directions = type === "B" ? [[1,1],[-1,1],[1,-1],[-1,-1]] : type === "R" ? [[1,0],[-1,0],[0,1],[0,-1]] : [[1,1],[-1,1],[1,-1],[-1,-1],[1,0],[-1,0],[0,1],[0,-1]];
          for (const [dx,dy] of directions) {
            let nx = x + dx;
            let ny = y + dy;
            while (inBoard(nx,ny)) {
              const to = indexOf(nx,ny);
              const target = source.board[to];
              if (!target) result.push({ from, to, piece, capture:null });
              else {
                if (colorOf(target) !== color) result.push({ from, to, piece, capture:target });
                break;
              }
              nx += dx;
              ny += dy;
            }
          }
        }
      }
      return result;
    }

    function applyMove(source, move) {
      const next = cloneState(source);
      const piece = next.board[move.from];
      const color = colorOf(piece);
      const target = next.board[move.to];
      next.board[move.from] = null;
      next.board[move.to] = move.promotion ? `${color}${move.promotion}` : piece;
      if (move.enPassant) {
        const capture = move.to + (color === "w" ? 8 : -8);
        next.board[capture] = null;
      }
      if (move.castle) {
        const rank = color === "w" ? 7 : 0;
        if (move.castle === "K") {
          next.board[indexOf(5,rank)] = `${color}R`;
          next.board[indexOf(7,rank)] = null;
        } else {
          next.board[indexOf(3,rank)] = `${color}R`;
          next.board[indexOf(0,rank)] = null;
        }
      }
      if (piece === "wK") { next.castling.wK = false; next.castling.wQ = false; }
      if (piece === "bK") { next.castling.bK = false; next.castling.bQ = false; }
      if (move.from === 63 || move.to === 63) next.castling.wK = false;
      if (move.from === 56 || move.to === 56) next.castling.wQ = false;
      if (move.from === 7 || move.to === 7) next.castling.bK = false;
      if (move.from === 0 || move.to === 0) next.castling.bQ = false;
      next.enPassant = move.doublePawn ? (move.from + move.to) / 2 : null;
      next.halfmove = typeOf(piece) === "P" || target || move.enPassant ? 0 : source.halfmove + 1;
      next.turn = other(source.turn);
      return next;
    }

    function legalMoves(source, color = source.turn) {
      return pseudoMoves(source,color).filter((move) => !inCheck(applyMove(source,move),color));
    }

    function notation(move) {
      const files = "abcdefgh";
      const from = xy(move.from);
      const to = xy(move.to);
      if (move.castle === "K") return "O-O";
      if (move.castle === "Q") return "O-O-O";
      return `${typeOf(move.piece) === "P" ? "" : typeOf(move.piece)}${files[from.x]}${8-from.y}${move.capture ? "x" : "-"}${files[to.x]}${8-to.y}${move.promotion ? `=${move.promotion}` : ""}`;
    }

    function evaluate(source, perspective) {
      let value = 0;
      for (let index = 0; index < 64; index += 1) {
        const piece = source.board[index];
        if (!piece) continue;
        const type = typeOf(piece);
        const { x, y } = xy(index);
        const center = 7 - (Math.abs(3.5 - x) + Math.abs(3.5 - y));
        const pieceValue = values[type] + (type === "P" || type === "N" || type === "B" ? center * 4 : 0);
        value += colorOf(piece) === perspective ? pieceValue : -pieceValue;
      }
      return value;
    }

    function minimax(source, depth, perspective, alpha, beta) {
      const moves = legalMoves(source);
      if (!depth || !moves.length) {
        if (!moves.length && inCheck(source,source.turn)) return source.turn === perspective ? -999999 : 999999;
        return evaluate(source,perspective);
      }
      const maximizing = source.turn === perspective;
      let value = maximizing ? -Infinity : Infinity;
      for (const move of moves) {
        const child = applyMove(source,move);
        const result = minimax(child, depth - 1, perspective, alpha, beta);
        if (maximizing) {
          value = Math.max(value,result);
          alpha = Math.max(alpha,value);
        } else {
          value = Math.min(value,result);
          beta = Math.min(beta,value);
        }
        if (beta <= alpha) break;
      }
      return value;
    }

    function chooseCpuMove() {
      const moves = legalMoves(state);
      if (!moves.length) return null;
      if (difficulty === "easy") {
        const scored = moves.map((move) => ({ move, score: evaluate(applyMove(state,move),"b") + Math.random()*180 })).sort((a,b) => b.score - a.score);
        return scored[Math.min(scored.length - 1, Math.floor(Math.random() * Math.min(4, scored.length)))].move;
      }
      const depth = configs[difficulty].depth - 1;
      let bestMove = moves[0];
      let bestValue = -Infinity;
      for (const move of moves) {
        const value = minimax(applyMove(state,move), depth, "b", -Infinity, Infinity);
        if (value > bestValue) { bestValue = value; bestMove = move; }
      }
      return bestMove;
    }

    function render() {
      if (!state) return;
      const moves = legalMoves(state);
      const targets = selected === null ? [] : moves.filter((move) => move.from === selected).map((move) => move.to);
      boardElement.replaceChildren();
      for (let index = 0; index < 64; index += 1) {
        const button = document.createElement("button");
        button.type = "button";
        button.className = "chess-square";
        button.dataset.index = String(index);
        if ((Math.floor(index / 8) + index % 8) % 2) button.classList.add("is-dark");
        if (index === selected) button.classList.add("is-selected");
        if (targets.includes(index)) button.classList.add("is-legal");
        button.textContent = pieces[state.board[index]] || "";
        boardElement.append(button);
      }
      turnStat.value.textContent = state.turn === "w" ? "White" : "Black";
      checkStat.value.textContent = inCheck(state,state.turn) ? "Yes" : "No";
      modeStat.value.textContent = mode === "local" ? "Local" : "vs CPU";
      difficultyStat.value.textContent = mode === "local" ? "Local" : configs[difficulty]?.label || "—";
      historyElement.replaceChildren();
      moveHistory.slice(-18).forEach((move) => {
        const item = document.createElement("li");
        item.textContent = move;
        historyElement.append(item);
      });
    }

    function finishCheck() {
      const moves = legalMoves(state);
      if (moves.length) return false;
      over = true;
      shell.status.textContent = inCheck(state,state.turn) ? `Checkmate · ${state.turn === "w" ? "Black" : "White"} wins` : "Stalemate";
      render();
      return true;
    }

    function execute(move) {
      shell.stage.querySelector(".chess-promotion")?.remove();
      snapshots.push(cloneState(state));
      moveHistory.push(notation(move));
      state = applyMove(state,move);
      selected = null;
      render();
      if (finishCheck()) return;
      shell.status.textContent = `${state.turn === "w" ? "White" : "Black"} to move${inCheck(state,state.turn) ? " · Check" : ""}`;
      if (mode === "cpu" && state.turn === "b" && !lifecyclePaused) scheduleCpu();
    }

    function choosePromotion(candidates) {
      shell.stage.querySelector(".chess-promotion")?.remove();
      const overlay = document.createElement("div");
      overlay.className = "game-start-screen chess-promotion";
      const panel = document.createElement("div");
      panel.className = "game-start-screen__panel game-start-screen__panel--compact";
      const heading = document.createElement("strong");
      heading.className = "game-start-screen__heading";
      heading.textContent = "SELECT PROMOTION";
      const actions = document.createElement("div");
      actions.className = "game-start-screen__mode-actions";
      for (const promotion of ["Q","R","B","N"]) {
        const move = candidates.find((candidate) => candidate.promotion === promotion);
        if (!move) continue;
        const button = makeButton(`${pieces[`${state.turn}${promotion}`]} ${promotion}`, `promote-${promotion.toLowerCase()}`);
        button.addEventListener("click", () => { overlay.remove(); execute(move); });
        actions.append(button);
      }
      panel.append(heading, actions);
      overlay.append(panel);
      shell.stage.append(overlay);
    }

    function clickSquare(index) {
      if (!state || over || lifecyclePaused || (mode === "cpu" && state.turn === "b")) return;
      const piece = state.board[index];
      if (selected === null) {
        if (piece && colorOf(piece) === state.turn) { selected = index; render(); }
        return;
      }
      const candidates = legalMoves(state).filter((candidate) => candidate.from === selected && candidate.to === index);
      if (candidates.length > 1 && candidates.every((candidate) => candidate.promotion)) { choosePromotion(candidates); return; }
      if (candidates[0]) { execute(candidates[0]); return; }
      selected = piece && colorOf(piece) === state.turn ? index : null;
      render();
    }

    function scheduleCpu() {
      clearTimeout(cpuTimer);
      shell.status.textContent = `${configs[difficulty].label} CPU thinking…`;
      cpuTimer = setTimeout(() => {
        if (!state || over || lifecyclePaused || mode !== "cpu" || state.turn !== "b") return;
        const move = chooseCpuMove();
        if (move) execute(move);
      }, 40);
    }

    function start(selectedMode, selectedDifficulty = null) {
      mode = selectedMode;
      difficulty = selectedDifficulty;
      state = initialState();
      selected = null;
      snapshots = [];
      moveHistory = [];
      lifecyclePaused = false;
      over = false;
      render();
      shell.status.textContent = mode === "local" ? "Local two player · White to move" : `${configs[difficulty].label} CPU · You are White`;
    }

    function modeSelector() {
      clearTimeout(cpuTimer);
      shell.stage.querySelector(".chess-promotion")?.remove();
      mode = null;
      difficulty = null;
      state = null;
      boardElement.replaceChildren();
      historyElement.replaceChildren();
      shell.stage.querySelector(".game-start-screen")?.remove();
      const overlay = document.createElement("div");
      overlay.className = "game-start-screen";
      const panel = document.createElement("div");
      panel.className = "game-start-screen__panel";
      const intro = buildGameStartIntro(game, { note: "Choose Local Two Player or Player vs CPU before the board appears." });
      const setup = document.createElement("section");
      setup.className = "game-start-screen__setup";
      const heading = document.createElement("strong");
      heading.className = "game-start-screen__heading";
      heading.textContent = "SELECT MODE";
      const helper = document.createElement("p");
      helper.className = "game-start-screen__setup-copy";
      helper.textContent = "Choose how you want to play this match.";
      const actions = document.createElement("div");
      actions.className = "game-start-screen__mode-actions";
      const local = makeButton("Local Two Player", "mode-local");
      const cpu = makeButton("Player vs CPU", "mode-cpu");
      actions.append(local,cpu);
      setup.append(heading, helper, actions);
      if (intro) panel.append(intro);
      panel.append(setup);
      overlay.append(panel);
      shell.stage.append(overlay);
      local.addEventListener("click", () => { overlay.remove(); start("local"); });
      cpu.addEventListener("click", () => { overlay.remove(); showDifficultyMenu(shell.stage, game, "SELECT CPU DIFFICULTY", configs, (selectedDifficulty) => start("cpu", selectedDifficulty)); });
      shell.status.textContent = "Select a mode";
    }

    function undoMove() {
      if (!snapshots.length || lifecyclePaused) return;
      clearTimeout(cpuTimer);
      state = snapshots.pop();
      moveHistory.pop();
      if (mode === "cpu" && state.turn === "b" && snapshots.length) {
        state = snapshots.pop();
        moveHistory.pop();
      }
      selected = null;
      over = false;
      render();
      shell.status.textContent = `${state.turn === "w" ? "White" : "Black"} to move`;
    }

    boardElement.addEventListener("click", (event) => {
      const square = event.target instanceof Element ? event.target.closest("[data-index]") : null;
      if (square) clickSquare(Number(square.dataset.index));
    });
    shell.element.addEventListener("click", (event) => {
      const button = event.target instanceof Element ? event.target.closest("[data-game-action]") : null;
      if (button?.dataset.gameAction === "undo-chess") undoMove();
    });
    bindStandardActions(shell, {
      newGame: modeSelector,
      restart: () => mode && start(mode,difficulty),
      pause: () => {
        lifecyclePaused = !lifecyclePaused;
        if (!lifecyclePaused && mode === "cpu" && state?.turn === "b" && !over) scheduleCpu();
        shell.status.textContent = lifecyclePaused ? "Paused" : `${state?.turn === "w" ? "White" : "Black"} to move`;
      }
    });
    modeSelector();
    return {
      element: shell.element,
      controller: {
        focus: () => shell.element.focus({ preventScroll: true }),
        pause() { lifecyclePaused = true; clearTimeout(cpuTimer); },
        resume() { lifecyclePaused = false; if (mode === "cpu" && state?.turn === "b" && !over) scheduleCpu(); },
        destroy() { clearTimeout(cpuTimer); state = null; snapshots = []; }
      }
    };
  }

  function create(application) {
    const id = application.game || application.id;
    let result;
    if (id === "minesweeper") result = createMinesweeper();
    else if (id === "solitaire") result = createSolitaire();
    else if (id === "snake") result = createSnake();
    else if (id === "breakout") result = createBreakout();
    else if (id === "asteroids") result = createAsteroids();
    else if (id === "sokoban") result = createSokoban();
    else if (id === "chess") result = createChess();
    else if (id === "pinball") result = createPinball();
    else if (id === "memory") result = createMemory();
    else if (id === "lunar-lander") result = createLunarLander();
    else result = typeof baseCreate === "function" ? baseCreate(application) : null;
    if (result?.element) gameAudio.bind(result.element);
    return result;
  }

  window.PortfolioGames = { ...(window.PortfolioGames || {}), create, showDifficultyMenu };
})();
