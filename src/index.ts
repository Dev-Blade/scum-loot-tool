import {resolve} from 'path';
import {config} from 'dotenv';
import {processSpawners} from './lootProcessors/spawners';
import {processNodes} from './lootProcessors/nodes';
import {fixFP, processEconomy} from './lootProcessors/economy';
import {processSectors, selectRandomSectors} from './sectorSelector';

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

  // not necessary anymore
  if (arg.includes('ffp')) {
    //    await processEconomy('data/EconomyOverride_src.json', 'data/EconomyOverride.json', 'data/index.html');
    await fixFP('data/EconomyOverride_src_world.json', 'data/EconomyOverride_src_FP.json');
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
    console.error('Expected arguments at least one of <spawners|nodes|economy|sectors|ffp>');
    process.exit(1);
  }

  // await calcNodeProbs(path.join(pathNodesDefault, 'Barn.json'), 'ItemLootTreeNodes.Barn.Other');
})();
