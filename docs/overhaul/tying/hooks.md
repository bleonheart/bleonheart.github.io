# Hooks

This page documents the hooks provided by the cuffs module for player restraint and release events.

---

## PlayerHandcuffed

**Purpose**

Called when a player is successfully handcuffed or restrained.

**When Called**

This hook is called when:
- A player is handcuffed using the `HandcuffPlayer` method
- A player is restrained through the tying system
- Handcuff effects are applied to a player after ragdoll recovery
- Any successful handcuff operation completes

**Parameters**

* `player` (*Player*): The player who was handcuffed.
* `cuffer` (*Player*): The player who applied the handcuffs (can be nil for system handcuffs).

**Realm**

Server.


---

## PlayerReleased

**Purpose**

Called when a player is released from handcuffs or restraints.

**When Called**

This hook is called when:
- A player's handcuffs are removed using the `RemoveHandcuffs` method
- A player is untied by another player
- Handcuff restrictions are cleared from a player
- Any successful release operation completes

**Parameters**

* `player` (*Player*): The player who was released from restraints.
* `cuffer` (*Player*): The player who removed the handcuffs (can be nil for system releases).

**Realm**

Server.

