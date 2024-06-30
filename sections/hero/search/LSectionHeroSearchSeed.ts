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
import {LModelElementXColumn} from "@selldone/page-builder/components/x/column/LModelElementXColumn.ts";
import {LModelElementXText} from "@selldone/page-builder/components/x/text/LModelElementXText.ts";
import {LModelElementXButtons} from "@selldone/page-builder/components/x/buttons/LModelElementXButtons.ts";
import {LModelElementXUploader} from "@selldone/page-builder/components/x/uploader/LModelElementXUploader.ts";
import {LModelElementXSearch} from "@selldone/page-builder/components/x/search/LModelElementXSearch.ts";

export const LSectionHeroSearchSeed = () => {
  // Initialize section
  const section = LModelElementXSection.Seed();
  section.classes=["text-center", "d-flex" /*Keep row fill container! Important.*/]

  // Initialize container and add to section
  const container = LModelElementXContainer.Seed();
  section.addChild(container);

  // Initialize row and add to container
  const row = LModelElementXRow.Seed();
  container.addChild(row);

  // Initialize and configure first column
  const column1 = LModelElementXColumn.Seed(12, 10, 8);
  row.addChild(column1);

  column1.addChild(LModelElementXText.Seed("Enter your headline here...", "h1", ["mb-2"]));
  column1.addChild(LModelElementXText.Seed("Write your main content here, including key details about your topic, ensuring to cover the main elements of discussion or description...", "p", ["mb-4"]));
  column1.addChild(LModelElementXSearch.Seed());



  // Initialize and configure second column
  const column2 = LModelElementXColumn.Seed(12, 10, 8);
  row.addChild(column2);
  column2.addChild(LModelElementXText.Seed("You can add more detail and guide about the search here...", "p", ["my-5"]));


  return section;
};
