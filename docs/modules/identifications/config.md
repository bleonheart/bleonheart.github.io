# Identifications Module Configuration

Comprehensive documentation for all identification system configurations in the Identifications module.

---

## Overview

This file contains detailed documentation for every configuration setting in the Identifications module. The identification system manages player character customization options, ID card styles, and physical attribute configurations used when generating identification documents.

---

## Character Customization Configuration

The `lia.identifications.CharacterCustomizationConfig` table defines all customizable character attributes that appear on identification cards. Each attribute can be configured as either a dropdown menu with predefined options or a number input with min/max values.

### Attribute Properties

#### Eye Color (`eye_color`)
- **Type**: Dropdown
- **Options**: Brown, Hazel, Blue, Green, Gray, Amber
- **Purpose**: Sets the character's eye color displayed on ID cards

#### Hair Color (`hair_color`)
- **Type**: Dropdown
- **Options**: Bald, Brown, Blond, Black, Auburn, Red, Gray
- **Purpose**: Sets the character's hair color displayed on ID cards

#### Blood Type (`blood_type`)
- **Type**: Dropdown
- **Options**: O+, O-, A+, A-, B+, B-, AB+, AB-
- **Purpose**: Medical information displayed on ID cards

#### Ethnicity (`ethnicity`)
- **Type**: Dropdown
- **Options**: 50+ options including American, Italian, African, Asian, and various hyphenated combinations
- **Purpose**: Sets the character's ethnic background displayed on ID cards

#### Age (`age`)
- **Type**: Number
- **Minimum**: 18
- **Maximum**: 99
- **Purpose**: Character's age in years

#### Weight (`weight`)
- **Type**: Number
- **Minimum**: 88 lbs
- **Maximum**: 440 lbs
- **Purpose**: Character's weight in pounds

#### Height (`height_in`)
- **Type**: Dropdown
- **Options**: Heights from 55 to 87 inches (4'7" to 7'3")
- **Purpose**: Character's height in inches

#### Background (`background`)
- **Type**: Dropdown
- **Options**: Police, Medical, Business, Citizen
- **Purpose**: Character's professional background

---

## Size Equivalency Table

The `lia.identifications.SizeEquivalencyTable` converts height values (in centimeters) to scale multipliers used for character models. This ensures that character heights match their displayed height values.

### Size Equivalency Properties

The table maps height values (140-220 cm) to model scale values (1.305-1.545).

| Height (cm) | Scale Multiplier |
|-------------|------------------|
| 140 | 1.305 |
| 145 | 1.32 |
| 150 | 1.335 |
| 155 | 1.35 |
| 160 | 1.365 |
| 165 | 1.38 |
| 170 | 1.395 |
| 175 | 1.41 |
| 180 | 1.425 |
| 185 | 1.44 |
| 190 | 1.455 |
| 195 | 1.47 |
| 200 | 1.485 |
| 205 | 1.5 |
| 210 | 1.515 |
| 215 | 1.53 |
| 220 | 1.545 |

---

## ID Card Styles

The `lia.identifications.styles` table defines different visual styles for identification cards. Each style includes a background image, text colors, name pools, and layout positioning.

### ID Style Properties

#### German (`German`)
- **Background**: `identifications/german.png`
- **Text Color**: White
- **Name Pool**: German first names (Hans, Fritz, Klaus, etc.) and surnames (Müller, Schmidt, etc.)
- **Layout**: Standard German ID card layout

#### Miami (`Miami`)
- **Background**: `identifications/miami.png`
- **Text Color**: Dark gray (60, 60, 60)
- **Name Pool**: Spanish/Latin first names (Carlos, Miguel, Antonio, etc.) and surnames (Rodriguez, Garcia, etc.)
- **Layout**: Miami-style ID card layout

#### NYPD (`NYPD`)
- **Background**: `identifications/nypd.png`
- **Text Color**: Dark gray (60, 60, 60)
- **Name Pool**: New York-style first names (Frank, Anthony, Joseph, etc.) and surnames (Rizzo, Moretti, O'Connor, etc.)
- **Layout**: NYPD badge-style layout

#### Southside (`Southside`)
- **Background**: `identifications/southside.png`
- **Text Color**: Dark gray (60, 60, 60)
- **Name Pool**: Southern US first names (Billy, Bobby, Jesse, etc.) and common surnames (Johnson, Williams, Smith, etc.)
- **Layout**: Standard ID card layout

#### New York (`NewYork`)
- **Background**: `identifications/newyork.png`
- **Text Color**: Dark gray (60, 60, 60)
- **Name Pool**: Modern American first names (Peter, Nicholas, Samuel, etc.) and diverse surnames (Bennett, Parker, Baker, etc.)
- **Layout**: New York state ID layout

#### German Dark (`German Dark`)
- **Background**: `identifications/german_dark.png`
- **Text Color**: White
- **Name Pool**: Same as German style
- **Layout**: Dark-themed German ID card layout

#### California (`California`)
- **Background**: `identifications/california.png`
- **Text Color**: Dark gray (60, 60, 60)
- **Name Pool**: California-style first names (Brandon, Tyler, Austin, etc.) and common surnames
- **Layout**: California ID card layout

#### Yorkshire (`Yorkshire`)
- **Background**: `identifications/yorkshire.png`
- **Text Color**: Dark gray (60, 60, 60)
- **Name Pool**: British first names (Harry, Jack, Oliver, etc.) and British surnames (Smith, Johnson, Williams, etc.)
- **Layout**: Yorkshire-style ID card layout

### Layout Configuration

Each style's layout configuration controls where text appears on the ID card:

- **infoPanel**: Controls the information panel positioning
  - `rightMargin`: Margin from right edge
  - `top`: Distance from top
  - `widthFactor`: Width as fraction of card width

- **data**: Controls individual data field positions
  - `x`: Horizontal position for all fields
  - `y`: Vertical positions for each field (name, age, ethnicity, etc.)
  - `gap`: Spacing between fields

- **signature**: Controls signature area positioning
  - `rightPadding`: Padding from right edge
  - `bottomPadding`: Padding from bottom edge


