# Meta

This page documents the functions for managing player animations and bone manipulation in the Lilia framework.

---

## Overview

The animations library (`lia.animations`) provides a comprehensive system for managing player animations through bone manipulation. It serves as the core animation system for roleplay scenarios, allowing players to perform various poses and gestures through predefined bone angle configurations. The library handles animation activation, deactivation, bone manipulation, and movement-based interruption, making it ideal for immersive roleplay experiences.

---

### VelocityIsHigher

**Purpose**

Checks if a player's velocity exceeds a specified threshold in any direction.

**When Called**

This function is called when:
- Movement detection is required for animation interruption
- Velocity-based animation conditions need to be checked
- During animation state validation
- When determining if a player is moving too fast for certain animations

**Parameters**

* `client` (*Player*): The player entity to check velocity for.
* `threshold` (*number*): The velocity threshold to compare against (defaults to 0.1).

**Returns**

* `isHigher` (*boolean*): True if the player's velocity exceeds the threshold in any direction, false otherwise.

**Realm**

Server.

**Example Usage**

```lua
-- Check if player is moving too fast for a stationary animation
if lia.animations.VelocityIsHigher(ply, 5.0) then
    ply:ChatPrint("You're moving too fast for this animation!")
    return
end

-- Check for subtle movement detection
if lia.animations.VelocityIsHigher(ply, 0.1) then
    -- Player is moving, interrupt current animation
    lia.animations.ToggleAnimation(ply, false, "Surrender")
end

-- Use in animation interruption logic
hook.Add("PlayerMove", "CheckAnimationMovement", function(ply, mv)
    local animData = ply:getNetVar("animationData", {})
    if animData.active and lia.animations.VelocityIsHigher(ply, 5) then
        lia.animations.ToggleAnimation(ply, false, animData.class)
    end
end)
```

---

### ApplyAnimation

**Purpose**

Applies bone angle manipulations to a player based on a specific animation class.

**When Called**

This function is called when:
- An animation needs to be visually applied to a player
- During animation state updates in the movement hook
- When toggling animations on or off
- During bone manipulation for pose changes

**Parameters**

* `client` (*Player*): The player entity to apply the animation to.
* `value` (*number*): The multiplier for bone angles (1 for full application, 0 for reset).
* `class` (*string*): The animation class name from AnimationsTable.

**Returns**

*None*

**Realm**

Server.

**Example Usage**

```lua
-- Apply surrender pose to a player
lia.animations.ApplyAnimation(ply, 1, "Surrender")

-- Reset bones for a specific animation
lia.animations.ApplyAnimation(ply, 0, "Cross Arms")

-- Apply animation with custom multiplier for partial effect
lia.animations.ApplyAnimation(ply, 0.5, "Salute")

-- Use in custom animation system
local function applyCustomPose(ply, poseName, intensity)
    if lia.animations.AnimationsTable[poseName] then
        lia.animations.ApplyAnimation(ply, intensity, poseName)
    end
end

-- Apply animation based on player state
hook.Add("PlayerSpawn", "ApplyDefaultPose", function(ply)
    if ply:Team() == TEAM_CITIZEN then
        lia.animations.ApplyAnimation(ply, 1, "Relaxed Pose")
    end
end)
```

---

### ResetBones

**Purpose**

Resets specific bone angles to their default positions for a given bone table.

**When Called**

This function is called when:
- An animation needs to be completely stopped
- Bone angles need to be reset to default positions
- During animation cleanup processes
- When switching between different animations

**Parameters**

* `client` (*Player*): The player entity to reset bones for.
* `boneTable` (*table*): Table containing bone names as keys for bones to reset.

**Returns**

*None*

**Realm**

Server.

**Example Usage**

```lua
-- Reset all bones for surrender animation
local surrenderBones = lia.animations.AnimationsTable["Surrender"].bones
lia.animations.ResetBones(ply, surrenderBones)

-- Reset specific bone set
local customBones = {
    ["ValveBiped.Bip01_R_UpperArm"] = true,
    ["ValveBiped.Bip01_L_UpperArm"] = true
}
lia.animations.ResetBones(ply, customBones)

-- Reset all bones for current animation
local animData = ply:getNetVar("animationData", {})
if animData.class then
    local boneTable = lia.animations.AnimationsTable[animData.class].bones
    lia.animations.ResetBones(ply, boneTable)
end

-- Use in cleanup function
local function stopAllAnimations(ply)
    for animName, animData in pairs(lia.animations.AnimationsTable) do
        if animData.bones then
            lia.animations.ResetBones(ply, animData.bones)
        end
    end
end
```

