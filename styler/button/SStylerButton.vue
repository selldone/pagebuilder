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
    :builder="builder"
    :el="el"
    :is-visible="isVisible"
    :section="section"
    :target="target"
    has-tracking
    :type="type"
  >
    <!-- Important: Display non because of preventing proper error -->

    <!-- ―――――――――――――――――――――――――――――――――――――――――――――――――――――――――― -->
    <!-- ――――――――――――――――――――――― Normal editing tools ―――――――――――――――――――――― -->
    <!-- ―――――――――――――――――――――――――――――――――――――――――――――――――――――――――― -->

    <ul class="styler-list">
      <!-- ―――――――――――――――――― Size & Class ―――――――――――――――――― -->

      <li>
        <button class="styler-button" @click="showMasterDesignDialog()">
          <v-icon size="20">architecture</v-icon>

          <v-tooltip
            activator="parent"
            content-class="bg-black text-white"
            location="bottom"
            max-width="320"
            >Classes & Style
          </v-tooltip>
        </button>
      </li>

      <!-- ―――――――――――――――――― Delete button / col ―――――――――――――――――― -->

      <template v-if="removeChild">
        <li>
          <button class="styler-button" @click="removeChild()">
            <v-icon color="red" size="20">close</v-icon>

            <v-tooltip
              activator="parent"
              content-class="bg-black text-white"
              location="bottom"
              >Delete button
            </v-tooltip>
          </button>
        </li>
        <v-divider class="mx-2" inset vertical></v-divider>
      </template>

      <!-- ―――――――――――――――――― Background Color ―――――――――――――――――― -->

      <li>
        <button class="styler-button" @click="updateOption('colorer')">
          <SStylerIcon name="palettes" />

          <v-tooltip
            activator="parent"
            content-class="bg-black text-white"
            location="bottom"
          >
            Background

            <v-chip v-if="target.data.color" class="ma-1" pill size="small">
              <v-icon :color="target.data.color" start>circle</v-icon>
              {{ target.data.color }}
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
            content-class="bg-black text-white"
            location="bottom"
            >Set link

            <div v-if="target.data.href" class="small">
              <b>Href:</b> {{ target.data.href }}
            </div>
          </v-tooltip>
        </button>
      </li>

      <li>
        <button class="styler-button" @click="updateOption('btn-shape')">
          <v-icon size="20">smart_button</v-icon>

          <v-tooltip
            activator="parent"
            content-class="bg-black text-white"
            location="bottom"
            >Shape and style
          </v-tooltip>
        </button>
      </li>

      <li>
        <button class="styler-button" @click="updateOption('btn-size')">
          <v-icon size="20">straighten</v-icon>
          <v-tooltip
            activator="parent"
            content-class="bg-black text-white"
            location="bottom"
            >Button size
          </v-tooltip>
        </button>
      </li>

      <!-- ―――――――――――――――――― Text & Button caption ―――――――――――――――――― -->
      <li>
        <button class="styler-button" @click="updateOption('textColor')">
          <v-icon size="20">format_color_text</v-icon>

          <v-tooltip
            activator="parent"
            content-class="bg-black text-white"
            location="bottom"
            max-width="320"
            >Select text and to change the color
          </v-tooltip>
        </button>
      </li>

      <li v-if="hasAlign">
        <button class="styler-button" @click="updateOption('align')">
          <SStylerIcon name="align" />

          <v-tooltip
            activator="parent"
            content-class="bg-black text-white"
            location="bottom"
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
              :title="it.val"
              class="styler-button"
              @mousedown="
                (event) => {
                  setTextAlign(it.val);

                  event.preventDefault();
                }
              "
            >
              <v-icon size="20" :style="direction==='rtl'?'transform: scaleX(-1)':undefined" :class="{'flip-rtl':direction==='auto'}">{{ it.icon }}</v-icon>

            </button>
          </li>
        </ul>
      </li>

      <!-- ―――――――――――――――――― Background Color ―――――――――――――――――― -->

      <s-styler-tools-colors
        v-if="option === 'colorer'"
        v-model="target.data.color"
        :dark-colors="PLATE_DARK_VARS"
        :light-colors="PLATE_LIGHT_VARS"
        @update:model-value="removeClass(`bg--`)"
      >
      </s-styler-tools-colors>

      <!-- ―――――――――――――――――― Link ―――――――――――――――――― -->

      <li v-if="option === 'link'" class="flex-grow-1">
        <div class="input-group is-rounded has-itemAfter is-primary">
          <v-text-field
            v-model="target.data.href"
            :prepend-inner-icon="target.data.href ? 'link' : 'link_off'"
            class="english-field mx-2"
            clearable
            flat
            messages="● External: https://domain.. ● Internal: /shop"
            placeholder="https://..."
            rounded
            variant="solo"
            @blur="addLink"
            @keydown.enter="addLink"
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
            :class="{ '-button-glow': variant === 'glow' }"
            :style="
              variant === 'glow'
                ? 'color: #000;--shadow-color:#fff;'
                : undefined
            "
            :variant="variant"
            class="ma-1 x--button"
            color="#fff"
            rounded
            size="small"
            @click="target.data.variant = variant"
          >
            <v-scale-transition leave-absolute>
              <v-icon v-if="target.data.variant === variant" color="green" start
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
          :variant="target.data.rounded === rounded ? 'flat' : 'outlined'"
          class="ma-1 x--button"
          color="#fff"
          size="small"
          @click="target.data.rounded = rounded"
        >
          <v-scale-transition leave-absolute>
            <v-icon v-if="target.data.rounded === rounded" color="green" start
              >check_circle
            </v-icon>
          </v-scale-transition>
          {{ rounded }}
        </v-btn>

        <template
          v-if="
            target.data.variant !== 'glow' /*Not supported for this variant*/
          "
        >
          <small class="d-block my-1 text-start px-3">Other:</small>

          <v-row align="center" class="ma-0" justify="center">
            <v-col cols="12" sm="6">
              <v-slide-y-transition hide-on-leave>
                <v-btn
                  v-if="
                    target.data.elevation === null ||
                    target.data.elevation === undefined
                  "
                  class="tnt"
                  size="small"
                  variant="plain"
                  @click="target.data.elevation = 0"
                >
                  <v-icon start>layers_clear</v-icon>
                  Set elevation
                </v-btn>
                <u-number-input
                  v-model="target.data.elevation"
                  :max="24"
                  :min="0"
                  clearable
                  e-else
                  label="Elevation"
                  @clear="target.data.elevation === null"
                ></u-number-input>
              </v-slide-y-transition>
            </v-col>
          </v-row>
        </template>
      </li>

      <!-- ―――――――――――――――――― Button Size ―――――――――――――――――― -->
      <li v-if="option === 'btn-size'">
        <v-btn
          v-for="size in BtnSizes"
          :key="size.val"
          :size="size.val"
          :variant="target.data.size === size.val ? 'flat' : 'outlined'"
          class="ma-1"
          color="#fff"
          rounded
          @click="target.data.size = size.val"
        >
          <v-scale-transition leave-absolute>
            <v-icon v-if="target.data.size === size.val" color="green" start
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
              :style="{ backgroundColor: TEXT_COLORS[index] }"
              :title="`Color ${index + 1}`"
              :value="color"
              name="colorer"
              type="radio"
              @mousedown="
                (event) => {
                  execute('forecolor', TEXT_COLORS[index]);
                  event.preventDefault();
                }
              "
            />
          </li>

          <v-btn
            class="mb-1 ms-3 bg-tiny-checkers rounded-circle"
            size="30"
            title="Open color dialog."
            @mousedown="openTextColorEdit"
          >
            <v-icon
              :color="text_color_display"
              class="hover-scale-small"
              size="20"
              >circle
            </v-icon>
          </v-btn>
        </ul>
      </li>
    </ul>
  </s-styler-template>
