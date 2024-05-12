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
    :disabled="!enable"
    :max="10"
    :min="1"
    has-auto
    icon="view_carousel"
    title="Slide per view"
  >
    <s-setting-expandable
      :tags="tags"
      bg-color="transparent"
      icon="subdirectory_arrow_right"
      title="Responsive"
    >
      <s-setting-number-select
        v-model="modelValue.slidesPerViewLg"
        :max="10"
        :min="1"
        clearable
        has-auto
        icon="desktop_windows"
        title="Large screen"
      >
      </s-setting-number-select>

      <s-setting-number-select
        v-model="modelValue.slidesPerViewMd"
        :max="10"
        :min="1"
        clearable
        has-auto
        icon="laptop"
        title="Medium screen"
      >
      </s-setting-number-select>

      <s-setting-number-select
        v-model="modelValue.slidesPerViewSm"
        :max="10"
        :min="1"
        clearable
        has-auto
        icon="smartphone"
        title="Small screen"
      >
      </s-setting-number-select>
    </s-setting-expandable>
  </s-setting-number-select>
</template>

<script>
import { defineComponent } from "vue";
import SSettingNumberSelect from "../../../../styler/settings/number-select/SSettingNumberSelect.vue";
import SSettingExpandable from "../../../../styler/settings/expandable/SSettingExpandable.vue";

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

<style lang="scss" scoped></style>
