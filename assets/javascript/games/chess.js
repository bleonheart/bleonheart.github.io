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
    const id = application?.game || application?.id;
    if (id === "chess") {
      const result = createChess();
      if (result?.element) gameAudio.bind(result.element);
      return result;
    }
    return typeof baseCreate === "function" ? baseCreate(application) : null;
  }

  window.PortfolioGames = { ...(window.PortfolioGames || {}), create, showDifficultyMenu };
})();
