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
    <button class="styler-button" @click="showStyleDialog()">
      <v-icon size="20">fa:fas fa-image</v-icon>

      <!-- Background preview -->
      <div
        v-if="has_background"
        style="
          width: 18px;
          height: 18px;
          border-radius: 5px;
          position: absolute;
          right: 0;
          bottom: 0;
          border: solid 1.5px #fff;
        "
        :style="background_style"
      ></div>

      <v-tooltip
        activator="parent"
        content-class="bg-black text-white"
        location="bottom"
      >
        Background Image / Video / Pattern

        <v-chip
          v-if="target.background.bg_color"
          class="ma-1"
          pill
          size="x-small"
        >
          <v-icon :color="target.background.bg_color" start>circle</v-icon>
          {{ target.background.bg_color }}
        </v-chip>
      </v-tooltip>
    </button>
  </li>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { LModelElement } from "@selldone/page-builder/models/element/LModelElement.ts";
import { XContainerObject } from "@selldone/page-builder/components/x/container/XContainerObject.ts";
import { LMixinEvents } from "@selldone/page-builder/mixins/events/LMixinEvents.ts";

export default defineComponent({
  name: "SStylerToolsBackground",
  mixins: [LMixinEvents],
  props: {
    target: {
      required: true,
      type: XContainerObject,
    },
  },

  computed: {
    background_style() {
      return (this.target as LModelElement)?.background?.generate();
    },
    has_background() {
      return (this.target as LModelElement)?.background?.hasValue();
    },
  },

  methods: {
    showStyleDialog() {
      this.ShowLSettingsBackground(this.el, this.target);
    },
  },
});
</script>

<style scoped lang="scss"></style>
