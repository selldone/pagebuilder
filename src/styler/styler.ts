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

import Styler from "./SStyler.vue";
import { getTypeFromTagName, getTypeFromSchema } from "../util";
import vuetify from "@components/plugins/vuetify/vuetify";

function installStyler({ builder, Vue }) {
  const StylerInstance = Vue.extend(Styler).extend({
    beforeCreate() {
      this.$builder = builder;
    },
  });

  builder.styler = {
    inserted(el, binding, vnode) {
      /**
       * IMPORTANT!
       * For X component we set X_PARENT_BUILDER to access to live $builder!
       * o.w. the builder present here is the builder when component initialized and always is in edit mode!
       *
       */
      const X_PARENT_BUILDER = vnode.context.$X_PARENT_BUILDER;

      // For global registered internal components! We should assign parent builder here!
      if (X_PARENT_BUILDER) {
        builder = X_PARENT_BUILDER;
      }

      const isEditing = X_PARENT_BUILDER
        ? X_PARENT_BUILDER.isEditing
        : builder.isEditing;

      if (!isEditing) return;

      const newNode = document.createElement("div");
      const section = vnode.context.$section;
      const rootApp = vnode.context.$root.$el;
      rootApp.appendChild(newNode);
      //   console.log('::::::::Editing::::::::',builder.isEditing,'expression',binding.expression,'section',section)
      el.classList.add("is-editable");

      const route = window.$global_router.currentRoute; // Used by uploader!
      //   console.log('binding = ',binding.value,binding)

      // const vuetify=window.$global_vuetify;
      const router = window.$global_router;
      const i18n = window.$i18n_global;

      const store = window.$global_store;

      //  const vuetify=Vue.prototype.$vuetify

      // ------- Dynamic expression: -------
      const index = el.getAttribute("index");

      let expression = binding.expression;

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
      }

      // ━━━━━━━━━━━━━━━━━━ Replace index in Path (Loop) ━━━━━━━━━━━━━━━━━━
      expression = expression.replace("index", index);
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

      section.stylers.push(
        new StylerInstance({
          router,
          store,
          i18n,
          //  vuetify,

          propsData: {
            route: route,
            el,
            section: section,
            type:
              binding.arg ||
              getTypeFromSchema(expression, section.schema) ||
              getTypeFromTagName(el.tagName),
            name: expression,
          },
        }).$mount(newNode)
      );
    },
  };
}

export default installStyler;
