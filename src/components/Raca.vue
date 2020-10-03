<template>
  <section>
    <h1 class="customized">Raça</h1>
    <select v-model="controlRace">
      <option :value="undefined">Selecione uma Raça</option>
      <option :value="race.name" v-for="race in races" :key="race.name">
        {{ race.name }}
      </option>
    </select>
    <ul v-if="computedCharacter.race.value?.powers">
      <li
        v-for="spec in computedCharacter.race.value.powers"
        :key="spec.name"
        class="mb-2"
      >
        <span class="destaque">{{ spec.name }}</span>
        {{ spec.description }}
        <template v-if="spec.component">
          <hr />
          <component
            :is="spec.component"
            :origin="spec.name"
            :characterHook="hook"
          ></component>
        </template>
      </li>
    </ul>
    <p v-else>Nenhuma raça selecionada.</p>
  </section>
</template>

<script lang="ts">
import races from "@/states/races";

import { defineComponent, computed } from "vue";
import { ICharacterHook } from "@/character.hook";

export default defineComponent({
  name: "Raca",

  props: {
    hook: {
      type: Object as () => ICharacterHook,
      required: true,
    },
  },

  setup(props) {
    const { hook } = props;
    const { computedCharacter, baseCharacter, setRace } = hook;

    const controlRace = computed({
      get: () => baseCharacter.race?.name,
      set: (name) => setRace(races.find((r) => r.name === name)),
    });

    return { controlRace, hook, races, computedCharacter };
  },
});
</script>