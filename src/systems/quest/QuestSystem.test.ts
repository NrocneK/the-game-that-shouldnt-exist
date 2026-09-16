import { QuestSystem } from './QuestSystem';

const system = new QuestSystem();

system.register({
    id: 'test_quest',

    title: 'Test Quest',

    description:
        'Defeat one test enemy.',

    objective: {
        type: 'defeat_enemy',
        targetId: 'test_enemy',
        requiredCount: 1,
    },

    reward: {
        experience: 10,
    },
});

if (
    system.getStatus('test_quest') !==
    'available'
) {
    throw new Error(
        'FAIL: available',
    );
}

if (
    !system.accept('test_quest')
) {
    throw new Error(
        'FAIL: accept',
    );
}

if (
    system.getStatus('test_quest') !==
    'active'
) {
    throw new Error(
        'FAIL: active',
    );
}

if (
    !system.updateEnemyDefeated(
        'test_enemy',
    )
) {
    throw new Error(
        'FAIL: objective',
    );
}

if (
    system.getStatus('test_quest') !==
    'ready'
) {
    throw new Error(
        'FAIL: ready',
    );
}

if (
    !system.complete('test_quest')
) {
    throw new Error(
        'FAIL: complete',
    );
}

if (
    system.getStatus('test_quest') !==
    'completed'
) {
    throw new Error(
        'FAIL: completed',
    );
}

console.log(
    '[Quest Test] PASS',
);