# Libraries

This page documents the functions for managing banking operations, account management, and financial transactions in the banking module.

---

## Overview

The banking library (`lia.banking`) provides comprehensive functionality for bank account management, financial transactions, check processing, and administrative operations. It handles everything from basic account operations to complex financial management and administrative controls.

---

### BankingATMDerma

**Purpose**

Creates and displays the ATM interface for banking operations.

**When Called**

This function is called when:
- Players interact with ATM entities
- Banking interface needs to be opened
- Account management UI is required

**Parameters**

* `id` (*number*): The account number to display in the ATM interface.

**Returns**

*None*

**Realm**

Client.

---

### CanCreateAccount

**Purpose**

Checks if a player can create a new bank account based on current count and permissions.

**When Called**

This function is called when:
- Account creation validation is needed
- Permission checks are required
- Account limit verification is necessary

**Parameters**

* `currentCount` (*number*): The current number of accounts the player has.
* `ply` (*Player*): The player attempting to create an account.

**Returns**

* `boolean`: True if the player can create an account, false otherwise.
* `string*`: Error message if creation is not allowed.

**Realm**

Shared.

---

### generateChecks

**Purpose**

Generates and registers all bank check items in the system.

**When Called**

This function is called when:
- The banking module is initialized
- Check items need to be set up
- Item registration processes occur

**Parameters**

*None*

**Returns**

*None*

**Realm**

Server.

---

### getBankAccountCount

**Purpose**

Retrieves the number of bank accounts for a specific player.

**When Called**

This function is called when:
- Account count validation is needed
- Account limit checks are required
- Account management operations are performed

**Parameters**

* `client` (*Player*): The player to get account count for.
* `callback` (*function*): Callback function to handle the results.

**Returns**

*None*

**Realm**

Server.

---

### GetMaxAccounts

**Purpose**

Returns the maximum number of accounts a player can have.

**When Called**

This function is called when:
- Account limit validation is needed
- Account creation checks are required
- Account management operations are performed

**Parameters**

*None*

**Returns**

* `number`: The maximum number of accounts allowed.

**Realm**

Shared.

---

### GetNextAccountType

**Purpose**

Determines the next account type number based on current count.

**When Called**

This function is called when:
- New account creation is initiated
- Account type determination is needed
- Account numbering is required

**Parameters**

* `currentCount` (*number*): The current number of accounts.

**Returns**

* `number`: The next account type number.

**Realm**

Shared.

---

### OpenAdminPanel

**Purpose**

Opens the administrative banking panel for administrators.

**When Called**

This function is called when:
- Administrators need to access banking controls
- Admin banking operations are required
- Administrative oversight is needed

**Parameters**

*None*

**Returns**

*None*

**Realm**

Client.

---

### OpenCheckViewer

**Purpose**

Opens the check viewer interface to display bank check details.

**When Called**

This function is called when:
- Players want to view check details
- Check information display is needed
- Check verification is required

**Parameters**

* `fieldsData` (*table*): The check data to display.

**Returns**

*None*

**Realm**

Client.

---

### openItemBankCL

**Purpose**

Opens the item bank interface on the client side.

**When Called**

This function is called when:
- Players access item bank storage
- Item bank UI needs to be displayed
- Bank storage operations are required

**Parameters**

* `itemBankID` (*number*): The ID of the item bank to open.

**Returns**

* `boolean*`: True if successful, false otherwise.

**Realm**

Client.

---

### OpenManageMembers

**Purpose**

Opens the member management interface for bank accounts.

**When Called**

This function is called when:
- Account members need to be managed
- Member permission changes are required
- Account administration is needed

**Parameters**

* `accountNumber` (*number*): The account number to manage members for.

**Returns**

*None*

**Realm**

Client.

---

### redeemCheck

**Purpose**

Processes the redemption of a bank check.

**When Called**

This function is called when:
- Players redeem bank checks
- Check processing is required
- Financial transactions are initiated

**Parameters**

* `client` (*Player*): The player redeeming the check.
* `item` (*Item*): The check item being redeemed.

**Returns**

*None*

**Realm**

Server.

---

### refreshBankingUI

**Purpose**

Refreshes the banking user interface with current data.

**When Called**

This function is called when:
- UI updates are needed
- Account data changes occur
- Interface refresh is required

**Parameters**

* `accountID` (*number*): The account ID to refresh data for.

**Returns**

*None*

**Realm**

Client.

---

### sendBankGUI

**Purpose**

Sends the main banking interface to the client.

**When Called**

This function is called when:
- Banking interface needs to be displayed
- Account selection is required
- Main banking UI is needed

**Parameters**

*None*

**Returns**

*None*

**Realm**

Server.

---

### sendCheck

**Purpose**

Sends check data to the client for display.

**When Called**

This function is called when:
- Check information needs to be displayed
- Check viewing is required
- Check data transmission is needed

**Parameters**

* `item` (*Item*): The check item to send data for.

**Returns**

*None*

**Realm**

Server.

---

### ShowAdminAccountDetails

**Purpose**

Displays detailed account information for administrators.

**When Called**

This function is called when:
- Administrative oversight is needed
- Account details are required
- Admin account management is performed

