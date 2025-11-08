# Libraries

Persistent medal award system displayed on character profiles with staff permissions for giving/taking medals and admin controls

---

### lia.medals.canGiveMedals

#### 📋 Purpose
Check if a player can give medals to others.

#### ⏰ When Called
When checking permissions for giving medals.

#### ⚙️ Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `client` | **Player** | The player to check |

#### ↩️ Returns
*boolean* - True if the player can give medals

#### 🌐 Realm
Server

---

### lia.medals.canTakeMedals

#### 📋 Purpose
Check if a player can take medals from others.

#### ⏰ When Called
When checking permissions for taking medals.

#### ⚙️ Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `client` | **Player** | The player to check |

#### ↩️ Returns
*boolean* - True if the player can take medals

#### 🌐 Realm
Server

---

### lia.medals.exists

#### 📋 Purpose
Check if a medal ID exists in any enabled medal pack.

#### ⏰ When Called
When validating medal IDs.

#### ⚙️ Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `id` | **string** | Medal ID to check |

#### ↩️ Returns
*boolean* - True if the medal exists

#### 🌐 Realm
Shared

---

### lia.medals.get

#### 📋 Purpose
Get medal data by ID from enabled medal packs.

#### ⏰ When Called
When retrieving medal information.

#### ⚙️ Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `id` | **string** | Medal ID to retrieve |

#### ↩️ Returns
*table\|nil* - Medal data table or nil if not found

#### 🌐 Realm
Shared

---

### lia.medals.getActiveMedalPacks

#### 📋 Purpose
Get all currently enabled medal packs.

#### ⏰ When Called
When retrieving active medal pack information.

#### ⚙️ Parameters
None

#### ↩️ Returns
*table* - Table of enabled medal packs

#### 🌐 Realm
Shared

---

### lia.medals.getAll

#### 📋 Purpose
Get all medals from enabled packs, optionally filtered by pack ID.

#### ⏰ When Called
When retrieving medal lists.

#### ⚙️ Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `packID` | **string\|nil** | Optional pack ID to filter by |

#### ↩️ Returns
*table* - Table of medal data

#### 🌐 Realm
Shared

---

### lia.medals.getCharacterMedals

#### 📋 Purpose
Get all medals for a character as a flat table.

#### ⏰ When Called
When retrieving a character's medal collection.

#### ⚙️ Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `char` | **Character** | The character to check |

#### ↩️ Returns
*table* - Table mapping medal IDs to states

#### 🌐 Realm
Shared

---

### lia.medals.getCharacterMedalsFromPack

#### 📋 Purpose
Get medals for a character from a specific pack.

#### ⏰ When Called
When retrieving medals from a specific pack for a character.

#### ⚙️ Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `char` | **Character** | The character to check |
| `packID` | **string** | The pack ID to retrieve from |

#### ↩️ Returns
*table* - Table of medals from the pack

#### 🌐 Realm
Shared

---

### lia.medals.getPackID

#### 📋 Purpose
Get the pack ID that contains a specific medal.

#### ⏰ When Called
When determining which pack a medal belongs to.

#### ⚙️ Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `medalID` | **string** | The medal ID to look up |

#### ↩️ Returns
*string\|nil* - Pack ID or nil if not found

#### 🌐 Realm
Shared

---