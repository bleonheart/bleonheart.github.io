# Daily Rewards Library

Daily rewards system with 20 objectives (walking, chatting, playtime, money, interactions, jobs, building, vehicles, arrests, healing, property, lockpicking, paychecks, ads, emergencies, XP, voting, crimes, spending, sprinting) and escalating streak bonuses at 14/30/60/90 days.

---

### lia.dailyrewards.checkObjectiveProgress

#### 📋 Purpose
Check if a player's objective progress meets the completion threshold.

#### ⏰ When Called
When tracking player progress towards daily objectives.

#### ⚙️ Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `ply` | **Player** | The player to check |
| `objective_type` | **string** | The objective type ID |
| `progress` | **number** | Current progress value |

#### ↩️ Returns
nil

#### 🌐 Realm
Server

---

### lia.dailyrewards.getDailyObjectives

#### 📋 Purpose
Get a random selection of daily objectives for players.

#### ⏰ When Called
When generating daily objectives for a player.

#### ⚙️ Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `count` | **number\|nil** | Number of objectives to return (defaults to 3) |

#### ↩️ Returns
*table* - Table of objective definitions

#### 🌐 Realm
Shared

---

### lia.dailyrewards.getPlayerData

#### 📋 Purpose
Get daily rewards data for a player by SteamID.

#### ⏰ When Called
When retrieving player daily rewards information.

#### ⚙️ Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `steamid` | **string** | Player's SteamID |

#### ↩️ Returns
*Promise* - Resolves to player data table with streak_count, total_claims, etc.

#### 🌐 Realm
Server

---

### lia.dailyrewards.getPlayerObjectives

#### 📋 Purpose
Get completed objectives for a player on a specific date.

#### ⏰ When Called
When retrieving player objective completion history.

#### ⚙️ Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `steamid` | **string** | Player's SteamID |
| `date` | **string** | Date string in YYYY-MM-DD format |

#### ↩️ Returns
*Promise* - Resolves to table of completed objectives

#### 🌐 Realm
Server

---

### lia.dailyrewards.getStreakReward

#### 📋 Purpose
Calculate the reward amount for a given streak count.

#### ⏰ When Called
When determining daily reward amount based on streak.

#### ⚙️ Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `streak` | **number** | Current streak count |

#### ↩️ Returns
*number* - Reward amount in currency

#### 🌐 Realm
Shared

---

### lia.dailyrewards.markObjectiveComplete

#### 📋 Purpose
Mark an objective as completed for a player.

#### ⏰ When Called
When a player completes a daily objective.

#### ⚙️ Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `steamid` | **string** | Player's SteamID |
| `objective_id` | **string** | The objective ID to mark complete |

#### ↩️ Returns
*Promise* - Database operation promise

#### 🌐 Realm
Server

---

### lia.dailyrewards.sendUpdate

#### 📋 Purpose
Send daily rewards UI update to a player.

#### ⏰ When Called
When updating the player's daily rewards interface.

#### ⚙️ Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `ply` | **Player** | The player to send update to |

#### ↩️ Returns
nil

#### 🌐 Realm
Server

---

### lia.dailyrewards.updatePlayerData

#### 📋 Purpose
Update daily rewards data for a player.

#### ⏰ When Called
When modifying player daily rewards information.

#### ⚙️ Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `steamid` | **string** | Player's SteamID |
| `data` | **table** | Data table to update |

#### ↩️ Returns
*Promise* - Database operation promise

#### 🌐 Realm
Server

---