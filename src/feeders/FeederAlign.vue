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
  <v-btn-toggle
    :value="value"
    @change="(val) => $emit('input', val)"
    class="m-3"
    active-class="blue-flat"
  >
    <v-btn
      v-for="it in ALIGN"
      :key="it.val"
      :value="it.val"
      :caption="it.title"
      :title="it.title"
      class="sub-caption -hover b-12px"
      icon
    >
      <v-icon class="flip-image-rtl" size="20">{{ it.icon }}</v-icon>
    </v-btn>
  </v-btn-toggle>
</template>

<script>
import ALIGN from "@app-page-builder/src/enums/ALIGN";

export default {
  name: "FeederAlign",
  components: {},
  props: {
    value: {},
  },
  data: () => {
    return {
      ALIGN: ALIGN,
    };
  },
  methods: {
    update() {
      this.$emit("grid:update", this.grid);
    },
  },
};
</script>

<style scoped></style>
