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

<template xmlns:v-styler="http://www.w3.org/1999/xhtml">
  <x-section
    :object="$sectionData"
    path="$sectionData"
    v-styler:product="$sectionData.product_info"
  >
    <s-shop-product-main-card
      v-if="product"
      :product="product"
      can-buy
      show-cover
      class="product-view mx-auto text-start"
      style="max-width: 1650px;font-size: 14px;"
      :hss-sticky-but-button="false"
    />
    <product-info-loading-view v-else-if="busy"> </product-info-loading-view>

    <div
      v-else-if="$builder.isEditing && !$builder.isHideExtra"
      class="text-center min-height-40vh widget-hover pointer-pointer d-flex align-items-center justify-content-center flex-column bg-tiny-checkers"
    >
      <img
        src="@components/assets/icons/product-comparison.svg"
        width="96"
        height="96"
        class="m-3"
      />
      <p class="display-3">Select a product</p>
    </div>
  </x-section>
</template>

<script>
import * as types from "../../src/types";
import SShopProductMainCard from "@components/product/info/SShopProductMainCard.vue";
import ProductInfoLoadingView from "@components/product/loading/ProductInfoLoadingView";
import GtagEcommerce from "../../../Storefront/plugins/gtag/GtagEcommerce";

export default {
  name: "SectionProductView",
  components: { ProductInfoLoadingView, SShopProductMainCard },
  cover: require("../../assets/images/covers/product.svg"),

  group: "Products",
  label: "Product",

    help: {
        title: "Utilize this section to showcase a product on your webpage.",
    },

  $schema: {
    classes: types.ClassList,
    background: types.Background,
    style: types.Style,

    product_info: types.Product,
  },
  props: {
    id: {
      type: Number,
      required: true,
    },
    augment:{
      // Extra information to show to dynamic show in page content
    }
  },

  data: () => ({
    busy: false,
    product: null,
    product_info: null,
  }),
  computed: {

  },
  watch: {
    "$sectionData.product_info"(value) {
      if (value instanceof Object && value.id !== this.product?.id) {
        console.log("✻ Change selected product.");
        this.product_info = value;
        this.getProductInfo();
      }
    },
  },

  created() {
    this.product_info = this.$sectionData.product_info;

    this.getProductInfo();
  },
  // Important: Do not use compute to get [this.getShop()]! It returns null.

  mounted() {},

  methods: {
    getProductInfo() {
      this.product = null;

      if (!this.product_info || !this.product_info.id) return;

      this.busy = true;

window.$storefront.products.optimize(600).getInfo(this.product_info.id,{ no_article: true})
        .then(({ product }) => {
          this.product = product;

          GtagEcommerce.MeasuringViewsOfProductDetails(
              this.getShop(),
            product,
              this.GetUserSelectedCurrency().code,
            "quick-view"
          );
        })
        .catch((error) => {
          this.showLaravelError(error);
        })
        .finally(() => {
          this.busy = false;
        });
    },
  },
};
</script>

<style lang="scss" scoped>
.product-view {
  // max-width: 1720px;
  margin: auto;
}
::v-deep .is-editable {
  .product-view {
    a {
      pointer-events: none !important;
      user-select: none !important;
    }
  }
}
</style>

<style lang="scss">
.is-editable {
  .product-view {
    a,
    button {
      pointer-events: none !important;
      user-select: none !important;
    }
  }
}
</style>
