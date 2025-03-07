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
  <l-setting-navigation v-model="show_dialog_size">
    <v-card
      v-if="dialog_pre"
      :style="global_variables"
      class="text-start"
      flat
      style="padding-bottom: 10vh"
    >
      <!-- ████████████████████ Actions ████████████████████ -->

      <v-card-actions>
        <div class="widget-buttons">
          <v-btn
            size="x-large"
            variant="text"
            @click="show_dialog_size = false"
          >
            <v-icon class="me-1">close</v-icon>
            {{ $t("global.actions.close") }}
          </v-btn>
        </div>
      </v-card-actions>

      <!-- ████████████████████ Tags ████████████████████ -->
      <s-setting-toggle
        v-if="customElementTags"
        label="Element"
        icon="code"
        v-model="target.data.tag"
        :items="customElementTags"
        class="ms-2"
      ></s-setting-toggle>

      <v-expansion-panels
        v-model="Selected_tab"
        flat
        class="border-between-vertical"
        style="--border-color: #999"
        key="tabs"
      >
        <!-- ████████████████████ Value ████████████████████ -->
        <l-settings-content-text
          v-if="is_XTextObject"
          value="value"
          v-model:text="target.data.value"
        ></l-settings-content-text>
        <l-settings-content-image
          v-else-if="is_XUploaderObject"
          value="value"
          v-model:src="target.data.src"
        ></l-settings-content-image>

        <!-- ████████████████████ Grid ████████████████████ -->
        <l-settings-style-grid
          value="grid"
          v-if="has_grid"
          :inputStyle="in_style"
          v-model:grid="target.data.grid"
        >
        </l-settings-style-grid>

        <!-- ████████████████████ Class ████████████████████ -->

        <l-settings-classes
          value="classes"
          v-model:classes="target.classes"
          :custom-css="$builder.css /*Defined css by user*/"
        >
        </l-settings-classes>

        <!-- ████████████████████ Style ████████████████████ -->

        <l-settings-style
          v-model="target.style"
          :options="options"
          :targetElement="el_style"
        ></l-settings-style>

        <!-- ████████████████████ Background ████████████████████ -->

        <s-setting-expandable
          v-if="target.background"
          title="Background"
          icon="wallpaper"
        >
          <template v-slot:title>
            <l-background-chips
              :background="target.background"
            ></l-background-chips>
          </template>
          <background-image-editor
            v-model:bg-image="target.background.bg_image"
            v-model:bgCustom="target.background.bg_custom"
            v-model:bgGradient="target.background.bg_gradient"
            v-model:bgRotation="target.background.bg_rotation"
            v-model:bgImageRepeat="target.background.bg_repeat"
            v-model:bgImageSize="target.background.bg_size"
            v-model:bgPosition="target.background.bg_position"
            v-model:bgVideo="target.background.bg_video"
            v-model:bgColor="target.background.bg_color"
            v-model:bgBackdrop="target.background.bg_backdrop"
            dark
            has-bg-video
            has-bg-color
            has-backdrop
          >
          </background-image-editor>
        </s-setting-expandable>
      </v-expansion-panels>
    </v-card>
  </l-setting-navigation>
</template>

<script lang="ts">
import LEventsName from "../../mixins/events/name/LEventsName";
import { LUtilsHighlight } from "../../utils/highligh/LUtilsHighlight";
import { LUtilsColors } from "../../utils/colors/LUtilsColors";
import { LMixinEvents } from "../../mixins/events/LMixinEvents";
import { EventBus } from "@selldone/components-vue/utils/events/EventBus.ts";
import LSettingsClasses from "@selldone/page-builder/settings/classes/LSettingsClasses.vue";
import SSettingToggle from "@selldone/page-builder/styler/settings/toggle/SSettingToggle.vue";
import BackgroundImageEditor from "@selldone/page-builder/components/style/background/BackgroundImageEditor.vue";
import SSettingExpandable from "@selldone/page-builder/styler/settings/expandable/SSettingExpandable.vue";
import LSettingsStyleGrid from "@selldone/page-builder/settings/style/grid/LSettingsStyleGrid.vue";
import { XTextObject } from "@selldone/page-builder/components/x/text/XTextObject.ts";
import LSettingsContentText from "@selldone/page-builder/settings/content/text/LSettingsContentText.vue";
import { XUploaderObject } from "@selldone/page-builder/components/x/uploader/XUploaderObject.ts";
import LSettingsContentImage from "@selldone/page-builder/settings/content/image/LSettingsContentImage.vue";
import LSettingNavigation from "@selldone/page-builder/settings/LSettingNavigation.vue";
import LBackgroundChips from "@selldone/page-builder/settings/class-style/chips/LBackgroundChips.vue";
import LSettingsStyle from "@selldone/page-builder/settings/style/LSettingsStyle.vue";
import { LModelElement } from "@selldone/page-builder/models/element/LModelElement.ts";

