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
import {XTextObject} from "@selldone/page-builder/components/x/text/XTextObject.ts";
import {XButtonsObject} from "@selldone/page-builder/components/x/buttons/XButtonsObject.ts";
import {XSectionObject} from "@selldone/page-builder/components/x/section/XSectionObject.ts";
import {XSectionObjectData} from "@selldone/page-builder/components/x/section/XSectionObjectData.ts";
import {
  XGalleryExpandableObject
} from "@selldone/page-builder/components/x/gallery-expandable/XGalleryExpandableObject.ts";

export class LMigrationV2GalleryExpandable {
  static Migrate($sectionData: any): LModelElement<XSectionObjectData> | null {
    if (!$sectionData) {
      return null;
    }

    // 🛠️Fix bad data structures:
    if (!$sectionData.columns) $sectionData.columns = [];

    // 1. Add section:
    const section = XSectionObject.MigrateOld($sectionData, null);

    section.addChild(
      XTextObject.MigrateOld($sectionData.title, "h2", ["mb-5"]),
    );
    section.addChild(XTextObject.MigrateOld($sectionData.content, "p", []));

    // Add buttons:
    if ($sectionData.btn_row) {
      container.addChild(
        XButtonsObject.MigrateOld($sectionData.btn_row, $sectionData.buttons),
      );
    }

    section.addChild(XGalleryExpandableObject.MigrateOld($sectionData));

    console.log("$sectionData", $sectionData, "--structure-->", section);

    return section;
  }
}
