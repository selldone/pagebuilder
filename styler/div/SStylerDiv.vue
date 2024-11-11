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
  <s-styler-template
    ref="styler"
    :builder="builder"
    :el="el"
    :is-visible="isVisible"
    :section="section"
    :target="target"
    has-tracking
    :type="type"
  >
    <!-- Important: Display non because of preventing proper error -->

    <!-- ―――――――――――――――――――――――――――――――――――――――――――――――――――――――――― -->
    <!-- ――――――――――――――――――――――― Normal editing tools ―――――――――――――――――――――― -->
    <!-- ―――――――――――――――――――――――――――――――――――――――――――――――――――――――――― -->

    <ul class="styler-list">
      <!-- ―――――――――――――――――― Size & Class ―――――――――――――――――― -->
      <li>
        <button class="styler-button" @click="showMasterDesignDialog()">
          <v-icon size="20">architecture</v-icon>

          <v-tooltip
            activator="parent"
            content-class="bg-black text-white"
            location="bottom"
            max-width="320"
            >Classes & Style
          </v-tooltip>
        </button>
      </li>

      <!-- ―――――――――――――――――― Size & Class ―――――――――――――――――― -->
      <li v-if="removeChild">
        <button class="styler-button" @click="removeChild()">
          <v-icon size="20" color="red">close</v-icon>

          <v-tooltip
            activator="parent"
            content-class="bg-black text-white"
            location="bottom"
            max-width="320"
            >Remove
          </v-tooltip>
        </button>
      </li>
    </ul>

    <!-- ―――――――――――――――――――――――――――――――――――――――――――――――――――――――――― -->
    <!-- ―――――――――――――――――――― Normal editing tools (sub list) ――――――――――――――――――― -->
    <!-- ―――――――――――――――――――――――――――――――――――――――――――――――――――――――――― -->
  </s-styler-template>
</template>

<script lang="ts">
import { LMixinEvents } from "../../mixins/events/LMixinEvents";
import SStylerTemplate from "../../styler/template/SStylerTemplate.vue";
import { LMixinStyler } from "../../mixins/styler/LMixinStyler";
import { XDivObject } from "@selldone/page-builder/components/x/div/XDivObject.ts";

export default {
  name: "SStylerDiv",

  mixins: [LMixinEvents, LMixinStyler],

  components: {
    SStylerTemplate,
  },
  props: {
    target: {
      required: true,
      type: XDivObject,
    },

    /**
     * Set the location of the proper
     */
    position: {
      type: String,
      default: "bottom-start",
    },

    removeChild: Function,
  },
  data: () => ({}),

  computed: {},
  watch: {
    /**
     * Reset menu status when it's closed.
     */
    isVisible() {},
  },
  beforeMount() {
    if (!this.target) {
      throw new Error("Target is required for SStylerDiv");
    }
  },
  mounted() {},
  beforeUnmount() {},

  methods: {
    showMasterDesignDialog() {
      this.ShowLSettingsClassStyle(
        this.el,
        this.el,
        this.target,

      );
    },
  },
};
</script>
