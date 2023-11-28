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
  <x-section :object="$sectionData" path="$sectionData">
    <x-container :object="$sectionData">
      <h3
        v-styler="$sectionData.title"
        v-html="$sectionData.title?.applyAugment(augment,$builder.isEditing)"
        class="mb-5 fadeIn delay_100"
      />

      <p
        v-styler="$sectionData.content"
        v-html="$sectionData.content?.applyAugment(augment,$builder.isEditing)"
        class="fadeIn delay_300"
      />

      <!--  ▛▉▉▉▉▉▉▉▉▉▉▉▚▚▚▚▚▚▚▚ CALL TO ACTION PATTERN ▚▚▚▚▚▚▚▚▉▉▉▉▉▉▉▉▉▉▉▜ -->
      <x-buttons :object="$sectionData" path="$sectionData" :augment="augment"></x-buttons>
      <!-- ▙▉▉▉▉▉▉▉▉▉▉▉▚▚▚▚▚▚▚▚ CALL TO ACTION PATTERN ▚▚▚▚▚▚▚▚▉▉▉▉▉▉▉▉▉▉▉▟ -->

      <x-row
        :object="$sectionData"
        path="$sectionData"
        has-arrangement
        add-column has-wrap
        :initial-new-column="ItemType"
      >
        <!-- ██████████████████████ Columns ██████████████████████ -->
        <x-column-image-text
          v-for="(col, index) in $sectionData.columns"
          :key="index"
          :object="$sectionData.columns[index]"
          :path="`$sectionData.columns[${index}]`"
          initial-column-layout="x-layout-normal"
          clonable
          :augment="augment"
        >
        </x-column-image-text>
        <!-- █████████████████████████████████████████████████████ -->
      </x-row>
    </x-container>
  </x-section>
</template>

<script>
import * as types from "../../src/types";

export default {
  name: "image-text-cards",
  components: {},
  cover: require("../../assets/images/covers/image-text-cards.svg"),
  group: "Image & Text",
  label: "Image & Text Cards",
    help: {
        title: "This section is handy for displaying a collection of images accompanied by titles and brief descriptions.",
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
    augment:{
      // Extra information to show to dynamic show in page content
    }
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
