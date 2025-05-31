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
  <div
    class="x--embed-page"
    :class="[object.classes, { 'is-editable': $builder.isEditing }]"
    :style="[
      object.style,
      background_style,
      is_editing ? 'min-height: 100px' : '',
    ]"
    v-styler:embed-page="{
      target: object,
    }"
  >
      <!-- Only show when editing -->
      <v-card
        v-if="is_editing && !page"
        class="ma-4 text-start"
        style="border:dashed 2px #ccc;"
        rounded="lg"
        variant="flat"

      >
        <!-- Card Header -->
        <v-card-title class="headline font-weight-light">
          Select Page
        </v-card-title>

        <v-divider></v-divider>

        <!-- User Guidance Text -->
        <v-card-subtitle class="text-body-2 text--secondary text-wrap">
          Choose any existing landing‐page to embed here.
          Its header, footer, and styles will automatically be inherited.
          When that page is updated, this section will update everywhere.
          Use the search field below to find or paste the ID of a landing‐page.
          You can clear your choice at any time and pick another page.
        </v-card-subtitle>

        <!-- Card Body -->
        <v-card-text>
          <!-- Page‐picker component (your existing BPageInput) -->
          <BPageInput
            v-model="object.data.page_id"
            :returnObject="false"
            clearable
            class="mt-3"
            variant="outlined"
            placeholder="e.g., ‘Homepage’ or paste an ID"
          />


          <!-- Validation / Error -->
          <v-alert
            v-if="error"
            type="error"
            dense
            outlined
            class="mt-4"
          >
            <v-icon left small>warning</v-icon>
            {{ error }}
          </v-alert>
        </v-card-text>

      </v-card>


    <LPageViewer
      v-if="page?.content"
      :key="'page_' + page?.id"
      :augment="augment"
      :initialPageData="page?.content"
      :initialPageCss="page?.css"
      :style="page?.background"
    />

    <u-loading-progress v-if="busy"></u-loading-progress>


  </div>
</template>

<script lang="ts">
import LMixinXComponent from "@selldone/page-builder/mixins/x-component/LMixinXComponent";
import StylerDirective from "@selldone/page-builder/styler/StylerDirective.ts";
import DynamicScriptDirective from "@selldone/components-vue/directives/script/DynamicScriptDirective.ts";
import { XEmbedPageObject } from "@selldone/page-builder/components/x/embed/page/XEmbedPageObject.ts";
import XComponent from "@selldone/page-builder/components/x/component/XComponent.vue";
import { defineAsyncComponent } from "vue";
import NotificationService from "@selldone/components-vue/plugins/notification/NotificationService.ts";

export default {
  name: "XEmbedPage",
  directives: {
    styler: StylerDirective,
    "dynamic-scripts": DynamicScriptDirective,
  },
  inject: ["$shop"],

  mixins: [LMixinXComponent],
  components: {
    LPageViewer: defineAsyncComponent(
      () =>
        import("@selldone/page-builder/page/viewer/LPageViewer.vue"),
    ),
    XComponent,
    BPageInput: defineAsyncComponent(
      () =>
        import("@selldone/components-vue/backoffice/page/input/BPageInput.vue"),
    ),
  },

  props: {
    object: {
      type: XEmbedPageObject,
      required: true,
    },
    augment: {
      // Extra information to show to dynamic show in page content
    },
  },
  data: () => ({
    busy: false,
    error: null,
  }),

  computed: {
    is_editing() {
      return this.$builder.isEditing;
    },

    mode() {
      return this.object.data.mode;
    },

    page() {
      return this.object.data.page;
    },
  },
  watch: {
    "object.data.page_id"() {
      this.fetchPage();
    },
  },

  created() {
    this.fetchPage();
  },

  mounted() {},

  methods: {
    fetchPage() {
      /**
       * Fetch page data from the server based on the page_id.
       * In view mode it will not re-fetch the page data.
       */
      if(!this.is_editing)return;

      if (!this.object.data.page_id) {
        this.page = null;

        return;
      }
      const url = this.$shop
        ? window.XAPI.GET_PAGE_DATA(this.$shop.name)
        : window.GAPI.GET_PAGE_DATA();

      this.busy = true;
      axios
        .get(url, {
          params: {
            page_id: this.object.data.page_id,
          },
        })
        .then(({ data }) => {
          if (data.error) {
            this.error = data.error_msg;
          } else {
            this.object.data.page = data.page;
          }
        })
        .catch((error) => {
          console.error(error);
          NotificationService.showLaravelError(error);
        })

        .finally(() => {
          this.busy = false;
        });
    },
  },
};
</script>

<style lang="scss">
.x--embed-page {


}
</style>