**Parameters**

* `accountData` (*table*): The account data to display.

**Returns**

*None*

**Realm**

Client.

---

### ShowAdminDeleteAccountDialog

**Purpose**

Shows the administrative account deletion confirmation dialog.

**When Called**

This function is called when:
- Administrators need to delete accounts
- Account deletion confirmation is required
- Administrative actions are needed

**Parameters**

* `accountData` (*table*): The account data for the account to be deleted.

**Returns**

*None*

**Realm**

Client.

---

### ShowDeleteAccountDialog

**Purpose**

Shows the account deletion confirmation dialog for players.

**When Called**

This function is called when:
- Players want to delete their accounts
- Account deletion confirmation is needed
- Account management operations are required

**Parameters**

* `id` (*number*): The account ID to delete.
* `parentFrame` (*Panel*): The parent frame for the dialog.

**Returns**

*None*

**Realm**

Client.

---

### ShowDepositDialog

**Purpose**

Shows the deposit dialog for bank accounts.

**When Called**

This function is called when:
- Players want to deposit money
- Deposit operations are initiated
- Account management UI is needed

**Parameters**

* `id` (*number*): The account ID to deposit to.

**Returns**

*None*

**Realm**

Client.

---

### ShowPaycheckDepositDialog

**Purpose**

Shows the paycheck deposit dialog for players.

**When Called**

This function is called when:
- Players want to deposit paychecks
- Paycheck operations are needed
- Salary management is required

**Parameters**

* `accounts` (*table*): The available accounts for deposit.

**Returns**

*None*

**Realm**

Client.

---

### ShowRedeemCheckDialog

**Purpose**

Shows the check redemption dialog for players.

**When Called**

This function is called when:
- Players want to redeem checks
- Check redemption is needed
- Check processing is required

**Parameters**

* `validChecks` (*table*): The valid checks available for redemption.
* `accountID` (*number*): The account ID for deposit (optional).

**Returns**

*None*

**Realm**

Client.

---

### ShowRenameDialog

**Purpose**

Shows the account renaming dialog for players.

**When Called**

This function is called when:
- Players want to rename their accounts
- Account customization is needed
- Account management is required

**Parameters**

* `id` (*number*): The account ID to rename.

**Returns**

*None*

**Realm**

Client.

---

### ShowTransferDialog

**Purpose**

Shows the money transfer dialog for bank accounts.

**When Called**

This function is called when:
- Players want to transfer money
- Transfer operations are needed
- Account management is required

**Parameters**

* `id` (*number*): The source account ID for the transfer.

**Returns**

*None*

**Realm**

Client.

---

### ShowWithdrawDialog

**Purpose**

Shows the withdrawal dialog for bank accounts.

**When Called**

This function is called when:
- Players want to withdraw money
- Withdrawal operations are needed
- Account management is required

**Parameters**

* `id` (*number*): The account ID to withdraw from.

**Returns**

*None*

**Realm**

Client.

---

### validateAccountName

**Purpose**

Validates bank account names for proper formatting and length.

**When Called**

This function is called when:
- Account names need validation
- Input validation is required
- Account creation is performed

**Parameters**

* `name` (*string*): The account name to validate.

**Returns**

* `boolean`: True if the name is valid, false otherwise.
* `string*`: Error message if validation fails.

**Realm**

Shared.

---

### validateAccountNumber

**Purpose**

Validates bank account numbers for proper formatting and range.

**When Called**

This function is called when:
- Account numbers need validation
- Input validation is required
- Account operations are performed

**Parameters**

* `accountNumber` (*number*): The account number to validate.

**Returns**

* `boolean`: True if the number is valid, false otherwise.
* `string*`: Error message if validation fails.

**Realm**

Shared.

---

### validateAmount

**Purpose**

Validates monetary amounts for proper formatting and range.

**When Called**

This function is called when:
- Monetary amounts need validation
- Input validation is required
- Financial operations are performed

**Parameters**

* `amount` (*number*): The amount to validate.

**Returns**

* `boolean`: True if the amount is valid, false otherwise.
* `string*`: Error message if validation fails.

**Realm**

Shared.

---

### validateSteamID

**Purpose**

Validates Steam IDs for proper formatting and structure.

**When Called**

This function is called when:
- Steam IDs need validation
- Input validation is required
- Player identification is needed

**Parameters**

* `steamID` (*string*): The Steam ID to validate.

**Returns**

* `boolean`: True if the Steam ID is valid, false otherwise.
* `string*`: Error message if validation fails.

**Realm**

Shared.

---

### ViewBankAccountAsAdmin

**Purpose**

Opens the administrative view of a bank account for administrators.

**When Called**

This function is called when:
- Administrative oversight is needed
- Account details are required
- Admin account management is performed

**Parameters**

* `accountData` (*table*): The account data to view.

**Returns**

*None*

**Realm**

Client.

---

### writeCheck

**Purpose**

Processes the writing of a bank check.

**When Called**

This function is called when:
- Players write bank checks
- Check creation is required
- Financial transactions are initiated

**Parameters**

* `client` (*Player*): The player writing the check.
* `item` (*Item*): The check item being written.

**Returns**

*None*

**Realm**

Server.
