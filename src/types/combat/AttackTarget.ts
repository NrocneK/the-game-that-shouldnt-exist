import type { PositionedTarget } from './PositionedTarget';

export interface AttackTarget extends PositionedTarget {
    getCombatStats(): {
        attack: number;
        defense: number;
    };

    takeDamage(amount: number): void;

    isDefeated(): boolean;
}