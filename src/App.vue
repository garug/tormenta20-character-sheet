<template>
  <div class="ficha">
    <Atributos :hook="characterHook" />
    <Raca :hook="characterHook" />
    <section>
      <Classes :hook="characterHook" />
      <Origem :hook="characterHook" />
    </section>
    <Pericias :hook="characterHook" />
    <Itens :hook="characterHook" />
  </div>
</template>

<script lang="ts">
import characterHook from "./character.store";
import Atributos from "./components/Atributos.vue";
import Raca from "./components/Raca.vue";
import Classes from "./components/Classes.vue";
import Origem from "./components/Origem.vue";
import Pericias from "./components/Pericias.vue";
import Itens from './components/Itens.vue';

export default {
  components: {
    Atributos,
    Raca,
    Classes,
    Origem,
    Pericias,
    Itens,
  },

  setup() {
    return {
      characterHook,
    };
  },
};
</script>

<style lang="scss">
.modal {
  position: fixed;
  background: rgba(0, 0, 0, 0.2);
  top: 0;
  left: 0;
  z-index: 1;
  width: 100%;
  height: 100%;

  .container {
    background: #fff;
    height: auto;
    align-items: center;
    justify-content: center;
    position: relative;
    top: 25vh;
    width: 50vw;
    min-width: 300px;
    left: 50%;
    right: 50%;
    padding: 25px 50px;
    box-sizing: border-box;
    transform: translateX(-50%);
    box-shadow: 0 2px 2px rgba(0, 0, 0, 0.2);
    border-radius: 5px;
  }

  .fechar {
    position: absolute;
    top: 5px;
    right: 15px;
    color: #888;
    font-weight: bolder;
    font-size: 24px;
    cursor: pointer;
  }
}
#app {
  background-color: #f6f6f6;
  font-family: "source sans pro";
  max-width: 100vw;
  overflow: hidden;
}

.d-flex {
  display: flex;
}

.align-items-center {
  align-items: center;
}

.justify-evenly {
  justify-content: space-evenly;
}

.justify-between {
  justify-content: space-between;
}

.mb-1 {
  margin-bottom: 5px;
}

.mb-2 {
  margin-bottom: 5px;
}

.mb-3 {
  margin-bottom: 15px;
}

.mr-1 {
  margin-right: 5px;
}

.w-100 {
  width: 100%;
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

select:disabled {
  border-color: #ddd;
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

button {
  outline: 0;
  background: $red;
  border: 2px solid transparent;
  color: $yellow;
  font-family: iowan;
  font-weight: bolder;
  padding: 5px 15px;
  border-radius: 2px;
  cursor: pointer;
  transition: all ease 0.2s;
}

button.outline {
  background: transparent;
  border-color: #888;
  color: #888;
}

button:hover {
  background: transparent;
  border-color: $red;
  color: $red;
}

button:disabled {
  background-color: #ddd9d5;
  color: #fff;
  cursor: default;
  border-color: transparent;
}

.ficha {
  display: flex;
  justify-content: space-evenly;
  flex-wrap: wrap;
}

.destaque {
  font-weight: bolder;
  font-family: iowan;
  font-size: 14px;
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
