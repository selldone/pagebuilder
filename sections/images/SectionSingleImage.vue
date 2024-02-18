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
      <h2
        v-styler:text="$sectionData.title"
        class="mb-5 fadeIn delay_100"
        v-html="$sectionData.title?.applyAugment(augment, $builder.isEditing)"
      />

      <x-uploader
        class="fadeIn delay_300"
        :path="`$sectionData.image`"
        rounded
        :initial-size="{ max_w: 600, max_h: 600 }"
        :augment="augment"
      />

      <x-row
        :object="$sectionData"
        path="$sectionData"
        has-arrangement
        add-column
        has-fluid
      >
        <!-- ██████████████████████ Columns ██████████████████████ -->
        <x-column-image-text
          v-for="(col, index) in $sectionData.columns"
          :key="index"
          :object="$sectionData.columns[index]"
          :path="`$sectionData.columns[${index}]`"
          initial-column-layout="x-layout-title-content"
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
  name: "Social2",
  components: {},
  cover: require("../../assets/images/covers/social-2.svg"),
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
