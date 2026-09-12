# ADR-002 — Modular System Architecture

## Status
Accepted

## Decision
Organize game logic into focused systems instead of putting all logic inside scenes or entities.

## Examples
- CombatSystem
- QuestSystem
- DialogueSystem
- InventorySystem
- SaveSystem

## Reason
This keeps responsibilities separated and makes the project easier to extend.

## Consequence
Scenes coordinate presentation/lifecycle while systems own game logic.
