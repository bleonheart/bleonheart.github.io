# Banking Library

Full banking system with multiple accounts, deposits/withdrawals, transfers, item storage, check writing/redemption, ATMs, and paycheck integration

---

### lia.banking.bankingATMDerma

#### 📋 Purpose
Open the ATM interface for a bank account.

#### ⏰ When Called
When a player accesses an ATM with a bank account.

#### ⚙️ Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `id` | **number** | Bank account number |

#### ↩️ Returns
nil

#### 🌐 Realm
Client

---

### lia.banking.canCreateAccount

#### 📋 Purpose
Check if a player can create a new bank account.

#### ⏰ When Called
When checking account creation eligibility.

#### ⚙️ Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `currentCount` | **number** | Current number of accounts the player has |
| `ply` | **Player** | The player attempting to create an account |

#### ↩️ Returns
*boolean, string\|table* - Success status and error message or account config

#### 🌐 Realm
Shared

---

### lia.banking.generateChecks

#### 📋 Purpose
Generate bank check item definitions from check types.

#### ⏰ When Called
During module initialization to register check items.

#### ⚙️ Parameters
None

#### ↩️ Returns
nil

#### 🌐 Realm
Server

---

### lia.banking.getBankAccountCount

#### 📋 Purpose
Get the total number of bank accounts a player has (owned + member).

#### ⏰ When Called
When checking account limits.

#### ⚙️ Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `client` | **Player** | The player to check |
| `callback` | **function** | Callback function receiving the count |

#### ↩️ Returns
nil

#### 🌐 Realm
Server

---

### lia.banking.getMaxAccounts

#### 📋 Purpose
Get the maximum number of bank accounts a player can have.

#### ⏰ When Called
When checking account limits.

#### ⚙️ Parameters
None

#### ↩️ Returns
*number* - Maximum account count

#### 🌐 Realm
Shared

---

### lia.banking.getNextAccountType

#### 📋 Purpose
Get the next account type number based on current count.

#### ⏰ When Called
When determining which account type to create.

#### ⚙️ Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `currentCount` | **number** | Current number of accounts |

#### ↩️ Returns
*number* - Next account type number

#### 🌐 Realm
Shared

---

### lia.banking.openAdminPanel

#### 📋 Purpose
Open the banking admin panel interface.

#### ⏰ When Called
When an admin wants to manage banking system.

#### ⚙️ Parameters
None

#### ↩️ Returns
nil

#### 🌐 Realm
Client

---

### lia.banking.openCheckViewer

#### 📋 Purpose
Open a check viewer interface to display check details.

#### ⏰ When Called
When viewing a check's details.

#### ⚙️ Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `fieldsData` | **table** | Check field data to display |

#### ↩️ Returns
nil

#### 🌐 Realm
Client

---

### lia.banking.openItemBankCL

#### 📋 Purpose
Open the item bank inventory interface on the client.

#### ⏰ When Called
When accessing an account's item bank.

#### ⚙️ Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `itemBankID` | **number** | Item bank inventory ID |

#### ↩️ Returns
*boolean* - False if failed

#### 🌐 Realm
Client

---

### lia.banking.openManageMembers

#### 📋 Purpose
Open the member management interface for a bank account.

#### ⏰ When Called
When managing account members.

#### ⚙️ Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `accountNumber` | **number** | Bank account number |

#### ↩️ Returns
nil

#### 🌐 Realm
Client

---

### lia.banking.redeemCheck

#### 📋 Purpose
Redeem a bank check item for money.

#### ⏰ When Called
When a player redeems a check.

#### ⚙️ Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `client` | **Player** | The player redeeming |
| `item` | **Item** | The check item |

#### ↩️ Returns
nil

#### 🌐 Realm
Server

---

### lia.banking.refreshBankingUI

#### 📋 Purpose
Refresh the banking UI with updated account data.

#### ⏰ When Called
When updating the banking interface.

#### ⚙️ Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `accountID` | **number** | Bank account number |

#### ↩️ Returns
nil

#### 🌐 Realm
Client

---

### lia.banking.sendBankGUI

#### 📋 Purpose
Send bank account data to a player's client.

#### ⏰ When Called
When opening the banking interface.

#### ⚙️ Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `ply` | **Player** | The player to send data to |

#### ↩️ Returns
nil

#### 🌐 Realm
Server

---

### lia.banking.sendCheck

#### 📋 Purpose
Send check data to clients for display.

#### ⏰ When Called
When displaying check information.

#### ⚙️ Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `item` | **Item** | The check item |

#### ↩️ Returns
nil

#### 🌐 Realm
Server

---

### lia.banking.showAdminAccountDetails

#### 📋 Purpose
Show detailed account information in admin panel.

