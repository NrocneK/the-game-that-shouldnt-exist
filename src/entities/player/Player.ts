import Phaser from 'phaser';

import type { PlayerState } from '../../types/PlayerState';

export class Player extends Phaser.Physics.Arcade.Sprite {
  private readonly playerState: PlayerState;

  constructor(
    scene: Phaser.Scene,
    playerState: PlayerState,
  ) {
    super(
      scene,
      playerState.position.x,
      playerState.position.y,
      'placeholder',
    );

    this.playerState = playerState;

    scene.add.existing(this);
    scene.physics.add.existing(this);

    this.setOrigin(0.5, 0.5);
    this.setDisplaySize(48, 48);

    this.setCollideWorldBounds(true);
  }

  public getPlayerState(): PlayerState {
    return this.playerState;
  }
}