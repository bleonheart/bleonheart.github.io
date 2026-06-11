# Vehicle Deployment Beacons

Faction-based in-world vehicle deployment beacons with ghost placement, secure validation, and support for Source and simfphys vehicle spawning.

---

## Generator

<div class="generator-grid">
  <!-- Input Column -->
  <div class="generator-card form-card">
    <!-- Vehicle Info -->
    <div class="generator-section">
      <h4>Vehicle Info</h4>
      <div class="form-grid-2">
        <div class="input-group">
          <label for="beacon-vehicle-id">Vehicle ID:</label>
          <input type="text" id="beacon-vehicle-id" placeholder="e.g., sim_fphys_dukes" value="sim_fphys_dukes" oninput="generateBeaconCode()">
          <small>The simfphys / LFS vehicle ID (e.g. <code>sim_fphys_dukes</code>, <code>simfphys_charger</code>). This becomes the unique key for <code>lia.vehiclebeacons.registerVehicle()</code>.</small>
        </div>

        <div class="input-group">
          <label for="beacon-name">Display Name:</label>
          <input type="text" id="beacon-name" placeholder="e.g., Field Jeep" value="Field Jeep" oninput="generateBeaconCode()">
          <small>Dispay name shown to players for the vehicle and the beacon item.</small>
        </div>
      </div>

      <div class="form-grid-3">
        <div class="input-group">
          <label for="beacon-category">Category:</label>
          <input type="text" id="beacon-category" placeholder="e.g., Civilian" value="Civilian" oninput="generateBeaconCode()">
          <small>Category grouping for the vehicle listing UI.</small>
        </div>

        <div class="input-group">
          <label for="beacon-price">Price:</label>
          <input type="number" id="beacon-price" placeholder="e.g., 8000" min="0" value="8000" oninput="generateBeaconCode()">
          <small>Cost of the vehicle beacon (module-defined meaning). Leave 0 for no price.</small>
        </div>

        <div class="input-group">
          <label for="beacon-skin">Skin:</label>
          <input type="number" id="beacon-skin" placeholder="0" min="0" value="0" oninput="generateBeaconCode()">
          <small>Vehicle skin index. Default is 0.</small>
        </div>
      </div>

      <div class="input-group">
        <label for="beacon-bodygroups">Bodygroups:</label>
        <input type="text" id="beacon-bodygroups" placeholder="e.g., 1=2, 3=0" value="" oninput="generateBeaconCode()">
        <small>Comma-separated <code>group=value</code> pairs (e.g. <code>1=2, 3=0</code>). Leave empty for no bodygroups.</small>
      </div>
    </div>

    <!-- Factions -->
    <div class="generator-section">
      <div class="input-group">
        <label>Restricted Factions:</label>
        <small>Each row is a faction unique ID or index that can deploy this vehicle. Leave empty to allow all factions.</small>
      </div>

      <div id="beacon-faction-list" class="dynamic-list"></div>
      <button type="button" class="add-btn" onclick="addBeaconFactionRow()">Add Faction</button>
    </div>

    <!-- Beacon Item Customization -->
    <div class="generator-section">
      <h4>Beacon Item Customization</h4>
      <small>These override the default beacon item properties. Leave empty to use auto-generated values.</small>

      <div class="form-grid-2">
        <div class="input-group">
          <label for="beacon-custom-name">Custom Beacon Name:</label>
          <input type="text" id="beacon-custom-name" placeholder="e.g., Field Jeep Beacon" value="" oninput="generateBeaconCode()">
          <small>Overrides the auto-generated item name (<code>Name .. " Beacon"</code>).</small>
        </div>

        <div class="input-group">
          <label for="beacon-custom-model">Custom Beacon Model:</label>
          <input type="text" id="beacon-custom-model" placeholder="e.g., models/Items/battery.mdl" value="" oninput="generateBeaconCode()">
          <small>Overrides the default inventory model for the beacon item.</small>
        </div>
      </div>

      <div class="input-group">
        <label for="beacon-custom-desc">Custom Beacon Description:</label>
        <textarea id="beacon-custom-desc" placeholder="e.g., Deploys a Field Jeep after a short setup timer." oninput="generateBeaconCode()"></textarea>
        <small>Overrides the auto-generated beacon description.</small>
      </div>

      <div class="form-grid-3">
        <div class="input-group">
          <label for="beacon-width">Inventory Width:</label>
          <input type="number" id="beacon-width" placeholder="1" min="1" value="1" oninput="generateBeaconCode()">
          <small>Grid width for the beacon item in the inventory UI.</small>
        </div>

        <div class="input-group">
          <label for="beacon-height">Inventory Height:</label>
          <input type="number" id="beacon-height" placeholder="1" min="1" value="1" oninput="generateBeaconCode()">
          <small>Grid height for the beacon item in the inventory UI.</small>
        </div>

        <div class="input-group">
          <label for="beacon-item-category">Item Category:</label>
          <input type="text" id="beacon-item-category" placeholder="e.g., Vehicle Beacons" value="" oninput="generateBeaconCode()">
          <small>Inventory category for the beacon item. Defaults to "Vehicle Beacons".</small>
        </div>
      </div>

      <div class="input-group">
        <label for="beacon-item-id">Custom Item ID:</label>
        <input type="text" id="beacon-item-id" placeholder="e.g., vehiclebeacon_field_jeep" value="" oninput="generateBeaconCode()">
        <small>Custom unique item ID. Defaults to <code>vehiclebeacon_&lt;vehicleid&gt;</code>.</small>
      </div>
    </div>

    <!-- Advanced -->
    <div class="generator-section">
      <h4>Advanced</h4>
      <div class="form-grid-3">
        <div class="input-group">
          <label for="beacon-deployment-time">Deployment Time (s):</label>
          <input type="number" id="beacon-deployment-time" placeholder="4" min="1" value="" oninput="generateBeaconCode()">
          <small>Seconds between confirming placement and vehicle spawn. Defaults to module global (4).</small>
        </div>

        <div class="input-group">
          <label for="beacon-despawn-time">Despawn Time (s):</label>
          <input type="number" id="beacon-despawn-time" placeholder="600" min="1" value="" oninput="generateBeaconCode()">
          <small>Seconds before an unused beacon vehicle despawns. Defaults to module global (600).</small>
        </div>

        <div class="input-group">
          <label for="beacon-model-override">Model Override:</label>
          <input type="text" id="beacon-model-override" placeholder="e.g., models/vehicles/charger.mdl" value="" oninput="generateBeaconCode()">
          <small>Explicit model path for ghost preview (overrides auto-detection). Leave empty for auto-detect.</small>
        </div>
      </div>

      <div class="form-grid-3">
        <div class="input-group">
          <label>
            <input type="checkbox" id="beacon-is-simfphys" checked oninput="generateBeaconCode()"> Simfphys
          </label>
          <small>Force classification as a simfphys vehicle.</small>
        </div>

        <div class="input-group">
          <label>
            <input type="checkbox" id="beacon-is-lfs" oninput="generateBeaconCode()"> LFS
          </label>
          <small>Force classification as an LFS vehicle.</small>
        </div>

        <div class="input-group">
          <label for="beacon-class-override">Class Override:</label>
          <input type="text" id="beacon-class-override" placeholder="e.g., sent_vehicle" value="" oninput="generateBeaconCode()">
          <small>Override the vehicle entity class used for spawning.</small>
        </div>
      </div>
    </div>

    <div class="button-group">
      <button onclick="generateBeaconCode()" class="generate-btn">Generate Beacon Code</button>
      <button onclick="fillExampleBeacon()" class="generate-btn example-btn">Generate Example</button>
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

