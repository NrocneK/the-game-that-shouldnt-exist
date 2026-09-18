# Phase 4 Summary and Phase 5 Handoff

## Project

The Game That Shouldn’t Exist

## Phase

Phase 4 — World State & Anomaly Foundation

---

# 1. Phase 4 Goal

Phase 4 transforms the anomaly concept from a simple story flag into a
world-state mechanism capable of changing the game world and NPC behavior.

Core flow:

Quest completion
→ World State changes
→ AnomalySystem detects the condition
→ Anomaly is triggered
→ World reacts
→ NPC dialogue reacts to the new world state

---

# 2. Implemented Systems

## 2.1 WorldStateSystem

File:

`src/systems/state/WorldStateSystem.ts`

Responsibilities:

- Manage story flags.
- Query story flags.
- Clear story flags.
- Manage NPC states.
- Manage quest states.
- Mark triggered anomalies.
- Query triggered anomalies.

The WorldState is the source of truth for anomaly trigger state.

---

## 2.2 AnomalySystem

File:

`src/systems/anomaly/AnomalySystem.ts`

Responsibilities:

- Register anomaly definitions.
- Retrieve anomaly definitions.
- Check whether an anomaly can trigger.
- Trigger an anomaly once.
- Query whether an anomaly has already triggered.

The system uses `WorldStateSystem` instead of maintaining a separate
internal trigger-state collection.

This prevents duplicate sources of truth.

---

## 2.3 AnomalyDefinition

File:

`src/types/anomaly/AnomalyDefinition.ts`

An anomaly contains:

- `id`
- `name`
- `description`
- `requiredStoryFlag`
- `worldReaction`

---

## 2.4 Forest Anomaly

File:

`src/data/anomalies/forestAnomaly.ts`

Implemented anomaly:

`forest_anomaly_01`

Name:

`The Forest That Should Not Be Here`

Required story flag:

`forest_anomaly_01`

World reaction:

`A strange marker has appeared in the forest.`

---

## 2.5 World State

File:

`src/types/WorldState.ts`

World state now contains:

- `currentArea`
- `storyFlags`
- `questStates`
- `npcStates`
- `triggeredAnomalies`

Initial state includes an empty:

`triggeredAnomalies: []`

---

# 3. World Reaction

File:

`src/entities/world/AnomalyMarker.ts`

The first concrete world reaction has been implemented.

When:

`forest_anomaly_01`

is triggered, an anomaly marker appears in the Starting Forest.

The marker currently uses placeholder visual elements and a pulse animation.

This is intentionally a foundation rather than final art.

---

# 4. NPC Reaction

File:

`src/data/npcs/oldMiner.ts`

Old Miner now has an additional dialogue state:

`anomaly`

Dialogue ID:

`old_miner_anomaly`

The NPC reacts to the anomaly after it has been triggered.

The dialogue communicates that the strange object in the forest was not
there previously.

---

# 5. GameScene Integration

File:

`src/scenes/GameScene.ts`

Phase 4 integration includes:

- WorldStateSystem initialization.
- AnomalySystem initialization.
- Forest anomaly registration.
- Story flag activation.
- Anomaly triggering.
- Anomaly marker creation.
- NPC dialogue selection based on anomaly state.

The existing Phase 3 quest and dialogue flow remains intact.

---

# 6. Final Gameplay Flow

The current playable loop is:

Old Miner
→ E
→ receive `Miner's Request`

→ find Test Enemy
→ A
→ defeat enemy

→ receive EXP
→ receive loot

→ return to Old Miner
→ E
→ complete quest

→ receive quest EXP reward

→ `forest_anomaly_01` becomes active

→ AnomalySystem triggers anomaly

→ anomaly marker appears in Starting Forest

→ talk to Old Miner again

→ Old Miner reacts to anomaly

---

# 7. Tests

The following tests passed.

## TypeScript

```bash
npx tsc --noEmit
```
