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
        <label for="gathering-weapons">Valid Weapons:</label>
        <textarea id="gathering-weapons" placeholder="lia_pickaxe, lia_hammer" oninput="generateGatheringCode()">lia_pickaxe</textarea>
        <small>Comma-separated weapon classes that can gather this entity</small>
      </div>
    </div>

    <div class="generator-section">
      <div class="input-group">
        <label for="gathering-loot">Loot Table:</label>
        <textarea id="gathering-loot" placeholder="iron_ore:2-4:85, stone:1-2:60, coal:0-1:25" oninput="generateGatheringCode()">iron_ore:2-4:85, stone:1-2:60, coal:0-1:25</textarea>
        <small>Format: item_id:min-max:chance (comma-separated). Example: iron_ore:2-4:85</small>
      </div>
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
function parseLootTable(lootText) {
  const lootItems = [];
  const items = lootText.split(',').map(s => s.trim()).filter(Boolean);
  
  items.forEach(item => {
    const parts = item.split(':').map(s => s.trim());
    if (parts.length >= 3) {
      const itemId = parts[0];
      const range = parts[1].split('-').map(s => parseInt(s.trim()));
      const chance = parseInt(parts[2]);
      
      if (itemId && range.length === 2 && !isNaN(range[0]) && !isNaN(range[1]) && !isNaN(chance)) {
        lootItems.push({
          item: itemId,
          min: range[0],
          max: range[1],
          chance: chance
        });
      }
    }
  });
  
  return lootItems;
}

function parseWeapons(weaponsText) {
  return weaponsText.split(',').map(s => s.trim()).filter(Boolean);
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

  const weaponsText = (document.getElementById('gathering-weapons').value || '').trim();
  const weapons = weaponsText ? parseWeapons(weaponsText) : [];
  
  const lootText = (document.getElementById('gathering-loot').value || '').trim();
  const lootItems = parseLootTable(lootText);

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
  document.getElementById('gathering-weapons').value = 'lia_axe, lia_saw';
  document.getElementById('gathering-loot').value = 'wood:3-6:90, stick:1-3:70, sap:0-1:25, log:1-2:80';
  generateGatheringCode();
}

document.addEventListener('DOMContentLoaded', () => {
  generateGatheringCode();
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

