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
  <div>
    <!-- ████████████████████ Sort ████████████████████ -->

    <div v-if="hasSort" class="mb-5">
      <s-widget-header
        :title="$t('global.commons.sort')"
        icon="sort"
      ></s-widget-header>
      <v-list-subheader>
        {{ $t("styler.products.sort_options") }}
      </v-list-subheader>

      <s-products-sort-view
        v-model="product_sort"
        v-model:only-available="only_available"
        active-class="blue-flat"
        class="mx-2 overflow-auto"
        two-line
      />
    </div>

    <!-- ━━━━━━━━━━━━━━━━ Mobile vie mode ━━━━━━━━━━━━━━━━ -->
    <!-- ████████████████████ View Mode ████████████████████ -->
    mode_view:{{mode_view}} / {{mode_view_f}}
    <h3 class="text-start mb-1 font-weight-light">
      <v-icon class="me-1">smartphone</v-icon>
      {{ $t("global.commons.mobile") }}
    </h3>
    <div class="text-center">
      <b-shop-theme-view-move
        v-model="mode_view"
        icon="shelves"
        :label="$t('global.commons.products')" dark
      >
      </b-shop-theme-view-move>

      <b-shop-theme-view-move
        v-model="mode_view_f"
        icon="folder"
        :label="$t('global.commons.categories')" dark
      >
      </b-shop-theme-view-move>
    </div>


    <!-- ████████████████████ Type ████████████████████ -->

    <div
      v-if="hasProductCategorySelection"
      class="py-5"
      style="border-top: dashed thin #777"
    >
      <s-widget-header
        :title="
          $t('global.commons.category') + ' / ' + $t('global.commons.product')
        "
        icon="dashboard_customize"
      ></s-widget-header>

      <v-list-subheader
        >{{ $t("styler.products.item_types") }}
      </v-list-subheader>

      <v-btn-toggle
        v-model="selected_mode"
        :border="2"
        class="mt-2"
        divided
        mandatory
        selected-class="blue-flat"
      >
        <v-btn
          value="all"
          @click="
            () => {
              products_only = false;
              categories_only = false;
            }
          "
        >
          <v-icon start>all_inclusive</v-icon>
          {{ $t("global.commons.all") }}
        </v-btn>
        <!-- ⬬⬬⬬⬬ Only products ⬬⬬⬬⬬ -->

        <v-btn
          value="product"
          @click="
            () => {
              products_only = true;
              categories_only = false;
            }
          "
        >
          <v-icon start>inventory</v-icon>
          {{ $t("styler.products.product_only") }}
        </v-btn>
        <!-- ⬬⬬⬬⬬ Only categories ⬬⬬⬬⬬ -->

        <v-btn
          value="category"
          @click="
            () => {
              products_only = false;
              categories_only = true;
            }
          "
        >
          <v-icon start>folder</v-icon>
          {{ $t("styler.products.category_only") }}
        </v-btn>
      </v-btn-toggle>
    </div>

    <!-- ████████████████████ Categories ████████████████████ -->
    <div class="py-5" style="border-top: dashed thin #777">
      <s-widget-header
        :title="$t('global.commons.categories')"
        icon="folder_open"
      ></s-widget-header>

      <v-list-subheader
        >{{ $t("styler.products.select_categories") }}
      </v-list-subheader>

      <u-smart-switch
        v-model="surrounded"
        :dark="dark"
        class="my-3"
        false-icon="select_all"
        false-title="Show items inside selected categories."
        true-icon="deselect"
        true-title="Show only selected categories."
      >
      </u-smart-switch>

      <ul v-if="surrounded" class="text-start mb-5">
        <li>
          <b>
            <v-icon class="me-1" size="small">all_inclusive</v-icon>
            {{ $t("global.commons.all") }}:
          </b>
          Only selected categories and the products inside them will be shown.
          <v-icon
            v-if="!products_only && !categories_only"
            class="mx-1 zoomIn"
            color="green"
            size="small"
            >check_circle
          </v-icon>
        </li>
        <li>
          <b>
            <v-icon class="me-1" size="small">inventory</v-icon>
            {{ $t("styler.products.product_only") }}:
          </b>
          Only products in selected categories will be shown.
          <v-icon
            v-if="products_only && !categories_only"
            class="mx-1 zoomIn"
            color="green"
            size="small"
            >check_circle
          </v-icon>
        </li>

        <li>
          <b>
            <v-icon class="me-1" size="small">folder</v-icon>
            {{ $t("styler.products.category_only") }}:
          </b>
          Only selected categories will be shown.
          <v-icon
            v-if="!products_only && categories_only"
            class="mx-1"
            color="green zoomIn"
            size="small"
            >check_circle
          </v-icon>
        </li>
      </ul>

      <ul v-else class="text-start mb-5">
        <li>
          <b>
            <v-icon class="me-1" size="small">all_inclusive</v-icon>
            {{ $t("global.commons.all") }}:
          </b>
          Only products and sub categories in the selected categories will be
          shown.
          <v-icon
            v-if="!products_only && !categories_only"
            class="mx-1 zoomIn"
            color="green"
            size="small"
            >check_circle
          </v-icon>
        </li>
        <li>
          <b>
            <v-icon class="me-1" size="small">inventory</v-icon>
            {{ $t("styler.products.product_only") }}:
          </b>
          Only products in the selected categories will be shown.
          <v-icon
            v-if="products_only && !categories_only"
            class="mx-1 zoomIn"
            color="green"
            size="small"
            >check_circle
          </v-icon>
        </li>

        <li>
          <b>
            <v-icon class="me-1" size="small">folder</v-icon>
            {{ $t("styler.products.category_only") }}:
          </b>
          Only sub categories in the selected categories will be shown.
          <v-icon
            v-if="!products_only && categories_only"
            class="mx-1 zoomIn"
            color="green"
            size="small"
            >check_circle
          </v-icon>
        </li>
      </ul>
      <b-category-input
        v-if="hasCategoriesFilter"
        v-model="categories_value"
        chips
        clearable
        label="Categories list"
        multiple
        no-home
        persistent-placeholder
        placeholder="Root / Leave it empty to display items in the root."
      >
      </b-category-input>
    </div>

    <!-- ████████████████████ Tags ████████████████████ -->
    <div
      v-if="!categories_only"
      class="py-5"
      style="border-top: dashed thin #777"
    >
      <s-widget-header icon="label" title="Tags"></s-widget-header>

      <v-list-subheader>
        <div>
          Filter by product tags. You can set tags in the
          <b>Product > Edit > Survey & Features > Tags</b>.
        </div>
      </v-list-subheader>
      <v-combobox
        v-model="tags"
        chips
        clearable
        closable-chips
        hint="You can set dynamic values { { key } } here. This value will be replace by augmentation data in product,category or other pages."
        label="Tags list"
        multiple
        persistent-placeholder
        placeholder="Write tag and press enter. ex. new collection"
        variant="underlined"
      >
        <template v-slot:chip="{ item, props }">
          <v-chip v-bind="props">
            <v-avatar
              :color="
                isDynamicValue(item.raw)
                  ? '#FFF'
                  : item.raw
                    ? item.raw.toColor(true)
                    : '#333'
              "
              class="text-white"
              start
              >{{
                isDynamicValue(item.raw)
                  ? "🪄"
                  : item.raw?.slice(0, 1).toUpperCase()
              }}
            </v-avatar>
            {{ item }}
          </v-chip>
        </template>
      </v-combobox>
    </div>

    <!-- ████████████████████ Vendor ████████████████████ -->
    <!-- ▀▀▀▀▀▀▀▀▀ 🟣 Marketplace 🟣 ▀▀▀▀▀▀▀▀▀ -->
    <div
      v-if="is_marketplace"
      class="py-5"
      style="border-top: dashed thin #777"
    >
      <s-widget-header icon="storefront" title="Vendor"></s-widget-header>

      <v-list-subheader
        >Show products only for a selected vendor. You can use this option to
        create dedicated landing pages for your vendors.
      </v-list-subheader>
      <ul class="text-start mb-5">
        <li>
          <b>
            <v-icon class="me-1" size="small">looks_one</v-icon>
            Owned products:
          </b>
          Products created by the vendor will be displayed.
        </li>
        <li>
          <b>
            <v-icon class="me-1" size="small">looks_two</v-icon>
            Related products:
          </b>
          Products that have this vendor in its vendors list will be shown.
        </li>
      </ul>
      <b-vendor-input
        v-model="vendor_id"
        :shop="shop"
        label="Vendor"
        placeholder="Filter by vendor..."
      ></b-vendor-input>
    </div>

    <!-- ████████████████████ Count ████████████████████ -->
    <div v-if="hasCount" class="py-5" style="border-top: dashed thin #777">
      <s-widget-header
        :title="$t('global.commons.limit')"
        icon="margin"
      ></s-widget-header>

      <u-number-input
        v-if="!categories_only"
        v-model="products_count"
        :label="$t('styler.products.limit')"
        :max="24"
        :messages="$t('styler.products.limit_message')"
        :min="1"
        :step="1"
        class="my-6 max-width-field mx-auto"
        show-buttons
        suffix="items"
      ></u-number-input>

      <u-number-input
        v-if="!products_only"
        v-model="categories_count"
        :label="$t('styler.products.categories_limit')"
        :max="24"
        :messages="$t('styler.products.categories_limit_msg')"
        :min="1"
        :step="1"
        class="my-6 max-width-field mx-auto"
        clearable
        placeholder="No limit"
        show-buttons
        suffix="items"
      ></u-number-input>
    </div>
  </div>
