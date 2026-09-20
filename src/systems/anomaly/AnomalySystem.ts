import type { AnomalyDefinition } from '../../types/anomaly/AnomalyDefinition';
import type { AnomalyState } from '../../types/anomaly/AnomalyState';
import { WorldStateSystem } from '../state/WorldStateSystem';
import { AnomalyConsequenceSystem } from './AnomalyConsequenceSystem';

export class AnomalySystem {
    private readonly definitions =
        new Map<string, AnomalyDefinition>();

    private readonly states =
        new Map<string, AnomalyState>();

    private readonly worldStateSystem: WorldStateSystem;

    private readonly consequenceSystem: AnomalyConsequenceSystem;

    constructor(
        worldStateSystem: WorldStateSystem,
    ) {
        this.worldStateSystem =
            worldStateSystem;

        this.consequenceSystem =
            new AnomalyConsequenceSystem(
                worldStateSystem,
            );
    }

    public register(
        definition: AnomalyDefinition,
    ): void {
        this.definitions.set(
            definition.id,
            definition,
        );

        this.states.set(
            definition.id,
            definition.state,
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

    public getState(
        anomalyId: string,
    ): AnomalyState {
        return (
            this.states.get(anomalyId) ??
            'inactive'
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
            this.getState(anomalyId) !==
            'inactive'
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

        this.states.set(
            anomalyId,
            'active',
        );

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

    public investigate(
        anomalyId: string,
    ): boolean {
        if (
            this.getState(anomalyId) !==
            'active'
        ) {
            return false;
        }

        this.states.set(
            anomalyId,
            'investigated',
        );

        this.worldStateSystem.setStoryFlag(
            `${anomalyId}_investigated`,
        );

        const definition =
            this.definitions.get(anomalyId);

        if (definition) {
            this.consequenceSystem.apply(
                definition.investigationConsequences,
            );
        }

        console.log(
            `[Anomaly] Investigated: ${anomalyId}`,
        );

        return true;
    }

    public isTriggered(
        anomalyId: string,
    ): boolean {
        return (
            this.getState(anomalyId) !==
            'inactive'
        );
    }

    public isInvestigated(
        anomalyId: string,
    ): boolean {
        return (
            this.getState(anomalyId) ===
            'investigated'
        );
    }
}