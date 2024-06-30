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
import {XSearchData} from "@selldone/page-builder/components/x/search/XSearchData.ts";
import {LModelInput} from "@selldone/page-builder/models/input/LModelInput.ts";

export class LModelElementXSearch extends LModelElement<XSearchData> {
  constructor(
    background: LModelBackground | null,
    style: any,
    classes: string[] | null,
    children: LModelElement<any>[] | null,
    data: XSearchData | null,
    props: any,
  ) {
    super(
      "XSearch",
      background,
      style,
      classes,
      children,
      data ? data : new XSearchData(),
      props,
    );
  }

  static Seed(): LModelElementXSearch {
    const data = new XSearchData();
    console.log("data search --->", data);

    return new LModelElementXSearch(null, null, null, null, data, null);
  }

  static MigrateOld(old: any): LModelElementXSearch | null {
    if (!old) return null;

    const data = new XSearchData(new LModelInput(old));

    console.log("Migrate Search Element ", old, "--- old --->", data);
    return new LModelElementXSearch(null, null, null, [], data, null);
  }
}
