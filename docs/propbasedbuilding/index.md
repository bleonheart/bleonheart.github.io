# Improved Constructable Props

Constructable prop system with furniture items (boxes, cabinets, chairs, tables, couches) requiring resources and supporting upgrades into functional entities

---

## Generator

<div class="generator-grid">
  <!-- Input Column -->
  <div class="generator-card form-card">
    <div class="generator-section">
      <div class="form-grid-2">
        <button id="prop-tab-prop" onclick="showPropTab('prop')" class="generate-btn">Prop Generator</button>
        <button id="prop-tab-item" onclick="showPropTab('item')" class="generate-btn example-btn">Item Generator</button>
      </div>
    </div>

    <div id="prop-panel-prop">
      <div class="generator-section">
        <div class="form-grid-2">
          <div class="input-group">
            <label for="prop-id">Unique ID:</label>
            <input type="text" id="prop-id" placeholder="e.g., prop_chair_wood" value="prop_chair_wood" oninput="generatePropCode()">
            <small>Unique identifier for this prop (no spaces, lowercase)</small>
          </div>

          <div class="input-group">
            <label for="prop-name">Prop Name:</label>
            <input type="text" id="prop-name" placeholder="e.g., Wooden Chair" value="Wooden Chair" oninput="generatePropCode()">
          </div>
        </div>

        <div class="input-group">
          <label for="prop-desc">Description:</label>
          <textarea id="prop-desc" placeholder="e.g., A simple wooden chair for sitting" oninput="generatePropCode()">A simple wooden chair for sitting.</textarea>
        </div>
      </div>

      <div class="generator-section">
        <div class="input-group">
          <label for="prop-prop">Prop Model:</label>
          <input type="text" id="prop-prop" placeholder="models/props_c17/FurnitureChair001a.mdl" value="models/props_c17/FurnitureChair001a.mdl" oninput="generatePropCode()">
          <small>Model placed in the world when constructed</small>
        </div>

        <div class="input-group">
          <label for="prop-model">Inventory Model (Optional):</label>
          <input type="text" id="prop-model" placeholder="models/Items/item_item_crate.mdl" value="" oninput="generatePropCode()">
          <small>Model shown in inventory (leave empty for default: item_item_crate.mdl)</small>
        </div>

        <div class="form-grid-2">
          <div class="input-group">
            <label for="prop-width">Inventory Width:</label>
            <input type="number" id="prop-width" min="1" max="5" value="2" oninput="generatePropCode()">
            <small>Inventory grid width (defaults to 2)</small>
          </div>

          <div class="input-group">
            <label for="prop-height">Inventory Height:</label>
            <input type="number" id="prop-height" min="1" max="5" value="2" oninput="generatePropCode()">
            <small>Inventory grid height (defaults to 2)</small>
          </div>
        </div>

        <div class="form-grid-2">
          <div class="input-group">
            <label for="prop-health">Health:</label>
            <input type="number" id="prop-health" min="0" value="100" oninput="generatePropCode()">
            <small>Optional health value (0 for indestructible)</small>
          </div>

          <div class="input-group">
            <label for="prop-category">Category:</label>
            <input type="text" id="prop-category" placeholder="e.g., Furniture" value="Furniture" oninput="generatePropCode()">
            <small>Item category (defaults to "Constructable")</small>
          </div>
        </div>

        <div class="input-group">
          <label for="prop-time">Construction Time:</label>
          <input type="number" id="prop-time" min="1" value="5" oninput="generatePropCode()">
          <small>Construction time in seconds (defaults to 5)</small>
        </div>
      </div>

      <div class="button-group">
        <button onclick="generatePropCode()" class="generate-btn">Generate Prop Code</button>
        <button onclick="fillExampleProp()" class="generate-btn example-btn">Generate Example</button>
      </div>
    </div>

    <div id="prop-panel-item" style="display: none;">
      <div class="generator-section">
        <div class="form-grid-2">
          <div class="input-group">
            <label for="item-id">Unique ID:</label>
            <input type="text" id="item-id" placeholder="e.g., custom_construction_item" value="custom_construction_item" oninput="generateItemCode()">
            <small>Unique identifier for this item</small>
          </div>

          <div class="input-group">
            <label for="item-name">Item Name:</label>
            <input type="text" id="item-name" placeholder="e.g., Custom Construction Item" value="Custom Construction Item" oninput="generateItemCode()">
          </div>
        </div>

        <div class="input-group">
          <label for="item-desc">Description:</label>
          <textarea id="item-desc" placeholder="e.g., A custom construction item" oninput="generateItemCode()">A custom construction item.</textarea>
        </div>
      </div>

      <div class="generator-section">
        <div class="input-group">
          <label for="item-model">Item Model:</label>
          <input type="text" id="item-model" placeholder="models/Items/item_item_crate.mdl" value="models/Items/item_item_crate.mdl" oninput="generateItemCode()">
          <small>Model shown in inventory</small>
        </div>

        <div class="input-group">
          <label for="item-prop">Prop Model:</label>
          <input type="text" id="item-prop" placeholder="models/props_c17/FurnitureChair001a.mdl" value="models/props_c17/FurnitureChair001a.mdl" oninput="generateItemCode()">
          <small>Model placed when constructed</small>
        </div>

        <div class="form-grid-2">
          <div class="input-group">
            <label for="item-width">Inventory Width:</label>
            <input type="number" id="item-width" min="1" max="5" value="2" oninput="generateItemCode()">
          </div>

          <div class="input-group">
            <label for="item-height">Inventory Height:</label>
            <input type="number" id="item-height" min="1" max="5" value="2" oninput="generateItemCode()">
          </div>
        </div>

        <div class="input-group">
          <label for="item-time">Construction Time:</label>
          <input type="number" id="item-time" min="1" value="5" oninput="generateItemCode()">
          <small>Construction time in seconds</small>
        </div>

        <div class="input-group">
          <label for="item-health">Prop Health:</label>
          <input type="number" id="item-health" min="0" value="100" oninput="generateItemCode()">
          <small>Health of the placed prop (optional)</small>
        </div>
      </div>

      <div class="button-group">
        <button onclick="generateItemCode()" class="generate-btn">Generate Item Code</button>
        <button onclick="fillExampleItem()" class="generate-btn example-btn">Generate Example</button>
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
function showPropTab(which) {
  const propPanel = document.getElementById('prop-panel-prop');
  const itemPanel = document.getElementById('prop-panel-item');

  if (which === 'item') {
    propPanel.style.display = 'none';
    itemPanel.style.display = 'block';
    generateItemCode();
  } else {
    propPanel.style.display = 'block';
    itemPanel.style.display = 'none';
    generatePropCode();
  }
}

