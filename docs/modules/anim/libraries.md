# Animations Library

Roleplay animations (/act commands) including surrender, salute, cross arms, attention, typing poses, and combat stances that interrupt on movement

---

### lia.animations.applyAnimation

#### 📋 Purpose
Apply bone manipulation animation to a client based on animation class.

#### ⏰ When Called
When you need to apply bone angle manipulations for an animation class.

#### ⚙️ Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `client` | **Player** | The player to apply animation to |
| `value` | **number** | Animation value (typically 1 for on, 0 for off) |
| `class` | **string** | Animation class name from AnimationsTable |

#### ↩️ Returns
nil

#### 🌐 Realm
Server

---

### lia.animations.getBoneTable

#### 📋 Purpose
Extract bone angle table from an animation definition.

#### ⏰ When Called
When you need to get a clean bone table from an animation definition.

#### ⚙️ Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `animationDef` | **table** | Animation definition table with bone names and angles |

#### ↩️ Returns
*table* - Table mapping bone names to angles

#### 🌐 Realm
Server

---

### lia.animations.performAnimation

#### 📋 Purpose
Perform an animation on a client with optional auto-deactivation.

#### ⏰ When Called
When you want to play an animation that may auto-deactivate after a delay.

#### ⚙️ Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `client` | **Player** | The player to animate |
| `name` | **string** | Animation name/class |
| `offDelay` | **number\|nil** | Optional delay in seconds before auto-deactivating |

#### ↩️ Returns
nil

#### 🌐 Realm
Server

---

### lia.animations.resetBones

#### 📋 Purpose
Reset bone angles to zero for specified bones.

#### ⏰ When Called
When you need to clear bone manipulations for a client.

#### ⚙️ Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `client` | **Player** | The player whose bones to reset |
| `boneTable` | **table\|nil** | Table of bone names to reset (nil resets all) |

#### ↩️ Returns
nil

#### 🌐 Realm
Server

---

### lia.animations.toggleAnimation

#### 📋 Purpose
Toggle an animation on or off for a client.

#### ⏰ When Called
When you need to activate or deactivate an animation.

#### ⚙️ Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `client` | **Player** | The player to toggle animation for |
| `active` | **boolean** | Whether to activate (true) or deactivate (false) |
| `class` | **string** | Animation class name |

#### ↩️ Returns
nil

#### 🌐 Realm
Server

---

### lia.animations.velocityIsHigher

#### 📋 Purpose
Check if a client's velocity exceeds a threshold.

#### ⏰ When Called
When checking if a player is moving fast enough to interrupt animations.

#### ⚙️ Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `client` | **Player** | The player to check |
| `threshold` | **number\|nil** | Velocity threshold (defaults to 0.1) |

#### ↩️ Returns
*boolean* - True if velocity exceeds threshold

#### 🌐 Realm
Server

---