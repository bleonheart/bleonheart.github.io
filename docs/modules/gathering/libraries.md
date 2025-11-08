# Libraries

Resource gathering from trees (spruce, sticks, sap) and rocks (iron/gold/silver ore, coal), fishing system with pole/bait and fish types (trout, bass, catfish, perch) plus junk, crafting materials (ingots, wood, swords), and stackable inventory management.

---

### lia.gathering.generateItems

#### 📋 Purpose
Generate item definitions for gathering system items.

#### ⏰ When Called
During module initialization to register gathering items.

#### ⚙️ Parameters
None

#### ↩️ Returns
nil

#### 🌐 Realm
Server

---

### lia.gathering.handleFishing

#### 📋 Purpose
Handle fishing interaction with a fishing spot entity.

#### ⏰ When Called
When a player interacts with a fishing spot entity.

#### ⚙️ Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `ply` | **Player** | The player fishing |
| `entity` | **Entity** | The fishing spot entity |

#### ↩️ Returns
nil

#### 🌐 Realm
Server

---

### lia.gathering.handleFishingPole

#### 📋 Purpose
Handle fishing using a fishing pole item.

#### ⏰ When Called
When a player uses a fishing pole item.

#### ⚙️ Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `ply` | **Player** | The player fishing |

#### ↩️ Returns
nil

#### 🌐 Realm
Server

---

### lia.gathering.handleReward

#### 📋 Purpose
Handle reward distribution when gathering from an entity.

#### ⏰ When Called
When a player successfully gathers from a gathering entity.

#### ⚙️ Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `ply` | **Player** | The player receiving the reward |
| `entity` | **Entity** | The gathering entity |

#### ↩️ Returns
nil

#### 🌐 Realm
Server

---