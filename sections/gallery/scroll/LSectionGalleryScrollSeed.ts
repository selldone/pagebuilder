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
import {XContainerObject} from "@selldone/page-builder/components/x/container/XContainerObject.ts";
import {XColumnObject} from "@selldone/page-builder/components/x/column/XColumnObject.ts";
import {XUploaderObject} from "@selldone/page-builder/components/x/uploader/XUploaderObject.ts";

export const LSectionGalleryScrollSeed = () => {
  // Initialize section
  const section = XSectionObject.Seed();
  section.classes = [];

  // Initialize swiper and add to section
  const swiper = XSwiperObject.Seed(6);
  section.addChild(swiper);

  swiper.data.slidesPerView = 1;
  swiper.data.slidesPerViewSm = 2;
  swiper.data.slidesPerViewMd = 3;
  swiper.data.slidesPerViewLg = 4;
  swiper.data.spaceBetween = 30;

  swiper.data.effect = XSwiperObjectDataTypes.Effect.Slide;
  swiper.data.autoHeight = true;
  swiper.data.height = undefined;

  swiper.children.forEach((container: XContainerObject) => {
    const row = container.children[0];
    const column = row.children[0];
    if (column instanceof XColumnObject) {
      column.data.grid
        .setMobile(12)
        .setTablet(null)
        .setDesktop(null)
        .setWidescreen(null);

      const image = XUploaderObject.Seed();
      image.data.setting.size.w = "200px";
      column.addChild(image, 0);
    }
  });

  return section;
};
