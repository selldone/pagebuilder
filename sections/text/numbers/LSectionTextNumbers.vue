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
import XText from "@selldone/page-builder/components/x/text/XText.vue";
import XSection from "@selldone/page-builder/components/x/section/XSection.vue";
import XContainer from "@selldone/page-builder/components/x/container/XContainer.vue";
import XRow from "@selldone/page-builder/components/x/row/XRow.vue";
import XColumnImageText from "@selldone/page-builder/components/x/column-image-text/XColumnImageText.vue";
import XComponent from "@selldone/page-builder/components/x/component/XComponent.vue";

export default {
  name: "LSectionTextNumbers",
  directives: { styler: StylerDirective },
  mixins: [LMixinSection],
  components: {
    XComponent,
    XColumnImageText,
    XRow,
    XContainer,
    XSection,
    XText,
  },
  cover: require("../../../assets/images/covers/social-1.svg"),

  group: "Text",
  label: "Numbers",
  help: {
    title:
      "Use this section to show big numbers or highlight some values in your business.",
  },
  $schema: {
    classes: types.ClassList,

    row: types.Row,

    header: types.Title,
    background: types.Background,
    style: types.Style,
    columns: [
      {
        title: types.Title,
        content: Number,
        button: null,

        grid: {
          mobile: 12,
          tablet: 4,
          desktop: 3,
          widescreen: null,
        },
      },
      {
        title: types.Title,
        content: Number,
        button: null,

        grid: {
          mobile: 12,
          tablet: 4,
          desktop: 3,
          widescreen: null,
        },
      },
      {
        title: types.Title,
        content: Number,
        button: null,

        grid: {
          mobile: 12,
          tablet: 4,
          desktop: 3,
          widescreen: null,
        },
      },
    ],
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
  data: () => ({
    ItemType: {
      title: types.Title,
      content: Number,
      grid: {
        mobile: 12,
        tablet: 4,
        desktop: 3,
        widescreen: null,
      },
    },
  }),

  created() {},
};
</script>
