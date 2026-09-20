# Phase 5 Summary and Phase 6 Handoff

## Project

The Game That Shouldn’t Exist

## Phase

Phase 5 — Anomaly Interaction & World Consequence

---

# 1. Phase 5 Goal

Transform the anomaly from a visual/narrative-only event into an interactive gameplay object.

The player can approach the active anomaly and interact with it using `E`.

Successful investigation changes the persistent in-memory World State and causes the NPC reaction to change.

Target flow:

````text
Quest completed
    ↓
forest_anomaly_01 triggered
    ↓
Anomaly Marker appears
    ↓
Player approaches marker
    ↓
Press E
    ↓
Anomaly investigated
    ↓
forest_anomaly_01_investigated = true
    ↓
Anomaly state = investigated
    ↓
Old Miner dialogue changes
2. Phase 5 Scope
Implemented:
- Explicit anomaly states
- Anomaly investigation
- Interaction range checking
- One-time anomaly investigation
- Persistent World State flag for investigation
- Anomaly visual state change
- NPC reaction based on anomaly investigation state
- GameScene integration
- Regression testing against previous phases
Not implemented:
- Save/load system
- Inventory UI
- Equipment UI
- Quest journal UI
- New map/area
- Complex enemy AI
- Boss system
- Advanced branching dialogue
- Final art/audio
- Procedural world generation
- Persistent data between game sessions
3. Implemented Systems
3.1 AnomalyState
File:
src/types/anomaly/AnomalyState.ts
Defines the anomaly lifecycle:
inactive
active
investigated
Lifecycle:
inactive → active → investigated
An anomaly cannot return to an earlier state during normal Phase 5 gameplay.
3.2 AnomalyDefinition
File:
src/types/anomaly/AnomalyDefinition.ts
An anomaly definition now contains:
- id
- name
- description
- requiredStoryFlag
- worldReaction
- state
The definition provides the static data required by AnomalySystem.
3.3 AnomalySystem
File:
src/systems/anomaly/AnomalySystem.ts
Responsibilities:
- Register anomaly definitions
- Store anomaly runtime states
- Query anomaly definitions
- Query anomaly states
- Determine whether an anomaly can trigger
- Trigger an anomaly
- Investigate an active anomaly
- Check whether an anomaly has been triggered
- Check whether an anomaly has been investigated
Important rules:
Trigger
An anomaly can trigger only when:
state === inactive
and its required story flag exists.
When triggered:
inactive → active
and the anomaly is added to:
WorldState.triggeredAnomalies
Investigation
Anomaly investigation succeeds only when:
state === active
When investigated:
active → investigated
and the following story flag is created:
forest_anomaly_01_investigated = true
An investigated anomaly cannot be investigated again.
4. Anomaly Interaction
4.1 AnomalyInteractionSystem
File:
src/systems/anomaly/AnomalyInteractionSystem.ts
Responsibilities:
- Check whether an anomaly is currently active
- Calculate player/anomaly distance
- Check interaction range
- Execute anomaly investigation
- Prevent interaction while inactive
- Prevent interaction while outside range
- Prevent repeated investigation after the anomaly is investigated
Current interaction range in GameScene:
70 pixels
The system does not handle keyboard input directly.
GameScene continues to use the existing E interaction flow.
5. Forest Anomaly
File:
src/data/anomalies/forestAnomaly.ts
Anomaly:
ID:
forest_anomaly_01
Name:
The Forest That Should Not Be Here
Required story flag:
forest_anomaly_01
Initial state:
inactive
World reaction:
A strange marker has appeared in the forest.
6. Anomaly Marker
File:
src/entities/world/AnomalyMarker.ts
The marker has two visual states.
Active
The marker:
- Pulses
- Changes scale
- Changes alpha
- Visually indicates an active anomaly
Investigated
After investigation:
- Pulsing stops
- Scale returns to normal
- Alpha is stabilized
- Glow/core appearance changes
- Ring becomes more prominent
The marker remains in the world after investigation.
7. World State
File:
src/types/WorldState.ts
World state contains:
currentArea
storyFlags
questStates
npcStates
triggeredAnomalies
Phase 5 uses the existing World State system to persist anomaly investigation during the current game session.
After investigation:
world.storyFlags[
  'forest_anomaly_01_investigated'
] === true
The anomaly itself is also stored as:
investigated
8. NPC Reaction
File:
src/data/npcs/oldMiner.ts
Two anomaly-related dialogue states now exist.
Before investigation:
old_miner_anomaly
Dialogue:
You see it too, don't you?
That thing in the forest was not there before.
Do not go near it yet.
After investigation:
old_miner_anomaly_investigated
Dialogue:
You touched it...
Now the forest feels different.
Whatever that thing is, it knows you are here.
9. GameScene Integration
File:
src/scenes/GameScene.ts
The anomaly is integrated into the existing Phase 3/4 gameplay flow.
The anomaly position is centralized:
x: 850
y: 500
The same position is used for:
- Anomaly Marker
- Interaction distance calculation
This prevents the marker and interaction point from becoming desynchronized.
The player interacts using the existing:
E
interaction key.
After successful investigation:
[World] Forest anomaly investigated.
is logged and the marker changes to its investigated state.
10. Old Miner Dialogue Selection
GameScene.getMinerDialogueId() now prioritizes anomaly investigation state.
Priority:
forest_anomaly_01_investigated
        ↓
