/*
 * Copyright (c) 2023. Selldone® Business OS™
 *
 * Author: M.Pajuhaan
 * Web: https://selldone.com
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 *
 * All rights reserved. In the weave of time, where traditions and innovations intermingle, this content was crafted.
 * From the essence of thought, through the corridors of creativity, each word, and sentiment has been molded.
 * Not just to exist, but to inspire. Like an artist's stroke or a sculptor's chisel, every nuance is deliberate.
 * Our journey is not just about reaching a destination, but about creating a masterpiece.
 * Tread carefully, for you're treading on dreams.
 */

import {createApp, defineComponent, h} from "vue";
import SStyler from "./SStyler.vue";
import {getTypeFromSchema, getTypeFromTagName} from "../util";
import {installGlobalComponents} from "@components/components-mandetory";

const StylerDirective = {
  mounted(el, binding, vnode) {
    const instance = binding.instance;

    // Get builder from main page editor/viewer
    const builder = instance.$builder;

    // Get section from parent section
    const section = instance.$section;

    LOG(
      "arg",
      binding.arg,
      "value",
      binding.value,
      "builder",
      builder ? "✅" : "❌",
      "section",
      section ? "✅" : "❌",
    );

    const isEditing = builder.isEditing;

    if (!isEditing) return;

    const newNode = document.createElement("div");
    const rootApp = instance.$root.$el;

    rootApp.appendChild(newNode);

    el.classList.add("is-editable");

    // ------- Dynamic expression: -------
    const index = el.getAttribute("index");

    let expression = binding.value;

    const arg = binding.arg ? binding.arg : "text"; // Default is text

    // ━━━━━━━━━━━━━━━━━━ Dynamic Nested Path (Nested Components) ━━━━━━━━━━━━━━━━━━
    if (
      (typeof binding.value === "string" ||
        binding.value instanceof
          String) /*When we feed raw path to v-styler like in nested X components!*/ &&
      binding.expression?.includes("{path}") // e.g. v-styler="`${path}.title`"
    ) {
      // We feed raw path to directive
      expression = binding.value;

      // ━━━━━━━━━━━━━━━━━━ Replace index in Path (Loop) ━━━━━━━━━━━━━━━━━━
      expression = expression.replace("index", index);
    }

    /*
                          console.log(
                            "binding = ",
                            arg,
                            "value",
                            binding.value,
                            "expression",
                            expression
                          );*/

    // ━━━━━━━━━━━━━━━━━━ Exceptions ━━━━━━━━━━━━━━━━━━

    /**
     * Handle dynamic v-stylers (If value is null then do not apply v-styler!) {@see XRow}
     */
    if (binding.arg === "row" && !binding.value) return;

    // ━━━━━━━━━━━━━━━━━━ Create Styler ━━━━━━━━━━━━━━━━━━

    // Create and mount the Styler component

    const StylerComponent = defineComponent({
      extends: SStyler,
      beforeCreate() {
        this.$builder = builder;
      },
    });

    // Create a new Vue app with the SArticleAddonComparison component
    const app = createApp({
      render: () =>
        h(StylerComponent, {
          route: instance.$route,
          el,
          section: section,
          type:
            binding.arg ||
            getTypeFromSchema(expression, instance.$section.schema) ||
            getTypeFromTagName(el.tagName),
          name: expression,
        }),
    });
    // Use Vuetify and i18n instances
    app.use(window.$global_vuetify);
    app.use(instance.$i18n);
    app.use(instance.$router);
    app.use(instance.$store);

    installGlobalComponents(app);

    // Create a temporary element to mount the app
    app.mount(newNode);

    section.stylers.push({ instance:app,container:newNode });
  },
};

export default StylerDirective;

function LOG(...text: any) {
 // console.log("🪷 StylerDirective", ...text);
}
