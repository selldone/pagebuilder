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
  <x-section :object="$sectionData" class="pa-0">
    <!-- 📹 Background video -->
    <x-video-background
      v-if="$sectionData.background?.bg_video"
      :video="getVideoUrl($sectionData.background.bg_video)"
    >
    </x-video-background>

    <div
      v-if="$builder.isEditing && !$builder.isHideExtra"
      class="text-center widget-buttons"
    >
      <v-btn color="#225082" size="x-large" @click="dialog = !dialog">
        <v-icon class="me-1">code</v-icon>
        <span class="mx-1">Add Custom Code Here [{{ mode }}]</span>

        <v-avatar
          v-for="item in scripts_list"
          :key="item.url"
          class="ma-1"
          rounded
          size="24"
        >
          <v-img
            :src="item.provider_icon ? item.provider_icon : item.icon_url"
          ></v-img>
        </v-avatar>
      </v-btn>
    </div>

    <template v-if="!dialog /*Force refresh on edits!*/"></template>
    <div
      v-if="mode === 'html'"
      v-dynamic-scripts="true"
      :style="{ pen: $builder.isEditing }"
      v-html="$sectionData.html"
    ></div>
    <component
      v-else-if="mode === 'vue'"
      :is="generated_componet"
      v-dynamic-scripts="true"
      :style="{ pen: $builder.isEditing }"
    ></component>

    <!-- █████████████████████ Edit Dialog █████████████████████ -->
    <v-dialog
      v-if="$builder.isEditing"
      v-model="dialog"
      fullscreen
      scrollable
      transition="dialog-bottom-transition"
    >
      <v-card class="text-start">
        <v-card-title>
          <v-icon class="me-1" color="#111">integration_instructions</v-icon>
          Html Code Editor
        </v-card-title>
        <v-card-text>
          <div class="widget-box -large mb-5">
            <s-widget-header
              icon="code"
              title="Your Custom Code"
            ></s-widget-header>
            <v-list-subheader
              >Here, you can either write raw HTML code or paste your code.
              However, please be aware that pasting code containing 'script'
              tags may potentially lead to security issues, particularly within
              your editor. For this reason, we strongly advise only pasting code
              from sources you trust.
            </v-list-subheader>

            <!-- ━━━━━━━━━━━━━━━━━━━━ Raw Code Mode ━━━━━━━━━━━━━━━━━━━━ -->

            <v-btn-toggle
              v-model="mode"
              class="my-3 overflow-visible"
              rounded="lg"
              selected-class="blue-flat elevation-10"
              @update:model-value="setMode"
            >
              <v-btn variant="outlined" value="html" class="tnt">
                <v-icon class="me-1">html</v-icon>

                HTML
              </v-btn>
              <v-btn variant="outlined" value="vue" class="tnt">
                <v-avatar :size="24" class="me-1" rounded>
                  <v-img :src="require('./assets/vue.svg')" />
                </v-avatar>
                Vue
              </v-btn>
            </v-btn-toggle>

            <prism-editor
              v-model="$sectionData.html"
              :highlight="highlighter"
              class="light-code scrollable-element-light"
              contenteditable="false"
              language="html"
              line-numbers
              style="min-height: 50vh"
              @blur="refreshScripts"
            >
            </prism-editor>
          </div>

          <div class="widget-box -large mb-5">
            <s-widget-header icon="code" title="Scripts"></s-widget-header>
            <v-list-subheader
              >If your code includes scripts, they will be identified and
              displayed here for your review. These scripts will be
              automatically inserted into your site's header and will load
              automatically on your custom page.
            </v-list-subheader>

            <u-loading-progress v-if="busy_scripts"></u-loading-progress>
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
            <v-btn size="x-large" variant="text" @click="dialog = false">
              <v-icon start>close</v-icon>
              {{ $t("global.actions.close") }}
            </v-btn>
          </div>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </x-section>
</template>

<script>
import * as types from "../../src/types/types";
import XVideoBackground from "../../components/x/video-background/XVideoBackground.vue";
import StylerDirective from "../../styler/StylerDirective";
import LMixinSection from "../../mixins/section/LMixinSection";
import { PrismEditor } from "vue-prism-editor";
import { defineComponent } from "vue/dist/vue.esm-bundler.js";

const MODE_VUE = "vue";
const MODE_HTML = "html";

export default {
  name: "LSectionHtml",
  directives: { styler: StylerDirective },
  mixins: [LMixinSection],

  components: { PrismEditor, XVideoBackground },
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

    generated_componet: null,

    mode: MODE_HTML,
  }),
  computed: {},
  watch: {
    dialog(dialog) {
      if (dialog) this.refreshScripts();
      if (!dialog) {
        this.generated_componet = this.gen(this.$sectionData.html);
      }
    },
  },

  created() {
    this.detectMode();
    if (this.mode === MODE_VUE) {
      this.generated_componet = this.gen(this.$sectionData.html);
    }
  },

  mounted() {},

  methods: {
    detectMode() {
      if (
        this.$sectionData.html.includes("<!----vue---->") ||
        this.$sectionData.html.includes("<template>")
      ) {
        this.mode = MODE_VUE;
      } else {
        this.mode = MODE_HTML;
      }
    },
    setMode() {
      if (this.mode === MODE_HTML) {
        this.$sectionData.html = this.$sectionData.html.replace(
          /<!----vue---->/g,
          "",
        );
      } else {
        this.$sectionData.html = `<!----vue---->${this.$sectionData.html}`;
      }
    },

    gen(html) {
      this.detectMode();
      console.log("🔥 Generating HTML");

      const { html: cleanHTML, scriptContent } = this.parseHTML(html);

      // Assuming scriptContent is something like "{ data: () => ({ foo: 'bar' }), methods: { someMethod() {} } }"

      // Remove the script tags and any non-JavaScript content
      let scriptText = scriptContent.replace(/<script>|<\/script>/g, "").trim();

      // Evaluate the script to extract the configuration
      let config;
      try {
        const evalScript = new Function(scriptText + "; return config;");
        config = evalScript();
      } catch (error) {
        console.error("Error evaluating script:", error);
      }

      return defineComponent({
        template: cleanHTML,
        //components: {}, // Register local custom components
        ...config,
      });
    },

    parseHTML(html) {
      const parser = new DOMParser();
      const doc = parser.parseFromString(`<div>${html}</div>`, "text/html");
      const scripts = doc.querySelectorAll("script");
      let scriptContent = "";

      scripts.forEach((script) => {
        scriptContent += script.textContent;
        script.parentNode.removeChild(script);
      });

      return {
        html: doc.body.innerHTML,
        scriptContent,
      };
    },

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