old_miner_anomaly_investigated
otherwise:
forest_anomaly_01 triggered
        ↓
old_miner_anomaly
otherwise the normal quest dialogue states are used.
This means the NPC reaction is derived from World State rather than from a temporary local flag.
11. Final Gameplay Flow
The complete Phase 5 gameplay loop is:
Player accepts Miner's Request
        ↓
Player finds Test Enemy
        ↓
Player attacks enemy
        ↓
Enemy defeated
        ↓
EXP + loot received
        ↓
Quest becomes READY
        ↓
Player returns to Old Miner
        ↓
Quest completed
        ↓
forest_anomaly_01 triggered
        ↓
Anomaly Marker appears at (850, 500)
        ↓
Marker pulses
        ↓
Player approaches anomaly
        ↓
Player presses E
        ↓
AnomalyInteractionSystem checks:
    - anomaly is active
    - player is within 70px
        ↓
Anomaly investigated
        ↓
forest_anomaly_01_investigated = true
        ↓
Anomaly state = investigated
        ↓
Marker changes visual state
        ↓
Player talks to Old Miner
        ↓
Old Miner uses:
old_miner_anomaly_investigated
12. Phase 5 Acceptance Tests
All acceptance criteria passed.
12.1 Inactive anomaly
Expected:
inactive anomaly cannot be investigated
Result:
PASS
12.2 Active anomaly in range
Expected:
active anomaly + player within range
→ interaction succeeds
Result:
PASS
12.3 Active anomaly outside range
Expected:
player outside interaction range
→ interaction fails
Result:
PASS
12.4 Investigation state
Expected:
active
→ investigated
Result:
PASS
12.5 Investigation flag
Expected:
forest_anomaly_01_investigated === true
Result:
PASS
12.6 One-time investigation
Expected:
investigated anomaly cannot be investigated again
Result:
PASS
12.7 Old Miner reaction
Expected:
before investigation:
old_miner_anomaly

after investigation:
old_miner_anomaly_investigated
Result:
PASS
13. Regression Tests
The following tests were executed successfully.
npx tsc --noEmit
PASS
npx tsx src/systems/anomaly/AnomalySystem.test.ts
PASS
npx tsx src/systems/anomaly/AnomalyInteractionSystem.test.ts
PASS
npx tsx src/systems/dialogue/DialogueSystem.test.ts
PASS
npx tsx src/systems/quest/QuestSystem.test.ts
PASS
npx tsx src/systems/rpg/RPGCoreSystem.test.ts
PASS
npm run build
PASS
Manual gameplay verification also passed.
Verified in gameplay:
- Combat works
- Enemy defeat works
- EXP reward works
- Loot collection works
- Quest completion works
- Anomaly trigger works
- Anomaly marker appears
- Marker position is correct
- Player can approach the anomaly
- E interaction works
- Anomaly becomes investigated
- Investigated marker changes state
- World State investigation flag is created
- Old Miner reacts to the investigated state
14. Files Added
src/types/anomaly/AnomalyState.ts

