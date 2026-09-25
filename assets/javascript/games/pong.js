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

  function createPong() {
    const shell = makeShell("Pong", "");
    shell.help.remove();

    const playfield = document.createElement("div");
    playfield.className = "retro-game__playfield retro-game__playfield--pong";
    const canvas = document.createElement("canvas");
    canvas.className = "retro-game__canvas retro-game__canvas--pong";
    canvas.width = 640;
    canvas.height = 360;
    canvas.setAttribute("aria-label", "Pong playfield");
    playfield.append(canvas);

    const difficultyOverlay = document.createElement("div");
    difficultyOverlay.className = "retro-game__difficulty";
    const difficultyPanel = document.createElement("div");
    difficultyPanel.className = "retro-game__difficulty-panel";
    const difficultyTitle = document.createElement("strong");
    difficultyTitle.textContent = "Choose Difficulty";
    const difficultyCopy = document.createElement("span");
    difficultyCopy.textContent = "Pick the CPU difficulty before the match starts.";
    const intro = makeGameStartIntro("pong");
    const difficultyButtons = document.createElement("div");
    difficultyButtons.className = "retro-game__difficulty-actions";
    const difficultyDefinitions = [
      ["easy", "Easy", "Slower CPU"],
      ["normal", "Normal", "Balanced"],
      ["hard", "Hard", "Fast CPU"]
    ];
    let selectedDifficulty = "normal";
    for (const [value, label, description] of difficultyDefinitions) {
      const button = document.createElement("button");
      button.type = "button";
      button.className = "retro-game__difficulty-button";
      button.dataset.pongDifficulty = value;
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

    const scoreStat = makeStat("You");
    const cpuStat = makeStat("CPU");
    const difficultyStat = makeStat("Difficulty");
    const bestStat = makeStat("Wins");
    difficultyStat.value.textContent = "—";
    shell.sidebar.insertBefore(scoreStat.row, shell.sidebar.querySelector(".retro-game__help"));
    shell.sidebar.insertBefore(cpuStat.row, shell.sidebar.querySelector(".retro-game__help"));
    shell.sidebar.insertBefore(difficultyStat.row, shell.sidebar.querySelector(".retro-game__help"));
    shell.sidebar.insertBefore(bestStat.row, shell.sidebar.querySelector(".retro-game__help"));
    shell.sidebar.append(makeControlsList([["W / S", "Move"], ["↑ / ↓", "Move"], ["P / Esc", "Pause"]]));

    const mobileControls = document.createElement("div");
    mobileControls.className = "retro-game__touch-controls retro-game__touch-controls--pong";
    mobileControls.append(makeButton("▲ UP", "up"), makeButton("▼ DOWN", "down"));
    shell.stage.append(mobileControls);

    const context = canvas.getContext("2d");
    const keys = new Set();
    const difficulties = {
      easy: { label: "Easy", paddleSpeed: 340, cpuSpeed: 165, ballSpeed: 190, ballStep: 6, cpuReturnSpeed: 105, hitBoost: 1.025 },
      normal: { label: "Normal", paddleSpeed: 310, cpuSpeed: 235, ballSpeed: 230, ballStep: 8, cpuReturnSpeed: 145, hitBoost: 1.04 },
      hard: { label: "Hard", paddleSpeed: 300, cpuSpeed: 315, ballSpeed: 275, ballStep: 10, cpuReturnSpeed: 200, hitBoost: 1.055 }
    };
    const paddle = { x: 28, y: 142, width: 12, height: 76 };
    const cpu = { x: 600, y: 142, width: 12, height: 76 };
    const ball = { x: 320, y: 180, radius: 7, vx: 0, vy: 0 };
    let playerScore = 0;
    let cpuScore = 0;
    let wins = 0;
    let legacyWins = 0;
    let difficulty = null;
    let started = false;
    let manualPaused = false;
    let lifecyclePaused = false;
    let gameOver = false;
    let destroyed = false;
    let animationFrame = 0;
    let lastTime = 0;
    let touchDirection = 0;

    try { legacyWins = Number(localStorage.getItem("samael.pong.wins") || 0) || 0; } catch {}

    function config() {
      return difficulties[difficulty || "normal"];
    }

    function winsKey() {
      return `samael.games.pong.wins.${difficulty || "normal"}`;
    }

    function loadWins() {
      if (!difficulty) {
        wins = 0;
        return;
      }
      try {
        const stored = localStorage.getItem(winsKey());
        wins = stored === null ? (difficulty === "normal" ? legacyWins : 0) : Number(stored) || 0;
      } catch {
        wins = difficulty === "normal" ? legacyWins : 0;
      }
    }

    function isPaused() {
      return !started || manualPaused || lifecyclePaused || gameOver;
    }

    function updateStats() {
      scoreStat.value.textContent = String(playerScore);
      cpuStat.value.textContent = String(cpuScore);
      difficultyStat.value.textContent = difficulty ? config().label : "—";
      bestStat.value.textContent = String(wins);
    }

    function resetPositions() {
      paddle.y = (canvas.height - paddle.height) / 2;
      cpu.y = paddle.y;
      ball.x = canvas.width / 2;
      ball.y = canvas.height / 2;
      ball.vx = 0;
      ball.vy = 0;
    }

    function resetBall(direction = Math.random() < .5 ? -1 : 1) {
      const settings = config();
      ball.x = canvas.width / 2;
      ball.y = canvas.height / 2;
      const speed = settings.ballSpeed + (playerScore + cpuScore) * settings.ballStep;
      ball.vx = speed * direction;
      ball.vy = (Math.random() * speed * .62 - speed * .31) || speed * .28;
    }

    function renderDifficultySelection() {
      for (const button of difficultyButtons.querySelectorAll("[data-pong-difficulty]")) {
        const selected = button.dataset.pongDifficulty === selectedDifficulty;
        button.classList.toggle("game-difficulty__selected", selected);
        button.setAttribute("aria-pressed", String(selected));
      }
    }

    function showDifficultyChooser() {
      stopLoop();
      started = false;
      gameOver = false;
      manualPaused = false;
      lifecyclePaused = false;
      difficulty = null;
      playerScore = 0;
      cpuScore = 0;
      keys.clear();
      touchDirection = 0;
      resetPositions();
      difficultyOverlay.hidden = false;
      shell.pause.disabled = true;
      shell.pause.textContent = "Pause";
      shell.status.textContent = "Choose difficulty";
      renderDifficultySelection();
      updateStats();
      lastTime = performance.now();
      draw();
    }

    function startMatch(value) {
      selectedDifficulty = difficulties[value] ? value : "normal";
      difficulty = selectedDifficulty;
      renderDifficultySelection();
      loadWins();
      started = true;
      gameOver = false;
      manualPaused = false;
      lifecyclePaused = false;
      playerScore = 0;
      cpuScore = 0;
      resetPositions();
      resetBall(1);
      difficultyOverlay.hidden = true;
      shell.pause.disabled = false;
      shell.pause.textContent = "Pause";
      shell.status.textContent = `${config().label} · First to 7`;
      updateStats();
      lastTime = performance.now();
      startLoop();
      shell.element.focus({ preventScroll: true });
    }

    function setManualPaused(value) {
      if (!started || gameOver) return;
      manualPaused = Boolean(value);
      shell.pause.textContent = manualPaused ? "Resume" : "Pause";
      shell.status.textContent = manualPaused ? "Paused" : `${config().label} · First to 7`;
      keys.clear();
      touchDirection = 0;
      lastTime = performance.now();
      if (manualPaused) {
        stopLoop();
        draw();
      } else {
        startLoop();
      }
    }

    function togglePause() {
      setManualPaused(!manualPaused);
    }

    function score(player) {
      if (player) playerScore += 1;
      else cpuScore += 1;
      updateStats();
      if (playerScore >= 7 || cpuScore >= 7) {
        gameOver = true;
        keys.clear();
        touchDirection = 0;
        if (playerScore > cpuScore) {
          wins += 1;
          legacyWins += 1;
          try {
            localStorage.setItem(winsKey(), String(wins));
            localStorage.setItem("samael.pong.wins", String(legacyWins));
          } catch {}
          shell.status.textContent = `${config().label} · You win`;
        } else {
          shell.status.textContent = `${config().label} · CPU wins`;
        }
        updateStats();
        return;
      }
      resetBall(player ? -1 : 1);
    }

    function intersectsPaddle(target) {
      return ball.x + ball.radius >= target.x && ball.x - ball.radius <= target.x + target.width && ball.y + ball.radius >= target.y && ball.y - ball.radius <= target.y + target.height;
    }

    function update(delta) {
      const seconds = delta / 1000;
      const settings = config();
      const up = keys.has("arrowup") || keys.has("w") || touchDirection < 0;
      const down = keys.has("arrowdown") || keys.has("s") || touchDirection > 0;
      if (up !== down) paddle.y += (up ? -1 : 1) * settings.paddleSpeed * seconds;
      paddle.y = Math.max(8, Math.min(canvas.height - paddle.height - 8, paddle.y));

      const ballHeadingToCpu = ball.vx > 0;
      const centerY = (canvas.height - cpu.height) / 2;
      const cpuTarget = ballHeadingToCpu ? ball.y - cpu.height / 2 : centerY;
      const cpuDelta = cpuTarget - cpu.y;
      const cpuSpeed = ballHeadingToCpu ? settings.cpuSpeed : settings.cpuReturnSpeed;
      const cpuStep = Math.sign(cpuDelta) * Math.min(Math.abs(cpuDelta), cpuSpeed * seconds);
      cpu.y += cpuStep;
      cpu.y = Math.max(8, Math.min(canvas.height - cpu.height - 8, cpu.y));

      ball.x += ball.vx * seconds;
      ball.y += ball.vy * seconds;

      if (ball.y - ball.radius <= 7 && ball.vy < 0) {
        ball.y = 7 + ball.radius;
        ball.vy *= -1;
      }
      if (ball.y + ball.radius >= canvas.height - 7 && ball.vy > 0) {
        ball.y = canvas.height - 7 - ball.radius;
        ball.vy *= -1;
      }

      if (ball.vx < 0 && intersectsPaddle(paddle)) {
        ball.x = paddle.x + paddle.width + ball.radius;
        const offset = (ball.y - (paddle.y + paddle.height / 2)) / (paddle.height / 2);
        ball.vx = Math.abs(ball.vx) * settings.hitBoost;
        ball.vy += offset * 105;
      }
      if (ball.vx > 0 && intersectsPaddle(cpu)) {
        ball.x = cpu.x - ball.radius;
        const offset = (ball.y - (cpu.y + cpu.height / 2)) / (cpu.height / 2);
        ball.vx = -Math.abs(ball.vx) * settings.hitBoost;
        ball.vy += offset * (difficulty === "hard" ? 95 : difficulty === "easy" ? 65 : 80);
      }

      if (ball.x < -20) score(false);
      if (ball.x > canvas.width + 20) score(true);
    }

    function draw() {
      const colors = palette();
      context.clearRect(0, 0, canvas.width, canvas.height);
      context.fillStyle = colors.background;
      context.fillRect(0, 0, canvas.width, canvas.height);
      context.strokeStyle = colors.line;
      context.lineWidth = 2;
      context.strokeRect(7, 7, canvas.width - 14, canvas.height - 14);
      context.setLineDash([8, 9]);
      context.beginPath();
      context.moveTo(canvas.width / 2, 18);
      context.lineTo(canvas.width / 2, canvas.height - 18);
      context.stroke();
      context.setLineDash([]);
      context.fillStyle = colors.cream;
      context.fillRect(paddle.x, paddle.y, paddle.width, paddle.height);
      context.fillStyle = colors.orange;
      context.fillRect(cpu.x, cpu.y, cpu.width, cpu.height);
      if (started) {
        context.fillStyle = colors.green;
        context.beginPath();
        context.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
        context.fill();
      }
      context.fillStyle = colors.text;
      context.font = "700 32px Segoe UI, Tahoma, sans-serif";
      context.textAlign = "center";
      context.fillText(String(playerScore), canvas.width / 2 - 52, 52);
      context.fillText(String(cpuScore), canvas.width / 2 + 52, 52);
      if ((manualPaused || lifecyclePaused || gameOver) && started) {
        context.fillStyle = "rgba(10,13,10,.7)";
        context.fillRect(0, 0, canvas.width, canvas.height);
        context.fillStyle = colors.cream;
        context.font = "700 24px Segoe UI, Tahoma, sans-serif";
        context.fillText(gameOver ? (playerScore > cpuScore ? "YOU WIN" : "CPU WINS") : "PAUSED", canvas.width / 2, canvas.height / 2 - 4);
        context.fillStyle = colors.muted;
        context.font = "13px Segoe UI, Tahoma, sans-serif";
        context.fillText(gameOver ? "Choose New Game for another match" : "Press P or Esc to continue", canvas.width / 2, canvas.height / 2 + 23);
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
      const delta = lastTime ? Math.min(40, time - lastTime) : 0;
      lastTime = time;
      if (!isPaused()) update(delta);
      draw();
      startLoop();
    }

    shell.element.addEventListener("keydown", (event) => {
      const key = event.key.toLowerCase();
      if (["arrowup", "arrowdown", "w", "s", "p", "escape"].includes(key)) event.preventDefault();
      if (event.target instanceof Element && event.target.closest("button,input,select,textarea,a")) return;
      if (event.repeat && (key === "p" || key === "escape")) return;
      if (!started || gameOver) return;
      keys.add(key);
      if (key === "p" || key === "escape") togglePause();
    });

    shell.element.addEventListener("keyup", (event) => {
      keys.delete(event.key.toLowerCase());
    });

    shell.element.addEventListener("click", (event) => {
      const difficultyButton = event.target instanceof Element ? event.target.closest("[data-pong-difficulty]") : null;
      if (difficultyButton) {
        selectedDifficulty = difficulties[difficultyButton.dataset.pongDifficulty] ? difficultyButton.dataset.pongDifficulty : "normal";
        renderDifficultySelection();
        return;
      }
      const button = event.target instanceof Element ? event.target.closest("[data-game-action]") : null;
      if (!button) return;
      const action = button.dataset.gameAction || "";
      if (action === "new") showDifficultyChooser();
      if (action === "start-difficulty") startMatch(selectedDifficulty);
      if (action === "restart" && difficulty) startMatch(difficulty);
      if (action === "pause") togglePause();
      shell.element.focus({ preventScroll: true });
    });

    for (const button of mobileControls.querySelectorAll("[data-game-action]")) {
      const direction = button.dataset.gameAction === "up" ? -1 : 1;
      const start = (event) => {
        if (!started || gameOver || manualPaused || lifecyclePaused) return;
        event.preventDefault();
        touchDirection = direction;
        shell.element.focus({ preventScroll: true });
      };
      const stop = () => {
        if (touchDirection === direction) touchDirection = 0;
      };
      button.addEventListener("pointerdown", start);
      button.addEventListener("pointerup", stop);
      button.addEventListener("pointercancel", stop);
      button.addEventListener("pointerleave", stop);
    }

    showDifficultyChooser();

    const controller = {
      focus() {
        shell.element.focus({ preventScroll: true });
      },
      pause() {
        if (!started || gameOver) return;
        lifecyclePaused = true;
        keys.clear();
        touchDirection = 0;
        shell.status.textContent = "Paused";
        lastTime = performance.now();
        stopLoop();
        draw();
      },
      resume() {
        if (!started || gameOver) return;
        lifecyclePaused = false;
        shell.status.textContent = manualPaused ? "Paused" : `${config().label} · First to 7`;
        lastTime = performance.now();
        if (!manualPaused) startLoop();
      },
      destroy() {
        destroyed = true;
        keys.clear();
        stopLoop();
      }
    };

    return { element: shell.element, controller };
  }

  const previousCreate = window.PortfolioGames?.create;

  function create(application) {
    const id = application?.game || application?.id;
    if (id === "pong") {
      const result = createPong();
      if (result?.element) gameAudio.bind(result.element);
      return result;
    }
    return typeof previousCreate === "function" ? previousCreate(application) : null;
  }

  window.PortfolioGames = { ...(window.PortfolioGames || {}), create };
})();
