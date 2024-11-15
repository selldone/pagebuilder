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
    :class="[object.classes, { 'is-editable': $builder.isEditing }]"
    :style="[
      object.style,
      background_style,
      is_editing ? 'min-height: 100px' : '',
    ]"
  >
    <div
      v-if="mode === 'html'"
      v-dynamic-scripts="true"
      :style="{ pen: is_editing }"
      v-html="object.data.code"
      :class="{ pen: $builder.isEditing }"
    ></div>
    <component
      v-else-if="mode === 'vue'"
      :is="generated_component"
      v-dynamic-scripts="true"
      :style="{ pen: is_editing }"
      :properties="object.data.properties ? object.data.properties : undefined"
      :class="{ pen: $builder.isEditing }"
    ></component>
  </div>
</template>

<script lang="ts">
import LMixinXComponent from "@selldone/page-builder/mixins/x-component/LMixinXComponent";
import {
  LRawCodeHelper,
  RawCodeMode,
} from "@selldone/page-builder/settings/code/editor/helpers/LRawCodeHelper.ts";
import { defineComponent } from "vue";
import { XCodeObject } from "@selldone/page-builder/components/x/code/XCodeObject.ts";
import StylerDirective from "@selldone/page-builder/styler/StylerDirective.ts";
import { isObject } from "lodash-es";
import DynamicScriptDirective from "@selldone/components-vue/directives/script/DynamicScriptDirective.ts";
import { CONSOLE } from "@selldone/core-js";

export default {
  name: "XCode",
  directives: {
    styler: StylerDirective,
    "dynamic-scripts": DynamicScriptDirective,
  },

  mixins: [LMixinXComponent],
  components: {},

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

      if (mode === RawCodeMode.MODE_VUE) {
        try {
          this.generated_component = this.generateComponent(
            this.object.data.code,
          );
        } catch (e) {
          this.generated_component = defineComponent({
            template: `<div class="py-16">
<b style="color: red;font-size: 2rem">🚫 Can not render! </b><br> ${e.toString()}
</div>`,
          });

          //console.error("Error in generating component", e);
        }
      } else {
        // Nothing!
      }
    },

    generateComponent(html) {
      CONSOLE.log("🔥 Generating Vue Component");
      this.structure = {}; // Reset structure.
      this.defaultValues = {}; // Reset default.

      const {
        html: cleanHTML,
        scriptContent,
        styleContent,
      } = this.parseHTML(html);

      // Assuming scriptContent is something like "{ data: () => ({ foo: 'bar' }), methods: { someMethod() {} } }"

      // Remove the script tags and any non-JavaScript content
      let scriptText = scriptContent
        .replace(/<script lang="ts">|<\/script>/g, "")
        .trim();

      function checkForAnyImports(code) {
        const importRegex = /import\s+.*\s+from\s+['"].*['"];?/;

        if (importRegex.test(code)) {
          throw new Error(
            "Restricted import found in the code. You can not use 'import' in the custom code.",
          );
        }
      }

      checkForAnyImports(scriptText);

      // Evaluate the script to extract the configuration
      let config = {};

      if (scriptText) {
        try {
          const evalScript = new Function(scriptText + "; return config;");
          config = evalScript();
        } catch (e) {
          // console.error("Error in evaluating script", e);
        }
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

            CONSOLE.log(
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
          mounted() {
            // console.log("On mounded custom component!", styleContent);
            if (styleContent) {
              const styleElement = document.createElement("style");
              styleElement.textContent = styleContent;
              //console.log("On mounded custom component!",  this.$el);
              this.$el.appendChild(styleElement);
            }
          },
        });
      } catch (error) {
        console.error("Error generating component:", error);
      }
    },

    parseHTML(html) {
      // Convert `export default` to `const config = ...`
      if (html.includes("export default")) {
        html = html.replace(/export\s+default\s*{?/, "const config = {");
      }
      //console.log("html --> ", html);

      const parser = new DOMParser();
      const doc = parser.parseFromString(`<div>${html}</div>`, "text/html");
      const scripts = doc.querySelectorAll("script");

      // Extract scripts:
      let scriptContent = "";

      //  console.log("scripts --> ", scripts);

      scripts.forEach((script) => {
        scriptContent += script.textContent;
        script.parentNode.removeChild(script);
      });

      // Extract style:
      let styleContent = "";
      const styles = doc.querySelectorAll("style");
      styles.forEach((style) => {
        styleContent += style.textContent;
        style.parentNode.removeChild(style);
      });
      // console.log("styles --> ", styleContent);

      // Try to find HTML:
      const template = doc.querySelector("div > template");
      CONSOLE.log("templates --> ", template);

      let templateContent = template ? template.innerHTML : doc.body.innerHTML;

      return {
        html: templateContent,
        scriptContent,
        styleContent,
      };
    },
  },
};
</script>

<style lang="scss">
.x--code {
}
</style>
