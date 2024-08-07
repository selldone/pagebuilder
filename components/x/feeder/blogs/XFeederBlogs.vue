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
    cols="12"
    v-if="is_editing && !$builder.isHideExtra"
    v-styler:blogs="{
      target: object,
    }"
    class="temporary rounded-lg usn text-subtitle-2 pa-2 overflow-hidden"
    style="background: #fff"
  >
    <v-sheet rounded="lg" class="pa-2" color="#fafafa" elevation="3">
      <v-icon class="me-2">schema</v-icon>
      <span class="me-1">Blogs Feeder</span>

      <v-expand-x-transition group>
        <v-progress-circular
          v-if="busy"
          key="l"
          indeterminate
        ></v-progress-circular>

        <v-chip
          v-if="articles?.length"
          key="p"
          class="ma-1"
          size="small"
          prepend-icon="feed"
          ><b>{{ articles.length }}</b
          >x articles
        </v-chip>
      </v-expand-x-transition>
    </v-sheet>
  </v-col>

  <template v-if="busy">
    <v-col v-for="i in 4" :key="i" cols="6" sm="3">
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
  >
    <s-blog-card
      :article="article"
      :color="card?.color"
      :dark="card?.dark"
      :flat="card?.flat"
      :rounded="card?.rounded"
      :style="{ pointerEvents: $builder.isEditing ? 'none' : 'unset' }"
      :view-only="$builder.isEditing"
    ></s-blog-card>
  </v-col>
</template>

<script lang="ts">
import StylerDirective from "../../../../styler/StylerDirective.ts";
import LMixinXComponent from "../../../../mixins/x-component/LMixinXComponent.ts";
import {Article, CONSOLE} from "@selldone/core-js";
import SBlogCard from "@selldone/components-vue/storefront/blog/card/SBlogCard.vue";
import { XFeederBlogsObject } from "@selldone/page-builder/components/x/feeder/blogs/XFeederBlogsObject.ts";

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
    filter(filter) {
      if (filter instanceof Object) {
        CONSOLE.log("✻ Change blog filter.");

        this.fetchBlogs();
      }
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
          this.showLaravelError(error);
        })

        .finally(() => {
          this.busy = false;
        });
    },
  },
};
</script>

<style scoped></style>
