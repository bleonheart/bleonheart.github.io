# Events

Map-based NPC event system with configurable spawn positions, player count requirements, automatic timers, and staff/player notifications

---

## Generator

<div class="generator-grid">
  <!-- Input Column -->
  <div class="generator-card form-card">
    <div class="generator-section">
      <div class="form-grid-2">
        <div class="input-group">
          <label for="event-id">Unique ID:</label>
          <input type="text" id="event-id" placeholder="e.g., downtown_patrol" value="downtown_patrol" oninput="generateEventCode()">
          <small>Unique identifier for this event</small>
        </div>

        <div class="input-group">
          <label for="event-name">Event Name:</label>
          <input type="text" id="event-name" placeholder="e.g., Downtown Patrol" value="Downtown Patrol" oninput="generateEventCode()">
        </div>
      </div>

      <div class="form-grid-2">
        <div class="input-group">
          <label for="event-map">Map:</label>
          <input type="text" id="event-map" placeholder="e.g., rp_nycity_day" value="rp_nycity_day" oninput="generateEventCode()">
        </div>

        <div class="input-group">
          <label for="event-notif">Notification:</label>
          <input type="text" id="event-notif" placeholder="e.g., Downtown Patrol: Metropolice are patrolling downtown!" value="Downtown Patrol: Metropolice are patrolling downtown!" oninput="generateEventCode()">
        </div>
      </div>
    </div>

    <div class="generator-section">
      <div class="input-group">
        <label>NPC Spawns:</label>
        <small>Add one or more NPC spawn entries. Class is used as the key in the npcs table.</small>
      </div>

      <div id="npc-list" class="dynamic-list"></div>
      <button type="button" class="add-btn" onclick="addNpcRow()">Add NPC</button>
    </div>

    <div class="button-group">
      <button onclick="generateEventCode()" class="generate-btn">Generate Event Code</button>
      <button onclick="fillExampleEvent()" class="generate-btn example-btn">Generate Example</button>
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
function npcRowTemplate(idx, cls, pos, ang, radius) {
  return `
  <div class="dynamic-row" data-idx="${idx}">
    <input type="text" class="npc-class" placeholder="npc_metropolice" value="${cls || ''}" oninput="generateEventCode()">
    <input type="text" class="npc-pos small-input" placeholder="Vector(0, 0, 0)" value="${pos || ''}" oninput="generateEventCode()">
    <input type="text" class="npc-ang small-input" placeholder="Angle(0, 0, 0)" value="${ang || ''}" oninput="generateEventCode()">
    <input type="number" class="npc-radius small-input" placeholder="100" value="${radius || '100'}" oninput="generateEventCode()">
    <button type="button" class="remove-btn" onclick="removeNpcRow(this)">×</button>
  </div>`;
}

function addNpcRow(cls, pos, ang, radius) {
  const list = document.getElementById('npc-list');
  const idx = list.children.length;
  list.insertAdjacentHTML('beforeend', npcRowTemplate(idx, cls, pos, ang, radius));
  generateEventCode();
}

function removeNpcRow(btn) {
  const row = btn.closest('.dynamic-row');
  if (row) row.remove();
  generateEventCode();
}

function generateEventCode() {
  const uniqueId = (document.getElementById('event-id').value || '').trim() || 'event_example';
  const name = (document.getElementById('event-name').value || '').trim() || 'Event';
  const map = (document.getElementById('event-map').value || '').trim() || 'gm_construct';
  const notification = (document.getElementById('event-notif').value || '').trim() || '';

  const npcRows = Array.from(document.querySelectorAll('#npc-list .dynamic-row'));
  const npcEntries = [];

  for (const row of npcRows) {
    const cls = (row.querySelector('.npc-class').value || '').trim();
    const pos = (row.querySelector('.npc-pos').value || '').trim() || 'Vector(0, 0, 0)';
    const ang = (row.querySelector('.npc-ang').value || '').trim() || 'Angle(0, 0, 0)';
    const radius = (row.querySelector('.npc-radius').value || '').trim() || '100';
    if (!cls) continue;
    npcEntries.push({ cls, pos, ang, radius });
  }

  const lines = [
  '-- Copy and paste this code into the module definitions file',
  '-- Example: garrysmod/gamemodes/[schema folder]/modules/done/events/definitions.lua',
  '',
  `MODULE:RegisterEvent(${JSON.stringify(uniqueId)}, {`,
  `    name = ${JSON.stringify(name)},`,
  `    map = ${JSON.stringify(map)},`,
  '    npcs = {'
  ];

  if (npcEntries.length === 0) {
    lines.push('        -- Add NPC entries via the generator UI');
  } else {
    for (const n of npcEntries) {
      lines.push(`        [${JSON.stringify(n.cls)}] = {`);
      lines.push(`            pos = ${n.pos},`);
      lines.push(`            ang = ${n.ang},`);
      lines.push(`            radius = ${n.radius}`);
      lines.push('        },');
    }
    // remove trailing comma for last npc entry
    if (lines[lines.length - 1] === '        },') {
      lines[lines.length - 1] = '        }';
    }
  }

  lines.push('    },');
  lines.push(`    notification = ${JSON.stringify(notification)}`);
  lines.push('})');

  const code = `${lines.join('\n')}\n`;
  const outputBox = document.getElementById('output-code');
  if (outputBox) outputBox.value = code;
}

function fillExampleEvent() {
  document.getElementById('event-id').value = 'downtown_patrol';
  document.getElementById('event-name').value = 'Downtown Patrol';
  document.getElementById('event-map').value = 'rp_nycity_day';
  document.getElementById('event-notif').value = 'Downtown Patrol: Metropolice are patrolling downtown!';
  const list = document.getElementById('npc-list');
  list.innerHTML = '';
  addNpcRow('npc_metropolice', 'Vector(8439.314453, -12269.247070, -255.968750)', 'Angle(0, 0, 0)', '100');
}

document.addEventListener('DOMContentLoaded', () => {
  addNpcRow('npc_metropolice', 'Vector(8439.314453, -12269.247070, -255.968750)', 'Angle(0, 0, 0)', '100');
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

