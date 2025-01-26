import {randomFixedItemsPack, spawnersPacks2} from '../../spawnersPacks';
import {spawnersPacks} from '../../spawnersPacks';
import {SpawnerFilterType} from '../../typesSpawner';
import {commonFilters} from './-commonFilters';
import {sbgc} from './sbgc/-sbgcMedium';
import {puppets} from './goodies/-puppets';

export const goodiesFilters: SpawnerFilterType = {
  ...sbgc,
  ...puppets,

  Zombie_C4: {
    ...commonFilters['Zombie_C4'],
    ProbabilityValue: 85,
  },

  Mattress: {
    QuantityMinValue: 1,
    QuantityMaxValue: 1,
    AllowDuplicates: false,
    ProbabilityMultiplier: 1.5,
  },
  Luggage: {
    QuantityMinValue: 1,
    QuantityMaxValue: 2,
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

  'Buildings-Bedroom-Residential-Examine_Drawer': {
    Nodes: {
      Other: {
        postAdd: [spawnersPacks.Nodes.livingRoomWeapns, spawnersPacks.Nodes.livingRoomWeapns],
      },
    },
  },
  'Buildings-Livingroom-Examine_Drawers': {
    Nodes: {
      'Items.Misc': {
        postAdd: [spawnersPacks.Nodes.livingRoomWeapns],
      },
    },
  },

  'Buildings-Armory-TV_Bunker-Examine_Weapon_Locker_Lockpick.json': {
    ProbabilityMultiplier: 0.8,
  },

  'Water-Shipwrecks': {
    ProbabilityMultiplier: 2.5,
    InitialDamageMultiplier: 0.1,
    RandomDamageMultiplier: 0.3,
    QuantityMinValue: 2,
    QuantityMaxValue: 3,
  },

  HuntingStand: {
    QuantityMinMultiplier: 1,
    QuantityMaxMultiplier: 3,
    RandomDamageMultiplier: 0.5,
    Nodes: {
      HuntingTower: {
        postAdd: [
          {
            Rarity: 'Uncommon',
            Ids: ['ItemLootTreeNodes.HuntingTower.Weapons', 'ItemLootTreeNodes.LivingRoom.Other.Weapons'],
          },
          {
            Rarity: 'ExtremelyRare',
            Ids: ['ItemLootTreeNodes.Military.Gear.Attachments.Scopes.WeaponScope_HuntingScope'],
          },
          {
            Rarity: 'ExtremelyRare',
            Ids: ['ItemLootTreeNodes.Military.Gear.Attachments.Scopes.WeaponScope_ACOG_01'],
          },
          {
            Rarity: 'VeryRare',
            Ids: ['ItemLootTreeNodes.Military.FoodDrink.Drink.Beer'],
          },
          {
            Rarity: 'VeryRare',
            Ids: ['ItemLootTreeNodes.Insects'],
          },
        ],
      },
    },
  },

  'Hazmat_Suite_Locker_Small.': {
    additionalFilesMatches: ['Hazmat_Suite_Locker_Big.'],
    ProbabilityValue: 80,
    Items: {
      Hazmat_Suit_Modern: {
        Rarity: 'VeryRare',
      },
      Hazmat_Suit_Vintage: {
        Rarity: 'Rare',
      },
    },
  },

  'Hunting_Store-World_Shelf': {
    Nodes: {
      'Firearms.Handguns': {
        override: 'ItemLootTreeNodes.HuntingStore.ammo.Hunting.Arrows.Broadheads.Metal.SmallStash',
      },
      'Magazines.Handguns': {
        override: 'ItemLootTreeNodes.HuntingStore.Ammo.Hunting.Arrows',
      },
      'Firearms.Shotguns.Civilian': {
        override: 'ItemLootTreeNodes.HuntingStore.Ammo.Hunting.Arrows',
      },
    },
  },
};
