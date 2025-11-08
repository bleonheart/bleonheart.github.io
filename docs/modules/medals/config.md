# Configuration

Comprehensive documentation for all medal system configurations in the Medals module.

---

## Overview

This file contains detailed documentation for every configuration setting in the Medals module. Each configuration entry includes its purpose, description, and expected values.

---

## Configuration Fields

### MedalAdminFlag

- **Description**: The admin flag required to manage medals in-game
- **Type**: String
- **Default**: "m"
- **Purpose**: Controls who can award, remove, or manage player medals

---

### MaximumWearMedals

- **Description**: Maximum number of medals a player can wear/display at once
- **Type**: Integer
- **Default**: 5
- **Purpose**: Limits how many medals are visible on a player's character

---

### generateMedalsAsItems

- **Description**: Whether medals should be generated as inventory items when awarded
- **Type**: Boolean
- **Default**: true
- **Purpose**: Controls if medals appear in player inventories when earned

---

## MedalTypes Table

The `lia.medals.MedalTypes` table defines the rarity tiers and colors for medals. Each tier includes a name and color.

### Medal Type 1 - Common

- **Name**: "Common"
- **Color**: Color(48, 201, 102) - Green
- **Description**: Standard medals awarded for basic achievements

---

### Medal Type 2 - Uncommon

- **Name**: "Uncommon"
- **Color**: Color(235, 207, 49) - Gold/Yellow
- **Description**: Medals awarded for notable achievements

---

### Medal Type 3 - Rare

- **Name**: "Rare"
- **Color**: Color(235, 148, 49) - Orange
- **Description**: Medals awarded for exceptional achievements

---

### Medal Type 4 - Exceptionally Rare

- **Name**: "Exceptionally Rare"
- **Color**: Color(235, 64, 38) - Red
- **Description**: Medals awarded for extraordinary achievements

---

## EnabledMedalPacks Table

The `lia.medals.EnabledMedalPacks` table controls which medal packs are available for use. Each pack can be enabled or disabled.

### starwarsrp - Star Wars RP

- **Name**: "Star Wars RP"
- **Enabled**: true
- **Description**: Star Wars themed medal pack

---

### usarmy - US Army

- **Name**: "US Army"
- **Enabled**: false
- **Description**: United States Army medal pack

---

### usmar - US Marines

- **Name**: "US Marines"
- **Enabled**: false
- **Description**: United States Marine Corps medal pack

---

### usnavy - US Navy

- **Name**: "US Navy"
- **Enabled**: false
- **Description**: United States Navy medal pack

---

### usair - US Air Force

- **Name**: "US Air Force"
- **Enabled**: false
- **Description**: United States Air Force medal pack

---

### nypd - NYPD

- **Name**: "NYPD"
- **Enabled**: false
- **Description**: New York Police Department medal pack

---

### lapd - LAPD

- **Name**: "LAPD"
- **Enabled**: false
- **Description**: Los Angeles Police Department medal pack

---

### 1942rp - 1942 RP

- **Name**: "1942 RP"
- **Enabled**: false
- **Description**: World War II era medal pack

---

### sovietrp - Soviet RP

- **Name**: "Soviet RP"
- **Enabled**: false
- **Description**: Soviet Union themed medal pack

---
