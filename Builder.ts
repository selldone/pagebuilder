/*
 * Copyright (c) 2023-2024. Selldone® Business OS™
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

import {Section} from "./src/section/section";
import {App, reactive} from "vue";
import {Page} from "@selldone/core-js/models/shop/page/page.model";
import XVariants from "./components/x/variants/XVariants.vue";
import XCountDown from "./components/x/count-down/XCountDown.vue";
import XRating from "./components/x/rating/XRating.vue";
import {LUtilsMigration} from "./utils/migration/LUtilsMigration";
import {isFunction, isObject} from "lodash-es";
import {Popup} from "@selldone/core-js/models/shop/popup/popup.model";
import {SvgFilters} from "./utils/filter/svg-filters/SvgFilters";
import {FontLoader} from "@selldone/core-js/helper/font/FontLoader";
import * as types from "./src/types/types";
import {ShopMenu} from "@selldone/core-js/models/shop/design/menu.model";
import {LUtilsComponents} from "@selldone/page-builder/utils/components/LUtilsComponents.ts";
import {util} from "prismjs";

const DEBUG = true;

export namespace builder {
  export interface IOptions {
    mode: Mode;


    title: string;
    sections: Section[];
    style: any;
    css: IPageCss | null | undefined;
    columnsPrefix: {
      mobile: string;
      tablet: string;
      desktop: string;
      widescreen: string;
      ultrawide: string;
    };

    // Edit mode only options:
    server?: IServer;
    type?: ModelType;
    model?: IModel;

    /** Ignore sections name to do not show in the list */
    ignoreSections?: string[];
  }

  export interface IState {
    isEditing: boolean;
    isHideExtra: boolean;
    isSorting: boolean;
    isRendered: boolean;
  }

  export type IModel = Page | Popup | ShopMenu;

  export type Mode = "edit" | "view";

  export type ModelType = "page" | "popup" | "menu";
  export type IUploadUrlFunction = (
    type: ModelType,
    model: IModel,
  ) => string | null;

  export interface IServer {
    uploadImageUrl: IUploadUrlFunction;
    uploadVideoUrl: IUploadUrlFunction;
  }
}

export const Components: Record<string, any> = {};

/**
 * Default options for the builder.
 */
const BUILDER_OPTIONS: builder.IOptions = {
  mode: "edit",

  title: "",
  sections: [],
  style: {},
  css: null,
  columnsPrefix: {
    mobile: "v-col-",
    tablet: "v-col-sm-",
    desktop: "v-col-md-",
    widescreen: "v-col-lg-",
    ultrawide: "v-col-xl-",
  },
};

export type IPageCss = {
  classes: { selector: string; value: string }[] | null;
  raw: string | null;
};

export class Builder {
  types = types;

  // Assigned from options:
  public title: string;
  public sections: Section[];
  public style: any;
  public css: IPageCss | null | undefined; // Pre compiled CSS
  public columnsPrefix: any;
  public server: builder.IServer | undefined | null;

  // Local variables:
  public isAnimation: boolean;
  public isTracking: boolean;
  public isEditing: boolean;
  public isHideExtra: boolean;
  public isSorting: boolean;
  public isRendered: boolean;
  /**
   * @deprecated
   */
  public components: Record<string, any>;
  public cloneStyle: boolean;
  public cloneObject: any;
  public rootEl: any;
  public history: string[] = [];
  public historyIndex: number = 0;

  // Corresponding model of page in the server. We pass it to uploadImageUrl and etc functions to generate upload urls,... It should be set in the set function.
  public type?: builder.ModelType;
  public model?: builder.IModel;

  /**
   * Create a new instance of the page builder.
   */
  public static newInstance(
    options: Partial<builder.IOptions>,
    state: Partial<builder.IState> = {},
  ) {
    const core_instance = new Builder(
      Object.assign(
        {},
        BUILDER_OPTIONS,
        this.options ? this.options : {},
        options ? options : {},
      ),
      Object.assign(
        {
          isEditing: true,
          isHideExtra: false,
          isSorting: false,
          isRendered: false,
        },
        state,
      ),
    );
    // Initialize builder
    return reactive(core_instance);
  }

