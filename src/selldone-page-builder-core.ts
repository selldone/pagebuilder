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
import {Section} from "./section";
import SPageEditor from "./editor/SPageEditor.vue";
import SPageRender from "../SPageRender.vue";
import SectionMixin from "../mixins/SectionMixin";
import {isObject, removeBRFromSectionData} from "./util";
import SPageRenderPopup from "../SPageRenderPopup.vue";
import {App, ComponentPublicInstance, defineComponent, provide, reactive,} from "vue";
import XColumnImageText from "@app-page-builder/sections/components/XColumnImageText.vue";
import XRow from "@app-page-builder/sections/components/XRow.vue";
import XColumn from "@app-page-builder/sections/components/XColumn.vue";
import XSection from "@app-page-builder/sections/components/XSection.vue";
import XContainer from "@app-page-builder/sections/components/XContainer.vue";
import XButtons from "@app-page-builder/sections/components/XButtons.vue";
import XCustomProductsList from "@app-page-builder/sections/components/XCustomProductsList.vue";
import initDataAttributeDirective from "./directives/initDataAttributeDirective";
import {Page} from "@app-page-builder/src/models/IData";
import XMixin from "@app-page-builder/mixins/XMixin";
import StylerDirective from "@app-page-builder/src/styler/StylerDirective";
import Uploader from "@app-page-builder/sections/components/Uploader.vue";

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
let _Vue: App | null = null;

class SelldonePageBuilderCore {
  static install(app: App, options = {}) {
    // already installed
    if (_Vue) {
      LOG("⚽ 2. Call Install", "Already installed!");
      return;
    }
    LOG("⚽ 2. Start Install...");

    /**
     * Use this directive to add extra data-x attribute to elements in page builder.
     */
    app.directive("initDataAttribute", initDataAttributeDirective);

    app.component(Uploader.name, Uploader);

    _Vue = app;

    // II. Initialize builder:
    this.addMasterComponent(app, "SPageEditor", SPageEditor, options);

    // II. Initialize render:
    this.addMasterComponent(app, "SPageRender", SPageRender, options);

    // III. Initialize popup render:
    this.addMasterComponent(app, "SPageRenderPopup", SPageRenderPopup, options);

    // IV. Initialize menu render:
    this.addMasterComponent(app, "SPageRenderMenu", SPageRenderPopup, options);
  }

  static addMasterComponent(
    app: App,
    name: string,
    component: any,
    options: any,
  ) {
    {
      const core_instance = new SelldonePageBuilderCore(
        Object.assign({}, BUILDER_OPTIONS, options),
      );

      // Initialize builder
      const builder = reactive(new SelldonePageBuilderCore(core_instance));

      const extension = {
        components: builder.components,
        beforeCreate() {
          provide("$builder", builder);
          this.$builder = builder;
        },
      };

      const ExtendedSPageRender = defineComponent({
        extends: component,
        ...extension,
      });

      // Register the main components
      app.component(name, ExtendedSPageRender);
    }
  }

  public isAnimation: boolean;
  public isTracking: boolean;
  public isEditing: boolean;
  public isHideExtra: boolean;
  public isSorting: boolean;
  public isRendered: boolean;
  public title: string;
  public intro: boolean;
  public sections: Section[];
  public style: any;
  public columnsPrefix: any;
  public themes: any[];
  public components: any;
  public cloneStyle: boolean;
  public cloneObject: any;
  public rootEl: any;

  public history: string[] = [];
  public historyIndex: number = 0;

  constructor(options) {
    LOG("⚽ 3. Constructor > Create page builder instance", "options", options);

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

    //----------------- Clone Style ------------------
    this.cloneStyle = false;
    this.cloneObject = null;

    this.installPlugins(_Vue!);
    this.initEspecialComponents(_Vue!);
  }

  /**
   * Creates and adds a new section to the list of sections.
   * @param {*} options
   * @param position
   * @param has_initialize  Call $init in schema (prevent change on past section or drop pre built sections)
   */
  add(options, position, has_initialize = false) {
    if (!options.schema) {
      options.schema = this.components[options.name].extends.$schema;
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
  }

  onClonePast(object, keys) {
    if (!this.cloneObject) return;

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
    // Resolve the component name automatically.
    if (typeof name === "object") {
      definition = name;
      name = definition.name;
    }

    // Define the component using Vue 3's defineComponent
    // If passed a plain object, wrap it with defineComponent
    const componentDefinition =
      typeof definition === "function"
        ? definition
        : defineComponent(definition);

    // Extend the component with additional options
    this.components[name] = defineComponent({
      extends: componentDefinition,

      directives: { styler: StylerDirective },
      mixins: [SectionMixin], // Vue 3 still supports mixins
      components: mixier.components,
    });
  }

  /**
   * Initialize especial components
   */
  initEspecialComponents(app: App) {
    const components = [
      XColumnImageText,
      XRow,
      XColumn,
      XSection,
      XContainer,
      XButtons,
      XCustomProductsList,
    ];

    components.forEach((_component) => {
      const ExtendedComponent = defineComponent({
        extends: _component,
        directives: { styler: StylerDirective },
        mixins: [XMixin], // Vue 3 still supports mixins
        components: mixier.components,
      });

      app.component(_component.name, ExtendedComponent);
    });
  }

  /**
   * Installs added plugins.
   */
  installPlugins(app: App) {
    PLUGINS.forEach((ctx) => {
      ctx.plugin({ builder: this, Vue: _Vue }, ctx.options);
    });
    // reset to prevent duplications.
    console.log(
      "%c♻ Selldone plugins %c: Install ☀ ☄",
      "color:#0288D1;font-weight: 800;",
      "color:#333",
    );
    ///////// Remove for multi render / builder PLUGINS = [];
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
   * Load page content from a JSON object.
   * @param data
   */
  set(data: Page.IData, from_theme: boolean = false) {
    LOG("⚽ Set -----> data", data);

    this.style = data.style;

    this.title = data.title !== undefined ? data.title : this.title;

    // --- Reset history ---
    this.history = []; // Reset local history fot undo redo
    this.historyIndex = 0;

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
            this.components[sectionData.name].extends.$schema;
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
            this.components[sectionData.name].extends.$schema;
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
   * Exports the builder instance to a specified output. default is json.
   *
   * @param {String} method
   */
  export(method = "json") {
    return this.toJSON();
  }
}

export default SelldonePageBuilderCore;

function LOG(...text: any) {
  // console.log('🪷 Core',...text)
}
