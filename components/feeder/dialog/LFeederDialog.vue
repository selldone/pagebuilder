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
    :model-value="modelValue"
    fullscreen
    scrollable
    transition="dialog-bottom-transition"
    @update:model-value="(val) => $emit('update:modelValue', val)"
  >
    <v-card v-if="section_data" class="text-start">
      <v-card-title>
        <v-icon class="me-1" color="#333">donut_large</v-icon>
        Feeder
        <v-spacer></v-spacer>
        <v-chip color="#fafafa" label size="x-small" title="Section Code"
          >{{ section.name }}
        </v-chip>
      </v-card-title>
      <v-card-text>
        <!-- ████████████████████ Background ████████████████████ -->
        <div v-if="schema.background" class="widget-box mb-5">
          <s-widget-header
            icon="wallpaper"
            title="Background"
          ></s-widget-header>
          <v-list-subheader
            >Alter the background of this section by choosing from a variety of
            options, including patterns, gradients, images, and videos to serve
            as the backdrop.
          </v-list-subheader>

          <v-sheet
            :dark="section_data.background.dark"
            :style="backgroundStyle(section_data.background)"
            class="rounded-lg min-h-100 d-flex align-center justify-center pa-2"
            @click="
              ShowLSettingsBackground(
                sectionElement,
                section,
                '$sectionData.background',
              )
            "
          >
            <span class="small">Background Preview</span>
          </v-sheet>

          <u-smart-switch
            v-model="section_data.background.dark"
            class="my-3"
            false-description="Use this when you want the default text color to be black."
            false-icon="light_mode"
            false-title="Light Mode"
            true-description="Use this when you want the default text color to be white."
            true-icon="dark_mode"
            true-title="Dark Mode"
          >
          </u-smart-switch>
        </div>

        <!-- ████████████████████ Main Title / Content ████████████████████ -->
        <div v-if="schema.title || schema.content" class="widget-box mb-5">
          <s-widget-header
            icon="sort"
            title="Title & Subtitle"
          ></s-widget-header>
          <v-list-subheader
            >You can modify the primary section heading and subheading in this
            area.
          </v-list-subheader>
          <v-textarea
            v-if="schema.title"
            v-model="section_data.title.value"
            :rows="2"
            auto-grow
            label="Title"
            messages=" "
            variant="underlined"
          >
            <template v-slot:message>
              <l-augment-finder
                :model-value="section_data.title.value"
              ></l-augment-finder>
            </template>
          </v-textarea>
          <v-textarea
            v-if="schema.content"
            v-model="section_data.content.value"
            :rows="2"
            auto-grow
            label="Description"
            variant="underlined"
          >
            <template v-slot:message>
              <l-augment-finder
                :model-value="section_data.content.value"
              ></l-augment-finder>
            </template>
          </v-textarea>
        </div>

        <!-- ████████████████████ Buttons ████████████████████ -->
        <div v-if="schema.buttons" class="widget-box mb-5">
          <s-widget-header
            add-caption="Add Button"
            add-text
            icon="smart_button"
            title="Buttons"
            @click:add="addButton"
          ></s-widget-header>
          <v-list-subheader
            >In this section, you can configure the call-to-action elements.
          </v-list-subheader>

          <div class="border-between-vertical">
            <div
              v-for="(button, i) in section_data.buttons"
              :key="i"
              class="py-2 d-flex"
            >
              <div class="flex-grow-1">
                <v-text-field
                  v-model="button.content"
                  label="Button Caption"
                  placeholder="Write a call to action e.g View Now"
                  variant="underlined"
                ></v-text-field>
                <v-text-field
                  v-model="button.href"
                  append-icon="link"
                  label="Link"
                  placeholder="https://...  or relative path e.g. /products/..."
                  variant="underlined"
                ></v-text-field>
              </div>
              <v-btn
                class="ma-1"
                icon
                title="Delete button"
                variant="text"
                @click="
                  Remove(section_data.buttons, button);
                  $forceUpdate();
                  sectionComponent.$forceUpdate();
                "
              >
                <v-icon color="red">close</v-icon>
              </v-btn>
            </div>
          </div>
        </div>

        <!-- ████████████████████ Search ████████████████████ -->
        <div v-if="schema.search" class="widget-box mb-5">
          <s-widget-header icon="search" title="Search"></s-widget-header>
          <v-list-subheader
            >Modify the appearance of the search box here.
          </v-list-subheader>

          <s-storefront-search-box
            :background-color="section_data.search.color"
            :dark="section_data.search.dark"
            :filled="section_data.search.filled"
            :flat="section_data.search.flat"
            :solo="section_data.search.solo"
            block
            expand-input
            label="Preview of search box..."
            no-qr
            readonly
          ></s-storefront-search-box>

          <u-text-value-dashed>
            <template v-slot:label>Search Box</template>
            <u-color-selector
              v-model="section_data.search.color"
              nullable
            ></u-color-selector>
          </u-text-value-dashed>

          <u-smart-toggle
            v-model="section_data.search.dark"
            true-description="Configure this setting if the search box has a dark background."
            true-title="Dark Mode"
          ></u-smart-toggle>
          <u-smart-toggle
            v-model="section_data.search.filled"
            true-description="The search box was filled with a background."
            true-title="Filled"
          ></u-smart-toggle>

          <u-smart-toggle
            v-model="section_data.search.solo"
            true-description="In solo mode, a box is accentuated by a shadow for emphasis."
            true-title="Solo"
          ></u-smart-toggle>

          <u-smart-toggle
            v-model="section_data.search.flat"
            true-description="When set to solo mode, the search box becomes flat."
            true-title="Flat"
          ></u-smart-toggle>
        </div>

        <!-- ████████████████████ Product ████████████████████ -->
        <div
          v-if="schema.product_info && section_data.product_info"
          class="widget-box mb-5"
        >
          <s-widget-header icon="inventory" title="Product"></s-widget-header>
          <v-list-subheader
            >The chosen product information will be displayed in the product
            section.
          </v-list-subheader>

          <b-products-select-box
            :model-value="section_data.product_info.id"
            :shop="getShop()"
            single-product-select
            @update:model-value="
              (val) => {
                section_data.product_info = Object.assign(
                  {},
                  section_data.product_info,
                );
                section_data.product_info.id = val; /*Force update product!*/
              }
            "
          >
          </b-products-select-box>
        </div>

        <!-- ████████████████████ Products & Categories ████████████████████ -->
        <div
          v-if="schema.filter && section_data.filter"
          class="widget-box mb-5"
        >
          <s-widget-header
            icon="filter_alt"
            title="Products & Categories"
          ></s-widget-header>
          <v-list-subheader
            >The chosen product information will be displayed in the product
            section.
          </v-list-subheader>

          <s-page-products-filter
            v-model="filter_clone"
            has-categories-filter
            has-count
            has-product-category-selection
            has-sort
          />
        </div>

        <!-- ████████████████████ Row ████████████████████ -->
        <div v-if="schema.row" class="widget-box mb-5">
          <s-widget-header icon="view_week" title="Row"></s-widget-header>
          <v-list-subheader
            >Organize columns within a row, allowing for both vertical and
            horizontal alignment adjustments to be made for each column.
          </v-list-subheader>

          <l-feeder-align v-model="section_data.row.align"></l-feeder-align>
          <l-feeder-justify
            v-model="section_data.row.justify"
          ></l-feeder-justify>
          <u-smart-toggle
            v-model="section_data.row.fluid"
            false-description="The container possesses a restricted width."
            false-icon="compare_arrows"
            true-description="The container spans the full width."
            true-icon="swap_horiz"
            true-title="Fill width"
          ></u-smart-toggle>
        </div>

        <!-- ████████████████████ Column ████████████████████ -->
        <l-feeder-column
          v-if="schema.columns?.length"
          v-model:column="section_data"
          has-content
          has-grid
          has-image
          has-title
          label="Column"
        ></l-feeder-column>
        <l-feeder-column
          v-if="schema.columnA?.columns?.length"
          v-model:column="section_data.columnA"
          label="Column A"
        ></l-feeder-column>
        <l-feeder-column
          v-if="schema.columnB?.columns?.length"
          v-model:column="section_data.columnB"
          label="Column B"
        ></l-feeder-column>
        <l-feeder-column
          v-if="schema.columnC?.columns?.length"
          v-model:column="section_data.columnC"
          label="Column C"
        ></l-feeder-column>

        <!-- ████████████████████ Image ████████████████████ -->

        <l-feeder-image
          v-if="schema.image && section_data.image"
          v-model="section_data.image"
        >
        </l-feeder-image>

        <!-- ████████████████████ Newsletter ████████████████████ -->
        <div
          v-if="schema.newsletter && section_data.newsletter"
          class="widget-box mb-5"
        >
          <s-widget-header
            icon="newspaper"
            title="Newsletter"
          ></s-widget-header>
          <v-list-subheader
            >You can modify the newsletter email input form in this location.
          </v-list-subheader>

          <l-feeder-newsletter v-model="section_data.newsletter">
          </l-feeder-newsletter>
        </div>
      </v-card-text>

      <v-card-actions>
        <div class="widget-buttons">
          <v-btn
            color="primary"
            size="x-large"
            variant="elevated"
            @click="onAccept"
          >
            <v-icon start>check</v-icon>
            {{ $t("global.actions.confirm") }}
          </v-btn>
        </div>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { LUtilsBackground } from "../../../utils/background/LUtilsBackground";
