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

      <!-- ―――――――――――――――――― Row Align / Justify ―――――――――――――――――― -->

      <li v-if="hasArrangement">
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
            >Align & Justify Columns
          </v-tooltip>
        </v-btn>
      </li>

      <!-- ―――――――――――――――――― Wrap / Scroll Mode ―――――――――――――――――― -->

      <li v-if="hasWrap">
        <button class="styler-button" @click="toggleNoWrap">
          <v-icon size="20"
            >{{ target.data.no_wrap ? "view_column" : "view_comfy" }}
          </v-icon>
          <v-tooltip
            activator="parent"
            content-class="bg-black text-white"
            location="bottom"
            >Wrap / Nowrap

            <v-img
              :src="
                target.data.no_wrap
                  ? require('../../assets/images/wrap/row-no-wrap.svg')
                  : require('../../assets/images/wrap/row-wrap.svg')
              "
              class="mx-auto op-0-5"
              width="120"
            ></v-img>
          </v-tooltip>
        </button>
      </li>
      <li>
        <button
          class="styler-button"
          @click="target.data.reverse = !target.data.reverse"
        >
          <v-icon
            size="20"
            class="t-all-400"
            :class="{ 'rotate-180': target.data.reverse }"
          >
            arrow_right_alt
          </v-icon>
          <v-tooltip
            activator="parent"
            content-class="bg-black text-white"
            location="bottom"
            >Flex Direction
          </v-tooltip>
        </button>
      </li>
      <!-- ―――――――――――――――――― Add New Column ―――――――――――――――――― -->

      <li v-if="hasAdd">
        <button class="styler-button" @click="addNewColumn()">
          <v-icon color="#CDDC39" size="20">add_box</v-icon>
          <v-tooltip
            activator="parent"
            content-class="bg-black text-white"
            location="bottom"
            >Add New Column
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
import { XColumnObject } from "@selldone/page-builder/components/x/column/XColumnObject";
import { XTextObject } from "@selldone/page-builder/components/x/text/XTextObject";
import { XUploaderObject } from "@selldone/page-builder/components/x/uploader/XUploaderObject";
import { XRowObject } from "@selldone/page-builder/components/x/row/XRowObject";
import { LUtilsClone } from "@selldone/page-builder/utils/clone/LUtilsClone.ts";

export default {
  name: "SStylerRow",

  mixins: [LMixinEvents, LMixinStyler],

  components: {
    SStylerTemplate,
  },
  props: {
    target: {
      required: true,
      type: XRowObject,
      // It's the value of v-styler:arg="value"
    },

    /**
     * Set the location of the proper
     */
    position: {
      type: String,
      default: "right-start",
    },

    keyRow: {
      type: String,
      default: "row",
    },
    keyColumns: {
      type: String,
      default: "columns",
    },

    /**
     * Initial column structure for adding new column
     */
    /* columnStructure: {
       type: Array,
       default: () => ["h3", "img", "p"],
     },*/

    hasWrap: {
      type: Boolean,
      default: false,
    },
    hasArrangement: {
      type: Boolean,
      default: false,
    },
    hasAdd: {
      type: Boolean,
      default: false,
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
      throw new Error("Target is required for SStylerRow");
    }
  },
  mounted() {},

  methods: {
    /**
     * XRow | Add new column
     */
    addNewColumn() {

      if (!this.target.children.length) {
        // Create default structure:
        const new_column = XColumnObject.Seed(12, 6, 4);
        new_column.addChild(XUploaderObject.Seed(1, true));
        new_column.addChild(
          XTextObject.Seed("Enter your headline here...", "h3"),
        );
        new_column.addChild(
          XTextObject.Seed(
            "Write your main content here, including key details about your topic, ensuring to cover the main elements of discussion or description...",
            "p",
          ),
        );
        this.target.addChild(new_column);
      } else {
        const child = this.target.children[this.target.children.length - 1];


        this.target.addChild(LUtilsClone.CloneElement(child));
      }
    },

    toggleNoWrap() {
      this.target.data.no_wrap = !this.target.data.no_wrap;
    },

    showMasterDesignDialog() {
      this.ShowLSettingsClassStyle(this.el, this.el, this.target);
    },
  },
};
</script>
