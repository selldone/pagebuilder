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

import {LModelElementXSection} from "@selldone/page-builder/components/x/section/LModelElementXSection.ts";
import {LModelElementXContainer} from "@selldone/page-builder/components/x/container/LModelElementXContainer.ts";
import {LModelElementXRow} from "@selldone/page-builder/components/x/row/LModelElementXRow.ts";
import {XTextObject} from "@selldone/page-builder/components/x/text/XTextObject.ts";
import {
  XColumnImageTextObject
} from "@selldone/page-builder/components/x/column-image-text/XColumnImageTextObject.ts";

export const LSectionTextNumbersSeed = () => {
  // Initialize section
  const section = LModelElementXSection.Seed();

  // Initialize container and add to section
  const container = LModelElementXContainer.Seed();
  section.addChild(container);

  container.addChild(
    XTextObject.Seed("Enter your headline here...", "h2", ["mb-5"]),
  );

  // Initialize row and add to container
  const row = LModelElementXRow.Seed();
  container.addChild(row);

  // Initialize columns
  for (let i=1; i<=3; i++){
    const col=XColumnImageTextObject.Seed(12, 4, 3,null,'x-layout-content-title',null,['text-h1']);

    (col.children[1] as XTextObject).data.setValue(Math.abs(Math.round(999)))

    row.addChild(col);
  }


  return section;
};
