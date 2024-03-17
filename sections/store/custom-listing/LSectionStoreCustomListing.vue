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
    v-styler:products="{
      target: $sectionData,
      keyFilter: 'filter',
      keyFrameCategory: 'frame_category',
      keyFrameProduct: 'frame_product',
      custom: true,
    }"
    :object="$sectionData"
    path="$sectionData"
  >
    <x-custom-products-list
      :object="$sectionData"
      :force-package="forcePackage"
    >
      <template v-slot:folders="{ folders }">
        <component
          :is="gen(getCategoryCode(folder))"
          v-for="folder in folders"
          :key="'f' + folder.id"
          :category-id="folder.id"
          :class="[
            $sectionData.frame_category?.classes,
            {
              pen:
                $builder.isEditing &&
                !$builder.isHideExtra /*Vie mode activate links!*/,
            },
          ]"
        >
        </component>
      </template>

      <template v-slot:products="{ products }">
        <component
          :is="gen(getProductCode(product))"
          v-for="product in products"
          :key="'p' + product.id"
          :class="[
            $sectionData.frame_product?.classes,
            {
              pen:
                $builder.isEditing &&
                !$builder.isHideExtra /*Vie mode activate links!*/,
            },
          ]"
          :product-id="product.id"
        >
        </component>
      </template>
    </x-custom-products-list>
  </x-section>
</template>

<script>
import * as types from "@app-page-builder/src/types/types";

import { defineComponent } from "vue/dist/vue.esm-bundler.js";
import StylerDirective from "@app-page-builder/styler/StylerDirective";
import LMixinSection from "@app-page-builder/mixins/section/LMixinSection";
import { ApplyAugmentToObject } from "@core/prototypes/ObjectPrototypes";

export default {
  name: "LSectionStoreCustomListing",
  directives: { styler: StylerDirective },
  mixins: [LMixinSection],
  components: {},
  cover: require("../../../assets/images/covers/products-list-custom.svg"),

  group: "Products",
  label: "Custom products listing",

  help: {
    title:
      "This section displays products and categories using customized HTML code. You can apply filters to showcase specific categories or products. Additionally, you can incorporate dynamic values within the HTML template codes.",
  },

  $schema: {
    classes: types.ClassList,
    background: types.Background,
    style: types.Style,

    filter: types.Products,

    row: types.Row,

    frame_product: types.FrameProduct,
    frame_category: types.FrameCategory,

    products: [],
    categories: [],
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
  }),
  computed: {},
  watch: {
    "$sectionData.filter"(value) {
      if (value instanceof Object) {
        console.log("✻ Change products filter.");

        this.forcePackage = ApplyAugmentToObject(
          value,
          this.augment,
          this.$builder.isEditing,
        );
      }
    },
    "$sectionData.frame_product"() {
      // Always update on custom frame dialog accept!
      console.log("✻ Initialize layouts.");
    },
  },

  created() {
    if (!this.isObject(this.$sectionData.filter)) {
      this.$sectionData.filter = {};
    }

    this.forcePackage = this.$sectionData.filter;

    // Set dynamic values for filter:
    this.forcePackage = ApplyAugmentToObject(
      this.forcePackage,
      this.augment,
      this.$builder.isEditing,
    );
  },

  mounted() {},

  methods: {
    gen(html) {
      return defineComponent({
        template: html,
        components: {}, // Register local custom components
      });
    },

    getProductCode(product) {
      if (!product) return "-";
      let code = this.$sectionData.frame_product?.code;
      if (!code) return "<div class='pa-5'>⚠ NO FRAME CODE!</div>";

      function encodeToHtmlAttribute(obj) {
        if (!obj) return null;
        // Convert the object to a JSON string
        let jsonString = JSON.stringify(obj);

        // Replace the double-quoted keys with unquoted keys
        jsonString = jsonString.replace(/"([^"]+)":/g, "$1:");

        // Escape single quotes within string values
        jsonString = jsonString.replace(
          /:(\s*)"([^"]*)"/g,
          function (match, p1, p2) {
            // Escape single quotes inside the string values and wrap the value with single quotes
            return ":" + p1 + "'" + p2.replace(/'/g, "\\'") + "'";
          },
        );

        return jsonString;
      }

      // Replace smart tags with corresponding components:
      // ━━━━━━━━━━━━━━━━ Variants ━━━━━━━━━━━━━━━━
      code = code.replace(/<(\/?)variants/g, "<$1x-variants");
      // Add replacement for <x-variants> tag
      code = code.replace(/<x-variants(.*?)>/g, (match, existingAttrs) => {
        // Replacement function to add new attributes while keeping existing ones
        return `<x-variants ${existingAttrs} :small="true" :variants="${encodeToHtmlAttribute(product.variants)}">`;
      });

      // ━━━━━━━━━━━━━━━━ count down ━━━━━━━━━━━━━━━━
      code = code.replace(/<(\/?)count-down/g, "<$1x-count-down");

      // ━━━━━━━━━━━━━━━━ rating ━━━━━━━━━━━━━━━━
      code = code.replace(/<(\/?)rating/g, "<$1x-rating");

      // Replace all occurrences of '{product.icon}' with the dynamic value
      code = code.replace(
        /{product\.icon}/g,
        this.getShopImagePath(product.icon),
      );
      code = code.replace(
        /{product\.price}/g,
        this.getFormatPriceCurrency(product.price, product.currency),
      );

      code = code.replace(
        /{product\.final_price}/g,
        this.getFormatPriceCurrency(product.final_price, product.currency),
      );
      code = code.replace(
        /{product\.discount}/g,
        this.getFormatPriceCurrency(product.discount, product.currency),
      );

      code = code.replace(
        /{url}/g,
        this.getProductLink(this.getShop(), product.id),
      );

      function generateDynamicRegex(key) {
        return new RegExp(`{product\\.${key}}`, "g");
      }

      Object.keys(product)
        .filter(
          (key) => !["icon", "price", "discount", "final_price"].includes(key),
        )
        .forEach((key) => {
          const val = product[key];
          if (this.isObject(val) || Array.isArray(val)) return;

          code = code.replace(
            generateDynamicRegex(key),
            this.makeHtmlSafe(val),
          );
        });

      // Step 1: Remove attributes set to "null"
      code = code.replace(/\s\w+="null"/g, "");

      // Step 2: Transform attributes set to "true" or "false" into Vue binding syntax
      // For "true"
      code = code.replace(/(\s\w+)="true"/g, ':$1="true"');
      // For "false"
      code = code.replace(/(\s\w+)="false"/g, ':$1="false"');

      return code;
    },

    getCategoryCode(category) {
      if (!category) return "-";
      let code = this.$sectionData.frame_category?.code;
      if (!code) return "<div class='pa-5'>⚠ NO FRAME CODE!</div>";

      // Replace all occurrences of '{category.icon}' with the dynamic value
      code = code.replace(
        /{category\.icon}/g,
        this.getShopImagePath(category.icon),
      );

      code = code.replace(
        /{url}/g,
        this.getCategoryLink(this.getShop(), category.name),
      );

      function generateDynamicRegex(key) {
        return new RegExp(`{category\\.${key}}`, "g");
      }

      Object.keys(category)
        .filter((key) => !["icon"].includes(key))
        .forEach((key) => {
          const val = category[key];
          if (this.isObject(val) || Array.isArray(val)) return;

          code = code.replace(
            generateDynamicRegex(key),
            this.makeHtmlSafe(val),
          );
        });

      return code;
    },

    makeHtmlSafe(unsafe) {
      return ("" + unsafe)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
    },
  },
};
</script>

<style lang="scss" scoped></style>
