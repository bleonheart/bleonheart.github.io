# Hooks

Hooks provided by the Corpses & Looting module for corpse interaction systems.

---

Overview

The Corpses & Looting module provides a corpse looting system allowing players to search dead bodies, transfer items and money, with configurable search distance and anti-spam protection. It includes advanced looting mechanics and inventory integration. The module provides comprehensive hook support for customizing looting behavior, item transfer, search mechanics, and anti-abuse measures.

---

### CorpseInventorySet

#### 📋 Purpose
Called when a corpse's inventory has been created and set up.

#### ⏰ When Called
After a corpse inventory is created and items are transferred from the victim.

#### ⚙️ Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `corpse` | **Entity** | The corpse entity |
| `inventory` | **Inventory** | The inventory instance attached to the corpse |

#### ↩️ Returns
nil

#### 🌐 Realm
Server

---

### OnCorpseCreated

#### 📋 Purpose
Called when a corpse is created from a dead player.

#### ⏰ When Called
After a corpse ragdoll is spawned and initialized from a dead player.

#### ⚙️ Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `corpse` | **Entity** | The corpse ragdoll entity |
| `victim` | **Player** | The player who died |
| `char` | **Character** | The character instance of the victim |

#### ↩️ Returns
nil

#### 🌐 Realm
Server

---