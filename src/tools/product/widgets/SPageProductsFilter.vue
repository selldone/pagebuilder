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
      <v-list-subheader> {{ $t("styler.products.sort_options") }} </v-list-subheader>

      <s-products-sort-view
        v-model="product_sort"
        class="mx-2 overflow-auto"
        :only-available.sync="only_available"
        has-view-mode
        :viewMode.sync="mode_view"
        two-line
        active-class="blue-flat"
      />
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

      <v-list-subheader>{{ $t("styler.products.item_types") }}</v-list-subheader>

      <v-btn-toggle
        v-model="selected_mode"
        mandatory
        rounded
        borderless
        class="widget-toggle"
        active-class="blue-flat"
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
          <v-icon class="me-1">all_inclusive</v-icon>
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
          <v-icon class="me-1">inventory</v-icon>
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
          <v-icon class="me-1">folder</v-icon>
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

      <v-list-subheader>{{ $t("styler.products.select_categories") }}</v-list-subheader>

      <s-smart-switch
        v-model="surrounded"
        false-title="Show items inside selected categories."
        false-icon="select_all"
        true-title="Show only selected categories."
        true-icon="deselect"
        :dark="dark"
        class="my-3"
      >
      </s-smart-switch>

      <ul v-if="surrounded" class="text-start mb-5">
        <li>
          <b>
            <v-icon class="me-1" small>all_inclusive</v-icon>
            {{ $t("global.commons.all") }}:
          </b>
          Only selected categories and the products inside them will be shown.
          <v-icon
            class="mx-1 zoomIn"
            small
            color="green"
            v-if="!products_only && !categories_only"
            >check_circle</v-icon
          >
        </li>
        <li>
          <b>
            <v-icon class="me-1" small>inventory</v-icon>
            {{ $t("styler.products.product_only") }}:
          </b>
          Only products in selected categories will be shown.
          <v-icon
            class="mx-1 zoomIn"
            small
            color="green"
            v-if="products_only && !categories_only"
            >check_circle</v-icon
          >
        </li>

        <li>
          <b>
            <v-icon class="me-1" small>folder</v-icon>
            {{ $t("styler.products.category_only") }}:
          </b>
          Only selected categories will be shown.
          <v-icon
            class="mx-1"
            small
            color="green zoomIn"
            v-if="!products_only && categories_only"
            >check_circle</v-icon
          >
        </li>
      </ul>

      <ul v-else class="text-start mb-5">
        <li>
          <b>
            <v-icon class="me-1" small>all_inclusive</v-icon>
            {{ $t("global.commons.all") }}:
          </b>
          Only products and sub categories in the selected categories will be
          shown.<v-icon
            class="mx-1 zoomIn"
            small
            color="green"
            v-if="!products_only && !categories_only"
            >check_circle</v-icon
          >
        </li>
        <li>
          <b>
            <v-icon class="me-1" small>inventory</v-icon>
            {{ $t("styler.products.product_only") }}:
          </b>
          Only products in the selected categories will be shown.
          <v-icon
            class="mx-1 zoomIn"
            small
            color="green"
            v-if="products_only && !categories_only"
            >check_circle</v-icon
          >
        </li>

        <li>
          <b>
            <v-icon class="me-1" small>folder</v-icon>
            {{ $t("styler.products.category_only") }}:
          </b>
          Only sub categories in the selected categories will be shown.
          <v-icon
            class="mx-1 zoomIn"
            small
            color="green"
            v-if="!products_only && categories_only"
            >check_circle</v-icon
          >
        </li>
      </ul>

      <b-shop-category-input
        v-if="hasCategoriesFilter"
        v-model="categories_value"
        chips
        label="Categories list"
        placeholder="Root / Leave it empty to display items in the root."
        persistent-placeholder
        multiple
        clearable
        no-home
      >
      </b-shop-category-input>
    </div>

    <!-- ████████████████████ Tags ████████████████████ -->
    <div
      v-if="!categories_only"
      class="py-5"
      style="border-top: dashed thin #777"
    >
      <s-widget-header title="Tags" icon="label"></s-widget-header>

      <v-list-subheader
        ><div>
          Filter by product tags. You can set tags in the
          <b>Product > Edit > Survey & Features > Tags</b>.
        </div>
      </v-list-subheader>
      <v-combobox
        v-model="tags"
        multiple
        deletable-chips
        clearable
        chips
        placeholder="Write tag and press enter. ex. new collection"
        persistent-placeholder
        label="Tags list"
        hint="You can set dynamic values { { key } } here. This value will be replace by augmentation data in product,category or other pages."
      >
        <template
          v-slot:selection="{ item, attrs, selected, disabled, parent }"
        >
          <v-chip
            :key="JSON.stringify(item)"
            v-bind="attrs"
            :input-value="selected"
            :disabled="disabled"
            @click:close="parent.selectItem(item)"
            close
          >
            <v-avatar
              class="white--text"
              :color="
                isDynamicValue(item)
                  ? '#FFF'
                  : item
                  ? item.toColor(true)
                  : '#333'
              "
              left
              >{{
                isDynamicValue(item) ? "🪄" : item?.slice(0, 1).toUpperCase()
              }}</v-avatar
            >
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
      <s-widget-header title="Vendor" icon="storefront"></s-widget-header>

      <v-list-subheader
        >Show products only for a selected vendor. You can use this option to
        create dedicated landing pages for your vendors.
      </v-list-subheader>
      <ul class="text-start mb-5">
        <li>
          <b>
            <v-icon class="me-1" small>looks_one</v-icon>
            Owned products:
          </b>
          Products created by the vendor will be displayed.
        </li>
        <li>
          <b>
            <v-icon class="me-1" small>looks_two</v-icon>
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

      <s-number-input
        v-if="!categories_only"
        class="my-6 max-width-field mx-auto"
        v-model="products_count"
        :label="$t('styler.products.limit')"
        suffix="items"
        :min="1"
        :step="1"
        :max="24"
        show-buttons
        :messages="$t('styler.products.limit_message')"
      ></s-number-input>

      <s-number-input
        v-if="!products_only"
        class="my-6 max-width-field mx-auto"
        v-model="categories_count"
        :label="$t('styler.products.categories_limit')"
        suffix="items"
        :min="1"
        :step="1"
        :max="24"
        show-buttons
        clearable
        :messages="$t('styler.products.categories_limit_msg')"
        placeholder="No limit"
      ></s-number-input>
    </div>
  </div>
