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
    v-if="target"
    v-model="show_edit_layout"
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
          <v-btn
            size="x-large"
            variant="text"
            @click="show_edit_layout = false"
          >
            <v-icon class="me-1">close</v-icon>
            {{ $t("global.actions.close") }}
          </v-btn>
        </div>
      </v-card-actions>

      <v-card-text>
        <s-widget-header
          icon="auto_awesome_motion"
          title="Column Layout"
        ></s-widget-header>

        <v-list-subheader>
          Choose your preferred column layout from the options provided in the
          list below.
        </v-list-subheader>

        <v-slide-group class="py-5" show-arrows>
          <v-slide-group-item v-for="item in LAYOUTS" :key="item">
            <v-card
              :style="target.layout === item ? 'border: solid 2px #fff;' : ''"
              class="ma-4"
              color="#285c94"
              height="160"
              rounded="lg"
              style="font-size: 80%"
              variant="outlined"
              width="100"
              @click="selectLayout(item)"
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
                  class="--image"
                  style="
                    height: 70px;
                    min-width: 25px;
                    background: #8097b4;
                    position: relative;
                    margin-bottom: 8px;
                    border-radius: 8px;
                  "
                >
                  <v-icon class="center-absolute" color="#225082"
                    >crop_original
                  </v-icon>
                </div>
                <div class="--contents">
                  <h3 v-if="item !== 'x-layout-middle'">Title...</h3>
                  <p class="m-0">Content...</p>
                </div>
              </div>
            </v-card>
          </v-slide-group-item>
        </v-slide-group>

        <v-list-subheader>
          You can customize the column style by selecting from the provided
          classes.
        </v-list-subheader>

        <v-combobox
          v-model="target.classes"
          :items="standard_classes"
          chips
          class="mx-3"
          clearable
          closable-chips
          label="Classes"
          multiple
          variant="underlined"
        >
        </v-combobox>

        <s-widget-header
          class="my-5"
          icon="smart_button"
          title="Call To Action"
        >
          <v-list-subheader>
            You can place a button at the edge of the view and assign a URL to
            it.
          </v-list-subheader>
        </s-widget-header>
        <s-smart-toggle
          v-model="has_button"
          class="my-3"
          dark
          true-description="Add a call to action button to the column."
          true-icon="call_to_action"
          true-title="Has Button"
        >
        </s-smart-toggle>
      </v-card-text>
    </v-card>
  </v-navigation-drawer>
</template>

<script>
import LEventsName from "@app-page-builder/mixins/events/name/LEventsName";
import { LUtilsHighlight } from "@app-page-builder/utils/highligh/LUtilsHighlight";

import { LUtilsClasses } from "@app-page-builder/utils/classes/LUtilsClasses";
import SSmartToggle from "@components/ui/smart/SSmartToggle.vue";
import { LUtilsSeeder } from "@app-page-builder/utils/seeder/LUtilsSeeder";
import * as Types from "@app-page-builder/src/types/types";
import { LMixinEvents } from "@app-page-builder/mixins/events/LMixinEvents";
import {EventBus} from "@core/events/EventBus";

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
  name: "LSettingsColumn",
  mixins: [LMixinEvents],

  components: { SSmartToggle },

  props: {},
  data: () => ({
    LAYOUTS: LAYOUTS,
    standard_classes: LUtilsClasses.StandardClasses(),

    el: null,
    target: null,

    //----------------------- Bg image -----------------------
    show_edit_layout: false,
    dialog_pre: false,

    has_button: false,

    //--------------------------
    key_listener_keydown: null,

    LOCK: false, // 🔐 Lock changes
  }),

  computed: {},
  watch: {
    show_edit_layout(dialog) {
      // Keep highlight active element:
      if (!dialog) LUtilsHighlight.RemoveAllElementFocusEditing();
      else if (this.el) LUtilsHighlight.Activate(this.el);
    },

    lock(lock) {
      this.section.lock = lock;
      this.refresh();
    },

    has_button(has) {
      if (has) {
        this.target.button = LUtilsSeeder.seed(Types.Button);
      } else {
        this.target.button = null;
      }
    },
  },
  created() {},
  mounted() {
    EventBus.$on(
      "show:LSettingsColumn",

      ({ el, target, gridPath }) => {
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
    EventBus.$on(LEventsName.PAGE_BUILDER_CLOSE_TOOLS, () => {
      this.show_edit_layout = false;
    });
  },
  beforeUnmount() {
    EventBus.$off("show:LSettingsColumn");
    EventBus.$off(LEventsName.PAGE_BUILDER_CLOSE_TOOLS);

    //――――――――――――――――――――――  REMOVE key listener ――――――――――――――――――――
    document.removeEventListener("keydown", this.key_listener_keydown, true);
  },

  methods: {
    showDialog() {
      this.has_button = !!this.target.button;

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

      this.target.layout = layout;
    },
  },
};
</script>

<style lang="scss" scoped></style>
