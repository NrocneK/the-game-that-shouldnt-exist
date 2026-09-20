# Phase 6 Summary and Phase 7 Handoff

## Project

The Game That Shouldn't Exist

## Phase

Phase 6 — Data-Driven Anomaly Consequences

---

## 1. Phase 6 Goal

Phase 6 moves anomaly investigation consequences out of scene-specific
logic and into anomaly data. An investigated anomaly can now apply multiple
World State consequences in a reusable, testable way.

The implemented flow is:

```text
Player investigates an active anomaly
        ↓
AnomalySystem marks it investigated
        ↓
AnomalyConsequenceSystem applies configured consequences
        ↓
World State receives story flags and NPC states
        ↓
GameScene derives NPC dialogue from World State
```

---

## 2. Implemented Systems

### 2.1 AnomalyInvestigationConsequences

File:

`src/types/anomaly/AnomalyInvestigationConsequences.ts`

Defines the consequences configured for a successful anomaly investigation:

- `storyFlags: string[]`
- `npcStates: Record<string, string>`

This makes a consequence declarative rather than dependent on hardcoded
scene logic.

### 2.2 AnomalyConsequenceSystem

File:

`src/systems/anomaly/AnomalyConsequenceSystem.ts`

Responsibilities:

- Apply every configured story flag through `WorldStateSystem`.
- Apply every configured NPC state through `WorldStateSystem`.
- Keep consequence writing centralized and reusable by future anomalies.

### 2.3 AnomalySystem Integration

File:

`src/systems/anomaly/AnomalySystem.ts`

After a successful `active → investigated` transition, `AnomalySystem`:

1. Keeps the existing automatic `<anomalyId>_investigated` story flag.
2. Applies the anomaly definition's configured investigation consequences.

Consequences are applied only after a successful investigation. A second
investigation still fails and cannot reapply them.

---

## 3. Forest Anomaly Consequences

File:

`src/data/anomalies/forestAnomaly.ts`

Investigating `forest_anomaly_01` now configures the following World State:

```text
storyFlags
    forest_anomaly_01_investigated = true
    starting_forest_changed = true

npcStates
    old_miner = anomaly_investigated
```

`forest_anomaly_01_investigated` is retained for compatibility with the
Phase 5 state model. `starting_forest_changed` is a foundation flag for a
future visible forest consequence.

---

## 4. NPC Dialogue Integration

File:

`src/scenes/GameScene.ts`

Old Miner dialogue selection now checks:

```text
WorldState.npcStates.old_miner === anomaly_investigated
```

When true, the existing `old_miner_anomaly_investigated` dialogue is used.
This preserves the Phase 5 player-facing dialogue while making its selection
depend on a configured World State consequence instead of a scene-specific
story-flag check.

---

## 5. Tests

### 5.1 Added

File:

`src/systems/anomaly/AnomalyConsequenceSystem.test.ts`

Verifies that the system applies multiple story flags and multiple NPC states.

### 5.2 Updated

Files:

- `src/systems/anomaly/AnomalySystem.test.ts`
- `src/systems/anomaly/AnomalyInteractionSystem.test.ts`

The AnomalySystem test verifies that configured consequences are applied on
investigation. The interaction test remains compatible with the extended
anomaly definition.

---

## 6. Validation Results

The following checks passed:

```bash
npx tsc --noEmit
npx tsx src/systems/anomaly/AnomalySystem.test.ts
npx tsx src/systems/anomaly/AnomalyInteractionSystem.test.ts
npx tsx src/systems/anomaly/AnomalyConsequenceSystem.test.ts
npx tsx src/systems/dialogue/DialogueSystem.test.ts
npx tsx src/systems/quest/QuestSystem.test.ts
npx tsx src/systems/rpg/RPGCoreSystem.test.ts
npm run build
git diff --check
```

---

## 7. Phase 6 Completion Status

Phase 6 is complete for its defined scope.

Status:

```text
IMPLEMENTED
TESTED
REGRESSION PASSED
BUILD PASSED
```

---

## 8. Known Limitation

Phase 6 deliberately establishes a reusable consequence foundation. It does
not yet add a new player-visible forest visual, NPC, enemy, quest chain, or
interaction. Therefore the Phase 5 and Phase 6 gameplay flow appears the same
to the player, except that the existing Old Miner reaction is now derived from
the configured NPC World State.

The `starting_forest_changed` flag is currently stored but has no visual or
gameplay consumer. It must not be presented as a completed visible world
change.

---

## 9. Phase 7 Handoff

### 9.1 Starting Point

The project now supports anomaly consequences that can update multiple World
State story flags and NPC states through data definitions.

### 9.2 Suggested Direction

Phase 7 should add one small, visible consumer of
`starting_forest_changed`, using the existing data-driven consequence system.

Possible focused scope:

```text
forest_anomaly_01 investigated
        ↓
starting_forest_changed World State flag
        ↓
visible Starting Forest response
        ↓
clear player feedback that the world changed
```

Suitable Phase 7 implementations include one of the following, after a new
repository review:

- A changed forest ambient visual or environmental marker.
- A new state-driven NPC interaction.
- A small state-driven world object or interaction.

Do not combine all options into one phase unless the repository review and
acceptance criteria explicitly justify it.

### 9.3 Phase 7 Constraints

Remain out of scope unless explicitly planned:

- Save/load persistence between sessions.
- Complex AI.
- Procedural generation.
- Large maps or map streaming.
- Full branching narrative.
- Content-heavy quest chains.
- Final art or audio production.

### 9.4 Required First Step

Before Phase 7 implementation:

1. Review the current repository and this handoff.
2. Verify the committed Phase 6 state.
3. Identify the exact visible consequence to implement.
4. Define acceptance criteria.
5. Identify exact files to create or modify.

Repository code remains the source of truth.
