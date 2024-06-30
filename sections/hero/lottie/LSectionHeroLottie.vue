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
import XUploader from "../../../components/x/uploader/XUploader.vue";
import XText from "@selldone/page-builder/components/x/text/XText.vue";
import XSection from "@selldone/page-builder/components/x/section/XSection.vue";
import XContainer from "@selldone/page-builder/components/x/container/XContainer.vue";
import XRow from "@selldone/page-builder/components/x/row/XRow.vue";
import XColumn from "@selldone/page-builder/components/x/column/XColumn.vue";
import XButtons from "@selldone/page-builder/components/x/buttons/XButtons.vue";
import XComponent from "@selldone/page-builder/components/x/component/XComponent.vue";

export default {
  name: "LSectionHeroLottie",
  directives: { styler: StylerDirective },
  mixins: [LMixinSection],
  components: {
    XButtons,
    XColumn,
    XRow,
    XContainer,
    XSection,
    XText,
    XUploader,
    XComponent
  },
  cover: require("../../../assets/images/covers/hero-lottie.svg"),
  label: "Animate Hero - Lottie Files",

  help: {
    title: "Use this section to display Lottie animation files.",
    video: "/app/videos/page-builder/Lottie.m4v",
  },

  group: "Hero",
  $schema: {
    classes: types.ClassList,
    row: types.Row,

    // Background & Style:
    background: types.Background,
    style: types.Style,

    // Contents:
    title: types.Title,
    content: types.Text,
    lottie: types.Lottie,

    // Buttons:
    buttons: [],
    btn_row: types.Row,

    // Columns:
    columns: [
      {
        grid: {
          mobile: 12,
          tablet: 6,
          desktop: 8,
          widescreen: null,
        },
      },
      {
        grid: {
          mobile: 12,
          tablet: 6,
          desktop: 4,
          widescreen: null,
        },
      },
    ],

    /**
     * Set up custom default values, such as classes, when establishing a new section to streamline the initialization process.
     */
    $init: (data) => {
      data.classes = [
        "min-height-80vh",
        "d-flex" /*Keep row fill container! Important.*/,
      ];
      data.row.align = "center";
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
    types: types,

    show_lottie_view: true,
  }),

  computed: {},
  watch: {},

  created() {

  },

  methods: {
    refreshAnimation() {
      this.show_lottie_view = false;
      this.$nextTick(function () {
        this.show_lottie_view = true;
      });
    },
  },
};
</script>

<style lang="scss" scoped></style>

