import Phaser from 'phaser';

import { Player } from '../../entities/player/Player';

export class MovementSystem {
  private readonly player: Player;

  private readonly cursors: Phaser.Types.Input.Keyboard.CursorKeys;

  private readonly jumpKey: Phaser.Input.Keyboard.Key;

  private readonly moveSpeed = 250;

  private readonly jumpVelocity = -500;

  private enabled = true;

  constructor(scene: Phaser.Scene, player: Player) {
    this.player = player;

    this.cursors = scene.input.keyboard!.createCursorKeys();

    this.jumpKey = scene.input.keyboard!.addKey(
      Phaser.Input.Keyboard.KeyCodes.SPACE,
    );
  }

  public update(): void {
    if (!this.enabled) {
      return;
    }

    this.handleHorizontalMovement();
    this.handleJump();
  }

  public disable(): void {
    this.enabled = false;

    const body = this.player.body as Phaser.Physics.Arcade.Body;

    body.setVelocity(0, 0);
  }

  private handleHorizontalMovement(): void {
    const body = this.player.body as Phaser.Physics.Arcade.Body;

    if (this.cursors.left.isDown) {
      body.setVelocityX(-this.moveSpeed);
      this.player.setFlipX(true);
      return;
    }

    if (this.cursors.right.isDown) {
      body.setVelocityX(this.moveSpeed);
      this.player.setFlipX(false);
      return;
    }

    body.setVelocityX(0);
  }

  private handleJump(): void {
    const body = this.player.body as Phaser.Physics.Arcade.Body;

    if (
      Phaser.Input.Keyboard.JustDown(this.jumpKey) &&
      body.blocked.down
    ) {
      body.setVelocityY(this.jumpVelocity);
    }
  }
}