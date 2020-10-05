import { IComputedClasse } from '@/types/classes.types';

const defaultClasses: Array<IComputedClasse> = [
    {
        name: "Arcanista",
        cod: "arcanist",
        level: 1,
        pericias: {
            numberToChoose: 1,
            choosable: ["conhecimento", "iniciativa", "oficio", "percepção"],
            fixed: ["misticismo", "vontade"],
        },
    },
    {
        name: "Classe 2",
        cod: "test",
        level: 1,
        pericias: {
            numberToChoose: 2,
            choosable: ["jogatina", "nobreza", "luta", "fortitude"],
            fixed: ["iniciativa", "oficio"],
        },
    },
];

export default defaultClasses;
