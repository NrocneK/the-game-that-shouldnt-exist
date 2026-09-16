# THE GAME THAT SHOULDN'T EXIST
## Phase 1 Completion Summary & Phase 2 Handoff

> Use this document as the handoff context when starting Phase 2 in a new ChatGPT conversation.
> Read it before proposing or implementing Phase 2.

---

## 1. Project Identity

- **Project:** The Game That Shouldn't Exist
- **Genre:** 2D RPG Adventure
- **World:** Eidolon (provisional)
- **Technology:** TypeScript + Phaser 3 + Vite + npm + Git/GitHub
- **Physics:** Phaser Arcade Physics
- **Art direction:** Intentional stick-figure style
- **Development style:** Phase-based, architecture-first, incremental

The game initially appears to be a normal fantasy RPG Adventure. Strange inconsistencies gradually reveal that the world has rules, resets, and anomalies.

The meta element exists **inside the game world only**. There is no external fourth-wall breaking.

---

## 2. Core Narrative Decisions

### Protagonist

- Male stick figure
- Has dialogue
- Real name is hidden and revealed later
- Tone: Adventure + Mystery
- Meta level A: only inside the world
- Initial special ability choice C: a strange ability, represented conceptually by **World Sight**
- He may be an anomaly that was not supposed to exist; this remains a narrative point to develop later

### Major entities

- **The Administrator:** logical system-like entity with Create/Delete/Reset/Modify/Freeze/Rollback abilities
- **The Observer:** mysterious NPC who knows more than he says

### Main mystery progression

1. Who am I?
2. Where am I?
3. Why can I see things others cannot?
4. Why does the world contradict itself?
5. Who is the Administrator?
6. What happened before the Reset?
7. Who was I before the Reset?
8. What should I do with Eidolon?

Potential future endings: Accept, Escape, Rewrite, Delete, and a Secret Ending.

---

## 3. Phase 0 Status

**PHASE 0 = COMPLETE**

Phase 0 established the Story Bible, World, Gameplay, Combat, RPG, Quest/Dialogue, Art Direction, Technical Architecture, MVP Definition, ADRs, and Documentation Audit.

Locked decisions:

- MVP mini-boss = **The Broken Miner**
- Guardian is later content
- World Sight is the system/design name
- Protagonist identity details remain Narrative Unknowns
- Stick figures are the official art style
- Placeholder art is acceptable during MVP
- MVP scope comes first
- Architecture should remain modular and composition-oriented

---

## 4. Phase 1 Objective

Phase 1 goal:

> Build the smallest technically valid playable vertical slice.

Phase 1 was intended to prove:

- Phaser boots
- Scenes transition
- Runtime state exists
- Project architecture exists
- Player entity exists
- Physics world exists
- Player moves and jumps
- Camera follows
- A complete playable flow can be reached

Phase 1 was **not** intended to implement the RPG systems yet.

---

## 5. Phase 1 Results

### 1.1 Project Foundation — PASS

Established Vite, TypeScript, Phaser, npm, Git, and base configuration.

`vite.config.ts` was corrected to export a valid Vite configuration.

Validation passed:

```bash
npx tsc --noEmit
npm run build
```

### 1.2 Scene Lifecycle — PASS

Current scene flow:

```text
BootScene
    ↓
PreloadScene
    ↓
MainMenuScene
    ↓
GameScene
```

Main menu starts the game with SPACE.

### 1.3 Asset Pipeline — PASS

Placeholder texture generation established.

Asset directories:

```text
assets/
├── images/
├── sprites/
├── tilemaps/
├── audio/
└── fonts/
```

### 1.4 Runtime State — PASS

Created:

```text
src/types/PlayerState.ts
src/types/WorldState.ts
src/types/GameState.ts
src/systems/state/GameStateManager.ts
```

State hierarchy:

```text
GameState
├── PlayerState
└── WorldState
```

Player state contains position, HP, level, EXP, stats, inventory, equipment.

World state contains currentArea, storyFlags, questStates, npcStates.

Initial area:

```text
StartingForest
```

### 1.5 Module Architecture — PASS

Current structure:

```text
src/
├── config/
├── data/
│   ├── characters/
│   ├── enemies/
│   ├── items/
│   ├── quests/
│   └── dialogues/
├── entities/
│   ├── player/
│   ├── enemy/
│   └── npc/
├── scenes/
├── systems/
│   ├── combat/
│   ├── dialogue/
│   ├── equipment/
│   ├── inventory/
│   ├── progression/
│   ├── quest/
│   ├── save/
│   ├── state/
│   └── world/
├── types/
└── utils/
```

Event infrastructure:

```text
src/utils/EventBus.ts
src/utils/gameEventBus.ts
```

Architecture rule:

```text
Scenes
   ↓
Systems
   ↓
Domain / Models
   ↓
Data / Constants
```

Horizontal systems should communicate through EventBus rather than tight coupling.

### 1.6 Player Entity — PASS

Created:

```text
src/entities/player/Player.ts
```

Player extends:

```ts
Phaser.Physics.Arcade.Sprite
```

The player currently uses the placeholder texture, has Arcade Physics, collides with world bounds, and has a 48×48 display size.

### 1.7 World Physics — PASS

World:

```text
width  = 2400
height = 720
```

Gravity:

```text
x = 0
y = 800
```

Ground is currently a generated placeholder texture in a static physics group.

Player falls, collides with ground, and remains inside world bounds.

### 1.8 Player Movement — PASS

Created:

```text
src/systems/movement/MovementSystem.ts
```

Controls:

```text
←  Move left
→  Move right
SPACE  Jump
```

Current movement speed: `250`

Current jump velocity: `-500`

Jump uses `JustDown` plus `body.blocked.down`.

