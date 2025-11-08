# Libraries

Roleplay NPC framework with dialogue trees, quest systems, and submodule support (mechanics, taxis, vendors, fences) with centralized NPC management and customization tools.

---

### lia.cardealer.carIsOut

#### 📋 Purpose
Check if a player has a vehicle currently spawned.

#### ⏰ When Called
When checking vehicle spawn status.

#### ⚙️ Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `ply` | **Player** | The player to check |

#### ↩️ Returns
*boolean, Entity\|nil* - True if vehicle is out, and the vehicle entity

#### 🌐 Realm
Client/Server

---

### lia.cardealer.checkSpawnArea

#### 📋 Purpose
Check if a garage spawn area is clear.

#### ⏰ When Called
When validating vehicle spawn locations.

#### ⚙️ Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `garageData` | **table** | Garage data table with pos and ang |

#### ↩️ Returns
*boolean* - True if spawn area is clear

#### 🌐 Realm
Shared

---

### lia.cardealer.createCustomizationPreview

#### 📋 Purpose
Create a vehicle customization preview window.

#### ⏰ When Called
When previewing vehicle customizations.

#### ⚙️ Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `carID` | **string** | Vehicle class ID |

#### ↩️ Returns
nil

#### 🌐 Realm
Client

---

### lia.cardealer.createGarageEntry

#### 📋 Purpose
Create a garage entry in the database.

#### ⏰ When Called
When registering a new garage.

#### ⚙️ Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `client` | **Player** | The player creating the garage |
| `garageEntity` | **Entity** | The garage entity |

#### ↩️ Returns
nil

#### 🌐 Realm
Server

---

### lia.cardealer.createMechanicUI

#### 📋 Purpose
Open the mechanic UI for vehicle repairs and customization.

#### ⏰ When Called
When accessing mechanic services.

#### ⚙️ Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `client` | **Player** | The player accessing mechanic UI |
| `carID` | **string** | Vehicle class ID |

#### ↩️ Returns
nil

#### 🌐 Realm
Client/Server

---

### lia.cardealer.createModelOverlay

#### 📋 Purpose
Create a model preview overlay for vehicles.

#### ⏰ When Called
When previewing vehicle models.

#### ⚙️ Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `modelPath` | **string** | Model path to preview |
| `carID` | **string** | Vehicle class ID |

#### ↩️ Returns
nil

#### 🌐 Realm
Client

---

### lia.cardealer.getNearestGarage

#### 📋 Purpose
Get the nearest garage to a player.

#### ⏰ When Called
When finding nearby garages.

#### ⚙️ Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `ply` | **Player** | The player to check from |

#### ↩️ Returns
*table\|nil* - Nearest garage data or nil

#### 🌐 Realm
Shared

---

### lia.cardealer.getNearestGarageFromDB

#### 📋 Purpose
Get the nearest garage from the database.

#### ⏰ When Called
When retrieving garage data from database.

#### ⚙️ Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `ply` | **Player** | The player to check from |
| `callback` | **function** | Callback function receiving garage data |

#### ↩️ Returns
nil

#### 🌐 Realm
Server

---

### lia.cardealer.getOwnedCars

#### 📋 Purpose
Get all cars owned by a player.

#### ⏰ When Called
When retrieving player's vehicle list.

#### ⚙️ Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `ply` | **Player** | The player to check |

#### ↩️ Returns
*table* - Table of owned vehicles

#### 🌐 Realm
Shared

---

### lia.cardealer.getVehicleModel

#### 📋 Purpose
Get the model path for a vehicle class.

#### ⏰ When Called
When retrieving vehicle model information.

#### ⚙️ Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `vehicleClass` | **string** | Vehicle class ID |

#### ↩️ Returns
*string\|nil* - Model path or nil

#### 🌐 Realm
Shared

---

### lia.cardealer.openGarageUI

#### 📋 Purpose
Open the garage management UI.

#### ⏰ When Called
When accessing garage management.

#### ⚙️ Parameters
None

#### ↩️ Returns
nil

#### 🌐 Realm
Client

---

### lia.cardealer.optionsGetOwnedCars

#### 📋 Purpose
Get owned cars formatted as options table.

#### ⏰ When Called
When generating vehicle option lists.

#### ⚙️ Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `ply` | **Player** | The player to get cars for |

#### ↩️ Returns
*table* - Table of vehicle options

#### 🌐 Realm
Client

---

### lia.cardealer.populateGarageUI

#### 📋 Purpose
Populate the garage UI with garage data.

#### ⏰ When Called
When updating garage UI display.

#### ⚙️ Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `garages` | **table** | Table of garage data |

