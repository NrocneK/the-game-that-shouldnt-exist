import type { WorldAreaDefinition } from '../../types/world/WorldArea';
import { WorldStateSystem } from '../state/WorldStateSystem';

export interface WorldVisualState {
    backgroundColor: number;
    statusText: string;
}

export class WorldStateVisualSystem {
    private readonly worldStateSystem: WorldStateSystem;

    constructor(
        worldStateSystem: WorldStateSystem,
    ) {
        this.worldStateSystem = worldStateSystem;
    }

    public getVisualState(
        area: WorldAreaDefinition,
        defaultBackgroundColor: number,
        defaultStatusText: string,
    ): WorldVisualState {
        const visual = area.worldStateVisual;

        if (
            visual &&
            this.worldStateSystem.hasStoryFlag(
                visual.storyFlag,
            )
        ) {
            return {
                backgroundColor: visual.backgroundColor,
                statusText: visual.statusText,
            };
        }

        return {
            backgroundColor: defaultBackgroundColor,
            statusText: defaultStatusText,
        };
    }
}