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
    <s-widget-header
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
    </s-widget-header>

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
          <tr v-for="(item, i) in modelValue" :key="i">
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
              ></v-text-field>
              <div
                v-else
                @click="editings.push(item)"
                class="pp text-subtitle-2"
              >
                {{ item.key }}
              </div>
            </td>
            <td>
              <v-chip v-if="item.key?.startsWith('product.')" label color="#847" size="small" prepend-icon="shelves">
                <b class="me-2">{{item.key}}</b> | <span class="ms-1 x-small">Auto fill in the product page</span>
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
                @click="remove(modelValue, item)"
              >
                <v-icon>close</v-icon>
              </v-btn>
            </td>
          </tr>
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
              <v-list-item-title>{{
                $t("augment_form.add_dialog.html.title")
              }}</v-list-item-title>
              <v-list-item-subtitle>
                {{ $t("augment_form.add_dialog.html.subtitle") }}
              </v-list-item-subtitle>
            </v-list-item>
            <v-list-item prepend-icon="image" @click="addImageItem">
              <v-list-item-title>{{
                $t("augment_form.add_dialog.image.title")
              }}</v-list-item-title>
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
              class="mx-auto  border rounded-xl my-10 elevation-4"
              max-width="640"
            ></v-img>

            <p v-html="$t('augment_form.help_dialog.assign_tips')"></p>

            <v-img
              :aspect-ratio="2000 / 1290"
              :src="require('./assets/agument-2.png')"
              class="mx-auto  border rounded-xl my-10 elevation-4"
              max-width="640"
            ></v-img>

            <p
              v-html="$t('augment_form.help_dialog.set_dynamic_image_tips')"
            ></p>

              <v-img
                  :aspect-ratio="2000 / 1290"
                  :src="require('./assets/agument-3.png')"
                  max-width="640"
                  class="mx-auto  border rounded-xl my-10 elevation-4"
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
              class="mx-auto  border rounded-xl my-10 elevation-4"
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

<script>
import SImageUploader from "@selldone/components-vue/ui/uploader/SImageUploader.vue";

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
    },
    addTextItem() {
      this.modelValue.push({ key: "", value: null, type: "text" });
      this.show_add = false;
      this.$forceUpdate();
      this.$emit("change");
    },
    addImageItem() {
      this.modelValue.push({ key: "", value: null, type: "image" });
      this.show_add = false;
      this.$forceUpdate();
      this.$emit("change");
    },
  },
};
</script>

<style lang="scss" scoped></style>
