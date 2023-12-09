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
  <v-dialog
    :value="value"
    @input="(val) => $emit('input', val)"
    fullscreen
    scrollable
    transition="dialog-bottom-transition"
  >
    <v-card v-if="section_data">
      <v-card-title
        ><v-icon class="me-1" color="#333">donut_large</v-icon> Feeder
        <v-spacer></v-spacer>
        <v-chip title="Section Code" label x-small color="#fafafa">{{
          section.name
        }}</v-chip>
      </v-card-title>
      <v-card-text>
        <!-- ████████████████████ Background ████████████████████ -->
        <div class="widget-box mb-5" v-if="schema.background">
          <s-widget-header
            title="Background"
            icon="wallpaper"
          ></s-widget-header>
          <v-subheader
            >Alter the background of this section by choosing from a variety of
            options, including patterns, gradients, images, and videos to serve
            as the backdrop.</v-subheader
          >

          <v-sheet
            :style="backgroundStyle(section_data.background)"
            @click="
              ShowGlobalBackgroundEditorDialog(
                sectionElement,
                section,
                '$sectionData.background'
              )
            "
            class="rounded-lg min-h-100 d-flex align-center justify-center pa-2"
            :dark="section_data.background.dark"
          >
            <span class="small">Background Preview</span>
          </v-sheet>

          <s-smart-switch
            v-model="section_data.background.dark"
            true-title="Dark Mode"
            false-title="Light Mode"
            true-icon="dark_mode"
            false-icon="light_mode"
            class="my-3"
            true-description="Use this when you want the default text color to be white."
            false-description="Use this when you want the default text color to be black."
          >
          </s-smart-switch>
        </div>

        <!-- ████████████████████ Main Title / Content ████████████████████ -->
        <div class="widget-box mb-5" v-if="schema.title || schema.content">
          <s-widget-header
            title="Title & Subtitle"
            icon="sort"
          ></s-widget-header>
          <v-subheader
            >You can modify the primary section heading and subheading in this
            area.</v-subheader
          >
          <v-textarea
            v-if="schema.title"
            :rows="2"
            label="Title"
            auto-grow
            v-model="section_data.title"
            messages=" "
          >
            <template v-slot:message>
              <s-backoffice-augment-keys-finder
                :value="section_data.title"
              ></s-backoffice-augment-keys-finder>
            </template>
          </v-textarea>
          <v-textarea
            v-if="schema.content"
            :rows="2"
            label="Description"
            auto-grow
            v-model="section_data.content"
          >
            <template v-slot:message>
              <s-backoffice-augment-keys-finder
                :value="section_data.content"
              ></s-backoffice-augment-keys-finder>
            </template>
          </v-textarea>
        </div>

        <!-- ████████████████████ Buttons ████████████████████ -->
        <div class="widget-box mb-5" v-if="schema.buttons">
          <s-widget-header
            title="Buttons"
            icon="smart_button"
            add-text
            add-caption="Add Button"
            @click:add="addButton"
          ></s-widget-header>
          <v-subheader
            >In this section, you can configure the call-to-action
            elements.</v-subheader
          >

          <div class="border-between-vertical">
            <div
              v-for="(button, i) in section_data.buttons"
              :key="i"
              class="py-2 d-flex"
            >
              <div class="flex-grow-1">
                <v-text-field
                  label="Button Caption"
                  v-model="button.content"
                  placeholder="Write a call to action e.g View Now"
                ></v-text-field>
                <v-text-field
                  label="Link"
                  v-model="button.href"
                  append-icon="link"
                  placeholder="https://...  or relative path e.g. /products/..."
                ></v-text-field>
              </div>
              <v-btn
                icon
                class="ma-1"
                title="Delete button"
                @click="
                  Remove(section_data.buttons, button);
                  $forceUpdate();
                  sectionComponent.$forceUpdate();
                "
                ><v-icon color="red">close</v-icon></v-btn
              >
            </div>
          </div>
        </div>

        <!-- ████████████████████ Search ████████████████████ -->
        <div class="widget-box mb-5" v-if="schema.search">
          <s-widget-header title="Search" icon="search"></s-widget-header>
          <v-subheader
            >Modify the appearance of the search box here.</v-subheader
          >

          <s-storefront-search-box
            :solo="section_data.search.solo"
            :filled="section_data.search.filled"
            :flat="section_data.search.flat"
            :dark="section_data.search.dark"
            no-qr
            block
            readonly
            :background-color="section_data.search.color"
            expand-input
            label="Preview of search box..."
          ></s-storefront-search-box>

          <s-value-dashed>
            <template v-slot:label>Search Box</template>
            <s-color-selector
              v-model="section_data.search.color"
              nullable
            ></s-color-selector>
          </s-value-dashed>

          <s-smart-toggle
            v-model="section_data.search.dark"
            true-title="Dark Mode"
            true-description="Configure this setting if the search box has a dark background."
          ></s-smart-toggle>
          <s-smart-toggle
            v-model="section_data.search.filled"
            true-title="Filled"
            true-description="The search box was filled with a background."
          ></s-smart-toggle>

          <s-smart-toggle
            v-model="section_data.search.solo"
            true-title="Solo"
            true-description="In solo mode, a box is accentuated by a shadow for emphasis."
          ></s-smart-toggle>

          <s-smart-toggle
            v-model="section_data.search.flat"
            true-title="Flat"
            true-description="When set to solo mode, the search box becomes flat."
          ></s-smart-toggle>
        </div>

        <!-- ████████████████████ Product ████████████████████ -->
        <div
          class="widget-box mb-5"
          v-if="schema.product_info && section_data.product_info"
        >
          <s-widget-header title="Product" icon="inventory"></s-widget-header>
          <v-subheader
            >The chosen product information will be displayed in the product
            section.</v-subheader
          >

          <product-select-box
            :value="section_data.product_info.id"
            @input="
              (val) => {
                section_data.product_info = Object.assign(
                  {},
                  section_data.product_info
                );
                section_data.product_info.id = val; /*Force update product!*/
              }
            "
            :shop="getShop()"
            single-product-select
          >
          </product-select-box>
        </div>

        <!-- ████████████████████ Products & Categories ████████████████████ -->
        <div
          class="widget-box mb-5"
          v-if="schema.products_list && section_data.products_list"
        >
          <s-widget-header
            title="Products & Categories"
            icon="filter_alt"
          ></s-widget-header>
          <v-subheader
            >The chosen product information will be displayed in the product
            section.</v-subheader
          >

          <s-page-products-filter
            v-model="products_list_clone"
            has-sort
            has-product-category-selection
            has-categories-filter
            has-count
          />
        </div>

        <!-- ████████████████████ Row ████████████████████ -->
        <div class="widget-box mb-5" v-if="schema.row">
          <s-widget-header title="Row" icon="view_week"></s-widget-header>
          <v-subheader
            >Organize columns within a row, allowing for both vertical and
            horizontal alignment adjustments to be made for each
            column.</v-subheader
          >

          <feeder-align v-model="section_data.row.align"></feeder-align>
          <feeder-justify v-model="section_data.row.justify"></feeder-justify>
          <s-smart-toggle
            v-model="section_data.row.fluid"
            true-title="Fill width"
            true-description="The container spans the full width."
            false-description="The container possesses a restricted width."
            true-icon="swap_horiz"
            false-icon="compare_arrows"
          ></s-smart-toggle>
        </div>

        <!-- ████████████████████ Column ████████████████████ -->
        <feeder-column
          v-if="schema.columns?.length"
          :column.sync="section_data"
          has-grid
          has-title
          has-content
          has-image
          label="Column"
        ></feeder-column>
        <feeder-column
          v-if="schema.columnA?.columns?.length"
          :column.sync="section_data.columnA"
          label="Column A"
        ></feeder-column>
        <feeder-column
          v-if="schema.columnB?.columns?.length"
          :column.sync="section_data.columnB"
          label="Column B"
        ></feeder-column>
        <feeder-column
          v-if="schema.columnC?.columns?.length"
          :column.sync="section_data.columnC"
          label="Column C"
        ></feeder-column>

        <!-- ████████████████████ Image ████████████████████ -->

        <feeder-image
          v-if="schema.image && section_data.image"
          v-model="section_data.image"
        >
        </feeder-image>

        <!-- ████████████████████ Newsletter ████████████████████ -->
        <div
          class="widget-box mb-5"
          v-if="schema.newsletter && section_data.newsletter"
        >
          <s-widget-header
            title="Newsletter"
            icon="newspaper"
          ></s-widget-header>
          <v-subheader
            >You can modify the newsletter email input form in this
            location.</v-subheader
          >

          <feeder-newsletter v-model="section_data.newsletter">
          </feeder-newsletter>
        </div>
      </v-card-text>

      <v-card-actions>
        <div class="widget-buttons">
          <v-btn depressed color="primary" @click="onAccept" x-large>
            <v-icon class="me-1">check</v-icon>
            {{ $t("global.actions.confirm") }}</v-btn
          >
        </div>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import FeederColumn from "@app-page-builder/src/feeders/FeederColumn.vue";
