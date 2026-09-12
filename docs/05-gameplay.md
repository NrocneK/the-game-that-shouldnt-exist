# Gameplay Design

## Core Loop
EXPLORE → DISCOVER → FIGHT → DEFEAT → LOOT → UPGRADE → QUEST/STORY → UNLOCK → EXPLORE DEEPER

## Mystery Loop
NORMAL WORLD → NOTICE STRANGE → USE WORLD SIGHT → DISCOVER CONTRADICTION → INVESTIGATE → STORY REVEAL

## Movement MVP
- left
- right
- jump
- attack
- dodge

Later:
- crouch
- climb
- dash

## Combat Philosophy
- easy to learn
- difficult to master
- basic attack + dodge first

## Enemy AI
IDLE → PLAYER DETECTED → CHASE → ATTACK → HURT → DEAD

## Combat
Requires:
- hitbox
- hurtbox
- damage
- knockback
- invulnerability
- state machine
- attack timing

Attack timing:
Startup → Active → Recovery

Damage formula:
`max(1, Attack - Defense)`

## World Sight
MVP implements Stage 1 only:
- reveal hidden paths
- reveal hidden objects
- enable hidden interactions

It should provide an advantage without trivializing exploration or combat.

## Death
Initially normal respawn.
Later, NPCs can remember the protagonist's death.

Story flags persist.

## Save
Persist:
- player state
- equipment
- inventory
- quest state
- story flags

Temporary world state may reset.

## MVP End-to-End Flow
START → Player Spawn → Move → Jump → Explore → Slime → Basic Attack → Enemy Death → Loot → NPC → Dialogue → Quest → Forest → Stronger Enemy → Mini-Boss → Reward → END
