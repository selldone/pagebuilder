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
  <l-setting-navigation v-if="style" v-model="dialog_master_style">
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

      <s-setting-group
        icon="format_paint"
        title="Page Master Style"
        subtitle="You can configure global page variables, background settings, and the menu here."
      ></s-setting-group>

      <v-expansion-panels v-model="tab">
        <!-- ████████████████████ Page Background ████████████████████ -->

        <s-setting-expandable icon="wallpaper" title="Page Background">
          <!-- ▅▅▅▅▅▅▅▅▅▅▅▅▅▅▅▅▅▅ Background ▅▅▅▅▅▅▅▅▅▅▅▅▅▅▅▅▅▅ -->

          <background-image-editor
            v-model:bg-image="style.bg_image"
            v-model:bgCustom="style.bg_custom"
            v-model:bgGradient="style.bg_gradient"
            v-model:bgRotation="style.bg_rotation"
            v-model:bgImageRepeat="style.bg_repeat"
            v-model:bgImageSize="style.bg_size"
            @change="$forceUpdate()"
            v-model:bgColor="style.bg_color"
            has-bg-color
          >
          </background-image-editor>
        </s-setting-expandable>

        <!-- ████████████████████ Top Menu ████████████████████ -->

        <s-setting-expandable icon="linear_scale" title="Top Menu">
          <s-setting-group
            icon="control_camera"
            title="Position"
            subtitle="Set position and behavior of the menu."
          ></s-setting-group>

          <s-setting-toggle
            v-model="style.header_mode"
            :items="['normal', 'overlay', 'hidden']"
            label="Menu Position"
            mandatory
          >
          </s-setting-toggle>

          <s-setting-toggle
            v-model="style.menu_transparent"
            :items="[
              {
                title: 'Transparent',
                icon: 'format_color_reset',
                value: true,
              },
              { title: 'Solid', icon: 'opacity', value: false },
            ]"
            label="Behavior"
            mandatory
          >
          </s-setting-toggle>

          <s-setting-group
            icon="format_color_fill"
            title="Color"
            subtitle="Set the color and dark/light mode of the menu."
          ></s-setting-group>

          <s-setting-toggle
            v-model="style.menu_dark"
            :items="[
              { title: 'Dark', icon: 'dark_mode', value: true },
              { title: 'Light', icon: 'light_mode', value: false },
            ]"
            label="Color Mode"
            mandatory
            icon="contrast"
          >
          </s-setting-toggle>

          <s-setting-color
            v-model="style.header_color"
            icon="palette"
            label="Color"
            clearable
          >
          </s-setting-color>
        </s-setting-expandable>

        <!-- ████████████████████ Colors Plate ████████████████████ -->

        <s-setting-expandable
          icon="palette"
          title="Colors Plate"
          subtitle="Here, you have the option to personalize the color variables of the page."
        >
          <!-- Class: is-samin  -->
          <s-setting-color
            v-model="style.plate_light_1"
            clearable
            label="Light Color 1"
            @change="$forceUpdate()"
            class="border-start-white-thin"
          ></s-setting-color>

          <s-setting-color
            v-model="style.plate_dark_1"
            clearable
            label="Dark Color 1"
            @change="$forceUpdate()"
            class="border-start-white-thin"
          ></s-setting-color>
          <hr />

          <!-- Class: is-red  -->
          <s-setting-color
            v-model="style.plate_light_2"
            clearable
            label="Light Color 2"
            class="border-start-white-thin"
            @change="$forceUpdate()"
          ></s-setting-color>

          <s-setting-color
            v-model="style.plate_dark_2"
            clearable
            label="Dark Color 2"
            class="border-start-white-thin"
            @change="$forceUpdate()"
          ></s-setting-color>
          <hr />

          <!-- Class: is-black  -->
          <s-setting-color
            v-model="style.plate_light_3"
            clearable
            label="Light Color 3"
            class="border-start-white-thin"
            @change="$forceUpdate()"
          ></s-setting-color>

          <s-setting-color
            v-model="style.plate_dark_3"
            clearable
            label="Dark Color 3"
            class="border-start-white-thin"
            @change="$forceUpdate()"
          ></s-setting-color>
          <hr />

          <!-- Class: is-green  -->
          <s-setting-color
            v-model="style.plate_light_4"
            clearable
            label="Light Color 4"
            class="border-start-white-thin"
            @change="$forceUpdate()"
          ></s-setting-color>

          <s-setting-color
            v-model="style.plate_dark_4"
            clearable
            label="Dark Color 4"
            class="border-start-white-thin"
            @change="$forceUpdate()"
          ></s-setting-color>

          <hr />

          <!-- Class: is-blue  -->
          <s-setting-color
            v-model="style.plate_light_5"
            clearable
            label="Light Color 5"
            class="border-start-white-thin"
            @change="$forceUpdate()"
          ></s-setting-color>

          <s-setting-color
            v-model="style.plate_dark_5"
            clearable
            label="Dark Color 5"
            class="border-start-white-thin"
            @change="$forceUpdate()"
          ></s-setting-color>
          <hr />

          <!-- Class: is-white  -->
          <s-setting-color
            v-model="style.plate_light_6"
            clearable
            label="Light Color 6"
            class="border-start-white-thin"
            @change="$forceUpdate()"
          ></s-setting-color>

          <s-setting-color
            v-model="style.plate_dark_6"
            clearable
            label="Dark Color 6"
            class="border-start-white-thin"
            @change="$forceUpdate()"
          ></s-setting-color>
          <hr />

          <!-- Class: is-deep-purple  -->
          <s-setting-color
            v-model="style.plate_light_7"
            clearable
            label="Light Color 7"
            class="border-start-white-thin"
            @change="$forceUpdate()"
          ></s-setting-color>

          <s-setting-color
            v-model="style.plate_dark_7"
            clearable
            label="Dark Color 7"
            class="border-start-white-thin"
            @change="$forceUpdate()"
          ></s-setting-color>
          <hr />

          <!-- Class: is-teal  -->
          <s-setting-color
            v-model="style.plate_light_8"
            clearable
            label="Light Color 8"
            class="border-start-white-thin"
            @change="$forceUpdate()"
          ></s-setting-color>

          <s-setting-color
            v-model="style.plate_dark_8"
            clearable
            label="Dark Color 8"
            class="border-start-white-thin"
            @change="$forceUpdate()"
          ></s-setting-color>
          <hr />

          <!-- Class: is-cyan  -->
          <s-setting-color
            v-model="style.plate_light_9"
            clearable
            label="Light Color 9"
            class="border-start-white-thin"
            @change="$forceUpdate()"
          ></s-setting-color>

          <s-setting-color
            v-model="style.plate_dark_9"
            clearable
            label="Dark Color 9"
            class="border-start-white-thin"
            @change="$forceUpdate()"
          ></s-setting-color>
          <hr />

          <!-- Class: is-amber -->
          <s-setting-color
            v-model="style.plate_light_10"
            clearable
            label="Light Color 10"
            class="border-start-white-thin"
            @change="$forceUpdate()"
          ></s-setting-color>

          <s-setting-color
            v-model="style.plate_dark_10"
            clearable
            label="Dark Color 10"
            class="border-start-white-thin"
            @change="$forceUpdate()"
          ></s-setting-color>
          <hr />

          <!-- Class: is-pink -->
          <s-setting-color
            v-model="style.plate_light_11"
            clearable
            label="Light Color 11"
            class="border-start-white-thin"
            @change="$forceUpdate()"
          ></s-setting-color>

          <s-setting-color
            v-model="style.plate_dark_11"
            clearable
            label="Dark Color 11"
            class="border-start-white-thin"
            @change="$forceUpdate()"
          ></s-setting-color>
          <hr />

          <!-- Class: is-blue-grey -->
          <s-setting-color
            v-model="style.plate_light_12"
            clearable
            label="Light Color 12"
            class="border-start-white-thin"
            @change="$forceUpdate()"
          ></s-setting-color>

          <s-setting-color
            v-model="style.plate_dark_12"
            clearable
            label="Dark Color 12"
            class="border-start-white-thin"
            @change="$forceUpdate()"
          ></s-setting-color>
        </s-setting-expandable>
      </v-expansion-panels>
    </v-card>
  </l-setting-navigation>
