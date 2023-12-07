export const calcProbs = () => {
  const rarities = ['Abundant', 'Common', 'Uncommon', 'Rare', 'VeryRare', 'ExtremelyRare'] as const;
  type RarityType = (typeof rarities)[number]; // "Abundant" | "Uncommon" | "Rare" | "VeryRare" | "ExtremelyRare"
  interface ItemType {
    Name: string;
    Rarity: RarityType;
  }

  const node: ItemType[] = [
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

  console.log('original source');
  console.dir(node, {maxStringLength: 200, breakLength: 200});

  // Step 1 sort by rarity
  node.sort((a, b) => {
    return rarities.indexOf(b.Rarity) - rarities.indexOf(a.Rarity);
  });

  console.log('sorted source');
  console.dir(node, {maxStringLength: 200, breakLength: 200});

  // Step 2 group by rarity
  interface GroupedItemType {
    probabiliy: number;
    items: string[];
  }
  type GroupedType = {
    [key in RarityType]: GroupedItemType;
  };
  const grouped: GroupedType = node.reduce(
    (acc, item) => {
      if (!acc[item.Rarity]) acc[item.Rarity] = {probabiliy: 0, items: []};
      acc[item.Rarity].items.push(item.Name);
      return acc;
    },
    {} as {[key in RarityType]: GroupedItemType},
  );

  // Step 3 calculate probabilities
  const keys = Object.keys(grouped);
  const values = Object.values(grouped);
  const keyCount = keys.length;
  let sum = 0;

  // pct. of smallest part
  const m = 100 / (2 ** keyCount - 1);
  // calculation loop
  for (let i = 0; i < keyCount; i++) {
    const f = 2 ** i * m; // pct. of current part
    values[i].probabiliy = f;
    sum += f;
  }

  console.log('grouped by rarity');
  console.dir(grouped, {maxStringLength: 200, breakLength: 200});

  console.log('all rarities probs sum', sum);
};
