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

      <!-- ―――――――――――――――――― Show & Hide based on the screen size ―――――――――――――――――― -->

      <li>
        <button class="styler-button" @click="option = 'screen'">
          <v-icon size="20">visibility</v-icon>

          <v-tooltip
            activator="parent"
            content-class="bg-black text-white"
            location="bottom"
            max-width="320"
            >Show / Hide Screen Size
          </v-tooltip>
        </button>
      </li>

      <!-- ―――――――――――――――――― Bg image ―――――――――――――――――― -->

      <li>
        <button class="styler-button" @click="showStyleDialog()">
          <v-icon size="20">fa:fas fa-image</v-icon>
        </button>
        <v-tooltip
          activator="parent"
          content-class="bg-black text-white"
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
            content-class="bg-black text-white"
            location="bottom"
            max-width="320"
            >Background Color
          </v-tooltip>
        </button>
      </li>
      <!-- ―――――――――――――――――― Frame Shape ―――――――――――――――――― -->
      <li>
        <button class="styler-button" @click="option = 'bg-styler'">
          <v-icon size="20">style</v-icon>
          <v-tooltip
            activator="parent"
            content-class="bg-black text-white"
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
            content-class="bg-black text-white"
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
              size="20"
              >nights_stay
            </v-icon>
            <v-icon
              v-else
              key="2"
              class="bg-sunny-morning text-gradient"
              color="#FFC107"
              size="20"
              >wb_sunny
            </v-icon>
          </v-scroll-y-reverse-transition>

          <v-tooltip
            activator="parent"
            content-class="bg-black text-white"
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
                icon :variant="isSelected?'flat':'text'"
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

      <!-- ―――――――――――――――――― Show & Hide based on the screen size ―――――――――――――――――― -->

      <li v-if="option === 'screen'" style="--bg-color: #323c47">
        <v-btn
          :color="!target.hide_sm ? 'primary' : '#fff'"
          style="background: transparent"
          @click="target.hide_sm = !target.hide_sm"
          variant="flat"
          class="mx-1"
          stacked
          size="small"
          density="compact"
        >
          <v-icon
            >{{ target.hide_sm ? "visibility_off" : "visibility" }}
          </v-icon>
          <div class="x-small tnt mt-1">
            <v-icon size="12" class="me-1">smartphone</v-icon>
            Mobile
          </div>
        </v-btn>

        <v-btn
          :color="!target.hide_md ? 'primary' : '#fff'"
          style="background: transparent"
          @click="target.hide_md = !target.hide_md"
          variant="flat"
          class="mx-1"
          stacked
          size="small"
          density="compact"
        >
          <v-icon
            >{{ target.hide_md ? "visibility_off" : "visibility" }}
          </v-icon>

          <div class="x-small tnt mt-1">
            <v-icon size="12" class="me-1">tablet_android</v-icon>
            Tablet
          </div>
        </v-btn>

        <v-btn
          :color="!target.hide_lg ? 'primary' : '#fff'"
          style="background: transparent"
          @click="target.hide_lg = !target.hide_lg"
          variant="flat"
          class="mx-1"
          stacked
          size="small"
          density="compact"
        >
          <v-icon
            >{{ target.hide_lg ? "visibility_off" : "visibility" }}
          </v-icon>

          <div class="x-small tnt mt-1">
            <v-icon size="12" class="me-1">laptop</v-icon>
            Normal
          </div>
        </v-btn>

        <v-btn
          :color="!target.hide_xl ? 'primary' : '#fff'"
          style="background: transparent"
          @click="target.hide_xl = !target.hide_xl"
          variant="flat"
          class="mx-1"
          stacked
          size="small"
          density="compact"
        >
          <v-icon
            >{{ target.hide_xl ? "visibility_off" : "visibility" }}
          </v-icon>

          <div class="x-small tnt mt-1">
            <v-icon size="12" class="me-1">desktop_windows</v-icon>
            Large
          </div>
        </v-btn>
      </li>
    </ul>
  </s-styler-template>
</template>

<script>
import { LMixinEvents } from "../../mixins/events/LMixinEvents";
import SStylerTemplate from "../../styler/template/SStylerTemplate.vue";
import { LMixinStyler } from "../../mixins/styler/LMixinStyler";
import SStylerIcon from "../../styler/icon/SStylerIcon.vue";
import {
  PLATE_DARK_VARS,
  PLATE_LIGHT_VARS,
} from "../../utils/colors/LUtilsColors";
import SStylerToolsColors from "../../styler/tools/colors/SStylerToolsColors.vue";

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

  mixins: [LMixinEvents, LMixinStyler],

  components: {
    SStylerToolsColors,
    SStylerIcon,
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
    /**
     * Reset menu status when it's closed.
     */
    isVisible() {
      this.option = null;
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
        "background",
        null,
      );
    },

    showStyleDialog() {
      this.ShowLSettingsBackground(this.el, this.target);
    },

    removeSection() {
      this.$builder.remove(this.section);
    },

    toggleDarkMode() {
      this.target.background.dark = !this.target.background.dark;
    },

    changeBgStyle() {
      //console.log("this.bgStylerStyle", this.bgStylerStyle, this.target);
      this.removeClass(`bg-style-`);
      this.target.classes.push(this.bgStylerStyle);
    },
  },
};
</script>
