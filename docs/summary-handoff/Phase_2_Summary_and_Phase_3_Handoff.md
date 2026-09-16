# The Game That Shouldn’t Exist

## Phase 2 Summary & Phase 3 Handoff

---

# 1. Project Identity

**Project:** The Game That Shouldn’t Exist

**Genre:** 2D RPG Adventure

**World:** Eidolon _(provisional)_

**Technology:**

- TypeScript
- Phaser 4
- Vite
- npm
- Git / GitHub
- Phaser Arcade Physics

**Art Direction:**

- Intentional stick-figure style
- Placeholder assets are acceptable during development
- Gameplay and architecture take priority over visual polish during MVP

**Repository:**

`https://github.com/NrocneK/the-game-that-shouldnt-exist`

**Branch:**

`master`

---

# 2. Project Development Philosophy

The project is being developed using:

- Phase-based development
- Architecture-first approach
- Incremental implementation
- Small validated steps
- Git commits at meaningful milestones
- MVP-first scope control

The user implements the provided changes locally, runs the requested checks, and reports the results.

From **Phase 2.6 onward**, the preferred workflow is:

1. Provide complete new files.
2. Provide complete modifications to existing files.
3. Provide exact commands to run.
4. User copies the changes.
5. User runs/tests the project.
6. User reports the result.
7. Continue to the next step.

The user currently prefers implementation-focused guidance rather than lengthy theoretical explanations. Architecture and theory can be reviewed after the project reaches a more complete state.

---

# 3. Phase 0 Status

## COMPLETE

Phase 0 established the project's foundational design and documentation.

Important decisions:

- MVP scope comes first.
- The MVP mini-boss is **The Broken Miner**.
- Guardian is planned for later.
- **World Sight** is the system/design name.
- Protagonist identity remains a **Narrative Unknown**.
- Stick figures are the official art direction.
- Placeholder art is acceptable during MVP.
- Architecture should remain modular and composition-oriented.
- The game initially appears to be a conventional fantasy RPG.
- Strange inconsistencies, resets, rules, and anomalies gradually reveal the deeper nature of the world.
- The meta element exists inside the game world and should not rely on breaking the fourth wall outside the game.

---

# 4. Phase 1 Status

## COMPLETE

Phase 1 created the smallest technically valid playable vertical slice.

Completed:

- 1.1 Project Foundation
- 1.2 Scene Lifecycle
- 1.3 Asset Pipeline
- 1.4 Runtime State
- 1.5 Module Architecture
- 1.6 Player Entity
- 1.7 World Physics
- 1.8 Player Movement
- 1.9 Camera System
- 1.10 First Playable Build

Scene flow:

```text
BootScene
    ↓
PreloadScene
    ↓
MainMenuScene
    ↓
GameScene
```

Final Phase 1 validation:

```text
npx tsc --noEmit
PASS

npm run build
PASS
```

Vite's large chunk warning was accepted and deferred for later optimization.

---

# 5. Phase 2 Objective

Phase 2 expanded the Phase 1 playable prototype into a basic RPG gameplay loop.

The goal was to establish:

```text
Combat
→ Enemy
→ Damage
→ Death
→ EXP
→ Progression
→ Loot
→ Inventory
→ Equipment
→ Derived Stats
```

Phase 2 was intentionally focused on gameplay-system foundations rather than visual polish.

---

# 6. Phase 2 Completed Steps

## 2.0 Architecture Audit

### STATUS: PASS

The existing architecture was reviewed before expanding the RPG systems.

Important architectural decisions:

- `GameScene` remains responsible for scene-level orchestration.
- Combat logic belongs in combat systems.
- Progression logic belongs in progression systems.
- Inventory logic belongs in inventory systems.
- Equipment logic belongs in equipment systems.
- RPG integration connects the separate systems.
- Avoid turning `GameScene` into a giant gameplay class.

No unnecessary refactor was performed before implementing the required systems.

---

# 7. Phase 2.1 — Combat Foundation

### STATUS: PASS

Created:

```text
src/types/combat/CombatStats.ts
src/types/combat/DamageResult.ts
src/systems/combat/CombatSystem.ts
```

Combat formula:

```text
damage = max(1, attacker.attack - defender.defense)
```

Critical-hit field exists in the result structure but critical-hit logic is not implemented yet.

Example:

```text
Attack: 10
Defense: 3
Damage: 7
```

---

# 8. Phase 2.2 — Enemy Entity

