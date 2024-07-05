<!--
  - Copyright (c) 2023-2024. Selldone® Business OS™
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
  <!-- █████████████████████ Edit Dialog █████████████████████ -->
  <v-dialog
    v-model="show_dialog"
    fullscreen
    scrollable
    transition="dialog-bottom-transition"
  >
    <v-card v-if="dialog_pre" class="text-start">
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
            However, please be aware that pasting code containing 'script' tags
            may potentially lead to security issues, particularly within your
            editor. For this reason, we strongly advise only pasting code from
            sources you trust.
          </v-list-subheader>

          <!-- ━━━━━━━━━━━━━━━━━━━━ Raw Code Mode ━━━━━━━━━━━━━━━━━━━━ -->

          <v-row no-gutters align="center">
            <v-btn-toggle
              v-model="target.data.mode"
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

            <v-spacer></v-spacer>
            <v-btn
              @click="sample_dialog = true"
              size="small"
              class="tnt"
              prepend-icon="tips_and_updates"
              >Show Samples
            </v-btn>
          </v-row>

          <prism-editor
            v-model="target.data.code"
            :highlight="highlighter"
            class="light-code scrollable-element-light"
            contenteditable="false"
            language="html"
            line-numbers
            style="min-height: 50vh; font-size: 12px"
            @blur="refreshScripts"
            @update:model-value="changed = true"
          >
          </prism-editor>
        </div>

        <div class="widget-box -large mb-5">
          <s-widget-header icon="code" title="Scripts"></s-widget-header>
          <v-list-subheader
            >If your code includes scripts, they will be identified and
            displayed here for your review. These scripts will be automatically
            inserted into your site's header and will load automatically on your
            custom page.
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
          <v-btn
            v-if="changed"
            size="x-large"
            variant="elevated"
            color="primary"
            @click="show_dialog = false"
          >
            <v-icon start>check</v-icon>
            {{ $t("global.actions.apply") }}
          </v-btn>
          <v-btn
            v-else
            size="x-large"
            variant="text"
            @click="show_dialog = false"
          >
            <v-icon start>close</v-icon>
            {{ $t("global.actions.close") }}
          </v-btn>
        </div>
      </v-card-actions>
    </v-card>
  </v-dialog>
  <!-- ███████████████████████ Dialog > Samples ███████████████████████ -->

  <v-bottom-sheet
    v-model="sample_dialog"
    max-width="98vw"
    width="720"
    content-class="rounded-t-xl"
    scrollable
  >
    <v-card
      class="text-start"
      min-height="200px"
      rounded="t-xl"
      :loading="busy_fetch"
    >
      <v-card-title> Raw Code Collection</v-card-title>
      <v-card-subtitle class="text-wrap">
        Here are some raw code samples that you can use in your custom page.
        Click on any of them to insert it into the editor.
      </v-card-subtitle>

      <v-card-text>
        <v-row align="stretch" justify="center" no-gutters>
          <v-card
            class="ma-2 pb-3 d-flex flex-column align-stretch overflow-hidden border pp"
            flat
            max-width="250"
            width="250"
            rounded="xl"
            href="https://github.com/selldone/storefront-sdk/tree/main/test"
            target="_blank"
            color="#000"
          >
            <v-responsive aspect-ratio="2" class="flex-grow-1 " content-class="d-flex align-center justify-center">
              <v-icon class="ma-auto" size="46">fa:fab fa-github</v-icon>
            </v-responsive>
            <div class="single-line flex-grow-0 px-3 py-1 text-subtitle-2">
              Sample Codes & Live Tests
              <v-icon class="mx-1" size="small">open_in_new</v-icon>

            </div>
          </v-card>

          <v-sheet
            v-for="(item, i) in sample_elements"
            :key="i"
            class="ma-2 pb-3 d-flex flex-column align-stretch overflow-hidden border pp row-hover"
            flat
            max-width="250"
            width="250"
            rounded="xl"
            @click="
              target.data.code = item.section.data.html;
              autoDetectMode();
              sample_dialog = false;
              changed = true;
            "
          >
            <v-img
              :src="getShopImagePath(item.image)"
              cover
              class="flex-grow-1"
              width="100%"
              aspect-ratio="2"
            >
            </v-img>
            <div class="single-line flex-grow-0 px-3 py-1 text-subtitle-2">
              {{ item.title }}
            </div>
          </v-sheet>
        </v-row>
      </v-card-text>
    </v-card>
  </v-bottom-sheet>
</template>

<script>
import LEventsName from "../../../mixins/events/name/LEventsName";
import { LMixinEvents } from "../../../mixins/events/LMixinEvents";
import { EventBus } from "@selldone/core-js/events/EventBus";
import { PrismEditor } from "vue-prism-editor";
import {
  LRawCodeHelper,
  RawCodeMode,
} from "@selldone/page-builder/settings/code/editor/helpers/LRawCodeHelper";

