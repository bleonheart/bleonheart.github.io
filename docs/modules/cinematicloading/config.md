# Cinematic Loading Module Configuration

Comprehensive documentation for all cinematic loading system configurations in the Cinematic Loading module.

---

## Overview

This file contains detailed documentation for every configuration setting in the Cinematic Loading module. The cinematic loading system displays welcome scenes to new players with customizable camera positions and timing.

---

## Basic Settings

### enabled

- **Description**: Whether the welcome cinematic system is enabled
- **Type**: Boolean
- **Default**: true

### sceneDuration

- **Description**: Duration in seconds for each cinematic scene
- **Type**: Integer
- **Default**: 8

### transitionDuration

- **Description**: Duration in seconds for transitions between scenes
- **Type**: Integer
- **Default**: 2

### fadeDuration

- **Description**: Duration in seconds for fade in/out effects
- **Type**: Integer
- **Default**: 1

### adminSkip

- **Description**: Whether admins can skip the cinematic
- **Type**: Boolean
- **Default**: false

---

## Cinematic Scenes

The `lia.cinematics.scenes` table defines all welcome scenes shown to new players. Each scene has title, subtitle, description, camera settings, and duration.

### Scene Properties

Each scene contains:
- **title**: Main title text displayed
- **subtitle**: Subtitle text displayed below title
- **description**: Description text explaining the scene
- **camera**: Camera position and angle settings
  - **pos**: Vector position (x, y, z)
  - **ang**: Angle rotation (pitch, yaw, roll)
  - **fov**: Field of view value
- **duration**: Duration in seconds (uses `sceneDuration` if not specified)

### Available Scenes

#### Scene 1: Welcome to Lilia
- **Title**: "Welcome to Lilia"
- **Subtitle**: "The most advanced roleplay framework"
- **Camera Position**: Vector(0, 0, 2000)
- **Camera Angle**: Angle(45, 0, 0)
- **Field of View**: 90

#### Scene 2: Character Creation
- **Title**: "Character Creation"
- **Subtitle**: "Craft your unique identity"
- **Camera Position**: Vector(500, 500, 200)
- **Camera Angle**: Angle(15, 45, 0)
- **Field of View**: 75

#### Scene 3: World Exploration
- **Title**: "World Exploration"
- **Subtitle**: "Discover new horizons"
- **Camera Position**: Vector(2500, 3500, 300)
- **Camera Angle**: Angle(20, 180, 0)
- **Field of View**: 80

#### Scene 4: Social Interaction
- **Title**: "Social Interaction"
- **Subtitle**: "Connect with others"
- **Camera Position**: Vector(-500, 1000, 250)
- **Camera Angle**: Angle(10, 90, 0)
- **Field of View**: 70

#### Scene 5: Your Journey Begins
- **Title**: "Your Journey Begins"
- **Subtitle**: "Welcome to Lilia"
- **Camera Position**: Vector(0, 0, 150)
- **Camera Angle**: Angle(5, 0, 0)
- **Field of View**: 75

