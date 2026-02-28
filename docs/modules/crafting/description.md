# Description

Recipe-based crafting system with crafting stations (forge, workbench), time-based progress, attribute requirements, tool dependencies, and faction restrictions

---

## Generator

<div class="generator-grid">
  <!-- Input Column -->
  <div class="generator-card form-card">
    <div class="generator-section">
      <div class="form-grid-2">
        <button id="craft-tab-station" onclick="showCraftTab('station')" class="generate-btn">Station Generator</button>
        <button id="craft-tab-recipe" onclick="showCraftTab('recipe')" class="generate-btn example-btn">Recipe Generator</button>
      </div>
    </div>

    <div id="craft-panel-station">
      <div class="generator-section">
        <div class="form-grid-2">
          <div class="input-group">
            <label for="station-id">Station ID:</label>
            <input type="text" id="station-id" placeholder="e.g., forge" value="forge" oninput="generateCraftStationCode()">
            <small>Used as the station key and to generate entity class lia_craftingstation_&lt;id&gt;</small>
          </div>

          <div class="input-group">
            <label for="station-name">Station Name:</label>
            <input type="text" id="station-name" placeholder="e.g., Forge" value="Forge" oninput="generateCraftStationCode()">
          </div>
        </div>

        <div class="input-group">
          <label for="station-model">Model:</label>
          <input type="text" id="station-model" placeholder="models/props_c17/FurnitureStove001a.mdl" value="models/props_c17/FurnitureStove001a.mdl" oninput="generateCraftStationCode()">
        </div>
      </div>

      <div class="button-group">
        <button onclick="generateCraftStationCode()" class="generate-btn">Generate Station Code</button>
        <button onclick="fillExampleCraftStation()" class="generate-btn example-btn">Generate Example</button>
      </div>
    </div>

    <div id="craft-panel-recipe" style="display: none;">
      <div class="generator-section">
        <div class="form-grid-2">
          <div class="input-group">
            <label for="recipe-station">Station ID:</label>
            <input type="text" id="recipe-station" placeholder="e.g., forge" value="forge" oninput="generateCraftRecipeCode()">
          </div>

          <div class="input-group">
            <label for="recipe-id">Recipe ID:</label>
            <input type="text" id="recipe-id" placeholder="e.g., iron_ingot" value="iron_ingot" oninput="generateCraftRecipeCode()">
          </div>
        </div>

        <div class="input-group">
          <label for="recipe-name">Recipe Name:</label>
          <input type="text" id="recipe-name" placeholder="e.g., Iron Ingot" value="Iron Ingot" oninput="generateCraftRecipeCode()">
        </div>
      </div>

      <div class="generator-section">
        <div class="form-grid-4">
          <div class="input-group">
            <label for="recipe-time">Craft Time:</label>
            <input type="number" id="recipe-time" min="0" value="10" oninput="generateCraftRecipeCode()">
          </div>

          <div class="input-group">
            <label for="recipe-knowledge">Requires Knowledge:</label>
            <select id="recipe-knowledge" oninput="generateCraftRecipeCode()">
              <option value="false" selected>false</option>
              <option value="true">true</option>
            </select>
          </div>

          <div class="input-group">
            <label for="recipe-reward">Crafting Reward:</label>
            <input type="number" id="recipe-reward" value="1" oninput="generateCraftRecipeCode()">
          </div>

          <div class="input-group">
            <label for="recipe-faction">Faction (optional):</label>
            <input type="text" id="recipe-faction" placeholder="FACTION_BLACKSMITH or {FACTION_A, FACTION_B}" value="" oninput="generateCraftRecipeCode()">
          </div>
        </div>
      </div>

      <div class="generator-section">
        <div class="input-group">
          <label>Requirements:</label>
          <small>Item uniqueID and amount.</small>
        </div>
        <div id="req-list" class="dynamic-list"></div>
        <button type="button" class="add-btn" onclick="addReqRow()">Add Requirement</button>
      </div>

      <div class="generator-section">
        <div class="input-group">
          <label>Output:</label>
          <small>Amount can be a number (1) or range ({2, 4}).</small>
        </div>
        <div id="out-list" class="dynamic-list"></div>
        <button type="button" class="add-btn" onclick="addOutRow()">Add Output</button>
      </div>

      <div class="generator-section">
        <div class="input-group">
          <label>Tools (optional):</label>
          <small>Comma-separated list of tool item uniqueIDs.</small>
        </div>
        <div class="input-group">
          <input type="text" id="recipe-tools" placeholder="hammer, wrench" value="" oninput="generateCraftRecipeCode()">
        </div>

        <div class="input-group">
          <label>Attributes (optional):</label>
          <small>Format: attrib=minimum,attrib2=minimum</small>
        </div>
        <div class="input-group">
          <input type="text" id="recipe-attribs" placeholder="strength=5,crafting=2" value="" oninput="generateCraftRecipeCode()">
        </div>
      </div>

      <div class="button-group">
        <button onclick="generateCraftRecipeCode()" class="generate-btn">Generate Recipe Code</button>
        <button onclick="fillExampleCraftRecipe()" class="generate-btn example-btn">Generate Example</button>
      </div>
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
function showCraftTab(which) {
  const sPanel = document.getElementById('craft-panel-station');
  const rPanel = document.getElementById('craft-panel-recipe');

  if (which === 'recipe') {
    sPanel.style.display = 'none';
    rPanel.style.display = 'block';
    generateCraftRecipeCode();
  } else {
    sPanel.style.display = 'block';
    rPanel.style.display = 'none';
    generateCraftStationCode();
  }
}

