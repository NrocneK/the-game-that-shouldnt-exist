import type {
    DialogueDefinition,
    DialogueLine,
} from '../../types/dialogue/Dialogue';

export class DialogueSystem {
    private readonly definitions =
        new Map<string, DialogueDefinition>();

    private activeDialogue:
        | DialogueDefinition
        | null = null;

    private currentIndex = 0;

    register(
        definition: DialogueDefinition,
    ): void {
        this.definitions.set(
            definition.id,
            definition,
        );
    }

    start(dialogueId: string): boolean {
        const definition =
            this.definitions.get(dialogueId);

        if (
            !definition ||
            definition.lines.length === 0
        ) {
            return false;
        }

        this.activeDialogue = definition;
        this.currentIndex = 0;

        return true;
    }

    advance(): boolean {
        if (!this.activeDialogue) {
            return false;
        }

        this.currentIndex += 1;

        if (
            this.currentIndex >=
            this.activeDialogue.lines.length
        ) {
            this.close();

            return false;
        }

        return true;
    }

    close(): void {
        this.activeDialogue = null;
        this.currentIndex = 0;
    }

    isActive(): boolean {
        return this.activeDialogue !== null;
    }

    getCurrentLine(): DialogueLine | null {
        if (!this.activeDialogue) {
            return null;
        }

        return (
            this.activeDialogue.lines[
            this.currentIndex
            ] ?? null
        );
    }
}