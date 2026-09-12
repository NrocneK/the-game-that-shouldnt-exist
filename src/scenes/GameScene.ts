import Phaser from 'phaser';

import { GameStateManager } from '../systems/state/GameStateManager';

export class GameScene extends Phaser.Scene {
  private gameStateManager!: GameStateManager;

  constructor() {
    super('GameScene');
  }

  create(): void {
    console.log('[GameScene] Game started.');

    this.gameStateManager = new GameStateManager();

    const state = this.gameStateManager.getState();

    console.log('[GameState] Initial state:', state);

    this.add
      .text(640, 200, 'GAME SCENE', {
        fontSize: '48px',
        color: '#ffffff',
      })
      .setOrigin(0.5);

    this.add
      .image(640, 320, 'placeholder')
      .setScale(4);

    this.add
      .text(
        640,
        420,
        `Area: ${state.world.currentArea}\nLevel: ${state.player.level}\nHP: ${state.player.hp}`,
        {
          fontSize: '24px',
          color: '#cccccc',
          align: 'center',
        },
      )
      .setOrigin(0.5);

    this.add
      .text(640, 520, 'Runtime state initialized', {
        fontSize: '24px',
        color: '#ffffff',
      })
      .setOrigin(0.5);
  }
}