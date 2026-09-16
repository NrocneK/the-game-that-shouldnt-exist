# The Game That Shouldn’t Exist — Phase 2

## Phase 2 implementation

This project contains the Phase 2 implementation through RPG Core Integration:

- 2.0 Architecture Audit
- 2.1 Combat Foundation
- 2.2 Enemy Entity
- 2.3 Damage & Death
- 2.4 Combat Gameplay
- 2.5 EXP & Progression
- 2.6 Loot Foundation
- 2.7 Inventory System
- 2.8 Equipment System
- 2.9 RPG Core Integration

## Important files added/changed

### Loot

```text
src/types/loot/LootItem.ts
src/types/loot/LootTable.ts
src/types/loot/LootState.ts
src/systems/inventory/LootSystem.ts
src/data/enemies/testEnemy.ts
```

Enemy now supports one-time loot claiming through:

```text
src/entities/enemy/Enemy.ts
```

### Inventory

```text
src/types/inventory/InventoryItem.ts
src/types/inventory/InventoryState.ts
src/systems/inventory/InventorySystem.ts
```

Player inventory is now structured as `InventoryItem[]` instead of `string[]` so quantities can stack correctly.

### Equipment

```text
src/types/equipment/EquipmentState.ts
src/systems/equipment/EquipmentSystem.ts
src/types/items/ItemType.ts
src/types/items/ItemDefinition.ts
src/data/items/itemDefinitions.ts
```

MVP equipment slots:

```text
weapon
armor
accessory
```

### RPG Core

```text
src/systems/rpg/RPGCoreSystem.ts
```

This integrates progression, loot, inventory and equipment while keeping their systems separate.

## Install

```bash
npm install
```

## TypeScript

```bash
npx tsc --noEmit
```

Expected: PASS.

## Build

```bash
npm run build
```

Expected: PASS.

A Vite warning about a bundle larger than 500 kB is accepted for Phase 2.

## Unit tests

Run individually:

```bash
npx tsx src/systems/combat/CombatSystem.test.ts
npx tsx src/systems/inventory/LootSystem.test.ts
npx tsx src/systems/inventory/InventorySystem.test.ts
npx tsx src/systems/equipment/EquipmentSystem.test.ts
npx tsx src/systems/rpg/RPGCoreSystem.test.ts
```

Expected final lines:

```text
[Attack Test] ... PASS
[Loot Test] PASS
[Inventory Test] PASS
[Equipment Test] PASS
[RPG Core Test] PASS
```

## Game test

```bash
npm run dev
```

### Combat / EXP / Loot

1. Move to the test Enemy.
2. Press `A` to attack.
3. Outside 100px: console should show `[Combat] No target in range.`
4. Inside 100px: Enemy HP decreases.
5. Kill Enemy: HP reaches `0`.
6. Console should show `Received 25 EXP.`.
7. Loot should be collected once:
   - `health_potion x1`
   - `gold_coin x10`
8. Continue pressing `A` after death. Loot and EXP must not increase again.
9. HUD Inventory should show the collected items.

### Inventory stacking

Unit test:

```text
health_potion x2
+
health_potion x1
=
health_potion x3
```

and:

```text
gold_coin x10
+
gold_coin x5
=
gold_coin x15
```

### Equipment

The GameScene provides temporary Phase 2 validation controls:

```text
1 = Traveler's Sword
2 = Traveler's Cloak
3 = Lucky Ring
0 = Unequip all
```

Before testing, the player starts with one copy of each test equipment item in inventory.

Expected:

```text
1 -> weapon = travelers_sword
2 -> armor = travelers_cloak
3 -> accessory = lucky_ring
0 -> all three slots = null
```

HUD also shows the current equipment and derived stats.

Expected equipment bonuses:

```text
Traveler's Sword: +3 Attack
Traveler's Cloak: +2 Defense
Lucky Ring:       +5 Max HP
```

### RPG integration

The intended flow is:

```text
Enemy defeated
    ↓
EXP reward
    ↓
Progression update
    ↓
Loot claim
    ↓
Inventory stacking
    ↓
Equipment state
    ↓
Derived player stats
```

## Final validation report

```text
Phase 2 Validation

TypeScript: PASS / FAIL
Build: PASS / FAIL
Combat: PASS / FAIL
Enemy: PASS / FAIL
Damage & Death: PASS / FAIL
EXP: PASS / FAIL
Loot: PASS / FAIL
Inventory: PASS / FAIL
Equipment: PASS / FAIL
RPG Core Integration: PASS / FAIL

Errors:
...
```
