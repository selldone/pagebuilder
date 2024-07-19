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
  <l-setting-navigation v-model="dialog_layers">
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
          <s-setting-expandable icon="wallpaper" title="Background">
            <template v-slot:title>
              <l-background-chips
                :background="target.background"
              ></l-background-chips>
            </template>

            <background-image-editor
              :builder="builder"
              key="0"
              v-model:bg-custom="target.background.bg_custom"
              v-model:bg-gradient="target.background.bg_gradient"
              v-model:bgRotation="target.background.bg_rotation"
              v-model:bg-image="target.background.bg_image"
              v-model:bg-image-repeat="target.background.bg_repeat"
              v-model:bg-image-size="target.background.bg_size"
              :upload-url="upload_bg_url"
              dark
              @change="setLayers()"
            >
            </background-image-editor>
          </s-setting-expandable>

          <!-- ████████████████████ Foreground ████████████████████ -->
          <s-setting-expandable icon="broken_image" title="Foreground">
            <template v-slot:title>
              <l-background-chips
                :background="target.data.setting.fg"
              ></l-background-chips>
            </template>

            <background-image-editor
              :builder="builder"
              key="1"
              v-model:bg-image="target.data.setting.fg.bg_image"
              v-model:bgCustom="target.data.setting.fg.bg_custom"
              v-model:bgGradient="target.data.setting.fg.bg_gradient"
              v-model:bgRotation="target.data.setting.fg.bg_rotation"
              v-model:bgImageRepeat="target.data.setting.fg.bg_repeat"
              v-model:bgImageSize="target.data.setting.fg.bg_size"
              :upload-url="upload_bg_url"
              dark
              @change="setLayers()"
            >
            </background-image-editor>
          </s-setting-expandable>
        </v-expansion-panels>
      </template>
    </v-card>
  </l-setting-navigation>
</template>

<script lang="ts">
import LEventsName from "../../../mixins/events/name/LEventsName";
import { LUtilsHighlight } from "../../../utils/highligh/LUtilsHighlight";
import BackgroundImageEditor from "../../../components/style/background/BackgroundImageEditor.vue";
import { LMixinEvents } from "../../../mixins/events/LMixinEvents";
import { EventBus } from "@selldone/core-js/events/EventBus";
import { inject } from "vue";
import LSettingNavigation from "@selldone/page-builder/settings/LSettingNavigation.vue";
import { XUploaderObject } from "@selldone/page-builder/components/x/uploader/XUploaderObject.ts";
import { LModelBackground } from "@selldone/page-builder/models/background/LModelBackground.ts";
import SSettingExpandable from "@selldone/page-builder/styler/settings/expandable/SSettingExpandable.vue";
import LBackgroundChips from "@selldone/page-builder/settings/class-style/chips/LBackgroundChips.vue";

/**
 * <l-settings-image-layers>
 */
export default {
  name: "LSettingsImageLayers",

  mixins: [LMixinEvents],

  components: {
    LBackgroundChips,
    SSettingExpandable,
    LSettingNavigation,
    BackgroundImageEditor,
  },

  props: {},
  data: () => ({
    el: null,
    target: null as XUploaderObject,
    updateCallback: null,

    src: null,

    //----------------------------------------------
    dialog_layers: false,
    dialog_pre: false,

    layers_tab: 0,

    //--------------------------
    key_listener_keydown: null,

    LOCK: false, // 🔐 Lock changes
  }),

  computed: {
    builder() {
      // Get builder from main page editor/viewer
      return inject("$builder");
    },
    upload_bg_url() {
      return this.builder.getImageUploadUrl();
    },
  },
  watch: {
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

      ({ el, target, src, updateCallback }) => {
        this.CloseAllPageBuilderNavigationDrawerTools(); // Close all open tools.
        this.LOCK = true; // 🔒 Prevent update style and classes

        this.el = el;
        this.target = target;
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
      if (!this.target.data.setting.fg)
        this.target.data.setting.fg = new LModelBackground();

      this.dialog_pre = false;
      this.$nextTick(() => {
        this.dialog_pre = true;
        this.dialog_layers = true;
        this.LOCK = false; // 🔓 Now can update values
      });
    },
    resetLayers() {
      this.target.background = new LModelBackground();
      this.target.data.setting.fg = new LModelBackground();
    },

    //----------------------------------------------------------------------------
    setLayers() {
      if (!this.dialog_layers || this.LOCK) return;

      if (this.updateCallback) this.updateCallback(); // Force update component!

      console.log("🔧 Set layers", this.target.data.setting);
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
