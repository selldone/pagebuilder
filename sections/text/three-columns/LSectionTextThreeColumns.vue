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
        v-model:object="$sectionData.header"
        :augment="augment"
        initial-type="h2"
        :initial-classes="['mb-5']"
      ></x-text>

      <x-row
        :column-structure="ItemType"
        :object="$sectionData"
        add-column
        has-arrangement
        has-fluid
        has-wrap
        ><!-- Only addable can remove col-->

        <!-- ██████████████████████ Columns ██████████████████████ -->
        <x-column-image-text
          v-for="(col, index) in $sectionData.columns"
          :key="`${index}-${$sectionData.columns.length}`"
          :augment="augment"
          :object="col"
          :remove-column="() => $sectionData.columns.splice(index, 1)"
          cloneable
          initial-column-layout="x-layout-title-content"
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
import XRow from "@selldone/page-builder/components/x/row/XRow.vue";
import XColumnImageText from "@selldone/page-builder/components/x/column-image-text/XColumnImageText.vue";

export default {
  name: "LSectionTextThreeColumns",
  directives: { styler: StylerDirective },
  mixins: [LMixinSection],
  components: {XColumnImageText, XRow, XContainer, XSection, XText },
  cover: require("../../../assets/images/covers/section-2.svg"),
  group: "Text",
  label: "Three columns",
  help: {
    title: "This section show three columns of texts.",
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
        content: types.Text,
        button: null,

        grid: {
          mobile: 12,
          tablet: 12,
          desktop: 3,
          widescreen: null,
        },
      },
      {
        title: types.Title,
        content: types.Text,
        button: null,

        grid: {
          mobile: 12,
          tablet: 12,
          desktop: 3,
          widescreen: null,
        },
      },
      {
        title: types.Title,
        content: types.Text,
        button: null,

        grid: {
          mobile: 12,
          tablet: 12,
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
      content: types.Text,
      grid: {
        mobile: 12,
        tablet: 12,
        desktop: 4,
        widescreen: null,
      },
    },
  }),
};
</script>
