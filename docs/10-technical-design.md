# Technical Design

## Stack
- TypeScript
- Phaser 3
- Vite
- npm
- Git / GitHub
- Web
- Phaser Arcade Physics

## Architecture Philosophy
- modular
- data-driven
- event-driven
- minimal over-engineering

## Scenes
MVP:
- BootScene
- PreloadScene
- MainMenuScene
- GameScene

Later:
- PauseScene
- DialogueScene
- InventoryScene
- GameOverScene

## Systems
- CombatSystem
- QuestSystem
- DialogueSystem
- InventorySystem
- EquipmentSystem
- ProgressionSystem
- SaveSystem
- WorldSystem
- EventSystem
- WorldSightSystem later

## Entity Architecture
Prefer composition rather than deep inheritance.

Player:
Health + Combat + Movement + Inventory + Equipment + Progression

Enemy:
Health + Combat + AI + Loot

NPC:
Dialogue + Quest interaction + Relationship later

## Event Naming
Use:
`domain:action`

Examples:
- `player:damaged`
- `enemy:defeated`
- `quest:completed`
- `dialogue:completed`
- `world:areaEntered`
- `worldsight:activated`

## Data-Driven Content
Static data:
- enemies
- items
- quests
- dialogue
- characters

Runtime state remains separate.

## State
### PlayerState
- position
- HP
- level
- experience
- stats
- inventory
- equipment

### WorldState
- currentArea
- storyFlags
- questStates
- NPC states

### GameState
Player + World

### SaveData
Versioned structure containing Player + World.

MVP persistence:
`localStorage`, hidden behind SaveSystem abstraction.

## Folder Structure
```text
src/
├── main.ts
├── config/
├── scenes/
├── entities/
├── systems/
│   ├── combat/
│   ├── quest/
│   ├── dialogue/
│   ├── inventory/
│   ├── equipment/
│   ├── progression/
│   ├── world/
│   ├── save/
│   └── event/
├── data/
│   ├── enemies/
│   ├── items/
│   ├── quests/
│   ├── dialogue/
│   └── characters/
├── types/
├── utils/
└── constants/

assets/
├── images/
├── sprites/
├── tilemaps/
├── audio/
└── fonts/

docs/
└── adr/
```

## Dependency Rule
Scenes → Systems → Domain / Models → Data / Constants

Systems communicate horizontally through EventBus.

## Explicitly Avoided for MVP
- ECS
- multiplayer
- backend
- database
- cloud save
- DI framework
- custom physics/rendering
- procedural world
