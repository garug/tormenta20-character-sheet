<template>
  <Poder :hook="hook" origin="caminho-arcanista" :items="caminhosArcanista" />
</template>

<script lang="ts">
import { ICharacterHook } from "@/types/character.types";
import { computed, defineComponent } from "vue";
import { caminhosArcanista } from "./arcanista";

const control = computed({
  get: () => {},
  set: () => {}
});

const caminhoArcanista = defineComponent({
  name: "CaminhoArcanista",

  props: {
    hook: {
      type: Object as () => ICharacterHook,
      required: true
    }
  },

  setup() {
    return {
      control,
      caminhosArcanista
    };
  }
});

export default caminhoArcanista;
</script>
