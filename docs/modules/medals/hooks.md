# Hooks

Hooks provided by the Medals module for achievement and recognition systems.

---

Overview

The Medals module provides achievement and recognition systems with various medal types, earning criteria, and display systems. It includes comprehensive achievement tracking and reward systems. The module provides extensive hook support for customizing medal criteria, earning mechanics, display systems, and achievement tracking.

---

### CanGiveMedal

#### 📋 Purpose
Called to determine if a player can give medals to another player.

#### ⏰ When Called
Before a player attempts to give a medal to another player.

#### ⚙️ Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `client` | **Player** | The player attempting to give the medal |
| `target` | **Player** | The target player receiving the medal (optional) |

#### ↩️ Returns
*boolean, string* - Return false and optional reason string to prevent giving medals

#### 🌐 Realm
Server

---

### CanTakeMedal

#### 📋 Purpose
Called to determine if a player can take medals from another player.

#### ⏰ When Called
Before a player attempts to take a medal from another player.

#### ⚙️ Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `client` | **Player** | The player attempting to take the medal |
| `target` | **Player** | The target player losing the medal (optional) |

#### ↩️ Returns
*boolean, string* - Return false and optional reason string to prevent taking medals

#### 🌐 Realm
Server

---

### MedalsDataUpdated

#### 📋 Purpose
Called when medal data has been updated on the server.

#### ⏰ When Called
After medal data changes are synchronized to clients.

#### ⚙️ Parameters
None

#### ↩️ Returns
nil

#### 🌐 Realm
Client

---

### PlayerMedalsChanged

#### 📋 Purpose
Called when a player's medals have changed.

#### ⏰ When Called
After a player's medal data is modified.

#### ⚙️ Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `player` | **Player** | The player whose medals changed |
| `medals` | **table** | The updated medals data structure |

#### ↩️ Returns
nil

#### 🌐 Realm
Server

---