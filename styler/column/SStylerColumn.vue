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
    type="column"
    :builder="builder"
    :is-visible="isVisible"
  >
    <!-- Important: Display non because of preventing proper error -->

    <!-- ―――――――――――――――――――――――――――――――――――――――――――――――――――――――――― -->
    <!-- ――――――――――――――――――――――― Normal editing tools ―――――――――――――――――――――― -->
    <!-- ―――――――――――――――――――――――――――――――――――――――――――――――――――――――――― -->

    <ul class="styler-list">
      <!-- ―――――――――――――――――― Delete col ―――――――――――――――――― -->

      <template v-if="removeColumn">
        <li>
          <button class="styler-button" @click="removeColumn">
            <v-icon color="red" size="20">close</v-icon>

            <v-tooltip
              activator="parent"
              location="bottom"
              content-class="bg-black white--text"
              attach
            >
              Delete Column
            </v-tooltip>
          </button>
        </li>
        <v-divider class="mx-2" vertical dark inset></v-divider>
      </template>

      <!-- ―――――――――――――――――― Custom Layout (XColumn) ―――――――――――――――――― -->

      <li v-if="hasCustomLayout">
        <button class="styler-button" @click="showCustomLayout">
          <v-icon size="20" dark>fit_screen</v-icon>

          <v-tooltip
            activator="parent"
            location="bottom"
            content-class="bg-black white--text"
            attach
          >
            Customize Layout
          </v-tooltip>
        </button>
      </li>

      <!-- ―――――――――――――――――― Size & Class ―――――――――――――――――― -->

      <li>
        <button class="styler-button" @click="showMasterDesignDialog()">
          <v-icon dark size="20">architecture</v-icon>

          <v-tooltip
            activator="parent"
            location="bottom"
            content-class="bg-black white--text"
            attach
          >
            Size & Class
          </v-tooltip>
        </button>
      </li>

      <!-- ―――――――――――――――――― Bg image ―――――――――――――――――― -->

      <li>
        <button class="styler-button" @click="showStyleDialog()">
          <v-icon size="20" dark>fa:fas fa-image</v-icon>
          <v-tooltip
            activator="parent"
            location="bottom"
            content-class="bg-black white--text"
            attach
          >
            Background
          </v-tooltip>
        </button>
      </li>

      <!-- ―――――――――――――――――― Grid ―――――――――――――――――― -->

      <v-divider class="mx-2" vertical inset></v-divider>
      <!-- Row grid use to apply grid to all elements like blogs -->

      <s-styler-tools-devices
        v-model="device"
        @update:model-value="selectDevice"
        :mobile-value="target[keyGrid].mobile"
        :tablet-value="target[keyGrid].tablet"
        :desktop-value="target[keyGrid].desktop"
        :widescreen-value="target[keyGrid].widescreen"
      ></s-styler-tools-devices>
    </ul>

    <!-- ―――――――――――――――――――――――――――――――――――――――――――――――――――――――――― -->
    <!-- ―――――――――――――――――――― Normal editing tools (sub list) ――――――――――――――――――― -->
    <!-- ―――――――――――――――――――――――――――――――――――――――――――――――――――――――――― -->

    <ul class="styler-list flex-grow-1 w-100">
      <!-- ―――――――――――――――――― Grid ―――――――――――――――――― -->

      <li v-if="option === 'columnWidth'">
        <v-btn-toggle
          v-model="gridValue"
          rounded
          mandatory
          density="compact"
          selected-class="blue-flat"
          class="mx-1 my-2"
        >
          <v-btn :value="null" size="small" class="dens-btn">
            <v-icon size="small">close</v-icon>
          </v-btn>
          <v-btn
            v-for="col in 12"
            :key="col"
            :value="col"
            size="small"
            class="dens-btn"
            @click="setGridValue(col)"
          >
            {{ col }}
          </v-btn>
        </v-btn-toggle>
      </li>
    </ul>
  </s-styler-template>
</template>

<script>
import { PageBuilderMixin } from "@app-page-builder/mixins/PageBuilderMixin";
import { LandingHistoryMixin } from "@app-page-builder/mixins/LandingToolsMixin";
import SStylerTemplate from "@app-page-builder/styler/template/SStylerTemplate.vue";
import { StylerMixin } from "@app-page-builder/mixins/StylerMixin";
import SStylerToolsDevices from "@app-page-builder/styler/tools/devices/SStylerToolsDevices.vue";
import { isObject } from "lodash-es";

/**
 * v-styler:column
 */
export default {
  name: "SStylerColumn",

  mixins: [PageBuilderMixin, LandingHistoryMixin, StylerMixin],

  components: {
    SStylerToolsDevices,

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
      default: "bottom",
    },

    removeColumn: {
      type: Function,
    },
    hasCustomLayout: {
      type: Boolean,
      default: false,
    },

    keyGrid: {
      type: String,
      default: "grid",
    },
  },
  data: () => ({
    option: null,
    device: null,

    gridValue: 0,
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
      throw new Error("Target is required for SStylerColumn");
    }
    if (
      !isObject(this.target[this.keyGrid]) ||
      Array.isArray(this.target[this.keyGrid])
    ) {
      this.target[this.keyGrid] = { mobile: 12, tablet: 6, desktop: 4 };
    }
  },
  mounted() {},

  methods: {
    /**
     * SectionSlideShow | Edit slides
     */
    showCustomLayout() {
      this.ShowSLandingToolsColumnLayout(this.el, this.target);
    },
    showMasterDesignDialog() {
      // Class and style is in the same level of grid!!! not it's child!

      this.ShowGlobalStyleEditorDialog(
        this.el,
        this.el,
        this.target,
        `style`,
        `classes`,
      );
    },

    showStyleDialog() {
      this.ShowGlobalBackgroundEditorDialog(this.el, this.target, `background`);
    },

    selectDevice(device) {
      this.option = "columnWidth";
      this.device = device;

      this.gridValue = this.target[this.keyGrid][device];
    },
    setGridValue(val) {
      val = Math.min(Math.max(val, 0), 12);

      this.target[this.keyGrid][this.device] = val;
    },
  },
};
</script>
