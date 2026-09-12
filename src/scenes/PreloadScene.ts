import Phaser from 'phaser';

export class PreloadScene extends Phaser.Scene {
  constructor() {
    super('PreloadScene');
  }

  preload(): void {
    console.log('[PreloadScene] Preload started.');
  }

  create(): void {
    console.log('[PreloadScene] Creating placeholder assets.');

    const graphics = this.make.graphics({
      x: 0,
      y: 0,
    });

    graphics.fillStyle(0xffffff, 1);
    graphics.fillRect(0, 0, 32, 32);

    graphics.generateTexture('placeholder', 32, 32);

    graphics.destroy();

    console.log('[PreloadScene] Preload completed.');

    this.scene.start('MainMenuScene');
  }
}