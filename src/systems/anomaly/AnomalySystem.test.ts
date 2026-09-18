import type { WorldState } from '../../types/WorldState';
import type { AnomalyDefinition } from '../../types/anomaly/AnomalyDefinition';
import { WorldStateSystem } from '../state/WorldStateSystem';
import { AnomalySystem } from './AnomalySystem';

const worldState: WorldState = {
    currentArea: 'StartingForest',
    storyFlags: {},
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

const anomaly: AnomalyDefinition = {
    id: 'forest_anomaly_01',
    name: 'The Forest That Should Not Be Here',
    description:
        'A strange presence has appeared in the Starting Forest.',
    requiredStoryFlag:
        'forest_anomaly_01',
    worldReaction:
        'A strange marker has appeared in the forest.',
};

anomalySystem.register(anomaly);

console.log(
    'Test 1: definition registration',
);

if (
    anomalySystem.getDefinition(
        'forest_anomaly_01',
    ) !== anomaly
) {
    throw new Error(
        'FAIL: anomaly definition was not registered correctly.',
    );
}

console.log('PASS');

console.log(
    'Test 2: anomaly cannot trigger without story flag',
);

if (
    anomalySystem.canTrigger(
        'forest_anomaly_01',
    )
) {
    throw new Error(
        'FAIL: anomaly should not trigger without required story flag.',
    );
}

console.log('PASS');

console.log(
    'Test 3: anomaly can trigger after story flag',
);

worldStateSystem.setStoryFlag(
    'forest_anomaly_01',
);

if (
    !anomalySystem.canTrigger(
        'forest_anomaly_01',
    )
) {
    throw new Error(
        'FAIL: anomaly should be triggerable after story flag is set.',
    );
}

console.log('PASS');

console.log(
    'Test 4: anomaly triggers successfully',
);

const triggered =
    anomalySystem.trigger(
        'forest_anomaly_01',
    );

if (triggered !== anomaly) {
    throw new Error(
        'FAIL: anomaly trigger did not return the correct definition.',
    );
}

console.log('PASS');

console.log(
    'Test 5: world state records triggered anomaly',
);

if (
    !worldStateSystem.hasTriggeredAnomaly(
        'forest_anomaly_01',
    )
) {
    throw new Error(
        'FAIL: world state did not record the triggered anomaly.',
    );
}

console.log('PASS');

console.log(
    'Test 6: anomaly cannot trigger twice',
);

if (
    anomalySystem.canTrigger(
        'forest_anomaly_01',
    )
) {
    throw new Error(
        'FAIL: anomaly should not trigger twice.',
    );
}

if (
    anomalySystem.trigger(
        'forest_anomaly_01',
    ) !== null
) {
    throw new Error(
        'FAIL: second trigger should return null.',
    );
}

console.log('PASS');

console.log(
    'Test 7: unknown anomaly fails safely',
);

if (
    anomalySystem.getDefinition(
        'unknown_anomaly',
    ) !== null
) {
    throw new Error(
        'FAIL: unknown anomaly should return null.',
    );
}

if (
    anomalySystem.canTrigger(
        'unknown_anomaly',
    )
) {
    throw new Error(
        'FAIL: unknown anomaly should not be triggerable.',
    );
}

if (
    anomalySystem.trigger(
        'unknown_anomaly',
    ) !== null
) {
    throw new Error(
        'FAIL: unknown anomaly trigger should return null.',
    );
}

console.log('PASS');

console.log(
    'All AnomalySystem tests passed.',
);