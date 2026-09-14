import Phaser from 'phaser';

import { CombatSystem } from './CombatSystem';
import type { AttackTarget } from '../../types/combat/AttackTarget';
import type { CombatStats } from '../../types/combat/CombatStats';

export class PlayerCombatSystem {
    private readonly scene: Phaser.Scene;

    private readonly combatSystem: CombatSystem;

    private readonly playerStats: CombatStats;

    private readonly attackKey: Phaser.Input.Keyboard.Key;

    private readonly attackCooldown = 300;

    private lastAttackTime = 0;

    constructor(
        scene: Phaser.Scene,
        playerStats: CombatStats,
    ) {
        this.scene = scene;

        this.combatSystem = new CombatSystem();

        this.playerStats = playerStats;

        this.attackKey = scene.input.keyboard!.addKey(
            Phaser.Input.Keyboard.KeyCodes.A,
        );
    }

    public update(
        player: Phaser.Physics.Arcade.Sprite,
        targets: AttackTarget[],
    ): void {
        if (
            !Phaser.Input.Keyboard.JustDown(
                this.attackKey,
            )
        ) {
            return;
        }

        const now = this.scene.time.now;

        if (
            now - this.lastAttackTime <
            this.attackCooldown
        ) {
            return;
        }

        this.lastAttackTime = now;

        const target = targets.find(
            (candidate) => {
                if (candidate.isDefeated()) {
                    return false;
                }

                const targetPosition =
                    candidate.getPosition();

                const distance =
                    Phaser.Math.Distance.Between(
                        player.x,
                        player.y,
                        targetPosition.x,
                        targetPosition.y,
                    );

                return distance <= 100;
            },
        );

        if (!target) {
            console.log('[Combat] No target in range.');
            return;
        }

        const result = this.combatSystem.attack(
            this.playerStats,
            target,
        );

        console.log(
            '[Combat] Player attacked.',
            result,
        );
    }
}