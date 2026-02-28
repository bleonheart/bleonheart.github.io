# Description

Persistent medal award system displayed on character profiles with staff permissions for giving/taking medals and admin controls

---

## Generator

<div class="generator-grid">
  <!-- Input Column -->
  <div class="generator-card form-card">
    <div class="generator-section">
      <div class="form-grid-2">
        <div class="input-group">
          <label for="medal-pack">Pack ID:</label>
          <input type="text" id="medal-pack" placeholder="e.g., lapd" value="lapd" oninput="generateMedalCode()">
          <small>Used for MEDAL_PACK_ID and medal asset folder</small>
        </div>

        <div class="input-group">
          <label for="medal-id">Medal ID:</label>
          <input type="text" id="medal-id" placeholder="e.g., lapd_pd1" value="lapd_pd1" oninput="generateMedalCode()">
        </div>
      </div>

      <div class="input-group">
        <label for="medal-name">Medal Name:</label>
        <input type="text" id="medal-name" placeholder="e.g., LAPD - Patrol 1" value="LAPD - Patrol 1" oninput="generateMedalCode()">
      </div>

      <div class="input-group">
        <label for="medal-desc">Description:</label>
        <textarea id="medal-desc" placeholder="e.g., Awarded for ..." oninput="generateMedalCode()">Awarded for attaining Patrol Level 1 in the LAPD.</textarea>
      </div>

    </div>

    <div class="generator-section">
      <div class="input-group">
        <label for="medal-icon">Icon filename:</label>
        <input type="text" id="medal-icon" placeholder="e.g., pd1.png" value="pd1.png" oninput="generateMedalCode()">
        <small>Filename inside medals pack folder</small>
      </div>

      <div class="form-grid-3">
        <div class="input-group">
          <label for="medal-size-w">Size W:</label>
          <input type="number" id="medal-size-w" placeholder="96" min="1" value="96" oninput="generateMedalCode()">
        </div>

        <div class="input-group">
          <label for="medal-size-h">Size H:</label>
          <input type="number" id="medal-size-h" placeholder="80" min="1" value="80" oninput="generateMedalCode()">
        </div>

        <div class="input-group">
          <label for="medal-rtype">Rarity Type:</label>
          <input type="number" id="medal-rtype" placeholder="1" min="1" value="1" oninput="generateMedalCode()">
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
function generateMedalCode() {
  const packId = (document.getElementById('medal-pack').value || '').trim() || 'custom';
  const medalId = (document.getElementById('medal-id').value || '').trim() || 'medal_example';
  const name = (document.getElementById('medal-name').value || '').trim() || 'Unknown Medal';
  const desc = (document.getElementById('medal-desc').value || '').trim() || 'No description.';
  const icon = (document.getElementById('medal-icon').value || '').trim() || 'default.png';
  const sizeW = document.getElementById('medal-size-w').value || '96';
  const sizeH = document.getElementById('medal-size-h').value || '80';
  const rtype = document.getElementById('medal-rtype').value || '1';

  const lines = [
  '-- Copy and paste this code into a medals pack file',
  '-- Example: garrysmod/gamemodes/[schema folder]/modules/done/medals/medals/<pack>.lua',
  '',
  'MEDAL_PACK_ID = ' + JSON.stringify(packId),
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
  document.getElementById('medal-pack').value = 'lapd';
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
  generateMedalCode();
});
</script>
