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
  <product-variants-view v-if="variants" :small="small" :variants="variants">
  </product-variants-view>
</template>

<script>
import { defineComponent } from "vue";
import ProductVariantsView from "@selldone/components-vue/storefront/product/variant/ProductVariantsView.vue";

export default defineComponent({
  name: "XVariants",
  components: { ProductVariantsView },
  props: {
    small: {
      type: Boolean,
      default: false,
    },
    variants: {
      type: Object,
    },
  },
});
</script>

<style lang="scss" scoped></style>
