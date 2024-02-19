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
    type="text"
    :builder="builder"
    :is-visible="isVisible"
  >
    <!-- Important: Display non because of preventing proper error -->

    <!-- ―――――――――――――――――――――――――――――――――――――――――――――――――――――――――― -->
    <!-- ――――――――――――――――――――――― Normal editing tools ―――――――――――――――――――――― -->
    <!-- ―――――――――――――――――――――――――――――――――――――――――――――――――――――――――― -->

    <ul class="styler-list">
      <!-- ―――――――――――――――――― Button ―――――――――――――――――― -->

      <li v-if="!noLink">
        <button class="styler-button" @click="option = 'link'" title="Link">
          <SStylerIcon name="link" />

          <v-tooltip
            activator="parent"
            location="bottom"
            content-class="bg-black white--text"
            attach
          >
            Link

            <v-chip v-if="url" size="x-small" pill class="ma-1">
              <v-icon start :color="url">circle</v-icon>
              {{ url }}
            </v-chip>
          </v-tooltip>
        </button>
      </li>

      <!-- ―――――――――――――――――― Text Color ―――――――――――――――――― -->
      <li>
        <button class="styler-button" @click="option = 'textColor'">
          <v-icon dark size="20">format_color_text</v-icon>

          <v-tooltip
            activator="parent"
            location="bottom"
            content-class="bg-black white--text"
            attach
          >
            Text Color

            <v-chip v-if="text_color_display" size="small" pill class="ma-1">
              <v-icon start :color="text_color_display">circle</v-icon>
              {{ text_color_display }}
            </v-chip>
          </v-tooltip>
        </button>
      </li>
      <!-- ―――――――――――――――――― Font ―――――――――――――――――― -->

      <li>
        <button class="styler-button" @click="option = 'text-font'">
          <v-icon dark size="20">font_download</v-icon>

          <v-tooltip
            activator="parent"
            location="bottom"
            content-class="bg-black white--text"
            max-width="320"
            >Font
            <v-chip
              v-if="text_font"
              size="x-small"
              class="mx-1"
              :style="{ fontFamily: text_font }"
              >{{ text_font }}
            </v-chip>
          </v-tooltip>
        </button>
      </li>

      <!-- ―――――――――――――――――― Align ―――――――――――――――――― -->

      <li>
        <button class="styler-button" @click="option = 'align'">
          <SStylerIcon name="align" />

          <v-tooltip
            activator="parent"
            location="bottom"
            content-class="bg-black white--text"
            attach
          >
            Text Align
          </v-tooltip>
        </button>
      </li>

      <!-- ―――――――――――――――――― Style ―――――――――――――――――― -->

      <li>
        <button class="styler-button" @click="option = 'textStyle'">
          <SStylerIcon name="textStyle" />
          <v-tooltip
            activator="parent"
            location="bottom"
            content-class="bg-black white--text"
            attach
          >
            Style
          </v-tooltip>
        </button>
      </li>
      <!-- ―――――――――――――――――― Gradient ―――――――――――――――――― -->

      <li>
        <button class="styler-button" @click="option = 'text-gradient'">
          <v-icon dark size="20">gradient</v-icon>
          <v-tooltip
            activator="parent"
            location="bottom"
            content-class="bg-black white--text"
            attach
          >
            Text Gradient
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
            variant="solo"
            flat
            rounded
            v-model="url"
            class="english-field mx-2"
            placeholder="https://..."
            messages="● External: https://domain.. ● Internal: /shop"
            @blur="addLink"
            @keydown.enter="addLink"
            :prepend-inner-icon="url ? 'link' : 'link_off'"
            clearable
          />
        </div>
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
            icon
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
              <v-icon dark size="20">{{ it.icon }}</v-icon>
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
              <v-icon dark size="20"
                >{{ uppercase ? "title" : "format_size" }}
              </v-icon>
            </button>
          </li>
        </ul>
      </li>
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

  mixins: [PageBuilderMixin, LandingHistoryMixin, StylerMixin],

  components: {
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
    },
    section: {
      type: Object,
      required: true,
    },

    keyText: {
      type: String,
      default: null,
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

    uppercase: false,
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
    option(option) {
      this.updatePopper();

      // Save range selection:
      this.saveRangeSelected();
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
    }
  },
  mounted() {
    this.el.addEventListener("paste", this.stripHtmlToText, true);

    this.selectionChangeHandler = () => {
      const selection = document.getSelection();
      const selectedElement = selection.anchorNode.parentNode;

      if (this.el.contains(selectedElement)) {
        console.log(
          "Selection changed within your element:",
          selection.toString(),
        );
        this.calculateSelectedTextStyle();
      }
    };

    document.addEventListener("selectionchange", this.selectionChangeHandler);
  },

  beforeUnmount() {
    this.el.removeEventListener("paste", this.stripHtmlToText, true);
    document.removeEventListener(
      "selectionchange",
      this.selectionChangeHandler,
    );
  },

  methods: {
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

      this.updateValue();
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

      this.updateValue();
    },

    setFont(font) {
      // console.log("📐 Set font", font, this.el);
      this.restoreSelection();
      this.setTextRootElementStyle("font-family", font, true);

      this.updateValue();
    },

    // ▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂ Upper /Normal case ▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂

    toggleCase() {
      this.uppercase = !this.uppercase;
      this.toggleElementClass("text-uppercase", true);

      this.updateValue();
    },

    // ▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂ Text Align ▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂

    setTextAlign(val) {
      this.setElementClass("text-align-", val, true);
      this.updateValue();
    },

    updateValue() {
      this.target[this.keyText] = this.el.innerHTML;
    },

    //------------------------------------------------------------------
    /**
     * Safe past (remove all html tags)
     * @param event
     */
    stripHtmlToText(event) {
      // Prevent past section data:
      try {
        function IsValidJsonSectionString(str) {
          try {
            let json = JSON.parse(str);
            return json.name && json.data && Object.keys(json.data).length > 0;
          } catch (e) {}
          return false;
        }

        let paste = (event.clipboardData || window.clipboardData).getData(
          "text",
        );
        if (IsValidJsonSectionString(paste)) return;
      } catch (e) {}
      // console.log("types", event.clipboardData.types);

      event.preventDefault();

      const cb = event.clipboardData;
      let pastedContent = "";
      if (cb.types.indexOf("text/plain") !== -1) {
        // contains html
        pastedContent = cb.getData("text/plain");
      } else if (cb.types.indexOf("text/html") !== -1) {
        // contains text
        pastedContent = $(cb.getData("text/html")).text();
      } else {
        return;
        //pastedContent = cb.getData(cb.types[0]); // get whatever it has
      }
      // console.log("Past", event, pastedContent);
      //    let doc = new DOMParser().parseFromString(pastedContent, "text/html");
      //  const pure = doc.body.textContent.trim() || "";

      let pure = pastedContent.replace(/(\r\n|\n|\r)/gm, "");
      // console.log("Past", 'pure', pure);

      //  console.log('pure',pure)
      this.el.insertAtCaret(pure);
    },
  },
};
</script>
