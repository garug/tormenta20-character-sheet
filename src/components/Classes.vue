<template>
  <section class="mb-1">
    <h1 class="customized">Classe</h1>
    <div class="d-flex justify-evenly mb-1">
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
        class="d-flex justify-between align-items-center mb-1"
      >
        <Switch
          :activator="isMainClass(clss)"
          @update:activator="defineClass($event, clss)"
        />
        <p style="flex-grow: 1">{{ clss.name }} Lv. {{ clss.level }}</p>
        <button @click="openEditor(clss)" class="mr-1">Editar</button>
        <button @click="hook.removeClass(clss.name)">Remover</button>
      </div>
    </template>
    <p v-else>Nenhuma classe adicionada.</p>
  </section>
  <div v-if="showModal" class="modal">
    <div class="container">
      <div class="fechar" @click="showModal = false">x</div>
      <div class="d-flex align-items-center">
        <h1 class="mr-1">{{ modalClass.name }}</h1>
        <div>
          <p class="destaque">Level:</p>
          <select
            v-model="controlModalLevel"
            :selected="modalClass.value?.level.toString()"
            @change="updateLevel(modalClass, Number($event.target.value))"
          >
            <option
              :disabled="isBlockedLevel(item)"
              v-for="item in 20"
              :key="item"
              :value="item"
            >
              {{ item }}
            </option>
          </select>
        </div>
      </div>
      <hr />
      <p class="mb-3">{{ modalClass }}</p>
      <button @click="showModal = false">Finalizar</button>
    </div>
  </div>
</template>

<script lang="ts">
import classes from "@/states/classes";

import { defineComponent, ref, computed, reactive } from "vue";
import { ICharacterHook } from "@/character.hook";
import { IComputedClasse, Levels } from "@/types/classes.types";

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

    const showModal = ref(false);
    const activeClass = ref(undefined);
    let modalClass = ref<IComputedClasse>({} as IComputedClasse);

    function applyClass() {
      if (activeClass.value) {
        hook.addClass({ name: activeClass.value || "", level: 1 });
        activeClass.value = undefined;
      }
    }

    function openEditor(clss: IComputedClasse) {
      modalClass.value = clss;
      showModal.value = true;
    }

    function isMainClass(clss: IComputedClasse) {
      return hook.baseCharacter.mainClass?.name === clss.name;
    }

    function defineClass(selected: boolean, clss: IComputedClasse) {
      const sameClass = hook.baseCharacter.mainClass?.name === clss.name;

      if (!sameClass && selected) {
        hook.setMainClass(clss);
      }

      if (sameClass && !selected) {
        hook.setMainClass(undefined);
      }
    }

    const controlModalLevel = computed({
      get: () => modalClass.value?.level,
      set: (value) => updateLevel(modalClass.value, Number(value) as Levels),
    });

    function updateLevel(clss: IComputedClasse, level: Levels) {
      hook.setLevelClss(clss, level);
    }

    function isBlockedLevel(number: number) {
      const maxLevelClass =
        computedCharacter.totalLevel.value + (modalClass.value?.level || 0);
      const total =
        20 -
        computedCharacter.totalLevel.value +
        (modalClass.value?.level || 0);
      // console.log(number, total, number > total);
      return number > total;
    }

    const disabledClass = (clss: IComputedClasse) =>
      computedCharacter.totalLevel.value >= 20 ||
      computedCharacter.classes.value.some((e) => e.name === clss.name);

    return {
      hook,
      classes,
      activeClass,
      applyClass,
      disabledClass,
      computedCharacter,
      isMainClass,
      defineClass,
      showModal,
      openEditor,
      modalClass,
      updateLevel,
      isBlockedLevel,
      controlModalLevel,
    };
  },
});
</script>