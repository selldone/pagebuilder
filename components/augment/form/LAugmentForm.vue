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

<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
  <div class="text-start">
    <u-widget-header
      :add-caption="$t('augment_form.add_caption')"
      :add-sub-caption="$t('augment_form.add_sub_caption')"
      add-text
      icon="extension"
      :title="$t('augment_form.title')"
      @click:add="show_add = true"
    >
      <template v-slot:append-title>
        <v-btn class="mx-1" icon variant="text" @click="help_dialog = true">
          <v-icon>help</v-icon>
        </v-btn>
      </template>
    </u-widget-header>

    <v-list-subheader>
      {{ $t("augment_form.subtitle") }}
    </v-list-subheader>

    <v-table class="bg-transparent min-height-10vh">
      <template v-slot:default>
        <thead>
          <tr>
            <th style="width: 150px">Key</th>
            <th class="min-width-200">Value</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <template v-for="group in group_items" :key="group.group">
            <tr class="bg-black font-weight-bold">
              <td colspan="3">
                <v-icon class="me-2">transit_enterexit</v-icon>
                {{ group.group }}
              </td>
            </tr>
            <tr v-for="(item, i) in group.children" :key="i">
              <td>
                <v-text-field
                  v-if="!item.key || editings?.includes(item)"
                  v-model="item.key"
                  :counter="32"
                  :rules="[GlobalRules.counter(32)]"
                  bg-color="transparent"
                  density="compact"
                  flat
                  hide-details
                  placeholder="Enter a key..."
                  title="Key"
                  variant="plain"
                  @change="$emit('change')"
                  class="hover-editable"
                  @keydown.enter="item.key ? editings.remove(item) : undefined"
                  @blur="item.key ? editings.remove(item) : undefined"
                ></v-text-field>
                <div
                  v-else
                  @click="editings.push(item)"
                  class="pp text-subtitle-2 min-width-50"
                  style="min-height: 24px"
                >
                  {{ getName(item.key) }}
                  <div class="x-small op-0-5">
                    {{ item.key }}
                  </div>
                </div>
              </td>
              <td>
                <v-chip
                  v-if="item.key?.startsWith('product.')"
                  label
                  color="#00796B"
                  size="x-small"
                  prepend-icon="shelves"
                  variant="flat"
                >
                  <b class="me-2">{{ item.key }}</b> |
                  <span class="ms-1 x-small"
                    >Auto fill in the product page</span
                  >
                </v-chip>
                <v-chip
                  v-else-if="item.key?.startsWith('vendor.')"
                  label
                  color="#FFA000"
                  size="x-small"
                  prepend-icon="storefront"
                  variant="flat"
                >
                  <b class="me-2">{{ item.key }}</b> |
                  <span class="ms-1 x-small">Auto fill in the vendor page</span>
                </v-chip>
                <v-chip
                  v-else-if="item.key?.startsWith('include.')"
                  label
                  color="#3F51B5"
                  size="x-small"
                  prepend-icon="bento"
                  variant="flat"
                >
                  <b class="me-2">{{ item.key }}</b> |
                  <span class="ms-1 x-small"
                    >Auto fill in the include page</span
                  >
                </v-chip>
                <s-image-uploader
                  v-else-if="item.type === 'image'"
                  :image="item.value ? getShopImagePath(item.value) : undefined"
                  :server="upload_server"
                  auto-compact
                  clearable
                  dense
                  disable-past
                  max-file-size="2MB"
                  min-height="110px"
                  param-name="photo"
                  @new-path="
                    (path) => {
                      item.value = path;
                      $emit('change');
                    }
                  "
                ></s-image-uploader>
                <v-text-field
                  v-else
                  v-model="item.value"
                  :counter="64"
                  bg-color="transparent"
                  density="compact"
                  flat
                  hide-details
                  placeholder="Enter a value..."
                  title="Value"
                  variant="plain"
                  class="hover-editable"
                  @change="$emit('change')"
                ></v-text-field>
              </td>
              <td>
                <v-btn
                  color="red"
                  icon
                  variant="text"
                  @click="removeItem(item)"
                >
                  <v-icon>close</v-icon>
                </v-btn>
              </td>
            </tr>
          </template>
        </tbody>
      </template>
    </v-table>

    <u-loading-progress v-if="loading" relative></u-loading-progress>

    <v-bottom-sheet
      v-model="show_add"
      content-class="no-shadow-dialog"
      max-width="680"
      scrollable
      width="96%"
    >
      <v-card class="rounded-t-xl text-start">
        <v-card-title>{{ $t("augment_form.add_dialog.title") }}</v-card-title>
        <v-card-text>
          <v-list>
            <v-list-item prepend-icon="title" @click="addTextItem">
              <v-list-item-title
                >{{ $t("augment_form.add_dialog.html.title") }}
              </v-list-item-title>
              <v-list-item-subtitle>
                {{ $t("augment_form.add_dialog.html.subtitle") }}
              </v-list-item-subtitle>
            </v-list-item>
            <v-list-item prepend-icon="image" @click="addImageItem">
              <v-list-item-title
                >{{ $t("augment_form.add_dialog.image.title") }}
              </v-list-item-title>
              <v-list-item-subtitle>
                {{ $t("augment_form.add_dialog.image.subtitle") }}
              </v-list-item-subtitle>
            </v-list-item>
          </v-list>
        </v-card-text>
      </v-card>
    </v-bottom-sheet>

    <!-- █████████████████████ Help Dialog █████████████████████ -->
    <v-dialog
      v-model="help_dialog"
      fullscreen
      scrollable
      transition="dialog-bottom-transition"
    >
      <v-card class="text-start">
        <v-card-title>
          <v-icon class="me-1" color="#111">help</v-icon>

          {{ $t("augment_form.help_dialog.title") }}
        </v-card-title>

        <v-card-text>
          <v-container class="typo-body max-width-container-1280px">
            <p v-html="$t('augment_form.help_dialog.how_it_works_tips')"></p>

            <v-img
              :aspect-ratio="2000 / 1290"
              :src="require('./assets/agument-1.png')"
              class="mx-auto border rounded-xl my-10 elevation-4"
              max-width="640"
            ></v-img>

            <p v-html="$t('augment_form.help_dialog.assign_tips')"></p>

            <v-img
              :aspect-ratio="2000 / 1290"
              :src="require('./assets/agument-2.png')"
              class="mx-auto border rounded-xl my-10 elevation-4"
              max-width="640"
            ></v-img>

            <p
              v-html="$t('augment_form.help_dialog.set_dynamic_image_tips')"
            ></p>

            <v-img
              :aspect-ratio="2000 / 1290"
              :src="require('./assets/agument-3.png')"
              max-width="640"
              class="mx-auto border rounded-xl my-10 elevation-4"
            ></v-img>

            <p v-html="$t('augment_form.help_dialog.enter_values_tips')"></p>

            <v-img
              :aspect-ratio="2000 / 1290"
              :src="require('./assets/agument-4.png')"
              class="mx-auto border rounded-xl my-10 elevation-4"
              max-width="640"
            ></v-img>

            <p v-html="$t('augment_form.help_dialog.result_tips')"></p>

            <v-img
              :aspect-ratio="2000 / 1290"
              :src="require('./assets/agument-5.png')"
              class="mx-auto border rounded-xl my-10 elevation-4"
              max-width="640"
            ></v-img>
          </v-container>
        </v-card-text>

        <v-card-actions>
          <div class="widget-buttons">
            <v-btn size="x-large" variant="text" @click="help_dialog = false">
              <v-icon start>close</v-icon>
              {{ $t("global.actions.close") }}
            </v-btn>
          </div>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script lang="ts">
