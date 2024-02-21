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
    type="grid"
    :builder="builder"
    :is-visible="isVisible"
  >
    <!-- Important: Display non because of preventing proper error -->

    <!-- ―――――――――――――――――――――――――――――――――――――――――――――――――――――――――― -->
    <!-- ――――――――――――――――――――――― Normal editing tools ―――――――――――――――――――――― -->
    <!-- ―――――――――――――――――――――――――――――――――――――――――――――――――――――――――― -->

    <ul class="styler-list">
      <!-- ―――――――――――――――――― Grid ―――――――――――――――――― -->
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

/**
 * v-styler:grid

 */
export default {
  name: "SStylerGrid",

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