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
  <x-section :object="$sectionData" class="pa-0" path="$sectionData">
    <!-- ▃▃▃▃▃▃▃▃▃▃▃▃▃▃ Actions ▃▃▃▃▃▃▃▃▃▃▃▃▃▃ -->

    <v-sheet
      v-if="$builder.isEditing && !$builder.isHideExtra"
      class="inline-editor-sheet"
      color="#225082"
      dark
      @click.stop
    >
      <v-toolbar
        class="overflow-x-auto thin-scroll"
        color="#225082"
        flat
        height="84"
      >
        <v-spacer></v-spacer>
        <v-toolbar-items>
          <v-btn
            class="rounded-lg tnt me-2"
            color="#2196F3"
            variant="flat"
            @click.stop="removeLastSlide"
          >
            <v-icon start>backspace</v-icon>
            Remove Last Slide
          </v-btn>
          <v-btn
            class="rounded-lg tnt me-2"
            color="#2196F3"
            variant="flat"
            @click.stop="addNewSlide"
          >
            <v-icon start>queue</v-icon>
            Add New Slide
          </v-btn>
        </v-toolbar-items>
      </v-toolbar>
    </v-sheet>

    <h2
      v-styler:text="{ target: $sectionData, keyText: 'title' }"
      class="mb-5"
      v-html="$sectionData.title?.applyAugment(augment, $builder.isEditing)"
    />
    <p
      v-styler:text="{ target: $sectionData, keyText: 'content' }"
      v-html="$sectionData.content?.applyAugment(augment, $builder.isEditing)"
    />

    <!--  ▛▉▉▉▉▉▉▉▉▉▉▉▚▚▚▚▚▚▚▚ CALL TO ACTION PATTERN ▚▚▚▚▚▚▚▚▉▉▉▉▉▉▉▉▉▉▉▜ -->
    <x-buttons
      :augment="augment"
      :object="$sectionData"
      path="$sectionData"
    ></x-buttons>
    <!-- ▙▉▉▉▉▉▉▉▉▉▉▉▚▚▚▚▚▚▚▚ CALL TO ACTION PATTERN ▚▚▚▚▚▚▚▚▉▉▉▉▉▉▉▉▉▉▉▟ -->

    <div class="container-gallery">
      <div
        v-for="(col, index) in $sectionData.columns"
        :key="index"
        :class="{ 'run-mode': /*!$builder.isEditing*/ true }"
        :index="index"
        class="box"
      >
        <x-uploader
          v-model="col.image"
          :augment="augment"
          :class="{
            '-caption': $builder.isEditing || $sectionData.columns[index].title,
            '-editing': $builder.isEditing,
          }"
          :path="`$sectionData.columns[${index}].image`"
          class="gallery-image-item"
          cover
        >
        </x-uploader>

        <p
          v-if="$builder.isEditing || $sectionData.columns[index].title"
          v-styler:text="{
            target: $sectionData.columns[index],
            keyText: 'title',
          }"
          :index="index"
          v-html="
            $sectionData.columns[index].title?.applyAugment(
              augment,
              $builder.isEditing,
            )
          "
        />
      </div>
    </div>
  </x-section>
</template>

<script>
import * as types from "../../../src/types";
import { LMixinsHistory } from "@app-page-builder/mixins/history/LMixinsHistory";
import StylerDirective from "@app-page-builder/styler/StylerDirective";
import SectionMixin from "@app-page-builder/mixins/SectionMixin";

export default {
  name: "LSectionGalleryExpandable",
  directives: { styler: StylerDirective },
  mixins: [SectionMixin, LMixinsHistory],

  components: {},
  cover: require("../../../assets/images/covers/gallery-1.svg"),
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
