import { ICharacterHook } from '@/character.hook';

export interface IImmunity {
    origin: string,
    value?: string,
}

export interface IPower {
    name: string,
    description: string,
    component?: string,
    origin?: string,
    rule?: (character: ICharacterHook) => void,
    undo?: (character: ICharacterHook) => void,
}
