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
    :bindingValue="bindingValue"
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
          title="Align & Justify"
          icon variant="text" size="42"
          :disabled="show_align"
        >
          <v-icon dark size="20">vertical_distribute</v-icon>
        </v-btn>
      </li>

      <!-- ―――――――――――――――――― XButtons List (Add Button) ―――――――――――――――――― -->

      <li>
        <button
          class="styler-button"
          @click="addNewButton()"
          title="Add new button"
        >
          <v-icon dark size="20" color="#CDDC39">add_box</v-icon>
        </button>
      </li>
    </ul>

    <!-- ―――――――――――――――――――――――――――――――――――――――――――――――――――――――――― -->
    <!-- ―――――――――――――――――――― Normal editing tools (sub list) ――――――――――――――――――― -->
    <!-- ―――――――――――――――――――――――――――――――――――――――――――――――――――――――――― -->

    <ul class="styler-list">
      <!-- ―――――――――――――――――― Row Align / Justify ―――――――――――――――――― -->

      <div v-if="show_align" class="d-flex flex-column align-center">
        <v-btn-toggle
          v-model="bindingValue.target[key_row].align"
          class="m-3"
          rounded="xl"
          theme="dark"
          selected-class="green-flat"
          style="min-height: 48px"
        >
          <v-btn v-for="it in ALIGN" :key="it.val" :value="it.val" icon="">
            <v-icon class="flip-image-rtl" size="20">{{ it.icon }}</v-icon>
            <v-tooltip v-if="it.title" activator="parent" location="bottom" content-class="bg-black white--text"
              >{{ it.title }}
            </v-tooltip>
          </v-btn>
        </v-btn-toggle>
        <v-btn-toggle
          v-model="bindingValue.target[key_row].justify"
          class="m-3"
          rounded="xl"
          theme="dark"
          selected-class="blue-flat"
          style="min-height: 48px"
        >
          <v-btn v-for="it in JUSTIFY" :key="it.val" :value="it.val" icon>
            <v-icon class="flip-image-rtl" size="20">{{ it.icon }}</v-icon>
            <v-tooltip v-if="it.title" activator="parent" location="bottom" content-class="bg-black white--text"
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
import PageEventBusMixin from "@app-page-builder/mixins/PageEventBusMixin";
import { LandingHistoryMixin } from "@app-page-builder/mixins/LandingToolsMixin";
import SStylerTemplate from "@app-page-builder/styler/SStylerTemplate.vue";
import Popper from "popper.js";
import {StylerMixin} from "@app-page-builder/mixins/StylerMixin";

export default {
  name: "SStylerButtons",

  mixins: [PageBuilderMixin, LandingHistoryMixin,StylerMixin],

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

    bindingValue: {
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

  },
  data: () => ({



    ALIGN: ALIGN,
    JUSTIFY: JUSTIFY,

    show_align: false,

    row_align: "center",
    row_justify: "space-around",
  }),

  computed: {
    key_row() {
      return this.bindingValue.key_row ? this.bindingValue.key_row : "btn_row";
    },
    key_buttons() {
      return this.bindingValue.key_buttons
        ? this.bindingValue.key_buttons
        : "buttons";
    },
  },
  watch: {
    show_align(){
      this.updatePopper()
    },
    /**
     * Reset menu status!
     */
    isVisible(){
      this.show_align=false;
    }
  },
  beforeCreate() {
    // Auto seed buttons if not exist
    if (!this.bindingValue.target[this.key_buttons])
      this.bindingValue.target[this.key_buttons] = [];
    if (this.bindingValue.target[this.key_row])
      this.bindingValue.target[this.key_row] = {
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
      this.bindingValue.target[this.key_buttons].push(Seeder.seed(types.Button));
    },






  },
};
</script>
