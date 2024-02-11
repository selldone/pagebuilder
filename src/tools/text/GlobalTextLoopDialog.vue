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
    <v-card flat class="text-start">
      <v-card-actions>
        <div class="widget-buttons">
          <v-btn variant="text" @click="dialog = false" size="x-large">
            <v-icon class="me-1">close</v-icon
            >{{ $t("global.actions.close") }}</v-btn
          >
        </div>
      </v-card-actions>

      <v-card-text>
        <v-expansion-panels flat v-model="tab">
          <!-- ████████████████████ Sort ████████████████████ -->
          <v-expansion-panel>
            <v-expansion-panel-title>
              <div>
                <div><v-icon class="me-1">article</v-icon> Text / Html</div>
              </div>
            </v-expansion-panel-title>
            <v-expansion-panel-text>
              <v-list-subheader
                >The content, in text or HTML, you wish to
                display.</v-list-subheader
              >

              <v-textarea
                v-model="text_loop.html"
                placeholder="Write a text or html code here..."
              >
              </v-textarea>
            </v-expansion-panel-text>
          </v-expansion-panel>

          <!-- ████████████████████ Appearance ████████████████████ -->
          <v-expansion-panel>
            <v-expansion-panel-title>
              <div>
                <div><v-icon class="me-1">brush</v-icon> Appearance</div>
              </div>
            </v-expansion-panel-title>
            <v-expansion-panel-text>
              <v-list-subheader>Customize text style.</v-list-subheader>

              <!-- ▅▅▅▅▅▅▅▅▅▅▅▅▅▅▅▅ Font Size ▅▅▅▅▅▅▅▅▅▅▅▅▅▅▅▅ -->

              <s-number-dimension-input
                class="my-3"
                v-model="text_loop.font_size"
                label="Font Size"
              ></s-number-dimension-input>

              <!-- ▅▅▅▅▅▅▅▅▅▅▅▅▅▅▅▅ Font Color ▅▅▅▅▅▅▅▅▅▅▅▅▅▅▅▅ -->

              <s-color-selector
                class="my-3"
                v-model="text_loop.font_color"
                title="Font Color"
              ></s-color-selector>

              <!-- ▅▅▅▅▅▅▅▅▅▅▅▅▅▅▅▅ Height ▅▅▅▅▅▅▅▅▅▅▅▅▅▅▅▅ -->

              <s-number-dimension-input
                class="my-3"
                v-model="text_loop.height"
                label="Height"
              ></s-number-dimension-input>
            </v-expansion-panel-text>
          </v-expansion-panel>

          <!-- ████████████████████ Appearance ████████████████████ -->
          <v-expansion-panel>
            <v-expansion-panel-title>
              <div>
                <div><v-icon class="me-1">animation</v-icon> Animation</div>
              </div>
            </v-expansion-panel-title>
            <v-expansion-panel-text>
              <v-list-subheader>Customize text animation.</v-list-subheader>

              <!-- ▅▅▅▅▅▅▅▅▅▅▅▅▅▅▅▅ Duration ▅▅▅▅▅▅▅▅▅▅▅▅▅▅▅▅ -->

              <v-text-field
                class="my-3"
                v-model="text_loop.duration"
                label="Duration"
                placeholder="ex. 10s or 10000ms"
              ></v-text-field>

              <!-- ▅▅▅▅▅▅▅▅▅▅▅▅▅▅▅▅ Reverse ▅▅▅▅▅▅▅▅▅▅▅▅▅▅▅▅ -->

              <s-smart-toggle
                class="my-3"
                v-model="text_loop.reverse"
                true-title="Reverse animation"
              ></s-smart-toggle>
            </v-expansion-panel-text>
          </v-expansion-panel>
        </v-expansion-panels>
      </v-card-text>
    </v-card>
  </v-navigation-drawer>
</template>

<script>
import EventBusTriggers from "@core/enums/event-bus/EventBusTriggers";
import SNumberDimensionInput from "@components/ui/dimension/SNumberDimensionInput.vue";
import SColorSelector from "@components/ui/color/selector/SColorSelector.vue";
import SSmartToggle from "@components/smart/SSmartToggle.vue";
import _ from "lodash-es";
export default {
  name: "GlobalTextLoopDialog",
  components: {
    SSmartToggle,
    SColorSelector,
    SNumberDimensionInput,
  },

  props: {},
  data: () => ({
    tab: null,

    el: null,
    section: null,
    path: null, // $sectionData.products

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
    this.EventBus.$on(
      "show:GlobalTextLoopDialog",

      ({ el, section, path }) => {
        this.CloseAllPageBuilderNavigationDrawerTools(); // Close all open tools.

        this.LOCK = true; // 🔒 Prevent update style and classes

        this.el = el;
        this.section = section;
        this.path = path;
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
    this.EventBus.$off("show:GlobalTextLoopDialog");

    this.EventBus.$off(EventBusTriggers.PAGE_BUILDER_CLOSE_TOOLS);

    //――――――――――――――――――――――  REMOVE key listener ――――――――――――――――――――
    document.removeEventListener("keydown", this.key_listener_keydown, true);
  },

  methods: {
    showDialog() {
      this.text_loop = this.section.get(this.path);

      if (!this.isObject(this.text_loop)) {
        this.text_loop = {
          html: "Write some text here...",
          height: "24px",
          duration: "10s",
          color: null,
        };
      }

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

      this.section?.set(this.path, Object.assign({}, this.text_loop)); // Save data in section!

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

<style scoped lang="scss"></style>
