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
import {XProductsObjectData} from "@selldone/page-builder/components/x/products/XProductsObjectData.ts";

export class XListingCustomObjectData extends LModelData<XListingCustomObjectData> {
  filter: XProductsObjectData.IFilter = {};

  frame_product: XListingCustomObjectData.IFrame = {
    classes: [],
    code: null,
  };

  frame_category: XListingCustomObjectData.IFrame = {
    classes: [],
    code: null,
  };

  constructor(params?: Partial<XListingCustomObjectData>) {
    super();


    this.filter = params?.filter ?? {};
    this.frame_product = params?.frame_product ?? {
      classes: [],
      code: null,
    };
    this.frame_category = params?.frame_category ?? {
      classes: [],
      code: null,
    };

  }

  // ━━━━━━━━━━━━━━━━━ 🟢 Setters ━━━━━━━━━━━━━━━━━

  // ━━━━━━━━━━━━━━━━━ ✨ Helper Methods ━━━━━━━━━━━━━━━━━
}

// ━━━━━━━━━━━━━━━━━ 🦫 Types ━━━━━━━━━━━━━━━━━

export namespace XListingCustomObjectData {
  export type IFrame = {
    classes: string[];
    code: string | null;
  };
}
