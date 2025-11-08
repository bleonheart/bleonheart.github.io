# Robberies Module Configuration

Comprehensive documentation for all robbery system configurations in the Robberies module.

---

## Overview

This file contains detailed documentation for every configuration setting in the Robberies module. The robbery system allows players to rob various objects in the world (like cash registers and jewelry cases) to obtain valuable items, with police requirements and respawn timers.

---

## Robbery Items Configuration

The `lia.robberies.Items` table defines all items that can be obtained from robberies. Each item has properties controlling its value and appearance.

### Item Properties

## Available Robbery Items

### Bundle of Cash (`cash_bundle`)
- **Name**: "Bundle of Cash"
- **Description**: "A bundle of cash that gives you a random amount between 0 and 500."
- **Model**: `models/props/cs_assault/money.mdl`
- **Inventory Size**: 1x1 slots
- **Reward Min**: 0
- **Reward Max**: 500
- **Reward Range**: $0 - $500
- **Purpose**: Basic cash reward from robberies

---

### Jewelry Bag (`jewelrybag`)
- **Name**: "Jewelry Bag"
- **Description**: "A bag containing valuable jewelry."
- **Model**: `models/props_c17/briefcase001a.mdl`
- **Inventory Size**: 1x1 slots
- **Reward Min**: 100
- **Reward Max**: 300
- **Reward Range**: $100 - $300
- **Purpose**: Medium-value jewelry reward

---

### Gold Watch (`gold_watch`)
- **Name**: "Gold Watch"
- **Description**: "A valuable gold watch."
- **Model**: `models/props_c17/clock01.mdl`
- **Inventory Size**: 1x1 slots
- **Reward Min**: 50
- **Reward Max**: 150
- **Reward Range**: $50 - $150
- **Purpose**: Small valuable item reward

---

### Diamond Ring (`diamond_ring`)
- **Name**: "Diamond Ring"
- **Description**: "A precious diamond ring."
- **Model**: `models/props_junk/cardboard_box004a_gib01.mdl`
- **Inventory Size**: 1x1 slots
- **Reward Min**: 200
- **Reward Max**: 500
- **Reward Range**: $200 - $500
- **Purpose**: High-value jewelry reward

---

## Robbing Table Configuration

The `lia.robberies.RobbingTable` table defines all objects that can be robbed. Each object has properties controlling difficulty, rewards, and respawn behavior.

### Object Properties

Each robbing object contains:
- **name**: Display name shown to players
- **model**: 3D model path for the object
- **respawnTimer**: Time in seconds before object can be robbed again
- **robbingTimer**: Time in seconds required to complete the robbery
- **minPolice**: Minimum number of police officers that must be online
- **stealable**: Table of items that can be stolen with their chances

### Stealable Item Properties

Each stealable item entry contains:
- **item**: Item ID that can be stolen
- **name**: Display name of the item
- **chance**: Percentage chance (0-100) that this item is stolen

## Available Robbing Objects

### Jewelry Case (`jewelry_case`)
- **Name**: "Jewelry Case"
- **Model**: `models/props_c17/briefcase001a.mdl`
- **Robbing Timer**: 5 seconds
- **Respawn Timer**: 1800 seconds (30 minutes)
- **Minimum Police**: 2 officers online required
- **Stealable Items**:
  - Jewelry Bag: 50% chance
  - Gold Watch: 30% chance
  - Diamond Ring: 20% chance

---

### Cash Register (`cash_register`)
- **Name**: "Cash Register"
- **Model**: `models/props_c17/cashregister01a.mdl`
- **Robbing Timer**: 5 seconds
- **Respawn Timer**: 900 seconds (15 minutes)
- **Minimum Police**: 1 officer online required
- **Stealable Items**:
  - Bundle of Cash: 100% chance (always drops)

---

## Blacklisted Factions

The `lia.robberies.BlackListedFactions` table defines factions that cannot perform robberies. By default, this table is empty, meaning all factions can rob.

### Blacklist Properties


