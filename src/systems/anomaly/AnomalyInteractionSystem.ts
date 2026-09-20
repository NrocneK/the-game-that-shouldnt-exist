import type { AnomalySystem } from './AnomalySystem';

export class AnomalyInteractionSystem {
    private readonly anomalySystem: AnomalySystem;

    constructor(
        anomalySystem: AnomalySystem,
    ) {
        this.anomalySystem =
            anomalySystem;
    }

    public canInteract(
        anomalyId: string,
        playerX: number,
        playerY: number,
        anomalyX: number,
        anomalyY: number,
        interactionRange: number,
    ): boolean {
        if (
            this.anomalySystem.getState(
                anomalyId,
            ) !== 'active'
        ) {
            return false;
        }

        const distance = Math.sqrt(
            Math.pow(
                playerX - anomalyX,
                2,
            ) +
            Math.pow(
                playerY - anomalyY,
                2,
            ),
        );

        return distance <= interactionRange;
    }

    public interact(
        anomalyId: string,
        playerX: number,
        playerY: number,
        anomalyX: number,
        anomalyY: number,
        interactionRange: number,
    ): boolean {
        if (
            !this.canInteract(
                anomalyId,
                playerX,
                playerY,
                anomalyX,
                anomalyY,
                interactionRange,
            )
        ) {
            return false;
        }

        return this.anomalySystem.investigate(
            anomalyId,
        );
    }
}