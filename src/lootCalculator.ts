import fs from 'fs/promises';
import path from 'path';
import {pathSpawnersRoot, pathNodesRoot} from './lootProcessors/_lootPaths';
import {getFiles} from './utils/fileUtils';

type Rarity = 'Abundant' | 'Common' | 'Uncommon' | 'Rare' | 'VeryRare' | 'ExtremelyRare';

type Node = {
  Name: string;
  Rarity: Rarity;
  Children?: Node[];
  probability?: number;
  path?: string;
};

type Item = {
  Id: string;
  Rarity: Rarity;
  probability?: number;
};

type NodeRef = {
  Rarity: Rarity;
  Ids?: string[];
  probability?: number;
};

const rarityWeights: Record<Rarity, number> = {
  Abundant: 32,
  Common: 16,
  Uncommon: 8,
  Rare: 4,
  VeryRare: 2,
  ExtremelyRare: 1,
};

// @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
// Calculate all probabilities recursively starting from a node
function calculateProbabilities(startItem: Node, parentProbability = 1): void {
  if (startItem.Children) {
    const items = startItem.Children;
    const totalWeight = items.reduce((sum, item) => sum + rarityWeights[item.Rarity], 0);

    items.forEach(item => {
      item.probability = (rarityWeights[item.Rarity] / totalWeight) * parentProbability;
      if (item.Children) {
        calculateProbabilities(item, item.probability);
      }
    });
  }
}

function calculateNodeRefProbabilities(nodes: NodeRef[], parentProbability = 1): void {
  const totalWeight = nodes.reduce((sum, item) => sum + rarityWeights[item.Rarity], 0);
  //console.log(nodes, 'totalWeight=' + totalWeight);
  nodes.forEach(node => {
    node.probability = (rarityWeights[node.Rarity] / totalWeight) * parentProbability;
  });
}

// @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
// Find item by path recursively
function findItemByPath(root: Node, path: string): Node | null {
  const keys = path.split('.');

  function search(current: Node, index: number): Node | null {
    if (index >= keys.length) return current; // Found the item
    if (!current.Children) return null; // No children to search in

    const nextItem = current.Children.find(child => child.Name.toLocaleLowerCase() === keys[index].toLocaleLowerCase());
    return nextItem ? search(nextItem, index + 1) : null;
  }
  return root.Name.toLocaleLowerCase() === keys[0].toLocaleLowerCase() ? search(root, 1) : null;
}

// @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
// Find item by name recursively
function findItemByName(root: Node, name: string): Node | null {
  let found: Node | null = null;

  let path: string[] = [];

  function search(current: Node, index = 0) {
    //console.log('-'.repeat(index) + current.Name);
    path[index] = current.Name;
    current.path = path.join('.');
    if (current.Name.toLocaleLowerCase() === name.toLocaleLowerCase()) {
      found = current;
      return;
    }
    if (!found && current.Children) {
      for (const child of current.Children) {
        index++;
        path[index] = child.Name;
        search(child, index);
        path.pop();
        index--;
        if (found !== null) return;
      }
    }
  }
  search(root);
  return found;
}

// @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
// main function

