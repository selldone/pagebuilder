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
    <v-card v-if="target" class="text-start" flat>
      <!-- ████████████████████ Actions ████████████████████ -->

      <v-card-actions>
        <div class="widget-buttons">
          <v-btn size="x-large" variant="text" @click="dialog = false">
            <v-icon start>close</v-icon>
            {{ $t("global.actions.close") }}
          </v-btn>
        </div>
      </v-card-actions>

      <v-card-title>
        <s-setting-group
          icon="input"
          title="Input"
          subtitle="You can adjust the field property here to customize its appearance."
        ></s-setting-group>

        <s-setting-text-input
          v-if="!options?.no_name"
          label="Param Name"
          icon="label_important_outline"
          placeholder="Enter the param name e.g. email, name, ..."
          v-model="target.data.name"
        ></s-setting-text-input>

        <s-setting-text-input
          label="Label"
          icon="label"
          placeholder="Input label..."
          v-model="target.data.label"
        ></s-setting-text-input>

        <s-setting-text-input
          label="Placeholder"
          icon="format_color_text"
          placeholder="Sample of input..."
          v-model="target.data.placeholder"
        ></s-setting-text-input>

        <s-setting-text-input
          label="Message"
          icon="message"
          placeholder="A short message..."
          v-model="target.data.messages"
        ></s-setting-text-input>

        <s-setting-text-input
          label="Hint"
          icon="help"
          placeholder="A short help..."
          subtitle="It will appear when the user clicks on the input and focusing on it."
          v-model="target.data.hint"
        ></s-setting-text-input>
        <s-setting-switch
          v-model="target.data.hideDetails"
          label="Hide Details"
          icon="hide_source"
        ></s-setting-switch>
        <s-setting-switch
          v-model="target.data.persistentPlaceholder"
          label="Persistent Placeholder"
          icon="abc"
        ></s-setting-switch>

        <s-setting-switch
          v-model="target.data.singleLine"
          label="Single Line"
          icon="read_more"
        ></s-setting-switch>

        <s-setting-switch
          v-model="target.data.flat"
          label="Flat"
          icon="wb_shade"
        ></s-setting-switch>

        <s-setting-rounded v-model="target.data.rounded"></s-setting-rounded>

        <s-setting-variant v-model="target.data.variant"></s-setting-variant>

        <s-setting-group icon="opacity" title="Colors">
          <s-setting-color
            v-model="target.data.color"
            label="Color"
            icon="format_color_text"
            clearable
          ></s-setting-color>

          <s-setting-color
            v-model="target.data.backgroundColor"
            label="Background"
            icon="format_color_fill"
            clearable
          ></s-setting-color>
        </s-setting-group>
      </v-card-title>
    </v-card>
  </l-setting-navigation>
</template>

<script lang="ts">
import LEventsName from "../../mixins/events/name/LEventsName";
import { LUtilsHighlight } from "../../utils/highligh/LUtilsHighlight";
import { LMixinEvents } from "../../mixins/events/LMixinEvents";
import { EventBus } from "@selldone/components-vue/utils/events/EventBus.ts";
import SSettingSwitch from "@selldone/page-builder/styler/settings/switch/SSettingSwitch.vue";
import SSettingRounded from "@selldone/page-builder/styler/settings/rounded/SSettingRounded.vue";
import SSettingColor from "@selldone/page-builder/styler/settings/color/SSettingColor.vue";
import SSettingTextInput from "@selldone/page-builder/styler/settings/text-input/SSettingTextInput.vue";
import SSettingVariant from "@selldone/page-builder/styler/settings/variant/SSettingVariant.vue";
import SSettingGroup from "@selldone/page-builder/styler/settings/group/SSettingGroup.vue";
import { XInputTextObject } from "@selldone/page-builder/components/x/input/text/XInputTextObject.ts";
import LSettingNavigation from "@selldone/page-builder/settings/LSettingNavigation.vue";

export default {
  name: "LSettingsInput",
  mixins: [LMixinEvents],

  components: {
    LSettingNavigation,
    SSettingGroup,
    SSettingVariant,
    SSettingTextInput,
    SSettingColor,
    SSettingRounded,
    SSettingSwitch,
  },

  props: {},
  data: () => ({
    el: null,

    target: null as XInputTextObject | null,

    dialog: false,
    dialog_pre: false,
    options: null as { no_name: boolean } | null,

    //--------------------------
    key_listener_keydown: null,

    LOCK: false, // 🔐 Lock changes
  }),

  computed: {},
  watch: {
    dialog(dialog) {
      // Keep highlight active element:
      if (!dialog) LUtilsHighlight.RemoveAllElementFocusEditing();
      else if (this.el) LUtilsHighlight.Activate(this.el);
    },
  },
  created() {},
  mounted() {
    EventBus.$on(
      "show:LSettingsInput",

      ({ el, target, options }) => {
        this.CloseAllPageBuilderNavigationDrawerTools(); // Close all open tools.

        this.LOCK = true; // 🔒 Prevent update style and classes

        this.el = el;
        this.target = target;
        this.options = options;
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
    EventBus.$off("show:LSettingsInput");
    EventBus.$off(LEventsName.PAGE_BUILDER_CLOSE_TOOLS);

    //――――――――――――――――――――――  REMOVE key listener ――――――――――――――――――――
    document.removeEventListener("keydown", this.key_listener_keydown, true);
  },

  methods: {
    showDialog() {
      this.dialog_pre = false;
      this.$nextTick(() => {
        this.dialog_pre = true;
        this.dialog = true;
        this.LOCK = false; // 🔓 Now can update values
      });
    },

    //----------------------------------------------------------------------------
  },
};
</script>

<style lang="scss" scoped></style>
