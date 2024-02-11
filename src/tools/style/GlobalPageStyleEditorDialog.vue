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
    dark
    location="right"
    fixed
    :width="$vuetify.display.xl ? 560 : $vuetify.display.lgAndUp ? 420 : 320"
    stateless
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
            ><v-icon class="me-1">close</v-icon>
            {{ $t("global.actions.close") }}
          </v-btn>
        </div>
      </v-card-actions>

      <v-card-text>
        <s-widget-header
          title="Page Master Style"
          icon="design_services"
        ></s-widget-header>
        <v-list-subheader></v-list-subheader>
      </v-card-text>

      <v-expansion-panels flat v-model="tab">
        <!-- ████████████████████ Page Background ████████████████████ -->

        <v-expansion-panel>
          <v-expansion-panel-title>
            <div>
              <div><v-icon class="me-1">wallpaper</v-icon> Page Background</div>
            </div>
          </v-expansion-panel-title>
          <v-expansion-panel-text>
            <s-widget-header
              title="Background Color"
              icon="palette"
            ></s-widget-header>
            <v-list-subheader>Page background color.</v-list-subheader>

            <s-color-selector
              v-model="style.bg_color"
              @change="$forceUpdate()"
              :title="$t('page_builder.setting.bg_color_input')"
              nullable
              color="#293239"
              dark
              class="mb-5"
            ></s-color-selector>

            <!-- ▅▅▅▅▅▅▅▅▅▅▅▅▅▅▅▅▅▅ Background ▅▅▅▅▅▅▅▅▅▅▅▅▅▅▅▅▅▅ -->

            <s-widget-header
              :title="$t('page_builder.setting.bg_style_input')"
              icon="wallpaper"
            ></s-widget-header>
            <v-list-subheader></v-list-subheader>
            <background-image-editor
              :upload-url="upload_bg_url"
              v-model:bg-image="style.bg_image"
              v-model:bgGradient="style.bg_gradient"
              v-model:bgImageSize="style.bg_size"
              v-model:bgCustom="style.bg_custom"
              v-model:BgImageRepeat="style.bg_repeat"
              @change="$forceUpdate()"
            >
            </background-image-editor>
          </v-expansion-panel-text>
        </v-expansion-panel>

        <!-- ████████████████████ Top Menu ████████████████████ -->

        <v-expansion-panel>
          <v-expansion-panel-title>
            <div>
              <div><v-icon class="me-1">drag_handle</v-icon> Top Menu</div>
            </div>
          </v-expansion-panel-title>
          <v-expansion-panel-text>
            <s-widget-header
              title="Top menu"
              icon="linear_scale"
            ></s-widget-header>
            <v-list-subheader
              >Customize the header menu on the pages and create fancy
              looks.</v-list-subheader
            >

            <s-smart-select
              v-model="style.header_mode"
              label="Main Shop Header"
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
              item-value="code"
              item-text="title"
              item-description="description"
              item-icon="icon"
              class="my-3"
              dark
              @change="
                (val) => {
                  if (val === 'overlay')
                    style.menu_transparent = true; /*Always should be transparent*/
                }
              "
            ></s-smart-select>

            <s-smart-switch
              v-model="style.menu_transparent"
              label="Custom Header Menu"
              true-title="Transparent Background"
              true-description="The top header will be shown overlay on top of the page."
              false-title="Normal"
              class="my-3"
              dark
              :disabled="style.header_mode === 'overlay'"
              true-icon="invert_colors_off"
              false-icon="opacity"
              @change="$forceUpdate()"
            ></s-smart-switch>

            <s-smart-switch
              v-model="style.menu_dark"
              label="Header Color Mode"
              true-title="Dark Mode"
              true-description="The text in the header section will be white."
              false-title="Light Mode"
              false-description="The text in the header section will be black."
              true-icon="dark_mode"
              false-icon="light_mode"
              clearable
              class="my-3"
              dark
            ></s-smart-switch>
          </v-expansion-panel-text>
        </v-expansion-panel>

        <!-- ████████████████████ Colors Plate ████████████████████ -->

        <v-expansion-panel>
          <v-expansion-panel-title>
            <div>
              <div><v-icon class="me-1">palette</v-icon> Colors Plate</div>
            </div>
          </v-expansion-panel-title>
          <v-expansion-panel-text>
            <s-widget-header title="Colors" icon="palette"></s-widget-header>
            <v-list-subheader
              >Here, you have the option to personalize the color variables of
              the page.</v-list-subheader
            >

            <!-- Class: is-samin  -->
            <s-color-selector
              v-model="style.plate_light_1"
              @change="$forceUpdate()"
              title="Light Color 1"
              nullable
              dark
            ></s-color-selector>

            <s-color-selector
              v-model="style.plate_dark_1"
              @change="$forceUpdate()"
              title="Dark Color 1"
              nullable
              dark
            ></s-color-selector>
            <hr />

            <!-- Class: is-red  -->
            <s-color-selector
              v-model="style.plate_light_2"
              @change="$forceUpdate()"
              title="Light Color 2"
              nullable
              dark
            ></s-color-selector>

            <s-color-selector
              v-model="style.plate_dark_2"
              @change="$forceUpdate()"
              title="Dark Color 2"
              nullable
              dark
            ></s-color-selector>
            <hr />

            <!-- Class: is-black  -->
            <s-color-selector
              v-model="style.plate_light_3"
              @change="$forceUpdate()"
              title="Light Color 3"
              nullable
              dark
            ></s-color-selector>

            <s-color-selector
              v-model="style.plate_dark_3"
              @change="$forceUpdate()"
              title="Dark Color 3"
              nullable
              dark
            ></s-color-selector>
            <hr />

            <!-- Class: is-green  -->
            <s-color-selector
              v-model="style.plate_light_4"
              @change="$forceUpdate()"
              title="Light Color 4"
              nullable
              dark
            ></s-color-selector>

            <s-color-selector
              v-model="style.plate_dark_4"
              @change="$forceUpdate()"
              title="Dark Color 4"
              nullable
              dark
            ></s-color-selector>

            <hr />

            <!-- Class: is-blue  -->
            <s-color-selector
              v-model="style.plate_light_5"
              @change="$forceUpdate()"
              title="Light Color 5"
              nullable
              dark
            ></s-color-selector>

            <s-color-selector
              v-model="style.plate_dark_5"
              @change="$forceUpdate()"
              title="Dark Color 5"
              nullable
              dark
            ></s-color-selector>
            <hr />

            <!-- Class: is-white  -->
            <s-color-selector
              v-model="style.plate_light_6"
              @change="$forceUpdate()"
              title="Light Color 6"
              nullable
              dark
            ></s-color-selector>

            <s-color-selector
              v-model="style.plate_dark_6"
              @change="$forceUpdate()"
              title="Dark Color 6"
              nullable
              dark
            ></s-color-selector>
            <hr />

            <!-- Class: is-deep-purple  -->
            <s-color-selector
              v-model="style.plate_light_7"
              @change="$forceUpdate()"
              title="Light Color 7"
              nullable
              dark
            ></s-color-selector>

            <s-color-selector
              v-model="style.plate_dark_7"
              @change="$forceUpdate()"
              title="Dark Color 7"
              nullable
              dark
            ></s-color-selector>
            <hr />

            <!-- Class: is-teal  -->
            <s-color-selector
              v-model="style.plate_light_8"
              @change="$forceUpdate()"
              title="Light Color 8"
              nullable
              dark
            ></s-color-selector>

            <s-color-selector
              v-model="style.plate_dark_8"
              @change="$forceUpdate()"
              title="Dark Color 8"
              nullable
              dark
            ></s-color-selector>
            <hr />

            <!-- Class: is-cyan  -->
            <s-color-selector
              v-model="style.plate_light_9"
              @change="$forceUpdate()"
              title="Light Color 9"
              nullable
              dark
            ></s-color-selector>

            <s-color-selector
              v-model="style.plate_dark_9"
              @change="$forceUpdate()"
              title="Dark Color 9"
              nullable
              dark
            ></s-color-selector>
            <hr />

            <!-- Class: is-amber -->
            <s-color-selector
              v-model="style.plate_light_10"
              @change="$forceUpdate()"
              title="Light Color 10"
              nullable
              dark
            ></s-color-selector>

            <s-color-selector
              v-model="style.plate_dark_10"
              @change="$forceUpdate()"
              title="Dark Color 10"
              nullable
              dark
            ></s-color-selector>
            <hr />

            <!-- Class: is-pink -->
            <s-color-selector
              v-model="style.plate_light_11"
              @change="$forceUpdate()"
              title="Light Color 11"
              nullable
              dark
            ></s-color-selector>

            <s-color-selector
              v-model="style.plate_dark_11"
              @change="$forceUpdate()"
              title="Dark Color 11"
              nullable
              dark
            ></s-color-selector>
            <hr />

            <!-- Class: is-blue-grey -->
            <s-color-selector
              v-model="style.plate_light_12"
              @change="$forceUpdate()"
              title="Light Color 12"
              nullable
              dark
            ></s-color-selector>

            <s-color-selector
              v-model="style.plate_dark_12"
              @change="$forceUpdate()"
              title="Dark Color 12"
              nullable
              dark
            ></s-color-selector>
            <hr />
          </v-expansion-panel-text>
        </v-expansion-panel>
      </v-expansion-panels>
    </v-card>
  </v-navigation-drawer>
