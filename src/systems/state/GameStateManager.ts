import type { GameState } from '../../types/GameState';

export class GameStateManager {
  private state: GameState;

  constructor() {
    this.state = this.createInitialState();
  }

  private createInitialState(): GameState {
    return {
      player: {
        position: {
          x: 200,
          y: 500,
        },

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
}