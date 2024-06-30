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
import {LModelElementXText} from "@selldone/page-builder/components/x/text/LModelElementXText.ts";
import {LModelElementXButtons} from "@selldone/page-builder/components/x/buttons/LModelElementXButtons.ts";
import {LModelElementXUploader} from "@selldone/page-builder/components/x/uploader/LModelElementXUploader.ts";
import {LModelElementXSection} from "@selldone/page-builder/components/x/section/LModelElementXSection.ts";
import {XSectionData} from "@selldone/page-builder/components/x/section/XSectionData.ts";
import {LModelElementXLottie} from "@selldone/page-builder/components/x/lottie/LModelElementXLottie.ts";
import {XLottieData} from "@selldone/page-builder/components/x/lottie/XLottieData.ts";
import {XUploaderDataTypes} from "@selldone/page-builder/components/x/uploader/XUploaderData.ts";
import {LModelBackground} from "@selldone/page-builder/models/background/LModelBackground.ts";
import {LModelElementXSearch} from "@selldone/page-builder/components/x/search/LModelElementXSearch.ts";

export class LMigrationV2Heroes {
  static Migrate($sectionData: any): LModelElement<XSectionData> | null {
    if (!$sectionData) {
      return null;
    }

    // 🛠️Fix bad data structures:
    if (!$sectionData.columns) $sectionData.columns = [];

    // 1. Add section:
    const section = LModelElementXSection.MigrateOld($sectionData, null);

    // 2. Add container:
    const container = LModelElementXContainer.MigrateOld($sectionData, null);
    section.addChild(container);

    // 3. Add row:
    const row = LModelElementXRow.MigrateOld($sectionData);
    container.addChild(row);

    // Add column 1:
    if ($sectionData.columns[0]) {
      const column_1 = LModelElementXColumn.MigrateOld($sectionData.columns[0]);
      row.addChild(column_1);

      column_1.addChild(
        LModelElementXText.MigrateOld($sectionData.title, "h1", ["mb-2"]),
      );
      column_1.addChild(
        LModelElementXText.MigrateOld($sectionData.content, "p", ["mb-4"]),
      );

      column_1.addChild(
        LModelElementXButtons.MigrateOld(
          $sectionData.btn_row,
          $sectionData.buttons,
          null,
        ),
      );
    }

    // Search:
    if ($sectionData.search) {
      column_1.addChild(LModelElementXSearch.MigrateOld($sectionData.search));
    }

    // Add column 2:
    if ($sectionData.columns[1]) {
      const column_2 = LModelElementXColumn.MigrateOld(
        $sectionData.columns[1],
        null,
      );
      row.addChild(column_2);
      column_2.addChild(LModelElementXUploader.MigrateOld($sectionData.image));

      if ($sectionData.lottie) {
        const data_lottie = new XLottieData(
          $sectionData.lottie.src,
          new XUploaderDataTypes.Setting($sectionData.lottie.setting),
        );

        new LModelElementXLottie(
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
          LModelElementXText.MigrateOld($sectionData.content2, "p", ["my-5"]),
        );
      }
    }

    console.log("$sectionData", $sectionData, "--structure-->", section);

    return section;
  }
}
