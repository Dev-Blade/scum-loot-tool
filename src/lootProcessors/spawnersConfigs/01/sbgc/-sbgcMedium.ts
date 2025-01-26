import {SpawnerFilterType} from '../../../typesSpawner';

export const sbgc: SpawnerFilterType = {
  Car_Wreck_Scrap: {
    QuantityMinValue: 2,
    QuantityMaxValue: 3,
  },
  Truck_Wreck_Scrap: {
    QuantityMinValue: 3,
    QuantityMaxValue: 4,
  },

  'Examine_Scrap_Pile.json': {
    QuantityMinValue: 4,
    QuantityMaxValue: 7,
  },

  'Car_Wreck_Pile_Scrap.json': {
    QuantityMinValue: 4,
    QuantityMaxValue: 7,
  },

  Scrap_Pile_Metal_Pipe: {
    ProbabilityValue: 3,
  },

  _Brick_Pal: {
    QuantityMaxMultiplier: 1.34,
  },
  _Gravel_Pal: {
    QuantityMaxMultiplier: 1.34,
  },
};
