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
    v-model="show_edit_style"
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
    <v-card :style="global_variables" class="text-start" flat>
      <v-card-actions>
        <div class="widget-buttons">
          <v-btn size="x-large" variant="text" @click="show_edit_style = false">
            <v-icon class="me-1">close</v-icon>
            {{ $t("global.actions.close") }}
          </v-btn>
        </div>
      </v-card-actions>

      <v-card-text v-if="dialog_pre" class="pb-16">
        <background-image-editor
          v-model:bg-image="bg_image"
          v-model:bgCustom="bg_custom"
          v-model:bgGradient="bg_gradient"
          v-model:bgRotation="bg_rotation"
          v-model:bgImageRepeat="bg_repeat"
          v-model:bgImageSize="bg_size"
          v-model:bgPosition="bg_position"
          v-model:bgVideo="bg_video"
          v-model:bgColor="bg_color"
          v-model:bg-backdrop="bg_backdrop"
          :upload-url="upload_bg_url"
          :upload-video-url="upload_video_url"
          dark
          has-bg-video
          has-bg-color
          has-backdrop
        >
        </background-image-editor>
      </v-card-text>
    </v-card>
  </v-navigation-drawer>
</template>

<script>
import { LUtilsBackground } from "../../utils/background/LUtilsBackground";
import LEventsName from "../../mixins/events/name/LEventsName";
import { LUtilsHighlight } from "../../utils/highligh/LUtilsHighlight";
import _ from "lodash-es";
import BackgroundImageEditor from "../../components/style/background/BackgroundImageEditor.vue";
import { LUtilsColors } from "../../utils/colors/LUtilsColors";
import { LMixinEvents } from "../../mixins/events/LMixinEvents";
import { EventBus } from "@selldone/core-js/events/EventBus";
import {inject} from "vue";

export default {
  name: "LSettingsBackground",

  mixins: [LMixinEvents],

  components: {
    BackgroundImageEditor,
  },

  props: {

  },
  data: () => ({
    el: null,
    target: null,

    //----------------------- Bg image -----------------------
    show_edit_style: false,
    dialog_pre: false,

    bg_color: null,
    bg_image: null,
    bg_video: null,
    bg_gradient: [],
    bg_rotation: null,
    bg_size: null,
    bg_custom: null,
    bg_repeat: null,
    dark: null,
    bg_position: "center",
    bg_backdrop: null,

    //--------------------------
    key_listener_keydown: null,

    LOCK: false, // 🔐 Lock changes
  }),

  computed: {
    builder() {
      // Get builder from main page editor/viewer
      return inject("$builder");
    },

    global_variables() {
      return LUtilsColors.GenerateColorsStyle(this.builder.style);
    },

    upload_bg_url() {
      return this.builder.getImageUploadUrl();
    },
    upload_video_url() {
      return this.builder.getVideoUploadUrl();
    },
    //-----------------------------------
    in_background() {
      return {
        bg_color: this.bg_color,
        bg_image: this.bg_image,
        bg_video: this.bg_video,
        bg_gradient: this.bg_gradient,
        bg_rotation: this.bg_rotation,
        bg_size: this.bg_size,
        bg_custom: this.bg_custom,
        bg_repeat: this.bg_repeat,
        dark: this.dark,
        bg_position: this.bg_position,
        bg_backdrop: this.bg_backdrop,
      };
    },
  },
  watch: {
    in_background() {
      this.setBackgroundDebounced();
    },

    show_edit_style(dialog) {
      // Keep highlight active element:
      if (!dialog) LUtilsHighlight.RemoveAllElementFocusEditing();
      else if (this.el) LUtilsHighlight.Activate(this.el);
    },
  },
  created() {},
  mounted() {
    EventBus.$on(
      "show:LSettingsBackground",

      ({ el, target }) => {
        this.CloseAllPageBuilderNavigationDrawerTools(); // Close all open tools.

        this.LOCK = true; // 🔒 Prevent update style and classes

        this.el = el;
        this.target = target;
        this.showSizeDialog();
      },
    );

    //――――――――――――――――――――――  START Editor key listener ――――――――――――――――――――
    this.key_listener_keydown = (event) => {
      // Scape:
      let isEscape =
        event.key === "Escape" || event.key === "Esc" || event.keyCode === 27;

      if (isEscape) {
        if (this.show_edit_style) {
          // Close tools
          this.show_edit_style = false;
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
      this.show_edit_style = false;
    });
  },
  beforeUnmount() {
    EventBus.$off("show:LSettingsBackground");
    EventBus.$off(LEventsName.PAGE_BUILDER_CLOSE_TOOLS);

    //――――――――――――――――――――――  REMOVE key listener ――――――――――――――――――――
    document.removeEventListener("keydown", this.key_listener_keydown, true);
  },

  methods: {
    showSizeDialog() {
      const background = this.target.background;

      this.bg_color = background ? background.bg_color : null;

      this.bg_image = background ? background.bg_image : null;
      this.bg_video = background ? background.bg_video : null;

      this.bg_gradient =
        background && background.bg_gradient ? background.bg_gradient : [];
      this.bg_rotation = background?.bg_rotation
        ? background.bg_rotation
        : 45 /*deg*/;

      this.bg_size = background ? background.bg_size : null;
      this.bg_custom = background ? background.bg_custom : null;
      this.bg_repeat = background ? background.bg_repeat : null;
      this.dark = background ? background.dark : false;

      this.bg_position = background ? background.bg_position : "center";

      this.bg_backdrop = background ? background.bg_backdrop : null;

      this.dialog_pre = false;
      this.$nextTick(() => {
        this.dialog_pre = true;
        this.show_edit_style = true;
        this.LOCK = false; // 🔓 Now can update values
      });
    },

    //----------------------------------------------------------------------------

    setBackgroundDebounced: _.debounce(function () {
      this.setBackground(false);
    }, 100),

    setBackground() {
      if (!this.show_edit_style || this.LOCK) return;

      this.target.background = this.in_background; // Save data in section!

      const background = this.target.background;

      const style = LUtilsBackground.CreateCompleteBackgroundStyleObject(
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

      //  console.log('+++style+++',style)

      // Live update:

      Object.keys(style).forEach((key) => {
        this.el.style[key] = style[key];
      });

      //  this.el.style.cssText =style

      //   this.show_edit_style = false;
    },
  },
};
</script>

<style lang="scss" scoped></style>
