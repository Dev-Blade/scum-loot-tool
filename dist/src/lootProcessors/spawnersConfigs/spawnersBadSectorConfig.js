"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.spawnersConfig = void 0;
const path_1 = __importDefault(require("path"));
const _lootPaths_1 = require("../_lootPaths");
const spawnersPacks_1 = require("../spawnersPacks");
exports.spawnersConfig = {
    pathSpawnersOverride: path_1.default.join(_lootPaths_1.pathSpawnersOverride, '-Global'),
    skipFilePatterns: ['Nuclear'],
    defaults: {
        defaultInitialMinDamage: 10,
        defaultRandomMinDamage: 5,
        defaultProbabilityMultiplier: 0.8,
        defaultInitialDamageMultiplier: 1.2,
        defaultRandomDamageMultiplier: 1.5,
        defaultInitialUsageMultiplier: 1,
        defaultRandomUsageMultiplier: 1.5,
        defaultQuantityMinMultiplier: 0.67,
        defaultQuantityMaxMultiplier: 0.67,
        defaultInitialDamageRandomMaxMultiplierIfZero: 20,
    },
    filter: {
        Zombie_C4: {
            Items: {
                C4: {
                    postAdd: { Id: '1H_Dildo', Rarity: 'Uncommon' },
                },
            },
        },
        Hunting_Store: {
            Nodes: {
                Firearms: {
                    override: 'ItemLootTreeNodes.Masonry.Other.Flares',
                },
                'Modern.Regular': {
                    override: 'ItemLootTreeNodes.Masonry.WorkClothes',
                },
                'Old.Regular': {
                    override: 'ItemLootTreeNodes.ChineseStore.Clothes',
                },
            },
        },
        Cargo_Drops: {
            excludedFilesMatches: ['Pistol', 'Revolver', 'M1887'],
            FixedItems: {
                Screwdriver: 'Screwdriver_Small',
                Lockpick: 'Bobby_Pin_Pacage',
                Lock_Item_Advanced: 'Bobby_Pin_Pacage',
                DialLock: 'Lock_Item_Basic',
                Cal_: 'Paper',
                Weapon_: 'Long_wooden_stick',
                C4: '1H_Brass_knuckles',
                AKS_74U: '1H_Brass_knuckles',
                AS_Val: '1H_Brass_knuckles',
                Magazine: '',
                Rail: '',
                Scope: '',
                Weapon: '',
                Bayonet: '',
                Suppressor: 'Puppet_Eye',
                Helmet: 'Riot_Helmet_02',
                Compound_Bow: 'Recurve_Bow',
                Carbon_BroadHead_Arrow: 'Feather',
                BowS: 'Puppet_Eye',
                Bow_: '',
                Crossbow: '',
                Quiver: 'School_Backpack_Girl_04',
                Night_Vision: 'Puppet_Eye',
                Handgun_Holster: '',
                Ghillie: '',
                Backpack: 'School_Backpack_Girl_04',
                Hiking_Boots: 'Beijing_Shoes_03',
                Electrician: '',
                Rebar: 'Cannabis_Seed_Bag',
                Drill: 'Cannabis_Seed_Bag',
                Respirator: '',
                Glove: '',
                Package_Box: '',
                Axe: '',
                Tool_Box: '',
                Armor: 'Stabproof_Vest_01_03',
                Car_: '',
                Alternator: 'Pine_Cone',
                Katana: '1H_Medieval_Sword',
                KeyCard: 'Paper',
                Kicmovaca: 'Watering_Can',
                Vodka: 'Watering_Can',
                Painkillers: 'Aloe_Vera',
                Antibiotics: 'Aloe_Vera',
                Dressing: 'Aloe_Vera',
                Tourniquet: 'Emergency_bandage',
                PETBottle01: 'Olives',
                Milk: 'Grapes_Raw',
                Buckshot: '12_Gauge_Birdshot_Ammobox',
                MRE: 'Potato',
                Can0: 'Pine_Cone',
            },
        },
        'Vault-Examine': {
            excludedFilesMatches: ['Pistols', 'MP5'],
            FixedItems: {
                '*': spawnersPacks_1.randomFixedItemsPack,
            },
        },
        'Killbox-Examine': {
            excludedFilesMatches: ['MP5', 'Pink', 'UMP', 'MP5'],
            FixedItems: {
                '*': spawnersPacks_1.randomFixedItemsPack,
            },
        },
        TV_Bunker: {
            excludedFilesMatches: ['Zombie', 'Puppet'],
            ProbabilityMultiplier: 1,
            RandomDamageMultiplier: 2,
            Items: {
                BCU: {
                    override: { Id: 'Paper' },
                },
                IntEA: {
                    override: { Id: 'Paper' },
                },
                Grenade: {
                    override: { Id: 'Paper' },
                },
                Cal: {
                    override: { Id: 'Paper' },
                },
                Cleaning: {
                    override: { Id: 'Paper' },
                },
                Screwdriver: {
                    override: { Id: 'Paper' },
                },
                Antibiotics: {
                    override: { Id: 'Paper' },
                },
                PainKillers: {
                    override: { Id: 'PainKillers_01' },
                },
                Phoenix: {
                    override: { Id: 'Paper' },
                },
            },
            Nodes: {
                LMGs: {
                    override: 'ItemLootTreeNodes.Military.Weapons.Handguns',
                },
                AssaultRifles: {
                    override: 'ItemLootTreeNodes.Observatory.Ammo.Regular.SmallStash',
                },
                SMGs: {
                    override: 'ItemLootTreeNodes.Observatory.Items',
                },
                Rifles: {
                    override: 'ItemLootTreeNodes.Observatory.Items.Misc',
                },
                Explosive: {
                    override: 'ItemLootTreeNodes.Observatory.Ammo.Regular.SmallStash',
                },
                Scope: {
                    override: 'ItemLootTreeNodes.Observatory.Items',
                },
                Ammo: {
                    override: 'ItemLootTreeNodes.Military.Ammo.Tracers',
                },
                Magazines: {
                    override: 'ItemLootTreeNodes.Observatory.Items',
                },
                Bayonets: {
                    override: 'ItemLootTreeNodes.Observatory.Items',
                },
                Optic: {
                    override: 'ItemLootTreeNodes.Observatory.Items',
                },
                Armor: {
                    override: 'ItemLootTreeNodes.Military.Gear.Armor.Vests.Stabproof',
                },
                Attachment: {
                    override: 'ItemLootTreeNodes.Observatory.Items',
                },
                Compass: {
                    override: 'ItemLootTreeNodes.Observatory.Items.Misc',
                },
                Cleaning: {
                    override: 'ItemLootTreeNodes.Observatory.Ammo.Regular.SmallStash',
                },
                Geiger: {
                    override: 'ItemLootTreeNodes.Observatory.Items.Misc',
                },
            },
        },
        Weapon: {
            additionalFilesMatches: ['Armory'],
            QuantityMaxMultiplier: 0.5,
            ProbabilityMultiplier: 0.5,
            Nodes: {
                LMGs: {
                    override: 'ItemLootTreeNodes.Military.Weapons.Handguns',
                },
                SMGs: {
                    override: 'ItemLootTreeNodes.Military.Weapons.Handguns',
                },
                Rifles: {
                    override: 'ItemLootTreeNodes.Military.Weapons.Handguns',
                },
                AssaultRifles: {
                    override: 'ItemLootTreeNodes.Military.Weapons.Handguns',
                },
                'Weapons.Handguns': {},
            },
        },
        Sentry2: {
            FixedItems: {
                '*': ['C4_Keypad', 'C4_CircuitBoard'],
            },
        },
        SentryMKIV: {
            FixedItems: {
                '*': ['C4_CircuitBoard'],
            },
        },
        Car_Wreck: {
            QuantityMaxMultiplier: 0.1,
        },
    },
};
//# sourceMappingURL=spawnersBadSectorConfig.js.map