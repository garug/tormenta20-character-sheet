import { useCharacter, generateDefaultCharacter } from "./character.hook";
import { reactive, watchEffect } from 'vue';
import { IBaseCharacter } from './types/character.types';

const saved = localStorage.getItem('t20-character');

const loadedCharacter: IBaseCharacter = saved ? JSON.parse(saved) : generateDefaultCharacter();

const characterHook = useCharacter(loadedCharacter);

watchEffect(() => {
    const { baseCharacter } = characterHook;
    localStorage.setItem('t20-character', JSON.stringify(baseCharacter));
});

export default characterHook;
