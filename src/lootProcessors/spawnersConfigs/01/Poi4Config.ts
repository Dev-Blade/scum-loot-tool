import path from 'path';

import {SpawnersConfigType} from '../../typesSpawner';
import {pathSpawnersOverride} from '../../_lootPaths';
import {spawnersConfig as doomedConfig} from './DoomedConfig';

export const spawnersConfig: SpawnersConfigType = {
  pathSpawnersOverride: path.join(pathSpawnersOverride, '-poi4'),
  skipFilePatterns: [],
  exportOnlyAffectedFiles: false,

  defaults: doomedConfig.defaults,
  filter: doomedConfig.filter,
};
