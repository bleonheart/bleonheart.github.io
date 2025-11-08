# Configuration

Comprehensive documentation for all blackmarket system configurations in the Blackmarket NPC submodule.

---

## Overview

This file contains detailed documentation for every configuration setting in the Blackmarket NPC submodule. The blackmarket system allows players to import illegal items through NPCs, with configurable locations, cooldowns, and item availability based on faction.

---

## Basic Settings

### ImportTime

- **Description**: Time in seconds required to import an item (0 = instant)
- **Type**: Integer
- **Default**: 0
- **Purpose**: Controls how long players must wait for imported items to arrive

---

### DespawnTime

- **Description**: Time in seconds before imported items despawn if not collected
- **Type**: Integer
- **Default**: 1800 (30 minutes)
- **Purpose**: Prevents imported items from accumulating indefinitely

---

### ImportingCooldown

- **Description**: Global cooldown in seconds between any imports for a player
- **Type**: Integer
- **Default**: 600 (10 minutes)
- **Purpose**: Prevents players from importing items too frequently

---

### randomPosition

- **Description**: Whether imported items spawn at random positions within drop locations
- **Type**: Boolean
- **Default**: false
- **Purpose**: When true, items spawn at random positions. When false, items spawn at exact drop location coordinates.

---

### locationChangeTime

- **Description**: Time in seconds before blackmarket NPC locations change (if location rotation is enabled)
- **Type**: Integer
- **Default**: 5
- **Purpose**: Controls how often NPC locations rotate (if rotation system is implemented)

---

## Locations Configuration

The `lia.blackmarket.Locations` table defines blackmarket NPC spawn locations and item drop locations organized by map.

### Location Properties

```lua
lia.blackmarket.Locations = {
    ["map_name"] = {
        DropLocations = {
            ["Location Name"] = Vector(x, y, z)
            -- OR for multiple positions:
            ["Location Name"] = {Vector(x1, y1, z1), Vector(x2, y2, z2)}
        },
        NPCLocations = {
            ["Location Name"] = {
                pos = Vector(x, y, z),
                ang = Angle(pitch, yaw, roll)
            }
        }
    }
}
```

### Available Locations

#### gm_construct Map
- **Drop Locations**: 
  - Top Of Building
  - Water (multiple positions)
- **NPC Locations**: 5 locations (Alley by the Warehouse, Behind Old Office, Rooftop Stairs, Construction Pipes, Canal Underpass)

#### rp_nycity_day Map
- **Drop Locations**: 
  - Road
- **NPC Locations**: 5 locations (Location 1-5)

#### rp_vandor_v1 Map
- **Drop Locations**: None configured
- **NPC Locations**: 3 locations (Lake, Base, Tents)

---

## Importable Items Configuration

The `lia.blackmarket.ImportableItems` table defines items that can be imported, organized by faction. Each faction has different available items.

### Item Properties

```lua
lia.blackmarket.ImportableItems = {
    [FACTION_ID] = {
        ["item_id"] = {
            price = 100,
            category = "Category Name",
            MaxShipping = 1,
            cooldown = 300
        }
    }
}
```

### Available Items (FACTION_CITIZEN)

- **handcuffs**: $5, Handcuffs category, 300s cooldown
- **lvs_wheeldrive_dodspaehwagen**: $100, Vehicle category, 300s cooldown
- **manhack_welder**: $75, Weapon category, 300s cooldown
- **weapon_flechettegun**: $150, Weapon category, 300s cooldown
- **weapon_frag**: $200, Weapon category, 300s cooldown
- **large**: $50, Utility category, 300s cooldown
- **check_green**: $75, Item category, 300s cooldown
- **check_purple**: $75, Item category, 300s cooldown
- **check_base**: $75, Item category, 300s cooldown
- **universalammo3**: $100, Ammunition category, 300s cooldown
- **universalammo5**: $150, Ammunition category, 300s cooldown
- **universalammo6**: $150, Ammunition category, 300s cooldown
- **universalammo4**: $120, Ammunition category, 300s cooldown
