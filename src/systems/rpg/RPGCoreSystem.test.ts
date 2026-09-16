import { RPGCoreSystem } from './RPGCoreSystem';
import { itemDefinitions } from '../../data/items/itemDefinitions';
import type { GameState } from '../../types/GameState';
import type { ProgressionState } from '../../types/progression/ProgressionState';

const system = new RPGCoreSystem();

const gameState: GameState = {
  player: {
    position: { x: 0, y: 0 },
    hp: 100,
    level: 1,
    experience: 0,
    stats: { maxHp: 100, attack: 10, defense: 5, speed: 200 },
    inventory: [],
    equipment: { weapon: null, armor: null, accessory: null },
  },
  world: {
    currentArea: 'StartingForest',
    storyFlags: {},
    questStates: {},
    npcStates: {},
  },
};

const progressionState: ProgressionState = {
  level: 1,
  experience: 0,
  experienceToNextLevel: 100,
  stats: { maxHp: 100, attack: 10, defense: 5 },
  statGrowth: { maxHp: 10, attack: 2, defense: 1 },
};

system.collectLoot(gameState, [
  { itemId: 'health_potion', quantity: 1 },
  { itemId: 'gold_coin', quantity: 10 },
]);

if (system.inventorySystem.getQuantity(gameState.player.inventory, 'health_potion') !== 1) {
  throw new Error('[RPG Core Test] loot -> inventory failed.');
}

system.addInventoryItems(gameState, [
  { itemId: 'travelers_sword', quantity: 1 },
  { itemId: 'travelers_cloak', quantity: 1 },
  { itemId: 'lucky_ring', quantity: 1 },
]);

if (!system.equipItem(gameState, itemDefinitions.travelers_sword)) {
  throw new Error('[RPG Core Test] weapon integration failed.');
}

if (system.inventorySystem.getQuantity(gameState.player.inventory, 'travelers_sword') !== 0) {
  throw new Error('[RPG Core Test] equipped weapon was not removed from inventory.');
}

if (system.equipItem(gameState, itemDefinitions.travelers_sword)) {
  throw new Error('[RPG Core Test] already equipped weapon can be equipped again.');
}

if (!system.equipItem(gameState, itemDefinitions.travelers_cloak)) {
  throw new Error('[RPG Core Test] armor integration failed.');
}

if (!system.equipItem(gameState, itemDefinitions.lucky_ring)) {
  throw new Error('[RPG Core Test] accessory integration failed.');
}

system.addExperience(progressionState, 100);
system.syncDerivedStats(gameState, progressionState, itemDefinitions);

if (progressionState.level !== 2) {
  throw new Error('[RPG Core Test] progression state mismatch.');
}

if (gameState.player.stats.attack !== 15) {
  throw new Error(`[RPG Core Test] expected attack 15, got ${gameState.player.stats.attack}.`);
}

if (gameState.player.stats.defense !== 8) {
  throw new Error(`[RPG Core Test] expected defense 8, got ${gameState.player.stats.defense}.`);
}

if (gameState.player.stats.maxHp !== 115) {
  throw new Error(`[RPG Core Test] expected maxHp 115, got ${gameState.player.stats.maxHp}.`);
}

if (!system.unequipItem(gameState, 'weapon')) {
  throw new Error('[RPG Core Test] weapon unequip failed.');
}

if (gameState.player.equipment.weapon !== null) {
  throw new Error('[RPG Core Test] weapon was not cleared after unequip.');
}

if (system.inventorySystem.getQuantity(gameState.player.inventory, 'travelers_sword') !== 1) {
  throw new Error('[RPG Core Test] unequipped weapon was not returned to inventory.');
}

console.log('[RPG Core Test] PASS');
