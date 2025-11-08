# Configuration

Comprehensive documentation for all ranking system configurations in the Ranking module.

---

## Overview

This file contains detailed documentation for the ranking system configuration. The rank table defines hierarchical structures for different classes with their associated ranks, permissions, and attributes.

---

## rankTable Structure

The `lia.ranking.rankTable` is organized by class constants (CLASS_HARTY, CLASS_HMG, CLASS_HCOMMAND) with each class containing multiple rank definitions.

### Rank Field Descriptions

Each rank entry contains the following fields:

- **Clearance**: Numeric clearance level for door access and permissions
- **Model**: Player model path used when this rank is assigned
- **RankTag**: Short abbreviation/tag for the rank (displayed in UI)
- **RankName**: Full display name of the rank
- **Salary**: Salary amount paid to players with this rank
- **Weapons**: Table of weapon class names this rank is authorized to use
- **CanPromote**: Boolean indicating if this rank can promote others
- **CanDemote**: Boolean indicating if this rank can demote others
- **CanHire**: Boolean indicating if this rank can hire new members
- **CanKick**: Boolean indicating if this rank can kick members
- **Tier**: Numeric tier level for rank hierarchy

---

## CLASS_HARTY Ranks

### rank_private - Private

- **Clearance**: 1
- **Model**: "models/player/group01/male_01.mdl"
- **RankTag**: "PVT"
- **RankName**: "Private"
- **Salary**: 30
- **Weapons**: ["arccw_bo3_c96"]
- **CanPromote**: false
- **CanDemote**: false
- **CanHire**: false
- **CanKick**: false
- **Tier**: 1

---

### rank_private_first - Private First Class

- **Clearance**: 2
- **Model**: "models/player/group01/male_02.mdl"
- **RankTag**: "PFC"
- **RankName**: "Private First Class"
- **Salary**: 40
- **Weapons**: ["arccw_bo3_c96"]
- **CanPromote**: false
- **CanDemote**: false
- **CanHire**: false
- **CanKick**: false
- **Tier**: 2

---

### rank_corporal - Corporal

- **Clearance**: 3
- **Model**: "models/player/group01/male_03.mdl"
- **RankTag**: "CPL"
- **RankName**: "Corporal"
- **Salary**: 55
- **Weapons**: ["arccw_bo3_c96", "arccw_waw_p38"]
- **CanPromote**: true
- **CanDemote**: true
- **CanHire**: false
- **CanKick**: false
- **Tier**: 3

---

### rank_lieutenant - Lieutenant

- **Clearance**: 4
- **Model**: "models/player/group01/male_04.mdl"
- **RankTag**: "LT"
- **RankName**: "Lieutenant"
- **Salary**: 80
- **Weapons**: ["arccw_bo3_c96", "arccw_waw_p38"]
- **CanPromote**: true
- **CanDemote**: true
- **CanHire**: true
- **CanKick**: true
- **Tier**: 4

---

## CLASS_HMG Ranks

### rank_private - Private

- **Clearance**: 1
- **Model**: "models/player/group01/male_01.mdl"
- **RankTag**: "PVT"
- **RankName**: "Private"
- **Salary**: 30
- **Weapons**: ["arccw_waw_p38"]
- **CanPromote**: false
- **CanDemote**: false
- **CanHire**: false
- **CanKick**: false
- **Tier**: 1

---

### rank_private_first - Private First Class

- **Clearance**: 2
- **Model**: "models/player/group01/male_02.mdl"
- **RankTag**: "PFC"
- **RankName**: "Private First Class"
- **Salary**: 40
- **Weapons**: ["arccw_waw_p38"]
- **CanPromote**: false
- **CanDemote**: false
- **CanHire**: false
- **CanKick**: false
- **Tier**: 2

---

### rank_corporal - Corporal

- **Clearance**: 3
- **Model**: "models/player/group01/male_03.mdl"
- **RankTag**: "CPL"
- **RankName**: "Corporal"
- **Salary**: 55
- **Weapons**: ["arccw_waw_p38", "arccw_waw_mg42"]
- **CanPromote**: true
- **CanDemote**: true
- **CanHire**: false
- **CanKick**: false
- **Tier**: 3

---

### rank_lieutenant - Lieutenant

- **Clearance**: 4
- **Model**: "models/player/group01/male_04.mdl"
- **RankTag**: "LT"
- **RankName**: "Lieutenant"
- **Salary**: 80
- **Weapons**: ["arccw_waw_p38", "arccw_waw_mg42"]
- **CanPromote**: true
- **CanDemote**: true
- **CanHire**: true
- **CanKick**: true
- **Tier**: 4

---

## CLASS_HCOMMAND Ranks

### rank_corporal - Corporal

- **Clearance**: 3
- **Model**: "models/player/group01/male_03.mdl"
- **RankTag**: "CPL"
- **RankName**: "Corporal"
- **Salary**: 55
- **Weapons**: ["arccw_waw_p38"]
- **CanPromote**: true
- **CanDemote**: true
- **CanHire**: false
- **CanKick**: false
- **Tier**: 3

---

### rank_lieutenant - Lieutenant

- **Clearance**: 4
- **Model**: "models/player/group01/male_04.mdl"
- **RankTag**: "LT"
- **RankName**: "Lieutenant"
- **Salary**: 80
- **Weapons**: ["arccw_waw_p38"]
- **CanPromote**: true
- **CanDemote**: true
- **CanHire**: true
- **CanKick**: true
- **Tier**: 4

---
