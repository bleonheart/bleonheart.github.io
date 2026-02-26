<details class="realm-shared no-icon">
<summary><a id="Black Market NPC"></a>Black Market NPC</summary>
<div class="details-content">
<a id="blackmarket"></a>
<h3 style="margin-bottom: 5px; font-weight: 700;">Description</h3>
<div style="margin-left: 20px; margin-bottom: 20px;">
  <p>Provides features such as Sells illegal weapons and contraband, Limited stock with restock timers, Requires players to find secret location, Prices configurable via script, and Great for underground roleplay.</p>
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
          <input type="text" id="item-id" placeholder="e.g., illegal_pistol" value="illegal_pistol" oninput="generateBlackmarketItem()">
          <small>Unique identifier for this item (no spaces, lowercase)</small>
        </div>

        <div class="input-group">
          <label for="item-name">Display Name:</label>
          <input type="text" id="item-name" placeholder="e.g., Illegal Pistol" value="Illegal Pistol" oninput="generateBlackmarketItem()">
        </div>
      </div>

      <div class="input-group">
        <label for="item-desc">Description:</label>
        <textarea id="item-desc" placeholder="e.g., An unregistered firearm" oninput="generateBlackmarketItem()">An unregistered firearm commonly sold on the blackmarket. Buyer assumes all responsibility.</textarea>
      </div>

    </div>

    <div class="generator-section">
      <div class="form-grid-3">
        <div class="input-group">
          <label for="item-price">Base Price:</label>
          <input type="number" id="item-price" placeholder="100" min="0" value="500" oninput="generateBlackmarketItem()">
          <small>Default price in dollars</small>
        </div>

        <div class="input-group">
          <label for="item-cooldown">Cooldown (seconds):</label>
          <input type="number" id="item-cooldown" placeholder="300" min="0" value="600" oninput="generateBlackmarketItem()">
          <small>Individual item cooldown</small>
        </div>

        <div class="input-group">
          <label for="item-maxqty">Max Quantity:</label>
          <input type="number" id="item-maxqty" placeholder="1" min="0" value="1" oninput="generateBlackmarketItem()">
          <small>0 = unlimited</small>
        </div>
      </div>

      <div class="input-group">
        <label for="item-category">Category:</label>
        <input type="text" id="item-category" placeholder="e.g., Weapons" value="Weapons" oninput="generateBlackmarketItem()">
        <small>Category for organization</small>
      </div>
    </div>

    <div class="generator-section">
      <div class="input-group">
        <label>
          <input type="checkbox" id="use-faction-restrictions" oninput="generateBlackmarketItem()"> Use Faction Restrictions
        </label>
        <small>Limit which factions can purchase this item</small>
      </div>

      <div id="faction-options" style="display: none;">
        <div class="input-group">
          <label for="restriction-type">Restriction Type:</label>
          <select id="restriction-type" oninput="generateBlackmarketItem()">
            <option value="whitelist">Whitelist (Only allowed factions)</option>
            <option value="pricing">Faction-Specific Pricing</option>
          </select>
        </div>

        <div class="input-group">
          <label for="faction-list">Allowed Factions:</label>
          <textarea id="faction-list" placeholder="FACTION_CITIZEN, FACTION_GANG" oninput="generateBlackmarketItem()">FACTION_CITIZEN, FACTION_GANG</textarea>
          <small>Comma-separated faction constants</small>
        </div>

        <div id="faction-pricing" style="display: none;">
          <div class="input-group">
            <label for="faction-pricing-text">Faction Pricing:</label>
            <textarea id="faction-pricing-text" placeholder="FACTION_CITIZEN = 500, FACTION_GANG = 300" oninput="generateBlackmarketItem()">FACTION_CITIZEN = 500, FACTION_GANG = 300</textarea>
            <small>Format: FACTION_NAME = price (one per line)</small>
          </div>
        </div>
      </div>
    </div>

    <div class="button-group">
      <button onclick="generateBlackmarketItem()" class="generate-btn">Generate Blackmarket Code</button>
      <button onclick="fillExampleBlackmarket()" class="generate-btn example-btn">Generate Example</button>
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
function generateBlackmarketItem() {
  const uniqueId = (document.getElementById('item-id').value || '').trim() || 'blackmarket_item';
  const name = (document.getElementById('item-name').value || '').trim() || 'Blackmarket Item';
  const desc = (document.getElementById('item-desc').value || '').trim() || 'An item sold on the blackmarket';
  const price = document.getElementById('item-price').value || '100';
  const cooldown = document.getElementById('item-cooldown').value || '0';
  const maxQty = document.getElementById('item-maxqty').value || '0';
  const category = document.getElementById('item-category').value;
  const useRestrictions = document.getElementById('use-faction-restrictions').checked;
  const restrictionType = document.getElementById('restriction-type').value;
  const factionList = (document.getElementById('faction-list').value || '').trim();
  const factionPricingText = (document.getElementById('faction-pricing-text').value || '').trim();

  const properties = [
    `    name = ${JSON.stringify(name)},`,
    `    price = ${price},`,
    `    category = ${JSON.stringify(category)},`,
    `    cooldown = ${cooldown},`,
    `    maxQuantity = ${maxQty}`
  ];

  // Add faction restrictions if enabled
  if (useRestrictions && factionList) {
    const factions = factionList.split(',').map(f => f.trim()).filter(f => f);
    
    if (restrictionType === 'whitelist' && factions.length > 0) {
      properties.push(`    allowedFactions = {${factions.map(f => f).join(', ')}}`);
    }
    
    if (restrictionType === 'pricing' && factionPricingText) {
      const pricingLines = factionPricingText.split('\n').filter(line => line.trim());
      const pricingTable = [];
      
      pricingLines.forEach(line => {
        const match = line.match(/(\w+)\s*=\s*(\d+)/);
        if (match) {
          pricingTable.push(`        [${match[1]}] = ${match[2]}`);
        }
      });
      
      if (pricingTable.length > 0) {
        properties.push(`    factions = {`);
        properties.push(...pricingTable);
        properties.push(`    }`);
      }
    }
  }

  const lines = [
  '-- Copy and paste this code into any Lua file that loads during initialization',
  '-- Example: [schema folder]/modules/blackmarket/definitions.lua',
  '-- This will register the item with the blackmarket system',
  '',
  `lia.blackmarket.registerBlackMarketItem(${JSON.stringify(uniqueId)}, {`,
  ...properties,
  '})'
  ];

  const code = `${lines.join('\n')}\n`;

  const outputBox = document.getElementById('output-code');
  if (outputBox) {
    outputBox.value = code;
  }
}

