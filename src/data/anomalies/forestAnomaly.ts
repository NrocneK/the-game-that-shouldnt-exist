import type { AnomalyDefinition } from '../../types/anomaly/AnomalyDefinition';

export const forestAnomaly: AnomalyDefinition = {
    id: 'forest_anomaly_01',

    name: 'The Forest That Should Not Be Here',

    description:
        'A strange presence has appeared in the Starting Forest.',

    requiredStoryFlag:
        'forest_anomaly_01',

    worldReaction:
        'A strange marker has appeared in the forest.',

    state: 'inactive',

    investigationConsequences: {
        storyFlags: [
            'forest_anomaly_01_investigated',
            'starting_forest_changed',
        ],
        npcStates: {
            old_miner: 'anomaly_investigated',
        },
    },
};