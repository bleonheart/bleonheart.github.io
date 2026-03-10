# Advanced Radio Communication

Comprehensive radio communication framework featuring handheld radios and stationary broadcast units with frequency tuning, encrypted faction channels, preset stations, range-based transmission, static noise effects, and Star Wars RP comlink compatibility. Supports both item-based and entity-based radio devices with real-time voice transmission, channel management, and secure communications for different factions.

---

## Generator

<div class="generator-grid">
  <!-- Input Column -->
  <div class="generator-card form-card">
    <div class="generator-section">
      <div class="form-grid-2">
        <button id="radio-tab-preset" onclick="showRadioTab('preset')" class="generate-btn">Preset Generator</button>
        <button id="radio-tab-encrypted" onclick="showRadioTab('encrypted')" class="generate-btn example-btn">Encrypted Generator</button>
      </div>
    </div>

    <div id="radio-panel-preset">
      <div class="generator-section">
        <div class="form-grid-2">
          <div class="input-group">
            <label for="preset-frequency">Frequency:</label>
            <input type="text" id="preset-frequency" placeholder="e.g., 101.1" value="101.1" oninput="generatePresetCode()">
            <small>Radio frequency for this preset.</small>
          </div>

          <div class="input-group">
            <label for="preset-name">Preset Name:</label>
            <input type="text" id="preset-name" placeholder="e.g., Emergency Channel" value="Emergency Channel" oninput="generatePresetCode()">
            <small>Label shown for this preset in the radio UI (frequency remains the actual channel identifier).</small>
          </div>
        </div>
      </div>

      <div class="button-group">
        <button onclick="generatePresetCode()" class="generate-btn">Generate Preset Code</button>
        <button onclick="fillExamplePreset()" class="generate-btn example-btn">Generate Example</button>
      </div>
    </div>

    <div id="radio-panel-encrypted" style="display: none;">
      <div class="generator-section">
        <div class="form-grid-2">
          <div class="input-group">
            <label for="encrypted-frequency">Frequency:</label>
            <input type="text" id="encrypted-frequency" placeholder="e.g., 101.1" value="101.1" oninput="generateEncryptedCode()">
            <small>Radio frequency for this encrypted channel.</small>
          </div>

          <div class="input-group">
            <label for="encrypted-name">Channel Name:</label>
            <input type="text" id="encrypted-name" placeholder="e.g., Police Channel" value="Police Channel" oninput="generateEncryptedCode()">
            <small>Optional name shown in the radio UI for the encrypted channel; if empty, the frequency is typically shown by itself (module-defined behavior).</small>
          </div>
        </div>

        <div class="generator-section">
          <div class="input-group">
            <label>Factions:</label>
            <small>Each row is one faction constant that can access this frequency.</small>
          </div>

          <div id="encrypted-faction-list" class="dynamic-list"></div>
          <button type="button" class="add-btn" onclick="addEncryptedFactionRow()">Add Faction</button>
        </div>
      </div>

      <div class="button-group">
        <button onclick="generateEncryptedCode()" class="generate-btn">Generate Encrypted Code</button>
        <button onclick="fillExampleEncrypted()" class="generate-btn example-btn">Generate Example</button>
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

function showRadioTab(which) {
  const presetPanel = document.getElementById('radio-panel-preset');
  const encryptedPanel = document.getElementById('radio-panel-encrypted');

  if (which === 'encrypted') {
    presetPanel.style.display = 'none';
    encryptedPanel.style.display = 'block';
    generateEncryptedCode();
  } else {
    presetPanel.style.display = 'block';
    encryptedPanel.style.display = 'none';
    generatePresetCode();
  }
}

function encryptedFactionRowTemplate(idx, faction) {
  return `
  <div class="dynamic-row" data-idx="${idx}">
    <input type="text" class="enc-faction" placeholder="FACTION_POLICE" value="${faction || ''}" oninput="generateEncryptedCode()">
    <button type="button" class="remove-btn" onclick="removeEncryptedFactionRow(this)">×</button>
  </div>`;
}