</template>

<script>
import SProductsSortView from "@selldone/components-vue/storefront/product/sort/SProductsSortView.vue";
import UNumberInput from "@selldone/components-vue/ui/number/input/UNumberInput.vue";
import { ModeView } from "@selldone/core-js/enums/shop/ModeView";
import BCategoryInput from "@selldone/components-vue/backoffice/category/input/BCategoryInput.vue";
import BVendorInput from "@selldone/components-vue/backoffice/vendor/input/BVendorInput.vue";
import { BusinessModel } from "@selldone/core-js/enums/shop/BusinessModel";
import USmartSwitch from "@selldone/components-vue/ui/smart/switch/USmartSwitch.vue";
import BShopThemeViewMove from "@app-backoffice/pages/shop/setting/theme/view-mode/BShopThemeViewMove.vue";

export default {
  name: "SPageProductsFilter",
  components: {
    BShopThemeViewMove,
    USmartSwitch,
    BVendorInput,
    BCategoryInput,
    UNumberInput,
    SProductsSortView,
  },

  props: {
    modelValue: {},
    hasSort: {
      required: false,
      type: Boolean,
      default: false,
    },

    hasProductCategorySelection: {
      required: false,
      type: Boolean,
      default: false,
    },

    hasCategoriesFilter: {
      required: false,
      type: Boolean,
      default: false,
    },

    hasCount: {
      required: false,
      type: Boolean,
      default: false,
    },

    defaultValue: {
      required: false,
    },

    dark: {
      type: Boolean,
      default: false,
    },
  },

  data: () => ({
    // ===== Product Filter =====

    product_sort: null,
    only_available: true,
    products_only: false,
    categories_only: false,

    surrounded: false,
    categories_value: [],

    products_count: 8,
    categories_count: 0,
    selected_mode: "all",

    tags: [],

    vendor_id: null,

    mode_view: ModeView.NORMAL.code,
    mode_view_f:null,
  }),

  watch: {
    filter_bundle(val) {
      this.$emit("update:modelValue", val);
    },
  },

  computed: {
    shop() {
      return this.getShop();
    },
    is_marketplace() {
      return this.shop.model === BusinessModel.MARKETPLACE.code;
    },
    filter_bundle() {
      const tags = this.tags
        ?.filter((i) => !!i)
        .map((i) => i.toLowerCase())
        .unique();

      let filter_bundle = {
        sort: this.product_sort,
        only_available: this.only_available,
        products_only: this.products_only,
        categories_only: this.categories_only,
        dirs: this.categories_value.length ? this.categories_value : null,
        dir:
          this.categories_value.length === 1 ? this.categories_value[0] : null,

        count: this.products_count,
        categories_count: this.categories_count,

        tags: tags,

        vendor_id: this.vendor_id,

        mode_view: this.mode_view,
        mode_view_f:this.mode_view_f,

        surrounded: this.surrounded,
      };
      return filter_bundle;
    },
  },

  created() {
    this.setDefaultValues(
      this.modelValue ? this.modelValue : this.defaultValue,
    );
  },
  methods: {
    isDynamicValue(item) {
      return item?.includes("{{") && item?.includes("}}");
    },
    //================================= Product Filter ===================================

    setDefaultValues(filter_bundle) {
      if (!filter_bundle) return;
      this.product_sort = filter_bundle.sort;
      this.only_available = filter_bundle.only_available;
      this.products_only = filter_bundle.products_only;
      this.categories_only = filter_bundle.categories_only;
      this.categories_value =
        filter_bundle.dirs && Array.isArray(filter_bundle.dirs)
          ? filter_bundle.dirs
          : [];

      this.products_count = filter_bundle.count;
      this.categories_count = filter_bundle.categories_count;

      this.tags = filter_bundle.tags;
      this.vendor_id = filter_bundle.vendor_id;

      this.selected_mode = filter_bundle.products_only
        ? "product"
        : filter_bundle.categories_only
          ? "category"
          : "all";

      this.mode_view = filter_bundle.mode_view;
      this.mode_view_f = filter_bundle.mode_view_f; // For categories

      this.surrounded = !!filter_bundle.surrounded;

      //this.$forceUpdate(); // Force refresh component!
    },
  },
};
</script>

<style scoped></style>
