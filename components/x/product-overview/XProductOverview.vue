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
<!-- IMPORTANT: Element must have -trackable class! -->

<template>
  <div
    v-styler:product="{ target: object }"
    class="x--product-overview"
    :class="[object.classes, { 'is-editable': $builder.isEditing }]"
    :style="[object.style, background_style]"
  >
    <s-product-overview
      v-if="product"
      :hss-sticky-but-button="false"
      can-buy
      class="mx-auto"
      show-cover
      style="max-width: 1650px; font-size: 14px"
    />
    <s-product-overview-loading v-else-if="busy"></s-product-overview-loading>
    <div
      v-else-if="is_editing && !$builder.isHideExtra"
      class="text-center min-height-40vh widget-hover pointer-pointer d-flex align-items-center justify-center flex-column bg-tiny-checkers usn"
    >
      <v-icon class="ma-3" size="96"> shelves</v-icon>
      <p>Select a product</p>
    </div>
  </div>
</template>

<script lang="ts">
import LMixinXComponent from "@selldone/page-builder/mixins/x-component/LMixinXComponent";
import SProductOverviewLoading from "@selldone/components-vue/storefront/product/overview/loading/SProductOverviewLoading.vue";
import SProductOverview from "@selldone/components-vue/storefront/product/overview/SProductOverview.vue";
import { GtagEcommerce } from "@selldone/components-vue/plugins/gtag/GtagEcommerce.ts";
import StylerDirective from "@selldone/page-builder/styler/StylerDirective.ts";
import { XProductOverviewObject } from "@selldone/page-builder/components/x/product-overview/XProductOverviewObject.ts";
import { LMixinEvents } from "@selldone/page-builder/mixins/events/LMixinEvents.ts";
import {CONSOLE} from "@selldone/core-js";
import {computed} from "vue";

export default {
  name: "XProductOverview",
  mixins: [LMixinXComponent, LMixinEvents],
  components: { SProductOverviewLoading, SProductOverview },
  directives: { styler: StylerDirective },

  provide() {
    return {
      $product: computed(() => this.product),
    };
  },

  props: {
    object: {
      type: XProductOverviewObject,
      required: true,
    },
  },
  data: () => ({
    busy: false,
    product: null,
  }),

  computed: {
    is_editing() {
      return this.$builder.isEditing;
    },

    product_id() {
      return this.object.data.product_id;
    },
  },

  watch: {
    product_id(product_id) {
      if (product_id !== this.product?.id) {
        CONSOLE.log("✻ Change selected product.");
        this.getProductInfo();
      }
    },
  },

  created() {
    this.getProductInfo();
  },

  mounted() {
    if (this.is_editing) {
      // Auto open dialog:
      this.ShowLSettingsProduct(this.$el, this.object);
    }
  },

  methods: {
    getProductInfo() {
      this.product = null;

      if (!this.product_id) return;

      this.busy = true;

      window.$storefront.products
        .optimize(600)
        .get(this.product_id, { no_article: true })
        .then(({ product }) => {
          this.product = product;

          GtagEcommerce.MeasuringViewsOfProductDetails(
            this.getShop(),
            product,
            this.GetUserSelectedCurrency().code,
            "landing",
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

<style lang="scss">
.x--product-overview {
  text-align: start;

  &.is-editable {
    a,
    button {
      pointer-events: none !important;
      user-select: none !important;
    }
  }
}
</style>
