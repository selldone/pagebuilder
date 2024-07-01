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
import {XContainerObject} from "@selldone/page-builder/components/x/container/XContainerObject.ts";
import {XRowObject} from "@selldone/page-builder/components/x/row/XRowObject.ts";
import {XSectionObject} from "@selldone/page-builder/components/x/section/XSectionObject.ts";
import {XSectionObjectData} from "@selldone/page-builder/components/x/section/XSectionObjectData.ts";
import {XColumnImageTextObject} from "@selldone/page-builder/components/x/column-image-text/XColumnImageTextObject.ts";
import {XTextObject} from "@selldone/page-builder/components/x/text/XTextObject.ts";

export class LMigrationV2TextSections {
  static Migrate($sectionData: any): LModelElement<XSectionObjectData> | null {
    if (!$sectionData) {
      return null;
    }

    // 1. Add section:
    const section = XSectionObject.MigrateOld($sectionData, null);

    // 2. Add container:
    const container = XContainerObject.MigrateOld($sectionData, null);
    section.addChild(container);

    container.addChild(
      XTextObject.MigrateOld($sectionData.header, "h2", ["mb-5"]),
    );

    // 3. Add row:
    const row = XRowObject.MigrateOld($sectionData, null);
    container.addChild(row);

    $sectionData.columns.forEach((_column: any) => {
      row.addChild(XColumnImageTextObject.MigrateOld(_column));
    });

    return section;
  }
}
