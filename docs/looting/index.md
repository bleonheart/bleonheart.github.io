# Lootables

Searchable loot containers (cardboard boxes, wooden crates, metal barrels, lockers, safes) with rarity tiers (Common/Uncommon/Rare/Legendary/Unique), skill requirements (strength/luck), alarm systems, and cooldown timers for exploration-based item gathering.

---

## Generator

<div class="generator-grid">
  <!-- Input Column -->
  <div class="generator-card form-card">
    <div class="generator-section">
      <div class="form-grid-2">
        <div class="input-group">
          <label for="loot-id">Unique ID:</label>
          <input type="text" id="loot-id" placeholder="e.g., loot_cardboard_box" value="loot_cardboard_box" oninput="generateLootCode()">
        </div>

        <div class="input-group">
          <label for="loot-name">Name:</label>
          <input type="text" id="loot-name" placeholder="e.g., Cardboard Box" value="Cardboard Box" oninput="generateLootCode()">
        </div>
      </div>

      <div class="form-grid-2">
        <div class="input-group">
          <label for="loot-model">Model:</label>
          <input type="text" id="loot-model" placeholder="models/props_junk/cardboard_box001a.mdl" value="models/props_junk/cardboard_box001a.mdl" oninput="generateLootCode()">
        </div>

        <div class="input-group">
          <label for="loot-sound">Opening Sound:</label>
          <input type="text" id="loot-sound" placeholder="doors/door_metal_thin_open1.wav" value="doors/door_metal_thin_open1.wav" oninput="generateLootCode()">
        </div>
      </div>
    </div>

    <div class="generator-section">
      <div class="form-grid-4">
        <div class="input-group">
          <label for="loot-chance">Chance:</label>
          <input type="number" id="loot-chance" min="0" value="5" oninput="generateLootCode()">
        </div>

        <div class="input-group">
          <label for="loot-chancetime">Chance Time:</label>
          <input type="number" id="loot-chancetime" min="0" value="15" oninput="generateLootCode()">
        </div>

        <div class="input-group">
          <label for="sr-strength">Strength Req:</label>
          <input type="number" id="sr-strength" min="0" value="0" oninput="generateLootCode()">
        </div>

        <div class="input-group">
          <label for="sr-luck">Luck Req:</label>
          <input type="number" id="sr-luck" min="0" value="0" oninput="generateLootCode()">
        </div>
      </div>

      <div class="form-grid-2">
        <div class="input-group">
          <label for="sr-luckchance">Luck Chance:</label>
          <input type="number" id="sr-luckchance" min="0" value="0" oninput="generateLootCode()">
        </div>
      </div>
    </div>

    <div class="generator-section">
      <div class="input-group">
        <label>Rarity Tiers:</label>
        <small>Add tiers like Common/Uncommon/Rare/etc with an overall chance and item list.</small>
      </div>

      <div id="tier-list" class="dynamic-list"></div>
      <button type="button" class="add-btn" onclick="addTierRow()">Add Tier</button>
    </div>

    <div class="button-group">
      <button onclick="generateLootCode()" class="generate-btn">Generate Loot Code</button>
      <button onclick="fillExampleLoot()" class="generate-btn example-btn">Generate Example</button>
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
function tierRowTemplate(idx, tierName, chance, items) {
  const itemsStr = items || '';
  return `
  <div class="dynamic-row" data-idx="${idx}">
    <input type="text" class="tier-name" placeholder="Common" value="${tierName || ''}" oninput="generateLootCode()">
    <input type="number" class="tier-chance small-input" placeholder="55" min="0" max="100" value="${chance || '0'}" oninput="generateLootCode()">
    <input type="text" class="tier-items" placeholder="item1, item2, item3" value="${itemsStr}" oninput="generateLootCode()">
    <button type="button" class="remove-btn" onclick="removeTierRow(this)">×</button>
  </div>`;
}

function addTierRow(tierName, chance, items) {
  const list = document.getElementById('tier-list');
  const idx = list.children.length;
  list.insertAdjacentHTML('beforeend', tierRowTemplate(idx, tierName, chance, items));
  generateLootCode();
}

