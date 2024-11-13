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

<template>
  <v-col
    v-if="is_editing && !$builder.isHideExtra && !articles?.length"
    cols="12"
    sm="4"
    md="3"
    lg="2"
    v-styler:blogs="{
      target: object,
    }"
    class="temporary usn d-flex align-center"
  >
    <v-card
      rounded="lg"
      class="pa-2 d-flex flex-column justify-center align-center"
      color="#fafafa"
      elevation="3"
      height="90%"
      width="100%"
    >
      <v-icon class="mb-3">schema</v-icon>
      <span class="me-1">Blogs Feeder</span>

      <v-expand-x-transition group>
        <v-chip
          v-if="articles?.length"
          key="p"
          class="ma-1"
          size="small"
          prepend-icon="feed"
          ><b>{{ articles.length }}</b
          >x articles
        </v-chip>

        <v-progress-circular
          v-if="busy"
          key="l"
          indeterminate
        ></v-progress-circular>
      </v-expand-x-transition>
    </v-card>
  </v-col>

  <template v-if="busy && !articles.length">
    <v-col v-for="i in 3" :key="i" cols="6" sm="3">
      <v-skeleton-loader
        :type="['table-heading', 'list-item-two-line', 'image']"
      ></v-skeleton-loader>
    </v-col>
  </template>

  <v-col
    v-for="(article, i) in articles"
    :key="article.id"
    :cols="object.data.grid.mobile"
    :lg="object.data.grid.widescreen"
    :md="object.data.grid.desktop"
    :sm="object.data.grid.tablet"
    class="fadeInUp v-col"
    :class="[object.classes]"
    :style="[
      object.style,
      background_style,
      { 'animation-delay': 300 + i * 100 + 'ms' },
    ]"
    v-styler:blogs="{
      target: object,
    }"
  >
    <s-blog-card
      :article="article"
      :color="card?.color"
      :dark="card?.dark"
      :flat="card?.flat"
      :elevation="card?.elevation"
      :rounded="card?.rounded"
      :style="{ pointerEvents: $builder.isEditing ? 'none' : 'unset' }"
      :view-only="$builder.isEditing"
    ></s-blog-card>
  </v-col>
</template>

<script lang="ts">
import StylerDirective from "../../../../styler/StylerDirective.ts";
import LMixinXComponent from "../../../../mixins/x-component/LMixinXComponent.ts";
import { Article, CONSOLE } from "@selldone/core-js";
import SBlogCard from "@selldone/components-vue/storefront/blog/card/SBlogCard.vue";
import { XFeederBlogsObject } from "@selldone/page-builder/components/x/feeder/blogs/XFeederBlogsObject.ts";
import { debounce } from "lodash-es";

export default {
  name: "XFeederBlogs",
  components: { SBlogCard },
  directives: { styler: StylerDirective },
  mixins: [LMixinXComponent],
  emits: ["update"],
  props: {
    object: { required: true, type: XFeederBlogsObject },
  },

  data: () => ({
    busy: false,

    articles: [] as Article[],
    totalItems: 0 as number,
  }),

  computed: {
    is_editing() {
      return this.$builder.isEditing;
    },

    shop() {
      return this.getShop();
    },

    filter() {
      return this.object.data.filter;
    },

    card() {
      return this.object.data.card;
    },
  },
  watch: {
    filter: {
      handler: debounce(function (filter) {
        if (filter instanceof Object) {
          console.log("✻ Change blog filter.");
          this.fetchBlogs();
        }
      }, 1500), // 3-second debounce
      deep: true,
    },
  },

  created() {
    this.fetchBlogs();
  },

  methods: {
    fetchBlogs() {
      const filter = this.filter;
      CONSOLE.log("Blogs filter", filter);
      if (!filter) return;

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
        .get(window.XAPI.GET_SHOP_BLOGS(this.shop.name), {
          params: params,
        })
        .then(({ data }) => {
          if (!data.error) {
            this.articles = data.articles;

            this.totalItems = data.total;
          }
        })
        .catch((error) => {
          NotificationService.showLaravelError(error);
        })

        .finally(() => {
          this.busy = false;
        });
    },
  },
};
</script>

<style scoped></style>
