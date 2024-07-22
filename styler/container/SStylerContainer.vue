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
          >
            Style & Class
          </v-tooltip>
        </button>
      </li>

      <!-- ―――――――――――――――――― Bg image ―――――――――――――――――― -->

      <s-styler-tools-background :target="target"></s-styler-tools-background>


      <!-- ―――――――――――――――――― Row Fluid ―――――――――――――――――― -->

      <li>
        <button
          class="styler-button"
          @click="target.data.fluid = !target.data.fluid"
        >
          <v-icon size="20"
            >{{ target.data.fluid ? "swap_horiz" : "compare_arrows" }}
          </v-icon>

          <v-tooltip
            activator="parent"
            content-class="bg-black text-white"
            location="bottom"
          >
            Fluid / Limit Width
          </v-tooltip>
        </button>
      </li>
    </ul>

    <!-- ―――――――――――――――――――――――――――――――――――――――――――――――――――――――――― -->
    <!-- ―――――――――――――――――――― Normal editing tools (sub list) ――――――――――――――――――― -->
    <!-- ―――――――――――――――――――――――――――――――――――――――――――――――――――――――――― -->

    <ul class="styler-list flex-grow-1 w-100"></ul>
  </s-styler-template>
</template>

<script lang="ts">
import { LMixinEvents } from "../../mixins/events/LMixinEvents";
import SStylerTemplate from "../../styler/template/SStylerTemplate.vue";
import { LMixinStyler } from "../../mixins/styler/LMixinStyler";
import { XContainerObject } from "@selldone/page-builder/components/x/container/XContainerObject.ts";
import SStylerToolsBackground from "@selldone/page-builder/styler/tools/background/SStylerToolsBackground.vue";

/**
 * v-styler:container
 */
export default {
  name: "SStylerContainer",

  mixins: [LMixinEvents, LMixinStyler],

  components: {
    SStylerToolsBackground,
    SStylerTemplate,
  },
  props: {
    target: {
      required: true,
      type: XContainerObject,
    },

    /**
     * Set the location of the proper
     */
    position: {
      type: String,
      default: "left-center",
    },
  },
  data: () => ({
    option: null,
  }),

  computed: {},
  watch: {
    /**
     * Reset menu status when it's closed.
     */
    isVisible() {
      this.option = null;
    },
  },
  beforeCreate() {
    if (!this.target) {
      throw new Error("Target is required for SStylerContainer!");
    }
    if (!this.target.data) {
      console.error("Target data -> ", this.target);
      throw new Error("The target data is required for SStylerContainer!");
    }
  },
  mounted() {},

  methods: {

    showMasterDesignDialog() {
      this.ShowLSettingsClassStyle(
        this.el,
        this.el,
        this.target,

        //   { noSize:this.type === "container" } // Not show size ! conflict with container size!
      );
    },
  },
};
</script>
