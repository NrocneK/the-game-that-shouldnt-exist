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
    id: 'test_anomaly',
    name: 'Test Anomaly',
    description: 'Test anomaly',
    requiredStoryFlag: 'test_flag',
    worldReaction: 'Test reaction',
    state: 'inactive',
    investigationConsequences: {
        storyFlags: [
            'test_anomaly_consequence',
        ],
        npcStates: {
            test_npc: 'concerned',
        },
    },
};

anomalySystem.register(anomaly);

console.log(
    'Test 1: definition registration',
);

if (
    anomalySystem.getDefinition(
        'test_anomaly',
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
        'test_anomaly',
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
    'test_flag',
);

if (
    !anomalySystem.canTrigger(
        'test_anomaly',
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
        'test_anomaly',
    );

if (triggered !== anomaly) {
    throw new Error(
        'FAIL: anomaly trigger did not return the correct definition.',
    );
}

if (
    anomalySystem.getState(
        'test_anomaly',
    ) !== 'active'
) {
    throw new Error(
        'FAIL: anomaly state should be active after trigger.',
    );
}

console.log('PASS');

console.log(
    'Test 5: world state records triggered anomaly',
);

if (
    !worldStateSystem.hasTriggeredAnomaly(
        'test_anomaly',
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
        'test_anomaly',
    )
) {
    throw new Error(
        'FAIL: anomaly should not trigger twice.',
    );
}

if (
    anomalySystem.trigger(
        'test_anomaly',
    ) !== null
) {
    throw new Error(
        'FAIL: second trigger should return null.',
    );
}

console.log('PASS');

console.log(
    'Test 7: anomaly investigation',
);

if (
    !anomalySystem.investigate(
        'test_anomaly',
    )
) {
    throw new Error(
        'FAIL: active anomaly should be investigatable.',
    );
}

if (
    anomalySystem.getState(
        'test_anomaly',
    ) !== 'investigated'
) {
    throw new Error(
        'FAIL: anomaly state should be investigated.',
    );
}

if (
    !worldStateSystem.hasStoryFlag(
        'test_anomaly_investigated',
    )
) {
    throw new Error(
        'FAIL: investigation story flag was not set.',
    );
}

console.log('PASS');

console.log(
    'Test 8: investigation applies configured consequences',
);

if (
    !worldStateSystem.hasStoryFlag(
        'test_anomaly_consequence',
    )
) {
    throw new Error(
        'FAIL: investigation consequence story flag was not set.',
    );
}

if (
    worldStateSystem.getNpcState(
        'test_npc',
    ) !== 'concerned'
) {
    throw new Error(
        'FAIL: investigation consequence NPC state was not set.',
    );
}

console.log('PASS');

console.log(
    'Test 9: anomaly cannot be investigated twice',
);

if (
    anomalySystem.investigate(
        'test_anomaly',
    )
) {
    throw new Error(
        'FAIL: investigated anomaly should not be investigated twice.',
    );
}

console.log('PASS');

console.log(
    'Test 10: unknown anomaly fails safely',
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

if (
    anomalySystem.investigate(
        'unknown_anomaly',
    )
) {
    throw new Error(
        'FAIL: unknown anomaly should not be investigatable.',
    );
}

console.log('PASS');

console.log(
    'All AnomalySystem tests passed.',
);