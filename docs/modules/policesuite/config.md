# Police Suite Module Configuration

Comprehensive documentation for all police system configurations in the Police Suite module.

---

## Overview

This file contains detailed documentation for every configuration setting in the Police Suite module. The police suite provides tools for law enforcement including fine systems, arrest procedures, stun weapons, and warrant management.

---

## Basic Settings

### removeWarrantOnDeath

- **Description**: Whether warrants are automatically removed when a player dies
- **Type**: Boolean
- **Default**: false
- **Purpose**: Controls if warrants persist after player death or are cleared automatically

---

### nightstickStunHits

- **Description**: Number of hits required with a nightstick to stun a player
- **Type**: Integer
- **Default**: 1
- **Purpose**: Sets how many times an officer must hit someone with a nightstick before they are stunned

---

### nightstickStunDuration

- **Description**: Duration in seconds that a player remains stunned after being hit by a nightstick
- **Type**: Integer
- **Default**: 4
- **Purpose**: Controls how long players are incapacitated after being stunned

---

### stunGunMaxDistance

- **Description**: Maximum distance in units that a stun gun can effectively stun targets
- **Type**: Integer
- **Default**: 400
- **Purpose**: Sets the effective range for stun gun weapons

---

### alarmSoundFiles

- **Description**: Table of sound file paths used for police alarms
- **Type**: Table (array of strings)
- **Default**: `{"alarms/siren.wav"}`
- **Purpose**: Defines which sound files play when police alarms are triggered

---

### emergencyCallCooldown

- **Description**: Cooldown time in seconds between emergency calls
- **Type**: Integer
- **Default**: 60
- **Purpose**: Prevents spam by limiting how often players can make emergency calls

---

### fineIssueDistance

- **Description**: Maximum distance in units that an officer can be from a player to issue a fine
- **Type**: Integer
- **Default**: 200
- **Purpose**: Ensures officers are close enough to players when issuing fines

---

## Fine Reasons

The `lia.police.fineReasons` table defines all available fine reasons with their tiered amounts. Each fine reason has three severity levels (1, 2, 3) with increasing fine amounts.

### How Fine Tiers Work

Each fine reason has three tiers:
- **Tier 1**: Minor offense - lowest fine amount
- **Tier 2**: Moderate offense - medium fine amount  
- **Tier 3**: Severe offense - highest fine amount

Officers select the appropriate tier when issuing fines based on the severity of the offense.

### Available Fine Reasons

| Fine Reason | Tier 1 | Tier 2 | Tier 3 | Description |
|-------------|--------|--------|--------|-------------|
| Littering | $500 | $1,000 | $2,000 | Disposing of trash improperly |
| Jaywalking | $1,000 | $2,000 | $3,000 | Crossing streets illegally |
| Speeding | $2,000 | $4,000 | $6,000 | Exceeding speed limits |
| Noise Violation | $3,000 | $6,000 | $9,000 | Creating excessive noise |
| Public Intoxication | $4,000 | $8,000 | $12,000 | Being intoxicated in public |
| Vandalism | $5,000 | $10,000 | $15,000 | Damaging property |
| Disturbing the Peace | $6,000 | $12,000 | $18,000 | Causing public disturbances |
| Assault | $7,000 | $14,000 | $21,000 | Physical attack on others |
| Theft | $8,000 | $16,000 | $24,000 | Stealing property |
| Possession of Illegal Firearm | $9,000 | $18,000 | $27,000 | Carrying illegal weapons |
| Trespassing | $10,000 | $20,000 | $30,000 | Entering restricted areas |
| Reckless Endangerment | $11,000 | $22,000 | $33,000 | Endangering others |
| Resisting Arrest | $12,000 | $24,000 | $36,000 | Refusing to comply with arrest |
| Armed Individual | $13,000 | $26,000 | $39,000 | Being armed in restricted areas |
| Major Raid | $14,000 | $28,000 | $42,000 | Participating in major criminal activity |
| Property Raid | $15,000 | $30,000 | $45,000 | Raiding property |

---

## Legal Arrest Reasons

The `lia.police.legalArrestReasons` table defines reasons that allow officers to legally arrest players. Each reason has three tiers with different jail times.

### How Arrest Tiers Work

Similar to fines, arrest reasons have three tiers:
- **Tier 1**: Short jail time for minor offenses
- **Tier 2**: Medium jail time for moderate offenses
- **Tier 3**: Long jail time for serious offenses

### Available Arrest Reasons

| Arrest Reason | Tier 1 (minutes) | Tier 2 (minutes) | Tier 3 (minutes) | Description |
|---------------|------------------|------------------|------------------|-------------|
| Disturbing the Peace | 5 | 10 | 15 | Causing public disturbances |
| Assault | 10 | 20 | 30 | Physical attack on others |
| Theft | 12 | 24 | 36 | Stealing property |
| Possession of Illegal Firearm | 15 | 30 | 45 | Carrying illegal weapons |
| Vandalism | 8 | 16 | 24 | Damaging property |
| Resisting Arrest | 10 | 20 | 30 | Refusing to comply with arrest |
| Trespassing | 6 | 12 | 18 | Entering restricted areas |
| Public Intoxication | 4 | 8 | 12 | Being intoxicated in public |
| Reckless Endangerment | 12 | 24 | 36 | Endangering others |

---

## Crime Type Definitions

The `lia.police.crimeTypeDefinitions` table provides display names for specific crime types used in the system:

- **armed_individual**: "Armed Individual"
- **major_raid**: "Major Raid"
- **property_raid**: "Property Raid"

These definitions are used when displaying crime information to officers and in reports.

---

## Authorized Factions

The `lia.police.authorizedFactions` table defines which factions are authorized to use police tools and commands. By default, only the police faction (`FACTION_POLICE`) is authorized.

To add additional factions, add entries to this table:
```lua
lia.police.authorizedFactions = {
    [FACTION_POLICE] = true,
    [FACTION_SWAT] = true,  -- Example: Add SWAT faction
}
```


