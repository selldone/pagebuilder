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
import {XButtonsObject} from "@selldone/page-builder/components/x/buttons/XButtonsObject.ts";
import {XColumnImageTextObject} from "@selldone/page-builder/components/x/column-image-text/XColumnImageTextObject.ts";
import coverImage from "@selldone/page-builder/assets/images/covers/LSectionImageSocials.svg";
import {
    XColumnImageTextDataTypes
} from "@selldone/page-builder/components/x/column-image-text/XColumnImageTextObjectData.ts";

export class LSectionImageSocials {
  static group = "Image & Text";

  static cover = coverImage;
  static label = "Text, Image, Text";
  static help = {
    title:
      "This section displays a large image accompanied by a title and description overlaying it.",
  };

  static Seed = () => {
    // Initialize section
    const section = XSectionObject.Seed();
    section.classes = [];

    // Initialize container and add to section
    const container = XContainerObject.Seed();
    section.addChild(container);

    container.addChild(
      XTextObject.Seed("Enter your headline here...", "h2", ["mb-5"]),
    );

    container.addChild(
      XTextObject.Seed(
        "Write your main content here, including key details about your topic, ensuring to cover the main elements of discussion or description...",
        "p",
        [],
      ),
    );

    container.addChild(XButtonsObject.Seed());

    // Initialize row and add to container
    const row = XRowObject.Seed();
    container.addChild(row);

    for (let i = 1; i <= 3; i++) {
      const column = XColumnImageTextObject.Seed(
        12,
        6,
        4,
        null,
        XColumnImageTextDataTypes.LAYOUTS.ROW,
        null,
        [],
        true,
      );
      row.addChild(column);

      const image = column.getImageChild();
      image?.data.setting.setAspect(1).setRound(true);
      image.style.width = "120px";
      image.style.height = "120px";
    }

    return section;
  };
}
