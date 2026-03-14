# Store Robbery

Comprehensive store robbery system featuring interactive jewelry cases and cash registers with timed robbery mechanics. Players can steal various valuable items including cash bundles (0-500 value), jewelry bags (100-300 value), gold watches (50-150 value), and diamond rings (200-500 value) with weighted probability drops. The system includes police requirements (minimum 1-2 officers), configurable respawn timers (15-30 minutes), cooldown states, inventory management, and faction blacklist support. Features visual feedback with entity information display, action progress bars, and success/failure notifications.

---

## Generator

<div class="generator-grid">
  <!-- Input Column -->
  <div class="generator-card form-card">
    <div class="generator-section">
      <h3>Robbery Location Generator</h3>
      <p>Create new robbery locations with configurable settings and faction restrictions.</p>
    </div>

    <div id="rob-panel-location">
      <div class="generator-section">
        <div class="form-grid-2">
          <div class="input-group">
            <label for="rob-loc-id">Entity Class:</label>
            <input type="text" id="rob-loc-id" placeholder="e.g., jewelry_case" value="jewelry_case" oninput="generateRobberyLocationCode()">
            <small>Used as the entity class name for <code>lia.robberies.registerEntity()</code> and becomes the spawned entity class.</small>
          </div>

          <div class="input-group">
            <label for="rob-loc-name">Name:</label>
            <input type="text" id="rob-loc-name" placeholder="e.g., Jewelry Case" value="Jewelry Case" oninput="generateRobberyLocationCode()">
            <small>Player-facing name shown for this robbery location/entity.</small>
          </div>
        </div>

        <div class="form-grid-2">
          <div class="input-group">
            <label for="rob-loc-model">Model:</label>
            <input type="text" id="rob-loc-model" placeholder="models/props_c17/briefcase001a.mdl" value="models/props_c17/briefcase001a.mdl" oninput="generateRobberyLocationCode()">
            <small>World model used by the robbery entity.</small>
          </div>

          <div class="input-group">
            <label for="rob-loc-police">Min Police:</label>
            <input type="number" id="rob-loc-police" min="0" value="2" oninput="generateRobberyLocationCode()">
            <small>Minimum number of police players required online to start the robbery.</small>
          </div>
        </div>
      </div>

      <div class="generator-section">
        <div class="form-grid-2">
          <div class="input-group">
            <label for="rob-loc-robtime">Robbing Timer:</label>
            <input type="number" id="rob-loc-robtime" min="1" value="5" oninput="generateRobberyLocationCode()">
            <small>Seconds required to complete the robbery interaction.</small>
          </div>

          <div class="input-group">
            <label for="rob-loc-respawn">Respawn Timer:</label>
            <input type="number" id="rob-loc-respawn" min="1" value="1800" oninput="generateRobberyLocationCode()">
            <small>Cooldown time before this robbery can be performed again.</small>
          </div>
        </div>
      </div>

      <div class="generator-section">
        <div class="input-group">
          <label for="rob-loc-blacklist">Blacklisted Factions:</label>
          <small>Each row is one faction constant (e.g., FACTION_CITIZEN).</small>
        </div>

        <div id="blacklist-faction-list" class="dynamic-list"></div>
        <button type="button" class="add-btn" onclick="addBlacklistFactionRow()">Add Faction</button>
      </div>

      <div class="generator-section">
        <div class="input-group">
          <label>Stealable Items:</label>
          <small>Each row is one entry in the "stealable" list (chance is 1-100).</small>
        </div>

        <div id="stealable-list" class="dynamic-list"></div>
        <button type="button" class="add-btn" onclick="addStealableRow()">Add Stealable Item</button>
      </div>

      <div class="button-group">
        <button onclick="generateRobberyLocationCode()" class="generate-btn">Generate Location Code</button>
        <button onclick="fillExampleRobberyLocation()" class="generate-btn example-btn">Generate Example</button>
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

function stealableRowTemplate(idx, item, name, chance) {
  return `
  <div class="dynamic-row" data-idx="${idx}">
    <input type="text" class="st-item" placeholder="jewelrybag" value="${item || ''}" oninput="generateRobberyLocationCode()">
    <input type="text" class="st-name" placeholder="Jewelry Bag" value="${name || ''}" oninput="generateRobberyLocationCode()">
    <input type="number" class="st-chance small-input" placeholder="50" min="0" max="100" value="${chance || '50'}" oninput="generateRobberyLocationCode()">
    <button type="button" class="remove-btn" onclick="removeStealableRow(this)">×</button>
  </div>`;
}

function addStealableRow(item, name, chance) {
  const list = document.getElementById('stealable-list');
  const idx = list.children.length;
  list.insertAdjacentHTML('beforeend', stealableRowTemplate(idx, item, name, chance));
  generateRobberyLocationCode();
}

