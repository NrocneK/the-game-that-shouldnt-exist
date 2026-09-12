# Quest & Dialogue System

## Quest States
LOCKED → AVAILABLE → ACTIVE → COMPLETED

FAILED can be supported later.

## Quest Types
- Main
- Side
- Hidden
- World Sight

## Data-Driven Objectives
Quest objectives should be data-driven rather than hard-coded into scenes.

## Dialogue
Dialogue is a tree:
NPC → Nodes → Choices → Conditions / Actions → Story Flags

## Story Flags
Examples:
- `hasMetObserver`
- `sawVillageEcho`
- `completedMineQuest`
- `knowsAboutReset`
- `worldSightLevel`
- `administratorEncountered`

## Quest Conditions
Can check:
- level
- items
- story flags
- other progression data

## Quest Events
Quest logic should react to events such as:
- EnemyDefeated
- ItemCollected
- NPCTalked
- AreaEntered
- DialogueCompleted
- BossDefeated
- WorldSightUsed

The Quest System should not contain specific gameplay implementation.

## MVP Quests

### MQ-001 — A Stranger in Greenvale
Edran gives the quest.
Find Milo.
Milo says: “Cậu đến hơi muộn.” then dismisses the statement.

Flag:
`metFirstContradiction = true`

Rewards:
- EXP
- Gold
- Potion

### SQ-001 — Clear the Old Road
Defeat Goblins.
Return to Edran.
Rewards:
- Gold
- EXP

### HQ-001 — The Room That Never Existed
Use World Sight in Greenvale.
Find hidden door.
Enter room.
See an Echo of a child.
Set:
`sawVillageEcho = true`

Edran later denies the room existed.

## Dialogue / Quest Separation
Dialogue System and Quest System are separate.

Dialogue can:
- start quests
- set flags
- branch choices

Quest completion can:
- set flags
- update dialogue availability
- trigger world reactions

## Future
NPC relationship architecture may exist, but romance and complex relationships are not MVP.
