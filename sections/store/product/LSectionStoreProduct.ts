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
import {XProductOverviewObject} from "@selldone/page-builder/components/x/product-overview/XProductOverviewObject.ts";
import coverImage from "@selldone/page-builder/assets/images/covers/LSectionStoreProduct.svg";

export class LSectionStoreProduct {
  static group = "Products";

  static cover = coverImage;
  static label = "Product";
  static help = {
    title: "Utilize this section to showcase a product on your webpage.",
  };
  static Seed = () => {
    // Initialize section
    const section = XSectionObject.Seed();

    const product = XProductOverviewObject.Seed();
    section.addChild(product);

    return section;
  };
}
