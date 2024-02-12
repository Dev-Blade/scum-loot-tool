import path from 'path';
import fs from 'fs/promises';
import {getFiles} from '../utils/fileUtils';
import {pathSpawnersDefault} from './_lootPaths';
import {ensureDirectory} from '../utils/fileUtils';
import {isArray} from 'class-validator';
import {spawnersConfig as spawnersBadSectorConfig} from './spawnersConfigs/spawnersBadSectorConfig';
import {spawnersConfig as spawnersLootSectorConfig} from './spawnersConfigs/spawnersGoodSectorConfig';
import {spawnersConfig as spawnersWorldConfig} from './spawnersConfigs/spawnersWorldConfig';

const spawnersConfig = {
  bad: spawnersBadSectorConfig,
  good: spawnersLootSectorConfig,
  world: spawnersWorldConfig,
  //  zone1: spawnersZone1Config,
};
type spawnersConfigKey = keyof typeof spawnersConfig;

import {SpawnerFilterItemType, SpawnerFilterNodeType, ItemType, SpawnerNodeType} from './typesSpawner';
import {randomSpawnerPackUsed} from './spawnersPacks';

export const processSpawners = async (which: spawnersConfigKey) => {
  const {defaults, filter, pathSpawnersOverride, skipFilePatterns} = spawnersConfig[which];

  let fileCount = 0;
  let fullName = '';

  // ----------------------------------------------------------------------------
  const processNodes = (match: string, fileName: string, nodes: Array<SpawnerNodeType>) => {
    let f: SpawnerFilterNodeType = {Items: {}};
    const m = filter[match];
    if (m.Nodes) f = m.Nodes;

    let postAdd: SpawnerNodeType[] = [];

    const filterKeys = Object.keys(f);
    const filterValues = Object.values(f);

    nodes.forEach((node, nodeIndex) => {
      filterKeys.forEach((filterKey, filterKeyIndex) => {
        //console.log('Node', filterKey, node.Ids);
        // loop filter keys
        node.Ids.forEach((id, idIndex) => {
          // loop ids
          if (filterKey === '*' || id.includes(filterKey)) {
            //console.log(id, filterKey);
            const fv = filterValues[filterKeyIndex];
            if (fv.override !== undefined) {
              //console.log('--- overriding ' + nodes[nodeIndex].Ids[idIndex] + ' with ' + fv.override);
              nodes[nodeIndex].Ids[idIndex] = fv.override;
            }
            if (fv.Rarity !== undefined) {
              //console.log('--- Rarity ' + nodes[nodeIndex].Rarity + ' with ' + fv.Rarity);
              nodes[nodeIndex].Rarity = fv.Rarity;
            }
            if (fv.replace !== undefined) {
              //console.log('--- replacing ' + nodes[nodeIndex].Ids[idIndex] + ' with ' + fv.override);
              nodes[nodeIndex].Ids[idIndex] = nodes[nodeIndex].Ids[idIndex].replace(fv.replace[0], fv.replace[1]);
            }
            if (fv.remove === true) {
              console.log('--- removing ' + nodes[nodeIndex].Ids[idIndex] + ' from ' + fileName);
              nodes[nodeIndex].Ids[idIndex] = '';
            }

            if (fv.postAdd) {
              if (isArray(fv.postAdd)) {
                postAdd.push(...fv.postAdd);
              } else {
                postAdd.push(fv.postAdd);
              }
            }

            if (fv.listAdd !== undefined) {
              if (isArray(fv.listAdd)) node.Ids.push(...fv.listAdd);
              else node.Ids.push(fv.listAdd);
            }
          }
          return true;
        });
        return true;
      });
      nodes[nodeIndex].Ids = node.Ids.filter(id => id !== '');
      //nodes[nodeIndex].Ids = [...new Set(node.Ids)];

      return true;
    });

    //postAdd = [...new Set(postAdd)];
    nodes.push(...postAdd);

    return nodes;
  };

  // ----------------------------------------------------------------------------
  const processItems = (match: keyof typeof filter, fileName: string, items: Array<ItemType>) => {
    let f: SpawnerFilterItemType = {Items: {}};
    const m = filter[match];
    if (m.Items) f = m.Items;

    const postAdd: Array<ItemType | ItemType[]> = [];

    const filterKeys = Object.keys(f);
    const filterValues = Object.values(f);
    let list = items.map(item => {
      const index = filterKeys.findIndex(element => element === '*' || item.Id?.includes(element));
      //      console.log('Item', item.Id, index);

      if (index >= 0) {
        const fv = filterValues[index];
        fv.postAdd && postAdd.push(fv.postAdd);

        if (fv.Rarity !== undefined) {
          item.Rarity = fv.Rarity;
        }

        return fv.override !== undefined ? {...item, ...fv.override} : item;
      }
      return item;
    });

    items = list.filter(item => item.Id !== '');

    postAdd.forEach(item => {
      if (isArray(item)) {
        items.push(...item);
      } else {
        items.push(item);
      }
    });

    return items;
  };

  // ----------------------------------------------------------------------------
  const processFixedItems = (match: keyof typeof filter, fileName: string, items: Array<string>) => {
    const m = filter[match];

    let f: object = {};
    if (m.FixedItems) f = m.FixedItems;

    const filterKeys = Object.keys(f);
    const filterValues = Object.values(f);

    if (filterKeys.length === 1 && filterKeys[0] === '*') {
      const v = filterValues[0];
      if (v) {
        items = v instanceof Function ? v() : v;
      }
    } else {
      let list = items.map(item => {
        const index = filterKeys.findIndex(element => element === '*' || item.includes(element));
        //      console.log('FixedItem', item, index);
        if (index >= 0) return filterValues[index];
        else return item;
      });
      items = list.filter(item => item !== '');
    }

    return items;
  };

  try {
    const files = await getFiles(pathSpawnersDefault, false);
    console.log('*** Processing ' + files.length + " spawners files for '" + which + "'");

    for (const file of files) {
      fullName = path.join(pathSpawnersDefault, file);
      const contents = await fs.readFile(fullName, 'utf-8');
      const json = JSON.parse(contents);

      let skip = false;
      skipFilePatterns.forEach(pattern => {
        if (file.includes(pattern)) {
          //console.log('skipping to process ', file);
          skip = true;
          return false;
        }
        return true;
      });

      if (!skip) {
        let probability = parseFloat(json.Probability);
        if (!isNaN(probability)) {
          probability = Math.round(probability * defaults.defaultProbabilityMultiplier);
          if (probability > 100) probability = 100;
          json.Probability = probability;
        }

        const fileProbability = probability;

        let initialDamage = parseInt(json.InitialDamage);
        if (initialDamage === 0) initialDamage = Math.random() * defaults.defaultInitialDamageRandomMaxMultiplierIfZero;

        if (!isNaN(initialDamage)) {
          initialDamage = Math.round(initialDamage * defaults.defaultInitialDamageMultiplier);

          if (initialDamage > 95) {
            initialDamage = 95;
          }

          if (defaults.defaultInitialMinDamage > 0 && initialDamage < defaults.defaultInitialMinDamage) initialDamage = defaults.defaultInitialMinDamage;

          json.InitialDamage = initialDamage;
        }

        let randomDamage = parseInt(json.RandomDamage);
        if (!isNaN(randomDamage)) {
          randomDamage = Math.round(randomDamage * defaults.defaultRandomDamageMultiplier);

          if (randomDamage > 95) {
            randomDamage = 95;
          }

          // Protect against damage > 100
          if (randomDamage + initialDamage >= 100) {
            randomDamage = 100 - initialDamage - 1;
          }

          if (defaults.defaultRandomMinDamage > 0 && randomDamage < defaults.defaultRandomMinDamage) randomDamage = defaults.defaultRandomMinDamage;

          json.RandomDamage = randomDamage;
        }

        let quantityMin = parseInt(json.QuantityMin);
        if (!isNaN(quantityMin)) {
          quantityMin = Math.round(quantityMin * defaults.defaultQuantityMinMultiplier);
          json.QuantityMin = quantityMin;
        }

        let quantityMax = parseInt(json.QuantityMax);
        if (!isNaN(quantityMax)) {
          quantityMax = Math.round(quantityMax * defaults.defaultQuantityMaxMultiplier);

          // Protect against quantityMax < quantityMin
          if (quantityMax < quantityMin) {
            quantityMax = quantityMin;
          }
          json.QuantityMax = quantityMax;
        }

        let initialUsage = parseInt(json.InitialUsage);
        if (!isNaN(initialUsage)) {
          initialUsage = Math.round(initialUsage * defaults.defaultInitialUsageMultiplier);
          json.InitialUsage = initialUsage;
        }
        let randomUsage = parseInt(json.RandomUsage);
        if (!isNaN(randomUsage)) {
          randomUsage = Math.round(randomUsage * defaults.defaultRandomUsageMultiplier);

          // Protect against usage > 100
          if (randomUsage + initialUsage > 100) {
            randomUsage = 100 - initialUsage;
          }
          json.RandomUsage = randomUsage;
        }

        const keys = Object.keys(filter);

        keys.forEach((key, keyIndex) => {
          probability = fileProbability;

          const m = filter[key];
          if (!m) {
            console.error('Missing filter for ' + key);
            return;
          }

          let matchIndex = -1;
          if (key === '*') {
            matchIndex = 0; // always match
          } else matchIndex = file.indexOf(key);

          if (matchIndex < 0) {
            //const additional = values[keys.indexOf(key)].additionalFilesMatches;
            const additional = m.additionalFilesMatches;
            if (additional !== undefined && additional.length > 0) {
              for (const a of additional) {
                matchIndex = file.indexOf(a);
                if (matchIndex >= 0) break;
              }
            }
          }

          if (matchIndex >= 0) {
            const fixedItems = json.FixedItems;
            let isExclude = false;
            const excludes = m.excludedFilesMatches;
            if (excludes) {
              for (const exclude of excludes)
                if (file.includes(exclude)) {
                  isExclude = true;
                  break;
                }
            }
            if (!isExclude) {
              if (isArray(fixedItems)) {
                json.FixedItems = processFixedItems(key, file, fixedItems);
              }

              const nodes = json.Nodes;
              if (isArray(nodes)) {
                json.Nodes = processNodes(key, file, nodes);
              }

              const items = json.Items;
              if (isArray(items)) {
                json.Items = processItems(key, file, items);
              }
              const m = filter[key];

              if (m.postSpawnActions) {
                if (!json.PostSpawnActions) json.PostSpawnActions = [];

                if (m.postSpawnActionsMode === 'overwrite') json.PostSpawnActions = [...m.postSpawnActions];
                else json.PostSpawnActions.push(...m.postSpawnActions);
              }

              if (m.ProbabilityValue !== undefined) {
                probability = json.Probability = m.ProbabilityValue;
              }
              if (m.InitialDamageValue !== undefined) {
                initialDamage = json.InitialDamage = m.InitialDamageValue;
              }
              if (m.RandomDamageValue !== undefined) {
                randomDamage = json.RandomDamage = m.RandomDamageValue;
              }
              if (m.InitialUsageValue !== undefined) {
                initialUsage = json.InitialUsage = m.InitialUsageValue;
              }
              if (m.RandomUsageValue !== undefined) {
                randomUsage = json.RandomUsage = m.RandomUsageValue;
              }
              if (m.QuantityMinValue !== undefined) {
                quantityMin = json.QuantityMin = m.QuantityMinValue;
              }
              if (m.QuantityMaxValue !== undefined) {
                quantityMax = json.QuantityMax = m.QuantityMaxValue;
              }

              if (!isNaN(probability) && m.ProbabilityMultiplier && !isNaN(m.ProbabilityMultiplier)) {
                //console.log(file, key, m.ProbabilityMultiplier);
                probability = Math.round(probability * m.ProbabilityMultiplier);
                if (probability > 100) probability = 100;
                json.Probability = probability;
              }

              if (!isNaN(initialDamage) && m.InitialDamageMultiplier && !isNaN(m.InitialDamageMultiplier)) {
                initialDamage = json.InitialDamage = Math.round(initialDamage * m.InitialDamageMultiplier);
              }

              if (!isNaN(randomDamage) && m.RandomDamageMultiplier && !isNaN(m.RandomDamageMultiplier)) {
                randomDamage = json.RandomDamage = Math.round(randomDamage * m.RandomDamageMultiplier);
              }

              // Protect against damage > 100
              if (!isNaN(initialDamage) && !isNaN(randomDamage) && randomDamage + initialDamage >= 100) {
                randomDamage = json.RandomDamage = 100 - initialDamage - 1;
              }

              if (!isNaN(initialUsage) && m.InitialUsageMultiplier && !isNaN(m.InitialUsageMultiplier)) {
                initialUsage = json.InitialUsage = Math.round(initialUsage * m.InitialUsageMultiplier);
              }

              if (!isNaN(randomUsage) && m.RandomUsageMultiplier && !isNaN(m.RandomUsageMultiplier)) {
                randomUsage = json.RandomUsage = Math.round(randomUsage * m.RandomUsageMultiplier);
              }

              // Protect against usage > 100
              if (!isNaN(initialUsage) && !isNaN(randomUsage) && randomUsage + initialUsage > 100) {
                randomUsage = json.RandomUsageMultiplier = 100 - initialUsage;
              }

              if (!isNaN(quantityMin) && m.QuantityMinMultiplier && !isNaN(m.QuantityMinMultiplier)) {
                quantityMin = json.QuantityMin = Math.round(quantityMin * m.QuantityMinMultiplier);
              }

              if (!isNaN(quantityMax) && m.QuantityMaxMultiplier && !isNaN(m.QuantityMaxMultiplier)) {
                quantityMax = json.QuantityMax = Math.round(quantityMax * m.QuantityMaxMultiplier);
              }

              // Protect against quantityMin > quantityMax
              if (!isNaN(quantityMin) && !isNaN(quantityMax) && quantityMin > quantityMax) {
                quantityMax = json.QuantityMax = quantityMin;
              }

              const allowDuplicates = json.AllowDuplicates;
              if (allowDuplicates !== undefined && m.AllowDuplicates !== undefined) {
                json.AllowDuplicates = m.AllowDuplicates;
              }

              //console.log(file);
            }
          }
        });
      }
      const e = await ensureDirectory(pathSpawnersOverride);
      if (e === false) throw new Error('Could not create target directory ' + pathSpawnersOverride);
      const destName = path.join(pathSpawnersOverride, file);
      await fs.writeFile(destName, JSON.stringify(json, null, 2), 'utf-8');
      fileCount++;
      //console.log(destName, probability);
    }
  } catch (err) {
    console.log(err);
    console.log('Error processing file ' + fullName + ' - file#' + fileCount + 1);
  }
};
