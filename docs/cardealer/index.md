# Vehicle Dealership

A comprehensive vehicle management system that provides NPC-based vehicle purchasing, ownership tracking, and maintenance services. Features include interactive dealer NPCs for vehicle sales with configurable pricing, vehicle return and repair systems with fee-based services, custom paint jobs and bodygroup modifications with individual pricing, secure garage storage for owned vehicles, full integration with popular driving addons, administrative privileges for staff vehicle access, and persistent vehicle ownership data across server restarts.

---

## Generator

<div class="generator-grid">
  <!-- Input Column -->
  <div class="generator-card form-card">
    <div class="generator-section">
      <div class="form-grid-2">
        <div class="input-group">
          <label for="item-id">Car Class:</label>
          <input type="text" id="item-id" placeholder="e.g., sim_fphys_dukes" value="sim_fphys_dukes" oninput="generateVehicleItem()">
          <small>Vehicle entity class name (used as unique identifier)</small>
        </div>

        <div class="input-group">
          <label for="item-name">Vehicle Name:</label>
          <input type="text" id="item-name" placeholder="e.g., Sports Car" value="High-Performance Sports Car" oninput="generateVehicleItem()">
          <small>Name shown to players in the vehicle dealer UI.</small>
        </div>
      </div>

      <div class="input-group">
        <label for="vehicle-category">Category:</label>
        <input type="text" id="vehicle-category" placeholder="e.g., Sports" value="Sports" oninput="generateVehicleItem()">
        <small>Shown as the tab/category in the dealer UI</small>
      </div>

    </div>

    <div class="generator-section">
      <div class="input-group">
        <label for="vehicle-model">Vehicle Model:</label>
        <input type="text" id="vehicle-model" placeholder="models/props_vehicles/car002.mdl" value="" oninput="generateVehicleItem()">
        <small>3D model path for the vehicle. For simfphys vehicles, this is usually auto-retrieved and can be left empty.</small>
      </div>

      <div class="form-grid-2">
        <div class="input-group">
          <label for="vehicle-price">Price:</label>
          <input type="number" id="vehicle-price" placeholder="5000" min="0" value="15000" oninput="generateVehicleItem()">
          <small>Purchase price in currency</small>
        </div>

        <div class="input-group">
          <label for="vehicle-simfphys">Simfphys Vehicle:</label>
          <select id="vehicle-simfphys" oninput="generateVehicleItem()">
            <option value="auto" selected>Auto-detect</option>
            <option value="1">Force Yes</option>
            <option value="0">Force No</option>
          </select>
          <small>Auto-detects for classes starting with <code>simfphys_</code> or <code>sim_fphys_</code></small>
        </div>
      </div>

      <div class="form-grid-2">
        <div class="input-group">
          <label for="vehicle-nobuy">Special / No Buy:</label>
          <select id="vehicle-nobuy" oninput="generateVehicleItem()">
            <option value="0" selected>No</option>
            <option value="1">Yes</option>
          </select>
          <small>Yes/No field. If enabled, this vehicle does not appear in the normal list and is spawned via the special menu.</small>
        </div>

        <div class="input-group">
          <label for="vehicle-vip">VIP Only:</label>
          <select id="vehicle-vip" oninput="generateVehicleItem()">
            <option value="0" selected>No</option>
            <option value="1">Yes</option>
          </select>
          <small>Yes/No field. If enabled, only VIPs can buy/see this vehicle (module-defined VIP logic).</small>
        </div>
      </div>

      
      <div class="form-grid-2">
        <div class="input-group">
          <label for="vehicle-allow-color">Allow Color Change:</label>
          <select id="vehicle-allow-color" oninput="generateVehicleItem()">
            <option value="1" selected>Yes</option>
            <option value="0">No</option>
          </select>
          <small>Yes/No field. Controls whether players can change the vehicle color in the dealer/customization UI.</small>
        </div>
      </div>

      <div class="input-group">
        <label>Factions (optional):</label>
        <small>Each row is one faction constant ID (e.g. <code>FACTION_CITIZEN</code>).</small>
      </div>
      <div id="factions-list" class="dynamic-list"></div>
      <button type="button" class="add-btn" onclick="addFactionRow()">Add Faction</button>

      <div class="form-grid-2">
        <div class="input-group">
          <label for="vehicle-allow-bodygroups">Allow Bodygroup Change:</label>
          <select id="vehicle-allow-bodygroups" oninput="generateVehicleItem()">
            <option value="1" selected>Yes</option>
            <option value="0">No</option>
          </select>
          <small>Yes/No field. Controls whether players can change vehicle bodygroups in the dealer/customization UI.</small>
        </div>

        <div class="input-group">
          <label for="vehicle-paintjob-price">Paint Job Price (optional):</label>
          <input type="number" id="vehicle-paintjob-price" placeholder="300" min="0" value="" oninput="generateVehicleItem()">
          <small>Optional override for the paint job/custom color price for this vehicle. Defaults to <code>300</code> if omitted.</small>
        </div>
      </div>

      <div class="form-grid-2">
        <div class="input-group">
          <label for="vehicle-repair-cost">Repair Cost (optional):</label>
          <input type="number" id="vehicle-repair-cost" placeholder="e.g., 500" min="0" value="" oninput="generateVehicleItem()">
          <small>Optional override for how much it costs to repair this vehicle (only applies if your cardealer setup supports repairs).</small>
        </div>
      </div>
    </div>

    <div class="button-group">
      <button onclick="generateVehicleItem()" class="generate-btn">Generate Vehicle Item Code</button>
      <button onclick="fillExampleVehicle()" class="generate-btn example-btn">Generate Example</button>
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

