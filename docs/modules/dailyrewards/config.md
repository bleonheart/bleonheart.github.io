# Configuration

Comprehensive documentation for all daily rewards system configurations in the Daily Rewards module.

---

## Overview

This file contains detailed documentation for every configuration setting in the Daily Rewards module. The daily rewards system provides players with daily objectives to complete for rewards, with streak bonuses for consecutive days.

---

## Basic Settings

### minimumActiveTime

- **Description**: Minimum time in seconds players must be active (non-AFK) before they can claim daily rewards
- **Type**: Integer
- **Default**: 1800 (30 minutes)
- **Purpose**: Ensures players are actually playing before claiming rewards, preventing AFK abuse

---

## Reward Amounts

The `rewardAmounts` table defines the base reward amounts for each day of the week (1-7).

| Day | Reward Amount |
|-----|---------------|
| Day 1 | $500 |
| Day 2 | $750 |
| Day 3 | $1000 |
| Day 4 | $1250 |
| Day 5 | $1500 |
| Day 6 | $1750 |
| Day 7 | $2500 |

Rewards cycle weekly, so day 8 uses day 1's reward, day 9 uses day 2's reward, etc.

---

## Streak Bonuses

The `streakBonuses` table defines bonus rewards for maintaining consecutive daily claim streaks.

| Streak Days | Bonus Reward |
|-------------|--------------|
| 14 days | $5,000 |
| 30 days | $10,000 |
| 60 days | $25,000 |
| 90 days | $50,000 |

When players reach these milestone streaks, they receive the bonus reward in addition to their regular daily reward.

---

## Daily Objectives

The `objectives` table defines all available objectives that players can be assigned. Each day, players receive a random selection of 3 objectives from this pool.

### Objective Properties

Each objective contains:
- **id**: Unique identifier for tracking progress
- **name**: Display name shown to players
- **description**: Explanation of what needs to be done
- **target**: Target number that must be reached
- **reward**: Currency reward for completing this objective
- **type**: Category/type of objective
- **jobRequired**: (Optional) Array of job names that can complete this objective

### Available Objectives

#### Traveler (`walk_distance`)
- **Name**: "Traveler"
- **Description**: "Walk 5000 units"
- **Target**: 5000 units
- **Reward**: $250
- **Type**: `distance`

#### Socialite (`chat_messages`)
- **Name**: "Socialite"
- **Description**: "Send 10 chat messages"
- **Target**: 10 messages
- **Reward**: $150
- **Type**: `chat`

#### Dedicated (`play_time`)
- **Name**: "Dedicated"
- **Description**: "Play for 1 hour (non-AFK)"
- **Target**: 3600 seconds (1 hour)
- **Reward**: $300
- **Type**: `playtime`

#### Entrepreneur (`money_earned`)
- **Name**: "Entrepreneur"
- **Description**: "Earn £1000"
- **Target**: 1000 currency units
- **Reward**: $200
- **Type**: `money`

#### Community Member (`interact_players`)
- **Name**: "Community Member"
- **Description**: "Interact with 5 different players"
- **Target**: 5 players
- **Reward**: $200
- **Type**: `interaction`

#### Career Explorer (`job_changes`)
- **Name**: "Career Explorer"
- **Description**: "Change jobs 3 times"
- **Target**: 3 job changes
- **Reward**: $180
- **Type**: `job`

#### Builder (`props_spawned`)
- **Name**: "Builder"
- **Description**: "Spawn 20 props"
- **Target**: 20 props
- **Reward**: $220
- **Type**: `building`

#### Driver (`vehicles_entered`)
- **Name**: "Driver"
- **Description**: "Enter 5 different vehicles"
- **Target**: 5 vehicles
- **Reward**: $200
- **Type**: `vehicle`

#### Law Enforcer (`arrests_made`)
- **Name**: "Law Enforcer"
- **Description**: "Arrest 3 criminals (Police only)"
- **Target**: 3 arrests
- **Reward**: $350
- **Type**: `police`
- **Job Required**: Police

