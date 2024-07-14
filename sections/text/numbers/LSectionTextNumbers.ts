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

import coverImage from "@selldone/page-builder/assets/images/covers/social-1.svg";
import {
  XColumnImageTextDataTypes
} from "@selldone/page-builder/components/x/column-image-text/XColumnImageTextObjectData.ts";

export class LSectionTextNumbers {
  static group = "Text";

  static cover = coverImage;
  static label = "Numbers";
  static help = {
    title:
      "Use this section to show big numbers or highlight some values in your business.",
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
    for (let i = 1; i <= 3; i++) {
      const col = XColumnImageTextObject.Seed(
        12,
        4,
        3,
        null,
        XColumnImageTextDataTypes.LAYOUTS.CONTENT_TITLE,
        null,
        [],
      );

      const content = col.getContentChild();

      if (content) {
        content.data.setValue("" + Math.abs(Math.round(999)));
        content.style = { fontSize: "3rem" };
      }

      const title = col.getTitleChild();
      if (title) {
        title.data.setTag("h3");
        title.style = { fontSize: "1.5rem" };
      }

      row.addChild(col);
    }

    return section;
  };
}
