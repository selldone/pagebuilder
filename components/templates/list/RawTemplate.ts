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
import LSectionHeroHorizontal from "@selldone/page-builder/sections/hero/horizontal/LSectionHeroHorizontal.vue";
import Section2TextColumns from "@selldone/page-builder/sections/text/two-columns/LSectionTextTwoColumns.vue";
import LSectionTextNumbers from "@selldone/page-builder/sections/text/numbers/LSectionTextNumbers.vue";
import LSectionImageFeatures from "@selldone/page-builder/sections/image/features/LSectionImageFeatures.vue";
import LSectionHeroVertical from "@selldone/page-builder/sections/hero/vertical/LSectionHeroVertical.vue";
import LSectionTextThreeColumns from "@selldone/page-builder/sections/text/three-columns/LSectionTextThreeColumns.vue";
import LSectionImageSocials from "@selldone/page-builder/sections/image/socials/LSectionImageSocials.vue";
import LSectionStoreListing from "@selldone/page-builder/sections/store/listing/LSectionStoreListing.vue";
import LSectionGalleryExpandable
    from "@selldone/page-builder/sections/gallery/expandable/LSectionGalleryExpandable.vue";
import {LUtilsSeeder} from "@selldone/page-builder/utils/seeder/LUtilsSeeder.ts";

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
        Section2TextColumns,
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
        Section2TextColumns,
      ],
      productsImage,
    ),
  ];

  public generate() {
    return {
      title: `Raw Template ${this.name}`,
      sections: this.sections.map((_section_component) => {
        return {
          name: _section_component.name,
          uid: `auto_${Math.round(Math.random() * 99999999999)}`,
          object: LUtilsSeeder.SeedNew(_section_component.name),
        };
      }),
    };
  }
}
