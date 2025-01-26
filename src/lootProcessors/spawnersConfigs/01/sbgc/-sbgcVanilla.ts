import {SpawnerFilterType} from '../../../typesSpawner';

export const sbgc: SpawnerFilterType = {
  Car_Wreck_Scrap: {
    QuantityMinValue: 2,
    QuantityMaxValue: 2,
  },
  Truck_Wreck_Scrap: {
    QuantityMinValue: 2,
    QuantityMaxValue: 3,
  },

  'Examine_Scrap_Pile.json': {
    QuantityMinValue: 3,
    QuantityMaxValue: 6,
  },

  'Car_Wreck_Pile_Scrap.json': {
    QuantityMinValue: 3,
    QuantityMaxValue: 6,
  },

  Scrap_Pile_Metal_Pipe: {
    ProbabilityValue: 2,
  },
};
