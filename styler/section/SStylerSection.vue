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

      <s-styler-tools-background :target="target"></s-styler-tools-background>

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
                icon
                :variant="isSelected ? 'flat' : 'text'"
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
        <v-sheet color="#222" rounded="xl" class="overflow-hidden mb-1">
          <v-btn
            :color="!target.data.hide.sm ? 'primary' : '#fff'"
            @click="target.data.hide.sm = !target.data.hide.sm"
            variant="flat"
            class="ma-1 rounded-s-xl"
            stacked
            size="x-small"
            height="44"
          >
            <v-icon
              >{{ target.data.hide.sm ? "visibility_off" : "visibility" }}
            </v-icon>
            <div class="x-small tnt mt-1">
              <v-icon size="12" class="me-1">smartphone</v-icon>
              Mobile
            </div>
          </v-btn>

          <v-btn
            :color="!target.data.hide.md ? 'primary' : '#fff'"
            @click="target.data.hide.md = !target.data.hide.md"
            variant="flat"
            class="my-1 me-1"
            stacked
            size="x-small"
            height="44"
          >
            <v-icon
              >{{ target.data.hide.md ? "visibility_off" : "visibility" }}
            </v-icon>

            <div class="x-small tnt mt-1">
              <v-icon size="12" class="me-1">tablet_android</v-icon>
              Tablet
            </div>
          </v-btn>

          <v-btn
            :color="!target.data.hide.lg ? 'primary' : '#fff'"
            @click="target.data.hide.lg = !target.data.hide.lg"
            variant="flat"
            class="my-1"
            stacked
            size="x-small"
            height="44"
          >
            <v-icon
              >{{ target.data.hide.lg ? "visibility_off" : "visibility" }}
            </v-icon>

            <div class="x-small tnt mt-1">
              <v-icon size="12" class="me-1">laptop</v-icon>
              Normal
            </div>
          </v-btn>

          <v-btn
            :color="!target.data.hide.xl ? 'primary' : '#fff'"
            @click="target.data.hide.xl = !target.data.hide.xl"
            variant="flat"
            class="ma-1 rounded-e-xl"
            stacked
            size="x-small"
            height="44"
          >
            <v-icon
              >{{ target.data.hide.xl ? "visibility_off" : "visibility" }}
            </v-icon>

            <div class="x-small tnt mt-1">
              <v-icon size="12" class="me-1">desktop_windows</v-icon>
              Large
            </div>
          </v-btn>
        </v-sheet>

        <v-sheet color="#222" rounded="xl" class="overflow-hidden d-flex mb-1">
          <v-btn
            :color="!target.data.hide.guest ? 'primary' : '#fff'"
            @click="
              () => {
                target.data.hide.guest = !target.data.hide.guest;
                if (target.data.hide.guest) target.data.hide.user = false;
              }
            "
            variant="flat"
            class="ma-1 rounded-s-xl flex-grow-1"
            stacked
            size="x-small"
            height="44"
          >
            <v-icon
              >{{ target.data.hide.guest ? "visibility_off" : "visibility" }}
            </v-icon>
            <div class="x-small tnt mt-1">
              <v-icon size="12" class="me-1">person_outline</v-icon>
              Guest
            </div>
          </v-btn>

          <v-btn
            :color="!target.data.hide.user ? 'primary' : '#fff'"
            @click="
              () => {
                target.data.hide.user = !target.data.hide.user;
                if (target.data.hide.user) target.data.hide.guest = false;
              }
            "
            variant="flat"
            class="ma-1 rounded-e-xl flex-grow-1"
            stacked
            size="x-small"
            height="44"
          >
            <v-icon
              >{{ target.data.hide.user ? "visibility_off" : "visibility" }}
            </v-icon>

            <div class="x-small tnt mt-1">
              <v-icon size="12" class="me-1">account_circle</v-icon>
              User
            </div>
          </v-btn>
        </v-sheet>
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
import { XSectionObject } from "@selldone/page-builder/components/x/section/XSectionObject.ts";
import SStylerToolsBackground from "@selldone/page-builder/styler/tools/background/SStylerToolsBackground.vue";

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
    SStylerToolsBackground,
    SStylerToolsColors,
    SStylerIcon,
    SStylerTemplate,
  },
  props: {
    target: {
      required: true,
      type: XSectionObject,
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
      this.ShowLSettingsClassStyle(this.el, this.el, this.target);
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
