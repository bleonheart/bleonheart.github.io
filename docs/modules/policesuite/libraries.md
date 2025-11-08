# Police Suite Library

Comprehensive police system with alarms, 999 emergency calls, stun weapons, crime tracking, warrants, arrests, police NPCs, and computer database for law enforcement management.

---

### lia.police.addWarrant

#### 📋 Purpose
Add a warrant to a character's police registry.

#### ⏰ When Called
When issuing a warrant for a character.

#### ⚙️ Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `character` | **Character** | The character to issue the warrant for |
| `warranter` | **Player** | The player issuing the warrant |
| `reason` | **string** | Reason for the warrant |

#### ↩️ Returns
*boolean* - True if warrant was added successfully

#### 🌐 Realm
Server

---

### lia.police.arrestPlayer

#### 📋 Purpose
Arrest and jail a handcuffed player.

#### ⏰ When Called
When arresting a player and sending them to jail.

#### ⚙️ Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `target` | **Player** | The player to arrest |
| `officer` | **Player** | The officer making the arrest |
| `reasonKey` | **string** | Key for legal arrest reason |
| `customReason` | **string\|nil** | Optional custom reason text |
| `durationSeconds` | **number** | Jail duration in seconds |

#### ↩️ Returns
*boolean, string* - Success status and error message if failed

#### 🌐 Realm
Server

---

### lia.police.clearAllWarrants

#### 📋 Purpose
Clear all active warrants for a character.

#### ⏰ When Called
When removing all warrants from a character's record.

#### ⚙️ Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `character` | **Character** | The character whose warrants to clear |
| `warranter` | **Player** | The player clearing the warrants |

#### ↩️ Returns
*boolean* - True if warrants were cleared

#### 🌐 Realm
Server

---

### lia.police.getActiveWarrants

#### 📋 Purpose
Get all active warrants for a character.

#### ⏰ When Called
When retrieving active warrant information.

#### ⚙️ Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `character` | **Character** | The character to check |

#### ↩️ Returns
*table* - Table of active warrant data

#### 🌐 Realm
Server

---

### lia.police.getAllPrisoners

#### 📋 Purpose
Get a list of all currently jailed prisoners.

#### ⏰ When Called
When retrieving prisoner information.

#### ⚙️ Parameters
None

#### ↩️ Returns
*table* - Table of prisoner data

#### 🌐 Realm
Server

---

### lia.police.getEmergencyResponders

#### 📋 Purpose
Get all online players in a specific faction for emergency response.

#### ⏰ When Called
When sending emergency calls to responders.

#### ⚙️ Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `factionID` | **number** | Faction ID to get responders from |

#### ↩️ Returns
*table* - Table of responder players

#### 🌐 Realm
Server

---

### lia.police.getLegalArrestReasons

#### 📋 Purpose
Get a sorted list of legal arrest reasons.

#### ⏰ When Called
When displaying arrest reason options.

#### ⚙️ Parameters
None

#### ↩️ Returns
*table* - Sorted table of {label, key} pairs

#### 🌐 Realm
Shared

---

### lia.police.getNearbyCuffedPlayers

#### 📋 Purpose
Get all handcuffed players within a radius of a player.

#### ⏰ When Called
When finding nearby handcuffed players for arrest.

#### ⚙️ Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `originPly` | **Player** | The player to check from |
| `radius` | **number\|nil** | Search radius (defaults to 300) |

#### ↩️ Returns
*table* - Table of nearby handcuffed players

#### 🌐 Realm
Server

---

### lia.police.hasActiveWarrants

#### 📋 Purpose
Check if a character has any active warrants.

#### ⏰ When Called
When checking warrant status.

#### ⚙️ Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `character` | **Character** | The character to check |

#### ↩️ Returns
*boolean* - True if character has active warrants

#### 🌐 Realm
Server

---

### lia.police.hasECMJammer

#### 📋 Purpose
Check if a player has an ECM jammer in their inventory.

#### ⏰ When Called
When checking for ECM jammers that block alarms.

#### ⚙️ Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `ply` | **Player** | The player to check |

