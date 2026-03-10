# Advanced Car Spawner

Comprehensive vehicle spawning system that provides players with an interactive GUI menu to browse, purchase, and spawn various vehicles. Features include customizable car registration system, physical car crate entities, intelligent spawn positioning with collision detection, currency integration, and support for both LVS and custom vehicle classes. The system includes server-side vehicle management, client-side interface with scrollable car listings, and automatic vehicle ownership assignment through CPPI.

---

## Generator

<div class="generator-grid">
  <!-- Input Column -->
  <div class="generator-card form-card">
    <div class="generator-section">
      <div class="form-grid-2">
        <div class="input-group">
          <label for="car-class">Vehicle Class:</label>
          <input type="text" id="car-class" placeholder="e.g., lvs_wheeldrive_dodspaehwagen" value="lvs_wheeldrive_dodspaehwagen" oninput="generateCarSpawnerCode()">
          <small>Entity class to spawn (must exist on server)</small>
        </div>

        <div class="input-group">
          <label for="car-name">Display Name:</label>
          <input type="text" id="car-name" placeholder="e.g., Dodge Paehwagen" value="Dodge Paehwagen" oninput="generateCarSpawnerCode()">
          <small>Name shown in the car spawner UI/menu.</small>
        </div>
      </div>

      <div class="input-group">
        <label for="car-desc">Description:</label>
        <textarea id="car-desc" placeholder="e.g., A powerful car that can be used for transportation." oninput="generateCarSpawnerCode()">A powerful car that can be used for transportation.</textarea>
        <small>Description shown to players (tooltip/details panel).</small>
      </div>
    </div>

    <div class="generator-section">
      <div class="form-grid-3">
        <div class="input-group">
          <label for="car-price">Price:</label>
          <input type="number" id="car-price" placeholder="10000" min="0" value="10000" oninput="generateCarSpawnerCode()">
          <small>Purchase/spawn price in your schema currency.</small>
        </div>

        <div class="input-group">
          <label for="car-spawn-dist">Spawn Distance:</label>
          <input type="number" id="car-spawn-dist" placeholder="200" value="200" oninput="generateCarSpawnerCode()">
          <small>Optional distance offset used when spawning the vehicle (defaults to <code>200</code>).</small>
        </div>

        <div class="input-group">
          <label for="car-spawn-height">Spawn Height:</label>
          <input type="number" id="car-spawn-height" placeholder="12" value="12" oninput="generateCarSpawnerCode()">
          <small>Optional height offset used when spawning the vehicle (defaults to <code>12</code>).</small>
        </div>
      </div>

      <div class="form-grid-2">
        <div class="input-group">
          <label for="car-category">Category:</label>
          <input type="text" id="car-category" placeholder="e.g., Vehicles" value="Vehicles" oninput="generateCarSpawnerCode()">
          <small>Optional organization category shown in the spawner UI (defaults to <code>"Vehicles"</code>).</small>
        </div>

        <div class="input-group">
          <label for="car-model">Crate Model:</label>
          <input type="text" id="car-model" placeholder="e.g., models/props_junk/wood_crate001a.mdl" value="models/props_junk/wood_crate001a.mdl" oninput="generateCarSpawnerCode()">
          <small>Optional crate/placeholder model (defaults to a wood crate if omitted).</small>
        </div>
      </div>
    </div>

    <div class="generator-section">
      <div class="input-group">
        <label for="car-factions">Allowed Factions:</label>
        <small>Optional. Add faction unique IDs that can spawn this vehicle. Leave empty for all factions.</small>
      </div>

      <div id="factions-list" class="dynamic-list"></div>
      <button type="button" class="add-btn" onclick="addFactionRow()">Add Faction</button>
    </div>

    <div class="button-group">
      <button onclick="generateCarSpawnerCode()" class="generate-btn">Generate Car Spawner Code</button>
      <button onclick="fillExampleCarSpawner()" class="generate-btn example-btn">Generate Example</button>
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

