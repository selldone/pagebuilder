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
import _, {isFunction, isObject, isString} from "lodash-es";
import {Popup} from "@selldone/core-js/models/shop/popup/popup.model";
import {SvgFilters} from "./utils/filter/svg-filters/SvgFilters";
import {FontLoader} from "@selldone/core-js/helper/font/FontLoader";
import * as types from "./src/types/types";
import {ShopMenu} from "@selldone/core-js/models/shop/design/menu.model";
import {LUtilsComponents} from "@selldone/page-builder/utils/components/LUtilsComponents.ts";
import {LUtilsTypo} from "@selldone/page-builder/utils/typo/LUtilsTypo.ts";
import {LandingCssHelper} from "@selldone/page-builder/src/menu/left/css/LandingCssHelper.ts";

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
  }

  export interface IState {
    isEditing: boolean;
    isHideExtra: boolean;
    isSorting: boolean;
    isRendered: boolean;
    showLeftMenu: boolean;

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

  public cloneStyle: boolean;
  public cloneObject: any;
  public rootEl: any;

  public history: History;
  public livestream: Livestream;

  // Corresponding model of page in the server. We pass it to uploadImageUrl and etc functions to generate upload urls,... It should be set in the set function.
  public type?: builder.ModelType;
  public model?: builder.IModel;
  public assets?: {
    images?: { id: number; path: string; size: number }[];
    videos?: { id: number; path: string; size: number }[];
  };

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
    this.showLeftMenu = state.showLeftMenu;

    this.history = new History(this);
    this.livestream = new Livestream(this);

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

    //――― SVG Filters (Css filters add elements) ―――
    SvgFilters.Install();
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
    if (DEBUG)
      console.log(
        "📐 Add section",
        options,
        "position",
        position,
        force_set_new_uid,
      );

    //━━━━━━━━━━━━━━━ Create Section Instance ━━━━━━━━━━━━━━━
    const section = new Section(options, force_set_new_uid);

    if (DEBUG) console.log("📐 Add section", "section", section);
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
    LOG("⚽ Set -----> content", content);

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

  loadPage(params: { content: Page.IContent; css: IPageCss }) {
    console.style("<b>📐 Set page builder content.</b>", params);

    this.setContent(params.content);
    this.setCss(params.css);
  }

  public setCss(css: IPageCss) {
    this.css = css; // Update builder pre compiled css

    // 🩴 Inject custom css:
    LandingCssHelper.Inject(css /*Custom Css*/, this.rootEl);
  }

  /**
   * Exports the builder instance to a specified output.
   * Outputs a JSON representation of the builder that can be used for rendering with the renderer component.
   */
  export() {
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
    this.save = _.throttle(this.saveNow.bind(this), 2000);
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
    if (DEBUG) console.log("Load Local History", "1 exists", exists_sections);

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
    if (DEBUG) console.log("📤 On Save History", "history:", this);

    // Keep only data, id , name
    const filtered = this.builder.sections.map(function (section: Section) {
      return section.toJson();
    });

    const clone = JSON.stringify(filtered).trim();
    if (
      this.records.length > this.index &&
      clone === this.records[this.index]
    ) {
      if (DEBUG) console.log("✖️ No changes in history");
      return;
    }

    // Remove death zone:
    if (this.index > 0) {
      if (DEBUG) console.log("Clear death zone history", this.index);
      this.records.splice(0, this.index);
    }

    this.records.unshift(clone);
    if (this.records.length > History.MAX_HISTORY_ITEMS) this.records.length = History.MAX_HISTORY_ITEMS;

    if (DEBUG)
      console.log(
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

  canSend(){
    if(this.builder.type!=='page')return false; // Only for page!
    return this.enable || this.count===0 /*Send first attempt! Maybe there is audience previously load the live stream page!*/
  }
  onSend(){
    this.count++;
  }
}
