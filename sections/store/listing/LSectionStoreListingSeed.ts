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
import {XTextObject} from "@selldone/page-builder/components/x/text/XTextObject.ts";
import {XProductsObject} from "@selldone/page-builder/components/x/products/XProductsObject.ts";

export const LSectionStoreListingSeed = () => {
  // Initialize section
  const section = XSectionObject.Seed();
  section.classes = [];

  // Initialize container and add to section
  const container = XContainerObject.Seed();
  section.addChild(container);

  //const title = XTextObject.Seed("Enter your headline here...", "h2", ["mb-5", "px-7",]);
  //container.addChild(title);

  const products = XProductsObject.Seed();
  container.addChild(products);

 // const text = XTextObject.Seed("Write your main content here, including key details about your topic, ensuring to cover the main elements of discussion or description...", "p", ["mt-5", "px-7"],);
 // container.addChild(text);

  return section;
};
