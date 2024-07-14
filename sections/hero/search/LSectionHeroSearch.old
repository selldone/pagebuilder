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
  <x-component :object="$sectionObject" :augment="augment"></x-component>
</template>

<script>
import * as types from "../../../src/types/types";
import StylerDirective from "../../../styler/StylerDirective";
import LMixinSection from "../../../mixins/section/LMixinSection";
import XComponent from "@selldone/page-builder/components/x/component/XComponent.vue";

export default {
  name: "LSectionHeroSearch",
  directives: { styler: StylerDirective },
  mixins: [LMixinSection],

  components: {
    XComponent,
  },
  cover: require("../../../assets/images/covers/hero-search.svg"),
  group: "Hero",
  label: "Search Hero",

  help: {
    title:
      "Utilize this section to display a search box on your page. This search box allows customers to conveniently search through products and categories.",
    video: "/app/videos/page-builder/Search.m4v",
  },

  $schema: {
    classes: types.ClassList,
    row: types.Row,

    // Background & Style:
    background: types.Background,
    style: types.Style,

    // Contents:
    title: types.Title,
    content: types.Text,
    content2: types.Text,

    // Search:
    search: {
      solo: false,
      filled: false,
      flat: false,
      outlined: false,
      rounded: false,
      dark: false,
      color: null,
      backgroundColor: null,
      placeholder: null,
      label: null,
      messages: null,
      hint: null,
    },

    // Columns:
    columns: [
      {
        grid: {
          mobile: 12,
          tablet: 10,
          desktop: 8,
          widescreen: null,
        },
      },
      {
        grid: {
          mobile: 12,
          tablet: 10,
          desktop: 8,
          widescreen: null,
        },
      },
    ],


  },
  props: {

    augment: {
      // Extra information to show to dynamic show in page content
    },
  },
  data: () => ({
    types: types,
  }),
  computed: {},

  watch: {},

  /**
   *  Important: Compute not work in page builder!
   */

  created() {

  },

  methods: {
    onSearch(event) {
      if (this.$builder.isEditing || !this.getShop()) return;

      this.$router.push({
        name: window.$storefront.routes.SHOP_PAGE,
        params: { shop_name: this.getShop().name },
        query: { search: event.search, search_type: event.search_type },
      });
    },
  },
};
</script>
<style lang="scss" scoped></style>
