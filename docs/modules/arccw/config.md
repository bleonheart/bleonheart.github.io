# Leveling Module Configuration

Comprehensive documentation for all leveling system configurations in the Leveling module.

---

## Overview

This file contains detailed documentation for every configuration setting in the Leveling module. Each configuration entry includes its purpose, description, data type, and value ranges.

---

## Configuration Fields

### PlayerKillXP

- **Description**: Amount of experience points awarded for killing other players
- **Type**: Integer
- **Default**: 30
- **Min**: 0
- **Max**: 1000
- **Category**: Leveling

---

### DefaultNPCKillXP

- **Description**: Default amount of experience points awarded for killing NPCs not specifically configured
- **Type**: Integer
- **Default**: 15
- **Min**: 0
- **Max**: 1000
- **Category**: Leveling

---

### PassiveXPDelay

- **Description**: Time delay in seconds between passive XP gains
- **Type**: Integer
- **Default**: 1200 (20 minutes)
- **Min**: 1
- **Max**: 3600 (1 hour)
- **Category**: Leveling

---

### PassiveXPAmount

- **Description**: Amount of experience points awarded passively over time
- **Type**: Integer
- **Default**: 50
- **Min**: 0
- **Max**: 1000
- **Category**: Leveling

---

### FriendlyKillPenalty

- **Description**: Experience point penalty for killing friendly players/team members
- **Type**: Integer
- **Default**: 20
- **Min**: 0
- **Max**: 1000
- **Category**: Leveling

---

### ReprimandPenalty

- **Description**: Experience point penalty for receiving administrative reprimands
- **Type**: Integer
- **Default**: 50
- **Min**: 0
- **Max**: 1000
- **Category**: Leveling

---

### BaseXP

- **Description**: Base experience points required for the first level
- **Type**: Integer
- **Default**: 100
- **Min**: 1
- **Max**: 10000
- **Category**: Leveling

---

### LevelMultiplier

- **Description**: Multiplier applied to base XP for each subsequent level (exponential growth)
- **Type**: Float
- **Default**: 1.25
- **Min**: 0
- **Max**: 10
- **Category**: Leveling

---

### MaxLevel

- **Description**: Maximum level players can reach
- **Type**: Integer
- **Default**: 100
- **Min**: 1
- **Max**: 1000
- **Category**: Leveling

---

### XPBarFadeInTime

- **Description**: Time in seconds for the XP bar to fade in when XP is gained
- **Type**: Float
- **Default**: 0.5
- **Min**: 0.1
- **Max**: 5.0
- **Category**: Leveling

---

### XPBarDisplayTime

- **Description**: Time in seconds the XP bar remains visible after XP is gained
- **Type**: Float
- **Default**: 5.0
- **Min**: 1.0
- **Max**: 30.0
- **Category**: Leveling

---

### XPBarFadeOutTime

- **Description**: Time in seconds for the XP bar to fade out
- **Type**: Float
- **Default**: 1.0
- **Min**: 0.1
- **Max**: 10.0
- **Category**: Leveling

---

### XPBarWidth

- **Description**: Width of the XP progress bar in pixels
- **Type**: Integer
- **Default**: 600
- **Min**: 200
- **Max**: 800
- **Category**: Leveling

---

### XPBarHeight

- **Description**: Height of the XP progress bar in pixels
- **Type**: Integer
- **Default**: 50
- **Min**: 10
- **Max**: 50
- **Category**: Leveling

---

### PointsPerLevel

- **Description**: Number of skill points awarded per level up
- **Type**: Integer
- **Default**: 1
- **Min**: 1
- **Max**: 10
- **Category**: Leveling

---

### SkillResetCost

- **Description**: Cost in skill points to reset all skills
- **Type**: Integer
- **Default**: 0 (free)
- **Min**: 0
- **Max**: 100
- **Category**: Leveling

---

## NPCKillXP Table

The `MODULE.NPCKillXP` table allows custom XP values for specific NPC classes. Currently configured NPCs:

- **npc_vj_crabsynth2_z**: 100 XP

---
