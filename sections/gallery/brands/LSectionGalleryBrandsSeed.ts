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
import {XContainerObject} from "@selldone/page-builder/components/x/container/XContainerObject.ts";
import {XRowObject} from "@selldone/page-builder/components/x/row/XRowObject.ts";
import {XColumnObject} from "@selldone/page-builder/components/x/column/XColumnObject.ts";
import {XUploaderObject} from "@selldone/page-builder/components/x/uploader/XUploaderObject.ts";

export const LSectionGalleryBrandsSeed = () => {
  // Initialize section
  const section = XSectionObject.Seed();
  section.classes = [];

  // Initialize container and add to section
  const container = XContainerObject.Seed();
  section.addChild(container);

  // Initialize row and add to container
  const row = XRowObject.Seed();
  container.addChild(row);

  // Col A:
  const col_A = XColumnObject.Seed(12, 4, 6);
  row.addChild(col_A);
  col_A.addChild(
    XTextObject.Seed("Enter your headline here...", "h2", ["mb-3"]),
  );
  col_A.addChild(
    XTextObject.Seed(
      "Write your main content here, including key details about your topic, ensuring to cover the main elements of discussion or description...",
      "p",
      [],
    ),
  );
  col_A.addChild(XButtonsObject.Seed());

  // Col B:
  const col_B = XColumnObject.Seed(12, 8, 6);
  row.addChild(col_B);
  const col_B_row = XRowObject.Seed();
  col_B.addChild(col_B_row);

  for (let i = 0; i < 8; i++) {
    const small_col = XColumnObject.Seed(4, 3, 2).addChild(
      XUploaderObject.Seed(),
    );

    col_B_row.addChild(small_col);
  }

  return section;
};
