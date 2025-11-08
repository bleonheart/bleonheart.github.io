# Hooks

Hooks provided by the Radio Voice Chat module for communication systems.

---

Overview

The Radio Voice Chat module provides advanced voice communication systems with radio mechanics, frequency management, and communication networks. It includes comprehensive voice chat and communication features. The module provides extensive hook support for customizing radio mechanics, frequency management, voice systems, and communication networks.

---

### ShouldRadioBeep

#### 📋 Purpose
Called to determine if radio beep sounds should play for a listener.

#### ⏰ When Called
When checking if radio end sounds should play for a listener.

#### ⚙️ Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `listener` | **Player** | The player who would hear the beep |

#### ↩️ Returns
*boolean* - Return false to prevent beep sounds

#### 🌐 Realm
Shared

---