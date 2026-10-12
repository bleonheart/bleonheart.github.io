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

  function create(application) {
    const id = application?.game || application?.id;
    if (id === "solitaire") {
      const result = createSolitaire();
      if (result?.element) gameAudio.bind(result.element);
      return result;
    }
    return typeof baseCreate === "function" ? baseCreate(application) : null;
  }

  window.PortfolioGames = { ...(window.PortfolioGames || {}), create, showDifficultyMenu };
})();
