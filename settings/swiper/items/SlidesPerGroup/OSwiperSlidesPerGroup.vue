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
  <s-setting-number-select
    v-model="modelValue.data.slidesPerGroup"
    :disabled="!enable"
    :max="10"
    :min="1"
    clearable
    has-auto
    icon="view_carousel"
    title="Slide per group"
  >
  </s-setting-number-select>
</template>

<script>
import { defineComponent } from "vue";
import SSettingNumberSelect from "../../../../styler/settings/number-select/SSettingNumberSelect.vue";
import { XSwiperObject } from "@selldone/page-builder/components/x/swiper/XSwiperObject.ts";

export default defineComponent({
  name: "OSwiperSlidesPerGroup",
  components: { SSettingNumberSelect },
  props: {
    modelValue: {
      type: XSwiperObject,
      required: true,
    },
  },
  computed: {
    enable() {
      return ["slide", "coverflow", "panorama"].includes(
        this.modelValue.data.effect,
      );
    },
  },
  watch: {
    enable(enable) {
      if (!enable) this.modelValue.data.slidesPerGroup = 1; // Reset to default!
    },
  },
  created() {
    if (!this.modelValue.data.slidesPerGroup) this.modelValue.data.slidesPerGroup = 1;
  },
});
</script>

<style lang="scss" scoped></style>
