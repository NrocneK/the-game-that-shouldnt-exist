import { EquipmentSystem } from './EquipmentSystem';
import { itemDefinitions } from '../../data/items/itemDefinitions';
import type { EquipmentState } from '../../types/equipment/EquipmentState';

const system = new EquipmentSystem();

let equipment: EquipmentState = {
  weapon: null,
  armor: null,
  accessory: null,
};

equipment = system.equip(equipment, itemDefinitions.travelers_sword);
equipment = system.equip(equipment, itemDefinitions.travelers_cloak);
equipment = system.equip(equipment, itemDefinitions.lucky_ring);

if (equipment.weapon !== 'travelers_sword') {
  throw new Error('[Equipment Test] weapon equip failed.');
}

if (equipment.armor !== 'travelers_cloak') {
  throw new Error('[Equipment Test] armor equip failed.');
}

if (equipment.accessory !== 'lucky_ring') {
  throw new Error('[Equipment Test] accessory equip failed.');
}

const bonuses = system.getStatBonuses(equipment, itemDefinitions);

if (bonuses.attack !== 3 || bonuses.defense !== 2 || bonuses.maxHp !== 5) {
  throw new Error('[Equipment Test] stat bonus calculation failed.');
}

console.log('[Equipment Test] PASS');
