import type { QuestDefinition } from '../../types/quest/QuestDefinition';
import type {
    QuestState,
    QuestStatus,
} from '../../types/quest/QuestState';

export class QuestSystem {
    private readonly definitions =
        new Map<string, QuestDefinition>();

    private readonly states =
        new Map<string, QuestState>();

    register(
        definition: QuestDefinition,
    ): void {
        this.definitions.set(
            definition.id,
            definition,
        );

        if (
            !this.states.has(definition.id)
        ) {
            this.states.set(
                definition.id,
                {
                    questId: definition.id,
                    status: 'available',
                    objectiveProgress: 0,
                },
            );
        }
    }

    getDefinition(
        questId: string,
    ): QuestDefinition | null {
        return (
            this.definitions.get(questId) ??
            null
        );
    }

    getState(
        questId: string,
    ): QuestState | null {
        return (
            this.states.get(questId) ??
            null
        );
    }

    getStatus(
        questId: string,
    ): QuestStatus | null {
        return (
            this.states.get(questId)?.status ??
            null
        );
    }

    accept(
        questId: string,
    ): boolean {
        const state =
            this.states.get(questId);

        if (
            !state ||
            state.status !== 'available'
        ) {
            return false;
        }

        state.status = 'active';

        return true;
    }

    updateEnemyDefeated(
        enemyId: string,
    ): boolean {
        let changed = false;

        for (
            const [questId, state]
            of this.states
        ) {
            const definition =
                this.definitions.get(
                    questId,
                );

            if (
                !definition ||
                state.status !== 'active'
            ) {
                continue;
            }

            const objective =
                definition.objective;

            if (
                objective.type !==
                'defeat_enemy' ||
                objective.targetId !==
                enemyId
            ) {
                continue;
            }

            state.objectiveProgress =
                Math.min(
                    objective.requiredCount,
                    state.objectiveProgress + 1,
                );

            if (
                state.objectiveProgress >=
                objective.requiredCount
            ) {
                state.status = 'ready';
            }

            changed = true;
        }

        return changed;
    }

    complete(
        questId: string,
    ): QuestDefinition | null {
        const definition =
            this.definitions.get(
                questId,
            );

        const state =
            this.states.get(questId);

        if (
            !definition ||
            !state ||
            state.status !== 'ready'
        ) {
            return null;
        }

        state.status = 'completed';

        return definition;
    }
}