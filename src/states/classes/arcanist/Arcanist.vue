<template>
  <div>
    <transition
      name="toggle"
      v-for="level in levelsComponents"
      :key="`arcanist-level-${level.level}`"
    >
      <article
        :id="`arcanist-level-${level.level}`"
        :class="{
          block: true,
          active: level.level <= classe.level,
        }"
      >
        <h2>Level {{ level.level }}</h2>
        <component
          v-for="component in level.components"
          :key="`component-${component.name}`"
          :id="`component-${level.level}-${component.name}`"
          :is="component"
          :hook="hook"
        />
        <hr />
      </article>
    </transition>
  </div>
</template>

<script lang="ts">
import { ICharacterHook } from '@/types/character.types';
import { IComputedClasse } from '@/types/classes.types';
import { defineComponent, h } from 'vue';
import poderArcanista from './PoderArcanista.vue';
import altaArcana from './AltaArcana.vue';
import caminhoArcanista from './CaminhoArcanista.vue';
import magiasArcanas from "./MagiasArcanas.vue";

const levelsComponents = [
  {
    level: 1,
    components: [caminhoArcanista, magiasArcanas],
  },
  {
    level: 2,
    components: [poderArcanista],
  },
  {
    level: 3,
    components: [poderArcanista],
  },
  {
    level: 4,
    components: [poderArcanista],
  },
  {
    level: 5,
    components: [magiasArcanas, poderArcanista],
  },
  {
    level: 20,
    components: [altaArcana, poderArcanista],
  }
];

export default defineComponent({
  name: "ArcanistComponent",

  props: {
    hook: {
      type: Object as () => ICharacterHook,
      required: true,
    },
    classe: {
      type: Object as () => IComputedClasse,
      required: true,
    }
  },

  setup(props) {
    return { levelsComponents }
  }
})
</script>

<style scoped lang="scss">
hr {
  margin-bottom: 0;
}

.block {
  padding-top: 8px;
  padding-left: 8px;
  padding-right: 8px;
  background: #f8f3f3;
  transition: background ease 0.3s;
}

.active {
  background: #fff;
}
</style>