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
  <s-setting-expandable :value="value" icon="margin" title="Margin">
    <template v-slot:title>
      <s-setting-chip :value="marginLeft" label="Left"></s-setting-chip>

      <s-setting-chip :value="marginRight" label="Right"></s-setting-chip>

      <s-setting-chip :value="marginTop" label="Top"></s-setting-chip>

      <s-setting-chip :value="marginBottom" label="Bottom"></s-setting-chip>
    </template>

    <s-landing-style-preview
      :model-value="inputStyle"
      class="mb-5"
      margin
      @click:area="(val) => $emit('click:area', val)"
    ></s-landing-style-preview>

    <s-setting-group
      title="Margin"
      icon="margin"
      subtitle="In CSS, a margin is the space around an element's border, while padding is the space between an element's border and the element's content."
    ></s-setting-group>

    <v-row dense>
      <v-col cols="6">
        <s-setting-size
          :model-value="marginLeft"
          @update:model-value="(v) => $emit('update:marginLeft', v)"
          clearable
          label="Left"
          :default-value="computedStyle?.marginLeft"
        ></s-setting-size>
      </v-col>
      <v-col cols="6">
        <s-setting-size
          :model-value="marginRight"
          @update:model-value="(v) => $emit('update:marginRight', v)"
          clearable
          label="Right"
          :default-value="computedStyle?.marginRight"
        ></s-setting-size>
      </v-col>
      <v-col cols="6">
        <s-setting-size
          :model-value="marginTop"
          @update:model-value="(v) => $emit('update:marginTop', v)"
          clearable
          label="Top"
          :default-value="computedStyle?.marginTop"
        ></s-setting-size>
      </v-col>
      <v-col cols="6">
        <s-setting-size
          :model-value="marginBottom"
          @update:model-value="(v) => $emit('update:marginBottom', v)"
          clearable
          label="Bottom"
          :default-value="computedStyle?.marginBottom"
        ></s-setting-size>
      </v-col>
    </v-row>
  </s-setting-expandable>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import SSettingGroup from "@selldone/page-builder/styler/settings/group/SSettingGroup.vue";
import SLandingStylePreview from "@selldone/page-builder/components/style/preview/SLandingStylePreview.vue";
import SSettingExpandable from "@selldone/page-builder/styler/settings/expandable/SSettingExpandable.vue";
import SSettingSize from "@selldone/page-builder/styler/settings/size/SSettingSize.vue";
import SSettingChip from "@selldone/page-builder/styler/settings/chip/SSettingChip.vue";

export default defineComponent({
  name: "LSettingsStyleMargin",
  components: {
    SSettingChip,
    SSettingSize,
    SSettingExpandable,
    SLandingStylePreview,
    SSettingGroup,
  },
  emits: [
    "update:marginLeft",
    "update:marginRight",
    "update:marginTop",
    "update:marginBottom",
    "click:area",
  ],
  props: {
    value: {},
    inputStyle: {},
    computedStyle: {
      type: CSSStyleDeclaration,
    },
    marginLeft: {},
    marginRight: {},

    marginTop: {},
    marginBottom: {},
  },
});
</script>

<style scoped lang="scss"></style>
