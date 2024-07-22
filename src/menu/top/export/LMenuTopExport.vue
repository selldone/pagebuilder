<!--
  - Copyright (c) 2024. Selldone® Business OS™
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
  <div v-bind="$attrs" class="l--menu-top-tools">
    <!-- ▃▃▃▃▃▃▃▃▃▃ Export ▃▃▃▃▃▃▃▃▃▃ -->

    <lmt-large-button
      @click="exportFile()"
      icon="file_download"
      caption="Export"
      sub-caption=".landing"
    >
      <template v-slot:tooltip>
        <b class="d-block">
          <v-icon>save</v-icon>
          Export Landing Page
        </b>

        <b class="me-1">Save: </b> You have the option to export this page as a
        .landing file, which can be imported into other shops or repurposed for
        creating additional pages.
      </template>
    </lmt-large-button>

    <v-divider vertical></v-divider>

    <template v-if="is_page">
      <lmt-large-button
        @click="showEmbedCode()"
        icon="code"
        :caption="$t('page_builder.menu.embed')"
        sub-caption="Html Code"
        :disabled="!page"
      >
        <template v-slot:tooltip>
          <b class="d-block">
            <v-icon>html css javascript</v-icon>
            Generated Html Code</b
          >
          You can copy and paste this simple generated code into any HTML page
          to load the latest version of the page.
        </template>
      </lmt-large-button>

      <v-divider vertical></v-divider>

      <!-- ███████████████████ Dialog > Embed code ███████████████████ -->
      <v-bottom-sheet
        v-model="show_embed"
        scrollable
        :max-width="1480"
        content-class="rounded-t-xl"
        width="98vw"
        min-height="40vh"
      >
        <v-card
          :loading="busy_fetch"
          class="text-start tools-card"
          theme="dark"
          rounded="t-xl"
        >
          <v-card-title>
            <div class="d-flex align-start">
              <v-icon class="me-1 flex-grow-0" size="64">sd</v-icon>

              <div class="flex-grow-1">
                <b class="d-block">Page Hyper</b>
                <div class="text-subtitle-2 text-wrap">
                  Welcome to the next generation of <s>page builders</s>
                  <v-chip size="small" class="mx-1">web app builders</v-chip>
                  . Build your page 100% SEO friendly, and no iframe embed
                  solution by SD and embed it just by some lines of codes!
                </div>
              </div>
            </div>
          </v-card-title>

          <v-card-text dir="ltr">
            <template v-if="embed">
              <v-list-subheader>
                <span>
                  Copy & Past this code any where in your <b>head</b> &
                  <b>body</b> tag.
                </span>
              </v-list-subheader>

              <s-widget-header icon="code" title="Head"></s-widget-header>

              <div
                @click="copyToClipboard(embed.head, 'Copy body code')"
                class="max-width-container-820px mx-auto"
              >
                <prism-editor
                  readonly
                  class="code-con"
                  :model-value="embed.head"
                  :highlight="highlighter"
                  language="html"
                ></prism-editor>
              </div>

              <s-widget-header icon="code" title="Body"></s-widget-header>

              <div
                @click="copyToClipboard(embed.body, 'Copy head code')"
                class="max-width-container-820px mx-auto"
              >
                <prism-editor
                  class="code-con"
                  :model-value="embed.body"
                  :highlight="highlighter"
                  language="html"
                ></prism-editor>
              </div>
            </template>
          </v-card-text>

          <v-card-actions>
            <div class="widget-buttons">
              <v-btn size="x-large" variant="text" @click="show_embed = false">
                <v-icon start>close</v-icon>
                {{ $t("global.actions.close") }}
              </v-btn>

              <v-btn
                :disabled="!embed"
                size="x-large"
                variant="text"
                @click="copyToClipboard(embed.html, 'Copy full page code')"
              >
                <v-icon start>content_copy</v-icon>
                {{ $t("global.actions.copy") }}
              </v-btn>
              <v-btn
                color="#1976D2"
                size="x-large"
                variant="elevated"
                @click="downloadText(page.title + '.html', embed.html)"
              >
                <v-icon start>get_app</v-icon>
                Download html
              </v-btn>
            </div>
          </v-card-actions>
        </v-card>
      </v-bottom-sheet>
    </template>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { SetupService } from "@selldone/core-js/server";
import LmtLargeButton from "@selldone/page-builder/src/menu/top/components/LmtLargeButton.vue";
import "prismjs/themes/prism-dark.css";
import { PrismEditor } from "vue-prism-editor";

export default defineComponent({
  name: "LMenuTopExport",
  components: { PrismEditor, LmtLargeButton },

  inject: ["$builder"],
  props: {
    page: Object,
  },

  data: () => ({
    show_embed: false,
    busy_fetch: false,
    embed: null,
  }),

  computed: {
    is_page() {
      return this.$builder.isPage();
    },
    is_popup() {
      return this.$builder.isPopup();
    },
    is_menu() {
      return this.$builder.isMenu();
    },
  },

  methods: {
    highlighter(code) {
      return Prism.highlight(code, Prism.languages.html);
    },

    exportFile() {
      const out = {
        content: {
          sections: this.page.content.sections,
          style: this.page.content.style,
        },
        title: this.page.title,
        description: this.page.description,
        image: this.page.image,
        direction: this.page.direction,
        note: this.page.note,
        service: SetupService.MainServiceUrl(),
      };
      this.downloadText(
        this.page.title + ".landing",
        JSON.stringify(out, null, 4),
      );
    },

    showEmbedCode() {
      if (!this.page || !this.page.id) return;
      this.embed = null;
      this.show_embed = true;
      this.busy_fetch = true;
      axios
        .get(window.API.GET_PAGE_EMBED_CODE(this.page.shop_id, this.page.id))
        .then(({ data }) => {
          this.embed = data.embed;
        })
        .catch((error) => {
          this.showLaravelError(error);
        })
        .finally(() => {
          this.busy_fetch = false;
        });
    },
  },
});
</script>

<style scoped lang="scss">
.code-con {
  background-color: #222;
  padding: 8px;
  margin: 16px 0 26px;
  display: block;
  border-radius: 12px;
  font-size: 12px;

  &:hover {
    background-image: linear-gradient(-20deg, #2b5876 0%, #4e4376 100%);
  }
}
</style>