</template>

<script>
import SProductsSortView from "@components/product/sort/SProductsSortView.vue";
import SNumberInput from "@components/ui/input/number/SNumberInput.vue";
import { ModeView } from "@core/enums/shop/ModeView";
import BShopCategoryInput from "@components/backoffice/shop/category/input/BShopCategoryInput.vue";
import BVendorInput from "@components/backoffice/vendor/input/BVendorInput.vue";
import { BusinessModel } from "@core/enums/shop/BusinessModel";
import SSmartSwitch from "@components/smart/SSmartSwitch.vue";

export default {
  name: "SPageProductsFilter",
  components: {
    SSmartSwitch,
    BVendorInput,
    BShopCategoryInput,
    SNumberInput,
    SProductsSortView,
  },

  props: {
    value: {},
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

    mode_view: ModeView.NORMAL,
  }),

  watch: {
    /* value(value) {
               if (value) this.setDefaultValues(value);
             }*/

    filter_bundle(val) {
      this.$emit("input", val);
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

        mode_view: this.mode_view.code,

        surrounded: this.surrounded,
      };
      return filter_bundle;
    },
  },

  created() {
    this.setDefaultValues(this.value ? this.value : this.defaultValue);
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

      this.mode_view = filter_bundle.mode_view
        ? Object.values(ModeView).find(
            (m) => m.code === filter_bundle.mode_view
          )
        : ModeView.NORMAL;

      this.surrounded = !!filter_bundle.surrounded;

      this.$forceUpdate(); // Force refresh component!
    },
  },
};
</script>

<style scoped></style>