</template>

<script lang="ts">
import { LMixinEvents } from "../../mixins/events/LMixinEvents";
import SStylerTemplate from "../../styler/template/SStylerTemplate.vue";
import { LMixinStyler } from "../../mixins/styler/LMixinStyler";
import SStylerIcon from "../../styler/icon/SStylerIcon.vue";
import {
  LUtilsColors,
  PLATE_DARK_VARS,
  PLATE_LIGHT_VARS,
} from "../../utils/colors/LUtilsColors";
import UNumberInput from "@selldone/components-vue/ui/number/input/UNumberInput.vue";
import SStylerToolsColors from "../../styler/tools/colors/SStylerToolsColors.vue";
import { XButtonObject } from "@selldone/page-builder/components/x/button/XButtonObject.ts";

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

export default {
  name: "SStylerButton",

  mixins: [LMixinEvents, LMixinStyler],

  components: {
    SStylerToolsColors,
    UNumberInput,
    SStylerIcon,
    SStylerTemplate,
  },
  props: {
    target: {
      required: true,
      type: XButtonObject,
      // It's the value of v-styler:arg="value"
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
    removeChild: {
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
  },
  data: () => ({
    TextAlign: TextAlign,
    ButtonAlign: ButtonAlign,
    PLATE_LIGHT_VARS: PLATE_LIGHT_VARS,
    PLATE_DARK_VARS: PLATE_DARK_VARS,

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

    text_color_display: null, // Just for display!
  }),

  computed: {
    direction(){
      return this.builder.direction
    },

    TEXT_COLORS() {
      return [
        LUtilsColors.GetColorDark(this.builder.style, 1),
        LUtilsColors.GetColorDark(this.builder.style, 2),
        LUtilsColors.GetColorDark(this.builder.style, 3),
        LUtilsColors.GetColorDark(this.builder.style, 4),
        LUtilsColors.GetColorDark(this.builder.style, 5),
        LUtilsColors.GetColorDark(this.builder.style, 6),
        LUtilsColors.GetColorDark(this.builder.style, 7),
        LUtilsColors.GetColorDark(this.builder.style, 8),
        LUtilsColors.GetColorDark(this.builder.style, 9),
        LUtilsColors.GetColorDark(this.builder.style, 10),
        LUtilsColors.GetColorDark(this.builder.style, 11),

        // #FFFFFF not work! bug in execute foreground!
        "transparent",
      ];
    },

    fonts() {
      return this.builder.style && this.builder.style.fonts;
    },
  },
  watch: {
    /**
     * Reset menu status when it's closed.
     */
    isVisible() {
      this.option = null;
    },
  },
  beforeMount() {
    if (!this.target) {
      throw new Error("Target is required for SStylerButtons");
    }

    this.el.contentEditable = "true";
  },
  mounted() {
    this.el.addEventListener("paste", this.stripHtmlToText, true);

    this.updateValue = () => {
      // console.log("📐 updateValue", this.target, this.keyText, this.el.innerHTML);
      this.target.data.content = this.el.innerHTML;
    };
    this.el.addEventListener("blur", this.updateValue);
  },
  beforeUnmount() {
    this.el.removeEventListener("paste", this.stripHtmlToText, true);

    this.el.removeEventListener("blur", this.updateValue);
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
      /*this.$nextTick(() => {
        this.checkProper();
        this.popper.update();
      });*/
    },

    // ▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂ Text Align ▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂

    setTextAlign(val) {
      ///  this.setElementClass("text-align-", val, true);
      this.target.data.setAlign(val);
    },

    setBackground(color) {
      this.removeClass(`bg--`); // remove all bg-- classes! (bg--plate-light-1, bg--plate-light-2, ...)


      this.target.data.setColor(color); // ex. var(--bg--plate-light-1) , #874000
      this.target.data.setGlow(false);
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
      this.ShowLSettingsColor(this.el, color, callback, alpha);
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

    showMasterDesignDialog() {
      this.ShowLSettingsClassStyle(
        this.el,
        this.el,
        this.target,

        null,
      );
    },
  },
};
</script>
