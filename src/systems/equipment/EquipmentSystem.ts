import type { EquipmentState } from '../../types/equipment/EquipmentState';
import type { ItemDefinition } from '../../types/items/ItemDefinition';

export class EquipmentSystem {
  public equip(
    equipment: EquipmentState,
    item: ItemDefinition,
  ): EquipmentState {
    const result: EquipmentState = { ...equipment };

    if (item.type === 'weapon') {
      result.weapon = item.id;
    }

    if (item.type === 'armor') {
      result.armor = item.id;
    }

    if (item.type === 'accessory') {
      result.accessory = item.id;
    }

    return result;
  }

  public unequip(
    equipment: EquipmentState,
    type: 'weapon' | 'armor' | 'accessory',
  ): EquipmentState {
    return {
      ...equipment,
      [type]: null,
    };
  }

  public getStatBonuses(
    equipment: EquipmentState,
    definitions: Record<string, ItemDefinition>,
  ): {
    maxHp: number;
    attack: number;
    defense: number;
  } {
    const bonuses = {
      maxHp: 0,
      attack: 0,
      defense: 0,
    };

    const equippedIds = [
      equipment.weapon,
      equipment.armor,
      equipment.accessory,
    ];

    for (const itemId of equippedIds) {
      if (!itemId) {
        continue;
      }

      const item = definitions[itemId];

      if (!item) {
        continue;
      }

      bonuses.maxHp += item.maxHpBonus ?? 0;
      bonuses.attack += item.attackBonus ?? 0;
      bonuses.defense += item.defenseBonus ?? 0;
    }

    return bonuses;
  }
}
