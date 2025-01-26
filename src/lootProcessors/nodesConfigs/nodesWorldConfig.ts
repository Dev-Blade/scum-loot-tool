import path from 'path';

import {pathNodesOverride} from '../_lootPaths';
import {NodesConfigType} from '../typesNode';

export const nodesConfig: NodesConfigType = {
  pathNodesOverride: pathNodesOverride,
  //prefix: 'My',
  skipFilePatterns: [],
  filter: {
    containers: {
      RubberGloves: {
        contexts: ['Workshop', 'CarRepairShop'],
        Rarity: 'VeryRare',
      },
      GasMasks: {
        contexts: ['WW2'],
        Rarity: 'ExtremelyRare',
      },
    },
    // ------------------------------------------------------------
    items: {
      TNT: [
        {
          contexts: ['CoalMine'],
          postAdd: [
            {
              Name: 'Cal_9mm_AP_Ammobox',
              Rarity: 'ExtremelyRare',
            },
          ],
        },
      ],

      // weapons
      '2H_Katana': [
        {
          contexts: ['WW2'],
          postAdd: [
            {
              Name: '2H_Tang_Dao',
              Rarity: 'VeryRare',
            },
          ],
        },
      ],
      // 'Cal_40_PG-7M': {
      //   Rarity: 'ExtremelyRare',
      // },

      Scottish_Sporran_Bag_01: {
        Rarity: 'ExtremelyRare',
      },

      'K6-3_Helmet': {
        contexts: ['Helmets.K6-3_Helmet'],
        remove: true,
      },
      M1_Medical_Helmet: {
        contexts: ['Helmets.Military'],
        postAdd: [
          {Name: 'K6-3_Helmet', Rarity: 'ExtremelyRare'},
          {Name: 'WW2_German_Helmet_01', Rarity: 'ExtremelyRare'},
          {Name: 'Military_Helmet_01_01', Rarity: 'ExtremelyRare'},
          {Name: 'Military_Helmet_01_04', Rarity: 'ExtremelyRare'},
          {Name: 'Military_Helmet_01_05', Rarity: 'ExtremelyRare'},
          {Name: 'WeaponSuppressor_Handgun', Rarity: 'ExtremelyRare'},
          {Name: 'WeaponSuppressor_45ACP', Rarity: 'ExtremelyRare'},
        ],
      },

      Night_Vision_Googles_01: {
        Rarity: 'ExtremelyRare',
        postAdd: [
          {
            Name: 'Compass_Basic',
            Rarity: 'ExtremelyRare',
          },
          {
            Name: '1H_Shuriken',
            Rarity: 'ExtremelyRare',
          },
        ],
      },

      // tools
      Tool_Box: {
        postAdd: [
          {
            Name: 'Wire_Cutters_01',
            Rarity: 'Uncommon',
          },
          {
            Name: 'Glue',
            Rarity: 'Common',
          },
        ],
      },

      Weapon_Cleaning_Kit: [
        {
          contexts: ['HuntingStore'],
          Rarity: 'VeryRare',
          postSpawnActions: ['SetAmmoAmount_SmallStash'],
          postSpawnActionsMode: 'overwrite',
          postAdd: [
            {
              Name: 'Carbon_Arrow',
              Rarity: 'VeryRare',
            },
            {
              Name: 'Metal_Arrow',
              Rarity: 'Rare',
            },
            {
              Name: 'Metal_BroadHead_Arrow',
              Rarity: 'VeryRare',
            },
            {
              Name: 'Carbon_BroadHead_Arrow',
              Rarity: 'VeryRare',
            },
          ],
        },
      ],

      RepairToolkits: {
        Rarity: 'VeryRare',
      },
      Car_Repair_Kit: {
        Rarity: 'VeryRare',
      },
      Tire_Repair_Kit: {
        Rarity: 'Rare',
      },
      Padlock: {
        contexts: ['DeadPuppets'],
        Rarity: 'Uncommon',
      },

      BCULock_Item: {
        Rarity: 'VeryRare',
      },
      Lock_Item_Basic: {
        overrideName: 'Paper',
      },
      Lock_Items_Medium: {
        overrideName: 'Rubber_band',
      },
      Lock_Item_Advanced: {
        //        overrideName: 'Paper',
      },
      DialLock_Item: {
        Rarity: 'VeryRare',
        postAdd: [{Name: 'Padlock', Rarity: 'Uncommon'}],
      },

      '1H_Metal_Pipe': [
        {
          contexts: ['Trash'],
          Rarity: 'Rare',
          postAdd: {
            Name: 'Padlock',
            Rarity: 'Rare',
          },
        },
        {
          contexts: ['Workshop'],
          Rarity: 'VeryRare',
        },
        {
          contexts: ['Quarry'],
          Rarity: 'ExtremelyRare',
        },
      ],

      // food

      MRE_Cheeseburger: {
        additionalMatches: ['MRE_Stew'],
        Rarity: 'VeryRare',
        postAdd: {
          Name: 'Spon',
          Rarity: 'Uncommon',
        },
      },

      Nails_Package_Box: {
        postAdd: [
          {
            Name: 'Bolts',
            Rarity: 'Rare',
          },
        ],
      },
      Bolts_Package_Box: {
        postAdd: [
          {
            Name: 'Nails',
            Rarity: 'Rare',
          },
        ],
      },
      Rager_: {
        Rarity: 'Rare',
      },
      Wheel_265_60_R18_Item: {
        Rarity: 'Rare',
      },

      /*
      Screwdriver_Small: {
        contexts: ['Screwdrivers'],
        Rarity: 'Uncommon',
        postAdd: [
          {
            Name: '1H_Wrench_Pipe',
            Rarity: 'ExtremelyRare',
          },
        ],
      },

      Screwdriver: {
        contexts: ['Airfield', 'CarRepairShop', 'Quarry', 'WW2'],
        postAdd: [{Name: 'Pilot_Glasses', Rarity: 'VeryRare'}],
      },
*/
      Grinding_Stone_02: [
        {
          contexts: ['HuntingStore'],
          Rarity: 'VeryRare',
          postAdd: [{Name: 'Pilot_Glasses', Rarity: 'VeryRare'}],
        },
        {
          contexts: ['GasShop'],
          Rarity: 'VeryRare',
          postAdd: [{Name: 'Round_Sunglasses', Rarity: 'VeryRare'}],
        },
        {
          contexts: ['BrickFactory', 'Quarry', 'Barn', 'Masonry'],
          Rarity: 'Rare',
          postAdd: [{Name: 'Geek_Goggels', Rarity: 'Uncommon'}],
        },
      ],
    },
  },
};
