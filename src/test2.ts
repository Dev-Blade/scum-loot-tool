type Rarity = 'Abundant' | 'Common' | 'Uncommon' | 'Rare' | 'VeryRare' | 'ExtremelyRare';

type Item = {
  name: string;
  rarity: Rarity;
  probability?: number; // This will be computed
};

const rarityWeights: Record<Rarity, number> = {
  Abundant: 32,
  Common: 16,
  Uncommon: 8,
  Rare: 4,
  VeryRare: 2,
  ExtremelyRare: 1,
};

function calculateProbabilities(items: Item[]): Item[] {
  // Sum up all weights of the given items
  const totalWeight = items.reduce((sum, item) => sum + rarityWeights[item.rarity], 0);

  // Assign probability to each item
  return items.map(item => ({
    ...item,
    probability: rarityWeights[item.rarity] / totalWeight,
  }));
}

// Example usage
const items: Item[] = [
  {name: 'Item1', rarity: 'Abundant'},
  {name: 'Item1b', rarity: 'Abundant'},
  {name: 'Item2', rarity: 'Common'},
  {name: 'Item3', rarity: 'Rare'},
  {name: 'Item4', rarity: 'ExtremelyRare'},
  {name: 'Item5', rarity: 'ExtremelyRare'},
];

const itemsWithProbabilities = calculateProbabilities(items);
console.log(itemsWithProbabilities);

let p = 0;
for (const item of itemsWithProbabilities) {
  p += item.probability ?? 0;
}
console.log(p);
