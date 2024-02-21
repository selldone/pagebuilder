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
  <x-section
    :object="$sectionData"
    path="$sectionData"
    v-styler:products="{target:$sectionData.products_list,keyFilter:'products_list'}"
  >
    <x-container
      path="$sectionData"
      :object="$sectionData"
      max-width-normal="1550px"
    >
      <h2
        v-styler:text="{target:$sectionData,keyText:'title'}   "


        class="my-5"
        v-html="$sectionData.title?.applyAugment(augment, $builder.isEditing)"
      />

      <s-storefront-products-listing
        :shop="getShop()"
        silent
        landing-page-mode
        :force-mode-view="mode_view"
        :force-package="force_package"
        :view-only="$builder.isEditing"
        v-styler:row=" rowBinding"
        :align="$sectionData.row ? $sectionData.row.align : undefined"
        :justify="$sectionData.row ? $sectionData.row.justify : undefined"
      ></s-storefront-products-listing>

      <p
        v-styler:text="{target:$sectionData,keyText:'text'}   "


        class="my-5"
        v-html="$sectionData.text?.applyAugment(augment, $builder.isEditing)"
      />
    </x-container>
  </x-section>
</template>

<script>
import * as types from "../../../src/types";
import SStorefrontProductsListing from "@components/storefront/products-listing/SStorefrontProductsListing.vue";
import { ModeView } from "@core/enums/shop/ModeView";
import { ApplyAugmentToObject } from "@core/prototypes/ObjectPrototypes";
import StylerDirective from "@app-page-builder/styler/StylerDirective";
import SectionMixin from "@app-page-builder/mixins/SectionMixin";

export default {
  name: "LSectionStoreListing",
  directives: { styler: StylerDirective },
  mixins: [SectionMixin],

  components: { SStorefrontProductsListing },
  cover: require("../../../assets/images/covers/products.svg"),

  group: "Products",
  label: "Products & categories list",
  help: {
    title:
      "This section displays a list of products and categories similar to your primary shop listing page. You can apply filters to showcase specific categories or products.",
  },

  $schema: {
    classes: types.ClassList,
    background: types.Background,
    style: types.Style,

    title: types.Title,
    text: types.Text,

    products_list: types.Products,

    row: types.Row,
  },
  props: {
    id: {
      type: Number,
      required: true,
    },
    augment: {
      // Extra information to show to dynamic show in page content
    },
  },

  data: () => ({
    force_package: null,
    mode_view: ModeView.NORMAL.code,
  }),
  computed: {
    /**
     * 🐍 Use compute for better performance.
     * @return {{target: *}}
     */
    rowBinding() {
      return { target: this.$sectionData,hasArrangement:true,hasFluid:true };
    },

  },
  watch: {
    "$sectionData.products_list"(value) {
      if (value instanceof Object) {
        console.log("✻ Change products / categories filter.");
        //console.log("watch", value);
        //console.log("force_package", this.$sectionData.products_list);

        this.force_package = ApplyAugmentToObject(
          value,
          this.augment,
          this.$builder.isEditing,
        );
        this.mode_view = value.mode_view;
      }
    },
  },

  created() {
    this.force_package = this.$sectionData.products_list;

    if (this.force_package && this.force_package.mode_view)
      this.mode_view = this.force_package.mode_view;

    // Set dynamic values for filter:

    this.force_package = ApplyAugmentToObject(
      this.force_package,
      this.augment,
      this.$builder.isEditing,
    );
  },

  mounted() {},

  methods: {},
};
</script>

<style lang="scss" scoped></style>
