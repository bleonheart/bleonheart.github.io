# Configuration

Comprehensive documentation for all food and hunger system configurations in the Food module.

---

## Overview

This file contains detailed documentation for every configuration setting in the Food module. The food system manages player hunger and thirst levels, affecting gameplay through stamina regeneration and movement restrictions.

---

## Hunger System Configuration

### HungerTimer

- **Description**: Time interval in seconds between hunger decreases
- **Type**: Integer
- **Default**: 18 seconds
- **Minimum**: 0
- **Maximum**: 60
- **Category**: Hunger
- **Purpose**: Controls how quickly players lose hunger. Lower values mean faster hunger decay.

---

### EnableHungerTimer

- **Description**: Whether the hunger timer system is enabled
- **Type**: Boolean
- **Default**: true
- **Category**: Hunger
- **Purpose**: Allows you to completely disable hunger mechanics if desired

---

### HungerThreshold

- **Description**: The hunger percentage at which stamina stops regenerating
- **Type**: Integer
- **Default**: 10%
- **Minimum**: 0
- **Maximum**: 100
- **Category**: Hunger
- **Purpose**: When hunger drops below this threshold, players cannot regenerate stamina, making them weaker in combat and movement

---

### RefillHungerOnDeath

- **Description**: Whether hunger refills to full when a player dies
- **Type**: Boolean
- **Default**: true
- **Category**: Hunger
- **Purpose**: Controls if players respawn with full hunger or maintain their hunger level after death

---

## Thirst System Configuration

### ThirstTimer

- **Description**: Time interval in seconds between thirst decreases
- **Type**: Integer
- **Default**: 18 seconds
- **Minimum**: 0
- **Maximum**: 60
- **Category**: Hunger (shared category)
- **Purpose**: Controls how quickly players lose thirst. Lower values mean faster thirst decay.

---

### EnableThirstTimer

- **Description**: Whether the thirst timer system is enabled
- **Type**: Boolean
- **Default**: true
- **Category**: Hunger (shared category)
- **Purpose**: Allows you to completely disable thirst mechanics if desired

---

### ThirstThreshold

- **Description**: The thirst percentage at which sprinting is blocked
- **Type**: Integer
- **Default**: 10%
- **Minimum**: 0
- **Maximum**: 100
- **Category**: Hunger (shared category)
- **Purpose**: When thirst drops below this threshold, players cannot sprint, forcing them to walk slowly

---

### RefillThirstOnDeath

- **Description**: Whether thirst refills to full when a player dies
- **Type**: Boolean
- **Default**: true
- **Category**: Hunger (shared category)
- **Purpose**: Controls if players respawn with full thirst or maintain their thirst level after death


