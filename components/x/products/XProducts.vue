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
  <s-products-listing
    v-styler:products="{ target: object, hasArrangement: true }"
    :align="object.data.align"
    :justify="object.data.justify"
    :force-mode-view="mode_view"
    :force-mode-view-folders="mode_view_f"
    :force-package="forcePackage"
    :shop="shop"
    :view-only="is_editing"
    landing-page-mode
    silent
    class="x--products"
    :class="[object.classes, { 'is-editable': $builder.isEditing }]"
    :style="[object.style, background_style]"
  ></s-products-listing>
</template>

<script>
import LMixinXComponent from "@selldone/page-builder/mixins/x-component/LMixinXComponent";
import { ApplyAugmentToObject } from "@selldone/core-js";
import { XProductsObject } from "@selldone/page-builder/components/x/products/XProductsObject.ts";
import SProductsListing from "@selldone/components-vue/storefront/products/listing/SProductsListing.vue";
import { ModeView } from "@selldone/core-js/enums/shop/ModeView.ts";
import StylerDirective from "@selldone/page-builder/styler/StylerDirective.ts";

export default {
  name: "XProducts",
  mixins: [LMixinXComponent],
  directives: { styler: StylerDirective },

  components: { SProductsListing },

  props: {
    object: {
      type: XProductsObject,
      required: true,
    },
  },
  data: () => ({
    forcePackage: null,

    mode_view: ModeView.NORMAL.code,
    mode_view_f: null,
  }),

  computed: {
    is_editing() {
      return this.$builder.isEditing;
    },

    shop() {
      return this.getShop();
    },

    filter() {
      return this.object.data.filter;
    },
  },
  watch: {
    filter(filter) {
      if (filter instanceof Object) {
        console.log("✻ Change products / categories filter.");
        //console.log("watch", value);
        //console.log("forcePackage", this.$sectionData.filter);

        this.forcePackage = ApplyAugmentToObject(
          filter,
          this.augment,
          this.is_editing,
        );
        this.mode_view = filter.mode_view;
        this.mode_view_f = filter.mode_view_f;
      }
    },
  },

  mounted() {
    if (this.$refs.article) {
      this.$refs.article.processAfterChangeBody(); //Assign full screen click...
    }
  },

  methods: {},

  created() {
    if (!this.isObject(this.filter)) {
      this.object.data.filter = {};
    }

    if (this.filter.mode_view) this.mode_view = this.filter.mode_view;

    if (this.filter.mode_view_f) this.mode_view_f = this.filter.mode_view_f;

    // Set dynamic values for filter:
    this.forcePackage = ApplyAugmentToObject(
      this.filter,
      this.augment,
      this.is_editing,
    );
  },
};
</script>

<style lang="scss">
.x--products {
}
</style>