export default {
  name: "LSettingsCodeEditor",

  mixins: [LMixinEvents],

  components: {
    PrismEditor,
  },

  props: {
    builder: {
      type: Object,
      required: true,
    },
  },
  data: () => ({
    el: null,
    section: null,
    target: null,
    refresh: null, // A callback refresh function to refresh code in component

    //----------------------- Bg image -----------------------
    show_dialog: false,
    dialog_pre: false,

    mode: RawCodeMode.MODE_HTML,
    busy_scripts: false,
    scripts_list: [],

    changed: false,
    //--------------------------
    key_listener_keydown: null,

    LOCK: false, // 🔐 Lock changes

    //--------------------------
    sample_dialog: false,
    busy_fetch: false,
    sample_elements: null,
  }),

  computed: {
    effect() {
      return this.target?.effect;
    },
    upload_image_url() {
      return this.builder.getImageUploadUrl();
    },
  },
  watch: {
    show_dialog(dialog) {
      if (dialog) this.refreshScripts();

      // Keep highlight active element:
      if (!dialog && this.refresh && this.changed) this.refresh();
    },
    sample_dialog(dialog) {
      if (dialog) this.fetchElements();
    },
  },
  created() {},
  mounted() {
    EventBus.$on(
      "show:LSettingsCodeEditor",

      ({ el, section, target, refresh }) => {
        this.CloseAllPageBuilderNavigationDrawerTools(); // Close all open tools.

        this.LOCK = true; // 🔒 Prevent update style and classes

        this.el = el;
        this.section = section;
        this.target = target;

        this.refresh = refresh;

        this.changed = false;

        this.autoDetectMode();

        this.showDialog();
      },
    );

    //――――――――――――――――――――――  START Editor key listener ――――――――――――――――――――
    this.key_listener_keydown = (event) => {
      // Scape:
      let isEscape =
        event.key === "Escape" || event.key === "Esc" || event.keyCode === 27;

      if (isEscape) {
        if (this.show_dialog) {
          // Close tools
          this.show_dialog = false;
          event.preventDefault();
          return false;
        }
      }
    };
    document.addEventListener("keydown", this.key_listener_keydown, true);
    //――――――――――――――――――――――  END Editor key listener ――――――――――――――――――――

    //█████████████████████████████████████████████████████████████
    //――――――――――――――― Event Bus ――――――――――――――――
    //█████████████████████████████████████████████████████████████
    // Listen for show loading data from server
    EventBus.$on(LEventsName.PAGE_BUILDER_CLOSE_TOOLS, () => {
      this.show_dialog = false;
    });
  },
  beforeUnmount() {
    EventBus.$off("show:LSettingsCodeEditor");
    EventBus.$off(LEventsName.PAGE_BUILDER_CLOSE_TOOLS);

    //――――――――――――――――――――――  REMOVE key listener ――――――――――――――――――――
    document.removeEventListener("keydown", this.key_listener_keydown, true);
  },

  methods: {
    autoDetectMode() {
      this.target.data.setMode(LRawCodeHelper.DetectMode(this.target.data.code));
    },
    highlighter(code) {
      return Prism.highlight(code, Prism.languages.html, "html");
    },

    setMode() {
      this.target.data.code = this.target.data.code.replace(
        /<!----vue---->/g,
        "",
      );

      if (this.target.data.mode === RawCodeMode.MODE_HTML) {
      } else {
        this.target.data.code =
          `<!----vue---->${this.target.data.code}`;
      }
    },
    refreshScripts() {
      this.busy_scripts = true;
      this.extractInfoFromScripts(this.target.data.code)
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

    showDialog() {
      this.dialog_pre = false;
      this.$nextTick(() => {
        this.dialog_pre = true;
        this.show_dialog = true;
        this.LOCK = false; // 🔓 Now can update values
      });
    },

    fetchElements() {
      if (this.sample_elements) return;

      this.busy_fetch = true;

      axios
        .get(window.GAPI.GET_LANDING_PAGE_PUBLISHED_ELEMENTS(), {
          params: {
            offset: 0,
            limit: 20,

            mode: "html",
          },
        })
        .then(({ data }) => {
          this.sample_elements = data.elements
            .map((e) => {
              try {
                e.section = JSON.parse(e.section);
              } catch (e) {
                console.error(e);
              }
              return e;
            })
            .filter((e) => e.section?.data?.html);
        })
        .catch((error) => {
          this.showLaravelError(error);
        })
        .finally(() => {
          this.busy_fetch = false;
        });
    },
  },
};
</script>

<style lang="scss" scoped></style>
