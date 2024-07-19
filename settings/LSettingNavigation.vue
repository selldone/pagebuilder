<!--
  - Copyright (c) 2024. Selldone® Business OS™
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
  <v-navigation-drawer
    :model-value="modelValue"
    @update:model-value="(val) => $emit('update:modelValue', val)"
    :scrim="false"
    :width="
      $vuetify.display.xlAndUp ? 560 : $vuetify.display.lgAndUp ? 520 : 340
    "
    class="x-page-builder-options-slider"
    color="#1e1e1e"
    location="right"
    temporary
    theme="dark"
  >
    <slot></slot>
  </v-navigation-drawer>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "LSettingNavigation",
  props: {
    modelValue: {},
  },
});
</script>

<style lang="scss">
// Global setting drawer: (Important)
.x-page-builder-options-slider {
  z-index: 999;
  --background: #1e1e1e; // For nested components like <s-fade-scroll>

  .v-list-subheader {
    .v-list-subheader__text {
      text-wrap: wrap !important;
    }
  }

  @media (max-width: 620px) {
    font-size: 12px;

    .v-list-subheader {
      font-size: 10px;
    }
  }
}
</style>
