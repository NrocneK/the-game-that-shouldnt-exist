import { EquipmentSystem } from '../equipment/EquipmentSystem';
import { InventorySystem } from '../inventory/InventorySystem';
import { LootSystem } from '../inventory/LootSystem';
import { ProgressionSystem } from '../progression/ProgressionSystem';
import type { GameState } from '../../types/GameState';
import type { LootItem } from '../../types/loot/LootItem';
import type { ProgressionState } from '../../types/progression/ProgressionState';
import type { ItemDefinition } from '../../types/items/ItemDefinition';

export class RPGCoreSystem {
  public readonly progressionSystem = new ProgressionSystem();
  public readonly lootSystem = new LootSystem();
  public readonly inventorySystem = new InventorySystem();
  public readonly equipmentSystem = new EquipmentSystem();

  public addInventoryItems(state: GameState, items: LootItem[]): void {
    state.player.inventory = this.inventorySystem.addItems(
      state.player.inventory,
      items,
    );
  }

  public collectLoot(state: GameState, loot: LootItem[]): void {
    state.player.inventory = this.inventorySystem.addItems(
      state.player.inventory,
      loot,
    );
  }

  public addExperience(state: ProgressionState, amount: number): boolean {
    return this.progressionSystem.addExperience(state, amount);
  }

  public equipItem(state: GameState, item: ItemDefinition): boolean {
    const inventoryQuantity = this.inventorySystem.getQuantity(
      state.player.inventory,
      item.id,
    );

    if (inventoryQuantity <= 0) {
      return false;
    }

    if (
      item.type !== 'weapon' &&
      item.type !== 'armor' &&
      item.type !== 'accessory'
    ) {
      return false;
    }

    const currentEquipment = state.player.equipment;
    const currentItemId = currentEquipment[item.type];

    // The item is already equipped. Do not consume another copy or reapply it.
    if (currentItemId === item.id) {
      return false;
    }

    // Consume one copy of the new equipment from the inventory.
    let inventory = this.inventorySystem.removeItem(
      state.player.inventory,
      item.id,
      1,
    );

    // If another item occupies this slot, return it to the inventory.
    if (currentItemId) {
      inventory = this.inventorySystem.addItem(inventory, {
        itemId: currentItemId,
        quantity: 1,
      });
    }

    state.player.inventory = inventory;
    state.player.equipment = this.equipmentSystem.equip(
      currentEquipment,
      item,
    );

    return true;
  }

  public unequipItem(
    state: GameState,
    type: 'weapon' | 'armor' | 'accessory',
  ): boolean {
    const currentItemId = state.player.equipment[type];

    if (!currentItemId) {
      return false;
    }

    state.player.inventory = this.inventorySystem.addItem(
      state.player.inventory,
      {
        itemId: currentItemId,
        quantity: 1,
      },
    );

    state.player.equipment = this.equipmentSystem.unequip(
      state.player.equipment,
      type,
    );

    return true;
  }

  public syncDerivedStats(
    state: GameState,
    progressionState: ProgressionState,
    definitions: Record<string, ItemDefinition>,
  ): void {
    const bonuses = this.equipmentSystem.getStatBonuses(
      state.player.equipment,
      definitions,
    );

    state.player.stats.maxHp =
      progressionState.stats.maxHp + bonuses.maxHp;
    state.player.stats.attack =
      progressionState.stats.attack + bonuses.attack;
    state.player.stats.defense =
      progressionState.stats.defense + bonuses.defense;
  }
}
