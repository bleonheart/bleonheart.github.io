(() => {
  "use strict";


  const gameAudio = (() => {
    if (window.PortfolioGameAudio) return window.PortfolioGameAudio;

    let context = null;
    const lastPlayed = new Map();
    const sounds = {
      move: { frequency: 390, volume: 0.075, duration: 0.035, type: "square", cooldown: 38 },
      action: { frequency: 620, volume: 0.1, duration: 0.05, type: "square", cooldown: 42 },
      hit: { frequency: 780, volume: 0.12, duration: 0.045, type: "triangle", cooldown: 30 },
      score: { frequency: 920, volume: 0.13, duration: 0.075, type: "sine", cooldown: 55 },
      menu: { frequency: 520, volume: 0.09, duration: 0.055, type: "sine", cooldown: 45 },
      start: { frequency: 480, volume: 0.13, duration: 0.11, type: "square", cooldown: 120 },
      pause: { frequency: 310, volume: 0.1, duration: 0.07, type: "triangle", cooldown: 90 },
      win: { frequency: 760, volume: 0.15, duration: 0.18, type: "sine", cooldown: 250 },
      lose: { frequency: 240, volume: 0.14, duration: 0.2, type: "triangle", cooldown: 250 }
    };

    function ensureContext() {
      const AudioContextClass = window.AudioContext || window.webkitAudioContext;
      if (!AudioContextClass) return null;
      try {
        context = context || new AudioContextClass();
        if (context.state === "suspended") context.resume().catch(() => {});
        return context;
      } catch {
        return null;
      }
    }

    function play(type = "action") {
      const sound = sounds[type] || sounds.action;
      const nowMs = performance.now();
      const previous = lastPlayed.get(type) || 0;
      if (nowMs - previous < sound.cooldown) return;
      const audio = ensureContext();
      if (!audio) return;
      lastPlayed.set(type, nowMs);
      try {
        const now = audio.currentTime;
        const oscillator = audio.createOscillator();
        const gain = audio.createGain();
        oscillator.type = sound.type;
        oscillator.frequency.setValueAtTime(sound.frequency, now);
        if (type === "win" || type === "start" || type === "score") {
          oscillator.frequency.exponentialRampToValueAtTime(sound.frequency * 1.35, now + sound.duration);
        } else if (type === "lose" || type === "pause") {
          oscillator.frequency.exponentialRampToValueAtTime(Math.max(110, sound.frequency * 0.65), now + sound.duration);
        }
        gain.gain.setValueAtTime(0.0001, now);
        gain.gain.exponentialRampToValueAtTime(sound.volume, now + 0.006);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + sound.duration);
        oscillator.connect(gain);
        gain.connect(audio.destination);
        oscillator.start(now);
        oscillator.stop(now + sound.duration + 0.015);

        if (type === "win" || type === "start") {
          const second = audio.createOscillator();
          const secondGain = audio.createGain();
          second.type = "sine";
          second.frequency.setValueAtTime(sound.frequency * 1.5, now + 0.055);
          secondGain.gain.setValueAtTime(0.0001, now + 0.05);
          secondGain.gain.exponentialRampToValueAtTime(sound.volume * 0.75, now + 0.065);
          secondGain.gain.exponentialRampToValueAtTime(0.0001, now + sound.duration + 0.07);
          second.connect(secondGain);
          secondGain.connect(audio.destination);
          second.start(now + 0.05);
          second.stop(now + sound.duration + 0.085);
        }
      } catch {}
    }

    function bind(element) {
      if (!element || element.dataset.gameAudioBound === "true") return;
      element.dataset.gameAudioBound = "true";
      let lastStatus = element.querySelector(".retro-game__status")?.textContent || "";
      let lastStatSound = 0;

      element.addEventListener("pointerdown", () => ensureContext(), { passive: true });
      element.addEventListener("click", (event) => {
        const target = event.target instanceof Element ? event.target : null;
        if (!target) return;
        const control = target.closest("[data-game-action], .retro-game__difficulty-button, .game-difficulty__option, select");
        if (control) {
          const action = control.dataset.gameAction || "";
          if (action === "pause") play("pause");
          else if (action === "start-difficulty" || action === "new" || action === "restart" || control.classList.contains("game-difficulty__option")) play("start");
          else if (["left", "right", "up", "down", "turn-left", "turn-right", "left-flipper", "right-flipper"].includes(action)) play("move");
          else play("menu");
          return;
        }
        if (target.closest("canvas, .minesweeper-board, .memory-board, .solitaire-board, .chess-board, .sokoban-board, [data-cell], [data-card], [data-square]")) play("action");
      });

      element.addEventListener("keydown", (event) => {
        if (event.repeat) return;
        if (event.target instanceof Element && event.target.closest("button,input,select,textarea,a")) return;
        const key = event.key.toLowerCase();
        if (["arrowleft", "arrowright", "arrowup", "arrowdown", "w", "a", "s", "d"].includes(key)) play("move");
        else if ([" ", "z", "x", "enter"].includes(key)) play("action");
        else if (["p", "escape"].includes(key)) play("pause");
      });

      const observer = new MutationObserver((mutations) => {
        let statusChanged = false;
        let statChanged = false;
        for (const mutation of mutations) {
          const node = mutation.target.nodeType === Node.TEXT_NODE ? mutation.target.parentElement : mutation.target;
          if (!(node instanceof Element)) continue;
          if (node.closest(".retro-game__status")) statusChanged = true;
          const stat = node.closest(".retro-game__stat");
          if (stat) {
            const label = stat.querySelector("span")?.textContent?.trim().toLowerCase() || "";
            if (["score", "you", "cpu", "lines", "moves", "lives", "balls", "wave", "level", "matched", "mines"].some((name) => label.includes(name))) statChanged = true;
          }
        }

        if (statusChanged) {
          const status = element.querySelector(".retro-game__status")?.textContent || "";
          if (status !== lastStatus) {
            lastStatus = status;
            const normalized = status.toLowerCase();
            if (/(you win|victory|cleared|complete|completed|checkmate|safe landing|landed)/.test(normalized)) play("win");
            else if (/(game over|cpu wins|you lose|lost|crash|exploded|mine hit)/.test(normalized)) play("lose");
          }
        }

        if (statChanged && performance.now() - lastStatSound > 70) {
          lastStatSound = performance.now();
          play("score");
        }
      });
      observer.observe(element, { subtree: true, childList: true, characterData: true });
      element.portfolioGameAudioDestroy = () => observer.disconnect();
    }

    return { play, bind };
  })();

  window.PortfolioGameAudio = gameAudio;

  function palette() {
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

  function makeButton(label, action) {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "retro-game__button";
    button.dataset.gameAction = action;
    button.textContent = label;
    return button;
  }

  function makeShell(title, instructions) {
    const element = document.createElement("div");
    element.className = "retro-game retro-game--framed";
    element.tabIndex = 0;
    element.setAttribute("aria-label", title);

    const body = document.createElement("div");
    body.className = "retro-game__body";
    const stage = document.createElement("div");
    stage.className = "retro-game__stage";
    const sidebar = document.createElement("aside");
    sidebar.className = "retro-game__sidebar";

    const controls = document.createElement("div");
    controls.className = "retro-game__menu-actions";
    const newGame = makeButton("New Game", "new");
    const restart = makeButton("Restart", "restart");
    const pause = makeButton("Pause", "pause");
    newGame.classList.add("retro-game__button--primary");
    controls.append(newGame, restart, pause);

    const help = document.createElement("p");
    help.className = "retro-game__help";
    help.textContent = instructions;
    sidebar.append(help, controls);
    body.append(stage, sidebar);

    const status = document.createElement("div");
    status.className = "retro-game__status";
    status.textContent = "Ready";
    element.append(body, status);

    return { element, stage, sidebar, status, pause, newGame, restart, help };
  }

  function makeStat(label) {
    const row = document.createElement("div");
    row.className = "retro-game__stat";
    const name = document.createElement("span");
    name.textContent = label;
    const value = document.createElement("strong");
    value.textContent = "0";
    row.append(name, value);
    return { row, value };
  }

  function makeControlsList(entries) {
    const controls = document.createElement("div");
    controls.className = "retro-game__controls-list";
    for (const [keys, action] of entries) {
      const row = document.createElement("div");
      row.className = "retro-game__control-row";
      const key = document.createElement("kbd");
      key.textContent = keys;
      const label = document.createElement("span");
      label.textContent = action;
      row.append(key, label);
      controls.append(row);
    }
    return controls;
  }

  const gameStartDetails = {
    tetris: { title: "Tetris", description: "Clear horizontal lines before the stack reaches the top.", howToPlay: "Move and rotate each falling tetromino to complete solid rows. Completed rows disappear and increase your score. Use soft drop for control, hard drop to place instantly, and keep space available for future pieces." },
    pong: { title: "Pong", description: "Score seven points before the CPU does.", howToPlay: "Move your paddle up and down with the arrow keys or W/S. Return the ball past the CPU paddle to score. Hitting the ball away from the center of your paddle changes its angle and helps create harder returns." }
  };

  function makeGameStartIntro(game) {
    const detail = gameStartDetails[game];
    if (!detail) return null;
    const intro = document.createElement("section");
    intro.className = "game-start-screen__intro game-start-screen__intro--text-only";
    const copy = document.createElement("div");
    copy.className = "game-start-screen__copy";
    const title = document.createElement("strong");
    title.className = "game-start-screen__game-title";
    title.textContent = detail.title;
    const description = document.createElement("p");
    description.className = "game-start-screen__description game-start-screen__objective";
    description.textContent = detail.description;
    const howToPlayLabel = document.createElement("strong");
    howToPlayLabel.className = "game-start-screen__how-title";
    howToPlayLabel.textContent = "HOW TO PLAY";
    const howToPlay = document.createElement("p");
    howToPlay.className = "game-start-screen__description game-start-screen__how-copy";
    howToPlay.textContent = detail.howToPlay;
    copy.append(title, description, howToPlayLabel, howToPlay);
    intro.append(copy);
    return intro;
  }

  function createTetris() {
    const shell = makeShell("Tetris", "");
    shell.help.remove();

    const playfield = document.createElement("div");
    playfield.className = "retro-game__playfield";
    const canvas = document.createElement("canvas");
    canvas.className = "retro-game__canvas retro-game__canvas--tetris";
    canvas.width = 240;
    canvas.height = 480;
    canvas.setAttribute("aria-label", "Tetris playfield");
    playfield.append(canvas);

    const difficultyOverlay = document.createElement("div");
    difficultyOverlay.className = "retro-game__difficulty";
    const difficultyPanel = document.createElement("div");
    difficultyPanel.className = "retro-game__difficulty-panel";
    const difficultyTitle = document.createElement("strong");
    difficultyTitle.textContent = "Choose Difficulty";
    const difficultyCopy = document.createElement("span");
    difficultyCopy.textContent = "Pick a speed before the game starts.";
    const intro = makeGameStartIntro("tetris");
    const difficultyButtons = document.createElement("div");
    difficultyButtons.className = "retro-game__difficulty-actions";
    const difficultyDefinitions = [
      ["easy", "Easy", "Relaxed"],
      ["normal", "Normal", "Standard"],
      ["hard", "Hard", "Fast"]
    ];
    let selectedDifficulty = "normal";
    for (const [value, label, description] of difficultyDefinitions) {
      const button = document.createElement("button");
      button.type = "button";
      button.className = "retro-game__difficulty-button";
      button.dataset.tetrisDifficulty = value;
      const strong = document.createElement("strong");
      strong.textContent = label;
      const small = document.createElement("span");
      small.textContent = description;
      button.append(strong, small);
      difficultyButtons.append(button);
    }
    const difficultySetup = document.createElement("section");
    difficultySetup.className = "game-start-screen__setup";
    difficultyTitle.className = "game-start-screen__heading";
    difficultyCopy.className = "game-start-screen__setup-copy";
    const difficultyStart = makeButton("Start Game", "start-difficulty");
    difficultyStart.classList.add("game-start-screen__start");
    difficultySetup.append(difficultyTitle, difficultyCopy, difficultyButtons, difficultyStart);
    if (intro) difficultyPanel.append(intro);
    difficultyPanel.append(difficultySetup);
    difficultyOverlay.append(difficultyPanel);
    shell.stage.append(playfield, difficultyOverlay);

    const scoreStat = makeStat("Score");
    const linesStat = makeStat("Lines");
    const levelStat = makeStat("Level");
    const difficultyStat = makeStat("Difficulty");
    const bestStat = makeStat("Best");
    difficultyStat.value.textContent = "—";
    const nextLabel = document.createElement("span");
    nextLabel.className = "retro-game__sidebar-heading";
    nextLabel.textContent = "NEXT";
    const nextCanvas = document.createElement("canvas");
    nextCanvas.className = "retro-game__preview";
    nextCanvas.width = 96;
    nextCanvas.height = 72;
    shell.sidebar.append(nextLabel, nextCanvas, scoreStat.row, levelStat.row, linesStat.row, difficultyStat.row, bestStat.row);
    shell.sidebar.append(makeControlsList([
      ["←  →", "Move"],
      ["↓", "Soft drop"],
      ["↑ / X", "Rotate"],
      ["Z", "Rotate back"],
      ["Space", "Hard drop"],
      ["P / Esc", "Pause"]
    ]));

    const mobileControls = document.createElement("div");
    mobileControls.className = "retro-game__touch-controls retro-game__touch-controls--tetris";
    for (const [label, action] of [["←", "left"], ["↻", "rotate"], ["→", "right"], ["↓", "down"], ["Drop", "drop"]]) {
      mobileControls.append(makeButton(label, action));
    }
    shell.stage.append(mobileControls);

    const context = canvas.getContext("2d");
    const nextContext = nextCanvas.getContext("2d");
    const columns = 10;
    const rows = 20;
    const cell = 24;
    const shapes = {
      I: [[1, 1, 1, 1]],
      J: [[1, 0, 0], [1, 1, 1]],
      L: [[0, 0, 1], [1, 1, 1]],
      O: [[1, 1], [1, 1]],
      S: [[0, 1, 1], [1, 1, 0]],
      T: [[0, 1, 0], [1, 1, 1]],
      Z: [[1, 1, 0], [0, 1, 1]]
    };
    const difficulties = {
      easy: { label: "Easy", startLevel: 1, baseDrop: 900, minimumDrop: 130, levelStep: 55 },
      normal: { label: "Normal", startLevel: 1, baseDrop: 700, minimumDrop: 90, levelStep: 55 },
      hard: { label: "Hard", startLevel: 5, baseDrop: 460, minimumDrop: 70, levelStep: 42 }
    };
    const colorKeys = ["cream", "orange", "brown", "green", "text", "muted", "orange"];
    const shapeNames = Object.keys(shapes);
    let board = Array.from({ length: rows }, () => Array(columns).fill(0));
    let piece = null;
    let nextType = null;
    let bag = [];
    let score = 0;
    let lines = 0;
    let level = 0;
    let best = 0;
    let difficulty = null;
    let started = false;
    let manualPaused = false;
    let lifecyclePaused = false;
    let gameOver = false;
    let animationFrame = 0;
    let lastTime = 0;
    let dropAccumulator = 0;
    let destroyed = false;
    const held = { left: false, right: false, down: false };
    let horizontalDirection = 0;
    let horizontalStartedAt = 0;
    let horizontalRepeatedAt = 0;
    let downRepeatedAt = 0;

    function isPaused() {
      return !started || manualPaused || lifecyclePaused || gameOver;
    }

    function bestKey() {
      return `samael.games.tetris.highScore.${difficulty || "normal"}`;
    }

    function legacyBestKey() {
      return difficulty === "normal" ? "samael.tetris.best" : `samael.tetris.best.${difficulty || "normal"}`;
    }

    function loadBest() {
      if (!difficulty) {
        best = 0;
        return;
      }
      try { best = Math.max(Number(localStorage.getItem(bestKey()) || 0) || 0, Number(localStorage.getItem(legacyBestKey()) || 0) || 0); } catch { best = 0; }
    }

    function resetHeldInput() {
      held.left = false;
      held.right = false;
      held.down = false;
      horizontalDirection = 0;
      horizontalStartedAt = 0;
      horizontalRepeatedAt = 0;
      downRepeatedAt = 0;
    }

    function resetBag() {
      bag = [...shapeNames];
      for (let i = bag.length - 1; i > 0; i -= 1) {
        const j = Math.floor(Math.random() * (i + 1));
        [bag[i], bag[j]] = [bag[j], bag[i]];
      }
    }

    function takeType() {
      if (!bag.length) resetBag();
      return bag.pop();
    }

    function cloneShape(shape) {
      return shape.map((row) => [...row]);
    }

    function spawn() {
      const type = nextType || takeType();
      nextType = takeType();
      const shape = cloneShape(shapes[type]);
      piece = {
        type,
        shape,
        x: Math.floor((columns - shape[0].length) / 2),
        y: 0
      };
      if (collides(piece.x, piece.y, piece.shape)) {
        gameOver = true;
        shell.pause.disabled = true;
        shell.status.textContent = "Game Over · New Game to choose difficulty";
        saveBest();
      }
      drawNext();
    }

    function collides(x, y, shape) {
      for (let py = 0; py < shape.length; py += 1) {
        for (let px = 0; px < shape[py].length; px += 1) {
          if (!shape[py][px]) continue;
          const bx = x + px;
          const by = y + py;
          if (bx < 0 || bx >= columns || by >= rows) return true;
          if (by >= 0 && board[by][bx]) return true;
        }
      }
      return false;
    }

    function merge() {
      const value = shapeNames.indexOf(piece.type) + 1;
      for (let py = 0; py < piece.shape.length; py += 1) {
        for (let px = 0; px < piece.shape[py].length; px += 1) {
          if (!piece.shape[py][px]) continue;
          const by = piece.y + py;
          const bx = piece.x + px;
          if (by >= 0 && by < rows && bx >= 0 && bx < columns) board[by][bx] = value;
        }
      }
    }

    function clearLines() {
      let cleared = 0;
      for (let y = rows - 1; y >= 0; y -= 1) {
        if (!board[y].every(Boolean)) continue;
        board.splice(y, 1);
        board.unshift(Array(columns).fill(0));
        cleared += 1;
        y += 1;
      }
      if (!cleared) return;
      const rewards = [0, 100, 300, 500, 800];
      score += rewards[cleared] * Math.max(1, level);
      lines += cleared;
      const config = difficulties[difficulty];
      level = config.startLevel + Math.floor(lines / 10);
      updateStats();
    }

    function lock() {
      merge();
      clearLines();
      spawn();
    }

    function move(dx, dy, softDrop = false) {
      if (isPaused() || !piece) return false;
      if (collides(piece.x + dx, piece.y + dy, piece.shape)) {
        if (dy > 0) lock();
        return false;
      }
      piece.x += dx;
      piece.y += dy;
      if (softDrop && dy > 0) {
        score += 1;
        updateStats();
      }
      return true;
    }

    function rotatedShape(direction) {
      if (direction > 0) return piece.shape[0].map((_, index) => piece.shape.map((row) => row[index]).reverse());
      return piece.shape[0].map((_, index) => piece.shape.map((row) => row[row.length - 1 - index]));
    }

    function rotate(direction = 1) {
      if (isPaused() || !piece) return;
      const rotated = rotatedShape(direction);
      for (const offset of [0, -1, 1, -2, 2]) {
        if (collides(piece.x + offset, piece.y, rotated)) continue;
        piece.x += offset;
        piece.shape = rotated;
        return;
      }
    }

    function hardDrop() {
      if (isPaused() || !piece) return;
      let distance = 0;
      while (!collides(piece.x, piece.y + 1, piece.shape)) {
        piece.y += 1;
        distance += 1;
      }
      score += distance * 2;
      updateStats();
      lock();
    }

    function saveBest() {
      if (!difficulty || score <= best) return;
      best = score;
      try {
        localStorage.setItem(bestKey(), String(best));
        localStorage.setItem(legacyBestKey(), String(best));
      } catch {}
      updateStats();
    }

    function updateStats() {
      scoreStat.value.textContent = String(score);
      linesStat.value.textContent = String(lines);
      levelStat.value.textContent = started ? String(level) : "—";
      difficultyStat.value.textContent = difficulty ? difficulties[difficulty].label : "—";
      bestStat.value.textContent = difficulty ? String(Math.max(best, score)) : "—";
    }

    function drawGrid(target, width, height, size) {
      target.save();
      target.strokeStyle = "rgba(63,70,61,.24)";
      target.lineWidth = 1;
      target.beginPath();
      for (let x = size; x < width; x += size) {
        target.moveTo(x + .5, 0);
        target.lineTo(x + .5, height);
      }
      for (let y = size; y < height; y += size) {
        target.moveTo(0, y + .5);
        target.lineTo(width, y + .5);
      }
      target.stroke();
      target.restore();
    }

    function drawCell(target, x, y, value, size) {
      const colors = palette();
      const color = colors[colorKeys[(value - 1) % colorKeys.length]] || colors.cream;
      const left = x * size + 1;
      const top = y * size + 1;
      const width = size - 2;
      const height = size - 2;
      target.fillStyle = color;
      target.fillRect(left, top, width, height);
      target.fillStyle = "rgba(255,255,255,.18)";
      target.fillRect(left + 2, top + 2, width - 4, 2);
      target.fillRect(left + 2, top + 2, 2, height - 4);
      target.fillStyle = "rgba(0,0,0,.22)";
      target.fillRect(left + 2, top + height - 4, width - 4, 2);
      target.fillRect(left + width - 4, top + 2, 2, height - 4);
      target.strokeStyle = "rgba(8,11,9,.78)";
      target.strokeRect(left + .5, top + .5, width - 1, height - 1);
    }

    function drawNext() {
      const colors = palette();
      nextContext.clearRect(0, 0, nextCanvas.width, nextCanvas.height);
      nextContext.fillStyle = colors.background;
      nextContext.fillRect(0, 0, nextCanvas.width, nextCanvas.height);
      drawGrid(nextContext, nextCanvas.width, nextCanvas.height, 18);
      const shape = shapes[nextType];
      if (!shape || !started) return;
      const size = 18;
      const offsetX = Math.floor((nextCanvas.width - shape[0].length * size) / 2);
      const offsetY = Math.floor((nextCanvas.height - shape.length * size) / 2);
      for (let y = 0; y < shape.length; y += 1) {
        for (let x = 0; x < shape[y].length; x += 1) {
          if (!shape[y][x]) continue;
          nextContext.save();
          nextContext.translate(offsetX, offsetY);
          drawCell(nextContext, x, y, shapeNames.indexOf(nextType) + 1, size);
          nextContext.restore();
        }
      }
    }

    function draw() {
      const colors = palette();
      context.clearRect(0, 0, canvas.width, canvas.height);
      context.fillStyle = colors.background;
      context.fillRect(0, 0, canvas.width, canvas.height);
      drawGrid(context, canvas.width, canvas.height, cell);
      for (let y = 0; y < rows; y += 1) {
        for (let x = 0; x < columns; x += 1) {
          if (board[y][x]) drawCell(context, x, y, board[y][x], cell);
        }
      }
      if (piece && !gameOver && started) {
        const value = shapeNames.indexOf(piece.type) + 1;
        for (let y = 0; y < piece.shape.length; y += 1) {
          for (let x = 0; x < piece.shape[y].length; x += 1) {
            if (piece.shape[y][x]) drawCell(context, piece.x + x, piece.y + y, value, cell);
          }
        }
      }
      if (started && (manualPaused || lifecyclePaused || gameOver)) {
        context.fillStyle = "rgba(10,13,10,.72)";
        context.fillRect(0, 0, canvas.width, canvas.height);
        context.fillStyle = colors.cream;
        context.font = "700 20px Segoe UI, Tahoma, sans-serif";
        context.textAlign = "center";
        context.fillText(gameOver ? "GAME OVER" : "PAUSED", canvas.width / 2, canvas.height / 2 - 4);
        context.fillStyle = colors.muted;
        context.font = "12px Segoe UI, Tahoma, sans-serif";
        context.fillText(gameOver ? "Choose New Game" : "Press P or Esc to continue", canvas.width / 2, canvas.height / 2 + 20);
      }
    }

    function processHeldInput(time) {
      if (isPaused()) return;
      const direction = held.left === held.right ? 0 : held.left ? -1 : 1;
      if (direction !== horizontalDirection) {
        horizontalDirection = direction;
        horizontalStartedAt = time;
        horizontalRepeatedAt = time;
      }
      if (direction && time - horizontalStartedAt >= 135 && time - horizontalRepeatedAt >= 42) {
        move(direction, 0);
        horizontalRepeatedAt = time;
      }
      if (held.down && time - downRepeatedAt >= 48) {
        move(0, 1, true);
        downRepeatedAt = time;
      }
    }

    function startLoop() {
      if (destroyed || animationFrame || isPaused()) return;
      lastTime = performance.now();
      animationFrame = requestAnimationFrame(tick);
    }

    function stopLoop() {
      if (animationFrame) cancelAnimationFrame(animationFrame);
      animationFrame = 0;
    }

    function tick(time) {
      animationFrame = 0;
      if (destroyed) return;
      const delta = lastTime ? Math.min(100, time - lastTime) : 0;
      lastTime = time;
      processHeldInput(time);
      if (!isPaused()) {
        dropAccumulator += delta;
        const config = difficulties[difficulty];
        const relativeLevel = Math.max(0, level - config.startLevel);
        const interval = Math.max(config.minimumDrop, config.baseDrop - relativeLevel * config.levelStep);
        if (dropAccumulator >= interval) {
          move(0, 1);
          dropAccumulator = 0;
        }
      }
      draw();
      startLoop();
    }

    function renderDifficultySelection() {
      for (const button of difficultyButtons.querySelectorAll("[data-tetris-difficulty]")) {
        const selected = button.dataset.tetrisDifficulty === selectedDifficulty;
        button.classList.toggle("game-difficulty__selected", selected);
        button.setAttribute("aria-pressed", String(selected));
      }
    }

    function startGame(value) {
      selectedDifficulty = difficulties[value] ? value : "normal";
      difficulty = selectedDifficulty;
      renderDifficultySelection();
      const config = difficulties[difficulty];
      if (!config) return;
      board = Array.from({ length: rows }, () => Array(columns).fill(0));
      bag = [];
      score = 0;
      lines = 0;
      level = config.startLevel;
      manualPaused = false;
      lifecyclePaused = false;
      gameOver = false;
      started = true;
      nextType = takeType();
      loadBest();
      spawn();
      shell.pause.disabled = false;
      shell.pause.textContent = "Pause";
      shell.status.textContent = `${config.label} · Level ${level}`;
      difficultyOverlay.hidden = true;
      dropAccumulator = 0;
      resetHeldInput();
      updateStats();
      lastTime = performance.now();
      startLoop();
      shell.element.focus({ preventScroll: true });
    }

    function showDifficultyChooser() {
      stopLoop();
      saveBest();
      board = Array.from({ length: rows }, () => Array(columns).fill(0));
      piece = null;
      nextType = null;
      bag = [];
      score = 0;
      lines = 0;
      level = 0;
      best = 0;
      difficulty = null;
      started = false;
      manualPaused = false;
      lifecyclePaused = false;
      gameOver = false;
      dropAccumulator = 0;
      resetHeldInput();
      shell.pause.disabled = true;
      shell.pause.textContent = "Pause";
      shell.status.textContent = "Choose a difficulty";
      difficultyOverlay.hidden = false;
      renderDifficultySelection();
      updateStats();
      drawNext();
      draw();
    }

    function togglePause() {
      if (!started || gameOver) return;
      manualPaused = !manualPaused;
      resetHeldInput();
      shell.pause.textContent = manualPaused ? "Resume" : "Pause";
      shell.status.textContent = manualPaused ? "Paused" : `${difficulties[difficulty].label} · Level ${level}`;
      lastTime = performance.now();
      if (manualPaused) {
        stopLoop();
        draw();
      } else {
        startLoop();
      }
    }

    function handleAction(action) {
      if (action === "new") showDifficultyChooser();
      if (action === "start-difficulty") startGame(selectedDifficulty);
      if (action === "restart" && difficulty) startGame(difficulty);
      if (action === "pause") togglePause();
      if (action === "left") move(-1, 0);
      if (action === "right") move(1, 0);
      if (action === "down") move(0, 1, true);
      if (action === "rotate") rotate(1);
      if (action === "drop") hardDrop();
    }

    shell.element.addEventListener("click", (event) => {
      const difficultyButton = event.target instanceof Element ? event.target.closest("[data-tetris-difficulty]") : null;
      if (difficultyButton) {
        selectedDifficulty = difficulties[difficultyButton.dataset.tetrisDifficulty] ? difficultyButton.dataset.tetrisDifficulty : "normal";
        renderDifficultySelection();
        return;
      }
      const button = event.target instanceof Element ? event.target.closest("[data-game-action]") : null;
      if (!button) return;
      handleAction(button.dataset.gameAction || "");
      shell.element.focus({ preventScroll: true });
    });

    shell.element.addEventListener("keydown", (event) => {
      if (event.target instanceof Element && event.target.closest("button,input,select,textarea,a")) return;
      const key = event.key.toLowerCase();
      if (["arrowleft", "arrowright", "arrowdown", "arrowup", "x", "z", " ", "p", "escape"].includes(key)) event.preventDefault();
      if (!started) return;
      const now = performance.now();
      if (key === "arrowleft" && !held.left) {
        held.left = true;
        horizontalDirection = -1;
        horizontalStartedAt = now;
        horizontalRepeatedAt = now;
        move(-1, 0);
      }
      if (key === "arrowright" && !held.right) {
        held.right = true;
        horizontalDirection = 1;
        horizontalStartedAt = now;
        horizontalRepeatedAt = now;
        move(1, 0);
      }
      if (key === "arrowdown" && !held.down) {
        held.down = true;
        downRepeatedAt = now;
        move(0, 1, true);
      }
      if (event.repeat) return;
      if (key === "arrowup" || key === "x") rotate(1);
      if (key === "z") rotate(-1);
      if (key === " ") hardDrop();
      if (key === "p" || key === "escape") togglePause();
    });

    const releaseKey = (event) => {
      const key = event.key.toLowerCase();
      if (key === "arrowleft") held.left = false;
      if (key === "arrowright") held.right = false;
      if (key === "arrowdown") held.down = false;
    };
    window.addEventListener("keyup", releaseKey);

    showDifficultyChooser();

    const controller = {
      focus() {
        shell.element.focus({ preventScroll: true });
      },
      pause() {
        if (!started || gameOver) return;
        lifecyclePaused = true;
        resetHeldInput();
        shell.status.textContent = "Paused";
        lastTime = performance.now();
        stopLoop();
        draw();
      },
      resume() {
        if (!started || gameOver) return;
        lifecyclePaused = false;
        shell.status.textContent = manualPaused ? "Paused" : `${difficulties[difficulty].label} · Level ${level}`;
        lastTime = performance.now();
        if (!manualPaused) startLoop();
      },
      destroy() {
        destroyed = true;
        saveBest();
        resetHeldInput();
        window.removeEventListener("keyup", releaseKey);
        stopLoop();
      }
    };

    return { element: shell.element, controller };
  }

  const previousCreate = window.PortfolioGames?.create;

  function create(application) {
    const id = application?.game || application?.id;
    if (id === "tetris") {
      const result = createTetris();
      if (result?.element) gameAudio.bind(result.element);
      return result;
    }
    return typeof previousCreate === "function" ? previousCreate(application) : null;
  }

  window.PortfolioGames = { ...(window.PortfolioGames || {}), create };
})();
