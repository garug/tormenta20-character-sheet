import { computed, watch, reactive, ref, ComputedRef, watchEffect } from "vue";

import { IBaseCharacter, IComputedCharacter, IDisabled, IOtherDefense } from './types/character.types';
import { IEntryAttribute } from './types/attribute.types';
import { IBaseClasse, IComputedClasse, IEntryClass, Levels } from './types/classes.types';
import { IPower } from './types/power.types';
import { useAttributes, useRemaining } from './states/attributes';
import { IBaseRace, IComputedRace } from './types/race.types';
import { IBaseOrigin, IComputedOrigin } from './types/origin.types';

import races from './states/races';
import classes from './states/classes';
import pericias from './states/pericias';
import { IPericia, PericiaName } from './types/pericia.types';

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

export function generateDefaultCharacter(): IBaseCharacter {
    return {
        race: undefined,
        classes: [],
        attributes: [10, 10, 10, 10, 10, 10],
    }
}

export function useCharacter(character?: IBaseCharacter): ICharacterHook {
    // Cria Character Base
    const baseCharacter: IBaseCharacter = reactive(character || generateDefaultCharacter());

    // Controle de Atributos
    const computedAttributes = computed(() => useAttributes({
        attributes: baseCharacter.attributes,
        modifications: computedRace.value?.attributes || []
    }));
    const computedRemaining = computed(() => useRemaining(computedAttributes.value));

    function setAttribute(entry: IEntryAttribute): void {
        const { attribute, value } = entry;
        const fn = attribute.value < value ? setAttributeHigher : setAttributeLower;
        fn(entry);
    }

    function setAttributeHigher({ attribute, value }: IEntryAttribute) {
        const position = computedAttributes.value.findIndex(e => e.name === attribute.name);
        const oldValue = baseCharacter.attributes[position];
        if (attribute.value < 18 && computedRemaining.value > 0) {
            baseCharacter.attributes[position] = value;
        }
        // Check if value still positive after increment
        if (computedRemaining.value < 0) {
            baseCharacter.attributes[position] = oldValue;
        }
    }

    function setAttributeLower({ attribute, value }: IEntryAttribute) {
        const position = computedAttributes.value.findIndex(e => e.name === attribute.name);
        if (attribute.value > 8) {
            baseCharacter.attributes[position] = value;
        }
    }

    // Controle de Raça
    const computedRace = computed(() => races.find(r => r.name === baseCharacter.race?.name));

    watch(computedRace, (race, prevRace) => {
        prevRace ? undoPowersRace(prevRace) : undefined;
        race ? applyPowersRace(race) : undefined;
    });

    const applyPowersRace = (race: IComputedRace) => race.powers?.forEach(power => power.rule && power.rule(hook));
    const undoPowersRace = (race: IComputedRace) => race.powers?.forEach(power => power.undo && power.undo(hook));

    function setRace(race?: IBaseRace) {
        baseCharacter.race = race;
    }

    // Controle de Origem
    const computedOrigin = computed(() => {
        const origin: IComputedOrigin = {
            custom: false,
            name: "",
            description: "",
            ...baseCharacter.origin,
        }

        return origin;
    });

    function setOrigin(origin?: IBaseOrigin) {
        console.log(origin)
        baseCharacter.origin = origin;
    }

    // Controle de Classes
    const computedClasses = computed(() => {
        return baseCharacter.classes.reduce((acc, baseClass) => {
            const defaultClass = classes.find(cl => cl.name === baseClass.name);
            if (defaultClass) {
                acc.push({
                    ...defaultClass,
                    ...baseClass,
                })
            } else {
                console.warn(`Invalid Class: ${baseClass.name}`);
            }
            return acc;
        }, [] as Array<IComputedClasse>);
    });

    const computedMainClass = computed(() => computedClasses.value.find(c => c.name === baseCharacter.mainClass?.name));
    const computedTotalLevel = computed(() => computedClasses.value.reduce((acc, e) => acc + e.level, 0));

    watch(computedMainClass, (value) => {
        if (value) {
            value.pericias.fixed.forEach(p => addPericia(p));
        }
    });

    function addClass(clss: IEntryClass) {
        baseCharacter.classes.push(clss);
    }

    function removeClass(className: string) {
        const savedIndex = baseCharacter.classes.findIndex(c => c.name === className);
        if (savedIndex > -1) {
            baseCharacter.classes?.splice(savedIndex, 1);
        }
    }

    function setMainClass(clss?: IBaseClasse) {
        baseCharacter.mainClass = clss;
    }

    function setLevelClss(clss: IBaseClasse, level: Levels) {
        const activeClss = baseCharacter.classes.find(c => c.name === clss.name);
        if (activeClss) {
            activeClss.level = level;
        } else {
            console.warn(`You tried update a class not exists on character`);
        }
    }

    // Controle de Poderes
    const computedImmunities = computed(() => baseCharacter.immunities || []);

    function addPower(power: IPower) {
        // TODO implementar
    }

    function removePower(powerName: string) {
        // TODO implementar
    }

    function applyImunidade(origin: string, imunidade?: string) {
        const immunities = baseCharacter.immunities ||= [];
        const savedImmunity = immunities.find(e => e.origin === origin);

        if (!imunidade && savedImmunity) {
            const index = immunities.indexOf(savedImmunity);
            immunities.splice(index, 1);
        } else if (savedImmunity) {
            savedImmunity.value = imunidade;
        } else {
            immunities.push({ origin, value: imunidade });
        }
    }

    // Controle de pericias
    const computedPericias = computed(() => {
        return (baseCharacter.pericias ||= []).reduce((acc, p) => {
            const defaultPericia = pericias.find(p2 => p2.name === p);
            if (defaultPericia) {
                acc.push(defaultPericia);
            } else {
                console.warn(`Invalid Pericia: ${p}`);
            }
            return acc;
        }, [] as Array<IPericia>);
    });

    function setPericias(pericias: Array<PericiaName>) {
        baseCharacter.pericias = pericias.map(p => p);
    }

    function addPericia(pericia: PericiaName) {
        (baseCharacter.pericias ||= []).push(pericia);
    }

    function removePericia(pericia: PericiaName) {
        baseCharacter.pericias = (baseCharacter.pericias ||= []).filter(p => pericia !== p);
    }

    // Controle de blocos desabilitados
    const computedDisableds = computed(() => baseCharacter.disableds || []);

    // Cria Character Computado
    const computedCharacter: IComputedCharacter = {
        race: computedRace,
        classes: computedClasses,
        mainClass: computedMainClass,
        totalLevel: computedTotalLevel,
        attributes: computedAttributes,
        origin: computedOrigin,
        remaining: computedRemaining,
        immunities: computedImmunities,
        disableds: computedDisableds,
        pericias: computedPericias,
    }

    // Métodos gerais
    const isBlockDisabled = (identifier: string) =>
        computedCharacter.disableds.value.some((d) => d.affect === identifier);

    function setMovement(movement: number) {
        // TODO implementar
    }

    function addDefense(defense: IOtherDefense) {
        // TODO implementar
    }

    function removeDefense(defenseName: any) {
        // TODO implementar
    }

    function addDisable(disable: IDisabled) {
        (baseCharacter.disableds ||= []).push(disable);
    }

    function removeDisable(disableName: string) {
        baseCharacter.disableds = baseCharacter.disableds?.filter(d => d.name !== disableName);
    }

    const hook: ICharacterHook = {
        computedCharacter,
        baseCharacter,

        setAttribute,
        setRace,
        setMainClass,
        setLevelClss,
        setOrigin,
        setPericias,
        addClass,
        removeClass,
        addPower,
        removePower,
        addDefense,
        removeDefense,
        setMovement,
        applyImunidade,
        addDisable,
        removeDisable,

        isBlockDisabled,
    }

    return hook;
}
