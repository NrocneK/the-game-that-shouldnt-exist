import Phaser from 'phaser';

export interface NPCState {
    id: string;
    name: string;
    position: {
        x: number;
        y: number;
    };
}

export class NPC
    extends Phaser.Physics.Arcade.Sprite {

    private readonly npcId: string;
    private readonly displayName: string;

    constructor(
        scene: Phaser.Scene,
        state: NPCState,
    ) {
        super(
            scene,
            state.position.x,
            state.position.y,
            'player',
        );

        this.npcId = state.id;
        this.displayName = state.name;

        scene.add.existing(this);
        scene.physics.add.existing(this);

        this.setDisplaySize(48, 48);

        this.setCollideWorldBounds(true);

        scene.add
            .text(
                state.position.x,
                state.position.y - 40,
                state.name,
                {
                    fontSize: '16px',
                    color: '#ffffff',
                },
            )
            .setOrigin(0.5);
    }

    getId(): string {
        return this.npcId;
    }

    getName(): string {
        return this.displayName;
    }

    getPosition(): {
        x: number;
        y: number;
    } {
        return {
            x: this.x,
            y: this.y,
        };
    }
}