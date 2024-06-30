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
import {LModelElementXSection} from "@selldone/page-builder/components/x/section/LModelElementXSection.ts";
import {XSectionData} from "@selldone/page-builder/components/x/section/XSectionData.ts";
import {
  LModelElementXColumnImageText
} from "@selldone/page-builder/components/x/column-image-text/LModelElementXColumnImageText.ts";
import {XTextObject} from "@selldone/page-builder/components/x/text/XTextObject.ts";
import {LModelElementXButtons} from "@selldone/page-builder/components/x/buttons/LModelElementXButtons.ts";

export class LMigrationV2NormalSections {
  static Migrate($sectionData: any): LModelElement<XSectionData> | null {
    if (!$sectionData) {
      return null;
    }

    // 1. Add section:
    const section = LModelElementXSection.MigrateOld($sectionData, null);

    // 2. Add container:
    const container = LModelElementXContainer.MigrateOld($sectionData, null);
    section.addChild(container);

    container.addChild(
      XTextObject.MigrateOld($sectionData.title, "h1", ["mb-5"]),
    );
    container.addChild(
      XTextObject.MigrateOld($sectionData.content, "p", ["mb-5"]),
    );

    // Add buttons:
    if( $sectionData.btn_row){
      container.addChild(
          LModelElementXButtons.MigrateOld(
              $sectionData.btn_row,
              $sectionData.buttons,
              null,
          ),
      );
    }


    // 3. Add row:
    const row = LModelElementXRow.MigrateOld($sectionData, null);
    container.addChild(row);

    $sectionData.columns.forEach((_column: any) => {
      row.addChild(
        LModelElementXColumnImageText.MigrateOld(_column),
      );
    });

    return section;
  }
}
