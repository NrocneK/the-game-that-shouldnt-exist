import type { InventoryItem } from '../../types/inventory/InventoryItem';

export class InventorySystem {
  public addItem(
    inventory: InventoryItem[],
    item: InventoryItem,
  ): InventoryItem[] {
    if (item.quantity <= 0) {
      return inventory.map((entry) => ({ ...entry }));
    }

    const result = inventory.map((entry) => ({ ...entry }));
    const existingItem = result.find(
      (entry) => entry.itemId === item.itemId,
    );

    if (existingItem) {
      existingItem.quantity += item.quantity;
    } else {
      result.push({ ...item });
    }

    return result;
  }

  public addItems(
    inventory: InventoryItem[],
    items: InventoryItem[],
  ): InventoryItem[] {
    let result = inventory.map((entry) => ({ ...entry }));

    for (const item of items) {
      result = this.addItem(result, item);
    }

    return result;
  }

  public removeItem(
    inventory: InventoryItem[],
    itemId: string,
    quantity: number,
  ): InventoryItem[] {
    if (quantity <= 0) {
      return inventory.map((entry) => ({ ...entry }));
    }

    const result = inventory.map((entry) => ({ ...entry }));
    const index = result.findIndex(
      (entry) => entry.itemId === itemId,
    );

    if (index === -1) {
      return result;
    }

    const item = result[index];
    item.quantity -= quantity;

    if (item.quantity <= 0) {
      result.splice(index, 1);
    }

    return result;
  }

  public getQuantity(
    inventory: InventoryItem[],
    itemId: string,
  ): number {
    return inventory.find(
      (item) => item.itemId === itemId,
    )?.quantity ?? 0;
  }
}
