"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.pathSpawnersOverride = exports.filter = exports.globalSkipFilePatterns = exports.processConfig = exports.packs = exports.defaultInitialDamageRandomMaxMultiplierIfZero = exports.defaultQuantityMaxMultiplier = exports.defaultQuantityMinMultiplier = exports.defaultRandomUsageMultiplier = exports.defaultInitialUsageMultiplier = exports.defaultRandomDamageMultiplier = exports.defaultInitialDamageMultiplier = exports.defaultProbabilityMultiplier = exports.defaultRandomMinDamage = exports.defaultInitialMinDamage = void 0;
const path_1 = __importDefault(require("path"));
const _lootPaths_1 = require("./_lootPaths");
exports.defaultInitialMinDamage = 0;
exports.defaultRandomMinDamage = 0;
exports.defaultProbabilityMultiplier = 2.5;
exports.defaultInitialDamageMultiplier = 1;
exports.defaultRandomDamageMultiplier = 1;
exports.defaultInitialUsageMultiplier = 1;
exports.defaultRandomUsageMultiplier = 1;
exports.defaultQuantityMinMultiplier = 1;
exports.defaultQuantityMaxMultiplier = 1;
exports.defaultInitialDamageRandomMaxMultiplierIfZero = 0;
exports.packs = {};
// ------------------- config
exports.processConfig = {
    HuntingStand: { excludes: [] },
    'Buildings-Livingroom-Examine_Drawers': { excludes: [] },
    'Buildings-Bedroom-Residential-Examine_Drawer': { excludes: [] },
    'Cave-Examine': { excludes: [] },
    'Puppets-Military-Examine': { excludes: ['Eye'] },
    'Puppets-Civilian-Examine': { excludes: ['Eye'] },
    'Character-Puppets-Military-Examine_Zombie_Eye': { excludes: [] },
    'Character-Puppets-Civilian-Examine_Zombie_Eye': { excludes: [] },
    'Character-Puppets-Hospital-Examine_Zombie_Eye': { excludes: [] },
    'Attic-Barn-Examine_Crate': { excludes: [] },
    Shipwrecks: { excludes: [] },
};
exports.globalSkipFilePatterns = [];
const livingRoomWeapns = {
    Rarity: 'Rare',
    Ids: [
        'ItemLootTreeNodes.LivingRoom.Other.Weapons',
        'ItemLootTreeNodes.LivingRoom.Other.Magazines',
    ],
};
exports.filter = {
    Shipwrecks: {
        ProbabilityMultiplier: 2,
        InitialDamageMultiplier: 0.3,
        RandomDamageMultiplier: 0.3,
    },
    'Attic-Barn-Examine_Crate': {
        Nodes: {
            Farm: {
                postAdd: [
                    {
                        Rarity: 'ExtermelyRare',
                        Ids: ['ItemLootTreeNodes.Barn.Other.Weapons.Shotguns'],
                    },
                ],
            },
        },
    },
    'Character-Puppets-Military-Examine_Zombie_Eye': {
        ProbabilityValue: 30,
        InitialDamageValue: 10,
        RandomDamageValue: 20,
        postSpawnActions: ['SetAmmoAmount_SmallStash'],
        Items: {
            Puppet_Eye: {
                postAdd: [
                    {
                        Rarity: 'VeryRare',
                        Id: 'Weapon_M9',
                    },
                    {
                        Rarity: 'VeryRare',
                        Id: 'Magazine_M9',
                    },
                    {
                        Rarity: 'VeryRare',
                        Id: 'Cal_9mm',
                    },
                ],
            },
        },
    },
    'Character-Puppets-Civilian-Examine_Zombie_Eye': {
        ProbabilityValue: 30,
        InitialDamageValue: 10,
        RandomDamageValue: 20,
        postSpawnActions: ['SetAmmoAmount_SmallStash'],
        Items: {
            Puppet_Eye: {
                postAdd: [
                    {
                        Rarity: 'VeryRare',
                        Id: 'Weapon_PeaceKeeper38',
                    },
                    {
                        Rarity: 'VeryRare',
                        Id: 'Weapon_Serpent357',
                    },
                    {
                        Rarity: 'VeryRare',
                        Id: 'Cal_357_Viper',
                    },
                    {
                        Rarity: 'VeryRare',
                        Id: 'Cal_38',
                    },
                ],
            },
        },
    },
    'Character-Puppets-Hospital-Examine_Zombie_Eye': {
        ProbabilityValue: 20,
        InitialDamageValue: 10,
        RandomDamageValue: 20,
        QuantityMaxValue: 2,
        Items: {
            Puppet_Eye: {
                postAdd: [
                    {
                        Rarity: 'VeryRare',
                        Id: 'Pressure_Dressing',
                    },
                    {
                        Rarity: 'VeryRare',
                        Id: 'Tourniquet',
                    },
                ],
            },
        },
    },
    'Puppets-Military-Examine': {
        Items: {
            Boots: {
                postAdd: [
                    {
                        Rarity: 'ExtremelyRare',
                        Id: 'CompoundBowSight_3_Pin',
                    },
                    {
                        Rarity: 'VeryRare',
                        Id: 'Cuban_Cigar',
                    },
                    {
                        Rarity: 'ExtremelyRare',
                        Id: 'WeaponSights_Sentry_RDRS',
                    },
                    {
                        Rarity: 'ExtremelyRare',
                        Id: 'WeaponSuppressor_Handgun',
                    },
                    {
                        Rarity: 'ExtremelyRare',
                        Id: 'WeaponSights_RedDot_CA401B',
                    },
                    {
                        Rarity: 'ExtremelyRare',
                        Id: 'M1911_Rail',
                    },
                    {
                        Rarity: 'ExtremelyRare',
                        Id: 'Magazine_M1911',
                    },
                    {
                        Rarity: 'ExtremelyRare',
                        Id: 'Magazine_Block21',
                    },
                    {
                        Rarity: 'ExtremelyRare',
                        Id: 'Magazine_M9',
                    },
                    {
                        Rarity: 'ExtremelyRare',
                        Id: 'M1911_Rail',
                    },
                ],
            },
        },
    },
    'Puppets-Civilian-Examine': {
        Items: {
            Boots: {
                postAdd: [
                    {
                        Rarity: 'ExtremelyRare',
                        Id: 'Tool_Box_Small',
                    },
                    {
                        Rarity: 'ExtremelyRare',
                        Id: 'Metal_Scrap_01',
                    },
                    {
                        Rarity: 'ExtremelyRare',
                        Id: 'Milk',
                    },
                    {
                        Rarity: 'ExtremelyRare',
                        Id: 'Whiskey',
                    },
                    {
                        Rarity: 'ExtremelyRare',
                        Id: 'Vodka',
                    },
                ],
            },
        },
    },
    'Cave-Examine': {
        AllowDuplicates: true,
        Nodes: {
            Cave: {
                postAdd: [
                    {
                        Rarity: 'Uncommon',
                        Ids: ['ItemLootTreeNodes.Money'],
                    },
                ],
            },
        },
    },
    HuntingStand: {
        QuantityMinMultiplier: 1,
        QuantityMaxMultiplier: 3,
        RandomDamageMultiplier: 0.5,
        Nodes: {
            HuntingTower: {
                override: 'ItemLootTreeNodes.HuntingTower',
                postAdd: [
                    {
                        Rarity: 'Uncommon',
                        Ids: [
                            'ItemLootTreeNodes.HuntingTower.Weapons',
                            'ItemLootTreeNodes.LivingRoom.Other.Weapons',
                            'ItemLootTreeNodes.LivingRoom.Other.Weapons.Magazines',
                        ],
                    },
                    {
                        Rarity: 'ExtremelyRare',
                        Ids: [
                            'ItemLootTreeNodes.Military.Gear.Attachments.Scopes.WeaponScope_HuntingScope',
                        ],
                    },
                    {
                        Rarity: 'ExtremelyRare',
                        Ids: [
                            'ItemLootTreeNodes.Military.Gear.Attachments.Scopes.WeaponScope_ACOG_01',
                        ],
                    },
                ],
            },
        },
    },
    'Buildings-Bedroom-Residential-Examine_Drawer': {
        Nodes: {
            Other: {
                postAdd: [livingRoomWeapns, livingRoomWeapns],
            },
        },
    },
    'Buildings-Livingroom-Examine_Drawers': {
        Nodes: {
            'Items.Misc': {
                postAdd: [livingRoomWeapns],
            },
        },
    },
};
exports.pathSpawnersOverride = path_1.default.join(_lootPaths_1.pathSpawnersRoot, 'Override', '-LootSector');
//# sourceMappingURL=spawnersLootSectorConfig.js.map