import type { EquipmentState } from './equipment/EquipmentState';
import type { InventoryItem } from './inventory/InventoryItem';

export interface PlayerStats {
  maxHp: number;
  attack: number;
  defense: number;
  speed: number;
}

export interface PlayerState {
  position: {
    x: number;
    y: number;
  };

  hp: number;
  level: number;
  experience: number;
  stats: PlayerStats;
  inventory: InventoryItem[];
  equipment: EquipmentState;
}
