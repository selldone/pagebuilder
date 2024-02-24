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
    v-if="style"
    v-model="dialog_master_style"
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
    <v-card class="text-start" flat>
      <v-card-actions>
        <div class="widget-buttons">
          <v-btn
            size="x-large"
            variant="text"
            @click="dialog_master_style = false"
          >
            <v-icon start>close</v-icon>
            {{ $t("global.actions.close") }}
          </v-btn>
        </div>
      </v-card-actions>

      <v-card-text class="pb-16">
        <s-widget-header
          icon="design_services"
          title="Page Master Style"
        ></s-widget-header>
        <v-list-subheader></v-list-subheader>
      </v-card-text>

      <v-expansion-panels v-model="tab">
        <!-- ████████████████████ Page Background ████████████████████ -->

        <v-expansion-panel>
          <v-expansion-panel-title>
            <div>
              <div>
                <v-icon class="me-1">wallpaper</v-icon>
                Page Background
              </div>
            </div>
          </v-expansion-panel-title>
          <v-expansion-panel-text>
            <s-widget-header
              icon="palette"
              title="Background Color"
            ></s-widget-header>
            <v-list-subheader>Page background color.</v-list-subheader>

            <s-color-selector
              v-model="style.bg_color"
              :title="$t('page_builder.setting.bg_color_input')"
              class="mb-5"
              color="#293239"
              dark
              nullable
              @change="$forceUpdate()"
            ></s-color-selector>

            <!-- ▅▅▅▅▅▅▅▅▅▅▅▅▅▅▅▅▅▅ Background ▅▅▅▅▅▅▅▅▅▅▅▅▅▅▅▅▅▅ -->

            <s-widget-header
              :title="$t('page_builder.setting.bg_style_input')"
              icon="wallpaper"
            ></s-widget-header>
            <v-list-subheader></v-list-subheader>
            <background-image-editor
              v-model:bg-image="style.bg_image"
              v-model:bgCustom="style.bg_custom"
              v-model:bgGradient="style.bg_gradient"
              v-model:bgImageRepeat="style.bg_repeat"
              v-model:bgImageSize="style.bg_size"
              :upload-url="upload_bg_url"
              @change="$forceUpdate()"
            >
            </background-image-editor>
          </v-expansion-panel-text>
        </v-expansion-panel>

        <!-- ████████████████████ Top Menu ████████████████████ -->

        <v-expansion-panel>
          <v-expansion-panel-title>
            <div>
              <div>
                <v-icon class="me-1">drag_handle</v-icon>
                Top Menu
              </div>
            </div>
          </v-expansion-panel-title>
          <v-expansion-panel-text>
            <s-widget-header
              icon="linear_scale"
              title="Top menu"
            ></s-widget-header>
            <v-list-subheader
              >Customize the header menu on the pages and create fancy looks.
            </v-list-subheader>

            <s-smart-select
              v-model="style.header_mode"
              :items="[
                {
                  title: 'Normal ● Default',
                  code: 'normal',
                  description:
                    'The primary header will be displayed as an independent view at the top of the page.',
                  icon: 'drag_handle',
                },
                {
                  title: 'Overlay',
                  code: 'overlay',
                  description:
                    'The primary header will appear at the beginning of the first section, featuring a transparent background.',
                  icon: 'join_left',
                },
                {
                  title: 'Hidden',
                  code: 'hidden',
                  description: 'The primary header will be hidden on the page.',
                  icon: 'visibility_off',
                },
              ]"
              class="my-3"
              dark
              item-description="description"
              item-icon="icon"
              item-text="title"
              item-value="code"
              label="Main Shop Header"
              @change="
                (val) => {
                  if (val === 'overlay')
                    style.menu_transparent = true; /*Always should be transparent*/
                }
              "
            ></s-smart-select>

            <s-smart-switch
              v-model="style.menu_transparent"
              :disabled="style.header_mode === 'overlay'"
              class="my-3"
              dark
              false-icon="opacity"
              false-title="Normal"
              label="Custom Header Menu"
              true-description="The top header will be shown overlay on top of the page."
              true-icon="invert_colors_off"
              true-title="Transparent Background"
              @change="$forceUpdate()"
            ></s-smart-switch>

            <s-smart-switch
              v-model="style.menu_dark"
              class="my-3"
              clearable
              dark
              false-description="The text in the header section will be black."
              false-icon="light_mode"
              false-title="Light Mode"
              label="Header Color Mode"
              true-description="The text in the header section will be white."
              true-icon="dark_mode"
              true-title="Dark Mode"
            ></s-smart-switch>
          </v-expansion-panel-text>
        </v-expansion-panel>

        <!-- ████████████████████ Colors Plate ████████████████████ -->

        <v-expansion-panel>
          <v-expansion-panel-title>
            <div>
              <div>
                <v-icon class="me-1">palette</v-icon>
                Colors Plate
              </div>
            </div>
          </v-expansion-panel-title>
          <v-expansion-panel-text>
            <s-widget-header icon="palette" title="Colors"></s-widget-header>
            <v-list-subheader
              >Here, you have the option to personalize the color variables of
              the page.
            </v-list-subheader>

            <!-- Class: is-samin  -->
            <s-color-selector
              v-model="style.plate_light_1"
              dark
              nullable
              title="Light Color 1"
              @change="$forceUpdate()"
            ></s-color-selector>

            <s-color-selector
              v-model="style.plate_dark_1"
              dark
              nullable
              title="Dark Color 1"
              @change="$forceUpdate()"
            ></s-color-selector>
            <hr />

            <!-- Class: is-red  -->
            <s-color-selector
              v-model="style.plate_light_2"
              dark
              nullable
              title="Light Color 2"
              @change="$forceUpdate()"
            ></s-color-selector>

            <s-color-selector
              v-model="style.plate_dark_2"
              dark
              nullable
              title="Dark Color 2"
              @change="$forceUpdate()"
            ></s-color-selector>
            <hr />

            <!-- Class: is-black  -->
            <s-color-selector
              v-model="style.plate_light_3"
              dark
              nullable
              title="Light Color 3"
              @change="$forceUpdate()"
            ></s-color-selector>

            <s-color-selector
              v-model="style.plate_dark_3"
              dark
              nullable
              title="Dark Color 3"
              @change="$forceUpdate()"
            ></s-color-selector>
            <hr />

            <!-- Class: is-green  -->
            <s-color-selector
              v-model="style.plate_light_4"
              dark
              nullable
              title="Light Color 4"
              @change="$forceUpdate()"
            ></s-color-selector>

            <s-color-selector
              v-model="style.plate_dark_4"
              dark
              nullable
              title="Dark Color 4"
              @change="$forceUpdate()"
            ></s-color-selector>

            <hr />

            <!-- Class: is-blue  -->
            <s-color-selector
              v-model="style.plate_light_5"
              dark
              nullable
              title="Light Color 5"
              @change="$forceUpdate()"
            ></s-color-selector>

            <s-color-selector
              v-model="style.plate_dark_5"
              dark
              nullable
              title="Dark Color 5"
              @change="$forceUpdate()"
            ></s-color-selector>
            <hr />

            <!-- Class: is-white  -->
            <s-color-selector
              v-model="style.plate_light_6"
              dark
              nullable
              title="Light Color 6"
              @change="$forceUpdate()"
            ></s-color-selector>

            <s-color-selector
              v-model="style.plate_dark_6"
              dark
              nullable
              title="Dark Color 6"
              @change="$forceUpdate()"
            ></s-color-selector>
            <hr />

            <!-- Class: is-deep-purple  -->
            <s-color-selector
              v-model="style.plate_light_7"
              dark
              nullable
              title="Light Color 7"
              @change="$forceUpdate()"
            ></s-color-selector>

            <s-color-selector
              v-model="style.plate_dark_7"
              dark
              nullable
              title="Dark Color 7"
              @change="$forceUpdate()"
            ></s-color-selector>
            <hr />

            <!-- Class: is-teal  -->
            <s-color-selector
              v-model="style.plate_light_8"
              dark
              nullable
              title="Light Color 8"
              @change="$forceUpdate()"
            ></s-color-selector>

            <s-color-selector
              v-model="style.plate_dark_8"
              dark
              nullable
              title="Dark Color 8"
              @change="$forceUpdate()"
            ></s-color-selector>
            <hr />

            <!-- Class: is-cyan  -->
            <s-color-selector
              v-model="style.plate_light_9"
              dark
              nullable
              title="Light Color 9"
              @change="$forceUpdate()"
            ></s-color-selector>

            <s-color-selector
              v-model="style.plate_dark_9"
              dark
              nullable
              title="Dark Color 9"
              @change="$forceUpdate()"
            ></s-color-selector>
            <hr />

            <!-- Class: is-amber -->
            <s-color-selector
              v-model="style.plate_light_10"
              dark
              nullable
              title="Light Color 10"
              @change="$forceUpdate()"
            ></s-color-selector>

            <s-color-selector
              v-model="style.plate_dark_10"
              dark
              nullable
              title="Dark Color 10"
              @change="$forceUpdate()"
            ></s-color-selector>
            <hr />

            <!-- Class: is-pink -->
            <s-color-selector
              v-model="style.plate_light_11"
              dark
              nullable
              title="Light Color 11"
              @change="$forceUpdate()"
            ></s-color-selector>

            <s-color-selector
              v-model="style.plate_dark_11"
              dark
              nullable
              title="Dark Color 11"
              @change="$forceUpdate()"
            ></s-color-selector>
            <hr />

            <!-- Class: is-blue-grey -->
            <s-color-selector
              v-model="style.plate_light_12"
              dark
              nullable
              title="Light Color 12"
              @change="$forceUpdate()"
            ></s-color-selector>

            <s-color-selector
              v-model="style.plate_dark_12"
              dark
              nullable
              title="Dark Color 12"
              @change="$forceUpdate()"
            ></s-color-selector>
            <hr />
          </v-expansion-panel-text>
        </v-expansion-panel>
      </v-expansion-panels>
    </v-card>
  </v-navigation-drawer>
