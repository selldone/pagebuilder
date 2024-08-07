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

import brandingImage from "@selldone/page-builder/assets/images/themes/branding.jpg";
import campaignImage from "@selldone/page-builder/assets/images/themes/campaign.jpg";
import productsImage from "@selldone/page-builder/assets/images/themes/products.jpg";
import {LSectionHeroHorizontal} from "@selldone/page-builder/sections/hero/horizontal/LSectionHeroHorizontal.ts";
import {
    LSectionGalleryExpandable
} from "@selldone/page-builder/sections/gallery/expandable/LSectionGalleryExpandable.ts";
import {LSectionHeroVertical} from "@selldone/page-builder/sections/hero/vertical/LSectionHeroVertical.ts";
import {LSectionImageFeatures} from "@selldone/page-builder/sections/image/features/LSectionImageFeatures.ts";
import {LSectionImageSocials} from "@selldone/page-builder/sections/image/socials/LSectionImageSocials.ts";
import {LSectionStoreListing} from "@selldone/page-builder/sections/store/listing/LSectionStoreListing.ts";
import {LSectionTextNumbers} from "@selldone/page-builder/sections/text/numbers/LSectionTextNumbers.ts";
import {LSectionTextThreeColumns} from "@selldone/page-builder/sections/text/three-columns/LSectionTextThreeColumns.ts";
import {LSectionTextTwoColumns} from "@selldone/page-builder/sections/text/two-columns/LSectionTextTwoColumns.ts";
import {Page} from "@selldone/core-js/models";

export class RawTemplate {
  constructor(name: string, sections: any[], image: string) {
    this.name = name;
    this.sections = sections;
    this.image = image;
  }

  name: string;
  sections: any[];
  image: string;

  public static List = [
    new RawTemplate(
      "Branding",
      [
        LSectionHeroHorizontal,
        LSectionTextTwoColumns,
        LSectionTextNumbers,
        LSectionImageFeatures,
      ],
      brandingImage,
    ),

    new RawTemplate(
      "Campaign",
      [
        LSectionHeroVertical,
        LSectionTextThreeColumns,
        LSectionImageFeatures,
        LSectionImageSocials,
      ],
      campaignImage,
    ),

    new RawTemplate(
      "Products",
      [
        LSectionHeroVertical,
        LSectionStoreListing,
        LSectionTextThreeColumns,
        LSectionImageSocials,
        LSectionGalleryExpandable,
        LSectionTextTwoColumns,
      ],
      productsImage,
    ),
  ];

  public generate(): Page.IContent {
    return {
      title: `Raw Template ${this.name}`,
      sections: this.sections.map((_section_component) => {
        return {
          label: _section_component.label,
          uid: `auto_${Math.round(Math.random() * 99999999999)}`,
          object: _section_component.Seed(),
        };
      }),
    };
  }
}
