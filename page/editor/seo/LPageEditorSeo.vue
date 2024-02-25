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

<template>
  <div class="py-5">
    <!-- ============== SEO ============== -->

    <div class="widget-box mb-5">
      <s-widget-header
        :title="$t('global.commons.seo')"
        icon="radar"
      ></s-widget-header>

      <v-list-subheader
        >You can set the page title and the description meta tag of this page.
      </v-list-subheader>

      <v-text-field
        v-model="page.title"
        :counter="48"
        :label="$t('page_builder.setting.title_input')"
        variant="underlined"
      >
        <template v-slot:append-inner>
          <score-indicator
            :value="$SEO.GetPageTitleScore(page.description)"
            class="mt-n1"
          ></score-indicator>
        </template>
      </v-text-field>

      <v-textarea
        v-model="page.description"
        :counter="256"
        :label="$t('page_builder.setting.description_input')"
        auto-grow
        rows="3"
        variant="underlined"
      >
        <template v-slot:append-inner>
          <score-indicator
            :value="$SEO.GetPageDescription(page.description)"
            class="mt-n1"
          ></score-indicator>
        </template>
      </v-textarea>

      <div class="my-3 font-weight-bold">
        <v-icon class="me-2" color="success">check_circle</v-icon>
        {{ $t("page_builder.seo.message") }}
      </div>
    </div>

    <!-- ============== SEO ============== -->

    <div class="widget-box mb-5" style="--background: #fff">
      <s-widget-header
        icon="fa:fa-brands fa-google"
        title="SEO Preview"
      ></s-widget-header>

      <v-list-subheader></v-list-subheader>

      <google-search-preview
        :description="page.description"
        :title="page.title"
        :url="`.../pages/${page.name}`"
      />
    </div>
  </div>
</template>

<script>
import GoogleSearchPreview from "@app-backoffice/components/seo/GoogleSearchPreview.vue";
import ScoreIndicator from "@components/ui/progress/score-indicator/ScoreIndicator.vue";

export default {
  name: "LPageEditorSeo",
  components: { ScoreIndicator, GoogleSearchPreview },
  props: {
    page: {},
  },

  data: () => ({}),

  computed: {
    seo() {
      return this.page.seo;
    },
  },

  watch: {},
  created() {
    if (!this.page.seo || !Array.isArray(this.page.seo)) this.page.seo = {};
  },

  methods: {},
};
</script>

<style scoped></style>
