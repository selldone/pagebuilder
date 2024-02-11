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
    <!-- 📹 Background video -->
    <video-background
      v-if="$sectionData.background?.bg_video"
      :video="getVideoUrl($sectionData.background.bg_video)"
    >
    </video-background>

    <v-container
      :fluid="$sectionData.container ? $sectionData.container.fluid : false"
      v-styler:container="$sectionData.container"
      :class="[$sectionData.container?.classes]"
      :style="[
        $sectionData.container?.style,
        backgroundStyle($sectionData.container?.background),
      ]"
    >
      <s-article-editor
        :only-view="!$builder.isEditing"
        :edit="$builder.isEditing"
        ref="editorContainer"
        class="article mx-auto"
        :body="$sectionData.body"
        :upload-url="get_upload_url()"
        :enable-title="false"
        :suffix-id="rand_id"
      />
    </v-container>
  </x-section>
</template>

<script>
import * as types from "../../src/types";
import { ArticleTypes } from "@core/enums/article/ArticleTypes";
import SArticleEditor from "@components/article/SArticleEditor.vue";
import VideoBackground from "@app-page-builder/sections/components/VideoBackground.vue";

let KEEPER = {}; // Keep component instance for each id
export default {
  name: "SectionArticle",
  components: { VideoBackground, SArticleEditor },
  cover: require("../../assets/images/covers/article.svg"),

  group: "Text",
  label: "Article",
  help: {
    title:
      "Use this section to show an article with features like what you have in your blog and product description with inline editor. Please just use one of this section each page.",
  },
  $schema: {
    classes: types.ClassList,
    background: types.Background,
    style: types.Style,

    container: types.Container,

    body: types.Html,

    onPreSave: (section) => {
      if (!section) return; // Trigger when adding the section! and section is null!
      const that = KEEPER && KEEPER[section.id];
      // console.log('SectionArticle > onPreSave',section,that)

      if (!that || !that.$refs.editorContainer) return; // Not render yet!
      that.$sectionData.body = that.$refs.editorContainer.purifyBody();
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
    rand_id: Math.random().toString(36).substring(7),
    //  articleType:ArticleTypes.Blog.code,
    // body:null,
  }),

  computed: {},
  watch: {},
  created() {
    KEEPER[this.id] = this;
  },
  beforeUnmount() {
    delete KEEPER[this.id];
  },
  mounted() {
    if (this.$refs.editorContainer) {
      this.$refs.editorContainer.processAfterChangeBody(); //Assign full screen click...
    }
  },

  methods: {
    get_upload_url() {
      if (!this.$builder.isEditing) return null;

      // For shop pages:
      if (this.$route.params.shop_id) {
        return window.API.UPLOAD_ARTICLE_BLOG_IMAGE(this.$route.params.shop_id);
      }

      // For official page:
      return window.API.UPLOAD_ARTICLE_IMAGE(
        ArticleTypes.SelldoneBlog.code,
        null,
      );
    },
  },
};
</script>

<style lang="scss" scoped></style>
