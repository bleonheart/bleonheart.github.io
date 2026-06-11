# Interactive Looting

Lootable container system with two-panel UI. Containers generate flat item tables on chance roll. Players pick up or deposit items one at a time. Container resets timer when fully depleted.

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
          <small>Unique identifier passed to <code>lia.loot.registerLoot</code>. Becomes the entity class name.</small>
        </div>

        <div class="input-group">
          <label for="loot-name">Name:</label>
          <input type="text" id="loot-name" placeholder="e.g., Cardboard Box" value="Cardboard Box" oninput="generateLootCode()">
          <small>Display name shown to players for this loot container type.</small>
        </div>
      </div>

      <div class="form-grid-2">
        <div class="input-group">
          <label for="loot-model">Model:</label>
          <input type="text" id="loot-model" placeholder="models/props_junk/cardboard_box001a.mdl" value="models/props_junk/cardboard_box001a.mdl" oninput="generateLootCode()">
          <small>World model for the loot container entity.</small>
        </div>

        <div class="input-group">
          <label for="loot-sound">Opening Sound:</label>
          <input type="text" id="loot-sound" placeholder="doors/door_metal_thin_open1.wav" value="doors/door_metal_thin_open1.wav" oninput="generateLootCode()">
          <small>Sound played when the container is opened/searched.</small>
        </div>
      </div>
    </div>

    <div class="generator-section">
      <div class="form-grid-3">
        <div class="input-group">
          <label for="loot-chance">Chance:</label>
          <input type="number" id="loot-chance" min="0" value="5" oninput="generateLootCode()">
          <small>Spawn chance weight. Used when the module auto-spawns loot containers.</small>
        </div>

        <div class="input-group">
          <label for="loot-chancetime">Chance Time (seconds):</label>
          <input type="number" id="loot-chancetime" min="0" value="15" oninput="generateLootCode()">
          <small>Interval between spawn chance checks.</small>
        </div>

        <div class="input-group">
          <label for="loot-maxitems">Max Items:</label>
          <input type="number" id="loot-maxitems" min="1" value="6" oninput="generateLootCode()">
          <small>Maximum number of item stacks the container can hold.</small>
        </div>
      </div>
    </div>

    <div class="generator-section">
      <div class="form-grid-2">
        <div class="input-group">
          <label for="loot-postraid">Post-Raid Only:</label>
          <select id="loot-postraid" oninput="generateLootCode()">
            <option value="false" selected>No</option>
            <option value="true">Yes</option>
          </select>
          <small>If enabled, this container only spawns during post-raid events.</small>
        </div>
      </div>
    </div>

    <div class="generator-section">
      <div class="input-group">
        <label>Skill Requirements:</label>
        <small>
          Each row becomes one entry in <code>skillRequirements</code> (<code>[attribKey] = minimumValue</code>).
          <br>
          <b>Attribute</b>: character attribute key (e.g. <code>strength</code>, <code>luck</code>).
          <br>
          <b>Minimum</b>: minimum value required to search this container.
        </small>
      </div>

      <div id="attr-list" class="dynamic-list"></div>
      <button type="button" class="add-btn" onclick="addLootAttribRow()">Add Skill Requirement</button>
    </div>

    <div class="generator-section">
      <div class="input-group">
        <label>Items (Loot Table):</label>
        <small>
          Each row becomes one entry in <code>items</code> (<code>[itemID] = { min = X, max = Y, chance = Z }</code>).
          <br>
          <b>Item</b>: the item unique ID that can spawn (e.g. <code>iron_ore</code>).
          <br>
          <b>Min</b>/<b>Max</b>: random quantity range (inclusive).
          <br>
          <b>Chance</b>: percent chance (0-100) for this item to be selected per roll.
        </small>
      </div>

      <div id="loot-items-list" class="dynamic-list"></div>
      <button type="button" class="add-btn" onclick="addLootItemRow()">Add Loot Item</button>
    </div>

    <div class="generator-section">
      <div class="input-group">
        <label>Fixed Contents (optional):</label>
        <small>
          Items that are always present in the container (bypasses chance roll).
          Each row is <code>[itemID] = amount</code>.
        </small>
      </div>

      <div id="fixed-list" class="dynamic-list"></div>
      <button type="button" class="add-btn" onclick="addFixedRow()">Add Fixed Item</button>
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
function setupLiveUpdate(generateFn) {
  if (typeof generateFn !== 'function') return;
  const root = document.querySelector('.generator-card.form-card') || document;
  const handler = () => generateFn();

  root.querySelectorAll('input, select, textarea').forEach(el => {
    el.addEventListener('input', handler);
    el.addEventListener('change', handler);
  });
}

