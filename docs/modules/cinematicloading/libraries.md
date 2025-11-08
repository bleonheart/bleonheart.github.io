# Libraries

Welcome cinematic system for new players with 5 scenes (Welcome, Character Creation, World Exploration, Social Interaction, Journey Begins) and smooth camera transitions

---

### lia.cinematics.closeWelcomeScreen

#### 📋 Purpose
Close the welcome screen interface.

#### ⏰ When Called
When closing the welcome screen.

#### ⚙️ Parameters
None

#### ↩️ Returns
nil

#### 🌐 Realm
Client

---

### lia.cinematics.createWelcomeScreen

#### 📋 Purpose
Create and display the welcome screen interface.

#### ⏰ When Called
When showing the welcome screen to new players.

#### ⚙️ Parameters
None

#### ↩️ Returns
nil

#### 🌐 Realm
Client

---

### lia.cinematics.drawCinematicHUD

#### 📋 Purpose
Draw the cinematic HUD overlay during scenes.

#### ⏰ When Called
During cinematic rendering.

#### ⚙️ Parameters
None

#### ↩️ Returns
nil

#### 🌐 Realm
Client

---

### lia.cinematics.getCurrentFOV

#### 📋 Purpose
Get the current FOV for the active cinematic scene.

#### ⏰ When Called
When retrieving FOV for camera setup.

#### ⚙️ Parameters
None

#### ↩️ Returns
*number* - Current FOV value (defaults to 75)

#### 🌐 Realm
Client

---

### lia.cinematics.hasPlayerSeenCinematic

#### 📋 Purpose
Check if a player has seen the welcome cinematic.

#### ⏰ When Called
When checking cinematic completion status.

#### ⚙️ Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `ply` | **Player\|nil** | Player to check (nil uses LocalPlayer on client) |

#### ↩️ Returns
*boolean* - True if player has seen cinematic

#### 🌐 Realm
Client/Server

---

### lia.cinematics.onPlayerComplete

#### 📋 Purpose
Handle player completion of the cinematic.

#### ⏰ When Called
When a player finishes the welcome cinematic.

#### ⚙️ Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `ply` | **Player** | The player who completed |

#### ↩️ Returns
nil

#### 🌐 Realm
Server

---

### lia.cinematics.onRequestCharacter

#### 📋 Purpose
Handle character creation request.

#### ⏰ When Called
When requesting character creation cinematic.

#### ⚙️ Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `ply` | **Player** | The player requesting |

#### ↩️ Returns
nil

#### 🌐 Realm
Server

---

### lia.cinematics.progressBarPanel.Paint

#### 📋 Purpose
Paint function for the progress bar panel.

#### ⏰ When Called
During panel rendering.

#### ⚙️ Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `self` | **Panel** | The progress bar panel |
| `w` | **number** | Panel width |
| `h` | **number** | Panel height |

#### ↩️ Returns
nil

#### 🌐 Realm
Client

---

### lia.cinematics.setPlayerCinematicComplete

#### 📋 Purpose
Mark a player as having completed the cinematic.

#### ⏰ When Called
When a player finishes the cinematic.

#### ⚙️ Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `ply` | **Player** | The player to mark |

#### ↩️ Returns
nil

#### 🌐 Realm
Server

---

### lia.cinematics.shouldShowCinematic

#### 📋 Purpose
Check if the cinematic should be shown to a player.

#### ⏰ When Called
When determining if to show cinematic.

#### ⚙️ Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `ply` | **Player\|nil** | Player to check (nil uses LocalPlayer on client) |

#### ↩️ Returns
*boolean* - True if cinematic should be shown

#### 🌐 Realm
Client/Server

---

### lia.cinematics.start

#### 📋 Purpose
Start the welcome cinematic sequence.

#### ⏰ When Called
When beginning the cinematic.

#### ⚙️ Parameters
None

#### ↩️ Returns
nil

#### 🌐 Realm
Client

---

### lia.cinematics.startCharactegamemodeCinematic

#### 📋 Purpose
Start the character creation cinematic.

#### ⏰ When Called
When beginning character creation.

#### ⚙️ Parameters
None

#### ↩️ Returns
nil

#### 🌐 Realm
Client

---

### lia.cinematics.startCharacterCinematic

#### 📋 Purpose
Start the character creation cinematic for a player.

#### ⏰ When Called
When a player requests character creation.

#### ⚙️ Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `ply` | **Player** | The player to start for |

#### ↩️ Returns
nil

#### 🌐 Realm
Server

---

### lia.cinematics.startCharacterSystem

#### 📋 Purpose
Start the character system after welcome screen.

#### ⏰ When Called
When transitioning to character creation.

#### ⚙️ Parameters
None

#### ↩️ Returns
nil

#### 🌐 Realm
Client

---

### lia.cinematics.startCinematicLoop

#### 📋 Purpose
Start the cinematic update loop.

#### ⏰ When Called
When beginning cinematic playback.

#### ⚙️ Parameters
None

#### ↩️ Returns
nil

#### 🌐 Realm
Client

---

### lia.cinematics.startForPlayer

#### 📋 Purpose
Start the welcome cinematic for a specific player.

#### ⏰ When Called
When starting cinematic for a player.

#### ⚙️ Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `ply` | **Player** | The player to start for |

#### ↩️ Returns
nil

#### 🌐 Realm
Server

---

### lia.cinematics.startSceneTransition

#### 📋 Purpose
Start transition to the next cinematic scene.

#### ⏰ When Called
When moving to the next scene.

#### ⚙️ Parameters
None

#### ↩️ Returns
nil

#### 🌐 Realm
Client

---

### lia.cinematics.stop

#### 📋 Purpose
Stop the welcome cinematic sequence.

#### ⏰ When Called
When ending the cinematic.

#### ⚙️ Parameters
None

#### ↩️ Returns
nil

#### 🌐 Realm
Client

---

### lia.cinematics.updateTransition

#### 📋 Purpose
Update camera transition between scenes.

#### ⏰ When Called
During scene transitions.

#### ⚙️ Parameters
None

#### ↩️ Returns
nil

#### 🌐 Realm
Client

---

### lia.cinematics.welcomeScreen.frame.Paint

#### 📋 Purpose
Paint function for the welcome screen frame.

#### ⏰ When Called
During frame rendering.

#### ⚙️ Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `self` | **Panel** | The welcome screen frame |
| `w` | **number** | Frame width |
| `h` | **number** | Frame height |

#### ↩️ Returns
nil

#### 🌐 Realm
Client

---

### lia.cinematics.wrapText

#### 📋 Purpose
Wrap text to fit within a maximum width.

#### ⏰ When Called
When formatting text for display.

#### ⚙️ Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `text` | **string** | Text to wrap |
| `font` | **string** | Font to use for measurement |
| `maxWidth` | **number** | Maximum width in pixels |

#### ↩️ Returns
*table* - Table of wrapped text lines

#### 🌐 Realm
Client

---