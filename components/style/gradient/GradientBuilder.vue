<!--
  - Copyright (c) 2023-2024. Selldone® Business OS™
  -
  - Author: M.Pajuhaan
  - Web: https://selldone.com
  - ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  -
  - All rights reserved. In the weave of time, where traditions and innovations intermingle, this content was crafted.
  - From the essence of thought, through the corridors of creativity, each word, and sentiment has been molded.
  - Not just to exist, but to inspire. Like an artist's stroke or a sculptor's chisel, every nuance is deliberate.
  - Our journey is not just about reaching a destination, but about creating a masterpiece.
  - Tread carefully, for you're treading on dreams.
  -->

<template>
  <div>
    <div :style="{ background: gradient }" class="gradient-view"></div>
    <div class="container">
      <v-fade-transition group tag="div" class="row m-1">
        <s-color-selector
          v-for="(color, index) in modelValue"
          :key="index"
          v-model="modelValue[index]"
          @update:modelValue="onChange()"
          class="m-1 inline-block"
        >
          lens
        </s-color-selector>
      </v-fade-transition>

      <v-btn @click="addColor" icon title="Add a color"
        ><v-icon>add</v-icon></v-btn
      >
      <v-btn
        v-if="modelValue && modelValue.length > 2"
        @click="removeColor"
        icon
        title="Remove last color"
        ><v-icon>remove</v-icon></v-btn
      >

      <v-btn @click="generateGradient" icon title="Create random colors"
        ><v-icon>fa:fas fa-dice</v-icon></v-btn
      >
      <v-btn v-if="clearable" @click="$emit('update:modelValue', [])" icon
        ><v-icon>delete</v-icon></v-btn
      >
    </div>
  </div>
</template>

<script>
import SColorSelector from "@components/ui/color/selector/SColorSelector.vue";
export default {
  name: "GradientBuilder",
  components: { SColorSelector },
  emits: ["update:modelValue", "change"],
  props: {
    modelValue: {
      type: Array,
    },

    clearable: {
      type: Boolean,
      default: false,
    },
  },

  data: () => ({
    uid: 1,
  }),

  computed: {
    gradient() {
      let co = this.uid;

      if (!this.modelValue || this.modelValue.length < 2) return null;

      let colors = "linear-gradient(45deg";
      this.modelValue.forEach(function (e) {
        colors += "," + e;
      });
      colors += ")";
      return colors;
    },
  },

  created() {

  },

  methods: {
    addColor() {
      if (!this.modelValue || !Array.isArray(this.modelValue)) {
        this.$emit("update:modelValue", [this.randomHex()]);
        this.onChange();
      } else {
        this.modelValue.push(this.randomHex());
        this.onChange();
      }
    },
    removeColor() {
      if (!this.modelValue) return;

      if (this.modelValue.length > 2) {
        this.modelValue.pop();
        this.onChange();
      }
    },
    generateGradient() {
      const arr = [];
      for (
        let i = 0;
        i < Math.max(this.modelValue ? this.modelValue.length : 0, 2);
        i++
      ) {
        arr.push(this.randomHex());
      }
      this.$emit("update:modelValue", arr);
      this.onChange();
    },

    randomHex() {
      return "#" + Math.random().toString(16).slice(2, 8) + "FF"; // Force alpha channel!
    },
    up(index) {
      if (index > 0) {
        let temp = this.modelValue[index];

        this.modelValue[index] = this.modelValue[index - 1];

        this.modelValue[index - 1] = temp;
      }
    },
    down(index) {
      if (index < this.modelValue.length - 1) {
        let temp = this.modelValue[index];

        this.modelValue[index] = this.modelValue[index + 1];

        this.modelValue[index + 1] = temp;
      }
    },

    onChange() {
      this.uid = Math.random();
      this.$forceUpdate();
      this.$emit("change");
    },
  },
};
</script>

<style scoped lang="scss">
.gradient-view {
  width: 96%;
  margin: 8px auto;
  height: 16px;
  border-radius: 6px;
}
</style>