import USmartSwitch from "@selldone/components-vue/ui/smart/switch/USmartSwitch.vue";
import LFeederAlign from "../../../components/feeder/align/LFeederAlign.vue";
import LFeederJustify from "../../../components/feeder/justify/LFeederJustify.vue";
import USmartToggle from "@selldone/components-vue/ui/smart/toggle/USmartToggle.vue";
import { Button } from "../../../src/types/types";
import { LUtilsSeeder } from "../../../utils/seeder/LUtilsSeeder";
import UColorSelector from "@selldone/components-vue/ui/color/selector/UColorSelector.vue";
import SStorefrontSearchBox from "@selldone/components-vue/storefront/search/SStorefrontSearchBox.vue";
import BProductsSelectBox from "@selldone/components-vue/backoffice/product/select-box/BProductsSelectBox.vue";
import SPageProductsFilter from "../../../components/style/product/SPageProductsFilter.vue";
import LFeederNewsletter from "../../../components/feeder/newsletter/LFeederNewsletter.vue";
import LFeederImage from "../../../components/feeder/image/LFeederImage.vue";
import LAugmentFinder from "../../../components/augment/finder/LAugmentFinder.vue";
import UTextValueDashed from "@selldone/components-vue/ui/text/value-dashed/UTextValueDashed.vue";
import { LMixinEvents } from "../../../mixins/events/LMixinEvents";
import LFeederColumn from "../column/LFeederColumn.vue";

