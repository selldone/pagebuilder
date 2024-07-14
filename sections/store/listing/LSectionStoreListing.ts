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

import {XSectionObject} from "@selldone/page-builder/components/x/section/XSectionObject.ts";
import {XContainerObject} from "@selldone/page-builder/components/x/container/XContainerObject.ts";
import {XProductsObject} from "@selldone/page-builder/components/x/products/XProductsObject.ts";
import coverImage from "@selldone/page-builder/assets/images/covers/LSectionStoreListing.svg";

export class LSectionStoreListing {
  static group = "Products";

  static cover = coverImage;
  static label = "Products & categories list";
  static help = {
    title:
      "This section displays a list of products and categories similar to your primary shop listing page. You can apply filters to showcase specific categories or products.",
  };

  static Seed = () => {
    // Initialize section
    const section = XSectionObject.Seed();
    section.classes = [];

    // Initialize container and add to section
    const container = XContainerObject.Seed();
    section.addChild(container);
    container.data.setFluid(true);

    const products = XProductsObject.Seed();
    container.addChild(products);

    return section;
  };
}
