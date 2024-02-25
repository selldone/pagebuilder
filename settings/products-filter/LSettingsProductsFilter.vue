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
    v-model="dialog_product_filter"
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
            @click="dialog_product_filter = false"
          >
            <v-icon start>close</v-icon>
            {{ $t("global.actions.close") }}
          </v-btn>
        </div>
      </v-card-actions>

      <v-card-text>
        <s-widget-header
          :title="$t('styler.products.title')"
          icon="filter_alt"
        ></s-widget-header>
        <v-list-subheader></v-list-subheader>

        <v-container>
          <s-page-products-filter
            v-if="dialog_pre"
            v-model="product_filter_view_data"
            dark
            has-categories-filter
            has-count
            has-product-category-selection
            has-sort
          />
        </v-container>
      </v-card-text>
    </v-card>
  </v-navigation-drawer>
</template>

<script>
import SPageProductsFilter from "@app-page-builder/components/style/product/SPageProductsFilter.vue";
import LEventsName from "@app-page-builder/mixins/events/name/LEventsName";
import { LMixinEvents } from "@app-page-builder/mixins/events/LMixinEvents";
import {EventBus} from "@core/events/EventBus";

export default {
  name: "LSettingsProductsFilter",
  mixins: [LMixinEvents],

  components: {
    SPageProductsFilter,
  },

  props: {},
  data: () => ({
    el: null,
    target: null,
    keyFilter: null, // ex. filter

    //----------------------- Products Filter -----------------------

    dialog_product_filter: false,
    dialog_pre: false,

    product_filter_view_data: {},

    //--------------------------
    key_listener_keydown: null,
  }),

  computed: {},
  watch: {
    product_filter_view_data: {
      handler() {
        this.onAcceptProductFilterChange();
      },
      deep: true,
    },
  },
  created() {},
  mounted() {
    EventBus.$on(
      "show:LSettingsProductsFilter",

      ({ el, target, keyFilter }) => {
        this.CloseAllPageBuilderNavigationDrawerTools(); // Close all open tools.

        this.el = el;
        this.target = target;
        this.keyFilter = keyFilter;
        this.showProductsDialog();
      },
    );

    //――――――――――――――――――――――  START Editor key listener ――――――――――――――――――――
    this.key_listener_keydown = (event) => {
      // Scape:
      let isEscape =
        event.key === "Escape" || event.key === "Esc" || event.keyCode === 27;

      if (isEscape) {
        if (this.dialog_product_filter) {
          // Close tools
          this.dialog_product_filter = false;
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
      this.dialog_product_filter = false;
    });
  },
  beforeUnmount() {
    EventBus.$off("show:LSettingsProductsFilter");
    EventBus.$off(LEventsName.PAGE_BUILDER_CLOSE_TOOLS);

    //――――――――――――――――――――――  REMOVE key listener ――――――――――――――――――――
    document.removeEventListener("keydown", this.key_listener_keydown, true);
  },

  methods: {
    showProductsDialog() {
      if (!this.isObject(this.product_filter_view_data)) {
        this.product_filter_view_data = {};
      } else {
        // Make it clone:
        this.product_filter_view_data = Object.assign(
          {},
          this.target[this.keyFilter],
        );
      }

      this.dialog_pre = false;
      this.$nextTick(() => {
        this.dialog_pre = true;
        this.dialog_product_filter = true;
      });
    },

    //----------------------------------------------------------------------------
    onAcceptProductFilterChange() {
      if (!this.dialog_product_filter) return;

      this.target[this.keyFilter] = this.product_filter_view_data; // Save data in section!
    },
  },
};
</script>

<style lang="scss" scoped></style>
