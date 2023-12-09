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

import merge from "lodash-es/merge";
import { Section } from "./section";
import VuseBuilder from "./editor/SPageEditor.vue";
import SPageRender from "../SPageRender.vue";
import styler from "./styler/styler";
import mixin from "./../mixins/mixin";
import { cleanDOM, isObject, removeBRFromSectionData } from "./util";
import SPageRenderPopup from "../SPageRenderPopup.vue";
import Vue from "vue";
import XColumnImageText from "@app-page-builder/sections/components/XColumnImageText.vue";
import XRow from "@app-page-builder/sections/components/XRow.vue";
import XColumn from "@app-page-builder/sections/components/XColumn.vue";
import XSection from "@app-page-builder/sections/components/XSection.vue";
import XContainer from "@app-page-builder/sections/components/XContainer.vue";
import XButtons from "@app-page-builder/sections/components/XButtons.vue";
import XCustomProductsList from "@app-page-builder/sections/components/XCustomProductsList.vue";

const PLUGINS = [];
let mixier = {};
const BUILDER_OPTIONS = {
  title: "",
  intro: true,
  sections: [],
  style: {},
  plugins: [],
  themes: [],
  columnsPrefix: {
    mobile: "col-",
    tablet: "col-sm-",
    desktop: "col-md-",
    widescreen: "col-lg-",
    ultrawide: "col-xl-",
  },
};

// To tell if it is installed or not
let _Vue = null;

class SelldonePageBuilderCore {
  constructor(options) {
    this.isAnimation = false; // In animation editing mode
    this.isTracking = false; // In tracking editing mode

    this.isEditing = true;
    this.isHideExtra = false; // Hide add buttons and empty texts (Only in edit mode)
    this.isSorting = false;
    this.isRendered = false;
    this.title = options.title;
    this.intro = options.intro;
    this.sections = options.sections;
    this.style = options.style;
    this.columnsPrefix = options.columnsPrefix;
    this.themes = options.themes;
    this.components = {};
    this.assets = {
      css: options.assets.css || "dist/css/app.css",
    };

    //----------------- Clone Style ------------------
    this.cloneStyle = false;
    this.cloneObject = null;

    this.installPlugins();
    this.initEspecialComponents();
  }

  /**
   * Creates and adds a new section to the list of sections.
   * @param {*} options
   * @param position
   * @param has_initialize  Call $init in schema (prevent change on past section or drop pre built sections)
   */
  add(options, position, has_initialize = false) {
    if (!options.schema) {
      options.schema = this.components[options.name].options.$schema;
      console.log("Auto assign schema.");
    }

    const section = new Section(options);
    //━━━━━━━━━━━━━━━ Apply init function ━━━━━━━━━━━━━━━
    if (has_initialize && options.schema?.$init) {
      options.schema?.$init(section.data);
    }
    //━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

    // Force set new ID here even exists (in past mode)
    section.data.id = "auto_" + Math.round(Math.random() * 99999999999);

    if (position !== undefined) {
      this.sections.splice(position, 0, section);
      return;
    }
    this.sections.push(section);
  }

  /**
   * Finds a section with the specified id.
   *
   * @param {String|Number} id
   */
  find(id) {
    return this.sections.find((s) => s.id === id);
  }

  /**
   * Removes a section with the specified id.
   * @param {String|Number} id
   */
  remove(section) {
    const id = this.sections.findIndex((s) => s.id === section.id);
    this.sections.splice(id, 1);
    section.destroy();
  }

  /**
   * Removes a section with the specified id.
   * @param {String|Number} oldIndex
   * @param {String|Number} newIndex
   */
  sort(oldIndex, newIndex) {
    const section = this.sections[oldIndex];
    this.sections.splice(oldIndex, 1);
    this.sections.splice(newIndex, 0, section);
  }

  /**
   * Constructs a document fragment.
   */
  outputFragment() {
    const frag = document.createDocumentFragment();
    frag.appendChild(document.head.cloneNode(true));
    frag.appendChild(this.rootEl.cloneNode(true));

    return frag;
  }