import { BackgroundHelper } from "@core/helper/style/BackgroundHelper";
import SSmartSwitch from "@components/smart/SSmartSwitch.vue";
import FeederAlign from "@app-page-builder/src/feeders/FeederAlign.vue";
import FeederJustify from "@app-page-builder/src/feeders/FeederJustify.vue";
import SSmartToggle from "@components/smart/SSmartToggle.vue";
import { Button } from "@app-page-builder/src/types";
import { Seeder } from "@app-page-builder/src/seeder";
import SColorSelector from "@components/ui/color/selector/SColorSelector.vue";
import SStorefrontSearchBox from "@components/storefront/search/SStorefrontSearchBox.vue";
import ProductSelectBox from "@components/product/input/ProductSelectBox.vue";
import SPageProductsFilter from "@app-page-builder/src/tools/product/widgets/SPageProductsFilter.vue";
import FeederNewsletter from "@app-page-builder/src/feeders/FeederNewsletter.vue";
import FeederImage from "@app-page-builder/src/feeders/FeederImage.vue";
import SBackofficeAugmentKeysFinder from "@components/backoffice/augment/SBackofficeAugmentKeysFinder.vue";
import SValueDashed from "@components/ui/text/SValueDashed.vue";
export default {
  name: "GlobalSectionFeederDialog",
  components: {
    SBackofficeAugmentKeysFinder,
    FeederImage,
    FeederNewsletter,
    SPageProductsFilter,
    ProductSelectBox,
    SStorefrontSearchBox,
    SColorSelector,
    SValueDashed,
    SSmartToggle,
    FeederJustify,
    FeederAlign,
    SSmartSwitch,
    FeederColumn,
  },

  props: {
    value: {}, // Dialog
    section: { required: true },
    sectionComponent: { required: true },
  },
  data: () => ({
    products_list_clone: null, // To prevent live update
  }),

  computed: {
    section_data() {
      return this.section?.data;
    },
    schema() {
      return this.section?.schema;
    },
    sectionElement() {
      return this.sectionComponent?.$el;
    },
  },
  watch: {
    section_data() {
      this.assignValues();
    },
  },
  created() {
    this.assignValues();
  },
  mounted() {},
  beforeDestroy() {},

  methods: {
    assignValues() {
      this.products_list = this.section_data?.products_list
        ? Object.assign({}, this.section_data.products_list)
        : null;
    },

    onAccept() {
      if (this.schema.products_list) {
        // Section has products and categories filter:
        this.section_data.products_list = this.products_list_clone;
      }

      this.$emit("input", false);
    },
    backgroundStyle(background) {
      if (!background) return null;

      return BackgroundHelper.CreateCompleteBackgroundStyleObject(
        background.bg_custom,
        background.bg_gradient,
        background.bg_image ? this.getShopImagePath(background.bg_image) : null,
        background.bg_size,
        background.bg_repeat,
        background.bg_color,
        background.dark,
        background.bg_position
      );
    },

    addButton() {
      this.section_data.buttons.push(Seeder.seed(Button));
    },
  },
};
</script>

<style scoped lang="scss"></style>