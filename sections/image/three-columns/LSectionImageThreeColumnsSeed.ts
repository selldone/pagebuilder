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
import {XColumnImageTextObject} from "@selldone/page-builder/components/x/column-image-text/XColumnImageTextObject.ts";
import {XColumnObject} from "@selldone/page-builder/components/x/column/XColumnObject.ts";

export const LSectionImageThreeColumnsSeed = () => {
  // Initialize section
  const section = XSectionObject.Seed();
  section.classes = [];

  // Initialize container and add to section
  const container = XContainerObject.Seed();
  section.addChild(container);

  // Initialize row and add to container
  const row = XRowObject.Seed();
  container.addChild(row);

  // Column A:
  const column_A = XColumnObject.Seed(12, 6, 6, null);
  row.addChild(column_A);

  column_A.addChild(
    XColumnImageTextObject.Seed(
      12,
      null,
      null,
      null,
      "x-layout-normal",
      null,
      [],
      true,
    ),
  );

  // Column B:
  const column_B = XColumnObject.Seed(6, 3, 3, null);
  row.addChild(column_B);

  for (let i = 1; i <= 2; i++) {
    column_B.addChild(
      XColumnImageTextObject.Seed(
        12,
        null,
        null,
        null,
        "x-layout-normal",
        null,
        [],
        true,
      ),
    );
  }

  // Column C:
  const column_C = XColumnObject.Seed(6, 3, 3, null);
  row.addChild(column_C);

  for (let i = 1; i <= 2; i++) {
    column_C.addChild(
        XColumnImageTextObject.Seed(
            12,
            null,
            null,
            null,
            "x-layout-normal",
            null,
            [],
            true,
        ),
    );
  }

  return section;
};
