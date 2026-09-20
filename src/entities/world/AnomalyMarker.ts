import Phaser from 'phaser';

export class AnomalyMarker
    extends Phaser.GameObjects.Container {
    private readonly glow: Phaser.GameObjects.Arc;
    private readonly core: Phaser.GameObjects.Arc;
    private readonly ring: Phaser.GameObjects.Arc;

    constructor(
        scene: Phaser.Scene,
        x: number,
        y: number,
    ) {
        super(scene, x, y);

        this.glow = scene.add.circle(
            0,
            0,
            18,
            0xffffff,
            0.15,
        );

        this.core = scene.add.circle(
            0,
            0,
            8,
            0xffffff,
            0.8,
        );

        this.ring = scene.add.circle(
            0,
            0,
            12,
            0xffffff,
            0,
        );

        this.ring.setStrokeStyle(
            2,
            0xffffff,
            0.8,
        );

        this.add([
            this.glow,
            this.ring,
            this.core,
        ]);

        scene.add.existing(this);

        this.setActiveState();
    }

    public setActiveState(): void {
        this.scene.tweens.killTweensOf(
            this,
        );

        this.setAlpha(1);
        this.setScale(1);

        this.scene.tweens.add({
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
    }

    public setInvestigatedState(): void {
        this.scene.tweens.killTweensOf(
            this,
        );

        this.setScale(1);
        this.setAlpha(1);

        this.glow.setAlpha(0.25);
        this.core.setAlpha(0.45);

        this.ring.setStrokeStyle(
            3,
            0xffffff,
            1,
        );
    }
}