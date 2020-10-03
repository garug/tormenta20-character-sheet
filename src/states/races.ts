import { IComputedRace } from '@/types/race.types';
import golem from './races/golem';

const items: Array<IComputedRace> = [
    golem,
    {
        name: "humano", attributes: [
            { value: 4, affect: "for" },
            { value: 2, affect: "con" },
            { value: -2, affect: "car" },
        ],
    },
    {
        name: "Anão", attributes: [
            { value: 8, affect: "for" },
            { value: 0, affect: "con" },
            { value: -10, affect: "car" },
        ]
    },
    {
        name: "Dahllan", attributes: [
            { value: 4, affect: "for" },
            { value: 2, affect: "con" },
            { value: -2, affect: "car" },
        ]
    },
    {
        name: "Elfo", attributes: [
            { value: 4, affect: "for" },
            { value: 2, affect: "con" },
            { value: -2, affect: "car" },
        ]
    },
];

export default items;