const probabilityFromSpawnerNodes = async (pathSpawners: string, pathNodes: string, fnSpawner: string, itemOfInterest: string) => {
  const spawnerFile = path.join(pathSpawners, fnSpawner);
  let ret: SpawnerProbCollection = {spawner: fnSpawner, probability: 0, spawnerProbability: 0, qMin: 0, qMax: 0};
  let overallProbSum = 0;
  try {
    const contents = await fs.readFile(spawnerFile, 'utf-8');
    const json = JSON.parse(contents);

    const searchProb = (json.Probability ?? 100) / 100;

    const qMin = json.QuantityMin ?? 1;
    const qMax = json.QuantityMax ?? 1;

    //console.log(`evaluating spawner file ${spawnerFile}`);

    if (json.Nodes) {
      const nodeRefs = json.Nodes as NodeRef[];
      const items = json.Items as Item[] | undefined;
      //nodeRefs && items && console.log(items);

      calculateNodeRefProbabilities(nodeRefs);
      for (const nodeRef of nodeRefs) {
        const nodeRefIds = nodeRef.Ids;
        if (nodeRefIds) {
          const prob = nodeRef.probability ?? 1;
          //console.log(`---\nevaluating node ${nodeRefIds} `);
          //console.log(`with an inherited probability of ${prob * 100}% and with a list of ${nodeRefIds.length} items`);

          // calculate probabilities for each nodeRef, and include items

          let probSum = 0;
          const fraction = 1 / nodeRefIds.length;
          //console.log('fraction for each=' + fraction);

          const nodeRefs: Node = {
            Name: 'root',
            Rarity: 'Abundant',
            Children: [],
          };

          // identify and add node objects from NodeRefs
          for (const nodeRef of nodeRefIds) {
            const nrSplit = nodeRef.split('.');
            const fn = nrSplit[1] + '.json';
            const ip = path.join(pathNodes, fn);
            try {
              const contents = await fs.readFile(ip, 'utf-8');
              const json = JSON.parse(contents) as Node;
              const x = findItemByPath(json, nodeRef);
              if (x) nodeRefs.Children!.push(x);
            } catch (e) {
              console.log('error reading ' + fn);
            }
          }

          // finally add items if any
          if (items) {
            const itemsToNodes = items.map(item => {
              return {Name: item.Id, Rarity: item.Rarity};
            });
            nodeRefs.Children!.push(...itemsToNodes);
          }
          // calculate probabilities for all nodes and "fake nodes" (items)
          calculateProbabilities(nodeRefs, prob);

          //console.log('\n', fnSpawner);
          //console.dir(nodeRefs, {depth: 10});

          // console.log('nodeRefs=');
          // console.dir(nodeRefs, {depth: 10});

          for (const nodeRef of nodeRefs.Children!) {
            const item = findItemByName(nodeRef, itemOfInterest);
            if (item !== null && item.probability) {
              const prob = item.probability;
              //console.log(`Found ${item.path}\nThe probability of finding a ${item.Name} is ${prob}%`);
              probSum += prob;
            }
            //console.log('nodePath=' + nodePath);
            //console.dir(nodeStart, {depth: 10});
          }

          //const probSum = searchProb * (await evaluateNodeRefCollection(pathNodes, nodeRefIds, items, itemOfInterest, prob));
          overallProbSum += searchProb * probSum;
        }
      }
    } else {
      //console.error('no nodes found in ' + spawnerFile);
    }

    ret = {...ret, spawnerProbability: searchProb, probability: overallProbSum, qMin, qMax};
  } catch (e) {
    console.error('error reading ' + spawnerFile);
  }
  return ret;
};

interface SpawnerProbCollection {
  spawner: string;
  probability: number;
  spawnerProbability: number;
  qMin: number;
  qMax: number;
}

export const calc = async (itemOfInterest: string, fSpawners = 'Default', fNodes = 'Default') => {
  const pathSpawners = path.join(pathSpawnersRoot, fSpawners);
  const pathNodes = path.join(pathNodesRoot, fNodes);

  const files = await getFiles(pathSpawners, false);

  const c: SpawnerProbCollection[] = [];

  console.log(`calculating probabilities for '${itemOfInterest}' in\n ${pathSpawners}\n referring to ${pathNodes}`);

  let i = 0;
  for (const file of files) {
    if (i % 20 === 0) process.stdout.write('.');
    //console.log(file);
    const r = await probabilityFromSpawnerNodes(pathSpawners, pathNodes, file, itemOfInterest);

    if (r?.probability > 0) {
      //      console.log(`---\n${file}\nThe overall probability of finding a ${itemOfInterest} is ${probability}%`);
      c.push(r);
    }
    i++;
  }
  process.stdout.write(`${i} spawner files processed.\n`);

  c.sort((a, b) => b.probability - a.probability);

  console.log(''.padStart(80, '-'));
  console.log('Q'.padStart(5, ' ') + 'loot*'.padStart(14, ' ') + 'EFF P/Q'.padStart(13, ' ') + 'Spawner'.padStart(10, ' '));
  console.log(''.padStart(80, '-'));

  let limit = 100;

  c.forEach(e => {
    if (e.probability >= 0.0001 && limit-- > 0) {
      const p = String(Math.round(100000 * e.probability) / 1000).padStart(10, ' ');
      const sp = String(Math.round(e.spawnerProbability * 100) / 100).padStart(10, ' ');
      const q = (e.qMin === e.qMax ? '' + e.qMin : `${e.qMin}-${e.qMax}`).padStart(5, ' ') + ' ';
      console.log(`${q} |${sp} |${p}% | ${e.spawner}`);
    }
  });

  console.log('---\nEFF P/Q = final and effective probability per triggered spawning');
  console.log('if effective Q>1, probability multiplies accordingly');
  console.log('loot* = general probability multiplier for the spawner, already calculated into EFF P/Q');
  console.log('\nMade by Blade for SCUM\n');
};

// @
//calc('TNT');
