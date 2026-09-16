import type { QuestDefinition } from '../../types/quest/QuestDefinition';

export const minersRequest: QuestDefinition = {
    id: 'miners_request',

    title: "Miner's Request",

    description:
        'Deal with the creature prowling near the forest path.',

    objective: {
        type: 'defeat_enemy',
        targetId: 'test_enemy',
        requiredCount: 1,
    },

    reward: {
        experience: 50,
    },
};