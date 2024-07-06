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
    :scrim="false"
    :width="
      $vuetify.display.xlAndUp ? 560 : $vuetify.display.lgAndUp ? 420 : 320
    "
    class="x-page-builder-options-slider"
    color="#1e1e1e"
    location="right"
    temporary
    theme="dark"
  >
    <v-card class="text-start" flat>
      <!-- ████████████████████ Actions ████████████████████ -->

      <v-card-actions>
        <div class="widget-buttons">
          <v-btn size="x-large" variant="text" @click="dialog_frame = false">
            <v-icon start>close</v-icon>
            {{ $t("global.actions.close") }}
          </v-btn>
        </div>
      </v-card-actions>

      <v-expansion-panels v-model="tab" class="mb-16">
        <!-- ████████████████████ Product ████████████████████ -->

        <s-setting-expandable
          icon="inventory"
          title="Product Frame"
          subtitle="You can allocate classes to the root element of each product. By default, the template code duplicates within a row element. Each product is encapsulated within a 'span' element, and any classes assigned here will be applied to this 'span'. Responsive classes, such as 'v-col-12', 'v-col-sm-6', and so on, can also be set here."
        >
          <v-combobox
            v-model="frame_product.classes"
            :items="standard_classes"
            chips
            class="mt-5"
            clearable
            closable-chips
            label="Element Classes"
            placeholder="Enter classes for each frame..."
            persistent-placeholder
            multiple
            variant="outlined"
            @update:model-value="onFrameCodeChange"
          >
          </v-combobox>
          <s-setting-group
            title="Product Frame Code"
            icon="code"
            subtitle="Input the custom code for each product in this area, allowing for the use of dynamic content as demonstrated in the table below."
          >
          </s-setting-group>

          <div class="d-flex">
            <v-spacer></v-spacer>
            <v-select
              v-model="val_sample_product"
              :item-title="(item) => getName(item)"
              :item-value="(item) => item"
              :items="Object.keys(ProductFramesSample)"
              class="max-w-200"
              label="Samples"
              prepend-inner-icon="inventory"
              variant="outlined"
              density="comfortable"
              @update:model-value="
                (val) => {
                  frame_product.code = ProductFramesSample[val];
                  onFrameCodeChange();
                }
              "
            >
            </v-select>
          </div>

          <v-sheet class="border pa-2 rounded-lg">
            <prism-editor
              style="line-height: normal; font-size: 14px"
              class="prism-dark"
              v-model="frame_product.code"
              :highlight="highlighter"
              language="html"
              line-numbers
              auto-style-line-numbers
              @blur="onFrameCodeChange"
              @change="val_sample_product = null"
            ></prism-editor>
          </v-sheet>

          <v-expansion-panels>
            <v-expansion-panel>
              <v-expansion-panel-title class="text-subtitle-2">
                <v-icon class="me-1">support</v-icon>
                Help & Dynamic Values
              </v-expansion-panel-title>

              <v-expansion-panel-text>
                <v-table class="my-5 max-w-640 mx-auto small" density="compact">
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
          </v-expansion-panels>
        </s-setting-expandable>

        <!-- ████████████████████ Category ████████████████████ -->

        <s-setting-expandable
          icon="folder"
          title="Category Frame"
          subtitle="You can allocate classes to the root element of each product. By default, the template code duplicates within a row element. Each product is encapsulated within a 'span' element, and any classes assigned here will be applied to this 'span'. Responsive classes, such as 'v-col-12', 'v-col-sm-6', and so on, can also be set here."
        >
          <v-combobox
            v-model="frame_category.classes"
            :items="standard_classes"
            chips
            clearable
            closable-chips
            label="Element Classes"
            multiple
            density="comfortable"
            variant="outlined"
            class="mt-5"
            @update:model-value="onFrameCodeChange"
          >
          </v-combobox>

          <s-setting-group
            title="Category Frame Code"
            icon="code"
            subtitle="Input the code for each category in this section, utilizing dynamic content as illustrated in the subsequent table."
          ></s-setting-group>

          <div class="d-flex">
            <v-spacer></v-spacer>
            <v-select
              v-model="val_sample_category"
              :items="Object.keys(CategoryFramesSample)"
              class="max-w-200"
              label="Samples"
              prepend-inner-icon="folder"
              variant="outlined"
              @update:model-value="
                (val) => {
                  frame_category.code = CategoryFramesSample[val];
                  onFrameCodeChange();
                }
              "
              :item-title="(item) => getName(item)"
              :item-value="(item) => item"
            >
            </v-select>
          </div>

          <v-sheet class="border pa-2 rounded-lg">
            <prism-editor
              style="line-height: normal; font-size: 14px"
              class="prism-dark"
              v-model="frame_category.code"
              :highlight="highlighter"
              language="html"
              line-numbers
              auto-style-line-numbers
              @blur="onFrameCodeChange"
              @change="val_sample_category = null"
            ></prism-editor>
          </v-sheet>

          <v-expansion-panels>
            <v-expansion-panel>
              <v-expansion-panel-title class="text-subtitle-2">
                <v-icon class="me-1">support</v-icon>
                Help & Dynamic Values
              </v-expansion-panel-title>

              <v-expansion-panel-text>
                <v-table class="my-5 max-w-640 mx-auto" density="compact">
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
        </s-setting-expandable>
      </v-expansion-panels>
    </v-card>
  </v-navigation-drawer>