#### Life Saver (`people_healed`)
- **Name**: "Life Saver"
- **Description**: "Heal 5 players (Medic only)"
- **Target**: 5 players healed
- **Reward**: $300
- **Type**: `medic`
- **Job Required**: Medic

#### Property Owner (`doors_purchased`)
- **Name**: "Property Owner"
- **Description**: "Purchase 2 doors"
- **Target**: 2 doors
- **Reward**: $250
- **Type**: `property`

#### Burglar (`lockpicks_used`)
- **Name**: "Burglar"
- **Description**: "Successfully lockpick 3 doors"
- **Target**: 3 lockpicks
- **Reward**: $280
- **Type**: `criminal`

#### Working Class (`paychecks_collected`)
- **Name**: "Working Class"
- **Description**: "Collect 5 paychecks"
- **Target**: 5 paychecks
- **Reward**: $200
- **Type**: `economy`

#### Advertiser (`adverts_placed`)
- **Name**: "Advertiser"
- **Description**: "Place 3 advertisements"
- **Target**: 3 advertisements
- **Reward**: $150
- **Type**: `social`

#### First Responder (`panic_responded`)
- **Name**: "First Responder"
- **Description**: "Respond to 2 panic buttons (Police/Medic)"
- **Target**: 2 panic responses
- **Reward**: $300
- **Type**: `emergency`
- **Job Required**: Police, Medic

#### Experience Gainer (`xp_earned`)
- **Name**: "Experience Gainer"
- **Description**: "Earn 500 XP"
- **Target**: 500 XP
- **Reward**: $250
- **Type**: `progression`

#### Democratic (`vote_participated`)
- **Name**: "Democratic"
- **Description**: "Vote in an election"
- **Target**: 1 vote
- **Reward**: $200
- **Type**: `civic`

#### Outlaw (`crimes_committed`)
- **Name**: "Outlaw"
- **Description**: "Commit 3 crimes without getting arrested"
- **Target**: 3 crimes
- **Reward**: $300
- **Type**: `criminal`

#### Big Spender (`money_spent`)
- **Name**: "Big Spender"
- **Description**: "Spend £2000"
- **Target**: 2000 currency units
- **Reward**: $250
- **Type**: `economy`

#### Sprinter (`sprint_distance`)
- **Name**: "Sprinter"
- **Description**: "Sprint for 2000 units total"
- **Target**: 2000 units
- **Reward**: $180
- **Type**: `movement`

---

## User Interface Configuration

The `ui` table contains all visual styling options for the daily rewards interface.

### Color Settings

- **mainColor**: Color(52, 73, 94) - Main background color
- **accentColor**: Color(41, 128, 185) - Accent/highlight color
- **successColor**: Color(46, 204, 113) - Success/completion color
- **errorColor**: Color(231, 76, 60) - Error/warning color
- **textColor**: Color(236, 240, 241) - Primary text color
- **backgroundColor**: Color(44, 62, 80) - Background panel color
- **buttonColor**: Color(52, 152, 219) - Button default color
- **buttonHoverColor**: Color(41, 128, 185) - Button hover color

### Font Settings

- **fontFamily**: "Roboto" - Font family used throughout the UI
- **titleSize**: 28 - Title font size in pixels
- **subtitleSize**: 20 - Subtitle font size in pixels
- **textSize**: 16 - Regular text font size in pixels
- **smallTextSize**: 14 - Small text font size in pixels

---

## Claim Requirements

To claim the daily reward, players must:
1. Have been active (non-AFK) for at least `minimumActiveTime` seconds
2. Complete all 3 assigned daily objectives
3. Not have already claimed today's reward

Once all requirements are met, players receive:
- Base daily reward (based on day of week)
- Bonus reward if they've reached a streak milestone (14, 30, 60, or 90 days)
- Individual objective rewards (already received when completing each objective)

