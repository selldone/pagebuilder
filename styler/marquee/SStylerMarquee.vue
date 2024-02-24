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
    type="marquee"
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
import { PageBuilderMixin } from "@app-page-builder/mixins/PageBuilderMixin";
import { LMixinsEvents } from "@app-page-builder/mixins/events/LMixinsEvents";
import SStylerTemplate from "@app-page-builder/styler/template/SStylerTemplate.vue";
import { StylerMixin } from "@app-page-builder/mixins/StylerMixin";
import SStylerIcon from "@app-page-builder/styler/icon/SStylerIcon.vue";
import {
  PageBuilderColorsHelper,
  PLATE_DARK_VARS,
  PLATE_LIGHT_VARS,
} from "@app-page-builder/src/helpers/PageBuilderColorsHelper";
import SNumberInput from "@components/ui/input/number/SNumberInput.vue";
import SStylerToolsColors from "@app-page-builder/styler/tools/colors/SStylerToolsColors.vue";

/**
 * v-styler:marquee
 */
export default {
  name: "SStylerMarquee",

  mixins: [PageBuilderMixin, LMixinsEvents, StylerMixin],

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