#### ⏰ When Called
When viewing account details as admin.

#### ⚙️ Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `accountData` | **table** | Account data table |

#### ↩️ Returns
nil

#### 🌐 Realm
Client

---

### lia.banking.showAdminDeleteAccountDialog

#### 📋 Purpose
Show admin dialog for deleting a bank account.

#### ⏰ When Called
When an admin wants to delete an account.

#### ⚙️ Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `accountData` | **table** | Account data to delete |

#### ↩️ Returns
nil

#### 🌐 Realm
Client

---

### lia.banking.showDeleteAccountDialog

#### 📋 Purpose
Show dialog for requesting account deletion.

#### ⏰ When Called
When a player wants to delete their account.

#### ⚙️ Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `id` | **number** | Bank account number |
| `parentFrame` | **Panel\|nil** | Optional parent frame |

#### ↩️ Returns
nil

#### 🌐 Realm
Client

---

### lia.banking.showDepositDialog

#### 📋 Purpose
Show deposit dialog for a bank account.

#### ⏰ When Called
When a player wants to deposit money.

#### ⚙️ Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `id` | **number** | Bank account number |

#### ↩️ Returns
nil

#### 🌐 Realm
Client

---

### lia.banking.showPaycheckDepositDialog

#### 📋 Purpose
Show dialog for depositing paycheck to an account.

#### ⏰ When Called
When depositing a paycheck.

#### ⚙️ Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `accounts` | **table** | Table of available accounts |

#### ↩️ Returns
nil

#### 🌐 Realm
Client

---

### lia.banking.showRedeemCheckDialog

#### 📋 Purpose
Show dialog for selecting a check to redeem.

#### ⏰ When Called
When redeeming checks at an ATM.

#### ⚙️ Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `validChecks` | **table** | Table of valid check data |
| `accountID` | **number\|nil** | Optional account ID for deposit |

#### ↩️ Returns
nil

#### 🌐 Realm
Client

---

### lia.banking.showRenameDialog

#### 📋 Purpose
Show dialog for renaming a bank account.

#### ⏰ When Called
When renaming an account.

#### ⚙️ Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `id` | **number** | Bank account number |

#### ↩️ Returns
nil

#### 🌐 Realm
Client

---

### lia.banking.showTransferDialog

#### 📋 Purpose
Show transfer dialog for transferring money between accounts.

#### ⏰ When Called
When transferring money.

#### ⚙️ Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `id` | **number** | Source bank account number |

#### ↩️ Returns
nil

#### 🌐 Realm
Client

---

### lia.banking.showWithdrawDialog

#### 📋 Purpose
Show withdraw dialog for a bank account.

#### ⏰ When Called
When a player wants to withdraw money.

#### ⚙️ Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `id` | **number** | Bank account number |

#### ↩️ Returns
nil

#### 🌐 Realm
Client

---

### lia.banking.validateAccountName

#### 📋 Purpose
Validate a bank account name.

#### ⏰ When Called
When validating account name input.

#### ⚙️ Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `name` | **string** | Account name to validate |

#### ↩️ Returns
*boolean, string* - Success status and error message if failed

#### 🌐 Realm
Shared

---

### lia.banking.validateAccountNumber

#### 📋 Purpose
Validate a bank account number.

#### ⏰ When Called
When validating account number input.

#### ⚙️ Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `accountNumber` | **number** | Account number to validate |

#### ↩️ Returns
*boolean, string* - Success status and error message if failed

#### 🌐 Realm
Shared

---

### lia.banking.validateAmount

#### 📋 Purpose
Validate a monetary amount.

#### ⏰ When Called
When validating amount input.

#### ⚙️ Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `amount` | **number** | Amount to validate |

#### ↩️ Returns
*boolean, string* - Success status and error message if failed

#### 🌐 Realm
Shared

---

### lia.banking.validateSteamID

#### 📋 Purpose
Validate a SteamID format.

#### ⏰ When Called
When validating SteamID input.

#### ⚙️ Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `steamID` | **string** | SteamID to validate |

#### ↩️ Returns
*boolean, string* - Success status and error message if failed

#### 🌐 Realm
Shared

---

### lia.banking.viewBankAccountAsAdmin

#### 📋 Purpose
View a bank account as an admin.

#### ⏰ When Called
When an admin views an account.

#### ⚙️ Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `accountData` | **table** | Account data table |

#### ↩️ Returns
nil

#### 🌐 Realm
Client

---

### lia.banking.writeCheck

#### 📋 Purpose
Write a bank check item.

#### ⏰ When Called
When a player writes a check.

#### ⚙️ Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `client` | **Player** | The player writing the check |
| `item` | **Item** | The check item |

#### ↩️ Returns
nil

#### 🌐 Realm
Server

---