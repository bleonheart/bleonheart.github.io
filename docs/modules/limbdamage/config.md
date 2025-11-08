# Configuration

Comprehensive documentation for all configuration settings in the Limb Damage module.

---

## Overview

This file contains detailed documentation for every configuration setting in the Limb Damage module. The limb damage system causes leg shots to prevent sprinting for a configurable duration, with automatic healing and toggleable enable/disable functionality.

---

## Configuration Options

These configuration options are registered via `lia.config.add()` and can be accessed using `lia.config.get()`:

### LegDamageDelay

- **Description**: How long leg damage prevents sprinting (in seconds)
- **Type**: Float
- **Default**: `4`
- **Min**: `1`
- **Max**: `30`
- **Category**: "Limb Damage"
- **Usage**: `lia.config.get("LegDamageDelay", 4)`
- **Purpose**: Controls the duration that players cannot sprint after taking leg damage

---

### LegDamageEnabled

- **Description**: Whether the leg damage system is enabled
- **Type**: Boolean
- **Default**: `true`
- **Category**: "Limb Damage"
- **Usage**: `lia.config.get("LegDamageEnabled", true)`
- **Purpose**: Master toggle to enable or disable the entire limb damage system

---

