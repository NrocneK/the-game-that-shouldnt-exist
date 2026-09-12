import Phaser from 'phaser';

export class GameScene extends Phaser.Scene {
  constructor() {
    super('GameScene');
  }

  create(): void {
    console.log('[GameScene] Game started.');

    this.add
      .text(640, 360, 'GAME SCENE', {
        fontSize: '48px',
        color: '#ffffff',
      })
      .setOrigin(0.5);
  }
}