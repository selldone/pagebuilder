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
    :object="$sectionData"
    path="$sectionData"
    v-styler:blogs="$sectionData.blogs_filter"
  >
    <!-- 📹 Background video -->
    <video-background
      v-if="$sectionData.background?.bg_video"
      :video="getVideoUrl($sectionData.background.bg_video)"
    >
    </video-background>

    <h2
      v-styler:text="{ target: $sectionData, keyText: 'title' }"
      class="my-5 fadeIn"
      v-html="$sectionData.title"
    />
    <p
      v-styler:text="{ target: $sectionData, keyText: 'text' }"
      class="my-5 fadeIn delay_300"
      v-html="$sectionData.text"
    />

    <v-progress-circular
      rotate=""
      color="#999"
      v-if="busy"
      indeterminate
    ></v-progress-circular>

    <v-container :fluid="$sectionData.row ? $sectionData.row.fluid : false">
      <v-row
        :align="$sectionData.row ? $sectionData.row.align : 'stretch'"
        :justify="$sectionData.row ? $sectionData.row.justify : 'space-around'"
        v-styler:row="{
          target: $sectionData,
          hasArrangement: true,
          hasFluid: true,
        }"
        class="min-h-100"
        v-styler:grid="{target:$sectionData}"
      >
        <v-col
          v-for="(article, i) in articles"
          :key="article.id"
          :style="{ 'animation-delay': 300 + i * 100 + 'ms' }"
          class="fadeInUp v-col"
          :cols="$sectionData.grid.mobile"
          :sm="$sectionData.grid.tablet"
          :md="$sectionData.grid.desktop"
          :lg="$sectionData.grid.widescreen"
        >
          <s-shop-blog-card
            :article="article"
            :style="{ pointerEvents: $builder.isEditing ? 'none' : 'unset' }"
            :flat="card_style?.flat"
            :dark="card_style?.dark"
            :rect="card_style?.rect"
            :color="card_style?.color"
            :view-only="$builder.isEditing"
          ></s-shop-blog-card>
        </v-col>
      </v-row>
    </v-container>
  </x-section>
</template>

<script>
import * as types from "../../../src/types";

import SShopBlogCard from "@components/storefront/blog/SShopBlogCard.vue";
import VideoBackground from "@app-page-builder/sections/components/VideoBackground.vue";
import StylerDirective from "@app-page-builder/styler/StylerDirective";
import SectionMixin from "@app-page-builder/mixins/SectionMixin";

export default {
  name: "LSectionBlogList",
  directives: { styler: StylerDirective },
  mixins: [SectionMixin],

  components: { VideoBackground, SShopBlogCard },
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

      axios
        .get(window.XAPI.GET_SHOP_BLOGS(this.getCurrentShopName()), {
          params: {
            tags: filter.tags,

            offset: filter.offset,
            limit: filter.limit,
            sortBy: filter.sortBy,
            sortDesc: filter.sortDesc,
            search: this.isString(filter.search) ? filter.search : null, // Solve return function!
          },
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
