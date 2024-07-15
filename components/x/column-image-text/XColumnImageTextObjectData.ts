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

import {LModelGrid} from "@selldone/page-builder/models/grid/LModelGrid.ts";
import {LModelData} from "@selldone/page-builder/models/data/LModelData.ts";

export class XColumnImageTextObjectData extends LModelData<XColumnImageTextObjectData> {
  grid: LModelGrid | null;
  layout: XColumnImageTextDataTypes.LAYOUTS;

  constructor(params: {
    grid?: LModelGrid | null;
    layout: XColumnImageTextDataTypes.LAYOUTS; // Making layout mandatory as in your original constructor
  }) {
    super(); // Calling the constructor of the base class

    // Check if 'grid' is an instance of LModelGrid or null
    if (params.grid instanceof LModelGrid) {
      this.grid = params.grid;
    } else {
      this.grid = new LModelGrid(params.grid ?? null);
    }

    this.layout = params.layout; // Direct assignment since 'layout' is a required field
  }

  // ━━━━━━━━━━━━━━━━━ 🟢 Setters ━━━━━━━━━━━━━━━━━
  public setLayout(layout: XColumnImageTextDataTypes.LAYOUTS) {
    this.layout = layout;




    return this;
  }
}

// ━━━━━━━━━━━━━━━━━ 🦫 Types ━━━━━━━━━━━━━━━━━

export namespace XColumnImageTextDataTypes {
  export enum LAYOUTS {
    PRODUCT = "product",
    COLLECTION = "collection",

    NORMAL = "x-layout-normal", // Column | Image + Title + Content
    OVERLAY_TOP = "x-layout-overlay-top", // Image + Column of Title Content inside image
    OVERLAY_CENTER = "x-layout-overlay-center",
    OVERLAY_BOTTOM = "x-layout-overlay-bottom",
    IMAGE = "x-layout-image",
    REVERSE = "x-layout-reverse",
    ROW = "x-layout-row",
    ROW_REVERSE = "x-layout-row-reverse",
    MIDDLE = "x-layout-middle", // Title Image Content
    TITLE_CENTER = "x-layout-title-content", //Title Content (no image)
    CONTENT_TITLE = "x-layout-content-title", // Content Title (no image)
  }
}
