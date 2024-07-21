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
  <l-setting-navigation v-model="show_edit_style">
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
          :builder="$builder"
          v-model:bg-image="target.background.bg_image"
          v-model:bgCustom="target.background.bg_custom"
          v-model:bgGradient="target.background.bg_gradient"
          v-model:bgRotation="target.background.bg_rotation"
          v-model:bgImageRepeat="target.background.bg_repeat"
          v-model:bgImageSize="target.background.bg_size"
          v-model:bgPosition="target.background.bg_position"
          v-model:bgVideo="target.background.bg_video"
          v-model:bgColor="target.background.bg_color"
          v-model:bg-backdrop="target.background.bg_backdrop"
          dark
          has-bg-video
          has-bg-color
          has-backdrop
        >
        </background-image-editor>
      </v-card-text>
    </v-card>
  </l-setting-navigation>
</template>

<script>
import LEventsName from "../../mixins/events/name/LEventsName";
import { LUtilsHighlight } from "../../utils/highligh/LUtilsHighlight";
import BackgroundImageEditor from "../../components/style/background/BackgroundImageEditor.vue";
import { LUtilsColors } from "../../utils/colors/LUtilsColors";
import { LMixinEvents } from "../../mixins/events/LMixinEvents";
import { EventBus } from "@selldone/core-js/events/EventBus";
import LSettingNavigation from "@selldone/page-builder/settings/LSettingNavigation.vue";

export default {
  name: "LSettingsBackground",

  mixins: [LMixinEvents],

  components: {
    LSettingNavigation,
    BackgroundImageEditor,
  },
  inject: ["$builder"],
  props: {},
  data: () => ({
    el: null,
    target: null,

    //----------------------- Bg image -----------------------
    show_edit_style: false,
    dialog_pre: false,

    //--------------------------
    key_listener_keydown: null,

    LOCK: false, // 🔐 Lock changes
  }),

  computed: {
    global_variables() {
      return LUtilsColors.GenerateColorsStyle(this.$builder.style);
    },
  },
  watch: {
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
      this.dialog_pre = false;
      this.$nextTick(() => {
        this.dialog_pre = true;
        this.show_edit_style = true;
        this.LOCK = false; // 🔓 Now can update values
      });
    },


  },
};
</script>

<style lang="scss" scoped></style>
