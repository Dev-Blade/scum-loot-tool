import {SpawnerFilterType} from '../../../typesSpawner';

export const sbgc: SpawnerFilterType = {
  Car_Wreck_Scrap: {
    QuantityMinValue: 3,
    QuantityMaxValue: 4,
  },
  Truck_Wreck_Scrap: {
    QuantityMinValue: 4,
    QuantityMaxValue: 5,
  },

  'Examine_Scrap_Pile.json': {
    QuantityMinValue: 5,
    QuantityMaxValue: 8,
  },

  'Car_Wreck_Pile_Scrap.json': {
    QuantityMinValue: 5,
    QuantityMaxValue: 8,
  },

  Scrap_Pile_Metal_Pipe: {
    ProbabilityValue: 4,
  },

  _Brick_Pal: {
    QuantityMaxMultiplier: 1.5,
  },
  _Gravel_Pal: {
    QuantityMaxMultiplier: 1.5,
  },
};
