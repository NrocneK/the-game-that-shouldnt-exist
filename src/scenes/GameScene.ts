import Phaser from 'phaser';

import { Player } from '../entities/player/Player';
import { Enemy } from '../entities/enemy/Enemy';
import { GameStateManager } from '../systems/state/GameStateManager';
import { MovementSystem } from '../systems/movement/MovementSystem';
import { CameraSystem } from '../systems/world/CameraSystem';
import { PlayerCombatSystem } from '../systems/combat/PlayerCombatSystem';
import { RPGCoreSystem } from '../systems/rpg/RPGCoreSystem';
import type { ProgressionState } from '../types/progression/ProgressionState';
import type { LootState } from '../types/loot/LootState';
import { itemDefinitions } from '../data/items/itemDefinitions';
import { testEnemyState } from '../data/enemies/testEnemy';

export class GameScene extends Phaser.Scene {
  private gameStateManager!: GameStateManager;
  private movementSystem!: MovementSystem;
  private playerCombatSystem!: PlayerCombatSystem;
  private rpgCoreSystem!: RPGCoreSystem;
  private progressionState!: ProgressionState;
  private lootState!: LootState;

  private progressionText!: Phaser.GameObjects.Text;
  private inventoryText!: Phaser.GameObjects.Text;
  private equipmentText!: Phaser.GameObjects.Text;
  private player!: Player;
  private enemies: Enemy[] = [];

  private showPrototypeComplete(): void {
    this.movementSystem.disable();

    this.add.rectangle(
      this.scale.width / 2,
      this.scale.height / 2,
      700,
      300,
      0x000000,
      0.9,
    ).setScrollFactor(0);

    this.add.text(
      this.scale.width / 2,
      this.scale.height / 2 - 40,
      'PROTOTYPE COMPLETE',
      { fontSize: '42px', color: '#ffffff' },
    ).setOrigin(0.5).setScrollFactor(0);

    this.add.text(
      this.scale.width / 2,
      this.scale.height / 2 + 30,
      'Phase 2 RPG Core Validation',
      { fontSize: '24px', color: '#cccccc' },
    ).setOrigin(0.5).setScrollFactor(0);
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

    this.rpgCoreSystem = new RPGCoreSystem();
    this.lootState = { items: [] };

    // Phase 2 equipment test inventory.
    state.player.inventory = this.rpgCoreSystem.inventorySystem.addItems(
      state.player.inventory,
      [
        { itemId: 'travelers_sword', quantity: 1 },
        { itemId: 'travelers_cloak', quantity: 1 },
        { itemId: 'lucky_ring', quantity: 1 },
      ],
    );

    console.log('[GameState] Initial state:', state);

    const worldWidth = 2400;
    const worldHeight = 720;

    this.physics.world.setBounds(0, 0, worldWidth, worldHeight);

    this.add.rectangle(
      worldWidth / 2,
      worldHeight / 2,
      worldWidth,
      worldHeight,
      0x1a1a1a,
    );

    const ground = this.physics.add.staticGroup();
    const goalX = 2200;

    this.add.rectangle(goalX, 600, 80, 160, 0x444444);
    this.add.text(goalX, 500, 'END', {
      fontSize: '32px',
      color: '#ffffff',
    }).setOrigin(0.5);

    for (let x = 16; x < worldWidth; x += 32) {
      ground.create(x, 700, 'ground');
    }

    const goalZone = this.add.rectangle(
      goalX,
      600,
      100,
      180,
      0xffffff,
      0.15,
    );
    this.physics.add.existing(goalZone, true);

    this.player = new Player(this, state.player);

    const enemy = new Enemy(this, testEnemyState);

    this.enemies.push(enemy);

    this.physics.add.collider(this.player, ground);
    this.physics.add.collider(enemy, ground);

    this.physics.add.overlap(this.player, goalZone, () => {
      console.log('[Game] Prototype completed.');
      this.showPrototypeComplete();
    });

    new CameraSystem(this, this.player, worldWidth, worldHeight);

    this.movementSystem = new MovementSystem(this, this.player);

    this.playerCombatSystem = new PlayerCombatSystem(
      this,
      state.player.stats,
    );

    this.createHud();
    this.createEquipmentTestControls();
    this.updateAllHud();

    console.log('[Player] Spawned at:', this.player.x, this.player.y);
  }