#### ↩️ Returns
nil

#### 🌐 Realm
Client

---

### lia.cardealer.purchaseAlarm

#### 📋 Purpose
Purchase an alarm for a vehicle.

#### ⏰ When Called
When buying vehicle alarm.

#### ⚙️ Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `client` | **Player** | The player purchasing |

#### ↩️ Returns
nil

#### 🌐 Realm
Server

---

### lia.cardealer.purchaseInsurance

#### 📋 Purpose
Purchase insurance for a vehicle.

#### ⏰ When Called
When buying vehicle insurance.

#### ⚙️ Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `client` | **Player** | The player purchasing |

#### ↩️ Returns
nil

#### 🌐 Realm
Server

---

### lia.cardealer.repairVehicle

#### 📋 Purpose
Repair the currently driven vehicle.

#### ⏰ When Called
When repairing a vehicle.

#### ⚙️ Parameters
None

#### ↩️ Returns
nil

#### 🌐 Realm
Client

---

### lia.cardealer.repairVehicleByID

#### 📋 Purpose
Repair a specific vehicle by ID.

#### ⏰ When Called
When repairing a vehicle by ID.

#### ⚙️ Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `client` | **Player** | The player repairing (server) |
| `carID` | **string** | Vehicle class ID (client) |

#### ↩️ Returns
nil

#### 🌐 Realm
Client/Server

---

### lia.cardealer.requestVehiclesData

#### 📋 Purpose
Request vehicle data from server.

#### ⏰ When Called
When loading vehicle information.

#### ⚙️ Parameters
None

#### ↩️ Returns
nil

#### 🌐 Realm
Client

---

### lia.cardealer.returnVehicle

#### 📋 Purpose
Return a vehicle to the garage.

#### ⏰ When Called
When returning a vehicle.

#### ⚙️ Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `client` | **Player** | The player returning (server) |
| `ply` | **Player** | The player returning (client) |

#### ↩️ Returns
nil

#### 🌐 Realm
Client/Server

---

### lia.cardealer.spawnVehicle

#### 📋 Purpose
Spawn a vehicle for a player.

#### ⏰ When Called
When spawning a vehicle from garage.

#### ⚙️ Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `client` | **Player** | The player spawning |

#### ↩️ Returns
nil

#### 🌐 Realm
Server

---

### lia.cardealer.vehicleList

#### 📋 Purpose
Open the vehicle list/purchase interface.

#### ⏰ When Called
When viewing available vehicles.

#### ⚙️ Parameters
None

#### ↩️ Returns
nil

#### 🌐 Realm
Client

---

### lia.dialog.getNPCData

#### 📋 Purpose
Get NPC data by unique ID.

#### ⏰ When Called
When retrieving NPC information.

#### ⚙️ Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `npcID` | **string** | NPC unique ID |

#### ↩️ Returns
*table\|nil* - NPC data table or nil

#### 🌐 Realm
Client/Server

---

### lia.dialog.getOriginalNPCData

#### 📋 Purpose
Get original NPC data before filtering.

#### ⏰ When Called
When retrieving unfiltered NPC data.

#### ⚙️ Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `npcID` | **string** | NPC unique ID |

#### ↩️ Returns
*table\|nil* - Original NPC data or nil

#### 🌐 Realm
Server

---

### lia.dialog.openCustomizationUI

#### 📋 Purpose
Open the NPC customization interface.

#### ⏰ When Called
When customizing an NPC.

#### ⚙️ Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `npc` | **Entity** | The NPC entity to customize |

#### ↩️ Returns
nil

#### 🌐 Realm
Client

---

### lia.dialog.openDialog

#### 📋 Purpose
Open the NPC dialog interface.

#### ⏰ When Called
When interacting with an NPC.

#### ⚙️ Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `client` | **Player** | The player opening dialog |
| `npc` | **Entity** | The NPC entity |
| `npcID` | **string** | NPC unique ID |

#### ↩️ Returns
nil

#### 🌐 Realm
Server

---

### lia.dialog.registerNPC

#### 📋 Purpose
Register an NPC with dialog data.

#### ⏰ When Called
When registering NPC definitions.

#### ⚙️ Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `uniqueID` | **string** | Unique NPC identifier |
| `data` | **table** | NPC data table with Conversation, PrintName, etc. |

#### ↩️ Returns
*boolean* - True if registration was successful

#### 🌐 Realm
Server

---

### lia.dialog.syncToClients

#### 📋 Purpose
Sync NPC dialog data to clients.

#### ⏰ When Called
When updating NPC data or on player join.

