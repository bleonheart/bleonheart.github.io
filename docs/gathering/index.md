# Gathering System

Resource gathering from trees (spruce, sticks, sap) and rocks (iron/gold/silver ore, coal), fishing system with pole/bait and fish types (trout, bass, catfish, perch) plus junk, crafting materials (ingots, wood, swords), and stackable inventory management.

---

## Generator

<div class="generator-grid">
  <!-- Input Column -->
  <div class="generator-card form-card">
    <div class="generator-section">
      <div class="form-grid-2">
        <div class="input-group">
          <label for="gathering-class">Entity Class:</label>
          <input type="text" id="gathering-class" placeholder="e.g., iron_vein" value="iron_vein" oninput="generateGatheringCode()">
          <small>Unique identifier for this gatherable entity (no spaces, lowercase)</small>
        </div>

        <div class="input-group">
          <label for="gathering-name">Display Name:</label>
          <input type="text" id="gathering-name" placeholder="e.g., Iron Vein" value="Iron Vein" oninput="generateGatheringCode()">
        </div>
      </div>

      <div class="input-group">
        <label for="gathering-desc">Description:</label>
        <textarea id="gathering-desc" placeholder="e.g., A rich vein of iron ore embedded in the rock face." oninput="generateGatheringCode()">A rich vein of iron ore embedded in the rock face.</textarea>
      </div>
    </div>

    <div class="generator-section">
      <div class="form-grid-2">
        <div class="input-group">
          <label for="gathering-model">Model Path:</label>
          <input type="text" id="gathering-model" placeholder="e.g., models/props_mining/rock01.mdl" value="models/fallenlogic_environment/rocks/scattersmooth_01.mdl" oninput="generateGatheringCode()">
        </div>

        <div class="input-group">
          <label for="gathering-hit-sound">Hit Sound:</label>
          <input type="text" id="gathering-hit-sound" placeholder="e.g., physics/metal/metal_box_impact_bullet1.wav" value="physics/metal/metal_box_impact_bullet1.wav" oninput="generateGatheringCode()">
          <small>Sound played when entity is hit (leave empty for default)</small>
        </div>
      </div>

      <div class="form-grid-3">
        <div class="input-group">
          <label for="gathering-health">Health:</label>
          <input type="number" id="gathering-health" placeholder="100" min="1" value="150" oninput="generateGatheringCode()">
          <small>How many hits the entity can take</small>
        </div>

        <div class="input-group">
          <label for="gathering-items-before-cooldown">Items Before Cooldown:</label>
          <input type="number" id="gathering-items-before-cooldown" placeholder="3" min="1" value="5" oninput="generateGatheringCode()">
          <small>How many items can be gathered before cooldown</small>
        </div>

        <div class="input-group">
          <label for="gathering-cooldown-time">Cooldown Time (seconds):</label>
          <input type="number" id="gathering-cooldown-time" placeholder="300" min="1" value="600" oninput="generateGatheringCode()">
          <small>Cooldown duration in seconds</small>
        </div>
      </div>
    </div>

    <div class="generator-section">
      <div class="input-group">
        <label>Valid Weapons:</label>
        <small>Each row is one weapon class that can gather this entity.</small>
      </div>

      <div id="gathering-weapon-list" class="dynamic-list"></div>
      <button type="button" class="add-btn" onclick="addGatheringWeaponRow()">Add Weapon</button>
    </div>

    <div class="generator-section">
      <div class="input-group">
        <label>Loot Table:</label>
        <small>Each row is one loot entry (item + min/max + chance 1-100).</small>
      </div>

      <div id="gathering-loot-list" class="dynamic-list"></div>
      <button type="button" class="add-btn" onclick="addGatheringLootRow()">Add Loot Item</button>
    </div>

    <div class="button-group">
      <button onclick="generateGatheringCode()" class="generate-btn">Generate Gathering Code</button>
      <button onclick="fillExampleGathering()" class="generate-btn example-btn">Generate Example</button>
    </div>
  </div>

  <!-- Output Column -->
  <div class="generator-card output-card">
    <div class="card-header">
      <h3>Generated Code</h3>
    </div>
    <textarea id="output-code" class="generator-code-output" readonly></textarea>
  </div>
</div>

<script>
function gatheringWeaponRowTemplate(idx, weapon) {
  return `
  <div class="dynamic-row" data-idx="${idx}">
    <input type="text" class="g-weapon" placeholder="lia_pickaxe" value="${weapon || ''}" oninput="generateGatheringCode()">
    <button type="button" class="remove-btn" onclick="removeGatheringWeaponRow(this)">×</button>
  </div>`;
}

function addGatheringWeaponRow(weapon) {
  const list = document.getElementById('gathering-weapon-list');
  const idx = list.children.length;
  list.insertAdjacentHTML('beforeend', gatheringWeaponRowTemplate(idx, weapon));
  generateGatheringCode();
}

function removeGatheringWeaponRow(btn) {
  const row = btn.closest('.dynamic-row');
  if (row) row.remove();
  generateGatheringCode();
}

function gatheringLootRowTemplate(idx, item, min, max, chance) {
  return `
  <div class="dynamic-row" data-idx="${idx}">
    <input type="text" class="g-loot-item" placeholder="iron_ore" value="${item || ''}" oninput="generateGatheringCode()">
    <input type="number" class="g-loot-min small-input" placeholder="1" min="0" value="${min ?? 0}" oninput="generateGatheringCode()">
    <input type="number" class="g-loot-max small-input" placeholder="2" min="0" value="${max ?? 0}" oninput="generateGatheringCode()">
    <input type="number" class="g-loot-chance small-input" placeholder="50" min="0" max="100" value="${chance ?? 50}" oninput="generateGatheringCode()">
    <button type="button" class="remove-btn" onclick="removeGatheringLootRow(this)">×</button>
  </div>`;
}

