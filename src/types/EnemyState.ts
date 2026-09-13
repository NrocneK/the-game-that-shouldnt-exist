export interface EnemyState {
    id: string;

    position: {
        x: number;
        y: number;
    };

    hp: number;

    maxHp: number;

    combatStats: {
        attack: number;
        defense: number;
    };
}