function luaValueFromText(text) {
  const t = (text || '').trim();
  if (!t) return '';
  if (/^[A-Za-z_][A-Za-z0-9_]*$/.test(t)) return t;
  return JSON.stringify(t);
}

function beaconFactionRowTemplate(idx, faction) {
  return `
  <div class="dynamic-row" data-idx="${idx}">
    <input type="text" class="b-faction" placeholder="FACTION_POLICE" value="${faction || ''}" oninput="generateBeaconCode()">
    <button type="button" class="remove-btn" onclick="removeBeaconFactionRow(this)">×</button>
  </div>`;
}

function addBeaconFactionRow(faction) {
  const list = document.getElementById('beacon-faction-list');
  const idx = list.children.length;
  list.insertAdjacentHTML('beforeend', beaconFactionRowTemplate(idx, faction));
  generateBeaconCode();
}

function removeBeaconFactionRow(btn) {
  const row = btn.closest('.dynamic-row');
  if (row) row.remove();
  generateBeaconCode();
}

function parseBodygroups(raw) {
  const str = (raw || '').trim();
  if (!str) return '';
  const pairs = str.split(',').map(p => p.trim()).filter(Boolean);
  if (pairs.length === 0) return '';
  const mapped = pairs.map(pair => {
    const parts = pair.split('=');
    const group = (parts[0] || '').trim();
    const value = (parts[1] || '').trim();
    if (!group || value === '') return null;
    return `[${group}] = ${value}`;
  }).filter(Boolean);
  return mapped.length > 0 ? `{ ${mapped.join(', ')} }` : '';
}

