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
    v-if="style"
    v-model="dialog_master_style"
    theme="dark"
    location="right"
    temporary
    :width="$vuetify.display.xlAndUp ? 560 : $vuetify.display.lgAndUp ? 420 : 320"
    :scrim="false"
    color="#1e1e1e"
    class="x-page-builder-options-slider"
  >
    <v-card class="text-start" flat>
      <v-card-actions>
        <div class="widget-buttons">
          <v-btn
            size="x-large"
            @click="dialog_master_style = false"
            variant="text"
            ><v-icon start>close</v-icon>
            {{ $t("global.actions.close") }}
          </v-btn>
        </div>
      </v-card-actions>

      <v-card-text>
        <s-widget-header
          title="Font & Typo"
          icon="format_quote"
        ></s-widget-header>
        <v-list-subheader></v-list-subheader>
      </v-card-text>

      <v-expansion-panels flat v-model="tab">
        <!-- ████████████████████ Font ████████████████████ -->

        <v-expansion-panel>
          <v-expansion-panel-title>
            <div>
              <div><v-icon class="me-1">font_download</v-icon> Page Fonts</div>
            </div>
          </v-expansion-panel-title>
          <v-expansion-panel-text>
            <s-widget-header
              title="Page default font"
              icon="title"
              class="mt-5"
            ></s-widget-header>
            <v-list-subheader
              >First, add fonts, then select it here.</v-list-subheader
            >

            <v-select
              :items="style.fonts"
              v-model="style.font"
              label="Font"
              placeholder="Default shop font"
              messages="Show only added fonts."
              persistent-placeholder
              clearable
              variant="underlined"
            >
              <template v-slot:item="{ item }">
                <span :style="{ fontFamily: item }">{{ item }}</span>
              </template>
              <template v-slot:selection="{ item }">
                <span :style="{ fontFamily: item }">{{ item }}</span>
              </template>
            </v-select>

            <div class="my-3">
              <s-widget-header
                title="Added fonts"
                icon="folder_open"
                class="mt-5"
              ></s-widget-header>

              <v-list-subheader
                >You can add new fonts from Google fonts. Just write the font
                name in the following box.</v-list-subheader
              >

              <div v-for="font in style.fonts" :key="font" class="row-font">
                <b :style="{ fontFamily: font }"
                  ><v-icon size="small" class="me-1">font_download</v-icon>
                  {{ font }}</b
                >
                <v-btn icon @click="deleteFont(font)">
                  <v-icon>close</v-icon>
                </v-btn>
              </div>

              <v-combobox
                :items="filtered_fonts"
                v-model="font_input"
                v-model:search="font_input"
                label="Font name"
                placeholder="Type font name Ex.Akzidenz Grotesk and pres Enter..."
                persistent-placeholder
                class="my-5"
                @keydown.enter="addFont"
                variant="underlined"
              >
                <template v-slot:append-inner>
                  <v-btn
                    @click.stop="addFont()"
                    :disabled="!font_input"
                    color="primary"
                    variant="elevated"
                    prepend-icon="add"
                    >

                    Add font</v-btn
                  >
                </template>
              </v-combobox>
              <div class="text-end">
                <v-btn
                  size="small"
                  variant="text"
                  color="amber"
                  class="tnt"
                  href="https://fonts.google.com/"
                  target="_blank"
                  >View Google Fonts
                  <v-icon size="small" class="ms-1">open_in_new</v-icon>
                </v-btn>
              </div>
            </div>
          </v-expansion-panel-text>
        </v-expansion-panel>

        <!-- ████████████████████ Size ████████████████████ -->

        <v-expansion-panel>
          <v-expansion-panel-title>
            <div>
              <div><v-icon class="me-1">format_shapes</v-icon> Typo Size</div>
            </div>
          </v-expansion-panel-title>
          <v-expansion-panel-text>
            <s-widget-header
              title="Default font size"
              icon="format_size"
            ></s-widget-header>
            <v-list-subheader
              >Add fonts, and change the base font size. This option is used to
              calibrate font size based on the custom font.
            </v-list-subheader>

            <s-number-input
              :min="10"
              :max="100"
              suffix="px"
              v-model="style.font_size"
              @change="$forceUpdate()"
              label="Main font size"
              show-buttons
              lock
            ></s-number-input>

            <s-widget-header
              title="Headers & Paragraph"
              icon="format_size"
              class="mt-5"
            ></s-widget-header>
            <v-list-subheader> </v-list-subheader>

            <s-number-dimension-input
              v-model="style.h1_size"
              @change="onChange"
              label="H1 Size"
              clearable
              lock
            ></s-number-dimension-input>
            <s-number-dimension-input
              v-model="style.h2_size"
              @change="onChange"
              label="H2 Size"
              clearable
              lock
            ></s-number-dimension-input>

            <s-number-dimension-input
              v-model="style.h3_size"
              @change="onChange"
              label="H3 Size"
              clearable
              lock
            ></s-number-dimension-input>

            <s-number-dimension-input
              v-model="style.h4_size"
              @change="onChange"
              label="H4 Size"
              clearable
              lock
            ></s-number-dimension-input>
            <s-number-dimension-input
              v-model="style.h5_size"
              @change="onChange"
              label="H5 Size"
              clearable
              lock
            ></s-number-dimension-input>
            <s-number-dimension-input
              v-model="style.h6_size"
              @change="onChange"
              label="H6 Size"
              clearable
              lock
            ></s-number-dimension-input>
            <s-number-dimension-input
              v-model="style.p_size"
              @change="onChange"
              label="P Size"
              clearable
              lock
            ></s-number-dimension-input>

            <div
              :style="[
                PageBuilderTypoHelper.GenerateTypoStyle(style),
                PageBuilderColorsHelper.GenerateColorsStyle(style),
                {
                  fontFamily: style.font,
                },
              ]"
              style="min-height: 150px"
              class="my-5 line-height-normal page-content"
            >
              <h1>Header 1</h1>
              <h2>Header 2</h2>
              <h3>Header 3</h3>
              <h4>Header 4</h4>
              <h5>Header 5</h5>
              <h6>Header 6</h6>

              <p>Paragraph</p>
            </div>
          </v-expansion-panel-text>
        </v-expansion-panel>

        <!-- ████████████████████ Top Menu ████████████████████ -->

        <v-expansion-panel> </v-expansion-panel>
      </v-expansion-panels>
    </v-card>
  </v-navigation-drawer>
