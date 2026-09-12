import Phaser from 'phaser';

export class BootScene extends Phaser.Scene {
  constructor() {
    super('BootScene');
  }

  create(): void {
    console.log('[BootScene] Boot sequence started.');

    this.scene.start('PreloadScene');
  }
}