### STATUS: PASS

Created:

```text
src/types/EnemyState.ts
src/entities/enemy/Enemy.ts
```

Enemy supports:

- Position
- HP
- Max HP
- Attack
- Defense
- EXP reward
- Damage
- Death state
- HP display
- Position retrieval
- Combat interaction

The Broken Miner remains the planned MVP mini-boss, while the current enemy is still a prototype/test enemy.

---

# 9. Phase 2.3 — Damage & Death

### STATUS: PASS

Created:

```text
src/types/combat/Damageable.ts
```

Enemy damage behavior:

```text
HP cannot go below 0.
```

Damage against an already defeated enemy is ignored.

Death state:

```text
hp <= 0
```

Runtime damage sequence was validated.

Example:

```text
40
→ 33
→ 26
→ ...
→ 0
```

---

# 10. Phase 2.4 — Combat Gameplay

### STATUS: PASS

Created:

```text
src/types/combat/PositionedTarget.ts
src/types/combat/AttackTarget.ts
src/systems/combat/PlayerCombatSystem.ts
```

Player attack:

```text
A
```

Attack range:

```text
100
```

Prototype cooldown:

```text
300 ms
```

Important:

The 300 ms cooldown is currently a prototype attack delay. It is not yet connected to a future RPG Attack Speed stat.

Combat behavior:

```text
Player
    ↓
Press A
    ↓
Find target in range
    ↓
CombatSystem.attack()
    ↓
Calculate damage
    ↓
Enemy.takeDamage()
```

Validated:

- Target outside range → no attack
- Target inside range → attack
- Damage calculation → correct
- Enemy HP reaches zero
- Defeated enemy cannot continue receiving normal damage

---

# 11. Phase 2.5 — EXP & Progression

### STATUS: COMPLETE

Created:

```text
src/types/progression/ProgressionState.ts
src/types/progression/StatGrowth.ts
src/types/progression/ExperienceReward.ts
src/systems/progression/ProgressionSystem.ts
```

Current prototype progression:

```text
Starting Level: 1
Starting EXP: 0
```

EXP requirement:

```text
level × 100
```

Current stat growth:

```text
Max HP: +10
Attack: +2
Defense: +1
```

The progression system supports multiple level-ups from a large EXP gain.

Enemy EXP reward is claimed only once.

Flow:

```text
Enemy defeated
    ↓
Claim EXP reward
    ↓
ProgressionSystem
    ↓
Add EXP
    ↓
Possible level-up
    ↓
Update PlayerState
```

---

# 12. Phase 2.6 — Loot Foundation

### STATUS: PASS

Created:

```text
src/types/loot/LootItem.ts
src/types/loot/LootTable.ts
src/types/loot/LootState.ts
src/systems/inventory/LootSystem.ts
src/data/enemies/testEnemy.ts
```

Basic loot flow:

```text
Enemy defeated
    ↓
Loot generated
    ↓
Loot collected
    ↓
Inventory updated
```

The current implementation is still a foundation for future loot-table expansion.

---

# 13. Phase 2.7 — Inventory System

### STATUS: PASS

Created:

```text
src/types/inventory/InventoryItem.ts
src/types/inventory/InventoryState.ts
src/systems/inventory/InventorySystem.ts
```

Inventory supports storing item instances/items obtained through the loot flow.

PlayerState inventory was upgraded from the original:

```ts
string[]
```

to structured inventory items.

The current inventory is sufficient as a foundation for later:

- Item stacking
- Item quantities
- Consumables
- Item removal
- Item usage
- Inventory UI

---

# 14. Phase 2.8 — Equipment System

### STATUS: PASS

Created:

```text
src/types/equipment/EquipmentState.ts
src/types/items/ItemType.ts
src/types/items/ItemDefinition.ts
src/data/items/itemDefinitions.ts
src/systems/equipment/EquipmentSystem.ts
```

Equipment slots:

```text
Weapon
Armor
Accessory
```

Prototype controls:

```text
1 → Weapon
2 → Armor
3 → Accessory
0 → Unequip All
```

Equipment affects derived combat stats.

Example:

```text
Base Attack
    +
Weapon Attack Bonus
    =
Effective Attack
```

---

# 15. Equipment Bug Found and Fixed

A runtime bug was discovered during Phase 2 validation.

Original incorrect behavior:

