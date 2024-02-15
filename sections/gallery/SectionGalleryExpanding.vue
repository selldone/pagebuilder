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
  <x-section :object="$sectionData" path="$sectionData" class="pa-0">
    <!-- ▃▃▃▃▃▃▃▃▃▃▃▃▃▃ Actions ▃▃▃▃▃▃▃▃▃▃▃▃▃▃ -->

    <v-sheet
      dark
      color="#225082"
      v-if="$builder.isEditing && !$builder.isHideExtra"
      class="inline-editor-sheet"
      @click.stop
    >
      <v-toolbar
        class="overflow-x-auto thin-scroll"
        flat
        height="84"
        color="#225082"
      >
        <v-spacer></v-spacer>
        <v-toolbar-items>
          <v-btn
            @click.stop="removeLastSlide"
            color="#2196F3"
            variant="flat"
            class="rounded-lg tnt me-2"
          >
            <v-icon start>backspace</v-icon> Remove Last Slide
          </v-btn>
          <v-btn
            @click.stop="addNewSlide"
            dark
            color="#2196F3"
            variant="flat"
            class="rounded-lg tnt me-2"
          >
            <v-icon start>queue</v-icon> Add New Slide
          </v-btn>
        </v-toolbar-items>
      </v-toolbar>
    </v-sheet>

    <h2
      v-styler="$sectionData.title"
      class="mb-5"
      v-html="$sectionData.title?.applyAugment(augment, $builder.isEditing)"
    />
    <p
      v-styler="$sectionData.content"
      v-html="$sectionData.content?.applyAugment(augment, $builder.isEditing)"
    />

    <!--  ▛▉▉▉▉▉▉▉▉▉▉▉▚▚▚▚▚▚▚▚ CALL TO ACTION PATTERN ▚▚▚▚▚▚▚▚▉▉▉▉▉▉▉▉▉▉▉▜ -->
    <x-buttons
      :object="$sectionData"
      path="$sectionData"
      :augment="augment"
    ></x-buttons>
    <!-- ▙▉▉▉▉▉▉▉▉▉▉▉▚▚▚▚▚▚▚▚ CALL TO ACTION PATTERN ▚▚▚▚▚▚▚▚▉▉▉▉▉▉▉▉▉▉▉▟ -->

    <div class="container-gallery addable">
      <div
        v-for="(col, index) in $sectionData.columns"
        :key="index"
        :index="index"
        class="box"
        :class="{ 'run-mode': /*!$builder.isEditing*/ true }"
      >
        <uploader
          cover
          class="gallery-image-item"
          :path="`$sectionData.columns[${index}].image`"
          :class="{
            '-caption': $builder.isEditing || $sectionData.columns[index].title,
            '-editing': $builder.isEditing,
          }"
          :augment="augment"
        >
        </uploader>

        <p
          v-if="$builder.isEditing || $sectionData.columns[index].title"
          v-styler="$sectionData.columns[index].title"
          v-html="
            $sectionData.columns[index].title?.applyAugment(
              augment,
              $builder.isEditing,
            )
          "
          :index="index"
        />
      </div>
    </div>
  </x-section>
</template>

<script>
import * as types from "../../src/types";
import {LandingHistoryMixin} from "@app-page-builder/mixins/LandingHistoryMixin";

export default {
  name: "Gallery1",
  mixins:[LandingHistoryMixin],

  components: {},
  cover: require("../../assets/images/covers/gallery-1.svg"),
  group: "Gallery",
  label: "Expandable Gallery",

  help: {
    title:
      "This section presents an image gallery featuring horizontally expandable slides.",
  },

  $schema: {
    classes: types.ClassList,
    background: types.Background,
    style: types.Style,

    title: types.Title,
    content: types.Text,

    columns: [
      {
        title: types.Title,
        image: types.Image,
      },
      {
        title: types.Title,
        image: types.Image,
      },
      {
        title: types.Title,
        image: types.Image,
      },
      {
        title: types.Title,
        image: types.Image,
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
    },
  }),

  methods: {
    removeLastSlide() {
      this.onSaveHistory(); // 📙 Save local history

      this.openDangerAlert(
        "Delete Last Slide",
        "Are you certain you want to remove the final slide?",
        "Yes, Delete now",
        () => {
          this.$sectionData.columns.pop();
        },
      );
    },
    addNewSlide() {
      this.onSaveHistory(); // 📙 Save local history

      this.addItemToArray(this.$sectionData.columns, this.ItemType);
    },
  },
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
    height: calc(100%);
    object-fit: cover;
    transition: 0.5s;
    &.-caption {
      height: calc(100% - 48px) !important;
    }
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
        &.-editing {
          height: calc(100% - 48px) !important;
        }
      }
    }
  }
}
</style>
