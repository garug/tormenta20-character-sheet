import { createStore } from "vuex";
import { useCharacter } from "./character.hook";
import * as m from "./character.store.mutations";
import { IBaseCharacter } from "./types/character.types";

export function generateDefaultCharacter(): IBaseCharacter {
  return {
    race: undefined,
    classes: [],
    attributes: [10, 10, 10, 10, 10, 10],
  };
}

const key = (characterName: string) => `t20-character-${characterName}`;
const DEFAULT_NAME = "default";

export const characterStore = createStore({
  state: {
    hook: useCharacter(generateDefaultCharacter()),
  },
  mutations: {
    [m.SAVE_CHARACTER_LOCALSTORAGE]: (state, characterName = DEFAULT_NAME) => {
      localStorage.setItem(key(characterName), JSON.stringify(state.hook));
    },
    [m.LOAD_CHARACTER_LOCALSTORAGE]: (state, characterName = DEFAULT_NAME) => {
      const loadedCharacter = localStorage.getItem(key(characterName));
      if (loadedCharacter) {
        state.hook = JSON.parse(loadedCharacter);
      } else {
        throw new Error("Character not found");
      }
    },
    [m.LOAD_CHARACTER_HOOK]: (state, payload) => {
      state.hook = payload;
    },
    [m.RESET_CHARACTER]: (state, payload) => {
      state.hook = useCharacter(generateDefaultCharacter());
    },
  },
});