function generateBeaconCode() {
  const vehicleId = (document.getElementById('beacon-vehicle-id').value || '').trim() || 'vehicle_id';
  const name = (document.getElementById('beacon-name').value || '').trim() || 'Vehicle';
  const category = (document.getElementById('beacon-category').value || '').trim();
  const price = document.getElementById('beacon-price').value;
  const skin = document.getElementById('beacon-skin').value;
  const bodygroupsRaw = (document.getElementById('beacon-bodygroups').value || '').trim();

  const factionRows = Array.from(document.querySelectorAll('#beacon-faction-list .dynamic-row'));
  const factions = [];
  for (const row of factionRows) {
    const faction = (row.querySelector('.b-faction').value || '').trim();
    if (!faction) continue;
    factions.push(faction);
  }

  const beaconName = (document.getElementById('beacon-custom-name').value || '').trim();
  const beaconModel = (document.getElementById('beacon-custom-model').value || '').trim();
  const beaconDesc = (document.getElementById('beacon-custom-desc').value || '').trim();
  const width = document.getElementById('beacon-width').value || '1';
  const height = document.getElementById('beacon-height').value || '1';
  const itemCategory = (document.getElementById('beacon-item-category').value || '').trim();
  const itemId = (document.getElementById('beacon-item-id').value || '').trim();

  const deploymentTime = (document.getElementById('beacon-deployment-time').value || '').trim();
  const despawnTime = (document.getElementById('beacon-despawn-time').value || '').trim();
  const modelOverride = (document.getElementById('beacon-model-override').value || '').trim();
  const isSimfphys = document.getElementById('beacon-is-simfphys').checked;
  const isLFS = document.getElementById('beacon-is-lfs').checked;
  const classOverride = (document.getElementById('beacon-class-override').value || '').trim();

  const lines = [
    '-- Copy and paste this code into the module definitions file',
    '-- Example: garrysmod/gamemodes/[schema folder]/modules/vehiclebeacons/definitions.lua',
    '',
    `lia.vehiclebeacons.registerVehicle(${JSON.stringify(vehicleId)}, {`,
    `    Name = ${JSON.stringify(name)},`
  ];

  if (category) {
    lines.push(`    Category = ${JSON.stringify(category)},`);
  }

  const factionLuaValues = factions.map(luaValueFromText).filter(Boolean);
  lines.push(`    factions = {${factionLuaValues.join(', ')}},`);

  if (price && price !== '0') {
    lines.push(`    Price = ${price},`);
  }

  if (skin && skin !== '0') {
    lines.push(`    skin = ${skin},`);
  }

  const bodygroupsStr = parseBodygroups(bodygroupsRaw);
  if (bodygroupsStr) {
    lines.push(`    bodygroups = ${bodygroupsStr},`);
  }

  if (beaconName) {
    lines.push(`    beaconName = ${JSON.stringify(beaconName)},`);
  }

  if (beaconDesc) {
    lines.push(`    beaconDesc = ${JSON.stringify(beaconDesc)},`);
  }

  if (beaconModel) {
    lines.push(`    beaconModel = ${JSON.stringify(beaconModel)},`);
  }

  if (width && width !== '1') {
    lines.push(`    width = ${width},`);
  }

  if (height && height !== '1') {
    lines.push(`    height = ${height},`);
  }

  if (itemCategory) {
    lines.push(`    beaconCategory = ${JSON.stringify(itemCategory)},`);
  }

  if (itemId) {
    lines.push(`    itemUniqueID = ${JSON.stringify(itemId)},`);
  }

  if (deploymentTime) {
    lines.push(`    DeploymentTime = ${deploymentTime},`);
  }

  if (despawnTime) {
    lines.push(`    DespawnTime = ${despawnTime},`);
  }

  if (modelOverride) {
    lines.push(`    Model = ${JSON.stringify(modelOverride)},`);
  }

  if (!isSimfphys) {
    lines.push(`    isSimfphys = false,`);
  }

  if (isLFS) {
    lines.push(`    isLFS = true,`);
  }

  if (classOverride) {
    lines.push(`    class = ${JSON.stringify(classOverride)},`);
  }

  lines.push('})');

  const code = `${lines.join('\n')}\n`;

  const outputBox = document.getElementById('output-code');
  if (outputBox) outputBox.value = code;
}

function fillExampleBeacon() {
  document.getElementById('beacon-vehicle-id').value = 'sim_fphys_dukes';
  document.getElementById('beacon-name').value = 'Field Jeep';
  document.getElementById('beacon-category').value = 'Civilian';
  document.getElementById('beacon-price').value = '8000';
  document.getElementById('beacon-skin').value = '0';
  document.getElementById('beacon-bodygroups').value = '';
  document.getElementById('beacon-custom-name').value = '';
  document.getElementById('beacon-custom-model').value = '';
  document.getElementById('beacon-custom-desc').value = '';
  document.getElementById('beacon-width').value = '1';
  document.getElementById('beacon-height').value = '1';
  document.getElementById('beacon-item-category').value = '';
  document.getElementById('beacon-item-id').value = '';
  document.getElementById('beacon-deployment-time').value = '';
  document.getElementById('beacon-despawn-time').value = '';
  document.getElementById('beacon-model-override').value = '';
  document.getElementById('beacon-is-simfphys').checked = true;
  document.getElementById('beacon-is-lfs').checked = false;
  document.getElementById('beacon-class-override').value = '';

  const factionList = document.getElementById('beacon-faction-list');
  factionList.innerHTML = '';
  addBeaconFactionRow('FACTION_CITIZEN');
  addBeaconFactionRow('FACTION_REFUGEE');

  generateBeaconCode();
}

document.addEventListener('DOMContentLoaded', () => {
  const factionList = document.getElementById('beacon-faction-list');
  factionList.innerHTML = '';
  addBeaconFactionRow('FACTION_CITIZEN');

  setupLiveUpdate(generateBeaconCode);
  generateBeaconCode();
});
</script>

---

## Changelog

<p>No changelog available.</p>
