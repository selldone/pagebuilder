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
import {XContainerObject} from "@selldone/page-builder/components/x/container/XContainerObject.ts";
import {XCodeObject} from "@selldone/page-builder/components/x/code/XCodeObject.ts";
import coverImage from "@selldone/page-builder/assets/images/covers/LSectionHtml.svg";

export class LSectionHtml {
  static group = "Basic";

  static cover = coverImage;
  static label = "Raw Html";
  static help = {
    title:
      "This section allows you to insert raw HTML code and iframes, such as embedding YouTube videos.",
    video: "/app/videos/page-builder/RawHtml.m4v",
  };

  static Seed = () => {
    // Initialize section
    const section = XSectionObject.Seed();
    section.classes = ['pa-0'];


    const code = XCodeObject.Seed();
    section.addChild(code);

    return section;
  };
}
