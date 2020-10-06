<template>
  <section>
    <h1 class="customized">Itens</h1>
    <div class="d-flex justify-evenly mb-1">
      <select v-model="activeItem" class="mr-1">
        <option :value="undefined">Selecione um Item</option>
        <option
          :value="item.name"
          :disabled="disabledItem(item)"
          v-for="item in items"
          :key="item.name"
        >
          {{ item.name }}
        </option>
      </select>
      <button :disabled="!activeItem" @click="newItem">+</button>
    </div>
  </section>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import items from "@/states/items";
import { IITem } from '@/types/item.type';

export default defineComponent({
  name: "Itens",

  setup() {
    const activeItem = ref(undefined);

    function disabledItem(item: IITem) {
      // TODO implementar
      return false;
    }

    function newItem() {
        console.log(activeItem.value);
        activeItem.value = undefined;
        // TODO implementar
    }

    return {
      items,
      activeItem,
      newItem,
      disabledItem,
    }
  }
})
</script>