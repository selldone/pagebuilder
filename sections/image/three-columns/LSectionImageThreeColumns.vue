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
      <x-row :object="$sectionData" path="$sectionData" has-arrangement has-fluid>
        <!-- ██████████████████████ Column A ██████████████████████ -->

        <x-column :object="$sectionData.columnA" path="$sectionData.columnA">
          <!-- ▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂ Row ▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂-->

          <x-row
            :object="$sectionData.columnA"
            path="$sectionData.columnA"
            add-column
          >
            <!-- ▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂ Columns ▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂-->
            <x-column-image-text
              v-for="(col, index) in $sectionData.columnA.columns"
              :object="$sectionData.columnA.columns[index]"
              :path="`$sectionData.columnA.columns[${index}]`"
              :augment="augment"

              :key="`${index}-${$sectionData.columnA.length}`"
              :remove-column="()=> $sectionData.columns.splice(index, 1)"

            >
            </x-column-image-text>
          </x-row>
        </x-column>

        <!-- ██████████████████████ Column B ██████████████████████ -->

        <x-column :object="$sectionData.columnB" path="$sectionData.columnB">
          <!-- ▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂ Row ▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂-->
          <x-row
            :object="$sectionData.columnB"
            path="$sectionData.columnB"
            add-column
          >
            <!-- ▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂ Columns ▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂-->
            <x-column-image-text
              v-for="(col, index) in $sectionData.columnB.columns"
              :object="$sectionData.columnB.columns[index]"
              :path="`$sectionData.columnB.columns[${index}]`"
              :augment="augment"

              :key="`${index}-${$sectionData.columnB.length}`"
              :remove-column="()=> $sectionData.columns.splice(index, 1)"

            >
            </x-column-image-text>
          </x-row>
        </x-column>

        <!-- ██████████████████████ Column C ██████████████████████ -->

        <x-column :object="$sectionData.columnC" path="$sectionData.columnC">
          <!-- ▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂ Row ▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂-->
          <x-row
            :object="$sectionData.columnC"
            path="$sectionData.columnC"
            add-column
          >
            <!-- ▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂ Columns ▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂-->
            <x-column-image-text
              v-for="(col, index) in $sectionData.columnC.columns"
              :object="$sectionData.columnC.columns[index]"
              :path="`$sectionData.columnC.columns[${index}]`"
              :augment="augment"

              :key="`${index}-${$sectionData.columnC.length}`"
              :remove-column="()=> $sectionData.columns.splice(index, 1)"
            >
            </x-column-image-text>
          </x-row>
        </x-column>
      </x-row>
    </x-container>
  </x-section>
</template>

<script>
import * as types from "../../../src/types";
import StylerDirective from "@app-page-builder/styler/StylerDirective";
import SectionMixin from "@app-page-builder/mixins/SectionMixin";

export default {
  name: "LSectionImageThreeColumns",
  directives: { styler: StylerDirective },
  mixins: [SectionMixin],

  components: {},
  cover: require("../../../assets/images/covers/three-columns.svg"),
  group: "Image & Text",
  label: "Three column",
  help: {
    title:
      "This section contains two horizontal subsections, and you have the option to add more sub-columns within each column.",
    video: "/app/videos/page-builder/SectionThreeCol.mp4",
  },
  $schema: {
    classes: types.ClassList,

    //  row_master: types.Row,
    row: types.Row,

    background: types.Background,
    style: types.Style,

    columnA: {
      grid: {
        mobile: 12,
        tablet: 6,
        desktop: 6,
        widescreen: null,
      },

      columns: [
        {
          title: types.Title,
          image: types.Image,
          content: types.Text,
          button: null,
          grid: {
            mobile: 12,
            tablet: null,
            desktop: null,
            widescreen: null,
          },
        },
      ],
    },

    columnB: {
      grid: {
        mobile: 6,
        tablet: 3,
        desktop: 3,
        widescreen: null,
      },

      columns: [
        {
          title: types.Title,
          image: types.Image,
          content: types.Text,
          button: null,
          grid: {
            mobile: 12,
            tablet: null,
            desktop: null,
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
            tablet: null,
            desktop: null,
            widescreen: null,
          },
        },
      ],
    },

    columnC: {
      grid: {
        mobile: 6,
        tablet: 3,
        desktop: 3,
        widescreen: null,
      },

      columns: [
        {
          title: types.Title,
          image: types.Image,
          content: types.Text,
          button: null,
          grid: {
            mobile: 12,
            tablet: null,
            desktop: null,
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
            tablet: null,
            desktop: null,
            widescreen: null,
          },
        },
      ],
    },

    /*
      Initial image size: (old)
      {
            w: '100px',
            h: '100px',
            min_h: '20px',
            max_w: '100%',
          }
       */
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

  data: () => ({}),

  watch: {},

  methods: {},
};
</script>
