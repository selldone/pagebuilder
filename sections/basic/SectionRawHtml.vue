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

    <div
      v-if="$builder.isEditing && !$builder.isHideExtra"
      class="text-center widget-buttons"
    >
      <v-btn @click="dialog = !dialog" dark color="#225082" size="x-large">
        <v-icon class="me-1">code</v-icon>
        <span class="mx-1">Add Custom Code Here</span>

        <v-avatar
          v-for="item in scripts_list"
          :key="item.url"
          class="ma-1"
          size="24"
          rounded
        >
          <v-img
            :src="item.provider_icon ? item.provider_icon : item.icon_url"
          ></v-img>
        </v-avatar>
      </v-btn>
    </div>

    <div
      v-if="!dialog /*Force refresh on edits!*/"
      v-html="$sectionData.html"
      :style="{ pen: $builder.isEditing }"
      v-dynamic-scripts="true"
    ></div>

    <!-- █████████████████████ Edit Dialog █████████████████████ -->
    <v-dialog
      v-if="$builder.isEditing"
      v-model="dialog"
      fullscreen
      transition="dialog-bottom-transition"
      scrollable
    >
      <v-card>
        <v-card-title>
          <v-icon class="me-1" color="#111">integration_instructions </v-icon>
          Html Code Editor
        </v-card-title>
        <v-card-text>
          <div class="widget-box -large mb-5">
            <s-widget-header
              title="Your Custom Code"
              icon="code"
            ></s-widget-header>
            <v-list-subheader
              >Here, you can either write raw HTML code or paste your code.
              However, please be aware that pasting code containing 'script'
              tags may potentially lead to security issues, particularly within
              your editor. For this reason, we strongly advise only pasting code
              from sources you trust.
            </v-list-subheader>

            <prism-editor
              v-model="$sectionData.html"
              contenteditable="false"
              class="light-code scrollable-element-light"
              style="min-height: 50vh"
              language="html"
              line-numbers
              :highlight="highlighter"
              @blur="refreshScripts"
            >
            </prism-editor>
          </div>

          <div class="widget-box -large mb-5">
            <s-widget-header title="Scripts" icon="code"></s-widget-header>
            <v-list-subheader
              >If your code includes scripts, they will be identified and
              displayed here for your review. These scripts will be
              automatically inserted into your site's header and will load
              automatically on your custom page.
            </v-list-subheader>

            <s-progress-loading v-if="busy_scripts"></s-progress-loading>
            <v-list class="border-between-vertical bg-transparent">
              <v-list-item v-for="item in scripts_list" :key="item.url">
                <template v-slot:prepend>
                  <v-avatar rounded>
                    <v-img
                      :src="
                        item.provider_icon ? item.provider_icon : item.icon_url
                      "
                    ></v-img>
                  </v-avatar>
                </template>

                <v-list-item-title>
                  <b class="me-1">{{ item.provider_name }} | </b>
                  {{ item.title }}
                </v-list-item-title>
                <v-list-item-subtitle>
                  {{ item.description }}
                </v-list-item-subtitle>
              </v-list-item>
            </v-list>
          </div>
        </v-card-text>
        <v-card-actions>
          <div class="widget-buttons">
            <v-btn size="x-large" @click="dialog = false" variant="text">
              <v-icon class="me-1">close</v-icon>
              {{ $t("global.actions.close") }}
            </v-btn>
          </div>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </x-section>
</template>

<script>
import * as types from "../../src/types";
import VideoBackground from "@app-page-builder/sections/components/VideoBackground.vue";

export default {
  name: "SectionRawHtml",
  components: { VideoBackground },
  cover: require("../../assets/images/covers/html.svg"),

  group: "Basic",
  label: "Raw Html",
  help: {
    title:
      "This section allows you to insert raw HTML code and iframes, such as embedding YouTube videos.",
    video: "/app/videos/page-builder/RawHtml.m4v",
  },
  $schema: {
    classes: types.ClassList,
    row: types.Row,

    background: types.Background,
    style: types.Style,

    html: types.Html,
  },
  props: {
    id: {
      type: Number,
      required: true,
    },
  },

  data: () => ({
    dialog: false,

    busy_scripts: false,
    scripts_list: [],
  }),
  computed: {},
  watch: {
    dialog(dialog) {
      if (dialog) this.refreshScripts();
    },
  },

  created() {},

  mounted() {},

  methods: {
    highlighter(code) {
      return Prism.highlight(code, Prism.languages.html, "html");
    },

    refreshScripts() {
      this.busy_scripts = true;
      this.extractInfoFromScripts(this.$sectionData.html)
        .then((results) => {
          this.scripts_list = results;
        })
        .finally(() => {
          this.busy_scripts = false;
        });
    },

    async extractInfoFromScripts(html) {
      // Create a temporary element to parse the HTML
      let tempDiv = document.createElement("div");
      tempDiv.innerHTML = html;

      // Extract script sources
      let scripts = $(tempDiv)
        .find("script")
        .map((_, script) => $(script).attr("src"))
        .get()
        .filter((src) => src); // Filter out scripts with no src

      // Get unique domains
      let domains = [...new Set(scripts.map((src) => new URL(src).origin))];

      if (!window.__CACHED_URL_PREVIEW) window.__CACHED_URL_PREVIEW = {};

      // Use Axios to fetch the data
      let results = await Promise.all(
        domains.map(async (domain) => {
          // Keep cached preview locally:
          if (window.__CACHED_URL_PREVIEW[domain])
            return window.__CACHED_URL_PREVIEW[domain];

          try {
            let response = await axios.get(window.API.GET_LINK_PREVIEW(), {
              params: { url: domain },
            });
            if (response.status === 200) {
              let {
                title,
                description,
                provider_name,
                provider_url,
                provider_icon,
                icon_url,
              } = response.data;

              window.__CACHED_URL_PREVIEW[domain] = {
                title,
                description,
                provider_name,
                provider_url,
                provider_icon,
                icon_url,
              };
              return window.__CACHED_URL_PREVIEW[domain];

              // Process the data as needed
            } else {
              console.error(
                `Request failed with status code ${response.status}`,
              );
            }
          } catch (err) {
            console.error(`Failed to fetch data from ${domain}:`, err);
            return null;
          }
        }),
      );

      // Filter out any failed requests
      return results.filter((result) => result);
    },
  },
};
</script>

<style lang="scss" scoped></style>
