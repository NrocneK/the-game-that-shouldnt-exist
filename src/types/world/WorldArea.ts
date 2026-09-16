export interface WorldAreaDefinition {
    id: string;
    name: string;
    width: number;
    height: number;
    spawnPoint: {
        x: number;
        y: number;
    };
}