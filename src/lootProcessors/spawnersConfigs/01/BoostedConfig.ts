import path from 'path';

import {SpawnersConfigType} from '../../typesSpawner';
import {pathSpawnersOverride} from '../../_lootPaths';
import {commonFilters} from './-commonFilters';
import {goodiesFilters} from './-goodiesFilters';

export const spawnersConfig: SpawnersConfigType = {
  pathSpawnersOverride: path.join(pathSpawnersOverride, '-boosted'),
  skipFilePatterns: [],
  exportOnlyAffectedFiles: false,

  defaults: {
    defaultInitialMinDamage: 0,
    defaultRandomMinDamage: 0,
    defaultProbabilityMultiplier: 1.3,
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
  },
};
