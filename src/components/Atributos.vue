<template>
  <section id="attributes">
    {{ character.baseCharacter }}
    <h1 class="customized">Atributos</h1>
    <p>
      <span class="destaque">Pontos Restando:</span>
      {{ character.computedCharacter.remaining }}
    </p>
    <hr />
    <article class="individual" v-for="atb in character.computedCharacter.attributes" :key="atb.short">
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
import { ICharacterHook } from "@/types/character.types";
import { defineComponent } from "vue";

const Atributos = defineComponent({
  name: "Atributos",

  props: {
    character: {
      type: Object as () => ICharacterHook,
      required: true
    }
  },

  setup(props) {
    const { character } = props;
    const { computedCharacter } = character;
    const { remaining, attributes } = computedCharacter;

    const increment = (atb: IAttribute) =>
      character.setAttribute({ attribute: atb, value: atb.value + 1 });

    const decrement = (atb: IAttribute) =>
      character.setAttribute({ attribute: atb, value: atb.value - 1 });

    return {
      increment,
      decrement,
      computedCharacter,
      remaining,
      attributes
    };
  }
});

export default Atributos;
</script>