</template>

<script>
import SNumberInput from "@components/ui/input/number/SNumberInput.vue";
import { FontLoader, FONTS } from "@core/helper/font/FontLoader";

import EventBusTriggers from "@core/enums/event-bus/EventBusTriggers";
import SNumberDimensionInput from "@components/ui/dimension/SNumberDimensionInput.vue";
import { PageBuilderTypoHelper } from "@app-page-builder/src/helpers/PageBuilderTypoHelper";
import { PageBuilderColorsHelper } from "@app-page-builder/src/helpers/PageBuilderColorsHelper";
import { PageBuilderMixin } from "@app-page-builder/mixins/PageBuilderMixin";
import PageEventBusMixin from "@app-page-builder/mixins/PageEventBusMixin";

export default {
  name: "GlobalTypographyEditorDialog",
  mixins: [PageBuilderMixin,PageEventBusMixin],


  components: {
    SNumberDimensionInput,

    SNumberInput,
  },

  props: {},
  data: () => ({
    PageBuilderTypoHelper: PageBuilderTypoHelper,
    PageBuilderColorsHelper: PageBuilderColorsHelper,

    tab: null,
    style: null,
    font_input: null,

    //--------------------------
    dialog_master_style: false,

    //--------------------------
    key_listener_keydown: null,
  }),

  computed: {
    upload_bg_url() {
      return this.getPageBuilderUploadUrlImage();
    },

    filtered_fonts() {
      return FONTS.filter(
        (i) =>
          !this.style || !this.style.fonts || !this.style.fonts.includes(i),
      );
    },
  },
  watch: {},
  created() {},
  mounted() {
    this.EventBus.$on(
      "show:GlobalTypographyEditorDialog",

      ({ style, tab }) => {
        this.CloseAllPageBuilderNavigationDrawerTools(); // Close all open tools.

        this.style = style;

        this.dialog_master_style = true;
        this.tab = ["fonts", "size"].indexOf(tab);
      },
    );

    //――――――――――――――――――――――  START Editor key listener ――――――――――――――――――――
    this.key_listener_keydown = (event) => {
      // Scape:
      let isEscape =
        event.key === "Escape" || event.key === "Esc" || event.keyCode === 27;

      if (isEscape) {
        if (this.dialog_master_style) {
          // Close tools
          this.dialog_master_style = false;
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
      this.dialog_master_style = false;
    });
  },
  beforeUnmount() {
    this.EventBus.$off("show:GlobalTypographyEditorDialog");

    this.EventBus.$off(EventBusTriggers.PAGE_BUILDER_CLOSE_TOOLS);

    //――――――――――――――――――――――  REMOVE key listener ――――――――――――――――――――
    document.removeEventListener("keydown", this.key_listener_keydown, true);
  },

  methods: {
    onChange() {
      this.$forceUpdate();
      this.$emit("change");
    },

    addFont() {
      if (!this.font_input) return;

      if (!this.style.fonts || !Array.isArray(this.style.fonts))
        this.style.fonts = [];

      this.font_input = this.font_input.trim(); //.replace(' ','+')
      if (this.style.fonts.includes(this.font_input)) {
        this.font_input = "";
        return;
      }
      this.style.fonts.push(this.font_input);
      this.font_input = "";
      FontLoader.LoadFonts(this.style.fonts);
    },

    deleteFont(font) {
      this.style.fonts.remove(font);
      this.$forceUpdate();
    },
  },
};
</script>

<style scoped lang="scss"></style>
