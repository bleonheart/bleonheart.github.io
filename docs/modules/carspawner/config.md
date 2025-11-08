# Car Spawner Module Configuration

Comprehensive documentation for all configuration settings in the Car Spawner module.

---

## Overview

This file contains detailed documentation for every configuration setting in the Car Spawner module. The car spawner system allows players to purchase and spawn themed vehicles through item crates.

---

## Module Configuration

### AvailableCars

- **Description**: Table defining all available vehicles that can be spawned through the car spawner system
- **Type**: Table
- **Default**: See example below
- **Purpose**: Defines vehicle spawner items that players can purchase and use to spawn vehicles
- **Usage**: Set in `module.lua` as `MODULE.AvailableCars = {...}`

#### Structure

Each entry in the table uses the vehicle's unique ID as the key and contains:

- **name** (*string*): Display name of the vehicle shown to players
- **description** (*string*): Description text explaining what the vehicle is
- **price** (*number*): Cost in money to purchase the vehicle spawner item

#### Example

```lua
MODULE.AvailableCars = {
    ["lvs_wheeldrive_dodspaehwagen"] = {
        name = "Dodge Paehwagen",
        description = "A powerful car that can be used for transportation.",
        price = 10000,
    },
}
```

#### Notes

- Each vehicle entry automatically creates a spawner item with the base class `base_vehiclespawner`
- The spawner item uses the model `models/props_junk/wood_crate001a.mdl` by default
- Items are automatically registered when modules are initialized
- The `carType` property is set to the unique ID for vehicle spawning logic

---

