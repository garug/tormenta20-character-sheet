<template>
  <section class="mb-1">
    <h1 class="customized">Origem</h1>
    <select class="mb-1" v-model="controlOrigin" :disabled="hook.isBlockDisabled('origin')">
      <option :value="undefined">Selecione uma Origem</option>
      <option v-for="origin in origins" :key="origin.name" :value="origin.name">
        {{ origin.name }}
      </option>
      <option
        v-if="computedCharacter.origin.value?.custom"
        :value="computedCharacter.origin.value?.name"
      >
        {{ baseCharacter.origin.name }}
      </option>
    </select>
    <p>{{ baseCharacter.origin?.description }}</p>
  </section>
</template>

<script lang="ts">
import origins from "@/states/origins";
import { ICharacterHook } from '@/types/character.types';

import { defineComponent, computed } from "vue";

export default defineComponent({
  name: "Origem",

  props: {
    hook: {
      type: Object as () => ICharacterHook,
      required: true,
    },
  },

  setup(props) {
    const { hook } = props;
    const { computedCharacter, baseCharacter, setRace } = hook;

    const controlOrigin = computed({
      get: () => baseCharacter.origin?.name,
      set: (name) => hook.setOrigin(origins.find((o) => o.name === name)),
    });

    return {
      hook,
      origins,
      controlOrigin,
      computedCharacter,
      baseCharacter,
    };
  },
});
</script>