# Armor Module Configuration

Comprehensive documentation for all armor system configurations in the Armor module.

---

## Overview

This file contains detailed documentation for every configuration setting in the Armor module. The armor system allows players to equip different armor sets that provide protection, modify movement speed, and change player appearance.

---

## Armor List

The `lia.armors.list` table defines all available armor sets that players can equip. Each armor has properties that affect gameplay, appearance, and player capabilities.

### Armor Properties

Each armor entry contains the following properties:

- **name**: Display name shown to players
- **desc**: Description explaining what the armor is
- **icon**: Model path used for the armor icon in menus
- **model**: Player model path that replaces the player's appearance
- **footstep**: Sound file path for custom footstep sounds (nil for default)
- **jumpBoost**: Percentage change to jump height (negative = lower jumps)
- **speedBoost**: Percentage change to movement speed (negative = slower movement)
- **resistance**: Damage reduction percentage (0-100)
- **fallDamage**: Whether the player takes fall damage (true/false)
- **powerArmor**: Whether this is power armor (affects certain systems)
- **overlay**: Image path for screen overlay effects (nil for none). The overlay system is available by default and can be used with any armor configuration, not just the pre-configured armors listed below.

---

## Available Armor Sets

### Combine Elite Power Armor (`combineelitepowerarmor`)
- **Name**: "Combine Elite Power Armor"
- **Description**: "Heavy combat armor worn by Combine Elite soldiers, providing superior protection"
- **Model**: `models/player/combine_super_soldier.mdl`
- **Resistance**: 80% damage reduction
- **Speed Boost**: -20% (20% slower movement)
- **Jump Boost**: -15% (15% lower jumps)
- **Fall Damage**: Disabled
- **Power Armor**: Yes
- **Overlay**: `power_armor.png`
- **Footstep**: `npc/combine_soldier/gear1.wav`
- **Purpose**: Heavy combat armor with excellent protection but reduced mobility

---

### Civil Protection Armor (`civilprotection`)
- **Name**: "Civil Protection Armor"
- **Description**: "Standard issue armor worn by Civil Protection officers"
- **Model**: `models/player/police.mdl`
- **Resistance**: 30% damage reduction
- **Speed Boost**: 0% (no change)
- **Jump Boost**: 0% (no change)
- **Fall Damage**: Enabled
- **Power Armor**: No
- **Overlay**: `gasmask.png`
- **Footstep**: Default (nil)
- **Purpose**: Standard police armor with moderate protection and normal mobility

---

### Resistance Fighter Armor (`resistancefighter`)
- **Name**: "Resistance Fighter Armor"
- **Description**: "Light combat gear used by resistance fighters"
- **Model**: `models/player/barney.mdl`
- **Resistance**: 25% damage reduction
- **Speed Boost**: +5% (5% faster movement)
- **Jump Boost**: 0% (no change)
- **Fall Damage**: Enabled
- **Power Armor**: No
- **Overlay**: `power_armor_blur.png`
- **Footstep**: Default (nil)
- **Purpose**: Light armor with mobility bonus and moderate protection

---

### Combine Soldier Armor (`combinesoldier`)
- **Name**: "Combine Soldier Armor"
- **Description**: "Standard combat armor worn by Combine soldiers"
- **Model**: `models/player/combine_soldier.mdl`
- **Resistance**: 50% damage reduction
- **Speed Boost**: -5% (5% slower movement)
- **Jump Boost**: -5% (5% lower jumps)
- **Fall Damage**: Enabled
- **Power Armor**: No
- **Overlay**: `power_armor_t51b.png`
- **Footstep**: Default (nil)
- **Purpose**: Medium combat armor with balanced protection and mobility

---

### Civilian Male Armor (`civilianmale`)
- **Name**: "Civilian Male Armor"
- **Description**: "Basic protective clothing for civilian males"
- **Model**: `models/player/Group01/male_01.mdl`
- **Resistance**: 10% damage reduction
- **Speed Boost**: 0% (no change)
- **Jump Boost**: 0% (no change)
- **Fall Damage**: Enabled
- **Power Armor**: No
- **Overlay**: `power_armor_x01.png`
- **Footstep**: Default (nil)
- **Purpose**: Basic civilian clothing with minimal protection

---

### Civilian Female Armor (`civilianfemale`)
- **Name**: "Civilian Female Armor"
- **Description**: "Basic protective clothing for civilian females"
- **Model**: `models/player/Group01/female_01.mdl`
- **Resistance**: 10% damage reduction
- **Speed Boost**: 0% (no change)
- **Jump Boost**: 0% (no change)
- **Fall Damage**: Enabled
- **Power Armor**: No
- **Overlay**: None (nil)
- **Footstep**: Default (nil)
- **Purpose**: Basic civilian clothing with minimal protection

---

## Armor Statistics Comparison

| Armor | Resistance | Speed | Jump | Fall Damage | Power Armor |
|-------|------------|-------|------|-------------|-------------|
| Combine Elite Power Armor | 80% | -20% | -15% | No | Yes |
| Combine Soldier Armor | 50% | -5% | -5% | Yes | No |
| Civil Protection Armor | 30% | 0% | 0% | Yes | No |
| Resistance Fighter Armor | 25% | +5% | 0% | Yes | No |
| Civilian Male/Female | 10% | 0% | 0% | Yes | No |


---

## Armor Overlays

The overlay system is available by default and can be used with any armor configuration. Simply set the `overlay` property to an image path (or use one of the pre-configured overlay images) to add visual screen effects when that armor is equipped.

The following overlay images are pre-configured and used by the example armor sets listed above:

<div align="center">

![Power Armor Overlay](https://bleonheart.github.io/Samael-Assets/falloutrp/hud/overlay/power_armor.png){width="512"}

As seen in *Combine Elite Power Armor Overlay*

![Gasmask Overlay](https://bleonheart.github.io/Samael-Assets/falloutrp/hud/overlay/gasmask.png){width="512"}

As seen in *Civil Protection Armor Overlay*

![Power Armor Blur Overlay](https://bleonheart.github.io/Samael-Assets/falloutrp/hud/overlay/power_armor_blur.png){width="512"}

As seen in *Resistance Fighter Armor Overlay*

![Power Armor T51B Overlay](https://bleonheart.github.io/Samael-Assets/falloutrp/hud/overlay/power_armor_t51b.png){width="512"}

As seen in *Combine Soldier Armor Overlay*

![Power Armor X01 Overlay](https://bleonheart.github.io/Samael-Assets/falloutrp/hud/overlay/power_armor_x01.png){width="512"}

As seen in *Civilian Male Armor Overlay*

</div>

---

