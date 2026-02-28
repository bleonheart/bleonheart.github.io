# Car Spawner

Module for spawning themed cars for players.

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
        </div>
      </div>

      <div class="input-group">
        <label for="car-desc">Description:</label>
        <textarea id="car-desc" placeholder="e.g., A powerful car that can be used for transportation." oninput="generateCarSpawnerCode()">A powerful car that can be used for transportation.</textarea>
      </div>
    </div>

    <div class="generator-section">
      <div class="form-grid-3">
        <div class="input-group">
          <label for="car-price">Price:</label>
          <input type="number" id="car-price" placeholder="10000" min="0" value="10000" oninput="generateCarSpawnerCode()">
        </div>

        <div class="input-group">
          <label for="car-spawn-dist">Spawn Distance:</label>
          <input type="number" id="car-spawn-dist" placeholder="200" value="200" oninput="generateCarSpawnerCode()">
          <small>Optional (defaults to 200)</small>
        </div>

        <div class="input-group">
          <label for="car-spawn-height">Spawn Height:</label>
          <input type="number" id="car-spawn-height" placeholder="12" value="12" oninput="generateCarSpawnerCode()">
          <small>Optional (defaults to 12)</small>
        </div>
      </div>

      <div class="form-grid-2">
        <div class="input-group">
          <label for="car-mins">Hull Mins:</label>
          <input type="text" id="car-mins" placeholder="Vector(-32, -32, 0)" value="Vector(-32, -32, 0)" oninput="generateCarSpawnerCode()">
          <small>Used for space check (optional)</small>
        </div>

        <div class="input-group">
          <label for="car-maxs">Hull Maxs:</label>
          <input type="text" id="car-maxs" placeholder="Vector(32, 32, 72)" value="Vector(32, 32, 72)" oninput="generateCarSpawnerCode()">
          <small>Used for space check (optional)</small>
        </div>
      </div>
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
function generateCarSpawnerCode() {
  const vehicleClass = (document.getElementById('car-class').value || '').trim() || 'vehicle_class';
  const name = (document.getElementById('car-name').value || '').trim() || 'Vehicle';
  const desc = (document.getElementById('car-desc').value || '').trim() || 'A vehicle that can be spawned.';
  const price = document.getElementById('car-price').value || '0';
  const spawnDist = (document.getElementById('car-spawn-dist').value || '').trim();
  const spawnHeight = (document.getElementById('car-spawn-height').value || '').trim();
  const mins = (document.getElementById('car-mins').value || '').trim();
  const maxs = (document.getElementById('car-maxs').value || '').trim();

  const lines = [
  '-- Copy and paste this code into the module definitions file',
  '-- Example: garrysmod/gamemodes/[schema folder]/modules/done/carspawner/definitions.lua',
  '',
  `MODULE:RegisterCar(${JSON.stringify(vehicleClass)}, {`,
  `    name = ${JSON.stringify(name)},`,
  `    description = ${JSON.stringify(desc)},`,
  `    price = ${price},`
  ];

  if (spawnDist) lines.push(`    spawnDistance = ${spawnDist},`);
  if (spawnHeight) lines.push(`    spawnHeight = ${spawnHeight},`);
  if (mins) lines.push(`    mins = ${mins},`);
  if (maxs) lines.push(`    maxs = ${maxs},`);

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
  document.getElementById('car-spawn-dist').value = '200';
  document.getElementById('car-spawn-height').value = '12';
  document.getElementById('car-mins').value = 'Vector(-32, -32, 0)';
  document.getElementById('car-maxs').value = 'Vector(32, 32, 72)';
  generateCarSpawnerCode();
}

document.addEventListener('DOMContentLoaded', () => {
  generateCarSpawnerCode();
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


---

## Video Demo

<video controls width="100%" style="width: 100%;">
  <source src="https://bleonheart.github.io/assets/carspawner.mp4" type="video/mp4">
  Your browser does not support the video tag.
</video>
