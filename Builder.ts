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
import XColumnImageText from "@app-page-builder/components/x/column-image-text/XColumnImageText.vue";
import XRow from "@app-page-builder/components/x/row/XRow.vue";
import XColumn from "@app-page-builder/components/x/column/XColumn.vue";
import XSection from "@app-page-builder/components/x/section/XSection.vue";
import XContainer from "@app-page-builder/components/x/container/XContainer.vue";
import XButtons from "@app-page-builder/components/x/buttons/XButtons.vue";
import XCustomProductsList from "@app-page-builder/components/x/products-list/XCustomProductsList.vue";
import {Page} from "@core/models/shop/page/page.model";
import LSectionHeroHorizontal from "@app-page-builder/sections/hero/horizontal/LSectionHeroHorizontal.vue";
import LSectionHeroVertical from "@app-page-builder/sections/hero/vertical/LSectionHeroVertical.vue";
import LSectionHeroLottie from "@app-page-builder/sections/hero/lottie/LSectionHeroLottie.vue";
import Section2TextColumns from "@app-page-builder/sections/text/two-columns/LSectionTextTwoColumns.vue";
import LSectionTextThreeColumns from "@app-page-builder/sections/text/three-columns/LSectionTextThreeColumns.vue";
import LSectionTextNumbers from "@app-page-builder/sections/text/numbers/LSectionTextNumbers.vue";
import LSectionImageIntro from "@app-page-builder/sections/image/intro/LSectionImageIntro.vue";
import LSectionImageFeatures from "@app-page-builder/sections/image/features/LSectionImageFeatures.vue";
import LSectionImageSocials from "@app-page-builder/sections/image/socials/LSectionImageSocials.vue";
import LSectionTextMarquee from "@app-page-builder/sections/text/marquee/LSectionTextMarquee.vue";
import LSectionGalleryExpandable from "@app-page-builder/sections/gallery/expandable/LSectionGalleryExpandable.vue";
import LSectionGalleryBrands from "@app-page-builder/sections/gallery/brands/LSectionGalleryBrands.vue";
import LSectionStoreListing from "@app-page-builder/sections/store/listing/LSectionStoreListing.vue";
import LSectionStoreProduct from "@app-page-builder/sections/store/product/LSectionStoreProduct.vue";
import LSectionStoreCustomListing from "@app-page-builder/sections/store/custom-listing/LSectionStoreCustomListing.vue";
import LSectionArticle from "@app-page-builder/sections/article/LSectionArticle.vue";
import LSectionHtml from "@app-page-builder/sections/html/LSectionHtml.vue";
import LSectionGallerySwiper from "@app-page-builder/sections/gallery/swiper/LSectionGallerySwiper.vue";
import LSectionGalleryScroll from "@app-page-builder/sections/gallery/scroll/LSectionGalleryScroll.vue";
import LSectionFormNewsletter from "@app-page-builder/sections/form/newsletter/LSectionFormNewsletter.vue";
import LSectionImageTwoColumns from "@app-page-builder/sections/image/two-columns/LSectionImageTwoColumns.vue";
import LSectionImageThreeColumns from "@app-page-builder/sections/image/three-columns/LSectionImageThreeColumns.vue";
import LSectionImageCards from "@app-page-builder/sections/image/cards/LSectionImageCards.vue";
import LSectionBlogList from "@app-page-builder/sections/blog/list/LSectionBlogList.vue";
import LSectionHeroSearch from "@app-page-builder/sections/hero/search/LSectionHeroSearch.vue";
import XVariants from "@app-page-builder/components/x/variants/XVariants.vue";
import XCountDown from "@app-page-builder/components/x/count-down/XCountDown.vue";
import XRating from "@app-page-builder/components/x/rating/XRating.vue";
import {LUtilsMigration} from "@app-page-builder/utils/migration/LUtilsMigration";
import {isFunction, isObject} from "lodash-es";
import {Popup} from "@core/models/shop/popup/popup.model";
import {SvgFilters} from "@app-page-builder/utils/filter/svg-filters/SvgFilters";
import {FontLoader} from "@core/helper/font/FontLoader";

const DEBUG = true;

export namespace builder {
  export interface IOptions {
    mode: Mode;
    themes: any[];

    title: string;
    sections: Section[];
    style: any;
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
  themes: [],

  title: "",
  sections: [],
  style: {},
  columnsPrefix: {
    mobile: "v-col-",
    tablet: "v-col-sm-",
    desktop: "v-col-md-",
    widescreen: "v-col-lg-",
    ultrawide: "v-col-xl-",
  },
};

class Builder {
  // Assigned from options:
  public title: string;
  public sections: Section[];
  public style: any;
  public columnsPrefix: any;
  public themes: any[];
  public server: builder.IServer | undefined | null;

