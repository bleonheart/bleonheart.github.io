# Configuration

Comprehensive documentation for all looting system configurations in the Looting module.

---

## Overview

This file contains detailed documentation for every configuration setting in the Looting module. The looting system allows players to search containers and props in the world to find items, with various difficulty levels and security systems.

---

## Lootable Props Configuration

The `MODULE.LootableProps` table defines all containers and props that players can loot. Each prop has properties controlling difficulty, rewards, and security features.

### Prop Structure

## Prop Properties

Each lootable prop contains the following configuration options:

### Basic Properties

- **name**: Display name shown to players
- **model**: 3D model path for the prop
- **chance**: Percentage chance (0-100) that the prop contains loot
- **chanceTime**: Time in seconds between chance checks
- **spawnChance**: Percentage chance (0-100) that the prop spawns in the world

### Skill Requirements

- **strength**: Minimum strength attribute required
- **luck**: Minimum luck attribute required
- **luckChance**: Percentage chance that luck helps bypass requirements
- **intelligenceLock**: Whether intelligence is required to unlock (for safes)

### Interaction Properties

- **openingSound**: Sound file played when prop is opened
- **forceAnimation**: Whether player must perform an animation to open
- **lockDuration**: Time in seconds the prop stays locked after being opened

### Alarm System

- **enabled**: Whether alarm system is active
- **detectionChance**: Percentage chance alarm triggers when opened
- **alarmSound**: Sound file played when alarm triggers
- **lightEffect**: Whether visual light effect appears
- **npcSpawn**: Whether NPCs spawn when alarm triggers

### Item Tables

Items are organized by rarity tiers with different drop chances:
- **Common**: Most common items, highest chance
- **Uncommon**: Less common items, medium chance
- **Rare**: Rare items, lower chance
- **Legendary**: Very rare items, very low chance
- **Unique**: Extremely rare items, minimal chance

---

## Available Lootable Props

### Cardboard Box (`loot_cardboard_box`)
- **Name**: "Cardboard Box"
- **Model**: `models/props_junk/cardboard_box001a.mdl`
- **Loot Chance**: 5%
- **Chance Time**: 15 seconds
- **Spawn Chance**: 100%
- **Skill Requirements**: None (strength 0, luck 0)
- **Force Animation**: No
- **Intelligence Lock**: No
- **Lock Duration**: 300 seconds (5 minutes)
- **Alarm System**: Disabled
- **Opening Sound**: `doors/door_metal_thin_open1.wav`

---

### Wooden Crate (`loot_wooden_crate`)
- **Name**: "Wooden Crate"
- **Model**: `models/props_junk/wood_crate001a.mdl`
- **Loot Chance**: 10%
- **Chance Time**: 20 seconds
- **Spawn Chance**: 100%
- **Skill Requirements**: None
- **Force Animation**: No
- **Intelligence Lock**: No
- **Lock Duration**: 300 seconds
- **Alarm System**: Disabled
- **Opening Sound**: `doors/door_wood_open1.wav`

---

### Metal Barrel (`loot_metal_barrel`)
- **Name**: "Metal Barrel"
- **Model**: `models/props_c17/oildrum001.mdl`
- **Loot Chance**: 15%
- **Chance Time**: 30 seconds
- **Spawn Chance**: 100%
- **Skill Requirements**: None
- **Force Animation**: No
- **Intelligence Lock**: No
- **Lock Duration**: 300 seconds
- **Alarm System**: Disabled
- **Opening Sound**: `doors/door_metal_thick_open1.wav`

---

### Forced Locker (`loot_forced_locker`)
- **Name**: "Forced Locker"
- **Model**: `models/props_c17/lockers001a.mdl`
- **Loot Chance**: 20%
- **Chance Time**: 45 seconds
- **Spawn Chance**: 85%
- **Skill Requirements**: 
  - Strength: 5
  - Luck: 5
  - Luck Chance: 30%
- **Force Animation**: Yes (player must force open)
- **Intelligence Lock**: No
- **Lock Duration**: 300 seconds
- **Alarm System**: 
  - Enabled: Yes
  - Detection Chance: 15%
  - Light Effect: Yes
  - NPC Spawn: No

---

### Intelligence Safe (`loot_intelligence_safe`)
- **Name**: "Intelligence Safe"
- **Model**: `models/props_c17/FurnitureSafe001a.mdl`
- **Loot Chance**: 25%
- **Chance Time**: 60 seconds
- **Spawn Chance**: 70%
- **Skill Requirements**: None (uses intelligence instead)
- **Force Animation**: No
- **Intelligence Lock**: Yes (requires intelligence to unlock)
- **Lock Duration**: 600 seconds (10 minutes)
- **Alarm System**: 
  - Enabled: Yes
  - Detection Chance: 25%
  - Light Effect: Yes
  - NPC Spawn: Yes (NPCs spawn when alarm triggers)

---

### Rarity Tier Properties

#### Common (70% chance)
- Most common items
- Basic supplies and common equipment
- Examples: `universalammo`, `universalammo2`, `universalammo3`, `universalammo4`

#### Uncommon (20% chance)
- Less common items
- Better equipment
- Examples: `universalammo5`

#### Rare (8-12% chance)
- Rare items
- Valuable equipment
- Examples: `universalammo6`

#### Legendary (2-3% chance)
- Very rare items
- High-value equipment
- Examples: `universalammo7`

#### Unique (0-2% chance)
- Extremely rare items
- Special or unique equipment
- Examples: `item_suit`


