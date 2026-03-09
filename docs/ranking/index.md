# Class Ranking

Comprehensive hierarchical ranking system that manages player positions within classes. Provides promotion, demotion, hiring, and kicking functionality with tier-based permissions. Automatically assigns rank-specific weapons, clearance levels, and models. Includes administrative commands and privilege-based access control for class management.

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
          <small>The top-level key inside <code>lia.ranking.rankTable</code> for the class you are defining ranks for.</small>
        </div>

        <div class="input-group">
          <label for="rank-id">Rank ID:</label>
          <input type="text" id="rank-id" placeholder="e.g., rank_private" value="rank_private" oninput="generateRankingCode()">
          <small>Unique key for this rank within the selected class; used to reference/promote/demote to this rank.</small>
        </div>
      </div>

      <div class="form-grid-2">
        <div class="input-group">
          <label for="rank-tag">Rank Tag:</label>
          <input type="text" id="rank-tag" placeholder="e.g., PVT" value="PVT" oninput="generateRankingCode()">
          <small>Rank abbreviation/shorthand shown in UI/overhead displays (module-defined usage).</small>
        </div>

        <div class="input-group">
          <label for="rank-name">Rank Name:</label>
          <input type="text" id="rank-name" placeholder="e.g., Private" value="Private" oninput="generateRankingCode()">
          <small>The full readable name shown for this rank.</small>
        </div>
      </div>

      <div class="input-group">
        <label for="rank-model">Model:</label>
        <input type="text" id="rank-model" placeholder="models/player/group01/male_01.mdl" value="models/player/group01/male_01.mdl" oninput="generateRankingCode()">
        <small>Player model applied/used for this rank (module-defined behavior).</small>
      </div>
    </div>

    <div class="generator-section">
      <div class="form-grid-4">
        <div class="input-group">
          <label for="rank-clearance">Clearance:</label>
          <input type="number" id="rank-clearance" min="0" value="1" oninput="generateRankingCode()">
          <small>Clearance level required/granted for this rank (used by clearance/door systems if your schema ties them together).</small>
        </div>

        <div class="input-group">
          <label for="rank-salary">Salary:</label>
          <input type="number" id="rank-salary" min="0" value="30" oninput="generateRankingCode()">
          <small>Salary/pay value associated with this rank (how/when it is paid is schema/module-defined).</small>
        </div>

        <div class="input-group">
          <label for="rank-tier">Tier:</label>
          <input type="number" id="rank-tier" min="0" value="1" oninput="generateRankingCode()">
          <small>Tier/order value for this rank (commonly used to compare seniority; higher usually means higher rank).</small>
        </div>
      </div>

      <div class="generator-section">
        <div class="input-group">
          <label>Weapons:</label>
          <small>Each row is one swep classname entry in the "Weapons" list.</small>
        </div>

        <div id="weapon-list" class="dynamic-list"></div>
        <button type="button" class="add-btn" onclick="addWeaponRow()">Add Weapon</button>
      </div>

      <div class="form-grid-4">
        <div class="input-group">
          <label>
            <input type="checkbox" id="rank-promote" oninput="generateRankingCode()"> Can Promote
          </label>
          <small>If enabled, players of this rank can promote other members.</small>
        </div>

        <div class="input-group">
          <label>
            <input type="checkbox" id="rank-demote" oninput="generateRankingCode()"> Can Demote
          </label>
          <small>If enabled, players of this rank can demote other members.</small>
        </div>

        <div class="input-group">
          <label>
            <input type="checkbox" id="rank-hire" oninput="generateRankingCode()"> Can Hire
          </label>
          <small>If enabled, players of this rank can hire/recruit into the class.</small>
        </div>

        <div class="input-group">
          <label>
            <input type="checkbox" id="rank-kick" oninput="generateRankingCode()"> Can Kick
          </label>
          <small>If enabled, players of this rank can remove members from the class.</small>
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
function setupLiveUpdate(generateFn) {
  if (typeof generateFn !== 'function') return;
  const root = document.querySelector('.generator-card.form-card') || document;
  const handler = () => generateFn();

  root.querySelectorAll('input, select, textarea').forEach(el => {
    el.addEventListener('input', handler);
    el.addEventListener('change', handler);
  });
}

function weaponRowTemplate(idx, weapon) {
  return `
  <div class="dynamic-row" data-idx="${idx}">
    <input type="text" class="weapon-class" placeholder="arccw_bo3_c96" value="${weapon || ''}" oninput="generateRankingCode()">
    <button type="button" class="remove-btn" onclick="removeWeaponRow(this)">×</button>
  </div>`;
}

function addWeaponRow(weapon) {
  const list = document.getElementById('weapon-list');
  const idx = list.children.length;
  list.insertAdjacentHTML('beforeend', weaponRowTemplate(idx, weapon));
  generateRankingCode();
}

function removeWeaponRow(btn) {
  const row = btn.closest('.dynamic-row');
  if (row) row.remove();
  generateRankingCode();
}

function generateRankingCode() {
  const classConst = (document.getElementById('rank-class').value || '').trim() || 'CLASS_EXAMPLE';
  const rankId = (document.getElementById('rank-id').value || '').trim() || 'rank_example';
  const model = (document.getElementById('rank-model').value || '').trim() || 'models/player/group01/male_01.mdl';
  const tag = (document.getElementById('rank-tag').value || '').trim() || 'TAG';
  const name = (document.getElementById('rank-name').value || '').trim() || 'Rank Name';
  const clearance = document.getElementById('rank-clearance').value || '0';
  const salary = document.getElementById('rank-salary').value || '0';
  const tier = document.getElementById('rank-tier').value || '0';
  const rows = Array.from(document.querySelectorAll('#weapon-list .dynamic-row'));
  const weapons = [];
  for (const row of rows) {
    const weapon = (row.querySelector('.weapon-class').value || '').trim();
    if (!weapon) continue;
    weapons.push(weapon);
  }

  const canPromote = document.getElementById('rank-promote').checked;
  const canDemote = document.getElementById('rank-demote').checked;
  const canHire = document.getElementById('rank-hire').checked;
  const canKick = document.getElementById('rank-kick').checked;

  const lines = [
  '-- Copy and paste this into: modules/done/ranking/config.lua',
  '',
  'lia.ranking.rankTable = lia.ranking.rankTable or {}',
  `lia.ranking.rankTable[${classConst}] = lia.ranking.rankTable[${classConst}] or {}`,
  `lia.ranking.registerRank(${classConst}, ${JSON.stringify(rankId)}, {`,
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
  '})'
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

  const list = document.getElementById('weapon-list');
  list.innerHTML = '';
  addWeaponRow('arccw_bo3_c96');
  addWeaponRow('arccw_waw_p38');

  document.getElementById('rank-promote').checked = true;
  document.getElementById('rank-demote').checked = true;
  document.getElementById('rank-hire').checked = true;
  document.getElementById('rank-kick').checked = true;
  generateRankingCode();
}

document.addEventListener('DOMContentLoaded', () => {
  const list = document.getElementById('weapon-list');
  list.innerHTML = '';
  addWeaponRow('arccw_bo3_c96');
  setupLiveUpdate(generateRankingCode);
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

