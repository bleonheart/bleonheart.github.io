# Bonemerge System Configuration

This page documents the configuration options and functions for the Lilia Bonemerge system.

---

## Overview

The Lilia Bonemerge system provides comprehensive clothing and character customization through bone merging technology. The system handles gender-specific models, clothing vendors, equipped items persistence, and various clothing accessories. 
---

## Configuration Options

### Map Vendor Origins

**Purpose**

Defines the spawn locations for clothing vendors on specific maps.

**Configuration**

```lua
MODULE.MapVendorOrigins = {
    ["gm_flatgrass"] = Vector(5988.512207, 5295.054688, 72.031250),
    ["gm_construct"] = Vector(1024, 768, 128),
}
```

**Parameters**

* `mapName` (*string*): The map name as returned by `game.GetMap()`.
* `Vector` (*Vector*): The world position where the vendor should spawn.

**Example Usage**

```lua
-- Add vendor location for a new map
MODULE.MapVendorOrigins["rp_downtown_v4c_v2"] = Vector(1000, 2000, 100)

-- Modify existing vendor location
MODULE.MapVendorOrigins["gm_flatgrass"] = Vector(5000, 4000, 50)
```

---

### Adjustable Clothing Slots

**Purpose**

Defines which clothing slots can be adjusted by players using the adjustment system.

**Configuration**

```lua
MODULE.CanAdjust = {
    ["hats"] = true,
    ["glasses"] = true,
    ["neck"] = true,
    ["wrist"] = true,
    ["rightring"] = true,
    ["leftring"] = true,
    ["vest"] = true,
    ["face"] = true,
}
```

**Parameters**

* `slotName` (*string*): The clothing slot identifier.
* `adjustable` (*boolean*): Whether this slot can be adjusted by players.

**Example Usage**

```lua
-- Enable adjustment for additional slots
MODULE.CanAdjust["shoes"] = true
MODULE.CanAdjust["pants"] = true

-- Disable adjustment for a slot
MODULE.CanAdjust["hats"] = false
```

---

### Body Models

**Purpose**

Defines the default body models used for male and female characters when no clothing is equipped.

**Configuration**

```lua
MODULE.BodyModels = {
    male = {
        hands = "models/cultist/arm_set/male_arms.mdl",
        body = "models/cultist/clothing/male/ega_tshirt.mdl",
        legs = "models/cultist/clothing/male/jeans.mdl",
        shoes = "models/cultist/clothing/male/lowtopvans.mdl"
    },
    female = {
        hands = "models/cultist/arm_set/female_arms.mdl",
        body = "models/cultist/clothing/female/aw_femshirt.mdl",
        legs = "models/cultist/clothing/female/zur_femjeans.mdl",
        shoes = "models/cultist/clothing/female/lowtopchucks.mdl"
    }
}
```

**Parameters**

* `gender` (*string*): Either "male" or "female".
* `hands` (*string*): Model path for hand models.
* `body` (*string*): Model path for body/torso models.
* `legs` (*string*): Model path for leg/pants models.
* `shoes` (*string*): Model path for shoe models.

**Example Usage**

```lua
-- Add custom body models
MODULE.BodyModels.male.hands = "models/custom/male_hands.mdl"
MODULE.BodyModels.female.body = "models/custom/female_body.mdl"

-- Add new gender support
MODULE.BodyModels.other = {
    hands = "models/custom/other_arms.mdl",
    body = "models/custom/other_body.mdl",
    legs = "models/custom/other_legs.mdl",
    shoes = "models/custom/other_shoes.mdl"
}
```

---

### Player Models

**Purpose**

Defines the available player models and their associated bodygroup values for proper clothing attachment.

**Configuration**

```lua
MODULE.PlayerModels = {
    ["models/tnb/techcom/brot/male_01.mdl"] = 1,
    ["models/tnb/techcom/brot/male_02.mdl"] = 0,
    ["models/tnb/techcom/brot/male_03.mdl"] = 1,
    -- ... more models
}
```

**Parameters**

