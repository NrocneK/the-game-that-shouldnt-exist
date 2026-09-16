import { LootSystem } from './LootSystem';

const system = new LootSystem();

const result = system.collectLoot(
  [{ itemId: 'health_potion', quantity: 2 }],
  [
    { itemId: 'health_potion', quantity: 1 },
    { itemId: 'gold_coin', quantity: 10 },
  ],
);

const potion = result.find((item) => item.itemId === 'health_potion');
const gold = result.find((item) => item.itemId === 'gold_coin');

if (potion?.quantity !== 3) {
  throw new Error(`[Loot Test] Expected health_potion x3, got ${potion?.quantity ?? 0}`);
}

if (gold?.quantity !== 10) {
  throw new Error(`[Loot Test] Expected gold_coin x10, got ${gold?.quantity ?? 0}`);
}

console.log('[Loot Test] PASS');