export default {
  name: "LSettingsClassStyle",
  mixins: [LMixinEvents],
  components: {
    LSettingsStyle,
    LBackgroundChips,
    LSettingNavigation,
    LSettingsContentImage,
    LSettingsContentText,
    LSettingsStyleGrid,
    SSettingExpandable,
    BackgroundImageEditor,
    SSettingToggle,

    LSettingsClasses,
  },
  inject: ["$builder"],
  props: {},
  data: () => ({
    el_style: null,
    el_class: null,
    target: null as LModelElement,
    options: {},

    // ---------------------------------

    // ---------------------------------
    show_dialog_size: false,
    dialog_pre: false,

    Selected_tab: null,

    //--------------------------
    key_listener_keydown: null,

    LOCK: false, // 🔐 Lock changes
  }),

  computed: {
    global_variables() {
      return LUtilsColors.GenerateColorsStyle(this.$builder.style);
    },

    has_grid() {
      return !!this.target?.data.grid;
    },

    //------------- Options ----------

    customElementTags() {
      if (this.is_XTextObject) return ["p", "h1", "h2", "h3", "h4", "h5"];
      return null;
    },

    upload_bg_url() {
      return this.builder.getImageUploadUrl();
    },

    is_XTextObject() {
      return this.target instanceof XTextObject;
    },
    is_XUploaderObject() {
      return this.target instanceof XUploaderObject;
    },
  },

  watch: {
    show_dialog_size(dialog) {
      // Keep highlight active element:
      if (!dialog) LUtilsHighlight.RemoveAllElementFocusEditing();
      else if (this.el_class) LUtilsHighlight.Activate(this.el_class);
    },
  },
  created() {},
  mounted() {
    EventBus.$on(
      "show:LSettingsClassStyle",

      ({ el_style, el_class, target, options }) => {
        this.CloseAllPageBuilderNavigationDrawerTools(); // Close all open tools.

        this.LOCK = true; // 🔒 Prevent update style and classes

        this.el_style = el_style;
        this.el_class = el_class;

        this.target = target;

        this.options = options;

        this.showSizeDialog();
      },
    );

    //――――――――――――――――――――――  START Editor key listener ――――――――――――――――――――
    this.key_listener_keydown = (event) => {
      // Scape:
      let isEscape =
        event.key === "Escape" || event.key === "Esc" || event.keyCode === 27;

      if (isEscape) {
        if (this.show_dialog_size) {
          // Close tools
          this.show_dialog_size = false;
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
      this.show_dialog_size = false;
    });
  },
  beforeUnmount() {
    EventBus.$off("show:LSettingsClassStyle");
    EventBus.$off(LEventsName.PAGE_BUILDER_CLOSE_TOOLS);

    //――――――――――――――――――――――  REMOVE key listener ――――――――――――――――――――
    document.removeEventListener("keydown", this.key_listener_keydown, true);
  },

  methods: {
    async showSizeDialog() {
      this.dialog_pre = false;

      this.$nextTick(() => {
        this.dialog_pre = true;
        this.show_dialog_size = true;
        this.LOCK = false; // 🔓 Now can update values
      });
    },
  },
};
</script>

<style lang="scss" scoped></style>
