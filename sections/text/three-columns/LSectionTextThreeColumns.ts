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
import {XRowObject} from "@selldone/page-builder/components/x/row/XRowObject.ts";
import {XTextObject} from "@selldone/page-builder/components/x/text/XTextObject.ts";
import {XColumnImageTextObject} from "@selldone/page-builder/components/x/column-image-text/XColumnImageTextObject.ts";
import coverImage from "@selldone/page-builder/assets/images/covers/section-2.svg";

export class LSectionTextThreeColumns {
  static group = "Text";

  static cover = coverImage;
  static label = "Three columns";
  static help = {
    title: "This section show three columns of texts.",
  };
  static Seed = () => {
    // Initialize section
    const section = XSectionObject.Seed();

    // Initialize container and add to section
    const container = XContainerObject.Seed();
    section.addChild(container);

    container.addChild(
      XTextObject.Seed("Enter your headline here...", "h2", ["mb-5"]),
    );

    // Initialize row and add to container
    const row = XRowObject.Seed();
    container.addChild(row);

    // Initialize columns
    row.addChild(
      XColumnImageTextObject.Seed(12, 4, 3, null, "x-layout-title-content"),
    );
    row.addChild(
      XColumnImageTextObject.Seed(12, 4, 3, null, "x-layout-title-content"),
    );
    row.addChild(
      XColumnImageTextObject.Seed(12, 4, 3, null, "x-layout-title-content"),
    );

    return section;
  };
}
