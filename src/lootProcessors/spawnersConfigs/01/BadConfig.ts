import path from 'path';

import {SpawnersConfigType} from '../../typesSpawner';
import {pathSpawnersOverride} from '../../_lootPaths';
import {commonFilters} from './-commonFilters';
import {sbgc} from './sbgc/-sbgcLow';

export const spawnersConfig: SpawnersConfigType = {
  pathSpawnersOverride: path.join(pathSpawnersOverride, '-bad'),
  skipFilePatterns: [],
  exportOnlyAffectedFiles: false,

  defaults: {
    defaultInitialMinDamage: 20,
    defaultRandomMinDamage: 20,
    defaultProbabilityMultiplier: 0.7,
    defaultInitialDamageMultiplier: 1.3,
    defaultRandomDamageMultiplier: 1.3,
    defaultInitialUsageMultiplier: 1,
    defaultRandomUsageMultiplier: 1.25,
    defaultQuantityMinMultiplier: 1,
    defaultQuantityMaxMultiplier: 1,
    defaultInitialDamageRandomMaxMultiplierIfZero: 0,
  },
  filter: {
    ...commonFilters,
    ...sbgc,
    ...{
      Cargo: {
        InitialDamageValue: 0,
        RandomDamageValue: 0,
        InitialUsageValue: 0,
        RandomUsageValue: 0,
      },
      Killbox: {
        InitialDamageValue: 0,
        RandomDamageValue: 15,
        InitialUsageValue: 0,
        RandomUsageValue: 0,
      },
      Vault: {
        InitialDamageValue: 0,
        RandomDamageValue: 25,
        InitialUsageValue: 0,
        RandomUsageValue: 0,
      },
      Landscape: {
        InitialDamageMultiplier: 0.9,
        RandomDamageMultiplier: 0.9,
        QuantityMinValue: 1,
        QuantityMaxValue: 1,
      },
      Vine_Cellar: {
        QuantityMinValue: 1,
        QuantityMaxValue: 1,
      },

      // boost backpacks in police stations
      'Buildings-Office-Police-Examine_Wardrobe_locker': {
        additionalFilesMatches: ['Buildings-Office-Police-World_Shelf'],
        ProbabilityMultiplier: 1.7, // boost to vanilla
      },

      'Hazmat_Suite_Locker_Small.': {
        additionalFilesMatches: ['Hazmat_Suite_Locker_Big.'],
        ProbabilityValue: 20,
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
