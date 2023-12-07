import {resolve} from 'path';
import {config} from 'dotenv';
import {processSpawners} from './lootProcessors/spawners';
import {processNodes} from './lootProcessors/nodes';
import {processEconomy} from './lootProcessors/economy';
import {calcProbs} from './lootProcessors/calcProbs';
import {selectRandomSectors} from './sectorSelector';
import {unixTimestamp} from './utils/timeUtils';

config({path: resolve(__dirname, '..', '.env')});

(async () => {
  await processSpawners('bad');
  await processSpawners('good');
  await processEconomy();
  await processNodes();
  calcProbs();

  const sectors = selectRandomSectors(6);
  const strSectors = sectors.join(', ');

  console.log("## Today's New Blue Sectors ##");
  console.log('generated on <t:' + unixTimestamp() + ':F>');
  console.log('# :blue_square: [', strSectors, '] :blue_square: # ');
})();
