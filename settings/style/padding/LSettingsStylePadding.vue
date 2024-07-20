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
  <s-setting-expandable :value="value" icon="padding" title="Padding">
    <template v-slot:title>
      <v-chip
        v-if="paddingLeft && paddingLeft !== 'unset'"
        class="ms-1"
        color="#000"
        label
        size="x-small"
        density="comfortable"
        variant="flat"
        >Left: {{ paddingLeft }}
      </v-chip>
      <v-chip
        v-if="paddingRight && paddingRight !== 'unset'"
        class="ms-1"
        color="#000"
        label
        size="x-small"
        density="comfortable"
        variant="flat"
        >Right: {{ paddingRight }}
      </v-chip>
      <v-chip
        v-if="paddingTop && paddingTop !== 'unset'"
        class="ms-1"
        color="#000"
        label
        size="x-small"
        density="comfortable"
        variant="flat"
        >Top: {{ paddingTop }}
      </v-chip>
      <v-chip
        v-if="paddingBottom && paddingBottom !== 'unset'"
        class="ms-1"
        color="#000"
        label
        size="x-small"
        density="comfortable"
        variant="flat"
        >Bottom: {{ paddingBottom }}
      </v-chip>
    </template>

    <s-landing-style-preview
      :model-value="inputStyle"
      class="mb-5"
      padding
      @click:area="(val) => $emit('click:area', val)"
    ></s-landing-style-preview>

    <s-setting-group
      icon="padding"
      title="Padding"
      subtitle="An element's padding area is the space between its content and its border."
    >
    </s-setting-group>

    <v-row dense>
      <v-col cols="6">
        <s-setting-size
          :model-value="paddingLeft"
          @update:model-value="(v) => $emit('update:paddingLeft', v)"
          clearable
          label="Left"
          :default-value="computedStyle?.paddingLeft"
        ></s-setting-size>
      </v-col>
      <v-col cols="6">
        <s-setting-size
          :model-value="paddingRight"
          @update:model-value="(v) => $emit('update:paddingRight', v)"
          clearable
          label="Right"
          :default-value="computedStyle?.paddingRight"
        ></s-setting-size>
      </v-col>
      <v-col cols="6">
        <s-setting-size
          :model-value="paddingTop"
          @update:model-value="(v) => $emit('update:paddingTop', v)"
          clearable
          label="Top"
          :default-value="computedStyle?.paddingTop"
        ></s-setting-size>
      </v-col>
      <v-col cols="6">
        <s-setting-size
          :model-value="paddingBottom"
          @update:model-value="(v) => $emit('update:paddingBottom', v)"
          clearable
          label="Bottom"
          :default-value="computedStyle?.paddingBottom"
        ></s-setting-size>
      </v-col>
    </v-row>
  </s-setting-expandable>
</template>

<script>
import { defineComponent } from "vue";
import SSettingGroup from "@selldone/page-builder/styler/settings/group/SSettingGroup.vue";
import SLandingStylePreview from "@selldone/page-builder/components/style/preview/SLandingStylePreview.vue";
import SSettingExpandable from "@selldone/page-builder/styler/settings/expandable/SSettingExpandable.vue";
import SSettingSize from "@selldone/page-builder/styler/settings/size/SSettingSize.vue";

export default defineComponent({
  name: "LSettingsStylePadding",
  components: {
    SSettingSize,
    SSettingExpandable,
    SLandingStylePreview,
    SSettingGroup,
  },

  emits: [
    "update:paddingLeft",
    "update:paddingRight",
    "update:paddingTop",
    "update:paddingBottom",
    "click:area",
  ],

  props: {
    value:{},
    inputStyle: {},
    computedStyle: {
      type: CSSStyleDeclaration,
    },
    paddingLeft: {},
    paddingRight: {},

    paddingTop: {},
    paddingBottom: {},
  },
});
</script>

<style scoped lang="scss"></style>
