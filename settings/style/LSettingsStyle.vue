<!--
  - Copyright (c) 2023-2024. Selldone® Business OS™
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
  <v-expansion-panels
    v-model="Selected_tab"
    flat
    class="border-between-vertical"
    style="--border-color: #999"
  >
    <!-- ████████████████████ Size ████████████████████ -->

    <l-settings-style-size
      value="size"
      :inputStyle="modelValue"
      :computedStyle="computedStyle"
      @click:area="(val) => (Selected_tab = val)"
      v-model:width="modelValue.width"
      v-model:height="modelValue.height"
      v-model:minWidth="modelValue.minWidth"
      v-model:minHeight="modelValue.minHeight"
      v-model:maxWidth="modelValue.maxWidth"
      v-model:maxHeight="modelValue.maxHeight"
    ></l-settings-style-size>

    <!-- ████████████████████ Padding ████████████████████ -->

    <l-settings-style-padding
      value="padding"
      :inputStyle="modelValue"
      :computedStyle="computedStyle"
      @click:area="(val) => (Selected_tab = val)"
      v-model:paddingLeft="modelValue.paddingLeft"
      v-model:paddingRight="modelValue.paddingRight"
      v-model:paddingTop="modelValue.paddingTop"
      v-model:paddingBottom="modelValue.paddingBottom"
    >
    </l-settings-style-padding>

    <!-- ████████████████████ Margin ████████████████████ -->

    <l-settings-style-margin
      value="margin"
      :inputStyle="modelValue"
      :computedStyle="computedStyle"
      @click:area="(val) => (Selected_tab = val)"
      v-model:marginLeft="modelValue.marginLeft"
      v-model:marginRight="modelValue.marginRight"
      v-model:marginTop="modelValue.marginTop"
      v-model:marginBottom="modelValue.marginBottom"
    >
    </l-settings-style-margin>

    <!-- ████████████████████ Position ████████████████████ -->

    <l-settings-style-position
      value="position"
      :inputStyle="modelValue"
      :computedStyle="computedStyle"
      @click:area="(val) => (Selected_tab = val)"
      v-model:position="modelValue.position"
      v-model:top="modelValue.top"
      v-model:left="modelValue.left"
      v-model:bottom="modelValue.bottom"
      v-model:right="modelValue.right"
      v-model:z-index="modelValue.z_index"
    >
    </l-settings-style-position>

    <!-- ████████████████████ Display ████████████████████ -->

    <l-settings-style-display
      value="display"
      :inputStyle="modelValue"
      :computedStyle="computedStyle"
      v-model:display="modelValue.display"
      v-model:flexDirection="modelValue.flexDirection"
      v-model:flexWrap="modelValue.flexWrap"
      v-model:flexGrow="modelValue.flexGrow"

      v-model:gridTemplateColumns="modelValue.gridTemplateColumns"
      v-model:gridTemplateRows="modelValue.gridTemplateRows"
      v-model:gap="modelValue.gap"

      v-model:alignItems="modelValue.alignItems"
      v-model:justifyContent="modelValue.justifyContent"

    >
    </l-settings-style-display>

    <!-- ████████████████████ Border ████████████████████ -->

    <l-settings-style-border
      value="border"
      :inputStyle="modelValue"
      @click:area="(val) => (Selected_tab = val)"
      v-model:borderLeft="modelValue.borderLeft"
      v-model:borderRight="modelValue.borderRight"
      v-model:borderTop="modelValue.borderTop"
      v-model:borderBottom="modelValue.borderBottom"
      v-model:borderRadius="modelValue.borderRadius"
    >
    </l-settings-style-border>

    <!-- ████████████████████ Typeface ████████████████████ -->
    <l-settings-style-typeface
      value="typeface"
      :inputStyle="modelValue"
      :computedStyle="computedStyle"
      v-model:color="modelValue.color"
      v-model:fontFamily="modelValue.fontFamily"
      v-model:fontSize="modelValue.fontSize"
      v-model:fontWeight="modelValue.fontWeight"
      v-model:fontStyle="modelValue.fontStyle"
      v-model:fontVariant="modelValue.fontVariant"
      v-model:lineHeight="modelValue.lineHeight"
      v-model:letterSpacing="modelValue.letterSpacing"
      v-model:textAlign="modelValue.textAlign"
      v-model:textDecoration="modelValue.textDecoration"
      v-model:textTransform="modelValue.textTransform"
      v-model:textShadow="modelValue.textShadow"
      @change="onChange"
    >
    </l-settings-style-typeface>

    <!-- ████████████████████ Shadow ████████████████████ -->
    <l-settings-style-box-shadow
      value="shadow"
      :inputStyle="modelValue"
      v-model:boxShadow="modelValue.boxShadow"
    >
    </l-settings-style-box-shadow>

    <!-- ████████████████████ Filter ████████████████████ -->
    <l-settings-style-filter
      value="filter"
      :inputStyle="modelValue"
      v-model:filter="modelValue.filter"
      :preview-image="
        options?.prev_image ? getShopImagePath(options.prev_image) : undefined
      "
    >
    </l-settings-style-filter>

    <!-- ████████████████████ Transform ████████████████████ -->
    <l-settings-style-transform
      value="transform"
      :inputStyle="modelValue"
      v-model:transform="modelValue.transform"
    >
    </l-settings-style-transform>
  </v-expansion-panels>
