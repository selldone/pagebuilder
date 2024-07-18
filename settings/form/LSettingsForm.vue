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
    v-model="dialog"
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
          icon="integration_instructions"
          title="Form"
          subtitle="Here set the endpoint and method of the form."
        ></s-setting-group>

        <s-setting-toggle
          v-model="url_mode"
          :items="[
            {
              title: 'Newsletter',
              value:
                XFormObjectDataTypes.SOURCE.SELLDONE_STREAM_NEWSLETTER_ENDPOINT,
              icon: 'email',
            },
            { title: 'Custom', value: 'custom', icon: 'link' },
          ]"
          label="Method"
          icon="upload_file"
          @update:model-value="
            (v) => {
              if (v !== 'custom') target.data.url = v;
              else target.data.url = null;
            }
          "
        ></s-setting-toggle>

        <s-setting-toggle
          :disabled="url_mode !== 'custom'"
          v-model="target.data.method"
          :items="['POST', 'GET']"
          label="Method"
          icon="upload_file"
        ></s-setting-toggle>

        <s-setting-text-input
          :disabled="url_mode !== 'custom'"
          v-model="target.data.url"
          label="Url"
          icon="link"
          placeholder="e.g. https://xapi.selldone.com/@{shop_name}/... "
          subtitle="You can set {shop_name} and {shop_id} as dynamic values."
        ></s-setting-text-input>

        <s-setting-group
          icon="data_object"
          title="Hidden Parameters"
          subtitle="You can add hidden parameters to the form."
        >
          <template v-slot:title-action>
            <s-setting-button
              label="Add Hidden Param"
              icon="add_box"
              @click="
                target.data.hidden.push({ type: 'string', key: '', value: '' })
              "
            >
            </s-setting-button>
          </template>
          <div class="border-between-vertical">
            <v-row v-for="it in target.data.hidden" dense>
              <v-col cols="3">
                <v-select
                  v-model="it.type"
                  :items="['string', 'boolean', 'number', 'array']"
                  variant="outlined"
                  density="compact"
                  rounded="lg"
                  class="v-input-small"
                  hide-details
                ></v-select>
              </v-col>
              <v-col cols="4">
                <v-text-field
                  v-model="it.key"
                  variant="outlined"
                  density="compact"
                  class="v-input-small"
                  rounded="lg"
                  placeholder="Key..."
                  hide-details
                ></v-text-field>
              </v-col>
              <v-col cols="4">
                <v-text-field
                  v-if="it.type === 'string'"
                  v-model="it.value"
                  variant="outlined"
                  density="compact"
                  class="v-input-small"
                  rounded="lg"
                  placeholder="Value..."
                  hide-details
                ></v-text-field>
                <v-number-input
                  v-else-if="it.type === 'number'"
                  v-model="it.value"
                  variant="outlined"
                  density="compact"
                  class="v-input-small"
                  rounded="lg"
                  placeholder="Value..."
                  hide-details
                ></v-number-input>
                <v-checkbox
                  v-else-if="it.type === 'boolean'"
                  v-model="it.value"
                  class="v-input-small"
                  hide-details
                ></v-checkbox>

                <v-combobox
                  v-else-if="it.type === 'array'"
                  v-model="it.value"
                  variant="outlined"
                  density="compact"
                  class="v-input-small"
                  rounded="lg"
                  placeholder="Value..."
                  hide-details
                  chips
                  multiple
                  closable-chips
                ></v-combobox>
              </v-col>
              <v-col cols="1">
                <v-btn color="red" variant="text" icon size="24" @click="target.data.hidden.remove(it)">
                  <v-icon size="20">close</v-icon>
                </v-btn>
              </v-col>
            </v-row>
          </div>
        </s-setting-group>

        <s-setting-group
          class="mt-5"
          title="Success Message"
          subtitle="Set the message that will be displayed after the form is successfully submitted."
          icon="integration_instructions"
        >
          <s-setting-text-input
            v-model="target.data.success.title"
            label="Title"
            icon="title"
            placeholder="Title..."
          ></s-setting-text-input>

          <s-setting-text-input
            v-model="target.data.success.message"
            label="Message"
            icon="message"
            placeholder="Message..."
          ></s-setting-text-input>
        </s-setting-group>
      </v-card-title>
    </v-card>
  </v-navigation-drawer>
</template>

<script lang="ts">
import LEventsName from "../../mixins/events/name/LEventsName";
import { LUtilsHighlight } from "../../utils/highligh/LUtilsHighlight";
import { LMixinEvents } from "../../mixins/events/LMixinEvents";
import { EventBus } from "@selldone/core-js/events/EventBus";
import SSettingGroup from "@selldone/page-builder/styler/settings/group/SSettingGroup.vue";
import { XInputTextObject } from "@selldone/page-builder/components/x/input/text/XInputTextObject.ts";
import SSettingToggle from "@selldone/page-builder/styler/settings/toggle/SSettingToggle.vue";
import SSettingTextInput from "@selldone/page-builder/styler/settings/text-input/SSettingTextInput.vue";
import SSettingButton from "@selldone/page-builder/styler/settings/button/SSettingButton.vue";
import { XFormObjectDataTypes } from "@selldone/page-builder/components/x/form/XFormObjectData.ts";

export default {
  name: "LSettingsForm",
  mixins: [LMixinEvents],

  components: {
    SSettingButton,
    SSettingTextInput,
    SSettingToggle,
    SSettingGroup,
  },

  props: {},
  data: () => ({
    el: null,

    target: null as XInputTextObject | null,

    dialog: false,
    dialog_pre: false,

    url_mode: null,
    //--------------------------
    key_listener_keydown: null,

    LOCK: false, // 🔐 Lock changes
  }),

  computed: {
    XFormObjectDataTypes() {
      return XFormObjectDataTypes;
    },
  },
  watch: {
    dialog(dialog) {
      // Keep highlight active element:
      if (!dialog) LUtilsHighlight.RemoveAllElementFocusEditing();
      else if (this.el) LUtilsHighlight.Activate(this.el);
    },
    "target.data.url"(url) {
      if (XFormObjectDataTypes.SOURCE[url]) {
        this.url_mode = url;
      } else {
        this.url_mode = "custom";
      }
    },
  },
  created() {},
  mounted() {
    EventBus.$on(
      "show:LSettingsForm",

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
    EventBus.$off("show:LSettingsForm");
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
