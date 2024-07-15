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

import {XColumnObjectData} from "@selldone/page-builder/components/x/column/XColumnObjectData.ts";
import {XTextObjectData} from "@selldone/page-builder/components/x/text/XTextObjectData.ts";
import {XUploaderObjectData} from "@selldone/page-builder/components/x/uploader/XUploaderObjectData.ts";
import {LModelData} from "@selldone/page-builder/models/data/LModelData.ts";

/**
 * @deprecated
 */
export class XCollectionObjectData extends LModelData<XCollectionObjectData> {
  items: XCollectionDataTypes.IItem[];

  constructor(params: { items?: XCollectionDataTypes.IItem[] }) {
    super(); // Calling the constructor of the base class

    // Use the logical OR operator to provide a default empty array if items is not provided
    this.items = params.items ?? [];
  }

  // ━━━━━━━━━━━━━━━━━ 🟢 Setters ━━━━━━━━━━━━━━━━━
  public setItems(items: XCollectionDataTypes.IItem[]) {
    this.items = items;
    return this;
  }
}

// ━━━━━━━━━━━━━━━━━ 🦫 Types ━━━━━━━━━━━━━━━━━

export namespace XCollectionDataTypes {
  export interface IItem {
    column: XColumnObjectData;
    title: XTextObjectData;
    image: XUploaderObjectData;
  }
}
