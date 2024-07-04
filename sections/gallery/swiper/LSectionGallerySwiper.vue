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
  name: "LSectionGallerySwiper",
  directives: { styler: StylerDirective },
  mixins: [LMixinSection],

  components: {
    XComponent,
  },
  cover: require("../../../assets/images/covers/slideshow.svg"),

  group: "Gallery",
  label: "Slide show",

  help: {
    title:
      "This section allows for the creation of a fully customizable slideshow.",
  },

  $schema: {
    classes: types.ClassList,
    row: types.Row,

    background: types.Background,
    style: types.Style,

    slide: {
      effect: "slide",
      autoplay: true,

      items: [types.Slide],
      height: "640px",
      heightThumbs: "180px",
      loop: false,
      navigation: true,
      pagination: "bullets",
      vertical: false,
      slidesPerView: 1,
      spaceBetween: 0,
      active: null, // Center slide custom class

      thumbnail: {
        enable: false,
      },
    },
  },
  props: {
    id: {
      type: Number,
      required: true,
    },
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
