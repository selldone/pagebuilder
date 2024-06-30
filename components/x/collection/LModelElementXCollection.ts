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

import {LModelElement} from "@selldone/page-builder/models/element/LModelElement.ts";
import {LModelBackground} from "@selldone/page-builder/models/background/LModelBackground.ts";
import {XCollectionData} from "@selldone/page-builder/components/x/collection/XCollectionData.ts";

export class LModelElementXCollection extends LModelElement<XCollectionData> {
  static Seed(): LModelElementXProduct {
    const data = new XCollectionData([]);

    return new LModelElementXProduct(null, null, null, null, data, null);
  }

  constructor(
    background: LModelBackground | null,
    style: any,
    classes: string[] | null,
    children: LModelElement<any>[] | null,
    data: XCollectionData | null,
    props: any,
  ) {
    super(
      "XCollection",
      background,
      style,
      classes,
      children,
      data ? data : new XCollectionData(null),
      props,
    );
  }
}
