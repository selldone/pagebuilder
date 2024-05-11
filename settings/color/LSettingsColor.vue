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
    <v-card v-if="dialog">
      <!-- ████████████████████ Actions ████████████████████ -->

      <v-card-actions>
        <div class="widget-buttons">
          <v-btn size="x-large" variant="text" @click="setColor(null)">
            <v-icon class="me-1">close</v-icon>
            {{ $t("global.actions.clear") }}
          </v-btn>

          <v-btn size="x-large" variant="text" @click="dialog = false">
            <v-icon start>close</v-icon>
            {{ $t("global.actions.close") }}
          </v-btn>
        </div>
      </v-card-actions>

      <v-card-title></v-card-title>

      <v-card-text v-if="dialog_pre" class="text-start">
        <s-widget-header
          icon="palette"
          title="Color Selector"
        ></s-widget-header>
        <v-list-subheader></v-list-subheader>
        <v-color-picker
          v-model="color"
          class="mx-auto bg-transparent"
          mode="hexa"
          show-swatches
          @click.stop
        />
      </v-card-text>
    </v-card>
  </v-navigation-drawer>
</template>

<script>
import LEventsName from "@app-page-builder/mixins/events/name/LEventsName";
import { LUtilsHighlight } from "@app-page-builder/utils/highligh/LUtilsHighlight";
import _ from "lodash-es";
import { LMixinEvents } from "@app-page-builder/mixins/events/LMixinEvents";
import {EventBus} from "@selldone/core-js/events/EventBus";

export default {
  name: "LSettingsColor",
  mixins: [LMixinEvents],

  components: {},

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
      if (!dialog) LUtilsHighlight.RemoveAllElementFocusEditing();
      else if (this.element) LUtilsHighlight.Activate(this.element);
    },
  },
  created() {},
  mounted() {
    EventBus.$on(
      "show:LSettingsColor",

      ({ element, color, callback, alpha }) => {
        this.CloseAllPageBuilderNavigationDrawerTools(); // Close all open tools.

        //console.log("Initial color", color);
        this.element = element;

        this.color = color;
        this.callback = callback;
        this.alpha = alpha;
        this.showColorDialog();
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
    EventBus.$off("show:LSettingsColor");

    EventBus.$off(LEventsName.PAGE_BUILDER_CLOSE_TOOLS);

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
                "#$1$1$2$2$3$3",
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

<style lang="scss" scoped></style>
