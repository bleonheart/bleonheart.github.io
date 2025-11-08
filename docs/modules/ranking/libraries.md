# Libraries

Player ranking and leaderboard system with configurable categories and competitive mechanics

---

### lia.ranking.canDemote

#### 📋 Purpose
Check if a player can demote another player.

#### ⏰ When Called
Before allowing a demotion action.

#### ⚙️ Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `client` | **Player** | The player attempting to demote |
| `target` | **Player** | The target player |

#### ↩️ Returns
*boolean* - True if demotion is allowed

#### 🌐 Realm
Shared

---

### lia.ranking.canHire

#### 📋 Purpose
Check if a player can hire another player.

#### ⏰ When Called
Before allowing a hire action.

#### ⚙️ Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `client` | **Player** | The player attempting to hire |
| `target` | **Player** | The target player |

#### ↩️ Returns
*boolean* - True if hiring is allowed

#### 🌐 Realm
Shared

---

### lia.ranking.canKick

#### 📋 Purpose
Check if a player can kick another player from their faction/class.

#### ⏰ When Called
Before allowing a kick action.

#### ⚙️ Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `client` | **Player** | The player attempting to kick |
| `target` | **Player** | The target player |

#### ↩️ Returns
*boolean* - True if kicking is allowed

#### 🌐 Realm
Shared

---

### lia.ranking.canPromote

#### 📋 Purpose
Check if a player can promote another player.

#### ⏰ When Called
Before allowing a promotion action.

#### ⚙️ Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `client` | **Player** | The player attempting to promote |
| `target` | **Player** | The target player |

#### ↩️ Returns
*boolean* - True if promotion is allowed

#### 🌐 Realm
Shared

---

### lia.ranking.demotePlayer

#### 📋 Purpose
Demote a player to the previous rank tier.

#### ⏰ When Called
When demoting a player to a lower rank.

#### ⚙️ Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `client` | **Player** | The player performing the demotion |
| `target` | **Player** | The player being demoted |

#### ↩️ Returns
*boolean* - True if demotion was successful

#### 🌐 Realm
Server

---

### lia.ranking.getRankTable

#### 📋 Purpose
Get the rank table for a player's class.

#### ⏰ When Called
When retrieving rank information for a player's class.

#### ⚙️ Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `client` | **Player** | The player to check |

#### ↩️ Returns
*table\|nil* - Rank table for the player's class or nil

#### 🌐 Realm
Shared

---

### lia.ranking.hirePlayer

#### 📋 Purpose
Hire a player to the lowest rank tier of their class.

#### ⏰ When Called
When hiring a player to a faction/class.

#### ⚙️ Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `client` | **Player** | The player performing the hire |
| `target` | **Player** | The player being hired |

#### ↩️ Returns
*boolean* - True if hiring was successful

#### 🌐 Realm
Server

---

### lia.ranking.kickPlayer

#### 📋 Purpose
Kick a player from their faction/class, resetting them to default class.

#### ⏰ When Called
When removing a player from a faction/class.

#### ⚙️ Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `client` | **Player** | The player performing the kick |
| `target` | **Player** | The player being kicked |

#### ↩️ Returns
*boolean* - True if kick was successful

#### 🌐 Realm
Server

---

### lia.ranking.promotePlayer

#### 📋 Purpose
Promote a player to the next rank tier.

#### ⏰ When Called
When promoting a player to a higher rank.

#### ⚙️ Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `client` | **Player** | The player performing the promotion |
| `target` | **Player** | The player being promoted |

#### ↩️ Returns
*boolean* - True if promotion was successful

#### 🌐 Realm
Server

---

### lia.ranking.setRank

#### 📋 Purpose
Set a player's rank directly.

#### ⏰ When Called
When setting a player's rank programmatically.

#### ⚙️ Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `client` | **Player** | The player whose rank to set |
| `rank` | **string** | The rank key to set |

#### ↩️ Returns
nil

#### 🌐 Realm
Server

---