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
import XColumnImageText from "./components/x/column-image-text/XColumnImageText.vue";
import XRow from "./components/x/row/XRow.vue";
import XColumn from "./components/x/column/XColumn.vue";
import XSection from "./components/x/section/XSection.vue";
import XContainer from "./components/x/container/XContainer.vue";
import XButtons from "./components/x/buttons/XButtons.vue";
import XFeederProducts from "./components/x/feeder/products/XFeederProducts.vue";
import {Page} from "@selldone/core-js/models/shop/page/page.model";
import LSectionHeroHorizontal from "./sections/hero/horizontal/LSectionHeroHorizontal.vue";
import LSectionHeroVertical from "./sections/hero/vertical/LSectionHeroVertical.vue";
import LSectionHeroLottie from "./sections/hero/lottie/LSectionHeroLottie.vue";
import Section2TextColumns from "./sections/text/two-columns/LSectionTextTwoColumns.vue";
import LSectionTextThreeColumns from "./sections/text/three-columns/LSectionTextThreeColumns.vue";
import LSectionTextNumbers from "./sections/text/numbers/LSectionTextNumbers.vue";
import LSectionImageIntro from "./sections/image/intro/LSectionImageIntro.vue";
import LSectionImageFeatures from "./sections/image/features/LSectionImageFeatures.vue";
import LSectionImageSocials from "./sections/image/socials/LSectionImageSocials.vue";
import LSectionTextMarquee from "./sections/text/marquee/LSectionTextMarquee.vue";
import LSectionGalleryExpandable from "./sections/gallery/expandable/LSectionGalleryExpandable.vue";
import LSectionGalleryBrands from "./sections/gallery/brands/LSectionGalleryBrands.vue";
import LSectionStoreListing from "./sections/store/listing/LSectionStoreListing.vue";
import LSectionStoreProduct from "./sections/store/product/LSectionStoreProduct.vue";
import LSectionStoreCustomListing from "./sections/store/custom-listing/LSectionStoreCustomListing.vue";
import LSectionArticle from "./sections/article/LSectionArticle.vue";
import LSectionHtml from "./sections/html/LSectionHtml.vue";
import LSectionGallerySwiper from "./sections/gallery/swiper/LSectionGallerySwiper.vue";
import LSectionGalleryScroll from "./sections/gallery/scroll/LSectionGalleryScroll.vue";
import LSectionFormNewsletter from "./sections/form/newsletter/LSectionFormNewsletter.vue";
import LSectionImageTwoColumns from "./sections/image/two-columns/LSectionImageTwoColumns.vue";
import LSectionImageThreeColumns from "./sections/image/three-columns/LSectionImageThreeColumns.vue";
import LSectionImageCards from "./sections/image/cards/LSectionImageCards.vue";
import LSectionBlogList from "./sections/blog/list/LSectionBlogList.vue";
import LSectionHeroSearch from "./sections/hero/search/LSectionHeroSearch.vue";
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
import XText from "@selldone/page-builder/components/x/text/XText.vue";
import XUploader from "@selldone/page-builder/components/x/uploader/XUploader.vue";
import XButton from "@selldone/page-builder/components/x/button/XButton.vue";
import XProduct from "@selldone/page-builder/components/x/product/XProduct.vue";
import XCollection from "@selldone/page-builder/components/x/collection/XCollection.vue";
import XLottie from "@selldone/page-builder/components/x/lottie/XLottie.vue";
import XSearch from "@selldone/page-builder/components/x/search/XSearch.vue";
import XMarquee from "@selldone/page-builder/components/x/marquee/XMarquee.vue";
import XGalleryExpandable from "@selldone/page-builder/components/x/gallery-expandable/XGalleryExpandable.vue";
import XGalleryExpandableItem
  from "@selldone/page-builder/components/x/gallery-expandable/item/XGalleryExpandableItem.vue";
import XDiv from "@selldone/page-builder/components/x/div/XDiv.vue";
import XSwiper from "@selldone/page-builder/components/x/swiper/XSwiper.vue";
import XVideoBackground from "@selldone/page-builder/components/x/video-background/XVideoBackground.vue";
import XArticle from "@selldone/page-builder/components/x/article/XArticle.vue";
import XProducts from "@selldone/page-builder/components/x/products/XProducts.vue";
import XCode from "@selldone/page-builder/components/x/code/XCode.vue";
import XProductOverview from "@selldone/page-builder/components/x/product-overview/XProductOverview.vue";

const DEBUG = false;

export namespace builder {
  export interface IOptions {
    mode: Mode;
    themes: any[];

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
  themes: [],

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
    this.css = options.css;
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
    initializeSections(app, options.ignoreSections);

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
    options: Page.ISection,
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
        .map((section) => {
          //console.debug("Add section > ", section);
          if (!this.components[section.name]) {
            console.error("Component not found", section.name);
            return null;
          }

          const sectionData = {
            name: section.name,
            uid: section.uid,
            data: from_theme ? null : section.data, // TODO: Deduplicated OLD!
            // schema: this.components[section.name]?.$schema, // We do not save schema in page json data!
            object: section.object, //🪵 New Version!
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
      if (item.object.callBeforeSave) item.object.callBeforeSave();
      console.log("📐 Convert to json.");
    });

    /*this.sections.forEach((section) => {
      // removeBRFromSectionData(section.data);
      Object.assign(section.data, section.removeBRFromSectionData()); // 🪱 Keep data link from component <-> v-styler <-> styler component
    });*/

    console.log("👢 CSS Style on save ", this.style);

    return {
      title: this.title,
      sections: this.sections.map((s) => ({
        uid: s.uid, // New unique id saved in backend. Previous id was added to data.id
        name: s.name,
        data: s.data, // Should be removed after migration (if we have s.object)
        object: s.object,
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
function initializeSections(app: App, ignoreSections?: string[]) {
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
}

const XComponents: any[] = [
  XColumnImageText,
  XRow,
  XColumn,
  XSection,
  XContainer,
  XButtons,
  XFeederProducts,
  XText,
  XUploader,
  XButton,
  XProduct,
  XCollection,
  XLottie,
  XSearch,
  XMarquee,
  XGalleryExpandable,
  XGalleryExpandableItem,
  XDiv,
  XSwiper,
  XVideoBackground,
  XArticle,
  XProducts,
  XCode,
  XProductOverview,
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
