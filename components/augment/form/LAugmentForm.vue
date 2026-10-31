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
  <div class="l-augment-form text-start" :class="{ 'l-augment-form--modern': modern }">
    <template v-if="modern">
      <header class="l-augment-form__header">
        <div class="l-augment-form__heading">
          <b-product-edit-info-icon class="l-augment-form__heading-icon" name="ListTree" :size="18" />
          <div>
            <div class="l-augment-form__title-line">
              <h2 class="l-augment-form__title">{{ $t('augment_form.refined.title') }}</h2>
              <span class="l-augment-form__count">{{ $t('augment_form.refined.count', { count: modelValue?.length || 0 }) }}</span>
            </div>
            <p class="l-augment-form__subtitle">{{ $t('augment_form.refined.subtitle') }}</p>
          </div>
        </div>
        <v-menu v-model="show_add" :disabled="form_disabled" location="bottom end">
          <template #activator="{ props }">
            <v-btn v-bind="props" class="sd-modern-button l-augment-form__add" variant="outlined" :disabled="form_disabled">
              <template #prepend><b-product-edit-info-icon name="Plus" :size="16" /></template>
              {{ $t('augment_form.refined.add') }}
              <template #append><b-product-edit-info-icon name="ChevronDown" :size="16" /></template>
            </v-btn>
          </template>
          <v-list class="l-augment-form__add-menu text-start" density="compact">
            <v-list-item :disabled="form_disabled" @click="addTextItem">
              <template #prepend><b-product-edit-info-icon name="TextCursorInput" :size="17" /></template>
              <v-list-item-title>{{ $t('augment_form.refined.text') }}</v-list-item-title>
            </v-list-item>
            <v-list-item :disabled="form_disabled" @click="addImageItem">
              <template #prepend><b-product-edit-info-icon name="Image" :size="17" /></template>
              <v-list-item-title>{{ $t('augment_form.refined.image') }}</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
      </header>

      <div v-if="!modelValue?.length" class="l-augment-form__empty">
        <b-product-edit-info-icon class="l-augment-form__empty-icon" name="ListTree" :size="30" />
        <h3>{{ $t('augment_form.refined.empty_title') }}</h3>
        <p>{{ $t('augment_form.refined.empty_body') }}</p>
        <v-btn class="sd-modern-button sd-modern-button--inline" variant="text" color="primary" :disabled="form_disabled" @click="addTextItem">
          <template #prepend><b-product-edit-info-icon name="Plus" :size="16" /></template>
          {{ $t('augment_form.refined.first') }}
        </v-btn>
      </div>
      <template v-else>
        <div class="l-augment-form__columns sd-modern-list-header" aria-hidden="true">
          <span>{{ $t('augment_form.refined.key') }}</span>
          <span>{{ $t('augment_form.refined.content') }}</span>
          <span></span>
        </div>
        <section v-for="group in group_items" :key="group.group" class="l-augment-form__group">
          <h3 class="l-augment-form__group-title">{{ group.group === 'Others' ? $t('augment_form.refined.others') : group.group }}</h3>
          <div v-for="item in group.children" :key="getItemId(item)" class="l-augment-form__row">
            <label class="l-augment-form__key-block">
              <span class="l-augment-form__label">{{ $t('augment_form.refined.key') }}</span>
              <input
                :id="`augment-key-${getItemId(item)}`"
                class="l-augment-form__key"
                :value="item.key"
                :disabled="form_disabled || uploading_items.includes(item)"
                :aria-invalid="show_key_errors && !validKey(item.key) ? 'true' : undefined"
                :aria-describedby="`augment-key-hint-${getItemId(item)}`"
                :placeholder="$t('augment_form.refined.key_placeholder')"
                maxlength="32"
                autocomplete="off"
                dir="ltr"
                required
                @input="setDraft(item, 'key', $event.target.value)"
              />
              <span :id="`augment-key-hint-${getItemId(item)}`" class="l-augment-form__key-hint">{{ $t('augment_form.refined.key_hint') }}</span>
            </label>
            <div class="l-augment-form__value-block">
              <label :for="`augment-value-${getItemId(item)}`" class="l-augment-form__label">{{ $t(reservedSource(item.key) ? 'augment_form.refined.auto_fill' : item.type === 'image' ? 'augment_form.refined.image' : 'augment_form.refined.text') }}</label>
              <div v-if="reservedSource(item.key)" class="l-augment-form__auto" tabindex="0">
                <b-product-edit-info-icon name="WandSparkles" :size="15" />
                <span>{{ $t(`augment_form.refined.from_${reservedSource(item.key)}`) }}</span>
                <v-tooltip activator="parent" :text="$t('augment_form.refined.auto_hint')" location="top" :open-on-focus="true" :open-on-click="true" content-class="sd-modern-tooltip text-start" />
              </div>
              <s-image-uploader
                v-else-if="item.type === 'image'"
                class="l-augment-form__uploader"
                :image="item.value ? getShopImagePath(item.value) : undefined"
                :server="upload_server"
                :disabled="form_disabled"
                :label="$t('augment_form.refined.image')"
                :edit-label="$t('augment_form.refined.edit_image')"
                :remove-label="$t('augment_form.refined.remove_image')"
                modern
                auto-compact
                clearable
                dense
                disable-past
                max-file-size="2MB"
                min-height="110px"
                param-name="photo"
                @new-path="setImage(item, $event)"
                @on-clear="setDraft(item, 'value', null)"
                @on-add-file-start="setUploadBusy(item, true)"
                @on-add-file="imageAdded(item, $event)"
                @on-process-file-start="setUploadBusy(item, true)"
                @on-process-file-abort="setUploadBusy(item, false)"
                @on-remove-file="setUploadBusy(item, false)"
                @on-error="setUploadBusy(item, false)"
                @response="setUploadBusy(item, false)"
              >
                <template #compact-action="{ edit }">
                  <v-btn class="sd-modern-button sd-modern-button--inline l-augment-form__image-edit" variant="text" color="primary" :disabled="form_disabled" @click="!form_disabled && edit()">{{ $t('augment_form.refined.edit_image') }}</v-btn>
                </template>
              </s-image-uploader>
              <textarea
                v-else
                :id="`augment-value-${getItemId(item)}`"
                class="l-augment-form__text"
                :value="item.value"
                :disabled="form_disabled"
                :placeholder="$t('augment_form.refined.text_placeholder')"
                rows="2"
                dir="auto"
                @input="setDraft(item, 'value', $event.target.value)"
              ></textarea>
              <p v-if="item.type === 'image' && !reservedSource(item.key)" class="l-augment-form__image-hint">{{ $t('augment_form.refined.image_hint') }}</p>
            </div>
            <v-btn class="sd-modern-icon-button l-augment-form__remove" icon variant="text" :disabled="form_disabled || uploading_items.includes(item)" :aria-label="$t('augment_form.refined.remove')" @click="removeItem(item)">
              <b-product-edit-info-icon name="Trash2" :size="16" />
              <v-tooltip activator="parent" :text="$t('augment_form.refined.remove')" location="top" :open-on-focus="true" content-class="sd-modern-tooltip text-start" />
            </v-btn>
          </div>
        </section>
      </template>
      <p v-if="show_key_errors && modelValue?.some(item => !validKey(item.key))" class="sd-modern-notice l-augment-form__key-error" role="alert">
        <b-product-edit-info-icon class="sd-modern-notice__icon text-error" name="CircleAlert" :size="16" />
        <span class="sd-modern-notice__content">{{ $t('augment_form.refined.key_error') }}</span>
      </p>
      <p v-if="uploading_items.length" class="l-augment-form__upload-status" role="status">{{ $t('augment_form.refined.uploading') }}</p>
    </template>
    <template v-else>
    <u-widget-header
      :add-caption="$t('augment_form.add_caption')"
      :add-sub-caption="$t('augment_form.add_sub_caption')"
      add-text
      icon="extension"
      :title="$t('augment_form.title')"
      @click:add="!form_disabled && (show_add = true)"
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
                  :disabled="form_disabled"
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
                  @click="!form_disabled && editings.push(item)"
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
                  :disabled="form_disabled"
                  auto-compact
                  clearable
                  dense
                  disable-past
                  max-file-size="2MB"
                  min-height="110px"
                  param-name="photo"
                  @new-path="setImage(item, $event)"
                ></s-image-uploader>
                <v-text-field
                  v-else
                  v-model="item.value"
                  :disabled="form_disabled"
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
                  :disabled="form_disabled"
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
    </template>

    <u-loading-progress v-if="loading" relative></u-loading-progress>

    <v-bottom-sheet
      v-if="!modern"
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
            <v-list-item prepend-icon="title" :disabled="form_disabled" @click="addTextItem">
              <v-list-item-title
                >{{ $t("augment_form.add_dialog.html.title") }}
              </v-list-item-title>
              <v-list-item-subtitle>
                {{ $t("augment_form.add_dialog.html.subtitle") }}
              </v-list-item-subtitle>
            </v-list-item>
            <v-list-item prepend-icon="image" :disabled="form_disabled" @click="addImageItem">
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
import BProductEditInfoIcon from "@selldone/components-vue/backoffice/product/edit/info/BProductEditInfoIcon.vue";

