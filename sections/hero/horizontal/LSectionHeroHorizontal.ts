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
import {XColumnObject} from "@selldone/page-builder/components/x/column/XColumnObject.ts";
import {XTextObject} from "@selldone/page-builder/components/x/text/XTextObject.ts";
import {XButtonsObject} from "@selldone/page-builder/components/x/buttons/XButtonsObject.ts";
import {XUploaderObject} from "@selldone/page-builder/components/x/uploader/XUploaderObject.ts";
import coverImage from "@selldone/page-builder/assets/images/covers/hero-1.svg";

export class LSectionHeroHorizontal {
  static group = "Hero";

  static cover = coverImage;
  static label = "Horizontal Hero";
  static help = {
    title: "Place this section at the beginning of your page.",
    video: "/app/videos/page-builder/SectionHeroHorizontal.mp4",
  };

  static Seed = () => {
    // Initialize section
    const section = XSectionObject.Seed();
    section.classes = [
      "min-height-80vh",
      "d-flex" /*Keep row fill container! Important.*/,
    ];

    // Initialize container and add to section
    const container = XContainerObject.Seed();
    section.addChild(container);

    // Initialize row and add to container
    const row = XRowObject.Seed();
    container.addChild(row);

    // Initialize and configure first column
    const column1 = XColumnObject.Seed(12, 6, 6);
    row.addChild(column1);

    column1.addChild(
      XTextObject.Seed("Enter your headline here...", "h1", ["mb-2"]),
    );
    column1.addChild(
      XTextObject.Seed(
        "Write your main content here, including key details about your topic, ensuring to cover the main elements of discussion or description...",
        "p",
        ["mb-4"],
      ),
    );
    column1.addChild(XButtonsObject.Seed());

    // Initialize and configure second column
    const column2 = XColumnObject.Seed(12, 6, 6);
    row.addChild(column2);

    column2.addChild(XUploaderObject.Seed(1));

    return section;
  };
}
