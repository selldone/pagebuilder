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
import {XArticleObject} from "@selldone/page-builder/components/x/article/XArticleObject.ts";
import coverImage from "@selldone/page-builder/assets/images/covers/LSectionArticle.svg";

export class LSectionArticle {
  static group = "Text";

  static cover = coverImage;
  static label = "Article";
  static help = {
    title:
      "Use this section to show an article with features like what you have in your blog and product description with inline editor. Please just use one of this section each page.",
  };

  static Seed = () => {
    // Initialize section
    const section = XSectionObject.Seed();
    section.classes = [];

    // Initialize container and add to section
    const container = XContainerObject.Seed();
    section.addChild(container);

    const article = XArticleObject.Seed();
    container.addChild(article);

    return section;
  };
}
