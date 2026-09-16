import type { DialogueDefinition } from '../../types/dialogue/Dialogue';

export const oldMinerDialogues: Record<
    string,
    DialogueDefinition
> = {
    available: {
        id: 'old_miner_available',

        lines: [
            {
                speaker: 'Old Miner',
                text: 'Something has been prowling near the forest path.',
            },
            {
                speaker: 'Old Miner',
                text: "Deal with it, and I'll make it worth your while.",
            },
        ],
    },

    active: {
        id: 'old_miner_active',

        lines: [
            {
                speaker: 'Old Miner',
                text: 'That thing is still out there. Be careful.',
            },
        ],
    },

    ready: {
        id: 'old_miner_ready',

        lines: [
            {
                speaker: 'Old Miner',
                text: 'So you dealt with it.',
            },
            {
                speaker: 'Old Miner',
                text: 'I wish I could say that makes sense.',
            },
        ],
    },

    completed: {
        id: 'old_miner_completed',

        lines: [
            {
                speaker: 'Old Miner',
                text: 'The forest should be quiet now...',
            },
            {
                speaker: 'Old Miner',
                text: 'It was not standing there yesterday.',
            },
        ],
    },
};