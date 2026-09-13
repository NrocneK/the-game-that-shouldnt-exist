import Phaser from 'phaser';

import type { EnemyState } from '../../types/EnemyState';
import type { CombatStats } from '../../types/combat/CombatStats';

export class Enemy extends Phaser.Physics.Arcade.Sprite {
    private readonly enemyId: string;

    private hp: number;

    private readonly maxHp: number;

    private readonly combatStats: CombatStats;

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

    public getCombatStats(): CombatStats {
        return this.combatStats;
    }
}