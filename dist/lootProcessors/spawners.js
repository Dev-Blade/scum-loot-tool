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
exports.updateSpawners = void 0;
const path_1 = __importDefault(require("path"));
const promises_1 = __importDefault(require("fs/promises"));
const fileUtils_1 = require("../utils/fileUtils");
const _lootPaths_1 = require("./_lootPaths");
const fileUtils_2 = require("../utils/fileUtils");
const class_validator_1 = require("class-validator");
const spawnersGlobalConfig_1 = require("./spawnersGlobalConfig");
const updateSpawners = () => __awaiter(void 0, void 0, void 0, function* () {
    let fileCount = 0;
    let fullName = '';
    // ----------------------------------------------------------------------------
    const processNodes = (match, fileName, nodes) => {
        let f = { Items: {} };
        const m = spawnersGlobalConfig_1.filter[match];
        if (m.Nodes)
            f = m.Nodes;
        let postAdd = [];
        const filterKeys = Object.keys(f);
        const filterValues = Object.values(f);
        nodes.forEach((node, nodeIndex) => {
            filterKeys.forEach((filterKey, filterKeyIndex) => {
                //console.log('Node', filterKey, node.Ids);
                // loop filter keys
                node.Ids.forEach((id, idIndex) => {
                    // loop ids
                    if (filterKey === '*' || id.includes(filterKey)) {
                        console.log(id, filterKey);
                        const fv = filterValues[filterKeyIndex];
                        if (fv.override !== undefined) {
                            console.log('--- replacing ' +
                                nodes[nodeIndex].Ids[idIndex] +
                                ' by ' +
                                fv.override);
                            nodes[nodeIndex].Ids[idIndex] = fv.override;
                        }
                        if (fv.postAdd) {
                            if ((0, class_validator_1.isArray)(fv.postAdd)) {
                                postAdd.push(...fv.postAdd);
                            }
                            else {
                                postAdd.push(fv.postAdd);
                            }
                        }
                    }
                    return true;
                });
                return true;
            });
            nodes[nodeIndex].Ids = node.Ids.filter((id) => id !== '');
            //nodes[nodeIndex].Ids = [...new Set(node.Ids)];
            return true;
        });
        //postAdd = [...new Set(postAdd)];
        nodes.push(...postAdd);
        return nodes;
    };
    // ----------------------------------------------------------------------------
    const processItems = (match, fileName, items) => {
        let f = { Items: {} };
        const m = spawnersGlobalConfig_1.filter[match];
        if (m.Items)
            f = m.Items;
        const postAdd = [];
        const filterKeys = Object.keys(f);
        const filterValues = Object.values(f);
        let list = items.map((item) => {
            const index = filterKeys.findIndex((element) => { var _a; return element === '*' || ((_a = item.Id) === null || _a === void 0 ? void 0 : _a.includes(element)); });
            //      console.log('Item', item.Id, index);
            if (index >= 0) {
                const fv = filterValues[index];
                fv.postAdd && postAdd.push(fv.postAdd);
                return fv.override !== undefined ? Object.assign(Object.assign({}, item), fv.override) : item;
            }
            return item;
        });
        items = list.filter((item) => item.Id !== '');
        postAdd.forEach((item) => {
            if ((0, class_validator_1.isArray)(item)) {
                items.push(...item);
            }
            else {
                items.push(item);
            }
        });
        return items;
    };
    // ----------------------------------------------------------------------------
    const processFixedItems = (match, fileName, items) => {
        const m = spawnersGlobalConfig_1.filter[match];
        let f = {};
        if (m.FixedItems)
            f = m.FixedItems;
        const filterKeys = Object.keys(f);
        const filterValues = Object.values(f);
        if (filterKeys.length === 1 && filterKeys[0] === '*') {
            items = filterValues[0];
        }
        else {
            let list = items.map((item) => {
                const index = filterKeys.findIndex((element) => element === '*' || item.includes(element));
                //      console.log('FixedItem', item, index);
                if (index >= 0)
                    return filterValues[index];
                else
                    return item;
            });
            items = list.filter((item) => item !== '');
        }
        return items;
    };
    try {
        const files = yield (0, fileUtils_1.getFiles)(_lootPaths_1.pathSpawnersDefault, false);
        for (const file of files) {
            fullName = path_1.default.join(_lootPaths_1.pathSpawnersDefault, file);
            const contents = yield promises_1.default.readFile(fullName, 'utf-8');
            const json = JSON.parse(contents);
            let skip = false;
            spawnersGlobalConfig_1.globalSkipFilePatterns.forEach((pattern) => {
                if (file.includes(pattern)) {
                    console.log('skipping to process ', file);
                    skip = true;
                    return false;
                }
                return true;
            });
            if (!skip) {
                let probability = parseFloat(json.Probability);
                if (!isNaN(probability)) {
                    probability = Math.round(probability * spawnersGlobalConfig_1.defaultProbabilityMultiplier);
                    if (probability > 100)
                        probability = 100;
                    json.Probability = probability;
                }
                let initialDamage = parseInt(json.InitialDamage);
                if (initialDamage === 0)
                    initialDamage =
                        Math.random() * spawnersGlobalConfig_1.defaultInitialDamageRandomMaxMultiplierIfZero;
                if (!isNaN(initialDamage)) {
                    initialDamage = Math.round(initialDamage * spawnersGlobalConfig_1.defaultInitialDamageMultiplier);
                    if (initialDamage > 95) {
                        initialDamage = 95;
                    }
                    if (spawnersGlobalConfig_1.defaultInitialMinDamage > 0 &&
                        initialDamage < spawnersGlobalConfig_1.defaultInitialMinDamage)
                        initialDamage = spawnersGlobalConfig_1.defaultInitialMinDamage;
                    json.InitialDamage = initialDamage;
                }
                let randomDamage = parseInt(json.RandomDamage);
                if (!isNaN(randomDamage)) {
                    randomDamage = Math.round(randomDamage * spawnersGlobalConfig_1.defaultRandomDamageMultiplier);
                    if (randomDamage > 95) {
                        randomDamage = 95;
                    }
                    // Protect against damage > 100
                    if (randomDamage + initialDamage >= 100) {
                        randomDamage = 100 - initialDamage - 1;
                    }
                    if (spawnersGlobalConfig_1.defaultRandomMinDamage > 0 &&
                        randomDamage < spawnersGlobalConfig_1.defaultRandomMinDamage)
                        randomDamage = spawnersGlobalConfig_1.defaultRandomMinDamage;
                    json.RandomDamage = randomDamage;
                }
                let quantityMin = parseInt(json.QuantityMin);
                if (!isNaN(quantityMin)) {
                    quantityMin = Math.round(quantityMin * spawnersGlobalConfig_1.defaultQuantityMinMultiplier);
                    json.QuantityMin = quantityMin;
                }
                let quantityMax = parseInt(json.QuantityMax);
                if (!isNaN(quantityMax)) {
                    quantityMax = Math.round(quantityMax * spawnersGlobalConfig_1.defaultQuantityMaxMultiplier);
                    // Protect against quantityMax < quantityMin
                    if (quantityMax < quantityMin) {
                        quantityMax = quantityMin;
                    }
                    json.QuantityMax = quantityMax;
                }
                let initialUsage = parseInt(json.InitialUsage);
                if (!isNaN(initialUsage)) {
                    initialUsage = Math.round(initialUsage * spawnersGlobalConfig_1.defaultInitialUsageMultiplier);
                    json.InitialUsage = initialUsage;
                }
                let randomUsage = parseInt(json.RandomUsage);
                if (!isNaN(randomUsage)) {
                    randomUsage = Math.round(randomUsage * spawnersGlobalConfig_1.defaultRandomUsageMultiplier);
                    // Protect against usage > 100
                    if (randomUsage + initialUsage > 100) {
                        randomUsage = 100 - initialUsage;
                    }
                    json.RandomUsage = randomUsage;
                }
                const keys = Object.keys(spawnersGlobalConfig_1.processConfig);
                const values = Object.values(spawnersGlobalConfig_1.processConfig);
                for (const key of keys) {
                    const m = spawnersGlobalConfig_1.filter[key];
                    if (!m) {
                        console.error('Missing filter for ' + key);
                        continue;
                    }
                    const k = key;
                    let index = file.indexOf(key);
                    if (index < 0) {
                        const additional = values[keys.indexOf(key)].additional;
                        if (additional) {
                            for (const a of additional) {
                                index = file.indexOf(a);
                                if (index >= 0)
                                    break;
                            }
                        }
                    }
                    if (index >= 0) {
                        const fixedItems = json.FixedItems;
                        const excludes = values[keys.indexOf(key)].excludes;
                        let isExclude = false;
                        for (const exclude of excludes)
                            if (file.includes(exclude)) {
                                isExclude = true;
                                break;
                            }
                        if (!isExclude) {
                            if ((0, class_validator_1.isArray)(fixedItems)) {
                                json.FixedItems = processFixedItems(k, file, fixedItems);
                            }
                            const nodes = json.Nodes;
                            if ((0, class_validator_1.isArray)(nodes)) {
                                json.Nodes = processNodes(k, file, nodes);
                            }
                            const items = json.Items;
                            if ((0, class_validator_1.isArray)(items)) {
                                json.Items = processItems(k, file, items);
                            }
                            const m = spawnersGlobalConfig_1.filter[key];
                            if (m.postSpawnActions) {
                                if (!json.PostSpawnActions)
                                    json.PostSpawnActions = [];
                                if (m.postSpawnActionsMode === 'overwrite')
                                    json.PostSpawnActions = [...m.postSpawnActions];
                                else
                                    json.PostSpawnActions.push(...m.postSpawnActions);
                            }
                            if (m.ProbabilityValue !== undefined) {
                                probability = json.Probability = m.ProbabilityValue;
                            }
                            if (m.InitialDamageValue !== undefined) {
                                initialDamage = json.InitialDamage = m.InitialDamageValue;
                            }
                            if (m.RandomDamageValue !== undefined) {
                                randomDamage = json.RandomDamage = m.RandomDamageValue;
                            }
                            if (m.InitialUsageValue !== undefined) {
                                initialUsage = json.InitialUsage = m.InitialUsageValue;
                            }
                            if (m.RandomUsageValue !== undefined) {
                                randomUsage = json.RandomUsage = m.RandomUsageValue;
                            }
                            if (m.QuantityMinValue !== undefined) {
                                quantityMin = json.QuantityMin = m.QuantityMinValue;
                            }
                            if (m.QuantityMaxValue !== undefined) {
                                quantityMax = json.QuantityMax = m.QuantityMaxValue;
                            }
                            if (!isNaN(probability) &&
                                m.ProbabilityMultiplier &&
                                !isNaN(m.ProbabilityMultiplier)) {
                                probability = Math.round(probability * m.ProbabilityMultiplier);
                                if (probability > 100)
                                    probability = 100;
                                json.Probability = probability;
                            }
                            if (!isNaN(initialDamage) &&
                                m.InitialDamageMultiplier &&
                                !isNaN(m.InitialDamageMultiplier)) {
                                initialDamage = json.InitialDamage = Math.round(initialDamage * m.InitialDamageMultiplier);
                            }
                            if (!isNaN(randomDamage) &&
                                m.RandomDamageMultiplier &&
                                !isNaN(m.RandomDamageMultiplier)) {
                                randomDamage = json.RandomDamage = Math.round(randomDamage * m.RandomDamageMultiplier);
                            }
                            // Protect against damage > 100
                            if (!isNaN(initialDamage) &&
                                !isNaN(randomDamage) &&
                                randomDamage + initialDamage >= 100) {
                                randomDamage = json.RandomDamage = 100 - initialDamage - 1;
                            }
                            if (!isNaN(initialUsage) &&
                                m.InitialUsageMultiplier &&
                                !isNaN(m.InitialUsageMultiplier)) {
                                initialUsage = json.InitialUsage = Math.round(initialUsage * m.InitialUsageMultiplier);
                            }
                            if (!isNaN(randomUsage) &&
                                m.RandomUsageMultiplier &&
                                !isNaN(m.RandomUsageMultiplier)) {
                                randomUsage = json.RandomUsage = Math.round(randomUsage * m.RandomUsageMultiplier);
                            }
                            // Protect against usage > 100
                            if (!isNaN(initialUsage) &&
                                !isNaN(randomUsage) &&
                                randomUsage + initialUsage > 100) {
                                randomUsage = json.RandomUsageMultiplier = 100 - initialUsage;
                            }
                            if (!isNaN(quantityMin) &&
                                m.QuantityMinMultiplier &&
                                !isNaN(m.QuantityMinMultiplier)) {
                                quantityMin = json.QuantityMin = Math.round(quantityMin * m.QuantityMinMultiplier);
                            }
                            if (!isNaN(quantityMax) &&
                                m.QuantityMaxMultiplier &&
                                !isNaN(m.QuantityMaxMultiplier)) {
                                quantityMax = json.QuantityMax = Math.round(quantityMax * m.QuantityMaxMultiplier);
                            }
                            // Protect against quantityMin > quantityMax
                            if (!isNaN(quantityMin) &&
                                !isNaN(quantityMax) &&
                                quantityMin > quantityMax) {
                                quantityMax = json.QuantityMax = quantityMin;
                            }
                            const allowDuplicates = json.AllowDuplicates;
                            if (allowDuplicates !== undefined &&
                                m.AllowDuplicates !== undefined) {
                                json.AllowDuplicates = m.AllowDuplicates;
                            }
                            console.log(file);
                        }
                    }
                }
            }
            const e = yield (0, fileUtils_2.ensureDirectory)(spawnersGlobalConfig_1.pathSpawnersOverride);
            if (e === false)
                throw new Error('Could not create target directory ' + spawnersGlobalConfig_1.pathSpawnersOverride);
            const destName = path_1.default.join(spawnersGlobalConfig_1.pathSpawnersOverride, file);
            yield promises_1.default.writeFile(destName, JSON.stringify(json, null, 2), 'utf-8');
            fileCount++;
            //console.log(destName, probability);
        }
    }
    catch (err) {
        console.log(err);
        console.log('Error processing file ' + fullName + ' - file#' + fileCount + 1);
    }
});
exports.updateSpawners = updateSpawners;
//# sourceMappingURL=spawners.js.map