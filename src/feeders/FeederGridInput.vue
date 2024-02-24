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
  <div class="d-flex align-center justify-space-around">
    <responsive-size-selector
      v-model="grid.mobile"
      icon="smartphone"
      label="Mobile"
      @update:modelValue="update"
    ></responsive-size-selector>
    <responsive-size-selector
      v-model="grid.tablet"
      icon="tablet_mac"
      label="Tablet"
      @update:modelValue="update"
    ></responsive-size-selector>
    <responsive-size-selector
      v-model="grid.desktop"
      icon="laptop"
      label="Desktop"
      @update:modelValue="update"
    ></responsive-size-selector>
    <responsive-size-selector
      v-model="grid.widescreen"
      icon="desktop_windows"
      label="Widescreen"
      @update:modelValue="update"
    ></responsive-size-selector>
  </div>
</template>

<script>
import ResponsiveSizeSelector from "@app-page-builder/src/feeders/widgets/ResponsiveSizeSelector.vue";

export default {
  name: "FeederGridInput",
  components: { ResponsiveSizeSelector },
  props: {
    grid: { required: true },
  },
  methods: {
    update() {
      this.$emit("grid:update", this.grid);
    },
  },
};
</script>

<style scoped></style>
