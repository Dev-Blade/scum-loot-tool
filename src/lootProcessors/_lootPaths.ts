import path from 'path';

export const pathOut = path.join('.', 'data', 'out');

export const pathLootRoot = path.join('.', 'data', 'Loot');

export const pathItemsRoot = path.join(pathLootRoot, 'Items');
export const pathItemsDefault = path.join(pathItemsRoot, 'Default');
export const pathItemsOverride = path.join(pathItemsRoot, 'Override');

export const pathNodesRoot = path.join(pathLootRoot, 'Nodes');
export const pathNodesDefault = path.join(pathNodesRoot, 'Default');
export const pathNodesOverride = path.join(pathNodesRoot, 'Override');
export const pathNodesTest = path.join(pathNodesRoot, 'Test');

export const pathSpawnersRoot = path.join(pathLootRoot, 'Spawners', 'Presets');
export const pathSpawnersDefault = path.join(pathSpawnersRoot, 'Default');
export const pathSpawnersOverride = path.join(pathSpawnersRoot, 'Override');
export const pathSpawnersTest = path.join(pathSpawnersRoot, 'Test');
