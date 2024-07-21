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

import {LSectionHeroHorizontal} from "@selldone/page-builder/sections/hero/horizontal/LSectionHeroHorizontal.ts";
import {LSectionArticle} from "@selldone/page-builder/sections/article/LSectionArticle.ts";
import {LSectionBlogList} from "@selldone/page-builder/sections/blog/list/LSectionBlogList.ts";
import {LSectionFormNewsletter} from "@selldone/page-builder/sections/form/newsletter/LSectionFormNewsletter.ts";
import {LSectionGalleryBrands} from "@selldone/page-builder/sections/gallery/brands/LSectionGalleryBrands.ts";
import {
    LSectionGalleryExpandable
} from "@selldone/page-builder/sections/gallery/expandable/LSectionGalleryExpandable.ts";
import {LSectionGalleryScroll} from "@selldone/page-builder/sections/gallery/scroll/LSectionGalleryScroll.ts";
import {LSectionGallerySwiper} from "@selldone/page-builder/sections/gallery/swiper/LSectionGallerySwiper.ts";
import {LSectionHeroLottie} from "@selldone/page-builder/sections/hero/lottie/LSectionHeroLottieSeed.ts";
import {LSectionHeroSearch} from "@selldone/page-builder/sections/hero/search/LSectionHeroSearch.ts";
import {LSectionHeroVertical} from "@selldone/page-builder/sections/hero/vertical/LSectionHeroVertical.ts";
import {LSectionHtml} from "@selldone/page-builder/sections/html/LSectionHtmlSeed.ts";
import {LSectionImageCards} from "@selldone/page-builder/sections/image/cards/LSectionImageCards.ts";
import {LSectionImageFeatures} from "@selldone/page-builder/sections/image/features/LSectionImageFeatures.ts";
import {LSectionImageIntro} from "@selldone/page-builder/sections/image/intro/LSectionImageIntro.ts";
import {LSectionImageSocials} from "@selldone/page-builder/sections/image/socials/LSectionImageSocials.ts";
import {LSectionStoreListing} from "@selldone/page-builder/sections/store/listing/LSectionStoreListing.ts";
import {LSectionStoreProduct} from "@selldone/page-builder/sections/store/product/LSectionStoreProduct.ts";
import {LSectionTextMarquee} from "@selldone/page-builder/sections/text/marquee/LSectionTextMarquee.ts";
import {LSectionTextNumbers} from "@selldone/page-builder/sections/text/numbers/LSectionTextNumbers.ts";
import {LSectionTextTwoColumns} from "@selldone/page-builder/sections/text/two-columns/LSectionTextTwoColumns.ts";
import {LSectionTextThreeColumns} from "@selldone/page-builder/sections/text/three-columns/LSectionTextThreeColumns.ts";
import {LSectionImageTwoColumns} from "@selldone/page-builder/sections/image/two-columns/LSectionImageTwoColumns.ts";
import {
    LSectionImageThreeColumns
} from "@selldone/page-builder/sections/image/three-columns/LSectionImageThreeColumns.ts";
import {
  LSectionStoreCustomListing
} from "@selldone/page-builder/sections/store/custom-listing/LSectionStoreCustomListing.ts";

export class DefaultSections {
  static List = [
    // hero:
    LSectionHeroHorizontal,
    LSectionHeroLottie,
    LSectionHeroSearch,
    LSectionHeroVertical,

    // text:
    LSectionTextTwoColumns,
    LSectionTextThreeColumns,
    LSectionTextMarquee,
    LSectionTextNumbers,

    // article:
    LSectionArticle,

    // image:
    LSectionImageCards,
    LSectionImageFeatures,
    LSectionImageIntro,
    LSectionImageSocials,
    LSectionImageTwoColumns,
    LSectionImageThreeColumns,

    // gallery:
    LSectionGalleryBrands,
    LSectionGalleryExpandable,
    LSectionGalleryScroll,
    LSectionGallerySwiper,

    // store:
    LSectionStoreListing,
    LSectionStoreProduct,
    LSectionStoreCustomListing,

    // basic:
    LSectionHtml,

    // form:
    LSectionFormNewsletter,

    //blog:
    LSectionBlogList,
  ];
}
