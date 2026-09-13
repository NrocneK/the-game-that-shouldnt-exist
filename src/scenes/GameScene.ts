import Phaser from 'phaser';

import { Player } from '../entities/player/Player';
import { GameStateManager } from '../systems/state/GameStateManager';
import { MovementSystem } from '../systems/movement/MovementSystem';

export class GameScene extends Phaser.Scene {
  private gameStateManager!: GameStateManager;
  private movementSystem!: MovementSystem;

  private player!: Player;

  constructor() {
    super('GameScene');
  }

  create(): void {
    console.log('[GameScene] Game started.');

    this.gameStateManager = new GameStateManager();

    const state = this.gameStateManager.getState();

    console.log('[GameState] Initial state:', state);

    const worldWidth = 2400;
    const worldHeight = 720;

    this.physics.world.setBounds(
      0,
      0,
      worldWidth,
      worldHeight,
    );

    this.add
      .rectangle(
        worldWidth / 2,
        worldHeight / 2,
        worldWidth,
        worldHeight,
        0x1a1a1a,
      );

    const ground = this.physics.add.staticGroup();

    for (let x = 16; x < worldWidth; x += 32) {
      ground.create(x, 700, 'ground');
    }

    this.player = new Player(this, state.player);

    this.movementSystem = new MovementSystem(
      this,
      this.player,
    );

    this.physics.add.collider(this.player, ground);

    console.log(
      '[Player] Spawned at:',
      this.player.x,
      this.player.y,
    );

    this.add
      .text(640, 100, 'WORLD FOUNDATION', {
        fontSize: '42px',
        color: '#ffffff',
      })
      .setOrigin(0.5);

    this.add
      .text(
        640,
        150,
        'Physics world initialized',
        {
          fontSize: '22px',
          color: '#cccccc',
        },
      )
      .setOrigin(0.5);
  }

  update(): void {
    this.movementSystem.update();
  }
}