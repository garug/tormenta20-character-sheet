import { Attributes, IAttributeModification, IComputedAttribute, IEntryAttribute } from '@/types/attribute.types';
import { ComputedRef } from 'vue';
import { IBaseClasse, IComputedClasse, IEntryClass, Levels } from '@/types/classes.types';
import { IImmunity, IPower } from '@/types/power.types';
import { IBaseOrigin, IComputedOrigin } from '@/types/origin.types';
import { IBaseRace, IComputedRace } from './race.types';
import { IPericia, PericiaName } from './pericia.types'

export interface IBaseCharacter {
    race?: IBaseRace,
    classes: Array<IBaseClasse>,
    mainClass?: IBaseClasse,
    origin?: IBaseOrigin,
    attributes: Attributes,
    immunities?: Array<IImmunity>,
    disableds?: Array<IDisabled>,
    pericias?: Array<PericiaName>,
    powers?: Array<IPower>,
}

export interface IComputedCharacter {
    race: ComputedRef<IComputedRace | undefined>,
    classes: ComputedRef<Array<IComputedClasse>>,
    mainClass: ComputedRef<IComputedClasse | undefined>,
    totalLevel: ComputedRef<number>,
    origin: ComputedRef<IComputedOrigin | undefined>,
    attributes: Array<IComputedAttribute>,
    remaining: ComputedRef<number>,
    immunities: ComputedRef<Array<IImmunity>>,
    powers: ComputedRef<Array<IPower>>,
    disableds: ComputedRef<Array<IDisabled>>,
    pericias: ComputedRef<Array<IPericia>>,
}

export interface ICharacterHook {
    computedCharacter: IComputedCharacter,
    baseCharacter: IBaseCharacter,

    applyImunidade: (origin: string, imunidade?: string) => void,
    setAttribute: (entry: IEntryAttribute) => void,
    setRace: (race?: IBaseRace) => void,
    setOrigin: (origin?: IBaseOrigin) => void,
    setMainClass: (clss?: IBaseClasse) => void,
    setLevelClss: (clss: IBaseClasse, level: Levels) => void,
    setPericias: (pericias: Array<PericiaName>) => void,
    setMovement: (movement: number) => void,
    addClass: (clss: IEntryClass) => void,
    removeClass: (className: string) => void,
    addPower: (power: IPower) => void,
    removePower: (powerName: string) => void,
    addDefense: (defense: IOtherDefense) => void,
    removeDefense: (defenseName: string) => void,
    addDisable: (disable: IDisabled) => void,
    removeDisable: (disableName: string) => void,

    isBlockDisabled: (blockName: string) => boolean,
}

export interface IOtherDefense {
    name: string,
    value: number,
    penalty?: number,
}

export interface IDisabled {
    name: string,
    affect: string,
}

export const defaultMovement = 10;
