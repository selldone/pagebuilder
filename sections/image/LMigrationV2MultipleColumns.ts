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
import {LModelElementXContainer} from "@selldone/page-builder/components/x/container/LModelElementXContainer.ts";
import {LModelElementXRow} from "@selldone/page-builder/components/x/row/LModelElementXRow.ts";
import {LModelElementXColumn} from "@selldone/page-builder/components/x/column/LModelElementXColumn.ts";
import {LModelElementXSection} from "@selldone/page-builder/components/x/section/LModelElementXSection.ts";
import {XSectionData} from "@selldone/page-builder/components/x/section/XSectionData.ts";
import {
    LModelElementXColumnImageText
} from "@selldone/page-builder/components/x/column-image-text/LModelElementXColumnImageText.ts";

export class LMigrationV2MultipleColumns {
  static Migrate($sectionData: any): LModelElement<XSectionData> | null {
    if (!$sectionData) {
      return null;
    }

    // 1. Add section:
    const section = LModelElementXSection.MigrateOld($sectionData, null);

    // 2. Add container:
    const container = LModelElementXContainer.MigrateOld($sectionData, null);
    section.addChild(container);

    // 3. Add row:
    const row = LModelElementXRow.MigrateOld($sectionData, null);
    container.addChild(row);

    // Add column A:
    const column_A = LModelElementXColumn.MigrateOld(
      $sectionData.columnA,
      null,
    );
    row.addChild(column_A);

    const column_A_row = LModelElementXRow.MigrateOld(
      $sectionData.columnA,
      null,
    );
    column_A.addChild(column_A_row);

    $sectionData.columnA.columns.forEach((_column: any) => {
      column_A_row.addChild(LModelElementXColumnImageText.MigrateOld(_column));
    });

    // Add column B:
    const column_B = LModelElementXColumn.MigrateOld(
      $sectionData.columnB,
      null,
    );
    row.addChild(column_B);

    const column_B_row = LModelElementXRow.MigrateOld(
      $sectionData.columnB,
      null,
    );
    column_B.addChild(column_B_row);

    $sectionData.columnB.columns.forEach((_column: any) => {
      column_B_row.addChild(LModelElementXColumnImageText.MigrateOld(_column));
    });

    // Add column C:
    if ($sectionData.columnC) {
      const column_C = LModelElementXColumn.MigrateOld(
        $sectionData.columnC,
        null,
      );
      row.addChild(column_C);

      const column_C_row = LModelElementXRow.MigrateOld(
        $sectionData.columnC,
        null,
      );
      column_C.addChild(column_C_row);

      $sectionData.columnC.columns.forEach((_column: any) => {
        column_C_row.addChild(
          LModelElementXColumnImageText.MigrateOld(_column),
        );
      });
    }

    return section;
  }
}
