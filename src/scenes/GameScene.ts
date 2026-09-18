import Phaser from 'phaser';

import { Player } from '../entities/player/Player';
import { Enemy } from '../entities/enemy/Enemy';
import { NPC } from '../entities/npc/NPC';
import { AnomalyMarker } from '../entities/world/AnomalyMarker';

import { GameStateManager } from '../systems/state/GameStateManager';
import { MovementSystem } from '../systems/movement/MovementSystem';
import { CameraSystem } from '../systems/world/CameraSystem';
import { InteractionSystem } from '../systems/world/InteractionSystem';
import { PlayerCombatSystem } from '../systems/combat/PlayerCombatSystem';
import { RPGCoreSystem } from '../systems/rpg/RPGCoreSystem';
import { DialogueSystem } from '../systems/dialogue/DialogueSystem';
import { QuestSystem } from '../systems/quest/QuestSystem';
import { WorldStateSystem } from '../systems/state/WorldStateSystem';
import { AnomalySystem } from '../systems/anomaly/AnomalySystem';

import type { ProgressionState } from '../types/progression/ProgressionState';
import type { LootState } from '../types/loot/LootState';

import { itemDefinitions } from '../data/items/itemDefinitions';
import { testEnemyState } from '../data/enemies/testEnemy';
import { startingForest } from '../data/world/startingForest';
import { minersRequest } from '../data/quests/minersRequest';
import { oldMinerDialogues } from '../data/npcs/oldMiner';
import { oldMinerState } from '../data/npcs/oldMinerState';
import { forestAnomaly } from '../data/anomalies/forestAnomaly';

export class GameScene extends Phaser.Scene {
  private gameStateManager!: GameStateManager;

  private movementSystem!: MovementSystem;

  private playerCombatSystem!: PlayerCombatSystem;

  private interactionSystem!: InteractionSystem;

  private dialogueSystem!: DialogueSystem;

  private questSystem!: QuestSystem;

  private rpgCoreSystem!: RPGCoreSystem;

  private worldStateSystem!: WorldStateSystem;

  private anomalySystem!: AnomalySystem;

  private progressionState!: ProgressionState;

  private lootState!: LootState;

  private progressionText!: Phaser.GameObjects.Text;

  private inventoryText!: Phaser.GameObjects.Text;

  private equipmentText!: Phaser.GameObjects.Text;

  private questText!: Phaser.GameObjects.Text;

  private dialogueBox!: Phaser.GameObjects.Rectangle;

  private dialogueText!: Phaser.GameObjects.Text;

  private dialogueAdvanceKey!: Phaser.Input.Keyboard.Key;

  private player!: Player;

  private enemies: Enemy[] = [];

  private npcs: NPC[] = [];

  private questEnemyProcessed = false;

  private questRewardGranted = false;

  private minerCompletedDialogueShown =
    false;

  constructor() {
    super('GameScene');
  }

