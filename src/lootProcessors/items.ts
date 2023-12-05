import path from 'path';
import fs from 'fs/promises';
import {isArray} from 'class-validator';
import {pathItemsDefault, pathItemsOverride} from './_lootPaths';
import {ensureDirectory} from '../utils/fileUtils';

interface IItem {
  Id: string;
  IsDisabledForSpawning: boolean;
  AllowedLocations?: Array<['Coastal', 'Continental', 'Mountain']>;
  CooldownPerSquadMemberMin?: number;
  CooldownPerSquadMemberMax?: number;
  Variations?: string[];
  ShouldOverrideInitialAndRandomUsage?: boolean;
  InitialUsageOverride?: number;
  RandomUsageOverrideUsage?: number;
  [key: string]: any;
}

interface IParameters {
  Parameters: IItem[];
}

const createItemList = async () => {
  const fileNameItemsDefault = path.join(pathItemsDefault, 'Parameters.json');
  const contentItemsDefault = await fs.readFile(fileNameItemsDefault, 'utf-8');
  const parameters = JSON.parse(contentItemsDefault) as IParameters;

  const items = parameters.Parameters;
  if (!isArray(items)) throw new Error('Items is not an array');

  const list: {[key: string]: IItem} = {};
  for (const item of items) {
    list[item.Id.toLowerCase()] = item;
  }

  const fileNameItemsDefaultMapping = path.join(pathItemsOverride, 'Mapping.json');
  await ensureDirectory(pathItemsOverride);

  const strList = JSON.stringify(list, null, 2);
  await fs.writeFile(fileNameItemsDefaultMapping, strList, 'utf-8');
  const keys = Object.keys(list);
  const hits = keys.filter(key => key.indexOf('axe') >= 0);
  console.log(hits);
};
