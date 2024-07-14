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
import {XTextObject} from "@selldone/page-builder/components/x/text/XTextObject.ts";
import {XButtonsObject} from "@selldone/page-builder/components/x/buttons/XButtonsObject.ts";
import {
  XGalleryExpandableObject
} from "@selldone/page-builder/components/x/gallery-expandable/XGalleryExpandableObject.ts";
import coverImage from "@selldone/page-builder/assets/images/covers/gallery-1.svg";

export class LSectionGalleryExpandable {
  static group = "Gallery";

  static cover = coverImage;
  static label = "Expandable Gallery";
  static help = {
    title:
      "This section presents an image gallery featuring horizontally expandable slides.",
  };

  static Seed = () => {
    // Initialize section
    const section = XSectionObject.Seed();
    section.classes = [];

    section.addChild(
      XTextObject.Seed("Enter your headline here...", "h2", ["mb-5"]),
    );
    section.addChild(
      XTextObject.Seed(
        "Write your main content here, including key details about your topic, ensuring to cover the main elements of discussion or description...",
        "p",
        [],
      ),
    );
    section.addChild(XButtonsObject.Seed());

    section.addChild(XGalleryExpandableObject.Seed());

    return section;
  };
}
