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
  <s-setting-expandable :value="value" icon="view_quilt" title="Layout">
    <template v-slot:title>
      <s-setting-chip
        :value="display"
        icon="pivot_table_chart"
      ></s-setting-chip>

      <s-setting-chip
        :value="flexDirection"
        label="Direction"
        icon="arrow_right_alt"
        v-if="isFlex"
      ></s-setting-chip>
      <s-setting-chip
        :value="flexWrap"
        v-if="isFlex"
        icon="view_compact"
      ></s-setting-chip>

      <s-setting-chip
        :value="alignItems"
        label="Align"
        icon="vertical_distribute"
      ></s-setting-chip>

      <s-setting-chip
        :value="justifyContent"
        label="Justify"
        icon="horizontal_distribute"
      ></s-setting-chip>

      <s-setting-chip :value="flexGrow" label="Grow"></s-setting-chip>

      <s-setting-chip
        :value="gridTemplateColumns"
        label="Grid Columns"
        icon="grid_on"
        v-if="isGrid"
      ></s-setting-chip>
      <s-setting-chip
        :value="gridTemplateRows"
        label="Grid Rows"
        icon="grid_on"
        v-if="isGrid"
      ></s-setting-chip>
      <s-setting-chip
        :value="gap"
        label="Gap"
        icon="grid_view"
      ></s-setting-chip>
    </template>


    <s-setting-toggle
      :model-value="display"
      @update:model-value="(v) => $emit('update:display', v)"
      :items="DISPLAY"
      label="Display"
      icon="pivot_table_chart"
      clearable
      :default-value="computedStyle?.display"
    ></s-setting-toggle>

    <v-expand-transition group>
      <div v-if="isFlex">
        <s-setting-toggle
          :model-value="flexDirection"
          @update:model-value="(v) => $emit('update:flexDirection', v)"
          :items="FLEX_DIRECTIONS"
          label="Flex Direction"
          icon="arrow_right_alt"
          clearable
          :default-value="computedStyle?.flexDirection"
        ></s-setting-toggle>

        <s-setting-toggle
          :model-value="flexWrap"
          @update:model-value="(v) => $emit('update:flexWrap', v)"
          :items="FLEX_WRAPS"
          label="Flex Wrap"
          icon="view_compact"
          clearable
          :default-value="computedStyle?.flexWrap"
        ></s-setting-toggle>

        <s-setting-align-input
          label="Align"
          icon="view_timeline"
          :align="alignItems"
          @update:align="(v) => $emit('update:alignItems', v)"
          :justify="justifyContent"
          @update:justify="(v) => $emit('update:justifyContent', v)"
          :defaultAlign="computedStyle.alignItems"
          :defaultJustify="computedStyle.justifyContent"
        ></s-setting-align-input>
      </div>

      <div v-else-if="isGrid">
        <s-setting-text-input
          :model-value="gridTemplateColumns"
          @update:model-value="(v) => $emit('update:gridTemplateColumns', v)"
          label="Grid Template Columns"
          icon="grid_on"
          clearable
          :default-value="computedStyle?.gridTemplateColumns"
          :samples="GRID_TEMPLATE_COLUMNS"
        ></s-setting-text-input>

        <s-setting-text-input
          :model-value="gridTemplateRows"
          @update:model-value="(v) => $emit('update:gridTemplateRows', v)"
          label="Grid Template Rows"
          icon="grid_on"
          clearable
          :default-value="computedStyle?.gridTemplateRows"
          :samples="GRID_TEMPLATE_ROWS"
        ></s-setting-text-input>
      </div>
    </v-expand-transition>

    <s-setting-size
      :model-value="gap"
      @update:model-value="(v) => $emit('update:gap', v)"
      label="Gap"
      icon="grid_view"
      :default-value="computedStyle?.gap"
    ></s-setting-size>

    <s-setting-number-input
      :model-value="flexGrow"
      @update:model-value="(v) => $emit('update:flexGrow', v)"
      label="Flex Grow"
      clearable
      :min="0"
      :max="10"
      :default-value="computedStyle?.flexGrow"
      icon="view_quilt"
    ></s-setting-number-input>
  </s-setting-expandable>
</template>

