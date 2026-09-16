import { DialogueSystem } from './DialogueSystem';

const system = new DialogueSystem();

system.register({
    id: 'test',

    lines: [
        {
            speaker: 'A',
            text: 'First',
        },
        {
            speaker: 'A',
            text: 'Second',
        },
    ],
});

if (!system.start('test')) {
    throw new Error(
        'FAIL: dialogue did not start',
    );
}

if (
    system.getCurrentLine()?.text !==
    'First'
) {
    throw new Error(
        'FAIL: first line',
    );
}

if (!system.advance()) {
    throw new Error(
        'FAIL: dialogue did not advance',
    );
}

if (
    system.getCurrentLine()?.text !==
    'Second'
) {
    throw new Error(
        'FAIL: second line',
    );
}

if (system.advance()) {
    throw new Error(
        'FAIL: dialogue should close',
    );
}

console.log(
    '[Dialogue Test] PASS',
);