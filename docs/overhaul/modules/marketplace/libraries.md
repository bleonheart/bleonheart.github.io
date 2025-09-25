# Libraries

This page documents the functions for managing marketplace operations, item listings, and trading in the marketplace module.

---

## Overview

The marketplace library (`lia.marketplace`) provides comprehensive functionality for item trading, listing management, and marketplace operations. It handles everything from basic item listing to complex trading transactions and page management.

---

### buyItem

**Purpose**

Processes the purchase of a listed item from the marketplace.

**When Called**

This function is called when:
- A player attempts to buy an item from the marketplace
- Purchase transactions need to be processed
- Item ownership needs to be transferred
- Payment processing is required

**Parameters**

* `objBuyer` (*Player*): The player purchasing the item.
* `strItem_ID` (*string*): The unique ID of the item being purchased.
* `numPage` (*number*): The current page number for UI updates.

**Returns**

*None*

**Realm**

Server.

---

### getCharListings

**Purpose**

Retrieves all marketplace listings for a specific character.

**When Called**

This function is called when:
- Character-specific listings need to be displayed
- Listing management operations are required
- Character inventory synchronization is needed

**Parameters**

* `strChar_ID` (*string*): The character ID to get listings for.
* `callback` (*function*): Callback function to handle the results.

**Returns**

*None*

**Realm**

Server.

---

### getListingInfo

**Purpose**

Retrieves detailed information about a specific marketplace listing.

**When Called**

This function is called when:
- Detailed listing information is needed
- Item verification is required
- Purchase validation is performed

**Parameters**

* `strChar_ID` (*string*): The character ID associated with the listing.
* `strItem_ID` (*string*): The unique ID of the listing.
* `callback` (*function*): Callback function to handle the results.

**Returns**

*None*

**Realm**

Server.

---

### getListings

**Purpose**

Retrieves marketplace listings with pagination support.

**When Called**

This function is called when:
- Marketplace pages need to be loaded
- Listing data needs to be refreshed
- Pagination operations are required

**Parameters**

* `numPage` (*number*): The page number to retrieve (0 for first page).
* `callback` (*function*): Callback function to handle the results.

**Returns**

*None*

**Realm**

Server.

---

### listItem

**Purpose**

Lists an item for sale on the marketplace.

**When Called**

This function is called when:
- Players want to sell items
- Item listing operations are initiated
- Marketplace inventory management is required

**Parameters**

* `objOwner` (*Player*): The player listing the item.
* `numItem_ID` (*number*): The ID of the item to list.
* `numPrice` (*number*): The price to sell the item for.
* `numPage` (*number*): The current page number for UI updates.

**Returns**

*None*

**Realm**

Server.

---

### openMarketplace

**Purpose**

Opens the marketplace interface for a player.

**When Called**

This function is called when:
- Players access the marketplace
- Marketplace UI needs to be initialized
- Listing data needs to be loaded

**Parameters**

* `objPly` (*Player*): The player opening the marketplace.

**Returns**

*None*

**Realm**

Server.

---

### receivePage

**Purpose**

Handles page requests and sends listing data to clients.

**When Called**

This function is called when:
- Players navigate between marketplace pages
- Page data needs to be refreshed
- UI updates are required

**Parameters**

* `objPly` (*Player*): The player requesting the page.
* `numPage` (*number*): The page number being requested.

**Returns**

*None*

**Realm**

Server.

---

### unlistItem

**Purpose**

Removes an item from the marketplace and returns it to the owner.

**When Called**

This function is called when:
- Players want to remove their listings
- Item unlisting operations are required
- Marketplace inventory cleanup is needed

**Parameters**

* `objOwner` (*Player*): The player unlisting the item.
* `strItem_ID` (*string*): The unique ID of the item to unlist.
* `numPage` (*number*): The current page number for UI updates.

**Returns**

*None*

**Realm**

Server.