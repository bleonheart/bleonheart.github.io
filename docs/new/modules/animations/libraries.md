# Animations Library

This page documents the functions for managing player animations and bone manipulation in the Lilia framework.

---

## Overview

The animations library (`lia.animations`) provides a comprehensive system for managing player animations through bone manipulation. It serves as the core animation system for roleplay scenarios, allowing players to perform various poses and gestures through predefined bone angle configurations. The library handles animation activation, deactivation, bone manipulation, and movement-based interruption, making it ideal for immersive roleplay experiences.

---

### VelocityIsHigher

**Purpose**

Checks if a player's velocity exceeds a specified threshold in any direction.

**When Called**

This function is called when:
- Movement detection is required for animation interruption
- Velocity-based animation conditions need to be checked
- During animation state validation
- When determining if a player is moving too fast for certain animations

**Parameters**

* `client` (*Player*): The player entity to check velocity for.
* `threshold` (*number*): The velocity threshold to compare against (defaults to 0.1).

**Returns**

* `isHigher` (*boolean*): True if the player's velocity exceeds the threshold in any direction, false otherwise.

**Realm**

Server.


---

### ApplyAnimation

**Purpose**

Applies bone angle manipulations to a player based on a specific animation class.

**When Called**

This function is called when:
- An animation needs to be visually applied to a player
- During animation state updates in the movement hook
- When toggling animations on or off
- During bone manipulation for pose changes

**Parameters**

* `client` (*Player*): The player entity to apply the animation to.
* `value` (*number*): The multiplier for bone angles (1 for full application, 0 for reset).
* `class` (*string*): The animation class name from AnimationsTable.

**Returns**

*None*

**Realm**

Server.


---

### ResetBones

**Purpose**

Resets specific bone angles to their default positions for a given bone table.

**When Called**

This function is called when:
- An animation needs to be completely stopped
- Bone angles need to be reset to default positions
- During animation cleanup processes
- When switching between different animations

**Parameters**

* `client` (*Player*): The player entity to reset bones for.
* `boneTable` (*table*): Table containing bone names as keys for bones to reset.

**Returns**

*None*

**Realm**

Server.


---

### ToggleAnimation

**Purpose**

Activates or deactivates an animation for a player, managing network variables and bone manipulation.

**When Called**

This function is called when:
- Players manually start or stop animations
- Movement interrupts animations
- Weapon switching occurs
- Animation state needs to be toggled programmatically

**Parameters**

* `client` (*Player*): The player entity to toggle animation for.
* `active` (*boolean*): Whether to activate (true) or deactivate (false) the animation.
* `class` (*string*): The animation class name to toggle.

**Returns**

*None*

**Realm**

Server.


---

### PerformAnimation

**Purpose**

Performs a specific animation on a player with optional automatic deactivation after a delay.

**When Called**

This function is called when:
- Players use animation commands or interactions
- Timed animations need to be executed
- Animation sequences are triggered programmatically
- Roleplay actions require specific poses

**Parameters**

* `client` (*Player*): The player entity to perform the animation on.
* `name` (*string*): The name of the animation to perform.
* `offDelay` (*number*): Optional delay in seconds before automatically deactivating the animation.

**Returns**

*None*

**Realm**

Server.


---

## Rules

- Only document functions from the `lia.animations` namespace.
- Always follow the structure exactly as shown.
- Always write in clear, concise English.
- Always generate **full Markdown pages** ready to be placed in documentation.
- Always format code cleanly and consistently.
- Always save documentation files as `lia.animations.md`.
- Never omit any of the sections (Purpose, When Called, Parameters, Returns, Realm).
- Never include comments in code unless they clarify the example's intent.
- Never document hooks, enums, or config variables unless they are explicitly part of the `lia.animations` namespace.
