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
exports.processNodes = void 0;
const path_1 = __importDefault(require("path"));
const promises_1 = __importDefault(require("fs/promises"));
const fileUtils_1 = require("../utils/fileUtils");
const fileUtils_2 = require("../utils/fileUtils");
const _lootPaths_1 = require("./_lootPaths");
const processNodes = () => __awaiter(void 0, void 0, void 0, function* () {
    let fileCount = 0;
    let fullName = '';
    try {
        const files = yield (0, fileUtils_1.getFiles)(_lootPaths_1.pathNodesDefault, false);
        console.log('*** Processing ' + files.length + ' node files');
        const destPath = path_1.default.join(_lootPaths_1.pathOut, 'nodeLists');
        yield (0, fileUtils_2.ensureDirectory)(destPath);
        for (const file of files) {
            const lines = [];
            lines.push(file);
            const flatNodes = [];
            // -------------------------------------------------------
            // recursive function to process a node
            const processNodeFile = (node, nodePath = [], rarityPath = []) => {
                const { Name, Rarity, Children } = node;
                nodePath.push(Name);
                rarityPath.push(Rarity);
                if (!Children) {
                    const currentPath = nodePath.slice(1).join('.');
                    const flatNode = { Name: currentPath, Rarity: rarityPath.slice(1).join(',') };
                    flatNodes.push(flatNode);
                }
                else {
                    for (const child of Children) {
                        processNodeFile(child, nodePath, rarityPath);
                    }
                }
                nodePath.pop();
                rarityPath.pop();
            };
            fullName = path_1.default.join(_lootPaths_1.pathNodesDefault, file);
            const contents = yield promises_1.default.readFile(fullName, 'utf-8');
            const json = JSON.parse(contents);
            fileCount++;
            //console.log('Processing file ' + pad(fileCount, 4, 'start', '0') + ': ' + fullName);
            processNodeFile(json);
            const flatNodesString = flatNodes.map(n => n.Name + ',' + n.Rarity).join('\n');
            lines.push(flatNodesString);
            lines.push('');
            const content = lines.join('\n');
            const d = file.split('.')[0];
            const destPathName = path_1.default.join(destPath, d + '.csv');
            yield promises_1.default.writeFile(destPathName, content, 'utf-8');
        }
    }
    catch (err) {
        console.log(err);
        console.log('Error processing file ' + fullName + ' - file#' + fileCount + 1);
    }
});
exports.processNodes = processNodes;
//# sourceMappingURL=nodes.js.map