---

### ToggleAnimation

**Purpose**

Activates or deactivates an animation for a player, managing network variables and bone manipulation.

**When Called**

This function is called when:
- Players manually start or stop animations
- Movement interrupts animations
- Weapon switching occurs
- Animation state needs to be toggled programmatically

**Parameters**

* `client` (*Player*): The player entity to toggle animation for.
* `active` (*boolean*): Whether to activate (true) or deactivate (false) the animation.
* `class` (*string*): The animation class name to toggle.

**Returns**

*None*

**Realm**

Server.

**Example Usage**

```lua
-- Start surrender animation
lia.animations.ToggleAnimation(ply, true, "Surrender")

-- Stop current animation
local animData = ply:getNetVar("animationData", {})
if animData.active then
    lia.animations.ToggleAnimation(ply, false, animData.class)
end

-- Toggle animation based on player input
hook.Add("PlayerSay", "AnimationCommands", function(ply, text)
    local cmd = string.lower(text)
    if cmd == "!surrender" then
        lia.animations.ToggleAnimation(ply, true, "Surrender")
    elseif cmd == "!stop" then
        lia.animations.ToggleAnimation(ply, false, "Surrender")
    end
end)

-- Conditional animation activation
local function startCombatPose(ply)
    if ply:GetActiveWeapon() and ply:GetActiveWeapon():IsValid() then
        lia.animations.ToggleAnimation(ply, true, "Combat Stance")
    end
end

-- Animation with automatic deactivation
timer.Simple(5, function()
    if IsValid(ply) then
        lia.animations.ToggleAnimation(ply, false, "Timed Salute")
    end
end)
```

---

### PerformAnimation

**Purpose**

Performs a specific animation on a player with optional automatic deactivation after a delay.

**When Called**

This function is called when:
- Players use animation commands or interactions
- Timed animations need to be executed
- Animation sequences are triggered programmatically
- Roleplay actions require specific poses

**Parameters**

* `client` (*Player*): The player entity to perform the animation on.
* `name` (*string*): The name of the animation to perform.
* `offDelay` (*number*): Optional delay in seconds before automatically deactivating the animation.

**Returns**

*None*

**Realm**

Server.

**Example Usage**

```lua
-- Perform a simple salute animation
lia.animations.PerformAnimation(ply, "Salute")

-- Perform timed animation that auto-stops after 3 seconds
lia.animations.PerformAnimation(ply, "Timed Salute", 3)

-- Perform animation with custom delay
lia.animations.PerformAnimation(ply, "Cross Arms", 10)

-- Use in command system
local function handleAnimationCommand(ply, animName)
    if lia.animations.AnimationsTable[animName] then
        local offDelay = lia.animations.AnimationsTable[animName].offDelay
        lia.animations.PerformAnimation(ply, animName, offDelay)
    else
        ply:ChatPrint("Animation not found!")
    end
end

-- Perform animation based on player state
hook.Add("PlayerDeath", "DeathAnimation", function(ply)
    if ply:LastHitGroup() == HITGROUP_HEAD then
        lia.animations.PerformAnimation(ply, "Surrender", 0)
    end
end)

-- Animation with validation
local function safePerformAnimation(ply, animName)
    if not ply:isNoClipping() and not ply:getNetVar("restricted") then
        lia.animations.PerformAnimation(ply, animName)
    end
end
```

---

## Rules

- Only document functions from the `lia.animations` namespace.
- Always follow the structure exactly as shown.
- Always write in clear, concise English.
- Always generate **full Markdown pages** ready to be placed in documentation.
- Always provide **extensive usage examples** in GLua code fences.
- Always format code cleanly and consistently.
- Always save documentation files as `lia.animations.md`.
- Never omit any of the sections (Purpose, When Called, Parameters, Returns, Realm, Example Usage).
- Never include comments in code unless they clarify the example's intent.
- Never document hooks, enums, or config variables unless they are explicitly part of the `lia.animations` namespace.
