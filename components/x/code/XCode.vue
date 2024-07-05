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
    v-styler:code="{
      target: object,
      structure: structure,
      defaultValues: defaultValues,
      refresh: () => {
        refreshCode();
      },
    }"
    class="x--code"
    :style="is_editing ? 'min-height: 100px' : ''"
    :class="{ 'safe-no-click is-editable': is_editing }"
  >
    <div
      v-if="mode === 'html'"
      v-dynamic-scripts="true"
      :style="{ pen: is_editing }"
      v-html="object.data.code"
    ></div>
    <component
      v-else-if="mode === 'vue'"
      :is="generated_component"
      v-dynamic-scripts="true"
      :style="{ pen: is_editing }"
      :properties="object.data.properties ? object.data.properties : undefined"
    ></component>
  </div>
</template>

<script>
import LMixinXComponent from "@selldone/page-builder/mixins/x-component/LMixinXComponent";
import SArticleEditor from "@selldone/components-vue/article/SArticleEditor.vue";
import {
  LRawCodeHelper,
  RawCodeMode,
} from "@selldone/page-builder/settings/code/editor/helpers/LRawCodeHelper.ts";
import { defineComponent } from "vue";
import { XCodeObject } from "@selldone/page-builder/components/x/code/XCodeObject.ts";
import StylerDirective from "@selldone/page-builder/styler/StylerDirective.ts";
import { isObject } from "lodash-es";

export default {
  name: "XCode",
  directives: { styler: StylerDirective },

  mixins: [LMixinXComponent],
  components: { SArticleEditor },

  props: {
    object: {
      type: XCodeObject,
      required: true,
    },
  },
  data: () => ({
    busy_scripts: false,
    scripts_list: [],

    generated_component: null,

    structure: {},
    defaultValues: {},
  }),

  computed: {
    is_editing() {
      return this.$builder.isEditing;
    },

    mode() {
      return this.object.data.mode;
    },
  },

  created() {
    this.refreshCode();
  },

  mounted() {},

  methods: {
    refreshCode() {
      // Auto detect mode if it's not set:
      const mode = this.object.data.mode
        ? this.object.data.mode
        : LRawCodeHelper.DetectMode(this.object.data.code);
      this.object.data.setMode(mode);

      try {
        if (mode === RawCodeMode.MODE_VUE) {
          this.generated_component = this.generateComponent(
            this.object.data.code,
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
      this.structure = {}; // Reset structure.
      this.defaultValues = {}; // Reset default.

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
        const CODE_PROPS_PROPERTIES = config?.props?.properties;
        // console.log('properties',properties)

        if (CODE_PROPS_PROPERTIES && isObject(CODE_PROPS_PROPERTIES)) {
          // Default properties:
          if (CODE_PROPS_PROPERTIES.default) {
            // Has default value to determine the properties

            let fn = new Function(`return ${CODE_PROPS_PROPERTIES.default}`)();
            let result = fn();

            if (result && typeof result === "object") {
              // 🦋 Set default values:
              this.defaultValues = result;
            }

            //console.log(`Properties > Default ${properties.default}`, result);
          }
          // Structure properties: (If defined by user)
          if (CODE_PROPS_PROPERTIES.structure) {
            let fn = new Function(
              `return ${CODE_PROPS_PROPERTIES.structure}`,
            )();
            let result = fn();

            if (result && typeof result === "object") {
              // 🦋 Set structure:
              this.structure = result;
            }

            console.log(
              `Properties > Structure ${CODE_PROPS_PROPERTIES.structure}`,
              result,
            );
          }
        } else {
          console.error(
            "Properties in the props is not an object",
            "config",
            config,
          );
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
      // Convert `export default` to `const config = ...`
      if (html.includes("export default")) {
        html = html.replace(/export\s+default\s*{?/, 'const config = {');
      }
      console.log("html --> ", html);

      const parser = new DOMParser();
      const doc = parser.parseFromString(`<div>${html}</div>`, "text/html");
      const scripts = doc.querySelectorAll("script");
      let scriptContent = "";

      console.log("scripts --> ", scripts);

      scripts.forEach((script) => {
        scriptContent += script.textContent;
        script.parentNode.removeChild(script);
      });

      // Try to find HTML:
      const template = doc.querySelector("div > template");
      console.log("templates --> ", template);

      let templateContent = template ? template.innerHTML : doc.body.innerHTML;

      return {
        html: templateContent,
        scriptContent,
      };
    },
  },
};
</script>

<style lang="scss">
.x--code {
}

::v-deep(.safe-no-click) {
  a,
  .v-btn {
    pointer-events: none;
  }
}
</style>