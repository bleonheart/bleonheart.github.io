# Configuration

## Injury Types

The injuries system uses a configurable injury table located in `config.lua`. Each injury type can be customized with various properties.

### Injury Structure

```lua
lia.injuries.list = {
    ["injuryKey"] = {
        name = "Display Name",
        description = "Description shown to players",
        icon = "Web URL for icon",
        Icon = "Local icon path",
        chance = 25,                    -- Base chance percentage (0-100)
        chanceByFalling = 50,           -- Chance when falling (optional)
        bleedDamageAmount = 5,          -- Damage per bleed tick (bleeding only)
        weapons = {                     -- Weapon-specific chances
            ["weapon_crowbar"] = 50,    -- 50% chance when hit by crowbar
        },
        variants = {                    -- Multiple variants (bleeding only)
            ["heavy"] = {
                chance = 10,
                bleedDuration = 25,     -- How long bleeding lasts in seconds
                damageInterval = 2,     -- How often damage is applied
                weapons = {
                    ["weapon_crowbar"] = 15,
                },
            },
            ["light"] = {
                chance = 5,
                bleedDuration = 25,
                damageInterval = 2,
                weapons = {
                    ["weapon_crowbar"] = 5,
                },
            }
        },
        OnInjury = function(client, variant) -- Called when injury is applied
            -- Apply effects here
        end,
        OnHealed = function(client)      -- Called when injury is healed
            -- Remove effects here
        end,
    }
}
```

### Available Injury Types

#### Broken Leg (`brokenLeg`)
- **Effect**: Reduces movement speed to 50%
- **Healing**: Automatic speed restoration when healed
- **Configurable**: Base chance, falling chance, weapon chances

#### Bleeding (`bleeding`)
- **Effect**: Periodic damage over time with heavy/light variants
- **Healing**: Stops damage timer when healed
- **Configurable**: Damage amount, duration, interval, variants

#### Head Concussion (`headConcussion`)
- **Effect**: Screen shake and visual effects
- **Healing**: Removes visual effects
- **Configurable**: Base chance, weapon chances

#### Pain (`pain`)
- **Effect**: Reduced movement speed (80% of normal)
- **Healing**: Automatic or requires painkillers depending on implementation
- **Configurable**: Base chance, weapon chances