</template>

<script lang="ts">
import { LMixinEvents } from "../../mixins/events/LMixinEvents";
import LSettingsStyleSize from "@selldone/page-builder/settings/style/size/LSettingsStyleSize.vue";
import LSettingsStylePadding from "@selldone/page-builder/settings/style/padding/LSettingsStylePadding.vue";
import LSettingsStyleMargin from "@selldone/page-builder/settings/style/margin/LSettingsStyleMargin.vue";
import LSettingsStylePosition from "@selldone/page-builder/settings/style/position/LSettingsStylePosition.vue";
import LSettingsStyleBorder from "@selldone/page-builder/settings/style/border/LSettingsStyleBorder.vue";
import LSettingsStyleBoxShadow from "@selldone/page-builder/settings/style/shadow/LSettingsStyleBoxShadow.vue";
import LSettingsStyleTransform from "@selldone/page-builder/settings/style/transform/LSettingsStyleTransform.vue";
import LSettingsStyleFilter from "@selldone/page-builder/settings/style/filter/LSettingsStyleFilter.vue";
import LSettingsStyleTypeface from "@selldone/page-builder/settings/style/typeface/LSettingsStyleTypeface.vue";
import LSettingsStyleDisplay from "@selldone/page-builder/settings/style/display/LSettingsStyleDisplay.vue";

export default {
  name: "LSettingsStyle",
  mixins: [LMixinEvents],
  components: {
    LSettingsStyleDisplay,
    LSettingsStyleTypeface,
    LSettingsStyleFilter,
    LSettingsStyleTransform,
    LSettingsStyleBoxShadow,
    LSettingsStyleBorder,
    LSettingsStylePosition,
    LSettingsStyleMargin,
    LSettingsStylePadding,
    LSettingsStyleSize,
  },
  inject: ["$builder"],
  props: {
    /**
     * Style object
     */
    modelValue: {},
    options: {},
    targetElement: {},
  },
  data: () => ({
    Selected_tab: null,
    computedStyle: null,
  }),

  computed: {},

  watch: {
    modelValue() {
      this.init();
    },
  },
  created() {
    this.init();
  },
  mounted() {},
  beforeUnmount() {},

  methods: {
    init() {
      // Get the computed styles
      this.computedStyle = window.getComputedStyle(this.targetElement);
    },
  },
};
</script>

<style lang="scss" scoped></style>
