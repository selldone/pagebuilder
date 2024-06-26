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
      <x-row :object="$sectionData" has-arrangement has-fluid>
        <!-- ██████████████████████ Column 1 ██████████████████████ -->

        <x-column
          :object="$sectionData.columns[0]"
          class="position-relative"
          path="$sectionData.columns[0]"
        >
          <x-text
            v-model:object="$sectionData.title"
            :augment="augment"
            initial-type="h1"
            :initial-classes="['mb-2']"
          ></x-text>

          <x-text
            v-model:object="$sectionData.content"
            :augment="augment"
            initial-type="p"
            :initial-classes="['mb-4']"
          ></x-text>

          <!--  ▛▉▉▉▉▉▉▉▉▉▉▉▚▚▚▚▚▚▚▚ CALL TO ACTION PATTERN ▚▚▚▚▚▚▚▚▉▉▉▉▉▉▉▉▉▉▉▜ -->
          <x-buttons :augment="augment" :object="$sectionData"></x-buttons>
          <!-- ▙▉▉▉▉▉▉▉▉▉▉▉▚▚▚▚▚▚▚▚ CALL TO ACTION PATTERN ▚▚▚▚▚▚▚▚▉▉▉▉▉▉▉▉▉▉▉▟ -->
        </x-column>
        <!-- ██████████████████████ Column 2 ██████████████████████ -->

        <x-column
          :object="$sectionData.columns[1]"
          class="fadeIn delay_300 position-relative"
          path="$sectionData.columns[1]"
        >
          <x-uploader
            v-model="$sectionData.image"
            :augment="augment"
            path="$sectionData.image"
          />
        </x-column>
      </x-row>
    </x-container>
  </x-section>
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

export default {
  name: "LSectionHeroVertical",
  directives: { styler: StylerDirective },
  mixins: [LMixinSection],
  components: {XButtons, XColumn, XRow, XContainer, XSection, XText, XUploader },
  cover: require("../../../assets/images/covers/hero-2.svg"),
  group: "Hero",
  label: "Vertical Hero",
  help: {
    title: "Place this section at the beginning of your page.",
    video: "/app/videos/page-builder/Sectionherovertical.mp4",
  },

  $schema: {
    classes: types.ClassList,
    row: types.Row,

    // Background & Style:
    background: types.Background,
    style: types.Style,

    // Contents:
    title: types.Title,
    content: types.Text,
    image: types.Image,

    // Buttons:
    buttons: [],
    btn_row: types.Row,

    // Columns:
    columns: [
      {
        grid: {
          mobile: 12,
          tablet: 12,
          desktop: 12,
          widescreen: null,
        },
      },
      {
        grid: {
          mobile: 12,
          tablet: 10,
          desktop: 8,
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
  }),

  watch: {},

  created() {
    // 🛠️ Fix bad data structures:
    if (!this.$sectionData.columns || this.$sectionData.columns.length < 2) {
      this.$sectionData.columns = [
        {
          grid: {
            mobile: 12,
            tablet: 12,
            desktop: 12,
            widescreen: null,
          },
        },
        {
          grid: {
            mobile: 12,
            tablet: 10,
            desktop: 8,
            widescreen: null,
          },
        },
      ];
    }
  },
};
</script>
<style lang="scss" scoped></style>
