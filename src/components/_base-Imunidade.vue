<template>
  <select v-model="control">
    <option :value="undefined">Selecione uma Imunidade</option>
    <option v-for="item in items" :key="item.name" :value="item.name">
      {{ item.name }}
    </option>
  </select>
</template>

<script lang="ts">
import { computed } from "vue";
import { ICharacterHook } from '@/types/character.types';

interface IProps {
  characterHook: ICharacterHook;
  origin: string;
}

export default {
  name: "Imunidade",

  props: {
    origin: String,
    characterHook: {
      type: Object as () => ICharacterHook,
      required: true,
    },
  },

  setup(props: any) {
    const { characterHook, origin }: IProps = props;

    const items = [
      {
        name: "Água (Frio)",
      },
      {
        name: "Ar (Eletricidade)",
      },
      {
        name: "Fogo (Fogo)",
      },
      {
        name: "Terra (Ácido)",
      },
    ];

    const control = computed({
      get: () =>
        characterHook.computedCharacter.immunities.value.find(
          (i) => i.origin === origin
        )?.value,
      set: (newValue) => characterHook.applyImunidade(origin, newValue),
    });

    return { items, control };
  },
};
</script>
