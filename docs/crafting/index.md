# Advanced Crafting

Comprehensive crafting system featuring multiple crafting stations (forge, workbench), recipe-based crafting with time-based progress bars, attribute requirements and skill progression, tool dependencies, faction restrictions, knowledge system with recipe books, dynamic UI with progress tracking and cancellation, item consumption and output with randomized quantities, and automatic entity registration for crafting stations

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
            <small>Display name shown to players for this crafting station.</small>
          </div>
        </div>

        <div class="input-group">
          <label for="station-model">Model:</label>
          <input type="text" id="station-model" placeholder="models/props_c17/FurnitureStove001a.mdl" value="models/props_c17/FurnitureStove001a.mdl" oninput="generateCraftStationCode()">
          <small>World model used by the spawned crafting station entity.</small>
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
            <small>Which station this recipe belongs to (must match a generated station ID).</small>
          </div>

          <div class="input-group">
            <label for="recipe-id">Recipe ID:</label>
            <input type="text" id="recipe-id" placeholder="e.g., iron_ingot" value="iron_ingot" oninput="generateCraftRecipeCode()">
            <small>Unique key for this recipe within the station.</small>
          </div>
        </div>

        <div class="input-group">
          <label for="recipe-name">Recipe Name:</label>
          <input type="text" id="recipe-name" placeholder="e.g., Iron Ingot" value="Iron Ingot" oninput="generateCraftRecipeCode()">
          <small>Display name shown in the crafting menu.</small>
        </div>
      </div>

      <div class="generator-section">
        <div class="form-grid-4">
          <div class="input-group">
            <label for="recipe-time">Craft Time:</label>
            <input type="number" id="recipe-time" min="0" value="10" oninput="generateCraftRecipeCode()">
            <small>Time in seconds required to craft this recipe.</small>
          </div>

          <div class="input-group">
            <label for="recipe-knowledge">Requires Knowledge:</label>
            <select id="recipe-knowledge" oninput="generateCraftRecipeCode()">
              <option value="false" selected>No</option>
              <option value="true">Yes</option>
            </select>
            <small>If enabled, this recipe requires knowledge to craft (module-defined meaning).</small>
          </div>

          <div class="input-group">
            <label for="recipe-reward">Crafting Reward:</label>
            <input type="number" id="recipe-reward" value="1" oninput="generateCraftRecipeCode()">
            <small>How much crafting progression/reward to grant on completion (module-defined meaning).</small>
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
          <small>Each row is one required tool item uniqueID.</small>
        </div>
        <div id="tools-list" class="dynamic-list"></div>
        <button type="button" class="add-btn" onclick="addToolRow()">Add Tool</button>

        <div class="input-group">
          <label>Attributes (optional):</label>
          <small>
            Each row becomes one entry in <code>attributes</code> (<code>[attribKey] = minimum</code>).
            <br>
            <b>Attribute</b>: character attribute key (e.g. <code>strength</code>).
            <br>
            <b>Minimum</b>: minimum value required.
          </small>
        </div>
        <div id="attribs-list" class="dynamic-list"></div>
        <button type="button" class="add-btn" onclick="addAttribRow()">Add Attribute</button>
      </div>

      <div class="generator-section">
        <div class="input-group">
          <label>Faction (optional):</label>
          <small>Each row is one faction constant (e.g., FACTION_CITIZEN). Use multiple rows for lists.</small>
        </div>
        <div id="recipe-factions-list" class="dynamic-list"></div>
        <button type="button" class="add-btn" onclick="addCraftFactionRow()">Add Faction</button>
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
function luaValueFromText(text) {
  const t = (text || '').trim();
  if (!t) return '';
  if (/^[A-Za-z_][A-Za-z0-9_]*$/.test(t)) return t;
  return JSON.stringify(t);
}

function setupLiveUpdate(generateFn) {
  if (typeof generateFn !== 'function') return;
  const root = document.querySelector('.generator-card.form-card') || document;
  const handler = () => generateFn();

  root.querySelectorAll('input, select, textarea').forEach(el => {
    el.addEventListener('input', handler);
    el.addEventListener('change', handler);
  });
}

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

function toolRowTemplate(tool) {
  return `
  <div class="dynamic-row tool-row">
    <input type="text" class="tool-item" placeholder="hammer" value="${tool || ''}" oninput="generateCraftRecipeCode()">
    <button type="button" class="remove-btn" onclick="removeToolRow(this)">×</button>
  </div>`;
}

function addToolRow(tool) {
  const list = document.getElementById('tools-list');
  if (!list) return;
  list.insertAdjacentHTML('beforeend', toolRowTemplate(tool));
  generateCraftRecipeCode();
}

function removeToolRow(btn) {
  const row = btn.closest('.tool-row');
  if (row) row.remove();
  generateCraftRecipeCode();
}

function attribRowTemplate(attrib, value) {
  return `
  <div class="dynamic-row attrib-row">
    <input type="text" class="attrib-key" placeholder="strength" value="${attrib || ''}" oninput="generateCraftRecipeCode()">
    <input type="number" class="attrib-min small-input" placeholder="0" min="0" value="${value ?? 0}" oninput="generateCraftRecipeCode()">
    <button type="button" class="remove-btn" onclick="removeAttribRow(this)">×</button>
  </div>`;
}

