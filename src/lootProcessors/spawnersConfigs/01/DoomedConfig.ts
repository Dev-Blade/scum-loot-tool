import path from 'path';

import {SpawnersConfigType} from '../../typesSpawner';
import {pathSpawnersOverride} from '../../_lootPaths';
import {commonFilters} from './-commonFilters';
import {sbgc} from './sbgc/-sbgcLowLow';

export const spawnersConfig: SpawnersConfigType = {
  pathSpawnersOverride: path.join(pathSpawnersOverride, '-doomed'),
  skipFilePatterns: [],
  exportOnlyAffectedFiles: false,

  defaults: {
    defaultInitialMinDamage: 40,
    defaultRandomMinDamage: 40,
    defaultProbabilityMultiplier: 0.3,
    defaultInitialDamageMultiplier: 2,
    defaultRandomDamageMultiplier: 2,
    defaultInitialUsageMultiplier: 1,
    defaultRandomUsageMultiplier: 1.5,
    defaultQuantityMinMultiplier: 1,
    defaultQuantityMaxMultiplier: 1,
    defaultInitialDamageRandomMaxMultiplierIfZero: 0,
  },
  filter: {
    ...commonFilters,
    ...sbgc,
    ...{
      Cargo: {
        InitialDamageValue: 20,
        RandomDamageValue: 40,
        InitialUsageValue: 10,
        RandomUsageValue: 40,
      },
      Landscape: {
        QuantityMinValue: 1,
        QuantityMaxValue: 1,
      },
      Vine_Cellar: {
        QuantityMinValue: 1,
        QuantityMaxValue: 1,
      },
      Fuses: {
        ProbabilityMultiplier: 3,
        InitialDamageMultiplier: 1,
        RandomDamageMultiplier: 1,
        QuantityMinValue: 1,
        QuantityMaxValue: 1,
      },

      Tire_Pile: {
        QuantityMinValue: 1,
        QuantityMaxValue: 1,
      },

      'Hazmat_Suite_Locker_Small.': {
        additionalFilesMatches: ['Hazmat_Suite_Locker_Big.'],
        ProbabilityValue: 10,
        Items: {
          Hazmat_Suit_Modern: {
            Rarity: 'ExtremelyRare',
          },
          Hazmat_Suit_Vintage: {
            Rarity: 'Rare',
          },
        },
      },
    },
  },
};
