# Configuration

Comprehensive documentation for all drug system configurations in the Drugs module.

---

## Overview

This file contains detailed documentation for every configuration setting in the Drugs module. The drug system allows players to use various drugs with different effects, process raw materials into drugs, and grow drug plants.

---

## Basic Drug Settings

### EnableDrugOverdose

- **Description**: Whether drug overdose mechanics are enabled
- **Type**: Boolean
- **Default**: true
- **Purpose**: When enabled, players have a chance to overdose when using drugs, which can cause negative effects or death

---

### ShowDrugEffectsHUD

- **Description**: Whether drug effects are displayed on the HUD
- **Type**: Boolean
- **Default**: true
- **Purpose**: Shows visual indicators when players are under drug effects

---

### DrugEffectWarningTime

- **Description**: Time in seconds before drug effects end when warning appears
- **Type**: Integer
- **Default**: 30 seconds
- **Purpose**: How long before effects wear off that players see a warning

---

### DrugEffectCriticalTime

- **Description**: Time in seconds before drug effects end when critical warning appears
- **Type**: Integer
- **Default**: 10 seconds
- **Purpose**: How long before effects wear off that players see a critical warning

---

### PreventMultipleDrugProduction

- **Description**: Whether players can only process one type of drug at a time
- **Type**: Boolean
- **Default**: true
- **Purpose**: Prevents players from processing multiple drugs simultaneously, creating more strategic choices

---

## Drug Items Configuration

The `lia.drugs.DrugItems` table contains three categories: processed drugs, plants, and miscellaneous items.

---

## Processed Drugs

Processed drugs are the final consumable forms that players can use. Each drug has specific effects and properties.

### Cocaine (`cocaine`)
- **Name**: "Cocaine Baggie"
- **Effect**: +35% running speed
- **Effect Type**: `runspeed`
- **Effect Value**: 1.35 (35% increase)
- **Effect Time**: 120 seconds (2 minutes)
- **Overdose Chance**: 15%
- **Unprocessed**: Cocaine Brick (`unprocessedcocaine`)
- **Process Time**: 600 seconds (10 minutes)

---

### Heroin (`heroin`)
- **Name**: "Heroin Dose"
- **Effect**: 75% damage reduction (takes 25% damage)
- **Effect Type**: `damage_reduction`
- **Effect Value**: 0.25 (25% of normal damage)
- **Effect Time**: 90 seconds (1.5 minutes)
- **Overdose Chance**: 25%
- **Unprocessed**: Unprocessed Heroin (`unprocessedheroin`)
- **Process Time**: 600 seconds (10 minutes)

---

### Weed (`weed`)
- **Name**: "Weed Baggie"
- **Effect**: Hunger and thirst decay 50% slower
- **Effect Type**: `needs_decay`
- **Effect Value**: 0.5 (half speed decay)
- **Effect Time**: 300 seconds (5 minutes)
- **Overdose Chance**: 5%
- **Unprocessed**: Unprocessed Weed (`unprocessedweed`)
- **Process Time**: 600 seconds (10 minutes)

---

### Meth (`meth`)
- **Name**: "Meth Baggie"
- **Effect**: +40% melee attack speed
- **Effect Type**: `melee_speed`
- **Effect Value**: 1.4 (40% increase)
- **Effect Time**: 180 seconds (3 minutes)
- **Overdose Chance**: 20%
- **Unprocessed**: Meth Brick (`unprocessedmeth`)
- **Process Time**: 600 seconds (10 minutes)

---

### LSD (`lsd`)
- **Name**: "LSD Tabs"
- **Effect**: Ragdoll recovery 25% faster
- **Effect Type**: `ragdoll_recovery`
- **Effect Value**: 0.75 (75% of normal recovery time)
- **Effect Time**: 240 seconds (4 minutes)
- **Overdose Chance**: 10%
- **Unprocessed**: Unprocessed LSD (`unprocessedlsd`)
- **Process Time**: 600 seconds (10 minutes)

---

### MDMA (`mdma`)
- **Name**: "Ecstasy Pill"
- **Effect**: +30% stamina regeneration
- **Effect Type**: `stamina_regen`
- **Effect Value**: 1.3 (30% increase)
- **Effect Time**: 180 seconds (3 minutes)
- **Overdose Chance**: 12%
- **Unprocessed**: Unprocessed MDMA (`unprocessedmdma`)
- **Process Time**: 600 seconds (10 minutes)

---

## Drug Plants

Plants can be grown from seeds and harvested to produce unprocessed drugs.

### Weed Plant (`weed`)
- **Seed ID**: `drug_weed_seed`
- **Seed Name**: "Weed Seed"
- **Plant ID**: `drug_weed_plant`
- **Plant Name**: "Marijuana Plant"
- **Growth Phases**: 8 phases with different models
- **Time Per Phase**: 75 seconds per phase
- **Total Growth Time**: 600 seconds (10 minutes)
- **Harvest**: Produces 1 Unprocessed Weed, loses 4 growth phases

---

## Miscellaneous Items

### Soil (`soil`)
- **Name**: "Soil"
- **Description**: "A bag of nutrient-rich soil perfect for growing plants."
- **Model**: `models/soil/soil.mdl`
- **Size**: 1x1 inventory slots
- **Category**: Drugs

### Filled Soil (`soil_filled`)
- **Name**: "Filled Soil"
- **Description**: "A pot filled with nutrient-rich soil, ready for planting seeds."
- **Model**: `models/nater/weedplant_pot_dirt.mdl`
- **Size**: 2x2 inventory slots
- **Category**: Drugs

### Empty Pot (`pot_empty`)
- **Name**: "Empty Pot"
- **Description**: "An empty pot ready for planting."
- **Model**: `models/nater/weedplant_pot.mdl`
- **Size**: 2x2 inventory slots
- **Category**: Drugs

### Drug Processor (`drugprocessor`)
- **Name**: "Drug Processor"
- **Description**: "A machine for processing unprocessed drugs into their final form."
- **Model**: `models/dannio/drugscallum/cocavat.mdl`
- **Size**: 2x2 inventory slots
- **Category**: Drugs
- **Scale**: 0.5 (half size model)


