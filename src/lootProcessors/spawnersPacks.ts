import { RarityType } from "./typesCommon";
import { SpawnerNodeType } from "./typesSpawner";

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
  const all = { FixedItems: {} } as SpawnersPacks;
  for (const s of sp)
    for (const k of Object.keys(s.FixedItems))
      all.FixedItems[k] = s.FixedItems[k];

  let c = 0;
  let ret: SpawnersPacksFixedItems;
  let cont = true;

  let keys = Object.keys(all.FixedItems);
  do {
    cont = true;
    const key =
      keys[Math.floor(Math.random() * Object.keys(all.FixedItems).length)];
    ret = all.FixedItems[key];
    if (!randomSpawnerPackUsed.includes(key)) {
      randomSpawnerPackUsed.push(key);
      cont = false;
    }
  } while (cont && c++ < keys.length);

  if (c >= keys.length) randomSpawnerPackUsed.length = 0;

  return ret;
};

export const packFixedItemsToNodeList = (
  pack: SpawnersPacksFixedItems,
  rarity: RarityType
) => {
  return pack.map((Id) => {
    return {
      Name: Id,
      Rarity: rarity,
    };
  });
};

export const sentryPacks: SpawnersPacks = {
  FixedItems: {
    A: [
      "Cal_5_56x45mm_Ammobox",
      "Cal_5_56x45mm_Ammobox",
      "Cal_5_56x45mm_Ammobox",
      "Cal_5_56x45mm_Ammobox",
      "Cal_5_56x45mm_Ammobox",
    ],
    B: [
      "Cal_7_62x39mm_Ammobox",
      "Cal_7_62x39mm_Ammobox",
      "Cal_7_62x39mm_Ammobox",
      "Cal_7_62x39mm_Ammobox",
      "Cal_7_62x39mm_Ammobox",
    ],
    C: ["Cal_50BMG_AP_Ammobox"],
  },
  Nodes: {},
};

export const spawnersPacks2: SpawnersPacks = {
  FixedItems: {
    //MM4: ['MemoryModule_Level4'],
    MM3_1: ["MemoryModule_Level3"],
    MM3_2: ["MemoryModule_Level3"],
    EXP1: ["BaseExpansionKit_Lvl1"],
    Locks1: ["Lock_Item_Advanced", "Lock_Item_Advanced", "Lock_Item_Advanced"],
    Locks2: [
      "Lock_Item_Advanced",
      "Lock_Item_Advanced",
      "Lock_Items_Medium",
      "Lock_Items_Medium",
    ],
    LockSecurity1: ["Lock_Security_Lvl3", "Lock_Security_Lvl3"],
    LockSecurity2: [
      "Lock_Security_Lvl2",
      "Lock_Security_Lvl2",
      "Lock_Security_Lvl2",
    ],
    Repair: [
      "Electrician_Tools",
      "Electrical_Repair_Kit",
      "Weapon_Cleaning_Kit",
    ],
    GR: ["Cal_40x46", "Cal_40x46", "Cal_40x46", "Cal_40x46"],
    M1: ["PromTrap", "Claymore"],
    M2: ["Mine_02", "Mine_01"],

    AMMO_338: ["Cal_338_Ammobox", "Cal_338_Ammobox_AP", "Cal_338_Ammobox_TR"],
    AMMO_308: ["Cal_308_Ammobox", "Cal_308_Ammobox_AP", "Cal_308_Ammobox_TR"],
    AMMO_556_1: [
      "Cal_5_56x45mm_Ammobox",
      "Cal_5_56x45mm_Ammobox",
      "Cal_5_56x45mm_Ammobox",
    ],
    AMMO_556_2: [
      "Cal_5_56x45mm_Ammobox",
      "Cal_5_56x45mm_Ammobox_TR",
      "Cal_5_56x45mm_AP_Ammobox",
    ],
    AMMO_AKS: [
      "Cal_5_45x39mm_Ammobox",
      "Cal_5_45x39mm_Ammobox",
      "Cal_5_45x39mm_Ammobox",
    ],
    AMMO_762_39_1: [
      "Cal_7_62x39mm_Ammobox",
      "Cal_7_62x39mm_Ammobox",
      "Cal_7_62x39mm_Ammobox",
    ],
    AMMO_762_39_2: [
      "Cal_7_62x39mm_Ammobox",
      "Cal_7_62x39mm_Ammobox_TR",
      "Cal_7_62x39mm_AP_Ammobox",
    ],
    AMMO_30_06: [
      "Cal_30-06_Ammobox",
      "Cal_30-06_Ammobox_TR",
      "Cal_30-06_Ammobox_AP",
    ],
    AMMO_762_54: [
      "Cal_7_62x54mmR_Ammobox",
      "Cal_7_62x54mmR_Ammobox_TR",
      "Cal_7_62x54mmR_AP_Ammobox",
    ],
    AMMO_792_57: [
      "Cal_7_92x57mm_Ammobox",
      "Cal_7_92x57mm_Ammobox_TR",
      "Cal_7_92x57mm_AP_Ammobox",
    ],
    AMMO_50BMG: ["Cal_50BMG_AP_Ammobox"],
  },
  Nodes: {},
};

