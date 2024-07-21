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

import {XSectionObject} from "@selldone/page-builder/components/x/section/XSectionObject.ts";
import {XSwiperObject} from "@selldone/page-builder/components/x/swiper/XSwiperObject.ts";
import {XSwiperObjectDataTypes} from "@selldone/page-builder/components/x/swiper/XSwiperObjectData.ts";
import coverImage from "@selldone/page-builder/assets/images/covers/LSectionGalleryScroll.svg";
import {XColumnImageTextObject} from "@selldone/page-builder/components/x/column-image-text/XColumnImageTextObject.ts";
import {
    XColumnImageTextDataTypes
} from "@selldone/page-builder/components/x/column-image-text/XColumnImageTextObjectData.ts";

export class LSectionGalleryScroll {
  static group = "Gallery";

  static cover = coverImage;
  static label = "Scroll View";
  static help = {
    title: "This section showcases a combination of images and text.",
  };

  static Seed = () => {
    // Initialize section
    const section = XSectionObject.Seed();
    section.classes = [];

    // Initialize swiper and add to section
    const swiper = XSwiperObject.Seed(0);
    section.addChild(swiper);

    swiper.data.slidesPerView = 1;
    swiper.data.slidesPerViewSm = 2;
    swiper.data.slidesPerViewMd = 3;
    swiper.data.slidesPerViewLg = 4;
    swiper.data.spaceBetween = 30;

    swiper.data.effect = XSwiperObjectDataTypes.Effect.Slide;
    swiper.data.autoHeight = true;
    swiper.data.height = undefined;

    for (let i = 1; i <= 6; i++) {
      const column = XColumnImageTextObject.Seed(
        12,
        null,
        null,
        null,
        XColumnImageTextDataTypes.LAYOUTS.NORMAL,
        null,
        XColumnImageTextDataTypes.LAYOUTS.NORMAL,
        true,
      );
      swiper.addChild(column);
      column.getImageChild().style.width = "200px";
    }

    return section;
  };
}
