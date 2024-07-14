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
import {XRowObject} from "@selldone/page-builder/components/x/row/XRowObject.ts";
import {XFeederProductsObject} from "@selldone/page-builder/components/x/feeder/products/XFeederProductsObject.ts";
import coverImage from "@selldone/page-builder/assets/images/covers/products-list-custom.svg";

export class LMigrationV2CustomListing {
  static group = "Products";

  static cover = coverImage;
  static label = "Custom products listing";
  static help = {
    title:
      "This section displays products and categories using customized HTML code. You can apply filters to showcase specific categories or products. Additionally, you can incorporate dynamic values within the HTML template codes.",
  };

  static Seed = () => {
    // Initialize section
    const section = XSectionObject.Seed();
    section.classes = [];

    // Initialize container and add to section
    const container = XContainerObject.Seed();
    section.addChild(container);

    const row = XRowObject.Seed();
    container.addChild(row);
    row.data.setAlign("stretch").setJustify("center");

    const listing = XFeederProductsObject.Seed();
    row.addChild(listing);

    return section;
  };
}
