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
    <v-icon>css</v-icon>
    <v-tooltip activator="parent">CSS</v-tooltip>
  </v-btn>

  <v-dialog
    v-model="dialog"
    scrollable
    fullscreen
    transition="dialog-bottom-transition"
  >
    <v-card color="#222">
      <v-card-title></v-card-title>
      <v-card-text>
        <!-- ============== CSS ============== -->

        <v-container>
          <v-row>
            <v-col cols="12" sm="4" md="3">
              <v-sheet
                color="#111"
                class="d-flex align-center py-1 px-2 mb-2"
                rounded="lg"
              >
                <span class="text-subtitle-2">Classes</span>
                <v-spacer> </v-spacer>

                <v-btn
                  prepend-icon="add_box"
                  @click="
                    classes.push({
                      selector: '.class-name',
                      value: '',
                    })
                  "
                  size="small"
                  variant="outlined"
                  color="#fff"
                  class="tnt"
                >
                  Add New Class
                </v-btn>
              </v-sheet>

              <v-expansion-panels>
                <s-setting-expandable
                  v-for="(item, i) in classes"
                  :key="i"
                  :title="item.selector"
                  bg-color="#456"
                >
                  <template v-slot:title>
                    <v-spacer></v-spacer>
                    <v-btn
                      color="red"
                      icon
                      variant="text"
                      @click.stop="classes.splice(i, 1)"
                      class="me-1"

                    >
                      <v-icon>close</v-icon>
                    </v-btn>
                  </template>

                  <v-text-field
                    v-model="item.selector"
                    label="Selector"
                    placeholder="Ex: .classname, body, ..."
                    variant="outlined"
                    persistent-placeholder
                    class="mt-3"
                  ></v-text-field>

                  <v-textarea
                    v-model="item.value"
                    auto-grow
                    variant="outlined"
                    label="Value"
                    persistent-placeholder
                    placeholder="font-size: 0.8rem;
margin-bottom: 16px;
font-weight: 500;"
                  ></v-textarea>
                </s-setting-expandable>
              </v-expansion-panels>
            </v-col>

            <v-col cols="12" sm="8" md="9">
              <s-widget-header
                title="Compiled Css"
                icon="code"
              ></s-widget-header>
              <v-list-subheader></v-list-subheader>

              <prism-editor
                :model-value="generated"
                readonly
                :highlight="highlighter"
                class="prism-dark scrollable-element-light"
                contenteditable="false"
                language="html"
                line-numbers
                style="min-height: 50vh; font-size: 12px"
              >
              </prism-editor>
            </v-col>
          </v-row>
        </v-container>
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
import { PrismEditor } from "vue-prism-editor";
import SSettingExpandable from "@selldone/page-builder/styler/settings/expandable/SSettingExpandable.vue";
import { isObject } from "lodash-es";
import { LandingCssHelper } from "@selldone/page-builder/src/menu/left/css/LandingCssHelper.ts";
import "prismjs/themes/prism-dark.css";

export default {
  name: "LMenuLeftCss",
  components: { SSettingExpandable, PrismEditor },
  props: {
    page: {},
  },

  data: () => ({
    dialog: false,

    classes: [],
    raw: "",
  }),

  computed: {
    generated() {
      return LandingCssHelper.Generate(this.page.css);
    },
  },

  watch: {
    page() {
      this.init();
    },
  },
  created() {
    this.init();
  },

  methods: {
    init() {
      if (
        !this.page.css ||
        !isObject(this.page.css) ||
        Array.isArray(this.page.css)
      ) {
        this.page.css = {
          classes: [],
          raw: "",
        };
      }

      this.classes = this.page.css.classes;
      this.raw = this.page.css.raw;
    },

    highlighter(code) {
      return Prism.highlight(code, Prism.languages.css, "css");
    },
  },
};
</script>

<style scoped></style>
