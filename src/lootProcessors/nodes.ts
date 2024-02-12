import path from 'path';
import fs from 'fs/promises';
import {pad} from '../utils/stringUtils';
import {getFiles, isFile} from '../utils/fileUtils';
import {ensureDirectory} from '../utils/fileUtils';
import {removeDuplicates} from '../utils/arrayUtils';
import {pathNodesDefault, pathOut} from './_lootPaths';
import {Node, NodeFilterContainerPropertyType, NodeFilterItemPropertyType, NodePath, RarityPath} from './typesNode';
import {nodesConfig} from './nodesConfigs/nodesWorldConfig';
import {isArray} from 'class-validator';

const currentPathString = (nodePath: NodePath) =>
  nodePath
    .map(node => node.Name)
    .slice(1)
    .join('.');

export const processNodes = async () => {
  let fileCount = 0;
  let fullName = '';

  try {
    const files = await getFiles(pathNodesDefault, false);

    console.log('*** Processing ' + files.length + ' node files');

    const listPath = path.join(pathOut, 'nodeLists');
    await ensureDirectory(listPath);

    for (const file of files) {
      // -------------------------------------------------------
      const processCSV = async (json: Node) => {
        const lines: string[] = [];
        lines.push(file);

        const flatNodes: any[] = [];

        // -------------------------------------------------------
        // recursive function to process a node
        const r_processCSV = (node: Node, nodePath: NodePath = [], rarityPath: RarityPath = []) => {
          const {Name, Rarity, Children} = node;
          nodePath.push(node);
          if (!Children) {
            const flatNode = {
              Name: currentPathString(nodePath),
              Rarity: nodePath
                .map(node => node.Rarity)
                .slice(1)
                .join(','),
            };
            flatNodes.push(flatNode);
          } else {
            for (const child of Children) {
              r_processCSV(child, nodePath, rarityPath);
            }
          }
          nodePath.pop();
        };

        r_processCSV(json);
        const flatNodesString = flatNodes.map(n => n.Name + ',' + n.Rarity).join('\n');
        lines.push(flatNodesString);
        lines.push('');
        const content = lines.join('\n');
        const d = file.split('.')[0];
        const destFilePath = path.join(listPath, d + '.csv');
        await fs.writeFile(destFilePath, content, 'utf-8');
        //console.log('written CSV ' + pad(fileCount, 4, 'start', '0') + ': ' + destFilePath);
      };

      const filterItemKeys = Object.keys(nodesConfig.filter.items);
      const filterContainerKeys = Object.keys(nodesConfig.filter.containers);

      // -------------------------------------------------------
      const processNodeFile = async (json: Node) => {
        // -------------------------------------------------------
        // recursive function to process a node
        let hit = false;
        const r_processNodeFile = (node: Node, nodePath: NodePath = []) => {
          const {Name, Children} = node;

          //          if (Name.includes('VSS')) console.log('--------WEAPON: ', Name);

          const n = file.split('.')[0];

          if (Children === undefined) {
            // apply rules

            filterItemKeys.forEach((key, keyIndex) => {
              let a: NodeFilterItemPropertyType[];
              if (isArray(nodesConfig.filter.items[key])) a = nodesConfig.filter.items[key] as NodeFilterItemPropertyType[];
              else a = [nodesConfig.filter.items[key] as NodeFilterItemPropertyType];

              for (const m of a) {
                const parent = nodePath[nodePath.length - 1];
                parent.ChildrenMergeMode = 'Replace';

                let match = false;
                if (Name === key) match = true;
                else if (m.additionalMatches !== undefined) {
                  m.additionalMatches.forEach(additionalMatch => {
                    if (Name === additionalMatch) {
                      match = true;
                      //console.log('additional match hit', Name);
                    }
                  });
                }

                if (m.contexts !== undefined) {
                  const cp = currentPathString(nodePath) + '.' + node.Name;
                  //console.log('cp: ' + cp);
                  const preMatch = match;
                  match = false;
                  m.contexts.forEach(context => {
                    if (cp.includes(context)) {
                      match = preMatch;
                      //console.log('context hit', cp, context, Name);
                    }
                  });
                }

                // actual processing
                if (match) {
                  hit = true;
                  if (m.remove) {
                    parent.Children = parent.Children?.filter(nd => nd !== node);
                    return;
                  }
                  if (m.overrideName) node.Name = m.overrideName;
                  if (m.override) node = m.override;
                  if (m.Rarity) node.Rarity = m.Rarity;

                  if (m.postAdd !== undefined) {
                    //console.log('postAdd: ' + JSON.stringify(m.postAdd) + ' to ' + JSON.stringify(parent));
                    if (parent.Children) {
                      //parent.Children.reverse(); // to keep last added when filtering duplicates
                      if (isArray(m.postAdd)) parent.Children.push(...m.postAdd);
                      else parent.Children.push(m.postAdd);
                      parent.Children = removeDuplicates(parent.Children, 'Name');
                    }
                  }
                }
              }
            });
          } else {
            //node.ChildrenMergeMode = 'Replace';

            if (Name === n && nodePath.length === 1) {
              // root node
              node.Name = nodesConfig.prefix ? nodesConfig.prefix + Name : Name;
            }

            filterContainerKeys.forEach((key, keyIndex) => {
              let a: NodeFilterContainerPropertyType[];
              if (isArray(nodesConfig.filter.containers[key])) a = nodesConfig.filter.containers[key] as NodeFilterContainerPropertyType[];
              else a = [nodesConfig.filter.containers[key] as NodeFilterContainerPropertyType];

              for (const m of a) {
                const parent = nodePath[nodePath.length - 1];

                let match = false;
                if (Name === key) match = true;
                else if (m.additionalMatches !== undefined) {
                  m.additionalMatches.forEach(additionalMatch => {
                    if (Name === additionalMatch) match = true;
                  });
                }

                if (m.contexts !== undefined) {
                  const cp = currentPathString(nodePath) + '.' + node.Name;
                  //console.log('cp: ' + cp);
                  const preMatch = match;
                  match = false;
                  m.contexts.forEach(context => {
                    if (cp.includes(context)) {
                      match = preMatch;
                      //console.log('context hit', cp, context, Name);
                    }
                  });
                }

                // actual processing
                if (match) {
                  hit = true;

                  if (m.Children !== undefined) {
                    node.Children = m.Children;
                  }
                  if (m.Rarity) {
                    node.Rarity = m.Rarity;
                  }
                  if (m.PostSpawnActions) {
                    node.PostSpawnActions = [...m.PostSpawnActions];
                  }
                }
              }
            });

            nodePath.push(node);
            for (const child of Children) {
              r_processNodeFile(child, nodePath);
            }
            nodePath.pop();
          }
        };

        // as this will modify the json object
        const s = JSON.stringify(json);
        const jsonClone = JSON.parse(s);

        let skip = false;
        nodesConfig.skipFilePatterns.forEach(pattern => {
          if (file.includes(pattern)) {
            console.log('skipping to process ', file);
            skip = true;
            return false;
          }
          return true;
        });

        if (!skip) {
          r_processNodeFile(jsonClone);
          const destFilePath = path.join(nodesConfig.pathNodesOverride, nodesConfig.prefix ? nodesConfig.prefix + file : file);
          const indexString = pad(fileCount, 4, 'start', '0');
          const exists = await isFile(destFilePath);

          if (hit) {
            const content = JSON.stringify(jsonClone, null, 2);
            await fs.writeFile(destFilePath, content, 'utf-8');
            console.log((exists ? 'replaced' : 'created') + ' override file ' + indexString + ': ' + destFilePath);
          } else if (await isFile(destFilePath)) {
            await fs.rm(destFilePath);
            console.log('removed ' + indexString + ': ' + destFilePath);
          }
        }
        return jsonClone;
      };

      const removeDuplcateChildren = async (json: Node) => {
        const r_processDuplicateChildren = (node: Node) => {
          if (node.Children === undefined) {
          } else {
            node.Children.reverse();
            node.Children = removeDuplicates(node.Children, 'Name');
            node.Children.reverse();
            for (const child of node.Children) {
              r_processDuplicateChildren(child);
            }
          }
        };
        r_processDuplicateChildren(json);
      };

      fullName = path.join(pathNodesDefault, file);
      const contents = await fs.readFile(fullName, 'utf-8');
      const json = JSON.parse(contents);

      fileCount++;
      //console.log('Processing file ' + pad(fileCount, 4, 'start', '0') + ': ' + fullName);
      await processCSV(json);

      // as this will modify the json object
      const jsonModified = await processNodeFile(json);
      removeDuplcateChildren(jsonModified);
    }
  } catch (err) {
    console.log(err);
    console.log('Error processing file ' + fullName + ' - file#' + fileCount + 1);
  }
};