```text
Inventory:
Traveler's Sword x1

Equip Sword
    ↓
Stats increase
    ↓
Sword remains in Inventory
    ↓
Player can equip Sword repeatedly
```

This could cause repeated equipment attempts even though stats should only be applied once.

The intended behavior is now:

```text
Inventory
    ↓
Equip
    ↓
Item removed from Inventory
    ↓
Item stored in Equipment
    ↓
Stats calculated from Equipment
```

If an equipment slot is replaced:

```text
Old equipment
    ↓
Returned to Inventory

New equipment
    ↓
Moved from Inventory to Equipment
```

An already-equipped item should not be repeatedly equipped from Inventory because it is no longer present there.

`Unequip All` should return equipped items to Inventory.

---

# 16. Phase 2.9 — RPG Core Integration

### STATUS: PASS / RUNTIME VALIDATED

Created:

```text
src/systems/rpg/RPGCoreSystem.ts
```

The RPG core connects:

```text
Inventory
Equipment
Progression
Stats
```

Overall flow:

```text
Enemy
  ↓
Combat
  ↓
Death
  ↓
EXP
  ↓
Progression
  ↓
Loot
  ↓
Inventory
  ↓
Equipment
  ↓
Derived Stats
  ↓
Combat
```

This is the core gameplay loop established during Phase 2.

---

# 17. Current Game Runtime

The game currently demonstrates:

```text
Boot
 ↓
Preload
 ↓
Main Menu
 ↓
Game
 ↓
Player movement
 ↓
Enemy encounter
 ↓
Combat
 ↓
Enemy death
 ↓
EXP reward
 ↓
Loot
 ↓
Inventory
 ↓
Equipment
 ↓
Stat modification
```

Runtime logs have demonstrated:

```text
[Combat] Player attacked.
[Progression] Received 25 EXP.
[Loot] Collected.
[Inventory] Updated.
[Equipment] Equipped.
[Equipment] Unequipped all.
```

Equipment bonuses were also observed affecting subsequent attack damage.

---

# 18. Known Non-Blocking Issues

## 18.1 AudioContext warning

Chrome/Phaser may display:

```text
The AudioContext was not allowed to start.
It must be resumed (or created) after a user gesture on the page.
```

This is related to browser autoplay/audio restrictions.

It is not currently blocking the RPG gameplay prototype.

---

## 18.2 Vite bundle warning

The build previously reported a JavaScript chunk larger than 500 kB.

This was accepted for the current MVP/prototype stage.

Optimization can be handled later.

---

## 18.3 CombatSystem.test.ts

There is currently **no**:

```text
src/systems/combat/CombatSystem.test.ts
```

Therefore this command must NOT be used:

```bash
npx tsx src/systems/combat/CombatSystem.test.ts
```

Earlier combat behavior was validated through runtime/manual testing.

Future tests should only reference test files that actually exist.

---

# 19. Phase 2 Final Validation

Before officially closing Phase 2, run:

```bash
npx tsc --noEmit
```

Expected:

```text
Found 0 errors
```

Then:

```bash
npm run build
```

Expected:

```text
Build successful
```

Run the existing unit tests only:

```bash
npx tsx src/systems/inventory/LootSystem.test.ts
```

```bash
npx tsx src/systems/inventory/InventorySystem.test.ts
```

```bash
npx tsx src/systems/equipment/EquipmentSystem.test.ts
```

```bash
npx tsx src/systems/rpg/RPGCoreSystem.test.ts
```

Do not assume that a test exists simply because an earlier instruction mentioned it.

---

# 20. Final Phase 2 Runtime Test

The complete manual test should verify:

```text
1. Start game
2. Find enemy
3. Attack enemy
4. Kill enemy
5. Receive EXP
6. Receive loot
7. Inventory updates
8. Equip weapon
9. Weapon disappears from Inventory
10. Attack damage reflects equipment bonus
11. Try to equip the same item again
12. Item must NOT equip again
13. Stats must NOT stack repeatedly
14. Equip another item in the same slot
15. Previous equipment returns to Inventory
16. New equipment becomes active
17. Unequip All
18. Equipment returns to Inventory
```

---

# 21. Git Milestone

Once Phase 2 validation passes:

```bash
git status
```

Then:

```bash
git add .
```

Commit:

```bash
git commit -m "feat: complete phase 2 rpg systems"
```

Then:

```bash
git push
```

Phase 2 should be considered officially closed after this milestone.

---

# 22. Phase 3 Starting Point

