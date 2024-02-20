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
    type="row-grid"
    :builder="builder"
    :is-visible="isVisible"
  >
    <!-- Important: Display non because of preventing proper error -->

    <!-- ―――――――――――――――――――――――――――――――――――――――――――――――――――――――――― -->
    <!-- ――――――――――――――――――――――― Normal editing tools ―――――――――――――――――――――― -->
    <!-- ―――――――――――――――――――――――――――――――――――――――――――――――――――――――――― -->

    <ul class="styler-list">

      <!-- ―――――――――――――――――― Grid ―――――――――――――――――― -->


        <!-- Row grid use to apply grid to all elements like blogs -->

        <li>
          <button
              class="styler-button"
              @click="selectDevice('mobile')"
              :class="{ selected: device === 'mobile' }"
              title="Size on mobile devices."
          >
            <SStylerIcon name="mobile" />
          </button>
        </li>
        <li>
          <button
              class="styler-button"
              @click="selectDevice('tablet')"
              :class="{ selected: device === 'tablet' }"
              title="Size on tablet devices."
          >
            <SStylerIcon name="tablet" />
          </button>
        </li>
        <li>
          <button
              class="styler-button"
              @click="selectDevice('desktop')"
              :class="{ selected: device === 'desktop' }"
              title="Size on pc devices."
          >
            <SStylerIcon name="laptop" />
          </button>
        </li>
        <li>
          <button
              class="styler-button"
              @click="selectDevice('widescreen')"
              :class="{ selected: device === 'widescreen' }"
              title="Size on large display."
          >
            <v-icon dark size="20">tv</v-icon>
          </button>
        </li>

    </ul>

    <!-- ―――――――――――――――――――――――――――――――――――――――――――――――――――――――――― -->
    <!-- ―――――――――――――――――――― Normal editing tools (sub list) ――――――――――――――――――― -->
    <!-- ―――――――――――――――――――――――――――――――――――――――――――――――――――――――――― -->

    <ul class="styler-list flex-grow-1 w-100">

    </ul>
  </s-styler-template>
</template>

<script>
import { PageBuilderMixin } from "@app-page-builder/mixins/PageBuilderMixin";
import { LandingHistoryMixin } from "@app-page-builder/mixins/LandingToolsMixin";
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



export default {
  name: "SStylerRowGrid",

  mixins: [PageBuilderMixin, LandingHistoryMixin, StylerMixin],

  components: {
    SStylerToolsColors,
    SNumberInput,
    SStylerIcon,
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
      default: "top-center",
    },


  },
  data: () => ({
    option:null,
  }),

  computed: {

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
      throw new Error("Target is required for SStylerRowGrid");
    }

  },
  mounted() {

  },

  methods: {

  },
};
</script>
