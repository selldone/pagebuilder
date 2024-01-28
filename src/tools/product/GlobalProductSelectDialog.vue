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
    dark
    right
    fixed
    :width="
      $vuetify.display.xl
        ? 560
        : $vuetify.display.lgAndUp
        ? 420
        : 320
    "
    stateless
    hide-overlay
    color="#1e1e1e"
    class="x-page-builder-options-slider"
  >
    <v-card v-if="dialog_pre" class="text-start" flat>
      <v-card-actions>
        <div class="widget-buttons">
          <v-btn depressed @click="dialog_product_select = false" text x-large>
            <v-icon class="me-1">close</v-icon>

            {{ $t("global.actions.close") }}</v-btn
          >
        </div>
      </v-card-actions>

      <v-card-text class="text-start">
        <s-widget-header title="Product" icon="inventory"></s-widget-header>
        <v-list-subheader
          >Choose a single product to feature on the homepage.</v-list-subheader
        >
        <product-select-box
          v-model="product_info.id"
          :shop="getShop()"
          single-product-select
          class="my-5"
        >
        </product-select-box>
      </v-card-text>
    </v-card>
  </v-navigation-drawer>
</template>

<script>
import ProductSelectBox from "@components/product/input/ProductSelectBox.vue";
import EventBusTriggers from "@core/enums/event-bus/EventBusTriggers";
export default {
  name: "GlobalProductSelectDialog",
  components: {
    ProductSelectBox,
  },

  props: {},
  data: () => ({
    el: null,
    section: null,
    productPath: null, // $sectionData.product

    //----------------------- Product Select -----------------------

    product_info: {},
    dialog_product_select: false,
    dialog_pre: false,

    //--------------------------
    key_listener_keydown: null,

    LOCK: false, // 🔐 Lock changes
  }),

  computed: {},
  watch: {
    "product_info.id"() {
      this.setProduct();
    },
  },
  created() {},
  mounted() {
    this.EventBus.$on(
      "show:GlobalProductSelectDialog",

      ({ el, section, productPath }) => {
        this.CloseAllPageBuilderNavigationDrawerTools(); // Close all open tools.

        this.LOCK = true; // 🔒 Prevent update style and classes

        this.el = el;
        this.section = section;
        this.productPath = productPath;
        this.showProductDialog();
      }
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
    this.EventBus.$on(EventBusTriggers.PAGE_BUILDER_CLOSE_TOOLS, () => {
      this.dialog_product_select = false;
    });
  },
  beforeDestroy() {
    this.EventBus.$off("show:GlobalProductSelectDialog");
    this.EventBus.$off(EventBusTriggers.PAGE_BUILDER_CLOSE_TOOLS);

    //――――――――――――――――――――――  REMOVE key listener ――――――――――――――――――――
    document.removeEventListener("keydown", this.key_listener_keydown, true);
  },

  methods: {
    showProductDialog() {
      this.product_info = this.section.get(this.productPath);
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

    //----------------------------------------------------------------------------
    setProduct() {
      if (!this.dialog_product_select || this.LOCK) return;
      this.section?.set(
        this.productPath,
        this.product_info ? Object.assign({}, this.product_info) : null
      ); // Save data in section and force update!

      //  this.dialog_product_select = false;
    },
  },
};
</script>

<style scoped lang="scss"></style>
