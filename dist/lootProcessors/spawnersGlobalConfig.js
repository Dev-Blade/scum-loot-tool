"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.pathSpawnersOverride = exports.filter = exports.globalSkipFilePatterns = exports.processConfig = exports.packs = exports.defaultInitialDamageRandomMaxMultiplierIfZero = exports.defaultQuantityMaxMultiplier = exports.defaultQuantityMinMultiplier = exports.defaultRandomUsageMultiplier = exports.defaultInitialUsageMultiplier = exports.defaultRandomDamageMultiplier = exports.defaultInitialDamageMultiplier = exports.defaultProbabilityMultiplier = exports.defaultRandomMinDamage = exports.defaultInitialMinDamage = void 0;
const path_1 = __importDefault(require("path"));
const _lootPaths_1 = require("./_lootPaths");
exports.defaultInitialMinDamage = 10;
exports.defaultRandomMinDamage = 5;
exports.defaultProbabilityMultiplier = 0.8;
exports.defaultInitialDamageMultiplier = 1.2;
exports.defaultRandomDamageMultiplier = 1.5;
exports.defaultInitialUsageMultiplier = 1;
exports.defaultRandomUsageMultiplier = 1.5;
exports.defaultQuantityMinMultiplier = 0.67;
exports.defaultQuantityMaxMultiplier = 0.67;
exports.defaultInitialDamageRandomMaxMultiplierIfZero = 20;
exports.packs = {
    SF19: [
        'Weapon_SF19',
        'Magazine_SF19',
        'Magazine_SF19',
        'Magazine_SF19',
        'Cal_9mm_Ammobox',
        'Cal_9mm_Ammobox',
        'WeaponSuppressor_Handgun',
        'WeaponSights_Wasp',
    ],
    MP5Full: [
        'Weapon_MP5',
        'Magazine_MP5',
        'Magazine_MP5',
        'Magazine_MP5',
        'Cal_9mm_AP_Ammobox',
        'Cal_9mm_AP_Ammobox',
        'Cal_9mm_AP_Ammobox',
        'WeaponSuppressor_MP5',
        'MP5_Rail_Short',
        'WeaponSights_RedDot_CA401B',
    ],
    MP5: [
        'Weapon_MP5',
        'Magazine_MP5',
        'Magazine_MP5',
        'Cal_9mm_Ammobox',
        'Cal_9mm_Ammobox',
        'WeaponSuppressor_MP5',
        'MP5_Rail_Short',
        'WeaponSights_RedDot_CA401B',
    ],
    MP5Small: ['Weapon_MP5', 'Magazine_MP5', 'Cal_9mm_Ammobox', 'MP5_Rail_Short'],
    MP5K: [
        'Weapon_MP5_K',
        'Magazine_MP5',
        'Magazine_MP5',
        'Cal_9mm_Ammobox',
        'Cal_9mm_Ammobox',
        'MP5_Rail_Short',
        'WeaponSights_RedDot_CA401B',
        'WeaponSuppressor_MP5',
    ],
    MP5KSmall: [
        'Weapon_MP5',
        'Magazine_MP5',
        'Cal_9mm_Ammobox',
        'MP5_Rail_Short',
    ],
    UMP: [
        'Weapon_UMP45',
        'Magazine_UMP45',
        'Magazine_UMP45',
        'Cal_45_Ammobox',
        'Cal_45_Ammobox',
        'WeaponSuppressor_MP5',
        'WeaponFlashlight_M9',
        'WeaponSights_RedDot_CA401B',
    ],
    UMPSmall: ['Weapon_UMP45', 'Magazine_UMP45', 'Cal_45_Ammobox'],
    Deagle: [
        'Weapon_Deagle_357',
        'Magazine_DEagle_357',
        'Magazine_DEagle_357',
        'Cal_357_Ammobox',
        'Cal_357_Ammobox',
        'WeaponFlashlight_DesertEagle',
        'WeaponSights_Deagle_RedDot',
    ],
    M9: [
        'Weapon_M9',
        'Magazine_M9',
        'Magazine_M9',
        'Cal_9mm_Ammobox',
        'Cal_9mm_Ammobox',
        'WeaponFlashlight_M9',
        'WeaponSuppressor_Handgun',
    ],
};
// ------------------- config
exports.processConfig = {
    Cargo_Drops: { excludes: ['Pistol', 'Revolver', 'M1887'] },
    TV_Bunker: { excludes: ['Zombie', 'Puppet', 'World_Shelf_Fuses'] },
    Weapon: { additional: ['Armory'], excludes: [] },
    Car_Wreck: { excludes: [] },
    Sentry: { excludes: [] },
    Hunting_Store: { excludes: [] },
    Zombie_C4: { excludes: [] },
    Killbox: { excludes: ['MP5', 'UMP', 'Pink', 'Ninja'] },
    'Killbox-Examine_A': { excludes: [] },
    'Killbox-Examine_E': { excludes: [] },
    'Killbox-Examine_G': { excludes: [] },
    'Killbox-Examine_M': { excludes: [] },
    'Vault-Examine_A': { excludes: ['Pistols', 'MP5'] },
    'Vault-Examine_E': { excludes: ['Pistols', 'MP5'] },
    'Vault-Examine_G': { excludes: ['Pistols', 'MP5'] },
    'Vault-Examine_M': { excludes: ['Pistols', 'MP5'] },
    'Vault-Examine_R': { excludes: ['Pistols', 'MP5'] },
    'Vault-Examine_S': { excludes: ['Pistols', 'MP5'] },
    'Vault-Examine_V': { excludes: ['Pistols', 'MP5'] },
};
exports.globalSkipFilePatterns = ['Nuclear'];
//
exports.filter = {
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
    'Vault-Examine_A': {
        FixedItems: {
            '*': exports.packs.MP5KSmall,
        },
    },
    'Vault-Examine_E': {
        FixedItems: {
            '*': exports.packs.SF19,
        },
    },
    'Vault-Examine_G': {
        FixedItems: {
            '*': exports.packs.M9,
        },
    },
    'Vault-Examine_M': {
        FixedItems: {
            '*': exports.packs.Deagle,
        },
    },
    'Vault-Examine_R': {
        FixedItems: {
            '*': exports.packs.Deagle,
        },
    },
    'Vault-Examine_S': {
        FixedItems: {
            '*': exports.packs.MP5Full,
        },
    },
    'Vault-Examine_V': {
        FixedItems: {
            '*': exports.packs.SF19,
        },
    },
    Killbox: {
        FixedItems: {
            '*': exports.packs.MP5KSmall,
        },
        // Items: {
        //   C4_Pack: { override: { Id: 'Grinding_Stone_01', Rarity: 'Uncommon' } },
        //   C4_CircuitBoard: {
        //     override: { Id: '2H_Tang_Dao_Damascus', Rarity: 'Uncommon' },
        //   },
        // },
    },
    'Killbox-Examine_A': {
        FixedItems: {
            '*': exports.packs.MP5,
        },
    },
    'Killbox-Examine_E': {
        FixedItems: {
            '*': exports.packs.MP5K,
        },
    },
    'Killbox-Examine_G': {
        FixedItems: {
            '*': exports.packs.M9,
        },
    },
    'Killbox-Examine_M': {
        FixedItems: {
            '*': exports.packs.Deagle,
        },
    },
    TV_Bunker: {
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
    Sentry: {
        FixedItems: {
            '*': ['Emergency_bandage'],
        },
    },
    Car_Wreck: {
        QuantityMaxMultiplier: 0.1,
    },
};
exports.pathSpawnersOverride = path_1.default.join(_lootPaths_1.pathSpawnersRoot, 'Override', '-Global');
//# sourceMappingURL=spawnersGlobalConfig.js.map