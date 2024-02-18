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
        has-fluid
        class="min-h-100"
      >
        <v-col
          v-styler:grid="$sectionData.columns[0].grid"
          :class="[gridClasses[0], $sectionData.columns[0].classes]"
          :style="[
            $sectionData.columns[0].style,
            backgroundStyle($sectionData.columns[0].background),
          ]"
          class="position-relative"
        >
          <!-- 📹 Background video -->
          <video-background
            v-if="$sectionData.columns[0].background?.bg_video"
            :video="getVideoUrl($sectionData.columns[0].background.bg_video)"
          >
          </video-background>

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

          <!--  ▛▉▉▉▉▉▉▉▉▉▉▉▚▚▚▚▚▚▚▚ Start Search ▚▚▚▚▚▚▚▚▉▉▉▉▉▉▉▉▉▉▉▜ -->
          <s-storefront-search-box
            :shop-name="getShop() && getShop().name"
            class="fadeIn delay_300"
            @onSearch="onSearch"
            :solo="$sectionData.search.solo"
            :flat="$sectionData.search.flat"
            :outlined="$sectionData.search.outlined"
            :dark="$sectionData.search.dark"
            :background-color="$sectionData.search.backgroundColor"
            :color="$sectionData.search.color"
            :filled="$sectionData.search.filled"
            :rounded="$sectionData.search.rounded"
            :placeholder="$sectionData.search.placeholder"
            :label="$sectionData.search.label"
            :messages="$sectionData.search.messages"
            :hint="$sectionData.search.hint"
            :persistent-placeholder="$sectionData.search.persistentPlaceholder"
            :single-line="false"
            no-qr
            block
            :readonly="$builder.isEditing"
            expand-input
            v-styler:input="$sectionData.search"
          ></s-storefront-search-box>

          <!-- ▙▉▉▉▉▉▉▉▉▉▉▉▚▚▚▚▚▚▚▚ End Search ▚▚▚▚▚▚▚▚▉▉▉▉▉▉▉▉▉▉▉▟ -->
        </v-col>

        <v-col
          v-styler:grid="$sectionData.columns[1].grid"
          :class="[gridClasses[1], $sectionData.columns[1].classes]"
          :style="[
            $sectionData.columns[1].style,
            backgroundStyle($sectionData.columns[1].background),
          ]"
          class="position-relative"
        >
          <!-- 📹 Background video -->
          <video-background
            v-if="$sectionData.columns[1].background?.bg_video"
            :video="getVideoUrl($sectionData.columns[1].background.bg_video)"
          >
          </video-background>

          <p
            v-styler:text="$sectionData.content2"
            v-html="
              $sectionData.content2?.applyAugment(augment, $builder.isEditing)
            "
            class="my-5 fadeIn delay_500"
          />
        </v-col>
      </x-row>
    </x-container>
  </x-section>
</template>

<script>
import * as types from "../../src/types";
import SStorefrontSearchBox from "@components/storefront/search/SStorefrontSearchBox.vue";
import VideoBackground from "@app-page-builder/sections/components/VideoBackground.vue";

export default {
  name: "SectionHeroSearch",
  components: { VideoBackground, SStorefrontSearchBox },
  cover: require("../../assets/images/covers/hero-search.svg"),
  group: "Hero",
  label: "Search Hero",

  help: {
    title:
      "Utilize this section to display a search box on your page. This search box allows customers to conveniently search through products and categories.",
    video: "/app/videos/page-builder/Search.m4v",
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
    content2: types.Text,

    // Search:
    search: {
      solo: false,
      filled: false,
      flat: false,
      outlined: false,
      rounded: false,
      dark: false,
      color: null,
      backgroundColor: null,
      placeholder: null,
      label: null,
      messages: null,
      hint: null,
    },

    // Columns:
    columns: [
      {
        grid: {
          mobile: 12,
          tablet: 10,
          desktop: 8,
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
        "text-center",
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
  computed: {},

  watch: {},

  /**
   *  Important: Compute not work in page builder!
   */

  created() {
    // 🛠️ Fix bad data structures:
    if (!this.$sectionData.search) {
      this.$sectionData.search = {
        solo: false,
        filled: false,
        flat: false,
        dark: false,
        color: null,
      };
    }
  },

  methods: {
    onSearch(event) {
      if (this.$builder.isEditing || !this.getShop()) return;

      this.$router.push({
        name: window.$storefront.routes.SHOP_PAGE,
        params: { shop_name: this.getShop().name },
        query: { search: event.search, search_type: event.search_type },
      });
    },
  },
};
</script>
<style lang="scss" scoped></style>