function addAttribRow(attrib, value) {
  const list = document.getElementById('attribs-list');
  if (!list) return;
  list.insertAdjacentHTML('beforeend', attribRowTemplate(attrib, value));
  generateCraftRecipeCode();
}

function removeAttribRow(btn) {
  const row = btn.closest('.attrib-row');
  if (row) row.remove();
  generateCraftRecipeCode();
}

function craftFactionRowTemplate(faction) {
  return `
  <div class="dynamic-row craft-faction-row">
    <input type="text" class="craft-faction-item" placeholder="FACTION_CITIZEN" value="${faction || ''}" oninput="generateCraftRecipeCode()">
    <button type="button" class="remove-btn" onclick="removeCraftFactionRow(this)">×</button>
  </div>`;
}

function addCraftFactionRow(faction) {
  const list = document.getElementById('recipe-factions-list');
  if (!list) return;
  list.insertAdjacentHTML('beforeend', craftFactionRowTemplate(faction));
  generateCraftRecipeCode();
}

function removeCraftFactionRow(btn) {
  const row = btn.closest('.craft-faction-row');
  if (row) row.remove();
  generateCraftRecipeCode();
}

function generateCraftStationCode() {
  const stationId = (document.getElementById('station-id').value || '').trim() || 'station';
  const stationName = (document.getElementById('station-name').value || '').trim() || 'Station';
  const stationModel = (document.getElementById('station-model').value || '').trim() || 'models/props_c17/FurnitureTable001a.mdl';

  const lines = [
  '-- Copy and paste this code into a shared file loaded by the crafting module',
  '-- Example: garrysmod/gamemodes/[schema folder]/modules/crafting/libraries/shared.lua',
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

function generateCraftRecipeCode() {
  const stationId = (document.getElementById('recipe-station').value || '').trim() || 'station';
  const recipeId = (document.getElementById('recipe-id').value || '').trim() || 'recipe';
  const recipeName = (document.getElementById('recipe-name').value || '').trim() || 'Recipe';

  const craftTime = document.getElementById('recipe-time').value || '0';
  const requiresKnowledge = document.getElementById('recipe-knowledge').value;
  const craftingReward = document.getElementById('recipe-reward').value || '0';

  const factionRows = Array.from(document.querySelectorAll('#recipe-factions-list .craft-faction-row'));
  const factions = [];
  for (const row of factionRows) {
    const faction = (row.querySelector('.craft-faction-item').value || '').trim();
    if (!faction) continue;
    factions.push(faction);
  }

  const toolRows = Array.from(document.querySelectorAll('#tools-list .tool-row'));
  const tools = [];
  for (const row of toolRows) {
    const toolID = (row.querySelector('.tool-item').value || '').trim();
    if (!toolID) continue;
    tools.push(toolID);
  }

  const attribRows = Array.from(document.querySelectorAll('#attribs-list .attrib-row'));
  const attribs = [];
  for (const row of attribRows) {
    const key = (row.querySelector('.attrib-key').value || '').trim();
    const val = (row.querySelector('.attrib-min').value || '').trim();
    if (!key) continue;
    attribs.push({
      key,
      val: val === '' ? 0 : Number(val)
    });
  }

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
  '-- Example: garrysmod/gamemodes/[schema folder]/modules/crafting/libraries/shared.lua',
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

  if (factions.length > 0) {
    const factionLuaValues = factions.map(luaValueFromText).filter(Boolean);
    if (factionLuaValues.length === 0) {
      // no-op
    } else if (factionLuaValues.length === 1) {
      lines.push(`        faction = ${factionLuaValues[0]},`);
    } else {
      lines.push(`        faction = {${factionLuaValues.join(', ')}},`);
    }
  }

  if (tools.length > 0) {
    lines.push(`        tools = {${tools.map(t => JSON.stringify(t)).join(', ')}},`);
  }

  if (attribs.length > 0) {
    lines.push('        attributes = {');
    for (const a of attribs) {
      lines.push(`            [${JSON.stringify(a.key)}] = ${a.val},`);
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

  const factionsList = document.getElementById('recipe-factions-list');
  if (factionsList) factionsList.innerHTML = '';

  const toolsList = document.getElementById('tools-list');
  if (toolsList) toolsList.innerHTML = '';
  const attribsList = document.getElementById('attribs-list');
  if (attribsList) attribsList.innerHTML = '';

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
  const toolsList = document.getElementById('tools-list');
  if (toolsList) toolsList.innerHTML = '';
  const attribsList = document.getElementById('attribs-list');
  if (attribsList) attribsList.innerHTML = '';
  const factionsList = document.getElementById('recipe-factions-list');
  if (factionsList) factionsList.innerHTML = '';
  addReqRow('iron_ore', '1');
  addOutRow('iron_ingot', '1');
  setupLiveUpdate(() => {
    const recipePanel = document.getElementById('craft-panel-recipe');
    if (recipePanel && recipePanel.style.display !== 'none') {
      generateCraftRecipeCode();
    } else {
      generateCraftStationCode();
    }
  });
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


---

## Video Demo

<video controls width="100%" style="width: 100%;">
  <source src="https://bleonheart.github.io/assets/crafting.mp4" type="video/mp4">
  Your browser does not support the video tag.
</video>
