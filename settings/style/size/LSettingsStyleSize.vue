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
  <s-setting-expandable :value="value" icon="fit_screen" title="Size">
    <template v-slot:title>
      <s-setting-chip
        :value="width"
        icon="fullscreen"
        label="W"
      ></s-setting-chip>

      <s-setting-chip
        :value="minWidth"
        icon="fullscreen_exit"
        label="W"
      ></s-setting-chip>

      <s-setting-chip
        :value="maxWidth"
        icon="crop_free"
        label="W"
      ></s-setting-chip>

      <s-setting-chip
        :value="height"
        icon="fullscreen"
        label="H"
      ></s-setting-chip>

      <s-setting-chip
        :value="minHeight"
        icon="fullscreen_exit"
        label="H"
      ></s-setting-chip>

      <s-setting-chip
        :value="maxHeight"
        icon="crop_free"
        label="H"
      ></s-setting-chip>
    </template>
    <s-landing-style-preview
      v-if="!noPreview"
      :model-value="inputStyle"
      class="mb-5"
      size
      @click:area="(val) => $emit('click:area', val)"
    ></s-landing-style-preview>

    <s-setting-group
      icon="fullscreen"
      title="Preferred size"
      subtitle="The element will have this size by default."
    >
    </s-setting-group>
    <v-row dense>
      <v-col cols="6">
        <s-setting-size
          :model-value="width"
          @update:model-value="(v) => $emit('update:width', v)"
          label="Width"
          icon="height"
          icon-class="rotate-90-s"
          :default-value="computedStyle?.width"
        ></s-setting-size>
      </v-col>
      <v-col cols="6">
        <s-setting-size
          :model-value="height"
          @update:model-value="(v) => $emit('update:height', v)"
          label="Height"
          icon="height"
          :default-value="computedStyle?.height"
        ></s-setting-size>
      </v-col>
    </v-row>

    <s-setting-group
      icon="fullscreen_exit"
      title="Minimum size"
      subtitle="The element is forced to have this minimum size."
    >
    </s-setting-group>
    <v-row dense>
      <v-col cols="6">
        <s-setting-size
          :model-value="minWidth"
          @update:model-value="(v) => $emit('update:minWidth', v)"
          label="Min W"
          icon="height"
          icon-class="rotate-90-s"
          :default-value="computedStyle?.minWidth"
        ></s-setting-size>
      </v-col>
      <v-col cols="6">
        <s-setting-size
          :model-value="minHeight"
          @update:model-value="(v) => $emit('update:minHeight', v)"
          label="Min H"
          icon="height"
          :default-value="computedStyle?.minHeight"
        ></s-setting-size>
      </v-col>
    </v-row>

    <s-setting-group
      icon="crop_free"
      title="Maximum size"
      subtitle="The element size will be limited to these constraints."
    >
    </s-setting-group>
    <v-row dense>
      <v-col cols="6">
        <s-setting-size
          :model-value="maxWidth"
          @update:model-value="(v) => $emit('update:maxWidth', v)"
          label="Max W"
          icon="height"
          icon-class="rotate-90-s"
          :default-value="computedStyle?.maxWidth"
        ></s-setting-size>
      </v-col>
      <v-col cols="6">
        <s-setting-size
          :model-value="maxHeight"
          @update:model-value="(v) => $emit('update:maxHeight', v)"
          label="Max H"
          icon="height"
          :default-value="computedStyle?.maxHeight"
        ></s-setting-size>
      </v-col>
    </v-row>

    <div class="py-5 small">
      <v-icon>help_outline</v-icon>
      <b>Relative Units</b>
      <ul>
        <li>
          <v-chip
            size="x-small"
            label
            density="comfortable"
            variant="flat"
            color="#fff"
            ><b>EM</b></v-chip
          >
          Relative to the parent element
        </li>

        <li>
          <v-chip
            size="x-small"
            label
            density="comfortable"
            variant="flat"
            color="#fff"
            ><b>REM</b></v-chip
          >
          Relative to the root element (HTML tag)
        </li>

        <li>
          <v-chip
            size="x-small"
            label
            density="comfortable"
            variant="flat"
            color="#fff"
            ><b>%</b></v-chip
          >
          Relative to the parent element
        </li>

        <li>
          <v-chip
            size="x-small"
            label
            density="comfortable"
            variant="flat"
            color="#fff"
            ><b>VW</b></v-chip
          >
          Relative to the viewport’s width
        </li>

        <li>
          <v-chip
            size="x-small"
            label
            density="comfortable"
            variant="flat"
            color="#fff"
            ><b>VH</b></v-chip
          >
          Relative to the viewport’s height
        </li>
      </ul>
    </div>
  </s-setting-expandable>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import SSettingGroup from "@selldone/page-builder/styler/settings/group/SSettingGroup.vue";
import SSettingSize from "@selldone/page-builder/styler/settings/size/SSettingSize.vue";
import SLandingStylePreview from "@selldone/page-builder/components/style/preview/SLandingStylePreview.vue";
import SSettingExpandable from "@selldone/page-builder/styler/settings/expandable/SSettingExpandable.vue";
import SSettingChip from "@selldone/page-builder/styler/settings/chip/SSettingChip.vue";

export default defineComponent({
  name: "LSettingsStyleSize",
  components: {
    SSettingChip,
    SSettingExpandable,
    SLandingStylePreview,
    SSettingSize,
    SSettingGroup,
  },
  emits: [
    "update:width",
    "update:height",
    "update:minWidth",
    "update:minHeight",
    "update:maxWidth",
    "update:maxHeight",
    "click:area",
  ],
  props: {
    value: {},
    inputStyle: {},
    computedStyle: {
      type: CSSStyleDeclaration,
    },

    width: {},
    height: {},

    minWidth: {},
    minHeight: {},

    maxWidth: {},
    maxHeight: {},
    noPreview: Boolean,
  },
});
</script>

<style scoped lang="scss"></style>
