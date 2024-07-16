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

    <div>
      <!-- ▃▃▃▃▃▃▃▃▃▃ Export ▃▃▃▃▃▃▃▃▃▃ -->

      <v-btn      variant="text" size="small" stacked @click="exportFile()">
        <v-icon size="small">fa:fas fa-file-export</v-icon>

        <div class="small mt-1 tnt">Export</div>

        <v-tooltip
            activator="parent"
            content-class="text-start small pa-3 bg-black"
            location="bottom"
            max-width="420"
            :open-delay="500"
        >
          <b class="d-block"> Export Landing Page </b>
          <v-icon size="small">save</v-icon>
          <b class="mx-1">Save: </b> You have the option to export this page as a
          .landing file, which can be imported into other shops or repurposed for
          creating additional pages.
        </v-tooltip>
      </v-btn>

    </div>
    <v-btn
      v-if="hasEmbedCode"
      :class="{ disabled: !page }"
      class="d-flex align-center rounded py-1 px-2 text-start pp usn mt-3 mx-3 tnt hover-scale-tiny"
      color="#000"
      style="min-height: 54px"
      @click="showEmbedCode()"
      variant="elevated"
      theme="dark"
      ripple
    >
      <v-icon size="24">code</v-icon>
      <div class="ms-2">
        <b class="d-block"> {{ $t("page_builder.menu.embed") }}</b>
        <span class="small d-block mt-1">Copy & past this page anywhere.</span>
      </div>
    </v-btn>
  </div>

  <!-- ███████████████████ Dialog > Embed code ███████████████████ -->
  <v-dialog
    v-model="show_embed"
    fullscreen
    scrollable
    transition="dialog-bottom-transition"
  >
    <v-card :loading="busy_fetch" class="text-start tools-card" theme="dark">
      <v-card-title class="text-capitalize">
        <v-icon class="me-1">auto_fix_normal</v-icon>

        Your page embed code
      </v-card-title>

      <v-card-text dir="ltr">
        <v-container>
          <div class="mb-3">
            <div class="d-flex align-start">
              <v-icon class="me-1 flex-grow-0" size="64">sd</v-icon>

              <div class="flex-grow-1">
                <h1 class="mb-2">Page Hyper</h1>
                <p class="m-0">
                  Welcome to the next generation of <s>page builders</s>
                  <v-chip size="small" class="mx-1">web app builders</v-chip>
                  . Build your page 100% SEO friendly, and no iframe embed
                  solution by SD and embed it just by some lines of codes!
                </p>
              </div>
            </div>
          </div>

          <template v-if="embed">
            <v-list-subheader>
              <span>
                Copy & Past this code any where in your <b>head</b> &
                <b>body</b> tag.
              </span>
            </v-list-subheader>

            <s-widget-header icon="code" title="Head"></s-widget-header>

            <pre
              class="code-con"
              @click="copyToClipboard(embed.head, 'Copy body code')"
              v-text="embed.head"
            ></pre>

            <s-widget-header icon="code" title="Body"></s-widget-header>

            <pre
              class="code-con"
              @click="copyToClipboard(embed.body, 'Copy head code')"
              v-text="embed.body"
            ></pre>
          </template>
        </v-container>
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
            color="primary"
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
  </v-dialog>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import {SetupService} from "@selldone/core-js/server";

export default defineComponent({
  name: "LMenuTopExport",

  props: {
    page: Object,
  },

  data: () => ({
    show_embed: false,
    busy_fetch: false,
    embed: null,
  }),

  computed: {
    hasEmbedCode() {
      return this.page?.id;
    },
  },

  methods: {
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
        .get(window.API.GET_PAGE_EMBED_CODE(this.shop.id, this.page.id))
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

<style scoped lang="scss"></style>
