/*
 * Copyright (c) 2023-2024. Selldone® Business OS™
 *
 * Author: M.Pajuhaan
 * Web: https://selldone.com
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 *
 * All rights reserved. In the weave of time, where traditions and innovations intermingle, this content was crafted.
 * From the essence of thought, through the corridors of creativity, each word, and sentiment has been molded.
 * Not just to exist, but to inspire. Like an artist's stroke or a sculptor's chisel, every nuance is deliberate.
 * Our journey is not just about reaching a destination, but about creating a masterpiece.
 * Tread carefully, for you're treading on dreams.
 */

import {LUtilsBackground} from "../../utils/background/LUtilsBackground";
import {LUtilsSeeder} from "../../utils/seeder/LUtilsSeeder";
import * as types from "../../src/types/types";
import {Background, Column, Grid} from "../../src/types/types";
import {defineComponent, inject, provide} from "vue";
import {Section} from "../../src/section/section";
import Builder from "../../Builder.ts";

const DEBUG = false;

interface DataProps {
  $builder: Builder | null; // Replace 'any' with the actual type of $builder
  $section: Section | null;
}

const LMixinSection = defineComponent({
  props: {
    sectionData: {}, // Old version
    sectionObject: {}, // 🪵 New version
  },
  data(): DataProps {
    return {
      $builder: null,
      $section: null,
    };
  },

  beforeCreate() {
    // Get builder from main page editor/viewer
    this.$builder = inject("$builder");

    // Find corresponding section by id
    this.$section = this.$builder.find(this.$props.id) as Section;

    // Provide section to all children
    provide("$section", this.$section);

    LOG(`ID: ${this.$props.id} `, "$section", this.$section ? "✅" : "❌");
  },

  updated() {
    try {
      Array.from(this.$el.querySelectorAll("[contentEditable]")).forEach(
        (el: any) => {
          el.contentEditable = this.$builder.isEditing;
        },
      );
    } catch (e) {
      console.error("updated | section", e, this);
    }
  },

  computed: {
    SHOW_EDIT_TOOLS() {
      return this.$builder.isEditing && !this.$builder.isHideExtra;
    },
    /**
     * 🪵 New version
     */
    $sectionObject(){
      return this.sectionObject;
    },

    /**
     * Old version
     */
    $sectionData() {
      // Tips: Remove unset from style to solve conflict with self element classes by unset attributes!

      function removeUnsetStyles(obj: Record<string, any>) {
        Object.keys(obj).forEach((key) => {
          if (obj[key] === "unset") obj[key] = null;
        });
      }

      // 1. Remove main style:
      if (
        (this.$section as Section).data.style &&
        !Array.isArray(this.sectionData.style)
      )
        removeUnsetStyles(this.sectionData.style);

      // 2. Remove columns style:
      if (this.sectionData.columns)
        (this.$section as Section).data.columns.forEach((col: Column) => {
          if (col.style && !Array.isArray(col.style))
            removeUnsetStyles(col.style);
        });
      // console.log("$sectionData Updated:",this.sectionData);
      return this.sectionData;
    },

    /**
     * Generates grid classes for each column based on the device type.
     * @returns {string[][]} An array of arrays containing grid classes for each column.
     */
    gridClasses(): string[][] {
      return this.$sectionData.columns.map((column: types.Column) => {
        return (Object.keys(column.grid ?? {}) as (keyof Grid)[]).map(
          (device) => {
            const gridValue = column.grid?.[device];
            if (!gridValue) {
              return "";
            }
            const prefix = this.$builder.columnsPrefix[device];
            return `${prefix}${gridValue}`;
          },
        );
      });
    },
  },

  watch: {},

  created() {},

  methods: {
    backgroundStyle(background: Background) {
      if (!background) return null;

      return LUtilsBackground.CreateCompleteBackgroundStyleObject(
        background.bg_custom,
        background.bg_gradient,
        background.bg_image ? this.getShopImagePath(background.bg_image) : null,
        background.bg_size,
        background.bg_repeat,
        background.bg_color,
        background.dark,
        background.bg_position,
        background.bg_rotation,
        background.bg_backdrop,
      );
    },

    getInstance(type: any) {
      return LUtilsSeeder.seed(type);
    },
  },
});

export default LMixinSection;

function LOG(...text: any) {
  if (DEBUG) console.log("🪷 SectionMixin", ...text);
}
