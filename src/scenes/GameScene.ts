import Phaser from 'phaser';

export class GameScene extends Phaser.Scene {
  constructor() {
    super('GameScene');
  }

  create(): void {
    console.log('[GameScene] Game started.');

    this.add
      .text(640, 280, 'GAME SCENE', {
        fontSize: '48px',
        color: '#ffffff',
      })
      .setOrigin(0.5);

    this.add
      .image(640, 400, 'placeholder')
      .setScale(4);

    this.add
      .text(640, 480, 'Asset pipeline OK', {
        fontSize: '24px',
        color: '#cccccc',
      })
      .setOrigin(0.5);
  }
}