function fillExampleBlackmarket() {
  document.getElementById('item-id').value = 'illegal_rifle';
  document.getElementById('item-name').value = 'Unregistered Assault Rifle';
  document.getElementById('item-desc').value = 'A military-grade assault rifle with serial numbers removed. Highly illegal and extremely dangerous.';
  document.getElementById('item-price').value = '2500';
  document.getElementById('item-cooldown').value = '1800';
  document.getElementById('item-maxqty').value = '1';
  document.getElementById('item-category').value = 'Weapons';
  document.getElementById('use-faction-restrictions').checked = true;
  document.getElementById('restriction-type').value = 'pricing';
  document.getElementById('faction-list').value = 'FACTION_GANG, FACTION_MOB';
  document.getElementById('faction-pricing-text').value = 'FACTION_GANG = 2000\nFACTION_MOB = 1500';

  updateFactionOptions();
  generateBlackmarketItem();
}

function updateFactionOptions() {
  const useRestrictions = document.getElementById('use-faction-restrictions').checked;
  const factionOptions = document.getElementById('faction-options');
  const restrictionType = document.getElementById('restriction-type').value;
  const factionPricing = document.getElementById('faction-pricing');
  
  factionOptions.style.display = useRestrictions ? 'block' : 'none';
  factionPricing.style.display = (useRestrictions && restrictionType === 'pricing') ? 'block' : 'none';
}

// Event listeners
document.getElementById('use-faction-restrictions').addEventListener('change', updateFactionOptions);
document.getElementById('restriction-type').addEventListener('change', updateFactionOptions);

// Initial generation
document.addEventListener('DOMContentLoaded', () => {
  updateFactionOptions();
  generateBlackmarketItem();
});
</script>
