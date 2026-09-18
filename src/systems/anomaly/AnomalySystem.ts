import type { AnomalyDefinition } from '../../types/anomaly/AnomalyDefinition';
import { WorldStateSystem } from '../state/WorldStateSystem';

export class AnomalySystem {
    private readonly definitions =
        new Map<string, AnomalyDefinition>();

    private readonly worldStateSystem: WorldStateSystem;

    constructor(
        worldStateSystem: WorldStateSystem,
    ) {
        this.worldStateSystem =
            worldStateSystem;
    }

    public register(
        definition: AnomalyDefinition,
    ): void {
        this.definitions.set(
            definition.id,
            definition,
        );
    }

    public getDefinition(
        anomalyId: string,
    ): AnomalyDefinition | null {
        return (
            this.definitions.get(anomalyId) ??
            null
        );
    }

    public canTrigger(
        anomalyId: string,
    ): boolean {
        const definition =
            this.definitions.get(anomalyId);

        if (!definition) {
            return false;
        }

        if (
            this.worldStateSystem.hasTriggeredAnomaly(
                anomalyId,
            )
        ) {
            return false;
        }

        return this.worldStateSystem.hasStoryFlag(
            definition.requiredStoryFlag,
        );
    }

    public trigger(
        anomalyId: string,
    ): AnomalyDefinition | null {
        if (
            !this.canTrigger(anomalyId)
        ) {
            return null;
        }

        const definition =
            this.definitions.get(anomalyId);

        if (!definition) {
            return null;
        }

        this.worldStateSystem.markAnomalyTriggered(
            anomalyId,
        );

        console.log(
            `[Anomaly] Triggered: ${definition.id}`,
        );

        console.log(
            `[Anomaly] ${definition.worldReaction}`,
        );

        return definition;
    }

    public isTriggered(
        anomalyId: string,
    ): boolean {
        return this.worldStateSystem.hasTriggeredAnomaly(
            anomalyId,
        );
    }
}