</template>

<script>
import SColorSelector from "@components/ui/color/selector/SColorSelector.vue";
import { FONTS } from "@core/helper/font/FontLoader";

import SSmartSwitch from "@components/smart/SSmartSwitch.vue";
import EventBusTriggers from "@core/enums/event-bus/EventBusTriggers";
import SSmartSelect from "@components/smart/SSmartSelect.vue";
import { PageBuilderMixin } from "@app-page-builder/mixins/PageBuilderMixin";
import PageEventBusMixin from "@app-page-builder/mixins/PageEventBusMixin";
import { PageBuilderColorsHelper } from "@app-page-builder/src/helpers/PageBuilderColorsHelper";
import BackgroundImageEditor from "@app-page-builder/components/style/background/BackgroundImageEditor.vue";

export default {
  name: "LSettingsPageStyle",
  mixins: [PageBuilderMixin, PageEventBusMixin],

  components: {
    SSmartSelect,
    SSmartSwitch,

    SColorSelector,
    BackgroundImageEditor,
  },

  props: {},
  data: () => ({
    tab: null,
    style: null,

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
  watch: {
    dialog_master_style(val) {
      this.$store.commit("setLandingShowPageStyle", val);
    },
  },
  created() {},
  mounted() {
    this.EventBus.$on(
      "show:LSettingsPageStyle",

      ({ style, show, tab }) => {
        this.CloseAllPageBuilderNavigationDrawerTools(); // Close all open tools.

        this.style = style;

        this.dialog_master_style = show;
        this.tab = ["background", "menu"].indexOf(tab);

        if (!style.plate_light_1)
          style.plate_light_1 = PageBuilderColorsHelper.PLATE_LIGHT_1;
        if (!style.plate_dark_1)
          style.plate_dark_1 = PageBuilderColorsHelper.PLATE_DARK_1;

        if (!style.plate_light_2)
          style.plate_light_2 = PageBuilderColorsHelper.PLATE_LIGHT_2;
        if (!style.plate_dark_2)
          style.plate_dark_2 = PageBuilderColorsHelper.PLATE_DARK_2;

        if (!style.plate_light_3)
          style.plate_light_3 = PageBuilderColorsHelper.PLATE_LIGHT_3;
        if (!style.plate_dark_3)
          style.plate_dark_3 = PageBuilderColorsHelper.PLATE_DARK_3;

        if (!style.plate_light_4)
          style.plate_light_4 = PageBuilderColorsHelper.PLATE_LIGHT_4;
        if (!style.plate_dark_4)
          style.plate_dark_4 = PageBuilderColorsHelper.PLATE_DARK_4;

        if (!style.plate_light_5)
          style.plate_light_5 = PageBuilderColorsHelper.PLATE_LIGHT_5;
        if (!style.plate_dark_5)
          style.plate_dark_5 = PageBuilderColorsHelper.PLATE_DARK_5;

        if (!style.plate_light_6)
          style.plate_light_6 = PageBuilderColorsHelper.PLATE_LIGHT_6;
        if (!style.plate_dark_6)
          style.plate_dark_6 = PageBuilderColorsHelper.PLATE_DARK_6;

        if (!style.plate_light_7)
          style.plate_light_7 = PageBuilderColorsHelper.PLATE_LIGHT_7;
        if (!style.plate_dark_7)
          style.plate_dark_7 = PageBuilderColorsHelper.PLATE_DARK_7;

        if (!style.plate_light_8)
          style.plate_light_8 = PageBuilderColorsHelper.PLATE_LIGHT_8;
        if (!style.plate_dark_8)
          style.plate_dark_8 = PageBuilderColorsHelper.PLATE_DARK_8;

        if (!style.plate_light_9)
          style.plate_light_9 = PageBuilderColorsHelper.PLATE_LIGHT_9;
        if (!style.plate_dark_9)
          style.plate_dark_9 = PageBuilderColorsHelper.PLATE_DARK_9;

        if (!style.plate_light_10)
          style.plate_light_10 = PageBuilderColorsHelper.PLATE_LIGHT_10;
        if (!style.plate_dark_10)
          style.plate_dark_10 = PageBuilderColorsHelper.PLATE_DARK_10;

        if (!style.plate_light_11)
          style.plate_light_11 = PageBuilderColorsHelper.PLATE_LIGHT_11;
        if (!style.plate_dark_11)
          style.plate_dark_11 = PageBuilderColorsHelper.PLATE_DARK_11;

        if (!style.plate_light_12)
          style.plate_light_12 = PageBuilderColorsHelper.PLATE_LIGHT_12;
        if (!style.plate_dark_12)
          style.plate_dark_12 = PageBuilderColorsHelper.PLATE_DARK_12;
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
    this.EventBus.$off("show:LSettingsPageStyle");

    this.EventBus.$off(EventBusTriggers.PAGE_BUILDER_CLOSE_TOOLS);

    //――――――――――――――――――――――  REMOVE key listener ――――――――――――――――――――
    document.removeEventListener("keydown", this.key_listener_keydown, true);
  },

  methods: {

  },
};
</script>

<style lang="scss" scoped></style>
