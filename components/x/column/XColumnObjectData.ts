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

export class XColumnObjectData extends LModelData<XColumnObjectData> {
  public grid: LModelGrid;

  constructor(params: { grid?: LModelGrid }) {
    super(); // Calling the constructor of the base class

    // Use the logical OR operator to provide a default new LModelGrid instance if grid is not provided
    if (params.grid instanceof LModelGrid) {
      this.grid = params.grid;
    } else {
      this.grid = new LModelGrid(params.grid ?? {});
    }
  }
}