function removeStealableRow(btn) {
  const row = btn.closest('.dynamic-row');
  if (row) row.remove();
  generateRobberyLocationCode();
}

function blacklistFactionRowTemplate(faction) {
  return `
  <div class="dynamic-row blacklist-faction-row">
    <input type="text" class="blacklist-faction-item" placeholder="FACTION_CITIZEN" value="${faction || ''}" oninput="generateRobberyLocationCode()">
    <button type="button" class="remove-btn" onclick="removeBlacklistFactionRow(this)">×</button>
  </div>`;
}

function addBlacklistFactionRow(faction) {
  const list = document.getElementById('blacklist-faction-list');
  if (!list) return;
  list.insertAdjacentHTML('beforeend', blacklistFactionRowTemplate(faction));
  generateRobberyLocationCode();
}

function removeBlacklistFactionRow(btn) {
  const row = btn.closest('.blacklist-faction-row');
  if (row) row.remove();
  generateRobberyLocationCode();
}

function generateRobberyLocationCode() {
  const className = (document.getElementById('rob-loc-id').value || '').trim() || 'robbery_entity';
  const name = (document.getElementById('rob-loc-name').value || '').trim() || 'Robbery';
  const model = (document.getElementById('rob-loc-model').value || '').trim() || 'models/props_c17/briefcase001a.mdl';
  const respawnTimer = document.getElementById('rob-loc-respawn').value || '3600';
  const robbingTimer = document.getElementById('rob-loc-robtime').value || '25';
  const minPolice = document.getElementById('rob-loc-police').value || '0';
  const blacklistRows = Array.from(document.querySelectorAll('#blacklist-faction-list .blacklist-faction-row'));
  const blacklistedFactions = [];
  for (const row of blacklistRows) {
    const faction = (row.querySelector('.blacklist-faction-item').value || '').trim();
    if (!faction) continue;
    blacklistedFactions.push(faction);
  }

  const blacklistedFactionLuaValues = blacklistedFactions.map(luaValueFromText).filter(Boolean);

  const rows = Array.from(document.querySelectorAll('#stealable-list .dynamic-row'));
  const stealable = [];
  for (const row of rows) {
    const item = (row.querySelector('.st-item').value || '').trim();
    const iname = (row.querySelector('.st-name').value || '').trim();
    const chance = (row.querySelector('.st-chance').value || '').trim() || '0';
    if (!item) continue;
    stealable.push({ item, name: iname, chance });
  }

  const lines = [
  '-- Copy and paste this into: modules/done/robberies/config/shared.lua',
  '',
  `lia.robberies.registerEntity(${JSON.stringify(className)}, {`,
  `    name = ${JSON.stringify(name)},`,
  `    model = ${JSON.stringify(model)},`,
  `    respawnTimer = ${respawnTimer},`,
  `    robbingTimer = ${robbingTimer},`,
  `    minPolice = ${minPolice},`,
  `    BlackListedFactions = {${blacklistedFactionLuaValues.join(', ')}}`,
  '    stealable = {'
  ];

  if (stealable.length === 0) {
    lines.push('        -- Add stealable rows via generator UI');
  } else {
    for (const s of stealable) {
      lines.push('        {');
      lines.push(`            item = ${JSON.stringify(s.item)},`);
      lines.push(`            name = ${JSON.stringify(s.name || s.item)},`);
      lines.push(`            chance = ${s.chance}`);
      lines.push('        },');
    }
    // Remove trailing comma
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

function fillExampleRobberyLocation() {
  document.getElementById('rob-loc-id').value = 'jewelry_case';
  document.getElementById('rob-loc-name').value = 'Jewelry Case';
  document.getElementById('rob-loc-model').value = 'models/props_c17/briefcase001a.mdl';
  document.getElementById('rob-loc-respawn').value = '1800';
  document.getElementById('rob-loc-robtime').value = '5';
  document.getElementById('rob-loc-police').value = '2';
  const blacklistList = document.getElementById('blacklist-faction-list');
  if (blacklistList) blacklistList.innerHTML = '';
  const list = document.getElementById('stealable-list');
  list.innerHTML = '';
  addStealableRow('jewelrybag', 'Jewelry Bag', '50');
  addStealableRow('gold_watch', 'Gold Watch', '30');
  addStealableRow('diamond_ring', 'Diamond Ring', '20');
  generateRobberyLocationCode();
}

document.addEventListener('DOMContentLoaded', () => {
  const list = document.getElementById('stealable-list');
  list.innerHTML = '';
  const blacklistList = document.getElementById('blacklist-faction-list');
  if (blacklistList) blacklistList.innerHTML = '';
  addStealableRow('jewelrybag', 'Jewelry Bag', '50');
  setupLiveUpdate(generateRobberyLocationCode);
  generateRobberyLocationCode();
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

