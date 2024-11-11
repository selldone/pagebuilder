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
  <s-setting-slider
    v-model="modelValue.data.spaceBetween"
    :disabled="!enable"
    :max="100"
    :min="0"
    icon="space_bar"
    suffix="px"
    label="Space between"
  >
  </s-setting-slider>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import SSettingSlider from "../../../../styler/settings/slider/SSettingSlider.vue";
import {XSwiperObject} from "@selldone/page-builder/components/x/swiper/XSwiperObject.ts";

export default defineComponent({
  name: "OSwiperSpaceBetween",
  components: { SSettingSlider },
  props: {
    modelValue: {
      type: XSwiperObject,
      required: true,
    },
  },
  computed: {
    enable() {
      return [
        "slide",
        "coverflow",
        "cards",
        "panorama",
        "carousel",
        "material",
      ].includes(this.modelValue.data.effect);
    },
  },
  watch: {},
  created() {
    if (!this.modelValue.data.spaceBetween) this.modelValue.data.spaceBetween = 0;
  },
});
</script>

<style lang="scss" scoped></style>
