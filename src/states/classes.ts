import { IComputedClasse, Levels } from '@/types/classes.types';
import arcanist from '@/states/classes/arcanist/arcanista';

export const AllLevels: Array<Levels> = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20];

const defaultClasses: Array<IComputedClasse> = [
  arcanist,
];

export default defaultClasses;
