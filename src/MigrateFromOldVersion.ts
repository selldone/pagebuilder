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

export const MigrateFromOldVersion = (obj: Object) => {
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


  console.log('Migrate ',obj)
  obj.sections.forEach((section: any) => {
    section.name=migrateSectionName(section.name)
  })


  return obj;
};

function migrateSectionName(name: string) {
  switch (name) {
    case 'SectionArticle': return 'LSectionArticle';
    case 'SectionRawHtml': return 'LSectionHtml';
    case 'SectionBlogsList': return 'LSectionBlogList';
    case 'Newsletter': return 'LSectionFormNewsletter';
    case 'Gallery1': return 'LSectionGalleryExpandable';
    case 'Gallery2': return 'LSectionGalleryBrands';
    case 'SectionScrollView': return 'LSectionGalleryScroll';
    case 'SectionSlideShow': return 'LSectionGallerySwiper';
    case 'Hero1': return 'LSectionHeroHorizontal';
    case 'hero-animate': return 'LSectionHeroLottie';
    case 'SectionHeroSearch': return 'LSectionHeroSearch';
    case 'Hero2': return 'LSectionHeroVertical';

    case 'Social3': return 'LSectionImageFeatures';
    case 'Social4': return 'LSectionImageSocials';
    case 'image-text-cards': return 'LSectionImageCards';
    case 'Social2': return 'LSectionImageIntro';
    case 'SectionThreeCol': return 'LSectionImageThreeColumns';
    case 'SectionTwoCol': return 'LSectionImageTwoColumns';

    case 'SectionProductsCustomList': return 'LSectionStoreCustomListing';
    case 'SectionProductCategoryList': return 'LSectionStoreListing';
    case 'SectionProductView': return 'LSectionStoreProduct';

    case 'infinite-stream': return 'LSectionTextMarquee';
    case 'Social1': return 'LSectionTextNumbers';
    case 'Section2': return 'LSectionTextThreeColumns';
    case 'Section1': return 'LSectionTextTwoColumns';


    case 'xxxx': return 'xxxxxxxxxxxx';

  }

  return name;
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
