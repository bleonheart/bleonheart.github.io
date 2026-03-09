# Black Market Trading

A comprehensive underground trading system featuring an elusive NPC black market dealer who sells illegal weapons, contraband items, and restricted goods. The system includes dynamic inventory management with limited stock quantities, automatic restock timers that replenish supplies over time, configurable pricing structures, secret location mechanics requiring players to discover the hidden shop, waypoint/package delivery systems for illicit transactions, and administrative tools for managing the black market economy. Perfect for servers seeking enhanced criminal roleplay opportunities with an immersive underground economy.

---

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
          <small>Name shown in the blackmarket UI.</small>
        </div>
      </div>

      <div class="input-group">
        <label for="item-desc">Description:</label>
        <textarea id="item-desc" placeholder="e.g., An unregistered firearm" oninput="generateBlackmarketItem()">An unregistered firearm commonly sold on the blackmarket. Buyer assumes all responsibility.</textarea>
        <small>Longer description shown in the UI and/or tooltip.</small>
      </div>

    </div>

    <div class="generator-section">
      <div class="form-grid-3">
        <div class="input-group">
          <label for="item-price">Base Price:</label>
          <input type="number" id="item-price" placeholder="100" min="0" value="500" oninput="generateBlackmarketItem()">
          <small>Default/base price in dollars.</small>
        </div>

        <div class="input-group">
          <label for="item-cooldown">Cooldown (seconds):</label>
          <input type="number" id="item-cooldown" placeholder="300" min="0" value="600" oninput="generateBlackmarketItem()">
          <small>Individual item cooldown between purchases/orders (module-defined behavior).</small>
        </div>

        <div class="input-group">
          <label for="item-maxqty">Max Quantity:</label>
          <input type="number" id="item-maxqty" placeholder="1" min="0" value="1" oninput="generateBlackmarketItem()">
          <small>Maximum quantity available (<code>0</code> = unlimited).</small>
        </div>
      </div>

      <div class="input-group">
        <label for="item-category">Category:</label>
        <input type="text" id="item-category" placeholder="e.g., Weapons" value="Weapons" oninput="generateBlackmarketItem()">
        <small>Used to group items in the blackmarket UI.</small>
      </div>
    </div>

    <div class="generator-section">
      <div class="input-group">
        <label>
          <input type="checkbox" id="use-faction-restrictions" oninput="generateBlackmarketItem()"> Use Faction Restrictions
        </label>
        <small>If enabled, restrict purchasing by faction (whitelist) and/or override pricing per faction.</small>
      </div>

      <div id="faction-options" style="display: none;">
        <div class="input-group">
          <label for="restriction-type">Restriction Type:</label>
          <select id="restriction-type" oninput="generateBlackmarketItem()">
            <option value="whitelist">Whitelist (Only allowed factions)</option>
            <option value="pricing">Faction-Specific Pricing</option>
          </select>
          <small>
            <b>Whitelist</b>: only listed factions can buy.
            <br>
            <b>Faction-Specific Pricing</b>: override base price per faction.
          </small>
        </div>

        <div class="input-group">
          <label>Allowed Factions:</label>
          <small>Each row is one faction constant (e.g., FACTION_CITIZEN).</small>
        </div>
        <div id="faction-list" class="dynamic-list"></div>
        <button type="button" class="add-btn" onclick="addFactionRow()">Add Faction</button>

        <div id="faction-pricing" style="display: none;">
          <div class="input-group">
            <label for="faction-pricing-text">Faction Pricing:</label>
            <small>Each row overrides the base price for one faction constant (e.g., FACTION_CITIZEN).</small>
          </div>

          <div id="faction-pricing-list" class="dynamic-list"></div>
          <button type="button" class="add-btn" onclick="addFactionPricingRow()">Add Faction Price</button>
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
function luaValueFromText(text) {
  const t = (text || '').trim();
  if (!t) return '';
  if (/^[A-Za-z_][A-Za-z0-9_]*$/.test(t)) return t;
  return JSON.stringify(t);
}

function setupLiveUpdate(generateFn) {
  if (typeof generateFn !== 'function') return;
  const root = document.querySelector('.generator-card.form-card') || document;
  const handler = () => generateFn();

  root.querySelectorAll('input, select, textarea').forEach(el => {
    el.addEventListener('input', handler);
    el.addEventListener('change', handler);
  });
}