MovementSystem also has `disable()`, which stops movement and velocity after prototype completion.

### 1.9 Camera System — PASS

Created:

```text
src/systems/world/CameraSystem.ts
```

Camera follows the player, respects world bounds, and uses smooth follow.

Important implementation detail:

`GameScene` does not retain a `cameraSystem` property because the current CameraSystem performs setup in its constructor.

Current pattern:

```ts
new CameraSystem(
  this,
  this.player,
  worldWidth,
  worldHeight,
);
```

### 1.10 First Playable Build — PASS

Playable flow:

```text
Main Menu
    ↓
Press SPACE
    ↓
GameScene
    ↓
Player Spawn
    ↓
Gravity
    ↓
Ground Collision
    ↓
Move
    ↓
Jump
    ↓
Camera Follow
    ↓
Explore
    ↓
END
    ↓
PROTOTYPE COMPLETE
```

Goal position:

```text
goalX = 2200
```

Reaching the goal displays:

```text
PROTOTYPE COMPLETE
Phase 1 First Playable Build
```

Movement is disabled after completion.

The user manually tested this and confirmed the completion screen appears when reaching END.

---

## 6. Final Phase 1 Validation

Final TypeScript check:

```bash
npx tsc --noEmit
```

Result: **PASS — no errors**

Production build:

```bash
npm run build
```

Result: **PASS**

Vite still reports a non-blocking bundle-size warning:

```text
Some chunks are larger than 500 kB after minification.
```

This is accepted for now and is not a Phase 1 failure. Optimization/code splitting is deferred.

---

## 7. Phase 1 Git History

Expected/current history:

```text
<new> feat: complete first playable build
<new> feat: add camera system
<new> feat: add player movement
<new> feat: add world physics foundation
fc796fa feat: add player entity
95c25ca refactor: establish module architecture
4e0a787 feat: add runtime state foundation
d097a02 feat: add asset pipeline foundation
1b21515 feat: add phaser scene lifecycle
0cf854f chore: initialize game project
```

At the start of Phase 2, verify the exact current history with:

```bash
git status
git log --oneline -10
```

Ideally the working tree should be clean.

---

## 8. What Phase 1 Intentionally Did NOT Implement

Do not assume these systems are already implemented merely because their folders exist:

- Enemy system
- Combat system
- Damage
- Hitbox / hurtbox
- Loot
- Inventory gameplay
- Equipment gameplay
- Progression gameplay
- NPC gameplay
- Dialogue gameplay
- Quest gameplay
- Save/load
- World Sight gameplay
- Actual story flags/content
- Mini-boss
- Real character art
- Real environment art
- Dungeon gameplay
- Audio
- Advanced animation

These are future work.

---

## 9. Important Architecture Principles

Do not turn `GameScene.ts` into a giant file.

Prefer:

```text
Scene
  ↓
System
  ↓
Entity / Domain
  ↓
Data
```

Use composition.

Keep static content/data separate from runtime state.

Examples:

```text
CombatSystem
    should NOT know Inventory internals.

InventorySystem
    should NOT know Quest internals.

QuestSystem
    should communicate through events / state.

DialogueSystem
    should communicate with QuestSystem through events/actions.
```

Event naming convention:

```text
domain:action
```

Examples:

```text
enemy:defeated
quest:completed
dialogue:completed
world:areaEntered
worldsight:activated
```

---

## 10. Phase 2 Starting Point

**PHASE 2 HAS NOT STARTED YET.**

The new conversation must treat Phase 1 as **complete and locked**.

Do not restart Phase 1.

Do not immediately write Phase 2 gameplay code.

First perform:

### Phase 2 — Planning / Audit

1. Read this handoff document.
2. Confirm Phase 1 completion.
3. Inspect the current repository structure/code supplied by the user.
4. Compare actual code against the Phase 0 architecture.
5. Identify what Phase 2 should implement first.
6. Define Phase 2 goals and sub-steps.
7. Explain the architecture and learning objective of each step.
8. Then begin implementation.

The exact Phase 2 order should be decided after this audit rather than assumed.

A likely direction is moving from:

```text
TECHNICAL PLAYABLE PROTOTYPE
```

toward:

```text
PLAYABLE RPG CORE
```

Potential systems include:

```text
Player
  ↓
Combat
  ↓
Enemy
  ↓
Damage
  ↓
Death
  ↓
EXP
  ↓
Loot
  ↓
Inventory
  ↓
Equipment
```

followed by:

```text
NPC
  ↓
Dialogue
  ↓
Quest
  ↓
Progression
```

But this is a **candidate direction**, not a locked Phase 2 roadmap.

---

## 11. Development Workflow

The user implements changes locally and reports results.

For every step:

```text
1. Explain goal
2. Explain concept / architecture
3. Provide exact file changes
4. User implements locally
5. User runs:
      npx tsc --noEmit
6. User runs the game
7. User reports result/errors
8. Diagnose if necessary
9. User runs:
      npm run build
10. Git commit
11. Mark step PASS
12. Continue
```

Do not skip a failed step.

If an error occurs:

```text
STOP
↓
Diagnose
↓
Patch
↓
Retest
↓
PASS
↓
Continue
```

The user wants to understand why architectural decisions are made, not merely copy fixes.

---

## 12. Git Workflow

Git guidance should be included at every development stage.

Typical pattern:

```bash
git add .
git commit -m "type: description"
git log --oneline -N
```

Avoid combining multiple unfinished steps into one commit unless explicitly decided.

---

# FINAL HANDOFF STATUS

**PHASE 0 = COMPLETE**  
**PHASE 1 = COMPLETE / LOCKED**  
**PHASE 2 = NOT STARTED**

Next conversation starting point:

> **Begin Phase 2 Planning / Audit from the existing Phase 1 codebase.**
