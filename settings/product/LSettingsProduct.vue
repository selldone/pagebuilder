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
    v-model="dialog_product_select"
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
    <v-card v-if="dialog_pre" class="text-start" flat>
      <v-card-actions>
        <div class="widget-buttons">
          <v-btn
            size="x-large"
            variant="text"
            @click="dialog_product_select = false"
          >
            <v-icon start>close</v-icon>

            {{ $t("global.actions.close") }}
          </v-btn>
        </div>
      </v-card-actions>

      <v-card-text class="text-start">
        <s-widget-header icon="inventory" title="Product"></s-widget-header>
        <v-list-subheader
          >Choose a single product to feature on the homepage.
        </v-list-subheader>
        <product-select-box
          v-model="target.id"
          :shop="getShop()"
          class="my-5"
          single-product-select
        >
        </product-select-box>
      </v-card-text>
    </v-card>
  </v-navigation-drawer>
</template>

<script>
import ProductSelectBox from "@components/product/input/ProductSelectBox.vue";
import LEventsName from "@app-page-builder/mixins/events/name/LEventsName";
import { LMixinEvents } from "@app-page-builder/mixins/events/LMixinEvents";
import {EventBus} from "@core/events/EventBus";

export default {
  name: "LSettingsProduct",
  mixins: [LMixinEvents],

  components: {
    ProductSelectBox,
  },

  props: {},
  data: () => ({
    el: null,
    section: null,
    productPath: null, // $sectionData.product

    //----------------------- Product Select -----------------------

    target: {},
    dialog_product_select: false,
    dialog_pre: false,

    //--------------------------
    key_listener_keydown: null,

    LOCK: false, // 🔐 Lock changes
  }),

  computed: {},
  watch: {},
  created() {},
  mounted() {
    EventBus.$on(
      "show:LSettingsProduct",

      ({ el, target }) => {
        this.CloseAllPageBuilderNavigationDrawerTools(); // Close all open tools.

        this.LOCK = true; // 🔒 Prevent update style and classes

        this.el = el;
        this.target = target;
        this.showProductDialog();
      },
    );

    //――――――――――――――――――――――  START Editor key listener ――――――――――――――――――――
    this.key_listener_keydown = (event) => {
      // Scape:
      let isEscape =
        event.key === "Escape" || event.key === "Esc" || event.keyCode === 27;

      if (isEscape) {
        if (this.dialog_product_select) {
          // Close tools
          this.dialog_product_select = false;
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
      this.dialog_product_select = false;
    });
  },
  beforeUnmount() {
    EventBus.$off("show:LSettingsProduct");
    EventBus.$off(LEventsName.PAGE_BUILDER_CLOSE_TOOLS);

    //――――――――――――――――――――――  REMOVE key listener ――――――――――――――――――――
    document.removeEventListener("keydown", this.key_listener_keydown, true);
  },

  methods: {
    showProductDialog() {
      if (!this.isObject(this.product_info)) {
        this.product_info = {};
      } else {
        this.product_info = Object.assign({}, this.product_info); // Important: clone object here!
      }

      this.dialog_pre = false;
      this.$nextTick(() => {
        this.dialog_pre = true;
        this.dialog_product_select = true;
        this.LOCK = false; // 🔓 Now can update values
      });
    },
  },
};
</script>

<style lang="scss" scoped></style>
