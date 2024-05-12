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

import {ComponentInstance, createApp, defineComponent, DirectiveBinding, h, ObjectDirective, VNode,} from "vue";
import {installGlobalComponents} from "@selldone/components-vue/components-mandetory";
import {isObject, isString} from "lodash-es";
import Builder from "../Builder.ts";
import {Section} from "../src/section/section";
import SStylerButtons from "../styler/buttons/SStylerButtons.vue";
import SStylerRow from "../styler/row/SStylerRow.vue";
import * as types from "../src/types/types";
import SStylerButton from "../styler/button/SStylerButton.vue";
import SStylerSection from "../styler/section/SStylerSection.vue";
import SStylerText from "../styler/text/SStylerText.vue";
import SStylerColumn from "../styler/column/SStylerColumn.vue";
import SStylerGrid from "../styler/grid/SStylerGrid.vue";
import SStylerContainer from "../styler/container/SStylerContainer.vue";
import SStylerProduct from "../styler/product/SStylerProduct.vue";
import SStylerProducts from "../styler/products/SStylerProducts.vue";
import SStylerSwiper from "../styler/swiper/SStylerSwiper.vue";
import SStylerBlogs from "../styler/blogs/SStylerBlogs.vue";
import SStylerMarquee from "../styler/marquee/SStylerMarquee.vue";
import SStylerGallery from "../styler/gallery/SStylerGallery.vue";

const DEBUG = false;

export namespace StylerOptions {
  export type Argument =
    | "buttons-row"
    | "button"
    | "row"
    | "section"
    | "text"
    | "column"
    | "grid"
    | "container"
    | "product"
    | "products"
    | "swiper"
    | "blogs"
    | "marquee"
    | "gallery";

  export interface IButtonsRow {
    target: types.ButtonsRow;
    keyRow: string; //default: btn_row
    keyButtons: string; // default: buttons
  }

  export interface IButton {
    target: types.Button;
    remove: () => void; // default: false
    noLink: boolean; // default: false
    hasAlign: boolean; // default: false
  }

  export interface IRow {
    target: types.Row;
    keyRow: string; // default: row
    keyColumns: string; // default:columns
    columnStructure: types.Column; // Initial column structure for adding new column
    hasWrap: boolean; // default: false
    hasArrangement: boolean; // default: false
    hasAdd: boolean; // default: false
    hasFluid: boolean; // default: false
  }

  export interface IProducts {
    target: types.Products;
    custom: boolean; // Has custom code for products and categories
  }
}

const StylerDirective: ObjectDirective<
  HTMLElement,
  | StylerOptions.IButtonsRow
  | StylerOptions.IRow
  | StylerOptions.IButton
  | StylerOptions.IProducts
> = {
  mounted(
    el: HTMLElement & { $section?: Section },
    binding: DirectiveBinding,
    vnode: VNode,
  ) {
    const instance = binding.instance as ComponentInstance<{
      $builder: Builder;
      $section: Section;
    }>;

    // Get builder from main page editor/viewer
    const builder: Builder = instance.$builder;

    // Get section from parent section
    const section: Section = instance.$section;
    el.$section = section; // To accessible from element.

    LOG(
      `mounted()  > ${binding.arg}`,
      "arg",
      binding.arg,
      "value",
      binding.value,
      "builder",
      builder ? "✅" : "❌",
      "section",
      section ? "✅" : "❌",
      "isEditing",
      builder?.isEditing ? "✅" : "❌",
    );

    const isEditing = builder.isEditing;

    if (!isEditing) return;

    const newNode = document.createElement("div");
    const rootApp = instance.$root!.$el;

    rootApp.appendChild(newNode);

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

    // ━━━━━━━━━━━━━━━━━━ Exceptions ━━━━━━━━━━━━━━━━━━

    /**
     * Handle dynamic v-stylers (If value is null then do not apply v-styler!) {@see XRow}
     */
    //if (binding.arg === "row" && !binding.value) return;

    // ━━━━━━━━━━━━━━━━━━ Create Styler ━━━━━━━━━━━━━━━━━━

    const argument = binding.arg;

    // Create and mount the Styler component
    let stylerComponent = null;

    if (argument === "buttons-row") {
      stylerComponent = SStylerButtons;
    } else if (argument === "button") {
      stylerComponent = SStylerButton;
    } else if (argument === "row") {
      stylerComponent = SStylerRow;
    } else if (argument === "section") {
      stylerComponent = SStylerSection;
    } else if (argument === "text") {
      stylerComponent = SStylerText;
    } else if (argument === "column") {
      stylerComponent = SStylerColumn;
    } else if (argument === "grid") {
      stylerComponent = SStylerGrid;
    } else if (argument === "container") {
      stylerComponent = SStylerContainer;
    } else if (argument === "product") {
      stylerComponent = SStylerProduct;
    } else if (argument === "products") {
      stylerComponent = SStylerProducts;
    } else if (argument === "swiper") {
      stylerComponent = SStylerSwiper;
    } else if (argument === "blogs") {
      stylerComponent = SStylerBlogs;
    } else if (argument === "marquee") {
      stylerComponent = SStylerMarquee;
    } else if (argument === "gallery") {
      stylerComponent = SStylerGallery;
    }

    const StylerComponent = defineComponent({
      extends: stylerComponent as any,
      beforeCreate() {
        this.$builder = builder;
      },
    });

    const props = {
      route: instance.$route,
      el,
      section: section,
      type: argument,
      name: expression,
      bindingValue: binding.value,

      builder: builder,
      ...(isObject(binding.value) ? binding.value : {}), // Pass binding values as props for styler component
    };

    // Create a new Vue app with the AAddonComparison component
    const vnode_styler = createApp({
      render: () => h(StylerComponent, props),
    });

    // Use Vuetify and i18n instances
    vnode_styler.use(window.$global_vuetify);
    vnode_styler.use(instance.$i18n as any);
    vnode_styler.use(instance.$router);
    vnode_styler.use(instance.$store);

    installGlobalComponents(vnode_styler);

    // Create a temporary element to mount the app
    try {
      vnode_styler.mount(newNode);
    } catch (e) {
      console.log("binding value", binding.value);
      console.log("props", props);

      console.error("Styler mount error!", e);
      return;
    }

    section.stylers.push({ instance: vnode_styler, container: newNode });

    if (!el.classList.contains("is-editable")) {
      el.classList.add("is-editable");
    }
  },

  updated(
    el: HTMLElement & { $section?: Section },
    binding: DirectiveBinding & { $builder?: Builder },
    vnode: VNode,
  ) {
    // Check if binding.value has changed
    if (DEBUG && binding.oldValue !== binding.value) {
      console.log("Styler directive updated", binding.value, "el", el);
    }
    // Set is-editable class in editing mode:
    if (binding?.$builder?.isEditing && !el.classList.contains("is-editable")) {
      el.classList.add("is-editable");
    }
  },
};

export default StylerDirective;

function LOG(...text: any) {
  if (DEBUG) console.log("🪷 Styler Directive | StylerDirective", ...text);
}
