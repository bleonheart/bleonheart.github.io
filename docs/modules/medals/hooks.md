# Hooks

This page documents the hooks provided by the Medals module for handling medal management and player recognition.

---

## Overview

The Medals module provides hooks for managing player medals, including permission checks, medal changes, and data updates. These hooks allow other modules and addons to respond to medal events and modify behavior accordingly.

---

### CanGiveMedal

**Purpose**

Determines whether a player can give medals to other players.

**When Called**

This hook is called when:
- Medal giving commands are executed
- Permission checks are required for medal distribution
- Admin actions involving medal giving are performed

**Parameters**

* `client` (*Player*): The player attempting to give a medal.
* `target` (*Player*): The target player receiving the medal (optional).

**Returns**

* `canGive` (*boolean*): True if the player can give medals, false otherwise.
* `reason` (*string*): Reason why the player cannot give medals (optional).

**Realm**

Server.

---

### CanTakeMedal

**Purpose**

Determines whether a player can take medals from other players.

**When Called**

This hook is called when:
- Medal removal commands are executed
- Permission checks are required for medal removal
- Admin actions involving medal taking are performed

**Parameters**

* `client` (*Player*): The player attempting to take a medal.
* `target` (*Player*): The target player losing the medal (optional).

**Returns**

* `canTake` (*boolean*): True if the player can take medals, false otherwise.
* `reason` (*string*): Reason why the player cannot take medals (optional).

**Realm**

Server.

---

### MedalsDataUpdated

**Purpose**

Triggered when medal data is updated or refreshed.

**When Called**

This hook is called when:
- Medal data is synchronized
- Medal states are updated
- Medal information needs to be refreshed

**Parameters**

None.

**Returns**

None.

**Realm**

Client.

---

### PlayerMedalsChanged

**Purpose**

Triggered when a player's medals are modified.

**When Called**

This hook is called when:
- A player receives a new medal
- A player's medal is removed
- Medal states are changed (worn/unworn)
- Medal data is updated

**Parameters**

* `client` (*Player*): The player whose medals changed.
* `medals` (*table*): The updated medals data table.

**Returns**

None.

**Realm**

Server.