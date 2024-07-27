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
import {XTextObject} from "@selldone/page-builder/components/x/text/XTextObject.ts";
import {XSectionObject} from "@selldone/page-builder/components/x/section/XSectionObject.ts";
import {XSwiperObject} from "@selldone/page-builder/components/x/swiper/XSwiperObject.ts";
import {XColumnImageTextObject} from "@selldone/page-builder/components/x/column-image-text/XColumnImageTextObject.ts";

export class LMigrationV2Scroll {
  static Migrate($sectionData: any): LModelElement<XSectionObjectData> | null {
    if (!$sectionData) {
      return null;
    }

    const section = XSectionObject.MigrateOld($sectionData);
    section.classes = ["pa-0"];
    section.style = [];

    if ($sectionData.title) {
      col_A.addChild(
        XTextObject.MigrateOld($sectionData.title, "h2", ["mb-3"]),
      );
    }
    if ($sectionData.content) {
      col_A.addChild(XTextObject.MigrateOld($sectionData.content, "p", []));
    }

    const swiper = XSwiperObject.MigrateOld($sectionData.slide);
    section.addChild(swiper);

    if (!swiper.data.slidesPerView) swiper.data.slidesPerView = 1;

    if (!swiper.data.slidesPerViewSm) swiper.data.slidesPerViewSm = 2;

    if (!swiper.data.slidesPerViewMd) swiper.data.slidesPerViewMd = 3;

    if (!swiper.data.slidesPerViewLg) swiper.data.slidesPerViewLg = 4;

    if (!swiper.data.spaceBetween) swiper.data.spaceBetween = 30;

    $sectionData.slide.items.forEach((_slide: any) => {
      /* const container = XContainerObject.MigrateOld(_slide.container);
                   container.data.setFluid(true);
                   container.style = $sectionData.style ? $sectionData.style : {};
                   container.classes = $sectionData.classes ? $sectionData.classes : [];
             
                   const row = XRowObject.MigrateOld(_slide.row);
                   container.addChild(row);*/

      _slide.content = _slide.subtitle; // Match to new column

      const column = XColumnImageTextObject.MigrateOld(_slide);
      /*const title = XTextObject.MigrateOld(_slide.title, "h2", []);
                  const subtitle = XTextObject.MigrateOld(_slide.subtitle, "p", []);
                  const buttons = XButtonsObject.NewInstance();*/

      /* if (_slide.button) {
                     buttons.addChild(XButtonObject.MigrateOld(_slide.button));
                   }*/
      /*
                        column.addChild(XUploaderObject.MigrateOld(_slide.image));
                        column.addChild(title);
                        column.addChild(subtitle);
                        column.addChild(buttons);*/

      //row.addChild(column);

      swiper.addChild(column);
    });

    console.log(
      "Migrate V2 LSectionGalleryScroll | $sectionData",
      $sectionData,
      "--structure-->",
      section,
    );

    return section;
  }
}
