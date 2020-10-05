import { IClassPericia } from './pericia.types';
import { IPower } from './power.types';

export type Levels = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14 | 15 | 16 | 17 | 18 | 19 | 20;

export interface IBaseClasse {
    name: string,
    level?: Levels,
    powers?: Array<IPower>,
}

export interface IComputedClasse extends IBaseClasse {
    cod: string,
    level: Levels,
    powers?: Array<IPower>,
    pericias: IClassPericia,
}

export interface IEntryClass {
    name: string,
    level: Levels,
}