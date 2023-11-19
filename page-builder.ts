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

import Vue from "vue";
import SelldonePageBuilderCore from "./src";

import "./sections/styles/_demo.styl";
//import App from "./PageBuilder.vue";
import Uploader from "./sections/components/Uploader.vue";
import SectionHeroHorizontal from "./sections/hero/SectionHeroHorizontal.vue";
import SectionHeroVertical from "./sections/hero/SectionHeroVertical.vue";
import SectionHeroLottie from "./sections/hero/SectionHeroLottie.vue";

import Section2TextColumns from "./sections/text/Section2TextColumns.vue";
import Section3TextColumns from "./sections/text/Section3TextColumns.vue";
import Section3NumberColumns from "./sections/text/Section3NumberColumns.vue";
import SectionSingleImage from "./sections/images/SectionSingleImage.vue";
import Section3Images from "./sections/images/Section3Images.vue";
import Section3ImagesText from "./sections/images/Section3ImagesText.vue";

import SectionGalleryExpanding from "./sections/gallery/SectionGalleryExpanding.vue";
import SectionGalleryLogos from "./sections/gallery/SectionGalleryLogos.vue";

//import newsletter from './sections/forms/newsletter';
import SectionProductCategoryList from "./sections/products/SectionProductCategoryList.vue";

import SectionArticle from "./sections/article/SectionArticle.vue";
import SectionProductView from "./sections/products/SectionProductView.vue";
import SectionBlogsList from "./sections/blog/SectionBlogsList.vue";
import SectionRawHtml from "@app-page-builder/sections/basic/SectionRawHtml.vue";
import SectionSlideShow from "@app-page-builder/sections/gallery/SectionSlideShow.vue";
import SectionTwoCol from "@app-page-builder/sections/images/SectionTwoCol.vue";
import SectionThreeCol from "@app-page-builder/sections/images/SectionThreeCol.vue";
import SectionScrollView from "@app-page-builder/sections/gallery/SectionScrollView.vue";
import SectionImageTextCards from "@app-page-builder/sections/images/SectionImageTextCards.vue";
import SectionHeroSearch from "@app-page-builder/sections/hero/SectionHeroSearch.vue";
import SectionProductsCustomList from "@app-page-builder/sections/products/SectionProductsCustomList.vue";
import Newsletter from "@app-page-builder/sections/forms/Newsletter.vue";
import SectionInfinitStream from "@app-page-builder/sections/text/SectionInfiniteStream.vue";
import Router from "vue-router";
import { Store } from "vuex";

declare global {
  interface Window {
    $global_router: Router; // Important! used by styler!
    $store: Store<any>; // Important! used in page builder!
  }
}
// add the uploader to the list of sub-shops.
SelldonePageBuilderCore.mix({
  components: {
    Uploader,
  },
});

// register shops.
SelldonePageBuilderCore.component(SectionHeroHorizontal.name, SectionHeroHorizontal);
SelldonePageBuilderCore.component(SectionHeroVertical.name, SectionHeroVertical);
SelldonePageBuilderCore.component(SectionHeroLottie.name, SectionHeroLottie);
SelldonePageBuilderCore.component(SectionHeroSearch.name, SectionHeroSearch);

SelldonePageBuilderCore.component(Section2TextColumns.name, Section2TextColumns);
SelldonePageBuilderCore.component(Section3TextColumns.name, Section3TextColumns);
SelldonePageBuilderCore.component(Section3NumberColumns.name, Section3NumberColumns);
SelldonePageBuilderCore.component(SectionSingleImage.name, SectionSingleImage);
SelldonePageBuilderCore.component(Section3Images.name, Section3Images);
SelldonePageBuilderCore.component(Section3ImagesText.name, Section3ImagesText);
SelldonePageBuilderCore.component(SectionInfinitStream.name, SectionInfinitStream);

SelldonePageBuilderCore.component(SectionGalleryExpanding.name, SectionGalleryExpanding);
SelldonePageBuilderCore.component(SectionGalleryLogos.name, SectionGalleryLogos);

SelldonePageBuilderCore.component(SectionProductCategoryList.name, SectionProductCategoryList);
SelldonePageBuilderCore.component(SectionProductView.name, SectionProductView);
SelldonePageBuilderCore.component(SectionProductsCustomList.name, SectionProductsCustomList);

SelldonePageBuilderCore.component(SectionArticle.name, SectionArticle);
SelldonePageBuilderCore.component(SectionRawHtml.name, SectionRawHtml);
SelldonePageBuilderCore.component(SectionSlideShow.name, SectionSlideShow);
SelldonePageBuilderCore.component(SectionScrollView.name, SectionScrollView);

SelldonePageBuilderCore.component(Newsletter.name, Newsletter);

SelldonePageBuilderCore.component(SectionTwoCol.name, SectionTwoCol);
SelldonePageBuilderCore.component(SectionThreeCol.name, SectionThreeCol);

SelldonePageBuilderCore.component(SectionImageTextCards.name, SectionImageTextCards);

SelldonePageBuilderCore.component(SectionBlogsList.name, SectionBlogsList);

// install the builder
Vue.use(SelldonePageBuilderCore, {
  // main css file
  assets: {
    // css: "css/style.css"
  },
  // builder default themes
  themes: [
    {
      name: "Branding",
      sections: [
        SectionHeroHorizontal,
        Section2TextColumns,
        Section3NumberColumns,
        Section3Images,
      ],
      image: require("./assets/images/themes/branding.jpg"),
    },
    {
      name: "Campaign",
      sections: [
        SectionHeroVertical,
        Section3TextColumns,
        Section3Images,
        Section3ImagesText,
      ],
      image: require("./assets/images/themes/campaign.jpg"),
    },
    {
      name: "Products",
      sections: [
        SectionHeroVertical,
        SectionProductCategoryList,
        Section3TextColumns,
        Section3ImagesText,
        SectionGalleryExpanding,
        Section2TextColumns,
      ],
      image: require("./assets/images/themes/products.jpg"),
    },
  ],
});

export default SelldonePageBuilderCore;
