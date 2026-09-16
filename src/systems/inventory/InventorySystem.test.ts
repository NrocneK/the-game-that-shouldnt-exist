import { InventorySystem } from './InventorySystem';

const system = new InventorySystem();

let inventory = system.addItems([], [
  { itemId: 'health_potion', quantity: 2 },
  { itemId: 'gold_coin', quantity: 10 },
]);

inventory = system.addItems(inventory, [
  { itemId: 'health_potion', quantity: 1 },
  { itemId: 'gold_coin', quantity: 5 },
]);

if (system.getQuantity(inventory, 'health_potion') !== 3) {
  throw new Error('[Inventory Test] health_potion stacking failed.');
}

if (system.getQuantity(inventory, 'gold_coin') !== 15) {
  throw new Error('[Inventory Test] gold_coin stacking failed.');
}

inventory = system.removeItem(inventory, 'health_potion', 1);

if (system.getQuantity(inventory, 'health_potion') !== 2) {
  throw new Error('[Inventory Test] removeItem failed.');
}

console.log('[Inventory Test] PASS');
