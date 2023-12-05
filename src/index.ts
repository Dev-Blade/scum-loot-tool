import {resolve} from 'path';
import {config} from 'dotenv';
import {processSpawners} from './lootProcessors/spawners';
import {processNodes} from './lootProcessors/nodes';
import {processEconomy} from './lootProcessors/economy';

config({path: resolve(__dirname, '..', '.env')});

const test = () => {
  const rarities = ['Abundant', 'Common', 'Uncommon', 'Rare', 'VeryRare', 'ExtremelyRare'] as const;
  type RarityType = (typeof rarities)[number]; // "Abundant" | "Uncommon" | "Rare" | "VeryRare" | "ExtremelyRare"
  interface ItemType {
    Name: string;
    Rarity: RarityType;
  }

  const node: ItemType[] = [
    {
      Name: 'Extremely_Rare_Item_2',
      Rarity: 'ExtremelyRare',
    },
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
  ];

  // Step 1 sort by rarity
  node.sort((a, b) => {
    return rarities.indexOf(b.Rarity) - rarities.indexOf(a.Rarity);
  });

  console.log('sorted source');
  console.log(node);

  // Step 2 group by rarity
  type GroupedType = {
    [key in RarityType]: string[];
  };
  const grouped: GroupedType = node.reduce(
    (acc, item) => {
      if (!acc[item.Rarity]) acc[item.Rarity] = [];
      acc[item.Rarity].push(item.Name);
      return acc;
    },
    {} as {[key in RarityType]: string[]},
  );
  console.log('grouped by rarity');
  console.log(grouped);

  // Step 3 calculate probabilities
  const keys = Object.keys(grouped);
  const values = Object.values(grouped);
  const keyCount = keys.length;

  let sum = 0;
  const m = 100 / (2 ** keyCount - 1); // pct. of smallest part
  for (let i = 0; i < keyCount; i++) {
    const f = 2 ** i * m; // pct. of current part
    sum += f;
    const c = values[i].length;
    console.log('prob', keys[i], '=', f, '; ', c, "items, each item's prob=", f / c);
  }

  console.log('all rarities probs sum', sum);
};

(async () => {
  test();
  //await processSpawners('bad');
  //await processSpawners('good');
  //await processEconomy();
  //await processNodes();
})();
