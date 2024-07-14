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
import {XFormObject} from "@selldone/page-builder/components/x/form/XFormObject.ts";
import coverImage from "@selldone/page-builder/assets/images/covers/newsletter.svg";

export class LSectionFormNewsletter {
  static group = "Form";

  static cover = coverImage;
  static label = "Newsletter";
  static help = {
    title:
      "In this section, you can gather email addresses. These collected emails can be found under the Shop > Marketing > Stream tab.",
    video: "/app/videos/page-builder/NewsletterForm.mp4",
  };
  static Seed = () => {
    // Initialize section
    const section = XSectionObject.Seed();
    section.classes = [];
    section.style = { minHeight: "35vh" };

    // Initialize container and add to section
    const container = XContainerObject.Seed();
    section.addChild(container);

    const row = XRowObject.Seed();
    container.addChild(row);

    const column = XColumnObject.Seed(12, 8, 6);
    row.addChild(column);

    column.addChild(
      XTextObject.Seed("Enter your headline here...", "h2", ["mb-2"]),
    );
    column.addChild(
      XTextObject.Seed(
        "Write your main content here, including key details about your topic, ensuring to cover the main elements of discussion or description...",
        "p",
        ["mb-4"],
      ),
    );

    // Add form
    const form = XFormObject.Seed();
    column.addChild(form);

    return section;
  };
}
