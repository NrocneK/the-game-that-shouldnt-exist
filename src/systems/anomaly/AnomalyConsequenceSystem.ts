import type { AnomalyInvestigationConsequences } from '../../types/anomaly/AnomalyInvestigationConsequences';
import { WorldStateSystem } from '../state/WorldStateSystem';

export class AnomalyConsequenceSystem {
    private readonly worldStateSystem: WorldStateSystem;

    constructor(
        worldStateSystem: WorldStateSystem,
    ) {
        this.worldStateSystem = worldStateSystem;
    }

    public apply(
        consequences: AnomalyInvestigationConsequences,
    ): void {
        consequences.storyFlags.forEach(
            (flagId) => {
                this.worldStateSystem.setStoryFlag(
                    flagId,
                );
            },
        );

        Object.entries(
            consequences.npcStates,
        ).forEach(
            ([npcId, state]) => {
                this.worldStateSystem.setNpcState(
                    npcId,
                    state,
                );
            },
        );
    }
}
