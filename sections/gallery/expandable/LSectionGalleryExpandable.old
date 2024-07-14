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
import { LMixinHistory } from "../../../mixins/history/LMixinHistory";
import StylerDirective from "../../../styler/StylerDirective";
import LMixinSection from "../../../mixins/section/LMixinSection";
import XComponent from "@selldone/page-builder/components/x/component/XComponent.vue";

export default {
  name: "LSectionGalleryExpandable",
  directives: { styler: StylerDirective },
  mixins: [LMixinSection, LMixinHistory],

  components: { XComponent },
  cover: require("../../../assets/images/covers/gallery-1.svg"),
  group: "Gallery",
  label: "Expandable Gallery",

  help: {
    title:
      "This section presents an image gallery featuring horizontally expandable slides.",
  },

  $schema: {
    classes: types.ClassList,
    background: types.Background,
    style: types.Style,

    title: types.Title,
    content: types.Text,

    columns: [
      {
        title: types.Title,
        image: types.Image,
      },
      {
        title: types.Title,
        image: types.Image,
      },
      {
        title: types.Title,
        image: types.Image,
      },
      {
        title: types.Title,
        image: types.Image,
      },
    ],

    // Buttons:
    buttons: [],
    btn_row: types.Row,
  },
  props: {

    augment: {
      // Extra information to show to dynamic show in page content
    },
  },
  data: () => ({
    columnStructure: {
      title: types.Title,
      image: types.Image,
    },
  }),

  methods: {},
};
</script>

<style lang="scss" scoped></style>
