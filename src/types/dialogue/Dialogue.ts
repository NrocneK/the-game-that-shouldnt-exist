export interface DialogueLine {
    speaker: string;
    text: string;
}

export interface DialogueDefinition {
    id: string;
    lines: DialogueLine[];
}