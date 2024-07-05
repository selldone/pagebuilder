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

<template xmlns:v-styler="http://www.w3.org/1999/xhtml">
  <x-component :object="$sectionObject" :augment="augment"></x-component>
</template>

<script>
import StylerDirective from "../../styler/StylerDirective";
import LMixinSection from "../../mixins/section/LMixinSection";
import { Article } from "@selldone/core-js";
import XComponent from "@selldone/page-builder/components/x/component/XComponent.vue";

export default {
  name: "LSectionArticle",
  directives: { styler: StylerDirective },
  mixins: [LMixinSection],

  components: { XComponent },
  cover: require("../../assets/images/covers/article.svg"),

  group: "Text",
  label: "Article",
  help: {
    title:
      "Use this section to show an article with features like what you have in your blog and product description with inline editor. Please just use one of this section each page.",
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
  beforeUnmount() {},
  mounted() {},

  methods: {},
};
</script>

<style lang="scss" scoped></style>
