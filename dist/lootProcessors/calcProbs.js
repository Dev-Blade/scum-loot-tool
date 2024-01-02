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
exports.calcNodeProbs = void 0;
const promises_1 = __importDefault(require("fs/promises"));
const typesCommon_1 = require("./typesCommon");
const nodeDemo = [
    {
        Name: 'Abundant_Item_1',
        Rarity: 'Abundant',
    },
    {
        Name: 'Uncommon_Item_1',
        Rarity: 'Uncommon',
    },
    {
        Name: 'Common_Item_1',
        Rarity: 'Common',
    },
    {
        Name: 'Rare_Item_1',
        Rarity: 'Rare',
    },
    {
        Name: 'Very_Rare_Item_1',
        Rarity: 'VeryRare',
    },
    {
        Name: 'Extremely_Rare_Item_1',
        Rarity: 'ExtremelyRare',
    },
    {
        Name: 'Extremely_Rare_Item_2',
        Rarity: 'ExtremelyRare',
    },
];
const node = [
    {
        Name: 'BakedBeans',
        Rarity: 'Rare',
    },
    {
        Name: 'BeefRavioli',
        Rarity: 'Rare',
    },
    {
        Name: 'BeefStew',
        Rarity: 'Rare',
    },
    {
        Name: 'BlackOlives',
        Rarity: 'Rare',
    },
    {
        Name: 'Canned_Corn',
        Rarity: 'Rare',
    },
    {
        Name: 'Canned_Tuna',
        Rarity: 'Uncommon',
    },
    {
        Name: 'CannedFruitCoctail',
        Rarity: 'VeryRare',
    },
    {
        Name: 'CannedGoulash',
        Rarity: 'VeryRare',
    },
    {
        Name: 'CannedPeach',
        Rarity: 'VeryRare',
    },
    {
        Name: 'CannedPear',
        Rarity: 'VeryRare',
    },
    {
        Name: 'CannedPeas',
        Rarity: 'Rare',
    },
    {
        Name: 'CannedSardine',
        Rarity: 'Uncommon',
    },
    {
        Name: 'CannedSeafoodMix',
        Rarity: 'Uncommon',
    },
    {
        Name: 'CannedSpaghetti',
        Rarity: 'Rare',
    },
    {
        Name: 'Chow_Mein',
        Rarity: 'Rare',
    },
    {
        Name: 'GuavaHalves',
        Rarity: 'Uncommon',
    },
    {
        Name: 'MRE_Cheeseburger',
        Rarity: 'VeryRare',
    },
    {
        Name: 'Spon',
        Rarity: 'Rare',
    },
    {
        Name: 'TomatoPelate',
        Rarity: 'Uncommon',
    },
    {
        Name: 'TomatoSouce',
        Rarity: 'Uncommon',
    },
];
const calcNodeProbs = (filePath, nodePath) => __awaiter(void 0, void 0, void 0, function* () {
    console.log('filePath', filePath);
    console.log('nodePath', nodePath);
    const contents = yield promises_1.default.readFile(filePath, 'utf-8');
    const json = JSON.parse(contents);
    console.log('original source');
    console.dir(node, { maxStringLength: 200, breakLength: 200 });
    const calcProbs = (node) => {
        // Step 1 sort by rarity
        node.sort((a, b) => {
            return typesCommon_1.rarities.indexOf(b.Rarity) - typesCommon_1.rarities.indexOf(a.Rarity);
        });
        console.log('sorted source');
        console.dir(node, { maxStringLength: 200, breakLength: 200 });
        const grouped = node.reduce((acc, item) => {
            if (!acc[item.Rarity])
                acc[item.Rarity] = { probabiliy: 0, items: [] };
            acc[item.Rarity].items.push(item.Name);
            return acc;
        }, {});
        // Step 3 calculate probabilities
        const keys = Object.keys(grouped);
        const values = Object.values(grouped);
        const keyCount = keys.length;
        let sum = 0;
        // pct. of smallest part
        const m = 100 / (2 ** keyCount - 1);
        // calculation loop
        for (let i = 0; i < keyCount; i++) {
            const f = 2 ** i * m; // pct. of current part
            values[i].probabiliy = f;
            sum += f;
        }
        console.log('grouped by rarity');
        console.dir(grouped, { maxStringLength: 200, breakLength: 200 });
        console.log('all rarities probs sum', sum);
    };
    calcProbs(node);
});
exports.calcNodeProbs = calcNodeProbs;
//# sourceMappingURL=calcProbs.js.map