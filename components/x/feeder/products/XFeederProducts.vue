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

<template>
  <v-col
    cols="12"
    v-if="is_editing && !$builder.isHideExtra"
    v-styler:products="{
      target: object,
      custom: true,
    }"
    class="rounded-lg usn text-subtitle-2 pa-2 overflow-hidden"
    style="background: #fff"
  >
    <v-sheet rounded="lg" class="pa-2" color="#fafafa" elevation="3">
      <v-icon class="me-2">schema</v-icon>
      <span class="me-1">Products Feeder</span>

      <v-expand-x-transition group>
        <v-progress-circular
          v-if="busy_fetch"
          key="l"
          indeterminate
        ></v-progress-circular>

        <v-chip
          v-if="products?.length"
          key="p"
          class="ma-1"
          size="small"
          prepend-icon="shelves"
          ><b>{{ products.length }}</b
          >x products
        </v-chip>
        <v-chip
          v-if="folders?.length"
          key="c"
          class="ma-1"
          size="small"
          prepend-icon="folder"
          ><b>{{ folders.length }}</b
          >x categories
        </v-chip>
      </v-expand-x-transition>
    </v-sheet>
  </v-col>

  <template v-if="busy_fetch">
    <v-col v-for="i in 4" :key="i" cols="6" sm="3">
      <v-skeleton-loader
        :type="['table-heading', 'list-item-two-line', 'image']"
      ></v-skeleton-loader>
    </v-col>
  </template>
  <component
    :is="gen(getCategoryCode(folder))"
    v-for="folder in folders"
    :key="'f' + folder.id"
    :category-id="folder.id"
    class="x--category-frame"
    :class="[
      object.classes,
      object.data.frame_category?.classes,
      {
        pen: is_editing && !$builder.isHideExtra /*Vie mode activate links!*/,
      },
    ]"
    :style="[object.style, background_style]"
  >
  </component>

  <component
    :is="gen(getProductCode(product))"
    v-for="product in products"
    :key="'p' + product.id"
    :product-id="product.id"
    class="x--product-frame"
    :class="[
      object.classes,
      object.data.frame_product?.classes,
      {
        pen: is_editing && !$builder.isHideExtra /*Vie mode activate links!*/,
      },
    ]"
    :style="[object.style, background_style]"
  >
  </component>
</template>

<script lang="ts">
import NotificationService from "@selldone/components-vue/plugins/notification/NotificationService.ts";

import StylerDirective from "../../../../styler/StylerDirective.ts";
import LMixinXComponent from "../../../../mixins/x-component/LMixinXComponent.ts";
import { XFeederProductsObject } from "@selldone/page-builder/components/x/feeder/products/XFeederProductsObject.ts";
import { ApplyAugmentToObject } from "@selldone/core-js/prototypes/index.ts";
import { defineComponent } from "vue/dist/vue.esm-bundler.js";
import { Category, CONSOLE, Product, ShopURLs } from "@selldone/core-js";
import CurrencyMixin from "@selldone/components-vue/mixin/currency/CurrencyMixin.ts";

export default {
  name: "XFeederProducts",
  mixins: [CurrencyMixin, LMixinXComponent],

  components: {},
  directives: { styler: StylerDirective },
  emits: ["update"],
  props: {
    object: { required: true, type: XFeederProductsObject },
  },

  data: () => ({
    Product: Product,

    forcePackage: null,

    busy_fetch: false,

    products: [] as Product[],
    folders: [] as Category[],
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
        CONSOLE.log("✻ Change products filter.");

        this.forcePackage = ApplyAugmentToObject(
          filter,
          this.augment,
          this.is_editing,
        );
      }
    },
  },

  created() {
    this.forcePackage = this.filter;

    // Set dynamic values for filter:
    this.forcePackage = ApplyAugmentToObject(
      this.forcePackage,
      this.augment,
      this.is_editing,
    );

    this.fetchData();
  },

  methods: {
    fetchData() {
      this.busy_fetch = true;

      let limit,
        categories_count,
        sort,
        available,
        search,
        search_type,
        dir,
        filter,
        products_only,
        categories_only,
        dirs,
        bounds,
        tags,
        vendor_id,
        surrounded;

      limit = this.forcePackage.count;
      categories_count = this.forcePackage.categories_count; // In page builder! Products section!
      sort = this.forcePackage.sort;
      available = this.forcePackage.only_available;
      search = this.forcePackage.search;
      search_type = this.forcePackage.search_type;
      dir = "*"; //this.forcePackage.dir Force search in all products & categories!
      filter = this.forcePackage.filter
        ? JSON.stringify(this.forcePackage.filter)
        : null;
      products_only = this.forcePackage.products_only;
      categories_only = this.forcePackage.categories_only;
      dirs = this.forcePackage.dirs;

      bounds = this.forcePackage.bounds;

      tags = this.forcePackage.tags;
      vendor_id = this.forcePackage.vendor_id;
      surrounded = this.forcePackage.surrounded;

      axios
        .get(window.XAPI.GET_PRODUCTS(this.shop.name), {
          params: {
            offset: 0,
            limit: limit,
            categories_count: categories_count,

            with_parent: false,

            sort: sort,
            available: available,
            search: search,
            search_type: search_type,

            dir: dir,
            dirs: dirs,

            filter: filter, //filter

            products_only: products_only, // Only products if load more!
            categories_only: categories_only,

            with_total: false,

            bounds: bounds, // Location constraints

            tags: tags, //Filter by tags
            vendor_id: vendor_id, // Show only for this vendor!

            surrounded: surrounded, // true:Show only selected categories. false: Show items inside selected categories.
          },
        })
        .then(({ data }) => {
          if (data.error) {
            return NotificationService.showErrorAlert(null, data.error_msg);
          }

          this.products = data.products;
          this.folders = data.folders;
          this.$nextTick(() => {
            this.$emit("update", {
              categories: this.folders,
              products: this.products,
            });
          });
        })
        .catch((error) => {
          NotificationService.showLaravelError(error);
        })

        .finally(() => {
          this.busy_fetch = false;
        });
    },

    //---------------------------------------------------------------
    gen(html) {
      return defineComponent({
        template: html,
        components: {}, // Register local custom components
      });
    },

    getProductCode(product) {
      if (!product) return "-";
      let code = this.object.data.frame_product?.code;
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
        ShopURLs.GetProductLink(this.getShop(), product.id),
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
      let code = this.object.data.frame_category?.code;
      if (!code) return "<div class='pa-5'>⚠ NO FRAME CODE!</div>";

      // Replace all occurrences of '{category.icon}' with the dynamic value
      code = code.replace(
        /{category\.icon}/g,
        this.getShopImagePath(category.icon),
      );

      code = code.replace(
        /{url}/g,
        ShopURLs.GetCategoryLink(this.getShop(), category.name),
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

<style scoped></style>
