import {SpawnerFilterType} from '../../../typesSpawner';

export const puppets: SpawnerFilterType = {
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
            Id: 'Weapon_M9_Silver',
          },
          {
            Rarity: 'VeryRare',
            Id: 'Magazine_M9',
          },
          {
            Rarity: 'VeryRare',
            Id: 'Cal_9mm',
          },
          {
            Rarity: 'ExtremelyRare',
            Id: 'WeaponFlashlight_M9',
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
            Id: 'Weapon_Judge44',
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
    excludedFilesMatches: ['Eye'],
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
    excludedFilesMatches: ['Eye'],
    Items: {
      Boots: {
        postAdd: [
          {
            Rarity: 'ExtremelyRare',
            Id: 'Tool_Box_Small',
          },
          {
            Rarity: 'VeryRare',
            Id: 'Metal_Scrap_01',
          },
          {
            Rarity: 'VeryRare',
            Id: 'Beer',
          },
          {
            Rarity: 'VeryRare',
            Id: 'Wine',
          },
          {
            Rarity: 'ExtremelyRare',
            Id: 'Birthday_Cap_01',
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
          {
            Rarity: 'ExtremelyRare',
            Id: 'Absinthe',
          },
          {
            Rarity: 'ExtremelyRare',
            Id: 'BowSilencer',
          },
          {
            Rarity: 'ExtremelyRare',
            Id: '1H_Brass_knuckles',
          },
          {
            Rarity: 'ExtremelyRare',
            Id: '1H_Improvised_metal_knife',
          },
        ],
      },
    },
  },
};
