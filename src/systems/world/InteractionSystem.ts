import Phaser from 'phaser';

import { NPC } from '../../entities/npc/NPC';

export class InteractionSystem {
    private readonly interactKey:
        Phaser.Input.Keyboard.Key;

    private readonly range: number;

    constructor(
        scene: Phaser.Scene,
        range = 90,
    ) {
        this.interactKey =
            scene.input.keyboard!.addKey(
                Phaser.Input.Keyboard.KeyCodes.E,
            );

        this.range = range;
    }

    isPressed(): boolean {
        return Phaser.Input.Keyboard.JustDown(
            this.interactKey,
        );
    }

    getNearbyNpc(
        player: Phaser.Physics.Arcade.Sprite,
        npcs: NPC[],
    ): NPC | null {
        let nearest: NPC | null = null;

        let nearestDistance =
            this.range;

        for (const npc of npcs) {
            const distance =
                Phaser.Math.Distance.Between(
                    player.x,
                    player.y,
                    npc.x,
                    npc.y,
                );

            if (
                distance <= nearestDistance
            ) {
                nearest = npc;
                nearestDistance = distance;
            }
        }

        return nearest;
    }
}