  create(): void {
    console.log(
      '[GameScene] Phase 3 game started.',
    );

    this.gameStateManager =
      new GameStateManager();

    const state =
      this.gameStateManager.getState();

    this.worldStateSystem =
      new WorldStateSystem(
        this.gameStateManager.getState().world,
      );

    this.anomalySystem =
      new AnomalySystem(
        this.worldStateSystem,
      );

    this.anomalySystem.register(
      forestAnomaly,
    );

    this.progressionState = {
      level: state.player.level,

      experience:
        state.player.experience,

      experienceToNextLevel: 100,

      stats: {
        maxHp:
          state.player.stats.maxHp,

        attack:
          state.player.stats.attack,

        defense:
          state.player.stats.defense,
      },

      statGrowth: {
        maxHp: 10,
        attack: 2,
        defense: 1,
      },
    };

    this.rpgCoreSystem =
      new RPGCoreSystem();

    this.lootState = {
      items: [],
    };

    /*
     * Phase 2 equipment test inventory.
     */
    state.player.inventory =
      this.rpgCoreSystem.inventorySystem.addItems(
        state.player.inventory,
        [
          {
            itemId:
              'travelers_sword',
            quantity: 1,
          },

          {
            itemId:
              'travelers_cloak',
            quantity: 1,
          },

          {
            itemId:
              'lucky_ring',
            quantity: 1,
          },
        ],
      );

    /*
     * Quest system.
     */
    this.questSystem =
      new QuestSystem();

    this.questSystem.register(
      minersRequest,
    );

    /*
     * Dialogue system.
     */
    this.dialogueSystem =
      new DialogueSystem();

    Object.values(
      oldMinerDialogues,
    ).forEach(
      (dialogue) => {
        this.dialogueSystem.register(
          dialogue,
        );
      },
    );

    const worldWidth =
      startingForest.width;

    const worldHeight =
      startingForest.height;

    this.physics.world.setBounds(
      0,
      0,
      worldWidth,
      worldHeight,
    );

    /*
     * Background.
     */
    this.add.rectangle(
      worldWidth / 2,
      worldHeight / 2,
      worldWidth,
      worldHeight,
      0x1a1a1a,
    );

    /*
     * Ground.
     */
    const ground =
      this.physics.add.staticGroup();

    for (
      let x = 16;
      x < worldWidth;
      x += 32
    ) {
      ground.create(
        x,
        700,
        'ground',
      );
    }

    /*
     * Player.
     */
    this.player = new Player(
      this,
      state.player,
    );

    /*
     * Enemy.
     */
    const enemyState = {
      ...testEnemyState,

      position: {
        x: 850,
        y: 500,
      },
    };

    const enemy = new Enemy(
      this,
      enemyState,
    );

    this.enemies.push(enemy);

    /*
     * NPC.
     */
    const miner = new NPC(
      this,
      oldMinerState,
    );

    this.npcs.push(miner);

    /*
     * Physics.
     */
    this.physics.add.collider(
      this.player,
      ground,
    );

    this.physics.add.collider(
      enemy,
      ground,
    );

    this.physics.add.collider(
      miner,
      ground,
    );
    /*
     * Camera.
     */
    new CameraSystem(
      this,
      this.player,
      worldWidth,
      worldHeight,
    );

    /*
     * Gameplay systems.
     */
    this.movementSystem =
      new MovementSystem(
        this,
        this.player,
      );

    this.playerCombatSystem =
      new PlayerCombatSystem(
        this,
        state.player.stats,
      );

    this.interactionSystem =
      new InteractionSystem(
        this,
        90,
      );

    /*
     * HUD.
     */
    this.createHud();

    this.createDialogueHud();

    this.createEquipmentTestControls();

    this.updateAllHud();

    console.log(
      '[World] Area:',
      startingForest.name,
    );

    console.log(
      '[Player] Spawned at:',
      this.player.x,
      this.player.y,
    );
  }

  private createHud(): void {
    this.add.text(
      20,
      20,
      '← → Move    SPACE Jump    A Attack    E Interact',
      {
        fontSize: '20px',
        color: '#ffffff',
      },
    ).setScrollFactor(0);

    this.progressionText =
      this.add.text(
        20,
        50,
        '',
        {
          fontSize: '20px',
          color: '#ffffff',
        },
      ).setScrollFactor(0);

    this.inventoryText =
      this.add.text(
        20,
        80,
        '',
        {
          fontSize: '18px',
          color: '#ffffff',
        },
      ).setScrollFactor(0);

    this.equipmentText =
      this.add.text(
        20,
        110,
        '',
        {
          fontSize: '18px',
          color: '#ffffff',
        },
      ).setScrollFactor(0);

    this.questText =
      this.add.text(
        20,
        140,
        '',
        {
          fontSize: '18px',
          color: '#ffffff',
        },
      ).setScrollFactor(0);
  }

  private createDialogueHud(): void {
    this.dialogueBox =
      this.add.rectangle(
        this.scale.width / 2,
        this.scale.height - 120,
        1000,
        170,
        0x000000,
        0.9,
      )
        .setScrollFactor(0)
        .setVisible(false);

    this.dialogueText =
      this.add.text(
        this.scale.width / 2 - 450,
        this.scale.height - 180,
        '',
        {
          fontSize: '22px',
          color: '#ffffff',
          wordWrap: {
            width: 900,
          },
        },
      )
        .setScrollFactor(0)
        .setVisible(false);

    this.dialogueAdvanceKey =
      this.input.keyboard!.addKey(
        Phaser.Input.Keyboard.KeyCodes.E,
      );
  }

