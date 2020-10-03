<template>
  <div class="ficha">
    <!-- Atributos -->
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
    <!-- Raça -->
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
          class="mb-1"
        >
          <span class="destaque">{{ spec.name }}</span>
          {{ spec.description }}
          <template v-if="spec.component">
            <hr />
            <component
              :is="spec.component"
              :origin="spec.name"
              :characterHook="characterHook"
            ></component>
          </template>
        </li>
      </ul>
      <p v-else>Nenhuma raça selecionada.</p>
    </section>

    <section>
      <!-- Classes -->
      <article class="mb-1">
        <h1 class="customized">Classe</h1>
        <div class="d-flex justify-evenly">
          <select v-model="activeClass" class="mr-1">
            <option :value="undefined">Selecione uma Classe</option>
            <option
              :value="clss.name"
              :disabled="
                computedCharacter.classes.value.some(
                  (e) => e.name === clss.name
                )
              "
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
            class="d-flex justify-between"
          >
            <p>{{ clss }}</p>
            <button disabled>Editar</button>
            <button @click="removeClass(clss.name)">Remover</button>
          </div>
        </template>
        <p v-else>Nenhuma classe adicionada.</p>
      </article>
      <!-- Origem -->
      <article class="mb-1">
        <h1 class="customized">Origem</h1>
        <select v-model="controlOrigin" :disabled="blockDisabled('origin')">
          <option :value="undefined">Selecione uma Origem</option>
          <option
            v-for="origin in origins"
            :key="origin.name"
            :value="origin.name"
          >
            {{ origin.name }}
          </option>
          <option
            v-if="computedCharacter.origin.value?.custom"
            :value="computedCharacter.origin.value?.name"
          >
            {{ baseCharacter.origin.name }}
          </option>
        </select>
      </article>
    </section>
  </div>
</template>

<script lang="ts">
import races from "./states/races";
import origins from "./states/origins";
import classes from "./states/classes";
import { ref, computed } from "vue";
import { IAttribute } from "./types/attribute.types";
import characterHook from "./character.store";
import { IDisabled } from "./types/character.types";

export default {
  setup() {
    const {
      computedCharacter,
      baseCharacter,
      addClass,
      removeClass,
      setRace,
      setOrigin,
      setAttribute,
    } = characterHook;

    const activeClass = ref(undefined);

    function applyClass() {
      if (activeClass.value) {
        addClass({ name: activeClass.value || "", level: 1 });
        activeClass.value = undefined;
      }
    }

    const increment = (atb: IAttribute) =>
      setAttribute({ attribute: atb, value: atb.value + 1 });

    const decrement = (atb: IAttribute) =>
      setAttribute({ attribute: atb, value: atb.value - 1 });

    const blockDisabled = (identifier: string) =>
      computedCharacter.disableds.value.some((d) => d.affect === identifier);

    const controlRace = computed({
      get: () => baseCharacter.race?.name,
      set: (name) => setRace(races.find((r) => r.name === name)),
    });

    const controlOrigin = computed({
      get: () => baseCharacter.origin?.name,
      set: (name) => setOrigin(origins.find((o) => o.name === name)),
    });

    return {
      races,
      origins,
      classes,
      controlRace,
      controlOrigin,
      decrement,
      increment,
      computedCharacter,
      baseCharacter,
      characterHook,
      blockDisabled,
      activeClass,
      applyClass,
      removeClass,
    };
  },
};
</script>

<style lang="scss">
#app {
  background-color: #f6f6f6;
  font-family: "source sans pro";
}

.mb-1 {
  margin-bottom: 15px;
}

.d-flex {
  display: flex;
}

.justify-evenly {
  justify-content: space-evenly;
}

.justify-between {
  justify-content: space-between;
}

.mr-1 {
  margin-right: 5px;
}

select {
  outline: none;
  height: 35px;
  padding: 0 5px;
  border: 1px solid #ddd;
  width: 100%;
  transition: all ease 0.4s;
}

select:focus,
select:active {
  border-color: $red;
}

h1,
h2 {
  color: $red;
  font-family: tormenta20;
  font-size: 3em;
}

article h2 {
  font-size: 1.5em;
}

h1.customized {
  border-bottom: 1px solid $red;
  margin-bottom: 5px;
  padding: 0 5px 2px;
}

section {
  min-width: 360px;
  max-width: 20vw;
  padding: 15px;
  box-sizing: border-box;
}

b {
  font-weight: bolder;
}

hr {
  background: $red;
  color: $red;
  height: 1px;
  border: none;
  display: block;
}

.pericias-container {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;

  div {
    display: flex;
    justify-content: end;
    margin-bottom: 2px;
  }
}

button {
  outline: 0;
  background: $red;
  border: 0;
  color: $yellow;
  font-family: iowan;
  font-weight: bolder;
  padding: 5px 15px;
  border-radius: 2px;
  cursor: pointer;
}

button:disabled {
  background-color: #ddd9d5;
  color: #fff;
  cursor: default;
}

.ficha {
  display: flex;
  justify-content: space-evenly;
  flex-wrap: wrap;
}

.destaque {
  font-weight: bolder;
  color: $red;
  margin-right: 5px;
}

.defesa-info {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 15px;

  .total {
    font-size: 40px;
  }

  p {
    display: flex;
    flex-direction: column;
    align-items: center;

    margin: 0 5px;

    span {
      font-size: 11px;
      font-weight: bolder;
      color: $red;
    }
  }
}

#attributes {
  .individual {
    margin-bottom: 15px;

    h1 {
      font-weight: bolder;
      font-family: "source sans pro";
      font-size: 12px;
      margin-bottom: 5px;
      color: #000;
      text-align: center;
    }

    .atb-info {
      display: flex;
      justify-content: space-between;

      div {
        display: flex;
        align-items: center;
        justify-content: center;
      }
    }

    .control-value {
      p {
        font-size: 24px;
        margin: 0 15px;
      }
    }
  }
}
</style>
