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
import {XRowObject} from "@selldone/page-builder/components/x/row/XRowObject.ts";
import {XColumnObject} from "@selldone/page-builder/components/x/column/XColumnObject.ts";
import {XUploaderObject} from "@selldone/page-builder/components/x/uploader/XUploaderObject.ts";
import {XContainerObject} from "@selldone/page-builder/components/x/container/XContainerObject.ts";

export class LMigrationV2GalleryBrands {
  static Migrate($sectionData: any): LModelElement<XSectionObjectData> | null {
    if (!$sectionData) {
      return null;
    }

    // 🛠️Fix bad data structures:
    if (!$sectionData.columns) $sectionData.columns = [];

    // 1. Add section:
    const section = XSectionObject.MigrateOld($sectionData);

    // 2. Add container:
    const container = XContainerObject.MigrateOld($sectionData);
    section.addChild(container);

    const row = XRowObject.MigrateOld($sectionData);
    container.addChild(row);

    // Col A:
    const col_A = XColumnObject.Seed(12, 4, 6);
    row.addChild(col_A);
    col_A.addChild(XTextObject.MigrateOld($sectionData.title, "h2", ["mb-3"]));
    col_A.addChild(XTextObject.MigrateOld($sectionData.content, "p", []));

    // Add buttons:
    if ($sectionData.btn_row) {
      col_A.addChild(
        XButtonsObject.MigrateOld($sectionData.btn_row, $sectionData.buttons),
      );
    }

    // Col B:
    const col_B = XColumnObject.Seed(12, 8, 6);
    row.addChild(col_B);
    const col_B_row = XRowObject.MigrateOld($sectionData);
    col_B.addChild(col_B_row);

    $sectionData.columns?.forEach((col: any) => {
      {
        const small_col = XColumnObject.MigrateOld(col).addChild(
          XUploaderObject.MigrateOld(col.image),
        );

        col_B_row.addChild(small_col);
      }
    });

    console.log("$sectionData", $sectionData, "--structure-->", section);

    return section;
  }
}
