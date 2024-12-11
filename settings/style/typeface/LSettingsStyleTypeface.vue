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
  <s-setting-expandable :value="value" icon="format_size" title="Typeface">
    <template v-slot:title>
      <v-chip
        v-if="color"
        class="ms-1"
        color="#000"
        label
        size="x-small"
        density="comfortable"
        variant="flat"
      >
        <v-icon size="x-small" start :color="color" class="border"
          >circle
        </v-icon>
        {{ color }}
      </v-chip>

      <v-chip
        v-if="textShadow"
        class="ms-1"
        color="#000"
        label
        size="x-small"
        density="comfortable"
        variant="flat"
      >
        <v-icon start>join_right</v-icon>
        <span class="me-1">Shadow</span>
        <v-icon v-for="it in shadow_colors" :color="it">circle</v-icon>
      </v-chip>
    </template>

    <!-- Text Color -->
    <s-setting-color
      :model-value="color"
      @update:model-value="
        (v) => {
          $emit('update:color', v);
          onChange();
        }
      "
      label="Text Color"
      icon="palette"
      clearable
    ></s-setting-color>

    <!-- Font Family -->
    <s-setting-font-family
      :model-value="fontFamily"
      @update:model-value="
        (v) => {
          $emit('update:fontFamily', v);
          onChange();
        }
      "
      :fonts="$builder.style.fonts"
      @update:fonts="
        (v) => {
          $builder.style.fonts = v;
        }
      "
      label="Font Family"
      icon="font_download"
      clearable
      hasAdd
    ></s-setting-font-family>

    <!-- Font Size -->
    <s-setting-size
      :model-value="fontSize"
      @update:model-value="
        (v) => {
          $emit('update:fontSize', v);
          onChange();
        }
      "
      label="Font Size"
      icon="format_size"
      :default-value="computedStyle?.fontSize"
      clearable
    ></s-setting-size>

    <!-- Font Weight -->
    <s-setting-select
      :model-value="fontWeight"
      @update:model-value="
        (v) => {
          $emit('update:fontWeight', v);
          onChange();
        }
      "
      :items="FONT_WEIGHTS"
      clearable
      label="Font Weight"
      icon="format_bold"
      :default-value="computedStyle?.fontWeight"
    ></s-setting-select>

    <!-- Text Wrap -->
    <s-setting-select
        :model-value="textWrap"
        @update:model-value="
        (v) => {
          $emit('update:textWrap', v);
          onChange();
        }
      "
        :items="TEXT_WRAPS"
        clearable
        label="Text Wrap"
        icon="wrap_text"
        :default-value="computedStyle?.textWrap"
    ></s-setting-select>


    <!-- Font Style -->
    <s-setting-toggle
      :model-value="fontStyle"
      @update:model-value="
        (v) => {
          $emit('update:fontStyle', v);
          onChange();
        }
      "
      :items="[
        {
          title: 'Normal',
          icon: 'title',
          value: 'normal',
        },
        {
          title: 'Italic',
          icon: 'format_italic',
          value: 'italic',
        },
      ]"
      label="Font Style"
      mandatory
    ></s-setting-toggle>

    <!-- Line Height -->
    <s-setting-size
      :model-value="lineHeight"
      @update:model-value="
        (v) => {
          $emit('update:lineHeight', v);
          onChange();
        }
      "
      label="Line Height"
      :default-value="computedStyle?.lineHeight"
    ></s-setting-size>

    <!-- Letter Spacing -->
    <s-setting-size
      :model-value="letterSpacing"
      @update:model-value="
        (v) => {
          $emit('update:letterSpacing', v);
          onChange();
        }
      "
      label="Letter Spacing"
      :default-value="computedStyle?.letterSpacing"
    ></s-setting-size>

    <!-- Text Align -->
    <s-setting-select
      :model-value="textAlign"
      @update:model-value="
        (v) => {
          $emit('update:textAlign', v);
          onChange();
        }
      "
      :items="TEXT_ALIGNMENTS"
      label="Text Align"
      icon="format_align_center"
      clearable
      :default-value="computedStyle?.textAlign"
    ></s-setting-select>

    <!-- Text Decoration -->
    <s-setting-text-decoration
      :model-value="textDecoration"
      @update:model-value="
        (v) => {
          $emit('update:textDecoration', v);
          onChange();
        }
      "
      label="Text Decoration"
      icon="format_underline"

    ></s-setting-text-decoration>

    <!-- Text Transform -->
    <s-setting-select
      :model-value="textTransform"
      @update:model-value="
        (v) => {
          $emit('update:textTransform', v);
          onChange();
        }
      "
      :items="TEXT_TRANSFORMS"
      label="Text Transform"
      icon="transform"
      clearable
      :default-value="computedStyle?.textTransform"
    ></s-setting-select>

    <!-- Text Shadow -->
    <s-setting-shadow
      :model-value="textShadow"
      @update:model-value="
        (v) => {
          $emit('update:textShadow', v);
          onChange();
        }
      "
      label="Shadow"
      icon="wb_shade"
      text-shadow-mode
    ></s-setting-shadow>
  </s-setting-expandable>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import SSettingExpandable from "@selldone/page-builder/styler/settings/expandable/SSettingExpandable.vue";
