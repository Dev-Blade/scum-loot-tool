import path from "path";

import { pathNodesOverride } from "../_lootPaths";
import { NodesConfigType } from "../typesNode";

export const nodesConfig: NodesConfigType = {
  pathNodesOverride: pathNodesOverride,
  //prefix: 'My',
  skipFilePatterns: [],
  filter: {
    containers: {
      M82s: {
        Rarity: "ExtremelyRare",
      },
      Vests: {
        Rarity: "ExtremelyRare",
      },
      RubberGloves: {
        Rarity: "VeryRare",
      },
      Power: {
        Rarity: "VeryRare",
      },
      Car: {
        Rarity: "VeryRare",
      },
      Compounds: {
        Rarity: "ExtremelyRare",
      },
      LMGs: {
        contexts: ["Military.Weapons"],
        Rarity: "VeryRare",
      },
      Stabproof: {
        contexts: ["Military"],
        Rarity: "Uncommon",
      },
      Handguns: {
        contexts: ["WW2"],
        Rarity: "Uncommon",
      },
      Other: {
        contexts: ["WW2"],
        Rarity: "VeryRare",
      },
      Rifles: [
        {
          contexts: ["WW2"],
          Rarity: "VeryRare",
        },
      ],

      SMGs: [
        {
          additionalMatches: ["LMGs", "AssaultRifles"],
          contexts: ["Police.Weapons"],
          Rarity: "ExtremelyRare",
          Children: [
            {
              Name: "1H_Dildo",
              Rarity: "ExtremelyRare",
            },
            {
              Name: "Binoculars",
              Rarity: "Uncommon",
            },
          ],
        },
      ],

      /*
      Rifles: [
        {
          Rarity: 'VeryRare',
        },
        {
          contexts: ['WW2'],
          Rarity: 'ExtremelyRare',
        },
      ],
      AKs: {
        Rarity: 'Rare',
      },
      M82A1s: {
        Rarity: 'ExtremelyRare',
      },
      MP5s: {
        Rarity: 'Rare',
      },
      LMGs: {
        Rarity: 'ExtremelyRare',
      },
      AssaultRifles: [
        {
          Rarity: 'VeryRare',
        },
        {
          contexts: ['Magazines'],
          Rarity: 'ExtremelyRare',
        },
      ],
      Snipers: [
        {
          contexts: ['Magazines'],
          Rarity: 'ExtremelyRare',
        },
      ],


*/

      Boxed: {
        Rarity: "VeryRare",
      },
      Alcoholic: {
        Rarity: "ExtremelyRare",
      },
      Fluids: {
        Rarity: "ExtremelyRare",
      },
      Sights: {
        Rarity: "Rare",
      },
      Suppressors: [
        {
          Rarity: "Rare",
        },
        {
          contexts: ["Military"],
          Rarity: "Rare",
        },
      ],
      Magazines: {
        Rarity: "VeryRare",
      },
      Ballistic: {
        Rarity: "VeryRare",
      },
      Tactical: {
        Rarity: "ExtremelyRare",
      },
      "Police.Weapons.AssaultRifles": {
        Rarity: "ExtremelyRare",
      },
      "Military.Weapons.AssaultRifles": {
        Rarity: "VeryRare",
      },
      BigStash: [
        {
          PostSpawnActions: ["SetAmmoAmount_SmallStash"],
        },
        {
          contexts: ["Military.ammo.Arrows"],
          PostSpawnActions: ["SetAmmoAmount_BigStash"],
        },
      ],
    },
    // ------------------------------------------------------------
    items: {
      // weapons
      "2H_Katana": [
        {
          contexts: ["WW2"],
          postAdd: [
            {
              Name: "2H_Tang_Dao",
              Rarity: "VeryRare",
            },
          ],
        },
        {
          contexts: ["Military"],
          remove: true,
        },
        {
          contexts: ["Bar", "CarWreck", "Garage", "LivingRoom", "Workshop"],
          postAdd: [
            {
              Name: "1H_KitchenKnife_04",
              Rarity: "ExtremelyRare",
            },
          ],
        },
      ],
      Compound_Bow: {
        contexts: ["Military.Weapons.Other"],
        Rarity: "ExtremelyRare",
      },
      Recurve_Bow_100: {
        contexts: ["Military"],
        Rarity: "VeryRare",
        postAdd: [
          // { Name: "Weapon_M9", Rarity: "Rare" },
          // { Name: "Weapon_M9_Silver", Rarity: "Rare" },
          // { Name: "Weapon_Block21", Rarity: "Rare" },
        ],
      },

      // Make sniper rifles rarer
      Weapon_AWP: {
        Rarity: "VeryRare",
        postAdd: [
          { Name: "Weapon_DT11B_Sawed_Off", Rarity: "VeryRare" },
          //{ Name: "Weapon_DT11B", Rarity: "VeryRare" },
        ],
      },
      Weapon_SVD_Dragunov: {
        Rarity: "ExtremelyRare",
      },

      // SMGs

      Weapon_UMP45: {
        Rarity: "VeryRare",
      },

      Weapon_VSS_VZ: {
        Rarity: "ExtremelyRare",
        postAdd: [
          { Name: "Weapon_DT11B", Rarity: "VeryRare" },
          //{ Name: "1H_Brass_knuckles", Rarity: "Rare" },
        ],
      },
      Weapon_AKS_74U: {
        Rarity: "VeryRare",
      },
      Weapon_AS_Val: {
        Rarity: "VeryRare",
      },

      // LMGs

      Weapon_M249: {
        Rarity: "VeryRare",
      },
      "Weapon_RPK-74": {
        Rarity: "VeryRare",
        postAdd: [
          { Name: "Weapon_M1887", Rarity: "Rare" },
          { Name: "Weapon_M1887_Sawed_off", Rarity: "Rare" },
        ],
      },

      // Assault Rifles

      Weapon_SCAR_DMR: {
        Rarity: "Rare",
      },
      Weapon_MK18: {
        Rarity: "ExtremelyRare",
      },
      Weapon_VHS2: {
        Rarity: "Rare",
      },
      Weapon_VHS2_Rail: {
        Rarity: "VeryRare",
        postAdd: [
          //{Name: 'Weapon_DT11B_Sawed_Off', Rarity: 'Rare'},
          //{Name: 'Weapon_DT11B', Rarity: 'Rare'},
          { Name: "Weapon_Krueger", Rarity: "VeryRare" },
        ],
      },

      Weapon_Hunter85_V2: {
        contexts: ["Military.Weapons.Rifles"],
        Rarity: "Rare",
      },
      Weapon_CarbonHunter: {
        contexts: ["Military.Weapons.Rifles"],
        Rarity: "Rare",
      },

      // pistols

      Weapon_Judge44: {
        contexts: ["Handguns"],
        Rarity: "Common",
      },
      Weapon_Viper_M357: {
        contexts: ["Handguns"],
        Rarity: "Common",
      },

      // mags

      Magazine_HS9: {
        Rarity: "Rare",
      },

      // ammo

      Cal_50BMG: [
        {
          contexts: ["Regular", "AP", "TR"],
          postAdd: [
            { Name: "Cal_9mm_AP", Rarity: "ExtremelyRare" },
            { Name: "Cal_45_AP", Rarity: "ExtremelyRare" },
          ],
        },
      ],
      /*

      {
          contexts: ['AP'],
          postAdd: [
            {Name: 'Cal_9mm_TR', Rarity: 'ExtremelyRare'},
            {Name: 'Cal_45_TR', Rarity: 'ExtremelyRare'},
          ],
        },
        {
          contexts: ['TR'],
          postAdd: [
            {Name: 'Cal_9mm', Rarity: 'ExtremelyRare'},
            {Name: 'Cal_45', Rarity: 'ExtremelyRare'},
          ],
        },
      ],

      Cal_40x46: {
        Rarity: 'VeryRare',
      },

      /*
      '12_Gauge_Slug': {
        Rarity: 'ExtremelyRare',
      },
      'Cal_30-06_Ammobox': {
        additionalMatches: ['Cal_30-06_Ammobox_AP', 'Cal_30-06_Ammobox_TR'],
        Rarity: 'VeryRare',
      },
      Cal_308_Ammobox: {
        additionalMatches: ['Cal_308_Ammobox_AP', 'Cal_308_Ammobox_TR'],
        Rarity: 'VeryRare',
      },
      Cal_338_Ammobox: {
        additionalMatches: ['Cal_338_Ammobox_AP', 'Cal_338_Ammobox_TR'],
        Rarity: 'VeryRare',
      },
      Cal_7_62x39mm_Ammobox: {
        additionalMatches: ['Cal_7_62x39mm_Ammobox_AP', 'Cal_7_62x39mm_Ammobox_TR'],
        Rarity: 'VeryRare',
      },
      Cal_9x39mm_Ammobox: {
        additionalMatches: ['Cal_9x39mm_Ammobox_AP', 'Cal_9x39mm_Ammobox_TR'],
        Rarity: 'VeryRare',
      },
      Cal_7_62x54mmR_Ammobox: {
        additionalMatches: ['Cal_7_62x54mmR_AP_Ammobox', 'Cal_7_62x54mmR_TR_Ammobox'],
        Rarity: 'VeryRare',
      },
      Cal_7_92x57mm_Ammobox: {
        additionalMatches: ['Cal_7_92x57mm_AP_Ammobox', 'Cal_7_92x57mm_TR_Ammobox'],
        Rarity: 'VeryRare',
      },
      Cal_5_45x39mm_Ammobox: {
        additionalMatches: ['Cal_5_45x39mm_Ammobox_AP', 'Cal_5_45x39mm_Ammobox_TR'],
        Rarity: 'VeryRare',
      },
      Cal_5_56x45mm_Ammobox: {
        additionalMatches: ['Cal_5_56x45mm_Ammobox_AP', 'Cal_5_56x45mm_Ammobox_TR'],
        Rarity: 'VeryRare',
      },
      */

      // grenades

      Frag_Grenade: {
        additionalMatches: ["TNT"],
        Rarity: "ExtremelyRare",
        postAdd: [
          {
            Name: "Cal_9mm_AP_Ammobox",
            Rarity: "ExtremelyRare",
          },
          {
            Name: "Cal_45_AP_Ammobox",
            Rarity: "ExtremelyRare",
          },
          {
            Name: "Cal_50_AE_AP_Ammobox",
            Rarity: "ExtremelyRare",
          },
          {
            Name: "Cal_357_Ammobox_AP",
            Rarity: "ExtremelyRare",
          },
        ],
      },
      Flashbang: {
        Rarity: "Rare",
      },
      "Cal_40_PG-7M": {
        Rarity: "ExtremelyRare",
      },

      // gun repair

      Weapon_Cleaning_Kit: [
        {
          contexts: ["Military", "Depository"],
          Rarity: "ExtremelyRare",
        },
      ],

      // gear

      Night_Vision_Googles_01: {
        Rarity: "ExtremelyRare",
        postAdd: [
          {
            Name: "Compass_Basic",
            Rarity: "ExtremelyRare",
          },
          {
            Name: "1H_Shuriken",
            Rarity: "ExtremelyRare",
          },
        ],
      },

      // clothes

      Military_Quiver_01: {
        postAdd: [
          {
            Name: "Waist_Bag_Small_02",
            Rarity: "Rare",
          },
        ],
      },
      Ghillie_Suit_Jacket_01: {
        postAdd: {
          Name: "Raincoat_01",
          Rarity: "Uncommon",
        },
      },
      Ghillie_Suit_Pants_01: {
        postAdd: {
          Name: "Working_pants_01_01",
          Rarity: "Uncommon",
        },
      },
      Scottish_Sporran_Bag_01: {
        Rarity: "ExtremelyRare",
        postAdd: {
          Name: "Waist_Bag_Small_01",
          Rarity: "Rare",
        },
      },

      Hiking_Backpack_01_01: {
        additionalMatches: [
          "Military_Backpack_02_01",
          "Military_Backpack_02_02",
          "Military_Backpack_02_03",
          "Military_Backpack_02_04",
          "Military_Backpack_02_05",
        ],
        postAdd: [
          {
            Name: "Military_Backpack_01_02",
            Rarity: "VeryRare",
          },
          {
            Name: "Military_Backpack_01_03",
            Rarity: "VeryRare",
          },
          {
            Name: "Military_Backpack_01_01",
            Rarity: "VeryRare",
          },
        ],
      },

      Military_Backpack_01_05: {
        postAdd: [
          {
            Name: "Backpack_02_04",
            Rarity: "Uncommon",
          },
          {
            Name: "Backpack_02_05",
            Rarity: "Uncommon",
          },
        ],
      },

      Geiger_Counter_Analogue: {
        Rarity: "VeryRare",
      },
      Smartphone_Battery: {
        contexts: ["Trash.tools.Electrical"],
        postAdd: [
          {
            Name: "Electrical_Repair_Kit",
            Rarity: "ExtremelyRare",
          },
          {
            Name: "Tool_Box_Small",
            Rarity: "ExtremelyRare",
          },
        ],
      },
      "1H_Cleaver": {
        Rarity: "VeryRare",
      },
      Sewing_kit: {
        contexts: ["Military.Gear.tools"],
        Rarity: "VeryRare",
      },

      // helmets

      "K6-3_Helmet": {
        contexts: ["Helmets.K6-3_Helmet"],
        remove: true,
      },
      M1_Medical_Helmet: {
        contexts: ["Helmets.Military"],
        postAdd: [
          { Name: "K6-3_Helmet", Rarity: "ExtremelyRare" },
          { Name: "WW2_German_Helmet_01", Rarity: "ExtremelyRare" },
          { Name: "Military_Helmet_01_01", Rarity: "ExtremelyRare" },
          { Name: "Military_Helmet_01_04", Rarity: "ExtremelyRare" },
          { Name: "Military_Helmet_01_05", Rarity: "ExtremelyRare" },
          { Name: "WeaponSuppressor_Handgun", Rarity: "ExtremelyRare" },
          { Name: "WeaponSuppressor_45ACP", Rarity: "ExtremelyRare" },
        ],
      },

      // vests

      Bulletproof_Vest_01: {
        additionalMatches: [
          "Bulletproof_Vest_01_02",
          "Bulletproof_Vest_01_03",
          "Bulletproof_Vest_01_04",
          "Bulletproof_Vest_01_05",
          "Police_Bulletproof_Vest_01",
        ],
        Rarity: "VeryRare",
        postAdd: [
          {
            Name: "Tactical_Gloves_01_01",
            Rarity: "Rare",
          },
        ],
      },

      Armor_Police_Vest_01: {
        Rarity: "ExtremelyRare",
      },

      Tactical_Vest_01: {
        additionalMatches: [
          "Armor_Tactical_Vest_01_01",
          "Armor_Tactical_Vest_01_02",
          "Armor_Tactical_Vest_01_03",
          "Armor_Tactical_Vest_01_04",
        ],
        Rarity: "VeryRare",
        postAdd: [
          {
            Name: "Tactical_Gloves_01_01",
            Rarity: "Rare",
          },
        ],
      },

      // gear

      WeaponSuppressor_SVD: {
        Rarity: "VeryRare",
      },
      WeaponScope_Vampyr: {
        Rarity: "Rare",
      },
      WeaponScope_M82A1: {
        postAdd: [
          { Name: "MRE_TunaSalad", Rarity: "Uncommon" },
          { Name: "Spon", Rarity: "Rare" },
        ],
      },
      WeaponScope_HuntingScope: {
        Rarity: "Uncommon",
      },

      // tools

      Car_Repair_Kit: {
        Rarity: "VeryRare",
        postAdd: [
          { Name: "Bolts", Rarity: "VeryRare" },
          { Name: "Nails", Rarity: "VeryRare" },
        ],
      },
      /*      
      Electrical_Repair_Kit: {
        Rarity: "ExtremelyRare",
      },
      Electrician_Tools: {
        Rarity: "ExtremelyRare",
      },
*/
      Duct_Tape: {
        Rarity: "VeryRare",
      },
      Grinding_Stone_02: {
        Rarity: "VeryRare",
        postAdd: {
          Name: "Round_Sunglasses",
          Rarity: "VeryRare",
        },
      },

      // locks & picks

      Padlock: {
        contexts: ["DeadPuppets"],
        Rarity: "Uncommon",
      },
      BCULock_Item: {
        Rarity: "ExtremelyRare",
      },
      Lock_Item_Basic: {
        overrideName: "Paper",
      },
      Lock_Items_Medium: {
        overrideName: "Padlock",
      },
      Lock_Item_Advanced: {
        overrideName: "Paper",
      },
      DialLock_Item: {
        Rarity: "ExtremelyRare",
      },
      Lockpick_Advanced_Item: {
        Rarity: "VeryRare",
      },
      Lockpick_Item: {
        Rarity: "VeryRare",
      },
      Medical_Glove_01: {
        additionalMatches: ["Electrician_Glove_01_01"],
        Rarity: "VeryRare",
        postAdd: [
          {
            Name: "Wool_Gloves_01_01",
            Rarity: "Rare",
          },
          {
            Name: "Construction_Gloves_01_01",
            Rarity: "Rare",
          },
        ],
      },
      /*      
      Screwdriver_Small: [
        {
          contexts: ['Barn', 'BrickFactory', 'Pharmacy'],
          Rarity: 'Rare',
        },
        {
          contexts: ['CarRepairShop'],
          Rarity: 'Uncommon',
          postAdd: {
            Name: 'Safety_Goggles',
            Rarity: 'Common',
          },
        },
      ],
*/
      // misc

      /*      
      Thread: [
        {
          Rarity: "VeryRare",
        },
        {
          contexts: ["LivingRoom"],
          Rarity: "Rare",
        },
      ],
*/
      MetalDetector: {
        Rarity: "ExtremelyRare",
      },
      Compass: {
        Rarity: "ExtremelyRare",
      },
      Compass_Basic: {
        Rarity: "ExtremelyRare",
      },
      /*      
      Tool_Box: {
        additionalMatches: ["Tool_Box_Small"],
        postAdd: {
          Name: "Safety_Goggles",
          Rarity: "Common",
        },
      },
*/
      Rebar_Cutter: {
        postAdd: { Name: "Wire_Cutters_01", Rarity: "Common" },
      },
      "1H_Metal_Pipe": [
        {
          contexts: ["Trash"],
          Rarity: "ExtremelyRare",
          postAdd: {
            Name: "Padlock",
            Rarity: "Rare",
          },
        },
        {
          contexts: ["Workshop"],
          Rarity: "Rare",
        },
      ],

      // food

      MRE_Cheeseburger: {
        additionalMatches: ["MRE_Stew"],
        Rarity: "VeryRare",
        postAdd: {
          Name: "Spon",
          Rarity: "Uncommon",
        },
      },

      /*      
      Tourniquet: {
        Rarity: "ExtremelyRare",
      },
      */

      Nails_Package_Box: {
        postAdd: [
          {
            Name: "Bolts",
            Rarity: "Rare",
          },
        ],
      },
      Bolts_Package_Box: {
        postAdd: [
          {
            Name: "Nails",
            Rarity: "Rare",
          },
        ],
      },
      Rager_Seat_FrontLeft_Item: {
        Rarity: "Rare",
      },
      Rager_Seat_FrontRight_Item: {
        Rarity: "Rare",
      },
    },
  },
};