export default {
  name: "LFeederDialog",
  mixins: [LMixinEvents],
  components: {
    LAugmentFinder,
    LFeederImage,
    LFeederNewsletter,
    SPageProductsFilter,
    BProductsSelectBox,
    SStorefrontSearchBox,
    UColorSelector,
    UTextValueDashed,
    USmartToggle,
    LFeederJustify,
    LFeederAlign,
    USmartSwitch,
    LFeederColumn,
  },

  props: {
    modelValue: {}, // Dialog
    section: { required: true },
    sectionComponent: { required: true },
  },
  data: () => ({
    filter_clone: null, // To prevent live update
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
  beforeUnmount() {},

  methods: {
    assignValues() {
      this.filter = this.section_data?.filter
        ? Object.assign({}, this.section_data.filter)
        : null;
    },

    onAccept() {
      if (this.schema.filter) {
        // Section has products and categories filter:
        this.section_data.filter = this.filter_clone;
      }

      this.$emit("update:modelValue", false);
    },
    backgroundStyle(background) {
      if (!background) return null;

      return LUtilsBackground.CreateCompleteBackgroundStyleObject(
        background.bg_custom,
        background.bg_gradient,
        background.bg_image ? this.getShopImagePath(background.bg_image) : null,
        background.bg_size,
        background.bg_repeat,
        background.bg_color,
        background.dark,
        background.bg_position,
          background.bg_rotation,
          background.bg_backdrop,
      );
    },

    addButton() {
      this.section_data.buttons.push(LUtilsSeeder.seed(Button));
    },
  },
};
</script>

<style lang="scss" scoped></style>
