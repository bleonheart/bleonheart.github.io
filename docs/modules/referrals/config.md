# Configuration

Comprehensive documentation for all referral system configurations in the Referrals module.

---

## Overview

This file contains detailed documentation for every configuration setting in the Referrals module. The referral system allows players to refer new players to the server, with both the referrer and the new player receiving rewards.

---

## Basic Settings

### referralReward

- **Description**: Amount of money (or currency) awarded to both the referrer and the new player when a referral is made
- **Type**: Integer
- **Default**: 1000
- **Purpose**: Incentivizes players to invite friends to the server by providing rewards for successful referrals

---

### referralCooldown

- **Description**: Cooldown time in seconds before a player can make another referral
- **Type**: Integer
- **Default**: 0 (no cooldown)
- **Purpose**: Prevents abuse by limiting how frequently players can refer others. Set to 0 to allow unlimited referrals.

---

### enabled

- **Description**: Whether the referral system is enabled
- **Type**: Boolean
- **Default**: false
- **Purpose**: Master toggle to enable or disable the entire referral system. When set to false, the referral system will not function.

---

### maxReferrals

- **Description**: Maximum number of referrals a single player can make
- **Type**: Integer
- **Default**: 1
- **Purpose**: Limits how many people each player can refer. Set to 1 to allow only one referral per player, or increase for multiple referrals.

---

### autoPrompt

- **Description**: Whether new players are automatically prompted to select a referrer when they join
- **Type**: Boolean
- **Default**: true
- **Purpose**: When enabled, new players see a prompt asking who referred them. When disabled, players must manually access the referral system.

---

## User Interface Settings

The `lia.referrals.ui` table contains all text strings displayed in the referral system user interface. These can be customized to match your server's theme or language.

### title

- **Description**: Title text displayed at the top of the referral selection window
- **Type**: String
- **Default**: "Referral System"
- **Purpose**: Main heading for the referral interface

---

### description

- **Description**: Explanatory text shown to players explaining how the referral system works
- **Type**: String
- **Default**: "Select who referred you to the server. You'll both receive rewards!"
- **Purpose**: Helps new players understand what they need to do and what they'll receive

---

### buttonText

- **Description**: Text displayed on the button to select a referrer
- **Type**: String
- **Default**: "Select Referral"
- **Purpose**: Call-to-action text for the main referral button

---

### rewardText

- **Description**: Format string for displaying the reward amount. Use `%d` as a placeholder for the reward amount
- **Type**: String
- **Default**: "Reward: $%d"
- **Purpose**: Shows players how much they'll receive. The `%d` is replaced with the actual reward amount.

---

### noReferralText

- **Description**: Text displayed when a player chooses not to select a referrer
- **Type**: String
- **Default**: "No Referral"
- **Purpose**: Option for players who weren't referred by anyone


