import Phaser from 'phaser';

export class PreloadScene extends Phaser.Scene {
  constructor() {
    super('PreloadScene');
  }

  preload(): void {
    console.log('[PreloadScene] Preload started.');
  }

  create(): void {
    console.log('[PreloadScene] Preload completed.');

    this.scene.start('MainMenuScene');
  }
}