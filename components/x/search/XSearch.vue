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
    v-styler:input="{target:object.data.input} "
    :background-color="input.backgroundColor"
    :color="input.color"
    :dark="input.dark"
    :flat="input.flat"
    :hint="input.hint"
    :label="input.label"
    :messages="input.messages"
    :persistent-placeholder="input.persistentPlaceholder"
    :placeholder="input.placeholder"
    :readonly="isEditing"
    :rounded="input.rounded"
    :shop-name="shop?.name"
    :variant="input.variant"
    :single-line="false"
    block
    class="fadeIn delay_300"
    expand-input
    no-qr
    @onSearch="onSearch"
  ></s-storefront-search-box>

  <!-- ▙▉▉▉▉▉▉▉▉▉▉▉▚▚▚▚▚▚▚▚ End Search ▚▚▚▚▚▚▚▚▉▉▉▉▉▉▉▉▉▉▉▟ -->
</template>

<script>
import StylerDirective from "../../../styler/StylerDirective";
import LMixinXComponent from "@selldone/page-builder/mixins/x-component/LMixinXComponent";
import { LModelElementXSearch } from "@selldone/page-builder/components/x/search/LModelElementXSearch";
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
      type: LModelElementXSearch,
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
      return this.object.data.input;
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
