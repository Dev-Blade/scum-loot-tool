"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createNodesOverview = void 0;
const path_1 = __importDefault(require("path"));
const promises_1 = __importDefault(require("fs/promises"));
const fileUtils_1 = require("../utils/fileUtils");
const fileUtils_2 = require("../utils/fileUtils");
const _lootPaths_1 = require("./_lootPaths");
const stringUtils_1 = require("../utils/stringUtils");
const createNodesOverview = () => __awaiter(void 0, void 0, void 0, function* () {
    let fileCount = 0;
    let fullName = "";
    try {
        const files = yield (0, fileUtils_1.getFiles)(_lootPaths_1.pathNodesDefault, false);
        const destPath = path_1.default.join(_lootPaths_1.pathOut, "nodeLists");
        yield (0, fileUtils_2.ensureDirectory)(destPath);
        for (const file of files) {
            const lines = [];
            lines.push("-------------------------------------------------------");
            lines.push("| " + (0, stringUtils_1.pad)(file, 52, "center") + "|");
            lines.push("-------------------------------------------------------");
            const flatNodes = [];
            const processNodeFile = (node, nodePath) => __awaiter(void 0, void 0, void 0, function* () {
                const { Name, Rarity, Children } = node;
                nodePath.push(Name);
                const currentPath = nodePath.join(".");
                const flatNode = { Name: currentPath, Rarity };
                if (Children) {
                    for (const child of Children) {
                        yield processNodeFile(child, nodePath);
                    }
                }
                else
                    flatNodes.push(flatNode);
                nodePath.pop();
            });
            fullName = path_1.default.join(_lootPaths_1.pathNodesDefault, file);
            const contents = yield promises_1.default.readFile(fullName, "utf-8");
            const json = JSON.parse(contents);
            fileCount++;
            console.log("Processing file " +
                fileCount +
                ": " +
                fullName +
                " - file#" +
                (0, stringUtils_1.pad)(fileCount, 3, "start", "0"));
            yield processNodeFile(json, []);
            const flatNodesString = flatNodes.map((n) => n.Name).join("\n");
            lines.push(flatNodesString);
            lines.push("");
            const content = lines.join("\n");
            const d = file.split(".")[0];
            const destPathName = path_1.default.join(destPath, d + ".txt");
            yield promises_1.default.writeFile(destPathName, content, "utf-8");
        }
    }
    catch (err) {
        console.log(err);
        console.log("Error processing file " + fullName + " - file#" + fileCount + 1);
    }
});
exports.createNodesOverview = createNodesOverview;
//# sourceMappingURL=nodes.js.map