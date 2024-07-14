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
import coverImage from "@selldone/page-builder/assets/images/covers/LSectionGallerySwiper.svg";

export class LSectionGallerySwiper {
  static group = "Gallery";

  static cover = coverImage;
  static label = "Slide Show";
  static help = {
    title:       "This section allows for the creation of a fully customizable slideshow.",
  };
  static Seed = () => {
    // Initialize section
    const section = XSectionObject.Seed();
    section.classes = [];

    // Initialize swiper and add to section
    const swiper = XSwiperObject.Seed();
    section.addChild(swiper);

    swiper.data.effect = XSwiperObjectDataTypes.Effect.Slide;
    swiper.data.autoHeight = true;
    swiper.data.height = undefined;

    swiper.children.forEach((container: XContainerObject) => {
      const row = container.children[0];

      row.style.minHeight = "640px";

      const column = row.children[0];
    });

    return section;
  };
}
