# Ranking

Ranking system for the gamemode

---

## Generator

<div class="generator-grid">
  <!-- Input Column -->
  <div class="generator-card form-card">
    <div class="generator-section">
      <div class="form-grid-2">
        <div class="input-group">
          <label for="rank-class">Class Constant:</label>
          <input type="text" id="rank-class" placeholder="e.g., CLASS_HARTY" value="CLASS_HARTY" oninput="generateRankingCode()">
          <small>The class key inside lia.ranking.rankTable</small>
        </div>

        <div class="input-group">
          <label for="rank-id">Rank ID:</label>
          <input type="text" id="rank-id" placeholder="e.g., rank_private" value="rank_private" oninput="generateRankingCode()">
          <small>Unique key for this rank inside the class table</small>
        </div>
      </div>

      <div class="form-grid-2">
        <div class="input-group">
          <label for="rank-tag">Rank Tag:</label>
          <input type="text" id="rank-tag" placeholder="e.g., PVT" value="PVT" oninput="generateRankingCode()">
        </div>

        <div class="input-group">
          <label for="rank-name">Rank Name:</label>
          <input type="text" id="rank-name" placeholder="e.g., Private" value="Private" oninput="generateRankingCode()">
        </div>
      </div>

      <div class="input-group">
        <label for="rank-model">Model:</label>
        <input type="text" id="rank-model" placeholder="models/player/group01/male_01.mdl" value="models/player/group01/male_01.mdl" oninput="generateRankingCode()">
      </div>
    </div>

    <div class="generator-section">
      <div class="form-grid-4">
        <div class="input-group">
          <label for="rank-clearance">Clearance:</label>
          <input type="number" id="rank-clearance" min="0" value="1" oninput="generateRankingCode()">
        </div>

        <div class="input-group">
          <label for="rank-salary">Salary:</label>
          <input type="number" id="rank-salary" min="0" value="30" oninput="generateRankingCode()">
        </div>

        <div class="input-group">
          <label for="rank-tier">Tier:</label>
          <input type="number" id="rank-tier" min="0" value="1" oninput="generateRankingCode()">
        </div>

        <div class="input-group">
          <label for="rank-weapons">Weapons:</label>
          <input type="text" id="rank-weapons" placeholder="arccw_bo3_c96, arccw_waw_p38" value="arccw_bo3_c96" oninput="generateRankingCode()">
          <small>Comma-separated swep classnames</small>
        </div>
      </div>

      <div class="form-grid-4">
        <div class="input-group">
          <label>
            <input type="checkbox" id="rank-promote" oninput="generateRankingCode()"> Can Promote
          </label>
        </div>

        <div class="input-group">
          <label>
            <input type="checkbox" id="rank-demote" oninput="generateRankingCode()"> Can Demote
          </label>
        </div>

        <div class="input-group">
          <label>
            <input type="checkbox" id="rank-hire" oninput="generateRankingCode()"> Can Hire
          </label>
        </div>

        <div class="input-group">
          <label>
            <input type="checkbox" id="rank-kick" oninput="generateRankingCode()"> Can Kick
          </label>
        </div>
      </div>
    </div>

    <div class="button-group">
      <button onclick="generateRankingCode()" class="generate-btn">Generate Rank Code</button>
      <button onclick="fillExampleRank()" class="generate-btn example-btn">Generate Example</button>
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
function generateRankingCode() {
  const classConst = (document.getElementById('rank-class').value || '').trim() || 'CLASS_EXAMPLE';
  const rankId = (document.getElementById('rank-id').value || '').trim() || 'rank_example';
  const model = (document.getElementById('rank-model').value || '').trim() || 'models/player/group01/male_01.mdl';
  const tag = (document.getElementById('rank-tag').value || '').trim() || 'TAG';
  const name = (document.getElementById('rank-name').value || '').trim() || 'Rank Name';
  const clearance = document.getElementById('rank-clearance').value || '0';
  const salary = document.getElementById('rank-salary').value || '0';
  const tier = document.getElementById('rank-tier').value || '0';
  const weaponsText = (document.getElementById('rank-weapons').value || '').trim();
  const weapons = weaponsText ? weaponsText.split(',').map(w => w.trim()).filter(Boolean) : [];

  const canPromote = document.getElementById('rank-promote').checked;
  const canDemote = document.getElementById('rank-demote').checked;
  const canHire = document.getElementById('rank-hire').checked;
  const canKick = document.getElementById('rank-kick').checked;

  const lines = [
  '-- Copy and paste this into: modules/done/ranking/config.lua',
  '',
  'lia.ranking.rankTable = lia.ranking.rankTable or {}',
  `lia.ranking.rankTable[${classConst}] = lia.ranking.rankTable[${classConst}] or {}`,
  `lia.ranking.rankTable[${classConst}][${JSON.stringify(rankId)}] = {`,
  `    Clearance = ${clearance},`,
  `    Model = ${JSON.stringify(model)},`,
  `    RankTag = ${JSON.stringify(tag)},`,
  `    RankName = ${JSON.stringify(name)},`,
  `    Salary = ${salary},`,
  `    Weapons = {${weapons.map(w => JSON.stringify(w)).join(', ')}},`,
  `    CanPromote = ${canPromote ? 'true' : 'false'},`,
  `    CanDemote = ${canDemote ? 'true' : 'false'},`,
  `    CanHire = ${canHire ? 'true' : 'false'},`,
  `    CanKick = ${canKick ? 'true' : 'false'},`,
  `    Tier = ${tier},`,
  '}'
  ];

  const code = `${lines.join('\n')}\n`;
  const outputBox = document.getElementById('output-code');
  if (outputBox) outputBox.value = code;
}

function fillExampleRank() {
  document.getElementById('rank-class').value = 'CLASS_HARTY';
  document.getElementById('rank-id').value = 'rank_lieutenant';
  document.getElementById('rank-tag').value = 'LT';
  document.getElementById('rank-name').value = 'Lieutenant';
  document.getElementById('rank-model').value = 'models/player/group01/male_04.mdl';
  document.getElementById('rank-clearance').value = '4';
  document.getElementById('rank-salary').value = '80';
  document.getElementById('rank-tier').value = '4';
  document.getElementById('rank-weapons').value = 'arccw_bo3_c96, arccw_waw_p38';
  document.getElementById('rank-promote').checked = true;
  document.getElementById('rank-demote').checked = true;
  document.getElementById('rank-hire').checked = true;
  document.getElementById('rank-kick').checked = true;
  generateRankingCode();
}

document.addEventListener('DOMContentLoaded', () => {
  generateRankingCode();
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

