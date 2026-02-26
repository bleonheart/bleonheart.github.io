<details class="realm-shared no-icon">
<summary><a id="Car Dealer"></a>Car Dealer</summary>
<div class="details-content">
<a id="cardealer"></a>
<h3 style="margin-bottom: 5px; font-weight: 700;">Description</h3>
<div style="margin-left: 20px; margin-bottom: 20px;">
  <p>Provides features such as Purchase vehicles from a dealer NPC, Return or repair owned vehicles for a fee, Custom paint jobs and bodygroup modifications with configurable price, Garages store vehicles safely, and Integrates with driving addons.</p>
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
          <input type="text" id="item-id" placeholder="e.g., sports_car" value="sports_car" oninput="generateVehicleItem()">
          <small>Unique identifier for this vehicle (no spaces, lowercase)</small>
        </div>

        <div class="input-group">
          <label for="item-name">Vehicle Name:</label>
          <input type="text" id="item-name" placeholder="e.g., Sports Car" value="High-Performance Sports Car" oninput="generateVehicleItem()">
        </div>
      </div>

      <div class="input-group">
        <label for="item-desc">Description:</label>
        <textarea id="item-desc" placeholder="e.g., A fast and stylish sports car for those who love speed" oninput="generateVehicleItem()">A sleek, high-performance sports car with advanced engineering and cutting-edge design. Perfect for those who demand the best in speed and style.</textarea>
      </div>

    </div>

    <div class="generator-section">
      <div class="input-group">
        <label for="vehicle-model">Vehicle Model:</label>
        <input type="text" id="vehicle-model" placeholder="models/props_vehicles/car002.mdl" value="models/props_vehicles/car002.mdl" oninput="generateVehicleItem()">
        <small>3D model path for the vehicle</small>
      </div>

      <div class="form-grid-3">
        <div class="input-group">
          <label for="vehicle-price">Price:</label>
          <input type="number" id="vehicle-price" placeholder="5000" min="0" value="15000" oninput="generateVehicleItem()">
          <small>Purchase price in currency</small>
        </div>

        <div class="input-group">
          <label for="vehicle-class">Class:</label>
          <select id="vehicle-class" oninput="generateVehicleItem()">
            <option value="economy">Economy</option>
            <option value="compact">Compact</option>
            <option value="midsize">Mid-size</option>
            <option value="sports" selected>Sports</option>
            <option value="luxury">Luxury</option>
            <option value="suv">SUV</option>
            <option value="truck">Truck</option>
            <option value="van">Van</option>
          </select>
          <small>Vehicle classification</small>
        </div>

        <div class="input-group">
          <label for="vehicle-fuel">Fuel Capacity:</label>
          <input type="number" id="vehicle-fuel" placeholder="100" min="1" value="60" oninput="generateVehicleItem()">
          <small>Maximum fuel capacity</small>
        </div>
      </div>

      <div class="form-grid-2">
        <div class="input-group">
          <label for="vehicle-speed">Max Speed:</label>
          <input type="number" id="vehicle-speed" placeholder="100" min="1" value="180" oninput="generateVehicleItem()">
          <small>Maximum speed (km/h)</small>
        </div>

        <div class="input-group">
          <label for="vehicle-health">Health:</label>
          <input type="number" id="vehicle-health" placeholder="1000" min="1" value="1500" oninput="generateVehicleItem()">
          <small>Vehicle health points</small>
        </div>
      </div>

      <div class="form-grid-2">
        <div class="input-group">
          <label for="vehicle-seats">Seats:</label>
          <input type="number" id="vehicle-seats" placeholder="2" min="1" max="8" value="2" oninput="generateVehicleItem()">
          <small>Number of passenger seats</small>
        </div>

        <div class="input-group">
          <label for="vehicle-storage">Storage:</label>
          <input type="number" id="vehicle-storage" placeholder="50" min="0" value="20" oninput="generateVehicleItem()">
          <small>Storage capacity</small>
        </div>
      </div>
    </div>

    <div class="button-group">
      <button onclick="generateVehicleItem()" class="generate-btn">Generate Vehicle Item Code</button>
      <button onclick="fillExampleVehicle()" class="generate-btn example-btn">Generate Example</button>
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
function generateVehicleItem() {
  const uniqueId = (document.getElementById('item-id').value || '').trim() || 'vehicle_example';
  const name = (document.getElementById('item-name').value || '').trim() || 'Vehicle';
  const desc = (document.getElementById('item-desc').value || '').trim() || 'A vehicle that can be purchased and driven.';
  const model = (document.getElementById('vehicle-model').value || '').trim() || 'models/props_vehicles/car002.mdl';
  const price = document.getElementById('vehicle-price').value || '5000';
  const vehicleClass = document.getElementById('vehicle-class').value;
  const fuel = document.getElementById('vehicle-fuel').value || '100';
  const speed = document.getElementById('vehicle-speed').value || '100';
  const health = document.getElementById('vehicle-health').value || '1000';
  const seats = document.getElementById('vehicle-seats').value || '2';
  const storage = document.getElementById('vehicle-storage').value || '50';

  const lines = [
  '-- Copy and paste this code into a new Lua file in the items directory',
  '-- Example: modules/cardealer/items/' + uniqueId + '.lua',
  '',
  'ITEM.name = ' + JSON.stringify(name),
  'ITEM.desc = ' + JSON.stringify(desc),
  'ITEM.model = ' + JSON.stringify(model),
  'ITEM.category = "Vehicle"',
  'ITEM.width = 2',
  'ITEM.height = 2',
  'ITEM.isVehicle = true',
  'ITEM.price = ' + price,
  '',
  '-- Vehicle properties',
  'ITEM.vehicleData = {',
  '    class = ' + JSON.stringify(vehicleClass) + ',',
  '    maxFuel = ' + fuel + ',',
  '    maxSpeed = ' + speed + ',',
  '    health = ' + health + ',',
  '    seats = ' + seats + ',',
  '    storage = ' + storage,
  '}',
  '',
  'ITEM.functions.Deploy = {',
  '    name = "Deploy Vehicle",',
  '    icon = "icon16/car.png",',
  '    onRun = function(item)',
  '        local client = item.player',
  '        if not IsValid(client) then return false end',
  '        ',
  '        -- Check if player is in a valid area for vehicle deployment',
  '        local trace = client:GetEyeTrace()',
  '        local pos = trace.HitPos',
  '        ',
  '        -- Check if there is enough space',
  '        local vehicles = ents.FindInSphere(pos, 200)',
  '        for _, ent in ipairs(vehicles) do',
  '            if ent:IsVehicle() then',
  '                client:ChatPrint("Not enough space to deploy vehicle!")',
  '                return false',
  '            end',
  '        end',
  '        ',
  '        -- Create the vehicle',
  '        local vehicle = lia.cardealer.spawnVehicle(client, item.uniqueID, pos)',
  '        if IsValid(vehicle) then',
  '            vehicle:setNetVar("owner", client:getChar():getID())',
  '            vehicle:setNetVar("itemID", item.id)',
  '            client:ChatPrint("Vehicle deployed successfully!")',
  '            return true',
  '        else',
  '            client:ChatPrint("Failed to deploy vehicle!")',
  '            return false',
  '        end',
  '    end,',
  '    onCanRun = function(item)',
  '        local client = item.player',
  '        if not IsValid(client) then return false end',
  '        ',
  '        -- Check if player already has a deployed vehicle',
  '        local char = client:getChar()',
  '        if not char then return false end',
  '        ',
  '        local hasVehicle = false',
  '        for _, ent in ipairs(ents.GetAll()) do',
  '            if ent:IsVehicle() and ent:getNetVar("owner") == char:getID() then',
  '                hasVehicle = true',
  '                break',
  '            end',
  '        end',
  '        ',
  '        return not hasVehicle',
  '    end',
  '}',
  '',
  'function ITEM:getDesc()',
  '    local description = self.desc',
  '    description = description .. "\\n\\n**Vehicle Specifications:**"',
  '    description = description .. "\\n- Class: " .. (self.vehicleData.class or "Unknown")',
  '    description = description .. "\\n- Max Speed: " .. (self.vehicleData.maxSpeed or 0) .. " km/h"',
  '    description = description .. "\\n- Fuel Capacity: " .. (self.vehicleData.maxFuel or 0)',
  '    description = description .. "\\n- Seats: " .. (self.vehicleData.seats or 0)',
  '    description = description .. "\\n- Storage: " .. (self.vehicleData.storage or 0)',
  '    description = description .. "\\n- Price: $" .. (self.price or 0)',
  '    return description',
  'end'
  ];

  const code = `${lines.join('\n')}\n`;

  const outputBox = document.getElementById('output-code');
  if (outputBox) {
    outputBox.value = code;
  }
}

function fillExampleVehicle() {
  document.getElementById('item-id').value = 'luxury_sedan';
  document.getElementById('item-name').value = 'Executive Luxury Sedan';
  document.getElementById('item-desc').value = 'A premium luxury sedan featuring handcrafted leather interiors, advanced safety systems, and a smooth, powerful ride. Perfect for business executives and those who appreciate refined comfort and sophistication.';
  document.getElementById('vehicle-model').value = 'models/props_vehicles/car003.mdl';
  document.getElementById('vehicle-price').value = '45000';
  document.getElementById('vehicle-class').value = 'luxury';
  document.getElementById('vehicle-fuel').value = '80';
  document.getElementById('vehicle-speed').value = '220';
  document.getElementById('vehicle-health').value = '2000';
  document.getElementById('vehicle-seats').value = '4';
  document.getElementById('vehicle-storage').value = '100';

  generateVehicleItem();
}

// Initial generation
document.addEventListener('DOMContentLoaded', () => {
  generateVehicleItem();
});
</script>
