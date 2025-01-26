import {SpawnerFilterType} from '../../typesSpawner';
import {goodiesFilters} from './-goodiesFilters';
import {sbgc} from './sbgc/-sbgcHigh';

export const premiumFilters: SpawnerFilterType = {
  ...sbgc,

  'Buildings-Armory-Prison-Examine_Weapon_Locker_Lockpick_Weapon': {
    Nodes: {
      'Weapons.SMGs': {
        listAdd: ['ItemLootTreeNodes.Police.Weapons'],
      },
    },
  },

  Car_Repair_Shop: {
    Nodes: {},
  },

  Zombie_C4: {
    ...goodiesFilters['Zombie_C4'],
    ProbabilityValue: 100,
  },

  Mattress: {
    QuantityMinValue: 1,
    QuantityMaxValue: 2,
    AllowDuplicates: true,
    ProbabilityMultiplier: 2,
  },
  Luggage: {
    QuantityMinValue: 2,
    QuantityMaxValue: 3,
    AllowDuplicates: true,
    ProbabilityMultiplier: 2,
    postSpawnActionsMode: 'add',
    postSpawnActions: ['SetCashAmount_SmallStash'],
    Nodes: {
      '*': {
        postAdd: [
          {
            Rarity: 'Uncommon',
            Ids: ['ItemLootTreeNodes.LivingRoom.Other.Money'],
          },
        ],
      },
    },
  },

  HuntingStand: {
    ...goodiesFilters.HuntingStand,
    QuantityMinMultiplier: 2,
  },
};
