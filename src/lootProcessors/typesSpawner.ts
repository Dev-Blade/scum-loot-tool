import { RarityType } from "./typesCommon";

export type ItemType = {
  Rarity: RarityType;
  Id: string;
  postAdd?: ItemType;
};

export type SpawnerFilterItemType = {
  [Property: string]: {
    postAdd?: ItemType | Array<ItemType>;
    override?: Partial<ItemType>;
    Rarity?: RarityType;
  };
};

export type SpawnerNodeType = {
  Rarity: string;
  Ids: Array<string>;
};
export type SpawnerFilterNodeType = {
  [Property: string]: {
    Rarity?: RarityType;
    postAdd?: SpawnerNodeType | Array<SpawnerNodeType>;
    listAdd?: string | string[];
    override?: string;
    remove?: boolean;
    replace?: [string, string];
  };
};

export type SpawnerFixedItemType = {
  [Property: string]: string | string[] | Function;
};

export interface SpawnerFilterPropertyType {
  excludedFilesMatches?: string[];
  additionalFilesMatches?: string[];

  FixedItems?: SpawnerFixedItemType;
  Nodes?: SpawnerFilterNodeType;
  Items?: SpawnerFilterItemType;

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

  ShouldFilterItemsByZone?: boolean;

  AllowDuplicates?: boolean;

  postSpawnActionsMode?: "overwrite" | "add";
  postSpawnActions?: Array<string>;
}
export interface SpawnerFilterType {
  [key: string]: SpawnerFilterPropertyType;
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
  filter: SpawnerFilterType;
}
