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
import {XMarqueeObject} from "@selldone/page-builder/components/x/marquee/XMarqueeObject.ts";
import coverImage from "@selldone/page-builder/assets/images/covers/LSectionTextMarquee.png";

export class LSectionTextMarquee {
  static group = "Text";

  static cover = coverImage;
  static label = "Infinite Marquee";
  static help = {
    title:
      "Add an infinite scrolling text or HTML, also known as a marquee view.",
  };

  static Seed = () => {
    // Initialize section
    const section = XSectionObject.Seed();
    section.classes = ["px-0"];
    section.addChild(XMarqueeObject.Seed());

    return section;
  };
}
