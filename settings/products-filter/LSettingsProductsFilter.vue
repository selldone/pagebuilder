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
  <l-setting-navigation v-model="dialog_product_filter">
    <v-card class="text-start" flat style="padding-bottom: 10vh">
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
        <s-page-products-filter
          v-if="dialog_pre"
          v-model="product_filter_view_data"
          dark
          has-categories-filter
          has-count
          has-product-category-selection
          has-sort
          :has-view-mode="options?.view_mode"
        />
      </v-card-text>
    </v-card>
  </l-setting-navigation>
</template>

<script lang="ts">
import SPageProductsFilter from "../../components/style/product/filter/SPageProductsFilter.vue";
import LEventsName from "../../mixins/events/name/LEventsName";
import { LMixinEvents } from "../../mixins/events/LMixinEvents";
import { EventBus } from "@selldone/components-vue/utils/events/EventBus.ts";
import LSettingNavigation from "@selldone/page-builder/settings/LSettingNavigation.vue";

export default {
  name: "LSettingsProductsFilter",
  mixins: [LMixinEvents],

  components: {
    LSettingNavigation,
    SPageProductsFilter,
  },

  props: {},
  data: () => ({
    el: null,
    target: null,

    options: null,

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

      ({ el, target, options }) => {
        this.CloseAllPageBuilderNavigationDrawerTools(); // Close all open tools.

        this.el = el;
        this.target = target;
        this.options = options;
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
          this.target.data.filter,
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

      this.target.data.filter = this.product_filter_view_data; // Save data in section!
    },
  },
};
</script>

<style lang="scss" scoped></style>
