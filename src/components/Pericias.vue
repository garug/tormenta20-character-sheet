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
    <div class="pericias-container mb-1">
      <div v-for="pericia in pericias" :key="pericia.name">
        <Switch
          :disabled="disabledPericia(pericia)"
          :activator="selectedPericia(pericia)"
          :label="pericia.name"
          @update:activator="togglePericia(pericia, $event)"
        />
      </div>
    </div>
    <button class="outline w-100" @click="resetPericias">Reiniciar Perícias</button>
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
    const selected = ref<Array<PericiaName>>([]);

    const totalPericia = computed(() =>
      modInt.value + (periciasClasse.value?.numberToChoose || 0)
    );

    const validator = {
      modificador: computed(() => selected.value.length >= modInt.value + (periciasClasse.value?.fixed.length || 0)),
      classe: computed(() => periciasClasse.value?.choosable.some(ch => selected.value.some(s => s === ch))),
      total: computed(() => totalPericia.value === selected.value.length),
    }

    function selectedPericia(pericia: IPericia) {
      return hook.baseCharacter.pericias?.some(p => pericia.name === p);
    }

    function disabledPericia(pericia: IPericia) {
      if (periciasClasse.value?.fixed.some(p => p === pericia.name))
        return true;

      const maximoSelecionado = selected.value.length >= totalPericia.value + (periciasClasse.value?.fixed.length || 0);
      const atualmenteSelecionado = selected.value.some(p => pericia.name === p);

      if (maximoSelecionado && !atualmenteSelecionado)
        return true

      return false;
    }

    function togglePericia(pericia: IPericia, active: boolean) {
      if (active && selected.value.every(p => p !== pericia.name)) {
        selected.value = [...selected.value, pericia.name];
      } else {
        selected.value = selected.value.filter(p => p !== pericia.name);
      }
    }

    function resetPericias() {
      selected.value = periciasClasse.value?.fixed || [];
    }

    watch(selected, () => {
      hook.setPericias([...selected.value])
    });

    return {
      validator,
      totalPericia,
      resetPericias,
      pericias,
      modInt,
      periciasClasse,
      selectedPericia,
      disabledPericia,
      togglePericia,
      selected,
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