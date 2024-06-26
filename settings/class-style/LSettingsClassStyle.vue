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
    v-model="show_dialog_size"
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
    <v-card v-if="dialog_pre" :style="global_variables" class="text-start" flat>
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
      <template v-if="customElementTags">
        <s-setting-toggle
          label="Element"
          icon="video_label"
          v-model="target.tag"
          :items="customElementTags"
        ></s-setting-toggle>
      </template>

      <v-expansion-panels v-model="Selected_tab">
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
      </v-expansion-panels>
    </v-card>
  </v-navigation-drawer>
</template>

<script>
import ShadowCollection from "../../src/enums/ShadowCollection";
import LEventsName from "../../mixins/events/name/LEventsName";
import { LUtilsHighlight } from "../../utils/highligh/LUtilsHighlight";
import _ from "lodash-es";
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
];

export default {
  name: "LSettingsClassStyle",
  mixins: [LMixinEvents],
  components: {
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

  props: {
    builder: { type: Object, required: true },
  },
  data: () => ({
    el_style: null,
    el_class: null,
    target: null,
    keyStyle: null, // style
    keyClass: null, // classes
    options: {},

    // ---------------------------------
    show_dialog_size: false,
    dialog_pre: false,

    Selected_tab: "classes",

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
    global_variables() {
      return LUtilsColors.GenerateColorsStyle(this.builder.style);
    },

    available_tabs() {
      if (this.has_size) return STYLE_TABS;
      return [...STYLE_TABS].remove("size");
    },

    shadow_gen() {
      if (!this.shadow) return "";
      if (this.isString(this.shadow)) return this.shadow;
      return `${this.shadow.w}px ${this.shadow.h}px ${this.shadow.r}px ${
        this.shadow.s
      }px ${this.shadow.c} ${this.shadow.i ? "inset" : ""}`;
    },
    in_shadow_edit() {
      return this.shadow && !this.isString(this.shadow);
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
      return !this.options?.noSize;
    },
    customElementTags() {
      return this.options?.tags;
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

      ({ el_style, el_class, target, keyStyle, keyClass, options }) => {
        this.CloseAllPageBuilderNavigationDrawerTools(); // Close all open tools.

        this.LOCK = true; // 🔒 Prevent update style and classes

        this.el_style = el_style;
        this.el_class = el_class;

        this.target = target;
        this.keyStyle = keyStyle;
        this.keyClass = keyClass;

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
    addShadow() {
      this.shadow = { w: 10, h: 10, r: 15, s: 20, c: "#44444433", i: false };
    },
    removeShadow() {
      this.shadow = null;
    },

    showSizeDialog() {
      //  this.Selected_tab = this.has_size ? STYLE_TABS[0] : STYLE_TABS[1];

      let classes = this.target[this.keyClass];
      if (!classes) classes = [];
      this.in_classes = classes.unique();

      //console.log(' this.in_classes', this.in_classes,this.el_class.className)
      let style = this.target[this.keyStyle];
      if (!style || Array.isArray(style)) style = {};

      this.in_width = this.el_style.style.width;
      this.in_height = this.el_style.style.height;

      this.in_minWidth = this.el_style.style.minWidth;
      this.in_minHeight = this.el_style.style.minHeight;

      this.in_maxWidth = this.el_style.style.maxWidth;
      this.in_maxHeight = this.el_style.style.maxHeight;

      // Position:
      this.in_position = this.el_style.style.position;
      if (!this.in_position) this.in_position = "static";

      this.in_top = this.el_style.style.top;
      this.in_bottom = this.el_style.style.bottom;
      this.in_left = this.el_style.style.left;
      this.in_right = this.el_style.style.right;

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
      //console.log("boxShadow ", this.el_style.style.boxShadow);
      // Try to extract value:
      if (
        this.el_style.style.boxShadow &&
        !ShadowCollection.includes(this.shadow)
      )
        // Not in collection!
        try {
          const arr = this.el_style.style.boxShadow.split(/ (?![^(]*\))/);
          if (arr.length >= 5)
            this.shadow = {
              w: parseInt(arr[1]),
              h: parseInt(arr[2]),
              r: parseInt(arr[3]),
              s: parseInt(arr[4]),
              c: arr[0],
              i: arr.includes("inset"),
            };
          //console.log("boxShadow ",this.el_style.style.boxShadow,  this.shadow);
        } catch (e) {
          console.error(e);
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

      //console.log("transform object:", this.transform);

      this.dialog_pre = false;
      this.$nextTick(() => {
        this.dialog_pre = true;
        this.show_dialog_size = true;
        this.LOCK = false; // 🔓 Now can update values
      });
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

      const t = this;

      function convertToDashSeparated(str) {
        return str.replace(/([a-z])([A-Z])/g, "$1-$2").toLowerCase();
      }

      function safeSetStyle(key, val) {
        if (val && val !== "unset") t.el_style.style[key] = val;
        else {
          t.el_style.style.removeProperty(key); // The removeProperty() method in JavaScript is used to remove a CSS property from the style object of an element. However, it only works with properties that are set through CSS stylesheets, not inline styles.
          //const converted = convertToDashSeparated(key); // minWidth -> min-width
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

      let style = this.target[this.keyStyle];
      if (!style || Array.isArray(style)) style = {};

      // Keep other style values and filter!
      Object.keys(this.in_style).forEach((k) => {
        if (
          this.in_style[k] &&
          this.in_style[k].trim().length &&
          this.in_style[k].trim() !== "unset"
        ) {
          style[k] = this.in_style[k];
        } else {
          delete style[k];
        }
      });
      //console.log("Element style -->  ", style);

      //  style = Object.assign(style, filtered_style);

      this.target[this.keyStyle] = style; // Save data in section!

      // ----------------------- Save Custom Classes -----------------------
      // Set classes:
      let classes = this.target[this.keyClass];
      if (!classes) classes = [];
      const cur_classes = classes;

      // console.log(' Set classes', 'cur_classes',cur_classes)

      const deletes = cur_classes.filter(
        (element) => !this.in_classes.includes(element),
      );
      const adds = this.in_classes.filter(
        (element) => !cur_classes.includes(element),
      );

      //  console.log(' Set classes', 'deletes',deletes,'adds',adds)

      this.el_class.classList.remove(...deletes);
      this.el_class.classList.add(...adds);

      ///console.log("Element classes -->  ", this.in_classes);

      this.target[this.keyClass] = this.in_classes; // Save data in section!
    },
  },
};
</script>

<style lang="scss" scoped>
.shad-con {
  position: relative;
  min-height: 220px;
  height: 30vh;
  display: flex;
  align-items: center;
  justify-content: center;

  .shad-pre {
    height: 64px;
    width: 64px;
    border-radius: 50%;
    background: #fafafa;
    transition: all 0.5s ease-in-out;

    &.-inset {
      height: 200px;
      width: 200px;
    }
  }
}
</style>
