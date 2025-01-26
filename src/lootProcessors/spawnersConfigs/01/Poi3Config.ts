import path from 'path';

import {SpawnersConfigType} from '../../typesSpawner';
import {pathSpawnersOverride} from '../../_lootPaths';
import {commonFilters} from './-commonFilters';
import {goodiesFilters} from './-goodiesFilters';
import {premiumFilters} from './-premiumFilters';

export const spawnersConfig: SpawnersConfigType = {
  pathSpawnersOverride: path.join(pathSpawnersOverride, '-poi3'),
  skipFilePatterns: [],
  exportOnlyAffectedFiles: false,

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
    ...commonFilters,
    ...goodiesFilters,
    ...premiumFilters,
  },
};
