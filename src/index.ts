import path, {resolve} from 'path';
import {config} from 'dotenv';
import {processSpawners} from './lootProcessors/spawners';
import {processNodes} from './lootProcessors/nodes';
import {processEconomy} from './lootProcessors/economy';
import {calcNodeProbs} from './lootProcessors/calcProbs';
import {processSectors, selectRandomSectors} from './sectorSelector';
import {unixTimestamp} from './utils/timeUtils';
import {pathNodesDefault} from './lootProcessors/_lootPaths';

config({path: resolve(__dirname, '..', '.env')});

(async () => {
  const arg = process.argv.slice(2);

  let x = false;

  if (arg.includes('spawners')) {
    await processSpawners('bad');
    await processSpawners('good');
    await processSpawners('world');
    x = true;
  }
  if (arg.includes('economy')) {
    await processEconomy('data/EconomyOverride_src.json', 'data/EconomyOverride.json', 'data/index.html');
    await processEconomy('data/EconomyOverride_src_world.json', 'data/EconomyOverride_world.json', 'data/index_world.html');
    x = true;
  }

  if (arg.includes('nodes')) {
    await processNodes();
    x = true;
  }

  if (arg.includes('sectors')) {
    processSectors();
    x = true;
  }

  if (process.argv.length === 2 || !x) {
    console.error('Expected arguments at least one of <spawners|nodes|economy|sectors>');
    process.exit(1);
  }

  // await calcNodeProbs(path.join(pathNodesDefault, 'Barn.json'), 'ItemLootTreeNodes.Barn.Other');
})();
