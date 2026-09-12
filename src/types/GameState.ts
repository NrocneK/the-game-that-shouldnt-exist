import type { PlayerState } from './PlayerState';
import type { WorldState } from './WorldState';

export interface GameState {
  player: PlayerState;
  world: WorldState;
}