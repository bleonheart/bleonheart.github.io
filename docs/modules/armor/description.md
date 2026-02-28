# Description

Adds Funny Armors

---

## Generator

<div class="generator-grid">
  <!-- Input Column -->
  <div class="generator-card form-card">
    <div class="generator-section">
      <div class="form-grid-2">
        <button id="armor-tab-armor" onclick="showArmorTab('armor')" class="generate-btn">Armor Generator</button>
        <button id="armor-tab-mod" onclick="showArmorTab('mod')" class="generate-btn example-btn">Mod Generator</button>
      </div>
    </div>

    <div id="armor-panel-armor">
      <div class="generator-section">
        <div class="form-grid-2">
          <div class="input-group">
            <label for="armor-id">Unique ID:</label>
            <input type="text" id="armor-id" placeholder="e.g., combinesoldier" value="combinesoldier" oninput="generateArmorCode()">
            <small>Unique identifier for this armor (no spaces, lowercase)</small>
          </div>

          <div class="input-group">
            <label for="armor-name">Armor Name:</label>
            <input type="text" id="armor-name" placeholder="e.g., Combine Soldier Armor" value="Combine Soldier Armor" oninput="generateArmorCode()">
          </div>
        </div>

        <div class="input-group">
          <label for="armor-desc">Description:</label>
          <textarea id="armor-desc" placeholder="e.g., Standard combat armor worn by Combine soldiers" oninput="generateArmorCode()">Standard combat armor worn by Combine soldiers</textarea>
        </div>
      </div>

      <div class="generator-section">
        <div class="form-grid-2">
          <div class="input-group">
            <label for="armor-icon">Icon Model:</label>
            <input type="text" id="armor-icon" placeholder="models/player/combine_soldier.mdl" value="models/player/combine_soldier.mdl" oninput="generateArmorCode()">
            <small>Shown in inventory (also defaults item model)</small>
          </div>

          <div class="input-group">
            <label for="armor-model">Player Model:</label>
            <input type="text" id="armor-model" placeholder="models/player/combine_soldier.mdl" value="models/player/combine_soldier.mdl" oninput="generateArmorCode()">
            <small>Applied to player when equipped (optional)</small>
          </div>
        </div>

        <div class="form-grid-3">
          <div class="input-group">
            <label for="armor-resistance">Resistance:</label>
            <input type="number" id="armor-resistance" placeholder="50" min="0" max="100" value="50" oninput="generateArmorCode()">
            <small>0-100 damage resistance</small>
          </div>

          <div class="input-group">
            <label for="armor-speed">Speed Boost:</label>
            <input type="number" id="armor-speed" placeholder="0" value="-5" oninput="generateArmorCode()">
            <small>Negative slows, positive speeds up</small>
          </div>

          <div class="input-group">
            <label for="armor-jump">Jump Boost:</label>
            <input type="number" id="armor-jump" placeholder="0" value="-5" oninput="generateArmorCode()">
          </div>
        </div>

        <div class="form-grid-3">
          <div class="input-group">
            <label>
              <input type="checkbox" id="armor-falldmg" checked oninput="generateArmorCode()"> Takes Fall Damage
            </label>
          </div>

          <div class="input-group">
            <label>
              <input type="checkbox" id="armor-pa" oninput="generateArmorCode()"> Power Armor
            </label>
          </div>

          <div class="input-group">
            <label for="armor-overlay">Overlay:</label>
            <input type="text" id="armor-overlay" placeholder="e.g., gasmask.png" value="power_armor_t51b.png" oninput="generateArmorCode()">
            <small>Leave empty for none</small>
          </div>
        </div>

        <div class="input-group">
          <label for="armor-footstep">Footstep Sound:</label>
          <input type="text" id="armor-footstep" placeholder="e.g., npc/combine_soldier/gear1.wav" value="" oninput="generateArmorCode()">
          <small>Leave empty for nil</small>
        </div>

        <div class="input-group">
          <label for="armor-supported-mods">Supported Mods:</label>
          <textarea id="armor-supported-mods" placeholder="fortified, wardbound, swift" oninput="generateArmorCode()">fortified, wardbound, swift, temper</textarea>
          <small>Comma-separated mod types (not uniqueIDs). Example: swift, regen</small>
        </div>
      </div>

      <div class="button-group">
        <button onclick="generateArmorCode()" class="generate-btn">Generate Armor Code</button>
        <button onclick="fillExampleArmor()" class="generate-btn example-btn">Generate Example</button>
      </div>
    </div>

    <div id="armor-panel-mod" style="display: none;">
      <div class="generator-section">
        <div class="form-grid-2">
          <div class="input-group">
            <label for="mod-id">Unique ID:</label>
            <input type="text" id="mod-id" placeholder="e.g., mod_fortified" value="mod_fortified" oninput="generateArmorModCode()">
            <small>Unique identifier for this mod item</small>
          </div>

          <div class="input-group">
            <label for="mod-type">Mod Type:</label>
            <input type="text" id="mod-type" placeholder="e.g., fortified" value="fortified" oninput="generateArmorModCode()">
            <small>This must match armor "supportedMods" entries</small>
          </div>
        </div>

        <div class="input-group">
          <label for="mod-name">Mod Name:</label>
          <input type="text" id="mod-name" placeholder="e.g., Fortified Mod" value="Fortified Mod" oninput="generateArmorModCode()">
        </div>

        <div class="input-group">
          <label for="mod-desc">Description:</label>
          <textarea id="mod-desc" placeholder="e.g., Increases physical damage resistance" oninput="generateArmorModCode()">Increases physical damage resistance.</textarea>
        </div>
      </div>

      <div class="generator-section">
        <div class="form-grid-2">
          <div class="input-group">
            <label for="mod-effectdesc">Effect Description:</label>
            <input type="text" id="mod-effectdesc" placeholder="e.g., +5% physical resistance" value="+5% physical resistance" oninput="generateArmorModCode()">
          </div>

          <div class="input-group">
            <label for="mod-model">Model:</label>
            <input type="text" id="mod-model" placeholder="models/props_lab/box01a.mdl" value="models/props_lab/box01a.mdl" oninput="generateArmorModCode()">
          </div>
        </div>

        <div class="form-grid-3">
          <div class="input-group">
            <label for="mod-phys">Physical Resist:</label>
            <input type="number" id="mod-phys" value="5" oninput="generateArmorModCode()">
          </div>

          <div class="input-group">
            <label for="mod-magic">Magic Resist:</label>
            <input type="number" id="mod-magic" value="0" oninput="generateArmorModCode()">
          </div>

          <div class="input-group">
            <label for="mod-regen">Regen:</label>
            <input type="number" id="mod-regen" value="0" oninput="generateArmorModCode()">
          </div>
        </div>

        <div class="form-grid-2">
          <div class="input-group">
            <label for="mod-speed">Speed:</label>
            <input type="number" id="mod-speed" value="0" oninput="generateArmorModCode()">
          </div>

          <div class="input-group">
            <label for="mod-dmg">Damage:</label>
            <input type="number" id="mod-dmg" value="0" oninput="generateArmorModCode()">
          </div>
        </div>
      </div>

      <div class="button-group">
        <button onclick="generateArmorModCode()" class="generate-btn">Generate Mod Code</button>
        <button onclick="fillExampleArmorMod()" class="generate-btn example-btn">Generate Example</button>
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
function showArmorTab(which) {
  const armorPanel = document.getElementById('armor-panel-armor');
  const modPanel = document.getElementById('armor-panel-mod');

  if (which === 'mod') {
    armorPanel.style.display = 'none';
    modPanel.style.display = 'block';
    generateArmorModCode();
  } else {
    armorPanel.style.display = 'block';
    modPanel.style.display = 'none';
    generateArmorCode();
  }
}