</template>

<script>
import { LUtilsClasses } from "../../utils/classes/LUtilsClasses";

import ProductFramesSample from "../../sections/store/custom-listing/frames/ProductFramesSample";
import CategoryFramesSample from "../../sections/store/custom-listing/frames/CategoryFramesSample";
import LEventsName from "../../mixins/events/name/LEventsName";
import { LUtilsHighlight } from "../../utils/highligh/LUtilsHighlight";
import { LMixinEvents } from "../../mixins/events/LMixinEvents";
import { EventBus } from "@selldone/core-js/events/EventBus";
import SSettingExpandable from "@selldone/page-builder/styler/settings/expandable/SSettingExpandable.vue";
import SSettingGroup from "@selldone/page-builder/styler/settings/group/SSettingGroup.vue";
import { PrismEditor } from "vue-prism-editor";
import "prismjs/themes/prism-dark.css";

export default {
  name: "LSettingsFrame",
  mixins: [LMixinEvents],

  components: { PrismEditor, SSettingGroup, SSettingExpandable },

  props: {},
  data: () => ({
    val_sample_product: null,
    ProductFramesSample: ProductFramesSample,

    val_sample_category: null,
    CategoryFramesSample: CategoryFramesSample,

    tab: 0,

    standard_classes: LUtilsClasses.StandardClasses(),

    el: null,
    target: null,

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

      '<x-rating value="{product.rate}"></x-rating>':
        "Show rating of the product ★★★★☆.",
      '<x-variants class="my-2" center="true" small="true"></x-variants>':
        "Show variants.",
      '<x-count-down class="my-2" end="{product.dis_end}"></x-count-down>':
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
  watch: {
    dialog_frame(dialog) {
      // Keep highlight active element:
      if (!dialog) LUtilsHighlight.RemoveAllElementFocusEditing();
      else if (this.el) LUtilsHighlight.Activate(this.el);
    },
  },
  created() {},
  mounted() {
    EventBus.$on(
      "show:LSettingsFrame",

      ({ el, target }) => {
        this.CloseAllPageBuilderNavigationDrawerTools(); // Close all open tools.

        this.LOCK = true; // 🔒 Prevent update style and classes

        this.el = el;
        this.target = target;
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
    EventBus.$on(LEventsName.PAGE_BUILDER_CLOSE_TOOLS, () => {
      this.dialog_frame = false;
    });
  },
  beforeUnmount() {
    EventBus.$off("show:LSettingsFrame");
    EventBus.$off(LEventsName.PAGE_BUILDER_CLOSE_TOOLS);

    //――――――――――――――――――――――  REMOVE key listener ――――――――――――――――――――
    document.removeEventListener("keydown", this.key_listener_keydown, true);
  },

  methods: {
    highlighter(code) {
      return Prism.highlight(code, Prism.languages.html);
    },

    showProductsDialog() {
      this.frame_product = Object.assign({}, this.target.data.frame_product);
      this.frame_category = Object.assign({}, this.target.data.frame_category);

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
      console.log("onFrameCodeChange");
      if (!this.dialog_frame || this.LOCK) return;

      this.target.data.frame_product = Object.assign({}, this.frame_product); // Save data in section!
      this.target.data.frame_category = Object.assign({}, this.frame_category); // Save data in section!

      // this.dialog_frame = false;
    },
  },
};
</script>

<style lang="scss" scoped></style>
