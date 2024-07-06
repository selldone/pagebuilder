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
import {XProductsObject} from "@selldone/page-builder/components/x/products/XProductsObject.ts";
import {XRowObject} from "@selldone/page-builder/components/x/row/XRowObject.ts";
import {XListingCustomObject} from "@selldone/page-builder/components/x/feeder/products/XListingCustomObject.ts";

export const LSectionCustomListingSeed = () => {
  // Initialize section
  const section = XSectionObject.Seed();
  section.classes = [];

  // Initialize container and add to section
  const container = XContainerObject.Seed();
  section.addChild(container);

  const row = XRowObject.Seed();
  container.addChild(row);


  const listing = XListingCustomObject.Seed();
  row.addChild(listing);

  return section;
};
