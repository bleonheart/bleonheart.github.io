# Configuration

Comprehensive documentation for all territory system configurations in the Territories module.

---

## Overview

This file contains detailed documentation for every configuration setting in the Territories module. The territories system allows factions to capture and control areas of the map, with configurable capture zones, requirements, and control point properties.

---

## Module Default Values

The module defines default values that are used when control points don't specify custom settings:

### DEFAULT_MODEL

- **Description**: Default model path for control point entities
- **Type**: String
- **Default**: `"models/props_lab/servers.mdl"`
- **Purpose**: Model used for control points when no custom model is specified

---

### DEFAULT_RADIUS

- **Description**: Default capture radius in units for control points
- **Type**: Integer
- **Default**: 200
- **Purpose**: Default area size players must stay within to capture a control point

---

### DEFAULT_MIN_DEFENDERS

- **Description**: Default minimum number of defenders required online
- **Type**: Integer
- **Default**: 1
- **Purpose**: Minimum faction members that must be online for the faction to maintain control

---

### CAPTURE_TIME

- **Description**: Time in seconds required to capture a control point
- **Type**: Integer
- **Default**: 10
- **Purpose**: How long players must remain in the capture zone to successfully capture

---

### OWNER_NONE_VALUE

- **Description**: Numeric value representing unowned/neutral control points
- **Type**: Integer
- **Default**: 0
- **Purpose**: Used internally to represent control points that have no owner

---

## Configuration Options

These configuration options can be set via `lia.config.get()` and are used as defaults when control points don't specify custom values:

### ControlRadius

- **Description**: Default capture radius in units for control points
- **Type**: Integer
- **Default**: 200
- **Usage**: `lia.config.get("ControlRadius", 200)`
- **Purpose**: Sets the default area size for control point capture zones

---

### ControlMinPlayers

- **Description**: Default minimum number of defenders required online
- **Type**: Integer
- **Default**: 1
- **Usage**: `lia.config.get("ControlMinPlayers", 1)`
- **Purpose**: Sets the default minimum faction members required to maintain control

---

### ControlConquestable

- **Description**: Whether control points can be captured by default
- **Type**: Boolean
- **Default**: true
- **Usage**: `lia.config.get("ControlConquestable", true)`
- **Purpose**: Controls if control points are capturable by default

---

### ControlSpawnUnowned

- **Description**: Whether unowned control points spawn NPCs
- **Type**: Boolean
- **Default**: false
- **Usage**: `lia.config.get("ControlSpawnUnowned", false)`
- **Purpose**: Controls if unowned control points spawn defender NPCs

---

## Control Point Settings

Each control point entity can have individual settings that override defaults:

### Name

- **Description**: Display name for the control point
- **Type**: String
- **Purpose**: Name shown to players when interacting with the control point

---

### Model

- **Description**: Model path for the control point entity
- **Type**: String
- **Default**: Uses `DEFAULT_MODEL` if not specified
- **Purpose**: Visual model displayed for the control point

---

### Owner Faction

- **Description**: Faction ID that currently owns the control point
- **Type**: Integer
- **Default**: `OWNER_NONE_VALUE` (0) for unowned
- **Purpose**: Which faction controls this territory

---

### Conquestable

- **Description**: Whether this control point can be captured
- **Type**: Boolean
- **Default**: Uses `ControlConquestable` config value
- **Purpose**: Prevents capture of specific control points

---

### Radius

- **Description**: Capture radius in units
- **Type**: Integer
- **Default**: Uses `ControlRadius` config value or `DEFAULT_RADIUS`
- **Purpose**: Area size players must stay within to capture

---

### Min Defenders Online

- **Description**: Minimum faction members that must be online to maintain control
- **Type**: Integer
- **Default**: Uses `ControlMinPlayers` config value or `DEFAULT_MIN_DEFENDERS`
- **Purpose**: Prevents small factions from holding territories

---

## Client Options

### controlPointShowRadius

- **Description**: Whether to show control point radius visualization (Staff Only)
- **Type**: Boolean
- **Default**: false
- **Usage**: `lia.option.get("controlPointShowRadius", false)`
- **Purpose**: Allows staff to visualize capture zones


