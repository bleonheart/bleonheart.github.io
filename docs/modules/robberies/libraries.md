# Libraries

Store robbery system with jewelry cases and cash registers, stealable items (cash, jewelry, watches, rings), police requirements, and respawn timers

---

### lia.robberies.canRob

#### 📋 Purpose
Check if a player can rob a specific entity.

#### ⏰ When Called
Before allowing a robbery attempt on an entity.

#### ⚙️ Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `ply` | **Player** | The player attempting to rob |
| `ent` | **Entity** | The entity being robbed |

#### ↩️ Returns
*boolean* - True if the player can rob the entity

#### 🌐 Realm
Server

---

### lia.robberies.robberyReward

#### 📋 Purpose
Give rewards to a player after successfully robbing an entity.

#### ⏰ When Called
After a successful robbery is completed.

#### ⚙️ Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `ply` | **Player** | The player receiving the reward |
| `ent` | **Entity** | The entity that was robbed |

#### ↩️ Returns
nil

#### 🌐 Realm
Server

---