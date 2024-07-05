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
      <!-- ―――――――――――――――――― Products & Categories ―――――――――――――――――― -->

      <li v-if="custom">
        <button class="styler-button" @click="showCustomProductFrame">
          <v-icon color="#fff" size="20"> code</v-icon>

          <v-tooltip
            activator="parent"
            content-class="bg-black text-white"
            location="bottom"
          >
            Custom Frames Code
          </v-tooltip>
        </button>
      </li>
      <li>
        <button class="styler-button" @click="showQueryBuilderProducts">
          <v-icon color="#fff" size="20"> filter_alt</v-icon>

          <v-tooltip
            activator="parent"
            content-class="bg-black text-white"
            location="bottom"
          >
            Filter Products & Categories
          </v-tooltip>
        </button>
      </li>

      <!-- ―――――――――――――――――― Row Align / Justify ―――――――――――――――――― -->

      <li v-if="hasArrangement">
        <v-btn
          :disabled="show_align"
          class="styler-button"
          icon
          size="42"
          variant="text"
          @click="show_align = true"
        >
          <v-icon size="20">vertical_distribute</v-icon>

          <v-tooltip
            activator="parent"
            content-class="bg-black text-white"
            location="bottom"
            >Align & Justify Columns
          </v-tooltip>
        </v-btn>
      </li>
    </ul>

    <!-- ―――――――――――――――――――――――――――――――――――――――――――――――――――――――――― -->
    <!-- ―――――――――――――――――――― Normal editing tools (sub list) ――――――――――――――――――― -->
    <!-- ―――――――――――――――――――――――――――――――――――――――――――――――――――――――――― -->

    <ul class="styler-list flex-grow-1 w-100">
      <!-- ―――――――――――――――――― Row Align / Justify ―――――――――――――――――― -->

      <div v-if="show_align" class="d-flex flex-column align-center pa-2">
        <v-btn-toggle
          v-model="target.data.align"
          class="ma-1"
          rounded="xl"
          selected-class="green-flat"
          style="min-height: 48px"
          theme="dark"
        >
          <v-btn v-for="it in ALIGN" :key="it.val" :value="it.val" icon="">
            <v-icon class="flip-image-rtl" size="20">{{ it.icon }}</v-icon>
            <v-tooltip
              v-if="it.title"
              activator="parent"
              content-class="bg-black text-white"
              location="bottom"
              >{{ it.title }}
            </v-tooltip>
          </v-btn>
        </v-btn-toggle>
        <v-btn-toggle
          v-model="target.data.justify"
          class="ma-1"
          rounded="xl"
          selected-class="blue-flat"
          style="min-height: 48px"
          theme="dark"
        >
          <v-btn v-for="it in JUSTIFY" :key="it.val" :value="it.val" icon>
            <v-icon class="flip-image-rtl" size="20">{{ it.icon }}</v-icon>
            <v-tooltip
              v-if="it.title"
              activator="parent"
              content-class="bg-black text-white"
              location="bottom"
              >{{ it.title }}
            </v-tooltip>
          </v-btn>
        </v-btn-toggle>
      </div>
    </ul>
  </s-styler-template>
</template>

<script>
import { LMixinEvents } from "../../mixins/events/LMixinEvents";
import SStylerTemplate from "../../styler/template/SStylerTemplate.vue";
import { LMixinStyler } from "../../mixins/styler/LMixinStyler";
import ALIGN from "@selldone/page-builder/src/enums/ALIGN.ts";
import JUSTIFY from "@selldone/page-builder/src/enums/JUSTIFY.ts";

/**
 * v-styler:products
 */

export default {
  name: "SStylerProducts",

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
      default: "top-center",
    },

    custom: {
      type: Boolean,
      default: false,
    },
    hasArrangement: {
      type: Boolean,
      default: false,
    },

    keyFrameCategory: {
      type: String,
      default: "frame_category",
    },
    keyFrameProduct: {
      type: String,
      default: "frame_product",
    },
  },
  data: () => ({
    ALIGN: ALIGN,
    JUSTIFY: JUSTIFY,

    show_align: false,
  }),

  computed: {},
  watch: {},
  beforeMount() {
    if (!this.target) {
      throw new Error("Target is required for SStylerProducts");
    }
  },
  mounted() {},

  methods: {
    showCustomProductFrame() {
      this.show_align = false;
      this.ShowLSettingsFrame(
        this.el,
        this.target,
        this.keyFrameCategory,
        this.keyFrameProduct,
      );
    },

    showQueryBuilderProducts() {
      this.show_align = false;
      this.ShowLSettingsProductsFilter(this.el, this.target);
    },
  },
};
</script>
