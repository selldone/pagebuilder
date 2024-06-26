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
  <x-section
    v-styler:blogs="{ target: $sectionData, keyFilter: 'blogs_filter' }"
    :object="$sectionData"
  >
    <!-- 📹 Background video -->
    <x-video-background
      v-if="$sectionData.background?.bg_video"
      :video="getVideoUrl($sectionData.background.bg_video)"
    >
    </x-video-background>

    <x-text
      v-model:object="$sectionData.title"
      :augment="augment"
      initial-type="h2"
      :initial-classes="['my-5']"
    ></x-text>

    <x-text
      v-model:object="$sectionData.text"
      :augment="augment"
      initial-type="p"
      :initial-classes="['my-5']"
    ></x-text>

    <v-container
      :fluid="$sectionData.row ? $sectionData.row.fluid : false"
      class="blur-animate"
      :class="{ blurred: busy }"
    >
      <v-row
        v-styler:grid="{ target: $sectionData }"
        v-styler:row="{
          target: $sectionData,
          hasArrangement: true,
          hasFluid: true,
        }"
        :align="$sectionData.row ? $sectionData.row.align : 'stretch'"
        :justify="$sectionData.row ? $sectionData.row.justify : 'space-around'"
      >
        <v-col
          v-for="(article, i) in articles"
          :key="article.id"
          :cols="$sectionData.grid.mobile"
          :lg="$sectionData.grid.widescreen"
          :md="$sectionData.grid.desktop"
          :sm="$sectionData.grid.tablet"
          :style="{ 'animation-delay': 300 + i * 100 + 'ms' }"
          class="fadeInUp v-col"
        >
          <s-blog-card
            :article="article"
            :color="card_style?.color"
            :dark="card_style?.dark"
            :flat="card_style?.flat"
            :rounded="card_style?.rounded"
            :style="{ pointerEvents: $builder.isEditing ? 'none' : 'unset' }"
            :view-only="$builder.isEditing"
          ></s-blog-card>
        </v-col>
      </v-row>
    </v-container>
    <v-progress-circular
      v-if="busy"
      color="#999"
      indeterminate
      class="center-absolute"
    ></v-progress-circular>
  </x-section>
</template>

<script>
import * as types from "../../../src/types/types";

import SBlogCard from "@selldone/components-vue/storefront/blog/card/SBlogCard.vue";
import XVideoBackground from "../../../components/x/video-background/XVideoBackground.vue";
import StylerDirective from "../../../styler/StylerDirective";
import LMixinSection from "../../../mixins/section/LMixinSection";
import XText from "@selldone/page-builder/components/x/text/XText.vue";
import XSection from "@selldone/page-builder/components/x/section/XSection.vue";

export default {
  name: "LSectionBlogList",
  directives: { styler: StylerDirective },
  mixins: [LMixinSection],

  components: {XSection, XText, XVideoBackground, SBlogCard },
  cover: require("../../../assets/images/covers/blogs.svg"),

  group: "Blogs",
  label: "Blogs list",
  help: {
    title:
      "Utilize this section to display a collection of blog posts, with the option to apply filters.",
  },
  $schema: {
    classes: types.ClassList,
    row: types.Row,

    background: types.Background,
    style: types.Style,

    title: types.Title,
    text: types.Text,

    blogs_filter: types.Blogs,
    grid: {
      mobile: 12,
      tablet: 6,
      desktop: 4,
      widescreen: 3,
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
    articles: [],
    totalItems: 0,

    busy: false,
    card_style: null,
  }),
  computed: {},
  watch: {
    "$sectionData.blogs_filter"(value) {
      if (value instanceof Object) {
        // console.log("✻ Change blogs filter.", value);
        this.fetchBlogs();
      }
    },
  },

  created() {},

  mounted() {
    this.fetchBlogs();
  },

  methods: {
    fetchBlogs() {
      const filter = this.$sectionData.blogs_filter;
      if (!filter) return;

      this.card_style = filter.style;

      this.busy = true;

      const params = {
        tags: filter.tags,

        offset: filter.offset,
        limit: filter.limit,
        sortBy: filter.sortBy,
        sortDesc: filter.sortDesc,
        search: this.isString(filter.search) ? filter.search : null, // Solve return function!
      };
      axios
        .get(window.XAPI.GET_SHOP_BLOGS(this.getCurrentShopName()), {
          params: params,
        })
        .then(({ data }) => {
          if (!data.error) {
            this.articles = data.articles;

            this.totalItems = data.total;
          }
        })
        .catch((error) => {
          this.showLaravelError(error);
        })

        .finally(() => {
          this.busy = false;
        });
    },
  },
};
</script>

<style lang="scss" scoped></style>
