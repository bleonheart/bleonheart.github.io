# Hooks

Hooks provided by the Police Suite module for law enforcement systems.

---

Overview

The Police Suite module provides comprehensive law enforcement systems including police mechanics, arrest systems, evidence management, and legal procedures. It includes advanced law enforcement simulation and management. The module provides extensive hook support for customizing police mechanics, arrest procedures, evidence systems, and legal procedures.

---

### AllWarrantsCleared

#### 📋 Purpose
Called when all warrants are cleared for a character.

#### ⏰ When Called
After all warrants are removed from a character's record.

#### ⚙️ Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `character` | **Character** | The character whose warrants were cleared |
| `warranter` | **Player** | The player who cleared the warrants |

#### ↩️ Returns
nil

#### 🌐 Realm
Server

---

### PlayerArrested

#### 📋 Purpose
Called when a player is arrested and jailed.

#### ⏰ When Called
After a player is successfully arrested and jailed.

#### ⚙️ Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `target` | **Player** | The player who was arrested |
| `officer` | **Player** | The officer who made the arrest |
| `jailedState` | **boolean** | Whether the player is currently jailed |

#### ↩️ Returns
nil

#### 🌐 Realm
Server

---

### PlayerOverStunCleared

#### 📋 Purpose
Called when a player's over-stun effect is cleared.

#### ⏰ When Called
After the over-stun timer expires and the player can move again.

#### ⚙️ Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `player` | **Player** | The player whose over-stun was cleared |
| `weapon` | **Weapon** | The stun gun weapon that caused the stun |

#### ↩️ Returns
nil

#### 🌐 Realm
Server

---

### PlayerOverStunned

#### 📋 Purpose
Called when a player is over-stunned by a nightstick.

#### ⏰ When Called
After a player receives an over-stun effect from a nightstick hit.

#### ⚙️ Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `player` | **Player** | The player who was over-stunned |
| `weapon` | **Weapon** | The stun gun weapon that caused the stun |

#### ↩️ Returns
nil

#### 🌐 Realm
Server

---

### PlayerReleasedFromJail

#### 📋 Purpose
Called when a player is released from jail.

#### ⏰ When Called
After a player is released from jail.

#### ⚙️ Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `target` | **Player** | The player who was released |
| `releaser` | **Player** | The player who released them (can be nil) |
| `reason` | **string** | The reason for release |

#### ↩️ Returns
nil

#### 🌐 Realm
Server

---

### PlayerStunCleared

#### 📋 Purpose
Called when a player's stun effect is cleared.

#### ⏰ When Called
After the stun timer expires and the player can move again.

#### ⚙️ Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `player` | **Player** | The player whose stun was cleared |
| `weapon` | **Weapon** | The stun gun weapon that caused the stun |

#### ↩️ Returns
nil

#### 🌐 Realm
Server

---

### PlayerStunned

#### 📋 Purpose
Called when a player is stunned by a stun gun.

#### ⏰ When Called
After a player receives a stun effect from a stun gun.

#### ⚙️ Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `player` | **Player** | The player who was stunned |
| `weapon` | **Weapon** | The stun gun weapon that caused the stun |

#### ↩️ Returns
nil

#### 🌐 Realm
Server

---

### StunGunFired

#### 📋 Purpose
Called when a stun gun is fired.

#### ⏰ When Called
After a stun gun successfully fires at a target.

#### ⚙️ Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `owner` | **Player** | The player who fired the stun gun |
| `target` | **Entity** | The target entity that was hit |

#### ↩️ Returns
nil

#### 🌐 Realm
Server

---

### StunGunLaserToggled

#### 📋 Purpose
Called when a stun gun's laser sight is toggled.

#### ⏰ When Called
After the laser sight is turned on or off.

#### ⚙️ Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `owner` | **Player** | The player who toggled the laser |
| `laserState` | **boolean** | Whether the laser is now on |
| `weapon` | **Weapon** | The stun gun weapon |

#### ↩️ Returns
nil

#### 🌐 Realm
Server

---

### StunGunReloaded

#### 📋 Purpose
Called when a stun gun is reloaded.

#### ⏰ When Called
After a stun gun finishes reloading.

#### ⚙️ Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `owner` | **Player** | The player who reloaded the stun gun |
| `weapon` | **Weapon** | The stun gun weapon |

#### ↩️ Returns
nil

#### 🌐 Realm
Server

---

### StunGunTethered

#### 📋 Purpose
Called when a stun gun tethers to a target.

#### ⏰ When Called
After a stun gun successfully tethers to a target entity.

#### ⚙️ Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `owner` | **Player** | The player who fired the stun gun |
| `target` | **Entity** | The target entity that was tethered |

#### ↩️ Returns
nil

#### 🌐 Realm
Server

---

### WarrantIssued

#### 📋 Purpose
Called when a warrant is issued for a character.

#### ⏰ When Called
After a warrant is successfully added to a character's record.

#### ⚙️ Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `character` | **Character** | The character the warrant was issued for |
| `warranter` | **Player** | The player who issued the warrant |
| `warrant` | **table** | The warrant data table |

#### ↩️ Returns
nil

#### 🌐 Realm
Server

---

### WarrantRemoved

#### 📋 Purpose
Called when a warrant is removed from a character.

#### ⏰ When Called
After a warrant is successfully removed from a character's record.

#### ⚙️ Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `character` | **Character** | The character whose warrant was removed |
| `warranter` | **Player** | The player who removed the warrant |
| `warrantID` | **number** | The ID of the removed warrant |

#### ↩️ Returns
nil

#### 🌐 Realm
Server

---