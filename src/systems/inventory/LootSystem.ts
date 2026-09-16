import type { LootItem } from '../../types/loot/LootItem';

export class LootSystem {
  public collectLoot(
    currentLoot: LootItem[],
    newLoot: LootItem[],
  ): LootItem[] {
    const result = currentLoot.map((item) => ({
      itemId: item.itemId,
      quantity: item.quantity,
    }));

    for (const lootItem of newLoot) {
      const quantity = Math.max(0, lootItem.quantity);

      if (quantity === 0) {
        continue;
      }

      const existingItem = result.find(
        (item) => item.itemId === lootItem.itemId,
      );

      if (existingItem) {
        existingItem.quantity += quantity;
        continue;
      }

      result.push({
        itemId: lootItem.itemId,
        quantity,
      });
    }

    return result;
  }
}
