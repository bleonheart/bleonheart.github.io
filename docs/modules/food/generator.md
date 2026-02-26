# Food Item Generator

Create consumable food items that restore hunger and thirst for players.

---

<h3 style="margin-bottom: 5px; font-weight: 700;">Overview</h3>
<div style="margin-left: 20px; margin-bottom: 20px;">
  <p>Use this tool to generate the Lua structure for your custom food item. Once generated, the code should be placed in a new file within the items directory.</p>
  <p><strong>Recommended Placement:</strong></p>
  <code style="display: block; padding: 12px; background: rgba(0, 0, 0, 0.05); border-left: 4px solid #46a9ff; margin-top: 10px; font-family: 'JetBrains Mono', monospace;">modules/food/items/[item_id].lua</code>
</div>

---

<div class="generator-grid">
  <!-- Input Column -->
  <div class="generator-card form-card">
    <div class="generator-section">
      <div class="form-grid-2">
        <div class="input-group">
          <label for="item-id">Unique ID:</label>
          <input type="text" id="item-id" placeholder="e.g., cooked_burger" value="cooked_burger" oninput="generateFoodItem()">
          <small>Unique identifier for this item (no spaces, lowercase)</small>
        </div>

        <div class="input-group">
          <label for="item-name">Item Name:</label>
          <input type="text" id="item-name" placeholder="e.g., Cooked Burger" value="Delicious Cooked Burger" oninput="generateFoodItem()">
        </div>
      </div>

      <div class="input-group">
        <label for="item-desc">Description:</label>
        <textarea id="item-desc" placeholder="e.g., A freshly cooked burger that satisfies hunger" oninput="generateFoodItem()">A juicy burger cooked to perfection, served with fresh vegetables and a special sauce. Perfect for satisfying your hunger.</textarea>
      </div>

    </div>

    <div class="generator-section">
      <div class="input-group">
        <label for="item-model">Model:</label>
        <input type="text" id="item-model" placeholder="models/props_junk/garbage_takeoutcarton001a.mdl" value="models/props_junk/garbage_takeoutcarton001a.mdl" oninput="generateFoodItem()">
        <small>3D model path for the food item</small>
      </div>

      <div class="form-grid-3">
        <div class="input-group">
          <label for="hunger-amount">Hunger:</label>
          <input type="number" id="hunger-amount" placeholder="25" min="0" max="100" value="30" oninput="generateFoodItem()">
          <small>Hunger restored (0-100)</small>
        </div>

        <div class="input-group">
          <label for="thirst-amount">Thirst:</label>
          <input type="number" id="thirst-amount" placeholder="0" min="0" max="100" value="5" oninput="generateFoodItem()">
          <small>Thirst restored (0-100)</small>
        </div>

        <div class="input-group">
          <label for="item-width">Width:</label>
          <input type="number" id="item-width" placeholder="1" min="1" value="1" oninput="generateFoodItem()">
          <small>Inventory width</small>
        </div>
      </div>

      <div class="form-grid-2">
        <div class="input-group">
          <label for="item-height">Height:</label>
          <input type="number" id="item-height" placeholder="1" min="1" value="1" oninput="generateFoodItem()">
          <small>Inventory height</small>
        </div>

        <div class="input-group">
          <label for="item-category">Category:</label>
          <input type="text" id="item-category" placeholder="Consumable" value="Consumable" oninput="generateFoodItem()">
          <small>Item category in inventory</small>
        </div>
      </div>
    </div>

    <div class="button-group">
      <button onclick="generateFoodItem()" class="generate-btn">Generate Food Item Code</button>
      <button onclick="fillExampleFood()" class="generate-btn example-btn">Generate Example</button>
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
function generateFoodItem() {
  const uniqueId = (document.getElementById('item-id').value || '').trim() || 'food_example';
  const name = (document.getElementById('item-name').value || '').trim() || 'Food Item';
  const desc = (document.getElementById('item-desc').value || '').trim() || 'A consumable food item.';
  const model = (document.getElementById('item-model').value || '').trim() || 'models/props_junk/garbage_takeoutcarton001a.mdl';
  const hunger = document.getElementById('hunger-amount').value || '0';
  const thirst = document.getElementById('thirst-amount').value || '0';
  const width = document.getElementById('item-width').value || '1';
  const height = document.getElementById('item-height').value || '1';
  const category = (document.getElementById('item-category').value || '').trim() || 'Consumable';

  const lines = [
  '-- Copy and paste this code into a new Lua file in the items directory',
  '-- Example: modules/food/items/' + uniqueId + '.lua',
  '',
  'ITEM.name = ' + JSON.stringify(name),
  'ITEM.desc = ' + JSON.stringify(desc),
  'ITEM.model = ' + JSON.stringify(model),
  'ITEM.width = ' + width,
  'ITEM.height = ' + height,
  'ITEM.hunger = ' + hunger,
  'ITEM.thirst = ' + thirst,
  'ITEM.category = ' + JSON.stringify(category),
  'ITEM.functions.Consume = {',
  '    name = "Consume",',
  '    icon = "icon16/cup.png",',
  '    onRun = function(item)',
  '        local client = item.player',
  '        if not IsValid(client) then return false end',
  '        local restored = {}',
  '        if item.hunger > 0 and client:getLocalVar("hunger", 100) < 100 then',
  '            client:setLocalVar("hunger", math.Clamp(client:getLocalVar("hunger", 100) + item.hunger, 0, 100))',
  '            restored[#restored + 1] = item.hunger .. " hunger"',
  '        end',
  '',
  '        if item.thirst > 0 and client:getLocalVar("thirst", 100) < 100 then',
  '            client:setLocalVar("thirst", math.Clamp(client:getLocalVar("thirst", 100) + item.thirst, 0, 100))',
  '            restored[#restored + 1] = item.thirst .. " thirst"',
  '        end',
  '',
  '        if #restored == 0 then return false end',
  '        client:EmitSound("npc/barnacle/barnacle_gulp1.wav")',
  '        client:ChatPrint("You consumed a " .. item.name .. " and restored " .. table.concat(restored, " and ") .. ".")',
  '        return true',
  '    end,',
  '    onCanRun = function(item)',
  '        local client = item.player',
  '        if not IsValid(client) or IsValid(item.entity) then return false end',
  '        return item.hunger > 0 and client:getLocalVar("hunger", 100) < 100 or item.thirst > 0 and client:getLocalVar("thirst", 100) < 100',
  '    end',
  '}',
  '',
  'function ITEM:getDesc()',
  '    local description = self.desc',
  '    if self.hunger > 0 then description = description .. "\\nThis restores " .. self.hunger .. " hunger." end',
  '    if self.thirst > 0 then description = description .. "\\nThis restores " .. self.thirst .. " thirst." end',
  '    return description',
  'end'
  ];

  const code = `${lines.join('\n')}\n`;

  const outputBox = document.getElementById('output-code');
  if (outputBox) {
    outputBox.value = code;
  }
}

function fillExampleFood() {
  document.getElementById('item-id').value = 'pizza_slice';
  document.getElementById('item-name').value = 'Slice of Pizza';
  document.getElementById('item-desc').value = 'A delicious slice of pepperoni pizza with melted cheese and fresh tomato sauce. A satisfying meal that restores both hunger and provides some comfort.';
  document.getElementById('item-model').value = 'models/props_junk/garbage_takeoutcarton001a.mdl';
  document.getElementById('hunger-amount').value = '40';
  document.getElementById('thirst-amount').value = '10';
  document.getElementById('item-width').value = '1';
  document.getElementById('item-height').value = '1';
  document.getElementById('item-category').value = 'Consumable';

  generateFoodItem();
}

// Initial generation
document.addEventListener('DOMContentLoaded', () => {
  generateFoodItem();
});
</script>

---
