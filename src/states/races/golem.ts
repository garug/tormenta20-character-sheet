
import { defaultMovement } from '@/types/character.types';
import { IComputedRace } from '@/types/race.types';

const golem: IComputedRace = {
    name: "Golem",
    attributes: [
        { value: 4, affect: "for" },
        { value: 2, affect: "con" },
        { value: -2, affect: "car" },
    ],
    powers: [
        {
            name: 'Canalizar Reparos',
            description: 'Como uma ação completa, você pode gastar pontos de mana para recuperar pontos de vida, à taxa de 5 PV por PM.'
        },
        {
            name: 'Chassi',
            description: 'Seu corpo artificial é resistente, mas rígido. Você recebe +2 na Defesa, mas possui penalidade de armadura –2 e seu deslocamento é 6m. Você leva um dia para vestir ou remover uma armadura (pois precisa acoplar as peças dela a seu chassi)',
            rule: (character) => {
                character.addDefense({ name: 'Chassi', value: 2, penalty: 2 });
                character.setMovement(6);
            },
            undo: (character) => {
                character.removeDefense('Chassi');
                character.setMovement(defaultMovement);
            }
        },
        {
            name: 'Espírito Elemental',
            description: 'Escolha entre água(frio), ar(eletricidade), fogo(fogo) e terra(ácido).Você é imune a dano causado por essa energia.Se fosse sofrer dano mágico dessa energia, em vez disso cura PV em quantidade igual à metade do dano.Por exemplo, se um golem com espírito elemental do fogo é atingido por uma Bola de Fogo que causa 30 pontos de dano, em vez de sofrer esse dano, ele recupera 15 PV',
            component: 'Imunidade',
            undo: (character) => character.applyImunidade('Espírito Elemental')

        },
        {
            name: 'Sem Origem',
            description: 'Como uma criatura artificial, você já foi construído “pronto”. Não teve uma infância — portanto, não tem direito a escolher uma origem e receber benefícios por ela',
            rule: (character) => {
                character.setOrigin({ custom: true, name: 'Sem Origem', powers: [] });
                character.addDisable({ name: 'race-origin-golem', affect: 'origin' });
            },
            undo: (character) => {
                character.removeDisable('race-origin-golem');
                character.setOrigin(undefined);
            }
        }
    ]
}

export default golem;