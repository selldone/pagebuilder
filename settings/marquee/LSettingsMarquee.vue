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
          <v-expansion-panel>
            <v-expansion-panel-title>
              <div>
                <div>
                  <v-icon class="me-1">article</v-icon>
                  Text / Html
                </div>
              </div>
            </v-expansion-panel-title>
            <v-expansion-panel-text>
              <v-list-subheader
                >The content, in text or HTML, you wish to display.
              </v-list-subheader>

              <v-textarea
                v-model="target.data.html"
                placeholder="Write a text or html code here..."
                variant="outlined"
              >
              </v-textarea>
            </v-expansion-panel-text>
          </v-expansion-panel>

          <!-- ████████████████████ Appearance ████████████████████ -->
          <v-expansion-panel>
            <v-expansion-panel-title>
              <div>
                <div>
                  <v-icon class="me-1">brush</v-icon>
                  Appearance
                </div>
              </div>
            </v-expansion-panel-title>
            <v-expansion-panel-text>
              <v-list-subheader>Customize text style.</v-list-subheader>

              <!-- ▅▅▅▅▅▅▅▅▅▅▅▅▅▅▅▅ Font Color ▅▅▅▅▅▅▅▅▅▅▅▅▅▅▅▅ -->

              <u-color-selector
                v-model="target.style.color"
                class="my-3"
                title="Font Color"
              ></u-color-selector>

              <!-- ▅▅▅▅▅▅▅▅▅▅▅▅▅▅▅▅ Font Size ▅▅▅▅▅▅▅▅▅▅▅▅▅▅▅▅ -->

              <u-dimension-input
                v-model="target.style.fontSize"
                class="my-3"
                label="Font Size"
              ></u-dimension-input>

              <!-- ▅▅▅▅▅▅▅▅▅▅▅▅▅▅▅▅ Height ▅▅▅▅▅▅▅▅▅▅▅▅▅▅▅▅ -->

              <u-dimension-input
                v-model="target.style.height"
                class="my-3"
                label="Height"
              ></u-dimension-input>

              <!-- ▅▅▅▅▅▅▅▅▅▅▅▅▅▅▅▅ Repeat ▅▅▅▅▅▅▅▅▅▅▅▅▅▅▅▅ -->

              <u-number-input
                v-model="target.data.space"
                class="my-3"
                :min="1"
                label="Space"
                placeholder="Default is 200"
                variant="underlined"
                messages="Distance between items in pixels."
              ></u-number-input>
            </v-expansion-panel-text>
          </v-expansion-panel>

          <!-- ████████████████████ Appearance ████████████████████ -->
          <v-expansion-panel>
            <v-expansion-panel-title>
              <div>
                <div>
                  <v-icon class="me-1">animation</v-icon>
                  Animation
                </div>
              </div>
            </v-expansion-panel-title>
            <v-expansion-panel-text>
              <v-list-subheader>Customize text animation.</v-list-subheader>

              <!-- ▅▅▅▅▅▅▅▅▅▅▅▅▅▅▅▅ Duration ▅▅▅▅▅▅▅▅▅▅▅▅▅▅▅▅ -->

              <v-text-field
                v-model="target.data.duration"
                class="my-3"
                label="Duration"
                placeholder="ex. 10s or 10000ms"
                variant="underlined"
              ></v-text-field>

              <!-- ▅▅▅▅▅▅▅▅▅▅▅▅▅▅▅▅ Repeat ▅▅▅▅▅▅▅▅▅▅▅▅▅▅▅▅ -->

              <u-number-input
                v-model="target.data.repeat"
                class="my-3"
                :min="1"
                label="Repeat Count"
                placeholder="Default is 10"
                variant="underlined"
              ></u-number-input>

              <!-- ▅▅▅▅▅▅▅▅▅▅▅▅▅▅▅▅ Reverse ▅▅▅▅▅▅▅▅▅▅▅▅▅▅▅▅ -->

              <u-smart-toggle
                v-model="target.data.reverse"
                class="my-3"
                true-title="Reverse Animation"
              ></u-smart-toggle>
            </v-expansion-panel-text>
          </v-expansion-panel>
        </v-expansion-panels>
      </v-card-text>
    </v-card>
  </v-navigation-drawer>
</template>

<script>
import LEventsName from "../../mixins/events/name/LEventsName";
import UDimensionInput from "@selldone/components-vue/ui/dimension/input/UDimensionInput.vue";
import UColorSelector from "@selldone/components-vue/ui/color/selector/UColorSelector.vue";
import USmartToggle from "@selldone/components-vue/ui/smart/toggle/USmartToggle.vue";
import _ from "lodash-es";
import { LMixinEvents } from "../../mixins/events/LMixinEvents";
import { EventBus } from "@selldone/core-js/events/EventBus";
import UNumberInput from "@selldone/components-vue/ui/number/input/UNumberInput.vue";
import {XMarqueeObject} from "@selldone/page-builder/components/x/marquee/XMarqueeObject.ts";

export default {
  name: "LSettingsMarquee",
  mixins: [LMixinEvents],

  components: {
    UNumberInput,
    USmartToggle,
    UColorSelector,
    UDimensionInput,
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

  computed: {},
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
      if(!(this.target instanceof XMarqueeObject)){
        console.error("Target is not an instance of XMarqueeObject")
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
