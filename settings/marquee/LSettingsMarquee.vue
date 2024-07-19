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
  <l-setting-navigation v-model="dialog">
    <v-card class="text-start" flat>
      <v-card-actions>
        <div class="widget-buttons">
          <v-btn size="x-large" variant="text" @click="dialog = false">
            <v-icon class="me-1">close</v-icon>
            {{ $t("global.actions.close") }}
          </v-btn>
        </div>
      </v-card-actions>

      <v-card-text>
        <v-expansion-panels v-model="tab">
          <!-- ████████████████████ Sort ████████████████████ -->
          <s-setting-expandable
            title="Text / Html"
            icon="article"
            subtitle="The content, in text or HTML, you wish to display."
          >
            <s-setting-text-input
              v-model="target.data.html"
              placeholder="Write a text or html code here..."
              variant="outlined"
              multiple-lines
            >
            </s-setting-text-input>
          </s-setting-expandable>

          <!-- ████████████████████ Appearance ████████████████████ -->
          <s-setting-expandable
            icon="brush"
            title="Appearance"
            subtitle="Customize text style."
          >
            <!-- ▅▅▅▅▅▅▅▅▅▅▅▅▅▅▅▅ Font Color ▅▅▅▅▅▅▅▅▅▅▅▅▅▅▅▅ -->

            <s-setting-color
              v-model="target.style.color"
              label="Font Color"
              icon="format_color_text"
            ></s-setting-color>

            <!-- ▅▅▅▅▅▅▅▅▅▅▅▅▅▅▅▅ Font Size ▅▅▅▅▅▅▅▅▅▅▅▅▅▅▅▅ -->

            <s-setting-size
              v-model="target.style.fontSize"
              label="Font Size"
              icon="format_size"
            ></s-setting-size>
            <!-- ▅▅▅▅▅▅▅▅▅▅▅▅▅▅▅▅ Font ▅▅▅▅▅▅▅▅▅▅▅▅▅▅▅▅ -->

            <s-setting-font-family
              v-model="target.style.fontFamily"
              clearable
              :fonts="builder.style.fonts"
              label="Font Family"
              icon="font_download"
            ></s-setting-font-family>

            <!-- ▅▅▅▅▅▅▅▅▅▅▅▅▅▅▅▅ Height ▅▅▅▅▅▅▅▅▅▅▅▅▅▅▅▅ -->

            <s-setting-size
              v-model="target.style.height"
              label="Height"
              icon="height"
            ></s-setting-size>

            <!-- ▅▅▅▅▅▅▅▅▅▅▅▅▅▅▅▅ Repeat ▅▅▅▅▅▅▅▅▅▅▅▅▅▅▅▅ -->

            <s-setting-number-input
              v-model="target.data.space"
              :min="1"
              label="Space"
              suffix="px"
              icon="space_bar"
            ></s-setting-number-input>
          </s-setting-expandable>

          <!-- ████████████████████ Appearance ████████████████████ -->
          <s-setting-expandable
            icon="animation"
            title="Animation"
            subtitle="Customize text animation."
          >
            <!-- ▅▅▅▅▅▅▅▅▅▅▅▅▅▅▅▅ Duration ▅▅▅▅▅▅▅▅▅▅▅▅▅▅▅▅ -->

            <s-setting-text-input
              v-model="target.data.duration"
              label="Duration"
              placeholder="ex. 10s or 10000ms"
              icon="timer"
            ></s-setting-text-input>

            <!-- ▅▅▅▅▅▅▅▅▅▅▅▅▅▅▅▅ Repeat ▅▅▅▅▅▅▅▅▅▅▅▅▅▅▅▅ -->

            <s-setting-number-input
              v-model="target.data.repeat"
              :min="1"
              label="Repeat Count"
              icon="repeat"
            ></s-setting-number-input>

            <!-- ▅▅▅▅▅▅▅▅▅▅▅▅▅▅▅▅ Reverse ▅▅▅▅▅▅▅▅▅▅▅▅▅▅▅▅ -->

            <s-setting-switch
              v-model="target.data.reverse"
              label="Reverse Animation"
              icon="settings_backup_restore"
            ></s-setting-switch>
          </s-setting-expandable>
        </v-expansion-panels>
      </v-card-text>
    </v-card>
  </l-setting-navigation>
