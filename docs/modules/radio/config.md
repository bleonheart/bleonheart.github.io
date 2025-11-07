# Radio Module Configuration

Comprehensive documentation for all radio system configurations in the Radio module.

---

## Overview

This file contains detailed documentation for every configuration setting in the Radio module. Each configuration entry includes its purpose, description, and expected values.

---

## Configuration Fields

### RequireRadioOperator

- **Description**: Whether players need to be designated as radio operators to use radio functionality
- **Type**: Boolean
- **Default**: false
- **Purpose**: Controls access restrictions for radio usage

---

### EnableEncryptedFrequencies

- **Description**: Whether encrypted radio frequencies are enabled
- **Type**: Boolean
- **Default**: true
- **Purpose**: Allows secure communications on encrypted channels

---

### EnableStaticRadios

- **Description**: Whether static radio entities (radio devices) are available
- **Type**: Boolean
- **Default**: true
- **Purpose**: Enables placement and use of physical radio devices in the world

---

### EnableRadioSWEP

- **Description**: Whether the radio weapon/item is available
- **Type**: Boolean
- **Default**: true
- **Purpose**: Controls if players can equip radio items

---

### isStarWarsRP

- **Description**: Whether this is a Star Wars RP server (affects radio functionality)
- **Type**: Boolean
- **Default**: true
- **Purpose**: Adapts radio system for Star Wars RP gameplay

---

## EncryptedFrequencies Table

- **Description**: Table of encrypted radio frequencies (currently empty)
- **Type**: Table
- **Default**: {}
- **Purpose**: Defines which frequencies require encryption/decryption

---

## PresetFrequencies Table

- **Description**: Table of preset radio frequencies for quick access (currently empty)
- **Type**: Table
- **Default**: {}
- **Purpose**: Stores commonly used frequencies for easy access

---

## WeaponsBlackList Entry

- **Description**: Whether the radio item is blacklisted from weapons systems
- **Type**: Boolean
- **Default**: true
- **Key**: lia.item.WeaponsBlackList["radio"]
- **Purpose**: Prevents radio from being treated as a weapon in weapon management systems

---
