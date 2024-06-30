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

<template
  xmlns:v-slot="http://www.w3.org/1999/XSL/Transform"
  xmlns:v-styler="http://www.w3.org/1999/xhtml"
>
  <x-section :object="$sectionData">
    <x-container :object="$sectionData">
      <x-row :object="$sectionData" has-arrangement has-fluid>
        <v-col cols="12" md="4" sm="6">
          <x-text
            v-model:object="$sectionData.title"
            :augment="augment"
            initial-type="h2"
            :initial-classes="['mb-3']"
          ></x-text>

          <x-text
            v-model:object="$sectionData.content"
            :augment="augment"
            initial-type="p"
          ></x-text>

          <!--  ▛▉▉▉▉▉▉▉▉▉▉▉▚▚▚▚▚▚▚▚ CALL TO ACTION PATTERN ▚▚▚▚▚▚▚▚▉▉▉▉▉▉▉▉▉▉▉▜ -->
          <x-buttons :augment="augment" :object="$sectionData"></x-buttons>
          <!-- ▙▉▉▉▉▉▉▉▉▉▉▉▚▚▚▚▚▚▚▚ CALL TO ACTION PATTERN ▚▚▚▚▚▚▚▚▉▉▉▉▉▉▉▉▉▉▉▟ -->
        </v-col>
        <v-col cols="12" md="8" sm="6">
          <x-row
            :column-structure="ItemType"
            :object="$sectionData"
            add-column
            has-arrangement
            ><!-- Only addable can remove col-->

            <x-column
              v-for="(col, index) in $sectionData.columns"
              :key="`${index}-${$sectionData.columns.length}`"
              :object="col"
              :remove-child="() => $sectionData.columns.splice(index, 1)"
            >
              <x-uploader
                v-model:object="col.image"
                :augment="augment"
                :initialSize="null"
                cover
              />
            </x-column>
          </x-row>
        </v-col>
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
import XButtons from "@selldone/page-builder/components/x/buttons/XButtons.vue";
import XColumn from "@selldone/page-builder/components/x/column/XColumn.vue";

export default {
  name: "LSectionGalleryBrands",
  directives: { styler: StylerDirective },
  mixins: [LMixinSection],
  components: {
    XColumn,
    XButtons,
    XRow,
    XContainer,
    XSection,
    XText,
    XUploader,
  },
  cover: require("../../../assets/images/covers/gallery-2.svg"),
  group: "Gallery",
  label: "Brands gallery",
  help: {
    title:
      "In this section, display numerous compact visuals, such as brand logos.",
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
        image: types.Image,

        grid: {
          mobile: 4,
          tablet: 3,
          desktop: 2,
          widescreen: null,
        },
      },
      {
        image: types.Image,
        grid: {
          mobile: 4,
          tablet: 3,
          desktop: 2,
          widescreen: null,
        },
      },
      {
        image: types.Image,
        grid: {
          mobile: 4,
          tablet: 3,
          desktop: 2,
          widescreen: null,
        },
      },
      {
        image: types.Image,
        grid: {
          mobile: 4,
          tablet: 3,
          desktop: 2,
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
      image: types.Image,
      grid: {
        mobile: 4,
        tablet: 3,
        desktop: 2,
        widescreen: null,
      },
    },
  }),

  watch: {},

  created() {
    /*  let n = 12;
    if (this.$sectionData.images.length < n) {
      let diff = n - this.$sectionData.images.length;
      for (let i = n - diff; i < n; i++) {
        this.$sectionData.images.push("");
      }
    }
    //  console.table(  this.$sectionData.images)*/
  },
  methods: {},
};
</script>

<style lang="scss" scoped>
.item-name {
  text-align: start;
}

.item-description {
  text-align: start;
}

.container-gallery {
  display: flex;
  width: 100%;
  padding: 4% 2%;
  box-sizing: border-box;
  height: 70vh;
  max-height: 840px;
}

.box {
  flex: 1;
  overflow: hidden;
  transition: 0.5s;
  margin: 0 2%;
  box-shadow: 0 20px 30px rgba(0, 0, 0, 0.1);
  line-height: 0;

  .gallery-image-item {
    overflow: hidden;
    width: 200%;
    height: calc(100% - 48px);
    object-fit: cover;
    transition: 0.5s;
  }

  p {
    font-size: 1.3rem;
    display: block;
    text-align: center;
    height: 10vh;
    line-height: 48px;
  }

  &.run-mode {
    &:hover {
      flex: 1 1 50% !important;

      .gallery-image-item {
        width: 100%;
        height: 100%;
      }
    }
  }
}

.item-card {
  background-color: #fafafa;
  border-radius: 18px;
}
</style>
