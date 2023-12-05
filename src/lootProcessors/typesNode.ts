import {RarityType} from './typesCommon';

export type NodePath = Array<string>;
export type RarityPath = Array<RarityType>;

export interface Node {
  Name: string;
  Rarity: RarityType;
  Children?: Node[];
}
