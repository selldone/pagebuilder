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
    type="buttons-row"
    :builder="builder"
    :is-visible="isVisible"
  >
    <!-- Important: Display non because of preventing proper error -->

    <!-- ―――――――――――――――――――――――――――――――――――――――――――――――――――――――――― -->
    <!-- ――――――――――――――――――――――― Normal editing tools ―――――――――――――――――――――― -->
    <!-- ―――――――――――――――――――――――――――――――――――――――――――――――――――――――――― -->

    <ul class="styler-list">
      <!-- ―――――――――――――――――― Row Align / Justify ―――――――――――――――――― -->

      <li>
        <v-btn
          class="styler-button"
          @click="show_align = true"
          icon
          variant="text"
          size="42"
          :disabled="show_align"
        >
          <v-icon dark size="20">vertical_distribute</v-icon>

          <v-tooltip
            activator="parent"
            location="bottom"
            content-class="bg-black white--text"
            >Align & Justify buttons
          </v-tooltip>
        </v-btn>
      </li>

      <!-- ―――――――――――――――――― XButtons List (Add Button) ―――――――――――――――――― -->

      <li>
        <button
          class="styler-button"
          @click="addNewButton()"
        >
          <v-icon dark size="20" color="#CDDC39">add_box</v-icon>
          <v-tooltip
            activator="parent"
            location="bottom"
            content-class="bg-black white--text"
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
          v-model="target[keyRow].align"
          class="ma-1"
          rounded="xl"
          theme="dark"
          selected-class="green-flat"
          style="min-height: 48px"
        >
          <v-btn v-for="it in ALIGN" :key="it.val" :value="it.val" icon="">
            <v-icon class="flip-image-rtl" size="20">{{ it.icon }}</v-icon>
            <v-tooltip
              v-if="it.title"
              activator="parent"
              location="bottom"
              content-class="bg-black white--text"
              >{{ it.title }}
            </v-tooltip>
          </v-btn>
        </v-btn-toggle>
        <v-btn-toggle
          v-model="target[keyRow].justify"
          class="ma-1"
          rounded="xl"
          theme="dark"
          selected-class="blue-flat"
          style="min-height: 48px"
        >
          <v-btn v-for="it in JUSTIFY" :key="it.val" :value="it.val" icon>
            <v-icon class="flip-image-rtl" size="20">{{ it.icon }}</v-icon>
            <v-tooltip
              v-if="it.title"
              activator="parent"
              location="bottom"
              content-class="bg-black white--text"
              >{{ it.title }}
            </v-tooltip>
          </v-btn>
        </v-btn-toggle>
      </div>
    </ul>
  </s-styler-template>
</template>

<script>
import * as types from "@app-page-builder/src/types";
import { Seeder } from "@app-page-builder/src/seeder";
import ALIGN from "@app-page-builder/src/enums/ALIGN";
import JUSTIFY from "@app-page-builder/src/enums/JUSTIFY";
import { PageBuilderMixin } from "@app-page-builder/mixins/PageBuilderMixin";
import { LandingHistoryMixin } from "@app-page-builder/mixins/LandingToolsMixin";
import SStylerTemplate from "@app-page-builder/styler/template/SStylerTemplate.vue";
import { StylerMixin } from "@app-page-builder/mixins/StylerMixin";

export default {
  name: "SStylerButtons",

  mixins: [PageBuilderMixin, LandingHistoryMixin, StylerMixin],

  components: {
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
      // It's the value of v-styler:arg="value"
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
      default: "left-center",
    },

    keyRow: {
      type: String,
      default: "btn_row",
    },
    keyButtons: {
      type: String,
      default: "buttons",
    },
  },
  data: () => ({
    ALIGN: ALIGN,
    JUSTIFY: JUSTIFY,

    show_align: false,

  }),

  computed: {},
  watch: {
    show_align() {
      this.updatePopper();
    },
    /**
     * Reset menu status when it's closed.
     */
    isVisible() {
      this.show_align = false;
      this.updatePopper();
    },
  },
  beforeCreate() {
    if (!this.target) {
      throw new Error("Target is required for SStylerButtons");
    }
    // Auto seed buttons if not exist
    if (!this.target[this.keyButtons]) this.target[this.keyButtons] = [];
    if (this.target[this.keyRow])
      this.target[this.keyRow] = {
        align: "center",
        justify: "space-around",
      };
  },
  mounted() {},

  methods: {
    /**
     * XButtons | Add button
     */
    addNewButton() {
      this.target[this.keyButtons].push(Seeder.seed(types.Button));
    },
  },
};
</script>