function addEncryptedFactionRow(faction) {
  const list = document.getElementById('encrypted-faction-list');
  const idx = list.children.length;
  list.insertAdjacentHTML('beforeend', encryptedFactionRowTemplate(idx, faction));
  generateEncryptedCode();
}

function removeEncryptedFactionRow(btn) {
  const row = btn.closest('.dynamic-row');
  if (row) row.remove();
  generateEncryptedCode();
}

function generatePresetCode() {
  const frequency = (document.getElementById('preset-frequency').value || '').trim() || '101.1';
  const presetName = (document.getElementById('preset-name').value || '').trim() || 'Preset Channel';

  const lines = [
  '-- Copy and paste this code into the module definitions file',
  '-- Example: garrysmod/gamemodes/[schema folder]/modules/radio/definitions.lua',
  '',
  `lia.radio.registerPresetFrequency(${JSON.stringify(frequency)}, ${JSON.stringify(presetName)})`
  ];

  const code = `${lines.join('\n')}\n`;
  const outputBox = document.getElementById('output-code');
  if (outputBox) outputBox.value = code;
}

function generateEncryptedCode() {
  const frequency = (document.getElementById('encrypted-frequency').value || '').trim() || '101.1';
  const channelName = (document.getElementById('encrypted-name').value || '').trim();

  const rows = Array.from(document.querySelectorAll('#encrypted-faction-list .dynamic-row'));
  const factions = [];
  for (const row of rows) {
    const faction = (row.querySelector('.enc-faction').value || '').trim();
    if (!faction) continue;
    factions.push(faction);
  }

  const lines = [
  '-- Copy and paste this code into the module definitions file',
  '-- Example: garrysmod/gamemodes/[schema folder]/modules/radio/definitions.lua',
  ''
  ];

  const factionLuaValues = factions.map(luaValueFromText).filter(Boolean);
  const factionTable = factionLuaValues.length > 0 ? `{${factionLuaValues.join(', ')}}` : '{}';
  
  if (channelName) {
    lines.push(`lia.radio.registerEncryptedFrequency(${JSON.stringify(frequency)}, ${factionTable}, ${JSON.stringify(channelName)})`);
  } else {
    lines.push(`lia.radio.registerEncryptedFrequency(${JSON.stringify(frequency)}, ${factionTable})`);
  }

  const code = `${lines.join('\n')}\n`;
  const outputBox = document.getElementById('output-code');
  if (outputBox) outputBox.value = code;
}

function fillExamplePreset() {
  document.getElementById('preset-frequency').value = '101.1';
  document.getElementById('preset-name').value = 'Emergency Channel';
  generatePresetCode();
}

function fillExampleEncrypted() {
  document.getElementById('encrypted-frequency').value = '102.2';
  document.getElementById('encrypted-name').value = 'Police Channel';

  const list = document.getElementById('encrypted-faction-list');
  list.innerHTML = '';
  addEncryptedFactionRow('FACTION_POLICE');
  addEncryptedFactionRow('FACTION_MEDIC');

  generateEncryptedCode();
}

document.addEventListener('DOMContentLoaded', () => {
  const list = document.getElementById('encrypted-faction-list');
  if (list) {
    list.innerHTML = '';
    addEncryptedFactionRow('FACTION_POLICE');
  }
  setupLiveUpdate(() => {
    const encryptedPanel = document.getElementById('radio-panel-encrypted');
    if (encryptedPanel && encryptedPanel.style.display !== 'none') {
      generateEncryptedCode();
    } else {
      generatePresetCode();
    }
  });
  showRadioTab('preset');
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
  <source src="https://bleonheart.github.io/assets/radio.mp4" type="video/mp4">
  Your browser does not support the video tag.
</video>
