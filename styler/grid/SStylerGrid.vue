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
      <!-- ―――――――――――――――――― Grid ―――――――――――――――――― -->
      <s-styler-tools-devices
        v-model="device"
        :desktop-value="target[keyGrid].desktop"
        :mobile-value="target[keyGrid].mobile"
        :tablet-value="target[keyGrid].tablet"
        :widescreen-value="target[keyGrid].widescreen"
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
          v-model="gridValue"
          class="mx-1 my-2"
          density="compact"
          mandatory
          rounded
          selected-class="blue-flat"
        >
          <v-btn :value="null" class="dens-btn" size="small">
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
import { LMixinEvents } from "@app-page-builder/mixins/events/LMixinEvents";
import SStylerTemplate from "@app-page-builder/styler/template/SStylerTemplate.vue";
import { LMixinStyler } from "@app-page-builder/mixins/styler/LMixinStyler";
import SStylerToolsDevices from "@app-page-builder/styler/tools/devices/SStylerToolsDevices.vue";

/**
 * v-styler:grid

 */
export default {
  name: "SStylerGrid",

  mixins: [LMixinEvents, LMixinStyler],

  components: {
    SStylerToolsDevices,
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
      default: "bottom",
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

    /**
     * Reset menu status when it's closed.
     */
    isVisible() {
      this.option = null;
    },
  },
  beforeMount() {
    if (!this.target) {
      throw new Error("Target is required for SStylerGrid");
    }
  },
  mounted() {},

  methods: {
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
