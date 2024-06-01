<!--
  - Copyright (c) 2023-2024. Selldone® Business OS™
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
  <v-card
    v-styler:product="{ target: object.product_info }"
    class="text-start px-4 py-2"
    variant="text"
    :to="product_to"
    target="_blank"
  >
    <div v-if="busy">
      <v-skeleton-loader
        color="transparent"
        :type="['text@1', 'image', 'text@2']"
      ></v-skeleton-loader>
    </div>
    <template v-else-if="product">
      <h3 class="mb-2">{{ product.title }}</h3>
      <v-img
        :src="getShopImagePath(product.icon)"
        class="mb-1 mb-3"
        :aspect-ratio="1"
      >
        <u-count-down
          v-if="product.dis_end"
          :end="product.dis_end.convertToLocalDate()"
          class="absolute-bottom-end text-red pa-1 rounded-lg"
          style="background-color: #ffffff44;backdrop-filter: blur(4px)"
        ></u-count-down>
      </v-img>

      <div class="d-flex align-center flex-wrap mb-1">
        <u-price
          :amount="price_in_selected_currency"
          medium
          class="me-2"
        ></u-price>

        <u-price
          v-if="discount > 0"
          :amount="price_in_selected_currency + discount"
          class="discount-price text-muted me-2"
          line-through
        ></u-price>

        <!-- Price label -->
        <span v-if="product.price_label" class="mx-1 price-label">{{
          product.price_label
        }}</span>
      </div>

      <div class="single-line small">
        {{ product.title_en }}
      </div>

      <slot name="buttons"></slot>
    </template>

    <div
      v-if="!product && $builder.isEditing && !$builder.isHideExtra"
      class="text-center pp d-flex align-items-center justify-center flex-column bg-tiny-checkers"
    >
      <img
        class="m-3"
        height="96"
        src="@selldone/components-vue/assets/icons/product-comparison.svg"
        width="96"
      />
      <p>Select a product</p>
    </div>
  </v-card>
</template>

<script>
import { GtagEcommerce } from "@selldone/components-vue/plugins/gtag/GtagEcommerce";
import StylerDirective from "../../../styler/StylerDirective";
import LMixinXComponent from "@selldone/page-builder/mixins/x-component/LMixinXComponent";
import { isObject } from "lodash-es";
import UCountDown from "@selldone/components-vue/ui/count-down/UCountDown.vue";
import UPrice from "@selldone/components-vue/ui/price/UPrice.vue";
import {StorefrontRoutesName} from "@selldone/core-js/enums/route/StorefrontRoutesName";

export default {
  name: "XProduct",
  directives: { styler: StylerDirective },
  mixins: [LMixinXComponent],

  components: { UPrice, UCountDown },

  props: {
    object: { required: true },
    augment:{},
  },

  data: () => ({
    busy: false,
    product: null,
  }),
  computed: {

    product_to(){
      return this.productInfo?.id && {name:StorefrontRoutesName.PRODUCT_PAGE,params:{product_id:this.productInfo.id}}
    },


    productInfo() {
      return this.object.product_info;
    },

    price_in_selected_currency() {
      if (!this.product) return 0;

      try {
        return this.CalcPriceProductCurrentCurrency(
          this.getShop(),
          this.product,
          null,
        );
      } catch (e) {
        return "🚨";
      }
    },

    discount_percent() {
      try {
        return this.discountProductPercent(this.getShop(), this.product, null);
      } catch (e) {
        return "🚨";
      }
    },

    discount() {
      try {
        return this.getProductDiscountAmount(
          this.getShop(),
          this.product,
          null,
        );
      } catch (e) {
        return "🚨";
      }
    },
  },
  watch: {
    "object.product_info.id"(product_id) {
      if (product_id !== this.product?.id) {
        console.log("✻ Change selected product.");
        this.getProductInfo();
      }
    },
  },

  created() {
    // Auto fix issues:
    if (
      !this.object.product_info ||
      !isObject(this.object.product_info) ||
      Array.isArray(this.object.product_info)
    )
      this.object.product_info = {};

    this.getProductInfo();
  },

  mounted() {},

  methods: {
    getProductInfo() {
      this.product = null;

      //console.log(`getProductInfo ----> `, this.productInfo);
      if (!this.productInfo || !this.productInfo.id) return;

      this.busy = true;

      window.$storefront.products
        .optimize(600)
        .get(this.productInfo.id, { no_article: true })
        .then(({ product }) => {
          this.product = product;

          GtagEcommerce.MeasuringViewsOfProductDetails(
            this.getShop(),
            product,
            this.GetUserSelectedCurrency().code,
            "quick-view",
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

<style lang="scss" scoped></style>
