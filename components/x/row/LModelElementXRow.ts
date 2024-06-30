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
import {XRowData} from "@selldone/page-builder/components/x/row/XRowData.ts";

export class LModelElementXRow extends LModelElement<XRowData> {

  constructor(
    background: LModelBackground | null,
    style: any,
    classes: string[] | null,
    children: LModelElement<any>[] | null,
    data: XRowData | null,
    props: Record<string, any> | null,
  ) {
    super(
      "XRow",
      background,
      style,
      classes,
      children,
      data ? data : new XRowData("center", "center", false),
      props,
    );
  }

  static Seed(): LModelElementXRow {
    return new LModelElementXRow(null, null, null, null, null, null);
  }

  static MigrateOld(
    old: any,
  ): LModelElementXRow {
    const data = new XRowData(old?.row.align, old?.row.justify,  old?.row.no_wrap);

    console.log("Migrate Row | Old: ", old, " | Data: ", data);
    return new LModelElementXRow(
        null,
      null,
      null,
      [],
      data,
      null,
    );
  }
}
