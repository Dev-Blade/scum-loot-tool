import {RarityType} from './typesCommon';
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

export const randomSpawnerPackUsed = [] as string[];
export const randomFixedItemsPack = (sp = [spawnersPacks]) => {
  const all = {FixedItems: {}} as SpawnersPacks;
  for (const s of sp) for (const k of Object.keys(s.FixedItems)) all.FixedItems[k] = s.FixedItems[k];

  let c = 0;
  let ret: SpawnersPacksFixedItems;
  let cont = true;

  let keys = Object.keys(all.FixedItems);
  do {
    cont = true;
    const key = keys[Math.floor(Math.random() * Object.keys(all.FixedItems).length)];
    ret = all.FixedItems[key];
    if (!randomSpawnerPackUsed.includes(key)) {
      randomSpawnerPackUsed.push(key);
      cont = false;
    }
  } while (cont && c++ < keys.length);

  if (c >= keys.length) randomSpawnerPackUsed.length = 0;

  return ret;
};

export const packFixedItemsToNodeList = (pack: SpawnersPacksFixedItems, rarity: RarityType) => {
  return pack.map(Id => {
    return {
      Name: Id,
      Rarity: rarity,
    };
  });
};

export const spawnersPacks2: SpawnersPacks = {
  FixedItems: {
    MM4: ['MemoryModule_Level4'],
    MM3: ['MemoryModule_Level3'],
    EXP1: ['BaseExpansionKit_Lvl1'],
    EXP2: ['BaseExpansionKit_Lvl2'],
    Locks: ['Lock_Item_Advanced', 'Lock_Item_Advanced', 'Lock_Item_Advanced'],
    LockSecurity: ['Lock_Security_Lvl3', 'Lock_Security_Lvl3', 'Lock_Security_Lvl3'],
    Repair: ['Electrician_Tools', 'Electrical_Repair_Kit', 'Weapon_Cleaning_Kit'],
  },
  Nodes: {},
};

export const spawnersPacks: SpawnersPacks = {
  FixedItems: {
    Bow: [
      'BowSilencer_SlipOn',
      'BowSilencer_SlipOn',
      'Recurve_Bow_70',
      'Military_Quiver_01',
      'Carbon_BroadHead_Arrow',
      'Carbon_BroadHead_Arrow',
      'Carbon_BroadHead_Arrow',
    ],
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

    UMP: ['Weapon_UMP45', 'Magazine_UMP45', 'Magazine_UMP45', 'Cal_45_Ammobox', 'Cal_45_Ammobox', 'WeaponSuppressor_45ACP', 'WeaponSights_RedDot_CA401B'],
    UMPSmall: ['Weapon_UMP45', 'Magazine_UMP45', 'Cal_45_Ammobox', 'WeaponSuppressor_45ACP'],
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