  constructor(options: builder.IOptions, state: builder.IState) {
    LOG("⚽ 3. Constructor > Create page builder instance", "options", options);

    // Assigned from option:
    this.title = options.title;
    this.sections = options.sections;
    this.style = options.style;
    this.css = options.css;
    this.columnsPrefix = options.columnsPrefix;
    this.server = options.server;

    // Local variables:
    this.isAnimation = false; // In animation editing mode
    this.isTracking = false; // In tracking editing mode

    this.isEditing = state.isEditing;
    this.isHideExtra = state.isHideExtra; // Hide add buttons and empty texts (Only in edit mode)
    this.isSorting = state.isSorting;
    this.isRendered = state.isRendered;

    this.components = Components;

    //----------------- Clone Style ------------------
    this.cloneStyle = false;
    this.cloneObject = null;

    if (this.isEditing && this.isRendered) {
      console.error(
        "Invalid state! isEditing and isRendered can not be true at the same time!",
      );
    }
  }

  /**
   * Options for the builder.
   */
  static options: Partial<builder.IOptions> | null = null;

  static install(app: App, options: Partial<builder.IOptions> = {}) {
    this.options = options;
    LOG("⚽ 2. Start Install...");

    initializeXComponents(app);
    //initializeSections(app, options.ignoreSections);

    //――― SVG Filters (Css filters add elements) ―――
    SvgFilters.Install();
  }

  /**
   * Creates and adds a new section to the list of sections.
   * @param {*} options
   * @param position
   */
  add(
    options: Page.ISection,
    position: number,
    force_set_new_uid: boolean = false,
  ) {
    if (DEBUG)
      console.log(
        "📐 Add section",
        options,
        "position",
        position,
        force_set_new_uid,
      );

    /* if (!this.components[options.name]) {
           throw new Error(
             `Component [<b>${options.name}</b>] not found! The section name is invalid! Maybe it's removed from the page builder.`,
           );
         }*/

    /* if (!options.schema) {
                               options.schema = this.components[options.name]?.$schema;
                               if (DEBUG) console.log("Auto assign schema.", options);
                             }*/

    /* if (!options.schema) {
                               // TODO:Remove this after migration!
                               console.error(
                                 "Schema not found for section! Maybe new version!",
                                 options,
                                 "position",
                                 position,
                               );
                             }*/
    /*
            if (options.object instanceof LModelElement) {
              console.log(
                "🪵 Load object from instance. Object is instance of LModelElement...",
                options.object,
              );
            } else {
              options.object = LUtilsLoader.JsonObjectToInstance(options.object);
              console.log(
                "🪵 Convert json to object instance -> ",
                options.object,
                type(options.object),
              );
            }*/

    const section = new Section(options, force_set_new_uid);

    if (DEBUG) console.log("📐 Add section", "section", section);

    //━━━━━━━━━━━━━━━ Apply init function ━━━━━━━━━━━━━━━
    /*  if (has_initialize && options.schema?.$init) {
                                options.schema?.$init(section.data);
                              }*/
    //━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

    if (position !== undefined) {
      this.sections.splice(position, 0, section);
      return;
    }
    this.sections.push(section);
  }

  /**
   * Finds a section with the specified uid.
   *
   * @param {String|Number} uid
   */
  find(uid: string) {
    return this.sections.find((s) => s.uid === uid);
  }

  /**
   * Removes a section with the specified id.
   * @param {String|Number} id
   */
  remove(section: Section) {
    const id = this.sections.findIndex((s) => s.uid === section.uid);
    this.sections.splice(id, 1);
    section.destroy();
  }

