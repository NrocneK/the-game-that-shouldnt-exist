# ADR-004 — Data-Driven Game Content

## Status
Accepted

## Decision
Keep enemies, items, quests, dialogue, and character definitions in data structures/files separate from system logic.

## Reason
Content should be expandable without rewriting core systems.

## Consequence
Adding an enemy or quest should not require editing CombatSystem or GameScene.