</template>

<script>
import LEventsName from "../../mixins/events/name/LEventsName";
import USmartToggle from "@selldone/components-vue/ui/smart/toggle/USmartToggle.vue";
import { LMixinEvents } from "../../mixins/events/LMixinEvents";
import { EventBus } from "@selldone/core-js/events/EventBus";
import UNumberInput from "@selldone/components-vue/ui/number/input/UNumberInput.vue";
import { XMarqueeObject } from "@selldone/page-builder/components/x/marquee/XMarqueeObject.ts";
import SSettingExpandable from "@selldone/page-builder/styler/settings/expandable/SSettingExpandable.vue";
import SSettingTextInput from "@selldone/page-builder/styler/settings/text-input/SSettingTextInput.vue";
import SSettingColor from "@selldone/page-builder/styler/settings/color/SSettingColor.vue";
import SSettingSize from "@selldone/page-builder/styler/settings/size/SSettingSize.vue";
import SSettingNumberInput from "@selldone/page-builder/styler/settings/number-input/SSettingNumberInput.vue";
import SSettingFontFamily from "@selldone/page-builder/styler/settings/font-family/SSettingFontFamily.vue";
import SSettingSwitch from "@selldone/page-builder/styler/settings/switch/SSettingSwitch.vue";
import { inject } from "vue";
import LSettingNavigation from "@selldone/page-builder/settings/LSettingNavigation.vue";

export default {
  name: "LSettingsMarquee",
  mixins: [LMixinEvents],

  components: {
    LSettingNavigation,
    SSettingSwitch,
    SSettingFontFamily,
    SSettingNumberInput,
    SSettingSize,
    SSettingColor,
    SSettingTextInput,
    SSettingExpandable,
    UNumberInput,
    USmartToggle,
  },

  props: {},
  data: () => ({
    tab: null,

    el: null,
    target: null,

    dialog: false,

    //--------------------------
    key_listener_keydown: null,

    LOCK: false, // 🔐 Lock changes
  }),

  computed: {
    builder() {
      // Get builder from main page editor/viewer
      return inject("$builder");
    },
  },
  watch: {
    /*  target: {
        handler() {
          this.onAcceptDebounced();
        },
        deep: true,
      },*/
  },
  created() {},
  mounted() {
    EventBus.$on(
      "show:LSettingsMarquee",

      ({ el, target }) => {
        this.CloseAllPageBuilderNavigationDrawerTools(); // Close all open tools.

        this.LOCK = true; // 🔒 Prevent update style and classes

        this.el = el;
        this.target = target;
        this.showDialog();
      },
    );

    //――――――――――――――――――――――  START Editor key listener ――――――――――――――――――――
    this.key_listener_keydown = (event) => {
      // Scape:
      let isEscape =
        event.key === "Escape" || event.key === "Esc" || event.keyCode === 27;

      if (isEscape) {
        if (this.dialog) {
          // Close tools
          this.dialog = false;
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
      this.dialog = false;
    });
  },
  beforeUnmount() {
    EventBus.$off("show:LSettingsMarquee");

    EventBus.$off(LEventsName.PAGE_BUILDER_CLOSE_TOOLS);

    //――――――――――――――――――――――  REMOVE key listener ――――――――――――――――――――
    document.removeEventListener("keydown", this.key_listener_keydown, true);
  },

  methods: {
    showDialog() {
      if (!(this.target instanceof XMarqueeObject)) {
        console.error("Target is not an instance of XMarqueeObject");
      }

      // Load default values:
      if (!this.target.space) this.target.space = 200;
      if (!this.target.repeat) this.target.repeat = 10;

      this.dialog = true;
      this.$nextTick(() => {
        this.LOCK = false; // 🔓 Now can update values
      });
    },

    //----------------------------------------------------------------------------
    /*  onAcceptDebounced: _.debounce(function () {
        this.onAccept(false);
      }, 3000),
  
      onAccept() {
        if (!this.dialog || this.LOCK) return;
  
      },*/
  },
};
</script>

<style lang="scss" scoped></style>
