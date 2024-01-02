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
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = require("path");
const dotenv_1 = require("dotenv");
const spawners_1 = require("./lootProcessors/spawners");
const nodes_1 = require("./lootProcessors/nodes");
const economy_1 = require("./lootProcessors/economy");
const calcProbs_1 = require("./lootProcessors/calcProbs");
const sectorSelector_1 = require("./sectorSelector");
const timeUtils_1 = require("./utils/timeUtils");
(0, dotenv_1.config)({ path: (0, path_1.resolve)(__dirname, '..', '.env') });
(() => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, spawners_1.processSpawners)('bad');
    yield (0, spawners_1.processSpawners)('good');
    yield (0, economy_1.processEconomy)();
    yield (0, nodes_1.processNodes)();
    (0, calcProbs_1.calcProbs)();
    const sectors = (0, sectorSelector_1.selectRandomSectors)(6);
    const strSectors = sectors.join(', ');
    console.log("## Today's New Blue Sectors ##");
    console.log('generated on <t:' + (0, timeUtils_1.unixTimestamp)() + ':F>');
    console.log('# :blue_square: [', strSectors, '] :blue_square: # ');
}))();
//# sourceMappingURL=index.js.map