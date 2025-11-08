# Tying Library

Player restraint system with ropes/cuffs, blindfolding, gagging, dragging, and body searching mechanics for hostage scenarios

---

### lia.tying.searchPlayer

#### 📋 Purpose
Start searching a handcuffed player's inventory.

#### ⏰ When Called
When you want to allow a player to search another player's inventory while dragging them.

#### ⚙️ Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `client` | **Player** | The player performing the search |
| `target` | **Player** | The player being searched |

#### ↩️ Returns
*boolean* - True if search was started successfully

#### 🌐 Realm
Server

---

### lia.tying.stopSearching

#### 📋 Purpose
Stop searching a player's inventory.

#### ⏰ When Called
When you need to end a search operation.

#### ⚙️ Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `client` | **Player** | The player who was searching |

#### ↩️ Returns
nil

#### 🌐 Realm
Server

---