# Achievements Module Configuration

Comprehensive documentation for all achievement system configurations in the Achievements module.

---

## Overview

This file contains detailed documentation for every configuration setting in the Achievements module. The achievement system allows players to earn achievements by completing various objectives, with rewards for successful completion.

---

## Achievements Table

The `MODULE.Achievements` table defines all available achievements that players can earn. Each achievement has objectives, requirements, and rewards.

### How Achievements Work

Achievements track player progress toward specific goals. When players complete the required objectives, they receive the achievement and its associated reward. Achievements can track kills, deaths, item pickups, playtime, or multiple objectives.

### Achievement Structure

Each achievement contains:
- **name**: Display name shown to players
- **description**: Explanation of what the achievement requires
- **requirement**: Target number that must be reached
- **reward**: What players receive upon completion
- **type**: Type of objective (kill, death, item_pickup, playtime, multi_objective)
- **entity**: What entity/entities count toward the achievement (for kill types)

---

## Achievement Types

### Kill Type (`kill`)

Tracks kills of specific entities. Players must kill the required number of entities to complete the achievement.

**Example Structure**:
```lua
["achievement_id"] = {
    name = "Achievement Name",
    description = "Kill X entities",
    requirement = 10,
    reward = "Reward description",
    type = "kill",
    entity = "npc_zombie"  -- Single entity
    -- OR
    entity = {              -- Multiple entities
        ["npc_fastzombie"] = true,
        ["player"] = true
    }
}
```

### Death Type (`death`)

Tracks player deaths. Players must die the required number of times to complete the achievement.

**Example Structure**:
```lua
["achievement_id"] = {
    name = "Achievement Name",
    description = "Die X times",
    requirement = 1,
    reward = "Reward description",
    type = "death"
}
```

### Item Pickup Type (`item_pickup`)

Tracks items picked up by players. Players must pick up the required number of items to complete the achievement.

**Example Structure**:
```lua
["achievement_id"] = {
    name = "Achievement Name",
    description = "Pick up X items",
    requirement = 10,
    reward = "Reward description",
    type = "item_pickup"
}
```

### Playtime Type (`playtime`)

Tracks how long players have been playing. Players must play for the required number of seconds to complete the achievement.

**Example Structure**:
```lua
["achievement_id"] = {
    name = "Achievement Name",
    description = "Play for X time",
    requirement = 3600,  -- Seconds (1 hour)
    reward = "Reward description",
    type = "playtime"
}
```

### Multi-Objective Type (`multi_objective`)

Requires players to complete multiple different objectives. All objectives must be completed to earn the achievement.

**Example Structure**:
```lua
["achievement_id"] = {
    name = "Achievement Name",
    description = "Complete all objectives",
    reward = "Reward description",
    type = "multi_objective",
    objectives = {
        {
            id = "objective_id",
            name = "Objective Name",
            description = "Objective description",
            requirement = 25,
            type = "kill",
            entity = "npc_zombie"
        },
        -- More objectives...
    }
}
```

---

## Available Achievements

### Zombie Slayer (`zombie_slayer`)
- **Type**: Kill
- **Requirement**: Kill 10 Zombies
- **Entity**: `npc_zombie`
- **Reward**: "Unlocks zombie slayer gear"

---

### Mixed Hunter (`mixed_hunter`)
- **Type**: Kill
- **Requirement**: Kill 10 Fast Zombies or Players
- **Entity**: `npc_fastzombie` or `player`
- **Reward**: "Unlocks mixed hunter perk"

---

### Player Killer (`player_killer`)
- **Type**: Kill
- **Requirement**: Kill 5 Players
- **Entity**: `player`
- **Reward**: "Unlocks the 'Player Killer' badge"

---

### First Blood (`first_death`)
- **Type**: Death
- **Requirement**: Die once
- **Reward**: "Earns the 'First Blood' badge"

---

### Item Collector (`item_collector`)
- **Type**: Item Pickup
- **Requirement**: Pick up 10 items
- **Reward**: "Unlocks item collector perk"

---

### Veteran (`veteran`)
- **Type**: Playtime
- **Requirement**: Play for 1 hour (3600 seconds)
- **Reward**: "Unlocks veteran status"

---

### Survivor (`survivor`)
- **Type**: Multi-Objective
- **Reward**: "Unlocks survivor title and gear"
- **Objectives**:
  1. **Zombie Slayer**: Kill 25 Zombies
  2. **Resilient**: Die 5 times
  3. **Dedicated**: Play for 2 hours (7200 seconds)

---

### Master Hunter (`master_hunter`)
- **Type**: Multi-Objective
- **Reward**: "Unlocks master hunter gear and abilities"
- **Objectives**:
  1. **Player Hunter**: Kill 10 Players
  2. **Zombie Hunter**: Kill 15 Zombies (fast zombies, regular zombies, or headcrabs)
  3. **Collector**: Pick up 20 items


