import type { WorldState } from '../../types/WorldState';
import type { AnomalyDefinition } from '../../types/anomaly/AnomalyDefinition';
import { WorldStateSystem } from '../state/WorldStateSystem';
import { AnomalySystem } from './AnomalySystem';
import { AnomalyInteractionSystem } from './AnomalyInteractionSystem';

const worldState: WorldState = {
    currentArea: 'StartingForest',
    storyFlags: {
        test_flag: true,
    },
    questStates: {},
    npcStates: {},
    triggeredAnomalies: [],
};

const worldStateSystem =
    new WorldStateSystem(worldState);

const anomalySystem =
    new AnomalySystem(
        worldStateSystem,
    );

const interactionSystem =
    new AnomalyInteractionSystem(
        anomalySystem,
    );

const anomaly: AnomalyDefinition = {
    id: 'test_anomaly',
    name: 'Test Anomaly',
    description: 'Test anomaly',
    requiredStoryFlag: 'test_flag',
    worldReaction: 'Test reaction',
    state: 'inactive',
};

anomalySystem.register(anomaly);

console.log(
    'Test 1: inactive anomaly cannot be interacted with',
);

if (
    interactionSystem.canInteract(
        'test_anomaly',
        100,
        100,
        100,
        100,
        50,
    )
) {
    throw new Error(
        'FAIL: inactive anomaly should not be interactable.',
    );
}

console.log('PASS');

console.log(
    'Test 2: active anomaly can be interacted with in range',
);

anomalySystem.trigger(
    'test_anomaly',
);

if (
    !interactionSystem.canInteract(
        'test_anomaly',
        100,
        100,
        120,
        100,
        50,
    )
) {
    throw new Error(
        'FAIL: active anomaly should be interactable within range.',
    );
}

console.log('PASS');

console.log(
    'Test 3: active anomaly cannot be interacted with out of range',
);

if (
    interactionSystem.canInteract(
        'test_anomaly',
        100,
        100,
        200,
        100,
        50,
    )
) {
    throw new Error(
        'FAIL: anomaly should not be interactable outside range.',
    );
}

console.log('PASS');

console.log(
    'Test 4: interaction investigates anomaly',
);

if (
    !interactionSystem.interact(
        'test_anomaly',
        100,
        100,
        120,
        100,
        50,
    )
) {
    throw new Error(
        'FAIL: anomaly interaction should investigate the anomaly.',
    );
}

if (
    anomalySystem.getState(
        'test_anomaly',
    ) !== 'investigated'
) {
    throw new Error(
        'FAIL: anomaly should become investigated.',
    );
}

if (
    !worldStateSystem.hasStoryFlag(
        'test_anomaly_investigated',
    )
) {
    throw new Error(
        'FAIL: investigation story flag should be set.',
    );
}

console.log('PASS');

console.log(
    'Test 5: investigated anomaly cannot be interacted with again',
);

if (
    interactionSystem.interact(
        'test_anomaly',
        100,
        100,
        120,
        100,
        50,
    )
) {
    throw new Error(
        'FAIL: investigated anomaly should not be interactable again.',
    );
}

console.log('PASS');

console.log(
    'All AnomalyInteractionSystem tests passed.',
);