import SSettingToggle from "@selldone/page-builder/styler/settings/toggle/SSettingToggle.vue";
import SSettingColor from "@selldone/page-builder/styler/settings/color/SSettingColor.vue";
import SSettingFontFamily from "@selldone/page-builder/styler/settings/font-family/SSettingFontFamily.vue";
import SSettingSize from "@selldone/page-builder/styler/settings/size/SSettingSize.vue";
import SSettingSelect from "@selldone/page-builder/styler/settings/select/SSettingSelect.vue";
import SSettingShadow from "@selldone/page-builder/styler/settings/shadow/SSettingShadow.vue";
import SSettingTextDecoration from "@selldone/page-builder/styler/settings/text-decoration/SSettingTextDecoration.vue";

const FONT_WEIGHTS = [
  { title: "Thin", value: "200" },
  { title: "Light", value: "300" },
  { title: "Normal", value: "400" },
  { title: "Semi Bold", value: "500" },
  { title: "Bold", value: "700" },
  { title: "Black", value: "900" },

  // Add more font weights as needed
];

const TEXT_ALIGNMENTS = [
  { title: "Start", value: "start" },
  { title: "End", value: "end" },
  { title: "Left", value: "left" },
  { title: "Center", value: "center" },
  { title: "Right", value: "right" },
  { title: "Justify", value: "justify" },

];

const TEXT_TRANSFORMS = [
  { title: "None", value: "none" },
  { title: "Capitalize", value: "capitalize" },
  { title: "Uppercase", value: "uppercase" },
  { title: "Lowercase", value: "lowercase" },
  { title: "Full-width", value: "full-width" },
];

const TEXT_WRAPS = [
  { title: "Wrap", value: "wrap" },
  { title: "No Wrap", value: "nowrap" },
  { title: "Balance", value: "balance" },
  { title: "Pretty", value: "pretty" },
  { title: "Stable", value: "stable" },
];

/**
 * <l-settings-style-typeface>
 */
export default defineComponent({
  name: "LSettingsStyleTypeface",
  components: {
    SSettingTextDecoration,
    SSettingShadow,
    SSettingSelect,
    SSettingSize,
    SSettingFontFamily,
    SSettingColor,
    SSettingToggle,
    SSettingExpandable,
  },
  inject: ["$builder"],
  emits: [
    "change",
    "update:color",
    "update:fontFamily",

    "update:fontSize",
    "update:fontWeight",
    "update:fontStyle",
    "update:lineHeight",
    "update:letterSpacing",
    "update:textAlign",
    "update:textDecoration",
    "update:textTransform",
    "update:textShadow",
    "update:textWrap",
  ],
  props: {
    value: {},

    inputStyle: {},
    computedStyle: {
      type: CSSStyleDeclaration,
    },

    color: {},
    fontFamily: {},
    fontSize: {},
    fontWeight: {},
    fontStyle: {},
    lineHeight: {},
    letterSpacing: {},
    textAlign: {},
    textDecoration: {},
    textTransform: {},
    textShadow: {},
    textWrap: {},
  },
  data: () => ({
    FONT_WEIGHTS: FONT_WEIGHTS,
    TEXT_ALIGNMENTS: TEXT_ALIGNMENTS,

    TEXT_TRANSFORMS: TEXT_TRANSFORMS,
    TEXT_WRAPS:TEXT_WRAPS,
  }),

  computed: {
    shadow_colors() {
      if (!Array.isArray(this.textShadow)) return [];
      return this.textShadow.map((s) => s.c);
    },
  },

  watch: {
    textShadow: {
      handler() {
        this.onChange();
      },
      deep: true,
    },
    textDecoration: {
      handler() {
        this.onChange();
      },
      deep: true,
    },
  },

  created() {},

  methods: {
    onChange() {
      this.$emit("change");
    },
  },
});
</script>

<style scoped lang="scss"></style>
