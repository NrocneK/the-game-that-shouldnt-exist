import type { StatGrowth } from './StatGrowth';

export interface ProgressionState {
    level: number;
    experience: number;
    experienceToNextLevel: number;

    stats: {
        maxHp: number;
        attack: number;
        defense: number;
    };

    statGrowth: StatGrowth;
}