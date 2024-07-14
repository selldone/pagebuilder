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
    :body="object.data.body"
    :edit="is_editing"
    :enable-title="false"
    :only-view="!is_editing"
    :suffix-id="rand_id"
    :upload-url="get_upload_url()"
    class="article mx-auto"
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
  }),

  computed: {
    is_editing() {
      return this.$builder.isEditing;
    },
  },
  watch: {
    object() {
      // ━━━━━━━━━━━━━━━━━ ⚡ Linked Object Life Cycle ━━━━━━━━━━━━━━━━━
      this.object.callBeforeSave = () => {
        this.object.data.body = this.$refs.article.purifyBody();
      };
    },
  },

  mounted() {
    if (this.$refs.article) {
      this.$refs.article.processAfterChangeBody(); //Assign full screen click...
    }

    // ━━━━━━━━━━━━━━━━━ ⚡ Linked Object Life Cycle ━━━━━━━━━━━━━━━━━
    this.object.callBeforeSave = () => {
      this.object.data.body = this.$refs.article.purifyBody();
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
