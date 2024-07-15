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
      <!-- ―――――――――――――――――― Delete col ―――――――――――――――――― -->

      <template v-if="removeChild">
        <li>
          <button class="styler-button" @click="removeChild">
            <v-icon color="red" size="20">close</v-icon>

            <v-tooltip
              activator="parent"
              content-class="bg-black text-white"
              location="bottom"
            >
              Delete Column
            </v-tooltip>
          </button>
        </li>
        <v-divider class="mx-2" dark inset vertical></v-divider>
      </template>

      <!-- ―――――――――――――――――― Custom Layout (XColumn) ―――――――――――――――――― -->

      <li v-if="hasCustomLayout">
        <button class="styler-button" @click="showCustomLayout">
          <v-icon size="20">fit_screen</v-icon>

          <v-tooltip
            activator="parent"
            content-class="bg-black text-white"
            location="bottom"
          >
            Customize Layout
          </v-tooltip>
          <v-icon size="10" class="absolute-top-end" color="amber">
            auto_awesome
          </v-icon>
        </button>
      </li>

      <!-- ―――――――――――――――――― Size & Class ―――――――――――――――――― -->

      <li>
        <button class="styler-button" @click="showMasterDesignDialog()">
          <v-icon size="20">architecture</v-icon>

          <v-tooltip
            activator="parent"
            content-class="bg-black text-white"
            location="bottom"
          >
            Size & Class
          </v-tooltip>
        </button>
      </li>

      <!-- ―――――――――――――――――― Bg image ―――――――――――――――――― -->

      <li>
        <button class="styler-button" @click="showStyleDialog()">
          <v-icon size="20">fa:fas fa-image</v-icon>
          <v-tooltip
            activator="parent"
            content-class="bg-black text-white"
            location="bottom"
          >
            Background Image / Video / Pattern
          </v-tooltip>
        </button>
      </li>

      <!-- ―――――――――――――――――― Grid ―――――――――――――――――― -->

      <v-divider class="mx-2" inset vertical></v-divider>
      <!-- Row grid use to apply grid to all elements like blogs -->

      <s-styler-tools-devices
        v-model="device"
        :desktop-value="target.data?.grid.desktop"
        :mobile-value="target.data?.grid.mobile"
        :tablet-value="target.data?.grid.tablet"
        :widescreen-value="target.data?.grid.widescreen"
        @update:model-value="selectDevice"
      ></s-styler-tools-devices>
    </ul>

    <!-- ―――――――――――――――――――――――――――――――――――――――――――――――――――――――――― -->
    <!-- ―――――――――――――――――――― Normal editing tools (sub list) ――――――――――――――――――― -->
    <!-- ―――――――――――――――――――――――――――――――――――――――――――――――――――――――――― -->

    <ul class="styler-list flex-grow-1 w-100">
      <!-- ―――――――――――――――――― Grid ―――――――――――――――――― -->

      <li v-if="option === 'columnWidth'">
        <v-btn-toggle
          :model-value="gridValue"
          class="mx-1 my-2"
          density="compact"
          mandatory
          rounded
          selected-class="blue-flat"
        >
          <v-btn
            :value="null"
            @click="setGridValue(null)"
            class="dens-btn"
            size="small"
          >
            <v-icon size="small">close</v-icon>
          </v-btn>
          <v-btn
            v-for="col in 12"
            :key="col"
            :value="col"
            class="dens-btn"
            size="small"
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
import { LMixinEvents } from "../../mixins/events/LMixinEvents";
import SStylerTemplate from "../../styler/template/SStylerTemplate.vue";
import { LMixinStyler } from "../../mixins/styler/LMixinStyler";
import SStylerToolsDevices from "../../styler/tools/devices/SStylerToolsDevices.vue";
import { isObject } from "lodash-es";
import {XColumnObject} from "@selldone/page-builder/components/x/column/XColumnObject.ts";
import {XColumnImageTextObject} from "@selldone/page-builder/components/x/column-image-text/XColumnImageTextObject.ts";

/**
 * v-styler:column
 */
export default {
  name: "SStylerColumn",

  mixins: [LMixinEvents, LMixinStyler],

  components: {
    SStylerToolsDevices,

    SStylerTemplate,
  },
  props: {
    target: {
      required: true,
      type: XColumnObject || XColumnImageTextObject,
    },

    /**
     * Set the location of the proper
     */
    position: {
      type: String,
      default: "bottom",
    },

    removeChild: {
      type: Function,
    },
    hasCustomLayout: {
      type: Boolean,
      default: false,
    },
  },
  data: () => ({
    option: null,
    device: null,

    gridValue: 0,
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
      throw new Error("Target is required for SStylerColumn");
    }

    if (!isObject(this.target.data)) {
      console.error(
        "Invalid target data! Maybe its because of migration from V1 to V2! Target:",
        this.target,
      );
      return;
    }

    if (
      !isObject(this.target.data?.grid) ||
      Array.isArray(this.target.data?.grid)
    ) {
      console.error("Invalid data.grid! Target:", this.target);
      this.target.data.grid = { mobile: 12, tablet: 6, desktop: 4 };
    }
  },
  mounted() {},

  methods: {
    /**
     * SectionSlideShow | Edit slides
     */
    showCustomLayout() {
      this.ShowLSettingsColumn(this.el, this.target);
    },
    showMasterDesignDialog() {
      // Class and style is in the same level of grid!!! not it's child!

      this.ShowLSettingsClassStyle(this.el, this.el, this.target);
    },

    showStyleDialog() {
      this.ShowLSettingsBackground(this.el, this.target);
    },

    selectDevice(device) {
      this.option = "columnWidth";
      this.device = device;

      this.gridValue = this.target.data.grid[device];
    },
    setGridValue(val) {
      this.gridValue = val;

      val = val ? Math.min(Math.max(val, 0), 12) : null;
      console.log(
        "Set column value: ",
        val,
        " Device: ",
        this.device,
        " Target: ",
        this.target.data.grid,
      );

      this.target.data.grid[this.device] = val;
    },
  },
};
</script>
