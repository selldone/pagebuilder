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
      <!-- ―――――――――――――――――― Edit Code ―――――――――――――――――― -->

      <li>
        <v-btn
          class="styler-button"
          icon
          size="42"
          variant="text"
          @click="showCodeEditor()"
        >
          <img v-if="target.data.mode==='vue'" :src="require('../../assets/images/frameworks/vue.svg')" width="20" height="20">
          <v-icon v-else size="20">code</v-icon>

          <v-tooltip
            activator="parent"
            content-class="bg-black text-white"
            location="bottom"
            >Edit Code
          </v-tooltip>
        </v-btn>
      </li>

      <!-- ―――――――――――――――――― Set Custom Properties ―――――――――――――――――― -->

      <li>
        <button class="styler-button" @click="showProperties()">
          <v-icon color="#fff" size="20">data_object</v-icon>
          <v-tooltip
            activator="parent"
            content-class="bg-black text-white"
            location="bottom"
            >Change Properties
          </v-tooltip>
          <v-icon size="10" class="absolute-top-end" color="amber">
            auto_awesome
          </v-icon>
        </button>
      </li>

      <!-- ―――――――――――――――――― Refresh Component ―――――――――――――――――― -->

      <li v-if="refresh">
        <button class="styler-button" @click="refresh()">
          <v-icon color="#fff" size="20">refresh</v-icon>
          <v-tooltip
            activator="parent"
            content-class="bg-black text-white"
            location="bottom"
            >Refresh & Recreate Component
          </v-tooltip>
        </button>
      </li>
    </ul>

    <!-- ―――――――――――――――――――――――――――――――――――――――――――――――――――――――――― -->
    <!-- ―――――――――――――――――――― Normal editing tools (sub list) ――――――――――――――――――― -->
    <!-- ―――――――――――――――――――――――――――――――――――――――――――――――――――――――――― -->
  </s-styler-template>
</template>

<script lang="ts">
import { LMixinEvents } from "../../mixins/events/LMixinEvents";
import SStylerTemplate from "../../styler/template/SStylerTemplate.vue";
import { LMixinStyler } from "../../mixins/styler/LMixinStyler";
import {XCodeObject} from "@selldone/page-builder/components/x/code/XCodeObject.ts";

/**
 * v-styler:code
 */
export default {
  name: "SStylerCode",

  mixins: [LMixinEvents, LMixinStyler],

  components: {
    SStylerTemplate,
  },
  props: {
    target: {
      required: true,
      type: XCodeObject,
      // It's the value of v-styler:arg="value"
    },

    /**
     * Set the location of the proper
     */
    position: {
      type: String,
      default: "top",
    },

    keyCode: {
      type: String,
      default: "html",
    },
    keyProperties: {
      type: String,
      default: "properties",
    },

    /**
     * Structure of properties in the component
     */
    structure: Object,
    /**
     * Default value of properties in the component
     */
    defaultValues: Object,
    /**
     * A callback refresh function to refresh code in component
     */
    refresh: {},
  },
  data: () => ({}),

  computed: {},
  watch: {
    /**
     * Reset menu status when it's closed.
     */
    isVisible() {
      this.show_align = false;
    },
  },
  beforeCreate() {
    if (!this.target) {
      throw new Error("Target is required for SStylerButtons");
    }
  },
  mounted() {},

  methods: {
    showCodeEditor() {
      this.ShowLSettingsCodeEditor(
        this.el,
        this.section,
        this.target,
        this.refresh,
      );
    },

    showProperties() {
      this.ShowLSettingsCodeProperties(
        this.el,
        this.section,
        this.target,
        this.structure,
        this.defaultValues,
      );
    },
  },
};
</script>
