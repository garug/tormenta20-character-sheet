<template>
  <div class="ficha">
    <Atributos :hook="characterHook" />
    <Raca :hook="characterHook" />
    <section>
      <Classes :hook="characterHook" />
      <Origem :hook="characterHook" />
    </section>
  </div>
</template>

<script lang="ts">
import characterHook from "./character.store";
import Atributos from "./components/Atributos.vue";
import Raca from "./components/Raca.vue";
import Classes from "./components/Classes.vue";
import Origem from "./components/Origem.vue";

export default {
  components: {
    Atributos,
    Raca,
    Classes,
    Origem,
  },

  setup() {
    return {
      characterHook,
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
