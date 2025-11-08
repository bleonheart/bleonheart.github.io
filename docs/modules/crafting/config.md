# Configuration

Comprehensive documentation for all crafting system configurations in the Crafting module.

---

## Overview

This file contains detailed documentation for every configuration setting in the Crafting module. The crafting system allows players to create items by combining materials at specific crafting stations like forges and workbenches.

---

## Crafting Stations

The `MODULE.CraftingStations` table defines all available crafting stations where players can create items. Each station has a name and model that appears in the world.

### Station Properties

#### Forge (`forge`)
- **Name**: "Forge"
- **Model**: `models/props_c17/FurnitureStove001a.mdl`
- **Purpose**: Used for smelting ores and crafting metal items

#### Workbench (`workbench`)
- **Name**: "Workbench"
- **Model**: `models/props_c17/FurnitureTable001a.mdl`
- **Purpose**: Used for crafting wooden items and basic tools

---

## Crafting Recipes

The `MODULE.CraftingRecipes` table organizes all recipes by their required crafting station. Each recipe defines what materials are needed, what is produced, and how long crafting takes.

### Recipe Properties

```lua
recipeID = {
    name = "Display Name",
    requirements = {
        itemID = quantity,
        anotherItem = quantity
    },
    output = {
        itemID = quantity,           -- Fixed quantity
        itemID = {min, max}          -- Random quantity range
    },
    craftTime = 10,                  -- Seconds
    requiresKnowledge = false         -- true/false
}
```

### Forge Recipes

#### Iron Ingot (`iron_ingot`)
- **Name**: "Iron Ingot"
- **Requirements**: 
  - Iron Ore: 1
- **Output**: 
  - Iron Ingot: 1
- **Craft Time**: 10 seconds
- **Requires Knowledge**: No

#### Iron Sword (`iron_sword`)
- **Name**: "Iron Sword"
- **Requirements**: 
  - Iron Ingot: 2
  - Wood: 1
- **Output**: 
  - Iron Sword: 1
- **Craft Time**: 15 seconds
- **Requires Knowledge**: No

### Workbench Recipes

#### Wood Plank (`wood_plank`)
- **Name**: "Wood Plank"
- **Requirements**: 
  - Log: 1
- **Output**: 
  - Wood Plank: 2-4 (random)
- **Craft Time**: 3 seconds
- **Requires Knowledge**: No

#### Campfire (`campfire`)
- **Name**: "Campfire"
- **Requirements**: 
  - Wood Plank: 4
  - Stone: 2
- **Output**: 
  - Campfire: 1
- **Craft Time**: 4 seconds
- **Requires Knowledge**: No

---

## Advanced Recipe Features

### Random Output Quantities

Some recipes produce variable amounts of items. Use a table with two numbers `{min, max}` to create random output:

```lua
output = {
    wood_plank = {2, 4}  -- Produces 2, 3, or 4 wood planks randomly
}
```

### Knowledge Requirements

When `requiresKnowledge` is set to `true`, players must learn the recipe before they can craft it. The system automatically creates a recipe book item that teaches the recipe when used.


