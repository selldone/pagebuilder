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
  <s-styler-template
    ref="styler"
    :el="el"
    :section="section"
    type="button"
    :builder="builder"
    :is-visible="isVisible"
  >
    <!-- Important: Display non because of preventing proper error -->

    <!-- ―――――――――――――――――――――――――――――――――――――――――――――――――――――――――― -->
    <!-- ――――――――――――――――――――――― Normal editing tools ―――――――――――――――――――――― -->
    <!-- ―――――――――――――――――――――――――――――――――――――――――――――――――――――――――― -->

    <ul class="styler-list">
      <!-- ―――――――――――――――――― Delete button / col ―――――――――――――――――― -->

      <template v-if="remove">
        <li>
          <button class="styler-button" @click="remove()">
            <v-icon color="red" size="20">close</v-icon>

            <v-tooltip
              activator="parent"
              location="bottom"
              content-class="bg-black white--text"
              >Delete button
            </v-tooltip>
          </button>
        </li>
        <v-divider class="mx-2" vertical inset></v-divider>
      </template>

      <!-- ―――――――――――――――――― Colors ―――――――――――――――――― -->

      <li>
        <button class="styler-button" @click="updateOption('colorer')">
          <SStylerIcon name="palettes" />

          <v-tooltip
            activator="parent"
            location="bottom"
            content-class="bg-black white--text"
          >
            Background
            <v-chip v-if="colorerColor" size="small" pill class="ma-1">
              {{ colorerColor }}
            </v-chip>

            <v-chip v-if="custom_color_value" size="small" pill class="ma-1">
              <v-icon start :color="custom_color_value">circle</v-icon>
              {{ custom_color_value }}
            </v-chip>
          </v-tooltip>
        </button>
      </li>

      <!-- ―――――――――――――――――― Link ―――――――――――――――――― -->

      <li v-if="!noLink">
        <button class="styler-button" @click="updateOption('link')">
          <SStylerIcon name="link" />

          <v-tooltip
            activator="parent"
            location="bottom"
            content-class="bg-black white--text"
            >Set link

            <div v-if="target[keyUrl]" class="small">
              <b>Href:</b> {{ target[keyUrl] }}
            </div>
          </v-tooltip>
        </button>
      </li>

      <li>
        <button class="styler-button" @click="updateOption('btn-shape')">
          <v-icon size="20">smart_button</v-icon>

          <v-tooltip
            activator="parent"
            location="bottom"
            content-class="bg-black white--text"
            >Shape and style
          </v-tooltip>
        </button>
      </li>

      <li>
        <button class="styler-button" @click="updateOption('btn-size')">
          <v-icon size="20">straighten</v-icon>
          <v-tooltip
            activator="parent"
            location="bottom"
            content-class="bg-black white--text"
            >Button size
          </v-tooltip>
        </button>
      </li>

      <!-- ―――――――――――――――――― Text & Button caption―――――――――――――――――― -->
      <li>
        <button class="styler-button" @click="updateOption('textColor')">
          <v-icon size="20">format_color_text</v-icon>

          <v-tooltip
            activator="parent"
            location="bottom"
            content-class="bg-black white--text"
            max-width="320"
            >Select text and to change the color
          </v-tooltip>
        </button>
      </li>

      <li>
        <button class="styler-button" @click="updateOption('text-font')">
          <v-icon size="20">font_download</v-icon>

          <v-tooltip
            activator="parent"
            location="bottom"
            content-class="bg-black white--text"
            max-width="320"
            >Change font
          </v-tooltip>
        </button>
      </li>

      <li v-if="hasAlign">
        <button class="styler-button" @click="updateOption('align')">
          <SStylerIcon name="align" />

          <v-tooltip
            activator="parent"
            location="bottom"
            content-class="bg-black white--text"
            max-width="320"
            >Change text align
          </v-tooltip>
        </button>
      </li>
    </ul>

    <!-- ―――――――――――――――――――――――――――――――――――――――――――――――――――――――――― -->
    <!-- ―――――――――――――――――――― Normal editing tools (sub list) ――――――――――――――――――― -->
    <!-- ―――――――――――――――――――――――――――――――――――――――――――――――――――――――――― -->

    <ul class="styler-list flex-grow-1 w-100">
      <!-- ―――――――――――――――――― Align ―――――――――――――――――― -->

      <li v-if="option === 'align'">
        <ul class="align">
          <li v-for="it in TextAlign" :key="it.val">
            <button
              class="styler-button"
              @mousedown="
                (event) => {
                  setTextAlign(it.val);

                  event.preventDefault();
                }
              "
              :title="getName(it.val)"
            >
              <v-icon size="20">{{ it.icon }}</v-icon>
            </button>
          </li>
        </ul>
      </li>

      <!-- ―――――――――――――――――― Color ―――――――――――――――――― -->

      <li v-if="option === 'colorer'">
        <ul class="colorer">
          <li v-for="color in COLORS_LIGHT" :key="color">
            <input
              :id="`color${color.charAt(0).toUpperCase() + color.slice(1)}`"
              v-model="colorerColor"
              type="radio"
              name="colorer"
              :value="color"
              @change="changeColor()"
            />
          </li>

          <v-btn
            icon
            class="mb-1 ms-3 bg-tiny-checkers rounded-circle"
            @click="
              showColorDialog(
                custom_color_value,
                setCustomColorerBgSection,
                true,
              )
            "
            size="30"
          >
            <v-icon :color="custom_color_value" size="20">adjust</v-icon>
          </v-btn>
        </ul>
      </li>

      <!-- ―――――――――――――――――― Link ―――――――――――――――――― -->

      <li v-if="option === 'link'" class="flex-grow-1">
        <div class="input-group is-rounded has-itemAfter is-primary">
          <v-text-field
            variant="solo"
            flat
            rounded
            v-model="target[keyUrl]"
            class="english-field mx-2"
            placeholder="https://..."
            messages="● External: https://domain.. ● Internal: /shop"
            @blur="addLink"
            @keydown.enter="addLink"
            :prepend-inner-icon="target[keyUrl] ? 'link' : 'link_off'"
            clearable
          />
        </div>
      </li>

      <!-- ―――――――――――――――――― Button Shape ―――――――――――――――――― -->
      <li v-if="option === 'btn-shape'">
        <small class="d-block my-1 text-start px-3">Variant</small>

        <div class="mb-2 px-2">
          <v-btn
            v-for="variant in [
              'glow',

              'elevated',
              'flat',
              'tonal',
              'outlined',
              'text',
              'plain',
            ]"
            :key="variant"
            :variant="variant"
            class="ma-1 x--button"
            size="small"
            color="#fff"
            @click="target.variant = variant"
            rounded
            :class="{ 'button-glow': variant === 'glow' }"
            :style="
              variant === 'glow' ? 'font-size: 14px;color: #000;' : undefined
            "
          >
            <v-scale-transition leave-absolute>
              <v-icon v-if="target.variant === variant" start color="green"
                >check_circle
              </v-icon>
            </v-scale-transition>
            {{ variant }}
          </v-btn>
        </div>

        <small class="d-block my-1 text-start px-3">Rounded:</small>
        <v-btn
          v-for="rounded in ['0', 'xs', 'sm', 'default', 'lg', 'xl']"
          :key="rounded"
          :rounded="rounded"
          class="ma-1 x--button"
          size="small"
          :variant="target.rounded === rounded ? 'flat' : 'outlined'"
          color="#fff"
          @click="target.rounded = rounded"
        >
          <v-scale-transition leave-absolute>
            <v-icon v-if="target.rounded === rounded" start color="green"
              >check_circle
            </v-icon>
          </v-scale-transition>
          {{ rounded }}
        </v-btn>
        <small class="d-block my-1 text-start px-3">Other:</small>

        <v-row align="center" justify="center" class="ma-0">
          <v-col
            v-if="target.variant !== 'glow' /*Not supported for this variant*/"
            cols="12"
            sm="6"
          >
            <v-slide-y-transition hide-on-leave>
              <v-btn
                v-if="
                  target.elevation === null || target.elevation === undefined
                "
                class="tnt"
                size="small"
                variant="plain"
                @click="target.elevation = 0"
              >
                <v-icon start>layers_clear</v-icon>
                Set elevation
              </v-btn>
              <s-number-input
                e-else
                v-model="target.elevation"
                :min="0"
                :max="24"
                label="Elevation"
                clearable
                @clear="target.elevation === null"
              ></s-number-input>
            </v-slide-y-transition>
          </v-col>
        </v-row>
      </li>

      <!-- ―――――――――――――――――― Button Size ―――――――――――――――――― -->
      <li v-if="option === 'btn-size'">
        <v-btn
          v-for="size in BtnSizes"
          :key="size.val"
          :size="size.val"
          :variant="target.size === size.val ? 'flat' : 'outlined'"
          class="ma-1"
          color="#fff"
          @click="target.size = size.val"
          rounded
        >
          <v-scale-transition leave-absolute>
            <v-icon v-if="target.size === size.val" start color="green"
              >check_circle
            </v-icon>
          </v-scale-transition>
          {{ size.title }}
        </v-btn>
      </li>

      <!-- ―――――――――――――――――― Text Color ―――――――――――――――――― -->

      <li v-if="option === 'textColor'">
        <ul class="colorer">
          <li v-for="(color, index) in TEXT_COLORS" :key="color">
            <input
              :value="color"
              type="radio"
              name="colorer"
              @mousedown="
                (event) => {
                  execute('forecolor', TEXT_COLORS[index]);
                  event.preventDefault();
                }
              "
              :style="{ backgroundColor: TEXT_COLORS[index] }"
              :title="`Color ${index + 1}`"
            />
          </li>

          <v-btn
            size="30"
            class="mb-1 ms-3 bg-tiny-checkers rounded-circle"
            @mousedown="openTextColorEdit"
            title="Open color dialog."
          >
            <v-icon
              :color="text_color_display"
              size="20"
              class="hover-scale-small"
              >circle
            </v-icon>
          </v-btn>
        </ul>
      </li>

      <!-- ―――――――――――――――――― Text Font ―――――――――――――――――― -->

      <div v-if="option === 'text-font'" class="flex-grow-1 pa-1">
        <v-select
          :items="fonts"
          v-model="text_font"
          variant="solo"
          clearable
          class="mx-2"
          @update:model-value="setFont"
          messages=" "
          placeholder="Select a font..."
          rounded

        >
          <template v-slot:item="{ item, props }">
            <v-list-item v-bind="props" @click.stop>
              <template v-slot:title>
                <span :style="{ fontFamily: item.raw }">{{ item.raw }}</span>
              </template>
            </v-list-item>
          </template>
          <template v-slot:selection="{ item }">
            <span :style="{ fontFamily: item.raw }">{{ item.raw }}</span>
          </template>
          <template v-slot:message>
            <div class="mt-1">
              ● Add font in
              <b>
                <v-icon size="small">format_paint</v-icon>
                Style</b
              >.
            </div>
          </template>
        </v-select>
      </div>
    </ul>
  </s-styler-template>