import SImageUploader from "@selldone/components-vue/ui/uploader/SImageUploader.vue";

type GroupedItem = {
  group: string;
  children: Item[];
};

type Item = {
  group: string;
  key: string;
  value: any;
  type: string;
};
export default {
  name: "LAugmentForm",
  components: { SImageUploader },
  emits: ["change", "update:modelValue"],
  props: {
    modelValue: {},
    loading: { type: Boolean },
  },

  data: function () {
    return {
      show_add: false,
      help_dialog: false,
      editings: [],
      group_items: [],
    };
  },
  computed: {
    IS_VENDOR_PANEL() {
      /*🟢 Vendor Panel 🟢*/
      return (
        this.$route.params.vendor_id &&
        this.$route.matched.some((record) => record.meta.vendor)
      );
    },

    upload_server() {
      return this.IS_VENDOR_PANEL
        ? window.VAPI.POST_MY_VENDOR_AUGMENT_UPLOAD_IMAGE(
            this.$route.params.vendor_id,
          )
        : window.API.POST_SHOP_AUGMENT_UPLOAD_IMAGE(this.$route.params.shop_id);
    },
  },

  watch: {
    modelValue() {
      this.init();
    },
  },

  created() {
    this.init();
  },

  methods: {
    init() {
      if (!this.modelValue || !Array.isArray(this.modelValue))
        this.$emit("update:modelValue", []);

      this.refreshGroups();
    },
    addTextItem() {
      const nw_item = { key: "", value: null, type: "text" };
      this.modelValue.push(nw_item);
      this.show_add = false;
      this.$forceUpdate();
      this.$emit("change");
      this.refreshGroups();
      this.editings.push(nw_item);
    },
    addImageItem() {
      const nw_item = { key: "", value: null, type: "image" };
      this.modelValue.push(nw_item);
      this.show_add = false;
      this.$forceUpdate();
      this.$emit("change");
      this.refreshGroups();
      this.editings.push(nw_item);
    },
    removeItem(item) {
      this.remove(this.modelValue, item);
      this.$emit("change");
      this.editings.remove(item);
      this.refreshGroups();
    },

    refreshGroups() {
      if (!this.modelValue) return [];
      const groupedItems: { [key: string]: GroupedItem } = {};

      this.modelValue?.forEach((item) => {
        if (!groupedItems[item.group]) {
          groupedItems[item.group] = {
            group: item.group ? item.group : "Others",
            group_index: item.group_index?item.group_index:0,

            children: [],
          };
        }
        groupedItems[item.group].children.push(item);
      });
      const out = Object.values(groupedItems);
      out.forEach((group) => {
        group.children = group.children.sortByKey("key", true);
      });

      // Sort the groups by 'group-index' ascending, placing "Others" at the start
      out.sort((a, b) => {
        if (a.group === "Others") return -1; // "Others" comes first
        if (b.group === "Others") return 1;
        return a.group_index - b.group_index;
      });

      this.group_items = out;
    },
  },
};
</script>

<style lang="scss" scoped></style>
