import Phaser from 'phaser';

export class AnomalyMarker extends Phaser.GameObjects.Container {
    constructor(
        scene: Phaser.Scene,
        x: number,
        y: number,
    ) {
        super(scene, x, y);

        const glow = scene.add.circle(
            0,
            0,
            18,
            0xffffff,
            0.15,
        );

        const core = scene.add.circle(
            0,
            0,
            8,
            0xffffff,
            0.8,
        );

        const ring = scene.add.circle(
            0,
            0,
            12,
            0xffffff,
            0,
        );

        ring.setStrokeStyle(
            2,
            0xffffff,
            0.8,
        );

        this.add([
            glow,
            ring,
            core,
        ]);

        scene.tweens.add({
            targets: this,
            scale: {
                from: 0.8,
                to: 1.2,
            },
            alpha: {
                from: 0.6,
                to: 1,
            },
            duration: 900,
            yoyo: true,
            repeat: -1,
            ease: 'Sine.easeInOut',
        });

        scene.add.existing(this);
    }
}