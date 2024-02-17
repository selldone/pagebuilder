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

import {ComponentInstance, createApp, defineComponent, DirectiveBinding, h, VNode,} from "vue";
import SStyler from "./SStyler.vue";
import {getTypeFromSchema, getTypeFromTagName} from "../src/util";
import {installGlobalComponents} from "@components/components-mandetory";
import {isString} from "lodash-es";
import SelldonePageBuilderCore from "@app-page-builder/src";
import {Section} from "@app-page-builder/src/section";
import SStylerButtons from "@app-page-builder/styler/buttons/SStylerButtons.vue";

const StylerDirective = {
  mounted(el: HTMLElement, binding: DirectiveBinding, vnode: VNode) {
    const instance = binding.instance as ComponentInstance<{
      $builder: SelldonePageBuilderCore;
      $section: Section;
    }>;

    // Get builder from main page editor/viewer
    const builder: SelldonePageBuilderCore = instance.$builder;

    // Get section from parent section
    const section: Section = instance.$section;

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
    const rootApp = instance.$root!.$el;

    rootApp.appendChild(newNode);

    el.classList.add("is-editable");

    // ------- Dynamic expression: -------
    const index = el.getAttribute("index");

    let expression = binding.value;

    // ━━━━━━━━━━━━━━━━━━ Dynamic Nested Path (Nested Components) ━━━━━━━━━━━━━━━━━━
    if (
      isString(
        binding.value,
      ) /*When we feed raw path to v-styler like in nested X components!*/ &&
      binding.value.includes("{path}") // e.g. v-styler="`${path}.title`"
    ) {
      // ━━━━━━━━━━━━━━━━━━ Replace index in Path (Loop) ━━━━━━━━━━━━━━━━━━
      expression = expression.replace("index", index);
    }

    if (!isString(expression)) {
      console.log("expression -> ", binding);
    }
    // ━━━━━━━━━━━━━━━━━━ Exceptions ━━━━━━━━━━━━━━━━━━

    /**
     * Handle dynamic v-stylers (If value is null then do not apply v-styler!) {@see XRow}
     */
    if (binding.arg === "row" && !binding.value) return;

    // ━━━━━━━━━━━━━━━━━━ Create Styler ━━━━━━━━━━━━━━━━━━

    const argument =
      binding.arg ||
      getTypeFromSchema(expression, instance.$section.schema) ||
      getTypeFromTagName(el.tagName);

    // Create and mount the Styler component
    let stylerComponent = SStyler;
    let props = {
      name: expression,
    };

    if (argument === "buttons-row") {
      stylerComponent = SStylerButtons;
      console.log("btn-row styler");
    }

    const StylerComponent = defineComponent({
      extends: stylerComponent as any,
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
          type: argument,
          bindingValue: binding.value,
          builder: builder,
          ...props,
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

    section.stylers.push({ instance: app, container: newNode });
  },
};

export default StylerDirective;

function LOG(...text: any) {
  // console.log("🪷 StylerDirective", ...text);
}
