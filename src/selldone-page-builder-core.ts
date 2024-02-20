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
import SectionMixin from "../mixins/SectionMixin";
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
import StylerDirective from "@app-page-builder/styler/StylerDirective";
import {XUploader} from "@app-page-builder/sections/components/XUploader.vue";
import {Page} from "@core/models/shop/page/page.model";
import SectionHeroHorizontal from "@app-page-builder/sections/hero/SectionHeroHorizontal.vue";
import SectionHeroVertical from "@app-page-builder/sections/hero/SectionHeroVertical.vue";
import SectionHeroLottie from "@app-page-builder/sections/hero/SectionHeroLottie.vue";
import Section2TextColumns from "@app-page-builder/sections/text/Section2TextColumns.vue";
import Section3TextColumns from "@app-page-builder/sections/text/Section3TextColumns.vue";
import Section3NumberColumns from "@app-page-builder/sections/text/Section3NumberColumns.vue";
import SectionSingleImage from "@app-page-builder/sections/images/SectionSingleImage.vue";
import Section3Images from "@app-page-builder/sections/images/Section3Images.vue";
import Section3ImagesText from "@app-page-builder/sections/images/Section3ImagesText.vue";
import SectionInfinitStream from "@app-page-builder/sections/text/SectionInfiniteStream.vue";
import SectionGalleryExpanding from "@app-page-builder/sections/gallery/SectionGalleryExpanding.vue";
import SectionGalleryLogos from "@app-page-builder/sections/gallery/SectionGalleryLogos.vue";
import SectionProductCategoryList from "@app-page-builder/sections/products/SectionProductCategoryList.vue";
import SectionProductView from "@app-page-builder/sections/products/SectionProductView.vue";
import SectionProductsCustomList from "@app-page-builder/sections/products/SectionProductsCustomList.vue";
import SectionArticle from "@app-page-builder/sections/article/SectionArticle.vue";
import SectionRawHtml from "@app-page-builder/sections/basic/SectionRawHtml.vue";
import SectionSlideShow from "@app-page-builder/sections/gallery/SectionSlideShow.vue";
import SectionScrollView from "@app-page-builder/sections/gallery/SectionScrollView.vue";
import Newsletter from "@app-page-builder/sections/forms/Newsletter.vue";
import SectionTwoCol from "@app-page-builder/sections/images/SectionTwoCol.vue";
import SectionThreeCol from "@app-page-builder/sections/images/SectionThreeCol.vue";
import SectionImageTextCards from "@app-page-builder/sections/images/SectionImageTextCards.vue";
import SectionBlogsList from "@app-page-builder/sections/blog/SectionBlogsList.vue";
import SectionHeroSearch from "@app-page-builder/sections/hero/SectionHeroSearch.vue";
import XVariants from "@app-page-builder/components/x/variants/XVariants.vue";
import XCountDown from "@app-page-builder/components/x/count-down/XCountDown.vue";
import XRating from "@app-page-builder/components/x/rating/XRating.vue";
import {MigrateFromOldVersion} from "@app-page-builder/src/MigrateFromOldVersion";
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
    if (!options.schema) {
      options.schema = this.components[options.name]?.extends?.$schema;
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

    MigrateFromOldVersion(data);

    this.style = data.style;

    this.title = data.title !== undefined ? data.title : this.title;

    // --- Reset history ---
    this.history = []; // Reset local history fot undo redo
    this.historyIndex = 0;

    if (data.sections && Array.isArray(data.sections)) {
      this.sections = data.sections.map((section) => {
        const sectionData = {
          name: section.name,
          uid: section.uid,
          data: from_theme ? null : section.data,
          schema: this.components[section.name].extends.$schema, // We do not save schema in page json data!
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
    SectionHeroHorizontal,
    SectionHeroVertical,
    SectionHeroLottie,
    Section2TextColumns,
    Section3TextColumns,
    Section3NumberColumns,
    SectionSingleImage,
    Section3Images,
    Section3ImagesText,
    SectionInfinitStream,
    SectionGalleryExpanding,
    SectionGalleryLogos,
    SectionProductCategoryList,
    SectionProductView,
    SectionProductsCustomList,
    SectionArticle,
    SectionRawHtml,
    SectionSlideShow,
    SectionScrollView,
    Newsletter,
    SectionTwoCol,
    SectionThreeCol,
    SectionImageTextCards,
    SectionBlogsList,
    SectionHeroSearch,
  ];

  components.forEach((_component) => {
    const ExtendedComponent = defineComponent({
      extends: _component,
      directives: { styler: StylerDirective },
      mixins: [SectionMixin],
    });
    Components[_component.name] = ExtendedComponent;
    app.component(_component.name, ExtendedComponent);
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
