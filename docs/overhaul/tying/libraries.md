# Tying Library

This page documents the functions for managing player search operations and restraint interactions in the cuffs module.

---

## Overview

The tying library (`lia.tying`) provides functionality for searching players who are being dragged and managing search sessions. It handles the complex interactions between draggers and their targets, ensuring proper search state management and UI synchronization.

---

### searchPlayer

**Purpose**

Initiates a search operation on a target player who is being dragged by the caller.

**When Called**

This function is called when:
- A player wants to search someone they are currently dragging
- Search operations need to be initiated programmatically
- Inventory access needs to be granted to a dragger for their target
- Search UI needs to be opened for a specific target

**Parameters**

* `client` (*Player*): The player initiating the search operation.
* `target` (*Player*): The player being searched.

**Returns**

* `success` (*boolean*): True if the search was successfully initiated, false otherwise.

**Realm**

Server.


---

### stopSearching

**Purpose**

Terminates an active search operation and cleans up associated data and UI elements.

**When Called**

This function is called when:
- A search operation needs to be cancelled
- The search UI is closed by the searcher
- Search sessions need to be cleaned up
- Player disconnection or other cleanup scenarios occur

**Parameters**

* `client` (*Player*): The player whose search operation should be stopped.

**Returns**

*None*

**Realm**

Server.

