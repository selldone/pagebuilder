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

  <v-navigation-drawer
    v-model="show_dialog"
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
        <!-- ━━━━━━━━━━━━━━━━━━━━ Properties ━━━━━━━━━━━━━━━━━━━━ -->

        <s-setting-group
          subtitle="You can set dynamic values in the component by defining properties in the props of the custom Vue component."
          title="Properties"
          icon="data_object"
        >
          <template v-for="item in structure" :key="item.key">
            <s-setting-text-input
              v-if="item.type === 'string'"
              v-model="target[keyProperties][item.key]"
              :subtitle="item.title"
              clearable
            ></s-setting-text-input>
            <s-setting-number-input
              v-else-if="item.type === 'number'"
              v-model="target[keyProperties][item.key]"
              :title="item.title"
              clearable
              :max="9999"
            ></s-setting-number-input>
            <s-setting-switch
              v-else-if="item.type === 'boolean'"
              v-model="target[keyProperties][item.key]"
              :title="item.title"
              clearable
            ></s-setting-switch>
            <s-setting-color
              v-else-if="item.type === 'color'"
              v-model="target[keyProperties][item.key]"
              :title="item.title"
              clearable
            ></s-setting-color>

            <div v-else class="small pa-2">Invalid type: {{ item }}</div>
          </template>
        </s-setting-group>

        <s-setting-group
          v-if="Object.keys(missingProperties).length"
          title="Missing Properties"
          subtitle="These properties are not defined in the properties structure."
        >
          <v-list>
            <v-fade-transition group>
              <v-list-item
                v-for="(item, key) in missingProperties"
                :title="key"
                :subtitle="item"
                :key="key"
              >
                <template v-slot:append>
                  <v-btn
                    icon
                    variant="text"
                    color="red"
                    @click="delete target[keyProperties][key]"
                  >
                    <v-icon>close</v-icon>
                  </v-btn>
                </template>
              </v-list-item>
            </v-fade-transition>
          </v-list>
        </s-setting-group>

        <s-setting-group
          title="Critical"
          subtitle="Use this section with caution. Resetting the properties will remove all the custom values and reset them to the default values."
        >
          <v-btn
            variant="text"
            @click="
              target[keyProperties] = Object.assign({}, propertiesDefault)
            "
          >
            <v-icon class="me-1">restart_alt</v-icon>
            Reset to default
          </v-btn>
        </s-setting-group>

        <div class="min-height-20vh"></div>
      </v-card-text>
    </v-card>
  </v-navigation-drawer>
</template>

<script>
import LEventsName from "../../../mixins/events/name/LEventsName";
import { LMixinEvents } from "../../../mixins/events/LMixinEvents";
import { EventBus } from "@selldone/core-js/events/EventBus";
import SSettingTextInput from "@selldone/page-builder/styler/settings/text-input/SSettingTextInput.vue";
import SSettingGroup from "@selldone/page-builder/styler/settings/group/SSettingGroup.vue";
import SSettingNumberInput from "@selldone/page-builder/styler/settings/number-input/SSettingNumberInput.vue";
import SSettingSwitch from "@selldone/page-builder/styler/settings/switch/SSettingSwitch.vue";
import SSettingColor from "@selldone/page-builder/styler/settings/color/SSettingColor.vue";

export default {
  name: "LSettingsCodeProperties",

  mixins: [LMixinEvents],

  components: {
    SSettingColor,
    SSettingSwitch,
    SSettingNumberInput,
    SSettingGroup,
    SSettingTextInput,
  },

  props: {
    builder: {
      type: Object,
      required: true,
    },
  },
  data: () => ({
    el: null,
    section: null,
    target: null,
    keyProperties: null, // ex. html
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
    effect() {
      return this.target?.effect;
    },
    upload_image_url() {
      return this.builder.getImageUploadUrl();
    },

    structure() {
      // Try to define the structure from the propertiesStructure

      if (
        this.propertiesStructure &&
        Object.keys(this.propertiesStructure).length
      )
        return this.propertiesStructure;

      if (!this.propertiesDefault) return {};

      // Try to define the structure from the propertiesDefault
      function isHexColor(value) {
        const hexColorRegex =
          /^#([A-Fa-f0-9]{3}|[A-Fa-f0-9]{6}|[A-Fa-f0-9]{8})$/;
        return typeof value === "string" && hexColorRegex.test(value);
      }

      const getType = (value) => {
        if (typeof value === "string") {
          return isHexColor(value) ? "color" : "string";
        } else if (typeof value === "number") {
          return "number";
        } else if (typeof value === "boolean") {
          return "boolean";
        } else {
          return "unknown";
        }
      };

      const structure = Object.keys(this.propertiesDefault).reduce(
        (acc, key) => {
          acc[key] = {
            key: key,
            title: key
              .replace(/_/g, " ")
              .replace(/\b\w/g, (char) => char.toUpperCase()),
            type: getType(this.propertiesDefault[key]),
          };
          return acc;
        },
        {},
      );

      return structure;
    },

    missingProperties() {
      let targetProperties = this.target[this.keyProperties];
      let structureKeys = Object.keys(this.structure);
      let missingProperties = {};

      for (let key in targetProperties) {
        if (!structureKeys.includes(key)) {
          missingProperties[key] = targetProperties[key];
        }
      }

      return missingProperties;
    },
  },
  watch: {
    show_dialog(dialog) {},
  },
  created() {},
  mounted() {
    EventBus.$on(
      "show:LSettingsCodeProperties",

      ({
        el,
        section,
        target,
        keyProperties,
        propertiesStructure,
        propertiesDefault,
      }) => {
        this.CloseAllPageBuilderNavigationDrawerTools(); // Close all open tools.

        this.LOCK = true; // 🔒 Prevent update style and classes

        this.el = el;
        this.section = section;
        this.target = target;
        this.keyProperties = keyProperties;

        this.propertiesStructure = propertiesStructure;
        this.propertiesDefault = propertiesDefault;

        if (
          !this.target[this.keyProperties] ||
          typeof this.target[this.keyProperties] !== "object"
        )
          this.target[this.keyProperties] = Object.assign(
            {},
            this.propertiesDefault,
          );
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
  },
};
</script>

<style lang="scss" scoped></style>
