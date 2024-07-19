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
  <l-setting-navigation
    v-model="show_dialog_size"
  >
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
          v-if="available_tabs.includes('grid')"
          :inputStyle="in_style"
          v-model:grid="target.data.grid"
        >
        </l-settings-style-grid>

        <!-- ████████████████████ Class ████████████████████ -->

        <l-settings-classes
          value="classes"
          v-if="available_tabs.includes('classes')"
          v-model:classes="in_classes"
          :custom-css="builder.css /*Defined css by user*/"
        >
        </l-settings-classes>

        <!-- ████████████████████ Size ████████████████████ -->

        <l-settings-style-size
          value="size"
          v-if="has_size"
          :inputStyle="in_style"
          @click:area="(val) => (Selected_tab = val)"
          v-model:width="in_width"
          v-model:height="in_height"
          v-model:minWidth="in_minWidth"
          v-model:minHeight="in_minHeight"
          v-model:maxWidth="in_maxWidth"
          v-model:maxHeight="in_maxHeight"
        ></l-settings-style-size>

        <!-- ████████████████████ Padding ████████████████████ -->

        <l-settings-style-padding
          value="padding"
          v-if="available_tabs.includes('padding')"
          :inputStyle="in_style"
          @click:area="(val) => (Selected_tab = val)"
          v-model:paddingLeft="in_paddingLeft"
          v-model:paddingRight="in_paddingRight"
          v-model:paddingTop="in_paddingTop"
          v-model:paddingBottom="in_paddingBottom"
        >
        </l-settings-style-padding>

        <!-- ████████████████████ Margin ████████████████████ -->

        <l-settings-style-margin
          value="margin"
          v-if="available_tabs.includes('margin')"
          :inputStyle="in_style"
          @click:area="(val) => (Selected_tab = val)"
          v-model:marginLeft="in_marginLeft"
          v-model:marginRight="in_marginRight"
          v-model:marginTop="in_marginTop"
          v-model:marginBottom="in_marginBottom"
        >
        </l-settings-style-margin>

        <!-- ████████████████████ Position ████████████████████ -->

        <l-settings-style-position
          value="position"
          v-if="available_tabs.includes('position')"
          :inputStyle="in_style"
          @click:area="(val) => (Selected_tab = val)"
          v-model:position="in_position"
          v-model:top="in_top"
          v-model:left="in_left"
          v-model:bottom="in_bottom"
          v-model:right="in_right"
          v-model:z-index="in_z_index"
        >
        </l-settings-style-position>

        <!-- ████████████████████ Border ████████████████████ -->

        <l-settings-style-border
          value="border"
          v-if="available_tabs.includes('border')"
          :inputStyle="in_style"
          @click:area="(val) => (Selected_tab = val)"
          v-model:borderLeft="in_borderLeft"
          v-model:borderRight="in_borderRight"
          v-model:borderTop="in_borderTop"
          v-model:borderBottom="in_borderBottom"
          v-model:borderRadius="in_borderRadius"
        >
        </l-settings-style-border>

        <!-- ████████████████████ Typeface ████████████████████ -->
        <l-settings-style-typeface
          value="typeface"
          v-if="available_tabs.includes('typeface')"
          :inputStyle="in_style"
          v-model:fonts="builder.style.fonts"
          v-model:color="in_typeface_color"
          v-model:fontFamily="in_typeface_fontFamily"
          v-model:fontSize="in_typeface_fontSize"
          v-model:fontWeight="in_typeface_fontWeight"
          v-model:fontStyle="in_typeface_fontStyle"
          v-model:fontVariant="in_typeface_fontVariant"
          v-model:lineHeight="in_typeface_lineHeight"
          v-model:letterSpacing="in_typeface_letterSpacing"
          v-model:textAlign="in_typeface_textAlign"
          v-model:textDecoration="in_typeface_textDecoration"
          v-model:textTransform="in_typeface_textTransform"
          v-model:textShadow="in_typeface_textShadow"
          @change="setSizePositionDebounced"
        >
        </l-settings-style-typeface>

        <!-- ████████████████████ Shadow ████████████████████ -->

        <l-settings-style-shadow
          value="shadow"
          v-if="available_tabs.includes('shadow')"
          :inputStyle="in_style"
          v-model:shadow="shadow"
        >
        </l-settings-style-shadow>

        <!-- ████████████████████ Filter ████████████████████ -->

        <l-settings-style-filter
          value="filter"
          v-if="available_tabs.includes('filter')"
          :inputStyle="in_style"
          v-model:filter="filter"
          :preview-image="
            options?.prev_image
              ? getShopImagePath(options.prev_image)
              : undefined
          "
        >
        </l-settings-style-filter>

        <!-- ████████████████████ Transform ████████████████████ -->
        <l-settings-style-transform
          value="transform"
          v-if="available_tabs.includes('transform')"
          :inputStyle="in_style"
          v-model:transform="transform"
        >
        </l-settings-style-transform>

        <!-- ████████████████████ Background ████████████████████ -->

        <s-setting-expandable title="Background" icon="wallpaper">
          <template v-slot:title>
            <v-chip
              v-if="background.bg_color"
              class="ms-1"
              color="#000"
              label
              size="x-small"
              density="comfortable"
              variant="flat"
            >
              <v-icon start :color="background.bg_color">circle</v-icon>
              {{ background.bg_color }}
            </v-chip>

            <v-chip
              v-if="background.bg_image"
              class="ms-1"
              color="#00796B"
              label
              size="x-small"
              density="comfortable"
              variant="flat"
              prepend-icon="image"
            >
              Image
            </v-chip>
            <v-chip
              v-if="background.bg_backdrop"
              class="ms-1"
              color="#673AB7"
              label
              size="x-small"
              density="comfortable"
              variant="flat"
              prepend-icon="photo_filter"
            >
              Backdrop
            </v-chip>
          </template>
          <background-image-editor
            :builder="builder"
            v-model:bg-image="background.bg_image"
            v-model:bgCustom="background.bg_custom"
            v-model:bgGradient="background.bg_gradient"
            v-model:bgRotation="background.bg_rotation"
            v-model:bgImageRepeat="background.bg_repeat"
            v-model:bgImageSize="background.bg_size"
            v-model:bgPosition="background.bg_position"
            v-model:bgVideo="background.bg_video"
            v-model:bgColor="background.bg_color"
            v-model:bgBackdrop="background.bg_backdrop"
            :upload-url="upload_bg_url"
            :upload-video-url="upload_video_url"
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
import ShadowCollection from "../../src/enums/ShadowCollection";
import LEventsName from "../../mixins/events/name/LEventsName";
import { LUtilsHighlight } from "../../utils/highligh/LUtilsHighlight";
import _, { isObject, isString, trim } from "lodash-es";
import { LUtilsColors } from "../../utils/colors/LUtilsColors";
import { LMixinEvents } from "../../mixins/events/LMixinEvents";
import { EventBus } from "@selldone/core-js/events/EventBus";
import LSettingsStyleSize from "@selldone/page-builder/settings/style/size/LSettingsStyleSize.vue";
import LSettingsStylePadding from "@selldone/page-builder/settings/style/padding/LSettingsStylePadding.vue";
import LSettingsStyleMargin from "@selldone/page-builder/settings/style/margin/LSettingsStyleMargin.vue";
import LSettingsStylePosition from "@selldone/page-builder/settings/style/position/LSettingsStylePosition.vue";
import LSettingsStyleBorder from "@selldone/page-builder/settings/style/border/LSettingsStyleBorder.vue";
import LSettingsClasses from "@selldone/page-builder/settings/classes/LSettingsClasses.vue";
import LSettingsStyleShadow from "@selldone/page-builder/settings/style/shadow/LSettingsStyleShadow.vue";
import LSettingsStyleTransform from "@selldone/page-builder/settings/style/transform/LSettingsStyleTransform.vue";
import LSettingsStyleFilter from "@selldone/page-builder/settings/style/filter/LSettingsStyleFilter.vue";
import SSettingToggle from "@selldone/page-builder/styler/settings/toggle/SSettingToggle.vue";
import LSettingsStyleTypeface from "@selldone/page-builder/settings/style/typeface/LSettingsStyleTypeface.vue";
import { BoxShadowHelper } from "@selldone/page-builder/styler/settings/shadow/BoxShadowHelper";
import { TextShadowHelper } from "@selldone/page-builder/styler/settings/shadow/TextShadowHelper";
import BackgroundImageEditor from "@selldone/page-builder/components/style/background/BackgroundImageEditor.vue";
import SSettingExpandable from "@selldone/page-builder/styler/settings/expandable/SSettingExpandable.vue";
import { LUtilsBackground } from "@selldone/page-builder/utils/background/LUtilsBackground";
import LSettingsStyleGrid from "@selldone/page-builder/settings/style/grid/LSettingsStyleGrid.vue";
import { TextDecorationHelper } from "@selldone/page-builder/styler/settings/text-decoration/TextDecorationHelper";
import { inject } from "vue";
import { XTextObject } from "@selldone/page-builder/components/x/text/XTextObject.ts";
import LSettingsContentText from "@selldone/page-builder/settings/content/text/LSettingsContentText.vue";
import { XUploaderObject } from "@selldone/page-builder/components/x/uploader/XUploaderObject.ts";
import LSettingsContentImage from "@selldone/page-builder/settings/content/image/LSettingsContentImage.vue";
import LSettingNavigation from "@selldone/page-builder/settings/LSettingNavigation.vue";

