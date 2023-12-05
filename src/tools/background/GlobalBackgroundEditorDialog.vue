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
    v-model="show_edit_style"
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
          <v-btn text @click="show_edit_style = false" x-large>
            <v-icon class="me-1">close</v-icon
            >{{ $t("global.actions.close") }}</v-btn
          >
        </div>
      </v-card-actions>

      <v-card-text v-if="dialog_pre">
        <s-color-selector
          title="Background color"
          v-model="bg_color"
          nullable
        ></s-color-selector>
        <background-image-editor
          :upload-url="upload_bg_url"
          :upload-video-url="upload_video_url"
          :bg-image.sync="bg_image"
          :bgGradient.sync="bg_gradient"
          :bgImageSize.sync="bg_size"
          :bgCustom.sync="bg_custom"
          :BgImageRepeat.sync="bg_repeat"
          :BgColor="bg_color"
          :bgPosition.sync="bg_position"
          dark
          :bgVideo.sync="bg_video"
          has-bg-video
          class="mt-8"
        >
        </background-image-editor>
      </v-card-text>
    </v-card>
  </v-navigation-drawer>
</template>

<script>
import BackgroundImageEditor from "./BackgroundImageEditor.vue";
import { BackgroundHelper } from "@core/helper/style/BackgroundHelper";
import SColorSelector from "@components/ui/color/selector/SColorSelector.vue";
import EventBusTriggers from "@core/enums/event-bus/EventBusTriggers";
import HighlightEditingElements from "@app-page-builder/src/helpers/HighlightEditingElements";
import { PageBuilderMixin } from "@app-page-builder/mixins/PageBuilderMixin";
import _ from "lodash-es";
export default {
  name: "GlobalBackgroundEditorDialog",
  mixins: [PageBuilderMixin],

  components: {
    SColorSelector,
    BackgroundImageEditor,
  },

  props: {},
  data: () => ({
    el: null,
    section: null,
    backgroundPath: null, // $sectionData.backgroundPath

    //----------------------- Bg image -----------------------
    show_edit_style: false,
    dialog_pre: false,

    bg_color: null,
    bg_image: null,
    bg_video: null,
    bg_gradient: [],
    bg_size: null,
    bg_custom: null,
    bg_repeat: null,
    dark: null,
    bg_position: "center",

    //--------------------------
    key_listener_keydown: null,

    LOCK: false, // 🔐 Lock changes
  }),

  computed: {
    upload_bg_url() {
      return this.getPageBuilderUploadUrlImage();
    },
    upload_video_url() {
      return this.getPageBuilderUploadUrlVideo();
    },
    //-----------------------------------
    in_background() {
      return {
        bg_color: this.bg_color,
        bg_image: this.bg_image,
        bg_video: this.bg_video,
        bg_gradient: this.bg_gradient,
        bg_size: this.bg_size,
        bg_custom: this.bg_custom,
        bg_repeat: this.bg_repeat,
        dark: this.dark,
        bg_position: this.bg_position,
      };
    },
  },
  watch: {
    in_background() {
      this.setBackgroundDebounced();
    },

    show_edit_style(dialog) {
      // Keep highlight active element:
      if (!dialog) HighlightEditingElements.RemoveAllElementFocusEditing();
      else if (this.el) HighlightEditingElements.Activate(this.el);
    },
  },
  created() {},
  mounted() {
    this.EventBus.$on(
      "show:GlobalBackgroundEditorDialog",

      ({ el, section, backgroundPath }) => {
        this.CloseAllPageBuilderNavigationDrawerTools(); // Close all open tools.

        this.LOCK = true; // 🔒 Prevent update style and classes

        this.el = el;
        this.section = section;
        this.backgroundPath = backgroundPath;
        this.showSizeDialog();
      }
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
    this.EventBus.$on(EventBusTriggers.PAGE_BUILDER_CLOSE_TOOLS, () => {
      this.show_edit_style = false;
    });
  },
  beforeDestroy() {
    this.EventBus.$off("show:GlobalBackgroundEditorDialog");
    this.EventBus.$off(EventBusTriggers.PAGE_BUILDER_CLOSE_TOOLS);

    //――――――――――――――――――――――  REMOVE key listener ――――――――――――――――――――
    document.removeEventListener("keydown", this.key_listener_keydown, true);
  },

  methods: {
    showSizeDialog() {
      const background = this.section.get(this.backgroundPath);

      this.bg_color = background ? background.bg_color : null;

      this.bg_image = background ? background.bg_image : null;
      this.bg_video = background ? background.bg_video : null;

      this.bg_gradient =
        background && background.bg_gradient ? background.bg_gradient : [];
      this.bg_size = background ? background.bg_size : null;
      this.bg_custom = background ? background.bg_custom : null;
      this.bg_repeat = background ? background.bg_repeat : null;
      this.dark = background ? background.dark : false;

      this.bg_position = background ? background.bg_position : "center";

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

      this.section?.set(this.backgroundPath, this.in_background); // Save data in section!

      const background = this.section.get(this.backgroundPath);

      const style = BackgroundHelper.CreateCompleteBackgroundStyleObject(
        background.bg_custom,
        background.bg_gradient,
        background.bg_image ? this.getShopImagePath(background.bg_image) : null,
        background.bg_size,
        background.bg_repeat,
        background.bg_color,
        background.dark,
        background.bg_position
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

<style scoped lang="scss"></style>
