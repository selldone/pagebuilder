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
                v-model="text_loop.html"
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
                v-model="text_loop.font_color"
                class="my-3"
                title="Font Color"
              ></u-color-selector>

              <!-- ▅▅▅▅▅▅▅▅▅▅▅▅▅▅▅▅ Font Size ▅▅▅▅▅▅▅▅▅▅▅▅▅▅▅▅ -->

              <u-dimension-input
                v-model="text_loop.font_size"
                class="my-3"
                label="Font Size"
              ></u-dimension-input>

              <!-- ▅▅▅▅▅▅▅▅▅▅▅▅▅▅▅▅ Height ▅▅▅▅▅▅▅▅▅▅▅▅▅▅▅▅ -->

              <u-dimension-input
                v-model="text_loop.height"
                class="my-3"
                label="Height"
              ></u-dimension-input>


              <!-- ▅▅▅▅▅▅▅▅▅▅▅▅▅▅▅▅ Repeat ▅▅▅▅▅▅▅▅▅▅▅▅▅▅▅▅ -->

              <u-number-input
                  v-model="text_loop.space"
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
                v-model="text_loop.duration"
                class="my-3"
                label="Duration"
                placeholder="ex. 10s or 10000ms"
                variant="underlined"
              ></v-text-field>

              <!-- ▅▅▅▅▅▅▅▅▅▅▅▅▅▅▅▅ Repeat ▅▅▅▅▅▅▅▅▅▅▅▅▅▅▅▅ -->

              <u-number-input
                v-model="text_loop.repeat"
                class="my-3"
                :min="1"
                label="Repeat Count"
                placeholder="Default is 10"
                variant="underlined"
              ></u-number-input>

              <!-- ▅▅▅▅▅▅▅▅▅▅▅▅▅▅▅▅ Reverse ▅▅▅▅▅▅▅▅▅▅▅▅▅▅▅▅ -->

              <u-smart-toggle
                v-model="text_loop.reverse"
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
    keyMarquee: null, // ex. text_loop

    dialog: false,

    text_loop: {},

    //--------------------------
    key_listener_keydown: null,

    LOCK: false, // 🔐 Lock changes
  }),

  computed: {},
  watch: {
    text_loop: {
      handler() {
        this.onAcceptDebounced();
      },
      deep: true,
    },
  },
  created() {},
  mounted() {
    EventBus.$on(
      "show:LSettingsMarquee",

      ({ el, target, keyMarquee }) => {
        this.CloseAllPageBuilderNavigationDrawerTools(); // Close all open tools.

        this.LOCK = true; // 🔒 Prevent update style and classes

        this.el = el;
        this.target = target;
        this.keyMarquee = keyMarquee;
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
      this.text_loop = this.target[this.keyMarquee];

      if (!this.isObject(this.text_loop)) {
        this.text_loop = {
          html: "Write some text here...",
          height: "24px",
          duration: "10s",
          color: null,
        };
      }

      // Load default values:
      if(!this.text_loop.space)this.text_loop.space=200;
      if(!this.text_loop.repeat)this.text_loop.repeat=10;

      this.dialog = true;
      this.$nextTick(() => {
        this.LOCK = false; // 🔓 Now can update values
      });
    },

    //----------------------------------------------------------------------------
    onAcceptDebounced: _.debounce(function () {
      this.onAccept(false);
    }, 3000),

    onAccept() {
      if (!this.dialog || this.LOCK) return;

      this.target = Object.assign({}, this.text_loop); // Save data in section!

      if (this.text_loop.height)
        this.el.style.setProperty("--height", this.text_loop.height);

      if (this.text_loop.font_size)
        this.el.style.setProperty("--font-size", this.text_loop.font_size);

      if (this.text_loop.font_color)
        this.el.style.setProperty("--font-color", this.text_loop.font_color);

      /// this.dialog = false;
    },
  },
};
</script>

<style lang="scss" scoped></style>
