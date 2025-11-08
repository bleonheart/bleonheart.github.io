# Armor Library

Armor system allowing players to equip armor sets that provide protection, modify movement speed, and change appearance

---

### lia.armors.equipArmor

#### 📋 Purpose
Equip an armor item on a player.

#### ⏰ When Called
When you need to equip armor on a player programmatically.

#### ⚙️ Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `ply` | **Player** | The player to equip armor on |
| `armor` | **string\|number\|Item** | Armor uniqueID, item ID, or item instance |

#### ↩️ Returns
*boolean* - True if armor was equipped successfully

#### 🌐 Realm
Server

---

### lia.armors.getEquippedArmorData

#### 📋 Purpose
Get data about a player's equipped armor.

#### ⏰ When Called
When you need to retrieve information about currently equipped armor.

#### ⚙️ Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `ply` | **Player** | The player to check |
| `armor` | **string\|number\|nil** | Optional armor uniqueID or item ID to check (nil checks currently equipped) |

#### ↩️ Returns
*table\|nil* - Armor data table with properties like name, resistance, speedBoost, etc., or nil if no armor equipped

#### 🌐 Realm
Shared

---

### lia.armors.unequipArmor

#### 📋 Purpose
Unequip an armor item from a player.

#### ⏰ When Called
When you need to remove armor from a player programmatically.

#### ⚙️ Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `ply` | **Player** | The player to unequip armor from |
| `armor` | **string\|number\|Item** | Armor uniqueID, item ID, or item instance |

#### ↩️ Returns
*boolean* - True if armor was unequipped successfully

#### 🌐 Realm
Server

---

