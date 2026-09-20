import type { WorldState } from '../../types/WorldState';
import { WorldStateSystem } from '../state/WorldStateSystem';
import { AnomalyConsequenceSystem } from './AnomalyConsequenceSystem';

const worldState: WorldState = {
    currentArea: 'StartingForest',
    storyFlags: {},
    questStates: {},
    npcStates: {},
    triggeredAnomalies: [],
};

const worldStateSystem =
    new WorldStateSystem(worldState);

const system = new AnomalyConsequenceSystem(
    worldStateSystem,
);

system.apply({
    storyFlags: [
        'forest_changed',
        'echo_detected',
    ],
    npcStates: {
        old_miner: 'concerned',
        forest_guide: 'available',
    },
});

if (
    !worldStateSystem.hasStoryFlag(
        'forest_changed',
    ) ||
    !worldStateSystem.hasStoryFlag(
        'echo_detected',
    )
) {
    throw new Error(
        'FAIL: all story-flag consequences must be applied.',
    );
}

if (
    worldStateSystem.getNpcState(
        'old_miner',
    ) !== 'concerned' ||
    worldStateSystem.getNpcState(
        'forest_guide',
    ) !== 'available'
) {
    throw new Error(
        'FAIL: all NPC-state consequences must be applied.',
    );
}

console.log(
    '[Anomaly Consequence Test] PASS',
);