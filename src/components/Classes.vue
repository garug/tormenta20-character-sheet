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
      <button :disabled="!activeClass" @click="newClass">+</button>
    </div>
    <template v-if="computedCharacter.classes.value?.length > 0">
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
  <teleport to="body">
    <div v-if="showModal" class="modal">
      <div class="container">
        <div class="d-flex align-items-center">
          <h1 class="mr-1">{{ modalClass.name }}</h1>
          <div>
            <p class="destaque">Level Atual:</p>
            <select v-model="controlModalLevel">
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
        <component
          :is="computedCharacter.mainClass.value?.component"
          :hook="hook"
          :classe="modalClass"
        />
        <button @click="applyClass" class="mr-1">Aplicar Mudanças</button>
        <button @click="showModal = false" class="outline">Cancelar</button>
      </div>
    </div>
  </teleport>
</template>

<script lang="ts">
import classes from "@/states/classes";

import { defineComponent, ref, computed, reactive, readonly } from "vue";
import { IComputedClasse, Levels } from "@/types/classes.types";
import BaseClasse from "./classes/BaseClasse.vue";
import { ICharacterHook } from "@/types/character.types";

export default defineComponent({
  name: "Classes",

  components: {
    BaseClasse
  },

  props: {
    hook: {
      type: Object as () => ICharacterHook,
      required: true
    }
  },

  setup(props) {
    const { hook } = props;
    const { computedCharacter, baseCharacter, setRace } = hook;

    interface IModalClass extends IComputedClasse {
      originalLevel: Levels;
    }

    const showModal = ref(false);
    const activeClass = ref(undefined);
    let modalHook: ICharacterHook = {} as ICharacterHook;
    let modalClass = ref<IModalClass>({} as IModalClass);

    function newClass() {
      if (activeClass.value) {
        hook.addClass({ name: activeClass.value || "", level: 1 });
        activeClass.value = undefined;
      }
    }

    function openEditor(clss: IComputedClasse) {
      modalHook = { ...hook };
      modalClass.value = { ...clss, originalLevel: clss.level };
      showModal.value = true;
    }

    function applyClass() {
      const clss = modalClass.value;
      hook.setLevelClss(clss, clss.level);
      showModal.value = false;
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
      set: value => (modalClass.value.level = value)
    });

    function isBlockedLevel(number: number) {
      const total =
        20 -
        computedCharacter.totalLevel.value +
        (modalClass.value?.originalLevel || 0);
      // console.log(number, total, number > total);
      return number > total;
    }

    const disabledClass = (clss: IComputedClasse) =>
      computedCharacter.totalLevel.value >= 20 ||
      computedCharacter.classes.value?.some(e => e.name === clss.name);

    return {
      hook,
      classes,
      activeClass,
      newClass,
      applyClass,
      disabledClass,
      computedCharacter,
      isMainClass,
      defineClass,
      showModal,
      openEditor,
      modalClass,
      isBlockedLevel,
      controlModalLevel
    };
  }
});
</script>