function removeTierRow(btn) {
  const row = btn.closest('.dynamic-row');
  if (row) row.remove();
  generateLootCode();
}

function generateLootCode() {
  const uniqueId = (document.getElementById('loot-id').value || '').trim() || 'loot_example';
  const name = (document.getElementById('loot-name').value || '').trim() || 'Loot';
  const model = (document.getElementById('loot-model').value || '').trim() || 'models/props_junk/cardboard_box001a.mdl';
  const chance = document.getElementById('loot-chance').value || '5';
  const chanceTime = document.getElementById('loot-chancetime').value || '15';
  const openingSound = (document.getElementById('loot-sound').value || '').trim() || 'doors/door_metal_thin_open1.wav';

  const strength = document.getElementById('sr-strength').value || '0';
  const luck = document.getElementById('sr-luck').value || '0';
  const luckChance = document.getElementById('sr-luckchance').value || '0';

  const rows = Array.from(document.querySelectorAll('#tier-list .dynamic-row'));
  const tiers = [];
  for (const row of rows) {
    const tname = (row.querySelector('.tier-name').value || '').trim();
    const tch = (row.querySelector('.tier-chance').value || '').trim() || '0';
    const itemsText = (row.querySelector('.tier-items').value || '').trim();
    const items = itemsText ? itemsText.split(',').map(i => i.trim()).filter(Boolean) : [];
    if (!tname) continue;
    tiers.push({ tname, tch, items });
  }

  const lines = [
  '-- Copy and paste this code into the module definitions file',
  '-- Example: garrysmod/gamemodes/[schema folder]/modules/done/looting/definitions.lua',
  '',
  `lia.loot.registerLoot(${JSON.stringify(uniqueId)}, {`,
  `    name = ${JSON.stringify(name)},`,
  `    model = ${JSON.stringify(model)},`,
  `    chance = ${chance},`,
  `    chanceTime = ${chanceTime},`,
  '    skillRequirements = {',
  `        strength = ${strength},`,
  `        luck = ${luck},`,
  `        luckChance = ${luckChance},`,
  '    },',
  `    openingSound = ${JSON.stringify(openingSound)},`,
  '    items = {'
  ];

  if (tiers.length === 0) {
    lines.push('        -- Add tiers via generator UI');
  } else {
    for (const t of tiers) {
      lines.push(`        [${JSON.stringify(t.tname)}] = {`);
      lines.push(`            items = {${t.items.map(i => JSON.stringify(i)).join(', ')}},`);
      lines.push(`            chance = ${t.tch},`);
      lines.push('        },');
    }
    if (lines[lines.length - 1] === '        },') {
      lines[lines.length - 1] = '        }';
    }
  }

  lines.push('    }');
  lines.push('})');

  const code = `${lines.join('\n')}\n`;
  const outputBox = document.getElementById('output-code');
  if (outputBox) outputBox.value = code;
}

function fillExampleLoot() {
  document.getElementById('loot-id').value = 'loot_cardboard_box';
  document.getElementById('loot-name').value = 'Cardboard Box';
  document.getElementById('loot-model').value = 'models/props_junk/cardboard_box001a.mdl';
  document.getElementById('loot-chance').value = '5';
  document.getElementById('loot-chancetime').value = '15';
  document.getElementById('loot-sound').value = 'doors/door_metal_thin_open1.wav';
  document.getElementById('sr-strength').value = '0';
  document.getElementById('sr-luck').value = '0';
  document.getElementById('sr-luckchance').value = '0';

  const list = document.getElementById('tier-list');
  list.innerHTML = '';
  addTierRow('Common', '55', 'civilianmale, civilianfemale');
  addTierRow('Uncommon', '22', 'civilprotection, resistancefighter, mod_swift');
  addTierRow('Rare', '15', 'combinesoldier, mod_fortified, mod_wardbound, mod_temper');
  addTierRow('Legendary', '8', 'combineelitepowerarmor, mod_regen');
  addTierRow('Unique', '0', '');
  generateLootCode();
}

document.addEventListener('DOMContentLoaded', () => {
  fillExampleLoot();
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

