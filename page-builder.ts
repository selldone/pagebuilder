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
import Builder from "./Builder";

import "./styles/page-builder.scss";
import LSectionHeroHorizontal from "./sections/hero/horizontal/LSectionHeroHorizontal.vue";
import LSectionHeroVertical from "./sections/hero/vertical/LSectionHeroVertical.vue";

import Section2TextColumns from "./sections/text/two-columns/LSectionTextTwoColumns.vue";
import LSectionTextThreeColumns from "./sections/text/three-columns/LSectionTextThreeColumns.vue";
import LSectionTextNumbers from "./sections/text/numbers/LSectionTextNumbers.vue";
import LSectionImageFeatures from "./sections/image/features/LSectionImageFeatures.vue";
import LSectionImageSocials from "./sections/image/socials/LSectionImageSocials.vue";

import LSectionGalleryExpandable from "./sections/gallery/expandable/LSectionGalleryExpandable.vue";

import LSectionStoreListing from "./sections/store/listing/LSectionStoreListing.vue";
import {isFunction} from "lodash-es";
import {builder} from "./Builder";
import {Page} from "@selldone/core-js/models/shop/page/page.model";

import brandingImage from "./assets/images/themes/branding.jpg";
import campaignImage from "./assets/images/themes/campaign.jpg";
import productsImage from "./assets/images/themes/products.jpg";

export function SetupPageBuilder(app: App, options: Partial<builder.IOptions>) {
  console.log("⚽ 1. Setup Page builder");

  if (!options)
    throw new Error("Options are not set in the setup page builder!");

  if (options?.mode === "view") {
    // install the builder
    app.use(Builder);
  } else if (options?.mode === "edit") {
    if (!options.server) {
      throw new Error(
        "In the edit mode options should have 'server' property! Correct it in  SetupPageBuilder(...,here)",
      );
    }
    // Use the uploadImageUrl function if provided
    if (
      !options.server.uploadImageUrl ||
      !isFunction(options.server.uploadImageUrl)
    ) {
      console.error(
        "Edit mode. Invalid uploadImageUrl function in SetupPageBuilder(...,here)!",
      );
    } else {
      const test = options.server.uploadImageUrl("page", { id: 0, shop_id: 0 } as Page);
      if (!test) {
        console.error(
          "Invalid uploadImageUrl! Generated test upload image path is " + test,
        );
      }
    }

    // Use sample themes if not provided
    if (!options.themes) options.themes = SampleThemes;

    // install the builder
    app.use(Builder, options);
  } else {
    console.error(
      "Invalid page builder initial mode! Use 'edit' or 'view'!",
      options?.mode,
    );
  }
}

const SampleThemes = [
  {
    name: "Branding",
    sections: [
      LSectionHeroHorizontal,
      Section2TextColumns,
      LSectionTextNumbers,
      LSectionImageFeatures,
    ],
    image: brandingImage,
  },
  {
    name: "Campaign",
    sections: [
      LSectionHeroVertical,
      LSectionTextThreeColumns,
      LSectionImageFeatures,
      LSectionImageSocials,
    ],
    image: campaignImage,
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
    image: productsImage,
  },
];
