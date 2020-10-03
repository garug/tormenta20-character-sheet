import { Attributes, IAttributeModification, IComputedAttribute } from '@/types/attribute.types';
import { ComputedRef } from 'vue';
import { IBaseClasse, IComputedClasse } from '@/types/classes.types';
import { IImmunity, IPower } from '@/types/power.types';
import { IBaseOrigin, IComputedOrigin } from '@/types/origin.types';
import { IBaseRace, IComputedRace } from './race.types';

export interface IBaseCharacter {
    race?: IBaseRace,
    classes: Array<IBaseClasse>,
    origin?: IBaseOrigin,
    attributes: Attributes,
    immunities?: Array<IImmunity>,
    disableds?: Array<IDisabled>,
}

export interface IComputedCharacter {
    race: ComputedRef<IComputedRace | undefined>,
    classes: ComputedRef<Array<IComputedClasse>>,
    totalLevel: ComputedRef<number>,
    origin: ComputedRef<IComputedOrigin | undefined>,
    attributes: ComputedRef<Array<IComputedAttribute>>,
    remaining: ComputedRef<number>,
    immunities: ComputedRef<Array<IImmunity>>,
    // powers: Array<IPower>,
    disableds: ComputedRef<Array<IDisabled>>,
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
