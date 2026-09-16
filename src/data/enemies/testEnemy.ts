import type { EnemyState } from '../../types/EnemyState';

export const testEnemyState: EnemyState = {
  id: 'test_enemy',
  position: {
    x: 850,
    y: 500,
  },
  hp: 40,
  maxHp: 40,
  combatStats: {
    attack: 8,
    defense: 3,
  },
  experienceReward: 25,
  loot: [
    { itemId: 'health_potion', quantity: 1 },
    { itemId: 'gold_coin', quantity: 10 },
  ],
};
