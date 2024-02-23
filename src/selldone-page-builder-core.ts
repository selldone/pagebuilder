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

import {Section} from "./section";
import SPageEditor from "./editor/SPageEditor.vue";
import SPageRender from "../SPageRender.vue";
import {removeBRFromSectionData} from "./util";
import SPageRenderPopup from "../SPageRenderPopup.vue";
import {App, defineComponent, provide, reactive} from "vue";
import XColumnImageText from "@app-page-builder/sections/components/XColumnImageText.vue";
import XRow from "@app-page-builder/sections/components/XRow.vue";
import XColumn from "@app-page-builder/sections/components/XColumn.vue";
import XSection from "@app-page-builder/sections/components/XSection.vue";
import XContainer from "@app-page-builder/sections/components/XContainer.vue";
import XButtons from "@app-page-builder/sections/components/XButtons.vue";
import XCustomProductsList from "@app-page-builder/sections/components/XCustomProductsList.vue";
import initDataAttributeDirective from "@app-page-builder/directives/initDataAttributeDirective";
import {XUploader} from "@app-page-builder/sections/components/XUploader.vue";
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
import {Migration} from "@app-page-builder/src/MigrateFromOldVersion";
import {isObject} from "lodash-es";

const DEBUG = false;

export namespace Landing {
  export interface IBuilderOptions {
    title: string;
    intro: boolean;
    sections: Section[];
    style: any;
    columnsPrefix: {
      mobile: string;
      tablet: string;
      desktop: string;
      widescreen: string;
      ultrawide: string;
    };
    themes: any[];
  }
}

export const Components: Record<string, any> = {};

/**
 * Default options for the builder.
 */
const BUILDER_OPTIONS: Landing.IBuilderOptions = {
  title: "",
  intro: true,
  sections: [],
  style: {},
  themes: [],
  columnsPrefix: {
    mobile: "v-col-",
    tablet: "v-col-sm-",
    desktop: "v-col-md-",
    widescreen: "v-col-lg-",
    ultrawide: "v-col-xl-",
  },
};

// To tell if it is installed or not
let _Vue: App | null = null;

class SelldonePageBuilderCore {
  static install(app: App, options: Partial<Landing.IBuilderOptions> = {}) {
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

    app.component(XUploader.name, XUploader);

    _Vue = app;

    initializeSections(app);
    initializeXComponents(app);

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
    options: Partial<Landing.IBuilderOptions>,
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
  public components: Record<string, any>;
  public cloneStyle: boolean;
  public cloneObject: any;
  public rootEl: any;

  public history: string[] = [];
  public historyIndex: number = 0;

  constructor(options: Landing.IBuilderOptions) {
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
    this.components = Components;

    //----------------- Clone Style ------------------
    this.cloneStyle = false;
    this.cloneObject = null;
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

    options.name = Migration.MigrateSectionName(options.name);
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
   * Load page content from a JSON object.
   * @param data
   */
  set(data: Page.IContent, from_theme: boolean = false) {
    LOG("⚽ Set -----> data", data);

    data = Migration.MigratePageContent(data);

    this.style = data.style;

    this.title = data.title !== undefined ? data.title : this.title;

    // --- Reset history ---
    this.history = []; // Reset local history fot undo redo
    this.historyIndex = 0;

    if (data.sections && Array.isArray(data.sections)) {
      this.sections = data.sections.map((section) => {

        if(!this.components[section.name]){
          console.error("Component not found", section.name, this.components[section.name])
        }


        const sectionData = {
          name: section.name,
          uid: section.uid,
          data: from_theme ? null : section.data,
          schema: this.components[section.name].$schema, // We do not save schema in page json data!
        };

        return new Section(sectionData);
      });
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
      Object.assign(section.data, removeBRFromSectionData(section.data)); // 🪱 Keep data link from component <-> v-styler <-> styler component
    });

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
}

/**
 * Adds a component section to the builder and arguments it with the styler.
 */
function initializeSections(app: App) {
  const components: any[] = [
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

  components.forEach((_component) => {
    Components[_component.name] = _component;
    app.component(_component.name, _component);
  });

  // reset to prevent duplications.
  console.log(
    "%c♻ Selldone plugins %c: Install ☀ ☄",
    "color:#0288D1;font-weight: 800;",
    "color:#333",
  );
}

/**
 * Initialize especial components
 */
function initializeXComponents(app: App) {
  const components: any[] = [
    XColumnImageText,
    XRow,
    XColumn,
    XSection,
    XContainer,
    XButtons,
    XCustomProductsList,
  ];

  components.forEach((_component) => {
    app.component(_component.name, _component);
  });
  const components_fix: any[] = [XVariants, XCountDown, XRating];
  components_fix.forEach((_component) => {
    app.component(_component.name, _component);
  });
}

export default SelldonePageBuilderCore;

function LOG(...text: any) {
  if (DEBUG) console.log("🪷 Core", ...text);
}
