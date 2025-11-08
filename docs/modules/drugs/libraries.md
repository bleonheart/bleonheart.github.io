# Libraries

Drug cultivation, processing, consumption, and addiction system with effects like speed boost, damage reduction, and stamina regeneration

---

### lia.drugs.applyDrugEffect

#### 📋 Purpose
Apply a drug effect to a player with duration and value.

#### ⏰ When Called
When a player consumes a drug item.

#### ⚙️ Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `client` | **Player** | The player receiving the effect |
| `effectType` | **string** | Type of effect (runspeed, damage_reduction, etc.) |
| `effectValue` | **number** | Effect multiplier value |
| `effectTime` | **number** | Duration in seconds |
| `source` | **string\|nil** | Optional source identifier |

#### ↩️ Returns
nil

#### 🌐 Realm
Server

---

### lia.drugs.clearPlayerDrugEffects

#### 📋 Purpose
Clear all active drug effects from a player.

#### ⏰ When Called
When a player dies, disconnects, or needs effects cleared.

#### ⚙️ Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `client` | **Player** | The player to clear effects from |

#### ↩️ Returns
nil

#### 🌐 Realm
Server

---

### lia.drugs.collectDrug

#### 📋 Purpose
Collect processed drugs from a drug processor.

#### ⏰ When Called
When a player collects finished drugs from a processor.

#### ⚙️ Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `item` | **Item** | The drug processor item |
| `client` | **Player** | The player collecting |
| `finalItemID` | **string** | The processed drug item ID |
| `finalItemName` | **string** | Display name of the drug |

#### ↩️ Returns
*boolean* - False to prevent default action

#### 🌐 Realm
Server

---

### lia.drugs.formatTimeRemaining

#### 📋 Purpose
Format remaining time in a human-readable string.

#### ⏰ When Called
When displaying drug effect time remaining.

#### ⚙️ Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `seconds` | **number** | Time in seconds |

#### ↩️ Returns
*string* - Formatted time string (e.g., "5m 30s", "1h 15m")

#### 🌐 Realm
Shared

---

### lia.drugs.getActiveDrugEffectInfo

#### 📋 Purpose
Get detailed information about an active drug effect.

#### ⏰ When Called
When retrieving effect information for display.

#### ⚙️ Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `client` | **Player** | The player to check |
| `effectType` | **string** | The effect type to get info for |

#### ↩️ Returns
*table\|nil* - Effect info table with value, expires, source, timeRemaining, or nil

#### 🌐 Realm
Server

---

### lia.drugs.getActiveMultiplier

#### 📋 Purpose
Get the active multiplier value for a drug effect type.

#### ⏰ When Called
When checking current effect strength.

#### ⚙️ Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `client` | **Player** | The player to check |
| `effectType` | **string** | The effect type |
| `defaultMul` | **number\|nil** | Default multiplier if no effect (defaults to 1) |

#### ↩️ Returns
*number* - Current multiplier value

#### 🌐 Realm
Server

---

### lia.drugs.getEffectDisplayName

#### 📋 Purpose
Get a human-readable display name for an effect type.

#### ⏰ When Called
When displaying effect names in UI.

#### ⚙️ Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `effectType` | **string** | The effect type key |

#### ↩️ Returns
*string* - Display name for the effect

#### 🌐 Realm
Shared

---

### lia.drugs.handleDrugOverdose

#### 📋 Purpose
Handle drug overdose events and notify admins.

#### ⏰ When Called
When a player overdoses on a drug.

#### ⚙️ Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `client` | **Player** | The player who overdosed |
| `drugName` | **string** | Name of the drug |
| `overdoseChance` | **number\|nil** | Overdose chance percentage |

#### ↩️ Returns
nil

#### 🌐 Realm
Server

---

### lia.drugs.hasActiveDrugEffect

#### 📋 Purpose
Check if a player has an active drug effect of a specific type.

#### ⏰ When Called
When checking if an effect is currently active.

#### ⚙️ Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `client` | **Player** | The player to check |
| `effectType` | **string** | The effect type to check |

#### ↩️ Returns
*boolean* - True if effect is active

#### 🌐 Realm
Server

---

### lia.drugs.isEffectExpiringSoon

#### 📋 Purpose
Check if a drug effect is expiring soon.

#### ⏰ When Called
When warning players about expiring effects.

