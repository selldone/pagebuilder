/*
 * Copyright (c) 2023. Selldone® Business OS™
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

import {BackgroundHelper} from "@core/helper/style/BackgroundHelper";
import {Seeder} from "../src/seeder";
import * as types from "../src/types";
import {defineComponent, inject, provide} from "vue";

const SectionMixin = defineComponent({


  beforeCreate() {
    // Get builder from main page editor/viewer
    this.$builder = inject("$builder");

    // Find corresponding section by id
    this.$section = this.$builder.find(this.$props.id);

    // Provide section to all children
    provide("$section", this.$section);

    LOG(`ID: ${this.$props.id} `, "$section", this.$section ? "✅" : "❌");
  },
  updated() {
    try{
      Array.from(this.$el.querySelectorAll("[contentEditable]")).forEach((el: any) => {
        el.contentEditable = this.$builder.isEditing;
      });
    }catch (e){
      console.error('updated | section',e,this);
    }
  },

  //------------------------------------------------- New Common -------------------------------------------------

  data: () => ({
    BACKGROUND_STYLE: null,
    types: types,
  }),

  computed: {
    SHOW_EDIT_TOOLS() {
      return this.$builder.isEditing && !this.$builder.isHideExtra;
    },
    $sectionData() {
      // -------- Fix global common values -------- NO NEED!
      //if(!this.$section.data.background || !Object.keys(this.$section.data.background))this.$section.data.background={bg_gradient:[]};

      // Tips: Remove unset from style to solve conflict with self element classes by unset attributes!

      function removeUnsetStyles(obj) {
        Object.keys(obj).forEach((key) => {
          if (obj[key] === "unset") obj[key] = null;
        });
      }

      // 1. Remove main style:
      if (this.$section.data.style && !Array.isArray(this.$section.data.style))
        removeUnsetStyles(this.$section.data.style);

      // 2. Remove columns style:
      if (this.$section.data.columns)
        this.$section.data.columns.forEach((col) => {
          if (col.style && !Array.isArray(col.style))
            removeUnsetStyles(col.style);
        });

      //LOG('$sectionData',this.$section.data)

      return this.$section.data;
    },

    gridClasses() {
      //if(!this.$sectionData.columns)this.$sectionData.columns=[];

      return this.$sectionData.columns.map((column) => {
        return Object.keys(column.grid ? column.grid : {}).map((device) => {
          if (!column.grid[device]) {
            return "";
          }
          const prefix = this.$builder.columnsPrefix[device];
          return `${prefix}${column.grid[device]}`;
        });
      });
    },
  },

  watch: {
    "$sectionData.background": {
      handler() {
        const background = this.$sectionData.background;
        this.BACKGROUND_STYLE = this.backgroundStyle(background);
      },
      deep: true,
    },
  },

  created() {
    const background = this.$sectionData?.background;
    this.BACKGROUND_STYLE = this.backgroundStyle(background);
  },

  methods: {


    backgroundStyle(background) {
      if (!background) return null;

      return BackgroundHelper.CreateCompleteBackgroundStyleObject(
        background.bg_custom,
        background.bg_gradient,
        background.bg_image ? this.getShopImagePath(background.bg_image) : null,
        background.bg_size,
        background.bg_repeat,
        background.bg_color,
        background.dark,
        background.bg_position,
      );
    },

    addItemToArray(arr, type) {
      //    LOG("Seeder.seed(type)", Seeder.seed(type));
      if (!arr || !Array.isArray(arr)) {
        this.showErrorAlert(
          "Updated cation",
          "This feature available on updated sections! Please add new section by drag and drop!",
        );
        return;
      }
      arr.push(Seeder.seed(type));
    },

    getInstance(type) {
      return Seeder.seed(type);
    },

    calcGridClasses(grid) {
      //if(!this.$sectionData.columns)this.$sectionData.columns=[];

      return Object.keys(grid ? grid : {}).map((device) => {
        if (!grid[device]) {
          return "";
        }
        const prefix = this.$builder.columnsPrefix[device];
        return `${prefix}${grid[device]}`;
      });
    },
  },
});

export default SectionMixin;

function LOG(...text: any) {
 // console.log("🪷 SectionMixin", ...text);
}
