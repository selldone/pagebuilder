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
    :scrim="false"
    :width="
      $vuetify.display.xlAndUp ? 560 : $vuetify.display.lgAndUp ? 420 : 320
    "
    class="x-page-builder-options-slider"
    color="#1e1e1e"
    location="right"
    temporary
    theme="dark"
  >
    <v-card class="text-start" flat>
      <v-card-actions>
        <div class="widget-buttons">
          <v-btn size="x-large" variant="text" @click="toggleSizeMode()">
            <v-icon class="me-1">refresh</v-icon>
            Default
          </v-btn>

          <v-btn size="x-large" variant="text" @click="dialog_resize = false">
            <v-icon start>close</v-icon>
            {{ $t("global.actions.close") }}
          </v-btn>
        </div>
      </v-card-actions>

      <v-card-text v-if="dialog_pre" key="preview">
        <div
          class="img-prev-con bg-tiny-checkers-dark thin-scroll mb-3 rounded-lg"
        >
          <v-img
            :aspect-ratio="target[keySize].aspect"
            :cover="!target[keySize].contain"
            :height="h"
            :max-height="max_h"
            :max-width="max_w"
            :min-height="min_h"
            :min-width="min_w"
            :src="getShopImagePath(src)"
            :width="w"
          >
          </v-img>
        </div>

        <v-expansion-panels v-model="tab" key="tabs">
          <!-- ████████████████████ Size ████████████████████ -->
          <l-settings-style-size
            value="size"
            no-preview
            v-model:width="w"
            v-model:height="h"
            v-model:minWidth="min_w"
            v-model:minHeight="min_h"
            v-model:maxWidth="max_w"
            v-model:maxHeight="max_h"
          ></l-settings-style-size>
        </v-expansion-panels>
      </v-card-text>
    </v-card>
  </v-navigation-drawer>
</template>

<script>
import LEventsName from "../../../mixins/events/name/LEventsName";
import { LUtilsHighlight } from "../../../utils/highligh/LUtilsHighlight";
import _ from "lodash-es";
import { LMixinEvents } from "../../../mixins/events/LMixinEvents";
import { EventBus } from "@selldone/core-js/events/EventBus";
import LSettingsStyleSize from "@selldone/page-builder/settings/style/size/LSettingsStyleSize.vue";

export default {
  name: "LSettingsImageSize",
  mixins: [LMixinEvents],

  components: {
    LSettingsStyleSize,
  },

  props: {},
  data: () => ({
    el: null,
    target: null,
    keySize: null, // size
    updateCallback: null,

    src: null,

    tab: "size",
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
      if (!dialog) LUtilsHighlight.RemoveAllElementFocusEditing();
      else if (this.el) LUtilsHighlight.Activate(this.el);
    },
  },
  created() {},
  mounted() {
    EventBus.$on(
      "show:LSettingsImageSize",

      ({ el, target, keySize, src, updateCallback }) => {
        this.CloseAllPageBuilderNavigationDrawerTools(); // Close all open tools.

        this.LOCK = true; // 🔒 Prevent update style and classes

        this.el = el;
        this.target = target;
        this.keySize = keySize;
        this.updateCallback = updateCallback;

        this.src = src; // Used in Preview
        this.showDialog();
      },
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
    EventBus.$on(LEventsName.PAGE_BUILDER_CLOSE_TOOLS, () => {
      this.dialog_resize = false;
    });
  },
  beforeUnmount() {
    EventBus.$off("show:LSettingsImageSize");
    EventBus.$off(LEventsName.PAGE_BUILDER_CLOSE_TOOLS);

    //――――――――――――――――――――――  REMOVE key listener ――――――――――――――――――――
    document.removeEventListener("keydown", this.key_listener_keydown, true);
  },

  methods: {
    showDialog() {
      this.assignSizes();

      this.dialog_pre = false;
      this.$nextTick(() => {
        this.dialog_pre = true;
        this.dialog_resize = true;
        this.LOCK = false; // 🔓 Now can update values
      });
    },
    assignSizes() {
      let size = this.target[this.keySize];
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
      this.target[this.keySize] = {
        w: "100%",
        h: "100%",
        min_h: "100%",
        min_w: "unset",
        max_w: "unset",
        max_h: "unset",
      }; // Save data in section!

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

      this.target[this.keySize] = new_size; // Save data in section!

      if (this.updateCallback) this.updateCallback(); // Force update component!

      ///  this.dialog_resize = false;
    },
  },
};
</script>

<style lang="scss" scoped>
.img-prev-con {
  min-height: 20vh;
  overflow: auto;
  display: flex;
  align-items: center;
  justify-content: start;
  flex-direction: column;
  max-height: 200px;
  max-width: 100%;
}
</style>
