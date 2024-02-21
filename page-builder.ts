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

import "./sections/styles/_demo.scss";
import LSectionHeroHorizontal from "./sections/hero/horizontal/LSectionHeroHorizontal.vue";
import LSectionHeroVertical from "./sections/hero/vertical/LSectionHeroVertical.vue";

import Section2TextColumns from "./sections/text/two-columns/LSectionTextTwoColumns.vue";
import LSectionTextThreeColumns from "./sections/text/three-columns/LSectionTextThreeColumns.vue";
import LSectionTextNumbers from "./sections/text/numbers/LSectionTextNumbers.vue";
import LSectionImageFeatures from "@app-page-builder/sections/image/features/LSectionImageFeatures.vue";
import LSectionImageSocials from "@app-page-builder/sections/image/socials/LSectionImageSocials.vue";

import LSectionGalleryExpandable from "./sections/gallery/expandable/LSectionGalleryExpandable.vue";

//import newsletter from './sections/forms/newsletter';
import LSectionStoreListing from "./sections/store/listing/LSectionStoreListing.vue";
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
          LSectionHeroHorizontal,
          Section2TextColumns,
          LSectionTextNumbers,
          LSectionImageFeatures,
        ],
        image: require("./assets/images/themes/branding.jpg"),
      },
      {
        name: "Campaign",
        sections: [
          LSectionHeroVertical,
          LSectionTextThreeColumns,
          LSectionImageFeatures,
          LSectionImageSocials,
        ],
        image: require("./assets/images/themes/campaign.jpg"),
      },
      {
        name: "Products",
        sections: [
          LSectionHeroVertical,
          LSectionStoreListing,
          LSectionTextThreeColumns,
          LSectionImageSocials,
          LSectionGalleryExpandable,
          Section2TextColumns,
        ],
        image: require("./assets/images/themes/products.jpg"),
      },
    ],
  });
}
