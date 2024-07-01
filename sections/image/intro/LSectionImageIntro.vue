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
  name: "LSectionImageIntro",
  directives: { styler: StylerDirective },
  mixins: [LMixinSection],
  components: {
    XComponent,
  },
  cover: require("../../../assets/images/covers/social-2.svg"),
  group: "Image & Text",
  label: "Text, Image, Text",
  help: {
    title:
      "This section displays a large image accompanied by a title and description overlaying it.",
  },
  $schema: {
    classes: types.ClassList,
    row: types.Row,

    background: types.Background,
    style: types.Style,

    title: types.Title,
    image: types.Image,

    columns: [
      {
        sub: types.Text,
        text: types.Text,
        button: null,
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
    ItemType: {
      sub: types.Text,
      text: types.Text,
      grid: {
        mobile: 12,
        tablet: 10,
        desktop: 8,
        widescreen: null,
      },
    },
  }),

  watch: {},
};
</script>

<style lang="scss" scoped>
.image-center-main {
  margin: 8px auto;
  width: 80%;
  height: auto;
  max-width: 128px;
}
</style>
