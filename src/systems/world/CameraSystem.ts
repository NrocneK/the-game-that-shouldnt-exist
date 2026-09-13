import Phaser from 'phaser';

import { Player } from '../../entities/player/Player';

export class CameraSystem {
  private readonly camera: Phaser.Cameras.Scene2D.Camera;

  constructor(
    scene: Phaser.Scene,
    player: Player,
    worldWidth: number,
    worldHeight: number,
  ) {
    this.camera = scene.cameras.main;

    this.camera.setBounds(
      0,
      0,
      worldWidth,
      worldHeight,
    );

    this.camera.startFollow(
      player,
      true,
      0.08,
      0.08,
    );
  }
}