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
  <v-btn
    @click="dialog = true"
    variant="text"
    min-width="46"
    min-height="46"
    rounded="lg"
    class="ma-1"
  >
    <v-icon>track_changes</v-icon>
    <v-tooltip activator="parent">{{ $t("page_builder.menu.seo") }} </v-tooltip>
  </v-btn>

  <v-dialog
    v-model="dialog"
    scrollable
    fullscreen
    transition="dialog-bottom-transition"
  >
    <v-card>
      <v-card-title></v-card-title>
      <v-card-text>
        <!-- ============== SEO ============== -->

        <div class="widget-box mb-5">
          <s-widget-header
            :title="$t('global.commons.seo')"
            icon="radar"
          ></s-widget-header>

          <v-list-subheader
            >You can set the page title and the description meta tag of this
            page.

            <s-widget-help code="Landing.SEO.Customize" inline></s-widget-help>

          </v-list-subheader>

          <v-text-field
            v-model="page.title"
            :counter="48"
            :label="$t('page_builder.setting.title_input')"
            variant="underlined"
          >
            <template v-slot:append-inner>
              <u-progress-score
                :value="$SEO.GetPageTitleScore(page.description)"
              ></u-progress-score>
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
              <u-progress-score
                :value="$SEO.GetPageDescription(page.description)"
              ></u-progress-score>
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

          <b-google-preview
            :description="page.description"
            :title="page.title"
            :url="`.../pages/${page.name}`"
          />
        </div>
      </v-card-text>
      <v-card-actions>
        <div class="widget-buttons">
          <v-btn size="x-large" variant="text" @click="dialog = false">
            <v-icon start>close</v-icon>
            {{ $t("global.actions.close") }}
          </v-btn>
        </div>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import BGooglePreview from "@selldone/components-vue/backoffice/google/preview/BGooglePreview.vue";
import UProgressScore from "@selldone/components-vue/ui/progress/score/UProgressScore.vue";
import SWidgetHelp from "@selldone/components-vue/ui/widget/help/SWidgetHelp.vue";

export default {
  name: "LMenuLeftSeo",
  components: {SWidgetHelp, UProgressScore, BGooglePreview },
  inject: ["$builder"],
  props: {},

  data: () => ({
    dialog: false,
  }),

  computed: {
    page() {
      return this.$builder.model;
    },

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
