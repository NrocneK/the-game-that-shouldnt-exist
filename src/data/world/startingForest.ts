import type { WorldAreaDefinition } from '../../types/world/WorldArea';

export const startingForest: WorldAreaDefinition = {
    id: 'StartingForest',
    name: 'Starting Forest',
    width: 2400,
    height: 720,
    spawnPoint: {
        x: 200,
        y: 500,
    },
    worldStateVisual: {
        storyFlag: 'starting_forest_changed',
        backgroundColor: 0x241b35,
        statusText: 'World: The forest feels different.',
    },
};