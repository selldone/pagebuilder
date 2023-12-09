<!--
  - Copyright (c) 2023. Selldone® Business OS™
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
  <v-navigation-drawer
    v-model="dialog_resize"
    dark
    right
    fixed
    :width="
      $vuetify.breakpoint.xl ? 560 : $vuetify.breakpoint.lgAndUp ? 420 : 320
    "
    stateless
    hide-overlay
    color="#1e1e1e"
    class="x-page-builder-options-slider"
  >
    <v-card class="text-start" flat>
      <v-card-actions>
        <div class="widget-buttons">
          <v-btn text @click="toggleSizeMode()" x-large>
            <v-icon class="me-1">refresh</v-icon>Default</v-btn
          >

          <v-btn text @click="dialog_resize = false" x-large>
            <v-icon class="me-1">close</v-icon>
            {{ $t("global.actions.close") }}</v-btn
          >
        </div>
      </v-card-actions>

      <v-card-text v-if="dialog_pre">
        <s-widget-header
          title="Image Size"
          icon="photo_size_select_large"
        ></s-widget-header>
        <v-subheader></v-subheader>

        <div class="img-prev-con bg-tiny-checkers-dark thin-scroll mb-3">
          <v-img
            :src="getShopImagePath(src)"
            :aspect-ratio="setting.aspect"
            :contain="setting.contain"
            :height="h"
            :width="w"
            :min-height="min_h"
            :min-width="min_w"
            :max-height="max_h"
            :max-width="max_w"
            class="bg-amber-soft"
          >
          </v-img>
        </div>

        <s-widget-header
          title="Preferred size"
          icon="fullscreen"
        ></s-widget-header>

        <v-row class="max-w-640 mx-auto">
          <v-col cols="12" sm="6">
            <s-number-dimension-input
              dense
              label="Width"
              v-model="w"
            ></s-number-dimension-input>
          </v-col>
          <v-col cols="12" sm="6">
            <s-number-dimension-input
              dense
              label="Height"
              v-model="h"
            ></s-number-dimension-input>
          </v-col>
        </v-row>

        <s-widget-header
          title="Minimum size"
          icon="fullscreen_exit"
        ></s-widget-header>

        <v-row class="max-w-640 mx-auto">
          <v-col cols="12" sm="6">
            <s-number-dimension-input
              dense
              label="Min Width"
              v-model="min_w"
            ></s-number-dimension-input>
          </v-col>
          <v-col cols="12" sm="6">
            <s-number-dimension-input
              dense
              label="Min Height"
              v-model="min_h"
            ></s-number-dimension-input>
          </v-col>
        </v-row>

        <s-widget-header
          title="Maximum size"
          icon="crop_free"
        ></s-widget-header>

        <v-row class="max-w-640 mx-auto">
          <v-col cols="12" sm="6">
            <s-number-dimension-input
              dense
              label="Max Width"
              v-model="max_w"
            ></s-number-dimension-input>
          </v-col>
          <v-col cols="12" sm="6">
            <s-number-dimension-input
              dense
              label="Max Height"
              v-model="max_h"
            ></s-number-dimension-input>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
  </v-navigation-drawer>
</template>

