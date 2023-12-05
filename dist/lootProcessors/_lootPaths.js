"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.pathSpawnersDefault = exports.pathSpawnersRoot = exports.pathNodesOverride = exports.pathNodesDefault = exports.pathNodesRoot = exports.pathItemsOverride = exports.pathItemsDefault = exports.pathItemsRoot = exports.pathLootRoot = exports.pathOut = void 0;
const path_1 = __importDefault(require("path"));
exports.pathOut = path_1.default.join(".", "data", "out");
exports.pathLootRoot = path_1.default.join(".", "data", "Loot");
exports.pathItemsRoot = path_1.default.join(exports.pathLootRoot, "Items");
exports.pathItemsDefault = path_1.default.join(exports.pathItemsRoot, "Default");
exports.pathItemsOverride = path_1.default.join(exports.pathItemsRoot, "Override");
exports.pathNodesRoot = path_1.default.join(exports.pathLootRoot, "Nodes");
exports.pathNodesDefault = path_1.default.join(exports.pathNodesRoot, "Default");
exports.pathNodesOverride = path_1.default.join(exports.pathNodesRoot, "Override");
exports.pathSpawnersRoot = path_1.default.join(exports.pathLootRoot, "Spawners", "Presets");
exports.pathSpawnersDefault = path_1.default.join(exports.pathSpawnersRoot, "Default");
//# sourceMappingURL=_lootPaths.js.map