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
    v-model="dialog_layers"
    theme="dark"
    location="right"
    temporary
    :width="$vuetify.display.xlAndUp ? 560 : $vuetify.display.lgAndUp ? 420 : 320"
    :scrim="false"
    color="#1e1e1e"
    class="x-page-builder-options-slider"
  >
    <v-card class="text-start" flat>
      <!-- ████████████████████ Actions ████████████████████ -->

      <v-card-actions>
        <div class="widget-buttons">
          <v-btn variant="text" @click="resetLayers()" size="x-large">
            <v-icon class="me-1">refresh</v-icon>
            Reset</v-btn
          >

          <v-btn variant="text" @click="dialog_layers = false" size="x-large"
            ><v-icon class="me-1">close</v-icon
            >{{ $t("global.actions.close") }}</v-btn
          >
        </div>
      </v-card-actions>

      <template v-if="dialog_pre">
        <v-expansion-panels flat v-model="layers_tab">
          <!-- ████████████████████ Background ████████████████████ -->
          <v-expansion-panel>
            <v-expansion-panel-title>
              <div>
                <v-icon class="me-1" dark>wallpaper</v-icon> Background

                <v-icon
                  end
                  v-if="bg && Object.keys(bg).length"
                  size="x-small"
                  color="green"
                  >lens</v-icon
                >
              </div>
            </v-expansion-panel-title>
            <v-expansion-panel-text>
              <background-image-editor
                v-if="layers_tab === 0"
                key="0"
                :upload-url="upload_bg_url"
                v-model:bg-image="bg.bg_image"
                v-model:bgGradient="bg.bg_gradient"
                v-model:bgImageSize="bg.bg_size"
                v-model:bgCustom="bg.bg_custom"
                v-model:BgImageRepeat="bg.bg_repeat"
                @change="$forceUpdate()"
                dark
              >
              </background-image-editor>
            </v-expansion-panel-text>
          </v-expansion-panel>

          <!-- ████████████████████ Foreground ████████████████████ -->
          <v-expansion-panel>
            <v-expansion-panel-title>
              <div>
                <v-icon class="me-1" dark>broken_image</v-icon> Foreground

                <v-icon
                  end
                  v-if="fg && Object.keys(fg).length"
                  size="x-small"
                  color="green"
                  >lens</v-icon
                >
              </div>
            </v-expansion-panel-title>
            <v-expansion-panel-text>
              <background-image-editor
                v-if="layers_tab === 1"
                key="1"
                :upload-url="upload_bg_url"
                v-model:bg-image="fg.bg_image"
                v-model:bgGradient="fg.bg_gradient"
                v-model:bgImageSize="fg.bg_size"
                v-model:bgCustom="fg.bg_custom"
                v-model:BgImageRepeat="fg.bg_repeat"
                @change="$forceUpdate()"
                dark
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
import BackgroundImageEditor from "../../style/background/BackgroundImageEditor.vue";
import { BackgroundHelper } from "@core/helper/style/BackgroundHelper";
import EventBusTriggers from "@core/enums/event-bus/EventBusTriggers";
import { HighlightEditingElements } from "@app-page-builder/src/helpers/HighlightEditingElements";
import { PageBuilderMixin } from "@app-page-builder/mixins/PageBuilderMixin";
import PageEventBusMixin from "@app-page-builder/mixins/PageEventBusMixin";
export default {
  name: "GlobalImageLayersDialog",

  mixins: [PageBuilderMixin,PageEventBusMixin],

  components: {
    BackgroundImageEditor,
  },

  props: {},
  data: () => ({
    el: null,
    section: null,
    settingPath: null, // $sectionData.image.setting
    updateCallback: null,

    src: null,
    setting: {},

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
      return this.getPageBuilderUploadUrlImage();
    },

    bg_cal_prev() {
      const bg = this.bg;
      if (!bg) return null;
      return BackgroundHelper.CreateCompleteBackgroundStyleObject(
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
      return BackgroundHelper.CreateCompleteBackgroundStyleObject(
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
      if (!dialog) HighlightEditingElements.RemoveAllElementFocusEditing();
      else if (this.el) HighlightEditingElements.Activate(this.el);
    },
  },
  created() {},
  mounted() {
    this.EventBus.$on(
      "show:GlobalImageLayersDialog",

      ({ el, section, settingPath, src, setting, updateCallback }) => {
        this.CloseAllPageBuilderNavigationDrawerTools(); // Close all open tools.
        this.LOCK = true; // 🔒 Prevent update style and classes

        this.el = el;
        this.section = section;
        this.settingPath = settingPath;
        this.updateCallback = updateCallback;

        this.src = src; // Used in Preview
        this.setting = setting; // Used in Preview
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
    this.EventBus.$on(EventBusTriggers.PAGE_BUILDER_CLOSE_TOOLS, () => {
      this.dialog_layers = false;
    });
  },
  beforeUnmount() {
    this.EventBus.$off("show:GlobalImageLayersDialog");

    this.EventBus.$off(EventBusTriggers.PAGE_BUILDER_CLOSE_TOOLS);

    //――――――――――――――――――――――  REMOVE key listener ――――――――――――――――――――
    document.removeEventListener("keydown", this.key_listener_keydown, true);
  },

  methods: {
    showProductsDialog() {
      this.bg = this.setting.bg ? Object.assign({}, this.setting.bg) : {};
      this.fg = this.setting.fg ? Object.assign({}, this.setting.fg) : {};

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

      this.setting.bg = this.bg;
      this.setting.fg = this.fg;

      if (this.updateCallback) this.updateCallback(); // Force update component!

      /// this.dialog_layers = false;
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