</template>

<script>
import { PageBuilderMixin } from "@app-page-builder/mixins/PageBuilderMixin";
import { LandingHistoryMixin } from "@app-page-builder/mixins/LandingToolsMixin";
import SStylerTemplate from "@app-page-builder/styler/template/SStylerTemplate.vue";
import { StylerMixin } from "@app-page-builder/mixins/StylerMixin";
import SStylerIcon from "@app-page-builder/styler/icon/SStylerIcon.vue";
import { PageBuilderColorsHelper } from "@app-page-builder/src/helpers/PageBuilderColorsHelper";
import SNumberInput from "@components/ui/input/number/SNumberInput.vue";

const TextAlign = [
  { val: "left", icon: "format_align_left" },
  { val: "center", icon: "format_align_center" },
  { val: "right", icon: "format_align_right" },
  { val: "justify", icon: "format_align_justify" },
];
const ButtonAlign = [
  { val: "left", icon: "format_align_left" },
  { val: "center", icon: "format_align_center" },
  { val: "right", icon: "format_align_right" },
];
const COLORS = [
  "samin",
  "pink",
  "black",
  "green",

  "blue",
  "white",
  "deep-purple",
  "teal",
  "cyan",
  "amber",
  "blue-grey",

  "transparent",
];

export default {
  name: "SStylerButton",

  mixins: [PageBuilderMixin, LandingHistoryMixin, StylerMixin],

  components: {
    SNumberInput,
    SStylerIcon,
    SStylerTemplate,
  },
  props: {
    builder: {
      required: true,
    },

    el: {
      required: true,
    },

    target: {
      required: true,
      type: Object,
      // It's the value of v-styler:arg="value"
    },
    section: {
      type: Object,
      required: true,
    },

    /**
     * Set the location of the proper
     */
    position: {
      type: String,
      default: "top-center",
    },

    /**
     * Show delete button
     */
    remove: {
      type: Function,
    },
    noLink: {
      type: Boolean,
      default: false,
    },
    hasAlign: {
      type: Boolean,
      default: false,
    },

    keyUrl: {
      type: String,
      default: "href",
    },
    keyColor: {
      type: String,
      default: "color",
    },
  },
  data: () => ({
    TextAlign: TextAlign,
    ButtonAlign: ButtonAlign,
    COLORS_LIGHT: COLORS,
    COLORS_DARK: COLORS,

    BtnSizes: [
      { val: "x-small", title: "X Small" },
      { val: "small", title: "Small" },
      { val: "default", title: "Normal" },
      { val: "large", title: "Large" },
      { val: "x-large", title: "X Large" },
    ],
    BtnShapes: [
      { val: "depressed", title: "Depressed", icon: "layers_clear" },
      { val: "outlined", title: "Outlined", icon: "done_outline" },
      { val: "text", title: "Text", icon: "text_rotation_none" },
      { val: "tile", title: "Tile", icon: "crop_din" },

      { val: "ripple", title: "Ripple", icon: "leak_add" },
      { val: "glow", title: "Glow", icon: "all_out" },
      { val: "icon", title: "Icon", icon: "stop_circle" },
      { val: "rounded", title: "Rounded", icon: "rounded_corner" },
    ],

    option: null,

    colorerColor: "",

    custom_color_value: null,

    text_color_display: null, // Just for display!
    text_font: null,
  }),

  computed: {
    TEXT_COLORS() {
      return [
        PageBuilderColorsHelper.GetColorDark(this.$builder.style, 1),
        PageBuilderColorsHelper.GetColorDark(this.$builder.style, 2),
        PageBuilderColorsHelper.GetColorDark(this.$builder.style, 3),
        PageBuilderColorsHelper.GetColorDark(this.$builder.style, 4),
        PageBuilderColorsHelper.GetColorDark(this.$builder.style, 5),
        PageBuilderColorsHelper.GetColorDark(this.$builder.style, 6),
        PageBuilderColorsHelper.GetColorDark(this.$builder.style, 7),
        PageBuilderColorsHelper.GetColorDark(this.$builder.style, 8),
        PageBuilderColorsHelper.GetColorDark(this.$builder.style, 9),
        PageBuilderColorsHelper.GetColorDark(this.$builder.style, 10),
        PageBuilderColorsHelper.GetColorDark(this.$builder.style, 11),

        // #FFFFFF not work! bug in execute foreground!
        "transparent",
      ];
    },

    fonts() {
      return this.$builder.style && this.$builder.style.fonts;
    },
  },
  watch: {
    option() {
      this.updatePopper();
    },
    /**
     * Reset menu status when it's closed.
     */
    isVisible() {
      this.option = null;
      this.updatePopper();
    },
  },
  beforeMount() {
    if (!this.target) {
      throw new Error("Target is required for SStylerButtons");
    }

    console.log("this.target", this.target);

    this.el.contentEditable = "true";

    // New style:
    if (this.target.size) {
    }
    // Old style:
    else if (this.target.xSmall) {
      this.target.size = "x-small";
    } else if (this.target.small) {
      this.target.size = "small";
    } else if (this.target.large) {
      this.target.size = "large";
    } else if (this.target.xLarge) {
      this.target.size = "x-large";
    }

    // Remove old style:
    delete this.target.xSmall;
    delete this.target.small;
    delete this.target.large;
    delete this.target.xLarge;

    this.custom_color_value = this.target[this.keyColor];
    console.log("this.custom_color_value", this.custom_color_value);

    // Find color set in class:
    this.colorerColor = COLORS.find((i) =>
      this.target.classes.includes(`is-${i}`),
    );



  },
  mounted() {

    // Set font:
    if (
        this.el.childElementCount === 1 &&
        this.el.firstChild.nodeName === "DIV"
    ) {
      this.text_font = this.el.firstChild.style.fontFamily;
      console.log("this.text_font", this.text_font);
    }


  },

  methods: {
    updateOption(option) {
      if (option === "textColor") {
        // Update current color:
        this.text_color_display = this.getSelectedTextColor();
      }

      // Save range selection:
      this.saveRangeSelected();

      //console.log("updateOption", option);
      this.option = option;
      this.$nextTick(() => {
        this.checkProper();
        this.popper.update();
      });
    },

    // ▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂ Text Align ▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂

    setTextAlign(val) {
      this.setElementClass("text-align-", val, true);
    },

    changeColor() {
      this.removeClass(`is-`);
      this.addClass(`is-${this.colorerColor}`);

      // Remove custom color property:
      this.target[this.keyColor] = null;
    },

    setCustomColorerBgSection(color) {
      console.log("Set custom color:", color);
      this.colorerColor = null;
      this.custom_color_value = color;
      this.removeClass(`is-`); // Remove all color class!

      this.target[this.keyColor] = color;
      this.target.glow = false;
    },

    addClass(className) {
      if (
        Array.isArray(this.target.classes) &&
        !this.target.classes.includes(className)
      )
        this.target.classes.push(className);
    },

    removeClass(className) {
      if (!Array.isArray(this.target.classes)) {
        return;
      }

      // remove any item start with
      this.target.classes = this.target.classes.filter((c) => {
        return !c.startsWith(className);
      });
    },

    //=====================================================================================
    showColorDialog(color, callback, alpha) {
      this.showGlobalColorSelectorDialog(this.el, color, callback, alpha);
    },
    //=====================================================================================

    openTextColorEdit(event) {
      // Save range selection:

      this.showColorDialog(
        this.getSelectedTextColor(),
        (val) => {
          this.$nextTick(() => {
            //  this.restoreSelection();

            this.execute("forecolor", val);

            this.text_color_display = val;
            this.execute("forecolor", val);
          });
        },
        false,
      );

      event.preventDefault();
    },

    addLink(e) {
      e.preventDefault();
      this.option = null;
    },

    // ▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂ Font ▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂

    /*
    Set root element font! not selected!
     */
    setFont(font) {
      console.log("📐 Set font", font, this.el);
      this.target.font=font;
      return;
      this.restoreSelection();
      this.setTextRootElementStyle("font-family", font, true);
    },
  },
};
</script>