  /**
   * clears the builder sections.
   */
  clear() {
    this.sections.forEach((section) => section.destroy());
    this.sections = [];

    this.isAnimation = false; // In animation editing mode
    this.isTracking = false; // In tracking editing mode
    this.isEditing = true;
    this.isSorting = false;
    this.isRendered = false;

    this.rootEl = null;

    this.cloneStyle = false;
    this.cloneObject = null;
  }

  //----------------- Clone Style ------------------
  toggleCloneStyleMode() {
    this.cloneStyle = !this.cloneStyle;
    this.cloneObject = null;
  }

  onClickClone(e, object, keys) {
    //console.log("copy Style",this.cloneStyle,this.isEditing,this.cloneObject);

    if (!this.cloneStyle || !this.isEditing) return;

    if (this.cloneObject) {
      this.onClonePast(object, keys);
    } else {
      this.onCloneCopy(object, keys);
    }

    e.preventDefault();
    e.stopPropagation();
  }

  onCloneCopy(object, keys) {
    if (!this.cloneStyle) return;

    this.cloneObject = {};

    keys.forEach((key) => {
      this.cloneObject[key] = object[key];
    });

    // console.log("Clone Style", this.cloneObject);
  }
  onClonePast(object, keys) {
    if (!this.cloneObject) return;

    // console.log("Past Style", this.cloneObject);

    keys.forEach((key) => {
      if (!this.cloneObject[key]) return;

      if (Array.isArray(this.cloneObject[key])) {
        object[key] = Object.assign([], this.cloneObject[key]);
      } else if (isObject(this.cloneObject[key])) {
        object[key] = Object.assign({}, this.cloneObject[key]);
      } else {
        object[key] = this.cloneObject[key];
      }
    });

    this.cloneObject = null;
  }

  /**
   * Static helper for shops registration pre-installation.
   *
   * @param {String} name
   * @param {Object} definition
   */
  static component(name, definition) {
    // Just make a plugin that installs a component.
    SelldonePageBuilderCore.use((ctx) => {
      ctx.builder.component(name, definition);
      //console.log('ctx',ctx)
    });
  }

  /**
   * Acts as a mixin for subcomponents.
   * @param {Object} mixinObj
   */
  static mix(mixinObj) {
    mixier = merge(mixier, mixinObj);
  }

  /**
   * Adds a component section to the builder and arguments it with the styler.
   * @param {*} name
   * @param {*} definition
   */
  component(name, definition) {
    // reoslve the component name automatically.
    if (typeof name === "object") {
      definition = name;
      name = definition.name;
    }

    // if passed a plain object
    if (!definition.extend) {
      definition = _Vue.extend(definition);
    }

    this.components[name] = definition.extend({
      directives: { styler: this.styler },
      mixins: [this.mixin],
      components: mixier.components,
    });
  }

  /**
   * Initialize especial components
   */
  initEspecialComponents() {
    [
      XColumnImageText,
      XRow,
      XColumn,
      XSection,
      XContainer,
      XButtons,
      XCustomProductsList,
    ].forEach((_component) => {
      Vue.component(
        _component.name,
        Vue.extend(_component).extend({
          directives: { styler: this.styler },
          mixins: [this.mixin],
          components: mixier.components,
          beforeCreate() {
            //  console.log('beforeCreate ----->',this.$parent.$builder.isEditing)
            this.$sectionData = this.$parent.$sectionData;
            this.$builder = this.$parent.$builder;
            this.$section = this.$parent.$section;
            this.$X_PARENT_BUILDER = this.$parent.$builder; // Keep parent builder for styler
          },
        })
      );
    });
  }

  /**
   * Installs added plugins.
   */
  installPlugins() {
    PLUGINS.forEach((ctx) => {
      ctx.plugin({ builder: this, Vue: _Vue }, ctx.options);
    });
    // reset to prevent duplications.
    console.log(
      "%c♻ Selldone plugins %c: Install ☀ ☄",
      "color:#0288D1;font-weight: 800;",
      "color:#333"
    );
    ///////// Remove for multi render / builder PLUGINS = [];
  }

