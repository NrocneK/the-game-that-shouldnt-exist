import type { WorldState } from '../../types/WorldState';

export class WorldStateSystem {
    private readonly state: WorldState;

    constructor(state: WorldState) {
        this.state = state;
    }

    public setStoryFlag(
        flagId: string,
        value = true,
    ): void {
        this.state.storyFlags[flagId] = value;
    }

    public hasStoryFlag(
        flagId: string,
    ): boolean {
        return (
            this.state.storyFlags[flagId] === true
        );
    }

    public clearStoryFlag(
        flagId: string,
    ): void {
        delete this.state.storyFlags[flagId];
    }

    public setNpcState(
        npcId: string,
        state: string,
    ): void {
        this.state.npcStates[npcId] = state;
    }

    public getNpcState(
        npcId: string,
    ): string | null {
        return (
            this.state.npcStates[npcId] ??
            null
        );
    }

    public setQuestState(
        questId: string,
        state: string,
    ): void {
        this.state.questStates[questId] =
            state;
    }

    public getQuestState(
        questId: string,
    ): string | null {
        return (
            this.state.questStates[questId] ??
            null
        );
    }

    public markAnomalyTriggered(
        anomalyId: string,
    ): void {
        if (
            !this.state.triggeredAnomalies.includes(
                anomalyId,
            )
        ) {
            this.state.triggeredAnomalies.push(
                anomalyId,
            );
        }
    }

    public hasTriggeredAnomaly(
        anomalyId: string,
    ): boolean {
        return this.state.triggeredAnomalies.includes(
            anomalyId,
        );
    }
}