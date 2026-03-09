# Security Clearance

Implements a comprehensive security clearance level system that controls access to restricted areas through door permissions. Features include character-based clearance levels, administrative management tools, flag-based access control, and integration with the existing door system to enforce security restrictions based on player authorization levels.

---

## Generator

<div class="generator-grid">
  <!-- Input Column -->
  <div class="generator-card form-card">
    <div class="generator-section">
      <div class="form-grid-3">
        <div class="input-group">
          <label for="clearance-level">Level:</label>
          <input type="number" id="clearance-level" min="0" value="1" oninput="generateClearanceCode()">
          <small>Clearance level number</small>
        </div>

        <div class="input-group">
          <label for="clearance-pay">Pay Bonus:</label>
          <input type="number" id="clearance-pay" value="25" oninput="generateClearanceCode()">
          <small>Extra pay/salary bonus granted for this clearance level (module-defined meaning).</small>
        </div>

        <div class="input-group">
          <label>
            <input type="checkbox" id="clearance-warned" oninput="generateClearanceCode()"> Warned
          </label>
          <small>If enabled, players of this clearance level receive hack alerts.</small>
        </div>
      </div>

      <div class="input-group">
        <label for="clearance-title">Title:</label>
        <input type="text" id="clearance-title" placeholder="e.g., Clearance level 1 required - Enlisted Access." value="Clearance level 1 required - Enlisted Access." oninput="generateClearanceCode()">
        <small>Short title/summary shown to players for this clearance level.</small>
      </div>

      <div class="input-group">
        <label for="clearance-desc">Description:</label>
        <textarea id="clearance-desc" placeholder="e.g., Enlisted access for standard operational areas." oninput="generateClearanceCode()">Enlisted access for standard operational areas.</textarea>
        <small>Longer description of what this clearance level represents or grants.</small>
      </div>
    </div>

    <div class="generator-section">
      <div class="form-grid-3">
        <div class="input-group">
          <label for="clearance-passes">Passes:</label>
          <input type="number" id="clearance-passes" min="0" value="2" oninput="generateClearanceCode()">
          <small>How many passes/uses this clearance level provides (module-defined meaning).</small>
        </div>

        <div class="input-group">
          <label for="speed-min">Speed Min:</label>
          <input type="number" id="speed-min" value="300" oninput="generateClearanceCode()">
          <small>Minimum speed value for this clearance tier (used by module configuration).</small>
        </div>

        <div class="input-group">
          <label for="speed-max">Speed Max:</label>
          <input type="number" id="speed-max" value="360" oninput="generateClearanceCode()">
          <small>Maximum speed value for this clearance tier (used by module configuration).</small>
        </div>
      </div>

      <div class="form-grid-2">
        <div class="input-group">
          <label for="width-green">Width Green:</label>
          <input type="number" id="width-green" value="50" oninput="generateClearanceCode()">
          <small>Green width setting used by the module (UI/scan tuning).</small>
        </div>

        <div class="input-group">
          <label for="width-blue">Width Blue:</label>
          <input type="number" id="width-blue" value="40" oninput="generateClearanceCode()">
          <small>Blue width setting used by the module (UI/scan tuning).</small>
        </div>
      </div>
    </div>

    <div class="button-group">
      <button onclick="generateClearanceCode()" class="generate-btn">Generate Clearance Code</button>
      <button onclick="fillExampleClearance()" class="generate-btn example-btn">Generate Example</button>
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

function generateClearanceCode() {
  const level = document.getElementById('clearance-level').value || '0';
  const title = (document.getElementById('clearance-title').value || '').trim() || 'Clearance Title';
  const pay = document.getElementById('clearance-pay').value || '0';
  const desc = (document.getElementById('clearance-desc').value || '').trim() || '';
  const passes = document.getElementById('clearance-passes').value || '0';
  const speedMin = document.getElementById('speed-min').value || '240';
  const speedMax = document.getElementById('speed-max').value || '360';
  const widthGreen = document.getElementById('width-green').value || '50';
  const widthBlue = document.getElementById('width-blue').value || '40';
  const warned = document.getElementById('clearance-warned').checked;

  const lines = [
  '-- Copy and paste this code into the module definitions file',
  '-- Example: garrysmod/gamemodes/[schema folder]/modules/clearance/definitions.lua',
  '',
  `MODULE:RegisterClearance(${level}, {`,
  `    title = ${JSON.stringify(title)},`,
  `    pay = ${pay},`,
  `    desc = ${JSON.stringify(desc)},`,
  `    passes = ${passes},`,
  '    speed = {',
  `        min = ${speedMin},`,
  `        max = ${speedMax}`,
  '    },',
  '    width = {',
  `        green = ${widthGreen},`,
  `        blue = ${widthBlue}`,
  '    },',
  `    warned = ${warned ? 'true' : 'false'}`,
  '})'
  ];

  const code = `${lines.join('\n')}\n`;
  const outputBox = document.getElementById('output-code');
  if (outputBox) outputBox.value = code;
}

function fillExampleClearance() {
  document.getElementById('clearance-level').value = '3';
  document.getElementById('clearance-title').value = 'Clearance level 3 required - Senior NCOs Access.';
  document.getElementById('clearance-pay').value = '75';
  document.getElementById('clearance-desc').value = 'Senior NCOs access for senior operational areas.';
  document.getElementById('clearance-passes').value = '4';
  document.getElementById('speed-min').value = '420';
  document.getElementById('speed-max').value = '540';
  document.getElementById('width-green').value = '50';
  document.getElementById('width-blue').value = '40';
  document.getElementById('clearance-warned').checked = true;
  generateClearanceCode();
}

document.addEventListener('DOMContentLoaded', () => {
  setupLiveUpdate(generateClearanceCode);
  generateClearanceCode();
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
  <source src="https://bleonheart.github.io/assets/clearance.mp4" type="video/mp4">
  Your browser does not support the video tag.
</video>
