# Libraries

Player referral system allowing players to refer others and earn monetary rewards when referred players join, with configurable reward amounts and admin management tools.

---

### lia.referrals.checkPendingRewards

#### 📋 Purpose
Check and give pending referral rewards to a player.

#### ⏰ When Called
When a player loads their character to check for pending rewards.

#### ⚙️ Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `ply` | **Player** | The player to check |

#### ↩️ Returns
nil

#### 🌐 Realm
Server

---

### lia.referrals.getAllPlayers

#### 📋 Purpose
Get a list of all online players with their SteamID and names.

#### ⏰ When Called
When retrieving a list of available players for referrals.

#### ⚙️ Parameters
None

#### ↩️ Returns
*table* - Table of player data with steamid, name, and nick

#### 🌐 Realm
Server

---

### lia.referrals.getAvailableReferrers

#### 📋 Purpose
Get a list of players available to be referrers, excluding a specific SteamID.

#### ⏰ When Called
When generating a list of potential referrers.

#### ⚙️ Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `excludeSteamID` | **string\|nil** | SteamID to exclude from the list |

#### ↩️ Returns
*table* - Table of available referrer data

#### 🌐 Realm
Server

---

### lia.referrals.getPendingRewards

#### 📋 Purpose
Get all pending referral rewards.

#### ⏰ When Called
When retrieving the pending rewards table.

#### ⚙️ Parameters
None

#### ↩️ Returns
*table* - Table mapping SteamIDs to pending reward amounts

#### 🌐 Realm
Server

---

### lia.referrals.getPlayerData

#### 📋 Purpose
Get referral data for a player by SteamID.

#### ⏰ When Called
When retrieving player referral information.

#### ⚙️ Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `steamid` | **string** | Player's SteamID |

#### ↩️ Returns
*Promise* - Resolves to player referral data table

#### 🌐 Realm
Server

---

### lia.referrals.givePendingReward

#### 📋 Purpose
Give a pending referral reward to a player by SteamID.

#### ⏰ When Called
When manually giving a pending reward to a player.

#### ⚙️ Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `steamid` | **string** | Player's SteamID |

#### ↩️ Returns
*boolean, string* - Success status and message

#### 🌐 Realm
Server

---

### lia.referrals.giveReferralReward

#### 📋 Purpose
Give referral rewards to both the referee and referrer.

#### ⏰ When Called
After processing a successful referral.

#### ⚙️ Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `refereeSteamID` | **string** | SteamID of the player who was referred |
| `referrerSteamID` | **string** | SteamID of the player who made the referral |

#### ↩️ Returns
nil

#### 🌐 Realm
Server

---

### lia.referrals.processReferral

#### 📋 Purpose
Process a referral between two players.

#### ⏰ When Called
When a player refers another player.

#### ⚙️ Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `refereeSteamID` | **string** | SteamID of the player being referred |
| `referrerSteamID` | **string** | SteamID of the player making the referral |

#### ↩️ Returns
*Promise* - Resolves to success boolean and message string

#### 🌐 Realm
Server

---

### lia.referrals.updatePlayerData

#### 📋 Purpose
Update referral data for a player.

#### ⏰ When Called
When modifying player referral information.

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