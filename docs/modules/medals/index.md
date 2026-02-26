<details class="realm-shared no-icon">
<summary><a id="Medals"></a>Medals</summary>
<div class="details-content">
<a id="medals"></a>
<h3 style="margin-bottom: 5px; font-weight: 700;">Description</h3>
<div style="margin-left: 20px; margin-bottom: 20px;">
  <p>Persistent medal award system displayed on character profiles with staff permissions for giving/taking medals and admin controls</p>
</div>
<h3 style="margin-bottom: 5px; font-weight: 700;">Changelog</h3>
<div style="margin-left: 20px;">
  <details class="realm-shared no-icon">
    <summary>Version 1.0</summary>
    <div class="details-content" style="margin-left: 20px;">
      <ul>
        <li>Initial Release</li>
      </ul>
    </div>
  </details>

</div>
</div>
</details>

## Generator

<div class="generator-grid">
  <!-- Input Column -->
  <div class="generator-card form-card">
    <div class="generator-section">
      <div class="form-grid-2">
        <div class="input-group">
          <label for="item-id">Unique ID:</label>
          <input type="text" id="item-id" placeholder="e.g., bravery_medal" value="bravery_medal" oninput="generateMedalItem()">
          <small>Unique identifier for this medal (no spaces, lowercase)</small>
        </div>

        <div class="input-group">
          <label for="item-name">Medal Name:</label>
          <input type="text" id="item-name" placeholder="e.g., Bravery Medal" value="Medal of Bravery" oninput="generateMedalItem()">
        </div>
      </div>

      <div class="input-group">
        <label for="item-desc">Description:</label>
        <textarea id="item-desc" placeholder="e.g., Awarded for exceptional acts of courage in the line of duty" oninput="generateMedalItem()">Awarded to individuals who have demonstrated exceptional courage and selflessness in dangerous situations, putting the safety of others before their own.</textarea>
      </div>

    </div>

    <div class="generator-section">
      <div class="input-group">
        <label for="item-model">Model:</label>
        <input type="text" id="item-model" placeholder="models/props_junk/cardboard_box004a.mdl" value="models/props_junk/cardboard_box004a.mdl" oninput="generateMedalItem()">
        <small>3D model path for the medal item</small>
      </div>

      <div class="form-grid-3">
        <div class="input-group">
          <label for="item-width">Width:</label>
          <input type="number" id="item-width" placeholder="1" min="1" value="1" oninput="generateMedalItem()">
          <small>Inventory width</small>
        </div>

        <div class="input-group">
          <label for="item-height">Height:</label>
          <input type="number" id="item-height" placeholder="1" min="1" value="1" oninput="generateMedalItem()">
          <small>Inventory height</small>
        </div>

        <div class="input-group">
          <label for="item-category">Category:</label>
          <input type="text" id="item-category" placeholder="Medals" value="Medals" oninput="generateMedalItem()">
          <small>Item category in inventory</small>
        </div>
      </div>

      <div class="form-grid-2">
        <div class="input-group">
          <label for="medal-rarity">Rarity:</label>
          <select id="medal-rarity" oninput="generateMedalItem()">
            <option value="common">Common</option>
            <option value="uncommon">Uncommon</option>
            <option value="rare" selected>Rare</option>
            <option value="epic">Epic</option>
            <option value="legendary">Legendary</option>
          </select>
          <small>Medal rarity for display purposes</small>
        </div>

        <div class="input-group">
          <label for="medal-type">Type:</label>
          <select id="medal-type" oninput="generateMedalItem()">
            <option value="service">Service</option>
            <option value="combat" selected>Combat</option>
            <option value="achievement">Achievement</option>
            <option value="honor">Honor</option>
            <option value="special">Special</option>
          </select>
          <small>Type of medal for classification</small>
        </div>
      </div>
    </div>

    <div class="button-group">
      <button onclick="generateMedalItem()" class="generate-btn">Generate Medal Item Code</button>
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
function generateMedalItem() {
  const uniqueId = (document.getElementById('item-id').value || '').trim() || 'medal_example';
  const name = (document.getElementById('item-name').value || '').trim() || 'Medal';
  const desc = (document.getElementById('item-desc').value || '').trim() || 'A prestigious medal awarded for exceptional service.';
  const model = (document.getElementById('item-model').value || '').trim() || 'models/props_junk/cardboard_box004a.mdl';
  const width = document.getElementById('item-width').value || '1';
  const height = document.getElementById('item-height').value || '1';
  const category = (document.getElementById('item-category').value || '').trim() || 'Medals';
  const rarity = document.getElementById('medal-rarity').value;
  const medalType = document.getElementById('medal-type').value;

  const lines = [
  '-- Copy and paste this code into a new Lua file in the items directory',
  '-- Example: modules/medals/items/' + uniqueId + '.lua',
  '',
  'ITEM.name = ' + JSON.stringify(name),
  'ITEM.desc = ' + JSON.stringify(desc),
  'ITEM.category = ' + JSON.stringify(category),
  'ITEM.model = ' + JSON.stringify(model),
  'ITEM.width = ' + width,
  'ITEM.height = ' + height,
  'ITEM.isMedal = true',
  'ITEM.medalRarity = ' + JSON.stringify(rarity),
  'ITEM.medalType = ' + JSON.stringify(medalType),
  '',
  'if CLIENT then',
  '    function ITEM:paintOver(item, w, h)',
  '        local ply = item.player',
  '        if not IsValid(ply) then return end',
  '        local char = ply:getChar()',
  '        if not char then return end',
  '        local medals = char:getMedals() or {}',
  '        if medals[item.uniqueID] == 2 then',
  '            surface.SetDrawColor(110, 255, 110, 100)',
  '            surface.DrawRect(w - 14, h - 14, 8, 8)',
  '        end',
  '    end',
  'end',
  '',
  'function ITEM:onRestored(inv)',
  '    if inv and inv.getOwner then',
  '        local ply = lia.char.getOwnerByID(inv:getOwner())',
  '        if ply then ply:giveMedal(self.uniqueID) end',
  '    end',
  'end',
  '',
  'function ITEM:onRemoved()',
  '    local inv = lia.item.inventories[self.invID]',
  '    if inv and inv.getOwner then',
  '        local ply = lia.char.getOwnerByID(inv:getOwner())',
  '        if ply then ply:takeMedal(self.uniqueID) end',
  '    end',
  'end'
  ];

  const code = `${lines.join('\n')}\n`;

  const outputBox = document.getElementById('output-code');
  if (outputBox) {
    outputBox.value = code;
  }
}

function fillExampleMedal() {
  document.getElementById('item-id').value = 'purple_heart';
  document.getElementById('item-name').value = 'Purple Heart';
  document.getElementById('item-desc').value = 'Awarded to those who have been wounded or killed in action while serving in the armed forces. This medal symbolizes the sacrifice and courage of individuals who have given their blood in defense of freedom.';
  document.getElementById('item-model').value = 'models/props_junk/cardboard_box004a.mdl';
  document.getElementById('item-width').value = '1';
  document.getElementById('item-height').value = '1';
  document.getElementById('item-category').value = 'Medals';
  document.getElementById('medal-rarity').value = 'epic';
  document.getElementById('medal-type').value = 'combat';

  generateMedalItem();
}

// Initial generation
document.addEventListener('DOMContentLoaded', () => {
  generateMedalItem();
});
</script>
