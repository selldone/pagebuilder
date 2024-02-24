<!--
  - Copyright (c) 2023. Selldone® Business OS™
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
  <div class="d-flex align-center">
    <b class="me-2 min-width-100">{{ label }}</b>
    <s-number-dimension-input
      v-model="width"
      class="flex-grow-1"
      hide-details
      label="Width"
      variant="underlined"
      @change="updateOut"
    ></s-number-dimension-input>
    <v-select
      v-model="type"
      :items="items"
      class="px-2"
      flat
      hide-details
      label="Type"
      variant="underlined"
      @update:model-value="updateOut"
    ></v-select>
    <s-color-selector
      v-model="color"
      class="flex-grow-0 ms-2"
      mode="rgba"
      @change="updateOut"
    ></s-color-selector>
  </div>
</template>

<script>
import SColorSelector from "@components/ui/color/selector/SColorSelector.vue";
import SNumberDimensionInput from "@components/ui/dimension/SNumberDimensionInput.vue";

export default {
  name: "SLandingStyleBorder",
  components: { SNumberDimensionInput, SColorSelector },
  emits: ["update:modelValue"],
  props: {
    modelValue: {},
    label: {},
  },

  data() {
    return {
      width: null,
      type: "solid",
      items: [
        "none",
        "hidden",
        "dotted",
        "dashed",
        "solid",
        "groove",
        "groove",
        "ridge",
        "inset",
        "outset",
        "initial",
      ],
      color: "#444",
    };
  },

  watch: {
    modelValue() {
      this.assignValue();
    },
  },
  methods: {
    updateOut() {
      this.$emit(
        "update:modelValue",
        `${this.width} ${this.type} ${this.color} `,
      );
    },
    assignValue() {
      const arr = this.modelValue.split(" ");
      if (arr.length > 0) this.width = arr[0];
      if (arr.length > 1) this.type = arr[1];
      if (arr.length > 2) this.color = arr.slice(2).join(" "); //Other is color rgb(xx, xx, xx) !

      //  console.log('assignValue this.color',this.color)
    },
  },
  created() {
    this.assignValue();
  },
};
</script>

<style scoped></style>