</template>

<script lang="ts">
import { FONTS } from "@selldone/core-js/helper/font/FontLoader";
import LEventsName from "../../../mixins/events/name/LEventsName";
import { LUtilsColors } from "../../../utils/colors/LUtilsColors";
import BackgroundImageEditor from "../../../components/style/background/BackgroundImageEditor.vue";
import { LMixinEvents } from "../../../mixins/events/LMixinEvents";
import { EventBus } from "@selldone/core-js/events/EventBus";
import SSettingColor from "../../../styler/settings/color/SSettingColor.vue";
import SSettingGroup from "@selldone/page-builder/styler/settings/group/SSettingGroup.vue";
import SSettingToggle from "@selldone/page-builder/styler/settings/toggle/SSettingToggle.vue";
import SSettingExpandable from "@selldone/page-builder/styler/settings/expandable/SSettingExpandable.vue";
import LSettingNavigation from "@selldone/page-builder/settings/LSettingNavigation.vue";

export default {
  name: "LSettingsPageStyle",
  mixins: [LMixinEvents],

  components: {
    LSettingNavigation,
    SSettingExpandable,
    SSettingToggle,
    SSettingGroup,
    SSettingColor,

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
    EventBus.$on(
      "show:LSettingsPageStyle",

      ({ style, show, tab }) => {
        this.CloseAllPageBuilderNavigationDrawerTools(); // Close all open tools.

        this.style = style;

        this.dialog_master_style =
          show === "toggle" ? !this.dialog_master_style : show;
        this.tab = ["background", "menu"].indexOf(tab);

        if (!style.plate_light_1)
          style.plate_light_1 = LUtilsColors.PLATE_LIGHT_1;
        if (!style.plate_dark_1) style.plate_dark_1 = LUtilsColors.PLATE_DARK_1;

        if (!style.plate_light_2)
          style.plate_light_2 = LUtilsColors.PLATE_LIGHT_2;
        if (!style.plate_dark_2) style.plate_dark_2 = LUtilsColors.PLATE_DARK_2;

        if (!style.plate_light_3)
          style.plate_light_3 = LUtilsColors.PLATE_LIGHT_3;
        if (!style.plate_dark_3) style.plate_dark_3 = LUtilsColors.PLATE_DARK_3;

        if (!style.plate_light_4)
          style.plate_light_4 = LUtilsColors.PLATE_LIGHT_4;
        if (!style.plate_dark_4) style.plate_dark_4 = LUtilsColors.PLATE_DARK_4;

        if (!style.plate_light_5)
          style.plate_light_5 = LUtilsColors.PLATE_LIGHT_5;
        if (!style.plate_dark_5) style.plate_dark_5 = LUtilsColors.PLATE_DARK_5;

        if (!style.plate_light_6)
          style.plate_light_6 = LUtilsColors.PLATE_LIGHT_6;
        if (!style.plate_dark_6) style.plate_dark_6 = LUtilsColors.PLATE_DARK_6;

        if (!style.plate_light_7)
          style.plate_light_7 = LUtilsColors.PLATE_LIGHT_7;
        if (!style.plate_dark_7) style.plate_dark_7 = LUtilsColors.PLATE_DARK_7;

        if (!style.plate_light_8)
          style.plate_light_8 = LUtilsColors.PLATE_LIGHT_8;
        if (!style.plate_dark_8) style.plate_dark_8 = LUtilsColors.PLATE_DARK_8;

        if (!style.plate_light_9)
          style.plate_light_9 = LUtilsColors.PLATE_LIGHT_9;
        if (!style.plate_dark_9) style.plate_dark_9 = LUtilsColors.PLATE_DARK_9;

        if (!style.plate_light_10)
          style.plate_light_10 = LUtilsColors.PLATE_LIGHT_10;
        if (!style.plate_dark_10)
          style.plate_dark_10 = LUtilsColors.PLATE_DARK_10;

        if (!style.plate_light_11)
          style.plate_light_11 = LUtilsColors.PLATE_LIGHT_11;
        if (!style.plate_dark_11)
          style.plate_dark_11 = LUtilsColors.PLATE_DARK_11;

        if (!style.plate_light_12)
          style.plate_light_12 = LUtilsColors.PLATE_LIGHT_12;
        if (!style.plate_dark_12)
          style.plate_dark_12 = LUtilsColors.PLATE_DARK_12;
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
    EventBus.$on(LEventsName.PAGE_BUILDER_CLOSE_TOOLS, () => {
      this.dialog_master_style = false;
    });
  },
  beforeUnmount() {
    EventBus.$off("show:LSettingsPageStyle");

    EventBus.$off(LEventsName.PAGE_BUILDER_CLOSE_TOOLS);

    //――――――――――――――――――――――  REMOVE key listener ――――――――――――――――――――
    document.removeEventListener("keydown", this.key_listener_keydown, true);
  },

  methods: {},
};
</script>

<style lang="scss" scoped></style>
