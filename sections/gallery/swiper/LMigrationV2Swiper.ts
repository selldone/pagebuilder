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
import {XRowObject} from "@selldone/page-builder/components/x/row/XRowObject.ts";
import {XColumnObject} from "@selldone/page-builder/components/x/column/XColumnObject.ts";
import {XTextObject} from "@selldone/page-builder/components/x/text/XTextObject.ts";
import {XButtonObject} from "@selldone/page-builder/components/x/button/XButtonObject.ts";
import {XSectionObject} from "@selldone/page-builder/components/x/section/XSectionObject.ts";
import {XSwiperObject} from "@selldone/page-builder/components/x/swiper/XSwiperObject.ts";
import {XButtonsObject} from "@selldone/page-builder/components/x/buttons/XButtonsObject.ts";

export class LMigrationV2Swiper {
  static Migrate($sectionData: any): LModelElement<XSectionObjectData> | null {
    if (!$sectionData) {
      return null;
    }

    // Migrate old version:
    if (!$sectionData.slide.direction)
      $sectionData.slide.direction = $sectionData.slide.vertical
        ? "vertical"
        : "horizontal";

    const section = XSectionObject.MigrateOld($sectionData);
    section.classes = [];

    const swiper = XSwiperObject.MigrateOld($sectionData.slide);
    section.addChild(swiper);

    $sectionData.slide.items.forEach((_slide: any) => {
      const container = XContainerObject.MigrateOld(_slide.container);
      container.data.setFluid(true);
      container.style={};

      // Convert old image to slide background
      if (_slide.image) {
        container.background.bg_image = _slide.image.src;
      }

      const row = XRowObject.MigrateOld(_slide.row);
      const column = XColumnObject.Seed(12, 9, 7);
      const title = XTextObject.MigrateOld(_slide.title, "h2", []);
      const subtitle = XTextObject.MigrateOld(_slide.subtitle, "p", []);
      const buttons = XButtonsObject.NewInstance();

      if (_slide.button) {
        buttons.addChild(XButtonObject.MigrateOld(_slide.button));
      }

      container.addChild(row);
      row.addChild(column);
      column.addChild(title);
      column.addChild(subtitle);
      column.addChild(buttons);

      swiper.addChild(container);
    });

    console.log(
      "Migrate V2 Section | $sectionData",
      $sectionData,
      "--structure-->",
      section,
    );

    return section;
  }
}
