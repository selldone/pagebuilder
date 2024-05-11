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
    <v-card class="text-start" flat>
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
        <s-widget-header icon="input" title="Input"></s-widget-header>
        <v-list-subheader
          >You can adjust the field property here to customize its appearance.
        </v-list-subheader>
        <l-feeder-input v-model="target" @change="onChange"></l-feeder-input>
      </v-card-title>
    </v-card>
  </v-navigation-drawer>
</template>

<script>
import LEventsName from "@app-page-builder/mixins/events/name/LEventsName";
import LFeederInput from "@app-page-builder/components/feeder/input/LFeederInput.vue";
import { LUtilsHighlight } from "@app-page-builder/utils/highligh/LUtilsHighlight";
import { LMixinEvents } from "@app-page-builder/mixins/events/LMixinEvents";
import {EventBus} from "@selldone/core-js/events/EventBus";

export default {
  name: "LSettingsInput",
  mixins: [LMixinEvents],

  components: { LFeederInput },

  props: {},
  data: () => ({
    el: null,

    target: null,

    dialog: false,
    dialog_pre: false,

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
    onChange() {
      if (!this.dialog || this.LOCK) return;
    },
  },
};
</script>

<style lang="scss" scoped></style>
