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
    v-model="modelValue.data.slidesPerView"
    :disabled="!enable"
    :max="10"
    :min="1"
    clearable
    has-auto
    icon="view_carousel"
    title="Slide per view"
  >
    <v-expansion-panels>
      <s-setting-expandable
        :tags="tags"
        bg-color="transparent"
        icon="subdirectory_arrow_right"
        title="Responsive"
      >
        <s-setting-number-select
          v-model="modelValue.data.slidesPerViewLg"
          :max="10"
          :min="1"
          clearable
          has-auto
          icon="desktop_windows"
          title="Large screen"
        >
        </s-setting-number-select>

        <s-setting-number-select
          v-model="modelValue.data.slidesPerViewMd"
          :max="10"
          :min="1"
          clearable
          has-auto
          icon="laptop"
          title="Medium screen"
        >
        </s-setting-number-select>

        <s-setting-number-select
          v-model="modelValue.data.slidesPerViewSm"
          :max="10"
          :min="1"
          clearable
          has-auto
          icon="smartphone"
          title="Small screen"
        >
        </s-setting-number-select>
      </s-setting-expandable>
    </v-expansion-panels>
  </s-setting-number-select>
</template>

<script>
import { defineComponent } from "vue";
import SSettingNumberSelect from "../../../../styler/settings/number-select/SSettingNumberSelect.vue";
import SSettingExpandable from "../../../../styler/settings/expandable/SSettingExpandable.vue";
import {XSwiperObject} from "@selldone/page-builder/components/x/swiper/XSwiperObject.ts";

export default defineComponent({
  name: "OSwiperSlidesPerView",
  components: { SSettingExpandable, SSettingNumberSelect },
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
        "panorama",
        "carousel",
        "material",
      ].includes(this.modelValue.data.effect);
    },

    tags() {
      const out = [];

      if (this.modelValue.data.slidesPerViewLg) {
        out.push(`lg: ${this.modelValue.data.slidesPerViewLg}`);
      }
      if (this.modelValue.data.slidesPerViewMd) {
        out.push(`md: ${this.modelValue.data.slidesPerViewMd}`);
      }
      if (this.modelValue.data.slidesPerViewSm) {
        out.push(`sm: ${this.modelValue.data.slidesPerViewSm}`);
      }
      return out;
    },
  },
  watch: {
    enable(enable) {
      if (!enable) this.modelValue.data.slidesPerView = 1; // Reset to default!
    },
  },
  created() {
    if (!this.modelValue.data.slidesPerView) this.modelValue.data.slidesPerView = 1;
  },
});
</script>

<style lang="scss" scoped></style>