  static install(Vue, options = {}) {
    // already installed
    if (_Vue) return;

    _Vue = Vue;
    // console.log('Vue',Vue)

    // II. Initialize builder:
    {
      const builder = new SelldonePageBuilderCore(
        Object.assign({}, BUILDER_OPTIONS, options)
      );
      // configer assets output location
      Vue.util.defineReactive(builder, "sections", builder.sections);
      Vue.util.defineReactive(builder, "isEditing", builder.isEditing);
      Vue.util.defineReactive(builder, "isHideExtra", builder.isHideExtra);
      Vue.util.defineReactive(builder, "isSorting", builder.isSorting);

      Vue.util.defineReactive(builder, "isAnimation", builder.isAnimation);
      Vue.util.defineReactive(builder, "isTracking", builder.isTracking);

      Vue.util.defineReactive(builder, "cloneStyle", builder.cloneStyle);
      Vue.util.defineReactive(builder, "cloneObject", builder.cloneObject);

      const extension = {
        components: builder.components,
        beforeCreate() {
          this.$builder = builder;
        },
      };

      // register the main shops.
      Vue.component("SPageEditor", Vue.extend(VuseBuilder).extend(extension));
    }

    // II. Initialize render:
    {
      const builder = new SelldonePageBuilderCore(
        Object.assign({}, BUILDER_OPTIONS, options)
      );
      // configer assets output location
      Vue.util.defineReactive(builder, "sections", builder.sections);
      /*    Vue.util.defineReactive(builder, "isEditing", builder.isEditing);
      Vue.util.defineReactive(builder, "isSorting", builder.isSorting);

      Vue.util.defineReactive(builder, "isAnimation", builder.isAnimation);
      Vue.util.defineReactive(builder, "isTracking", builder.isTracking);*/

      const extension = {
        components: builder.components,
        beforeCreate() {
          this.$builder = builder;
        },
      };
      Vue.component("SPageRender", Vue.extend(SPageRender).extend(extension));
      // console.log('extension',extension)
    }

    // III. Initialize popup render:
    {
      const builder = new SelldonePageBuilderCore(
        Object.assign({}, BUILDER_OPTIONS, options)
      );
      // configer assets output location
      Vue.util.defineReactive(builder, "sections", builder.sections);
      /*  Vue.util.defineReactive(builder, "isEditing", builder.isEditing);
      Vue.util.defineReactive(builder, "isSorting", builder.isSorting);

      Vue.util.defineReactive(builder, "isAnimation", builder.isAnimation);
      Vue.util.defineReactive(builder, "isTracking", builder.isTracking);*/

      const extension = {
        components: builder.components,
        beforeCreate() {
          this.$builder = builder;
        },
      };
      Vue.component(
        "SPageRenderPopup",
        Vue.extend(SPageRenderPopup).extend(extension)
      );
      // console.log('extension',extension)
    }
    // IV. Initialize menu render:
    {
      const builder = new SelldonePageBuilderCore(
        Object.assign({}, BUILDER_OPTIONS, options)
      );
      // configer assets output location
      Vue.util.defineReactive(builder, "sections", builder.sections);
      /* Vue.util.defineReactive(builder, "isEditing", builder.isEditing);
      Vue.util.defineReactive(builder, "isSorting", builder.isSorting);

      Vue.util.defineReactive(builder, "isAnimation", builder.isAnimation);
      Vue.util.defineReactive(builder, "isTracking", builder.isTracking);*/

      const extension = {
        components: builder.components,
        beforeCreate() {
          this.$builder = builder;
        },
      };
      Vue.component(
        "SPageRenderMenu",
        Vue.extend(SPageRenderPopup).extend(extension)
      );
      // console.log('extension',extension)
    }
  }

