import Phaser from 'phaser';

import type { EnemyState } from '../../types/EnemyState';
import type { CombatStats } from '../../types/combat/CombatStats';
import type { Damageable } from '../../types/combat/Damageable';
import type { AttackTarget } from '../../types/combat/AttackTarget';

export class Enemy
    extends Phaser.Physics.Arcade.Sprite
    implements Damageable, AttackTarget {
    private readonly enemyId: string;

    private hp: number;

    private readonly maxHp: number;

    private readonly combatStats: CombatStats;

    private hpText!: Phaser.GameObjects.Text;

    constructor(
        scene: Phaser.Scene,
        state: EnemyState,
    ) {
        super(
            scene,
            state.position.x,
            state.position.y,
            'player',
        );

        this.enemyId = state.id;
        this.hp = state.hp;
        this.maxHp = state.maxHp;
        this.combatStats = state.combatStats;

        scene.add.existing(this);
        scene.physics.add.existing(this);

        this.setDisplaySize(48, 48);

        this.setCollideWorldBounds(true);

        this.hpText = scene.add
            .text(
                state.position.x,
                state.position.y - 40,
                `HP: ${this.hp}/${this.maxHp}`,
                {
                    fontSize: '16px',
                    color: '#ffffff',
                },
            )
            .setOrigin(0.5);
    }

    public getId(): string {
        return this.enemyId;
    }

    public getHp(): number {
        return this.hp;
    }

    public getMaxHp(): number {
        return this.maxHp;
    }

    public getPosition(): {
        x: number;
        y: number;
    } {
        return {
            x: this.x,
            y: this.y,
        };
    }

    public getCombatStats(): CombatStats {
        return this.combatStats;
    }

    public takeDamage(amount: number): void {
        if (this.isDefeated()) {
            return;
        }

        const damage = Math.max(0, amount);

        this.hp = Math.max(
            0,
            this.hp - damage,
        );

        this.hpText.setText(
            `HP: ${this.hp}/${this.maxHp}`,
        );

        if (this.isDefeated()) {
            this.setAlpha(0.5);
        }
    }

    public isDefeated(): boolean {
        return this.hp <= 0;
    }

    preUpdate(
        time: number,
        delta: number,
    ): void {
        super.preUpdate(time, delta);

        this.hpText.setPosition(
            this.x,
            this.y - 40,
        );
    }
}