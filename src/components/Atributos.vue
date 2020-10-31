<template>
  <section id="attributes">
    <h1 class="customized">Atributos</h1>
    <p>
      <span class="destaque">Pontos Restando:</span>
      {{ computedCharacter.remaining.value }}
    </p>
    <hr />
    <article
      class="individual"
      v-for="atb in computedCharacter.attributes.value"
      :key="atb.short"
    >
      <h1>{{ atb.name }}</h1>
      <div class="atb-info">
        <div class="control-value">
          <button @click="decrement(atb)">-</button>
          <p>{{ atb.value }}</p>
          <button @click="increment(atb)">+</button>
        </div>
        <p>
          <span class="destaque">Raça</span>
          {{ atb.race !== 0 ? atb.race : "-" }}
        </p>
        <p>
          <span class="destaque">Total</span>
          {{ atb.total }}
        </p>
        <p>
          <span class="destaque">Mod.</span>
          <b>{{ atb.mod }}</b>
        </p>
      </div>
    </article>
  </section>
</template>

<script lang="ts">
import { IAttribute } from "@/types/attribute.types";
import { ICharacterHook } from '@/types/character.types';
import { defineComponent } from "vue";

const Atributos = defineComponent({
  name: "Atributos",

  props: {
    hook: {
      type: Object as () => ICharacterHook,
      required: true,
    },
  },

  setup(props) {
    const { hook } = props;
    const { computedCharacter } = hook;

    const increment = (atb: IAttribute) =>
      hook.setAttribute({ attribute: atb, value: atb.value + 1 });

    const decrement = (atb: IAttribute) =>
      hook.setAttribute({ attribute: atb, value: atb.value - 1 });

    return { increment, decrement, computedCharacter };
  },
});

export default Atributos;
</script>