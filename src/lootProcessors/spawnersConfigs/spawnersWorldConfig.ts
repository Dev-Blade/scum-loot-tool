import path from "path";

import { SpawnersConfigType } from "../typesSpawner";
import { pathSpawnersOverride } from "../_lootPaths";
import {
  randomFixedItemsPack,
  sentryPacks,
  spawnersPacks,
  spawnersPacks2,
} from "../spawnersPacks";

export const spawnersConfig: SpawnersConfigType = {
  pathSpawnersOverride: path.join(pathSpawnersOverride, "-World"),
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
    "Water-Shipwrecks": {
      ProbabilityMultiplier: 1.5,
      InitialDamageMultiplier: 0.2,
      RandomDamageMultiplier: 0.5,
      QuantityMinValue: 1,
      QuantityMaxValue: 3,
    },

    "*": {
      Nodes: {
        Locks: {
          override: "",
        },
      },
    },

    Killbox_Trash: {
      ProbabilityValue: 100,
      QuantityMaxValue: 1,
      Nodes: {
        Trash: {
          postAdd: [
            {
              Ids: [
                "ItemLootTreeNodes.Military.Weapons.AssaultRifles",
                "ItemLootTreeNodes.Military.Weapons.Rifles",
              ],
              Rarity: "Uncommon",
            },
          ],
        },
      },
    },

    "Vault-Examine": {
      excludedFilesMatches: ["Pistols", "MP5", "AKS74U_V"],
      FixedItems: {
        "*": () => randomFixedItemsPack([spawnersPacks, spawnersPacks2]),
      },
    },
    M82A1_Ammo_Vault_Pack: {
      FixedItems: {
        "*": () => randomFixedItemsPack([spawnersPacks, spawnersPacks2]),
      },
    },

    "Killbox-Examine": {
      excludedFilesMatches: [
        "Pink",
        "UMP",
        "MP5",
        "Ninja",
        "Vietnam",
        "Worldwar2",
        "Kar98",
        "M1_",
        "AS_Val",
        "AKS74U",
        "M16A4",
        "Kar98",
      ],
      FixedItems: {
        "*": () => randomFixedItemsPack([spawnersPacks, spawnersPacks2]),
      },
    },

    Hazmat_Suite_Locker: {
      ProbabilityMultiplier: 0.8,
      Items: {
        Hazmat_Suit_Modern: {
          Rarity: "VeryRare",
        },
      },
    },

    Lockpick_PhenixT: {
      additionalFilesMatches: ["INT_Ea"],
      ProbabilityMultiplier: 0.7,
    },

    Car_Repair_Shop: {
      ProbabilityMultiplier: 0.9,
      Nodes: {
        "CarRepairShop.Crafting": {
          postAdd: [
            {
              Ids: ["ItemLootTreeNodes.CarRepairShop.Tools"],
              Rarity: "Uncommon",
            },
          ],
        },
      },
    },

    Examine_File_Cabinet: {
      Nodes: {
        "Weapons.Ammo": {
          override: "",
        },
        "Other.Weapons.Magazines": {
          override: "",
          listAdd: "ItemLootTreeNodes.Office.Items.Misc.Locks",
        },
      },
    },
    "Armory-Residential-Examine_Military_Weapons_Crate": {
      ProbabilityMultiplier: 1.4,
      Nodes: {
        SMGs: {
          remove: true,
        },
        Rifles: {
          remove: true,
          postAdd: [
            {
              Rarity: "ExtremelyRare",
              Ids: [
                "ItemLootTreeNodes.Military.Weapons.Rifles",
                "ItemLootTreeNodes.HuntingStore.tools.Heavy.Bats",
              ],
            },
            {
              Rarity: "VeryRare",
              Ids: [
                "ItemLootTreeNodes.Military.Weapons.SMGs",
                "ItemLootTreeNodes.Military.Weapons.Handguns",
              ],
            },
          ],
        },
      },
    },
    "Armory-Residential-Examine_Military_Chest": {
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
          replace: [".Tools.Weapon_Cleaning_Kit", ".Attachments"],
        },
        "Cal_40_PG-7M": {
          override: "ItemLootTreeNodes.Military.Gear.Explosives",
        },
      },
    },

    "Buildings-Armory-TV_Bunker-Examine_Weapon_Locker_Lockpick.json": {
      ProbabilityMultiplier: 0.8,
      Nodes: {
        Geiger_Counter_Analogue: {
          remove: true,
        },
        "ItemLootTreeNodes.Military.Gear.Attachments.Suppressors": {
          remove: true,
          listAdd: ["ItemLootTreeNodes.Military.Gear.Attachments.Suppressors"],
        },
        Compass_Advanced: {
          override: "ItemLootTreeNodes.Military.Gear.Tools",
        },
        "Backpacks.Assault": {
          remove: true,
        },
        "Backpacks.Hiking.Camo": {
          remove: true,
          listAdd: ["ItemLootTreeNodes.Military.Gear.Backpacks"],
        },
        "Attachments.Scopes": {
          remove: true,
          listAdd: ["ItemLootTreeNodes.Military.Gear.Attachments.Scopes"],
        },
      },
    },
    "Buildings-Armory-TV_Bunker-Examine_Weapon_Locker_Lockpick_Weapons": {
      ProbabilityMultiplier: 1.4,
      //ProbabilityValue: 33,
    },

    // ------------------------------------------------------------------------------------------
    // MIL LOCKER WEAPONS
    Locker_Lockpick_Weapons: {
      ShouldFilterItemsByZone: true,
      Nodes: {
        "Weapons.AssaultRifles": {
          override: "",
        },
        "Weapons.Other": {
          Rarity: "Common",
          remove: true,
          //Rarity: "Rare",
          listAdd: [
            // "ItemLootTreeNodes.Military.Clothes.Head.MarineCaps",
            // "ItemLootTreeNodes.Military.Clothes.Head.Goggles.Military_Goggles_01",
            // "ItemLootTreeNodes.Military.Clothes.Head.Goggles.Tactical_Sunglasses_01",
            //"ItemLootTreeNodes.Military.Weapons.Handguns.DEagles.Weapon_DEagle_50Gold",
            //"ItemLootTreeNodes.Military.Weapons.Handguns.M1911s.Weapon_M1911_Gold",
            // "ItemLootTreeNodes.Military.Weapons.Handguns.Revolvers.Weapon_Serpent357",
            // "ItemLootTreeNodes.Military.Weapons.Handguns.Revolvers.Weapon_Viper_M357",
            // "ItemLootTreeNodes.Military.Weapons.Handguns.Revolvers.Weapon_PeaceKeeper38",
            // "ItemLootTreeNodes.Military.Weapons.Handguns.Revolvers.Weapon_Judge44",
            //"ItemLootTreeNodes.Military.Clothes.Hands.TacticalGloves",

            // "ItemLootTreeNodes.Military.Weapons.Handguns.M9s.Weapon_M9",
            "ItemLootTreeNodes.Military.Weapons.Handguns",

            // "ItemLootTreeNodes.Military.Weapons.Handguns.M1911s.Weapon_M1911",
            // "ItemLootTreeNodes.Military.Weapons.Handguns.Weapon_Block21",
            // "ItemLootTreeNodes.Military.Weapons.Handguns.DEagles.Weapon_Deagle_50",
            // "ItemLootTreeNodes.Military.Weapons.Handguns.DEagles.Weapon_Deagle_357",
            //"ItemLootTreeNodes.Military.Gear.tools.Knives.1H_Scout_Black",
          ],
          // postAdd: [
          //   {
          //     Ids: [],
          //     Rarity: 'VeryRare',
          //   },
          // ],
        },
        "Weapons.SMGs": {
          Rarity: "Rare",
          listAdd: [
            "ItemLootTreeNodes.Military.Weapons.Other",
            //"ItemLootTreeNodes.Military.Weapons.Handguns.M1911s.Weapon_M1911_Engraved",
            //"ItemLootTreeNodes.HuntingStore.Clothes.Civilian.Torso.Raincoats.Raincoat_01",
            //"ItemLootTreeNodes.HuntingStore.tools.Heavy.Bats",
            //"ItemLootTreeNodes.HuntingStore.tools.Heavy.Axes.2H_Axe",
            // "ItemLootTreeNodes.Military.Weapons.Shotguns.Weapon_590A11",
            // "ItemLootTreeNodes.Military.Weapons.Shotguns.Weapon_SDASS",
          ],
        },
        "Weapons.LMGs": {
          remove: true,
          postAdd: [
            // {
            //   Ids: [
            //     "ItemLootTreeNodes.Military.Clothes.Hands.TacticalGloves",
            //     "ItemLootTreeNodes.Military.Weapons.Handguns.DEagles.Weapon_Deagle_50",
            //     "ItemLootTreeNodes.Military.Weapons.Handguns.DEagles.Weapon_Deagle_357",
            //   ],
            //   Rarity: "Uncommon",
            // },
          ],
          //override: '',
        },
        "Weapons.Rifles": {
          override: "",
          postAdd: [
            {
              Ids: [
                "ItemLootTreeNodes.Military.Gear.Armor.Vests.Ballistic",
                "ItemLootTreeNodes.Military.Gear.Armor.Vests.Tactical",
                // "ItemLootTreeNodes.Military.Clothes.Torso.GhillieSuitJackets.Ghillie_Suit_Jacket_01",
                // "ItemLootTreeNodes.Military.Clothes.Legs.GhillieSuitPants.Ghillie_Suit_Pants_01",
                //"ItemLootTreeNodes.HuntingStore.Firearms.Handguns.DEagles.Weapon_Deagle_50",
                //"ItemLootTreeNodes.HuntingStore.Firearms.Handguns.DEagles.Weapon_Deagle_357",
                //"ItemLootTreeNodes.Military.Weapons.Handguns.M1911s.Weapon_M1911_Gold",
                "ItemLootTreeNodes.Military.Weapons.Rifles",
                "ItemLootTreeNodes.Military.Weapons.AssaultRifles",
                "ItemLootTreeNodes.Military.Weapons.LMGs",
                "ItemLootTreeNodes.Military.Weapons.Snipers",
              ],
              Rarity: "VeryRare",
            },
          ],
        },
      },
    },

    "Hunting_Store-World_Shelf": {
      //ProbabilityMultiplier: 0.8,
      Nodes: {
        "Clothes.Military.Torso": {
          override: "ItemLootTreeNodes.HuntingStore.Bows",
        },
        "Clothes.Military.Head": {
          override: "ItemLootTreeNodes.Military.ammo.Arrows",
        },
        "Clothes.Military.Hands": {
          override: "ItemLootTreeNodes.Military.ammo.Arrows",
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
              Rarity: "Uncommon",
              Ids: [
                "ItemLootTreeNodes.HuntingTower.Weapons",
                "ItemLootTreeNodes.LivingRoom.Other.Weapons",
                "ItemLootTreeNodes.LivingRoom.Other.Weapons.Magazines",
              ],
            },
            {
              Rarity: "ExtremelyRare",
              Ids: [
                "ItemLootTreeNodes.Military.Gear.Attachments.Scopes.WeaponScope_HuntingScope",
              ],
            },
            {
              Rarity: "ExtremelyRare",
              Ids: [
                "ItemLootTreeNodes.Military.Gear.Attachments.Scopes.WeaponScope_ACOG_01",
              ],
            },
            {
              Rarity: "VeryRare",
              Ids: ["ItemLootTreeNodes.Military.FoodDrink.Drink.Beer"],
            },
            {
              Rarity: "VeryRare",
              Ids: ["ItemLootTreeNodes.Insects"],
            },
          ],
        },
      },
    },

    "TV_Bunker-Examine_Crate_Green_Big": {
      //      ProbabilityMultiplier: 0.8,
    },
    "Military_Base-Examine_Crate_Green_Big": {
      //      ProbabilityMultiplier: 0.8,
    },
    "Weapons_Factory-Examine_Crate_Green_Big": {
      //      ProbabilityMultiplier: 0.8,
    },
    "Residential-Examine_Green_Crate_Big": {
      //      ProbabilityMultiplier: 0.8,
    },

    Scrap_Pile_Metal_Pipe: {
      ProbabilityMultiplier: 0.8,
    },

    // Cargo Drops

    Cargo_Drops: {
      excludedFilesMatches: ["Pistol", "Revolver", "M1887", "DT11B"],
      FixedItems: {
        Cal_308_Ammobox: "Cal_308",
        "Cal_30-06_Ammobox": "Cal_30-06",
        Cal_9x39mm_Ammobox: "Cal_9x39mm",
        Cal_7_62x39mm_Ammobox: "Cal_7_62x39mm",
        Cal_7_62x54mmR_Ammobox: "Cal_7_62x54mmR",
        Cal_7_92x57mm_Ammobox: "Cal_7_92x57mm",
        Cal_5_56x45mm_Ammobox: "Cal_5_56x45mm",
        Cal_5_45x39mm_Ammobox: "Cal_5_45x39mm",
        Cal_45_Ammobox: "Cal_45",
        Cal_9mm_Ammobox: "Cal_9mm",
        Weapon_: "1H_Police_Baton",
        C4: "1H_Brass_knuckles",
        Armor: "Stabproof_Vest_01_03",
        Medical_Glove: "MMA_Glove_01",
        Electrician_Glove_01_01: "MMA_Glove_01",
        Quiver: "MMA_Glove_01",
      },
      postSpawnActions: ["SetAmmoAmount_SmallStash"],
    },

    // ABANDONED BUNKERS

    Tarp_Sentryequip: {
      ProbabilityMultiplier: 0.8,
      Items: {
        Tire_Repair_Kit: {
          override: { Id: "EMP_Grenade", Rarity: "VeryRare" },
        },
        TearGasGrenade: {
          Rarity: "Uncommon",
        },
        Weapon_Cleaning_Kit: {
          Rarity: "Rare",
        },
        BCULock_Item: {
          Rarity: "VeryRare",
        },
        Frag_Grenade: {
          Rarity: "VeryRare",
        },
        Cal_50BMG: {
          Rarity: "Rare",
        },
        Wire_Cutters_01: {
          Rarity: "Uncommon",
        },
        Electrical_Repair_Kit: {
          Rarity: "Rare",
        },
      },
    },

    // Puppets

    Zombie_C4: {
      Items: {
        C4: {
          postAdd: { Id: "1H_Dildo", Rarity: "Uncommon" },
        },
      },
    },

    Sentry2: {
      FixedItems: {
        "*": [
          "C4_CircuitBoard",
          "BCULock_Item",
          "Lock_Item_Advanced",
          "Lock_Item_Advanced",
          "Lock_Item_Advanced",
          "Cal_50BMG",
          "Cal_50BMG",
          "Cal_5_56x45mm_Ammobox",
          "Cal_5_56x45mm_Ammobox",
          "Cal_7_62x39mm_Ammobox",
          "Cal_7_62x39mm_Ammobox",
          "Screwdriver_Small",
          "Screwdriver_Small",
          "Screwdriver_Small",
          "Screwdriver_Small",
          "Screwdriver_Small",
        ],
      },
    },
    MKIV: {
      FixedItems: {
        "*": [
          "C4_Keypad",
          "C4_CircuitBoard",
          "BCULock_Item",
          "Lock_Item_Advanced",
          "Lock_Item_Advanced",
          "Lock_Item_Advanced",
          "Frag_Grenade",
          "Cal_5_56x45mm_Ammobox",
          "Cal_7_62x39mm_Ammobox",
          "EMP_Grenade",
          "TearGasGrenade",
          "KeyCard",
          "Screwdriver",
        ],
      },
    },

    "WW2_Bunker-Examine_Metal_Locker": {
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
              Rarity: "VeryRare",
              Ids: [
                "ItemLootTreeNodes.LivingRoom.Items.Clothes.Hands.Medical_Glove_01",
                "ItemLootTreeNodes.Bathroom.Items.Fabric",
                "ItemLootTreeNodes.Bathroom.Items.Rubber_band",
                "ItemLootTreeNodes.Bathroom.Items.Disposable_Mask",
              ],
            },
          ],
        },
      },
    },
  },
};
