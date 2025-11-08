# Configuration

Comprehensive documentation for all configuration settings in the Extraction module.

---

## Overview

This file contains detailed documentation for every configuration setting in the Extraction module. The extraction system requires players to reach escape zones within a countdown timer, with configurable positions per map and audio/visual cues.

---

## Configuration

### ExtractionTime

- **Description**: Time in seconds for the extraction countdown timer
- **Type**: Integer
- **Default**: `10`
- **Purpose**: How long players have to reach an extraction zone once the timer starts
- **Usage**: Set in `module.lua` as `MODULE.ExtractionTime = 10`
- **Note**: Lower values create more intense, time-pressured scenarios

---

### ExtractionPositions

- **Description**: Table of Vector positions where extraction zones are located
- **Type**: Table (Array of Vectors)
- **Default**: `{Vector(-432.219879, -1589.695312, -407.968750),}`
- **Purpose**: Defines the world positions where players can extract
- **Usage**: Set in `module.lua` as `MODULE.ExtractionPositions = {Vector(x, y, z), ...}`
- **Note**: 
  - Each map should have its own extraction positions configured
  - Multiple positions can be added to the table
  - Positions are typically configured per-map in the module initialization

---

