import path from 'path';

import {SpawnersConfigType} from '../typesSpawner';
import {pathSpawnersOverride} from '../_lootPaths';
import {randomFixedItemsPack, spawnersPacks, spawnersPacks2} from '../spawnersPacks';

export const spawnersConfig: SpawnersConfigType = {
  pathSpawnersOverride: path.join(pathSpawnersOverride, '-World'),
  skipFilePatterns: [],
  defaults: {
    defaultInitialMinDamage: 0,
    defaultRandomMinDamage: 0,
    defaultProbabilityMultiplier: 1.2,
    defaultInitialDamageMultiplier: 1,
    defaultRandomDamageMultiplier: 1,
    defaultInitialUsageMultiplier: 1,
    defaultRandomUsageMultiplier: 1,
    defaultQuantityMinMultiplier: 1,
    defaultQuantityMaxMultiplier: 1,
    defaultInitialDamageRandomMaxMultiplierIfZero: 0,
  },
  filter: {
    'Water-Shipwrecks': {
      ProbabilityMultiplier: 2,
      InitialDamageMultiplier: 0.1,
      RandomDamageMultiplier: 0.3,
      QuantityMinValue: 2,
      QuantityMaxValue: 3,
    },

    '*': {
      Nodes: {
        Locks: {
          override: '',
        },
      },
    },

    'Vault-Examine': {
      excludedFilesMatches: ['Pistols', 'MP5', 'ASVal', 'AKS74U', 'Ammo'],
      FixedItems: {
        '*': () => randomFixedItemsPack([spawnersPacks, spawnersPacks2]),
      },
    },

    'Killbox-Examine': {
      excludedFilesMatches: ['Pink', 'UMP', 'MP5', 'Ninja', 'Vietnam', 'Worldwar2', 'Kar98', 'M1_', 'AS_Val', 'AKS74U', 'M16A4', 'Kar98'],
      FixedItems: {
        '*': () => randomFixedItemsPack([spawnersPacks, spawnersPacks2]),
      },
    },

    Lockpick_PhenixT: {
      additionalFilesMatches: ['INT_Ea'],
      ProbabilityMultiplier: 0.8,
    },

    Car_Repair_Shop: {
      ProbabilityMultiplier: 0.9,
      Nodes: {
        'CarRepairShop.Crafting': {
          postAdd: [
            {
              Ids: ['ItemLootTreeNodes.CarRepairShop.Tools'],
              Rarity: 'Uncommon',
            },
          ],
        },
      },
    },

    Examine_File_Cabinet: {
      Nodes: {
        'Weapons.Ammo': {
          override: '',
        },
        'Other.Weapons.Magazines': {
          override: '',
          listAdd: 'ItemLootTreeNodes.Office.Items.Misc.Locks',
        },
      },
    },
    'Armory-Residential-Examine_Military_Weapons_Crate': {
      ProbabilityMultiplier: 1.4,
      Nodes: {
        SMGs: {
          remove: true,
        },
        Rifles: {
          remove: true,
          postAdd: [
            {Rarity: 'ExtremelyRare', Ids: ['ItemLootTreeNodes.Military.Weapons.Rifles', 'ItemLootTreeNodes.HuntingStore.tools.Heavy.Bats']},
            {Rarity: 'VeryRare', Ids: ['ItemLootTreeNodes.Military.Weapons.SMGs', 'ItemLootTreeNodes.Military.Weapons.Handguns']},
          ],
        },
      },
    },
    'Armory-Residential-Examine_Military_Chest': {
      Nodes: {
        Rifles: {
          remove: true,
        },
        SMGs: {
          //          remove: true,
        },
      },
    },

    // ------------------------------------------------------------------------------------------
    // MIL LOCKER
    Examine_Weapon_Locker_Lockpick: {
      Nodes: {
        Weapon_Cleaning_Kit: {
          replace: ['.Tools.Weapon_Cleaning_Kit', '.Attachments'],
        },
        'Cal_40_PG-7M': {
          override: 'ItemLootTreeNodes.Military.Gear.Explosives',
        },
      },
    },

    'Buildings-Armory-TV_Bunker-Examine_Weapon_Locker_Lockpick': {},
    'Buildings-Armory-TV_Bunker-Examine_Weapon_Locker_Lockpick_Weapons': {
      ProbabilityMultiplier: 0.8,
    },

    // ------------------------------------------------------------------------------------------
    // MIL LOCKER WEAPONS
    Locker_Lockpick_Weapons: {
      Nodes: {
        'Weapons.AssaultRifles': {
          override: '',
        },
        'Weapons.SMGs': {
          Rarity: 'VeryRare',
          listAdd: ['ItemLootTreeNodes.Military.Gear.tools.Knives'],
        },
        'Weapons.Other': {
          Rarity: 'Rare',
          listAdd: [
            'ItemLootTreeNodes.Military.Weapons.Handguns.M9s',
            'ItemLootTreeNodes.Military.Weapons.Handguns.M1911s',
            'ItemLootTreeNodes.Military.Weapons.Handguns.Weapon_Block21',
          ],
          // postAdd: [
          //   {
          //     Ids: [],
          //     Rarity: 'VeryRare',
          //   },
          // ],
        },
        'Weapons.LMGs': {
          remove: true,
          //override: '',
        },
        'Weapons.Rifles': {
          override: '',
          postAdd: [
            {
              Ids: [
                'ItemLootTreeNodes.Castle.Weapons.Bows',
                'ItemLootTreeNodes.Military.Gear.Armor.Vests',
                'ItemLootTreeNodes.Military.Weapons.LMGs',
                'ItemLootTreeNodes.Military.Weapons.Rifles',
                'ItemLootTreeNodes.Military.Weapons.Snipers',
                'ItemLootTreeNodes.Military.Weapons.AssaultRifles',
              ],
              Rarity: 'ExtremelyRare',
            },
          ],
        },
      },
    },

    'Hunting_Store-World_Shelf': {
      ProbabilityMultiplier: 0.8,
      Nodes: {
        'Clothes.Military.Torso': {
          override: 'ItemLootTreeNodes.HuntingStore.Bows',
        },
        'Clothes.Military.Head': {
          override: 'ItemLootTreeNodes.Military.ammo.Arrows',
        },
        'Clothes.Military.Hands': {
          override: 'ItemLootTreeNodes.Military.ammo.Arrows',
        },
      },
    },

    Crate_TNT: {
      ProbabilityMultiplier: 0.4,
      QuantityMaxValue: 1,
    },

    HuntingStand: {
      ProbabilityMultiplier: 0.8,
      QuantityMinMultiplier: 1,
      QuantityMaxMultiplier: 3,
      RandomDamageMultiplier: 0.5,
      Nodes: {
        HuntingTower: {
          postAdd: [
            {
              Rarity: 'Uncommon',
              Ids: [
                'ItemLootTreeNodes.HuntingTower.Weapons',
                'ItemLootTreeNodes.LivingRoom.Other.Weapons',
                'ItemLootTreeNodes.LivingRoom.Other.Weapons.Magazines',
              ],
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

    'TV_Bunker-Examine_Crate_Green_Big': {
      ProbabilityMultiplier: 0.8,
    },
    'Military_Base-Examine_Crate_Green_Big': {
      ProbabilityMultiplier: 0.8,
    },
    'Weapons_Factory-Examine_Crate_Green_Big': {
      ProbabilityMultiplier: 0.8,
    },
    'Residential-Examine_Green_Crate_Big': {
      ProbabilityMultiplier: 0.8,
    },

    Scrap_Pile_Metal_Pipe: {
      ProbabilityMultiplier: 0.8,
    },

    // Cargo Drops

    Cargo_Drops: {
      excludedFilesMatches: ['Pistol', 'Revolver', 'M1887'],
      FixedItems: {
        Cal_308_Ammobox: 'Cal_308',
        'Cal_30-06_Ammobox': 'Cal_30-06',
        Cal_9x39mm_Ammobox: 'Cal_9x39mm',
        Cal_7_62x39mm_Ammobox: 'Cal_7_62x39mm',
        Cal_7_62x54mmR_Ammobox: 'Cal_7_62x54mmR',
        Cal_7_92x57mm_Ammobox: 'Cal_7_92x57mm',
        Cal_5_56x45mm_Ammobox: 'Cal_5_56x45mm',
        Cal_5_45x39mm_Ammobox: 'Cal_5_45x39mm',
        Cal_45_Ammobox: 'Cal_45',
        Cal_9mm_Ammobox: 'Cal_9mm',
        Weapon_: '1H_Police_Baton',
        C4: '1H_Brass_knuckles',
        Armor: 'Stabproof_Vest_01_03',
        Medical_Glove: 'MMA_Glove_01',
        Electrician_Glove_01_01: 'MMA_Glove_01',
        Quiver: 'MMA_Glove_01',
      },
      postSpawnActions: ['SetAmmoAmount_SmallStash'],
    },

    // ABANDONED BUNKERS

    Tarp_Sentryequip: {
      ProbabilityMultiplier: 0.8,
      Items: {
        Tire_Repair_Kit: {
          override: {Id: 'EMP_Grenade', Rarity: 'VeryRare'},
        },
        TearGasGrenade: {
          Rarity: 'Uncommon',
        },
        Weapon_Cleaning_Kit: {
          Rarity: 'Rare',
        },
        BCULock_Item: {
          Rarity: 'VeryRare',
        },
        Frag_Grenade: {
          Rarity: 'VeryRare',
        },
        Cal_50BMG: {
          Rarity: 'Rare',
        },
        Wire_Cutters_01: {
          Rarity: 'Uncommon',
        },
        Electrical_Repair_Kit: {
          Rarity: 'Rare',
        },
      },
    },

    // Puppets

    Zombie_C4: {
      Items: {
        C4: {
          postAdd: {Id: '1H_Dildo', Rarity: 'Uncommon'},
        },
      },
    },

    'WW2_Bunker-Examine_Metal_Locker': {
      ProbabilityValue: 30,
      QuantityMaxValue: 1,
      RandomUsageValue: 20,
      RandomDamageValue: 20,
    },

    Examine_Vanity: {
      InitialDamageValue: 20,
      RandomDamageValue: 50,
      Nodes: {
        Rubber_band: {
          postAdd: [
            {
              Rarity: 'VeryRare',
              Ids: [
                'ItemLootTreeNodes.LivingRoom.Items.Clothes.Hands.Medical_Glove_01',
                'ItemLootTreeNodes.Bathroom.Items.Fabric',
                'ItemLootTreeNodes.Bathroom.Items.Rubber_band',
                'ItemLootTreeNodes.Bathroom.Items.Disposable_Mask',
              ],
            },
          ],
        },
      },
    },
  },
};
