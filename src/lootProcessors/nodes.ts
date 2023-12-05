import path from 'path';
import fs from 'fs/promises';
import {pad} from '../utils/stringUtils';
import {getFiles} from '../utils/fileUtils';
import {ensureDirectory} from '../utils/fileUtils';
import {pathNodesDefault, pathOut} from './_lootPaths';
import {Node, NodePath, RarityPath} from './typesNode';

export const processNodes = async () => {
  let fileCount = 0;
  let fullName = '';

  try {
    const files = await getFiles(pathNodesDefault, false);

    console.log('*** Processing ' + files.length + ' node files');

    const destPath = path.join(pathOut, 'nodeLists');
    await ensureDirectory(destPath);

    for (const file of files) {
      const lines: string[] = [];

      lines.push(file);

      const flatNodes: any[] = [];

      // -------------------------------------------------------
      // recursive function to process a node
      const processNodeFile = (node: Node, nodePath: NodePath = [], rarityPath: RarityPath = []) => {
        const {Name, Rarity, Children} = node;

        nodePath.push(Name);
        rarityPath.push(Rarity);

        if (!Children) {
          const currentPath = nodePath.slice(1).join('.');
          const flatNode = {Name: currentPath, Rarity: rarityPath.slice(1).join(',')};
          flatNodes.push(flatNode);
        } else {
          for (const child of Children) {
            processNodeFile(child, nodePath, rarityPath);
          }
        }

        nodePath.pop();
        rarityPath.pop();
      };

      fullName = path.join(pathNodesDefault, file);
      const contents = await fs.readFile(fullName, 'utf-8');
      const json = JSON.parse(contents);

      fileCount++;
      //console.log('Processing file ' + pad(fileCount, 4, 'start', '0') + ': ' + fullName);
      processNodeFile(json);

      const flatNodesString = flatNodes.map(n => n.Name + ',' + n.Rarity).join('\n');

      lines.push(flatNodesString);
      lines.push('');

      const content = lines.join('\n');

      const d = file.split('.')[0];
      const destPathName = path.join(destPath, d + '.csv');
      await fs.writeFile(destPathName, content, 'utf-8');
    }
  } catch (err) {
    console.log(err);
    console.log('Error processing file ' + fullName + ' - file#' + fileCount + 1);
  }
};
