# Configuration

Comprehensive documentation for all clearance level configurations in the Clearance module.

---

## Overview

This file contains detailed documentation for every clearance level configuration in the Clearance module. Each clearance level entry includes its purpose, description, and all available configuration fields with their meanings and usage.

---

## ClearanceLevels Configuration

The `MODULE.ClearanceLevels` table defines all available clearance levels from 0 (public access) to 6 (high command access). Each level contains the following fields:

### Field Descriptions

- **title**: The display text shown when players attempt to access doors requiring this clearance level
- **pay**: The salary/payment amount given to players who successfully complete clearance tasks at this level
- **desc**: A detailed description of what access level this clearance provides
- **passes**: The number of security passes required to bypass this clearance level
- **speed**: Object containing min/max speed values for door animations
  - **min**: Minimum door opening/closing speed
  - **max**: Maximum door opening/closing speed
- **width**: Object containing width settings for security indicators
  - **green**: Width of the green security indicator
  - **blue**: Width of the blue security indicator
- **warned**: Boolean indicating if this clearance level shows security warnings

---

### Clearance Level 0 - Public Access

- **title**: "This door has clearance level 0 - Public Access."
- **pay**: 0
- **desc**: "Public access. No clearance restrictions."
- **passes**: 1
- **speed**: { min: 240, max: 360 }
- **width**: { green: 50, blue: 40 }
- **warned**: false

---

### Clearance Level 1 - Enlisted Access

- **title**: "Clearance level 1 required - Enlisted Access."
- **pay**: 25
- **desc**: "Enlisted access for standard operational areas."
- **passes**: 2
- **speed**: { min: 300, max: 360 }
- **width**: { green: 50, blue: 40 }
- **warned**: false

---

### Clearance Level 2 - Junior NCOs Access

- **title**: "Clearance level 2 required - Junior NCOs Access."
- **pay**: 50
- **desc**: "Junior NCOs access for standard operational areas."
- **passes**: 3
- **speed**: { min: 360, max: 480 }
- **width**: { green: 50, blue: 40 }
- **warned**: false

---

### Clearance Level 3 - Senior NCOs Access

- **title**: "Clearance level 3 required - Senior NCOs Access."
- **pay**: 75
- **desc**: "Senior NCOs access for senior operational areas."
- **passes**: 4
- **speed**: { min: 420, max: 540 }
- **width**: { green: 50, blue: 40 }
- **warned**: true

---

### Clearance Level 4 - Junior Officers Access

- **title**: "Clearance level 4 required - Junior Officers Access."
- **pay**: 100
- **desc**: "Junior Officers access for command operational areas."
- **passes**: 5
- **speed**: { min: 480, max: 600 }
- **width**: { green: 50, blue: 40 }
- **warned**: true

---

### Clearance Level 5 - Senior Officers Access

- **title**: "Clearance level 5 required - Senior Officers Access."
- **pay**: 150
- **desc**: "Junior Officers access for senior command operational areas."
- **passes**: 6
- **speed**: { min: 540, max: 660 }
- **width**: { green: 50, blue: 40 }
- **warned**: true

---

### Clearance Level 6 - High Command Access

- **title**: "Clearance level 6 required - High Command Access."
- **pay**: 300
- **desc**: "High Command access for the most restricted operational areas."
- **passes**: 7
- **speed**: { min: 600, max: 720 }
- **width**: { green: 50, blue: 40 }
- **warned**: true

---
