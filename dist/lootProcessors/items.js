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
const path_1 = __importDefault(require("path"));
const promises_1 = __importDefault(require("fs/promises"));
const class_validator_1 = require("class-validator");
const _lootPaths_1 = require("./_lootPaths");
const fileUtils_1 = require("../utils/fileUtils");
const createItemList = () => __awaiter(void 0, void 0, void 0, function* () {
    const fileNameItemsDefault = path_1.default.join(_lootPaths_1.pathItemsDefault, 'Parameters.json');
    const contentItemsDefault = yield promises_1.default.readFile(fileNameItemsDefault, 'utf-8');
    const parameters = JSON.parse(contentItemsDefault);
    const items = parameters.Parameters;
    if (!(0, class_validator_1.isArray)(items))
        throw new Error('Items is not an array');
    const list = {};
    for (const item of items) {
        list[item.Id.toLowerCase()] = item;
    }
    const fileNameItemsDefaultMapping = path_1.default.join(_lootPaths_1.pathItemsOverride, 'Mapping.json');
    yield (0, fileUtils_1.ensureDirectory)(_lootPaths_1.pathItemsOverride);
    const strList = JSON.stringify(list, null, 2);
    yield promises_1.default.writeFile(fileNameItemsDefaultMapping, strList, 'utf-8');
    const keys = Object.keys(list);
    const hits = keys.filter((key) => key.indexOf('axe') >= 0);
    console.log(hits);
});
//# sourceMappingURL=items.js.map