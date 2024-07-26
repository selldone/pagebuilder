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
import {
  XColumnImageTextDataTypes
} from "@selldone/page-builder/components/x/column-image-text/XColumnImageTextObjectData.ts";

export class LMigrationV2TextSections {
  static Migrate(
    $sectionData: any,
    name:
      | "LSectionTextNumbers"
      | "LSectionTextThreeColumns"
      | "LSectionTextTwoColumns",
  ): LModelElement<XSectionObjectData> | null {
    if (!$sectionData) {
      return null;
    }

    // 1. Add section:
    const section = XSectionObject.MigrateOld($sectionData);

    // 2. Add container:
    const container = XContainerObject.MigrateOld($sectionData);
    section.addChild(container);

    container.addChild(
      XTextObject.MigrateOld($sectionData.header, "h2", ["mb-5"]),
    );

    // 3. Add row:
    const row = XRowObject.MigrateOld($sectionData);
    container.addChild(row);

    let default_layout = XColumnImageTextDataTypes.LAYOUTS.NORMAL;
    if (name === "LSectionTextNumbers") {
      default_layout = XColumnImageTextDataTypes.LAYOUTS.CONTENT_TITLE;
    }

    $sectionData.columns?.forEach((_column: any) => {
      if (!_column.layout) _column.layout = default_layout;
      const column = XColumnImageTextObject.MigrateOld(_column);
      row.addChild(column);

      if (name === "LSectionTextNumbers") {
        if (column.getContentChild()?.style) {
          column.getContentChild().style.fontSize = "3rem";
        }
      }
    });

    return section;
  }
}
