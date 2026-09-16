import type { LootItem } from './loot/LootItem';

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

    experienceReward: number;
    loot: LootItem[];
}