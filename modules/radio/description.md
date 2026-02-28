# Description

Handheld radio voice chat system with frequency tuning, encrypted channels, faction access, static radios, and range-based communication

---

## Generator

<div class="generator-grid">
  <!-- Input Column -->
  <div class="generator-card form-card">
    <div class="generator-section">
      <div class="form-grid-2">
        <div class="input-group">
          <label for="radio-frequency">Frequency:</label>
          <input type="text" id="radio-frequency" placeholder="e.g., 101.1" value="101.1" oninput="generateRadioCode()">
          <small>Radio frequency as a string (e.g. 101.1)</small>
        </div>

        <div class="input-group">
          <label for="radio-type">Type:</label>
          <select id="radio-type" oninput="generateRadioCode()">
            <option value="preset" selected>Preset Frequency</option>
            <option value="encrypted">Encrypted Frequency</option>
          </select>
        </div>
      </div>

      <div class="input-group">
        <label for="radio-name">Preset Name (preset only):</label>
        <input type="text" id="radio-name" placeholder="e.g., Emergency Channel" value="Emergency Channel" oninput="generateRadioCode()">
      </div>

    </div>

    <div class="generator-section">
      <div class="input-group">
        <label for="radio-factions">Factions (encrypted only):</label>
        <textarea id="radio-factions" placeholder="FACTION_POLICE, FACTION_MEDIC" oninput="generateRadioCode()">FACTION_POLICE</textarea>
        <small>Comma-separated faction constants</small>
      </div>
    </div>

    <div class="button-group">
      <button onclick="generateRadioCode()" class="generate-btn">Generate Radio Code</button>
      <button onclick="fillExampleRadio()" class="generate-btn example-btn">Generate Example</button>
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
function generateRadioCode() {
  const frequency = (document.getElementById('radio-frequency').value || '').trim() || '101.1';
  const type = document.getElementById('radio-type').value;
  const presetName = (document.getElementById('radio-name').value || '').trim() || 'Preset Channel';
  const factionsText = (document.getElementById('radio-factions').value || '').trim();
  const factions = factionsText.split(',').map(f => f.trim()).filter(Boolean);

  const lines = [
  '-- Copy and paste this code into the module definitions file',
  '-- Example: garrysmod/gamemodes/[schema folder]/modules/radio/definitions.lua',
  ''
  ];

  if (type === 'preset') {
    lines.push(`lia.radio.registerPresetFrequency(${JSON.stringify(frequency)}, ${JSON.stringify(presetName)})`);
  } else {
    const factionTable = factions.length > 0 ? `{${factions.join(', ')}}` : '{}';
    lines.push(`lia.radio.registerEncryptedFrequency(${JSON.stringify(frequency)}, ${factionTable})`);
  }

  const code = `${lines.join('\n')}\n`;
  const outputBox = document.getElementById('output-code');
  if (outputBox) outputBox.value = code;
}

function fillExampleRadio() {
  document.getElementById('radio-frequency').value = '101.1';
  document.getElementById('radio-type').value = 'preset';
  document.getElementById('radio-name').value = 'Emergency Channel';
  document.getElementById('radio-factions').value = 'FACTION_POLICE';
  generateRadioCode();
}

document.addEventListener('DOMContentLoaded', () => {
  generateRadioCode();
});
</script>
