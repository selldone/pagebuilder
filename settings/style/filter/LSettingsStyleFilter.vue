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
  <s-setting-expandable :value="value" icon="movie_filter" title="Filter">
    <template v-slot:title>
      <s-setting-chip
        v-if="filter"
        value="Has Filter"
        icon="photo_filter"
      ></s-setting-chip>
    </template>

    <s-landing-style-filter
      :model-value="filter"
      @update:model-value="(v) => $emit('update:filter', v)"
      :preview-image="previewImage"
      show-preview
    ></s-landing-style-filter>
  </s-setting-expandable>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import SSettingExpandable from "@selldone/page-builder/styler/settings/expandable/SSettingExpandable.vue";
import SLandingStyleFilter from "@selldone/page-builder/components/style/filter/SLandingStyleFilter.vue";
import SSettingChip from "@selldone/page-builder/styler/settings/chip/SSettingChip.vue";

export default defineComponent({
  name: "LSettingsStyleFilter",
  components: {
    SSettingChip,
    SLandingStyleFilter,
    SSettingExpandable,
  },
  emits: [],
  props: {
    value: {},

    inputStyle: {},

    filter: {},
    previewImage: Boolean,
  },
});
</script>

<style scoped lang="scss"></style>
