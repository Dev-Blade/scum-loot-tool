import {SpawnerNodeType} from './typesSpawner';

type SpawnersPacksFixedItems = string[];
type SpawnersPacks = {
  FixedItems: {
    [Property: string]: SpawnersPacksFixedItems;
  };
  Nodes: {
    [Property: string]: SpawnerNodeType;
  };
};

export const randomFixedItemsPack = () => {
  return spawnersPacks.FixedItems[Object.keys(spawnersPacks.FixedItems)[Math.floor(Math.random() * Object.keys(spawnersPacks.FixedItems).length)]];
};

export const spawnersPacks: SpawnersPacks = {
  FixedItems: {
    Bow: ['BowSilencer', 'BowSilencer', 'Recurve_Bow_60', 'Improvised_Quiver_01', 'Carbon_BroadHead_Arrow'],
    M1887: ['Weapon_M1887', '12_Gauge_Buckshot_Ammobox', '12_Gauge_Buckshot_Ammobox'],
    SF19: [
      'Weapon_SF19',
      'Magazine_SF19',
      'Magazine_SF19',
      'Magazine_SF19',
      'Cal_9mm_Ammobox',
      'Cal_9mm_Ammobox',
      'WeaponSuppressor_Handgun',
      'WeaponSights_Wasp',
    ],

    MP5: [
      'Weapon_MP5',
      'Magazine_MP5',
      'Magazine_MP5',
      'Cal_9mm_Ammobox',
      'Cal_9mm_Ammobox',
      'WeaponSuppressor_MP5',
      'MP5_Rail_Short',
      'WeaponSights_RedDot_CA401B',
    ],
    MP5Small: ['Weapon_MP5', 'Magazine_MP5', 'Cal_9mm_Ammobox', 'MP5_Rail_Short'],

    MP5K: [
      'Weapon_MP5_K',
      'Magazine_MP5',
      'Magazine_MP5',
      'Cal_9mm_Ammobox',
      'Cal_9mm_Ammobox',
      'MP5_Rail_Short',
      'WeaponSights_RedDot_CA401B',
      'WeaponSuppressor_MP5',
    ],
    MP5KSmall: ['Weapon_MP5', 'Magazine_MP5', 'Cal_9mm_Ammobox', 'MP5_Rail_Short'],

    UMP: [
      'Weapon_UMP45',
      'Magazine_UMP45',
      'Magazine_UMP45',
      'Cal_45_Ammobox',
      'Cal_45_Ammobox',
      'WeaponSuppressor_MP5',
      'WeaponFlashlight_M9',
      'WeaponSights_RedDot_CA401B',
    ],
    UMPSmall: ['Weapon_UMP45', 'Magazine_UMP45', 'Cal_45_Ammobox'],
    Deagle: [
      'Weapon_Deagle_357',
      'Magazine_DEagle_357',
      'Magazine_DEagle_357',
      'Cal_357_Ammobox',
      'Cal_357_Ammobox',
      'WeaponFlashlight_DesertEagle',
      'WeaponSights_Deagle_RedDot',
    ],
    M9: ['Weapon_M9', 'Magazine_M9', 'Magazine_M9', 'Cal_9mm_Ammobox', 'Cal_9mm_Ammobox', 'WeaponFlashlight_M9', 'WeaponSuppressor_Handgun'],
  },

  Nodes: {
    livingRoomWeapns: {
      Rarity: 'Rare',
      Ids: ['ItemLootTreeNodes.LivingRoom.Other.Weapons', 'ItemLootTreeNodes.LivingRoom.Other.Magazines'],
    },
  },
};
