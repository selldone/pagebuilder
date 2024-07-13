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
import {
  XProductOverviewObjectData
} from "@selldone/page-builder/components/x/product-overview/XProductOverviewObjectData.ts";

export class XProductOverviewObject extends LModelElement<XProductOverviewObjectData> {
  public static ComponentName = "XProductOverview";

  constructor(
    background: LModelBackground | null,
    style: any,
    classes: string[] | null,
    children: LModelElement<any>[] | null,
    data: XProductOverviewObjectData | null,
    props: any,
  ) {
    super(
      XProductOverviewObject.ComponentName,
      background,
      style,
      classes,
      children,
      data ? data : new XProductOverviewObjectData({}),
      props,
    );
  }

  // ━━━━━━━━━━━━━━━━━ 🥪 Instance ━━━━━━━━━━━━━━━━━
  static NewInstance() {
    return new XProductOverviewObject(null, null, null, null, null, null);
  }

  // ━━━━━━━━━━━━━━━━━ 🫘 Seed ━━━━━━━━━━━━━━━━━

  static Seed(): XProductOverviewObject {
    const instance = this.NewInstance();

    return instance;
  }

  // ━━━━━━━━━━━━━━━━━ 🍢 Migration ━━━━━━━━━━━━━━━━━
  /**
   * Migrate from V1 to V2
   * @param old
   * @constructor
   */

  static MigrateOld(old: any): XProductOverviewObject {
    const data = new XProductOverviewObjectData({
      product_id: old.product_info?.id,
    });

    return new XProductOverviewObject(null, null, null, [], data, null);
  }

  // ━━━━━━━━━━━━━━━━━ Interpreter ━━━━━━━━━━━━━━━━━

  public static JsonToInstance(
    json: Record<string, any>,
  ): XProductOverviewObject {
    return this._JsonToInstance(json, XProductOverviewObjectData);
  }
}
