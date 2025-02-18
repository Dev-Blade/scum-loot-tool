import {resolve} from 'path';
import {config} from 'dotenv';
import {processSpawners} from './lootProcessors/spawners';
import {processNodes} from './lootProcessors/nodes';
import {processEconomy} from './lootProcessors/economy';
import {processSectors, selectRandomSectors} from './sectorSelector';
import {calc} from './lootCalculator';

config({path: resolve(__dirname, '..', '.env')});

(async () => {
  const arg = process.argv.slice(2);

  let x = false;

  if (arg.includes('spawners')) {
    // old server
    // await processSpawners('bad');
    // await processSpawners('good');

    // // new server
    await processSpawners();

    x = true;
  }
  if (arg.includes('economy')) {
    //    await processEconomy('data/EconomyOverride_src.json', 'data/EconomyOverride.json', 'data/index.html');
    await processEconomy('data/EconomyOverride_src_world.json', 'data/EconomyOverride.json', 'data/index.html');
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

  if (arg.includes('calc')) {
    const item = arg[1];
    const sp = arg[2];
    const nd = arg[3];
    calc(item, sp, nd);
    x = true;
  }

  if (process.argv.length === 2 || !x) {
    console.error('Expected arguments at least one of <spawners|nodes|economy|sectors|calc>');
    process.exit(1);
  }

  // await calcNodeProbs(path.join(pathNodesDefault, 'Barn.json'), 'ItemLootTreeNodes.Barn.Other');
})();
