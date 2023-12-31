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
      <x-row
        :object="$sectionData"
        path="$sectionData"
        has-arrangement
        class="min-h-100"
      >
        <!-- ██████████████████████ Column 1 ██████████████████████ -->

        <x-column
          path="$sectionData.columns[0]"
          :object="$sectionData.columns[0]"
          class="position-relative"
        >
          <h1
            v-styler:text="$sectionData.title"
            v-html="
              $sectionData.title?.applyAugment(augment, $builder.isEditing)
            "
            class="mb-2 fadeIn delay_100"
          />

          <p
            v-styler:text="$sectionData.content"
            v-html="
              $sectionData.content?.applyAugment(augment, $builder.isEditing)
            "
            class="mb-4 fadeIn delay_300"
          />

          <!--  ▛▉▉▉▉▉▉▉▉▉▉▉▚▚▚▚▚▚▚▚ CALL TO ACTION PATTERN ▚▚▚▚▚▚▚▚▉▉▉▉▉▉▉▉▉▉▉▜ -->
          <x-buttons
            :object="$sectionData"
            path="$sectionData"
            :augment="augment"
          ></x-buttons>
          <!-- ▙▉▉▉▉▉▉▉▉▉▉▉▚▚▚▚▚▚▚▚ CALL TO ACTION PATTERN ▚▚▚▚▚▚▚▚▉▉▉▉▉▉▉▉▉▉▉▟ -->
        </x-column>
        <!-- ██████████████████████ Column 2 ██████████████████████ -->

        <x-column
          path="$sectionData.columns[1]"
          :object="$sectionData.columns[1]"
          class="fadeIn delay_300 position-relative"
        >
          <uploader path="$sectionData.image" :augment="augment" />
        </x-column>
      </x-row>
    </x-container>
  </x-section>
</template>

<script>
import * as types from "../../src/types";

export default {
  name: "Hero2",
  components: {},
  cover: require("../../assets/images/covers/hero-2.svg"),
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