const STYLE_TABS = [
  "size",
  "padding",
  "border",
  "margin",
  "position",
  "shadow",
  "classes",
  "filter",
  "transform",
  "typeface",
  "grid",
];

export default {
  name: "LSettingsClassStyle",
  mixins: [LMixinEvents],
  components: {
    LSettingNavigation,
    LSettingsContentImage,
    LSettingsContentText,
    LSettingsStyleGrid,
    SSettingExpandable,
    BackgroundImageEditor,
    LSettingsStyleTypeface,
    SSettingToggle,
    LSettingsStyleFilter,
    LSettingsStyleTransform,
    LSettingsStyleShadow,
    LSettingsClasses,
    LSettingsStyleBorder,
    LSettingsStylePosition,
    LSettingsStyleMargin,
    LSettingsStylePadding,
    LSettingsStyleSize,
  },

  props: {},
  data: () => ({
    el_style: null,
    el_class: null,
    target: null,
    options: {},

    // ---------------------------------

    background: null,
    // ---------------------------------
    show_dialog_size: false,
    dialog_pre: false,

    Selected_tab: null,

    in_classes: null,

    in_width: null,
    in_height: null,
    in_minWidth: null,
    in_minHeight: null,
    in_maxWidth: null,
    in_maxHeight: null,

    in_position: null,

    in_top: null,
    in_bottom: null,
    in_left: null,
    in_right: null,
    in_z_index: null,

    in_marginLeft: null,
    in_marginRight: null,
    in_marginTop: null,
    in_marginBottom: null,

    in_paddingLeft: null,
    in_paddingRight: null,
    in_paddingTop: null,
    in_paddingBottom: null,

    in_borderRadius: 0,

    in_borderLeft: null,
    in_borderRight: null,
    in_borderTop: null,
    in_borderBottom: null,

    //--------------------------

    in_typeface_color: null,
    in_typeface_fontFamily: null,
    in_typeface_fontSize: null,
    in_typeface_fontWeight: null,
    in_typeface_fontStyle: null,
    in_typeface_fontVariant: null,
    in_typeface_lineHeight: null,
    in_typeface_letterSpacing: null,
    in_typeface_textAlign: null,
    in_typeface_textDecoration: null,
    in_typeface_textTransform: null,
    in_typeface_textShadow: null,

    //--------------------------
    shadow: null,

    //--------------------------
    filter: null,

    //--------------------------
    transform: {},

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

    has_grid() {
      return !!this.target?.data.grid;
    },

    available_tabs() {
      return STYLE_TABS.filter(
        (tab) =>
          !this.options?.exclude?.includes(tab) &&
          (tab !== "grid" || this.has_grid) /*It should set grid key!*/,
      );
    },

    shadow_gen() {
      return BoxShadowHelper.Generate(this.shadow);
    },
    shadow_text_gen() {
      return TextShadowHelper.Generate(this.in_typeface_textShadow);
    },
    in_shadow_edit() {
      return this.shadow && !this.isString(this.shadow);
    },

    text_decoration_gen() {
      return TextDecorationHelper.Generate(this.in_typeface_textDecoration);
    },

    //-----------------------------------
    transform_gen() {
      const transformMap = {
        perspective: "px",
        rotate: "deg",
        rotateX: "deg",
        rotateY: "deg",
        rotateZ: "deg",
        scaleX: "",
        scaleY: "",
        scaleZ: "",
        skewX: "deg",
        skewY: "deg",
        translateX: "px",
        translateY: "px",
        translateZ: "px",
      };

      let out = "";
      // console.log("this.transform", this.transform);
      Object.keys(this.transform).forEach((key) => {
        const value = this.transform[key];
        if (!value || ["auto", "none", "unset"].includes(value)) return;

        const unit = transformMap[key] || "";
        out += `${key}(${value}${unit}) `;
      });

      return out.trim();
    },

    //-----------------------------------
    in_style() {
      const out = {
        position: this.in_position,

        top: this.in_top,
        bottom: this.in_bottom,
        left: this.in_left,
        right: this.in_right,
        zIndex: this.in_z_index,

        marginLeft: this.in_marginLeft,
        marginRight: this.in_marginRight,
        marginTop: this.in_marginTop,
        marginBottom: this.in_marginBottom,

        paddingLeft: this.in_paddingLeft,
        paddingRight: this.in_paddingRight,
        paddingTop: this.in_paddingTop,
        paddingBottom: this.in_paddingBottom,

        borderRadius: this.in_borderRadius,
        borderLeft: this.in_borderLeft,
        borderRight: this.in_borderRight,
        borderTop: this.in_borderTop,
        borderBottom: this.in_borderBottom,

        boxShadow: this.shadow_gen,

        filter: this.filter,

        transform: this.transform_gen,

        // Typeface:
        color: this.in_typeface_color,
        fontFamily: this.in_typeface_fontFamily,
        fontSize: this.in_typeface_fontSize,
        fontWeight: this.in_typeface_fontWeight,
        fontStyle: this.in_typeface_fontStyle,
        fontVariant: this.in_typeface_fontVariant,
        lineHeight: this.in_typeface_lineHeight,
        letterSpacing: this.in_typeface_letterSpacing,
        textAlign: this.in_typeface_textAlign,
        textDecoration: this.text_decoration_gen,
        textTransform: this.in_typeface_textTransform,
        textShadow: this.shadow_text_gen,
      };

      if (this.has_size) {
        out.width = this.in_width;
        out.height = this.in_height;

        out.minWidth = this.in_minWidth;
        out.minHeight = this.in_minHeight;

        out.maxWidth = this.in_maxWidth;
        out.maxHeight = this.in_maxHeight;
      }

      return out;
    },

    //------------- Options ----------

    has_size() {
      return !this.options?.exclude?.includes("size");
    },
    has_typeface() {
      return !this.options?.exclude?.includes("typeface");
    },

    customElementTags() {
      if (this.is_XTextObject) return ["p", "h1", "h2", "h3", "h4", "h5"];
      return null;
    },

    upload_bg_url() {
      return this.builder.getImageUploadUrl();
    },
    upload_video_url() {
      return this.builder.getVideoUploadUrl();
    },

    is_XTextObject() {
      return this.target instanceof XTextObject;
    },
    is_XUploaderObject() {
      return this.target instanceof XUploaderObject;
    },
  },

  watch: {
    in_classes() {
      this.setSizePositionDebounced();
    },

    in_width() {
      this.setSizePositionDebounced();
    },
    in_height() {
      this.setSizePositionDebounced();
    },
    in_minWidth() {
      this.setSizePositionDebounced();
    },
    in_minHeight() {
      this.setSizePositionDebounced();
    },
    in_maxWidth() {
      this.setSizePositionDebounced();
    },
    in_maxHeight() {
      this.setSizePositionDebounced();
    },

    in_position() {
      this.setSizePositionDebounced();
    },

    in_top() {
      this.setSizePositionDebounced();
    },
    in_bottom() {
      this.setSizePositionDebounced();
    },
    in_left() {
      this.setSizePositionDebounced();
    },
    in_right() {
      this.setSizePositionDebounced();
    },
    in_z_index() {
      this.setSizePositionDebounced();
    },

    in_marginLeft() {
      this.setSizePositionDebounced();
    },
    in_marginRight() {
      this.setSizePositionDebounced();
    },
    in_marginTop() {
      this.setSizePositionDebounced();
    },
    in_marginBottom() {
      this.setSizePositionDebounced();
    },

    in_paddingLeft() {
      this.setSizePositionDebounced();
    },
    in_paddingRight() {
      this.setSizePositionDebounced();
    },
    in_paddingTop() {
      this.setSizePositionDebounced();
    },
    in_paddingBottom() {
      this.setSizePositionDebounced();
    },

    in_borderRadius() {
      this.setSizePositionDebounced();
    },

    in_borderLeft() {
      this.setSizePositionDebounced();
    },
    in_borderRight() {
      this.setSizePositionDebounced();
    },
    in_borderTop() {
      this.setSizePositionDebounced();
    },
    in_borderBottom() {
      this.setSizePositionDebounced();
    },

    shadow: {
      handler() {
        this.setSizePositionDebounced();
      },
      deep: true,
    },

    filter: {
      handler() {
        this.setSizePositionDebounced();
      },
      deep: true,
    },

    transform: {
      handler() {
        this.setSizePositionDebounced();
      },
      deep: true,
    },
    background: {
      handler() {
        this.setSizePositionDebounced();
      },
      deep: true,
    },

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
      // Add wait:
      await this.$nextTick();

      this.background = this.target.background;
      if (
        !this.background ||
        !isObject(this.background) ||
        Array.isArray(this.background)
      )
        this.background = {};

      //  this.Selected_tab = this.has_size ? STYLE_TABS[0] : STYLE_TABS[1];

      let classes = this.target.classes;
      if (!classes) classes = [];
      this.in_classes = classes.unique();

      //console.log(' this.in_classes', this.in_classes,this.el_class.className)
      let style = this.target.style;
      if (!style || Array.isArray(style)) style = {};

      this.in_width = this.el_style.style.width;
      this.in_height = this.el_style.style.height;

      this.in_minWidth = this.el_style.style.minWidth;
      this.in_minHeight = this.el_style.style.minHeight;

      this.in_maxWidth = this.el_style.style.maxWidth;
      this.in_maxHeight = this.el_style.style.maxHeight;

      // Position:
      this.in_position = this.el_style.style.position;
      //if (!this.in_position) this.in_position = "static";

      this.in_top = this.el_style.style.top;
      this.in_bottom = this.el_style.style.bottom;
      this.in_left = this.el_style.style.left;
      this.in_right = this.el_style.style.right;
      this.in_z_index = this.el_style.style.zIndex;

      // Margin:

      this.in_marginLeft = this.el_style.style.marginLeft;
      this.in_marginRight = this.el_style.style.marginRight;
      this.in_marginTop = this.el_style.style.marginTop;
      this.in_marginBottom = this.el_style.style.marginBottom;

      // Padding:

      this.in_paddingLeft = this.el_style.style.paddingLeft;
      this.in_paddingRight = this.el_style.style.paddingRight;
      this.in_paddingTop = this.el_style.style.paddingTop;
      this.in_paddingBottom = this.el_style.style.paddingBottom;

      // Border:

      this.in_borderRadius = this.el_style.style.borderRadius;

      this.in_borderLeft = `${this.el_style.style.borderLeftWidth} ${this.el_style.style.borderLeftStyle} ${this.el_style.style.borderLeftColor}`;
      this.in_borderRight = `${this.el_style.style.borderRightWidth} ${this.el_style.style.borderRightStyle} ${this.el_style.style.borderRightColor}`;
      this.in_borderTop = `${this.el_style.style.borderTopWidth} ${this.el_style.style.borderTopStyle} ${this.el_style.style.borderTopColor}`;
      this.in_borderBottom = `${this.el_style.style.borderBottomWidth} ${this.el_style.style.borderBottomStyle} ${this.el_style.style.borderBottomColor}`;

      // Filter:
      this.filter = this.el_style.style.filter;

      // Shadow:

      this.shadow = this.el_style.style.boxShadow;

      // Try to extract value:
      if (
        this.el_style.style.boxShadow &&
        !ShadowCollection.includes(this.shadow) // Not in collection!
      ) {
        this.shadow = BoxShadowHelper.Extract(this.el_style.style.boxShadow);
      }

      // Transform:

      // Get raw transform from original object because of reset transform in draggable page edit:
      const transform_raw = style.transform;
      //console.log("transform_raw", transform_raw);

      this.transform = this.ConvertStylePropertyToObject(transform_raw);
      // Remove deg from values: (Deg inputs are raw number!)
      Object.keys(this.transform).forEach((key) => {
        const val = this.transform[key];
        if (val.includes("deg")) this.transform[key] = val.replace("deg", "");
      });

      // Typeface:
      this.in_typeface_color = this.makeNullIfEmpty(this.el_style.style.color);
      this.in_typeface_fontFamily = this.makeNullIfEmpty(
        this.el_style.style.fontFamily,
      );
      this.in_typeface_fontSize = this.makeNullIfEmpty(
        this.el_style.style.fontSize,
      );
      this.in_typeface_fontWeight = this.makeNullIfEmpty(
        this.el_style.style.fontWeight,
      );
      this.in_typeface_fontStyle = this.makeNullIfEmpty(
        this.el_style.style.fontStyle,
      );
      this.in_typeface_fontVariant = this.makeNullIfEmpty(
        this.el_style.style.fontVariant,
      );
      this.in_typeface_lineHeight = this.makeNullIfEmpty(
        this.el_style.style.lineHeight,
      );
      this.in_typeface_letterSpacing = this.makeNullIfEmpty(
        this.el_style.style.letterSpacing,
      );
      this.in_typeface_textAlign = this.makeNullIfEmpty(
        this.el_style.style.textAlign,
      );
      this.in_typeface_textDecoration = TextDecorationHelper.Extract(
        this.makeNullIfEmpty(this.el_style.style.textDecoration),
      );
      this.in_typeface_textTransform = this.makeNullIfEmpty(
        this.el_style.style.textTransform,
      );
      this.in_typeface_textShadow = TextShadowHelper.Extract(
        this.makeNullIfEmpty(this.el_style.style.textShadow),
      );

      //console.log("transform object:", this.transform);

      this.$nextTick(() => {
        this.dialog_pre = true;
        this.show_dialog_size = true;
        this.LOCK = false; // 🔓 Now can update values
      });
    },

    makeNullIfEmpty(val) {
      return val && val.trim().length ? val : null;
    },

    /**
     * Extract transform property : transform: rotate(12deg) translateX(15px);
     * @param styles
     * @returns {{}}
     * @constructor
     */
    ConvertStylePropertyToObject(styles) {
      if (!styles) return {};
      const out = {};

      styles.split(" ").forEach((style) => {
        const arr = style.split("(");
        if (arr.length > 1) {
          out[arr[0].trim()] = arr[1].trim().replace(")", "").replace(";", "");
        }
      });
      return out;
    },

    //----------------------------------------------------------------------------
    setSizePositionDebounced: _.debounce(function () {
      this.setSizePosition();
    }, 100),

    setSizePosition() {
      if (!this.show_dialog_size || this.LOCK) return;

      // ━━━━━━━━━━━━━━━ 🍀 Style ━━━━━━━━━━━━━━━

      const t = this;

      function safeSetStyle(key, val) {
        if (val && val !== "unset") t.el_style.style[key] = val;
        else {
          t.el_style.style.removeProperty(key); // The removeProperty() method in JavaScript is used to remove a CSS property from the style object of an element. However, it only works with properties that are set through CSS stylesheets, not inline styles.
          t.el_style.style[key] = "";
          //console.log('Set Style',key,converted,val)
        }
      }

      if (this.has_size) {
        safeSetStyle("width", this.in_width);
        safeSetStyle("height", this.in_height);
        safeSetStyle("minWidth", this.in_minWidth);
        safeSetStyle("minHeight", this.in_minHeight);
        safeSetStyle("maxWidth", this.in_maxWidth);
        safeSetStyle("maxHeight", this.in_maxHeight);
      }

      safeSetStyle("position", this.in_position);

      safeSetStyle("top", this.in_top);
      safeSetStyle("bottom", this.in_bottom);
      safeSetStyle("left", this.in_left);
      safeSetStyle("right", this.in_right);
      safeSetStyle("zIndex", this.in_z_index);

      safeSetStyle("marginLeft", this.in_marginLeft);
      safeSetStyle("marginRight", this.in_marginRight);
      safeSetStyle("marginTop", this.in_marginTop);
      safeSetStyle("marginBottom", this.in_marginBottom);
      safeSetStyle("paddingLeft", this.in_paddingLeft);
      safeSetStyle("paddingRight", this.in_paddingRight);
      safeSetStyle("paddingTop", this.in_paddingTop);
      safeSetStyle("paddingBottom", this.in_paddingBottom);

      safeSetStyle("borderRadius", this.in_borderRadius);
      safeSetStyle("borderLeft", this.in_borderLeft);
      safeSetStyle("borderRight", this.in_borderRight);
      safeSetStyle("borderTop", this.in_borderTop);
      safeSetStyle("borderBottom", this.in_borderBottom);

      safeSetStyle("boxShadow", this.shadow_gen);

      safeSetStyle("filter", this.filter);

      safeSetStyle("transform", this.transform_gen);

      // Typeface:
      safeSetStyle("color", this.in_typeface_color);
      safeSetStyle("fontFamily", this.in_typeface_fontFamily);
      safeSetStyle("fontSize", this.in_typeface_fontSize);
      safeSetStyle("fontWeight", this.in_typeface_fontWeight);
      safeSetStyle("fontStyle", this.in_typeface_fontStyle);
      safeSetStyle("fontVariant", this.in_typeface_fontVariant);
      safeSetStyle("lineHeight", this.in_typeface_lineHeight);
      safeSetStyle("letterSpacing", this.in_typeface_letterSpacing);
      safeSetStyle("textAlign", this.in_typeface_textAlign);
      safeSetStyle("textDecoration", this.text_decoration_gen);
      safeSetStyle("textTransform", this.in_typeface_textTransform);
      safeSetStyle("textShadow", this.shadow_text_gen);

      let style = this.target.style;
      if (!style || Array.isArray(style)) style = {};

      // Keep other style values and filter!
      Object.keys(this.in_style).forEach((k) => {
        if (
          this.in_style[k] &&
          (!isString(this.in_style[k]) ||
            (this.in_style[k].trim().length &&
              this.in_style[k].trim() !== "unset"))
        ) {
          style[k] = this.in_style[k];
        } else {
          delete style[k];
        }
      });
      //console.log("Element style -->  ", style);

      //  style = Object.assign(style, filtered_style);

      this.target.style = style; // Save data in section!

      // ━━━━━━━━━━━━━━━ 🌸 Class ━━━━━━━━━━━━━━━
      // Save Custom Classes
      // Set classes:
      let classes = this.target.classes;
      if (!classes) classes = [];
      const cur_classes = classes;

      // console.log(' Set classes', 'cur_classes',cur_classes)
      this.in_classes = this.in_classes.map((c) => trim(c)).unique();

      const deletes = cur_classes.filter(
        (element) => !this.in_classes.includes(element),
      );
      const adds = this.in_classes.filter(
        (element) => !cur_classes.includes(element),
      );

      //  console.log(' Set classes', 'deletes',deletes,'adds',adds)

      this.el_class.classList.remove(...deletes);
      this.el_class.classList.add(...adds);

      this.target.classes = this.in_classes; // Save data in section!

      // ━━━━━━━━━━━━━━━ 🌼 Background ━━━━━━━━━━━━━━━
      const background = this.background;
      if (background) {
        const bg_style = LUtilsBackground.CreateCompleteBackgroundStyleObject(
          background.bg_custom,
          background.bg_gradient,
          background.bg_image
            ? this.getShopImagePath(background.bg_image)
            : null,
          background.bg_size,
          background.bg_repeat,
          background.bg_color,
          background.dark,
          background.bg_position,
          background.bg_rotation,
          background.bg_backdrop,
        );
        //console.log('background',background, t.el_style)
        Object.keys(bg_style).forEach((key) => {
          this.el_style.style[key] = bg_style[key];
        });
      }
      this.target.background = background; // Save data in section!
    },
  },
};
</script>

<style lang="scss" scoped></style>
