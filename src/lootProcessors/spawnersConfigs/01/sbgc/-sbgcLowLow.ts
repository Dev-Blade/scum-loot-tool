import {SpawnerFilterType} from '../../../typesSpawner';

export const sbgc: SpawnerFilterType = {
  Car_Wreck_Scrap: {
    QuantityMinValue: 0,
    QuantityMaxValue: 1,
  },
  Truck_Wreck_Scrap: {
    QuantityMinValue: 1,
    QuantityMaxValue: 2,
  },

  'Examine_Scrap_Pile.json': {
    QuantityMinValue: 2,
    QuantityMaxValue: 3,
  },

  'Car_Wreck_Pile_Scrap.json': {
    QuantityMinValue: 2,
    QuantityMaxValue: 3,
  },

  Scrap_Pile_Metal_Pipe: {
    ProbabilityValue: 1,
  },

  _Brick_Pal: {
    QuantityMinValue: 1,
    QuantityMaxMultiplier: 0.5,
  },
  _Gravel_Pal: {
    QuantityMinValue: 1,
    QuantityMaxMultiplier: 0.5,
  },

  Tire_Pile: {
    QuantityMinValue: 1,
    QuantityMaxValue: 1,
  },
};
