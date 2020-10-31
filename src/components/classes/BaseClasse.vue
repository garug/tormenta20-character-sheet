<script lang="tsx">
import { defineComponent, h } from "vue";

const baseComponent = defineComponent({
  name: "BaseClasse",

  setup() {
    const vara = "mundo";

    return () => <p>Ola {vara}</p>;
  }
});

export default baseComponent;
</script>