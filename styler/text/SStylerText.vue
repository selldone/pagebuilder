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

      <!-- ―――――――――――――――――― Link ―――――――――――――――――― -->

      <li v-if="!noLink">
        <button
          class="styler-button position-relative"
          @click="option = 'link'"
        >
          <v-icon
            v-if="url"
            class="absolute-bottom-end"
            color="#fff"
            icon="check_circle"
            size="14"
          >
          </v-icon>

          <SStylerIcon name="link" />

          <v-tooltip
            activator="parent"
            content-class="bg-black text-white"
            location="bottom"
          >
            Link

            <v-chip v-if="url" class="ma-1" pill size="x-small">
              {{ url }}
            </v-chip>
          </v-tooltip>
        </button>
      </li>

      <!-- ―――――――――――――――――― Text Color ―――――――――――――――――― -->
      <li>
        <v-badge
          :color="text_color_display"
          :model-value="!!text_color_display"
          dot
          offset-x="8"
          offset-y="8"
        >
          <button class="styler-button" @click="option = 'textColor'">
            <v-icon size="20">format_color_text</v-icon>

            <v-tooltip
              activator="parent"
              content-class="bg-black text-white"
              location="bottom"
            >
              Color

              <v-chip v-if="text_color_display" class="ma-1" pill size="small">
                <v-icon :color="text_color_display" start>circle</v-icon>
                {{ text_color_display }}
              </v-chip>
            </v-tooltip>
          </button>
        </v-badge>
      </li>
      <!-- ―――――――――――――――――― Font ―――――――――――――――――― -->

      <li>
        <button
          class="styler-button position-relative"
          @click="option = 'text-font'"
        >
          <v-icon size="20">font_download</v-icon>
          <v-icon
            v-if="text_font"
            class="absolute-bottom-end"
            color="#fff"
            icon="check_circle"
            size="14"
          >
          </v-icon>

          <v-tooltip
            activator="parent"
            content-class="bg-black text-white"
            location="bottom"
            max-width="320"
            >Font
            <v-chip
              v-if="text_font"
              :style="{ fontFamily: text_font }"
              class="mx-1"
              size="x-small"
              >{{ text_font }}
            </v-chip>
          </v-tooltip>
        </button>
      </li>

      <!-- ―――――――――――――――――― Align ―――――――――――――――――― -->

      <li>
        <button class="styler-button" @click="option = 'align'">
          <v-icon v-if="text_align" size="20">{{ text_align.icon }}</v-icon>
          <SStylerIcon v-else name="align" />

          <v-tooltip
            activator="parent"
            content-class="bg-black text-white"
            location="bottom"
          >
            Align
          </v-tooltip>
        </button>
      </li>

      <!-- ―――――――――――――――――― Style ―――――――――――――――――― -->

      <li>
        <button class="styler-button" @click="option = 'textStyle'">
          <SStylerIcon name="textStyle" />
          <v-tooltip
            activator="parent"
            content-class="bg-black text-white"
            location="bottom"
          >
            Style
          </v-tooltip>
        </button>
      </li>
      <!-- ―――――――――――――――――― Gradient ―――――――――――――――――― -->

      <li>
        <button class="styler-button" @click="option = 'text-gradient'">
          <v-icon size="20">gradient</v-icon>
          <v-tooltip
            activator="parent"
            content-class="bg-black text-white"
            location="bottom"
          >
            Gradient
          </v-tooltip>
        </button>
      </li>
    </ul>

    <!-- ―――――――――――――――――――――――――――――――――――――――――――――――――――――――――― -->
    <!-- ―――――――――――――――――――― Normal editing tools (sub list) ――――――――――――――――――― -->
    <!-- ―――――――――――――――――――――――――――――――――――――――――――――――――――――――――― -->

    <ul class="styler-list flex-grow-1 w-100">
      <!-- ―――――――――――――――――― Link ―――――――――――――――――― -->

      <li v-if="option === 'link'" class="flex-grow-1">
        <div class="input-group is-rounded has-itemAfter is-primary">
          <v-text-field
            v-model="url"
            :prepend-inner-icon="url ? 'link' : 'link_off'"
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
            icon
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

      <!-- ―――――――――――――――――― Text Font ―――――――――――――――――― -->

      <div v-if="option === 'text-font'" class="flex-grow-1 pa-1">
        <v-select
          v-model="text_font"
          :items="fonts"
          class="mx-2"
          clearable
          messages=" "
          placeholder="Select a font..."
          rounded
          variant="solo"
          @update:model-value="setFont"
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

      <!-- ―――――――――――――――――― Align ―――――――――――――――――― -->

      <li v-if="option === 'align'">
        <ul class="align">
          <li v-for="it in TextAlign" :key="it.val">
            <button
              class="styler-button"
              @mousedown="
                (event) => {
                  setTextAlign(it);
                  event.preventDefault();
                }
              "
            >
              <v-icon size="20">{{ it.icon }}</v-icon>

              <v-tooltip
                activator="parent"
                attach
                content-class="bg-black text-white"
                location="bottom"
              >
                {{ it.title }}
              </v-tooltip>
            </button>
          </li>
        </ul>
      </li>

      <!-- ―――――――――――――――――― Text Style ―――――――――――――――――― -->

      <li v-if="option === 'textStyle'">
        <ul class="align">
          <li>
            <button
              class="styler-button"
              @mousedown="
                (event) => {
                  execute('bold');
                  event.preventDefault();
                }
              "
            >
              <SStylerIcon name="bold" />
            </button>
          </li>
          <li>
            <button
              class="styler-button"
              @mousedown="
                (event) => {
                  execute('italic');
                  event.preventDefault();
                }
              "
            >
              <SStylerIcon name="italic" />
            </button>
          </li>
          <li>
            <button
              class="styler-button"
              @mousedown="
                (event) => {
                  execute('underline');
                  event.preventDefault();
                }
              "
            >
              <SStylerIcon name="underline" />
            </button>
          </li>

          <li>
            <button
              class="styler-button"
              title="Uppercase"
              @mousedown="
                (event) => {
                  toggleCase();
                  event.preventDefault();
                }
              "
            >
              <v-icon size="20"
                >{{ uppercase ? "title" : "format_size" }}
              </v-icon>
            </button>
          </li>
        </ul>
      </li>

      <!-- ―――――――――――――――――― Text Gradient ―――――――――――――――――― -->

      <li v-if="option === 'text-gradient'">
        <ul class="align">
          <li v-for="it in TextGradients" :key="it">
            <v-btn
              class="styler-button bordered-dark"
              height="30"
              icon
              width="30"
              @mousedown="
                (event) => {
                  setElementClass('bg-', it, true);
                  event.preventDefault();
                }
              "
            >
              <v-icon :class="'bg-' + it" class="text-gradient">lens</v-icon>
            </v-btn>
          </li>
          <v-divider class="mx-2" dark inset vertical></v-divider>

          <li>
            <button
              class="styler-button"
              @mousedown="
                (event) => {
                  toggleElementClass('text-gradient', true);
                  text_gradient_mode = !text_gradient_mode;
                  event.preventDefault();
                }
              "
            >
              <v-icon size="20"
                >{{ text_gradient_mode ? "texture" : "format_color_fill" }}
              </v-icon>

              <v-tooltip
                activator="parent"
                content-class="bg-black text-white text-start"
                location="bottom"
              >
                <span :class="{ 'font-weight-bold': text_gradient_mode }"
                  >Foreground</span
                >
                /
                <span :class="{ 'font-weight-bold': !text_gradient_mode }"
                  >Background</span
                >
                <div class="small my-1">
                  <div class="text-gradient bg-crystal-river">
                    Foreground | Spread the vision!
                  </div>
                  <div class="bg-crystal-river">
                    Background | Spread the vision!
                  </div>
                </div>
              </v-tooltip>
            </button>
          </li>
        </ul>
      </li>
    </ul>
  </s-styler-template>
