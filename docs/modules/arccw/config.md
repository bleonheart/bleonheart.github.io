# ARCCW Module Configuration

Comprehensive documentation for all ARCCW weapon system configurations in the ARCCW module.

---

## Overview

This file contains detailed documentation for every configuration setting in the ARCCW module. The ARCCW module provides integration with ARCCW weapons, including magazine system support and weapon configuration.

---

## Configuration Fields

### ARCCWMagazinesEnabled

- **Description**: Whether the magazine system for ARCCW weapons is enabled
- **Type**: Boolean
- **Default**: true
- **Category**: ARCCW
- **Purpose**: When enabled, ARCCW weapons use a magazine system where players must reload magazines separately. When disabled, weapons use standard reload mechanics.

---

### ARCCWMagazineCapacity

- **Description**: Default magazine capacity for generated magazines
- **Type**: Integer
- **Default**: 30
- **Minimum**: 1
- **Maximum**: 100
- **Category**: ARCCW
- **Purpose**: Sets the default number of rounds that fit in a magazine when magazines are automatically generated

---

### ARCCWMagazineModel

- **Description**: Default 3D model path for generated magazines
- **Type**: String (Generic)
- **Default**: `"models/Items/BoxSRounds.mdl"`
- **Category**: ARCCW
- **Purpose**: Model displayed for magazine items in the inventory and world

---

## Magazine System

When `ARCCWMagazinesEnabled` is set to `true`, ARCCW weapons use a magazine-based reloading system:

- Players must carry separate magazine items
- Magazines can be loaded with ammunition
- Reloading consumes a magazine from inventory
- Empty magazines can be refilled with ammunition
- Magazine capacity is determined by `ARCCWMagazineCapacity` unless overridden per weapon

When `ARCCWMagazinesEnabled` is set to `false`, weapons use standard reload mechanics without separate magazine items.
