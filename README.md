# Loot Processors

**Description:**

This tool generates modified spawner and node files from the default ones.
The modifications are represented by rules you define.
That way you can easily keep changes to the loot tables of SCUM even when they change (you simply re-run the processor with the updated original files).

**prerequisite:** put current default SCUM export files into respective Loot/\*/Default

## spawners

```
npm run s
```

implementation see src/lootProcessors/spawners.ts

- **folder:** src/lootProcessors/SpawnersConfigs

- create a subfolder to put in rules files (recommended but not necessary)
- add a spawner configuration typescript code file (as example below)
- modify src/lootProcessors/SpawnersConfigs/config.ts (add all spawner configurations you want to process at one go)

example spawner configuration

```typescript
export const spawnersConfig: SpawnersConfigType = {
  pathSpawnersOverride: path.join(pathSpawnersOverride, '-boosted'), // <<- set output folder name
  skipFilePatterns: [], // <-- if you want to skip some files (add file name parts)
  exportOnlyAffectedFiles: false, // <-- if you want to export only affected files

  defaults: {
    defaultInitialMinDamage: 0,
    defaultRandomMinDamage: 0,
    defaultProbabilityMultiplier: 1.3,
    defaultInitialDamageMultiplier: 1,
    defaultRandomDamageMultiplier: 1,
    defaultInitialUsageMultiplier: 1,
    defaultRandomUsageMultiplier: 1,
    defaultQuantityMinMultiplier: 1,
    defaultQuantityMaxMultiplier: 1,
    defaultInitialDamageRandomMaxMultiplierIfZero: 0,
  },

  filter: {
    ...commonFilters, // <-- reusable filter
    ...goodiesFilters,

    // you may add local filters for this spawnersConfig
  },
};
```

a filter/rule example (makes no sense, only shows what you can do):

```typescript
{
  Zombie_C4: {  // <-- part of spawner file name, can be * if this filter is for all files
    ProbabilityValue: 70,
    // ProbabilityMultiplier: 1.3,

    InitialDamageValue: 0,
    // InitialDamageMultiplier: 1,

    RandomDamageValue: 0,
    // RandomDamageMultiplier: 1,

    InitialUsageValue: 0,
    // InitialUsageMultiplier: 1,

    Items: {
      C4: { // <-- key=partial match of item name
        postAdd: [{Id: '1H_Dildo', Rarity: 'Uncommon'}],
      },
    },
    Nodes: {
      Puppet_Eye: { // <-- key=partial match of node path
        override: {
          Rarity: 'Abundant',
          Id: 'Cash',
        },
        postAdd: [
          {
            Rarity: 'Rare',
            Id: 'Puppet_Eye',
          },
          {
            Rarity: 'Rare',
            Id: 'Cigarettes',
          },
        ],
      }
    },
  },

  'Special_Packages-Vault-Examine_M82A1_Vault_Pack': {
    FixedItems: {
      // '*' for whole replacement, or use partial match string to work on single items to replace
      '*': ['Weapon_M82A1', 'WeaponScope_M82A1', 'WeaponGhillie_Woodland'],
replace
    },
  },
}
```

use either \*_Value_ or \*_Multiplier_ to select between absolute value or a multiplier of the default value from the respective file

- **Items:** is a list with item matches to try
- **Nodes:** is a list with node matches to try
- **FixedItems:** is a list with fixed items matches to try

### match parameters for Items[]:

- **postAdd:** [] of items that will be added to the default list
- **override:** override that item (item structure)
- **Rarity:** set rarity of the item, one of "Abundant" | "Uncommon" | "Rare" | "VeryRare" | "ExtremelyRare"

### match parameters for Nodes[]:

- **postAdd:** [] of items that will be added to the default list
- **listAdd:** [] list of items that will be added to the default list
- **override:** override that item (full node path)
- **replace:** for Nodes[] only, a full node path to replace the matching node(s)
- **remove:** true for removing that node ref

### match parameters for FixedItems[]:

- **\*:** for whole replacement, set array of item names then...
  or use partial match string to work on single items to replace, set item name as value

**Hint:** There are also spawner packs and the function randomFixedItemsPack() to select a random pack or generally functions to generate thing while processing, see _JackpotConfig.ts_ and _ammoBoxes.ts_ how it uses collections that you can tweak with your desired rarity.

## nodes

```
npm run n
```

sorry, not much documentation yet
implementation see src/lootProcessors/nodes.ts

within your filter/rule use

- additionalMatches - [] of matching strings, define where this rule should be applied additionally
- contexts - partial match string to restrictively apply only on nodes with that (parent) contexts, this is a powerful feature
- overrideName - replace the node name
- override - { Name, Rarity ... } - completely replaces the node
- Rarity - one of "Abundant" | "Uncommon" | "Rare" | "VeryRare" | "ExtremelyRare"
- postAdd - [{ Name, Rarity ... }] - adds nodes to the list where the match happened
- postSpawnActions - adds actions to the node where the match happened
- postSpawnActionsMode (set it to "override" then all previouse postSpawnActions will be overwritten, otherwise your postSpawnActions[] will be added to existing ones)

The implementation also aviods generating duplicates

sideinfo: it also creates CSV files for each **original** node file and puts them to data/out/nodeLists. I planned to detach this functionality to a separate processor, but it's not done yet.

## economy

```
npm run e
```

sorry, no documentation yet
implementation see src/lootProcessors/economy.ts

info: it's for having one template outpost (A0) and then copies it to all other traders
C2 will be modified (mulipliers are hardcoded, see economy.ts, selling \* 1.5 and purchasing \* 0.75, for PVP outpost with better conditions).

also generates a HTML file you can upload to a webserver to have a nice overview of all traders

## calc

this little tool calculates actual probabilities for spawning items (nodes) in the game

usage:

```
npm run calc <wanted node name> <path to spawner folder> <path to node folder>
```

note:

- path to spawners folder is relative to data/Loot/Spawners/Presets
- path to nodes folder is relative to data/Loot/Nodes

if omitted, Default and Default are used for folder paths.

examples:

```
npm run calc Screwdriver # will use Default for both folders
npm run calc Screwdriver Test Test
```

you can also use it on nodes in the middle of node trees like "Drinks" (in node files collecting milk, alcohol etc.) or "hand" for "tools.hand" - must be any node name (or "Id" from item list) - it doesn't process "FixedItems"
