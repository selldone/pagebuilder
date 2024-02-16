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

import {App} from "vue";
import SelldonePageBuilderCore from "./src";

import "./sections/styles/_demo.styl";
import SectionHeroHorizontal from "./sections/hero/SectionHeroHorizontal.vue";
import SectionHeroVertical from "./sections/hero/SectionHeroVertical.vue";

import Section2TextColumns from "./sections/text/Section2TextColumns.vue";
import Section3TextColumns from "./sections/text/Section3TextColumns.vue";
import Section3NumberColumns from "./sections/text/Section3NumberColumns.vue";
import Section3Images from "./sections/images/Section3Images.vue";
import Section3ImagesText from "./sections/images/Section3ImagesText.vue";

import SectionGalleryExpanding from "./sections/gallery/SectionGalleryExpanding.vue";

//import newsletter from './sections/forms/newsletter';
import SectionProductCategoryList from "./sections/products/SectionProductCategoryList.vue";
import Router from "vue-router";
import {Store} from "vuex";

declare global {
  interface Window {
    $global_router: Router; // Important! used by styler!
    $store: Store<any>; // Important! used in page builder!
  }
}

// add the uploader to the list of sub-shops.
/****SelldonePageBuilderCore.mix({
 components: {
 Uploader,
 },
 });*/

// register shops.

export function SetupPageBuilder(app: App) {
  console.log("⚽ 1. Setup Page builder");
  // install the builder
  app.use(SelldonePageBuilderCore, {

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
}
