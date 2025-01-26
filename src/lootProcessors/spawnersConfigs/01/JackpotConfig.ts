import path from 'path';

import {SpawnersConfigType} from '../../typesSpawner';
import {pathSpawnersOverride} from '../../_lootPaths';

import {ammoBoxCollectionLight, ammoBoxCollectionAR, ammoBoxCollectionSniper, ammoBoxCollectionGL} from './collections/ammoBoxes';
import {safeMod} from './mods/safeMod';
import {prisonLockerMod} from './mods/prisonLockerMod';

export const spawnersConfig: SpawnersConfigType = {
  pathSpawnersOverride: path.join(pathSpawnersOverride, '-jackpot'),
  skipFilePatterns: [],
  exportOnlyAffectedFiles: true,

  defaults: {
    defaultInitialMinDamage: 0,
    defaultRandomMinDamage: 0,
    defaultProbabilityMultiplier: 2,
    defaultInitialDamageMultiplier: 1,
    defaultRandomDamageMultiplier: 1,
    defaultInitialUsageMultiplier: 1,
    defaultRandomUsageMultiplier: 1,
    defaultQuantityMinMultiplier: 1,
    defaultQuantityMaxMultiplier: 1,
    defaultInitialDamageRandomMaxMultiplierIfZero: 0,
  },

  filter: {
    ...{
      ...safeMod,
      ...prisonLockerMod,

      'Street-Residential-Examine_BirdHouse': {
        Items: {
          Egg: {
            postAdd: [{Rarity: 'Rare', Id: 'Cannabis_Bud'}],
          },
        },
      },

      Zombie_Eye: {
        ProbabilityValue: 75,
        InitialDamageValue: 0,
        RandomDamageValue: 0,
        QuantityMinValue: 2,
        QuantityMaxValue: 2,
        AllowDuplicates: true,
        postSpawnActions: ['SetCashAmount_SmallStash'],
        Items: {
          Puppet_Eye: {
            override: {
              Rarity: 'Abundant',
              Id: 'Cash',
            },
            postAdd: [
              {
                Rarity: 'Common',
                Id: 'Cash',
              },
              {
                Rarity: 'Uncommon',
                Id: 'Cash',
              },
              {
                Rarity: 'Rare',
                Id: 'Puppet_Eye',
              },
              {
                Rarity: 'Rare',
                Id: 'Currant',
              },
              {
                Rarity: 'Rare',
                Id: 'Cigarettes',
              },
              {
                Rarity: 'VeryRare',
                Id: '1H_Crowbar',
              },
              {
                Rarity: 'VeryRare',
                Id: 'Fuse_600A',
              },
              {
                Rarity: 'VeryRare',
                Id: '12_Gauge_Slug_Ammobox',
              },
              {
                Rarity: 'VeryRare',
                Id: '1H_Bushman',
              },
              {
                Rarity: 'Rare',
                Id: 'Tangerine',
              },
              {
                Rarity: 'VeryRare',
                Id: 'Rice',
              },
              ...ammoBoxCollectionLight('VeryRare'),
              ...ammoBoxCollectionAR('VeryRare'),
              ...ammoBoxCollectionSniper('ExtremelyRare'),
              ...ammoBoxCollectionGL('ExtremelyRare'),
            ],
          },
        },
      },
    },
  },
};