  private createHud(): void {
    this.add.text(20, 20, '← → Move    SPACE Jump    A Attack', {
      fontSize: '20px',
      color: '#ffffff',
    }).setScrollFactor(0);

    this.progressionText = this.add.text(20, 50, '', {
      fontSize: '20px',
      color: '#ffffff',
    }).setScrollFactor(0);

    this.inventoryText = this.add.text(20, 80, '', {
      fontSize: '18px',
      color: '#ffffff',
    }).setScrollFactor(0);

    this.equipmentText = this.add.text(20, 110, '', {
      fontSize: '18px',
      color: '#ffffff',
    }).setScrollFactor(0);
  }

  private createEquipmentTestControls(): void {
    this.add.text(20, 140, '1 Sword    2 Cloak    3 Ring    0 Unequip All', {
      fontSize: '18px',
      color: '#cccccc',
    }).setScrollFactor(0);

    this.input.keyboard!.addKey(Phaser.Input.Keyboard.KeyCodes.ONE).on(
      'down',
      () => this.equipById('travelers_sword'),
    );

    this.input.keyboard!.addKey(Phaser.Input.Keyboard.KeyCodes.TWO).on(
      'down',
      () => this.equipById('travelers_cloak'),
    );

    this.input.keyboard!.addKey(Phaser.Input.Keyboard.KeyCodes.THREE).on(
      'down',
      () => this.equipById('lucky_ring'),
    );

    this.input.keyboard!.addKey(Phaser.Input.Keyboard.KeyCodes.ZERO).on(
      'down',
      () => {
        this.rpgCoreSystem.unequipItem(this.gameStateManager.getState(), 'weapon');
        this.rpgCoreSystem.unequipItem(this.gameStateManager.getState(), 'armor');
        this.rpgCoreSystem.unequipItem(this.gameStateManager.getState(), 'accessory');
        this.syncRpgState();
        console.log('[Equipment] Unequipped all.');
      },
    );
  }

  private equipById(itemId: string): void {
    const item = itemDefinitions[itemId];
    const state = this.gameStateManager.getState();

    if (!item) {
      return;
    }

    const equipped = this.rpgCoreSystem.equipItem(state, item);

    if (!equipped) {
      console.log(`[Equipment] Item not in inventory: ${itemId}`);
      return;
    }

    this.syncRpgState();
    console.log(`[Equipment] Equipped: ${item.name}`);
  }

  private processEnemyRewards(): void {
    const state = this.gameStateManager.getState();

    for (const enemy of this.enemies) {
      const experience = enemy.claimExperienceReward();

      if (experience > 0) {
        const leveledUp = this.rpgCoreSystem.addExperience(
          this.progressionState,
          experience,
        );

        this.syncRpgState();

        console.log(`[Progression] Received ${experience} EXP.`);

        if (leveledUp) {
          console.log(
            `[Progression] Level Up! Level ${this.progressionState.level}.`,
          );
        }
      }

      const loot = enemy.claimLoot();

      if (loot.length > 0) {
        this.lootState.items = this.rpgCoreSystem.lootSystem.collectLoot(
          this.lootState.items,
          loot,
        );
        this.rpgCoreSystem.collectLoot(state, loot);

        console.log('[Loot] Collected:', loot);
        console.log('[Inventory] Updated:', state.player.inventory);
      }
    }

    this.updateAllHud();
  }

  private syncRpgState(): void {
    const state = this.gameStateManager.getState();

    this.gameStateManager.updatePlayerProgression(
      this.progressionState.level,
      this.progressionState.experience,
      this.progressionState.stats,
    );

    this.rpgCoreSystem.syncDerivedStats(
      state,
      this.progressionState,
      itemDefinitions,
    );

    this.gameStateManager.updatePlayerEquipment(
      state.player.equipment,
    );

    this.updateAllHud();
  }

  private updateAllHud(): void {
    const state = this.gameStateManager.getState();

    this.progressionText.setText(
      `Level: ${state.player.level}    EXP: ${state.player.experience} / ${this.progressionState.experienceToNextLevel}`,
    );

    const inventory = state.player.inventory
      .map((item) => `${item.itemId} x${item.quantity}`)
      .join(' | ');

    this.inventoryText.setText(`Inventory: ${inventory || 'Empty'}`);

    this.equipmentText.setText(
      `Equipment: W=${state.player.equipment.weapon ?? '-'} ` +
      `A=${state.player.equipment.armor ?? '-'} ` +
      `X=${state.player.equipment.accessory ?? '-'} ` +
      `| ATK ${state.player.stats.attack} DEF ${state.player.stats.defense} HP ${state.player.stats.maxHp}`,
    );
  }

  update(): void {
    this.movementSystem.update();
    this.playerCombatSystem.update(this.player, this.enemies);
    this.processEnemyRewards();
  }
}
