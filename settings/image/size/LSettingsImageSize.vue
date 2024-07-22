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
  <l-setting-navigation v-model="dialog_resize">
    <v-card v-if="dialog_pre" class="text-start" flat>
      <v-card-actions>
        <div class="widget-buttons">
          <v-btn size="x-large" variant="text" @click="resetSize()">
            <v-icon class="me-1">refresh</v-icon>
            Default
          </v-btn>

          <v-btn size="x-large" variant="text" @click="dialog_resize = false">
            <v-icon start>close</v-icon>
            {{ $t("global.actions.close") }}
          </v-btn>
        </div>
      </v-card-actions>

      <div
        class="img-prev-con bg-tiny-checkers-dark thin-scroll mb-3 rounded-lg mx-3"
      >
        <v-img
          :aspect-ratio="setting.aspect"
          :cover="!setting.contain"
          :height="target.style.height ? target.style.height : undefined"
          :max-height="target.style.maxHeight"
          :max-width="target.style.maxWidth"
          :min-height="target.style.minHeight"
          :min-width="target.style.minWidth"
          :src="getShopImagePath(src)"
          :width="target.style.width ? target.style.width : undefined"
          class="d-block"
        >
        </v-img>
      </div>

      <v-expansion-panels  v-model="tab" key="tabs">
        <!-- ████████████████████ Size ████████████████████ -->
        <l-settings-style-size
          value="size"
          no-preview
          :computed-style="computedStyle"
          v-model:width="target.style.width"
          v-model:height="target.style.height"
          v-model:minWidth="target.style.minWidth"
          v-model:minHeight="target.style.minHeight"
          v-model:maxWidth="target.style.maxWidth"
          v-model:maxHeight="target.style.maxHeight"
        ></l-settings-style-size>
      </v-expansion-panels>
    </v-card>
  </l-setting-navigation>
</template>

<script lang="ts">
import LEventsName from "../../../mixins/events/name/LEventsName";
import { LUtilsHighlight } from "../../../utils/highligh/LUtilsHighlight";
import { LMixinEvents } from "../../../mixins/events/LMixinEvents";
import { EventBus } from "@selldone/core-js/events/EventBus";
import LSettingsStyleSize from "@selldone/page-builder/settings/style/size/LSettingsStyleSize.vue";
import LSettingNavigation from "@selldone/page-builder/settings/LSettingNavigation.vue";
import { XUploaderObject } from "@selldone/page-builder/components/x/uploader/XUploaderObject.ts";

export default {
  name: "LSettingsImageSize",
  mixins: [LMixinEvents],

  components: {
    LSettingNavigation,
    LSettingsStyleSize,
  },

  props: {},
  data: () => ({
    el: null,
    target: null as XUploaderObject,
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

    computedStyle: null,
    //--------------------------
    key_listener_keydown: null,

    LOCK: false, // 🔐 Lock changes
  }),

  computed: {
    setting() {
      return this.target.data.setting;
    },
  },
  watch: {
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

      ({ el, target, src, updateCallback }) => {
        this.CloseAllPageBuilderNavigationDrawerTools(); // Close all open tools.

        this.LOCK = true; // 🔒 Prevent update style and classes

        this.el = el;
        this.target = target;
        this.updateCallback = updateCallback;

        this.src = src; // Used in Preview

        // Get the computed styles
        this.computedStyle = window.getComputedStyle(this.el);

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
      this.dialog_pre = false;
      this.$nextTick(() => {
        this.dialog_pre = true;
        this.dialog_resize = true;
        this.LOCK = false; // 🔓 Now can update values
      });
    },

    resetSize() {
      this.target.data.setting.setAspect(null);

      this.target.style.width = "100%";
      this.target.style.height = "100%";
      this.target.style.minWidth = "unset";
      this.target.style.minHeight = "20px";
      this.target.style.maxWidth = "100%";
      this.target.style.maxHeight = "unset";
    },
  },
};
</script>

<style lang="scss" scoped>
.img-prev-con {
  min-height: 20vh;
  overflow: auto;
  position: relative;
  max-height: 160px;
  max-width: 100%;
}
</style>
