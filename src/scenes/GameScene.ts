import Phaser from 'phaser';

import { Player } from '../entities/player/Player';
import { Enemy } from '../entities/enemy/Enemy';
import { GameStateManager } from '../systems/state/GameStateManager';
import { MovementSystem } from '../systems/movement/MovementSystem';
import { CameraSystem } from '../systems/world/CameraSystem';
import { PlayerCombatSystem } from '../systems/combat/PlayerCombatSystem';
import { ProgressionSystem } from '../systems/progression/ProgressionSystem';
import type { ProgressionState } from '../types/progression/ProgressionState';


export class GameScene extends Phaser.Scene {
  private gameStateManager!: GameStateManager;
  private movementSystem!: MovementSystem;
  private playerCombatSystem!: PlayerCombatSystem;
  private progressionSystem!: ProgressionSystem;
  private progressionState!: ProgressionState;
  private progressionText!: Phaser.GameObjects.Text;

  private player!: Player;
  private enemies: Enemy[] = [];

  private showPrototypeComplete(): void {
    this.movementSystem.disable();

    this.add
      .rectangle(
        this.scale.width / 2,
        this.scale.height / 2,
        700,
        300,
        0x000000,
        0.9,
      )
      .setScrollFactor(0);

    this.add
      .text(
        this.scale.width / 2,
        this.scale.height / 2 - 40,
        'PROTOTYPE COMPLETE',
        {
          fontSize: '42px',
          color: '#ffffff',
        },
      )
      .setOrigin(0.5)
      .setScrollFactor(0);

    this.add
      .text(
        this.scale.width / 2,
        this.scale.height / 2 + 30,
        'Phase 1 First Playable Build',
        {
          fontSize: '24px',
          color: '#cccccc',
        },
      )
      .setOrigin(0.5)
      .setScrollFactor(0);
  }

  constructor() {
    super('GameScene');
  }

  create(): void {
    console.log('[GameScene] Game started.');

    this.gameStateManager = new GameStateManager();

    const state = this.gameStateManager.getState();

    this.progressionState = {
      level: state.player.level,
      experience: state.player.experience,
      experienceToNextLevel: 100,

      stats: {
        maxHp: state.player.stats.maxHp,
        attack: state.player.stats.attack,
        defense: state.player.stats.defense,
      },

      statGrowth: {
        maxHp: 10,
        attack: 2,
        defense: 1,
      },
    };

    this.progressionSystem =
      new ProgressionSystem();

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

    const goalX = 2200;

    this.add
      .rectangle(
        goalX,
        600,
        80,
        160,
        0x444444,
      );

    this.add
      .text(
        goalX,
        500,
        'END',
        {
          fontSize: '32px',
          color: '#ffffff',
        },
      )
      .setOrigin(0.5);

    for (let x = 16; x < worldWidth; x += 32) {
      ground.create(x, 700, 'ground');
    }

    const goalZone = this.add
      .rectangle(
        goalX,
        600,
        100,
        180,
        0xffffff,
        0.15,
      );

    this.physics.add.existing(
      goalZone,
      true,
    );

    this.player = new Player(this, state.player);

    const enemy = new Enemy(this, {
      id: 'test_enemy',
      position: {
        x: 600,
        y: 500,
      },
      hp: 40,
      maxHp: 40,
      combatStats: {
        attack: 8,
        defense: 3,
      },
      experienceReward: 25,
    });

    this.enemies.push(enemy);

    this.physics.add.overlap(
      this.player,
      goalZone,
      () => {
        console.log('[Game] Prototype completed.');

        this.showPrototypeComplete();
      },
    );

    new CameraSystem(
      this,
      this.player,
      worldWidth,
      worldHeight,
    );

    this.movementSystem = new MovementSystem(
      this,
      this.player,
    );

    this.playerCombatSystem =
      new PlayerCombatSystem(
        this,
        {
          attack: state.player.stats.attack,
          defense: state.player.stats.defense,
        },
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

    this.add
      .text(
        20,
        20,
        '← → Move    SPACE Jump    A Attack',
        {
          fontSize: '20px',
          color: '#ffffff',
        },
      )
      .setScrollFactor(0);

    this.progressionText =
      this.add.text(
        20,
        50,
        '',
        {
          fontSize: '20px',
          color: '#ffffff',
        },
      );

    this.progressionText.setScrollFactor(0);
  }

  private processEnemyRewards(): void {
    for (const enemy of this.enemies) {
      const experience =
        enemy.claimExperienceReward();

      if (experience <= 0) {
        continue;
      }

      const leveledUp =
        this.progressionSystem.addExperience(
          this.progressionState,
          experience,
        );

      this.gameStateManager.updatePlayerProgression(
        this.progressionState.level,
        this.progressionState.experience,
        this.progressionState.stats,
      );

      this.updateProgressionHud();

      console.log(
        `[Progression] Received ${experience} EXP.`,
      );

      if (leveledUp) {
        console.log(
          `[Progression] Level Up! Level ${this.progressionState.level}.`,
        );
      }
    }
  }

  private updateProgressionHud(): void {
    this.progressionText.setText(
      `Level: ${this.progressionState.level}    ` +
      `EXP: ${this.progressionState.experience} / ` +
      `${this.progressionState.experienceToNextLevel}`,
    );
  }

  update(): void {
    this.movementSystem.update();

    this.playerCombatSystem.update(
      this.player,
      this.enemies,
    );

    this.processEnemyRewards();
  }

}
