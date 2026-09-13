import Phaser from 'phaser';

import { Player } from '../entities/player/Player';
import { GameStateManager } from '../systems/state/GameStateManager';

export class GameScene extends Phaser.Scene {
  private gameStateManager!: GameStateManager;

  private player!: Player;

  constructor() {
    super('GameScene');
  }

  create(): void {
    console.log('[GameScene] Game started.');

    this.gameStateManager = new GameStateManager();

    const state = this.gameStateManager.getState();

    console.log('[GameState] Initial state:', state);

    this.physics.world.setBounds(
      0,
      0,
      this.scale.width,
      this.scale.height,
    );

    this.player = new Player(this, state.player);

    console.log(
      '[Player] Spawned at:',
      this.player.x,
      this.player.y,
    );

    this.add
      .text(640, 100, 'GAME SCENE', {
        fontSize: '48px',
        color: '#ffffff',
      })
      .setOrigin(0.5);

    this.add
      .text(
        640,
        650,
        `Area: ${state.world.currentArea} | Level: ${state.player.level} | HP: ${state.player.hp}`,
        {
          fontSize: '20px',
          color: '#cccccc',
        },
      )
      .setOrigin(0.5);
  }
}