Phase 3 should **not** immediately add random features.

The next phase should build on the RPG foundation established in Phase 2.

Phase 3 should move the project from:

```text
Technical RPG prototype
```

toward:

```text
Playable RPG gameplay experience
```

The exact Phase 3 scope should be established through a Phase 3 planning/audit step before implementation.

Potential areas to evaluate during Phase 3 planning include:

```text
World exploration
NPCs
Dialogue
Quest foundation
Interactable objects
Enemy behavior
Combat improvements
Player feedback
UI/HUD
Map/area structure
Save/load considerations
MVP progression toward The Broken Miner
```

These are candidates for evaluation, not automatically locked requirements.

---

# 23. Important Phase 3 Constraints

Phase 3 must preserve the project's existing principles:

### MVP first

Do not build systems that are not required for the playable experience.

### Modular architecture

Do not move all gameplay logic into `GameScene`.

### Incremental implementation

Each major feature should be implemented and validated separately.

### Avoid premature polish

Do not spend development time on visual polish before the corresponding gameplay system is stable.

### Preserve the game's identity

The game should gradually introduce the strange/anomalous nature of Eidolon rather than revealing everything immediately.

### Do not prematurely implement the entire RPG

The project should grow according to the planned MVP rather than becoming an oversized generic RPG framework.

---

# 24. Current Architecture Snapshot

Current major structure includes:

```text
src/
├── config/
├── data/
│   ├── enemies/
│   └── items/
├── entities/
│   ├── enemy/
│   └── player/
├── scenes/
│   ├── BootScene
│   ├── PreloadScene
│   ├── MainMenuScene
│   └── GameScene
├── systems/
│   ├── camera/
│   ├── combat/
│   ├── equipment/
│   ├── inventory/
│   ├── movement/
│   ├── progression/
│   └── rpg/
├── types/
│   ├── combat/
│   ├── equipment/
│   ├── inventory/
│   ├── items/
│   ├── loot/
│   ├── progression/
│   └── ...
└── ...
```

This structure should be preserved and expanded rather than replaced without a concrete reason.

---

# 25. Phase 3 Handoff Instructions

When starting Phase 3 in a new conversation, treat this document as the authoritative project context.

The starting state is:

```text
Phase 0 → COMPLETE
Phase 1 → COMPLETE
Phase 2 → COMPLETE after final validation
Phase 3 → NOT STARTED
```

Do not restart Phase 1 or Phase 2.

Do not recreate existing systems unless an actual bug or architectural problem requires it.

First perform a Phase 3 planning/audit step using the current project state.

Then define:

```text
Phase 3
 ├── Step 3.0 — Planning / Architecture Audit
 ├── Step 3.1
 ├── Step 3.2
 ├── ...
 └── Phase 3 Validation
```

The exact Step 3.x structure should be decided after reviewing the current Phase 2 state.

---

# 26. Current Development Contract

For implementation steps, provide:

1. **New files**
2. **Complete code for new files**
3. **Existing files that must change**
4. **Exact replacement/addition code**
5. **Commands to test**
6. **Expected result**
7. **Git commit command when the step is complete**

The user will:

```text
Copy
 ↓
Run
 ↓
Test
 ↓
Report
 ↓
Continue
```

Do not assume a test exists unless the file is confirmed to exist.

---

# 27. Final Handoff State

```text
========================================
THE GAME THAT SHOULDN'T EXIST
PHASE 2 HANDOFF
========================================

Phase 0: COMPLETE
Phase 1: COMPLETE
Phase 2: COMPLETE / FINAL VALIDATION

Current RPG systems:

Combat          ✓
Enemy           ✓
Damage          ✓
Death           ✓
EXP             ✓
Progression     ✓
Loot            ✓
Inventory       ✓
Equipment       ✓
RPG Core        ✓

Current gameplay loop:

Enemy
 ↓
Combat
 ↓
Death
 ↓
EXP
 ↓
Progression
 ↓
Loot
 ↓
Inventory
 ↓
Equipment
 ↓
Derived Stats
 ↓
Combat

Next:
PHASE 3
```

---

# 28. Immediate Next Action

Before starting Phase 3 implementation:

```text
1. Finish Phase 2 final validation.
2. Commit Phase 2.
3. Push to GitHub.
4. Start a new Phase 3 planning/audit.
5. Review the current project before adding new features.
```

**Phase 3 must start from the actual current codebase, not from an assumed version of the project.**