  /**
   * The plugin to be installed with the builder. The function receives the installation context which
   * contains the builder instance and the Vue prototype.
   *
   * @param {Function} plugin
   * @param {Object} options
   */
  static use(plugin, options = {}) {
    if (typeof plugin !== "function") {
      return console.warn("Plugins must be a function");
    }

    // append to the list of to-be installed plugins.
    PLUGINS.push({ plugin, options });
  }

  /**
   * deprecated!!!
   * @param data
   */
  set(data, from_theme = false) {
    this.style = data.style;

    this.title = data.title !== undefined ? data.title : this.title;

    if (data.sections && Array.isArray(data.sections)) {
      this.sections = data.sections.map((section) => {
        const sectionData = {
          name: section.name,
          schema: section.schema,
          data: from_theme ? null : section.data,
        };
        // Add schema:
        if (!sectionData.schema) {
          sectionData.schema =
            this.components[sectionData.name].options.$schema;
        }
        // Set random ID for sections
        if (sectionData.data && !sectionData.data.id) {
          sectionData.data.id =
            "auto_" + Math.round(Math.random() * 99999999999);
        }

        return new Section(sectionData);
      });
    }
  }

  generate(data) {
    const out = {};

    out.title = data.title !== undefined ? data.title : this.title;
    if (data.sections && Array.isArray(data.sections)) {
      out.sections = data.sections.map((section) => {
        const sectionData = {
          name: section.name,
          schema: section.schema,
          data: section.data,
        };
        // Add schema:
        if (!sectionData.schema) {
          sectionData.schema =
            this.components[sectionData.name].options.$schema;
        }

        // Set random ID for sections
        if (sectionData.data && !sectionData.data.id) {
          sectionData.data.id =
            "auto_" + Math.round(Math.random() * 99999999999);
        }

        return new Section(sectionData);
      });
    } else {
      out.sections = [];
    }
    return out;
  }

  /**
   * Outputs a JSON representation of the builder that can be used for rendering with the renderer component.
   */
  toJSON() {
    // Pre save function call: (prepare some stuff in components if needed)
    this.sections.forEach((item) => {
      if (item.schema.onPreSave) item.schema.onPreSave(item);
      console.log("📐 Convert to json.");
    });

    this.sections.forEach((section) => {
      section.data = removeBRFromSectionData(section.data);
    });

    return {
      title: this.title,
      sections: this.sections.map((s) => ({
        name: s.name,
        data: s.data,
      })),
      style: this.style,
    };
  }

  /**
   * Previews the created page in a seperate tap/window.
   */
  preview() {
    const frag = this.outputFragment();
    const artboard = frag.querySelector("#artboard");
    const printPreview = window.open("about:blank", "print_preview");
    const printDocument = printPreview.document;
    cleanDOM(frag);
    printDocument.open();
    printDocument.write(
      `<!DOCTYPE html>
        <html>
          <head>
            <title>${this.title}</title>
            <link href="${this.assets.css}" rel="stylesheet">
          </head>
          <body>
            ${artboard.innerHTML}
          <body>
        </html>`
    );
  }

  /**
   * Exports the builder instance to a specified output. default is json.
   *
   * @param {String} method
   */
  export(method = "json") {
    if (method === "pwa" || method === "zip") {
      if (typeof this.download === "function") {
        return this.download(this.assets);
      }

      return console.warn("You do not have the zip plugin installed.");
    }

    if (method === "preview") {
      return this.preview();
    }

    return this.toJSON();
  }
}

// use the plugin API to add the styler and mixin functionalities.

SelldonePageBuilderCore.use(styler);
SelldonePageBuilderCore.use(mixin);

/**
 * Use this directive to add extra data-x attribute to elements in page builder.
 */
Vue.directive("initDataAttribute", {
  bind: function (el, binding, vnode) {
    // The value passed to our directive
    const style = binding.value;

    if (!style) return;

    // Animation play threshold:
    if (style.threshold) {
      // Set attribute to the element
      el.setAttribute("data-threshold", style.threshold);
    }
  },
});

export default SelldonePageBuilderCore;