</template>

<script>
import BackgroundImageEditor from "../background/BackgroundImageEditor.vue";
import SColorSelector from "@components/ui/color/selector/SColorSelector.vue";
import { FontLoader, FONTS } from "@core/helper/font/FontLoader";

import SSmartSwitch from "@components/smart/SSmartSwitch.vue";
import EventBusTriggers from "@core/enums/event-bus/EventBusTriggers";
import SSmartSelect from "@components/smart/SSmartSelect.vue";
import { PageBuilderMixin } from "@app-page-builder/mixins/PageBuilderMixin";

export default {
  name: "GlobalPageStyleEditorDialog",
  mixins: [PageBuilderMixin],

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
      "show:GlobalPageStyleEditorDialog",

      ({ style, show, tab }) => {
        this.CloseAllPageBuilderNavigationDrawerTools(); // Close all open tools.

        this.style = style;

        this.dialog_master_style = show;
        this.tab = ["background", "menu"].indexOf(tab);

        if (!style.plate_light_1) style.plate_light_1 = "#70557e";
        if (!style.plate_dark_1) style.plate_dark_1 = "#3a2c41";

        if (!style.plate_light_2) style.plate_light_2 = "#e91e63";
        if (!style.plate_dark_2) style.plate_dark_2 = "#d32f2f";

        if (!style.plate_light_3) style.plate_light_3 = "#333333";
        if (!style.plate_dark_3) style.plate_dark_3 = "#212121";

        if (!style.plate_light_4) style.plate_light_4 = "#afb42b";
        if (!style.plate_dark_4) style.plate_dark_4 = "#388e3c";

        if (!style.plate_light_5) style.plate_light_5 = "#303f9f";
        if (!style.plate_dark_5) style.plate_dark_5 = "#0288d1";

        if (!style.plate_light_6) style.plate_light_6 = "#ffffff";
        if (!style.plate_dark_6) style.plate_dark_6 = "#eeeeee";

        if (!style.plate_light_7) style.plate_light_7 = "#7b1fa2";
        if (!style.plate_dark_7) style.plate_dark_7 = "#512da8";

        if (!style.plate_light_8) style.plate_light_8 = "#0097a7";
        if (!style.plate_dark_8) style.plate_dark_8 = "#00796b";

        if (!style.plate_light_9) style.plate_light_9 = "#0288d1";
        if (!style.plate_dark_9) style.plate_dark_9 = "#0097a7";

        if (!style.plate_light_10) style.plate_light_10 = "#ff5722";
        if (!style.plate_dark_10) style.plate_dark_10 = "#ffa000";

        if (!style.plate_light_11) style.plate_light_11 = "#c2185b";
        if (!style.plate_dark_11) style.plate_dark_11 = "#961448";

        if (!style.plate_light_11) style.plate_light_11 = "#455a64";
        if (!style.plate_dark_11) style.plate_dark_11 = "#374d57";
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
    this.EventBus.$off("show:GlobalPageStyleEditorDialog");

    this.EventBus.$off(EventBusTriggers.PAGE_BUILDER_CLOSE_TOOLS);

    //――――――――――――――――――――――  REMOVE key listener ――――――――――――――――――――
    document.removeEventListener("keydown", this.key_listener_keydown, true);
  },

  methods: {
    applyChanges() {
      this.triggerRefreshGlobalPageBuilder(); //🗲 Request update entire page!
    },
  },
};
</script>

<style scoped lang="scss"></style>
