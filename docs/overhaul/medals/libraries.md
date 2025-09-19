# Libraries

This page documents the functions for managing medal systems, character medals, and medal pack operations in the medals module.

---

## Overview

The medals library (`lia.medals`) provides comprehensive functionality for medal management, character medal tracking, and medal pack operations. It handles everything from basic medal retrieval to complex medal pack management and character medal synchronization.

---

### canGiveMedals

**Purpose**

Checks if a player has permission to give medals to other players.

**When Called**

This function is called when:
- Medal giving operations need permission validation
- Admin actions require medal permission checks
- Medal management systems need authorization

**Parameters**

* `client` (*Player*): The player to check permissions for.

**Returns**

* `boolean`: True if the player can give medals, false otherwise.

**Realm**

Server.

---

### canTakeMedals

**Purpose**

Checks if a player has permission to take medals from other players.

**When Called**

This function is called when:
- Medal removal operations need permission validation
- Admin actions require medal permission checks
- Medal management systems need authorization

**Parameters**

* `client` (*Player*): The player to check permissions for.

**Returns**

* `boolean`: True if the player can take medals, false otherwise.

**Realm**

Server.

---

### exists

**Purpose**

Checks if a medal with the specified ID exists in the system.

**When Called**

This function is called when:
- Medal validation is required
- Medal existence checks are needed
- Medal operations need verification

**Parameters**

* `id` (*string*): The medal ID to check for existence.

**Returns**

* `boolean`: True if the medal exists, false otherwise.

**Realm**

Shared.

---

### get

**Purpose**

Retrieves medal data for a specific medal ID.

**When Called**

This function is called when:
- Medal information needs to be displayed
- Medal data is required for operations
- Medal details need to be accessed

**Parameters**

* `id` (*string*): The medal ID to retrieve data for.

**Returns**

* `table*`: Medal data table if found, nil otherwise.

**Realm**

Shared.

---

### getActiveMedalPacks

**Purpose**

Retrieves all currently active medal packs in the system.

**When Called**

This function is called when:
- Medal pack management is required
- Active packs need to be displayed
- Medal pack operations are needed

**Parameters**

*None*

**Returns**

* `table`: Table of active medal packs.

**Realm**

Shared.

---

### getAll

**Purpose**

Retrieves all medals from the system, optionally filtered by pack ID.

**When Called**

This function is called when:
- Complete medal lists are needed
- Medal pack filtering is required
- Medal enumeration is necessary

**Parameters**

* `packID` (*string*, optional): The pack ID to filter medals by.

**Returns**

* `table`: Table of medals, filtered by pack if specified.

**Realm**

Shared.

---

### getCharacterMedals

**Purpose**

Retrieves all medals for a specific character.

**When Called**

This function is called when:
- Character medal information is needed
- Medal display systems require data
- Character medal synchronization is required

**Parameters**

* `char` (*Character*): The character to get medals for.

**Returns**

* `table`: Table of character medals.

**Realm**

Shared.

---

### getCharacterMedalsFromPack

**Purpose**

Retrieves medals for a character from a specific medal pack.

**When Called**

This function is called when:
- Pack-specific medal information is needed
- Character medal filtering is required
- Medal pack operations are necessary

**Parameters**

* `char` (*Character*): The character to get medals for.
* `packID` (*string*): The pack ID to filter medals by.

**Returns**

* `table`: Table of character medals from the specified pack.

**Realm**

Shared.

---

### getPackID

**Purpose**

Retrieves the pack ID for a specific medal ID.

**When Called**

This function is called when:
- Medal pack identification is needed
- Medal organization is required
- Pack operations need medal mapping

**Parameters**

* `medalID` (*string*): The medal ID to find the pack for.

**Returns**

* `string*`: The pack ID if found, nil otherwise.

**Realm**

Shared.