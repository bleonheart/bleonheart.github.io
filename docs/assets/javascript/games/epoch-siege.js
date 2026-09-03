(() => {
  "use strict";

  const previousCreate = window.PortfolioGames?.create;
  if (typeof previousCreate !== "function") return;

  const WIDTH = 1000;
  const HEIGHT = 520;
  const GROUND_Y = 408;
  const PLAYER_BASE_X = 82;
  const ENEMY_BASE_X = WIDTH - 82;
  const PLAYER_SPAWN_X = 142;
  const ENEMY_SPAWN_X = WIDTH - 142;
  const TEAM_PLAYER = 0;
  const TEAM_ENEMY = 1;

  const DIFFICULTIES = {
    easy: { label: "Easy", description: "Slower enemy economy and gentler pressure", income: 0.82, health: 0.9, damage: 0.9, think: 1.18, evolve: 1.18 },
    normal: { label: "Normal", description: "Balanced economy, evolution and combat", income: 1, health: 1, damage: 1, think: 1, evolve: 1 },
    hard: { label: "Hard", description: "Faster income, tougher armies and quicker evolution", income: 1.24, health: 1.12, damage: 1.12, think: 0.8, evolve: 0.82 }
  };

  const ERA_DATA = [
    {
      name: "Stone Age",
      short: "Stone",
      sky: ["#a2a78d", "#6d765d"],
      ground: ["#5b543b", "#343422"],
      xp: 180,
      special: { name: "Meteor Shower", cooldown: 42, damage: 180, baseDamage: 65 },
      units: [
        { name: "Club Guard", role: "Melee", cost: 55, health: 150, damage: 24, range: 29, cooldown: 0.88, speed: 34, reward: 31, size: 17 },
        { name: "Spear Runner", role: "Fast", cost: 78, health: 115, damage: 30, range: 35, cooldown: 0.72, speed: 51, reward: 42, size: 15 },
        { name: "Stone Slinger", role: "Ranged", cost: 105, health: 90, damage: 38, range: 180, cooldown: 1.25, speed: 30, reward: 54, size: 15, projectile: true },
        { name: "Mammoth Rider", role: "Heavy", cost: 180, health: 390, damage: 52, range: 39, cooldown: 1.18, speed: 22, reward: 85, size: 25 }
      ]
    },
    {
      name: "Medieval Age",
      short: "Medieval",
      sky: ["#8fa3a4", "#58696c"],
      ground: ["#5f5b45", "#30342c"],
      xp: 430,
      special: { name: "Arrow Storm", cooldown: 39, damage: 265, baseDamage: 82 },
      units: [
        { name: "Iron Swordsman", role: "Melee", cost: 90, health: 240, damage: 42, range: 31, cooldown: 0.82, speed: 34, reward: 48, size: 17 },
        { name: "Royal Scout", role: "Fast", cost: 125, health: 175, damage: 52, range: 34, cooldown: 0.66, speed: 50, reward: 62, size: 15 },
        { name: "Longbow Ranger", role: "Ranged", cost: 155, health: 150, damage: 64, range: 205, cooldown: 1.18, speed: 29, reward: 74, size: 16, projectile: true },
        { name: "Armored Knight", role: "Heavy", cost: 245, health: 590, damage: 79, range: 38, cooldown: 1.08, speed: 22, reward: 112, size: 24 }
      ]
    },
    {
      name: "Industrial Age",
      short: "Industrial",
      sky: ["#858d85", "#4b534f"],
      ground: ["#565249", "#292c28"],
      xp: 760,
      special: { name: "Artillery Barrage", cooldown: 37, damage: 390, baseDamage: 105 },
      units: [
        { name: "Steel Infantry", role: "Melee", cost: 145, health: 360, damage: 69, range: 36, cooldown: 0.78, speed: 33, reward: 69, size: 17 },
        { name: "Trench Raider", role: "Fast", cost: 190, health: 285, damage: 83, range: 42, cooldown: 0.62, speed: 47, reward: 87, size: 16 },
        { name: "Marksman", role: "Ranged", cost: 235, health: 225, damage: 105, range: 240, cooldown: 1.08, speed: 28, reward: 104, size: 16, projectile: true },
        { name: "Steam Walker", role: "Heavy", cost: 360, health: 880, damage: 121, range: 47, cooldown: 1.03, speed: 20, reward: 153, size: 26 }
      ]
    },
    {
      name: "Modern Age",
      short: "Modern",
      sky: ["#778b96", "#43535d"],
      ground: ["#4b5047", "#252b28"],
      xp: 1180,
      special: { name: "Air Strike", cooldown: 35, damage: 560, baseDamage: 135 },
      units: [
        { name: "Combat Soldier", role: "Melee", cost: 225, health: 520, damage: 104, range: 48, cooldown: 0.68, speed: 34, reward: 101, size: 17 },
        { name: "Assault Trooper", role: "Fast", cost: 285, health: 415, damage: 122, range: 70, cooldown: 0.57, speed: 44, reward: 123, size: 16, projectile: true },
        { name: "Precision Sniper", role: "Ranged", cost: 345, health: 315, damage: 180, range: 290, cooldown: 1.32, speed: 27, reward: 148, size: 16, projectile: true },
        { name: "Battle Tank", role: "Heavy", cost: 520, health: 1280, damage: 178, range: 130, cooldown: 1.18, speed: 18, reward: 216, size: 28, projectile: true }
      ]
    },
    {
      name: "Future Age",
      short: "Future",
      sky: ["#526276", "#252e42"],
      ground: ["#3b4149", "#181d24"],
      xp: Infinity,
      special: { name: "Orbital Lance", cooldown: 33, damage: 790, baseDamage: 185 },
      units: [
        { name: "Plasma Guard", role: "Melee", cost: 335, health: 760, damage: 156, range: 58, cooldown: 0.61, speed: 35, reward: 148, size: 18 },
        { name: "Cyber Runner", role: "Fast", cost: 415, health: 590, damage: 188, range: 80, cooldown: 0.49, speed: 50, reward: 177, size: 16, projectile: true },
        { name: "Laser Trooper", role: "Ranged", cost: 510, health: 470, damage: 252, range: 330, cooldown: 0.9, speed: 29, reward: 211, size: 17, projectile: true },
        { name: "Titan Mech", role: "Heavy", cost: 760, health: 1880, damage: 286, range: 155, cooldown: 0.95, speed: 19, reward: 302, size: 31, projectile: true }
      ]
    }
  ];

  const TURRETS = [
    { name: "Repeater", cost: 160, damage: 28, range: 330, cooldown: 0.3, projectileSpeed: 610 },
    { name: "Longshot", cost: 255, damage: 92, range: 490, cooldown: 1.05, projectileSpeed: 760 },
    { name: "Siege Cannon", cost: 390, damage: 168, range: 405, cooldown: 1.55, projectileSpeed: 470 }
  ];

  function clamp(value, min, max) {
    return Math.max(min, Math.min(max, value));
  }

  function rand(min, max) {
    return min + Math.random() * (max - min);
  }

  function createButton(label, action, className = "") {
    const button = document.createElement("button");
    button.type = "button";
    button.className = `retro-game__button age-war__button ${className}`.trim();
    button.dataset.gameAction = action;
    button.textContent = label;
    return button;
  }

  function createAgeWar() {
    const root = document.createElement("div");
    root.className = "retro-game retro-game--framed age-war";
    root.tabIndex = 0;
    root.setAttribute("aria-label", "Epoch Siege");

    const body = document.createElement("div");
    body.className = "retro-game__body";
    const stage = document.createElement("div");
    stage.className = "retro-game__stage age-war__stage";
    const canvas = document.createElement("canvas");
    canvas.className = "retro-game__canvas retro-game__canvas--wide age-war__canvas";
    canvas.width = WIDTH;
    canvas.height = HEIGHT;
    canvas.setAttribute("aria-label", "Epoch Siege battlefield");
    stage.append(canvas);

    const sidebar = document.createElement("aside");
    sidebar.className = "retro-game__sidebar age-war__sidebar";
    const stats = document.createElement("div");
    stats.className = "age-war__stats";
    const moneyStat = makeStat("Credits", "0");
    const xpStat = makeStat("Evolution", "0 / 0");
    const eraStat = makeStat("Era", "Stone Age");
    const baseStat = makeStat("Base", "100%");
    stats.append(moneyStat.row, xpStat.row, eraStat.row, baseStat.row);

    const unitsHeading = heading("Deploy Units");
    const unitGrid = document.createElement("div");
    unitGrid.className = "age-war__unit-grid";

    const evolutionHeading = heading("Evolution");
    const evolveButton = createButton("Evolve", "evolve", "age-war__button--evolve");
    const specialButton = createButton("Special", "special", "age-war__button--special");
    const evolutionActions = document.createElement("div");
    evolutionActions.className = "age-war__action-grid";
    evolutionActions.append(evolveButton, specialButton);

    const turretHeading = heading("Turret Bay");
    const turretSlots = document.createElement("div");
    turretSlots.className = "age-war__turret-slots";
    const slotButtons = [0, 1].map((slot) => {
      const button = createButton(`Slot ${slot + 1}: Empty`, `slot-${slot}`);
      button.classList.add("age-war__slot");
      turretSlots.append(button);
      return button;
    });
    const turretGrid = document.createElement("div");
    turretGrid.className = "age-war__turret-grid";
    TURRETS.forEach((turret, index) => {
      const button = createButton(`${turret.name} · ${turret.cost}`, `turret-${index}`);
      button.title = `${turret.name} | Damage ${turret.damage} | Range ${turret.range} | Reload ${turret.cooldown.toFixed(2)}s`;
      turretGrid.append(button);
    });

    const controlsHeading = heading("Match Controls");
    const controls = document.createElement("div");
    controls.className = "age-war__action-grid";
    const speedButton = createButton("Speed 1x", "speed");
    const pauseButton = createButton("Pause", "pause");
    const restartButton = createButton("Restart", "restart");
    const newButton = createButton("New Game", "new");
    controls.append(speedButton, pauseButton, restartButton, newButton);

    const help = document.createElement("p");
    help.className = "retro-game__help age-war__help";
    help.textContent = "Deploy units to break the enemy base. Kills grant credits and Evolution XP. Upgrade eras, install turrets, and time your special ability.";

    sidebar.append(stats, unitsHeading, unitGrid, evolutionHeading, evolutionActions, turretHeading, turretSlots, turretGrid, controlsHeading, controls, help);
    body.append(stage, sidebar);
    const status = document.createElement("div");
    status.className = "retro-game__status";
    status.textContent = "Select a difficulty";
    root.append(body, status);

    const ctx = canvas.getContext("2d");
    let difficultyKey = "normal";
    let difficulty = DIFFICULTIES.normal;
    let units = [];
    let projectiles = [];
    let particles = [];
    let damageTexts = [];
    let player;
    let enemy;
    let playing = false;
    let paused = false;
    let over = false;
    let speedScale = 1;
    let lastFrame = performance.now();
    let animationFrame = 0;
    let elapsed = 0;
    let aiThink = 0;
    let selectedTurretSlot = 0;
    let debug = false;
    let shake = 0;
    let flash = 0;

    function makeStat(label, value) {
      const row = document.createElement("div");
      row.className = "retro-game__stat";
      const name = document.createElement("span");
      name.textContent = label;
      const strong = document.createElement("strong");
      strong.textContent = value;
      row.append(name, strong);
      return { row, value: strong };
    }

    function heading(text) {
      const element = document.createElement("strong");
      element.className = "retro-game__sidebar-heading age-war__heading";
      element.textContent = text;
      return element;
    }

    function makeSide(team) {
      return {
        team,
        money: team === TEAM_PLAYER ? 180 : 210,
        xp: 0,
        era: 0,
        baseHealth: 2600,
        baseMaxHealth: 2600,
        incomeTimer: 0,
        specialCooldown: 0,
        turrets: [null, null]
      };
    }

    function reset(selectedDifficulty = difficultyKey) {
      difficultyKey = DIFFICULTIES[selectedDifficulty] ? selectedDifficulty : "normal";
      difficulty = DIFFICULTIES[difficultyKey];
      units = [];
      projectiles = [];
      particles = [];
      damageTexts = [];
      player = makeSide(TEAM_PLAYER);
      enemy = makeSide(TEAM_ENEMY);
      playing = true;
      paused = false;
      over = false;
      speedScale = 1;
      elapsed = 0;
      aiThink = 0.7;
      selectedTurretSlot = 0;
      shake = 0;
      flash = 0;
      lastFrame = performance.now();
      speedButton.textContent = "Speed 1x";
      pauseButton.textContent = "Pause";
      status.textContent = `${difficulty.label} · Defend your base and destroy the enemy fortress`;
      renderUnitButtons();
      updateUI();
    }

    function showStartMenu() {
      playing = false;
      paused = false;
      stage.querySelector(".game-start-screen")?.remove();
      const overlay = document.createElement("div");
      overlay.className = "game-start-screen age-war__start";
      const panel = document.createElement("div");
      panel.className = "game-start-screen__panel";
      const intro = document.createElement("section");
      intro.className = "game-start-screen__intro game-start-screen__intro--text-only";
      const copy = document.createElement("div");
      copy.className = "game-start-screen__copy";
      const title = document.createElement("strong");
      title.className = "game-start-screen__game-title";
      title.textContent = "Epoch Siege";
      const description = document.createElement("p");
      description.className = "game-start-screen__description game-start-screen__objective";
      description.textContent = "Lead a civilization from stone tools to orbital weapons in a side-view war of economy, timing, and unit composition.";
      const howTitle = document.createElement("strong");
      howTitle.className = "game-start-screen__how-title";
      howTitle.textContent = "HOW TO PLAY";
      const how = document.createElement("p");
      how.className = "game-start-screen__description game-start-screen__how-copy";
      how.textContent = "Spend credits to deploy units. Defeated enemies award credits and Evolution XP. Evolve when the meter is full, reinforce your base with turrets, and use each era's special attack to break enemy pushes.";
      copy.append(title, description, howTitle, how);
      intro.append(copy);

      const setup = document.createElement("section");
      setup.className = "game-start-screen__setup";
      const headingEl = document.createElement("strong");
      headingEl.className = "game-start-screen__heading";
      headingEl.textContent = "SELECT DIFFICULTY";
      const options = document.createElement("div");
      options.className = "game-difficulty";
      let selected = difficultyKey;
      Object.entries(DIFFICULTIES).forEach(([key, config]) => {
        const button = document.createElement("button");
        button.type = "button";
        button.className = "game-difficulty__option";
        button.dataset.difficulty = key;
        const label = document.createElement("strong");
        label.className = "game-difficulty__label";
        label.textContent = config.label;
        const desc = document.createElement("span");
        desc.className = "game-difficulty__description";
        desc.textContent = config.description;
        button.append(label, desc);
        options.append(button);
      });
      const start = createButton("Start Game", "start", "game-start-screen__start");
      const renderSelection = () => {
        options.querySelectorAll("[data-difficulty]").forEach((button) => {
          button.classList.toggle("game-difficulty__selected", button.dataset.difficulty === selected);
        });
      };
      options.addEventListener("click", (event) => {
        const button = event.target instanceof Element ? event.target.closest("[data-difficulty]") : null;
        if (!button) return;
        selected = button.dataset.difficulty;
        renderSelection();
      });
      start.addEventListener("click", () => {
        overlay.remove();
        try { localStorage.setItem("portfolio.game.epoch-siege.difficulty", selected); } catch {}
        reset(selected);
        root.focus({ preventScroll: true });
      });
      setup.append(headingEl, options, start);
      panel.append(intro, setup);
      overlay.append(panel);
      stage.append(overlay);
      status.textContent = "Select a difficulty";
      renderSelection();
    }

    function loadStoredDifficulty() {
      try {
        const stored = localStorage.getItem("portfolio.game.epoch-siege.difficulty");
        if (DIFFICULTIES[stored]) difficultyKey = stored;
      } catch {}
    }

    function renderUnitButtons() {
      unitGrid.replaceChildren();
      const era = ERA_DATA[player?.era || 0];
      era.units.forEach((unit, index) => {
        const button = createButton(`${unit.name}\n${unit.cost}`, `unit-${index}`);
        button.classList.add("age-war__unit-button");
        button.title = `${unit.role} | Cost ${unit.cost} | HP ${unit.health} | Damage ${unit.damage} | Range ${unit.range} | Speed ${unit.speed}`;
        const name = document.createElement("span");
        name.textContent = unit.name;
        const meta = document.createElement("small");
        meta.textContent = `${unit.role} · ${unit.cost}`;
        button.textContent = "";
        button.append(name, meta);
        unitGrid.append(button);
      });
    }

    function updateUI() {
      if (!player) return;
      const era = ERA_DATA[player.era];
      moneyStat.value.textContent = Math.floor(player.money).toString();
      xpStat.value.textContent = player.era >= ERA_DATA.length - 1 ? "MAX" : `${Math.floor(player.xp)} / ${era.xp}`;
      eraStat.value.textContent = era.name;
      baseStat.value.textContent = `${Math.ceil((player.baseHealth / player.baseMaxHealth) * 100)}%`;
      evolveButton.disabled = player.era >= ERA_DATA.length - 1 || player.xp < era.xp || over;
      evolveButton.textContent = player.era >= ERA_DATA.length - 1 ? "Final Era" : `Evolve · ${era.xp} XP`;
      specialButton.disabled = player.specialCooldown > 0 || over;
      specialButton.textContent = player.specialCooldown > 0 ? `${era.special.name} · ${Math.ceil(player.specialCooldown)}s` : era.special.name;
      slotButtons.forEach((button, index) => {
        const turret = player.turrets[index];
        button.textContent = `Slot ${index + 1}: ${turret ? TURRETS[turret.type].name : "Empty"}`;
        button.classList.toggle("is-selected", selectedTurretSlot === index);
      });
      unitGrid.querySelectorAll("[data-game-action^='unit-']").forEach((button) => {
        const index = Number(button.dataset.gameAction.split("-")[1]);
        button.disabled = player.money < era.units[index].cost || over;
      });
      turretGrid.querySelectorAll("[data-game-action^='turret-']").forEach((button) => {
        const index = Number(button.dataset.gameAction.split("-")[1]);
        button.disabled = player.money < turretCost(TEAM_PLAYER, index) || over;
        const current = player.turrets[selectedTurretSlot];
        const cost = turretCost(TEAM_PLAYER, index);
        button.textContent = `${TURRETS[index].name} · ${cost}`;
        if (current?.type === index) button.textContent = `${TURRETS[index].name} Lv.${current.level} · ${cost}`;
      });
    }

    function turretCost(team, type) {
      const side = team === TEAM_PLAYER ? player : enemy;
      const slot = team === TEAM_PLAYER ? selectedTurretSlot : chooseEnemyTurretSlot();
      const current = side.turrets[slot];
      if (current?.type === type) return Math.round(TURRETS[type].cost * (0.72 + current.level * 0.52));
      return TURRETS[type].cost;
    }

    function spawnUnit(team, index) {
      const side = team === TEAM_PLAYER ? player : enemy;
      if (!side || index < 0 || index > 3) return false;
      const def = ERA_DATA[side.era].units[index];
      const cost = def.cost;
      if (side.money < cost || units.filter((unit) => unit.team === team).length >= 32) return false;
      side.money -= cost;
      const enemyScale = team === TEAM_ENEMY ? difficulty : { health: 1, damage: 1 };
      units.push({
        team,
        type: index,
        era: side.era,
        name: def.name,
        role: def.role,
        x: team === TEAM_PLAYER ? PLAYER_SPAWN_X + rand(-5, 4) : ENEMY_SPAWN_X + rand(-4, 5),
        y: GROUND_Y,
        health: def.health * enemyScale.health,
        maxHealth: def.health * enemyScale.health,
        damage: def.damage * enemyScale.damage,
        range: def.range,
        cooldown: def.cooldown,
        attackTimer: rand(0, 0.2),
        speed: def.speed,
        reward: def.reward,
        size: def.size,
        projectile: Boolean(def.projectile),
        phase: rand(0, Math.PI * 2),
        hitFlash: 0,
        dead: false
      });
      burst(team === TEAM_PLAYER ? PLAYER_SPAWN_X : ENEMY_SPAWN_X, GROUND_Y - 8, 5, "dust");
      return true;
    }

    function evolve(team) {
      const side = team === TEAM_PLAYER ? player : enemy;
      if (!side || side.era >= ERA_DATA.length - 1) return false;
      const required = ERA_DATA[side.era].xp;
      if (side.xp < required) return false;
      side.xp -= required;
      side.era += 1;
      const previousMax = side.baseMaxHealth;
      side.baseMaxHealth += 620 + side.era * 230;
      side.baseHealth = Math.min(side.baseMaxHealth, side.baseHealth + (side.baseMaxHealth - previousMax) + 360);
      side.money += 120 + side.era * 55;
      side.specialCooldown = Math.min(side.specialCooldown, 8);
      if (team === TEAM_PLAYER) {
        renderUnitButtons();
        status.textContent = `Advanced to ${ERA_DATA[side.era].name}`;
      }
      burst(team === TEAM_PLAYER ? PLAYER_BASE_X : ENEMY_BASE_X, GROUND_Y - 100, 38, "evolve");
      flash = Math.max(flash, 0.28);
      shake = Math.max(shake, 8);
      return true;
    }

    function installTurret(team, type, forcedSlot = null) {
      const side = team === TEAM_PLAYER ? player : enemy;
      const slot = forcedSlot ?? (team === TEAM_PLAYER ? selectedTurretSlot : chooseEnemyTurretSlot());
      const current = side.turrets[slot];
      const cost = current?.type === type ? Math.round(TURRETS[type].cost * (0.72 + current.level * 0.52)) : TURRETS[type].cost;
      if (side.money < cost) return false;
      side.money -= cost;
      if (current?.type === type) {
        current.level = Math.min(4, current.level + 1);
        current.cooldown = 0;
      } else {
        side.turrets[slot] = { type, level: 1, cooldown: 0 };
      }
      if (team === TEAM_PLAYER) status.textContent = `${TURRETS[type].name} installed in turret slot ${slot + 1}`;
      return true;
    }

    function chooseEnemyTurretSlot() {
      if (!enemy) return 0;
      const empty = enemy.turrets.findIndex((turret) => !turret);
      if (empty >= 0) return empty;
      return Math.random() < 0.5 ? 0 : 1;
    }

    function useSpecial(team) {
      const side = team === TEAM_PLAYER ? player : enemy;
      if (!side || side.specialCooldown > 0 || over) return false;
      const spec = ERA_DATA[side.era].special;
      side.specialCooldown = spec.cooldown;
      const targetTeam = team === TEAM_PLAYER ? TEAM_ENEMY : TEAM_PLAYER;
      const targets = units.filter((unit) => unit.team === targetTeam && !unit.dead);
      targets.forEach((unit, index) => {
        const delayScale = 0.72 + Math.sin(index * 1.9) * 0.16;
        damageUnit(unit, spec.damage * delayScale, team, true);
        burst(unit.x, unit.y - unit.size, 11, side.era >= 4 ? "energy" : side.era >= 2 ? "explosion" : "impact");
      });
      const targetSide = team === TEAM_PLAYER ? enemy : player;
      targetSide.baseHealth = Math.max(0, targetSide.baseHealth - spec.baseDamage);
      const center = team === TEAM_PLAYER ? 690 : 310;
      for (let index = 0; index < 36; index += 1) burst(center + rand(-280, 280), rand(100, GROUND_Y - 20), 1, side.era >= 4 ? "energy" : "special");
      shake = Math.max(shake, 14);
      flash = Math.max(flash, 0.42);
      if (team === TEAM_PLAYER) status.textContent = `${spec.name} deployed`;
      checkEnd();
      return true;
    }

    function damageUnit(unit, amount, sourceTeam, special = false) {
      if (!unit || unit.dead) return;
      unit.health -= amount;
      unit.hitFlash = 0.12;
      damageTexts.push({ x: unit.x, y: unit.y - unit.size * 1.8, value: Math.round(amount), life: 0.7, team: sourceTeam });
      if (!special) burst(unit.x, unit.y - unit.size * 0.6, 4, "impact");
      if (unit.health <= 0) {
        unit.dead = true;
        unit.deathTimer = 0.42;
        const killer = sourceTeam === TEAM_PLAYER ? player : enemy;
        if (sourceTeam !== unit.team) {
          killer.money += unit.reward;
          killer.xp += Math.round(unit.reward * 0.74 + unit.era * 8);
        }
        burst(unit.x, unit.y - unit.size * 0.5, 12, unit.era >= 3 ? "explosion" : "dust");
      }
    }

    function nearestEnemy(unit) {
      let best = null;
      let bestDistance = Infinity;
      for (const candidate of units) {
        if (candidate.dead || candidate.team === unit.team) continue;
        const direction = unit.team === TEAM_PLAYER ? 1 : -1;
        const forward = (candidate.x - unit.x) * direction;
        if (forward < -8) continue;
        const distance = Math.abs(candidate.x - unit.x) - candidate.size - unit.size;
        if (distance < bestDistance) {
          bestDistance = distance;
          best = candidate;
        }
      }
      return { target: best, distance: bestDistance };
    }

    function allyBlocks(unit) {
      const direction = unit.team === TEAM_PLAYER ? 1 : -1;
      let nearest = Infinity;
      for (const ally of units) {
        if (ally === unit || ally.dead || ally.team !== unit.team) continue;
        const forward = (ally.x - unit.x) * direction;
        if (forward <= 0) continue;
        const spacing = forward - ally.size - unit.size;
        if (spacing < nearest) nearest = spacing;
      }
      const desired = unit.role === "Ranged" ? 12 : 5;
      return nearest < desired;
    }

    function unitAttack(unit, target) {
      unit.attackTimer = unit.cooldown;
      if (unit.projectile) {
        const colorMode = unit.era >= 4 ? "laser" : unit.era >= 3 ? "bullet" : unit.era >= 2 ? "shell" : "arrow";
        projectiles.push({
          team: unit.team,
          x: unit.x + (unit.team === TEAM_PLAYER ? unit.size : -unit.size),
          y: unit.y - unit.size * 0.9,
          target,
          targetBase: false,
          damage: unit.damage,
          speed: 360 + unit.era * 95,
          life: 2.4,
          mode: colorMode,
          radius: unit.type === 3 ? 4 : 2
        });
      } else {
        damageUnit(target, unit.damage, unit.team);
      }
    }

    function attackBase(unit, side) {
      unit.attackTimer = unit.cooldown;
      if (unit.projectile) {
        projectiles.push({
          team: unit.team,
          x: unit.x,
          y: unit.y - unit.size,
          target: null,
          targetBase: true,
          damage: unit.damage,
          speed: 390 + unit.era * 90,
          life: 2.4,
          mode: unit.era >= 4 ? "laser" : unit.era >= 3 ? "bullet" : "shell",
          radius: unit.type === 3 ? 5 : 2
        });
      } else {
        side.baseHealth = Math.max(0, side.baseHealth - unit.damage);
        burst(unit.team === TEAM_PLAYER ? ENEMY_BASE_X : PLAYER_BASE_X, GROUND_Y - 40, 6, "impact");
        shake = Math.max(shake, 3);
        checkEnd();
      }
    }

    function updateUnit(unit, dt) {
      if (unit.dead) return;
      unit.attackTimer = Math.max(0, unit.attackTimer - dt);
      unit.hitFlash = Math.max(0, unit.hitFlash - dt);
      unit.phase += dt * (3 + unit.speed * 0.03);
      const direction = unit.team === TEAM_PLAYER ? 1 : -1;
      const enemySide = unit.team === TEAM_PLAYER ? enemy : player;
      const baseX = unit.team === TEAM_PLAYER ? ENEMY_BASE_X : PLAYER_BASE_X;
      const baseDistance = Math.abs(baseX - unit.x) - 42 - unit.size;
      const nearest = nearestEnemy(unit);
      if (nearest.target && nearest.distance <= unit.range) {
        if (unit.attackTimer <= 0) unitAttack(unit, nearest.target);
        return;
      }
      if (baseDistance <= unit.range && (!nearest.target || Math.abs(nearest.target.x - unit.x) > baseDistance + 45)) {
        if (unit.attackTimer <= 0) attackBase(unit, enemySide);
        return;
      }
      if (allyBlocks(unit)) return;
      const stopForEnemy = nearest.target && nearest.distance < 3;
      if (!stopForEnemy) unit.x += direction * unit.speed * dt;
      unit.x = clamp(unit.x, PLAYER_BASE_X + 48, ENEMY_BASE_X - 48);
    }

    function updateProjectile(projectile, dt) {
      projectile.life -= dt;
      let targetX;
      let targetY;
      if (projectile.targetBase) {
        targetX = projectile.team === TEAM_PLAYER ? ENEMY_BASE_X : PLAYER_BASE_X;
        targetY = GROUND_Y - 55;
      } else if (projectile.target && !projectile.target.dead) {
        targetX = projectile.target.x;
        targetY = projectile.target.y - projectile.target.size;
      } else {
        projectile.life = 0;
        return;
      }
      const dx = targetX - projectile.x;
      const dy = targetY - projectile.y;
      const distance = Math.hypot(dx, dy);
      if (distance <= projectile.speed * dt + 7) {
        projectile.x = targetX;
        projectile.y = targetY;
        if (projectile.targetBase) {
          const side = projectile.team === TEAM_PLAYER ? enemy : player;
          side.baseHealth = Math.max(0, side.baseHealth - projectile.damage);
          burst(targetX, targetY, projectile.radius > 3 ? 10 : 5, projectile.mode === "laser" ? "energy" : "impact");
          shake = Math.max(shake, projectile.radius > 3 ? 6 : 2);
          checkEnd();
        } else {
          damageUnit(projectile.target, projectile.damage, projectile.team);
        }
        projectile.life = 0;
        return;
      }
      if (distance > 0) {
        projectile.x += (dx / distance) * projectile.speed * dt;
        projectile.y += (dy / distance) * projectile.speed * dt;
      }
      if (projectile.mode === "laser" && Math.random() < 0.55) particles.push({ x: projectile.x, y: projectile.y, vx: rand(-12, 12), vy: rand(-12, 12), life: 0.18, maxLife: 0.18, size: rand(1, 2.5), mode: "energy" });
    }

    function updateTurrets(side, dt) {
      side.turrets.forEach((turret, slot) => {
        if (!turret) return;
        turret.cooldown = Math.max(0, turret.cooldown - dt);
        if (turret.cooldown > 0) return;
        const base = TURRETS[turret.type];
        const originX = side.team === TEAM_PLAYER ? PLAYER_BASE_X + 20 : ENEMY_BASE_X - 20;
        const direction = side.team === TEAM_PLAYER ? 1 : -1;
        let target = null;
        let distance = Infinity;
        for (const unit of units) {
          if (unit.dead || unit.team === side.team) continue;
          const forward = (unit.x - originX) * direction;
          if (forward < 0 || forward > base.range) continue;
          if (forward < distance) {
            distance = forward;
            target = unit;
          }
        }
        if (!target) return;
        const levelScale = 1 + (turret.level - 1) * 0.32;
        turret.cooldown = base.cooldown * Math.pow(0.9, turret.level - 1);
        projectiles.push({
          team: side.team,
          x: originX,
          y: GROUND_Y - 112 - slot * 27,
          target,
          targetBase: false,
          damage: base.damage * levelScale * (side.team === TEAM_ENEMY ? difficulty.damage : 1),
          speed: base.projectileSpeed,
          life: 2.1,
          mode: turret.type === 0 ? "bullet" : turret.type === 1 ? "laser" : "shell",
          radius: turret.type === 2 ? 5 : 2
        });
        burst(originX, GROUND_Y - 112 - slot * 27, turret.type === 2 ? 5 : 2, turret.type === 1 ? "energy" : "muzzle");
      });
    }

    function updateAI(dt) {
      aiThink -= dt;
      if (aiThink > 0) return;
      aiThink = rand(0.58, 1.05) * difficulty.think;
      const targetEvolutionTimes = [0, 86, 176, 284, 405].map((value) => value * difficulty.evolve);
      if (enemy.era < ERA_DATA.length - 1 && elapsed >= targetEvolutionTimes[enemy.era + 1]) {
        enemy.xp = Math.max(enemy.xp, ERA_DATA[enemy.era].xp);
        evolve(TEAM_ENEMY);
      }
      if (enemy.era < player.era - 1) {
        enemy.xp = ERA_DATA[enemy.era].xp;
        evolve(TEAM_ENEMY);
      }
      const ownCount = units.filter((unit) => unit.team === TEAM_ENEMY && !unit.dead).length;
      const playerCount = units.filter((unit) => unit.team === TEAM_PLAYER && !unit.dead).length;
      if (enemy.specialCooldown <= 0 && playerCount >= 5 && Math.random() < 0.18) useSpecial(TEAM_ENEMY);
      if (enemy.money >= 240 && Math.random() < 0.12) {
        const turretType = enemy.era >= 3 && Math.random() < 0.45 ? 2 : Math.random() < 0.55 ? 0 : 1;
        installTurret(TEAM_ENEMY, turretType);
      }
      if (ownCount >= 26) return;
      const defs = ERA_DATA[enemy.era].units;
      let choices = [0, 0, 1, 2];
      if (enemy.money > defs[3].cost * 1.25) choices = [0, 1, 2, 3, 3];
      if (playerCount > ownCount + 4) choices = [0, 0, 1, 1, 3];
      const affordable = choices.filter((index) => enemy.money >= defs[index].cost);
      if (!affordable.length) return;
      if (Math.random() < 0.15 && enemy.money < defs[3].cost * 1.45) return;
      spawnUnit(TEAM_ENEMY, affordable[Math.floor(Math.random() * affordable.length)]);
    }

    function updateEconomy(side, dt) {
      side.incomeTimer += dt;
      if (side.incomeTimer >= 1) {
        const ticks = Math.floor(side.incomeTimer);
        side.incomeTimer -= ticks;
        const baseIncome = 8 + side.era * 3.5;
        side.money += baseIncome * ticks * (side.team === TEAM_ENEMY ? difficulty.income : 1);
        if (side.team === TEAM_ENEMY) side.xp += (1.4 + side.era * 0.7) * ticks * difficulty.income;
      }
      side.specialCooldown = Math.max(0, side.specialCooldown - dt);
    }

    function burst(x, y, count, mode) {
      for (let index = 0; index < count; index += 1) {
        particles.push({
          x,
          y,
          vx: rand(-75, 75),
          vy: rand(-105, 25),
          life: rand(0.28, 0.9),
          maxLife: rand(0.28, 0.9),
          size: rand(1.5, mode === "explosion" || mode === "special" ? 7 : 4),
          mode
        });
      }
    }

    function updateEffects(dt) {
      for (const particle of particles) {
        particle.life -= dt;
        particle.x += particle.vx * dt;
        particle.y += particle.vy * dt;
        particle.vy += (particle.mode === "energy" ? -8 : 75) * dt;
        particle.vx *= Math.pow(0.25, dt);
      }
      for (const text of damageTexts) {
        text.life -= dt;
        text.y -= 28 * dt;
      }
      particles = particles.filter((particle) => particle.life > 0);
      damageTexts = damageTexts.filter((text) => text.life > 0);
      shake = Math.max(0, shake - 28 * dt);
      flash = Math.max(0, flash - dt);
    }

    function checkEnd() {
      if (over || !player || !enemy) return;
      if (enemy.baseHealth <= 0) finish(TEAM_PLAYER);
      else if (player.baseHealth <= 0) finish(TEAM_ENEMY);
    }

    function finish(winner) {
      over = true;
      playing = false;
      status.textContent = winner === TEAM_PLAYER ? "Victory · Enemy base destroyed" : "Defeat · Your base has fallen";
      burst(winner === TEAM_PLAYER ? ENEMY_BASE_X : PLAYER_BASE_X, GROUND_Y - 70, 55, "explosion");
      shake = 18;
      flash = 0.55;
      updateUI();
    }

    function tick(now) {
      const rawDt = clamp((now - lastFrame) / 1000, 0, 0.05);
      lastFrame = now;
      if (playing && !paused && !over) {
        const dt = rawDt * speedScale;
        elapsed += dt;
        updateEconomy(player, dt);
        updateEconomy(enemy, dt);
        for (const unit of units) updateUnit(unit, dt);
        for (const projectile of projectiles) updateProjectile(projectile, dt);
        updateTurrets(player, dt);
        updateTurrets(enemy, dt);
        updateAI(dt);
        updateEffects(dt);
        for (const unit of units) { if (unit.dead) unit.deathTimer -= dt; }
        units = units.filter((unit) => !unit.dead || unit.deathTimer > 0);
        projectiles = projectiles.filter((projectile) => projectile.life > 0);
        checkEnd();
        updateUI();
      } else {
        updateEffects(rawDt);
      }
      draw();
      animationFrame = requestAnimationFrame(tick);
    }

    function draw() {
      if (!ctx) return;
      const playerEra = player?.era || 0;
      const enemyEra = enemy?.era || 0;
      const dominantEra = Math.max(playerEra, enemyEra);
      const era = ERA_DATA[dominantEra];
      ctx.save();
      const shakeX = shake > 0 ? rand(-shake, shake) : 0;
      const shakeY = shake > 0 ? rand(-shake * 0.35, shake * 0.35) : 0;
      ctx.translate(shakeX, shakeY);
      drawBackground(era, dominantEra);
      drawBase(player || makeSide(TEAM_PLAYER), PLAYER_BASE_X, TEAM_PLAYER);
      drawBase(enemy || makeSide(TEAM_ENEMY), ENEMY_BASE_X, TEAM_ENEMY);
      for (const unit of units) drawUnit(unit);
      for (const projectile of projectiles) drawProjectile(projectile);
      for (const particle of particles) drawParticle(particle);
      for (const text of damageTexts) drawDamageText(text);
      drawBattleHUD();
      if (debug) drawDebug();
      ctx.restore();
      if (flash > 0) {
        ctx.save();
        ctx.globalAlpha = clamp(flash * 0.55, 0, 0.3);
        ctx.fillStyle = "#fff4c7";
        ctx.fillRect(0, 0, WIDTH, HEIGHT);
        ctx.restore();
      }
      if (paused && playing) drawPauseOverlay();
    }

    function drawBackground(era, eraIndex) {
      const gradient = ctx.createLinearGradient(0, 0, 0, GROUND_Y);
      gradient.addColorStop(0, era.sky[0]);
      gradient.addColorStop(1, era.sky[1]);
      ctx.fillStyle = gradient;
      ctx.fillRect(-30, -30, WIDTH + 60, HEIGHT + 60);
      const time = performance.now() * 0.00002;
      ctx.globalAlpha = 0.22;
      ctx.fillStyle = "#e6e2c8";
      for (let index = 0; index < 6; index += 1) {
        const x = ((index * 217 + time * (18 + index * 3) * WIDTH) % (WIDTH + 180)) - 90;
        const y = 72 + (index % 3) * 44;
        ctx.beginPath();
        ctx.ellipse(x, y, 58, 14, 0, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalAlpha = 1;
      ctx.fillStyle = eraIndex < 2 ? "#394538" : eraIndex < 4 ? "#333d3d" : "#222b37";
      for (let x = -20; x < WIDTH + 60; x += 85) {
        const h = 28 + ((x * 17) % 47 + 47) % 47 + eraIndex * 8;
        ctx.fillRect(x, GROUND_Y - 105 - h * 0.25, 60, h);
        if (eraIndex >= 2) {
          ctx.fillRect(x + 12, GROUND_Y - 135 - h * 0.25, 6, 32);
          ctx.fillRect(x + 36, GROUND_Y - 124 - h * 0.25, 4, 22);
        }
      }
      const ground = ctx.createLinearGradient(0, GROUND_Y, 0, HEIGHT);
      ground.addColorStop(0, era.ground[0]);
      ground.addColorStop(1, era.ground[1]);
      ctx.fillStyle = ground;
      ctx.fillRect(-30, GROUND_Y, WIDTH + 60, HEIGHT - GROUND_Y + 30);
      ctx.fillStyle = "rgba(0,0,0,.28)";
      ctx.fillRect(-30, GROUND_Y, WIDTH + 60, 4);
      for (let x = 0; x < WIDTH; x += 26) {
        const offset = ((x * 31) % 13) - 6;
        ctx.fillStyle = "rgba(255,255,255,.04)";
        ctx.fillRect(x, GROUND_Y + 18 + offset, 10, 2);
      }
    }

    function drawBase(side, x, team) {
      const direction = team === TEAM_PLAYER ? 1 : -1;
      const era = side.era || 0;
      const width = 82 + era * 5;
      const height = 115 + era * 10;
      ctx.save();
      ctx.translate(x, GROUND_Y);
      ctx.scale(direction, 1);
      ctx.fillStyle = team === TEAM_PLAYER ? "#3c4a3b" : "#4d3935";
      ctx.strokeStyle = "#111512";
      ctx.lineWidth = 3;
      ctx.fillRect(-width / 2, -height, width, height);
      ctx.strokeRect(-width / 2, -height, width, height);
      if (era === 0) {
        ctx.fillStyle = "#6c6548";
        for (let y = -height + 14; y < -20; y += 20) ctx.fillRect(-width / 2 - 5, y, width + 10, 10);
        ctx.beginPath();
        ctx.moveTo(-width / 2 - 12, -height);
        ctx.lineTo(width / 2 + 12, -height);
        ctx.lineTo(0, -height - 38);
        ctx.closePath();
        ctx.fill();
      } else if (era === 1) {
        ctx.fillStyle = "#737469";
        ctx.fillRect(-width / 2 - 7, -height - 15, width + 14, 22);
        for (let px = -width / 2 - 7; px < width / 2; px += 28) ctx.fillRect(px, -height - 29, 15, 18);
      } else if (era === 2) {
        ctx.fillStyle = "#555d58";
        ctx.fillRect(-width / 2 - 8, -height - 8, width + 16, 28);
        ctx.fillRect(-10, -height - 48, 20, 44);
        ctx.fillStyle = "rgba(230,230,210,.16)";
        ctx.beginPath();
        ctx.ellipse(1, -height - 62, 20, 9, 0, 0, Math.PI * 2);
        ctx.fill();
      } else if (era === 3) {
        ctx.fillStyle = "#48565b";
        ctx.fillRect(-width / 2 - 8, -height - 12, width + 16, 30);
        ctx.fillRect(-8, -height - 57, 16, 48);
        ctx.fillRect(-24, -height - 51, 48, 5);
      } else {
        ctx.fillStyle = "#334753";
        ctx.fillRect(-width / 2 - 9, -height - 14, width + 18, 32);
        ctx.strokeStyle = team === TEAM_PLAYER ? "#8ed9c0" : "#dc8e83";
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.arc(0, -height - 30, 28, Math.PI, Math.PI * 2);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(-31, -height + 3);
        ctx.lineTo(0, -height - 45);
        ctx.lineTo(31, -height + 3);
        ctx.stroke();
      }
      side.turrets?.forEach((turret, slot) => {
        if (!turret) return;
        const ty = -112 - slot * 27;
        ctx.fillStyle = "#232c2b";
        ctx.fillRect(2, ty - 8, 28, 16);
        ctx.fillRect(28, ty - 3, 24 + turret.type * 7, 6);
        if (turret.type === 1) {
          ctx.fillStyle = team === TEAM_PLAYER ? "#a5e5cb" : "#e9a199";
          ctx.fillRect(50, ty - 2, 7, 4);
        }
      });
      ctx.restore();
      const healthRatio = clamp(side.baseHealth / side.baseMaxHealth, 0, 1);
      drawBar(x - 52, GROUND_Y - height - 68, 104, 9, healthRatio, team === TEAM_PLAYER ? "#82b66b" : "#b86d62");
    }

    function drawUnit(unit) {
      if (unit.dead) return;
      const direction = unit.team === TEAM_PLAYER ? 1 : -1;
      const era = unit.era;
      const teamColor = unit.team === TEAM_PLAYER ? "#829f70" : "#a06c61";
      const accent = era >= 4 ? "#9fe3d0" : era >= 3 ? "#c4d0c9" : era >= 2 ? "#b6aa84" : "#d1b879";
      const bob = Math.sin(unit.phase * 1.6) * 1.8;
      ctx.save();
      ctx.translate(unit.x, unit.y + bob);
      ctx.scale(direction, 1);
      if (unit.hitFlash > 0) ctx.globalAlpha = 0.55 + Math.sin(performance.now() * 0.06) * 0.3;
      if (unit.type === 3) {
        ctx.fillStyle = era >= 3 ? "#394446" : era === 2 ? "#4b514b" : "#655b47";
        ctx.fillRect(-unit.size * 1.2, -unit.size * 1.35, unit.size * 2.4, unit.size * 1.2);
        ctx.fillStyle = teamColor;
        ctx.fillRect(-unit.size * 0.45, -unit.size * 1.75, unit.size * 1.05, unit.size * 0.65);
        if (era >= 3) ctx.fillRect(unit.size * 0.25, -unit.size * 1.5, unit.size * 1.6, 4);
        ctx.fillStyle = "#171c19";
        ctx.beginPath();
        ctx.arc(-unit.size * 0.65, -2, unit.size * 0.38, 0, Math.PI * 2);
        ctx.arc(unit.size * 0.65, -2, unit.size * 0.38, 0, Math.PI * 2);
        ctx.fill();
      } else {
        ctx.strokeStyle = "#171b18";
        ctx.lineWidth = Math.max(3, unit.size * 0.2);
        const stride = Math.sin(unit.phase * 2.2) * unit.size * 0.3;
        ctx.beginPath();
        ctx.moveTo(-unit.size * 0.12, -unit.size * 0.55);
        ctx.lineTo(-unit.size * 0.32 + stride, 0);
        ctx.moveTo(unit.size * 0.12, -unit.size * 0.55);
        ctx.lineTo(unit.size * 0.32 - stride, 0);
        ctx.stroke();
        ctx.fillStyle = teamColor;
        ctx.fillRect(-unit.size * 0.48, -unit.size * 1.55, unit.size * 0.96, unit.size * 1.05);
        ctx.fillStyle = accent;
        ctx.beginPath();
        ctx.arc(0, -unit.size * 1.82, unit.size * 0.38, 0, Math.PI * 2);
        ctx.fill();
        ctx.strokeStyle = accent;
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.moveTo(unit.size * 0.3, -unit.size * 1.25);
        if (unit.projectile) ctx.lineTo(unit.size * 1.35, -unit.size * 1.15);
        else ctx.lineTo(unit.size * 1.05, -unit.size * 0.65);
        ctx.stroke();
        if (unit.role === "Ranged" || unit.projectile) {
          ctx.fillStyle = era >= 3 ? "#242d2d" : "#5f513b";
          ctx.fillRect(unit.size * 0.75, -unit.size * 1.28, unit.size * 0.95, 4);
        }
      }
      if (era >= 4) {
        ctx.strokeStyle = teamColor;
        ctx.globalAlpha = 0.45;
        ctx.beginPath();
        ctx.arc(0, -unit.size, unit.size * 1.18, 0, Math.PI * 2);
        ctx.stroke();
        ctx.globalAlpha = 1;
      }
      ctx.restore();
      if (unit.health < unit.maxHealth) drawBar(unit.x - 20, unit.y - unit.size * 2.65, 40, 5, clamp(unit.health / unit.maxHealth, 0, 1), unit.team === TEAM_PLAYER ? "#87bd70" : "#c17367");
    }

    function drawProjectile(projectile) {
      ctx.save();
      if (projectile.mode === "laser") {
        ctx.fillStyle = projectile.team === TEAM_PLAYER ? "#a4ead2" : "#f1a69c";
        ctx.shadowBlur = 8;
        ctx.shadowColor = ctx.fillStyle;
      } else if (projectile.mode === "bullet") {
        ctx.fillStyle = "#ead593";
      } else if (projectile.mode === "arrow") {
        ctx.strokeStyle = "#312a1e";
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(projectile.x - 8, projectile.y + 2);
        ctx.lineTo(projectile.x + 8, projectile.y - 2);
        ctx.stroke();
        ctx.restore();
        return;
      } else {
        ctx.fillStyle = "#242a27";
      }
      ctx.beginPath();
      ctx.arc(projectile.x, projectile.y, projectile.radius, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    }

    function drawParticle(particle) {
      const ratio = clamp(particle.life / particle.maxLife, 0, 1);
      ctx.save();
      ctx.globalAlpha = ratio;
      if (particle.mode === "energy" || particle.mode === "evolve") ctx.fillStyle = "#a3e1d1";
      else if (particle.mode === "explosion" || particle.mode === "special" || particle.mode === "muzzle") ctx.fillStyle = ratio > 0.55 ? "#f1c16d" : "#9c5d43";
      else if (particle.mode === "impact") ctx.fillStyle = "#d4c19a";
      else ctx.fillStyle = "#736c54";
      ctx.beginPath();
      ctx.arc(particle.x, particle.y, particle.size * (0.55 + ratio), 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    }

    function drawDamageText(text) {
      ctx.save();
      ctx.globalAlpha = clamp(text.life / 0.7, 0, 1);
      ctx.fillStyle = text.team === TEAM_PLAYER ? "#f0d596" : "#e8a39b";
      ctx.font = "700 11px monospace";
      ctx.textAlign = "center";
      ctx.fillText(`-${text.value}`, text.x, text.y);
      ctx.restore();
    }

    function drawBar(x, y, width, height, ratio, fill) {
      ctx.fillStyle = "rgba(10,13,11,.78)";
      ctx.fillRect(x, y, width, height);
      ctx.fillStyle = fill;
      ctx.fillRect(x + 1, y + 1, (width - 2) * ratio, height - 2);
      ctx.strokeStyle = "rgba(0,0,0,.72)";
      ctx.strokeRect(x, y, width, height);
    }

    function drawBattleHUD() {
      if (!player || !enemy) return;
      ctx.save();
      ctx.fillStyle = "rgba(12,16,13,.76)";
      ctx.fillRect(288, 12, 424, 46);
      ctx.strokeStyle = "rgba(236,218,167,.28)";
      ctx.strokeRect(288, 12, 424, 46);
      ctx.fillStyle = "#e5d7a8";
      ctx.font = "700 12px monospace";
      ctx.textAlign = "left";
      ctx.fillText(ERA_DATA[player.era].short, 302, 31);
      ctx.textAlign = "right";
      ctx.fillText(ERA_DATA[enemy.era].short, 698, 31);
      drawBar(302, 39, 150, 8, player.baseHealth / player.baseMaxHealth, "#7eac69");
      drawBar(548, 39, 150, 8, enemy.baseHealth / enemy.baseMaxHealth, "#af695f");
      ctx.fillStyle = "#9ca59c";
      ctx.textAlign = "center";
      ctx.fillText(formatTime(elapsed), 500, 32);
      ctx.restore();
    }

    function formatTime(seconds) {
      const total = Math.floor(seconds);
      return `${Math.floor(total / 60)}:${String(total % 60).padStart(2, "0")}`;
    }

    function drawDebug() {
      ctx.save();
      ctx.strokeStyle = "rgba(255,255,255,.32)";
      ctx.font = "10px monospace";
      ctx.fillStyle = "#fff";
      ctx.textAlign = "left";
      ctx.fillText(`Units ${units.length} Projectiles ${projectiles.length} Particles ${particles.length}`, 10, HEIGHT - 16);
      for (const unit of units) {
        if (unit.dead) continue;
        ctx.strokeRect(unit.x - unit.size, unit.y - unit.size * 2.2, unit.size * 2, unit.size * 2.2);
        ctx.beginPath();
        ctx.moveTo(unit.x, unit.y - 6);
        ctx.lineTo(unit.x + (unit.team === TEAM_PLAYER ? unit.range : -unit.range), unit.y - 6);
        ctx.stroke();
      }
      ctx.restore();
    }

    function drawPauseOverlay() {
      ctx.save();
      ctx.fillStyle = "rgba(6,9,7,.62)";
      ctx.fillRect(0, 0, WIDTH, HEIGHT);
      ctx.fillStyle = "#f0dda7";
      ctx.font = "700 28px monospace";
      ctx.textAlign = "center";
      ctx.fillText("PAUSED", WIDTH / 2, HEIGHT / 2);
      ctx.restore();
    }

    function togglePause() {
      if (!player || over || stage.querySelector(".game-start-screen")) return;
      paused = !paused;
      pauseButton.textContent = paused ? "Resume" : "Pause";
      status.textContent = paused ? "Paused" : `${difficulty.label} · Battle resumed`;
    }

    root.addEventListener("click", (event) => {
      const button = event.target instanceof Element ? event.target.closest("[data-game-action]") : null;
      if (!button || button.disabled) return;
      const action = button.dataset.gameAction;
      if (action.startsWith("unit-")) spawnUnit(TEAM_PLAYER, Number(action.slice(5)));
      else if (action === "evolve") evolve(TEAM_PLAYER);
      else if (action === "special") useSpecial(TEAM_PLAYER);
      else if (action.startsWith("slot-")) selectedTurretSlot = Number(action.slice(5));
      else if (action.startsWith("turret-")) installTurret(TEAM_PLAYER, Number(action.slice(7)), selectedTurretSlot);
      else if (action === "speed") {
        speedScale = speedScale === 1 ? 2 : 1;
        speedButton.textContent = `Speed ${speedScale}x`;
      } else if (action === "pause") togglePause();
      else if (action === "restart") reset(difficultyKey);
      else if (action === "new") showStartMenu();
      updateUI();
      root.focus({ preventScroll: true });
    });

    root.addEventListener("keydown", (event) => {
      if (event.target instanceof Element && event.target.closest("button,input,select,textarea,a")) return;
      const key = event.key.toLowerCase();
      if (key === "p" || key === "escape") togglePause();
      if (key === "`" || key === "f3") {
        debug = !debug;
        status.textContent = debug ? "Debug overlay enabled" : "Debug overlay disabled";
      }
      if (!debug || !player || over) return;
      if (key === "c") player.money += 1000;
      if (key === "x") player.xp += 1000;
      if (key === "e") {
        player.xp = Math.max(player.xp, ERA_DATA[player.era].xp || 0);
        evolve(TEAM_PLAYER);
      }
      if (key === "v") spawnUnit(TEAM_ENEMY, Math.floor(Math.random() * 4));
      updateUI();
    });

    loadStoredDifficulty();
    player = makeSide(TEAM_PLAYER);
    enemy = makeSide(TEAM_ENEMY);
    renderUnitButtons();
    updateUI();
    showStartMenu();
    animationFrame = requestAnimationFrame(tick);

    return {
      element: root,
      controller: {
        focus() { root.focus({ preventScroll: true }); },
        pause() { if (playing && !over) { paused = true; pauseButton.textContent = "Resume"; } },
        resume() { if (playing && !over) { paused = false; pauseButton.textContent = "Pause"; lastFrame = performance.now(); } },
        destroy() {
          cancelAnimationFrame(animationFrame);
          units = [];
          projectiles = [];
          particles = [];
          damageTexts = [];
          playing = false;
        }
      }
    };
  }

  window.PortfolioGames.create = function create(application) {
    const id = application?.game || application?.id;
    if (id === "epoch-siege") {
      const game = createAgeWar();
      window.PortfolioGameAudio?.bind?.(game.element);
      return game;
    }
    return previousCreate(application);
  };
})();
