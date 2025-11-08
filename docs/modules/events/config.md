# Events Module Configuration

Comprehensive documentation for all event system configurations in the Events module.

---

## Overview

This file contains detailed documentation for every configuration setting in the Events module. The events system allows automatic spawning of NPCs and notifications at configurable intervals to create dynamic server events.

---

## Event Interval Configuration

### EventInterval

- **Description**: Time interval in seconds between event executions
- **Type**: Integer
- **Default**: 300 (5 minutes)
- **Minimum**: 60 (1 minute)
- **Maximum**: 86400 (24 hours)
- **Category**: Salary
- **Purpose**: Controls how frequently events are triggered on the server

---

## Events Table

The `MODULE.EventsTable` table defines all available events organized by map. Each event specifies NPCs to spawn, spawn conditions, and notification callbacks.

### How Events Work

Events are map-specific and trigger automatically based on the `EventInterval` setting. When an event triggers:
1. The system checks if the event's spawn condition is met
2. If conditions are met, NPCs are spawned at specified locations
3. Notification callbacks are executed to inform players
4. The event completes and waits for the next interval

### Event Structure

Each event contains:
- **NPCs**: Table of NPC classes and their spawn positions
- **shouldSpawn**: Function that determines if the event should trigger
- **notificationCallback**: Function that sends notifications to players

### Map Organization

Events are organized by map name. Each map can have multiple events that trigger randomly or based on conditions.

---

## Available Events

### gm_construct Map Events

#### Nice Event (`Nice Event`)
- **NPCs**:
  - `npc_citizen`: Spawns at Vector(2601.42, -12033.11, -219.51)
  - `npc_combine_s`: Spawns at Vector(2601.42, -12033.11, -219.51)
- **Spawn Condition**: More than 2 players online
- **Notifications**: 
  - Staff members: "You got a staff notification"
  - Regular players: "You got a player notification"

#### Another Nice Event (`Another Nice Event`)
- **NPCs**:
  - `npc_citizen`: Spawns at Vector(2601.42, -12033.11, -219.51)
  - `npc_combine_s`: Spawns at Vector(2601.42, -12033.11, -219.51)
- **Spawn Condition**: More than 5 players online
- **Notifications**: 
  - Staff members: "You got a staff notification"
  - Regular players: "You got a player notification"

### rp_nycity_day Map Events

#### Downtown Patrol (`Downtown Patrol`)
- **NPCs**:
  - `npc_metropolice`: Spawns at 4 different locations:
    - Vector(8439.314453, -12269.247070, -255.968750)
    - Vector(7293.882812, -12456.252930, -255.968750)
    - Vector(6484.619629, -11661.916992, -247.845642)
    - Vector(8907.596680, -11574.381836, -186.768463)
- **Spawn Condition**: More than 8 players online
- **Notifications**: 
  - Staff: "Downtown Patrol: Metropolice are patrolling downtown!"
  - Players: "Downtown Patrol: Stay alert downtown!"

#### City Showdown (`City Showdown`)
- **NPCs**:
  - `npc_citizen`: Spawns at 4 different locations:
    - Vector(8439.314453, -12269.247070, -255.968750)
    - Vector(7293.882812, -12456.252930, -255.968750)
    - Vector(6484.619629, -11661.916992, -247.845642)
    - Vector(8907.596680, -11574.381836, -186.768463)
- **Spawn Condition**: More than 12 players online
- **Notifications**: 
  - Staff: "City Showdown: Citizens are taking to the streets!"
  - Players: "City Showdown: Brace yourself for chaos!"

---

## Event Configuration Structure

### NPC Spawn Configuration

NPCs are defined with their class name and an array of spawn positions:

```lua
NPCs = {
    ["npc_class_name"] = {
        Vector(x1, y1, z1),  -- Spawn position 1
        Vector(x2, y2, z2),  -- Spawn position 2
        Vector(x3, y3, z3)   -- Spawn position 3
    }
}
```

Multiple spawn positions allow NPCs to spawn at different locations, creating varied event experiences.

### Spawn Condition Function

The `shouldSpawn` function determines if an event should trigger:

```lua
shouldSpawn = function() 
    return player.GetCount() > 2  -- Example: require more than 2 players
end
```

Common conditions:
- Player count checks: `player.GetCount() > X`
- Time-based checks: `os.time() > specific_time`
- Random chance: `math.random() > 0.5`
- Combination of factors

### Notification Callback Function

The `notificationCallback` function sends messages to players:

```lua
notificationCallback = function()
    for _, ply in player.Iterator() do
        if ply:isStaffOnDuty() then
            ply:notifyInfo("Staff message")
        else
            ply:notifyInfo("Player message")
        end
    end
end
```

Notifications can be customized to:
- Send different messages to staff vs players
- Target specific factions or groups
- Include event-specific information
- Trigger other systems


