export const rarities = ['Abundant', 'Common', 'Uncommon', 'Rare', 'VeryRare', 'ExtremelyRare'] as const;
export type RarityType = (typeof rarities)[number]; // "Abundant" | "Uncommon" | "Rare" | "VeryRare" | "ExtremelyRare"