<script>
import SNumberDimensionInput from "@components/ui/dimension/SNumberDimensionInput.vue";
import EventBusTriggers from "@core/enums/event-bus/EventBusTriggers";
import { HighlightEditingElements } from "@app-page-builder/src/helpers/HighlightEditingElements";
import _ from "lodash-es";
export default {
  name: "GlobalImageSizeDialog",
  components: {
    SNumberDimensionInput,
  },

  props: {},
  data: () => ({
    el: null,
    section: null,
    sizePath: null, // $sectionData.products
    updateCallback: null,

    src: null,
    setting: {},

    //----------------------------------------------
    dialog_resize: false,
    dialog_pre: false,

    w: null,
    h: null,
    min_w: null,
    min_h: null,
    max_w: null,
    max_h: null,
    uid: null, // For update computes!

    //--------------------------
    key_listener_keydown: null,

    LOCK: false, // 🔐 Lock changes
  }),

  computed: {},
  watch: {
    w() {
      this.setSizeDebounced();
    },
    h() {
      this.setSizeDebounced();
    },
    min_w() {
      this.setSizeDebounced();
    },
    min_h() {
      this.setSizeDebounced();
    },
    max_w() {
      this.setSizeDebounced();
    },
    max_h() {
      this.setSizeDebounced();
    },

    dialog_resize(dialog) {
      // Keep highlight active element:
      if (!dialog) HighlightEditingElements.RemoveAllElementFocusEditing();
      else if (this.el) HighlightEditingElements.Activate(this.el);
    },
  },
  created() {},
  mounted() {
    this.EventBus.$on(
      "show:GlobalImageSizeDialog",

      ({ el, section, sizePath, src, setting, updateCallback }) => {
        this.CloseAllPageBuilderNavigationDrawerTools(); // Close all open tools.

        this.LOCK = true; // 🔒 Prevent update style and classes

        this.el = el;
        this.section = section;
        this.sizePath = sizePath;
        this.updateCallback = updateCallback;

        this.src = src; // Used in Preview
        this.setting = setting; // Used in Preview
        this.showProductsDialog();
      }
    );

    //――――――――――――――――――――――  START Editor key listener ――――――――――――――――――――
    this.key_listener_keydown = (event) => {
      // Scape:
      let isEscape =
        event.key === "Escape" || event.key === "Esc" || event.keyCode === 27;

      if (isEscape) {
        if (this.dialog_resize) {
          // Close tools
          this.dialog_resize = false;
          event.preventDefault();
          return false;
        }
      }
    };
    document.addEventListener("keydown", this.key_listener_keydown, true);
    //――――――――――――――――――――――  END Editor key listener ――――――――――――――――――――

    //█████████████████████████████████████████████████████████████
    //――――――――――――――― Event Bus ――――――――――――――――
    //█████████████████████████████████████████████████████████████
    // Listen for show loading data from server
    this.EventBus.$on(EventBusTriggers.PAGE_BUILDER_CLOSE_TOOLS, () => {
      this.dialog_resize = false;
    });
  },
  beforeDestroy() {
    this.EventBus.$off("show:GlobalImageSizeDialog");
    this.EventBus.$off(EventBusTriggers.PAGE_BUILDER_CLOSE_TOOLS);

    //――――――――――――――――――――――  REMOVE key listener ――――――――――――――――――――
    document.removeEventListener("keydown", this.key_listener_keydown, true);
  },

  methods: {
    showProductsDialog() {
      this.assignSizes();

      this.dialog_pre = false;
      this.$nextTick(() => {
        this.dialog_pre = true;
        this.dialog_resize = true;
        this.LOCK = false; // 🔓 Now can update values
      });
    },
    assignSizes() {
      let size = this.setting.size;
      if (!this.isObject(size)) {
        size = {};
      } else {
        size = Object.assign({}, size); // Important: clone object here!
      }

      this.w = size.w;
      this.h = size.h;
      this.min_w = size.min_w;
      this.min_h = size.min_h;
      this.max_w = size.max_w;
      this.max_h = size.max_h;
    },

    toggleSizeMode() {
      this.section.set(this.sizePath, {
        w: "100%",
        h: "100%",
        min_h: "100%",
        min_w: "unset",
        max_w: "unset",
        max_h: "unset",
      }); // Save data in section!

      if (this.updateCallback) this.updateCallback(); // Force update component!

      this.$nextTick(() => {
        this.assignSizes();
      });
    },

    //----------------------------------------------------------------------------
    setSizeDebounced: _.debounce(function () {
      this.setSize(false);
    }, 100),

    setSize() {
      if (!this.dialog_resize || this.LOCK) return;

      const new_size = {
        w: this.w,
        h: this.h,
        min_w: this.min_w,
        min_h: this.min_h,
        max_w: this.max_w,
        max_h: this.max_h,
      };
      // console.log("setSize", new_size);

      this.setting.size = new_size; // Save data in section!

      if (this.updateCallback) this.updateCallback(); // Force update component!

      ///  this.dialog_resize = false;
    },
  },
};
</script>

<style scoped lang="scss">
.img-prev-con {
  max-height: 30vh;
  min-height: 20vh;
  overflow: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
</style>