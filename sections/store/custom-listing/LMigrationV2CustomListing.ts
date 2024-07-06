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
import {XContainerObject} from "@selldone/page-builder/components/x/container/XContainerObject.ts";
import {XSectionObject} from "@selldone/page-builder/components/x/section/XSectionObject.ts";
import {XRowObject} from "@selldone/page-builder/components/x/row/XRowObject.ts";
import {XListingCustomObject} from "@selldone/page-builder/components/x/feeder/products/XListingCustomObject.ts";
import {isObject} from "lodash-es";

export class LMigrationV2CustomListing {
  static Migrate($sectionData: any): LModelElement<XSectionObjectData> | null {
    if (!$sectionData) {
      return null;
    }
    if (!isObject($sectionData.filter)) {
      $sectionData.filter = {};
    }

    const section = XSectionObject.MigrateOld($sectionData);

    const container = XContainerObject.MigrateOld($sectionData);
    section.addChild(container);

    const row = XRowObject.MigrateOld($sectionData);
    container.addChild(row);

    const listing = XListingCustomObject.MigrateOld($sectionData);
    row.addChild(listing);

    console.log(
      "Migrate V2 LSectionStoreCustomListing | $sectionData",
      $sectionData,
      "--structure-->",
      section,
    );

    return section;
  }
}
