import type { ItemType } from './ItemType';

export interface ItemDefinition {
  id: string;
  name: string;
  type: ItemType;
  attackBonus?: number;
  defenseBonus?: number;
  maxHpBonus?: number;
}
