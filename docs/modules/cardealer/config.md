# Car Dealer NPC Submodule Configuration

Comprehensive documentation for all car dealer system configurations in the Car Dealer NPC submodule.

---

## Overview

This file contains detailed documentation for every configuration setting in the Car Dealer NPC submodule. The car dealer system allows players to purchase, sell, spawn, and manage vehicles with configurable prices, repair costs, insurance, and customization options.

---

## Vehicles Configuration

The `lia.cardealer.Vehicles` table defines all vehicles available for purchase, their properties, and associated costs.

### Vehicle Properties

Each vehicle entry contains the following fields:

- **Name**: Display name shown to players
- **Category**: Vehicle category/group (e.g., "Muscle Cars", "HL2", "Commercial", "Classic")
- **Price**: Purchase price in currency units
- **factions**: Array of faction IDs that can purchase this vehicle (empty table = no restrictions)
- **vip**: Whether VIP status is required to purchase
- **allowColorChange**: Whether players can change vehicle color
- **allowBodygroupChange**: Whether players can change vehicle bodygroups
- **noBuy**: Whether vehicle can be purchased (true = cannot buy, used for admin/test vehicles)
- **PaintJobPrice**: Cost to change vehicle's paint job
- **RepairTime**: Time in seconds required to repair vehicle
- **RepairCost**: Cost in currency units to repair vehicle
- **InsuranceCost**: Cost in currency units to purchase insurance
- **InsuranceReduction**: Percentage reduction in repair costs when insured (0.5 = 50% reduction)

### Vehicle Structure

```lua
lia.cardealer.Vehicles["vehicle_class"] = {
    Name = "Vehicle Name",
    Category = "Category Name",
    Price = 25000,
    factions = {},
    vip = false,
    allowColorChange = true,
    allowBodygroupChange = true,
    noBuy = false,
    PaintJobPrice = 300,
    RepairTime = 75,
    RepairCost = 75,
    InsuranceCost = 250,
    InsuranceReduction = 0.5
}
```

### Available Vehicles

#### Dukes (`sim_fphys_dukes`)
- **Category**: Muscle Cars
- **Price**: $25,000
- **Paint Job Price**: $300
- **Repair Time**: 75 seconds
- **Repair Cost**: $75
- **Insurance Cost**: $250
- **Insurance Reduction**: 50%
- **Customization**: Color and bodygroup changes allowed

#### HL2 Jeep (`sim_fphys_jeep`)
- **Category**: HL2
- **Price**: $10,000
- **Paint Job Price**: $200
- **Repair Time**: 60 seconds
- **Repair Cost**: $50
- **Insurance Cost**: $150
- **Insurance Reduction**: 50%
- **Customization**: Color changes allowed, bodygroup changes disabled

#### Van (`sim_fphys_van`)
- **Category**: Commercial
- **Price**: $15,000
- **Paint Job Price**: $250
- **Repair Time**: 70 seconds
- **Repair Cost**: $60
- **Insurance Cost**: $200
- **Insurance Reduction**: 50%
- **Customization**: Color and bodygroup changes allowed

#### Trabant (`sim_fphys_pwtrabant02`)
- **Category**: Classic
- **Price**: $8,000
- **Paint Job Price**: $150
- **Repair Time**: 50 seconds
- **Repair Cost**: $40
- **Insurance Cost**: $120
- **Insurance Reduction**: 50%
- **Customization**: Color and bodygroup changes allowed

#### Volga (`sim_fphys_pwvolga`)
- **Category**: Classic
- **Price**: $12,000
- **Paint Job Price**: $180
- **Repair Time**: 55 seconds
- **Repair Cost**: $45
- **Insurance Cost**: $150
- **Insurance Reduction**: 50%
- **Customization**: Color and bodygroup changes allowed



