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
import {XArticleObject} from "@selldone/page-builder/components/x/article/XArticleObject.ts";
import {CONSOLE} from "@selldone/core-js/helper";

export class LMigrationV2Article {
  static Migrate($sectionData: any): LModelElement<XSectionObjectData> | null {
    if (!$sectionData) {
      return null;
    }

    const section = XSectionObject.MigrateOld($sectionData);

    const container = XContainerObject.MigrateOld($sectionData);
    section.addChild(container);

    const article = XArticleObject.MigrateOld($sectionData);
    container.addChild(article);

    CONSOLE.log(
      "Migrate V2 LSectionArticle | $sectionData",
      $sectionData,
      "--structure-->",
      section,
    );

    return section;
  }
}