function factionRowTemplate(faction) {
  return `
  <div class="dynamic-row faction-row">
    <input type="text" class="faction-item" placeholder="FACTION_CITIZEN" value="${faction || ''}" oninput="generateBlackmarketItem()">
    <button type="button" class="remove-btn" onclick="removeFactionRow(this)">×</button>
  </div>`;
}

function addFactionRow(faction) {
  const list = document.getElementById('faction-list');
  if (!list) return;
  list.insertAdjacentHTML('beforeend', factionRowTemplate(faction));
  generateBlackmarketItem();
}

function removeFactionRow(btn) {
  const row = btn.closest('.faction-row');
  if (row) row.remove();
  generateBlackmarketItem();
}

function factionPricingRowTemplate(faction, price) {
  return `
  <div class="dynamic-row faction-pricing-row">
    <input type="text" class="faction-pricing-faction" placeholder="FACTION_CITIZEN" value="${faction || ''}" oninput="generateBlackmarketItem()">
    <input type="number" class="faction-pricing-price" placeholder="500" min="0" value="${price || ''}" oninput="generateBlackmarketItem()">
    <button type="button" class="remove-btn" onclick="removeFactionPricingRow(this)">×</button>
  </div>`;
}

function addFactionPricingRow(faction, price) {
  const list = document.getElementById('faction-pricing-list');
  if (!list) return;
  list.insertAdjacentHTML('beforeend', factionPricingRowTemplate(faction, price));
  generateBlackmarketItem();
}

function removeFactionPricingRow(btn) {
  const row = btn.closest('.faction-pricing-row');
  if (row) row.remove();
  generateBlackmarketItem();
}

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
  const factionPricingRows = Array.from(document.querySelectorAll('#faction-pricing-list .faction-pricing-row'));
  const factionPricing = [];
  for (const row of factionPricingRows) {
    const faction = (row.querySelector('.faction-pricing-faction').value || '').trim();
    const overridePrice = (row.querySelector('.faction-pricing-price').value || '').trim();
    if (!faction || !overridePrice) continue;
    factionPricing.push({ faction, price: overridePrice });
  }

  const factionRows = Array.from(document.querySelectorAll('#faction-list .faction-row'));
  const factions = [];
  for (const row of factionRows) {
    const faction = (row.querySelector('.faction-item').value || '').trim();
    if (!faction) continue;
    factions.push(faction);
  }

  const factionLuaValues = factions.map(luaValueFromText).filter(Boolean);

  const properties = [
    `    name = ${JSON.stringify(name)},`,
    `    desc = ${JSON.stringify(desc)},`,
    `    price = ${price},`,
    `    category = ${JSON.stringify(category)},`,
    `    cooldown = ${cooldown},`,
    `    MaxShipping = ${maxQty},`
  ];

  // Add faction restrictions if enabled
  if (useRestrictions && factionLuaValues.length > 0) {
    properties.push(`    factions = {${factionLuaValues.join(', ')}}`);
  }

  if (useRestrictions && restrictionType === 'pricing' && factionPricing.length > 0) {
    const entries = factionPricing
      .map(e => {
        const key = luaValueFromText(e.faction);
        if (!key) return '';
        return `        [${key}] = ${e.price}`;
      })
      .filter(Boolean)
      .join(',\n');
    properties.push('    factionPricing = {');
    properties.push(entries);
    properties.push('    },');
  }

  const lines = [
  '-- Copy and paste this code into the module definitions file',
  '-- Example: garrysmod/gamemodes/[schema folder]/modules/blackmarket/definitions.lua',
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
  const pricingListEl = document.getElementById('faction-pricing-list');
  if (pricingListEl) {
    pricingListEl.innerHTML = '';
    addFactionPricingRow('FACTION_GANG', '2000');
    addFactionPricingRow('FACTION_MOB', '1500');
  }

  const factionListEl = document.getElementById('faction-list');
  if (factionListEl) {
    factionListEl.innerHTML = '';
    addFactionRow('FACTION_GANG');
    addFactionRow('FACTION_MOB');
  }

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
  // Seed a faction row so it isn't empty when restrictions are enabled
  const factionListEl = document.getElementById('faction-list');
  if (factionListEl) factionListEl.innerHTML = '';
  const pricingListEl = document.getElementById('faction-pricing-list');
  if (pricingListEl) pricingListEl.innerHTML = '';
  addFactionRow('FACTION_CITIZEN');
  addFactionPricingRow('FACTION_CITIZEN', '500');
  setupLiveUpdate(generateBlackmarketItem);
  generateBlackmarketItem();
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