function pairRowTemplate(clsItem, clsAmt, item, amt) {
  return `
  <div class="dynamic-row">
    <input type="text" class="${clsItem}" placeholder="item_uniqueid" value="${item || ''}" oninput="generateCraftRecipeCode()">
    <input type="text" class="${clsAmt} small-input" placeholder="1" value="${amt || ''}" oninput="generateCraftRecipeCode()">
    <button type="button" class="remove-btn" onclick="removePairRow(this)">×</button>
  </div>`;
}

function addReqRow(item, amt) {
  const list = document.getElementById('req-list');
  list.insertAdjacentHTML('beforeend', pairRowTemplate('req-item', 'req-amt', item, amt));
  generateCraftRecipeCode();
}

function addOutRow(item, amt) {
  const list = document.getElementById('out-list');
  list.insertAdjacentHTML('beforeend', pairRowTemplate('out-item', 'out-amt', item, amt));
  generateCraftRecipeCode();
}

function removePairRow(btn) {
  const row = btn.closest('.dynamic-row');
  if (row) row.remove();
  generateCraftRecipeCode();
}

function generateCraftStationCode() {
  const stationId = (document.getElementById('station-id').value || '').trim() || 'station';
  const stationName = (document.getElementById('station-name').value || '').trim() || 'Station';
  const stationModel = (document.getElementById('station-model').value || '').trim() || 'models/props_c17/FurnitureTable001a.mdl';

  const lines = [
  '-- Copy and paste this code into a shared file loaded by the crafting module',
  '-- Example: garrysmod/gamemodes/[schema folder]/modules/done/crafting/libraries/shared.lua',
  '',
  `lia.crafting.generateCraftingTable(${JSON.stringify(stationId)}, {`,
  `    name = ${JSON.stringify(stationName)},`,
  `    model = ${JSON.stringify(stationModel)}`,
  '})'
  ];

  const code = `${lines.join('\n')}\n`;
  const outputBox = document.getElementById('output-code');
  if (outputBox) outputBox.value = code;
}

function fillExampleCraftStation() {
  document.getElementById('station-id').value = 'workbench';
  document.getElementById('station-name').value = 'Workbench';
  document.getElementById('station-model').value = 'models/props_c17/FurnitureTable001a.mdl';
  generateCraftStationCode();
}

function parseAttribs(text) {
  const out = [];
  if (!text) return out;
  const parts = text.split(',').map(p => p.trim()).filter(Boolean);
  for (const p of parts) {
    const m = p.split('=').map(x => x.trim());
    if (m.length !== 2) continue;
    const key = m[0];
    const val = m[1];
    if (!key || !val) continue;
    out.push({ key, val });
  }
  return out;
}

