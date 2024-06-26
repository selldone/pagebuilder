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
  <x-section :object="$sectionData">
    <x-container :object="$sectionData">
      <x-text
        v-model:object="$sectionData.title"
        :augment="augment"
        initial-type="h2"
        :initial-classes="['mb-5']"
      ></x-text>

      <x-text
        v-model:object="$sectionData.content"
        :augment="augment"
        initial-type="p"
      ></x-text>

      <!--  ▛▉▉▉▉▉▉▉▉▉▉▉▚▚▚▚▚▚▚▚ CALL TO ACTION PATTERN ▚▚▚▚▚▚▚▚▉▉▉▉▉▉▉▉▉▉▉▜ -->
      <x-buttons :augment="augment" :object="$sectionData"></x-buttons>
      <!-- ▙▉▉▉▉▉▉▉▉▉▉▉▚▚▚▚▚▚▚▚ CALL TO ACTION PATTERN ▚▚▚▚▚▚▚▚▉▉▉▉▉▉▉▉▉▉▉▟ -->

      <x-row
        :column-structure="ItemType"
        :object="$sectionData"
        add-column
        has-arrangement
        has-fluid
        has-wrap
      >
        <!-- ██████████████████████ Columns ██████████████████████ -->
        <x-column-image-text
          v-for="(col, index) in $sectionData.columns"
          :key="`${index}-${$sectionData.columns.length}`"
          :augment="augment"
          :object="col"
          :remove-column="() => $sectionData.columns.splice(index, 1)"
          cloneable
          initial-column-layout="x-layout-normal"
        >
        </x-column-image-text>
        <!-- █████████████████████████████████████████████████████ -->
      </x-row>
    </x-container>
  </x-section>
</template>

<script>
import * as types from "../../../src/types/types";
import StylerDirective from "../../../styler/StylerDirective";
import LMixinSection from "../../../mixins/section/LMixinSection";
import XText from "@selldone/page-builder/components/x/text/XText.vue";
import XSection from "@selldone/page-builder/components/x/section/XSection.vue";
import XContainer from "@selldone/page-builder/components/x/container/XContainer.vue";
import XButtons from "@selldone/page-builder/components/x/buttons/XButtons.vue";
import XRow from "@selldone/page-builder/components/x/row/XRow.vue";
import XColumnImageText from "@selldone/page-builder/components/x/column-image-text/XColumnImageText.vue";

export default {
  name: "LSectionImageCards",
  directives: { styler: StylerDirective },
  mixins: [LMixinSection],

  components: {XColumnImageText, XRow, XButtons, XContainer, XSection, XText },
  cover: require("../../../assets/images/covers/image-text-cards.svg"),
  group: "Image & Text",
  label: "Image & Text Cards",
  help: {
    title:
      "This section is handy for displaying a collection of images accompanied by titles and brief descriptions.",
  },
  $schema: {
    classes: types.ClassList,

    row: types.Row,

    background: types.Background,
    style: types.Style,

    title: types.Title,
    content: types.Text,

    columns: [
      {
        title: types.Title,
        image: types.Image,
        content: types.Text,
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
        image: types.Image,
        content: types.Text,
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
        image: types.Image,
        content: types.Text,
        button: null,
        grid: {
          mobile: 12,
          tablet: 4,
          desktop: 3,
          widescreen: null,
        },
      },
    ],

    // Buttons:
    buttons: [],
    btn_row: types.Row,
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
      image: types.Image,
      content: types.Text,
      grid: {
        mobile: 12,
        tablet: 4,
        desktop: 3,
        widescreen: null,
      },
    },
  }),

  watch: {},
};
</script>
