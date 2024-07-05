/*
 * Copyright (c) 2024. Selldone® Business OS™
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

import {Page} from "@selldone/core-js/models/shop/page/page.model";
import {LMigrationV2Heroes} from "@selldone/page-builder/sections/hero/LMigrationV2Heroes.ts";
import {LMigrationV2MultipleColumns} from "@selldone/page-builder/sections/image/LMigrationV2MultipleColumns.ts";
import {LMigrationV2NormalSections} from "@selldone/page-builder/sections/image/LMigrationV2NormalSections.ts";
import {LMigrationV2TextSections} from "@selldone/page-builder/sections/text/LMigrationV2TextSections.ts";
import {
    LMigrationV2GalleryExpandable
} from "@selldone/page-builder/sections/gallery/expandable/LMigrationV2GalleryExpandable.ts";
import {LMigrationV2GalleryBrands} from "@selldone/page-builder/sections/gallery/brands/LMigrationV2GalleryBrands.ts";
import {LMigrationV2Swiper} from "@selldone/page-builder/sections/gallery/swiper/LMigrationV2Swiper.ts";
import {LMigrationV2Scroll} from "@selldone/page-builder/sections/gallery/scroll/LMigrationV2Scroll.ts";

export class LUtilsMigration {
  public static MigratePageContent = (obj: Page.IContent) => {
    LUtilsMigration.MigrateClasses(obj);

    obj.sections?.forEach((section: any) => {
      section.name = LUtilsMigration.MigrateSectionName(section.name);
    });

    obj = LUtilsMigration.MigrateKeys(obj);

    // Migrate data to object (New hierarchy version)
    this.MigrateV1toV2(obj);

    return obj;
  };

  public static MigrateClasses(obj: any) {
    replaceStringInObject(obj, "is-samin", "bg--plate-dark-1");
    replaceStringInObject(obj, "is-red", "bg--plate-dark-2");

    replaceStringInObject(obj, "is-black", "bg--plate-dark-3");
    replaceStringInObject(obj, "is-green", "bg--plate-dark-4");
    replaceStringInObject(obj, "is-blue", "bg--plate-dark-5");
    replaceStringInObject(obj, "is-white", "bg--plate-light-6");
    replaceStringInObject(obj, "is-deep-purple", "bg--plate-dark-7");
    replaceStringInObject(obj, "is-teal", "bg--plate-dark-8");
    replaceStringInObject(obj, "is-cyan", "bg--plate-dark-9");
    replaceStringInObject(obj, "is-amber", "bg--plate-dark-10");
    replaceStringInObject(obj, "is-pink", "bg--plate-light-2");
    replaceStringInObject(obj, "is-blue-grey", "bg--plate-light-11");
    replaceStringInObject(obj, "is-transparent", "bg--plate-transparent");
  }

  public static MigrateSectionName(name: string) {
    switch (name) {
      case "SectionArticle":
        return "LSectionArticle";
      case "SectionRawHtml":
        return "LSectionHtml";
      case "SectionBlogsList":
        return "LSectionBlogList";
      case "Newsletter":
        return "LSectionFormNewsletter";
      case "Gallery1":
        return "LSectionGalleryExpandable";
      case "Gallery2":
        return "LSectionGalleryBrands";
      case "SectionScrollView":
        return "LSectionGalleryScroll";
      case "SectionSlideShow":
        return "LSectionGallerySwiper";
      case "Hero1":
        return "LSectionHeroHorizontal";
      case "hero-animate":
        return "LSectionHeroLottie";
      case "SectionHeroSearch":
        return "LSectionHeroSearch";
      case "Hero2":
        return "LSectionHeroVertical";

      case "Social3":
        return "LSectionImageFeatures";
      case "Social4":
        return "LSectionImageSocials";
      case "image-text-cards":
        return "LSectionImageCards";
      case "Social2":
        return "LSectionImageIntro";
      case "SectionThreeCol":
        return "LSectionImageThreeColumns";
      case "SectionTwoCol":
        return "LSectionImageTwoColumns";

      case "SectionProductsCustomList":
        return "LSectionStoreCustomListing";
      case "SectionProductCategoryList":
        return "LSectionStoreListing";
      case "SectionProductView":
        return "LSectionStoreProduct";

      case "infinite-stream":
        return "LSectionTextMarquee";
      case "Social1":
        return "LSectionTextNumbers";
      case "Section2":
        return "LSectionTextThreeColumns";
      case "Section1":
        return "LSectionTextTwoColumns";
    }

    return name;
  }

  public static MigrateKeys(obj: any) {
    obj = replaceKey(obj, "products_list", "filter");

    return obj;
  }

  /**
   * Migrate data to object (New hierarchy version)
   * @constructor
   * @private
   */
  private static MigrateV1toV2(obj: Page.IContent) {
    obj.sections?.forEach((section: Page.ISection) => {
      this.MigrateSectionV1toV2(section);
    });
  }

  public static MigrateSectionV1toV2(section: Page.ISection) {
    if (!section.data) return; // Skip if no data

    if (
      section.name === "LSectionHeroHorizontal" ||
      section.name === "LSectionHeroVertical" ||
      section.name === "LSectionHeroLottie" ||
      section.name === "LSectionHeroSearch"
    ) {
      section.object = LMigrationV2Heroes.Migrate(section.data);
      section.data = null;
    } else if (
      section.name === "LSectionImageTwoColumns" ||
      section.name === "LSectionImageThreeColumns"
    ) {
      section.object = LMigrationV2MultipleColumns.Migrate(section.data);
      section.data = null;
    } else if (
      section.name === "LSectionImageSocials" ||
      section.name === "LSectionImageFeatures" ||
      section.name === "LSectionImageCards" ||
      section.name === "LSectionImageIntro"
    ) {
      section.object = LMigrationV2NormalSections.Migrate(section.data);
      section.data = null;
    } else if (
      section.name === "LSectionTextNumbers" ||
      section.name === "LSectionTextThreeColumns" ||
      section.name === "LSectionTextTwoColumns"
    ) {
      section.object = LMigrationV2TextSections.Migrate(section.data);
      section.data = null;
    } else if (section.name === "LSectionGalleryExpandable") {
      section.object = LMigrationV2GalleryExpandable.Migrate(section.data);
      section.data = null;
    } else if (section.name === "LSectionGalleryBrands") {
      section.object = LMigrationV2GalleryBrands.Migrate(section.data);
      section.data = null;
    } else if (section.name === "LSectionGallerySwiper") {
      section.object = LMigrationV2Swiper.Migrate(section.data);
      section.data = null;
    }else if (section.name === "LSectionGalleryScroll") {
      section.object = LMigrationV2Scroll.Migrate(section.data);
      section.data = null;
    }




    else {
      console.error(`Migration not found for section ${section.name}`);
    }
  }
}

