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
<!-- IMPORTANT: Element must have -trackable class! -->

<template>
  <s-article-editor
    ref="article"
    v-model:body="object.data.body"
    :edit="editable"
    :enable-title="false"
    :only-view="!editable"
    :suffix-id="rand_id"
    :upload-url="get_upload_url()"
    class="article mx-auto"
    :class="[object.classes, { 'is-editable': $builder.isEditing }]"
    :style="[object.style, background_style]"
  />
</template>

<script>
import LMixinXComponent from "@selldone/page-builder/mixins/x-component/LMixinXComponent";
import { XArticleObject } from "@selldone/page-builder/components/x/article/XArticleObject.ts";
import { Article } from "@selldone/core-js";
import SArticleEditor from "@selldone/components-vue/article/SArticleEditor.vue";

export default {
  name: "XArticle",
  mixins: [LMixinXComponent],
  components: { SArticleEditor },

  props: {
    object: {
      type: XArticleObject,
      required: true,
    },
  },
  data: () => ({
    rand_id: Math.random().toString(36).substring(7),
    editable: false, // Safe | Before change the article mode, we need to save it in the data
  }),

  computed: {
    is_editing() {
      return this.$builder.isEditing;
    },
  },

  watch: {
    is_editing(value) {
      if (!value) {
        // Just in Edit -> View mode
      //  console.log("XArticle | Change edit mode | Edit -> View");
      //  this.object.data.setBody(this.$refs.article.purifyBody());
      }

      this.editable=value
    },
  },

  created() {
    this.editable = this.$builder.isEditing;
  },

  mounted() {

    if (this.$refs.article) {
      this.$refs.article.processAfterChangeBody(); //Assign full screen click...
    }

    // ━━━━━━━━━━━━━━━━━ ⚡ Linked Object Life Cycle ━━━━━━━━━━━━━━━━━
    this.object.callBeforeSave = () => {
     // console.log("XArticle | callBeforeSave");
      //this.object.data.setBody(this.$refs.article.purifyBody());
    };
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
        Article.Types.SelldoneBlog.code,
        null,
      );
    },
  },
};
</script>

<style lang="scss">
.x--article {
}
</style>
