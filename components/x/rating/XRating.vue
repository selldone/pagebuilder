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
  <v-rating
    v-if="value"
    :model-value="value"
    density="compact"
    readonly
    color="amber"
  ></v-rating>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
  name: "XRating",
  components: {},
  props: {
    value: {},
  },
});
</script>

<style scoped lang="scss"></style>
