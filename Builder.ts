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
import {App, isRef, reactive, ref} from "vue";
import {Page} from "@selldone/core-js/models/shop/page/page.model";
import XVariants from "./components/x/variants/XVariants.vue";
import XCountDown from "./components/x/count-down/XCountDown.vue";
import XRating from "./components/x/rating/XRating.vue";
import {LUtilsMigration} from "./utils/migration/LUtilsMigration";
import {isFunction, isObject, isString, throttle} from "lodash-es";
import {Popup} from "@selldone/core-js/models/shop/popup/popup.model";
import {SvgFilters} from "./utils/filter/svg-filters/SvgFilters";
import {FontLoader} from "@selldone/core-js/helper/font/FontLoader";
import * as types from "./src/types/types";
import {ShopMenu} from "@selldone/core-js/models/shop/design/menu.model";
import {LUtilsComponents} from "@selldone/page-builder/utils/components/LUtilsComponents.ts";
import {LUtilsTypo} from "@selldone/page-builder/utils/typo/LUtilsTypo.ts";
import {LandingCssHelper} from "@selldone/page-builder/src/menu/left/css/LandingCssHelper.ts";
import Builder from "@selldone/page-builder/Builder.ts";
import {LModelElement} from "@selldone/page-builder/models/element/LModelElement.ts";
import {CONSOLE} from "@selldone/core-js";

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
  }

  export interface IState {
    isEditing: boolean;
    isHideExtra: boolean;
    isSorting: boolean;
    isRendered: boolean;
    showLeftMenu: boolean; // Hide side menus when styler is visible
    focusMode: boolean;
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
  public showLeftMenu: boolean;
  public focusMode: boolean;

  public cloneStyle: boolean;
  public cloneObject: LModelElement<any> | null;
  public rootEl: any;

  public history: History;
  public livestream: Livestream;
  public importer: LandingImporter;

  // Corresponding model of page in the server. We pass it to uploadImageUrl and etc functions to generate upload urls,... It should be set in the set function.
  public type?: builder.ModelType;
  public model?: builder.IModel;
  public assets?: {
    images?: { id: number; path: string; size: number }[];
    videos?: { id: number; path: string; size: number }[];
  };

  public direction: "ltr" | "rtl" | "auto" = "auto";

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
          showLeftMenu: true,
          focusMode: false,
        },
        state,
      ),
    );
    // Initialize builder
    return reactive(core_instance);
  }

  constructor(options: builder.IOptions, state: builder.IState) {
    CONSOLE.log(
      "⚽ 3. Constructor > Create page builder instance",
      "options",
      options,
    );

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
    this.showLeftMenu = state.showLeftMenu;
    this.focusMode = state.focusMode;

    this.history = new History(this);
    this.livestream = new Livestream(this);
    this.importer = new LandingImporter(this);

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
    CONSOLE.log("⚽ 2. Start Install...");

    initializeXComponents(app);

    //――― SVG Filters (Css filters add elements) ―――
    SvgFilters.Install();

    // Global inform about load components completed! We can use it in vue components by `this.$isBuilderInstalled`
    const existingProperty = app.config.globalProperties.$isBuilderInstalled;
    if (existingProperty === undefined || existingProperty === null) {
      // If $isBuilderInstalled is undefined or null, initialize it as a ref with value true
      app.config.globalProperties.$isBuilderInstalled = ref(true);
    } else if (isRef(existingProperty)) {
      // If it's already a ref, set its value to true
      existingProperty.value = true;
    } else {
      // If it's defined but not a ref, make it reactive by wrapping it in a ref
      app.config.globalProperties.$isBuilderInstalled = ref(true);
    }

    console.log("📐 Builder Installed.");
  }

  /**
   * Creates and adds a new section to the list of sections.
   * @param {*} options
   * @param position
   * @param force_set_new_uid
   */
  add(
    options: Page.ISection,
    position: number | undefined | null,
    force_set_new_uid: boolean = false,
  ) {
    CONSOLE.log(
      "📐 Add section",
      options,
      "position",
      position,
      force_set_new_uid,
    );

    //━━━━━━━━━━━━━━━ Create Section Instance ━━━━━━━━━━━━━━━
    const section = new Section(options, force_set_new_uid);

    CONSOLE.log("📐 Add section", "section", section);
    //━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

    if (position !== undefined && position !== null) {
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

  onClickClone(e: Event, object: LModelElement<any>) {
    CONSOLE.log(
      "copy Style",
      object,
      this.cloneStyle,
      this.isEditing,
      this.cloneObject,
    );

    if (!this.cloneStyle || !this.isEditing) return;

    if (this.cloneObject) {
      this.onClonePast(object);
    } else {
      this.onCloneCopy(object);
    }

    e.preventDefault();
    e.stopPropagation();
  }

  onCloneCopy(object: LModelElement<any>) {
    if (!this.cloneStyle) return;

    this.cloneObject = object;
  }

  onClonePast(object: LModelElement<any>) {
    if (!this.cloneObject) return;

    this.cloneObject.cloneAttributesTo(object);

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

  setAssets(
    images: { id: number; path: string; size: number }[],
    videos?: {
      id: number;
      path: string;
      size: number;
    }[],
  ) {
    this.assets = { images, videos };
  }

  getAssets() {
    return this.assets;
  }

  /**
   * Load page content from a JSON object.
   * @param content
   */
  private setContent(content: Page.IContent) {
    CONSOLE.log("⚽ Set -----> content", content);

    content = LUtilsMigration.MigratePageContent(content);

    function isValidFontSize(size) {
      return size && isString(size) && !size.includes("-") && size !== "0";
    }

    // ---------------------------------------*******************-------------------------------------
    // 🌼 Set style if not exist:
    if (!content.style || Array.isArray(content.style))
      content.style = { font_size: 16, bg_color: "", fonts: [] };

    if (!content.style.font_size) content.style.font_size = 16;
    if (!content.style.bg_color) content.style.bg_color = "";
    if (!content.style.bg_gradient) content.style.bg_gradient = [];
    if (!content.style.bg_size) content.style.bg_size = "cover";
    if (!content.style.bg_custom) content.style.bg_custom = null;
    if (!content.style.bg_repeat) content.style.bg_repeat = null;

    // Set initial fonts size:
    if (!isValidFontSize(content.style.h1_size))
      content.style.h1_size = LUtilsTypo.H1_SIZE_DEFAULT;
    if (!isValidFontSize(content.style.h2_size))
      content.style.h2_size = LUtilsTypo.H2_SIZE_DEFAULT;
    if (!isValidFontSize(content.style.h3_size))
      content.style.h3_size = LUtilsTypo.H3_SIZE_DEFAULT;
    if (!isValidFontSize(content.style.h4_size))
      content.style.h4_size = LUtilsTypo.H4_SIZE_DEFAULT;
    if (!isValidFontSize(content.style.h5_size))
      content.style.h5_size = LUtilsTypo.H5_SIZE_DEFAULT;
    if (!isValidFontSize(content.style.h6_size))
      content.style.h6_size = LUtilsTypo.H6_SIZE_DEFAULT;
    if (!isValidFontSize(content.style.p_size))
      content.style.p_size = LUtilsTypo.P_SIZE_DEFAULT;

    // ---------------------------------------*******************-------------------------------------

    this.style = content.style;

    // Load fonts:
    if (content.style?.fonts) FontLoader.LoadFonts(content.style.fonts);

    this.title = content.title !== undefined ? content.title : this.title;

    // --- Reset history ---
    this.history = reactive(new History(this)); // Reset local history fot undo redo

    if (content.sections && Array.isArray(content.sections)) {
      this.sections = content.sections
        .map((_section) => {
          return new Section(_section);
        })
        .filter((s) => !!s) as Section[];
    }
  }

  loadPage(params: {
    content: Page.IContent;
    css: IPageCss;
    direction: "ltr" | "rtl" | "auto";
  }) {
    console.style("<b>📐 Builder | Load Page</b>", params);

    this.setDirection(params.direction);

    this.setContent(params.content);
    this.setCss(params.css);
  }

  public setCss(css: IPageCss) {
    this.css = css; // Update builder pre compiled css

    // 🩴 Inject custom css:
    LandingCssHelper.Inject(css /*Custom Css*/, this.rootEl);
  }

  public setDirection(direction: "ltr" | "rtl" | "auto") {
    console.style("<b>📐 Builder | Set Direction</b>", direction);
    this.direction = direction ? direction : "auto";
  }

  /**
   * Exports the builder instance to a specified output.
   * Outputs a JSON representation of the builder that can be used for rendering with the renderer component.
   */
  export() {
    CONSOLE.log("Builder | Export | 👢 CSS Style on save ", this.style);

    const out = {
      title: this.title,
      sections: this.sections.map((section) => section.toJson()),
      style: this.style,
    };

    function checkHealth(content) {
      const t = this;

      function checking(obj: any) {
        for (const key of Object.keys(obj)) {
          const val = obj[key];

          if (
            !val ||
            key === "iframe" ||
            key === "html" /**@see LSectionHtml**/
          )
            continue; // Not change iframe!

          if (isString(val)) {
            // Purify if past from word:
            if (val.includes("<!" + "--")) {
              // Remove comments:
              let corrected = val.replace(/<!--.*?-->/gs, "");
              // Remove classes:
              corrected = corrected.replace(/class=".*?"/gs, "");

              /* console.error(
                                                                                            "FAULT DETECTION ->",
                                                                                            key + " -> " + val,
                                                                                            "Corrected",
                                                                                            corrected
                                                                                    );*/
              obj[key] = corrected;
            }
          } else if (Array.isArray(val)) {
            // Array:
            val.forEach((v) => {
              checking(v);
            });
          } else if (val && isObject(val)) {
            // Object:
            checking(val);
          }
        }
      }

      // Check all values:
      checking(content);
    }

    //  checkHealth(out);

    // Update content in the model:
    if (this.model) this.model.content = out;

    return out;
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
    return this.server?.uploadImageUrl(this.type, this.model!);
  }

  /**
   * Get the upload video url for the page builder.
   */
  getVideoUploadUrl() {
    if (
      !this.server?.uploadVideoUrl ||
      !isFunction(this.server?.uploadVideoUrl)
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
    return this.server?.uploadVideoUrl(this.type, this.model!);
  }

  isPage() {
    return this.type === "page";
  }

  isPopup() {
    return this.type === "popup";
  }

  isMenu() {
    return this.type === "menu";
  }
}

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

export class History {
  static MAX_HISTORY_ITEMS = 50;

  builder: Builder;
  records: any[] = [];
  index: number = 0;

  constructor(builder: Builder) {
    this.builder = builder;
    this.records = reactive([]);
    this.index = 0;

    // Throttle the save function
    this.save = throttle(this.saveNow.bind(this), 2000);
  }

  hasUndo() {
    return this.index + 1 < this.records.length;
  }

  hasRedo() {
    return this.index - 1 >= 0;
  }

  //――――――――――――――――――――――  History > Undo ――――――――――――――――――――

  undo() {
    if (this.hasUndo()) {
      this.index++;
      this.loadLocalHistory();
    }
  }

  //――――――――――――――――――――――  History > Redo ――――――――――――――――――――

  redo() {
    if (this.hasRedo()) {
      this.index--;
      this.loadLocalHistory();
    }
  }

  //――――――――――――――――――――――  History > Load ――――――――――――――――――――
  loadLocalHistory() {
    const raw_sections = JSON.parse(this.records[this.index]); // Keep only data, id , name

    // 1. Check section exist:
    const exists_sections: Section[] = [];
    raw_sections.forEach((raw: Section.ISection) => {
      // Keep real sections
      const found = this.builder.find(raw.uid);
      if (found) {
        exists_sections.push(found);
      }
    });
    CONSOLE.log("Load Local History", "1 exists", exists_sections);

    //2. Remove all:
    this.builder.sections.splice(0, this.builder.sections.length);

    // 3. Create new section:
    let index = 0;
    raw_sections.forEach((raw: Section.ISection) => {
      this.builder.add(raw, index, false);
      index++;
    });
  }

  /**
   * @callback saveLocalHistory: Callback if history saved! must index set to zero.
   */
  save: Function;

  async saveNow() {
    CONSOLE.log("📤 On Save History", "history:", this);

    // Keep only data, id , name
    const filtered = this.builder.sections.map(function (section: Section) {
      return section.toJson();
    });

    const clone = JSON.stringify(filtered).trim();
    if (
      this.records.length > this.index &&
      clone === this.records[this.index]
    ) {
      CONSOLE.log("✖️ No changes in history");
      return;
    }

    // Remove death zone:
    if (this.index > 0) {
      CONSOLE.log("Clear death zone history", this.index);
      this.records.splice(0, this.index);
    }

    this.records.unshift(clone);
    if (this.records.length > History.MAX_HISTORY_ITEMS)
      this.records.length = History.MAX_HISTORY_ITEMS;

    CONSOLE.log(
      "✚ New history item added > Items count:",
      this.records.length,
      "History",
      this.records,
      "Current Index",
      this.index,
    );

    this.index = 0;
  }
}

export class Livestream {
  builder: Builder;
  enable: boolean = false;
  /**
   * Number of sent data
   */
  count: number = 0;
  audiences: any[] = [];

  constructor(builder: Builder) {
    this.builder = builder;
    this.enable = false;
    this.count = 0;
  }

  reset() {
    this.enable = false;
    this.count = 0;
    this.audiences = [];
  }

  setEnable(enable: boolean) {
    this.enable = enable;
  }

  setCount(count: number) {
    this.count = count;
  }

  setAudiences(audiences: any[]) {
    this.audiences = audiences;
    if (this.audiences?.length > 0) this.enable = true; // Auto enable livestream!
  }

  canSend() {
    if (this.builder.type !== "page") return false; // Only for page!
    return (
      this.enable || this.count === 0
    ); /*Send first attempt! Maybe there is audience previously load the live stream page!*/
  }

  onSend() {
    this.count++;
  }
}

export class LandingImporter {
  builder: Builder;

  constructor(builder: Builder) {
    this.builder = builder;
  }

  /**
   * Lod .landing files
   * @param file
   */
  loadFile(file: File | null): Promise<void> {
    return new Promise((resolve, reject) => {
      if (!file) {
        reject(new Error("No file provided"));
        return;
      }

      const fr = new FileReader();

      fr.onload = () => {
        try {
          this.loadLanding(fr.result as string);
          resolve();
        } catch (e) {
          reject(e);
        }
      };

      fr.onerror = () => {
        reject(new Error("Cannot read file!"));
      };

      fr.readAsText(file);
    });
  }

  /**
   * Load raw text landing exported file
   * @param text
   */
  loadLanding(text: string) {
    if (!this.builder.model)
      throw new Error(
        "Model is not set! You should set it in the builder.setModel() function!",
      );

    const template = JSON.parse(text);

    if (
      !template.content ||
      !template.content.sections ||
      !Array.isArray(template.content.sections) ||
      !template.content.sections.length
    ) {
      throw new Error("Sections in the file is empty!");
    }

    // Migrate from old version:
    template.content = LUtilsMigration.MigratePageContent(template.content);

    const valid_sections = [];

    template.content.sections.forEach((section) => {
      if (section.object) {
        valid_sections.push(section);
      } else {
        console.error(`Invalid section structure detected!`, section);
      }
    });

    const page = this.builder.model as Page;
    page.content.sections = valid_sections;
    page.content.style = template.content.style;

    page.title = template.title;
    page.description = template.description;
    page.image = template.image;
    page.direction = template.direction;
    page.note = template.note;

    this.builder.loadPage(page);
    this.builder.history.save();
  }
}
