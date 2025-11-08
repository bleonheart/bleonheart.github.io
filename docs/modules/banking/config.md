# Banking Module Configuration

Comprehensive documentation for all banking system configurations in the Banking module.

---

## Overview

This file contains detailed documentation for every configuration setting in the Banking module. The banking system provides bank accounts, deposits, withdrawals, transfers, item storage, check writing, and ATM functionality.

---

## Bank Account Slots

The `lia.banking.BankAccounts` table defines available bank account slots. Each slot has a price and VIP requirement.

### Account Slot Properties

Each account slot contains:
- **price**: Cost in currency units to purchase this account slot
- **vip**: Whether VIP status is required to purchase this slot

### Available Account Slots

- **Slot 1**: Price $1,000, VIP not required
- **Slot 2**: Price $1,000, VIP not required
- **Slot 3**: Price $1,000, VIP not required
- **Slot 4**: Price $1,000, VIP required
- **Slot 5**: Price $1,000, VIP required

---

## Check Types

The `lia.banking.checkTypes` table defines all available check types that players can write. Each check type has visual properties and optional faction restrictions.

### Check Type Properties

Each check type contains:
- **name**: Display name shown to players
- **desc**: Description of the check
- **overlay**: Image path for check overlay (optional)
- **overlayAlpha**: Transparency value for overlay (0-255)
- **overlayColor**: Color applied to overlay (RGB Color)
- **factions**: Array of faction IDs that can use this check (empty table = no restrictions)

### Available Check Types

#### Standard Bank Check (`check_base`)
- **Name**: "Standard Bank Check"
- **Description**: "A paper check that can be written and redeemed at an ATM."
- **Overlay**: None
- **Faction Restrictions**: None

#### Liberty Blue Check (`check_liberty_blue`)
- **Name**: "Liberty Blue Check"
- **Description**: "A paper check that can be written and redeemed at an ATM."
- **Overlay**: `banking/check_liberty_painted_overlay.png`
- **Overlay Alpha**: 102
- **Overlay Color**: Blue (80, 120, 255)
- **Faction Restrictions**: None

#### Liberty Painted Check (`check_liberty_painted`)
- **Name**: "Liberty Painted Check"
- **Description**: "A paper check that can be written and redeemed at an ATM."
- **Overlay**: `banking/check_liberty_painted_overlay.png`
- **Overlay Alpha**: 102
- **Overlay Color**: White (255, 255, 255)
- **Faction Restrictions**: None

#### Emerald Green Check (`check_green`)
- **Name**: "Emerald Green Check"
- **Description**: "A green-tinted check for special occasions."
- **Overlay**: `banking/check_liberty_painted_overlay.png`
- **Overlay Alpha**: 102
- **Overlay Color**: Green (60, 200, 90)
- **Faction Restrictions**: None

#### Crimson Red Check (`check_red`)
- **Name**: "Crimson Red Check"
- **Description**: "A red-tinted check for urgent payments."
- **Overlay**: `banking/check_liberty_painted_overlay.png`
- **Overlay Alpha**: 102
- **Overlay Color**: Red (220, 60, 60)
- **Faction Restrictions**: None

#### Golden Check (`check_gold`)
- **Name**: "Golden Check"
- **Description**: "A luxurious gold-tinted check for VIPs."
- **Overlay**: `banking/check_liberty_painted_overlay.png`
- **Overlay Alpha**: 120
- **Overlay Color**: Gold (255, 215, 60)
- **Faction Restrictions**: None

#### Royal Purple Check (`check_purple`)
- **Name**: "Royal Purple Check"
- **Description**: "A purple-tinted check for special events."
- **Overlay**: `banking/check_liberty_painted_overlay.png`
- **Overlay Alpha**: 102
- **Overlay Color**: Purple (150, 80, 200)
- **Faction Restrictions**: None

---

## Item Bank Settings

### ItemBankWidth

- **Description**: Width in inventory slots for standard item banks
- **Type**: Integer
- **Default**: 10

### ItemBankHeight

- **Description**: Height in inventory slots for standard item banks
- **Type**: Integer
- **Default**: 10

### ItemBankVIPWidth

- **Description**: Width in inventory slots for VIP item banks
- **Type**: Integer
- **Default**: 16

### ItemBankVIPHeight

- **Description**: Height in inventory slots for VIP item banks
- **Type**: Integer
- **Default**: 16

---

## ATM Settings

### ATMModel

- **Description**: Model path for ATM entities
- **Type**: String
- **Default**: `"models/humb_atm.mdl"`

### ATMName

- **Description**: Display name shown for ATM entities
- **Type**: String
- **Default**: "Automated Teller Machine"

### ATMHuman

- **Description**: Whether ATMs use human NPCs instead of entities
- **Type**: Boolean
- **Default**: false

---

## Bank Settings

### BankName

- **Description**: Name of the bank displayed in interfaces
- **Type**: String
- **Default**: "New York City Central Bank"

---

## Paycheck Settings

### PayCheckSalaries

- **Description**: Whether paycheck salaries are enabled
- **Type**: Boolean
- **Default**: true

### GamemodeYear

- **Description**: Year setting for the gamemode (used for check dates)
- **Type**: Integer
- **Default**: 1992

---

## Interest Settings

### InterestEnabled

- **Description**: Whether interest is applied to bank accounts
- **Type**: Boolean
- **Default**: true

### InterestRate

- **Description**: Interest rate percentage applied to accounts
- **Type**: Integer
- **Default**: 5

### InterestDays

- **Description**: Number of days between interest payments
- **Type**: Integer
- **Default**: 7

### InterestMaxAmount

- **Description**: Maximum amount of interest that can be earned per payment
- **Type**: Integer
- **Default**: 10000

