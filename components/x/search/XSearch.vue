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

<template xmlns:v-styler="http://www.w3.org/1999/xhtml">
  <!--  ▛▉▉▉▉▉▉▉▉▉▉▉▚▚▚▚▚▚▚▚ Start Search ▚▚▚▚▚▚▚▚▉▉▉▉▉▉▉▉▉▉▉▜ -->
  <s-storefront-search-box
    v-styler:input="{target:input,options:{no_name:true}} "
    :background-color="input.data.backgroundColor"
    :color="input.data.color"
    :dark="input.data.dark"
    :flat="input.data.flat"
    :hint="input.data.hint"
    :label="input.data.label"
    :messages="input.data.messages"
    :persistent-placeholder="input.data.persistentPlaceholder"
    :placeholder="input.data.placeholder"
    :readonly="isEditing"
    :rounded="input.data.rounded"
    :shop-name="shop?.name"
    :variant="input.data.variant"
    :single-line="false"
    block
    class="fadeIn delay_300"
    expand-input
    no-qr
    @onSearch="onSearch"

    :class="[object.classes, { 'is-editable': $builder.isEditing }]"
    :style="[object.style, background_style]"

  ></s-storefront-search-box>

  <!-- ▙▉▉▉▉▉▉▉▉▉▉▉▚▚▚▚▚▚▚▚ End Search ▚▚▚▚▚▚▚▚▉▉▉▉▉▉▉▉▉▉▉▟ -->
</template>

<script>
import StylerDirective from "../../../styler/StylerDirective";
import LMixinXComponent from "@selldone/page-builder/mixins/x-component/LMixinXComponent";
import { XSearchObject } from "@selldone/page-builder/components/x/search/XSearchObject.ts";
import SStorefrontSearchBox from "@selldone/components-vue/storefront/search/SStorefrontSearchBox.vue";

export default {
  name: "XSearch",
  directives: { styler: StylerDirective },
  mixins: [LMixinXComponent],

  components: {
    SStorefrontSearchBox,
  },

  props: {
    object: {
      type: XSearchObject,
      required: true,
    },
    augment: {},
  },

  data: () => ({
    show_lottie_view: true,
  }),
  computed: {
    shop() {
      return this.getShop();
    },

    input(){
      return this.object.getInput();
    },
    isEditing(){
      return this.$builder.isEditing
    }
  },
  watch: {},

  created() {},

  mounted() {},

  methods: {
    onSearch(event) {
      if (this.$builder.isEditing || !this.shop) return;

      this.$router.push({
        name: window.$storefront.routes.SHOP_PAGE,
        params: { shop_name: this.shop.name },
        query: { search: event.search, search_type: event.search_type },
      });
    },
  },
};
</script>

<style lang="scss" scoped></style>
