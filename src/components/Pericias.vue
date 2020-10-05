<template>
  <!-- Provavelmente esse componente muda bastante com implementação de um framework ui -->
  <section>
    <h1 class="customized">Perícias</h1>
    <p class="mb-1">
      <span class="destaque">Modificador de Inteligência:</span> {{ modInt }}
    </p>
    <template v-if="periciasClasse">
      <p v-if="periciasClasse">
        <span class="destaque">Classe:</span>
        {{ periciasClasse.fixed.join(", ") }}
      </p>
      <p>
        <span class="destaque">
          Mais {{ periciasClasse.numberToChoose }} para escolher entre:
        </span>
        {{ periciasClasse.choosable.join(", ") }}
      </p>
    </template>
    <p v-else>Nenhuma classe principal selecionada</p>
    <hr />
    <div class="pericias-container">
      <div v-for="pericia in pericias" :key="pericia.name">
        <Switch
          :disabled="disabledPericia(pericia)"
          :activator="selectedPericia(pericia)"
          :label="pericia.name"
          @update:activator="togglePericia(pericia, $event)"
        />
      </div>
    </div>
  </section>
</template>

<script lang="ts">
import { ICharacterHook } from '@/character.hook';
import { defineComponent, computed, watch, ref } from 'vue';
import pericias from '@/states/pericias';
import { IPericia, PericiaName } from '@/types/pericia.types';

export default defineComponent({
  name: "Pericias",

  props: {
    hook: {
      type: Object as () => ICharacterHook,
      required: true,
    },
  },

  setup(props) {
    const { hook } = props;

    const modInt = computed(() => hook.computedCharacter.attributes.value[3].mod);
    const periciasClasse = computed(() => hook.computedCharacter.mainClass.value?.pericias);
    const manualSelected = ref<Array<PericiaName>>([]);

    function selectedPericia(pericia: IPericia) {
      return hook.baseCharacter.pericias?.some(p => pericia.name === p);
    }

    function disabledPericia(pericia: IPericia) {
      return periciasClasse.value?.fixed.some(p => p === pericia.name);
    }

    function togglePericia(pericia: IPericia, active: boolean) {
      if (active && manualSelected.value.every(p => p !== pericia.name)) {
        manualSelected.value = [...manualSelected.value, pericia.name];
      } else {
        manualSelected.value = manualSelected.value.filter(p => p !== pericia.name);
      }
    }

    watch(manualSelected, () => {
      hook.setPericias([...manualSelected.value])
    });

    return {
      pericias,
      modInt,
      periciasClasse,
      selectedPericia,
      disabledPericia,
      togglePericia,
      manualSelected,
    }
  }
})
</script>

<style lang="scss" scoped>
.pericias-container {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;

  div {
    display: flex;
    justify-content: end;
    margin-bottom: 2px;
    font-size: 12px;
  }
}
</style>