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
  <s-setting-switch v-model="modelValue.data.loop" icon="repeat" label="Loop">
  </s-setting-switch>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import SSettingSwitch from "../../../../styler/settings/switch/SSettingSwitch.vue";
import { XSwiperObject } from "@selldone/page-builder/components/x/swiper/XSwiperObject.ts";

export default defineComponent({
  name: "OSwiperLoop",
  components: { SSettingSwitch },
  props: {
    modelValue: {
      type: XSwiperObject,
      required: true,
    },
  },
  computed: {},
  watch: {},
  created() {
    if (!this.modelValue.data.loop) this.modelValue.data.loop = false;
  },
});
</script>

<style lang="scss" scoped></style>
