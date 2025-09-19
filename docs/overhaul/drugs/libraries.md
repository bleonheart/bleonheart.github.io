# Libraries

This page documents the functions for managing drug effects, processing, and plant growth in the drugs module.

---

## Overview

The drugs library (`lia.drugs`) provides comprehensive functionality for drug effects, plant cultivation, drug processing, and inventory management. It handles everything from applying temporary drug effects to managing complex plant growth cycles and drug manufacturing processes.

---

### ApplyDrugEffect

**Purpose**

Applies a temporary drug effect to a player with specified value and duration.

**When Called**

This function is called when:
- A player consumes a drug item
- Drug effects need to be applied programmatically
- Temporary stat modifications are required
- Drug processing completes and effects are granted

**Parameters**

* `client` (*Player*): The player to apply the drug effect to.
* `effectType` (*string*): The type of effect to apply (e.g., "runspeed", "damage_reduction").
* `effectValue` (*number*): The multiplier or value for the effect.
* `effectTime` (*number*): Duration of the effect in seconds.
* `source` (*string*): Optional source identifier for the effect.

**Returns**

*None*

**Realm**

Server.

---

### clearPlayerDrugEffects

**Purpose**

Removes all active drug effects from a player and cleans up associated timers.

**When Called**

This function is called when:
- A player disconnects from the server
- A player dies and needs effect cleanup
- Character changes occur
- Server cleanup operations are performed

**Parameters**

* `client` (*Player*): The player to clear drug effects from.

**Returns**

*None*

**Realm**

Server.

---

### collectDrug

**Purpose**

Collects a processed drug from a drug processor and adds it to the player's inventory.

**When Called**

This function is called when:
- A player attempts to collect finished drugs from a processor
- Drug processing has completed and items are ready
- Inventory management operations are performed

**Parameters**

* `item` (*Item*): The drug processor item being used.
* `client` (*Player*): The player collecting the drug.
* `finalItemID` (*string*): The unique ID of the drug item to collect.
* `finalItemName` (*string*): The display name of the drug item.

**Returns**

* `success` (*boolean*): True if collection was successful, false otherwise.

**Realm**

Server.

---

### FormatTimeRemaining

**Purpose**

Formats a time duration in seconds into a human-readable string format.

**When Called**

This function is called when:
- Displaying drug effect time remaining
- Showing plant growth timers
- Formatting any time-based information for UI display

**Parameters**

* `seconds` (*number*): The time duration in seconds to format.

**Returns**

* `formattedTime` (*string*): Formatted time string (e.g., "2m 30s", "1h 15m").

**Realm**

Shared.

---

### GetActiveDrugEffectInfo

**Purpose**

Retrieves detailed information about a specific active drug effect on a player.

**When Called**

This function is called when:
- Checking specific drug effect details
- UI systems need effect information
- Debugging or monitoring drug effects
- Effect validation operations

**Parameters**

* `client` (*Player*): The player to check for drug effects.
* `effectType` (*string*): The type of effect to get information for.

**Returns**

* `effectInfo` (*table*): Table containing effect details (value, expires, source, timeRemaining) or nil if no active effect.

**Realm**

Server.

---

### GetActiveMultiplier

**Purpose**

Gets the current multiplier value for a specific drug effect type on a player.

**When Called**

This function is called when:
- Calculating modified stats or values
- Applying drug effect bonuses to gameplay mechanics
- Stat calculation systems need current multipliers

**Parameters**

* `client` (*Player*): The player to check for active effects.
* `effectType` (*string*): The type of effect to get the multiplier for.
* `defaultMul` (*number*): Default multiplier to return if no effect is active.

**Returns**

* `multiplier` (*number*): The current multiplier value for the effect type.

**Realm**

Server.

---

### GetEffectDisplayName

**Purpose**

Converts a drug effect type identifier into a human-readable display name.

**When Called**

This function is called when:
- Displaying effect names in UI elements
- Creating user-friendly effect descriptions
- Converting internal effect types to display text

**Parameters**

* `effectType` (*string*): The effect type identifier to convert.

**Returns**

* `displayName` (*string*): Human-readable name for the effect type.

**Realm**

Shared.

---

### HandleDrugOverdose

**Purpose**

Handles drug overdose events and notifies administrators when they occur.

**When Called**

This function is called when:
- A player experiences a drug overdose
- Overdose chance calculations result in an overdose
- Drug consumption exceeds safe limits

**Parameters**

* `client` (*Player*): The player who overdosed.
* `drugName` (*string*): The name of the drug that caused the overdose.
* `overdoseChance` (*number*): The calculated chance of overdose.

**Returns**

*None*

**Realm**

Server.

---

### HasActiveDrugEffect

**Purpose**

Checks if a player currently has an active drug effect of a specific type.

**When Called**

