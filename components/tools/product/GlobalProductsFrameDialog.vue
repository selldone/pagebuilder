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
  <v-navigation-drawer
    v-model="dialog_frame"
    theme="dark"
    location="right"
    temporary
    :width="$vuetify.display.xlAndUp ? 560 : $vuetify.display.lgAndUp ? 420 : 320"
    :scrim="false"
    color="#1e1e1e"
    class="x-page-builder-options-slider"
  >
    <v-card class="text-start" flat>
      <!-- ████████████████████ Actions ████████████████████ -->

      <v-card-actions>
        <div class="widget-buttons">
          <v-btn variant="text" size="x-large" @click="dialog_frame = false">
            <v-icon start>close</v-icon> {{ $t("global.actions.close") }}
          </v-btn>
        </div>
      </v-card-actions>

      <v-expansion-panels flat v-model="tab" class="mb-16">
        <!-- ████████████████████ Product ████████████████████ -->

        <v-expansion-panel>
          <v-expansion-panel-title>
            <div>
              <v-icon class="me-1" dark>inventory</v-icon> Product Frame
            </div>
          </v-expansion-panel-title>
          <v-expansion-panel-text>
            <s-widget-header title="Element Class"></s-widget-header>

            <small>
              You can allocate classes to the root element of each product. By
              default, the template code duplicates within a row element. Each
              product is encapsulated within a 'span' element, and any classes
              assigned here will be applied to this 'span'. Responsive classes,
              such as 'col-12', 'col-sm-6', and so on, can also be set here.
            </small>
            <v-combobox
              chips
              multiple
              v-model="frame_product.classes"
              :items="standard_classes"
              small-chips
              closable-chips
              clearable
              variant="outlined"
              cache-items
              label="Element Classes"
              @change="onFrameCodeChange"
              class="mt-2"
            >
            </v-combobox>
            <s-widget-header title="Product Frame Code"></s-widget-header>

            <small>
              Input the custom code for each product in this area, allowing for
              the use of dynamic content as demonstrated in the table below.
            </small>

            <div class="d-flex">
              <v-spacer></v-spacer>
              <v-select
                :items="Object.keys(ProductFramesSample)"
                v-model="val_sample_product"
                @update:model-value="
                  (val) => {
                    frame_product.code = ProductFramesSample[val];
                    onFrameCodeChange();
                  }
                "
                class="max-w-200"
                variant="outlined"
                label="Samples"
                prepend-inner-icon="inventory"
              >
                <template v-slot:selection="{ item }">
                  {{ getName(item) }}
                </template>
                <template v-slot:item="{ item }">
                  {{ getName(item) }}
                </template>
              </v-select>
            </div>

            <v-textarea
              v-model="frame_product.code"
              label="Frame code"
              auto-grow
              variant="outlined"
              @change="val_sample_product = null"
              @blur="onFrameCodeChange"
            ></v-textarea>

            <v-table dense class="my-5 max-w-640 mx-auto small">
              <template v-slot:default>
                <thead>
                  <tr>
                    <th class="text-left">Code</th>
                    <th class="text-left">Description</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(desc, code) in product_codes" :key="code">
                    <td v-copy>{{ code }}</td>
                    <td>{{ desc }}</td>
                  </tr>
                </tbody>
              </template>
            </v-table>
          </v-expansion-panel-text>
        </v-expansion-panel>

        <!-- ████████████████████ Category ████████████████████ -->

        <v-expansion-panel>
          <v-expansion-panel-title>
            <div><v-icon class="me-1" dark>folder</v-icon> Category Frame</div>
          </v-expansion-panel-title>
          <v-expansion-panel-text>
            <s-widget-header title="Element Class"></s-widget-header>
            <small>
              You can allocate classes to the root element of each product. By
              default, the template code duplicates within a row element. Each
              product is encapsulated within a 'span' element, and any classes
              assigned here will be applied to this 'span'. Responsive classes,
              such as 'col-12', 'col-sm-6', and so on, can also be set here.
            </small>

            <v-combobox
              chips
              multiple
              v-model="frame_category.classes"
              :items="standard_classes"
              small-chips
              closable-chips
              variant="outlined"
              clearable
              cache-items
              label="Element Classes"
              @change="onFrameCodeChange"
            >
            </v-combobox>
            <s-widget-header title="Category Frame Code"></s-widget-header>

            <small>
              Input the unique code for each category in this section, utilizing
              dynamic content as illustrated in the subsequent table.
            </small>

            <div class="d-flex">
              <v-spacer></v-spacer>
              <v-select
                :items="Object.keys(CategoryFramesSample)"
                v-model="val_sample_category"
                @update:model-value="
                  (val) => {
                    frame_category.code = CategoryFramesSample[val];
                    onFrameCodeChange();
                  }
                "
                class="max-w-200"
                variant="outlined"
                label="Samples"
                prepend-inner-icon="folder"
              >
                <template v-slot:selection="{ item }">
                  {{ getName(item) }}
                </template>
                <template v-slot:item="{ item }">
                  {{ getName(item) }}
                </template>
              </v-select>
            </div>

            <v-textarea
              v-model="frame_category.code"
              label="Frame code"
              variant="outlined"
              auto-grow
              @change="val_sample_category = null"
              @blur="onFrameCodeChange"
            ></v-textarea>

            <v-table dense class="my-5 max-w-640 mx-auto">
              <template v-slot:default>
                <thead>
                  <tr>
                    <th class="text-left">Code</th>
                    <th class="text-left">Description</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(desc, code) in category_codes" :key="code">
                    <td v-copy>{{ code }}</td>
                    <td>{{ desc }}</td>
                  </tr>
                </tbody>
              </template>
            </v-table>
          </v-expansion-panel-text>
        </v-expansion-panel>
      </v-expansion-panels>
    </v-card>
  </v-navigation-drawer>