  /**
   * Removes a section with the specified id.
   * @param {String|Number} oldIndex
   * @param {String|Number} newIndex
   */
  sort(oldIndex: number, newIndex: number) {
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

  onClickClone(e: Event, object: Record<string, any>, keys: string[]) {
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

  onCloneCopy(object: Record<string, any>, keys: string[]) {
    if (!this.cloneStyle) return;

    this.cloneObject = {};

    keys.forEach((key: string) => {
      this.cloneObject[key] = object[key];
    });
  }

  onClonePast(object: Record<string, any>, keys: string[]) {
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
   * Set model for upload image url
   * Only use in the edit mode.
   * @param type
   * @param model
   */
  setModel(type: builder.ModelType, model?: builder.IModel) {
    this.type = type;
    this.model = model;
  }

  /**
   * Load page content from a JSON object.
   * @param content
   */
  setContent(content: Page.IContent, from_theme: boolean = false) {
    LOG("⚽ Set -----> content", content);

    content = LUtilsMigration.MigratePageContent(content);

    this.style = content.style;

    // Load fonts:
    if (content.style?.fonts) FontLoader.LoadFonts(content.style.fonts);

    this.title = content.title !== undefined ? content.title : this.title;

    // --- Reset history ---
    this.history = []; // Reset local history fot undo redo
    this.historyIndex = 0;

    if (content.sections && Array.isArray(content.sections)) {
      this.sections = content.sections
        .map((_section) => {
          //console.debug("Add section > ", section);
          /*if (!this.components[section.name]) {
                                                              console.error("Component not found", section.name);
                                                              return null;
                                                            }*/
          /*   let object = null;
             
                       if (_section.object instanceof LModelElement) {
                         console.log(
                           "🪵 Load object from instance. Object is instance of LModelElement...",
                           _section.object,
                         );
                         object = _section.object;
                       } else {
                         console.log(
                           "🪵 Load object from json. Object is not instance of LModelElement!",
                           _section.object,
                           type(_section.object),
                         );
                         object = LUtilsLoader.JsonObjectToInstance(_section.object);
                         console.log(
                           "🪵 Convert json to object instance -> ",
                           object,
                           type(object),
                         );
                       }*/

          const sectionData = {
            label: _section.label,
            uid: _section.uid,
            object: _section.object, //🪵 New Version!
          };

          return new Section(sectionData);
        })
        .filter((s) => !!s) as Section[];
    }
  }

  /**
   * Exports the builder instance to a specified output.
   * Outputs a JSON representation of the builder that can be used for rendering with the renderer component.
   */
  export() {
    // Pre save function call: (prepare some stuff in components if needed)
    /*this.sections.forEach((item) => {
      if (!item.object){
        throw new Error(`Invalid section object! Section Name: ${item.label}`);
      }
     console.log('item.object',item.object)
      if (item.object?.callBeforeSave) item.object?.callBeforeSave();
    });*/

    /*this.sections.forEach((section) => {
                          // removeBRFromSectionData(section.data);
                          Object.assign(section.data, section.removeBRFromSectionData()); // 🪱 Keep data link from component <-> v-styler <-> styler component
                        });*/

    console.log("👢 CSS Style on save ", this.style);

    return {
      title: this.title,
      sections: this.sections.map((section) => section.toJson()),
      style: this.style,
    };
  }

  //---------------------------------

  /**
   * Get the upload image url for the page builder.
   */
  getImageUploadUrl() {
    if (
      !this.server?.uploadImageUrl ||
      !isFunction(this.server.uploadImageUrl)
    ) {
      console.error(
        "Invalid uploadImageUrl function in SetupPageBuilder(...,here)!",
      );
      return;
    }
    if (!this.type || !this.model) {
      console.error(
        "Invalid type or model! You should set it in the builder.setModel() function!",
      );
      return;
    }
    return this.server.uploadImageUrl(this.type, this.model!);
  }

  /**
   * Get the upload video url for the page builder.
   */
  getVideoUploadUrl() {
    if (
      !this.server?.uploadVideoUrl ||
      !isFunction(this.server.uploadVideoUrl)
    ) {
      console.error(
        "Invalid uploadVideoUrl function in SetupPageBuilder(...,here)!",
      );
      return;
    }
    if (!this.type || !this.model) {
      console.error(
        "Invalid type or model! You should set it in the builder.setModel() function!",
      );
      return;
    }
    return this.server.uploadVideoUrl(this.type, this.model!);
  }
}



/**
 * Adds a component section to the builder and arguments it with the styler.
 */

/*function initializeSections(app: App, ignoreSections?: string[]) {
  //console.log("🔧",  "Installing components...",SectionComponents);

  SectionComponents.forEach((_component) => {
    //console.log("🔧", _component, _component?.name, "Install");

    if (ignoreSections?.includes(_component.name)) return;

    if (_component) {
      Components[_component.name] = _component;
      app.component(_component.name, _component);
    } else
      console.error(
        "🔧 A Section Component not fount in the source code of page builder! It's a build problem!,",
      );
  });

  // reset to prevent duplications.
  console.log(
    "%c♻ Selldone plugins %c: Install ☀ ☄",
    "color:#0288D1;font-weight: 800;",
    "color:#333",
  );
}*/

/**
 * Initialize especial components
 */
function initializeXComponents(app: App) {
  LUtilsComponents.XComponents.forEach((_component) => {
    if (_component) {
      app.component(_component.name, _component);
    } else
      console.error(
        "🔧 A XComponent not fount in the source code of page builder! It's a build problem!,",
      );
  });
  const components_fix: any[] = [XVariants, XCountDown, XRating];
  components_fix.forEach((_component) => {
    if (_component) {
      app.component(_component.name, _component);
    } else
      console.error(
        "🔧 A XComponent not fount in the source code of page builder! It's a build problem!,",
      );
  });
}

export default Builder;

function LOG(...text: any) {
  if (DEBUG) console.log("🪷 Core", ...text);
}