<script>
import { defineComponent } from "vue";
import SSettingGroup from "@selldone/page-builder/styler/settings/group/SSettingGroup.vue";
import SSettingExpandable from "@selldone/page-builder/styler/settings/expandable/SSettingExpandable.vue";
import SSettingNumberInput from "@selldone/page-builder/styler/settings/number-input/SSettingNumberInput.vue";
import SSettingChip from "@selldone/page-builder/styler/settings/chip/SSettingChip.vue";
import SSettingToggle from "@selldone/page-builder/styler/settings/toggle/SSettingToggle.vue";
import SSettingSize from "@selldone/page-builder/styler/settings/size/SSettingSize.vue";
import SSettingTextInput from "@selldone/page-builder/styler/settings/text-input/SSettingTextInput.vue";
import SSettingAlignInput from "@selldone/page-builder/styler/settings/align/SSettingAlignInput.vue";

const GRID_TEMPLATE_COLUMNS = [
  { title: "1 Column", value: "1fr" },
  { title: "2 Columns (Equal)", value: "1fr 1fr" },
  { title: "3 Columns (Equal)", value: "1fr 1fr 1fr" },
  { title: "4 Columns (Equal)", value: "1fr 1fr 1fr 1fr" },
  { title: "2 Columns (Auto & Fixed)", value: "auto 300px" },
  { title: "3 Columns (Auto, Fr, Fixed)", value: "auto 1fr 200px" },
  { title: "1 Column (Auto)", value: "auto" },
  { title: "2 Columns (Auto)", value: "auto auto" },
  {
    title: "4 Columns (Equal, Minmax)",
    value: "repeat(4, minmax(100px, 1fr))",
  },
  { title: "12 Columns (Responsive)", value: "repeat(12, 1fr)" },
  { title: "Custom", value: "" }, // For custom user input
];

const GRID_TEMPLATE_ROWS = [
  { title: "1 Row", value: "1fr" },
  { title: "2 Rows (Equal)", value: "1fr 1fr" },
  { title: "3 Rows (Equal)", value: "1fr 1fr 1fr" },
  { title: "4 Rows (Equal)", value: "1fr 1fr 1fr 1fr" },
  { title: "2 Rows (Auto & Fixed)", value: "auto 200px" },
  { title: "3 Rows (Auto, Fr, Fixed)", value: "auto 1fr 100px" },
  { title: "1 Row (Auto)", value: "auto" },
  { title: "2 Rows (Auto)", value: "auto auto" },
  { title: "4 Rows (Equal, Minmax)", value: "repeat(4, minmax(50px, 1fr))" },
  { title: "Custom", value: "" }, // For custom user input
];

export default defineComponent({
  name: "LSettingsStyleDisplay",
  components: {
    SSettingAlignInput,
    SSettingTextInput,
    SSettingSize,
    SSettingToggle,
    SSettingChip,
    SSettingNumberInput,

    SSettingExpandable,
    SSettingGroup,
  },
  emits: [
    "update:display",
    "update:flexDirection",
    "update:flexWrap",

    "update:gridTemplateColumns",
    "update:gridTemplateRows",

    "update:flexGrow",
    "update:gap",
  ],
  props: {
    value: {},
    inputStyle: {},
    computedStyle: {
      type: CSSStyleDeclaration,
    },

    display: {},

    flexDirection: {},
    flexWrap: {},
    flexGrow: {},

    gridTemplateColumns: {},
    gridTemplateRows: {},
    gap: {},

    alignItems: {},
    justifyContent: {},
  },
  data: () => ({
    DISPLAY: [
      { text: "Block", value: "block" },
      { text: "Inline", value: "inline" },
      { text: "Inline-Block", value: "inline-block" },
      { text: "Flex", value: "flex" },
      { text: "Grid", value: "grid" },
      { text: "Inline-Flex", value: "inline-flex" },
      { text: "Inline-Grid", value: "inline-grid" },
      { text: "None", value: "none" },
    ],
    FLEX_DIRECTIONS: [
      { text: "Row", value: "row" },
      { text: "Row Reverse", value: "row-reverse" },
      { text: "Column", value: "column" },
      { text: "Column Reverse", value: "column-reverse" },
    ],
    FLEX_WRAPS: [
      { text: "No Wrap", value: "nowrap" },
      { text: "Wrap", value: "wrap" },
    ],

    GRID_TEMPLATE_COLUMNS: GRID_TEMPLATE_COLUMNS,
    GRID_TEMPLATE_ROWS: GRID_TEMPLATE_ROWS,
  }),

  computed: {
    isFlex() {
      return (
        ["flex", "inline-flex"].includes(this.display) ||
        ["flex", "inline-flex"].includes(this.computedStyle?.display)
      );
    },
    isGrid() {
      return this.display === "grid" || this.computedStyle?.display === "grid";
    },
  },
});
</script>

<style scoped lang="scss"></style>