function lootAttribRowTemplate(attrib, value) {
  return `
    <div class="dynamic-row loot-attrib-row">
      <input type="text" class="loot-attrib-key" placeholder="strength" value="${attrib || ''}" oninput="generateLootCode()">
      <input type="number" class="loot-attrib-value small-input" placeholder="0" min="0" value="${value ?? 0}" oninput="generateLootCode()">
      <button type="button" class="remove-btn" onclick="removeLootAttribRow(this)">×</button>
    </div>`;
}

function addLootAttribRow(attrib, value) {
  const list = document.getElementById('attr-list');
  if (!list) return;
  list.insertAdjacentHTML('beforeend', lootAttribRowTemplate(attrib, value));
  generateLootCode();
}

function removeLootAttribRow(btn) {
  const row = btn.closest('.loot-attrib-row');
  if (row) row.remove();
  generateLootCode();
}

function lootItemRowTemplate(item, min, max, chance) {
  return `
    <div class="dynamic-row loot-item-row">
      <input type="text" class="loot-item-id" placeholder="item_uniqueid" value="${item || ''}" oninput="generateLootCode()">
      <input type="number" class="loot-item-min small-input" placeholder="1" min="0" value="${min ?? 0}" oninput="generateLootCode()">
      <input type="number" class="loot-item-max small-input" placeholder="2" min="0" value="${max ?? 0}" oninput="generateLootCode()">
      <input type="number" class="loot-item-chance small-input" placeholder="50" min="0" max="100" value="${chance ?? 50}" oninput="generateLootCode()">
      <button type="button" class="remove-btn" onclick="removeLootItemRow(this)">×</button>
    </div>`;
}

function addLootItemRow(item, min, max, chance) {
  const list = document.getElementById('loot-items-list');
  if (!list) return;
  list.insertAdjacentHTML('beforeend', lootItemRowTemplate(item, min, max, chance));
  generateLootCode();
}

function removeLootItemRow(btn) {
  const row = btn.closest('.loot-item-row');
  if (row) row.remove();
  generateLootCode();
}

function fixedRowTemplate(item, amt) {
  return `
    <div class="dynamic-row fixed-row">
      <input type="text" class="fixed-item" placeholder="item_uniqueid" value="${item || ''}" oninput="generateLootCode()">
      <input type="number" class="fixed-amt small-input" placeholder="1" min="1" value="${amt ?? 1}" oninput="generateLootCode()">
      <button type="button" class="remove-btn" onclick="removeFixedRow(this)">×</button>
    </div>`;
}

function addFixedRow(item, amt) {
  const list = document.getElementById('fixed-list');
  if (!list) return;
  list.insertAdjacentHTML('beforeend', fixedRowTemplate(item, amt));
  generateLootCode();
}

function removeFixedRow(btn) {
  const row = btn.closest('.fixed-row');
  if (row) row.remove();
  generateLootCode();
}