function generateArmorCode() {
  const uniqueId = (document.getElementById('armor-id').value || '').trim() || 'armor_example';
  const name = (document.getElementById('armor-name').value || '').trim() || 'Armor';
  const desc = (document.getElementById('armor-desc').value || '').trim() || 'Armor description.';
  const icon = (document.getElementById('armor-icon').value || '').trim() || 'models/hunter/blocks/cube025x025x025.mdl';
  const model = (document.getElementById('armor-model').value || '').trim();
  const footstep = (document.getElementById('armor-footstep').value || '').trim();
  const jumpBoost = document.getElementById('armor-jump').value || '0';
  const speedBoost = document.getElementById('armor-speed').value || '0';
  const resistance = document.getElementById('armor-resistance').value || '0';
  const fallDamage = document.getElementById('armor-falldmg').checked;
  const powerArmor = document.getElementById('armor-pa').checked;
  const overlay = (document.getElementById('armor-overlay').value || '').trim();
  const supportedModsText = (document.getElementById('armor-supported-mods').value || '').trim();
  const supportedMods = supportedModsText
    ? supportedModsText.split(',').map(s => s.trim()).filter(Boolean)
    : [];

  const lines = [
  '-- Copy and paste this code into the module armor list',
  '-- Example: garrysmod/gamemodes/[schema folder]/modules/done/armor/armors.lua',
  '',
  `lia.armors.registerArmor(${JSON.stringify(uniqueId)}, {`,
  `    name = ${JSON.stringify(name)},`,
  `    desc = ${JSON.stringify(desc)},`,
  `    icon = ${JSON.stringify(icon)},`,
  `    model = ${model ? JSON.stringify(model) : 'nil'},`,
  `    footstep = ${footstep ? JSON.stringify(footstep) : 'nil'},`,
  `    jumpBoost = ${jumpBoost},`,
  `    speedBoost = ${speedBoost},`,
  `    resistance = ${resistance},`,
  `    fallDamage = ${fallDamage ? 'true' : 'false'},`,
  `    powerArmor = ${powerArmor ? 'true' : 'false'},`,
  `    overlay = ${overlay ? JSON.stringify(overlay) : 'nil'},`,
  `    supportedMods = {${supportedMods.map(m => JSON.stringify(m)).join(', ')}},`,
  '})'
  ];

  const code = `${lines.join('\n')}\n`;
  const outputBox = document.getElementById('output-code');
  if (outputBox) outputBox.value = code;
}

