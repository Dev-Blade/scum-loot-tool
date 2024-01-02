import fs from 'fs/promises';
import {RarityType, rarities} from './typesCommon';
import {Node} from './typesNode';
import {findJsonNode} from './utils';

const nodeDemo = [
  {
    Name: 'Abundant_Item_1',
    Rarity: 'Abundant',
  },
  {
    Name: 'Uncommon_Item_1',
    Rarity: 'Uncommon',
  },
  {
    Name: 'Common_Item_1',
    Rarity: 'Common',
  },
  {
    Name: 'Rare_Item_1',
    Rarity: 'Rare',
  },
  {
    Name: 'Very_Rare_Item_1',
    Rarity: 'VeryRare',
  },
  {
    Name: 'Extremely_Rare_Item_1',
    Rarity: 'ExtremelyRare',
  },
  {
    Name: 'Extremely_Rare_Item_2',
    Rarity: 'ExtremelyRare',
  },
];

const node: Node[] = [
  {
    Name: 'BakedBeans',
    Rarity: 'Rare',
  },
  {
    Name: 'BeefRavioli',
    Rarity: 'Rare',
  },
  {
    Name: 'BeefStew',
    Rarity: 'Rare',
  },
  {
    Name: 'BlackOlives',
    Rarity: 'Rare',
  },
  {
    Name: 'Canned_Corn',
    Rarity: 'Rare',
  },
  {
    Name: 'Canned_Tuna',
    Rarity: 'Uncommon',
  },
  {
    Name: 'CannedFruitCoctail',
    Rarity: 'VeryRare',
  },
  {
    Name: 'CannedGoulash',
    Rarity: 'VeryRare',
  },
  {
    Name: 'CannedPeach',
    Rarity: 'VeryRare',
  },
  {
    Name: 'CannedPear',
    Rarity: 'VeryRare',
  },
  {
    Name: 'CannedPeas',
    Rarity: 'Rare',
  },
  {
    Name: 'CannedSardine',
    Rarity: 'Uncommon',
  },
  {
    Name: 'CannedSeafoodMix',
    Rarity: 'Uncommon',
  },
  {
    Name: 'CannedSpaghetti',
    Rarity: 'Rare',
  },
  {
    Name: 'Chow_Mein',
    Rarity: 'Rare',
  },
  {
    Name: 'GuavaHalves',
    Rarity: 'Uncommon',
  },
  {
    Name: 'MRE_Cheeseburger',
    Rarity: 'VeryRare',
  },
  {
    Name: 'Spon',
    Rarity: 'Rare',
  },
  {
    Name: 'TomatoPelate',
    Rarity: 'Uncommon',
  },
  {
    Name: 'TomatoSouce',
    Rarity: 'Uncommon',
  },
];

interface RarityItem {
  probabiliy: number;
  items: GroupedItemType[];
}

interface GroupedItemType {
  name?: string;
  rarity?: RarityType;
  probabiliy?: number;
  items?: string[];
  children?: GroupedItemType[];
  ExtremelyRare?: GroupedItemType;
  VeryRare?: GroupedItemType;
  Rare?: GroupedItemType;
  Uncommon?: GroupedItemType;
  Common?: GroupedItemType;
  Abundant?: GroupedItemType;
}

export const calcNodeProbs = async (nodeFile: string, nodePath: string): Promise<GroupedItemType | undefined> => {
  // recursive function to calculate probabilities
  const calcProbs = (node: Node) => {
    let children: Node[] | undefined = node.Children;
    if (!children || children.length === 0) children = [];

    // console.log('original source');
    // console.dir(node, {maxStringLength: 200, breakLength: 200});

    // Step 1 sort by rarity
    children.sort((a, b) => {
      return rarities.indexOf(b.Rarity) - rarities.indexOf(a.Rarity);
    });

    console.log('sorted source');
    console.dir(node, {depth: 20, maxStringLength: 200, breakLength: 200});

    // Step 2 group by rarity
    const grouped: GroupedItemType = children.reduce((acc, item) => {
      let gi = acc[item.Rarity];
      if (!gi) gi = {items: []};
      acc[item.Rarity] = gi;

      if (item.Children) {
        if (!gi.children) gi.children = [];
        const x = calcProbs(item);
        gi.children!.push(x);
      } else gi.items!.push(item.Name);

      acc = {name: node.Name, ...acc};

      return acc;
    }, {} as GroupedItemType);

    // Step 3 calculate probabilities
    const keys = rarities.filter(r => grouped[r] !== undefined).reverse();
    const values = keys.map(m => grouped[m]);
    const keyCount = keys.length;
    let sum = 0;

    // pct. of smallest part
    const m = 100 / (2 ** keyCount - 1);
    // calculation loop
    for (let i = 0; i < keyCount; i++) {
      const f = 2 ** i * m; // pct. of current part
      values[i]!.probabiliy = f;
      sum += f;
    }

    // console.log('grouped by rarity');
    // console.dir(grouped, {depth: 10, maxStringLength: 200, breakLength: 200});
    // console.log('all rarities probs sum', sum);

    return grouped;
  };

  console.log('nodeFile', nodeFile);
  console.log('nodePath', nodePath);
  const contents = await fs.readFile(nodeFile, 'utf-8');
  const json = JSON.parse(contents);
  const node = findJsonNode(json, nodePath) as Node;

  if (!node) {
    console.error(`node not found in file ${nodeFile} with path ${nodePath}`);
    return undefined;
  }

  let grouped: GroupedItemType | undefined = calcProbs(node);

  if (!grouped) {
    console.error(`result for groups empty for file ${nodeFile} with path ${nodePath}`);
    return undefined;
  }

  console.error(`results for file ${nodeFile} with path ${nodePath}`);
  console.dir(grouped, {depth: 10, maxStringLength: 200, breakLength: 200});
  return grouped;
};
