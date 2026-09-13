export interface Damageable {
    takeDamage(amount: number): void;

    getHp(): number;

    isDefeated(): boolean;
}