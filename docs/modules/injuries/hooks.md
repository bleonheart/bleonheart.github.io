# Hooks

Hooks provided by the Injuries module for medical and damage systems.

---

Overview

The Injuries module provides advanced medical systems with limb damage, treatment mechanics, and recovery systems. It includes comprehensive health management and medical procedures. The module provides extensive hook support for customizing injury mechanics, treatment processes, recovery systems, and medical procedures.

---

### liaInjuriesPostPlayerRevive

#### 📋 Purpose
Called after a player is successfully revived from death.

#### ⏰ When Called
After a player is revived using a defibrillator or other revival method.

#### ⚙️ Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `targetPlayer` | **Player** | The player who was revived |
| `reviver` | **Player** | The player who performed the revival |

#### ↩️ Returns
nil

#### 🌐 Realm
Server

---