This function is called when:
- Validating drug consumption eligibility
- Checking for conflicting effects
- UI systems need to display effect status
- Gameplay mechanics need effect validation

**Parameters**

* `client` (*Player*): The player to check for active effects.
* `effectType` (*string*): The type of effect to check for.

**Returns**

* `hasEffect` (*boolean*): True if the player has an active effect of the specified type.

**Realm**

Server.

---

### IsEffectExpiringSoon

**Purpose**

Checks if a drug effect is about to expire within a specified warning threshold.

**When Called**

This function is called when:
- Warning players about expiring effects
- UI systems need to show expiration warnings
- Effect monitoring systems check status

**Parameters**

* `expiresAt` (*number*): The timestamp when the effect expires.
* `warningThreshold` (*number*): Optional warning threshold in seconds (defaults to config value).

**Returns**

* `isExpiringSoon` (*boolean*): True if the effect expires within the warning threshold.

**Realm**

Shared.

---

### processDrug

**Purpose**

Initiates the drug processing operation in a drug processor item.

**When Called**

This function is called when:
- A player starts processing drugs in a processor
- Drug manufacturing operations begin
- Processing timers need to be set up

**Parameters**

* `item` (*Item*): The drug processor item being used.
* `client` (*Player*): The player initiating the process.
* `unprocessedID` (*string*): The unique ID of the unprocessed drug item.
* `unprocessedName` (*string*): The display name of the unprocessed drug.
* `finalItemID` (*string*): The unique ID of the final processed drug.
* `finalItemName` (*string*): The display name of the final processed drug.

**Returns**

* `success` (*boolean*): True if processing was initiated successfully.

**Realm**

Server.

---

### RecalcRunSpeed

**Purpose**

Recalculates and updates a player's run speed based on active drug effects.

**When Called**

This function is called when:
- Drug effects are applied or removed
- Player spawns and needs speed calculation
- Run speed modifiers change

**Parameters**

* `client` (*Player*): The player whose run speed needs recalculation.

**Returns**

*None*

**Realm**

Server.

---

### resetAllDrugItems

**Purpose**

Resets all drug-related items on the server to their original state.

**When Called**

This function is called when:
- Server is shutting down
- Map cleanup operations occur
- Administrative reset commands are executed

**Parameters**

*None*

**Returns**

*None*

**Realm**

Server.

---

### resetDrugProcessors

**Purpose**

Resets all drug processor items to their original state, clearing production data.

**When Called**

This function is called when:
- Server cleanup operations are performed
- Drug processors need to be reset
- Administrative commands are executed

**Parameters**

*None*

**Returns**

*None*

**Realm**

Server.

---

### resetPlantedPlants

**Purpose**

Resets all planted plants to their original state, clearing growth data.

**When Called**

This function is called when:
- Server cleanup operations are performed
- Plant growth data needs to be reset
- Administrative commands are executed

**Parameters**

*None*

**Returns**

*None*

**Realm**

Server.

---

### SetupBasicUtilityFunctionality

**Purpose**

Sets up basic utility functionality for soil and other basic drug-related items.

**When Called**

This function is called when:
- Drug items are being initialized
- Basic utility items need functionality setup
- Item registration processes occur

**Parameters**

* `ITEM` (*Item*): The item object to set up functionality for.
* `itemType` (*string*): The type of item being set up.

**Returns**

*None*

**Realm**

Server.

---

### SetupDrugProcessorFunctionality

**Purpose**

Sets up functionality for drug processor items including processing and collection functions.

**When Called**

This function is called when:
- Drug processor items are being initialized
- Processing functionality needs to be configured
- Item registration processes occur

**Parameters**

* `ITEM` (*Item*): The drug processor item object to set up.

**Returns**

*None*

**Realm**

Server.

---

### SetupFilledSoilFunctionality

**Purpose**

Sets up functionality for filled soil items including planting and harvesting operations.

**When Called**

This function is called when:
- Filled soil items are being initialized
- Plant cultivation functionality needs to be configured
- Item registration processes occur

**Parameters**

* `ITEM` (*Item*): The filled soil item object to set up.

**Returns**

*None*

**Realm**

Server.

---

### SetupPotFunctionality

**Purpose**

Sets up functionality for empty pot items including soil usage operations.

**When Called**

This function is called when:
- Empty pot items are being initialized
- Pot functionality needs to be configured
- Item registration processes occur

**Parameters**

* `ITEM` (*Item*): The empty pot item object to set up.

**Returns**

*None*

**Realm**

Server.

---

### startOrRefreshGrowthTimer

**Purpose**

Starts or refreshes the growth timer for a planted item, managing plant growth phases.

**When Called**

This function is called when:
- A seed is planted in filled soil
- Plant growth timers need to be initialized
- Growth phase calculations are required

**Parameters**

* `item` (*Item*): The planted item to start growth timer for.

**Returns**

*None*

**Realm**

Server.
