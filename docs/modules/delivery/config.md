# Delivery NPC Submodule Configuration

Comprehensive documentation for all delivery system configurations in the Delivery NPC submodule.

---

## Overview

This file contains detailed documentation for every configuration setting in the Delivery NPC submodule. The delivery system allows players to accept delivery jobs, transport packages to locations, and earn money with optional time-sensitive bonuses.

---

## Default Time-Sensitive Configuration

The `MODULE.DefaultTimeSensitiveConfig` table defines default values for time-sensitive delivery bonuses when locations don't specify custom values.

### DefaultTimeSensitiveConfig Properties

- **BaseTimeLimit**: Default time limit in seconds (300 = 5 minutes)
- **TimeBonusMultiplier**: Multiplier applied to base pay for time bonuses (1.5 = 50% bonus)
- **MinTimeForBonus**: Minimum time remaining in seconds to qualify for bonus (60 = 1 minute)
- **TimeSensitiveBonus**: Default bonus amount added to base pay (5 currency units)

---

## Delivery NPC Locations Configuration

The `MODULE.DeliveryNPCLocations` table defines all delivery destinations organized by map. Each location has payment, position, and optional time-sensitive settings.

### Location Properties

```lua
MODULE.DeliveryNPCLocations = {
    ["map_name"] = {
        ["Location Name"] = {
            Position = Vector(x, y, z),
            Pay = 10,
            TimeSensitive = {  -- Optional
                TimeLimit = 240,
                TimeBonus = 8,
                MinTimeForBonus = 45
            }
        }
    }
}
```

### Time-Sensitive Delivery Properties

- **TimeLimit**: Maximum time in seconds to complete delivery for bonus
- **TimeBonus**: Additional currency added to base pay for fast delivery
- **MinTimeForBonus**: Minimum time remaining (in seconds) to qualify for bonus

### Available Delivery Locations (rp_nycity_day)

The system includes 15 delivery locations with varying pay rates and time-sensitive options:

- **Cinema**: Pay $10, Time limit 240s, Bonus $8
- **Hospital**: Pay $12, Time limit 180s, Bonus $12
- **Police Station**: Pay $15, Time limit 360s, Bonus $6
- **Fire Department**: Pay $13, Time limit 200s, Bonus $10
- **Supermarket**: Pay $11, Time limit 420s, Bonus $4
- **Bank**: Pay $14, Time limit 480s, Bonus $7
- **Apartments**: Pay $10, Time limit 360s, Bonus $5
- **Park**: Pay $9, Time limit 300s, Bonus $4
- **Docks**: Pay $16, Time limit 600s, Bonus $10
- **Warehouse**: Pay $15, Time limit 450s, Bonus $8
- **School**: Pay $12, Time limit 240s, Bonus $6
- **Gas Station**: Pay $10, Time limit 300s, Bonus $5
- **Mall**: Pay $13, Time limit 360s, Bonus $6
- **Hotel**: Pay $14, Time limit 420s, Bonus $7
- **Library**: Pay $11, Time limit 300s, Bonus $5

---

## Delivery Van Locations Configuration

The `MODULE.DeliveryVanLocations` table defines where delivery vans spawn for delivery drivers.

### Location Structure

```lua
MODULE.DeliveryVanLocations = {
    ["map_name"] = {
        ["Location Name"] = {Vector(x, y, z)}
    }
}
```

### Available Van Locations (rp_nycity_day)

- **Car Dealership**: Single spawn position



