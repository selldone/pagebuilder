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

import {LModelElement} from "@selldone/page-builder/models/element/LModelElement.ts";
import {XSectionObjectData} from "@selldone/page-builder/components/x/section/XSectionObjectData.ts";
import {XSectionObject} from "@selldone/page-builder/components/x/section/XSectionObject.ts";
import {XProductOverviewObject} from "@selldone/page-builder/components/x/product-overview/XProductOverviewObject.ts";
import {isObject} from "lodash-es";
import {CONSOLE} from "@selldone/core-js/helper";

export class LMigrationV2StoreProduct {
  static Migrate($sectionData: any): LModelElement<XSectionObjectData> | null {
    if (!$sectionData) {
      return null;
    }

    // Auto fix issues:
    if (
      !$sectionData.product_info ||
      !isObject($sectionData.product_info) ||
      Array.isArray($sectionData.product_info)
    )
      $sectionData.product_info = {};

    const section = XSectionObject.MigrateOld($sectionData);

    const product = XProductOverviewObject.MigrateOld($sectionData);
    section.addChild(product);

    CONSOLE.log(
      "Migrate V2 LSectionStoreProduct | $sectionData",
      $sectionData,
      "--structure-->",
      section,
    );

    return section;
  }
}
