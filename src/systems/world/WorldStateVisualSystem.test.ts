import type { WorldState } from '../../types/WorldState';
import type { WorldAreaDefinition } from '../../types/world/WorldArea';
import { WorldStateSystem } from '../state/WorldStateSystem';
import { WorldStateVisualSystem } from './WorldStateVisualSystem';

const worldState: WorldState = {
    currentArea: 'StartingForest',
    storyFlags: {},
    questStates: {},
    npcStates: {},
    triggeredAnomalies: [],
};

const startingForest: WorldAreaDefinition = {
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

const worldStateSystem =
    new WorldStateSystem(worldState);

const system = new WorldStateVisualSystem(
    worldStateSystem,
);

const defaultBackgroundColor = 0x1a1a1a;
const defaultStatusText = 'World: Starting Forest';

console.log(
    'Test 1: default visual state is used before the story flag exists',
);

const initialVisualState = system.getVisualState(
    startingForest,
    defaultBackgroundColor,
    defaultStatusText,
);

if (
    initialVisualState.backgroundColor !==
    defaultBackgroundColor
) {
    throw new Error(
        'FAIL: default background color was not used.',
    );
}

if (
    initialVisualState.statusText !==
    defaultStatusText
) {
    throw new Error(
        'FAIL: default status text was not used.',
    );
}

console.log('PASS');

console.log(
    'Test 2: configured visual state is used after the story flag exists',
);

worldStateSystem.setStoryFlag(
    'starting_forest_changed',
);

const changedVisualState = system.getVisualState(
    startingForest,
    defaultBackgroundColor,
    defaultStatusText,
);

if (
    changedVisualState.backgroundColor !==
    0x241b35
) {
    throw new Error(
        'FAIL: changed background color was not used.',
    );
}

if (
    changedVisualState.statusText !==
    'World: The forest feels different.'
) {
    throw new Error(
        'FAIL: changed status text was not used.',
    );
}

console.log('PASS');

console.log(
    '[World State Visual Test] PASS',
);