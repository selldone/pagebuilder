<!--
  - Copyright (c) 2024. Selldone® Business OS™
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
  <!-- ████████████████████████ Color ████████████████████████ -->
  <v-list-item
    :class="{ 'disabled-scale-down': disabled }"
    class="s--setting-product"
    density="compact"
  >
    <template v-slot:prepend>
      <span class="-label me-2">
        <v-icon v-if="icon" class="me-1">{{ icon }}</v-icon>

        {{ label }}</span
      >
    </template>

    <template v-slot:append>
      <v-btn
        v-if="!images?.length"
        variant="outlined"
        size="small"
        @click="dialog = true"
        prepend-icon="add_box"
        class="tnt"
        >Select Product
      </v-btn>

      <template v-if="images?.length">
        <s-dense-images-circles
          :images="images"
          class="ms-1"
          :add="multiple"
          @click:add="dialog = true"
        ></s-dense-images-circles>
        <v-btn
          variant="text"
          icon
          size="small"
          @click="
            multiple
              ? $emit('update:modelValue', [])
              : $emit('update:modelValue', null)
          "
          class="ms-1"
        >
          <v-icon color="red">close</v-icon>
        </v-btn>
      </template>
    </template>
  </v-list-item>

  <!-- ████████████████████ Select product / category dialog ████████████████████ -->

  <v-dialog
    v-model="dialog"
    fullscreen
    scrollable
    theme="light"
    transition="dialog-bottom-transition"
  >
    <v-card class="text-start">
      <v-card-title class="d-flex align-center">
        <v-icon class="me-2">view_comfy</v-icon>
        Select products & Categories
      </v-card-title>

      <v-card-text>
        <b-products-window
          v-if="dialog"
          :can-select-category="false"
          :selected-list="modelValue /*Can be arrayed or just one id*/"
          :shop="shop"
          class="mx-auto"
          dialog-mode
          select-mode
          style="max-width: 1720px"
          :with-full-variant="false"
          @select="selectProduct"
        />
      </v-card-text>

      <v-divider></v-divider>

      <v-card-actions>
        <div class="widget-buttons">
          <v-btn size="x-large" variant="text" @click="dialog = false">
            <v-icon start>close</v-icon>

            {{ $t("global.actions.close") }}
          </v-btn>
        </div>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import BProductsWindow from "@selldone/components-vue/backoffice/product/window/BProductsWindow.vue";
import SDenseImagesCircles from "@selldone/components-vue/ui/image/SDenseImagesCircles.vue";

export default defineComponent({
  name: "SSettingProduct",
  components: { BProductsWindow, SDenseImagesCircles },
  emits: ["update:modelValue"],
  props: {
    /**
     * Product ID or array of product IDs
     *
     */
    modelValue: {},
    shop: {
      type: Object,
      required: true,
    },
    label: {},
    icon: {},
    clearable: Boolean,

    disabled: Boolean,
    multiple: Boolean,
  },
  computed: {
    images() {
      if (!this.modelValue) return [];
      if (Array.isArray(this.modelValue)) {
        return this.modelValue.map((id) =>
          this.getProductImage(id, this.IMAGE_SIZE_SMALL),
        );
      } else {
        return [this.getProductImage(this.modelValue, this.IMAGE_SIZE_SMALL)];
      }
    },
  },
  data() {
    return {
      dialog: false,
    };
  },
  methods: {
    setValue(value) {
      this.$emit("update:modelValue", value);
    },
    selectProduct(product_selected) {

      if (this.multiple) {
        if (!this.modelValue || !Array.isArray(this.modelValue))
          this.setValue([product_selected.id]);
        else if (!this.modelValue.includes(product_selected.id)) {
          this.modelValue.push(product_selected.id);
          this.setValue([...this.modelValue]);
        }
      } else {
        this.setValue(product_selected.id);
        this.dialog = false;
      }
    },
  },
});
</script>

<style lang="scss" scoped>
.s--setting-product {
  .-label {
    font-size: 0.8rem;
  }
}
</style>