function generatePropCode() {
  const uniqueId = (document.getElementById('prop-id').value || '').trim() || 'prop_example';
  const name = (document.getElementById('prop-name').value || '').trim() || 'Prop';
  const desc = (document.getElementById('prop-desc').value || '').trim() || 'A constructable prop.';
  const prop = (document.getElementById('prop-prop').value || '').trim() || 'models/props_c17/FurnitureChair001a.mdl';
  const model = (document.getElementById('prop-model').value || '').trim();
  const width = document.getElementById('prop-width').value || '2';
  const height = document.getElementById('prop-height').value || '2';
  const health = document.getElementById('prop-health').value || '0';
  const category = (document.getElementById('prop-category').value || '').trim() || 'Constructable';
  const time = document.getElementById('prop-time').value || '5';

  const lines = [
  '-- Copy and paste this code into the props.lua file',
  '-- Example: garrysmod/gamemodes/[schema folder]/modules/done/propbasedbuilding/props.lua',
  '',
  `MODULE:RegisterProp(${JSON.stringify(uniqueId)}, {`,
  `    name = ${JSON.stringify(name)},`,
  `    desc = ${JSON.stringify(desc)},`,
  `    prop = ${JSON.stringify(prop)},`,
  ];

  if (width && width !== '2') {
    lines.push(`    width = ${width},`);
  }

  if (height && height !== '2') {
    lines.push(`    height = ${height},`);
  }

  if (health && health !== '0') {
    lines.push(`    health = ${health},`);
  }

  if (model && model !== '') {
    lines.push(`    model = ${JSON.stringify(model)},`);
  }

  if (category && category !== 'Constructable') {
    lines.push(`    category = ${JSON.stringify(category)},`);
  }

  if (time && time !== '5') {
    lines.push(`    time = ${time},`);
  }

  // Remove trailing comma if present
  if (lines[lines.length - 1].endsWith(',')) {
    lines[lines.length - 1] = lines[lines.length - 1].slice(0, -1);
  }

  lines.push('})');

  const code = `${lines.join('\n')}\n`;
  const outputBox = document.getElementById('output-code');
  if (outputBox) outputBox.value = code;
}