function generateLootCode() {
  const uniqueId = (document.getElementById('loot-id').value || '').trim() || 'loot_example';
  const name = (document.getElementById('loot-name').value || '').trim() || 'Loot Container';
  const model = (document.getElementById('loot-model').value || '').trim() || 'models/props_junk/cardboard_box001a.mdl';
  const chance = document.getElementById('loot-chance').value || '5';
  const chanceTime = document.getElementById('loot-chancetime').value || '15';
  const maxItems = document.getElementById('loot-maxitems').value || '6';
  const postRaid = document.getElementById('loot-postraid').value;
  const openingSound = (document.getElementById('loot-sound').value || '').trim() || 'doors/door_metal_thin_open1.wav';

  const attribRows = Array.from(document.querySelectorAll('#attr-list .loot-attrib-row'));
  const attribs = [];
  for (const row of attribRows) {
    const key = (row.querySelector('.loot-attrib-key').value || '').trim();
    const value = (row.querySelector('.loot-attrib-value').value || '').trim();
    if (!key) continue;
    attribs.push({
      key,
      value: value === '' ? 0 : Number(value)
    });
  }

  const itemRows = Array.from(document.querySelectorAll('#loot-items-list .loot-item-row'));
  const items = [];
  for (const row of itemRows) {
    const item = (row.querySelector('.loot-item-id').value || '').trim();
    const min = (row.querySelector('.loot-item-min').value || '').trim();
    const max = (row.querySelector('.loot-item-max').value || '').trim();
    const ch = (row.querySelector('.loot-item-chance').value || '').trim();
    if (!item) continue;
    items.push({
      item,
      min: min === '' ? 0 : Number(min),
      max: max === '' ? 0 : Number(max),
      chance: ch === '' ? 0 : Number(ch)
    });
  }

  const fixedRows = Array.from(document.querySelectorAll('#fixed-list .fixed-row'));
  const fixedContents = [];
  for (const row of fixedRows) {
    const item = (row.querySelector('.fixed-item').value || '').trim();
    const amt = (row.querySelector('.fixed-amt').value || '').trim();
    if (!item) continue;
    fixedContents.push({
      item,
      amt: amt === '' ? 1 : Number(amt)
    });
  }

  const lines = [
  '-- Copy and paste this code into the module definitions file',
  '-- Example: garrysmod/gamemodes/[schema folder]/modules/looting/definitions.lua',
  '',
  `lia.loot.registerLoot(${JSON.stringify(uniqueId)}, {`,
  `    name = ${JSON.stringify(name)},`,
  `    model = ${JSON.stringify(model)},`,
  `    chance = ${chance},`,
  `    chanceTime = ${chanceTime},`,
  `    maxItems = ${maxItems},`,
  '    skillRequirements = {'
  ];

  if (attribs.length > 0) {
    for (const a of attribs) {
      lines.push(`        [${JSON.stringify(a.key)}] = ${a.value},`);
    }
    if (lines[lines.length - 1].endsWith(',')) {
      lines[lines.length - 1] = lines[lines.length - 1].slice(0, -1);
    }
  }

  lines.push('    },');

  lines.push(`    openingSound = ${JSON.stringify(openingSound)},`);

  lines.push('    items = {');
  if (items.length === 0) {
    lines.push('        -- Add loot items via generator UI');
  } else {
    for (const it of items) {
      lines.push(`        [${JSON.stringify(it.item)}] = {`);
      lines.push(`            min = ${it.min},`);
      lines.push(`            max = ${it.max},`);
      lines.push(`            chance = ${it.chance}`);
      lines.push('        },');
    }
    if (lines[lines.length - 1] === '        },') {
      lines[lines.length - 1] = '        }';
    }
  }
  lines.push('    },');

  if (fixedContents.length > 0) {
    lines.push('    fixedContents = {');
    for (const fc of fixedContents) {
      lines.push(`        [${JSON.stringify(fc.item)}] = ${fc.amt},`);
    }
    if (lines[lines.length - 1].endsWith(',')) {
      lines[lines.length - 1] = lines[lines.length - 1].slice(0, -1);
    }
    lines.push('    },');

    if (postRaid === 'true') {
      lines.push(`    postRaid = true`);
    }
  } else {
    if (postRaid === 'true') {
      lines.push(`    postRaid = true`);
    }
  }

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
  document.getElementById('loot-maxitems').value = '6';
  document.getElementById('loot-postraid').value = 'false';
  document.getElementById('loot-sound').value = 'doors/door_metal_thin_open1.wav';

  const attrList = document.getElementById('attr-list');
  if (attrList) {
    attrList.innerHTML = '';
    addLootAttribRow('strength', 0);
    addLootAttribRow('luck', 0);
  }

  const itemsList = document.getElementById('loot-items-list');
  if (itemsList) {
    itemsList.innerHTML = '';
    addLootItemRow('iron_ore', 1, 3, 80);
    addLootItemRow('coal', 0, 2, 50);
    addLootItemRow('wood', 2, 5, 90);
  }

  const fixedList = document.getElementById('fixed-list');
  if (fixedList) {
    fixedList.innerHTML = '';
  }

  generateLootCode();
}

document.addEventListener('DOMContentLoaded', () => {
  setupLiveUpdate(generateLootCode);
  fillExampleLoot();
});
</script>

document.addEventListener('DOMContentLoaded', () => {
  setupLiveUpdate(generateLootCode);
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

<details class="realm-shared no-icon">
  <summary>Version 2.0</summary>
  <div class="details-content" style="margin-left: 20px;">
    <ul>
      <li>Two-panel loot UI, flat item table generation, deposit/withdraw interaction</li>
    </ul>
  </div>
</details>

