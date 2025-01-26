# Loot Processors

**prerequisite:** put current default SCUM export files into respective Loot/\*/Default

## spawners

- **folder:** lootProcessors/SpawnersConfigs

- create a subfolder to put in rules files (recommended but not necessary)
- add a spawner configuration typescript code file (as example below)
- modify lootProcessors/SpawnersConfigs/config.ts (add all spawner configurations you want to process at one go)

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

## nodes

sorry, not much documentation yet

within your filter/rule use

- additionalMatches
- contexts
- overrideName
- override
- Rarity - one of "Abundant" | "Uncommon" | "Rare" | "VeryRare" | "ExtremelyRare"
- postAdd
- postSpawnActions
- postSpawnActionsMode (set it to "override" then all previouse postSpawnActions will be overwritten, otherwise your postSpawnActions[] will be added to existing ones)

The implementation also aviods generating duplicates

sideinfo: it also creates CSV files for each node file and puts them to data/out/nodeLists

## economy

sorry, no documentation yet
but it works ;) just analyze the code, see src/lootProcessors/nodes.ts

info: it's for having one template outpost (A0) and then copies it to all other traders
C2 will be modified (mulipliers are hardcoded, see economy.ts, selling \* 1.5 and purchasing \* 0.75, for PVP outpost with better conditions).
