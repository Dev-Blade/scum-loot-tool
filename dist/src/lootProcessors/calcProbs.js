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
const utils_1 = require("./utils");
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
const calcNodeProbs = (nodeFile, nodePath) => __awaiter(void 0, void 0, void 0, function* () {
    // recursive function to calculate probabilities
    const calcProbs = (node) => {
        let children = node.Children;
        if (!children || children.length === 0)
            children = [];
        // console.log('original source');
        // console.dir(node, {maxStringLength: 200, breakLength: 200});
        // Step 1 sort by rarity
        children.sort((a, b) => {
            return typesCommon_1.rarities.indexOf(b.Rarity) - typesCommon_1.rarities.indexOf(a.Rarity);
        });
        console.log('sorted source');
        console.dir(node, { depth: 20, maxStringLength: 200, breakLength: 200 });
        // Step 2 group by rarity
        const grouped = children.reduce((acc, item) => {
            let gi = acc[item.Rarity];
            if (!gi)
                gi = { items: [] };
            const newItem = { name: item.Name, rarity: item.Rarity };
            gi.items.push(newItem);
            acc[item.Rarity] = gi;
            if (item.Children) {
                if (!newItem.children)
                    newItem.children = [];
                newItem.children.push(calcProbs(item));
            }
            return acc;
        }, {});
        // Step 3 calculate probabilities
        const keys = typesCommon_1.rarities.filter(r => grouped[r] !== undefined).reverse();
        const values = keys.map(m => grouped[m]);
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
        // console.log('grouped by rarity');
        // console.dir(grouped, {depth: 10, maxStringLength: 200, breakLength: 200});
        // console.log('all rarities probs sum', sum);
        return grouped;
    };
    console.log('nodeFile', nodeFile);
    console.log('nodePath', nodePath);
    const contents = yield promises_1.default.readFile(nodeFile, 'utf-8');
    const json = JSON.parse(contents);
    const node = (0, utils_1.findJsonNode)(json, nodePath);
    if (!node) {
        console.error(`node not found in file ${nodeFile} with path ${nodePath}`);
        return undefined;
    }
    let grouped = calcProbs(node);
    if (!grouped) {
        console.error(`result for groups empty for file ${nodeFile} with path ${nodePath}`);
        return undefined;
    }
    console.error(`results for file ${nodeFile} with path ${nodePath}`);
    console.dir(grouped, { depth: 10, maxStringLength: 200, breakLength: 200 });
    return grouped;
});
exports.calcNodeProbs = calcNodeProbs;
//# sourceMappingURL=calcProbs.js.map