function generateItemCode() {
  const uniqueId = (document.getElementById('item-id').value || '').trim() || 'construction_item';
  const name = (document.getElementById('item-name').value || '').trim() || 'Construction Item';
  const desc = (document.getElementById('item-desc').value || '').trim() || 'A construction item.';
  const model = (document.getElementById('item-model').value || '').trim() || 'models/Items/item_item_crate.mdl';
  const prop = (document.getElementById('item-prop').value || '').trim() || 'models/props_c17/FurnitureChair001a.mdl';
  const width = document.getElementById('item-width').value || '2';
  const height = document.getElementById('item-height').value || '2';
  const time = document.getElementById('item-time').value || '5';
  const health = document.getElementById('item-health').value || '0';

  const lines = [
  '-- Copy and paste this code into a new item file',
  '-- Example: garrysmod/gamemodes/[schema folder]/modules/done/propbasedbuilding/items/custom_item.lua',
  '',
  'ITEM.name = ' + JSON.stringify(name),
  'ITEM.desc = ' + JSON.stringify(desc),
  'ITEM.category = "Constructable"',
  'ITEM.model = ' + JSON.stringify(model),
  'ITEM.prop = ' + JSON.stringify(prop),
  'ITEM.time = ' + time,
  'ITEM.width = ' + width,
  'ITEM.height = ' + height,
  ];

  if (health && health !== '0') {
    lines.push('ITEM.health = ' + health);
  } else {
    lines.push('ITEM.health = nil');
  }

  lines.push('');
  lines.push('ITEM.functions.Place = {');
  lines.push('    name = "Place",');
  lines.push('    tip = "Place Object",');
  lines.push('    icon = "icon16/wrench.png",');
  lines.push('    onRun = function(item)');
  lines.push('        local client = item.player');
  lines.push('        client:setNetVar("ConstructablePropModel", item.prop)');
  lines.push('        client:setNetVar("ConstructablePropPlacing", true)');
  lines.push('        client:setNetVar("ConstructablePropID", item.uniqueID)');
  lines.push('        return false');
  lines.push('    end,');
  lines.push('    onCanRun = function(item)');
  lines.push('        local client = item.player');
  lines.push('        return not IsValid(item.entity) and IsValid(client)');
  lines.push('    end');
  lines.push('}');
  lines.push('');
  lines.push('function ITEM:GetModel()');
  lines.push('    return (self.invID == 0 or not self.invID) and self.model or self.prop');
  lines.push('end');

  const code = `${lines.join('\n')}\n`;
  const outputBox = document.getElementById('output-code');
  if (outputBox) outputBox.value = code;
}

function fillExampleProp() {
  document.getElementById('prop-id').value = 'prop_table_wood';
  document.getElementById('prop-name').value = 'Wooden Table';
  document.getElementById('prop-desc').value = 'A sturdy wooden table for placing items on.';
  document.getElementById('prop-prop').value = 'models/props_c17/FurnitureTable002a.mdl';
  document.getElementById('prop-model').value = '';
  document.getElementById('prop-width').value = '2';
  document.getElementById('prop-height').value = '2';
  document.getElementById('prop-health').value = '150';
  document.getElementById('prop-category').value = 'Furniture';
  document.getElementById('prop-time').value = '5';
  generatePropCode();
}

function fillExampleItem() {
  document.getElementById('item-id').value = 'custom_chair_item';
  document.getElementById('item-name').value = 'Custom Chair Construction Kit';
  document.getElementById('item-desc').value = 'A kit containing all the parts needed to construct a custom chair.';
  document.getElementById('item-model').value = 'models/Items/item_item_crate.mdl';
  document.getElementById('item-prop').value = 'models/props_c17/FurnitureChair001a.mdl';
  document.getElementById('item-width').value = '2';
  document.getElementById('item-height').value = '2';
  document.getElementById('item-time').value = '3';
  document.getElementById('item-health').value = '75';
  generateItemCode();
}

document.addEventListener('DOMContentLoaded', () => {
  showPropTab('prop');
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
  <source src="https://bleonheart.github.io/assets/propbasedbuilding.mp4" type="video/mp4">
  Your browser does not support the video tag.
</video>
