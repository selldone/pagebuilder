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
      <x-row
        v-if="$sectionData.columns"
        :object="$sectionData"
        class="min-h-100"
        has-arrangement
        has-fluid
        path="$sectionData"
      >
        <!-- ██████████████████████ Column 1 ██████████████████████ -->

        <x-column
          :object="$sectionData.columns[0]"
          class="position-relative"
          path="$sectionData.columns[0]"
        >
          <h1
            v-styler:text="{ target: $sectionData, keyText: 'title' }"
            class="mb-2 fadeIn"
            v-html="
              $sectionData.title?.applyAugment(augment, $builder.isEditing)
            "
          />

          <p
            v-styler:text="{ target: $sectionData, keyText: 'content' }"
            class="mb-4 fadeIn delay_300"
            v-html="
              $sectionData.content?.applyAugment(augment, $builder.isEditing)
            "
          />

          <!--  ▛▉▉▉▉▉▉▉▉▉▉▉▚▚▚▚▚▚▚▚ CALL TO ACTION PATTERN ▚▚▚▚▚▚▚▚▉▉▉▉▉▉▉▉▉▉▉▜ -->
          <x-buttons
            :augment="augment"
            :object="$sectionData"
            path="$sectionData"
          ></x-buttons>
          <!-- ▙▉▉▉▉▉▉▉▉▉▉▉▚▚▚▚▚▚▚▚ CALL TO ACTION PATTERN ▚▚▚▚▚▚▚▚▉▉▉▉▉▉▉▉▉▉▉▟ -->
        </x-column>

        <!-- ██████████████████████ Column 2 ██████████████████████ -->

        <x-column
          :object="$sectionData.columns[1]"
          class="fadeIn delay_300 position-relative"
          path="$sectionData.columns[1]"
        >
          <x-uploader
            v-model="$sectionData.lottie"
            :aspect-ratio="1"
            :augment="augment"
            class="header-image hero-image"
            file-key="lottie"
            no-preview
            path="$sectionData.lottie"
            @uploaded="refreshAnimation"
          >
            <template v-slot="{ src }">
              <s-lottie
                v-if="show_lottie_view"
                :options="{
                  path: getShopJsonPath(src),
                  loop: true,
                  autoplay: true,
                }"
                :speed="1"
                class="-in-animation"
                height="auto"
                style="max-width: 800px; max-height: 800px"
                width="100%"
              />
            </template>
          </x-uploader>
        </x-column>
      </x-row>
    </x-container>
  </x-section>
</template>

<script>
import * as types from "@app-page-builder/src/types/types";
import StylerDirective from "@app-page-builder/styler/StylerDirective";
import LMixinSection from "@app-page-builder/mixins/section/LMixinSection";
import XUploader from "@app-page-builder/components/x/uploader/XUploader.vue";

export default {
  name: "LSectionHeroLottie",
  directives: { styler: StylerDirective },
  mixins: [LMixinSection],
  components: {XUploader},
  cover: require("../../../assets/images/covers/hero-lottie.svg"),
  label: "Animate Hero - Lottie Files",

  help: {
    title: "Use this section to display Lottie animation files.",
    video: "/app/videos/page-builder/Lottie.m4v",
  },

  group: "Hero",
  $schema: {
    classes: types.ClassList,
    row: types.Row,

    // Background & Style:
    background: types.Background,
    style: types.Style,

    // Contents:
    title: types.Title,
    content: types.Text,
    lottie: types.Lottie,

    // Buttons:
    buttons: [],
    btn_row: types.Row,

    // Columns:
    columns: [
      {
        grid: {
          mobile: 12,
          tablet: 6,
          desktop: 8,
          widescreen: null,
        },
      },
      {
        grid: {
          mobile: 12,
          tablet: 6,
          desktop: 4,
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

    show_lottie_view: true,
  }),

  computed: {},
  watch: {},

  created() {
    // 🛠️ Fix bad data structures:
    if (!this.$sectionData.columns || this.$sectionData.columns.length < 2) {
      this.$sectionData.columns = [
        {
          grid: {
            mobile: 12,
            tablet: 6,
            desktop: 8,
            widescreen: null,
          },
        },
        {
          grid: {
            mobile: 12,
            tablet: 6,
            desktop: 4,
            widescreen: null,
          },
        },
      ];
    }
  },

  methods: {
    refreshAnimation() {
      this.show_lottie_view = false;
      this.$nextTick(function () {
        this.show_lottie_view = true;
      });
    },
  },
};
</script>

<style lang="scss" scoped></style>

<style lang="scss"></style>