function addGatheringLootRow(item, min, max, chance) {
  const list = document.getElementById('gathering-loot-list');
  const idx = list.children.length;
  list.insertAdjacentHTML('beforeend', gatheringLootRowTemplate(idx, item, min, max, chance));
  generateGatheringCode();
}

function removeGatheringLootRow(btn) {
  const row = btn.closest('.dynamic-row');
  if (row) row.remove();
  generateGatheringCode();
}

function generateGatheringCode() {
  const entityClass = (document.getElementById('gathering-class').value || '').trim() || 'gathering_entity';
  const name = (document.getElementById('gathering-name').value || '').trim() || 'Gathering Entity';
  const desc = (document.getElementById('gathering-desc').value || '').trim() || 'A gatherable resource node.';
  const model = (document.getElementById('gathering-model').value || '').trim() || 'models/props_junk/wood_crate001a.mdl';
  const hitSound = (document.getElementById('gathering-hit-sound').value || '').trim();
  const health = document.getElementById('gathering-health').value || '100';
  const itemsBeforeCooldown = document.getElementById('gathering-items-before-cooldown').value || '3';
  const cooldownTime = document.getElementById('gathering-cooldown-time').value || '300';

  const weaponRows = Array.from(document.querySelectorAll('#gathering-weapon-list .dynamic-row'));
  const weapons = [];
  for (const row of weaponRows) {
    const weapon = (row.querySelector('.g-weapon').value || '').trim();
    if (!weapon) continue;
    weapons.push(weapon);
  }

  const lootRows = Array.from(document.querySelectorAll('#gathering-loot-list .dynamic-row'));
  const lootItems = [];
  for (const row of lootRows) {
    const item = (row.querySelector('.g-loot-item').value || '').trim();
    const min = (row.querySelector('.g-loot-min').value || '').trim();
    const max = (row.querySelector('.g-loot-max').value || '').trim();
    const chance = (row.querySelector('.g-loot-chance').value || '').trim();
    if (!item) continue;
    lootItems.push({
      item,
      min: min === '' ? 0 : Number(min),
      max: max === '' ? 0 : Number(max),
      chance: chance === '' ? 0 : Number(chance)
    });
  }

  const lines = [
  '-- Copy and paste this code into your gathering module',
  '-- Example: garrysmod/gamemodes/[schema folder]/modules/gathering/libraries/shared.lua',
  '',
  `lia.gathering.generateEntity(${JSON.stringify(entityClass)}, {`,
  `    name = ${JSON.stringify(name)},`,
  `    desc = ${JSON.stringify(desc)},`,
  `    model = ${JSON.stringify(model)},`
  ];

  if (hitSound) {
    lines.push(`    hitSound = ${JSON.stringify(hitSound)},`);
  }

  lines.push(
    `    health = ${health},`,
    `    itemsBeforeCooldown = ${itemsBeforeCooldown},`,
    `    cooldownTime = ${cooldownTime},`
  );

  if (weapons.length > 0) {
    lines.push('    validWeapons = {');
    weapons.forEach(weapon => {
      lines.push(`        ${JSON.stringify(weapon)},`);
    });
    lines.push('    },');
  }

  if (lootItems.length > 0) {
    lines.push('    lootTable = {');
    lootItems.forEach(loot => {
      lines.push(`        [${JSON.stringify(loot.item)}] = {`);
      lines.push(`            min = ${loot.min},`);
      lines.push(`            max = ${loot.max},`);
      lines.push(`            chance = ${loot.chance}`);
      lines.push('        },');
    });
    lines.push('    }');
  }

  lines.push('})');

  const code = `${lines.join('\n')}\n`;

  const outputBox = document.getElementById('output-code');
  if (outputBox) outputBox.value = code;
}

function fillExampleGathering() {
  document.getElementById('gathering-class').value = 'tree_pine';
  document.getElementById('gathering-name').value = 'Pine Tree';
  document.getElementById('gathering-desc').value = 'A tall pine tree, perfect for gathering wood and sap.';
  document.getElementById('gathering-model').value = 'models/props_foliage/tree_pine_01.mdl';
  document.getElementById('gathering-hit-sound').value = '';
  document.getElementById('gathering-health').value = '100';
  document.getElementById('gathering-items-before-cooldown').value = '3';
  document.getElementById('gathering-cooldown-time').value = '300';

  const weaponList = document.getElementById('gathering-weapon-list');
  weaponList.innerHTML = '';
  addGatheringWeaponRow('lia_axe');
  addGatheringWeaponRow('lia_saw');

  const lootList = document.getElementById('gathering-loot-list');
  lootList.innerHTML = '';
  addGatheringLootRow('wood', 3, 6, 90);
  addGatheringLootRow('stick', 1, 3, 70);
  addGatheringLootRow('sap', 0, 1, 25);
  addGatheringLootRow('log', 1, 2, 80);

  generateGatheringCode();
}

document.addEventListener('DOMContentLoaded', () => {
  const weaponList = document.getElementById('gathering-weapon-list');
  weaponList.innerHTML = '';
  addGatheringWeaponRow('lia_pickaxe');

  const lootList = document.getElementById('gathering-loot-list');
  lootList.innerHTML = '';
  addGatheringLootRow('iron_ore', 2, 4, 85);
  addGatheringLootRow('stone', 1, 2, 60);
  addGatheringLootRow('coal', 0, 1, 25);
});
</script>

---

## Changelog

<details class="realm-shared no-icon">
  <summary>Version 1.0</summary>
  <div class="details-content" style="margin-left: 20px;">
    <ul>
      <li>Initial Release</li>
    </ul>
  </div>
</details>

