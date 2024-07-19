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
  <!-- █████████████████████ Edit Dialog █████████████████████ -->

  <l-setting-navigation v-model="show_dialog">
    <v-card v-if="dialog_pre" class="text-start">
      <v-card-actions>
        <div class="widget-buttons">
          <v-btn size="x-large" variant="text" @click="show_dialog = false">
            <v-icon class="me-1">close</v-icon>
            {{ $t("global.actions.close") }}
          </v-btn>
        </div>
      </v-card-actions>

      <v-card-text>
        <!-- ━━━━━━━━━━━━━━━━━━━━ Properties > Edit ━━━━━━━━━━━━━━━━━━━━ -->
        <u-setting-dynamic
          :properties-structure="propertiesStructure"
          v-model="target.data.properties"
        ></u-setting-dynamic>

        <div
          v-if="!propertiesDefault || !Object.keys(propertiesDefault).length"
        >
          <v-icon class="me-1">bolt</v-icon>
          No properties defined.
        </div>

        <!-- ━━━━━━━━━━━━━━━━━━━━ Properties > Reset Default ━━━━━━━━━━━━━━━━━━━━ -->

        <s-setting-group
          v-if="
            target.data.properties && Object.keys(target.data.properties).length
          "
          title="Critical"
          subtitle="Use this section with caution. Resetting the properties will remove all the custom values and reset them to the default values."
        >
          <v-btn variant="text" @click="resetToDefault">
            <v-icon class="me-1">restart_alt</v-icon>
            Reset to default
          </v-btn>
        </s-setting-group>

        <div class="min-height-20vh"></div>
      </v-card-text>
    </v-card>
  </l-setting-navigation>
</template>

<script>
import LEventsName from "../../../mixins/events/name/LEventsName";
import { LMixinEvents } from "../../../mixins/events/LMixinEvents";
import { EventBus } from "@selldone/core-js/events/EventBus";
import SSettingGroup from "@selldone/page-builder/styler/settings/group/SSettingGroup.vue";
import USettingDynamic from "@selldone/page-builder/styler/settings/dynamic/USettingDynamic.vue";
import { inject } from "vue";
import LSettingNavigation from "@selldone/page-builder/settings/LSettingNavigation.vue";

export default {
  name: "LSettingsCodeProperties",

  mixins: [LMixinEvents],

  components: {
    LSettingNavigation,
    USettingDynamic,

    SSettingGroup,
  },

  props: {},
  data: () => ({
    el: null,
    section: null,
    target: null,
    propertiesStructure: null, // Properties structure
    propertiesDefault: null, // Default value of properties in the component

    //----------------------- Bg image -----------------------
    show_dialog: false,
    dialog_pre: false,

    busy_scripts: false,
    scripts_list: [],

    //--------------------------
    key_listener_keydown: null,

    LOCK: false, // 🔐 Lock changes
  }),

  computed: {
    builder() {
      // Get builder from main page editor/viewer
      return inject("$builder");
    },

    effect() {
      return this.target?.effect;
    },
  },
  watch: {
    show_dialog(dialog) {},
  },
  created() {},
  mounted() {
    EventBus.$on(
      "show:LSettingsCodeProperties",

      ({ el, section, target, propertiesStructure, propertiesDefault }) => {
        this.CloseAllPageBuilderNavigationDrawerTools(); // Close all open tools.

        this.LOCK = true; // 🔒 Prevent update style and classes

        this.el = el;
        this.section = section;
        this.target = target;

        this.propertiesStructure = propertiesStructure;
        this.propertiesDefault = propertiesDefault;

        if (
          !this.target.data.properties ||
          typeof this.target.data.properties !== "object"
        ) {
          // Deep clone!
          this.target.data.properties = JSON.parse(
            JSON.stringify(this.propertiesDefault),
          );
        }

        this.showDialog();
      },
    );

    //――――――――――――――――――――――  START Editor key listener ――――――――――――――――――――
    this.key_listener_keydown = (event) => {
      // Scape:
      let isEscape =
        event.key === "Escape" || event.key === "Esc" || event.keyCode === 27;

      if (isEscape) {
        if (this.show_dialog) {
          // Close tools
          this.show_dialog = false;
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
      this.show_dialog = false;
    });
  },
  beforeUnmount() {
    EventBus.$off("show:LSettingsCodeProperties");
    EventBus.$off(LEventsName.PAGE_BUILDER_CLOSE_TOOLS);

    //――――――――――――――――――――――  REMOVE key listener ――――――――――――――――――――
    document.removeEventListener("keydown", this.key_listener_keydown, true);
  },

  methods: {
    showDialog() {
      this.dialog_pre = false;
      this.$nextTick(() => {
        this.dialog_pre = true;
        this.show_dialog = true;
        this.LOCK = false; // 🔓 Now can update values
      });
    },

    resetToDefault() {
      this.openDangerAlert(
        "Reset to Default",
        "Are you sure you want to reset the properties to default?",
        "Yes, Reset Now",
        () => {
          this.target.data.properties = JSON.parse(
            JSON.stringify(this.propertiesDefault),
          );
        },
      );
    },
  },
};
</script>

<style lang="scss" scoped></style>
