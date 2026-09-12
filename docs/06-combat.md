# Combat Design

## Player MVP
- Basic Attack
- Dodge
- Jump
- Movement
- Hurt
- Death

## Enemy MVP
- Detection
- Chase
- Attack
- Hurt
- Knockback
- Death

## Combat Components
- Hitbox
- Hurtbox
- Damage
- Knockback
- Invulnerability
- State Machine

## Player Combat State
IDLE ↔ ATTACK  
IDLE ↔ DODGE  
IDLE → HURT → IDLE  
HURT + HP 0 → DEAD

## Attack Phases
1. Startup
2. Active
3. Recovery

## Enemy Telegraphing
Enemy attacks must provide readable warning before damage.

## Damage
`damage = max(1, attacker.Attack - defender.Defense)`

## MVP Mini-Boss
**The Broken Miner**
- Phase 1 only
- simple attacks
- no complex multi-phase system yet

## Future Combat
Not MVP:
- combos
- heavy attacks
- parry
- critical hits
- elements
- status effects
- skill tree
- advanced magic
