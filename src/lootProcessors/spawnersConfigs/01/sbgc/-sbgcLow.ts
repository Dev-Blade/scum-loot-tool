import {SpawnerFilterType} from '../../../typesSpawner';

export const sbgc: SpawnerFilterType = {
  Car_Wreck_Scrap: {
    QuantityMinValue: 0,
    QuantityMaxValue: 2,
  },
  Truck_Wreck_Scrap: {
    QuantityMinValue: 2,
    QuantityMaxValue: 3,
  },

  'Examine_Scrap_Pile.json': {
    QuantityMinValue: 3,
    QuantityMaxValue: 5,
  },

  'Car_Wreck_Pile_Scrap.json': {
    QuantityMinValue: 3,
    QuantityMaxValue: 5,
  },

  Scrap_Pile_Metal_Pipe: {
    ProbabilityValue: 1,
  },

  _Brick_Pal: {
    QuantityMaxMultiplier: 0.7,
  },
  _Gravel_Pal: {
    QuantityMaxMultiplier: 0.7,
  },

  Tire_Pile: {
    QuantityMinValue: 1,
    QuantityMaxValue: 2,
  },
};
