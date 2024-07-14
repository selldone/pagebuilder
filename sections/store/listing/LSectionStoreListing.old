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
import StylerDirective from "../../../styler/StylerDirective";
import LMixinSection from "../../../mixins/section/LMixinSection";
import XComponent from "@selldone/page-builder/components/x/component/XComponent.vue";

export default {
  name: "LSectionStoreListing",
  directives: { styler: StylerDirective },
  mixins: [LMixinSection],

  components: { XComponent },
  cover: require("../../../assets/images/covers/products.svg"),

  group: "Products",
  label: "Products & categories list",
  help: {
    title:
      "This section displays a list of products and categories similar to your primary shop listing page. You can apply filters to showcase specific categories or products.",
  },

  props: {
    augment: {
      // Extra information to show to dynamic show in page content
    },
  },

  data: () => ({}),
  computed: {},
  watch: {},

  created() {},

  mounted() {},

  methods: {},
};
</script>

<style lang="scss" scoped></style>
