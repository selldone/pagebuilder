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
      <!-- ―――――――――――――――――― Row Align / Justify ―――――――――――――――――― -->

      <li>
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
            >Align & Justify buttons
          </v-tooltip>
        </v-btn>
      </li>

      <!-- ―――――――――――――――――― XButtons List (Add Button) ―――――――――――――――――― -->

      <li>
        <button class="styler-button" @click="addNewButton()">
          <v-icon color="#CDDC39" size="20">add_box</v-icon>
          <v-tooltip
            activator="parent"
            content-class="bg-black text-white"
            location="bottom"
            >Add new button
          </v-tooltip>
        </button>
      </li>
    </ul>

    <!-- ―――――――――――――――――――――――――――――――――――――――――――――――――――――――――― -->
    <!-- ―――――――――――――――――――― Normal editing tools (sub list) ――――――――――――――――――― -->
    <!-- ―――――――――――――――――――――――――――――――――――――――――――――――――――――――――― -->

    <ul class="styler-list">
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

<script lang="ts">
import ALIGN from "../../src/enums/ALIGN";
import JUSTIFY from "../../src/enums/JUSTIFY";
import { LMixinEvents } from "../../mixins/events/LMixinEvents";
import SStylerTemplate from "../../styler/template/SStylerTemplate.vue";
import { LMixinStyler } from "../../mixins/styler/LMixinStyler";
import { XButtonObject } from "@selldone/page-builder/components/x/button/XButtonObject";
import { XRowObjectData } from "@selldone/page-builder/components/x/row/XRowObjectData.ts";

export default {
  name: "SStylerButtons",

  mixins: [LMixinEvents, LMixinStyler],

  components: {
    SStylerTemplate,
  },
  props: {
    target: {
      required: true,
      type: Object,
      // It's the value of v-styler:arg="value"
    },

    /**
     * Set the location of the proper
     */
    position: {
      type: String,
      default: "left-center",
    },
  },
  data: () => ({
    ALIGN: ALIGN,
    JUSTIFY: JUSTIFY,

    show_align: false,
  }),

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
    // Auto seed buttons if not exist
    if (!this.target.children) {
      console.error("Invalid children.", this.target);
    }
    if (!(this.target.data instanceof XRowObjectData)) {
      console.error(
        "Invalid data type! It should be XRowData.",
        this.target.data,
      );
    }
  },
  mounted() {},

  methods: {
    /**
     * XButtons | Add button
     */
    addNewButton() {
      this.target.addChild(XButtonObject.Seed());
    },
  },
};
</script>
