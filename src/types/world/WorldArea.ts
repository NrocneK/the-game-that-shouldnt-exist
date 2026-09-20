export interface WorldStateVisualDefinition {
    storyFlag: string;
    backgroundColor: number;
    statusText: string;
}

export interface WorldAreaDefinition {
    id: string;
    name: string;
    width: number;
    height: number;
    spawnPoint: {
        x: number;
        y: number;
    };
    worldStateVisual?: WorldStateVisualDefinition;
}