# Libraries

Terrorism mechanics with vehicle car bombs (engine-activated) and door explosives, both with timed detonation, remote detonation, and debris creation

---

### lia.terrorism.armWithManualDetonator

#### 📋 Purpose
Arm a vehicle or door with a bomb that requires manual detonation via detonator.

#### ⏰ When Called
When a player arms a bomb with manual detonation.

#### ⚙️ Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `client` | **Player** | The player arming the bomb |
| `item` | **Item** | The bomb item being used |

#### ↩️ Returns
*boolean* - True if arming was successful

#### 🌐 Realm
Server

---

### lia.terrorism.armWithTimer

#### 📋 Purpose
Arm a vehicle or door with a timed bomb.

#### ⏰ When Called
When a player arms a bomb with a timer.

#### ⚙️ Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `client` | **Player** | The player arming the bomb |
| `item` | **Item** | The bomb item being used |
| `time` | **number** | Fuse time in seconds |

#### ↩️ Returns
*boolean* - True if arming was successful

#### 🌐 Realm
Server

---

### lia.terrorism.disarmBomb

#### 📋 Purpose
Disarm a bomb attached to a vehicle, door, or world bomb entity.

#### ⏰ When Called
When a player disarms a bomb.

#### ⚙️ Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `client` | **Player** | The player disarming |
| `target` | **Entity** | The target entity or bomb entity |

#### ↩️ Returns
*boolean* - True if disarming was successful

#### 🌐 Realm
Server

---

### lia.terrorism.disarmPlantedBomb

#### 📋 Purpose
Disarm a planted bomb entity and return it to inventory.

#### ⏰ When Called
When disarming a planted bomb.

#### ⚙️ Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `bombEnt` | **Entity** | The planted bomb entity |
| `disarmer` | **Player\|nil** | The player disarming |

#### ↩️ Returns
*boolean* - True if disarming was successful

#### 🌐 Realm
Server

---

### lia.terrorism.explodeDoor

#### 📋 Purpose
Explode a door, destroying it temporarily.

#### ⏰ When Called
When a door bomb detonates.

#### ⚙️ Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `door` | **Entity** | The door entity to explode |

#### ↩️ Returns
nil

#### 🌐 Realm
Server

---

### lia.terrorism.explodePlantedBomb

#### 📋 Purpose
Explode a planted bomb entity.

#### ⏰ When Called
When a planted bomb's timer expires or is manually detonated.

#### ⚙️ Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `bombEnt` | **Entity** | The planted bomb entity |

#### ↩️ Returns
nil

#### 🌐 Realm
Server

---

### lia.terrorism.explodeVehicle

#### 📋 Purpose
Explode a vehicle, creating debris and killing nearby players.

#### ⏰ When Called
When a vehicle bomb detonates.

#### ⚙️ Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `vehicle` | **Entity** | The vehicle entity to explode |

#### ↩️ Returns
nil

#### 🌐 Realm
Server

---

### lia.terrorism.explodeWorldBomb

#### 📋 Purpose
Explode a world-placed bomb, causing area damage.

#### ⏰ When Called
When a world bomb detonates.

#### ⚙️ Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `bombEnt` | **Entity** | The world bomb entity |

#### ↩️ Returns
nil

#### 🌐 Realm
Server

---

### lia.terrorism.getBombsByOwner

#### 📋 Purpose
Get all bombs planted by a specific player.

#### ⏰ When Called
When retrieving bombs owned by a player.

#### ⚙️ Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `owner` | **Player** | The player who owns the bombs |

#### ↩️ Returns
*table* - Table of bomb data

#### 🌐 Realm
Server

---

### lia.terrorism.getPlantedBombs

#### 📋 Purpose
Get all currently planted bombs.

#### ⏰ When Called
When retrieving all active bombs.

#### ⚙️ Parameters
None

#### ↩️ Returns
*table* - Table of all planted bomb data

#### 🌐 Realm
Server

---

### lia.terrorism.placeWorldBombDetonator

#### 📋 Purpose
Place a world bomb that requires manual detonation.

#### ⏰ When Called
When a player places a world bomb with detonator.

#### ⚙️ Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `client` | **Player** | The player placing the bomb |
| `item` | **Item** | The bomb item being used |

#### ↩️ Returns
*boolean* - True if placement was successful

#### 🌐 Realm
Server

---

### lia.terrorism.placeWorldBombTimer

#### 📋 Purpose
Place a world bomb with a timer.

#### ⏰ When Called
When a player places a timed world bomb.

#### ⚙️ Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `client` | **Player** | The player placing the bomb |
| `item` | **Item** | The bomb item being used |
| `time` | **number** | Fuse time in seconds |

#### ↩️ Returns
*boolean* - True if placement was successful

#### 🌐 Realm
Server

---

### lia.terrorism.registerBomb

#### 📋 Purpose
Register a bomb entity in the terrorism system.

#### ⏰ When Called
When a bomb is created and needs to be tracked.

#### ⚙️ Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `bombEnt` | **Entity** | The bomb entity |
| `bombType` | **string** | Type of bomb ("door", "vehicle", "world") |
| `target` | **Entity\|nil** | Target entity (door/vehicle) |
| `owner` | **Player\|nil** | Player who planted the bomb |
| `fuseTime` | **number** | Fuse time in seconds (0 for manual) |

#### ↩️ Returns
*boolean* - True if registration was successful

#### 🌐 Realm
Server

---

### lia.terrorism.setupPlantedBomb

#### 📋 Purpose
Set up a planted bomb entity with all necessary data and timers.

#### ⏰ When Called
When initializing a planted bomb.

#### ⚙️ Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `bombEnt` | **Entity** | The bomb entity |
| `bombType` | **string** | Type of bomb |
| `target` | **Entity\|nil** | Target entity |
| `owner` | **Player\|nil** | Owner player |
| `fuseTime` | **number** | Fuse time in seconds |

#### ↩️ Returns
*boolean* - True if setup was successful

#### 🌐 Realm
Server

---

### lia.terrorism.unregisterBomb

#### 📋 Purpose
Unregister a bomb from the terrorism system.

#### ⏰ When Called
When a bomb is removed or disarmed.

#### ⚙️ Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `bombEnt` | **Entity** | The bomb entity to unregister |

#### ↩️ Returns
*boolean* - True if unregistration was successful

#### 🌐 Realm
Server

---