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
    has-animation
    type="section"
  >
    <!-- Important: Display non because of preventing proper error -->

    <!-- ―――――――――――――――――――――――――――――――――――――――――――――――――――――――――― -->
    <!-- ――――――――――――――――――――――― Normal editing tools ―――――――――――――――――――――― -->
    <!-- ―――――――――――――――――――――――――――――――――――――――――――――――――――――――――― -->

    <ul class="styler-list">
      <!-- ―――――――――――――――――― Size & Class ―――――――――――――――――― -->

      <li>
        <button class="styler-button" @click="showMasterDesignDialog()">
          <v-icon dark size="20">architecture</v-icon>

          <v-tooltip
            activator="parent"
            content-class="bg-black white--text"
            location="bottom"
            max-width="320"
            >Classes & Style
          </v-tooltip>
        </button>
      </li>

      <!-- ―――――――――――――――――― Bg image ―――――――――――――――――― -->

      <li>
        <button class="styler-button" @click="showStyleDialog()">
          <v-icon dark size="20">fa:fas fa-image</v-icon>
        </button>
        <v-tooltip
          activator="parent"
          attach
          content-class="bg-black white--text"
          location="bottom"
          max-width="320"
          >Background Image / Video / Pattern<br />

          <v-chip
            v-if="target.background.bg_color"
            class="ma-1"
            pill
            size="small"
          >
            <v-icon :color="target.background.bg_color" start>circle</v-icon>
            {{ target.background.bg_color }}
          </v-chip>
        </v-tooltip>
      </li>

      <!-- ―――――――――――――――――― Background Color ―――――――――――――――――― -->

      <li>
        <button class="styler-button" @click="option = 'colorer'">
          <SStylerIcon name="palettes" />
          <v-tooltip
            activator="parent"
            content-class="bg-black white--text"
            location="bottom"
            max-width="320"
            >Background Color
          </v-tooltip>
        </button>
      </li>
      <!-- ―――――――――――――――――― Frame Shape ―――――――――――――――――― -->
      <li>
        <button class="styler-button" @click="option = 'bg-styler'">
          <v-icon dark size="20">style</v-icon>
          <v-tooltip
            activator="parent"
            content-class="bg-black white--text"
            location="bottom"
            max-width="320"
            >Frame Shape
          </v-tooltip>
        </button>
      </li>

      <!-- ―――――――――――――――――― Delete ―――――――――――――――――― -->

      <li>
        <button class="styler-button" @click="removeSection">
          <SStylerIcon name="trash" />
          <v-tooltip
            activator="parent"
            content-class="bg-black white--text"
            location="bottom"
            max-width="320"
            >Delete Section
          </v-tooltip>
        </button>
      </li>

      <!-- ―――――――――――――――――― Dark / Light Mode ―――――――――――――――――― -->
      <li>
        <button class="styler-button" @click="toggleDarkMode()">
          <v-scroll-y-reverse-transition group leave-absolute>
            <v-icon
              v-if="target.background.dark"
              key="1"
              class="bg-malibu-beach text-gradient"
              color="#1BD4F2"
              dark
              size="20"
              >nights_stay
            </v-icon>
            <v-icon
              v-else
              key="2"
              class="bg-sunny-morning text-gradient"
              color="#FFC107"
              dark
              size="20"
              >wb_sunny
            </v-icon>
          </v-scroll-y-reverse-transition>

          <v-tooltip
            activator="parent"
            content-class="bg-black white--text"
            location="bottom"
            max-width="320"
            >Dark / Light Mode
          </v-tooltip>
        </button>
      </li>
    </ul>

    <!-- ―――――――――――――――――――――――――――――――――――――――――――――――――――――――――― -->
    <!-- ―――――――――――――――――――― Normal editing tools (sub list) ――――――――――――――――――― -->
    <!-- ―――――――――――――――――――――――――――――――――――――――――――――――――――――――――― -->

    <ul class="styler-list flex-grow-1 w-100">
      <s-styler-tools-colors
        v-if="option === 'colorer'"
        v-model="target.background.bg_color"
        :dark-colors="PLATE_DARK_VARS"
        :light-colors="PLATE_LIGHT_VARS"
        @update:model-value="removeClass(`bg--`)"
      >
      </s-styler-tools-colors>

      <!-- ―――――――――――――――――― Frame Shape ―――――――――――――――――― -->

      <li v-if="option === 'bg-styler'" style="--bg-color: #323c47">
        <v-item-group
          v-model="bgStylerStyle"
          dark
          mandatory
          @update:model-value="changeBgStyle()"
        >
          <v-item v-for="item in FrameStyles" :key="item" :value="item">
            <template v-slot="{ isSelected, toggle }">
              <v-btn
                :color="isSelected ? 'primary' : '#fff'"
                flat
                icon
                style="background: transparent"
                @click="toggle"
              >
                <div
                  :class="item"
                  style="
                    background-color: white;
                    width: 20px;
                    height: 20px;
                    z-index: inherit;
                  "
                />
              </v-btn>
            </template>
          </v-item>
        </v-item-group>
      </li>
    </ul>
  </s-styler-template>
