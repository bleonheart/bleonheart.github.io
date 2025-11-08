# Libraries

Handheld radio voice chat system with frequency tuning, encrypted channels, faction access, static radios, and range-based communication

---

### lia.radio.canAccessEncryptedFrequency

#### 📋 Purpose
Check if a player can access an encrypted frequency based on their faction.

#### ⏰ When Called
When checking if a player can use an encrypted frequency.

#### ⚙️ Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `ply` | **Player** | The player to check |
| `frequency` | **string** | The frequency to check |

#### ↩️ Returns
*boolean* - True if the player can access the frequency

#### 🌐 Realm
Shared

---

### lia.radio.canAccessStaticalRadio

#### 📋 Purpose
Check if a player can access a static radio entity.

#### ⏰ When Called
When checking static radio access permissions.

#### ⚙️ Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `ply` | **Player** | The player to check |
| `radio` | **Entity** | The static radio entity |

#### ↩️ Returns
*boolean* - True if the player can access the radio

#### 🌐 Realm
Server

---

### lia.radio.checkEncryptedFrequencyStatus

#### 📋 Purpose
Check if a frequency is encrypted and if the player can access it.

#### ⏰ When Called
When determining encrypted frequency status for a player.

#### ⚙️ Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `ply` | **Player** | The player to check |
| `frequency` | **string** | The frequency to check |

#### ↩️ Returns
*boolean, boolean* - Is encrypted, can access

#### 🌐 Realm
Client

---

### lia.radio.getPresetName

#### 📋 Purpose
Get the preset name for a frequency if it matches a preset.

#### ⏰ When Called
When displaying frequency names in the UI.

#### ⚙️ Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `frequency` | **string** | The frequency to look up |

#### ↩️ Returns
*string\|nil* - Preset name or nil if not a preset

#### 🌐 Realm
Client

---

### lia.radio.isVoiceViable

#### 📋 Purpose
Check if a radio entity can be used for voice communication.

#### ⏰ When Called
When determining if a radio can transmit/receive on a frequency.

#### ⚙️ Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `ent` | **Entity** | The radio entity to check |
| `freq` | **string** | The frequency to check |
| `isHearing` | **boolean** | Whether checking for receiving (true) or transmitting (false) |
| `speaker` | **Player\|nil** | Optional speaker player for distance checks |

#### ↩️ Returns
*boolean* - True if the radio is viable for voice

#### 🌐 Realm
Shared

---

### lia.radio.openPresetFrequencyMenu

#### 📋 Purpose
Open the preset frequency selection menu for a player.

#### ⏰ When Called
When a player wants to select a preset frequency.

#### ⚙️ Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `client` | **Player** | The player to open the menu for |

#### ↩️ Returns
nil

#### 🌐 Realm
Client

---

### lia.radio.startStaticMonitoring

#### 📋 Purpose
Start monitoring for static sounds on encrypted frequencies.

#### ⏰ When Called
When a player equips a radio weapon.

#### ⚙️ Parameters
None

#### ↩️ Returns
nil

#### 🌐 Realm
Client

---

### lia.radio.stopStaticMonitoring

#### 📋 Purpose
Stop monitoring for static sounds.

#### ⏰ When Called
When a player unequips a radio weapon.

#### ⚙️ Parameters
None

#### ↩️ Returns
nil

#### 🌐 Realm
Client

---