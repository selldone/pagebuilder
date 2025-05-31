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

import { XSectionObject } from "@selldone/page-builder/components/x/section/XSectionObject.ts";
import coverImage from "@selldone/page-builder/assets/images/covers/LSectionEmbedPage.svg";
import { XEmbedPageObject } from "@selldone/page-builder/components/x/embed/page/XEmbedPageObject.ts";

export class LSectionEmbedPage {
  static group = "Basic";

  static cover = coverImage;
  static label = "Embed Page";
  static help = {
    title:
      "You can embed another page which built by Selldone Page Builder into your current page.",
  };

  static Seed = () => {
    // Initialize section
    const section = XSectionObject.Seed();
    section.classes = ["pa-0"];

    const code = XEmbedPageObject.Seed();
    section.addChild(code);

    return section;
  };
}
