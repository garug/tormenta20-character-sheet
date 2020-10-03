<template>
  <section class="mb-1">
    <h1 class="customized">Classe</h1>
    <div class="d-flex justify-evenly">
      <select v-model="activeClass" class="mr-1">
        <option :value="undefined">Selecione uma Classe</option>
        <option
          :value="clss.name"
          :disabled="disabledClass(clss)"
          v-for="clss in classes"
          :key="clss.name"
        >
          {{ clss.name }}
        </option>
      </select>
      <button :disabled="!activeClass" @click="applyClass">+</button>
    </div>
    <template v-if="computedCharacter.classes.value.length > 0">
      <div
        v-for="clss in computedCharacter.classes.value"
        :key="clss.name"
        class="d-flex justify-between align-items-center"
      >
        <p style="flex-grow: 1">{{ clss.name }} Lv. {{ clss.level }}</p>
        <button disabled>Editar</button>
        <button @click="hook.removeClass(clss.name)">Remover</button>
      </div>
    </template>
    <p v-else>Nenhuma classe adicionada.</p>
  </section>
</template>

<script lang="ts">
import classes from "@/states/classes";

import { defineComponent, ref } from "vue";
import { ICharacterHook } from "@/character.hook";
import { IComputedClasse } from "@/types/classes.types";

export default defineComponent({
  name: "Classes",

  props: {
    hook: {
      type: Object as () => ICharacterHook,
      required: true,
    },
  },

  setup(props) {
    const { hook } = props;
    const { computedCharacter, baseCharacter, setRace } = hook;

    const activeClass = ref(undefined);

    function applyClass() {
      if (activeClass.value) {
        hook.addClass({ name: activeClass.value || "", level: 1 });
        activeClass.value = undefined;
      }
    }

    const disabledClass = (clss: IComputedClasse) =>
      computedCharacter.classes.value.some((e) => e.name === clss.name);

    return {
      hook,
      classes,
      activeClass,
      applyClass,
      disabledClass,
      computedCharacter,
    };
  },
});
</script>