# MVP Definition

## Goal
Create a playable vertical slice that proves the core gameplay loop and architecture.

## Map
- Starting Forest
- Greenvale Village
- Old Road
- Forgotten Mine
- Boss Arena

## Player
- move
- jump
- basic attack
- dodge
- hurt
- death
- HP
- EXP
- Level
- Attack
- Defense
- Speed
- World Sight Stage 1

## Enemies
- Slime
- Goblin Scout

## NPCs
- Edran
- Milo

## Quests
- MQ-001 A Stranger in Greenvale
- SQ-001 Clear the Old Road
- HQ-001 The Room That Never Existed

## Dialogue
- multiple nodes
- choices
- conditions
- story flags

## Combat
- hitbox
- hurtbox
- damage
- knockback
- invulnerability
- state machine

## Mini-Boss
**The Broken Miner**
- simple Phase 1 only

## Dungeon
- exploration
- platforming
- enemies
- lever/key
- locked door
- lore Echo
- mini-boss

## RPG
- Level 1+
- EXP threshold `100 × current Level`
- Traveler's Sword
- Traveler's Cloak
- Health Potion
- Gold

## Save
One localStorage slot.

Persist:
- Player
- Inventory
- Equipment
- Quest State
- Story Flags

## UI
- HP / EXP / Level HUD
- quest panel
- dialogue box

## Audio
- basic BGM
- basic SFX

## Art
Placeholder stick figures/shapes are acceptable.

## Explicitly Out of Scope
- open world
- multiplayer
- online backend
- crafting
- skill tree
- magic system
- combo / parry
- elements / status effects
- complex factions
- romance
- multiple endings
- full Administrator
- full The Null
- World Sight beyond Stage 1
- dozens of enemies/NPCs
- huge inventory
- procedural world

## Architecture Success Criteria
- Add an enemy without editing CombatSystem.
- Add a quest without editing GameScene.
- Add an NPC without editing DialogueSystem.
- Add an item without editing InventorySystem.
