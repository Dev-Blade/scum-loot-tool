import {RarityType} from './typesCommon';

export type ItemType = {
  Rarity: RarityType;
  Id: string;
  postAdd?: ItemType;
};

export type FilterItemType = {
  [Property: string]: {
    postAdd?: ItemType | Array<ItemType>;
    override?: Partial<ItemType> | undefined;
  };
};

export type SpawnerNodeType = {
  Rarity: string;
  Ids: Array<string>;
};
export type FilterNodeType = {
  [Property: string]: {
    postAdd?: SpawnerNodeType | Array<SpawnerNodeType>;
    override?: string | undefined;
  };
};

export type FixedItemType = {
  [Property: string]: string | string[] | Function;
};

export interface FilterPropertyType {
  excludedFilesMatches?: string[];
  additionalFilesMatches?: string[];

  FixedItems?: FixedItemType;
  Nodes?: FilterNodeType;
  Items?: FilterItemType;

  ProbabilityValue?: number;
  InitialDamageValue?: number;
  RandomDamageValue?: number;
  InitialUsageValue?: number;
  RandomUsageValue?: number;
  QuantityMinValue?: number;
  QuantityMaxValue?: number;

  ProbabilityMultiplier?: number;
  InitialDamageMultiplier?: number;
  RandomDamageMultiplier?: number;
  InitialUsageMultiplier?: number;
  RandomUsageMultiplier?: number;
  QuantityMinMultiplier?: number;
  QuantityMaxMultiplier?: number;

  AllowDuplicates?: boolean;

  postSpawnActionsMode?: 'overwrite' | 'add';
  postSpawnActions?: Array<string>;
}
export interface FilterType {
  [key: string]: FilterPropertyType;
}

export interface SpawnersConfigType {
  pathSpawnersOverride: string;
  skipFilePatterns: Array<string>;
  defaults: {
    defaultInitialMinDamage: number;
    defaultRandomMinDamage: number;
    defaultProbabilityMultiplier: number;
    defaultInitialDamageMultiplier: number;
    defaultRandomDamageMultiplier: number;
    defaultInitialUsageMultiplier: number;
    defaultRandomUsageMultiplier: number;
    defaultQuantityMinMultiplier: number;
    defaultQuantityMaxMultiplier: number;
    defaultInitialDamageRandomMaxMultiplierIfZero: number;
  };
  filter: FilterType;
}
