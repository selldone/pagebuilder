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
import {XTextObject} from "@selldone/page-builder/components/x/text/XTextObject.ts";
import {XButtonsObject} from "@selldone/page-builder/components/x/buttons/XButtonsObject.ts";
import {XUploaderObject} from "@selldone/page-builder/components/x/uploader/XUploaderObject.ts";
import {XSectionObject} from "@selldone/page-builder/components/x/section/XSectionObject.ts";
import {XSectionObjectData} from "@selldone/page-builder/components/x/section/XSectionObjectData.ts";
import {XLottieObject} from "@selldone/page-builder/components/x/lottie/XLottieObject.ts";
import {XLottieObjectData} from "@selldone/page-builder/components/x/lottie/XLottieObjectData.ts";
import {XUploaderDataTypes} from "@selldone/page-builder/components/x/uploader/XUploaderObjectData.ts";
import {LModelBackground} from "@selldone/page-builder/models/background/LModelBackground.ts";
import {XSearchObject} from "@selldone/page-builder/components/x/search/XSearchObject.ts";

export class LMigrationV2Heroes {
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

    // 3. Add row:
    const row = XRowObject.MigrateOld($sectionData);
    container.addChild(row);

    // Add column 1:
    if ($sectionData.columns[0]) {
      const column_1 = XColumnObject.MigrateOld($sectionData.columns[0]);
      row.addChild(column_1);

      column_1.addChild(
        XTextObject.MigrateOld($sectionData.title, "h1", ["mb-2"]),
      );
      column_1.addChild(
        XTextObject.MigrateOld($sectionData.content, "p", ["mb-4"]),
      );

      column_1.addChild(
        XButtonsObject.MigrateOld($sectionData.btn_row, $sectionData.buttons),
      );
      // Search:
      if ($sectionData.search) {
        column_1.addChild(XSearchObject.MigrateOld($sectionData.search));
      }
    }

    // Add column 2:
    if ($sectionData.columns[1]) {
      const column_2 = XColumnObject.MigrateOld($sectionData.columns[1]);
      row.addChild(column_2);
      column_2.addChild(XUploaderObject.MigrateOld($sectionData.image));

      if ($sectionData.lottie) {
        const data_lottie = new XLottieObjectData(
          $sectionData.lottie.src,
          new XUploaderDataTypes.Setting($sectionData.lottie.setting),
        );

        new XLottieObject(
          new LModelBackground($sectionData.lottie.background),
          $sectionData.lottie.style,
          $sectionData.lottie.classes,
          null,
          data_lottie,
          null,
        );
      }

      if ($sectionData.content2) {
        column_2.addChild(
          XTextObject.MigrateOld($sectionData.content2, "p", ["my-5"]),
        );
      }
    }

    console.log("$sectionData", $sectionData, "--structure-->", section);

    return section;
  }
}
