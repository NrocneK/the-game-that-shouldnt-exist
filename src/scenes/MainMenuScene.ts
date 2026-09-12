import Phaser from 'phaser';

export class MainMenuScene extends Phaser.Scene {
  constructor() {
    super('MainMenuScene');
  }

  create(): void {
    console.log('[MainMenuScene] Main menu started.');

    this.add
      .text(640, 300, 'THE GAME THAT SHOULDN’T EXIST', {
        fontSize: '42px',
        color: '#ffffff',
      })
      .setOrigin(0.5);

    this.add
      .text(640, 380, 'Press SPACE to start', {
        fontSize: '24px',
        color: '#cccccc',
      })
      .setOrigin(0.5);

    this.input.keyboard?.once('keydown-SPACE', () => {
      this.scene.start('GameScene');
    });
  }
}