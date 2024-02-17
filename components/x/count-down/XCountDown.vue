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
  <s-count-down v-if="end" :end="end.convertToLocalDate()"> </s-count-down>
</template>

<script>
import { defineComponent } from "vue";
import SCountDown from "@components/ui/count-down/SCountDown.vue";

export default defineComponent({
  name: "XCountDown",
  components: { SCountDown },
  props: {
    end: {},
  },
});
</script>

<style scoped lang="scss"></style>
