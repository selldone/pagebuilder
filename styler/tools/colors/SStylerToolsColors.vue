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
  <li>
    <ul v-for="(colors, i) in list" :key="i" class="colorer">
      <li v-for="color_plate in colors" :key="color_plate">
        <input
          :checked="modelValue === color_plate"
          :style="{ background: color_plate }"
          :value="color_plate"
          type="radio"
          @change="setBackground(color_plate)"
        />
        <v-tooltip
          activator="parent"
          content-class="bg-black text-white"
          location="bottom"
          >{{ color_plate }}
        </v-tooltip>
      </li>

      <v-btn
        v-if="i === 0"
        class="mb-1 ms-3 bg-tiny-checkers rounded-circle"
        icon
        size="30"
        @click="showColorDialog(modelValue, setBackground, true)"
      >
        <v-icon :color="modelValue" size="20">adjust</v-icon>

        <v-tooltip
          activator="parent"
          content-class="bg-black text-white"
          location="bottom"
          >Set Custom Color
        </v-tooltip>
      </v-btn>
      <v-btn
        v-if="i === list.length - 1"
        class="mb-1 ms-3 bg-tiny-checkers rounded-circle"
        color="#fff"
        icon
        size="30"
        @click="setBackground(null)"
      >
        <v-icon size="20">close</v-icon>

        <v-tooltip
          activator="parent"
          content-class="bg-black text-white"
          location="bottom"
          >Clear Color
        </v-tooltip>
      </v-btn>
    </ul>
  </li>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import { LMixinEvents } from "../../../mixins/events/LMixinEvents";

export default defineComponent({
  name: "SStylerToolsColors",
  mixins: [LMixinEvents],
  emits: ["update:modelValue"],
  props: {
    lightColors: Array,
    darkColors: Array,
    modelValue: {},
    el: {
      type: Object,
      //   required: true,
    },
  },

  computed: {
    list() {
      return [this.lightColors, this.darkColors].filter(Boolean);
    },
  },

  methods: {
    showColorDialog(color, callback, alpha) {
      this.ShowLSettingsColor(this.el, color, callback, alpha);
    },
    setBackground(color) {
      this.$emit("update:modelValue", color);
    },
  },
});
</script>

<style lang="scss" scoped></style>
