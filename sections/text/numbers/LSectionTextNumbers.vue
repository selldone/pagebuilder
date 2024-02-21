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
  <x-section :object="$sectionData" path="$sectionData">
    <x-container :object="$sectionData">
      <h2
        v-styler:text="{target:$sectionData,keyText:'header'}   "


        class="mb-5 fadeIn delay_100"
        v-html="$sectionData.header?.applyAugment(augment, $builder.isEditing)"
      ></h2>

      <x-row
        :object="$sectionData"
        path="$sectionData"
        has-arrangement
        add-column
        has-wrap
        has-fluid
        :column-structure="ItemType"
        ><!-- Only addable can remove col-->

        <!-- ██████████████████████ Columns ██████████████████████ -->
        <x-column-image-text
          v-for="(col, index) in $sectionData.columns"
          :object="$sectionData.columns[index]"
          :path="`$sectionData.columns[${index}]`"
          initial-column-layout="x-layout-content-title"
          clonable
          content-class="text-h1"
          :augment="augment"


          :key="`${index}-${$sectionData.columns.length}`"
          :remove-column="()=> $sectionData.columns.splice(index, 1)"
        >
        </x-column-image-text>
        <!-- █████████████████████████████████████████████████████ -->
      </x-row>
    </x-container>
  </x-section>
</template>

<script>
import * as types from "../../../src/types";
import StylerDirective from "@app-page-builder/styler/StylerDirective";
import SectionMixin from "@app-page-builder/mixins/SectionMixin";

export default {
  name: "LSectionTextNumbers",
  directives: { styler: StylerDirective },
  mixins: [SectionMixin],
  components: {},
  cover: require("../../../assets/images/covers/social-1.svg"),

  group: "Text",
  label: "Three numbers",
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
