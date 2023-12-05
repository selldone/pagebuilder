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
    right
    fixed
    :width="
      $vuetify.breakpoint.xl
        ? 560
        : $vuetify.breakpoint.lgAndUp
        ? 420
        : 320
    "
    stateless
    hide-overlay
    color="#1e1e1e"
    class="x-page-builder-options-slider"
  >
    <v-card v-if="dialog">
      <!-- ████████████████████ Actions ████████████████████ -->

      <v-card-actions>
        <div class="widget-buttons">
          <v-btn @click="setColor(null)" text x-large
            ><v-icon class="me-1">close</v-icon
            >{{ $t("global.actions.clear") }}</v-btn
          >

          <v-btn text x-large @click="dialog = false">
            <v-icon class="me-1">close</v-icon> {{ $t("global.actions.close") }}
          </v-btn>
        </div>
      </v-card-actions>

      <v-card-title> </v-card-title>

      <v-card-text v-if="dialog_pre" class="text-start">
        <s-widget-header title="Color Selector" icon="palette"></s-widget-header>
        <v-subheader></v-subheader>
        <v-color-picker
          @click.stop
          v-model="color"
          class="mx-auto bg-transparent"
          show-swatches
          mode="hexa"
        />
      </v-card-text>
    </v-card>
  </v-navigation-drawer>
</template>

<script>
import EventBusTriggers from "@core/enums/event-bus/EventBusTriggers";
import HighlightEditingElements from "@app-page-builder/src/helpers/HighlightEditingElements";
import _ from "lodash-es";

export default {
  name: "GlobalColorSelectorDialog",
  components: {  },

  props: {},
  data: () => ({
    element: null,

    color: null,
    callback: null,
    alpha: true,

    //----------------------- Bg image -----------------------
    dialog: false,
    dialog_pre: false,

    key_listener_keydown: null,
  }),

  computed: {},
  watch: {
    color() {
      this.setColorDebounced();
    },
    dialog(dialog) {
      // Keep highlight active element:
      if (!dialog) HighlightEditingElements.RemoveAllElementFocusEditing();
      else if (this.element) HighlightEditingElements.Activate(this.element);
    },
  },
  created() {},
  mounted() {
    this.EventBus.$on(
      "show:GlobalColorSelectorDialog",

      ({ element, color, callback, alpha }) => {
        this.CloseAllPageBuilderNavigationDrawerTools(); // Close all open tools.

        //console.log("Initial color", color);
        this.element = element;

        this.color = color;
        this.callback = callback;
        this.alpha = alpha;
        this.showColorDialog();
      }
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
  beforeDestroy() {
    this.EventBus.$off("show:GlobalColorSelectorDialog");

    this.EventBus.$off(EventBusTriggers.PAGE_BUILDER_CLOSE_TOOLS);

    //――――――――――――――――――――――  REMOVE key listener ――――――――――――――――――――
    document.removeEventListener("keydown", this.key_listener_keydown, true);

    //  document.removeEventListener('mousedown', this.preventSelectionClear);
  },

  methods: {
    /*
      preventSelectionClear(event) {

              event.preventDefault();

      },*/

    showColorDialog() {
      //console.log('this.alpha',this.alpha)
      let color = this.color;

      if (color) {
        if (!color.startsWith("#")) {
          color = null;
        } else {
          if (this.alpha) {
            if (color.length === 4) {
              color = color.replaceAll(
                "#([0-9a-fA-F])([0-9a-fA-F])([0-9a-fA-F])",
                "#$1$1$2$2$3$3"
              );
            } else if (color.length === 7) {
              color = color + "ff";
            } else if (color.length !== 9) {
              color = null;
            }
          } else {
            if (color.length > 7) {
              color = color.substring(0, 7);
            }
          }
        }
      }

      this.color = color;

      this.dialog_pre = false;
      this.$nextTick(() => {
        this.dialog_pre = true;
        this.dialog = true;
        this.LOCK = false; // 🔓 Now can update values
      });
    },

    //----------------------------------------------------------------------------
    setColorDebounced: _.debounce(function () {
      // console.log("Update color", this.color);
      this.setColor(this.color);
    }, 100),

    setColor(color) {
      if (!this.dialog || this.LOCK) return;

      if (!this.callback) return;

      if (!color) this.callback(null);
      if (this.isObject(color)) {
        color = color.hexa;
      }

      if (color && !this.alpha) {
        if (color.length > 7) {
          color = color.substring(0, 7);
        }
      }

      this.callback(color);
    },
  },
};
</script>

<style scoped lang="scss"></style>
