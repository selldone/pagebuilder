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
  <v-navigation-drawer
    v-model="dialog_layers"
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
    <v-card class="text-start pb-16" flat>
      <!-- ████████████████████ Actions ████████████████████ -->

      <v-card-actions>
        <div class="widget-buttons">
          <v-btn size="x-large" variant="text" @click="resetLayers()">
            <v-icon class="me-1">refresh</v-icon>
            Reset
          </v-btn>

          <v-btn size="x-large" variant="text" @click="dialog_layers = false">
            <v-icon class="me-1">close</v-icon>
            {{ $t("global.actions.close") }}
          </v-btn>
        </div>
      </v-card-actions>

      <template v-if="dialog_pre">
        <v-expansion-panels v-model="layers_tab">
          <!-- ████████████████████ Background ████████████████████ -->
          <v-expansion-panel>
            <v-expansion-panel-title>
              <div>
                <v-icon class="me-1" dark>wallpaper</v-icon>
                Background

                <v-icon
                  v-if="bg && Object.keys(bg).length"
                  color="green"
                  end
                  size="x-small"
                  >lens
                </v-icon>
              </div>
            </v-expansion-panel-title>
            <v-expansion-panel-text>
              <background-image-editor
                v-if="layers_tab === 0"
                key="0"
                v-model:bg-custom="bg.bg_custom"
                v-model:bg-gradient="bg.bg_gradient"
                v-model:bg-image="bg.bg_image"
                v-model:bg-image-repeat="bg.bg_repeat"
                v-model:bg-image-size="bg.bg_size"
                :upload-url="upload_bg_url"
                dark
                @change="setLayers()"
              >
              </background-image-editor>
            </v-expansion-panel-text>
          </v-expansion-panel>

          <!-- ████████████████████ Foreground ████████████████████ -->
          <v-expansion-panel>
            <v-expansion-panel-title>
              <div>
                <v-icon class="me-1" dark>broken_image</v-icon>
                Foreground

                <v-icon
                  v-if="fg && Object.keys(fg).length"
                  color="green"
                  end
                  size="x-small"
                  >lens
                </v-icon>
              </div>
            </v-expansion-panel-title>
            <v-expansion-panel-text>
              <background-image-editor
                v-if="layers_tab === 1"
                key="1"
                v-model:bg-image="fg.bg_image"
                v-model:bgCustom="fg.bg_custom"
                v-model:bgGradient="fg.bg_gradient"
                v-model:bgImageRepeat="fg.bg_repeat"
                v-model:bgImageSize="fg.bg_size"
                :upload-url="upload_bg_url"
                dark
                @change="setLayers()"
              >
              </background-image-editor>
            </v-expansion-panel-text>
          </v-expansion-panel>
        </v-expansion-panels>
      </template>
    </v-card>
  </v-navigation-drawer>
</template>

<script>
import { LUtilsBackground } from "@app-page-builder/utils/background/LUtilsBackground";
import LEventsName from "@app-page-builder/mixins/events/name/LEventsName";
import { LUtilsHighlight } from "@app-page-builder/utils/highligh/LUtilsHighlight";
import BackgroundImageEditor from "@app-page-builder/components/style/background/BackgroundImageEditor.vue";
import { LMixinEvents } from "@app-page-builder/mixins/events/LMixinEvents";
import {EventBus} from "@selldone/core-js/events/EventBus";

/**
 * <l-settings-image-layers>
 */
export default {
  name: "LSettingsImageLayers",

  mixins: [LMixinEvents],

  components: {
    BackgroundImageEditor,
  },

  props: {
    builder: {
      type: Object,
      required: true,
    },
  },
  data: () => ({
    el: null,
    target: null,
    keySetting: null, // setting
    updateCallback: null,

    src: null,

    //----------------------------------------------
    dialog_layers: false,
    dialog_pre: false,

    bg: {},
    fg: {},
    layers_tab: 0,

    //--------------------------
    key_listener_keydown: null,

    LOCK: false, // 🔐 Lock changes
  }),

  computed: {
    upload_bg_url() {
      return this.builder.getImageUploadUrl();
    },

    bg_cal_prev() {
      const bg = this.bg;
      if (!bg) return null;
      return LUtilsBackground.CreateCompleteBackgroundStyleObject(
        bg.bg_custom,
        bg.bg_gradient,
        this.bg.bg_image ? this.getShopImagePath(bg.bg_image) : null,
        bg.bg_size,
        bg.bg_repeat,
        bg.bg_color,
      );
    },
    fg_cal_prev() {
      const fg = this.fg;
      if (!fg) return null;
      return LUtilsBackground.CreateCompleteBackgroundStyleObject(
        fg.bg_custom,
        fg.bg_gradient,
        this.fg.bg_image ? this.getShopImagePath(fg.bg_image) : null,
        fg.bg_size,
        fg.bg_repeat,
        fg.bg_color,
      );
    },
  },
  watch: {
    bg() {
      this.setLayers();
    },
    fg() {
      this.setLayers();
    },

    dialog_layers(dialog) {
      // Keep highlight active element:
      if (!dialog) LUtilsHighlight.RemoveAllElementFocusEditing();
      else if (this.el) LUtilsHighlight.Activate(this.el);
    },
  },
  created() {},
  mounted() {
    EventBus.$on(
      "show:LSettingsImageLayers",

      ({ el, target, keySetting, src, updateCallback }) => {
        this.CloseAllPageBuilderNavigationDrawerTools(); // Close all open tools.
        this.LOCK = true; // 🔒 Prevent update style and classes

        this.el = el;
        this.target = target;
        this.keySetting = keySetting;
        this.updateCallback = updateCallback;

        this.src = src; // Used in Preview
        this.showProductsDialog();
      },
    );

    //――――――――――――――――――――――  START Editor key listener ――――――――――――――――――――
    this.key_listener_keydown = (event) => {
      // Scape:
      let isEscape =
        event.key === "Escape" || event.key === "Esc" || event.keyCode === 27;

      if (isEscape) {
        if (this.dialog_layers) {
          // Close tools
          this.dialog_layers = false;
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
      this.dialog_layers = false;
    });
  },
  beforeUnmount() {
    EventBus.$off("show:LSettingsImageLayers");

    EventBus.$off(LEventsName.PAGE_BUILDER_CLOSE_TOOLS);

    //――――――――――――――――――――――  REMOVE key listener ――――――――――――――――――――
    document.removeEventListener("keydown", this.key_listener_keydown, true);
  },

  methods: {
    showProductsDialog() {
      this.bg = this.target[this.keySetting].bg
        ? Object.assign({}, this.target[this.keySetting].bg)
        : {};
      this.fg = this.target[this.keySetting].fg
        ? Object.assign({}, this.target[this.keySetting].fg)
        : {};

      this.dialog_pre = false;
      this.$nextTick(() => {
        this.dialog_pre = true;
        this.dialog_layers = true;
        this.LOCK = false; // 🔓 Now can update values
      });
    },
    resetLayers() {
      this.bg = {};
      this.fg = {};
    },

    //----------------------------------------------------------------------------
    setLayers() {
      if (!this.dialog_layers || this.LOCK) return;

      this.target[this.keySetting].bg = this.bg;
      this.target[this.keySetting].fg = this.fg;

      if (this.updateCallback) this.updateCallback(); // Force update component!

      console.log("🔧 Set layers", this.target[this.keySetting]);
    },
  },
};
</script>

<style lang="scss" scoped>
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
