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
    v-styler:products="{ target: $sectionData, keyFilter: 'filter' }"
    :object="$sectionData"
    no-default-padding
    class="py-5"
  >
    <x-container :object="$sectionData" max-width-normal="1550px" class="pa-0">
      <x-text
        v-model:object="$sectionData.title"
        :augment="augment"
        initial-type="h2"
        :initial-classes="['mb-5', 'px-7']"
      ></x-text>

      <s-products-listing
        v-styler:row="rowBinding"
        :align="$sectionData.row ? $sectionData.row.align : undefined"
        :force-mode-view="mode_view"
        :force-mode-view-folders="mode_view_f"
        :force-package="forcePackage"
        :justify="$sectionData.row ? $sectionData.row.justify : undefined"
        :shop="getShop()"
        :view-only="$builder.isEditing"
        landing-page-mode
        silent
      ></s-products-listing>

      <p
        v-styler:text="{ target: $sectionData, keyText: 'text' }"
        class="mt-5 px-7"
        v-html="$sectionData.text?.applyAugment(augment, $builder.isEditing)"
      />
    </x-container>
  </x-section>
</template>

<script>
import * as types from "../../../src/types/types";
import SProductsListing from "@selldone/components-vue/storefront/products/listing/SProductsListing.vue";
import { ModeView } from "@selldone/core-js/enums/shop/ModeView";
import { ApplyAugmentToObject } from "@selldone/core-js/prototypes/ObjectPrototypes";
import StylerDirective from "../../../styler/StylerDirective";
import LMixinSection from "../../../mixins/section/LMixinSection";
import XText from "@selldone/page-builder/components/x/text/XText.vue";
import XSection from "@selldone/page-builder/components/x/section/XSection.vue";
import XContainer from "@selldone/page-builder/components/x/container/XContainer.vue";

export default {
  name: "LSectionStoreListing",
  directives: { styler: StylerDirective },
  mixins: [LMixinSection],

  components: {XContainer, XSection, XText, SProductsListing },
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

    filter: types.Products,

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
    forcePackage: null,
    mode_view: ModeView.NORMAL.code,
    mode_view_f: null,
  }),
  computed: {
    /**
     * 🐍 Use compute for better performance.
     * @return {{target: *}}
     */
    rowBinding() {
      return {
        target: this.$sectionData,
        hasArrangement: true,
        hasFluid: true,
      };
    },
  },
  watch: {
    "$sectionData.filter"(value) {
      if (value instanceof Object) {
        console.log("✻ Change products / categories filter.");
        //console.log("watch", value);
        //console.log("forcePackage", this.$sectionData.filter);

        this.forcePackage = ApplyAugmentToObject(
          value,
          this.augment,
          this.$builder.isEditing,
        );
        this.mode_view = value.mode_view;
        this.mode_view_f = value.mode_view_f;
      }
    },
  },

  created() {
    if (!this.isObject(this.$sectionData.filter)) {
      this.$sectionData.filter = {};
    }

    this.forcePackage = this.$sectionData.filter;

    if (this.forcePackage.mode_view)
      this.mode_view = this.forcePackage.mode_view;

    if (this.forcePackage.mode_view_f)
      this.mode_view_f = this.forcePackage.mode_view_f;

    // Set dynamic values for filter:
    this.forcePackage = ApplyAugmentToObject(
      this.forcePackage,
      this.augment,
      this.$builder.isEditing,
    );
  },

  mounted() {},

  methods: {},
};
</script>

<style lang="scss" scoped></style>