</template>

<script>
import { LMixinEvents } from "../../mixins/events/LMixinEvents";
import SStylerTemplate from "../../styler/template/SStylerTemplate.vue";
import { LMixinStyler } from "../../mixins/styler/LMixinStyler";
import SStylerIcon from "../../styler/icon/SStylerIcon.vue";
import { LUtilsColors } from "../../utils/colors/LUtilsColors";

const TextAlign = [
  { val: "start", icon: "format_align_left", title: "Start" },
  { val: "center", icon: "format_align_center", title: "Center" },
  { val: "end", icon: "format_align_right", title: "End" },
  { val: "justify", icon: "format_align_justify", title: "Justify" },
];
const ButtonAlign = [
  { val: "left", icon: "format_align_left" },
  { val: "center", icon: "format_align_center" },
  { val: "right", icon: "format_align_right" },
];

const TextGradients = [
  "gray",
  "plum",
  "spring-warmth",
  "sunny-morning",
  "dusty-grass",
  "heavy-rain",
  "malibu-beach",
  "star-wine",
  "fly-high",
  "strong-bliss",
  "teen-notebook",
  "polite-rumors",
  "aqua-splash",
  "spiky-naga",
  "desert-hump",
  "over-sun",
  "eternal-constance",
  "vicious-stance",
  "crystal-river",
  "blacker",
  "lily-meadow",
  "red-soft",
  "pink-soft",
  "blue-soft",
  "teal-soft",
  "amber-soft",
  "indigo-soft",
  "deep-purple-soft",
  "green-soft",
  "snow-again",
  "premium-white",
  "le-cocktail",
];

