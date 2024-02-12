import {RarityType} from './typesCommon';

export type NodePath = Array<Node>;
export type RarityPath = Array<RarityType>;

export interface Node {
  Name: string;
  Rarity: RarityType;
  ChildrenMergeMode?: 'Replace' | 'Merge';
  Children?: Node[];
  PostSpawnActions?: string[];
}

export interface NodeFilterItemPropertyType {
  contexts?: string[];
  additionalMatches?: string[];
  remove?: boolean;
  overrideName?: string;
  override?: Node;
  Rarity?: RarityType;
  postAdd?: Node | Array<Node>;
}

export interface NodeFilterContainerPropertyType {
  contexts?: string[];
  additionalMatches?: string[];
  Rarity?: RarityType;
  PostSpawnActions?: string[];
  Children?: Node[];
}

export interface NodeFilterType {
  items: {[key: string]: NodeFilterItemPropertyType | NodeFilterItemPropertyType[]};
  containers: {[key: string]: NodeFilterContainerPropertyType | NodeFilterContainerPropertyType[]};
}

export interface NodesConfigType {
  pathNodesOverride: string;
  prefix?: string;
  skipFilePatterns: Array<string>;

  filter: NodeFilterType;
}
