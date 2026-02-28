# Store Robbery

Store robbery system with jewelry cases and cash registers, stealable items (cash, jewelry, watches, rings), police requirements, and respawn timers

---

## Generator

<div class="generator-grid">
  <!-- Input Column -->
  <div class="generator-card form-card">
    <div class="generator-section">
      <div class="form-grid-2">
        <button id="rob-tab-location" onclick="showRobTab('location')" class="generate-btn">Robbery Location</button>
        <button id="rob-tab-item" onclick="showRobTab('item')" class="generate-btn example-btn">Robbery Item</button>
      </div>
    </div>

    <div id="rob-panel-location">
      <div class="generator-section">
        <div class="form-grid-2">
          <div class="input-group">
            <label for="rob-loc-id">Entity Class:</label>
            <input type="text" id="rob-loc-id" placeholder="e.g., jewelry_case" value="jewelry_case" oninput="generateRobberyLocationCode()">
            <small>Used as the key in lia.robberies.RobbingTable and becomes the spawned entity class</small>
          </div>

          <div class="input-group">
            <label for="rob-loc-name">Name:</label>
            <input type="text" id="rob-loc-name" placeholder="e.g., Jewelry Case" value="Jewelry Case" oninput="generateRobberyLocationCode()">
          </div>
        </div>

        <div class="form-grid-2">
          <div class="input-group">
            <label for="rob-loc-model">Model:</label>
            <input type="text" id="rob-loc-model" placeholder="models/props_c17/briefcase001a.mdl" value="models/props_c17/briefcase001a.mdl" oninput="generateRobberyLocationCode()">
          </div>

          <div class="input-group">
            <label for="rob-loc-police">Min Police:</label>
            <input type="number" id="rob-loc-police" min="0" value="2" oninput="generateRobberyLocationCode()">
          </div>
        </div>
      </div>

      <div class="generator-section">
        <div class="form-grid-2">
          <div class="input-group">
            <label for="rob-loc-robtime">Robbing Timer:</label>
            <input type="number" id="rob-loc-robtime" min="1" value="5" oninput="generateRobberyLocationCode()">
            <small>Seconds to complete robbery</small>
          </div>

          <div class="input-group">
            <label for="rob-loc-respawn">Respawn Timer:</label>
            <input type="number" id="rob-loc-respawn" min="1" value="1800" oninput="generateRobberyLocationCode()">
            <small>Seconds until robbery can be done again</small>
          </div>
        </div>
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

    <div id="rob-panel-item" style="display: none;">
      <div class="generator-section">
        <div class="form-grid-2">
          <div class="input-group">
            <label for="rob-item-id">Item Unique ID:</label>
            <input type="text" id="rob-item-id" placeholder="e.g., jewelrybag" value="jewelrybag" oninput="generateRobberyItemCode()">
          </div>

          <div class="input-group">
            <label for="rob-item-name">Name:</label>
            <input type="text" id="rob-item-name" placeholder="e.g., Jewelry Bag" value="Jewelry Bag" oninput="generateRobberyItemCode()">
          </div>
        </div>

        <div class="input-group">
          <label for="rob-item-desc">Description:</label>
          <textarea id="rob-item-desc" oninput="generateRobberyItemCode()">A bag containing valuable jewelry.</textarea>
        </div>
      </div>

      <div class="generator-section">
        <div class="form-grid-3">
          <div class="input-group">
            <label for="rob-item-model">Model:</label>
            <input type="text" id="rob-item-model" value="models/props_c17/briefcase001a.mdl" oninput="generateRobberyItemCode()">
          </div>

          <div class="input-group">
            <label for="rob-item-w">Width:</label>
            <input type="number" id="rob-item-w" min="1" value="1" oninput="generateRobberyItemCode()">
          </div>

          <div class="input-group">
            <label for="rob-item-h">Height:</label>
            <input type="number" id="rob-item-h" min="1" value="1" oninput="generateRobberyItemCode()">
          </div>
        </div>

        <div class="form-grid-2">
          <div class="input-group">
            <label for="rob-item-min">Reward Min:</label>
            <input type="number" id="rob-item-min" value="100" oninput="generateRobberyItemCode()">
          </div>

          <div class="input-group">
            <label for="rob-item-max">Reward Max:</label>
            <input type="number" id="rob-item-max" value="300" oninput="generateRobberyItemCode()">
          </div>
        </div>
      </div>

      <div class="button-group">
        <button onclick="generateRobberyItemCode()" class="generate-btn">Generate Item Code</button>
        <button onclick="fillExampleRobberyItem()" class="generate-btn example-btn">Generate Example</button>
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
function showRobTab(which) {
  const locPanel = document.getElementById('rob-panel-location');
  const itemPanel = document.getElementById('rob-panel-item');

  if (which === 'item') {
    locPanel.style.display = 'none';
    itemPanel.style.display = 'block';
    generateRobberyItemCode();
  } else {
    locPanel.style.display = 'block';
    itemPanel.style.display = 'none';
    generateRobberyLocationCode();
  }
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

function generateRobberyLocationCode() {
  const className = (document.getElementById('rob-loc-id').value || '').trim() || 'robbery_entity';
  const name = (document.getElementById('rob-loc-name').value || '').trim() || 'Robbery';
  const model = (document.getElementById('rob-loc-model').value || '').trim() || 'models/props_c17/briefcase001a.mdl';
  const respawnTimer = document.getElementById('rob-loc-respawn').value || '3600';
  const robbingTimer = document.getElementById('rob-loc-robtime').value || '25';
  const minPolice = document.getElementById('rob-loc-police').value || '0';

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
  'lia.robberies.RobbingTable = lia.robberies.RobbingTable or {}',
  `lia.robberies.RobbingTable[${JSON.stringify(className)}] = {`,
  `    name = ${JSON.stringify(name)},`,
  `    model = ${JSON.stringify(model)},`,
  `    respawnTimer = ${respawnTimer},`,
  `    robbingTimer = ${robbingTimer},`,
  `    minPolice = ${minPolice},`,
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
  lines.push('}');

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
  const list = document.getElementById('stealable-list');
  list.innerHTML = '';
  addStealableRow('jewelrybag', 'Jewelry Bag', '50');
  addStealableRow('gold_watch', 'Gold Watch', '30');
  addStealableRow('diamond_ring', 'Diamond Ring', '20');
  generateRobberyLocationCode();
}

function generateRobberyItemCode() {
  const uniqueId = (document.getElementById('rob-item-id').value || '').trim() || 'robbery_item';
  const name = (document.getElementById('rob-item-name').value || '').trim() || 'Robbery Item';
  const desc = (document.getElementById('rob-item-desc').value || '').trim() || '';
  const model = (document.getElementById('rob-item-model').value || '').trim() || 'models/props_junk/cardboard_box003a.mdl';
  const width = document.getElementById('rob-item-w').value || '1';
  const height = document.getElementById('rob-item-h').value || '1';
  const rewardMin = document.getElementById('rob-item-min').value || '0';
  const rewardMax = document.getElementById('rob-item-max').value || '0';

  const lines = [
  '-- Copy and paste this into: modules/done/robberies/config/shared.lua',
  '',
  'lia.robberies.Items = lia.robberies.Items or {}',
  `lia.robberies.Items[${JSON.stringify(uniqueId)}] = {`,
  `    name = ${JSON.stringify(name)},`,
  `    desc = ${JSON.stringify(desc)},`,
  `    model = ${JSON.stringify(model)},`,
  `    width = ${width},`,
  `    height = ${height},`,
  `    rewardMin = ${rewardMin},`,
  `    rewardMax = ${rewardMax}`,
  '}'
  ];

  const code = `${lines.join('\n')}\n`;
  const outputBox = document.getElementById('output-code');
  if (outputBox) outputBox.value = code;
}

function fillExampleRobberyItem() {
  document.getElementById('rob-item-id').value = 'cash_bundle';
  document.getElementById('rob-item-name').value = 'Bundle of Cash';
  document.getElementById('rob-item-desc').value = 'A bundle of cash that gives you a random amount between 0 and 500.';
  document.getElementById('rob-item-model').value = 'models/props/cs_assault/money.mdl';
  document.getElementById('rob-item-w').value = '1';
  document.getElementById('rob-item-h').value = '1';
  document.getElementById('rob-item-min').value = '0';
  document.getElementById('rob-item-max').value = '500';
  generateRobberyItemCode();
}

document.addEventListener('DOMContentLoaded', () => {
  showRobTab('location');
  const list = document.getElementById('stealable-list');
  list.innerHTML = '';
  addStealableRow('jewelrybag', 'Jewelry Bag', '50');
});
</script>

---

<details class="realm-shared no-icon">
  <summary>Version 1.0</summary>
  <div class="details-content" style="margin-left: 20px;">
    <ul>
      <li>Initial Release</li>
    </ul>
  </div>
</details>

