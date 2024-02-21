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
    :el="el"
    :section="section"
    type="container"
    :builder="builder"
    :is-visible="isVisible"
  >
    <!-- Important: Display non because of preventing proper error -->

    <!-- ―――――――――――――――――――――――――――――――――――――――――――――――――――――――――― -->
    <!-- ――――――――――――――――――――――― Normal editing tools ―――――――――――――――――――――― -->
    <!-- ―――――――――――――――――――――――――――――――――――――――――――――――――――――――――― -->

    <ul class="styler-list">
      <!-- ―――――――――――――――――― Size & Class ―――――――――――――――――― -->

      <li>
        <button
          class="styler-button"
          @click="showMasterDesignDialog()"
          title="Size & Class"
        >
          <v-icon dark size="20">architecture</v-icon>
        </button>
      </li>

      <!-- ―――――――――――――――――― Bg image ―――――――――――――――――― -->

      <li>
        <button
          class="styler-button"
          @click="showStyleDialog()"
          title="Background image"
        >
          <v-icon size="20" dark>fa:fas fa-image</v-icon>
        </button>
      </li>

      <!-- ―――――――――――――――――― Row Fluid ―――――――――――――――――― -->

      <li v-if="hasFluid">
        <button
          class="styler-button"
          @click="target.fluid = !target.fluid"
          title="Fluid container"
        >
          <v-icon dark size="20"
            >{{ target.fluid ? "swap_horiz" : "compare_arrows" }}
          </v-icon>
        </button>
      </li>
    </ul>

    <!-- ―――――――――――――――――――――――――――――――――――――――――――――――――――――――――― -->
    <!-- ―――――――――――――――――――― Normal editing tools (sub list) ――――――――――――――――――― -->
    <!-- ―――――――――――――――――――――――――――――――――――――――――――――――――――――――――― -->

    <ul class="styler-list flex-grow-1 w-100"></ul>
  </s-styler-template>
</template>

<script>
import { PageBuilderMixin } from "@app-page-builder/mixins/PageBuilderMixin";
import { LandingHistoryMixin } from "@app-page-builder/mixins/LandingToolsMixin";
import SStylerTemplate from "@app-page-builder/styler/template/SStylerTemplate.vue";
import { StylerMixin } from "@app-page-builder/mixins/StylerMixin";

/**
 * v-styler:container
 */
export default {
  name: "SStylerContainer",

  mixins: [PageBuilderMixin, LandingHistoryMixin, StylerMixin],

  components: {
    SStylerTemplate,
  },
  props: {
    builder: {
      required: true,
    },

    el: {
      required: true,
    },

    target: {
      required: true,
      type: Object,
    },
    section: {
      type: Object,
      required: true,
    },

    /**
     * Set the location of the proper
     */
    position: {
      type: String,
      default: "right-center",
    },

    hasFluid: {
      type: Boolean,
      default: true,
    },
  },
  data: () => ({
    option: null,
  }),

  computed: {
    blockFluid() {
      // console.log('blockFluid',this.el.getAttribute("no-fluid"),this.el)
      // Add :  :container-styler="true" If you want to prevent show fluid button on roe!
      // console.log('container-styler',this.el.parentElement.getAttribute('container-styler'))
      return (
        (this.el.parentElement &&
          this.el.parentElement.getAttribute("container-styler")) ||
        this.el.getAttribute("no-fluid")
      );
    },
  },
  watch: {
    option() {
      this.updatePopper();
    },
    /**
     * Reset menu status when it's closed.
     */
    isVisible() {
      this.option = null;
      this.updatePopper();
    },
  },
  beforeMount() {
    if (!this.target) {
      throw new Error("Target is required for SStylerContainer");
    }
  },
  mounted() {},

  methods: {
    showStyleDialog() {
      this.ShowGlobalBackgroundEditorDialog(this.el, this.target, `background`);
    },

    showMasterDesignDialog() {
      this.ShowGlobalStyleEditorDialog(
        this.el,
        this.el,
        this.target,
        `style`,
        `classes`,

        //   { noSize:this.type === "container" } // Not show size ! conflict with container size!
      );
    },
  },
};
</script>
