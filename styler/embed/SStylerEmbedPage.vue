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

      <!-- ―――――――――――――――――― Change Page ―――――――――――――――――― -->
      <li>
        <button class="styler-button" @click="showSelectPage()">
          <v-icon size="20">edit_document</v-icon>

          <v-tooltip
            activator="parent"
            content-class="bg-black text-white"
            location="bottom"
            max-width="320"
            >Change Embedded Page
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
import { XEmbedPageObject } from "@selldone/page-builder/components/x/embed/page/XEmbedPageObject.ts";
import BPageInput from "@selldone/components-vue/backoffice/page/input/BPageInput.vue";

export default {
  name: "SStylerEmbedPage",

  mixins: [LMixinEvents, LMixinStyler],

  components: {
    SStylerTemplate,
    BPageInput,
  },

  props: {
    target: {
      required: true,
      type: XEmbedPageObject,
    },

    /**
     * Set the location of the proper
     */
    position: {
      type: String,
      default: "top-center",
    },
  },
  data: () => ({

  }),

  computed: {},
  watch: {
    /**
     * Reset menu status when it's closed.
     */
    isVisible() {},
  },
  beforeMount() {
    if (!this.target) {
      throw new Error("Target is required for SStylerEmbedPage");
    }
  },
  mounted() {},
  beforeUnmount() {},

  methods: {
    showMasterDesignDialog() {
      this.ShowLSettingsClassStyle(this.el, this.el, this.target);
    },

    showSelectPage() {
      this.ShowLSettingsEmbedPage(this.el, this.el, this.target);
    },
  },
};
</script>
