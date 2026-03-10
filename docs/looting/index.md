# Interactive Looting

A comprehensive looting system that creates searchable container entities throughout the world. Features dynamic entity registration, skill-based access requirements (strength/luck attributes), multi-tiered rarity system (Common/Uncommon/Rare/Legendary/Unique) with weighted probability distribution, intelligent reward allocation with inventory management, customizable container types (cardboard boxes, crates, barrels, lockers, safes), cooldown timers for respawn prevention, audio feedback systems, and seamless integration with the Lilia framework

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
          <small>Unique identifier passed to <code>lia.loot.registerLoot</code>.</small>
        </div>

        <div class="input-group">
          <label for="loot-name">Name:</label>
          <input type="text" id="loot-name" placeholder="e.g., Cardboard Box" value="Cardboard Box" oninput="generateLootCode()">
          <small>Shown to players for this loot container type.</small>
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
          <small>Played when the container is opened/searched.</small>
        </div>
      </div>
    </div>

    <div class="generator-section">
      <div class="form-grid-4">
        <div class="input-group">
          <label for="loot-chance">Chance:</label>
          <input type="number" id="loot-chance" min="0" value="5" oninput="generateLootCode()">
          <small>Base chance value used by the looting system (module-defined meaning; commonly treated as a percent or weight).</small>
        </div>

        <div class="input-group">
          <label for="loot-chancetime">Chance Time:</label>
          <input type="number" id="loot-chancetime" min="0" value="15" oninput="generateLootCode()">
          <small>Additional timing/chance configuration used by the module (schema/module-defined; keep consistent with other loot definitions).</small>
        </div>
      </div>
    </div>

    <div class="generator-section">
      <div class="input-group">
        <label>Attributes Requirements:</label>
        <small>
          Each row becomes one entry in <code>skillRequirements</code> (<code>[attribKey] = requiredValue</code>).
          <br>
          <b>Attribute</b>: character attribute key (e.g. <code>strength</code>, <code>luck</code>).
          <br>
          <b>Required</b>: minimum value required to search this container.
        </small>
      </div>

      <div id="attr-list" class="dynamic-list"></div>
      <button type="button" class="add-btn" onclick="addLootAttribRow()">Add Attribute</button>
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

function tierItemRowTemplate(item) {
  return `
    <div class="dynamic-row tier-item-row">
      <input type="text" class="tier-item" placeholder="item_uniqueid" value="${item || ''}" oninput="generateLootCode()">
      <button type="button" class="remove-btn" onclick="removeTierItemRow(this)">×</button>
    </div>`;
}

function tierBlockTemplate(idx, tierName, chance) {
  return `
  <div class="dynamic-row tier-block" data-idx="${idx}">
    <div class="form-grid-3">
      <div class="input-group">
        <label>Tier Name:</label>
        <input type="text" class="tier-name" placeholder="Common" value="${tierName || ''}" oninput="generateLootCode()">
      </div>

      <div class="input-group">
        <label>Chance:</label>
        <input type="number" class="tier-chance" placeholder="55" min="0" max="100" value="${chance || '0'}" oninput="generateLootCode()">
      </div>

      <div class="input-group">
        <label>Actions:</label>
        <button type="button" class="remove-btn" onclick="removeTierRow(this)">×</button>
      </div>
    </div>

    <div class="generator-section">
      <div class="input-group">
        <label>Tier Items:</label>
        <small>Add item uniqueIDs for this tier.</small>
      </div>

      <div class="tier-items-list dynamic-list"></div>
      <button type="button" class="add-btn" onclick="addTierItemRow(this)">Add Item</button>
    </div>
  </div>`;
}

function addTierRow(tierName, chance, items) {
  const list = document.getElementById('tier-list');
  const idx = list.children.length;
  list.insertAdjacentHTML('beforeend', tierBlockTemplate(idx, tierName, chance));

  const blocks = list.querySelectorAll('.tier-block');
  const block = blocks[blocks.length - 1];
  const itemsList = block.querySelector('.tier-items-list');
  itemsList.innerHTML = '';
  const safeItems = Array.isArray(items) ? items : [];
  if (safeItems.length === 0) {
    itemsList.insertAdjacentHTML('beforeend', tierItemRowTemplate(''));
  } else {
    for (const it of safeItems) {
      itemsList.insertAdjacentHTML('beforeend', tierItemRowTemplate(it));
    }
  }

  generateLootCode();
}

function removeTierRow(btn) {
  const row = btn.closest('.tier-block');
  if (row) row.remove();
  generateLootCode();
}

function addTierItemRow(btnOrBlock, item) {
  const block = btnOrBlock.closest ? btnOrBlock.closest('.tier-block') : btnOrBlock;
  if (!block) return;
  const list = block.querySelector('.tier-items-list');
  if (!list) return;
  list.insertAdjacentHTML('beforeend', tierItemRowTemplate(item || ''));
  generateLootCode();
}

function removeTierItemRow(btn) {
  const row = btn.closest('.tier-item-row');
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

  const rows = Array.from(document.querySelectorAll('#tier-list .tier-block'));
  const tiers = [];
  for (const row of rows) {
    const tname = (row.querySelector('.tier-name').value || '').trim();
    const tch = (row.querySelector('.tier-chance').value || '').trim() || '0';
    const itemRows = Array.from(row.querySelectorAll('.tier-items-list .tier-item-row'));
    const items = [];
    for (const ir of itemRows) {
      const it = (ir.querySelector('.tier-item').value || '').trim();
      if (!it) continue;
      items.push(it);
    }
    if (!tname) continue;
    tiers.push({ tname, tch, items });
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

  const attrList = document.getElementById('attr-list');
  if (attrList) {
    attrList.innerHTML = '';
    addLootAttribRow('strength', 0);
  }

  const list = document.getElementById('tier-list');
  list.innerHTML = '';
  addTierRow('Common', '55', ['civilianmale', 'civilianfemale']);
  addTierRow('Uncommon', '22', ['civilprotection', 'resistancefighter', 'mod_swift']);
  addTierRow('Rare', '15', ['combinesoldier', 'mod_fortified', 'mod_wardbound', 'mod_temper']);
  addTierRow('Legendary', '8', ['combineelitepowerarmor', 'mod_regen']);
  addTierRow('Unique', '0', []);
  generateLootCode();
}

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