  private createEquipmentTestControls(): void {
    this.add.text(
      20,
      170,
      '1 Sword    2 Cloak    3 Ring    0 Unequip All',
      {
        fontSize: '18px',
        color: '#cccccc',
      },
    ).setScrollFactor(0);

    this.input.keyboard!
      .addKey(
        Phaser.Input.Keyboard.KeyCodes.ONE,
      )
      .on(
        'down',
        () =>
          this.equipById(
            'travelers_sword',
          ),
      );

    this.input.keyboard!
      .addKey(
        Phaser.Input.Keyboard.KeyCodes.TWO,
      )
      .on(
        'down',
        () =>
          this.equipById(
            'travelers_cloak',
          ),
      );

    this.input.keyboard!
      .addKey(
        Phaser.Input.Keyboard.KeyCodes.THREE,
      )
      .on(
        'down',
        () =>
          this.equipById(
            'lucky_ring',
          ),
      );

    this.input.keyboard!
      .addKey(
        Phaser.Input.Keyboard.KeyCodes.ZERO,
      )
      .on(
        'down',
        () => {
          const state =
            this.gameStateManager.getState();

          this.rpgCoreSystem.unequipItem(
            state,
            'weapon',
          );

          this.rpgCoreSystem.unequipItem(
            state,
            'armor',
          );

          this.rpgCoreSystem.unequipItem(
            state,
            'accessory',
          );

          this.syncRpgState();

          console.log(
            '[Equipment] Unequipped all.',
          );
        },
      );
  }

  private equipById(
    itemId: string,
  ): void {
    const item =
      itemDefinitions[itemId];

    const state =
      this.gameStateManager.getState();

    if (!item) {
      return;
    }

    const equipped =
      this.rpgCoreSystem.equipItem(
        state,
        item,
      );

    if (!equipped) {
      console.log(
        `[Equipment] Item not in inventory: ${itemId}`,
      );

      return;
    }

    this.syncRpgState();

    console.log(
      `[Equipment] Equipped: ${item.name}`,
    );
  }

  private getMinerDialogueId(): string {
    if (
      this.worldStateSystem.hasTriggeredAnomaly(
        'forest_anomaly_01',
      )
    ) {
      return oldMinerDialogues
        .anomaly.id;
    }

    const status =
      this.questSystem.getStatus(
        minersRequest.id,
      );

    if (
      status === 'available'
    ) {
      return oldMinerDialogues
        .available.id;
    }

    if (
      status === 'active'
    ) {
      return oldMinerDialogues
        .active.id;
    }

    if (
      status === 'ready'
    ) {
      return oldMinerDialogues
        .ready.id;
    }

    return oldMinerDialogues
      .completed.id;
  }

  private interactWithNpc(
    npc: NPC,
  ): void {
    if (
      npc.getId() !==
      oldMinerState.id
    ) {
      return;
    }

    const status =
      this.questSystem.getStatus(
        minersRequest.id,
      );

    if (
      this.dialogueSystem.isActive()
    ) {
      return;
    }

    /*
     * Start the appropriate dialogue.
     */
    this.dialogueSystem.start(
      this.getMinerDialogueId(),
    );

    /*
     * First conversation:
     * accept quest.
     */
    if (
      status === 'available'
    ) {
      this.questSystem.accept(
        minersRequest.id,
      );
    }

    /*
     * Enemy defeated:
     * complete quest and grant reward.
     */
    else if (
      status === 'ready'
    ) {
      const completedQuest =
        this.questSystem.complete(
          minersRequest.id,
        );

      if (
        completedQuest &&
        !this.questRewardGranted
      ) {
        const reward =
          completedQuest.reward
            .experience ?? 0;

        if (reward > 0) {
          this.rpgCoreSystem.addExperience(
            this.progressionState,
            reward,
          );
        }

        this.questRewardGranted =
          true;

        this.syncRpgState();

        console.log(
          `[Quest] Completed: ${completedQuest.title}`,
        );
      }
    }

    /*
     * Post-quest anomaly.
     */
    else if (
      status === 'completed' &&
      this.questRewardGranted &&
      !this.minerCompletedDialogueShown
    ) {
      this.minerCompletedDialogueShown =
        true;

      const state =
        this.gameStateManager.getState();

      state.world.storyFlags[
        'forest_anomaly_01'
      ] = true;

      state.world.storyFlags[
        'miner_request_completed'
      ] = true;

      this.worldStateSystem.setStoryFlag(
        'forest_anomaly_01',
      );

      const anomaly =
        this.anomalySystem.trigger(
          'forest_anomaly_01',
        );

      if (anomaly) {
        console.log(
          `[World] ${anomaly.worldReaction}`,
        );

        new AnomalyMarker(
          this,
          850,
          300,
        );
      }

      console.log(
        '[World] Anomaly flag set: forest_anomaly_01',
      );
    }

    this.updateAllHud();
  }