function replaceKey(obj: any, oldKey: string, newKey: string): any {
  if (Array.isArray(obj)) {
    // If it's an array, apply the function to each element
    return obj.map((item) => replaceKey(item, oldKey, newKey));
  } else if (typeof obj === "object" && obj !== null) {
    // If it's an object, proceed with key replacement
    const newObj: any = {};
    Object.keys(obj).forEach((key) => {
      const value = obj[key];
      // Replace the key if it matches, otherwise keep the original key
      const newKeyToUse = key === oldKey ? newKey : key;
      // Apply the function recursively for objects and arrays
      newObj[newKeyToUse] = replaceKey(value, oldKey, newKey);
    });
    return newObj;
  }
  // Return the value directly if it's neither an object nor an array
  return obj;
}

function replaceStringInObject(
  value: any,
  searchValue: string,
  replaceValue: string,
) {
  if (Array.isArray(value)) {
    value.forEach((item, index) => {
      value[index] = replaceStringInObject(item, searchValue, replaceValue);
    });
  } else if (typeof value === "object" && value !== null) {
    Object.keys(value).forEach((key) => {
      value[key] = replaceStringInObject(value[key], searchValue, replaceValue);
    });
  } else if (typeof value === "string") {
    return value.replace(new RegExp(searchValue, "g"), replaceValue);
  }
  return value;
}
