# Comprehensive Medal

A comprehensive medal award and display system featuring multiple themed medal packs (1942 RP, US Military branches, Police departments, Star Wars RP), persistent character-based medal storage with rarity tiers (Common, Uncommon, Rare, Exceptionally Rare), staff permissions for medal management, wearable medal slots (up to 5 medals), character profile integration, and admin controls for giving/taking medals with full network synchronization

---

## Generator

<div class="generator-grid">
  <!-- Input Column -->
  <div class="generator-card form-card">
    <div class="generator-section">
      <div class="form-grid-2">
        <div class="input-group">
          <label for="medal-id">Medal ID:</label>
          <input type="text" id="medal-id" placeholder="e.g., lapd_pd1" value="lapd_pd1" oninput="generateMedalCode()">
          <small>Unique identifier/key for this medal.</small>
        </div>

        <div class="input-group">
          <label for="medal-name">Medal Name:</label>
          <input type="text" id="medal-name" placeholder="e.g., LAPD - Patrol 1" value="LAPD - Patrol 1" oninput="generateMedalCode()">
          <small>Display name shown to players.</small>
        </div>
      </div>

      <div class="input-group">
        <label for="medal-desc">Description:</label>
        <textarea id="medal-desc" placeholder="e.g., Awarded for ..." oninput="generateMedalCode()">Awarded for attaining Patrol Level 1 in the LAPD.</textarea>
        <small>Description shown to players (tooltip/details panel).</small>
      </div>

    </div>

    <div class="generator-section">
      <div class="input-group">
        <label for="medal-icon">Icon filename:</label>
        <input type="text" id="medal-icon" placeholder="e.g., pd1.png" value="pd1.png" oninput="generateMedalCode()">
        <small>Filename inside medals pack folder. Use lowercase letters, numbers, and underscores only.</small>
      </div>

      <div class="form-grid-3">
        <div class="input-group">
          <label for="medal-size-w">Size W:</label>
          <input type="number" id="medal-size-w" placeholder="96" min="1" value="96" oninput="generateMedalCode()">
          <small>Icon render width in pixels.</small>
        </div>

        <div class="input-group">
          <label for="medal-size-h">Size H:</label>
          <input type="number" id="medal-size-h" placeholder="80" min="1" value="80" oninput="generateMedalCode()">
          <small>Icon render height in pixels.</small>
        </div>

        <div class="input-group">
          <label for="medal-rtype">Rarity Type:</label>
          <select id="medal-rtype" onchange="generateMedalCode()">
            <option value="1">Common</option>
            <option value="2">Uncommon</option>
            <option value="3">Rare</option>
            <option value="4">Legendary</option>
          </select>
          <small>Controls rarity styling/labeling for this medal.</small>
        </div>
      </div>
    </div>

    <div class="button-group">
      <button onclick="generateMedalCode()" class="generate-btn">Generate Medal Code</button>
      <button onclick="fillExampleMedal()" class="generate-btn example-btn">Generate Example</button>
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

function generateMedalCode() {
  const packId = 'custom';
  const medalId = (document.getElementById('medal-id').value || '').trim() || 'medal_example';
  const name = (document.getElementById('medal-name').value || '').trim() || 'Unknown Medal';
  const desc = (document.getElementById('medal-desc').value || '').trim() || 'No description.';
  const icon = (document.getElementById('medal-icon').value || '').trim() || 'default.png';
  const sizeW = document.getElementById('medal-size-w').value || '96';
  const sizeH = document.getElementById('medal-size-h').value || '80';
  const rtype = document.getElementById('medal-rtype').value || '1';

  const lines = [
  '-- Copy and paste this code into a medals pack file',
  '-- Example: garrysmod/gamemodes/[schema folder]/modules/medals/medals/<pack>.lua',
  '',
  `lia.medals.registerMedal(${JSON.stringify(medalId)}, {`,
  '    name = ' + JSON.stringify(name) + ',',
  '    desc = ' + JSON.stringify(desc) + ',',
  '    size_w = ' + sizeW + ',',
  '    size_h = ' + sizeH + ',',
  '    rtype = ' + rtype + ',',
  '    icon = ' + JSON.stringify(icon) + ',',
  '    TextFont = "Trebuchet18",',
  '    TextColor = Color(255, 255, 255),',
  '    TextHeight = 18',
  '})'
  ];

  const code = `${lines.join('\n')}\n`;

  const outputBox = document.getElementById('output-code');
  if (outputBox) {
    outputBox.value = code;
  }
}

function fillExampleMedal() {
  document.getElementById('medal-id').value = 'lapd_pd1';
  document.getElementById('medal-name').value = 'LAPD - Patrol 1';
  document.getElementById('medal-desc').value = 'Awarded for attaining Patrol Level 1 in the LAPD.';
  document.getElementById('medal-icon').value = 'pd1.png';
  document.getElementById('medal-size-w').value = '96';
  document.getElementById('medal-size-h').value = '80';
  document.getElementById('medal-rtype').value = '1';
  generateMedalCode();
}

// Initial generation
document.addEventListener('DOMContentLoaded', () => {
  setupLiveUpdate(generateMedalCode);
  generateMedalCode();
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
  <source src="https://bleonheart.github.io/assets/medals.mp4" type="video/mp4">
  Your browser does not support the video tag.
</video>