#### ⚙️ Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `client` | **Player\|nil** | Specific client to sync to (nil for all) |

#### ↩️ Returns
nil

#### 🌐 Realm
Server

---

### lia.marketplace.adminChangeItemValue

#### 📋 Purpose
Admin function to change an item's marketplace value.

#### ⏰ When Called
When an admin modifies item pricing.

#### ⚙️ Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `admin` | **Player** | The admin performing the action |
| `itemID` | **string** | Marketplace item ID |
| `newValue` | **number** | New price value |

#### ↩️ Returns
nil

#### 🌐 Realm
Server

---

### lia.marketplace.adminRemoveItem

#### 📋 Purpose
Admin function to remove an item from marketplace.

#### ⏰ When Called
When an admin removes a listing.

#### ⚙️ Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `admin` | **Player** | The admin performing the action |
| `itemID` | **string** | Marketplace item ID |

#### ↩️ Returns
nil

#### 🌐 Realm
Server

---

### lia.marketplace.buyItem

#### 📋 Purpose
Purchase an item from the marketplace.

#### ⏰ When Called
When a player buys a marketplace item.

#### ⚙️ Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `objBuyer` | **Player** | The player buying |
| `strItem_ID` | **string** | Marketplace item ID |

#### ↩️ Returns
nil

#### 🌐 Realm
Server

---

### lia.marketplace.getCharListings

#### 📋 Purpose
Get all marketplace listings for a character.

#### ⏰ When Called
When retrieving character's listings.

#### ⚙️ Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `strChar_ID` | **string\|number** | Character ID |
| `callback` | **function** | Callback function receiving listings |

#### ↩️ Returns
nil

#### 🌐 Realm
Server

---

### lia.marketplace.getListingInfo

#### 📋 Purpose
Get detailed information about a marketplace listing.

#### ⏰ When Called
When retrieving listing details.

#### ⚙️ Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `_` | **any** | Unused parameter |
| `strItem_ID` | **string** | Marketplace item ID |
| `callback` | **function** | Callback function receiving listing info |

#### ↩️ Returns
nil

#### 🌐 Realm
Server

---

### lia.marketplace.getListings

#### 📋 Purpose
Get all marketplace listings.

#### ⏰ When Called
When loading marketplace data.

#### ⚙️ Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `callback` | **function** | Callback function receiving all listings |

#### ↩️ Returns
nil

#### 🌐 Realm
Server

---

### lia.marketplace.listItem

#### 📋 Purpose
List an item on the marketplace.

#### ⏰ When Called
When a player lists an item for sale.

#### ⚙️ Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `objOwner` | **Player** | The player listing |
| `numItem_ID` | **number** | Item ID to list |
| `numPrice` | **number** | Listing price |

#### ↩️ Returns
nil

#### 🌐 Realm
Server

---

### lia.marketplace.openAdminMenu

#### 📋 Purpose
Open the marketplace admin menu.

#### ⏰ When Called
When an admin accesses marketplace management.

#### ⚙️ Parameters
None

#### ↩️ Returns
nil

#### 🌐 Realm
Client

---

### lia.marketplace.openMarketplace

#### 📋 Purpose
Open the marketplace interface for a player.

#### ⏰ When Called
When accessing the marketplace.

#### ⚙️ Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `objPly` | **Player** | The player opening marketplace |

#### ↩️ Returns
nil

#### 🌐 Realm
Server

---

### lia.marketplace.openValueChangeDialog

#### 📋 Purpose
Open dialog for changing item value.

#### ⏰ When Called
When modifying item pricing.

#### ⚙️ Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `listingData` | **table** | Listing data table |

#### ↩️ Returns
nil

#### 🌐 Realm
Client

---

### lia.marketplace.receivePage

#### 📋 Purpose
Receive and send marketplace page data to a player.

#### ⏰ When Called
When loading marketplace pages.

#### ⚙️ Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `objPly` | **Player** | The player receiving the page |

#### ↩️ Returns
nil

#### 🌐 Realm
Server

---

### lia.marketplace.showListMenu

#### 📋 Purpose
Show the item listing menu for a player.

#### ⏰ When Called
When listing items on marketplace.

#### ⚙️ Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `ply` | **Player** | The player listing items |

#### ↩️ Returns
nil

#### 🌐 Realm
Server

---

### lia.marketplace.unlistItem

#### 📋 Purpose
Remove an item from the marketplace.

#### ⏰ When Called
When unlisting an item.

#### ⚙️ Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `objOwner` | **Player** | The player unlisting |
| `strItem_ID` | **string** | Marketplace item ID |

#### ↩️ Returns
nil

#### 🌐 Realm
Server

---