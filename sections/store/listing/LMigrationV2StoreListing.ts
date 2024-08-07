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
import {XProductsObject} from "@selldone/page-builder/components/x/products/XProductsObject.ts";
import {XTextObject} from "@selldone/page-builder/components/x/text/XTextObject.ts";
import {CONSOLE} from "@selldone/core-js/helper";

export class LMigrationV2StoreListing {
  static Migrate($sectionData: any): LModelElement<XSectionObjectData> | null {
    if (!$sectionData) {
      return null;
    }

    const section = XSectionObject.MigrateOld($sectionData);

    const container = XContainerObject.MigrateOld($sectionData);
    section.addChild(container);

    if ($sectionData.title) {
      const title = XTextObject.Seed($sectionData.title, "h2", [
        "mb-5",
        "px-7",
      ]);
      container.addChild(title);

      container.data.setFluid(true);
      container.style.maxWidth = "1550px";
      container.classes.push("mx-auto");
    }

    const products = XProductsObject.MigrateOld($sectionData);
    container.addChild(products);

    if ($sectionData.text) {
      const text = XTextObject.Seed($sectionData.text, "p", ["mt-5", "px-7"]);
      container.addChild(text);
    }

    CONSOLE.log(
      "Migrate V2 LSectionStoreListing | $sectionData",
      $sectionData,
      "--structure-->",
      section,
    );

    return section;
  }
}