#### ⚙️ Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `expiresAt` | **number** | Expiration timestamp |
| `warningThreshold` | **number\|nil** | Warning threshold in seconds (optional) |

#### ↩️ Returns
*boolean* - True if expiring soon

#### 🌐 Realm
Shared

---

### lia.drugs.isPlayerProducingDrugs

#### 📋 Purpose
Check if a player is currently producing drugs.

#### ⏰ When Called
When preventing multiple simultaneous productions.

#### ⚙️ Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `client` | **Player** | The player to check |

#### ↩️ Returns
*boolean* - True if player is producing drugs

#### 🌐 Realm
Server

---

### lia.drugs.playerHasDrugProcessor

#### 📋 Purpose
Check if a player has a drug processor in inventory or nearby.

#### ⏰ When Called
When checking processor availability.

#### ⚙️ Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `client` | **Player** | The player to check |

#### ↩️ Returns
*boolean* - True if player has a processor

#### 🌐 Realm
Server

---

### lia.drugs.processDrug

#### 📋 Purpose
Start processing unprocessed drugs in a drug processor.

#### ⏰ When Called
When a player starts processing drugs.

#### ⚙️ Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `item` | **Item** | The drug processor item |
| `client` | **Player** | The player processing |
| `unprocessedID` | **string** | Unprocessed drug item ID |
| `unprocessedName` | **string** | Display name of unprocessed drug |
| `finalItemID` | **string** | Final processed drug item ID |
| `finalItemName` | **string** | Display name of processed drug |

#### ↩️ Returns
*boolean* - False to prevent default action

#### 🌐 Realm
Server

---

### lia.drugs.recalcRunSpeed

#### 📋 Purpose
Recalculate and update player run speed based on active drug effects.

#### ⏰ When Called
When drug effects change or player spawns.

#### ⚙️ Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `client` | **Player** | The player to recalculate for |

#### ↩️ Returns
nil

#### 🌐 Realm
Server

---

### lia.drugs.resetAllDrugItems

#### 📋 Purpose
Reset all drug processors and planted plants on the map.

#### ⏰ When Called
When cleaning up the map or resetting drug items.

#### ⚙️ Parameters
None

#### ↩️ Returns
nil

#### 🌐 Realm
Server

---

### lia.drugs.resetDrugProcessors

#### 📋 Purpose
Reset all drug processors on the map.

#### ⏰ When Called
When resetting processor states.

#### ⚙️ Parameters
None

#### ↩️ Returns
nil

#### 🌐 Realm
Server

---

### lia.drugs.resetPlantedPlants

#### 📋 Purpose
Reset all planted plants on the map.

#### ⏰ When Called
When resetting plant growth states.

#### ⚙️ Parameters
None

#### ↩️ Returns
nil

#### 🌐 Realm
Server

---

### lia.drugs.setupBasicUtilityFunctionality

#### 📋 Purpose
Set up basic utility functionality for drug-related items.

#### ⏰ When Called
During item registration.

#### ⚙️ Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `ITEM` | **table** | Item definition table |
| `itemType` | **string** | Item type identifier |

#### ↩️ Returns
nil

#### 🌐 Realm
Server

---

### lia.drugs.setupDrugProcessorFunctionality

#### 📋 Purpose
Set up functionality for drug processor items.

#### ⏰ When Called
During drug processor item registration.

#### ⚙️ Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `ITEM` | **table** | Drug processor item definition |

#### ↩️ Returns
nil

#### 🌐 Realm
Server

---

### lia.drugs.setupFilledSoilFunctionality

#### 📋 Purpose
Set up functionality for filled soil items.

#### ⏰ When Called
During filled soil item registration.

#### ⚙️ Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `ITEM` | **table** | Filled soil item definition |

#### ↩️ Returns
nil

#### 🌐 Realm
Server

---

### lia.drugs.setupPotFunctionality

#### 📋 Purpose
Set up functionality for pot items.

#### ⏰ When Called
During pot item registration.

#### ⚙️ Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `ITEM` | **table** | Pot item definition |

#### ↩️ Returns
nil

#### 🌐 Realm
Server

---

### lia.drugs.startOrRefreshGrowthTimer

#### 📋 Purpose
Start or refresh the growth timer for a planted item.

#### ⏰ When Called
When a plant is planted or needs growth timer updates.

#### ⚙️ Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `item` | **Item** | The planted item |

#### ↩️ Returns
nil

#### 🌐 Realm
Server

---