export const spawnersPacks: SpawnersPacks = {
  FixedItems: {
    ASVAL: [
      "Weapon_AS_Val",
      "WeaponSights_RedDot_CA401B",
      "ScopeRail_AK47",
      "WeaponFlashlight_AS_Val",
    ],
    VSS: [
      "Weapon_VSS_VZ",
      "WeaponScope_ACOG_01",
      "ScopeRail_AK47",
      "WeaponFlashlight_AS_Val",
    ],
    Bow: [
      "BowSilencer_SlipOn",
      "BowSilencer_SlipOn",
      "Recurve_Bow_70",
      "Military_Quiver_01",
      "Carbon_BroadHead_Arrow",
      "Carbon_BroadHead_Arrow",
      "Carbon_BroadHead_Arrow",
    ],
    SF19: [
      "Weapon_SF19",
      "Magazine_SF19",
      "Magazine_SF19",
      "Magazine_SF19",
      "Cal_9mm_Ammobox",
      "Cal_9mm_Ammobox",
      "WeaponSuppressor_Handgun",
      "WeaponSights_Wasp",
    ],
    MP5: [
      "Weapon_MP5",
      "Magazine_MP5",
      "Magazine_MP5",
      "Cal_9mm_Ammobox",
      "Cal_9mm_Ammobox",
      "WeaponSuppressor_MP5",
      "MP5_Rail_Short",
      "WeaponSights_RedDot_CA401B",
    ],
    MP5Small: [
      "Weapon_MP5",
      "Magazine_MP5",
      "Cal_9mm_Ammobox",
      "MP5_Rail_Short",
    ],

    MP5K: [
      "Weapon_MP5_K",
      "Magazine_MP5",
      "Magazine_MP5",
      "Cal_9mm_Ammobox",
      "Cal_9mm_Ammobox",
      "MP5_Rail_Short",
      "WeaponSights_RedDot_CA401B",
      "WeaponSuppressor_MP5",
    ],
    MP5KSmall: [
      "Weapon_MP5",
      "Magazine_MP5",
      "Cal_9mm_Ammobox",
      "MP5_Rail_Short",
    ],

    UMP: [
      "Weapon_UMP45",
      "Magazine_UMP45",
      "Magazine_UMP45",
      "Cal_45_Ammobox",
      "Cal_45_Ammobox",
      "WeaponSuppressor_45ACP",
      "WeaponSights_RedDot_CA401B",
    ],
    UMPSmall: [
      "Weapon_UMP45",
      "Magazine_UMP45",
      "Cal_45_Ammobox",
      "WeaponSuppressor_45ACP",
    ],
    Deagle: [
      "Weapon_Deagle_357",
      "Magazine_DEagle_357",
      "Magazine_DEagle_357",
      "Cal_357_Ammobox",
      "Cal_357_Ammobox",
      "WeaponFlashlight_DesertEagle",
      "WeaponSights_Deagle_RedDot",
    ],
    M9: [
      "Weapon_M9",
      "Magazine_M9",
      "Magazine_M9",
      "Cal_9mm_Ammobox",
      "Cal_9mm_Ammobox",
      "WeaponFlashlight_M9",
      "WeaponSuppressor_Handgun",
    ],
  },

  Nodes: {
    livingRoomWeapns: {
      Rarity: "Rare",
      Ids: [
        "ItemLootTreeNodes.LivingRoom.Other.Weapons",
        "ItemLootTreeNodes.LivingRoom.Other.Magazines",
      ],
    },
  },
};
