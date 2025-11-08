# ID System Library

ID card system allowing players to show/request/force view IDs with multiple designs (California, German, Miami, New York, NYPD, Southside, Yorkshire) and character recognition mechanics.

---

### lia.identifications.generateDescription

#### 📋 Purpose
Generate a character description from description generator data.

#### ⏰ When Called
When you need to convert description generator data into a formatted text description.

#### ⚙️ Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `t` | **table** | Table containing description generator fields (ethnicity, eye_color, hair_color, background, height_cm, weight) |

#### ↩️ Returns
*string* - Generated description text

#### 🌐 Realm
Shared

---

### lia.identifications.getBackgroundBonus

#### 📋 Purpose
Get the background bonus data for a character based on their background.

#### ⏰ When Called
When you need to retrieve bonus information for a character's background.

#### ⚙️ Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `character` | **Character** | The character to check |

#### ↩️ Returns
*table\|nil* - Background bonus table with name, description, and bonus properties, or nil if no bonus

#### 🌐 Realm
Shared

---