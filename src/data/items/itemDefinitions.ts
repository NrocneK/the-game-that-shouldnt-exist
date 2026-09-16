import type { ItemDefinition } from '../../types/items/ItemDefinition';

export const itemDefinitions: Record<string, ItemDefinition> = {
  travelers_sword: {
    id: 'travelers_sword',
    name: "Traveler's Sword",
    type: 'weapon',
    attackBonus: 3,
  },

  travelers_cloak: {
    id: 'travelers_cloak',
    name: "Traveler's Cloak",
    type: 'armor',
    defenseBonus: 2,
  },

  health_potion: {
    id: 'health_potion',
    name: 'Health Potion',
    type: 'consumable',
  },

  gold_coin: {
    id: 'gold_coin',
    name: 'Gold Coin',
    type: 'quest',
  },

  lucky_ring: {
    id: 'lucky_ring',
    name: 'Lucky Ring',
    type: 'accessory',
    maxHpBonus: 5,
  },
};
