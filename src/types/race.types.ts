
import { IAttributeModification } from './attribute.types';
import { IPower } from './power.types';

export interface IBaseRace {
    name: string,
    attributes?: Array<IAttributeModification>,
}

export interface IComputedRace extends IBaseRace {
    attributes: Array<IAttributeModification>,
    powers?: Array<IPower>,
}