</template>

<script>
import { ClassesHelper } from "@core/helper/style/Classes";

import ProductFramesSample from "@app-page-builder/sections/products/frames/ProductFramesSample";
import CategoryFramesSample from "@app-page-builder/sections/products/frames/CategoryFramesSample";
import EventBusTriggers from "@core/enums/event-bus/EventBusTriggers";
import PageEventBusMixin from "@app-page-builder/mixins/PageEventBusMixin";

export default {
  name: "GlobalProductsFrameDialog",
  mixins: [PageEventBusMixin],

  components: {},

  props: {},
  data: () => ({
    val_sample_product: null,
    ProductFramesSample: ProductFramesSample,

    val_sample_category: null,
    CategoryFramesSample: CategoryFramesSample,

    tab: 0,

    standard_classes: ClassesHelper.StandardClasses(),

    el: null,
    section: null,
    productFramePath: "frame_product", // $sectionData.frame - Always should be 'frame_product'
    categoryFramePath: "frame_category", // $sectionData.frame - Always should be 'frame_category'

    //----------------------- Products Filter -----------------------

    dialog_frame: false,
    dialog_pre: false,

    frame_product: {},
    frame_category: {},

    /**
     * These values automatically replaces in section.
     * {@see SectionProductsCustomList}
     */
    product_codes: {
      "{product.icon}": "Product main image URL.",
      "{product.title}": "Product title.",
      "{product.price}": "Product price in the #.## format.",
      "{product.final_price}":
        "Product price after applying discount in the #.## format.",
      "{url}": "Product page URL.",
      "{product.rate}": "Product rate value from 1 to 5.",
      "{product.rate_count}": "Total rate count.",
      "{product.unit}": "Custom product unit.",
      "{product.price_label}": "Custom product price label.",

      "{product.discount}": "Product discount amount in the #.## format.",
      "{product.dis_start}": "Product discount start date.",
      "{product.dis_end}": "Product discount end date.",

      '<rating value="{product.rate}"></rating>':
        "Show rating of the product ★★★★☆.",
      '<variants class="my-2" center="true" small="true"></variants>':
        "Show variants.",
      '<s-count-down class="my-2" end="{product.dis_end}"></s-count-down>':
        "Show discount count down.",
    },
    category_codes: {
      "{category.icon}": "Category image URL.",
      "{category.title}": "Category title.",
      "{category.description}": "Category description.",
      "{url}": "Category page URL.",
    },

    //--------------------------
    key_listener_keydown: null,

    LOCK: false, // 🔐 Lock changes
  }),

  computed: {},
  watch: {},
  created() {},
  mounted() {
    this.EventBus.$on(
      "show:GlobalProductsFrameDialog",

      ({ el, section }) => {
        this.CloseAllPageBuilderNavigationDrawerTools(); // Close all open tools.

        this.LOCK = true; // 🔒 Prevent update style and classes

        this.el = el;
        this.section = section;
        this.showProductsDialog();
      },
    );

    //――――――――――――――――――――――  START Editor key listener ――――――――――――――――――――
    this.key_listener_keydown = (event) => {
      // Scape:
      let isEscape =
        event.key === "Escape" || event.key === "Esc" || event.keyCode === 27;

      if (isEscape) {
        if (this.dialog_frame) {
          // Close tools
          this.dialog_frame = false;
          event.preventDefault();
          return false;
        }
      }
    };
    document.addEventListener("keydown", this.key_listener_keydown, true);
    //――――――――――――――――――――――  END Editor key listener ――――――――――――――――――――

    //█████████████████████████████████████████████████████████████
    //――――――――――――――― Event Bus ――――――――――――――――
    //█████████████████████████████████████████████████████████████
    // Listen for show loading data from server
    this.EventBus.$on(EventBusTriggers.PAGE_BUILDER_CLOSE_TOOLS, () => {
      this.dialog_frame = false;
    });
  },
  beforeUnmount() {
    this.EventBus.$off("show:GlobalProductsFrameDialog");
    this.EventBus.$off(EventBusTriggers.PAGE_BUILDER_CLOSE_TOOLS);

    //――――――――――――――――――――――  REMOVE key listener ――――――――――――――――――――
    document.removeEventListener("keydown", this.key_listener_keydown, true);
  },

  methods: {
    showProductsDialog() {
      this.frame_product = this.section.get(this.productFramePath);
      this.frame_category = this.section.get(this.categoryFramePath);

      // Auto fix frame structure:

      this.frame_product = this.fixFrame(this.frame_product);
      this.frame_category = this.fixFrame(this.frame_category);

      this.dialog_pre = false;
      this.$nextTick(() => {
        this.dialog_pre = true;
        this.dialog_frame = true;
        this.LOCK = false; // 🔓 Now can update values
      });
    },
    fixFrame(frame) {
      let out = frame;
      if (!this.isObject(frame)) {
        out = {};
      } else {
        // Make it clone:
        out = Object.assign({}, frame);
      }
      if (!out.classes || !Array.isArray(out.classes)) out.classes = [];

      return out;
    },

    //----------------------------------------------------------------------------
    onFrameCodeChange() {
      if (!this.dialog_frame || this.LOCK) return;

      this.section?.set(this.productFramePath, this.frame_product); // Save data in section!
      this.section?.set(this.categoryFramePath, this.frame_category); // Save data in section!

      // this.dialog_frame = false;
    },
  },
};
</script>

<style scoped lang="scss"></style>