  private updateDialogueHud(): void {
    const line =
      this.dialogueSystem
        .getCurrentLine();

    if (!line) {
      this.dialogueBox
        .setVisible(false);

      this.dialogueText
        .setVisible(false);

      return;
    }

    this.dialogueBox
      .setVisible(true);

    this.dialogueText
      .setVisible(true);

    this.dialogueText.setText(
      `${line.speaker}: ${line.text}\n\n[E] Continue`,
    );
  }

  private processEnemyRewards(): void {
    const state =
      this.gameStateManager.getState();

    for (
      const enemy of this.enemies
    ) {
      /*
       * Quest objective.
       */
      if (
        enemy.isDefeated() &&
        !this.questEnemyProcessed
      ) {
        this.questSystem
          .updateEnemyDefeated(
            enemy.getId(),
          );

        this.questEnemyProcessed =
          true;
      }

      /*
       * EXP.
       */
      const experience =
        enemy.claimExperienceReward();

      if (experience > 0) {
        const leveledUp =
          this.rpgCoreSystem.addExperience(
            this.progressionState,
            experience,
          );

        this.syncRpgState();

        console.log(
          `[Progression] Received ${experience} EXP.`,
        );

        if (leveledUp) {
          console.log(
            `[Progression] Level Up! Level ${this.progressionState.level}.`,
          );
        }
      }

      /*
       * Loot.
       */
      const loot =
        enemy.claimLoot();

      if (loot.length > 0) {
        this.lootState.items =
          this.rpgCoreSystem
            .lootSystem
            .collectLoot(
              this.lootState.items,
              loot,
            );

        this.rpgCoreSystem.collectLoot(
          state,
          loot,
        );

        console.log(
          '[Loot] Collected:',
          loot,
        );
      }
    }

    this.updateAllHud();
  }

  private syncRpgState(): void {
    const state =
      this.gameStateManager.getState();

    this.gameStateManager
      .updatePlayerProgression(
        this.progressionState.level,
        this.progressionState.experience,
        this.progressionState.stats,
      );

    this.rpgCoreSystem
      .syncDerivedStats(
        state,
        this.progressionState,
        itemDefinitions,
      );

    this.gameStateManager
      .updatePlayerEquipment(
        state.player.equipment,
      );

    this.updateAllHud();
  }

  private updateAllHud(): void {
    if (!this.progressionText) {
      return;
    }

    const state =
      this.gameStateManager.getState();

    this.progressionText.setText(
      `Level: ${state.player.level}    ` +
      `EXP: ${state.player.experience} / ` +
      `${this.progressionState.experienceToNextLevel}`,
    );

    const inventory =
      state.player.inventory
        .map(
          (item) =>
            `${item.itemId} x${item.quantity}`,
        )
        .join(' | ');

    this.inventoryText.setText(
      `Inventory: ${inventory || 'Empty'
      }`,
    );

    this.equipmentText.setText(
      `Equipment: ` +
      `W=${state.player.equipment.weapon ?? '-'} ` +
      `A=${state.player.equipment.armor ?? '-'} ` +
      `X=${state.player.equipment.accessory ?? '-'} ` +
      `| ATK ${state.player.stats.attack} ` +
      `DEF ${state.player.stats.defense} ` +
      `HP ${state.player.stats.maxHp}`,
    );

    const questState =
      this.questSystem.getState(
        minersRequest.id,
      );

    const quest =
      this.questSystem.getDefinition(
        minersRequest.id,
      );

    if (
      questState &&
      quest
    ) {
      this.questText.setText(
        `Quest: ${quest.title} ` +
        `[${questState.status}] ` +
        `${questState.objectiveProgress}/` +
        `${quest.objective.requiredCount}`,
      );
    }
  }

  update(): void {
    /*
     * IMPORTANT:
     *
     * Dialogue is advanced ONLY when
     * E is pressed.
     *
     * It must NOT be advanced every frame.
     */
    if (
      this.dialogueSystem.isActive()
    ) {


      if (
        Phaser.Input.Keyboard.JustDown(
          this.dialogueAdvanceKey,
        )
      ) {
        this.dialogueSystem.advance();
      }

      this.updateDialogueHud();

      return;
    }

    this.movementSystem.update();

    this.playerCombatSystem.update(
      this.player,
      this.enemies,
    );

    this.processEnemyRewards();

    /*
     * NPC interaction.
     */
    if (
      this.interactionSystem.isPressed()
    ) {
      const npc =
        this.interactionSystem
          .getNearbyNpc(
            this.player,
            this.npcs,
          );

      if (npc) {
        this.interactWithNpc(npc);
      }
    }

    this.updateDialogueHud();
  }
}