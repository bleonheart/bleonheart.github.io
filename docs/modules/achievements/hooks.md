# Hooks

Hooks provided by the Achievements module for tracking player progress, rewards, and achievement-related events.

---

Overview

The Achievements module provides a comprehensive achievement system that tracks various player activities including kills, item pickups, playtime, deaths, and multi-objective challenges. It includes reward systems, progress tracking, and integration with the server's economy and notification systems. The module provides extensive hook support for customizing achievement behavior, reward distribution, and event handling.

---

### CanPlayerViewAchievements

#### 📋 Purpose
Called to determine if a player can view the achievements menu.

#### ⏰ When Called
When checking if the achievements tab should be displayed in the character menu.

#### ⚙️ Parameters
None

#### ↩️ Returns
*boolean* - Return false to prevent viewing achievements

#### 🌐 Realm
Client

---