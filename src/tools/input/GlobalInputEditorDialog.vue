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
      <!-- ████████████████████ Actions ████████████████████ -->

      <v-card-actions>
        <div class="widget-buttons">
          <v-btn variant="text" size="x-large" @click="dialog = false">
            <v-icon class="me-1">close</v-icon> {{ $t("global.actions.close") }}
          </v-btn>
        </div>
      </v-card-actions>

      <v-card-title>
        <s-widget-header title="Input" icon="input"></s-widget-header>
        <v-list-subheader
          >You can adjust the field property here to customize its
          appearance.</v-list-subheader
        >
        <feeder-input v-model="input" @change="onChange"> </feeder-input>
      </v-card-title>
    </v-card>
  </v-navigation-drawer>
</template>

<script>
import EventBusTriggers from "@core/enums/event-bus/EventBusTriggers";
import FeederInput from "@app-page-builder/src/feeders/FeederInput.vue";
import { HighlightEditingElements } from "@app-page-builder/src/helpers/HighlightEditingElements";

export default {
  name: "GlobalInputEditorDialog",
  components: { FeederInput },

  props: {},
  data: () => ({
    el: null,
    section: null,
    inputPath: null,
    input: null,

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
      if (!dialog) HighlightEditingElements.RemoveAllElementFocusEditing();
      else if (this.el) HighlightEditingElements.Activate(this.el);
    },
  },
  created() {},
  mounted() {
    this.EventBus.$on(
      "show:GlobalInputEditorDialog",

      ({ el, section, inputPath }) => {
        this.CloseAllPageBuilderNavigationDrawerTools(); // Close all open tools.

        this.LOCK = true; // 🔒 Prevent update style and classes

        this.el = el;
        this.section = section;
        this.inputPath = inputPath;
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
    this.EventBus.$on(EventBusTriggers.PAGE_BUILDER_CLOSE_TOOLS, () => {
      this.dialog = false;
    });
  },
  beforeUnmount() {
    this.EventBus.$off("show:GlobalInputEditorDialog");
    this.EventBus.$off(EventBusTriggers.PAGE_BUILDER_CLOSE_TOOLS);

    //――――――――――――――――――――――  REMOVE key listener ――――――――――――――――――――
    document.removeEventListener("keydown", this.key_listener_keydown, true);
  },

  methods: {
    showDialog() {
      this.input = this.section.get(this.inputPath);

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

      this.section?.set(this.inputPath, this.input); // Save data in section!
    },
  },
};
</script>

<style scoped lang="scss"></style>
