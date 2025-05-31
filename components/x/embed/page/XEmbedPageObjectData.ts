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

import { LModelData } from "@selldone/page-builder/models/data/LModelData.ts";

export class XEmbedPageObjectData extends LModelData<XEmbedPageObjectData> {
  page_id: number = null;
  /**
   * Pre loaded data!
   */
  page: Page = null;

  constructor(params: { page_id?: number; page: Page } = {}) {
    super(); // Calling the constructor of the base class

    this.page_id = params.page_id ?? null;
    this.page = params.page ?? null;
  }

  // ━━━━━━━━━━━━━━━━━ 🟢 Setters ━━━━━━━━━━━━━━━━━

  public setPageId(page_id: number | null): XEmbedPageObjectData {
    this.page_id = page_id;
    return this;
  }

  public setPage(page: Page): XEmbedPageObjectData {
    this.page = page;
    return this;
  }
}

// ━━━━━━━━━━━━━━━━━ 🦫 Types ━━━━━━━━━━━━━━━━━

export namespace XEmbedPageObjectDataTypes {}
