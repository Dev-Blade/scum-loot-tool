import {randomFixedItemsPack, spawnersPacks2} from '../../spawnersPacks';
import {SpawnerFilterType} from '../../typesSpawner';
import {sbgc} from './sbgc/-sbgcVanilla';
export const commonFilters: SpawnerFilterType = {
  ...sbgc,

  Zombie_C4: {
    ProbabilityValue: 70,
    Items: {
      C4: {
        postAdd: [{Id: '1H_Dildo', Rarity: 'Uncommon'}],
      },
    },
  },
  'Special_Packages-Vault-Examine_M82A1_Vault_Pack': {
    FixedItems: {
      '*': ['Weapon_M82A1', 'WeaponScope_M82A1', 'WeaponGhillie_Woodland'],
    },
  },
  'Special_Packages-Vault-Examine_M82A1_Ammo_Vault_Pack': {
    FixedItems: {
      '*': ['Magazine_M82A1', 'Cal_50BMG_Ammobox', 'WeaponSuppressor_M82A1'],
    },
  },

  'Special_Packages-Killbox-Examine_M82A1_KillBox_Pack': {
    FixedItems: {
      '*': ['Weapon_M82A1', 'Magazine_M82A1', 'Magazine_M82A1', 'Cal_50BMG_Ammobox', 'Cal_50BMG_Ammobox'],
    },
  },

  Car_Repair_Shop: {
    InitialUsageMultiplier: 1.3,
    RandomUsageMultiplier: 1.3,
    Nodes: {
      RepairToolkits: {
        remove: true,
        postAdd: [
          {
            Ids: ['ItemLootTreeNodes.CarRepairShop.RepairToolkits'],
            Rarity: 'Uncommon',
          },
          {
            Ids: ['ItemLootTreeNodes.CarRepairShop.WorkClothes'],
            Rarity: 'Uncommon',
          },
          {
            Ids: ['ItemLootTreeNodes.Garage'],
            Rarity: 'Uncommon',
          },
          {
            Ids: ['ItemLootTreeNodes.FoodStore.Items.Misc'],
            Rarity: 'Uncommon',
          },
        ],
      },
    },
  },

  // ------------------------------------------------------------------------------------------
  // MIL LOCKER WEAPONS
  'Buildings-Armory-Prison-Examine_Weapon_Locker_Lockpick_Weapon': {
    Nodes: {
      'Weapons.SMGs': {
        remove: true,
        postAdd: [
          {
            Rarity: 'VeryRare',
            Ids: ['ItemLootTreeNodes.Police.Weapons.SMGs', 'ItemLootTreeNodes.Police.Weapons.Handguns', 'ItemLootTreeNodes.Police.Weapons.Shotguns'],
          },
        ],
      },
    },
  },

  'Buildings-Armory-Prison-Examine_Weapon_Locker_Lockpick': {
    Nodes: {
      'Gear.Armor': {
        remove: true,
        postAdd: [
          {
            Rarity: 'VeryRare',
            Ids: [
              'ItemLootTreeNodes.Police.Gear.Armor',
              'ItemLootTreeNodes.Police.Gear.Magazines.Handguns',
              'ItemLootTreeNodes.Police.Gear.Explosives.Smoke_Grenade',
              'ItemLootTreeNodes.Police.Gear.Explosives.Flashbang',
              'ItemLootTreeNodes.Police.Ammo',
            ],
          },
        ],
      },
    },
  },

  'Buildings-Armory-TV_Bunker-Examine_Weapon_Locker_Lockpick_Weapons.json': {
    ProbabilityMultiplier: 0.8,
    Nodes: {
      'Weapons.Other': {
        remove: true,
      },
      'Weapons.LMGs': {
        remove: true,
      },
      'Weapons.SMGs': {
        Rarity: 'Uncommon',
        //listAdd: ['ItemLootTreeNodes.Military.Weapons.Handguns.Weapon_SF19', 'ItemLootTreeNodes.Military.Weapons.Handguns.Weapon_HS9'],
        postAdd: [
          {
            Rarity: 'Rare',
            Ids: ['ItemLootTreeNodes.Military.Weapons.Handguns'],
          },
        ],
      },
      'Weapons.Rifles': {
        listAdd: ['ItemLootTreeNodes.Military.Weapons.LMGs', 'ItemLootTreeNodes.Military.Weapons.Other'],
        postAdd: [
          {
            Rarity: 'ExtremelyRare',
            Ids: ['ItemLootTreeNodes.Military.Gear.Armor.Vests', 'ItemLootTreeNodes.Military.Weapons.Snipers'],
          },
        ],
      },
    },
  },

  Tarp_Sentryequip: {
    ProbabilityMultiplier: 0.7,
    AllowDuplicates: false,
    Items: {
      Frag_Grenade: {
        Rarity: 'Rare',
      },
    },
  },

  'Hazmat_Suite_Locker_Small.': {
    additionalFilesMatches: ['Hazmat_Suite_Locker_Big.'],
    ProbabilityValue: 60,
    Items: {
      Hazmat_Suit_Modern: {
        Rarity: 'ExtremelyRare',
      },
      Hazmat_Suit_Vintage: {
        Rarity: 'Rare',
      },
    },
  },

  DepletedUranium: {
    ProbabilityMultiplier: 0.8,
  },
  Depleted_Uranium: {
    ProbabilityMultiplier: 0.8,
  },
};
