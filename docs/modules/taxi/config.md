# Taxi NPC Submodule Configuration

Comprehensive documentation for all taxi system configurations in the Taxi NPC submodule.

---

## Overview

This file contains detailed documentation for every configuration setting in the Taxi NPC submodule. The taxi system allows players to use taxi services to travel between locations, with configurable drop-off points and taxi spawn locations.

---

## Auto Taxi Configuration

### AutoTaxi

- **Description**: Whether automatic taxi options are enabled
- **Type**: Boolean
- **Default**: true
- **Category**: Jobs
- **Purpose**: When enabled, players can use the "Grab a taxi" option at taxi NPCs. When disabled, this option is hidden.

---

## Drop Locations Configuration

The `MODULE.DropLocation` table defines locations where taxi passengers can be dropped off. Each location is map-specific and has a price.

### Drop Location Properties

```lua
MODULE.DropLocation = {
    ["map_name"] = {
        ["Location Name"] = {
            pos = Vector(x, y, z),
            price = 25
        }
    }
}
```

### Available Drop Locations (rp_nycity_day)

- **Downtown**: Price $25
- **Car Dealership**: Price $30
- **Gun Shop**: Price $50
- **Town Hall**: Price $25

---

## Taxi Locations Configuration

The `MODULE.TaxiLocations` table defines where taxi vehicles can spawn. Each location is map-specific and contains multiple spawn positions.

### Taxi Location Structure

```lua
MODULE.TaxiLocations = {
    ["map_name"] = {
        ["Location Name"] = {
            Vector(x1, y1, z1),
            Vector(x2, y2, z2),
            -- More positions...
        }
    }
}
```

### Available Taxi Locations (rp_nycity_day)

- **Downtown**: 4 spawn positions
- **Car Dealership**: 7 spawn positions
- **Gun Shop**: 8 spawn positions
- **Town Hall**: 6 spawn positions


