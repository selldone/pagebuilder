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

import {LModelData} from "@selldone/page-builder/models/data/LModelData.ts";

export class XFeederBlogsObjectData extends LModelData<XFeederBlogsObjectData> {
  filter: XFeederBlogsObjectDataTypes.IFilter = {};
  grid: {
    mobile: number;
    tablet: number;
    desktop: number;
    widescreen: number;
  };

  card: XFeederBlogsObjectDataTypes.ICard = {};

  constructor(params?: Partial<XFeederBlogsObjectData>) {
    super();

    this.filter = params?.filter ?? {};
    this.grid = params?.grid ?? {
      offset: 0,
      limit: 4,
      sortBy: "created_at",
      sortDesc: true,
      search: null,
    };

    this.card = params?.card ?? {};
  }

  // ━━━━━━━━━━━━━━━━━ 🟢 Setters ━━━━━━━━━━━━━━━━━

  // ━━━━━━━━━━━━━━━━━ ✨ Helper Methods ━━━━━━━━━━━━━━━━━
}

// ━━━━━━━━━━━━━━━━━ 🦫 Types ━━━━━━━━━━━━━━━━━

export namespace XFeederBlogsObjectDataTypes {
  export type IFilter = {
    tags?: string[];
    offset?: number;
    limit?: number;
    sortBy?: string;
    sortDesc?: boolean;
    search?: string;
  };

  export type ICard = {
    color?: string;
    dark?: boolean;
    flat?: boolean;
    rounded?: 0 | "sm" | "md" | "lg" | "xl";
  };
}
