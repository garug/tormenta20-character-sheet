<template>
  <div>
    <select v-model="control">
      <option :value="undefined">{{ label }}</option>
      <option v-for="item in items" :key="item.name" :value="item.name">
        {{ item.name }}
      </option>
    </select>
    <p>{{ selectedPower?.description }}</p>
  </div>
</template>

<script lang="ts">
import { ICharacterHook } from "@/types/character.types";
import { IPower } from "@/types/power.types";
import { defineComponent, computed } from "vue";

export default defineComponent({
  name: "Poder",

  props: {
    activator: Boolean,
    disabled: Boolean,
    items: Array as () => IPower[],
    origin: {
      type: String,
      required: true
    },
    hook: {
      type: Object as () => ICharacterHook,
      required: true
    },
    label: {
      type: String,
      default: "Selecione um Poder"
    }
  },

  setup(props) {
    const { hook, origin } = props;

    const selectedPower = computed(() =>
      hook.computedCharacter.powers.value.find(i => i.origin === origin)
    );

    const control = computed({
      get: () => selectedPower.value?.name,
      set: newValue => {
        const selected = props.items?.find(i => i.name === newValue);
        if (selected) {
          hook.addPower({ ...selected, origin });
        }
      }
    });

    return { control, selectedPower };
  }
});
</script>