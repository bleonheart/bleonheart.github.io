# Configuration

Comprehensive documentation for all configuration settings in the Corpses & Looting module.

---

## Overview

This file contains detailed documentation for every configuration setting in the Corpses & Looting module. The corpse looting system allows players to search dead bodies, transfer items and money, with configurable search distance and anti-spam protection.

---

## Configuration

### corpseMaxDist

- **Description**: Maximum distance in units that players can be from a corpse to interact with it
- **Type**: Integer
- **Default**: `80`
- **Purpose**: Controls how close players must be to a corpse to open the looting interface
- **Usage**: Set in `module.lua` as `MODULE.corpseMaxDist = 80`
- **Note**: Increasing this value allows players to loot from further away, while decreasing it requires players to be closer to the corpse

---

