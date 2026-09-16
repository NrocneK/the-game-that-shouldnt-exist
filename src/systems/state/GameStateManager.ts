import type { GameState } from '../../types/GameState';
import type { InventoryItem } from '../../types/inventory/InventoryItem';
import type { EquipmentState } from '../../types/equipment/EquipmentState';

export class GameStateManager {
  private state: GameState;

  constructor() {
    this.state = this.createInitialState();
  }

  private createInitialState(): GameState {
    return {
      player: {
        position: { x: 200, y: 500 },
        hp: 100,
        level: 1,
        experience: 0,
        stats: {
          maxHp: 100,
          attack: 10,
          defense: 5,
          speed: 200,
        },
        inventory: [],
        equipment: {
          weapon: null,
          armor: null,
          accessory: null,
        },
      },
      world: {
        currentArea: 'StartingForest',
        storyFlags: {},
        questStates: {},
        npcStates: {},
      },
    };
  }

  public getState(): GameState {
    return this.state;
  }

  public updatePlayerProgression(
    level: number,
    experience: number,
    stats: {
      maxHp: number;
      attack: number;
      defense: number;
    },
  ): void {
    this.state.player.level = level;
    this.state.player.experience = experience;
    this.state.player.stats.maxHp = stats.maxHp;
    this.state.player.stats.attack = stats.attack;
    this.state.player.stats.defense = stats.defense;
  }

  public updatePlayerInventory(
    inventory: InventoryItem[],
  ): void {
    this.state.player.inventory = inventory.map((item) => ({ ...item }));
  }

  public updatePlayerEquipment(
    equipment: EquipmentState,
  ): void {
    this.state.player.equipment = { ...equipment };
  }
}