function generateCraftRecipeCode() {
  const stationId = (document.getElementById('recipe-station').value || '').trim() || 'station';
  const recipeId = (document.getElementById('recipe-id').value || '').trim() || 'recipe';
  const recipeName = (document.getElementById('recipe-name').value || '').trim() || 'Recipe';

  const craftTime = document.getElementById('recipe-time').value || '0';
  const requiresKnowledge = document.getElementById('recipe-knowledge').value;
  const craftingReward = document.getElementById('recipe-reward').value || '0';
  const faction = (document.getElementById('recipe-faction').value || '').trim();

  const toolsText = (document.getElementById('recipe-tools').value || '').trim();
  const tools = toolsText ? toolsText.split(',').map(t => t.trim()).filter(Boolean) : [];

  const attribsText = (document.getElementById('recipe-attribs').value || '').trim();
  const attribs = parseAttribs(attribsText);

  const reqRows = Array.from(document.querySelectorAll('#req-list .dynamic-row'));
  const requirements = [];
  for (const row of reqRows) {
    const item = (row.querySelector('.req-item').value || '').trim();
    const amt = (row.querySelector('.req-amt').value || '').trim() || '1';
    if (!item) continue;
    requirements.push({ item, amt });
  }

  const outRows = Array.from(document.querySelectorAll('#out-list .dynamic-row'));
  const outputs = [];
  for (const row of outRows) {
    const item = (row.querySelector('.out-item').value || '').trim();
    const amt = (row.querySelector('.out-amt').value || '').trim() || '1';
    if (!item) continue;
    outputs.push({ item, amt });
  }

  const lines = [
  '-- Copy and paste this code into a shared file loaded by the crafting module',
  '-- Example: garrysmod/gamemodes/[schema folder]/modules/done/crafting/libraries/shared.lua',
  '',
  `lia.crafting.generateCraftingRecipe(${JSON.stringify(stationId)}, {`,
  `    [${JSON.stringify(recipeId)}] = {`,
  `        name = ${JSON.stringify(recipeName)},`,
  '        requirements = {'
  ];

  if (requirements.length === 0) {
    lines.push('            -- Add requirements via generator UI');
  } else {
    for (const r of requirements) {
      lines.push(`            ${r.item} = ${r.amt},`);
    }
    if (lines[lines.length - 1].endsWith(',')) {
      lines[lines.length - 1] = lines[lines.length - 1].slice(0, -1);
    }
  }

  lines.push('        },');
  lines.push('        output = {');

  if (outputs.length === 0) {
    lines.push('            -- Add outputs via generator UI');
  } else {
    for (const o of outputs) {
      lines.push(`            ${o.item} = ${o.amt},`);
    }
    if (lines[lines.length - 1].endsWith(',')) {
      lines[lines.length - 1] = lines[lines.length - 1].slice(0, -1);
    }
  }

  lines.push('        },');
  lines.push(`        craftTime = ${craftTime},`);
  lines.push(`        requiresKnowledge = ${requiresKnowledge},`);
  lines.push(`        craftingReward = ${craftingReward},`);

  if (faction) {
    lines.push(`        faction = ${faction},`);
  }

  if (tools.length > 0) {
    lines.push(`        tools = {${tools.map(t => JSON.stringify(t)).join(', ')}},`);
  }

  if (attribs.length > 0) {
    lines.push('        attributes = {');
    for (const a of attribs) {
      lines.push(`            ${a.key} = ${a.val},`);
    }
    if (lines[lines.length - 1].endsWith(',')) {
      lines[lines.length - 1] = lines[lines.length - 1].slice(0, -1);
    }
    lines.push('        },');
  }

  // Strip trailing comma if the last config line ends with one
  if (lines[lines.length - 1].endsWith(',')) {
    lines[lines.length - 1] = lines[lines.length - 1].slice(0, -1);
  }

  lines.push('    }');
  lines.push('})');

  const code = `${lines.join('\n')}\n`;
  const outputBox = document.getElementById('output-code');
  if (outputBox) outputBox.value = code;
}

function fillExampleCraftRecipe() {
  document.getElementById('recipe-station').value = 'forge';
  document.getElementById('recipe-id').value = 'iron_ingot';
  document.getElementById('recipe-name').value = 'Iron Ingot';
  document.getElementById('recipe-time').value = '10';
  document.getElementById('recipe-knowledge').value = 'false';
  document.getElementById('recipe-reward').value = '1';
  document.getElementById('recipe-faction').value = '';
  document.getElementById('recipe-tools').value = '';
  document.getElementById('recipe-attribs').value = '';

  document.getElementById('req-list').innerHTML = '';
  document.getElementById('out-list').innerHTML = '';
  addReqRow('iron_ore', '1');
  addOutRow('iron_ingot', '1');
  generateCraftRecipeCode();
}

document.addEventListener('DOMContentLoaded', () => {
  showCraftTab('station');
  // Seed some rows for recipe tab so it isn't empty when switched
  document.getElementById('req-list').innerHTML = '';
  document.getElementById('out-list').innerHTML = '';
  addReqRow('iron_ore', '1');
  addOutRow('iron_ingot', '1');
});
</script>