export default {
  name: "SStylerText",

  mixins: [LMixinEvents, LMixinStyler],

  components: {
    SStylerIcon,
    SStylerTemplate,
  },
  props: {
    target: {
      required: true,
      type: Object,
    },

    keyText: {
      type: String,
      default: "value",
    },

    keyClasses: {
      type: String,
      default: "classes",
    },


    keyStyle: {
      type: String,
      default: "style",
    },

    keyBackground: {
      type: String,
      default: "background",
    },

    /**
     * Set the location of the proper
     */
    position: {
      type: String,
      default: "top",
    },

    noLink: {
      type: Boolean,
    },
  },
  data: () => ({
    TextAlign: TextAlign,
    ButtonAlign: ButtonAlign,
    TextGradients: TextGradients,

    option: null,

    url: "",
    text_color_display: null, // Just for display!

    text_font: null,

    text_gradient_mode: false,
    uppercase: false,

    text_align: null,
  }),

  computed: {
    TEXT_COLORS() {
      return [
        LUtilsColors.GetColorDark(this.$builder.style, 1),
        LUtilsColors.GetColorDark(this.$builder.style, 2),
        LUtilsColors.GetColorDark(this.$builder.style, 3),
        LUtilsColors.GetColorDark(this.$builder.style, 4),
        LUtilsColors.GetColorDark(this.$builder.style, 5),
        LUtilsColors.GetColorDark(this.$builder.style, 6),
        LUtilsColors.GetColorDark(this.$builder.style, 7),
        LUtilsColors.GetColorDark(this.$builder.style, 8),
        LUtilsColors.GetColorDark(this.$builder.style, 9),
        LUtilsColors.GetColorDark(this.$builder.style, 10),
        LUtilsColors.GetColorDark(this.$builder.style, 11),

        // #FFFFFF not work! bug in execute foreground!
        "transparent",
      ];
    },

    fonts() {
      return this.$builder.style && this.$builder.style.fonts;
    },
  },
  watch: {
    option(option) {
      // Save range selection:
      this.saveRangeSelected();
    },
    /**
     * Reset menu status when it's closed.
     */
    isVisible() {
      this.option = null;
    },
  },
  beforeMount() {
    if (!this.target) {
      throw new Error("Target is required for SStylerText");
    }
    if (!this.keyText) {
      throw new Error(
        "keyText should be define in v-styler:text={keyText:'...'}",
      );
    }

    this.text_font = this.el.firstChild?.style?.fontFamily;

    this.el.contentEditable = "true";

    if (
      this.el.childElementCount === 1 &&
      this.el.firstChild.nodeName === "DIV"
    ) {
      this.text_gradient_mode =
        this.el.firstChild.classList.contains("text-gradient");

      this.uppercase = this.el.firstChild.classList.contains("text-uppercase");
      this.text_gradient_mode =
        this.el.firstChild.classList.contains("text-gradient");

      this.text_align = TextAlign.find((it) =>
        this.el.firstChild.classList.contains(`text-align-${it.val}`),
      );
    }
  },
  mounted() {
    this.el.addEventListener("paste", this.stripHtmlToText, true);

    this.selectionChangeHandler = () => {
      const selection = document.getSelection();
      const selectedElement = selection.anchorNode?.parentNode;

      if (selectedElement && this.el.contains(selectedElement)) {
        //console.log("Selection changed within your element:", selection.toString(),);
        if (selection.toString()) this.calculateSelectedTextStyle();
      }
    };

    document.addEventListener("selectionchange", this.selectionChangeHandler);

    this.updateValue = () => {
      // console.log("📐 updateValue", this.target, this.keyText, this.el.innerHTML);
      this.target[this.keyText] = this.el.innerHTML;
    };
    this.el.addEventListener("blur", this.updateValue);
  },

  beforeUnmount() {
    this.el.removeEventListener("paste", this.stripHtmlToText, true);
    document.removeEventListener(
      "selectionchange",
      this.selectionChangeHandler,
    );

    this.el.removeEventListener("blur", this.updateValue);
  },

  methods: {
    showMasterDesignDialog() {
      //console.log('this.target',this.target.style,this.target.classes)
      this.ShowLSettingsClassStyle(
        this.el,
        this.el,
        this.target,
        this.keyStyle,
          this.keyClasses,
          this.keyBackground,
      {tags:['p','h1','h2','h3','h4','h5']}
      );
    },

    calculateSelectedTextStyle() {
      this.text_color_display = this.getSelectedTextColor();
      this.text_font = this.getSelectedTextFont();
      this.url = this.getSelectedTextLink();

      /*console.log(
        "📐 calculateSelectedTextStyle",
        "color",
        this.text_color_display,
        "text_font",
        this.text_font,
        "url",
        this.url,
      );*/
    },

    addLink(e) {
      this.restoreSelection();
      if (this.url) this.execute("createLink", this.url);
      else this.execute("unlink");

      e.preventDefault();
      this.option = null;
    },

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

    setFont(font) {
      // console.log("📐 Set font", font, this.el);
      this.restoreSelection();
      this.setTextRootElementStyle("font-family", font, true);
    },

    // ▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂ Upper /Normal case ▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂

    toggleCase() {
      this.uppercase = !this.uppercase;
      this.toggleElementClass("text-uppercase", true);
    },

    // ▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂ Text Align ▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂

    setTextAlign(align) {
      this.text_align = align;
      this.setElementClass("text-align-", align.val, true);
    },

    // ▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂ Root inner element > Toggle class ▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂

    toggleElementClass(class_name, remove_from_all_children = false) {
      this.el.focus();

      if (
        this.el.childElementCount === 1 &&
        this.el.firstChild.nodeName === "DIV"
      ) {
        //nodeType=3 is pure text!  (Wrap by element!)
      } else {
        // Need wrap by tag
        $(this.el).wrapInner("<div></div>");
      }

      const child = this.el.firstChild;

      const add = !child.classList.contains(class_name);

      // Remove All classes 'class_name' except first child (root) :
      // Why? by enter add <div class='...'> to separating the text!
      if (remove_from_all_children) {
        $(this.el)
          .find("*")
          .removeClass(function (index, css) {
            return (
              css.match(new RegExp("\\S*" + class_name + "\\S*", "g")) || []
            ).join(" "); // removes anything that starts with "page-"
          });
      } else {
        $(this.el)
          .children()
          .removeClass(function (index, css) {
            return (
              css.match(new RegExp("\\S*" + class_name + "\\S*", "g")) || []
            ).join(" "); // removes anything that starts with "page-"
          });
      }

      if (add) {
        child.classList.add(class_name);
      } else {
        child.classList.remove(class_name);
      }
    },
  },
};
</script>
