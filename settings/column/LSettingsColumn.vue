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
    <v-card v-if="target" class="text-start" flat>
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
        <s-setting-group
          icon="auto_awesome_motion"
          title="Column Layout"
          subtitle="Choose your preferred column layout from the options provided in the list below."
        >
        </s-setting-group>

        <v-row class="py-5" no-gutters>
          <v-col v-for="item in LAYOUTS" :key="item">
            <v-card
              :style="
                target.data.layout === item ? 'border: solid 2px #fff;' : ''
              "
              class="ma-1"
              color="#BBDEFB"
              height="120"
              rounded="lg"
              style="font-size: 65%"
              variant="outlined"
              width="80"
              @click="selectLayout(item)"
            >
              <div v-if="item === 'product'" class="pa-2">
                <div class="mb-1 small"><b>Product</b></div>
                <div
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
                  <v-icon class="center-absolute" size="32">shelves</v-icon>
                </div>

                <u-price :amount="18.99" class="me-2"></u-price>
              </div>

              <div v-else-if="item === 'collection'" class="pa-2">
                <div class="mb-1 small"><b>Collection</b></div>

                <v-row dense class="text-center">
                  <v-col v-for="i in 4" :key="i" cols="6">
                    <div
                      class="--image mx-auto"
                      style="
                        height: 28px;
                        width: 28px;
                        background: #8097b4;
                        position: relative;
                        margin-bottom: 4px;
                        border-radius: 4px;
                      "
                    ></div>

                    <div style="font-size: 6px" class="single-line">
                      Subtitle...
                    </div>
                  </v-col>
                </v-row>
              </div>

              <div v-else-if="item === 'custom'" class="pa-2">
                <div class="mb-1 small single-line"><b>Custom</b></div>

                <div
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
                  <v-icon class="center-absolute" size="32"
                    >architecture
                  </v-icon>
                </div>
              </div>

              <template v-else>
                <div
                  :class="item"
                  class="position-relative small text-start px-2"
                >
                  <h3
                    v-if="item === 'x-layout-middle'"
                    class="--title my-2 single-line"
                  >
                    Title...
                  </h3>

                  <div
                    v-if="
                      ![
                        'x-layout-title-content',
                        'x-layout-content-title',
                      ].includes(item)
                    "
                    class="--image my-2"
                    style="
                      height: 70px;
                      min-width: 25px;
                      background: #8097b4;
                      position: relative;
                      margin-bottom: 8px;
                      border-radius: 8px;
                    "
                  >
                    <v-icon class="center-absolute" color="#225082" size="24"
                      >crop_original
                    </v-icon>
                  </div>
                  <div class="--contents my-2">
                    <h3 v-if="item !== 'x-layout-middle'" class="--title">
                      Title...
                    </h3>
                    <p class="--content m-0 single-line">Content...</p>
                  </div>
                </div>
              </template>
            </v-card>
          </v-col>
        </v-row>

        <s-setting-group
          icon="smart_button"
          title="Call To Action"
          subtitle="You can place a button at the edge of the view and assign a URL to it."
        >
        </s-setting-group>

        <s-setting-switch
          v-model="has_button"
          label="Has Button"
          icon="ads_click"
        ></s-setting-switch>
      </v-card-text>
    </v-card>
  </v-navigation-drawer>
</template>

<script lang="ts">
import LEventsName from "../../mixins/events/name/LEventsName";
import { LUtilsHighlight } from "../../utils/highligh/LUtilsHighlight";

import { LUtilsClasses } from "../../utils/classes/LUtilsClasses";
import { LMixinEvents } from "../../mixins/events/LMixinEvents";
import { EventBus } from "@selldone/core-js/events/EventBus";
import UPrice from "@selldone/components-vue/ui/price/UPrice.vue";
import { XButtonObject } from "@selldone/page-builder/components/x/button/XButtonObject.ts";
import SSettingGroup from "@selldone/page-builder/styler/settings/group/SSettingGroup.vue";
import SSettingSwitch from "@selldone/page-builder/styler/settings/switch/SSettingSwitch.vue";
import { XColumnImageTextObjectTypes } from "@selldone/page-builder/components/x/column-image-text/XColumnImageTextObject.ts";

const LAYOUTS = [
  "product",
  "collection",
  // "custom",

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

  components: { SSettingSwitch, SSettingGroup, UPrice },

  props: {},
  data: () => ({
    LAYOUTS: LAYOUTS,
    standard_classes: LUtilsClasses.StandardClasses(),

    el: null,
    target: null as XColumnImageTextObject | null,

    //----------------------- Bg image -----------------------
    show_edit_layout: false,
    dialog_pre: false,

    has_button: false,

    //--------------------------
    key_listener_keydown: null,

    LOCK: false, // 🔐 Lock changes
  }),

  computed: {
    button() {
      return this.target.getActionChild();
    },
  },
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
        if (!this.button) {
          this.target.addChild(
            XButtonObject.Seed().setLabel(
              XColumnImageTextObjectTypes.LABELS.ACTION,
            ),
          );
        }
      } else {
        this.target.removeChild(this.button);
      }
    },
  },
  created() {},
  mounted() {
    EventBus.$on(
      "show:LSettingsColumn",

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
      this.has_button = !!this.button;

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

      this.target.data.setLayout(layout);
    },
  },
};
</script>

<style lang="scss" scoped></style>
