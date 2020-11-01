import { IAttribute, IEntryAttributes, IComputedAttribute, Attributes } from '@/types/attribute.types';

export const defaultAttributes: Array<IAttribute> = [
    { name: "Força", short: "for", value: 0 },
    { name: "Destreza", short: "des", value: 0 },
    { name: "Constituição", short: "con", value: 0 },
    { name: "Inteligência", short: "int", value: 0 },
    { name: "Sabedoria", short: "sab", value: 0 },
    { name: "Carisma", short: "car", value: 0 },
];

export function useAttributes(entry: IEntryAttributes): Array<IComputedAttribute> {
    return defaultAttributes.map((atb, index) => {
        const value = entry.attributes[index];
        const race = entry.modifications.find((modAtb) => modAtb.affect === atb.short)?.value || 0;
        const total = value + race;

        return {
            ...atb,
            value,
            race,
            total,
            mod: Number((total / 2.005 - 5).toFixed(0)),
        }
    }, {})
}

export function useRemaining(attributes: Attributes): number {
    const defaultComputedValue = (atb: number) => {
        switch (atb) {
            case 8:
                return -2;
            case 9:
                return -1;
            case 11:
                return 1;
            case 12:
                return 2;
            case 13:
                return 3;
            case 14:
                return 4;
            case 15:
                return 6;
            case 16:
                return 8;
            case 17:
                return 11;
            case 18:
                return 14;
            default:
                return 0;
        }
    };
    const totalInvested = attributes
        .map((e) => defaultComputedValue(e))
        .reduce((e, acc) => acc += e, 0 as number);
    return 20 - totalInvested;
}
