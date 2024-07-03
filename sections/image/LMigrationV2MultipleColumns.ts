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
import {XColumnObject} from "@selldone/page-builder/components/x/column/XColumnObject.ts";
import {XSectionObject} from "@selldone/page-builder/components/x/section/XSectionObject.ts";
import {XSectionObjectData} from "@selldone/page-builder/components/x/section/XSectionObjectData.ts";
import {XColumnImageTextObject} from "@selldone/page-builder/components/x/column-image-text/XColumnImageTextObject.ts";

export class LMigrationV2MultipleColumns {
  static Migrate($sectionData: any): LModelElement<XSectionObjectData> | null {
    if (!$sectionData) {
      return null;
    }

    // 1. Add section:
    const section = XSectionObject.MigrateOld($sectionData, null);

    // 2. Add container:
    const container = XContainerObject.MigrateOld($sectionData, null);
    section.addChild(container);

    // 3. Add row:
    const row = XRowObject.MigrateOld($sectionData);
    container.addChild(row);

    // Add column A: It should be simple column! not column with custom layout.
    const column_A = XColumnObject.MigrateOld($sectionData.columnA);
    row.addChild(column_A);

    const column_A_row = XRowObject.MigrateOld($sectionData.columnA);
    column_A.addChild(column_A_row);

    $sectionData.columnA.columns.forEach((_column: any) => {
      column_A_row.addChild(XColumnImageTextObject.MigrateOld(_column));
    });

    // Add column B: It should be simple column! not column with custom layout.
    const column_B = XColumnObject.MigrateOld($sectionData.columnB);
    row.addChild(column_B);

    const column_B_row = XRowObject.MigrateOld($sectionData.columnB);
    column_B.addChild(column_B_row);

    $sectionData.columnB.columns.forEach((_column: any) => {
      column_B_row.addChild(XColumnImageTextObject.MigrateOld(_column));
    });

    // Add column C: It should be simple column! not column with custom layout.
    if ($sectionData.columnC) {
      const column_C = XColumnObject.MigrateOld($sectionData.columnC);
      row.addChild(column_C);

      const column_C_row = XRowObject.MigrateOld($sectionData.columnC);
      column_C.addChild(column_C_row);

      $sectionData.columnC.columns.forEach((_column: any) => {
        column_C_row.addChild(XColumnImageTextObject.MigrateOld(_column));
      });
    }

    return section;
  }
}
