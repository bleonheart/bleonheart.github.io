# Configuration

Comprehensive documentation for all gathering system configurations in the Gathering module.

---

## Overview

This file contains detailed documentation for every configuration setting in the Gathering module. The gathering system allows players to collect resources from various sources in the world, including trees, rocks, and fishing spots.

---

## Gathering Entities

The `lia.gathering.GatheringEnts` table defines all objects in the world that players can gather resources from. Each entity has properties that control how it behaves and what resources it provides.

### Entity Properties

#### Tree (`tree`)
- **Name**: "Tree"
- **Model**: `models/props_foliage/tree_pine_01.mdl`
- **Health**: 100
- **Items Before Cooldown**: 3
- **Cooldown Time**: 300 seconds (5 minutes)
- **Resources**:
  - Spruce (2-5, 100% chance)
  - Stick (1-3, 95% chance)
  - Tree Sap (0-1, 85% chance)

#### Rock (`rock`)
- **Name**: "Rock"
- **Model**: `models/props_debris/wood_board02a.mdl`
- **Items Before Cooldown**: 3
- **Cooldown Time**: 300 seconds (5 minutes)
- **Resources**:
  - Rock (2-5, 100% chance)
  - Iron Ore (1-3, 90% chance)
  - Gold Ore (0-1, 75% chance)
  - Silver Ore (0-2, 80% chance)
  - Coal (1-4, 85% chance)

#### Fishing Spot (`fishing_spot`)
- **Name**: "Fishing Spot"
- **Model**: `models/props/cs_militia/fishriver01.mdl`
- **Health**: 100
- **Items Before Cooldown**: 5
- **Cooldown Time**: 60 seconds (1 minute)
- **Resources**:
  - Lake Trout (1-2, 45% chance)
  - Bass (1-2, 35% chance)
  - Catfish (1-1, 25% chance)
  - Perch (1-3, 20% chance)
  - Old Boot (1-1, 10% chance)
  - Trash (1-2, 15% chance)

---

## Fishing Rewards System

The `lia.gathering.FishingRewards` table defines the fishing reward system with separate categories for fish and trash.

### Fishing Properties

#### Fish Category (`fish`)
Contains all fish types that can be caught:

- **Lake Trout** (`laketrout`)
  - Chance: 50%
  - Max Quantity: 10
  - Model: `models/props/cs_militia/fishriver01.mdl`

- **Bass** (`bass`)
  - Chance: 40%
  - Max Quantity: 8
  - Model: `models/props/cs_militia/fishriver01.mdl`

- **Catfish** (`catfish`)
  - Chance: 30%
  - Max Quantity: 6
  - Model: `models/props/cs_militia/fishriver01.mdl`

- **Perch** (`perch`)
  - Chance: 25%
  - Max Quantity: 15
  - Model: `models/props/cs_militia/fishriver01.mdl`

- **Old Boot** (`boot`)
  - Chance: 15%
  - Max Quantity: 1
  - Model: `models/props_junk/shoe001a.mdl`

#### Trash Category (`trash`)
- **Chance**: 10%
- **Max Quantity**: 5
- **Model**: `models/props_junk/shoe001a.mdl`

### Overall Fishing Chances

- **Trash**: 10% chance
- **Fish**: 90% chance (then individual fish chances apply)

---

## Gathering Items

The `lia.gathering.items` table defines all items that can be obtained through gathering or used in the gathering process.

### Tools

#### Fishing Pole (`fishing_pole`)
- **Name**: "Fishing Pole"
- **Description**: "A pole with a line and a reel attached to it."
- **Model**: `models/oldprops/fishing_rod.mdl`
- **Max Quantity**: 1
- **Purpose**: Required tool for fishing at fishing spots

#### Fishing Bait (`fishing_bait`)
- **Name**: "Fishing Bait"
- **Description**: "A small box containing bait for fishing."
- **Model**: `models/props_lab/box01a.mdl`
- **Max Quantity**: 50
- **Purpose**: Consumable item used when fishing

### Resources

#### Wood Resources
- **Spruce** (`spruce`): Max quantity 100
- **Stick** (`stick`): Max quantity 50
- **Wood** (`wood`): Max quantity 100

#### Ore Resources
- **Iron Ore** (`iron_ore`): Max quantity 80
- **Gold Ore** (`gold_ore`): Max quantity 20
- **Silver Ore** (`silver_ore`): Max quantity 30
- **Coal** (`coal`): Max quantity 40
- **Rock** (`rock`): Max quantity 60

#### Other Resources
- **Tree Sap** (`sap`): Max quantity 25
- **Iron Ingot** (`iron_ingot`): Max quantity 50 (refined from iron ore)

### Fish Items
- **Lake Trout** (`laketrout`): Max quantity 10
- **Bass** (`bass`): Max quantity 8
- **Catfish** (`catfish`): Max quantity 6
- **Perch** (`perch`): Max quantity 15
- **Old Boot** (`boot`): Max quantity 1
- **Trash** (`trash`): Max quantity 5

### Crafted Items
- **Iron Sword** (`iron_sword`): Max quantity 1 (crafted item, not directly gathered)


