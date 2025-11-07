# Configuration

## XP Configuration

The leveling system uses configurable XP values for various actions. All XP settings can be adjusted through the admin configuration panel under the "Leveling" category.

### Combat XP Settings

| Setting | Description | Default | Range |
|---------|-------------|---------|-------|
| `PlayerKillXP` | XP awarded for killing other players | 30 | 0-1000 |
| `DefaultNPCKillXP` | Default XP for killing NPCs not specifically configured | 15 | 0-1000 |
| `FriendlyKillPenalty` | XP penalty for killing friendly players | -20 | 0-1000 |
| `ReprimandPenalty` | XP penalty for administrative reprimands | -50 | 0-1000 |

### Passive XP Settings

| Setting | Description | Default | Range |
|---------|-------------|---------|-------|
| `PassiveXPAmount` | XP awarded periodically while playing | 50 | 0-1000 |
| `PassiveXPDelay` | Time in seconds between passive XP awards | 1200 (20 min) | 1-3600 |

### Level Progression Settings

| Setting | Description | Default | Range |
|---------|-------------|---------|-------|
| `BaseXP` | XP required for level 1 | 100 | 1-10000 |
| `LevelMultiplier` | XP multiplier for each subsequent level | 1.25 | 0-10 |
| `MaxLevel` | Maximum level players can reach | 100 | 1-1000 |
| `PointsPerLevel` | Skill points awarded per level | 1 | 1-10 |

### XP Bar Display Settings

| Setting | Description | Default | Range |
|---------|-------------|---------|-------|
| `XPBarFadeInTime` | Time for XP bar to fade in (seconds) | 0.5 | 0.1-5.0 |
| `XPBarDisplayTime` | How long XP bar stays visible (seconds) | 5.0 | 1.0-30.0 |
| `XPBarFadeOutTime` | Time for XP bar to fade out (seconds) | 1.0 | 0.1-10.0 |
| `XPBarWidth` | Width of XP bar in pixels | 600 | 200-800 |
| `XPBarHeight` | Height of XP bar in pixels | 50 | 10-50 |

### Skill System Settings

| Setting | Description | Default | Range |
|---------|-------------|---------|-------|
| `SkillResetCost` | Skill points required to reset skills | 0 | 0-100 |

## NPC XP Configuration

Specific NPCs can be configured to give custom XP amounts. This is done by editing the `MODULE.NPCKillXP` table in `config.lua`:

```lua
MODULE.NPCKillXP = {
    ["npc_vj_crabsynth2_z"] = 100,  -- Example: Custom NPC gives 100 XP
    ["npc_combine_soldier"] = 25,   -- Combine soldiers give 25 XP
}
```

## Skill Definitions

Skills are defined in `module.lua` and can be customized. Each skill has the following properties:

```lua
skillName = {
    name = "Display Name",
    description = "Description shown to players",
    image = "path/to/enabled/icon.png",
    imageDisabled = "path/to/disabled/icon.png",
    uiPosition = { x = 400, y = 200 },  -- Position in skill tree UI
    cost = 2,                           -- Skill points required
    requirement = 5,                    -- Level requirement
    dependsOn = {                       -- Skills required (optional)
        { skill = "otherSkill", tier = 1 }
    },
    -- Skill-specific bonuses:
    bonus = 25,                         -- Health bonus for endurance
    damage = 1.15,                      -- Damage multiplier for combat
    repairSpeed = 1.3,                  -- Repair speed multiplier
    toolEffectiveness = 1.15            -- Tool effectiveness multiplier
}
```

### Default Skills

#### Endurance
- **Requirement**: Level 5
- **Cost**: 2 skill points
- **Effect**: +25 maximum health

#### Combat Training
- **Requirement**: Level 8
- **Cost**: 2 skill points
- **Effect**: +15% weapon damage

#### Engineering
- **Requirement**: Level 18
- **Cost**: 3 skill points
- **Dependencies**: Endurance (tier 1)
- **Effects**: +15% tool effectiveness, +30% repair speed

## Configuration Tips

1. **XP Balance**: Start with lower XP values and increase based on server activity
2. **Level Cap**: Set MaxLevel based on desired long-term progression
3. **Passive XP**: Balance delay and amount to encourage active play without rewarding AFK
4. **Skill Costs**: Higher costs encourage strategic skill investment
5. **NPC XP**: Add specific NPCs that are difficult to defeat for bonus XP rewards

## Admin Commands

- `/setlevel <player> <level>` - Set a player's level
- `/addxp <player> <amount>` - Add XP to a player
- `/resetxp <player>` - Reset a player's XP and skills
- Skill tree accessible through F1 menu under "Skills" tab</contents>
</xai:function_call">Write contents to injuries/README.md.

When you're done with your current set of changes to view the file, you should call the read_file tool with the specific file path and fix any newly introduced errors. Let me check if policesuite needs a config.md since it had a config.lua. Let me check what policesuite config looks like. 

<xai:function_call name="read_file">
<parameter name="target_file">policesuite/config.lua



