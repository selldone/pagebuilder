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
    v-model="modelValue.slidesPerView"
    title="Slide per view"
    icon="view_carousel"
    has-auto
    :disabled="!enable"
    :min="1"
    :max="10"
  >
    <s-setting-expandable
      title="Responsive"
      icon="subdirectory_arrow_right"
      bg-color="transparent"
      :tags="tags"
    >
      <s-setting-number-select
        v-model="modelValue.slidesPerViewLg"
        title="Large screen"
        icon="desktop_windows"
        clearable
        has-auto
        :min="1"
        :max="10"
      >
      </s-setting-number-select>

      <s-setting-number-select
        v-model="modelValue.slidesPerViewMd"
        title="Medium screen"
        icon="laptop"
        clearable
        has-auto
        :min="1"
        :max="10"
      >
      </s-setting-number-select>

      <s-setting-number-select
        v-model="modelValue.slidesPerViewSm"
        title="Small screen"
        icon="smartphone"
        clearable
        has-auto
        :min="1"
        :max="10"
      >
      </s-setting-number-select>
    </s-setting-expandable>
  </s-setting-number-select>
</template>

<script>
import { defineComponent } from "vue";
import SSettingNumberSelect from "@app-page-builder/styler/settings/number-select/SSettingNumberSelect.vue";
import SSettingExpandable from "@app-page-builder/styler/settings/expandable/SSettingExpandable.vue";

export default defineComponent({
  name: "OSwiperSlidesPerView",
  components: { SSettingExpandable, SSettingNumberSelect },
  props: {
    modelValue: {
      type: Boolean,
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
      ].includes(this.modelValue.effect);
    },

    tags() {
      const out = [];

      if (this.modelValue.slidesPerViewLg) {
        out.push(`lg: ${this.modelValue.slidesPerViewLg}`);
      }
      if (this.modelValue.slidesPerViewMd) {
        out.push(`md: ${this.modelValue.slidesPerViewMd}`);
      }
      if (this.modelValue.slidesPerViewSm) {
        out.push(`sm: ${this.modelValue.slidesPerViewSm}`);
      }
      return out;
    },
  },
  watch: {
    enable(enable) {
      if (!enable) this.modelValue.slidesPerView = 1; // Reset to default!
    },
  },
  created() {
    if (!this.modelValue.slidesPerView) this.modelValue.slidesPerView = 1;
  },
});
</script>

<style scoped lang="scss"></style>
