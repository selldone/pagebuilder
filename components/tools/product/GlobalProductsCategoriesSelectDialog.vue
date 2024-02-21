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
    theme="dark"
    location="right"
    temporary
    :width="
      $vuetify.display.xlAndUp ? 560 : $vuetify.display.lgAndUp ? 420 : 320
    "
    :scrim="false"
    color="#1e1e1e"
    class="x-page-builder-options-slider"
  >
    <v-card class="text-start" flat>
      <v-card-actions>
        <div class="widget-buttons">
          <v-btn
            variant="text"
            size="x-large"
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
            has-sort
            has-product-category-selection
            has-categories-filter
            has-count
            dark
          />
        </v-container>
      </v-card-text>
    </v-card>
  </v-navigation-drawer>
</template>

<script>
import SPageProductsFilter from "@app-page-builder/components/style/product/SPageProductsFilter.vue";
import EventBusTriggers from "@core/enums/event-bus/EventBusTriggers";
import PageEventBusMixin from "@app-page-builder/mixins/PageEventBusMixin";

export default {
  name: "GlobalProductsCategoriesSelectDialog",
  mixins: [PageEventBusMixin],

  components: {
    SPageProductsFilter,
  },

  props: {},
  data: () => ({
    el: null,
    target: null,
    keyFilter: null, // ex. products_list

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
    this.EventBus.$on(
      "show:GlobalProductsCategoriesSelectDialog",

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
    this.EventBus.$on(EventBusTriggers.PAGE_BUILDER_CLOSE_TOOLS, () => {
      this.dialog_product_filter = false;
    });
  },
  beforeUnmount() {
    this.EventBus.$off("show:GlobalProductsCategoriesSelectDialog");
    this.EventBus.$off(EventBusTriggers.PAGE_BUILDER_CLOSE_TOOLS);

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

<style scoped lang="scss"></style>