  // Local variables:
  public isAnimation: boolean;
  public isTracking: boolean;
  public isEditing: boolean;
  public isHideExtra: boolean;
  public isSorting: boolean;
  public isRendered: boolean;
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
    this.columnsPrefix = options.columnsPrefix;
    this.themes = options.themes;
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
    initializeSections(app);

    //――― SVG Filters (Css filters add elements) ―――
    SvgFilters.Install();
  }

  /**
   * Creates and adds a new section to the list of sections.
   * @param {*} options
   * @param position
   * @param has_initialize  Call $init in schema (prevent change on past section or drop pre built sections)
   */
  add(
    options: Section.IOptions,
    position: number,
    has_initialize: boolean = false,
    force_set_new_uid: boolean = false,
  ) {
    if (DEBUG)
      console.log(
        "📐 Add section",
        options,
        "position",
        position,
        has_initialize,
        force_set_new_uid,
      );

    options.name = LUtilsMigration.MigrateSectionName(options.name);
    if (!this.components[options.name]) {
      throw new Error(
        `Component [<b>${options.name}</b>] not found! The section name is invalid! Maybe it's removed from the page builder.`,
      );
    }

    if (!options.schema) {
      options.schema = this.components[options.name]?.$schema;
      if (DEBUG) console.log("Auto assign schema.", options);
    }

    if (!options.schema) {
      console.error(
        "Schema not found for section",
        options,
        "position",
        position,
      );
      return;
    }
    const section = new Section(options, force_set_new_uid);

    if (DEBUG) console.log("📐 Add section", "section", section);

    //━━━━━━━━━━━━━━━ Apply init function ━━━━━━━━━━━━━━━
    if (has_initialize && options.schema?.$init) {
      options.schema?.$init(section.data);
    }
    //━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

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
  find(id: string) {
    return this.sections.find((s) => s.uid === id);
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
   * @param data
   */
  setContent(data: Page.IContent, from_theme: boolean = false) {
    LOG("⚽ Set -----> data", data);

    data = LUtilsMigration.MigratePageContent(data);

    this.style = data.style;

    // Load fonts:
    if (data.style?.fonts) FontLoader.LoadFonts(data.style.fonts);

    this.title = data.title !== undefined ? data.title : this.title;

    // --- Reset history ---
    this.history = []; // Reset local history fot undo redo
    this.historyIndex = 0;

    if (data.sections && Array.isArray(data.sections)) {
      this.sections = data.sections
        .map((section) => {
          console.debug("Add section > ", section);
          if (!this.components[section.name]) {
            console.error("Component not found", section.name);
            return null;
          }

          const sectionData = {
            name: section.name,
            uid: section.uid,
            data: from_theme ? null : section.data,
            schema: this.components[section.name]?.$schema, // We do not save schema in page json data!
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
    this.sections.forEach((item) => {
      if (item.schema.onPreSave) item.schema.onPreSave(item);
      console.log("📐 Convert to json.");
    });

    this.sections.forEach((section) => {
      // removeBRFromSectionData(section.data);
      Object.assign(section.data, section.removeBRFromSectionData()); // 🪱 Keep data link from component <-> v-styler <-> styler component
    });

    console.log("👢 Style on save ", this.style);
    return {
      title: this.title,
      sections: this.sections.map((s) => ({
        uid: s.uid, // New unique id saved in backend. Previous id was added to data.id
        name: s.name,
        data: s.data,
      })),
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

const SectionComponents: any[] = [
  LSectionHeroHorizontal,
  LSectionHeroVertical,
  LSectionHeroLottie,
  Section2TextColumns,
  LSectionTextThreeColumns,
  LSectionTextNumbers,
  LSectionImageIntro,
  LSectionImageFeatures,
  LSectionImageSocials,
  LSectionTextMarquee,
  LSectionGalleryExpandable,
  LSectionGalleryBrands,
  LSectionStoreListing,
  LSectionStoreProduct,
  LSectionStoreCustomListing,
  LSectionArticle,
  LSectionHtml,
  LSectionGallerySwiper,
  LSectionGalleryScroll,
  LSectionFormNewsletter,
  LSectionImageTwoColumns,
  LSectionImageThreeColumns,
  LSectionImageCards,
  LSectionBlogList,
  LSectionHeroSearch,
];

/**
 * Adds a component section to the builder and arguments it with the styler.
 */
function initializeSections(app: App) {
  SectionComponents.forEach((_component) => {
    // console.log("🔧", _component, _component?.name, "Install");

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
}

const XComponents: any[] = [
  XColumnImageText,
  XRow,
  XColumn,
  XSection,
  XContainer,
  XButtons,
  XCustomProductsList,
];

/**
 * Initialize especial components
 */
function initializeXComponents(app: App) {
  XComponents.forEach((_component) => {
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