src/systems/anomaly/AnomalyInteractionSystem.ts

src/systems/anomaly/AnomalyInteractionSystem.test.ts
15. Files Modified
src/types/anomaly/AnomalyDefinition.ts

src/systems/anomaly/AnomalySystem.ts

src/data/anomalies/forestAnomaly.ts

src/entities/world/AnomalyMarker.ts

src/data/npcs/oldMiner.ts

src/scenes/GameScene.ts

src/types/WorldState.ts

src/systems/state/GameStateManager.ts

src/systems/rpg/RPGCoreSystem.test.ts
Note:
src/systems/state/WorldStateSystem.ts
was implemented during Phase 4 and remained unchanged during Phase 5.
Likewise:
src/systems/world/InteractionSystem.ts
remained unchanged.
The existing E interaction system was reused.
16. Important Technical Notes
16.1 World State remains in-memory
Phase 5 provides persistent state during the current game session.
It does not yet save the state to disk or a database.
Therefore:
forest_anomaly_01_investigated
is not persistent across a full game restart.
Save/load remains future work.
16.2 Anomaly state is separate from story flags
The anomaly runtime state is managed by:
AnomalySystem
while the broader world consequence is represented through:
WorldStateSystem
For the forest anomaly:
AnomalySystem:
forest_anomaly_01 = investigated
and:
WorldState:
forest_anomaly_01_investigated = true
Both are intentionally used.
16.3 No new interaction framework was introduced
Phase 5 reuses the existing E interaction concept.
AnomalyInteractionSystem handles anomaly-specific validation and investigation rather than replacing the general NPC interaction system.
17. Phase 5 Completion Status
Phase 5 is complete.
Status:
IMPLEMENTED
TESTED
REGRESSION PASSED
BUILD PASSED
GAMEPLAY PASSED
The Phase 5 code has been pushed to GitHub.
18. Phase 6 Handoff
18.1 Starting Point
Phase 6 starts from a working RPG foundation containing:
Player
Combat
Enemy
EXP
Level progression
Stats
Loot
Inventory
Equipment
NPC interaction
Dialogue
Quest
World State
Anomaly system
Anomaly interaction
Anomaly consequences
The first anomaly can now transition from:
inactive
→ active
→ investigated
and the investigation changes NPC/world behavior.
18.2 Suggested Phase 6 Direction
Phase 4 originally identified the following future directions:
- Expand world interaction
- Deeper quest/story structure
- Stronger anomaly mechanics
- Persistent world state
- Additional NPCs
- Additional enemies
- Improved RPG progression
- Stronger narrative integration
Phase 5 has now completed the first major step toward these goals by making the anomaly an interactive gameplay object with a world consequence.
Phase 6 should therefore build on this foundation rather than replacing it.
Potential Phase 6 focus:
World State
    ↓
Multiple consequences
    ↓
NPC / Quest / World changes
    ↓
More meaningful player interaction
    ↓
Stronger connection between RPG gameplay
and the game's anomaly narrative
The exact Phase 6 implementation scope must be reviewed against the current repository before coding begins.
19. Phase 6 Constraints
Unless explicitly changed during Phase 6 planning, keep the following out of scope:
- Full save/load system
- Complex AI
- Large-scale procedural generation
- Final production art
- Final audio system
- Multiplayer
- Complex UI framework
- Large-scale map streaming
- Full branching narrative
- Content-heavy quest chains
Phase 6 should continue the architecture-first and incremental development approach used by Phases 1–5.
20. Phase 6 First Step
Before implementing Phase 6:
1. Review the current repository.
2. Review this handoff.
3. Compare the actual repository state against this document.
4. Identify the exact files currently present.
5. Identify discrepancies between repository and handoff.
6. Define the Phase 6 goal and acceptance criteria.
7. Only then begin implementation.
Repository code remains the primary source of truth.
End of Phase 5

Sau khi lưu file, kiểm tra:

```bash
git status
Sau đó commit:
git add docs/summary-handoff/Phase_5_Summary_and_Phase_6_Handoff.md
git commit -m "docs: add phase 5 summary and phase 6 handoff"
git push
````