</template>

<script>
import { PageBuilderMixin } from "@app-page-builder/mixins/PageBuilderMixin";
import { LMixinsEvents } from "@app-page-builder/mixins/events/LMixinsEvents";
import SStylerTemplate from "@app-page-builder/styler/template/SStylerTemplate.vue";
import { StylerMixin } from "@app-page-builder/mixins/StylerMixin";
import SStylerIcon from "@app-page-builder/styler/icon/SStylerIcon.vue";
import {
  PLATE_DARK_VARS,
  PLATE_LIGHT_VARS,
} from "@app-page-builder/src/helpers/PageBuilderColorsHelper";
import SStylerToolsColors from "@app-page-builder/styler/tools/colors/SStylerToolsColors.vue";

const FrameStyles = [
  "bg-style-normal",
  "bg-style-diagonal-l-r-60",
  "bg-style-diagonal-r-l-60",
  "bg-style-diagonal-l-r-80",
  "bg-style-diagonal-r-l-80",
  "bg-style-stripe-l-r-60",
  "bg-style-stripe-r-l-60",
  "bg-style-stripe-l-r-80",
  "bg-style-stripe-r-l-80",
  "bg-style-arrow-up",
];

/**
 * v-styler:section
 */
export default {
  name: "SStylerSection",

  mixins: [PageBuilderMixin, LMixinsEvents, StylerMixin],

  components: {
    SStylerToolsColors,
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
      default: "left-start",
    },
  },
  data: () => ({
    PLATE_LIGHT_VARS: PLATE_LIGHT_VARS,
    PLATE_DARK_VARS: PLATE_DARK_VARS,

    FrameStyles: FrameStyles,

    option: null,

    bgStylerStyle: "bg-style-normal",
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
    /**
     * 🪱 Code health check!
     */
    "section.data"() {
      console.log(
        "⛔ Section data changed! It cause missing connection between component <-> v-styler <-> styler component!",
        this.section.data,
      );
    },
  },
  beforeMount() {
    if (!this.target) {
      throw new Error("Target is required for SStylerSection");
    }

    if (!this.target.background) {
      this.target.background = {};
    }

    if (!this.target.classes || !Array.isArray(this.target.classes)) {
      this.target.classes = [];
    }

    for (const _class of FrameStyles) {
      if (this.target.classes.includes(_class)) {
        this.bgStylerStyle = _class;
        break;
      }
    }
  },
  mounted() {},

  methods: {
    removeClass(className) {
      if (!Array.isArray(this.target.classes)) {
        return;
      }

      // remove any item start with
      this.target.classes = this.target.classes.filter((c) => {
        return !c.startsWith(className);
      });
    },

    showMasterDesignDialog() {
      this.ShowLSettingsClassStyle(
        this.el,
        this.el,
        this.target,
        `style`,
        `classes`,
      );
    },

    showStyleDialog() {
      this.ShowLSettingsBackground(this.el, this.target, `background`);
    },

    removeSection() {
      this.$builder.remove(this.section);
    },

    toggleDarkMode() {
      this.target.background.dark = !this.target.background.dark;

      // Force deep update:

      this.section.set(`$sectionData.background`, (background) => {
        background.dark = this.target.background.dark;
      });
    },

    changeBgStyle() {
      console.log("this.bgStylerStyle", this.bgStylerStyle, this.target);
      this.removeClass(`bg-style-`);
      this.target.classes.push(this.bgStylerStyle);
    },
  },
};
</script>
