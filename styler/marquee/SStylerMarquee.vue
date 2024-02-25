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
      <!-- ―――――――――――――――――― Text Loop ―――――――――――――――――― -->

      <li>
        <button
          class="styler-button"
          title="Text Loop"
          @click="showQueryBuilderTextLoop"
        >
          <v-icon color="#fff" size="20"> recycling</v-icon>
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
import { LMixinEvents } from "@app-page-builder/mixins/events/LMixinEvents";
import SStylerTemplate from "@app-page-builder/styler/template/SStylerTemplate.vue";
import { LMixinStyler } from "@app-page-builder/mixins/styler/LMixinStyler";

/**
 * v-styler:marquee
 */
export default {
  name: "SStylerMarquee",

  mixins: [LMixinEvents, LMixinStyler],

  components: {
    SStylerTemplate,
  },
  props: {


    target: {
      required: true,
      type: Object,
    },


    /**
     * Set the location of the proper
     */
    position: {
      type: String,
      default: "top",
    },

    keyMarquee: {
      type: String,
      default: "text_loop",
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
  beforeMount() {
    if (!this.target) {
      throw new Error("Target is required for SStylerMarquee");
    }
  },
  mounted() {},

  methods: {
    showQueryBuilderTextLoop() {
      this.ShowLSettingsMarquee(this.el, this.target, this.keyMarquee);
    },
  },
};
</script>
