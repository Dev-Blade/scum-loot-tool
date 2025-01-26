import {SpawnerFilterType} from '../../../typesSpawner';

export const safeMod: SpawnerFilterType = {
  Safe: {
    QuantityMinValue: 1,
    QuantityMaxValue: 2,
    Nodes: {
      Money: {
        Rarity: 'Common',
        postAdd: {
          Rarity: 'Rare',
          Ids: ['ItemLootTreeNodes.AmmoBoxes'],
        },
      },
    },
    AllowDuplicates: true,
    postSpawnActionsMode: 'overwrite',
    postSpawnActions: ['SetCashAmount_BigStash'],
    ProbabilityValue: 50,
  },
};