* `modelPath` (*string*): The model path for the player model.
* `bodygroupValue` (*number*): The bodygroup value used for clothing attachment (0, 1, or 2).

**Example Usage**

```lua
-- Add new player models
MODULE.PlayerModels["models/custom/player_male.mdl"] = 1
MODULE.PlayerModels["models/custom/player_female.mdl"] = 0

-- Modify existing model bodygroup
MODULE.PlayerModels["models/tnb/techcom/brot/male_01.mdl"] = 2
```

---

### Clothing Models

**Purpose**

Defines all available clothing items with their properties, models, and bonemerge configurations.

**Configuration**

```lua
MODULE.ClothingModels = {
    ["unique_item_id"] = {
        ["Hands"] = 16,
        ["RemoveBody"] = true,
        ["RemoveLegs"] = true,
        ["gender"] = "male",
        ["name"] = "Item Display Name",
        ["price"] = 30,
        ["slot"] = "shirt",
        ["Bonemerge"] = {
            {
                Model = "models/cultist/clothing/male/shirt.mdl",
                Skin = 0,
                Bodygroup = 1
            },
        }
    },
}
```

**Parameters**

* `uniqueID` (*string*): Unique identifier for the clothing item.
* `Hands` (*number*): Hand model ID for this clothing item.
* `RemoveBody` (*boolean*): Whether this item removes the base body model.
* `RemoveLegs` (*boolean*): Whether this item removes the base legs model.
* `gender` (*string*): Gender restriction ("male", "female", or nil for both).
* `name` (*string*): Display name of the clothing item.
* `price` (*number*): Price of the clothing item.
* `slot` (*string*): Clothing slot this item belongs to.
* `Bonemerge` (*table*): Array of bonemerge configurations.

**Bonemerge Configuration**

* `Model` (*string*): Model path for the clothing piece.
* `Skin` (*number*): Skin ID for the model (optional).
* `Bodygroup` (*number*): Bodygroup value for the model (optional).

**Example Usage**

```lua
-- Add a new clothing item
MODULE.ClothingModels["custom_shirt"] = {
    ["Hands"] = 16,
    ["RemoveBody"] = true,
    ["gender"] = "male",
    ["name"] = "Custom Shirt",
    ["price"] = 50,
    ["slot"] = "shirt",
    ["Bonemerge"] = {
        {
            Model = "models/custom/male_shirt.mdl",
            Skin = 1,
            Bodygroup = 0
        },
    }
}

-- Add multi-part clothing
MODULE.ClothingModels["suit_outfit"] = {
    ["Hands"] = 16,
    ["RemoveBody"] = true,
    ["RemoveLegs"] = true,
    ["gender"] = "male",
    ["name"] = "Business Suit",
    ["price"] = 100,
    ["slot"] = "fulloutfit",
    ["Bonemerge"] = {
        {
            Model = "models/custom/suit_jacket.mdl",
        },
        {
            Model = "models/custom/suit_pants.mdl",
        },
    }
}
```

---

### Ties Configuration

**Purpose**

Defines tie accessories that can be worn with certain clothing items.

**Configuration**

```lua
MODULE.Ties = {
    ["tie_red"] = {
        name = "Red Tie",
        desc = "A classic red tie",
        model = "models/custom/red_tie.mdl",
        TieBodygroup = 1,
        price = 25
    },
}
```

**Parameters**

* `tieID` (*string*): Unique identifier for the tie.
* `name` (*string*): Display name of the tie.
* `desc` (*string*): Description of the tie.
* `model` (*string*): Model path for the tie.
* `TieBodygroup` (*number*): Bodygroup value for tie attachment.
* `price` (*number*): Price of the tie.

---

### Suits With Ties

**Purpose**

Defines which clothing models support tie accessories.

**Configuration**

```lua
MODULE.SuitsWithTies = {
    ["models/izosuit/clothes/male/closed_suit.mdl"] = true,
    ["models/izosuit/clothes/male/open_tie_suit.mdl"] = true,
}
```

**Parameters**

* `modelPath` (*string*): The model path that supports ties.
* `supportsTies` (*boolean*): Whether this model supports tie accessories.

---