type GroupedItem = {
  group: string;
  group_index: number;
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
  components: { SImageUploader, BProductEditInfoIcon },
  emits: ["change", "update:modelValue", "upload-busy"],
  props: {
    modelValue: {},
    loading: { type: Boolean },
    modern: { type: Boolean, default: false },
    disabled: { type: Boolean, default: false },
  },

  data: function () {
    return {
      show_add: false,
      help_dialog: false,
      editings: [],
      group_items: [],
      uploading_items: [],
      show_key_errors: false,
      item_ids: new WeakMap(),
      next_item_id: 0,
    };
  },
  computed: {
    form_disabled() {
      return this.disabled || this.loading;
    },
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
      this.uploading_items = [];
      this.show_key_errors = false;
      this.init();
    },
    uploading_items: {
      deep: true,
      handler(items) {
        this.$emit("upload-busy", items.length > 0);
      },
    },
    form_disabled(disabled) {
      if (disabled) this.show_add = false;
    },
  },

  created() {
    this.init();
  },

  methods: {
    getItemId(item) {
      if (!this.item_ids.has(item)) this.item_ids.set(item, ++this.next_item_id);
      return this.item_ids.get(item);
    },
    focusNewKey(item) {
      if (!this.modern) return;
      this.$nextTick(() => {
        this.$el.querySelector(`#augment-key-${this.getItemId(item)}`)?.focus();
      });
    },
    validKey(key) {
      return typeof key === "string" && !!key.trim() && key.length <= 32;
    },
    reservedSource(key) {
      if (typeof key !== "string") return;
      return ["product", "vendor", "include"].find((source) => key.startsWith(`${source}.`));
    },
    setDraft(item, field, value) {
      if (this.form_disabled || !this.modelValue?.includes(item)) return;
      if (field === "key" && this.uploading_items.includes(item)) return;
      if (field === "value" && this.reservedSource(item.key)) return;
      item[field] = value;
      this.$emit("change");
    },
    setImage(item, path) {
      // An upload can finish after the selected page (and its value rows) changes.
      this.setDraft(item, "value", path);
      this.setUploadBusy(item, false);
    },
    setUploadBusy(item, busy) {
      if (!this.modelValue?.includes(item)) return;
      const index = this.uploading_items.indexOf(item);
      if (busy && index < 0) this.uploading_items.push(item);
      else if (!busy && index >= 0) this.uploading_items.splice(index, 1);
    },
    imageAdded(item, { error }) {
      if (error) this.setUploadBusy(item, false);
    },
    async prepareSave() {
      await this.$nextTick();
      if (this.form_disabled || this.uploading_items.length) return false;
      if (!this.modern) return true;
      this.show_key_errors = true;
      const valid = Array.isArray(this.modelValue) && this.modelValue.every((item) => this.validKey(item.key));
      if (!valid) {
        await this.$nextTick();
        this.$el.querySelector('[aria-invalid="true"]')?.focus();
      }
      return valid;
    },
    init() {
      if (!this.modelValue || !Array.isArray(this.modelValue))
        this.$emit("update:modelValue", []);

      this.refreshGroups();
    },
    addTextItem() {
      if (this.form_disabled) return;
      const nw_item = { key: "", value: null, type: "text" };
      this.modelValue.push(nw_item);
      this.show_add = false;
      this.$forceUpdate();
      this.$emit("change");
      this.refreshGroups();
      this.editings.push(nw_item);
      this.focusNewKey(this.modelValue[this.modelValue.length - 1]);
    },
    addImageItem() {
      if (this.form_disabled) return;
      const nw_item = { key: "", value: null, type: "image" };
      this.modelValue.push(nw_item);
      this.show_add = false;
      this.$forceUpdate();
      this.$emit("change");
      this.refreshGroups();
      this.editings.push(nw_item);
      this.focusNewKey(this.modelValue[this.modelValue.length - 1]);
    },
    removeItem(item) {
      if (this.form_disabled || this.uploading_items.includes(item)) return;
      this.remove(this.modelValue, item);
      this.$emit("change");
      this.editings.remove(item);
      this.refreshGroups();
    },

    refreshGroups() {
      if (!Array.isArray(this.modelValue)) {
        this.group_items = [];
        return;
      }
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

<style lang="scss" scoped>
.l-augment-form--modern {
  --sd-modern-icon-button-size: 32px;
  color: rgb(var(--v-theme-on-surface));
  font-size: 13px;
  line-height: 21px;

  .l-augment-form__header {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    gap: 14px;
    margin-block-end: 20px;
  }

  .l-augment-form__heading {
    display: flex;
    align-items: flex-start;
    gap: 9px;
    min-width: 0;
  }

  .l-augment-form__heading-icon {
    margin-block-start: 3px;
    color: var(--sd-modern-muted);
  }

  .l-augment-form__title-line {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 11px;
  }

  .l-augment-form__title {
    margin: 0;
    font-family: inherit;
    font-size: 16px;
    font-weight: 500;
    line-height: 24px;
    letter-spacing: 0;
  }

  .l-augment-form__subtitle {
    margin: 5px 0 0;
    color: var(--sd-modern-muted);
    font-size: 13px;
    line-height: 21px;
  }

  .l-augment-form__count {
    color: var(--sd-modern-muted);
    font-size: 12px;
    line-height: 20px;
    white-space: nowrap;
  }

  .l-augment-form__add {
    flex-shrink: 0;
    min-height: 36px;
    height: auto;
    padding: 7px 11px;
    border-color: var(--sd-modern-border);
    border-radius: 8px;
    font-size: 13px;
    font-weight: 500;
    line-height: 20px;
    :deep(.v-icon) { font-size: 16px; }
  }

  .l-augment-form__empty {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 9px;
    padding: 28px 12px 30px;
    text-align: center;
    .l-augment-form__empty-icon { margin-block-end: 3px; color: var(--sd-modern-muted); }
    h3 { margin: 0; font-size: 14px; font-weight: 500; line-height: 22px; }
    p { max-width: 390px; margin: 0; color: var(--sd-modern-muted); font-size: 13px; line-height: 21px; }
    .v-btn { margin-block-start: 4px; font-size: 13px; }
  }

  .l-augment-form__columns,
  .l-augment-form__row {
    display: grid;
    grid-template-columns: minmax(105px, .65fr) minmax(0, 1.5fr) 32px;
    gap: 16px;
    padding-inline: 12px;
  }

  .l-augment-form__columns { padding-block-end: 11px; }
  .l-augment-form__group-title { margin: 17px 12px 4px; font-size: 12px; font-weight: 500; line-height: 20px; }
  .l-augment-form__group:first-of-type .l-augment-form__group-title { margin-block-start: 0; }
  .l-augment-form__row { align-items: start; padding-block: 15px; border-block-end: 1px solid var(--sd-modern-border); min-width: 0; }
  .l-augment-form__key-block,
  .l-augment-form__value-block { min-width: 0; }
  .l-augment-form__label { display: block; margin-block-end: 1px; color: var(--sd-modern-muted); font-size: 11px; line-height: 18px; }

  .l-augment-form__key,
  .l-augment-form__text {
    display: block;
    width: 100%;
    min-width: 0;
    box-sizing: border-box;
    border: 0;
    border-radius: 4px;
    padding: 8px 0 7px;
    background: transparent;
    color: inherit;
    font-family: inherit;
    font-size: 13px;
    font-weight: 400;
    line-height: 21px;
    &::placeholder { color: var(--sd-modern-muted); opacity: 1; }
    &:focus-visible { outline: 2px solid rgb(var(--v-theme-primary)); outline-offset: 3px; }
    &:disabled { opacity: .55; cursor: default; }
    &[aria-invalid="true"] {
      outline: 1px solid rgb(var(--v-theme-error));
      outline-offset: 3px;
      &:focus-visible { outline-width: 2px; }
    }
  }

  .l-augment-form__key { min-height: 36px; font-family: ui-monospace, monospace; text-align: start; }
  .l-augment-form__text { resize: vertical; min-height: 62px; }
  .l-augment-form__key-hint { display: block; margin-block-start: 4px; color: var(--sd-modern-muted); font-size: 11px; line-height: 18px; }
  .l-augment-form__auto { display: flex; align-items: center; gap: 7px; min-height: 36px; color: var(--sd-modern-muted); font-size: 12px; line-height: 20px; }
  .l-augment-form__auto:focus-visible { outline: 2px solid rgb(var(--v-theme-primary)); outline-offset: 3px; }
  .l-augment-form__remove { margin-block-start: 3px; }
  .l-augment-form__image-hint { margin: 4px 0 0; color: var(--sd-modern-muted); font-size: 11px; line-height: 18px; }
  .l-augment-form__image-edit { font-size: 13px; }
  .l-augment-form__uploader {
    min-width: 0;
    :deep(.v-list-item-title) { font-size: 13px; font-weight: 400; line-height: 21px; }
    :deep(.v-list-item-title b) { font-weight: 500; }
    :deep(.v-list-item-subtitle) { font-size: 12px; line-height: 19px; }
  }
  .l-augment-form__key-error { margin-block-start: 16px; font-size: 13px; line-height: 21px; }
  .l-augment-form__upload-status { margin: 12px 0 0; color: var(--sd-modern-muted); font-size: 12px; line-height: 20px; }
}

.l-augment-form__add-menu {
  min-width: 215px;
  padding: 5px;
  :deep(.v-list-item) { min-height: 44px; border-radius: 7px; }
  :deep(.v-list-item-title) { font-size: 13px; font-weight: 400; line-height: 20px; }
  :deep(.v-list-item__prepend > .v-icon) { font-size: 17px; }
  :deep(.v-list-item__prepend > .b-product-edit-info-icon) { margin-inline-end: 10px; }
}

@media (max-width: 600px), (pointer: coarse) {
  .l-augment-form--modern {
    --sd-modern-icon-button-size: 44px;
    .l-augment-form__add { min-height: 44px; }
    .l-augment-form__row { grid-template-columns: minmax(105px, .65fr) minmax(0, 1.5fr) 44px; }
    .l-augment-form__key,
    .l-augment-form__text { padding-block: 10px; font-size: 16px; line-height: 24px; min-height: 44px; }
    .l-augment-form__auto { min-height: 44px; }
  }
}

@media (max-width: 600px) {
  .l-augment-form--modern {
    .l-augment-form__header { flex-wrap: wrap; }
    .l-augment-form__columns { display: none; }
    .l-augment-form__row { grid-template-columns: minmax(0, 1fr) 44px; gap: 12px; }
    .l-augment-form__key-block { grid-column: 1; }
    .l-augment-form__value-block { grid-column: 1 / -1; grid-row: 2; }
    .l-augment-form__remove { grid-column: 2; grid-row: 1; }
  }
}
</style>
