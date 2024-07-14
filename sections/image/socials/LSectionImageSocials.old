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
  name: "LSectionImageSocials",
  directives: { styler: StylerDirective },
  mixins: [LMixinSection],
  components: {
    XComponent,
  },
  cover: require("../../../assets/images/covers/social-4.svg"),
  group: "Image & Text",
  label: "Social & Testimonial",
  help: {
    title:
      "Use this section to display social validation and customer testimonials on your page.",
  },
  $schema: {
    classes: types.ClassList,

    background: types.Background,
    style: types.Style,

    title: types.Title,
    content: types.Text,

    row: types.Row,

    columns: [
      {
        content: types.Text,
        title: types.Title,
        description: types.Text,
        image: types.Image,
        button: null,

        grid: {
          mobile: 12,
          tablet: 6,
          desktop: 4,
          widescreen: null,
        },
      },
      {
        content: types.Text,
        title: types.Title,
        description: types.Text,
        image: types.Image,
        button: null,

        grid: {
          mobile: 12,
          tablet: 6,
          desktop: 4,
          widescreen: null,
        },
      },
      {
        content: types.Text,
        title: types.Title,
        description: types.Text,
        image: types.Image,
        button: null,

        grid: {
          mobile: 12,
          tablet: 6,
          desktop: 4,
          widescreen: null,
        },
      },
    ],

    // Buttons:
    buttons: [],
    btn_row: types.Row,

    /**
     * Set up custom default values, such as classes, when establishing a new section to streamline the initialization process.
     */
    $init: (data) => {
    /*  data.columns.forEach((c) => {
        c.image.setting.size = {
          w: "100%",
          h: "auto",
          max_w: "40%",
          max_h: "100%",
          min_w: "36px",
          min_h: "36px",
        };
        c.image.setting.aspect = 1;
        c.image.setting.round = true;

        c.image.classes = ["pa-2"];

        c.image.style = {
          boxShadow:
            "rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px",
          paddingLeft: "8px",
          paddingRight: "8px",
          paddingTop: "8px",
          paddingBottom: "8px",
        };

        c.classes = ["text-start"];
      });*/
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

  data: () => ({
    ItemType: {
      content: types.Text,
      name: types.Title,
      description: types.Text,
      image: types.Image,
      grid: {
        mobile: 12,
        tablet: 6,
        desktop: 4,
        widescreen: null,
      },
    },
  }),
  watch: {},
};
</script>

<style lang="scss" scoped>
.item-container {
  flex: auto;

  .item-name {
    text-align: start;
  }

  .item-description {
    text-align: start;
  }
}
</style>