function factionRowTemplate(idx, faction) {
  return `
  <div class="dynamic-row" data-idx="${idx}">
    <input type="text" class="fac-id" placeholder="FACTION_CITIZEN" value="${faction || ''}" oninput="generateCarSpawnerCode()">
    <button type="button" class="remove-btn" onclick="removeFactionRow(this)">×</button>
  </div>`;
}

function addFactionRow(faction) {
  const list = document.getElementById('factions-list');
  const idx = list.children.length;
  list.insertAdjacentHTML('beforeend', factionRowTemplate(idx, faction));
  generateCarSpawnerCode();
}

function removeFactionRow(btn) {
  const row = btn.closest('.dynamic-row');
  if (row) row.remove();
  generateCarSpawnerCode();
}

function generateCarSpawnerCode() {
  const vehicleClass = (document.getElementById('car-class').value || '').trim() || 'vehicle_class';
  const name = (document.getElementById('car-name').value || '').trim() || 'Vehicle';
  const desc = (document.getElementById('car-desc').value || '').trim() || 'A vehicle that can be spawned.';
  const price = document.getElementById('car-price').value || '0';
  const category = (document.getElementById('car-category').value || '').trim();
  const model = (document.getElementById('car-model').value || '').trim();
  const spawnDist = (document.getElementById('car-spawn-dist').value || '').trim();
  const spawnHeight = (document.getElementById('car-spawn-height').value || '').trim();

  const factionRows = Array.from(document.querySelectorAll('#factions-list .dynamic-row'));
  const factionList = [];
  for (const row of factionRows) {
    const faction = (row.querySelector('.fac-id').value || '').trim();
    if (!faction) continue;
    factionList.push(faction);
  }

  const factionLuaValues = factionList.map(luaValueFromText).filter(Boolean);

  const lines = [
  '-- Copy and paste this code into the module definitions file',
  '-- Example: garrysmod/gamemodes/[schema folder]/modules/carspawner/definitions.lua',
  '',
  `MODULE:RegisterCar(${JSON.stringify(vehicleClass)}, {`,
  `    name = ${JSON.stringify(name)},`,
  `    description = ${JSON.stringify(desc)},`,
  `    price = ${price},`
  ];

  if (category) lines.push(`    category = ${JSON.stringify(category)},`);
  if (model) lines.push(`    model = ${JSON.stringify(model)},`);
  if (spawnDist) lines.push(`    spawnDistance = ${spawnDist},`);
  if (spawnHeight) lines.push(`    spawnHeight = ${spawnHeight},`);

  // Add factions at the end
  if (factionLuaValues.length > 0) {
    lines.push(`    factions = {${factionLuaValues.join(', ')}},`);
  }

  // Remove trailing comma from last entry if present by rewriting last line
  if (lines[lines.length - 1].endsWith(',')) {
    lines[lines.length - 1] = lines[lines.length - 1].slice(0, -1);
  }

  lines.push('})');

  const code = `${lines.join('\n')}\n`;
  const outputBox = document.getElementById('output-code');
  if (outputBox) outputBox.value = code;
}

function fillExampleCarSpawner() {
  document.getElementById('car-class').value = 'lvs_wheeldrive_dodspaehwagen';
  document.getElementById('car-name').value = 'Dodge Paehwagen';
  document.getElementById('car-desc').value = 'A powerful car that can be used for transportation.';
  document.getElementById('car-price').value = '10000';
  document.getElementById('car-category').value = 'Vehicles';
  document.getElementById('car-model').value = 'models/props_junk/wood_crate001a.mdl';
  document.getElementById('car-spawn-dist').value = '200';
  document.getElementById('car-spawn-height').value = '12';
  const factionsList = document.getElementById('factions-list');
  factionsList.innerHTML = '';
  addFactionRow('FACTION_CITIZEN');
  addFactionRow('FACTION_COP');
  generateCarSpawnerCode();
}

document.addEventListener('DOMContentLoaded', () => {
  const factionsList = document.getElementById('factions-list');
  if (factionsList) factionsList.innerHTML = '';
  setupLiveUpdate(generateCarSpawnerCode);
  generateCarSpawnerCode();
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
  <source src="https://bleonheart.github.io/assets/carspawner.mp4" type="video/mp4">
  Your browser does not support the video tag.
</video>