function fillExampleArmor() {
  document.getElementById('armor-id').value = 'civilprotection';
  document.getElementById('armor-name').value = 'Civil Protection Armor';
  document.getElementById('armor-desc').value = 'Standard issue armor worn by Civil Protection officers';
  document.getElementById('armor-icon').value = 'models/player/police.mdl';
  document.getElementById('armor-model').value = 'models/player/police.mdl';
  document.getElementById('armor-footstep').value = '';
  document.getElementById('armor-jump').value = '0';
  document.getElementById('armor-speed').value = '0';
  document.getElementById('armor-resistance').value = '30';
  document.getElementById('armor-falldmg').checked = true;
  document.getElementById('armor-pa').checked = false;
  document.getElementById('armor-overlay').value = 'gasmask.png';
  document.getElementById('armor-supported-mods').value = 'fortified, wardbound, swift';
  generateArmorCode();
}

function generateArmorModCode() {
  const uniqueId = (document.getElementById('mod-id').value || '').trim() || 'mod_example';
  const type = (document.getElementById('mod-type').value || '').trim() || 'swift';
  const name = (document.getElementById('mod-name').value || '').trim() || 'Armor Mod';
  const desc = (document.getElementById('mod-desc').value || '').trim() || 'Armor mod description.';
  const effectDesc = (document.getElementById('mod-effectdesc').value || '').trim() || '';
  const model = (document.getElementById('mod-model').value || '').trim() || 'models/props_lab/box01a.mdl';
  const physicalResist = document.getElementById('mod-phys').value || '0';
  const magicResist = document.getElementById('mod-magic').value || '0';
  const regen = document.getElementById('mod-regen').value || '0';
  const speed = document.getElementById('mod-speed').value || '0';
  const damage = document.getElementById('mod-dmg').value || '0';

  const lines = [
  '-- Copy and paste this code into the module mods list',
  '-- Example: garrysmod/gamemodes/[schema folder]/modules/done/armor/mods.lua',
  '',
  `lia.armors.registerMod(${JSON.stringify(uniqueId)}, {`,
  `    type = ${JSON.stringify(type)},`,
  `    name = ${JSON.stringify(name)},`,
  `    desc = ${JSON.stringify(desc)},`,
  `    effectDesc = ${JSON.stringify(effectDesc)},`,
  `    model = ${JSON.stringify(model)},`,
  '    effects = {',
  `        physicalResist = ${physicalResist},`,
  `        magicResist = ${magicResist},`,
  `        regen = ${regen},`,
  `        speed = ${speed},`,
  `        damage = ${damage}`,
  '    }',
  '})'
  ];

  const code = `${lines.join('\n')}\n`;
  const outputBox = document.getElementById('output-code');
  if (outputBox) outputBox.value = code;
}

function fillExampleArmorMod() {
  document.getElementById('mod-id').value = 'mod_swift';
  document.getElementById('mod-type').value = 'swift';
  document.getElementById('mod-name').value = 'Swift Step Mod';
  document.getElementById('mod-desc').value = 'Increases movement speed.';
  document.getElementById('mod-effectdesc').value = '+5% movement speed';
  document.getElementById('mod-model').value = 'models/props_lab/box01a.mdl';
  document.getElementById('mod-phys').value = '0';
  document.getElementById('mod-magic').value = '0';
  document.getElementById('mod-regen').value = '0';
  document.getElementById('mod-speed').value = '5';
  document.getElementById('mod-dmg').value = '0';
  generateArmorModCode();
}

document.addEventListener('DOMContentLoaded', () => {
  showArmorTab('armor');
});
</script>
