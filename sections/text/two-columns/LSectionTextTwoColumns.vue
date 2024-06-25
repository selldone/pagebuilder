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
      <component
        :is="$sectionData.header.tag"
        v-styler:text="{
          target: $sectionData.header,
          keyText: 'value',
          keyClasses: 'classes',
          keyStyle: 'style'
        }"
        :class="[$sectionData.header?.classes,{'is-editable': $builder.isEditing}]"
        :style="[$sectionData.header?.style]"
        class="mb-5 fadeIn delay_100"
        v-html="
          $sectionData.header?.value?.applyAugment(augment, $builder.isEditing)
        "
      ></component>

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
          :object="$sectionData.columns[index]"
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
import { isObject } from "lodash-es";

export default {
  name: "LSectionTextTwoColumns",
  directives: { styler: StylerDirective },
  mixins: [LMixinSection],
  components: {},
  cover: require("../../../assets/images/covers/section-1.svg"),

  group: "Text",
  label: "Two columns",
  help: {
    title: "This section show two columns of texts.",
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
          tablet: 6,
          desktop: 5,
          widescreen: null,
        },
      },
      {
        title: types.Title,
        content: types.Text,
        button: null,

        grid: {
          mobile: 12,
          tablet: 6,
          desktop: 5,
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
        tablet: 6,
        desktop: 5,
        widescreen: null,
      },
    },
  }),

  created() {
    // Migration from old!
    if (!isObject(this.$sectionData?.header)) {
      console.log("Need migration header!", this.$sectionData);
      this.$sectionData.header = {
        tag: "h2",
        value: this.$sectionData.header,
        classes: [],
        style: {},
      };
    }
  },
};
</script>
