# Hooks

Hooks provided by the Tying module for player restraint systems.

---

Overview

The Tying module provides a player restraint system with ropes/cuffs, blindfolding, gagging, dragging, and body searching mechanics for hostage scenarios. It includes advanced restraint mechanics and roleplay integration. The module provides comprehensive hook support for customizing restraint behavior, validation, interaction mechanics, and roleplay scenarios.

---

### PlayerHandcuffed

#### 📋 Purpose
Called when a player is handcuffed.

#### ⏰ When Called
After handcuffs are applied to a player and all effects are set up.

#### ⚙️ Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `player` | **Player** | The player who was handcuffed |
| `cuffer` | **Player** | The player who applied the handcuffs (can be nil) |

#### ↩️ Returns
nil

#### 🌐 Realm
Server

---

### PlayerReleased

#### 📋 Purpose
Called when a player is released from handcuffs.

#### ⏰ When Called
After handcuffs are removed from a player and all effects are cleared.

#### ⚙️ Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `player` | **Player** | The player who was released |
| `cuffer` | **Player** | The player who removed the handcuffs (can be nil) |

#### ↩️ Returns
nil

#### 🌐 Realm
Server

---