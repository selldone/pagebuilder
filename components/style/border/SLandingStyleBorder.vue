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
  <!-- ████████████████████████ Border ████████████████████████ -->

  <v-list-item class="s--landing-style-border">
    <template v-slot:prepend>
      <span class="-label me-2 min-width-100">
        <v-icon v-if="icon" class="me-1">{{ icon }}</v-icon>

        {{ label }}</span
      >
    </template>

    <div class="d-flex align-center">
      <u-dimension-input
        v-model="width"
        class="flex-grow-1 v-input-small"
        hide-details
        label="Width"
        variant="outlined"
        single-line
        rounded="lg"
        dense
        @change="updateOut"
      ></u-dimension-input>
      <v-select
        v-model="type"
        :items="items"
        class="px-2 v-input-small"
        flat
        hide-details
        single-line
        label="Type"
        variant="outlined"
        rounded="lg"
        density="compact"
        @update:model-value="updateOut"
      ></v-select>
      <u-color-selector
        v-model="color"
        class="flex-grow-0 ms-2"
        mode="rgba"
        @change="updateOut"
      ></u-color-selector>
    </div>
  </v-list-item>
</template>

<script>
import UColorSelector from "@selldone/components-vue/ui/color/selector/UColorSelector.vue";
import UDimensionInput from "@selldone/components-vue/ui/dimension/input/UDimensionInput.vue";

export default {
  name: "SLandingStyleBorder",
  components: { UDimensionInput, UColorSelector },
  emits: ["update:modelValue"],
  props: {
    modelValue: {},
    label: {},
    icon: {},
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
      // console.log("updateOut", this.width, this.type, this.color);
      if (
        !this.type ||
        this.type === "none" ||
        !this.width ||
        this.width === "unset"
      )
        return null;
      this.$emit(
        "update:modelValue",
        `${this.width} ${this.type} ${this.color} `,
      );
    },
    assignValue() {
      if (this.modelValue) {
        const arr = this.modelValue.split(" ");
        if (arr.length > 0) this.width = arr[0];
        if (arr.length > 1) this.type = arr[1];
        if (arr.length > 2) this.color = arr.slice(2).join(" "); //Other is color rgb(xx, xx, xx) !
      } else {
        this.width = null;
        this.type = null;
        this.color = null;
      }
    },
  },
  created() {
    this.assignValue();
  },
};
</script>

<style lang="scss" scoped>
.s--landing-style-border {
  .-label {
    font-size: 0.8rem;
  }
}
</style>
