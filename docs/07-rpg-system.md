# RPG System

## MVP Stats
- HP
- Attack
- Defense
- Speed

No additional stats unless required.

## Derived Stats
- Max HP = base + level growth + equipment
- Attack = base + level growth + weapon
- Defense = base + level growth + armor

## Level
Start at Level 1.

MVP EXP rule:
`Required EXP = 100 × Current Level`

Level-ups provide modest stat increases.

Equipment and player skill should matter more than level alone.

## Equipment
MVP:
- Weapon
- Armor

Future:
- Head
- Body
- Hands
- Legs
- 2 Accessories

## MVP Items
- Traveler's Sword
- Traveler's Cloak
- Health Potion
- Gold
- Quest items

## Inventory Categories
- Weapons
- Armor
- Accessories
- Consumables
- Quest Items

Item hierarchy:
Item → Weapon / Armor / Accessory / Consumable / QuestItem

## Loot
Loot tables are data-driven.

Example:
Slime:
- Gold
- Slime Gel
- Potion

Each item uses configurable probability.

## Skills
Not MVP, but architecture should allow later:
- Dash Strike
- Guard Break
- Echo Step

## Progression Dimensions
### Power
Level + Stats + Equipment

### Skill
Combat mastery

### Knowledge
World Sight + story discoveries

## Death Persistence
Keep:
- Level
- Equipment
- Inventory
- Story Flags

Temporary world state may reset.

## Architecture Rule
Combat System must not know Inventory internals.
Inventory must not know Quest internals.
Systems communicate through clear interfaces/events.
