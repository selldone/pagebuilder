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
          class="styler-button"
          icon
          size="42"
          variant="text"
          @click="showGallerySettings()"
        >
          <v-icon  size="20">tune</v-icon>

          <v-tooltip
            activator="parent"
            content-class="bg-black text-white"
            location="bottom"
            >Add New Slide
          </v-tooltip>
        </v-btn>
      </li>

      <!-- ―――――――――――――――――― XButtons List (Add Button) ―――――――――――――――――― -->

      <li>
        <button class="styler-button" @click="addNewSlide()">
          <v-icon color="#CDDC39"  size="20">add_photo_alternate</v-icon>
          <v-tooltip
            activator="parent"
            content-class="bg-black text-white"
            location="bottom"
            >Add New Slide
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
import * as types from "../../src/types/types";
import { LUtilsSeeder } from "../../utils/seeder/LUtilsSeeder";
import { LMixinEvents } from "../../mixins/events/LMixinEvents";
import SStylerTemplate from "../../styler/template/SStylerTemplate.vue";
import { LMixinStyler } from "../../mixins/styler/LMixinStyler";
import {
  XGalleryExpandableObject
} from "@selldone/page-builder/components/x/gallery-expandable/XGalleryExpandableObject.ts";
import {
  XGalleryExpandableItemObject
} from "@selldone/page-builder/components/x/gallery-expandable/item/XGalleryExpandableItemObject.ts";

export default {
  name: "SStylerGallery",

  mixins: [LMixinEvents, LMixinStyler],

  components: {
    SStylerTemplate,
  },
  props: {
    target: {
      required: true,
      type: XGalleryExpandableObject,
      // It's the value of v-styler:arg="value"
    },

    /**
     * Set the location of the proper
     */
    position: {
      type: String,
      default: "top",
    },

  /*  keyColumns: {
      type: String,
      default: "columns",
    },*/
    columnStructure: {
      type: Object,
      default: () => ({
        title: types.Title,
        image: types.Image,
      }),
    },
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
    showGallerySettings() {
      this.ShowLSettingsGallery(
        this.el,
        this.section,
        this.target,
      );
    },

    addNewSlide() {
      this.target.addChild(
        XGalleryExpandableItemObject.Seed(),
      );

    },
  },
};
</script>
