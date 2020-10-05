import { ShortAttribute } from './attribute.types';

export interface IPericia {
    name: PericiaName,
    penalty: boolean,
    trained: boolean,
    property: ShortAttribute,
}

export interface IClassPericia {
    fixed: Array<PericiaName>,
    choosable: Array<PericiaName>,
    numberToChoose: number,
}

export type PericiaName = "acrobacia" |
    "adestramento" |
    "atletismo" |
    "atuação" |
    "cavalgar" |
    "conhecimento" |
    "cura" |
    "diplomacia" |
    "enganação" |
    "fortitude" |
    "furtividade" |
    "guerra" |
    "iniciativa" |
    "intimidação" |
    "intuição" |
    "investigação" |
    "jogatina" |
    "ladinagem" |
    "luta" |
    "misticismo" |
    "navegação" |
    "nobreza" |
    "oficio" |
    "oficio" |
    "percepção" |
    "pontaria" |
    "reflexos" |
    "religião" |
    "sobrevivência" |
    "vontade";