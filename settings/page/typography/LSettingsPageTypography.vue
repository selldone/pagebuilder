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

      <v-card-text>
        <s-widget-header
          icon="format_quote"
          title="Font & Typo"
        ></s-widget-header>
        <v-list-subheader></v-list-subheader>
      </v-card-text>

      <v-expansion-panels v-model="tab" flat>
        <!-- ████████████████████ Font ████████████████████ -->

        <v-expansion-panel>
          <v-expansion-panel-title>
            <div>
              <div>
                <v-icon class="me-1">font_download</v-icon>
                Page Fonts

                <v-chip
                  v-for="font in style.fonts"
                  :key="font"
                  size="small"
                  class="ma-1"
                  label
                >
                  <span :style="{ fontFamily: font }">{{ font }}</span>
                </v-chip>
              </div>
            </div>
          </v-expansion-panel-title>
          <v-expansion-panel-text>
            <s-setting-font-family
              v-model:fonts="style.fonts"
              v-model="style.font"
              icon="title"
              label="Default font"
              clearable
              has-add
            ></s-setting-font-family>
          </v-expansion-panel-text>
        </v-expansion-panel>

        <!-- ████████████████████ Size ████████████████████ -->

        <s-setting-expandable icon="format_shapes" title="Typo Size">
          <s-setting-group
            icon="format_size"
            title="Default font size"
            subtitle="Add fonts, and change the base font size. This option is used to calibrate font size based on the custom font."
          >
          </s-setting-group>

          <s-setting-number-input
            v-model="style.font_size"
            :max="100"
            :min="10"
            label="Main font size"
            suffix="px"
            lock
          ></s-setting-number-input>

          <s-setting-group icon="format_size" title="Headers & Paragraph">
          </s-setting-group>

          <s-setting-size
            v-model="style.h1_size"
            clearable
            label="H1 Size"
            lock
            @change="onChange"
          ></s-setting-size>
          <s-setting-size
            v-model="style.h2_size"
            clearable
            label="H2 Size"
            lock
            @change="onChange"
          ></s-setting-size>

          <s-setting-size
            v-model="style.h3_size"
            clearable
            label="H3 Size"
            lock
            @change="onChange"
          ></s-setting-size>

          <s-setting-size
            v-model="style.h4_size"
            clearable
            label="H4 Size"
            lock
            @change="onChange"
          ></s-setting-size>
          <s-setting-size
            v-model="style.h5_size"
            clearable
            label="H5 Size"
            lock
            @change="onChange"
          ></s-setting-size>
          <s-setting-size
            v-model="style.h6_size"
            clearable
            label="H6 Size"
            lock
            @change="onChange"
          ></s-setting-size>
          <s-setting-size
            v-model="style.p_size"
            clearable
            label="P Size"
            lock
            @change="onChange"
          ></s-setting-size>

          <div
            :style="[
              PageBuilderTypoHelper.GenerateTypoStyle(style),
              PageBuilderColorsHelper.GenerateColorsStyle(style),
              {
                fontFamily: style.font,
              },
            ]"
            class="my-5 line-height-normal page-content"
            style="min-height: 150px"
          >
            <h1 :style="{ fontSize: style.h1_size }">Header 1</h1>
            <h2 :style="{ fontSize: style.h2_size }">Header 2</h2>
            <h3 :style="{ fontSize: style.h3_size }">Header 3</h3>
            <h4 :style="{ fontSize: style.h4_size }">Header 4</h4>
            <h5 :style="{ fontSize: style.h5_size }">Header 5</h5>
            <h6 :style="{ fontSize: style.h6_size }">Header 6</h6>

            <p :style="{ fontSize: style.p_size }">Paragraph</p>
          </div>
        </s-setting-expandable>

        <!-- ████████████████████ Top Menu ████████████████████ -->

        <v-expansion-panel></v-expansion-panel>
      </v-expansion-panels>
    </v-card>
  </v-navigation-drawer>
</template>

<script>
import { FONTS } from "@selldone/core-js/helper/font/FontLoader";

import LEventsName from "../../../mixins/events/name/LEventsName";
import { LUtilsTypo } from "../../../utils/typo/LUtilsTypo";
import { LUtilsColors } from "../../../utils/colors/LUtilsColors";
import { LMixinEvents } from "../../../mixins/events/LMixinEvents";
import { EventBus } from "@selldone/core-js/events/EventBus";
import SSettingFontFamily from "@selldone/page-builder/styler/settings/font-family/SSettingFontFamily.vue";
import SSettingExpandable from "@selldone/page-builder/styler/settings/expandable/SSettingExpandable.vue";
import SSettingGroup from "@selldone/page-builder/styler/settings/group/SSettingGroup.vue";
import SSettingSize from "@selldone/page-builder/styler/settings/size/SSettingSize.vue";
import SSettingNumberInput from "@selldone/page-builder/styler/settings/number-input/SSettingNumberInput.vue";
import {inject} from "vue";

export default {
  name: "LSettingsPageTypography",
  mixins: [LMixinEvents],

  components: {
    SSettingNumberInput,
    SSettingSize,
    SSettingGroup,
    SSettingExpandable,
    SSettingFontFamily,
  },
  emits: ["change"],
  props: {

  },
  data: () => ({
    PageBuilderTypoHelper: LUtilsTypo,
    PageBuilderColorsHelper: LUtilsColors,

    tab: null,
    style: null,

    //--------------------------
    dialog_master_style: false,

    //--------------------------
    key_listener_keydown: null,
  }),

  computed: {

    builder() {
      // Get builder from main page editor/viewer
      return inject("$builder");
    },


    upload_bg_url() {
      return this.builder.getImageUploadUrl();
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
    EventBus.$on(
      "show:LSettingsPageTypography",

      ({ style, tab }) => {
        this.CloseAllPageBuilderNavigationDrawerTools(); // Close all open tools.
        console.log("style", style);

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
    EventBus.$on(LEventsName.PAGE_BUILDER_CLOSE_TOOLS, () => {
      this.dialog_master_style = false;
    });
  },
  beforeUnmount() {
    EventBus.$off("show:LSettingsPageTypography");

    EventBus.$off(LEventsName.PAGE_BUILDER_CLOSE_TOOLS);

    //――――――――――――――――――――――  REMOVE key listener ――――――――――――――――――――
    document.removeEventListener("keydown", this.key_listener_keydown, true);
  },

  methods: {
    onChange() {
      this.$forceUpdate();
      this.$emit("change");
    },
  },
};
</script>

<style lang="scss" scoped></style>