#### ↩️ Returns
*boolean* - True if player has ECM jammer

#### 🌐 Realm
Server

---

### lia.police.isJailed

#### 📋 Purpose
Check if a player is currently jailed.

#### ⏰ When Called
When checking jail status.

#### ⚙️ Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `ply` | **Player** | The player to check |

#### ↩️ Returns
*boolean* - True if player is jailed

#### 🌐 Realm
Server

---

### lia.police.notify

#### 📋 Purpose
Send a waypoint notification to all police officers.

#### ⏰ When Called
When alerting police to a location.

#### ⚙️ Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `message` | **string** | Message to display |
| `position` | **Vector** | Position for waypoint |

#### ↩️ Returns
nil

#### 🌐 Realm
Server

---

### lia.police.playAlarm

#### 📋 Purpose
Play an alarm sound on an entity, checking for ECM jammers.

#### ⏰ When Called
When triggering an alarm on a door or vehicle.

#### ⚙️ Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `ent` | **Entity** | The entity to play alarm on |

#### ↩️ Returns
*boolean* - True if alarm was played (not jammed)

#### 🌐 Realm
Server

---

### lia.police.releasePlayer

#### 📋 Purpose
Release a player from jail.

#### ⏰ When Called
When releasing a jailed player.

#### ⚙️ Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `target` | **Player** | The player to release |
| `releaser` | **Player\|nil** | The player releasing them |
| `reason` | **string\|nil** | Reason for release |

#### ↩️ Returns
*boolean, string* - Success status and error message if failed

#### 🌐 Realm
Server

---

### lia.police.removeWarrant

#### 📋 Purpose
Remove a specific warrant from a character.

#### ⏰ When Called
When removing a warrant by ID.

#### ⚙️ Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `character` | **Character** | The character whose warrant to remove |
| `warranter` | **Player** | The player removing the warrant |
| `warrantID` | **number** | The ID of the warrant to remove |

#### ↩️ Returns
*boolean* - True if warrant was removed

#### 🌐 Realm
Server

---

### lia.police.sendEmergencyCall

#### 📋 Purpose
Send an emergency 999 call to responders.

#### ⏰ When Called
When a player makes an emergency call.

#### ⚙️ Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `caller` | **Player** | The player making the call |
| `service` | **string** | Service type ("police", "ems", "towing") |
| `reason` | **string** | Reason for the call |
| `position` | **Vector** | Location of the emergency |

#### ↩️ Returns
*boolean, string* - Success status and message

#### 🌐 Realm
Server

---

### lia.police.stopVisualAlarm

#### 📋 Purpose
Stop the visual alarm effect on an entity.

#### ⏰ When Called
When stopping an alarm visual effect.

#### ⚙️ Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `ent` | **Entity** | The entity to stop alarm on |

#### ↩️ Returns
*boolean* - True if alarm was stopped

#### 🌐 Realm
Server

---

### lia.police.triggerAllDoorsWithWaypoints

#### 📋 Purpose
Trigger alarms on all doors and notify police.

#### ⏰ When Called
When triggering a mass alarm event.

#### ⚙️ Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `message` | **string\|nil** | Optional alert message |

#### ↩️ Returns
*number, number* - Successful alarms count, total door count

#### 🌐 Realm
Server

---

### lia.police.triggerVisualAlarm

#### 📋 Purpose
Trigger a visual alarm effect on an entity.

#### ⏰ When Called
When starting an alarm visual effect.

#### ⚙️ Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `ent` | **Entity** | The entity to trigger alarm on |

#### ↩️ Returns
*boolean* - True if alarm was triggered

#### 🌐 Realm
Server

---

### lia.police.warrantToggle

#### 📋 Purpose
Toggle warrant status for a character (add if none, clear if active).

#### ⏰ When Called
When toggling warrant status.

#### ⚙️ Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `character` | **Character** | The character to toggle |
| `warranter` | **Player** | The player performing the toggle |

#### ↩️ Returns
*boolean* - New warrant status (true if warrants now active)

#### 🌐 Realm
Server

---