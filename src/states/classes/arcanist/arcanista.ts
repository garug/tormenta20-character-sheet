import { IComputedClasse } from '@/types/classes.types';
import component from './Arcanist.vue'
import { IPower } from '@/types/power.types';

const computedArcanist: IComputedClasse = {
    name: "Arcanista",
    cod: "arcanist",
    level: 1,
    pericias: {
        numberToChoose: 1,
        choosable: ["conhecimento", "iniciativa", "oficio", "percepção"],
        fixed: ["misticismo", "vontade"],
    },
    component,
}

export const caminhosArcanista: Array<IPower> = [
    {
        name: "Bruxo",
        description: "Você lança magias através de um foco — uma varinha, cajado, chapéu... Para lançar uma magia, você precisa segurar o foco com uma mão (e gesticular com a outra) ou fazer um teste de Misticismo (CD 20 + o custo em PM da magia; se falhar, a magia não funciona, mas você gasta os PM mesmo assim). O foco tem resistência a dano 10 e PV iguais à metade dos seus, independentemente de seu material ou forma. Se for danificado, é totalmente restaurado na próxima vez que você recuperar seus PM. Se for destruído (reduzido a 0 PV), você fica atordoado por uma rodada. Você pode recuperar um foco destruído ou perdido com uma semana de trabalho e T$ 100. Seu atributo-chave para magias é Inteligência.",
    },
    {
        name: "Feiticeiro",
        description: "Você lança magias através de um poder inato que corre em seu sangue. Escolha uma linhagem como origem de seus poderes (veja a página 39). Você recebe a herança básica da linhagem escolhida. Você não depende de nenhum item ou estudo, mas sua capacidade de aprender magias é limitada — você aprende uma magia nova a cada nível ímpar (3º, 5º, 7º etc.), em vez de a cada nível. Seu atributo-chave para magias é Carisma."
    },
    {
        name: "Mago",
        description: "Você lança magias através de estudo e memorização de fórmulas arcanas. Você só pode lançar magias memorizadas; suas outras magias não podem ser lançadas, mesmo que você tenha pontos de mana para tal. Para memorizar magias, você precisa estudar seu grimório por uma hora. Quando faz isso, escolhe metade das magias que conhece (por exemplo, se conhece 7 magias, escolhe 3). Essas serão suas magias memorizadas. Você pode memorizar magias uma vez por dia. Caso não possa estudar (por não ter tempo, por ter perdido o grimório...), não poderá trocar suas magias memorizadas. Um grimório tem as mesmas estatísticas de um foco (veja acima) e pode ser recuperado da mesma forma. Você começa com uma magia adicional (para um total de 4) e, sempre que ganha acesso a um novo círculo de magias, aprende uma magia adicional daquele círculo. Seu atributo-chave para magias é Inteligência."
    },
]

export default computedArcanist;
