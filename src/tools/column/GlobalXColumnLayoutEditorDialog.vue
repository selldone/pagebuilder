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
    stateless
    right
    v-if="column"
    v-model="show_edit_layout"
    fixed
    :width="
      $vuetify.breakpoint.xl ? 560 : $vuetify.breakpoint.lgAndUp ? 420 : 320
    "
    hide-overlay
    color="#1e1e1e"
    dark
    class="x-page-builder-options-slider"
  >
    <v-card flat class="text-start">
      <v-card-actions>
        <div class="widget-buttons">
          <v-btn text @click="show_edit_layout = false" x-large>
            <v-icon class="me-1">close</v-icon
            >{{ $t("global.actions.close") }}</v-btn
          >
        </div>
      </v-card-actions>

      <v-card-text>
        <s-widget-header
          title="Column Layout"
          icon="auto_awesome_motion"
        ></s-widget-header>

        <v-subheader>
          Choose your preferred column layout from the options provided in the
          list below.
        </v-subheader>

        <v-slide-group class="py-5" show-arrows>
          <v-slide-item v-for="item in LAYOUTS" :key="item">
            <v-card
              class="ma-4"
              height="160"
              width="100"
              @click="selectLayout(item)"
              outlined
              rounded="lg"
              color="#285c94"
              :style="column.layout === item ? 'border: solid 2px #fff;' : ''"
              style="font-size: 80%"
            >
              <div
                :class="item"
                class="position-relative small text-start pa-2"
              >
                <h3 v-if="item === 'x-layout-middle'">Title...</h3>

                <div
                  v-if="
                    ![
                      'x-layout-title-content',
                      'x-layout-content-title',
                    ].includes(item)
                  "
                  style="
                    height: 70px;
                    min-width: 25px;
                    background: #8097b4;
                    position: relative;
                    margin-bottom: 8px;
                    border-radius: 8px;
                  "
                  class="--image"
                >
                  <v-icon color="#225082" class="center-absolute"
                    >crop_original</v-icon
                  >
                </div>
                <div class="--contents">
                  <h3 v-if="item !== 'x-layout-middle'">Title...</h3>
                  <p class="m-0">Content...</p>
                </div>
              </div>
            </v-card>
          </v-slide-item>
        </v-slide-group>

        <v-subheader>
          You can customize the column style by selecting from the provided
          classes.
        </v-subheader>

        <v-combobox
          chips
          multiple
          v-model="column.classes"
          :items="standard_classes"
          small-chips
          deletable-chips
          clearable
          cache-items
          label="Classes"
          class="mx-3"
        >
        </v-combobox>

        <s-widget-header icon="smart_button" title="Call To Action" class="my-5">
          <v-subheader>
            You can place a button at the edge of the view and assign a URL to
            it.
          </v-subheader>
        </s-widget-header>
        <s-smart-toggle
          true-title="Has Button"
          true-description="Add a call to action button to the column."
          v-model="has_button"
          dark
          class="my-3"
          true-icon="call_to_action"
        >
        </s-smart-toggle>
      </v-card-text>
    </v-card>
  </v-navigation-drawer>
</template>

<script>
import EventBusTriggers from "@core/enums/event-bus/EventBusTriggers";
import HighlightEditingElements from "@app-page-builder/src/helpers/HighlightEditingElements";

import { ClassesHelper } from "@core/helper/style/Classes";
import SSmartToggle from "@components/smart/SSmartToggle.vue";
import Seeder from "@app-page-builder/src/seeder";
import * as Types from "@app-page-builder/src/types";

const LAYOUTS = [
  "x-layout-normal", // Column | Image + Title + Content
  "x-layout-overlay-top", // Image + Column of Title Content inside image
  "x-layout-overlay-center",
  "x-layout-overlay-bottom",
  "x-layout-image",
  "x-layout-reverse",
  "x-layout-row",
  "x-layout-row-reverse",
  "x-layout-middle", // Title Image Content
  "x-layout-title-content", //Title Content (no image)
  "x-layout-content-title", // Content Title (no image)
];

export default {
  name: "GlobalXColumnLayoutEditorDialog",
  components: { SSmartToggle },

  props: {},
  data: () => ({
    LAYOUTS: LAYOUTS,
    standard_classes: ClassesHelper.StandardClasses(),

    el: null,
    section: null,
    columnPath: null,

    //----------------------- Bg image -----------------------
    show_edit_layout: false,
    dialog_pre: false,

    column: null,
    has_button: false,

    //--------------------------
    key_listener_keydown: null,

    LOCK: false, // 🔐 Lock changes
  }),

  computed: {},
  watch: {
    show_edit_layout(dialog) {
      // Keep highlight active element:
      if (!dialog) HighlightEditingElements.RemoveAllElementFocusEditing();
      else if (this.el) HighlightEditingElements.Activate(this.el);
    },

    lock(lock) {
      this.section.lock = lock;
      this.refresh();
    },

    has_button(has) {
      if (has) {
        this.column.button = Seeder.seed(Types.Button);
      } else {
        this.column.button = null;
      }
    },
  },
  created() {},
  mounted() {
    this.EventBus.$on(
      "show:GlobalXColumnLayoutEditorDialog",

      ({ el, section, gridPath }) => {
        this.CloseAllPageBuilderNavigationDrawerTools(); // Close all open tools.

        this.LOCK = true; // 🔒 Prevent update style and classes

        this.el = el;
        this.section = section;
        this.columnPath = gridPath.substring(0, gridPath.lastIndexOf(".")); // Because it shows on grid styler and we have a .grid in the path that we should back to high level object.
        this.showDialog();
      }
    );

    //――――――――――――――――――――――  START Editor key listener ――――――――――――――――――――
    this.key_listener_keydown = (event) => {
      // Scape:
      let isEscape =
        event.key === "Escape" || event.key === "Esc" || event.keyCode === 27;

      if (isEscape) {
        if (this.show_edit_layout) {
          // Close tools
          this.show_edit_layout = false;
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
      this.show_edit_layout = false;
    });
  },
  beforeDestroy() {
    this.EventBus.$off("show:GlobalXColumnLayoutEditorDialog");
    this.EventBus.$off(EventBusTriggers.PAGE_BUILDER_CLOSE_TOOLS);

    //――――――――――――――――――――――  REMOVE key listener ――――――――――――――――――――
    document.removeEventListener("keydown", this.key_listener_keydown, true);
  },

  methods: {
    showDialog() {
      this.column = this.section.get(this.columnPath);
      this.has_button = !!this.column.button;

      this.dialog_pre = false;
      this.$nextTick(() => {
        this.dialog_pre = true;
        this.show_edit_layout = true;
        this.LOCK = false; // 🔓 Now can update values
      });
    },
    //----------------------------------------------------------------------------

    selectLayout(layout) {
      if (!this.show_edit_layout || this.LOCK) return;

      this.column.layout = layout;
      this.section?.set(this.columnPath, this.column);
    },
  },
};
</script>

<style scoped lang="scss"></style>
