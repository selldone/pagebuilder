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
  <div :class="{ 'disabled-scale-down': disabled }">
    <v-list-item>
      <span class="-label me-2 min-width-100">
        <v-icon class="me-1">format_strikethrough</v-icon>

        Text Decoration</span
      >
      <template v-slot:append>
        <v-slide-x-transition leave-absolute>
          <v-btn
            v-if="modelValue"
            @click="text_decoration_object = null"
            color="red"
            variant="text"
            size="small"
            class="ms-1 tnt"
          >
            <v-icon class="me-1">layers_clear</v-icon>
            Remove shadow
          </v-btn>

          <v-btn
            v-else
            @click="addTextDecoration()"
            size="small"
            class="ms-1 tnt"
            variant="outlined"
          >
            <v-icon start>add_box</v-icon>
            Add Decoration
          </v-btn>
        </v-slide-x-transition>
      </template>
    </v-list-item>

    <v-expand-transition>
      <div v-if="isValid">
        <s-setting-toggle
          v-model="text_decoration_object.line"
          :items="TEXT_DECORATION_LINES"
          multiple
          label="Line"
        ></s-setting-toggle>

        <s-setting-toggle
          v-model="text_decoration_object.style"
          :items="TEXT_DECORATION_STYLES"
          label="Style"
        ></s-setting-toggle>

        <s-setting-color
          v-model="text_decoration_object.color"
          label="Color"
          clearable
        ></s-setting-color>

        <s-setting-size
          v-model="text_decoration_object.thickness"
          label="Thickness"
        ></s-setting-size>
      </div>
    </v-expand-transition>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { isObject } from "lodash-es";
import { TextDecorationHelper } from "@selldone/page-builder/styler/settings/text-decoration/TextDecorationHelper";
import SSettingToggle from "@selldone/page-builder/styler/settings/toggle/SSettingToggle.vue";
import SSettingColor from "@selldone/page-builder/styler/settings/color/SSettingColor.vue";
import SSettingSize from "@selldone/page-builder/styler/settings/size/SSettingSize.vue";

const TEXT_DECORATION_LINES = [
  { title: "None", value: "none" },
  { title: "Underline", value: "underline" },
  { title: "Overline", value: "overline" },
  { title: "Line Through", value: "line-through" },
  { title: "Blink", value: "blink" },
];

const TEXT_DECORATION_STYLES = [
  { title: "Solid", value: "solid" },
  { title: "Double", value: "double" },
  { title: "Dotted", value: "dotted" },
  { title: "Dashed", value: "dashed" },
  { title: "Wavy", value: "wavy" },
];

export default defineComponent({
  name: "SSettingTextDecoration",
  components: {
    SSettingSize,
    SSettingColor,
    SSettingToggle,
  },
  emits: [],
  props: {
    value: {},
    modelValue: {
      type: String,
    },
    disabled: Boolean,
  },
  data: () => ({
    TEXT_DECORATION_LINES: TEXT_DECORATION_LINES,
    TEXT_DECORATION_STYLES: TEXT_DECORATION_STYLES,

    text_decoration_object: null,
  }),
  computed: {
    isValid() {
      return (
        this.text_decoration_object && isObject(this.text_decoration_object)
      );
    },

    text_decoration_gen() {
      return TextDecorationHelper.Generate(this.text_decoration_object);
    },
  },

  watch: {
    text_decoration_gen(val) {
      this.$emit("update:modelValue", val);
    },
  },

  created() {
    this.text_decoration_object = TextDecorationHelper.Extract(this.modelValue);
  },

  methods: {
    addTextDecoration() {
      this.text_decoration_object = {
        line: ["underline"],
        color: "#333333",
        style: "dashed",
        thickness: "2px",
      };
    },
  },
});
</script>

<style scoped lang="scss"></style>
