<template>
  <div class="switch-container" :class="{ active: control, disabled }">
    <input
      :disabled="disabled"
      v-model="control"
      :name="id"
      :id="id"
      type="checkbox"
    />
    <label :for="id" class="switch">
      <span class="slider round"></span>
    </label>
    <label class="label" :for="id">{{ label }}</label>
  </div>
</template>

<script>
export default {
  name: "Switch",

  props: {
    label: String,
    activator: Boolean,
    disabled: Boolean,
  },

  data() {
    return {
      control: false,
    };
  },

  computed: {
    id() {
      return this.$attrs.id || "switch-" + (Math.random() * 1000).toFixed(5);
    },
  },

  created() {
    this.control = this.activator;
  },

  watch: {
    control(val, old) {
      if (!!val !== !!old) {
        this.$emit("update:activator", this.control);
      }
    },

    activator() {
      this.control = this.activator;
    },
  },
};
</script>

<style lang="scss" scoped>
.switch-container {
  display: flex;
  justify-content: center;
  align-items: center;
}

/* The switch - the box around the slider */
.switch {
  position: relative;
  display: inline-block;
  min-width: 35px;
  height: 20px;
}

/* Hide default HTML checkbox */
input {
  opacity: 0;
  width: 0;
  height: 0;
}

.label {
  margin-left: 5px;
  cursor: pointer;
}

/* The slider */
.slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #ccc;
  -webkit-transition: 0.4s;
  transition: 0.4s;
}

.switch-container.disabled .slider,
.switch-container.disabled .label {
  cursor: not-allowed;
}

.slider:before {
  position: absolute;
  content: "";
  height: 14px;
  width: 14px;
  left: 5px;
  bottom: 3px;
  background-color: #fff;
  -webkit-transition: 0.2s;
  transition: 0.2s;
}

.switch-container.active .slider {
  background-color: $red;
}

.switch-container.disabled .slider {
  background-color: #eee;
}

.switch-container.active .slider:before {
  left: 18px;
  background-color: $yellow;
}

.switch-container.active.disabled .slider:before {
  background-color: #ccc;
}

/* Rounded sliders */
.slider.round {
  border-radius: 34px;
}

.slider.round:before {
  border-radius: 50%;
}
</style>