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
    v-styler:products="$sectionData.products_list"
    custom-layout="true"
  >
    <x-custom-products-list
      :force-package="forcePackage"
      @update="initComponents"
    >
      <template v-slot:folders="{ folders }">
        <span
          v-for="folder in folders"
          :key="'f' + folder.id"
          v-html="getCategoryCode(folder)"
          :class="[
            $sectionData.frame_category?.classes,
            {
              pen:
                $builder.isEditing &&
                !$builder.isHideExtra /*Vie mode activate links!*/,
            },
          ]"
          :category-id="folder.id"
        >
        </span>
      </template>

      <template v-slot:products="{ products }">
        <span
          v-for="product in products"
          :key="'p' + product.id"
          v-html="getProductCode(product)"
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
        </span>
      </template>
    </x-custom-products-list>
  </x-section>
</template>

<script>
import * as types from "../../src/types";
import Vue from "vue";
import { VRating } from "vuetify/lib/components";
import ProductVariantsView from "@components/product/variant/ProductVariantsView.vue";
import CountDown from "@components/ui/count-down/CountDown.vue";

export default {
  name: "SectionProductsCustomList",
  components: {},
  cover: require("../../assets/images/covers/products-list-custom.svg"),

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

    products_list: types.Products,

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
    "$sectionData.products_list"(value) {
      if (value instanceof Object) {
        console.log("✻ Change products filter.");
        this.forcePackage = value;
      }
    },
    "$sectionData.frame_product"() {
      // Always update on custom frame dialog accept!
      console.log("✻ Initialize layouts.");

      this.$nextTick(() => {
        this.initComponents({
          categories: this.categories,
          products: this.products,
        });
      });
    },
  },

  created() {
    this.forcePackage = this.$sectionData.products_list;

    // Set dynamic values for filter:
    if (Array.isArray(this.forcePackage?.tags)) {
      this.forcePackage.tags = this.forcePackage.tags.map((x) =>
        this.isString(x)
          ? x.applyAugment(this.augment, this.$builder.isEditing)
          : x
      );
    }
  },

  mounted() {},

  methods: {
    getProductCode(product) {
      if (!product) return "-";
      let code = this.$sectionData.frame_product?.code;
      if (!code) return "<div class='pa-5'>⚠ NO FRAME CODE!</div>";

      // Replace all occurrences of '{product.icon}' with the dynamic value
      code = code.replace(
        /{product\.icon}/g,
        this.getShopImagePath(product.icon)
      );
      code = code.replace(
        /{product\.price}/g,
        this.getFormatPriceCurrency(product.price, product.currency)
      );

      code = code.replace(
        /{product\.final_price}/g,
        this.getFormatPriceCurrency(product.final_price, product.currency)
      );
      code = code.replace(
        /{product\.discount}/g,
        this.getFormatPriceCurrency(product.discount, product.currency)
      );

      code = code.replace(
        /{url}/g,
        this.getProductLink(this.getShop(), product.id)
      );

      function generateDynamicRegex(key) {
        return new RegExp(`{product\\.${key}}`, "g");
      }

      Object.keys(product)
        .filter((key) => !["icon", "price",'discount','final_price'].includes(key))
        .forEach((key) => {
          const val = product[key];
          if (this.isObject(val) || Array.isArray(val)) return;

          code = code.replace(generateDynamicRegex(key), val);
        });

      return code;
    },

    getCategoryCode(category) {
      if (!category) return "-";
      let code = this.$sectionData.frame_category?.code;
      if (!code) return "<div class='pa-5'>⚠ NO FRAME CODE!</div>";

      // Replace all occurrences of '{category.icon}' with the dynamic value
      code = code.replace(
        /{category\.icon}/g,
        this.getShopImagePath(category.icon)
      );

      code = code.replace(
        /{url}/g,
        this.getCategoryLink(this.getShop(), category.name)
      );

      function generateDynamicRegex(key) {
        return new RegExp(`{category\\.${key}}`, "g");
      }

      Object.keys(category)
        .filter((key) => !["icon"].includes(key))
        .forEach((key) => {
          const val = category[key];
          if (this.isObject(val) || Array.isArray(val)) return;

          code = code.replace(generateDynamicRegex(key), val);
        });

      return code;
    },

    initComponents({ categories, products }) {
      this.categories = categories;
      this.products = products;

      const vuetify = window.$global_vuetify;
      const i18n = window.$i18n_global;
      const store = window.$global_store;

      const t = this;
      //――――――――――――――――――――――― 💡 Mega Replacer ▶ Rating ―――――――――――――――――――――――
      /**
       *
       * @param component_name
       * @param component
       * @param attributes    object {attribute : default value}
       * @constructor
       */
      function autoReplaceComponents(
        component_name,
        component,
        attributes,
        ignoreCallback = () => false
      ) {
        $(t.$el)
          .find(component_name) // Find code editors:
          .each(function () {
            const productId = $(this)
              .closest("[product-id]")
              .attr("product-id");
            const categoryId = $(this)
              .closest("[product-id]")
              .attr("category-id");

            if (ignoreCallback(categoryId, productId)) return; // 🛑 If function return empty then object will not be created!

            const _class = $(this).attr("class");
            const _style = $(this).attr("style");

            // console.log("categoryId: ", categoryId);
            // console.log("productId: ", productId);

            //console.log('has editable_body: ',editable)

            let ComponentClass = Vue.extend(component);

            const propsData = {};

            Object.keys(attributes)?.forEach((attr) => {
              let attr_value = $(this).attr(attr); // Load custom value by user
              const default_attr_value = attributes[attr];

              if (
                [null, undefined, ""].includes(attr_value) &&
                !t.isFunction(default_attr_value)
              ) {
                attr_value = default_attr_value; // Load default value
              }
              // Auto assign type:
              if (t.isBoolean(default_attr_value)) {
                attr_value = ["true", true].includes(attr_value);
              }

              // Function : we return founded product and category
              if (t.isFunction(default_attr_value)) {
                attr_value = default_attr_value(
                  categoryId,
                  productId,
                  attr_value
                );
              }

              if (![null, undefined, ""].includes(attr_value)) {
                propsData[attr] = attr_value;
              }
            });

            let instance = new ComponentClass({
              vuetify,
              i18n,
              store,
              propsData: propsData,
            });

            let element_code = instance.$mount().$el;

            $(this).replaceWith(element_code);

            // Assign class and style:
            t.$nextTick(function () {
              if (!element_code.setAttribute) return; //Not normal element (ex. comment,...)
              const __current_class = element_code.className;
              element_code.setAttribute(
                "class",
                (__current_class ? __current_class : "") + " " + _class
              );
              element_code.setAttribute("style", _style);
            });
          });
      }

      // Rating:
      autoReplaceComponents("rating", VRating, {
        dense: true,
        readonly: true,
        color: "amber",
        value: (categoryId, productId, val) => {
          return parseFloat(val);
        },
      });
      // Variants view:
      autoReplaceComponents(
        "variants",
        ProductVariantsView,
        {
          small: true,

          variants: (categoryId, productId, val) => {
            return this.products?.find((p) => p.id === parseInt(productId))
              ?.variants;
          },
        },
        (categoryId, productId) =>
          !this.products?.find((p) => p.id === parseInt(productId))?.variants
      );
      // Count down view:
      autoReplaceComponents(
        "count-down",
        CountDown,
        {
          end: (categoryId, productId, val) => val && val.convertToLocalDate(),
        },
        (categoryId, productId) =>
          !this.products?.find((p) => p.id === parseInt(productId))?.dis_start
      );
    },
  },
};
</script>

<style lang="scss" scoped></style>
