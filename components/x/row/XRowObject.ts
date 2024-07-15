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
import {XRowObjectData} from "@selldone/page-builder/components/x/row/XRowObjectData.ts";

export class XRowObject extends LModelElement<XRowObjectData> {
  public static ComponentName = "XRow";
  public static Info = {
    group:'Layout',
    icon:'calendar_view_week',
    title:'Row'
  };
  constructor(
    background: LModelBackground | null,
    style: any,
    classes: string[] | null,
    children: LModelElement<any>[] | null,
    data: XRowObjectData | null,
    props: Record<string, any> | null,
  ) {
    super(
      XRowObject.ComponentName,
      background,
      style,
      classes,
      children,
      data
        ? data
        : new XRowObjectData({
            align: "center",
            justify: "center",
            no_wrap: false,
          }),
      props,
    );
  }

  // ━━━━━━━━━━━━━━━━━ 🥪 Instance ━━━━━━━━━━━━━━━━━
  static NewInstance() {
    return new XRowObject(null, null, null, null, null, null);
  }

  // ━━━━━━━━━━━━━━━━━ 🫘 Seed ━━━━━━━━━━━━━━━━━

  static Seed(): XRowObject {
    return this.NewInstance();
  }

  // ━━━━━━━━━━━━━━━━━ 🍢 Migration ━━━━━━━━━━━━━━━━━
  /**
   * Migrate from V1 to V2
   * @param old
   * @constructor
   */
  static MigrateOld(old: any): XRowObject {
    const data = new XRowObjectData(old?.row);

    console.log("Migrate Row | Old: ", old, " | Data: ", data);
    return new XRowObject(null, null, null, [], data, null);
  }

  // ━━━━━━━━━━━━━━━━━ Interpreter ━━━━━━━━━━━━━━━━━

  public static JsonToInstance(json: Record<string, any>): XRowObject {
    return this._JsonToInstance(json, XRowObjectData);
  }
}
