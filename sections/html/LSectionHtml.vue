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
  <x-section
    :object="$sectionData"
    no-default-padding
    v-styler:code="{
      target: $sectionData,
      keyCode: 'html',
      keyProperties: 'properties',
      properties: properties,
      refresh: () => {
        refreshCode();
      },
    }"
  >
    <!-- 📹 Background video -->
    <x-video-background
      v-if="$sectionData.background?.bg_video"
      :video="getVideoUrl($sectionData.background.bg_video)"
    >
    </x-video-background>

    <div
      :style="$builder.isEditing ? 'min-height: 100px' : ''"
      :class="{ 'safe-no-click is-editable': $builder.isEditing }"
    >
      <div
        v-if="mode === 'html'"
        v-dynamic-scripts="true"
        :style="{ pen: $builder.isEditing }"
        v-html="$sectionData.html"
      ></div>
      <component
        v-else-if="mode === 'vue'"
        :is="generated_component"
        v-dynamic-scripts="true"
        :style="{ pen: $builder.isEditing }"
        :properties="
          $sectionData.properties ? $sectionData.properties : undefined
        "
      ></component>
    </div>
  </x-section>
</template>

<script>
import * as types from "../../src/types/types";
import XVideoBackground from "../../components/x/video-background/XVideoBackground.vue";
import StylerDirective from "../../styler/StylerDirective";
import LMixinSection from "../../mixins/section/LMixinSection";
import { PrismEditor } from "vue-prism-editor";
import { defineComponent, reactive } from "vue";
import {
  LRawCodeHelper,
  RawCodeMode,
} from "@selldone/page-builder/settings/code/editor/helpers/LRawCodeHelper";

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
    busy_scripts: false,
    scripts_list: [],

    generated_component: null,

    mode: RawCodeMode.MODE_HTML,

    properties: reactive({ structure: null, value: null }),
  }),
  computed: {},
  watch: {},

  created() {
    this.refreshCode();
  },

  mounted() {},

  methods: {
    refreshCode() {
      const mode = LRawCodeHelper.DetectMode(this.$sectionData.html);
      this.mode = mode;
      try {
        if (mode === RawCodeMode.MODE_VUE) {
          this.generated_component = this.generateComponent(
            this.$sectionData.html,
          );
        } else {
          // Nothing!
        }
      } catch (error) {
        console.error("Error generating component:", error);
      }
    },

    generateComponent(html) {
      console.log("🔥 Generating Vue Component");
      this.properties.structure = {}; // Reset structure.
      this.properties.value = {}; // Reset default.

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

      // Get properties to create options for the component
      try {
        const properties = config?.props?.properties;
        // console.log('properties',properties)

        if (typeof properties === "object" && properties !== null) {
          // Default properties:
          if (properties.default) {
            // Has default value to determine the properties

            let fn = new Function(`return ${properties.default}`)();
            let result = fn();

            if (result && typeof result === "object")
              this.properties.value = result;

            //console.log(`Properties > Default ${properties.default}`, result);
          }
          // Structure properties: (If defined by user)
          if (properties.structure) {
            let fn = new Function(`return ${properties.structure}`)();
            let result = fn();

            if (result && typeof result === "object")
              this.properties.structure = result;

            console.log(
              `Properties > Structure ${properties.structure}`,
              result,
            );
          }
        } else {
          console.error("Properties in the props is not an object",'config',config);
        }
      } catch (e) {
        console.error("Error in extracting properties from the props", e);
      }

      try {
        return defineComponent({
          template: cleanHTML,
          //components: {}, // Register local custom components
          ...config,
        });
      } catch (error) {
        console.error("Error generating component:", error);
      }
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
  },
};
</script>

<style lang="scss" scoped>
::v-deep(.safe-no-click) {
  a,
  .v-btn {
    pointer-events: none;
  }
}
</style>