function factionRowTemplate(faction) {
  return `
  <div class="dynamic-row faction-row">
    <input type="text" class="faction-item" placeholder="FACTION_CITIZEN" value="${faction || ''}" oninput="generateVehicleItem()">
    <button type="button" class="remove-btn" onclick="removeFactionRow(this)">×</button>
  </div>`;
}

function addFactionRow(faction) {
  const list = document.getElementById('factions-list');
  if (!list) return;
  list.insertAdjacentHTML('beforeend', factionRowTemplate(faction));
  generateVehicleItem();
}

function removeFactionRow(btn) {
  const row = btn.closest('.faction-row');
  if (row) row.remove();
  generateVehicleItem();
}

function generateVehicleItem() {
  const carClass = (document.getElementById('item-id').value || '').trim() || 'sim_fphys_example';
  const name = (document.getElementById('item-name').value || '').trim() || 'Vehicle';
  const category = (document.getElementById('vehicle-category').value || '').trim() || 'Uncategorized';
  const model = (document.getElementById('vehicle-model').value || '').trim();
  const price = document.getElementById('vehicle-price').value || '0';
  const vip = document.getElementById('vehicle-vip').value === '1';
  const simfphysMode = document.getElementById('vehicle-simfphys').value;
  const noBuy = document.getElementById('vehicle-nobuy').value === '1';
  const allowColorChange = document.getElementById('vehicle-allow-color').value === '1';
  const allowBodygroupChange = document.getElementById('vehicle-allow-bodygroups').value === '1';
  const paintJobPrice = (document.getElementById('vehicle-paintjob-price').value || '').trim();
  const repairCost = (document.getElementById('vehicle-repair-cost').value || '').trim();

  // Auto-detect simfphys based on class name
  let isSimfphys = false;
  if (simfphysMode === 'auto') {
    isSimfphys = carClass.startsWith('simfphys_') || carClass.startsWith('sim_fphys_');
  } else {
    isSimfphys = simfphysMode === '1';
  }

  const factionRows = Array.from(document.querySelectorAll('#factions-list .faction-row'));
  const factionLuaValues = [];
  for (const row of factionRows) {
    const factionRaw = (row.querySelector('.faction-item').value || '').trim();
    if (!factionRaw) continue;
    const luaValue = luaValueFromText(factionRaw);
    if (!luaValue) continue;
    factionLuaValues.push(luaValue);
  }

  const props = [];
  props.push('    Name = ' + JSON.stringify(name) + ',');
  props.push('    Price = ' + price + ',');
  props.push('    Category = ' + JSON.stringify(category) + ',');
  if (model) props.push('    Model = ' + JSON.stringify(model) + ',');
  if (vip) props.push('    vip = true,');
  if (factionLuaValues.length > 0) props.push('    factions = {' + factionLuaValues.join(', ') + '},');
  if (isSimfphys) props.push('    isSimfphys = true,');
  if (noBuy) props.push('    noBuy = true,');
  if (!allowColorChange) props.push('    allowColorChange = false,');
  if (!allowBodygroupChange) props.push('    allowBodygroupChange = false,');
  if (paintJobPrice !== '') props.push('    PaintJobPrice = ' + paintJobPrice + ',');
  if (repairCost !== '') props.push('    RepairCost = ' + repairCost + ',');

  const lines = [
  '-- Copy and paste this code into the module definitions file',
  '-- Example: garrysmod/gamemodes/[schema folder]/modules/cardealer/definitions.lua',
  '',
  `lia.cardealer.registerVehicle(${JSON.stringify(carClass)}, {`,
  ...props.map((line, idx) => (idx === props.length - 1 ? line.replace(/,$/, '') : line)),
  '})'
  ];

  const code = `${lines.join('\n')}\n`;

  const outputBox = document.getElementById('output-code');
  if (outputBox) {
    outputBox.value = code;
  }
}

function fillExampleVehicle() {
  document.getElementById('item-id').value = 'sim_fphys_dukes';
  document.getElementById('item-name').value = 'Dukes';
  document.getElementById('vehicle-model').value = '';
  document.getElementById('vehicle-price').value = '15000';
  document.getElementById('vehicle-category').value = 'Standard';
  document.getElementById('vehicle-simfphys').value = 'auto';
  document.getElementById('vehicle-nobuy').value = '0';
  document.getElementById('vehicle-vip').value = '0';
  const factionsListEl = document.getElementById('factions-list');
  if (factionsListEl) factionsListEl.innerHTML = '';
  addFactionRow('FACTION_CITIZEN');
  document.getElementById('vehicle-allow-color').value = '1';
  document.getElementById('vehicle-allow-bodygroups').value = '1';
  document.getElementById('vehicle-paintjob-price').value = '';
  document.getElementById('vehicle-repair-cost').value = '';

  generateVehicleItem();
}

// Initial generation
document.addEventListener('DOMContentLoaded', () => {
  // Seed a faction row so it isn't empty
  const factionsListEl = document.getElementById('factions-list');
  if (factionsListEl) factionsListEl.innerHTML = '';
  addFactionRow('');
  setupLiveUpdate(generateVehicleItem);
  generateVehicleItem();
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
  <source src="https://bleonheart.github.io/assets/cardealer.mp4" type="video/mp4">
  Your browser does not support the video tag.
</video>
