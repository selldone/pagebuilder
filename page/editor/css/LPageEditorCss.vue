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
  <div class="py-5 text-start">
    <!-- ============== CSS ============== -->

    <v-container>
      <v-expansion-panels>
        <s-setting-expandable
          v-for="(item, i) in classes"
          :key="i"
          :title="item.selector"
        >
          <template v-slot:title>
            <v-spacer></v-spacer>
            <v-btn
              color="red"
              icon
              variant="text"
              @click="classes.splice(i, 1)"
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

      <div class="my-5 widget-buttons">
        <v-btn
          prepend-icon="add_box"
          @click="
            classes.push({
              selector: '.class-name',
              value: '',
            })
          "
          size="x-large"
        >
          Add New Class
        </v-btn>
      </div>

      <div class="widget-box -x-large mb-5 mt-16">
        <s-widget-header title="Compiled Css" icon="code"></s-widget-header>
        <v-list-subheader></v-list-subheader>

        <prism-editor
          :model-value="generated"
          readonly
          :highlight="highlighter"
          class="light-code scrollable-element-light"
          contenteditable="false"
          language="html"
          line-numbers
          style="min-height: 50vh; font-size: 12px"
        >
        </prism-editor>
      </div>
    </v-container>
  </div>
</template>

<script>
import { PrismEditor } from "vue-prism-editor";
import SSettingExpandable from "@selldone/page-builder/styler/settings/expandable/SSettingExpandable.vue";
import { isObject } from "lodash-es";
import { LandingCssHelper } from "@selldone/page-builder/page/editor/css/LandingCssHelper";

export default {
  name: "LPageEditorCss",
  components: { SSettingExpandable, PrismEditor },
  props: {
    page: {},
  },

  data: () => ({
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
