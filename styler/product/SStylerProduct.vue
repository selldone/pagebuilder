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
    type="product"
    :builder="builder"
    :is-visible="isVisible"
  >
    <!-- Important: Display non because of preventing proper error -->

    <!-- ―――――――――――――――――――――――――――――――――――――――――――――――――――――――――― -->
    <!-- ――――――――――――――――――――――― Normal editing tools ―――――――――――――――――――――― -->
    <!-- ―――――――――――――――――――――――――――――――――――――――――――――――――――――――――― -->

    <ul class="styler-list">
      <!-- ―――――――――――――――――― Product ―――――――――――――――――― -->

      <li>
        <button class="styler-button" @click="showSelectProduct">
          <v-icon color="#fff" size="20"> bento</v-icon>
          <v-tooltip
            activator="parent"
            location="bottom"
            content-class="bg-black white--text"
            attach
          >
            Select Product
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

<script>
import { PageBuilderMixin } from "@app-page-builder/mixins/PageBuilderMixin";
import { LandingHistoryMixin } from "@app-page-builder/mixins/LandingToolsMixin";
import SStylerTemplate from "@app-page-builder/styler/template/SStylerTemplate.vue";
import { StylerMixin } from "@app-page-builder/mixins/StylerMixin";

/**
 * v-styler:product
 */

export default {
  name: "SStylerProduct",

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
      default: "top",
    },
  },
  data: () => ({
    option: null,
  }),

  computed: {},
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
      throw new Error("Target is required for SStylerProduct");
    }
  },
  mounted() {},

  methods: {
    showSelectProduct() {
      this.ShowGlobalProductSelectDialog(this.el, this.target);
    },
  },
};
</script>
