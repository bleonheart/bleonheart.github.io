# Hooks

This page documents the hooks provided by the Lockpicking module for handling door and vehicle lockpicking events.

---

## Overview

The Lockpicking module provides hooks for managing lockpicking attempts, both successful and failed. These hooks allow other modules and addons to respond to lockpicking events and modify behavior accordingly.

---

### OnDoorLockPicked

**Purpose**

Triggered when a player successfully picks a door or vehicle lock.

**When Called**

This hook is called when:
- A player successfully completes the lockpicking minigame
- A door or vehicle is unlocked through lockpicking
- The lockpicking session ends in success

**Parameters**

* `player` (*Player*): The player who successfully picked the lock.
* `target` (*Entity*): The door or vehicle entity that was unlocked.

**Realm**

Server.

---

### OnDoorLockPickFailed

**Purpose**

Triggered when a player fails to pick a door or vehicle lock.

**When Called**

This hook is called when:
- A player's lockpick breaks during the lockpicking process
- The lockpicking minigame fails
- The lockpicking session ends in failure

**Parameters**

* `player` (*Player*): The player who failed to pick the lock.
* `target` (*Entity*): The door or vehicle entity that was being lockpicked.

**Realm**

Server.
